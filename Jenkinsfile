pipeline {
  agent any

  environment {
    CYPRESS_CACHE_FOLDER = "${WORKSPACE}/.cypress_cache"
    NPM_CACHE_FOLDER = "${WORKSPACE}/.npm_cache"
    BASE_URL = "http://the-internet:5000"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
        sh 'ls -la'
      }
    }

    stage('Start Test App') {
      steps {
        script {
          def isRunning = sh(
            script: "docker ps -q -f name=the-internet",
            returnStatus: true
          ) == 0

          if (!isRunning) {
            echo "Starting the-internet container..."
            sh 'docker start the-internet || docker run -d --name the-internet --network ci-net -p 7080:5000 gprestes/the-internet'
          } else {
            echo "the-internet container already running"
          }

          // Esperar a que el servicio esté levantado
          sh 'sleep 10'
        }
      }
    }

    stage('Run Tests in Docker') {
      steps {
        script {
          docker.image('cypress/browsers:node-18.16.1-chrome-114.0.5735.133-1-ff-114.0.2-edge-114.0.1823.51-1').inside('--user=root:root --privileged') {
            withEnv([
              "CYPRESS_baseUrl=${BASE_URL}",
              "CYPRESS_CACHE_FOLDER=${CYPRESS_CACHE_FOLDER}",
              "NPM_CONFIG_CACHE=${NPM_CACHE_FOLDER}"
            ]) {
              sh 'mkdir -p $NPM_CONFIG_CACHE $CYPRESS_CACHE_FOLDER'
              sh 'npm ci'
              sh 'npx cypress run --reporter mochawesome --reporter-options reportDir=cypress/reports/mochawesome,overwrite=false,html=true,json=true'
            }
          }
        }
      }
    }

    stage('Archive Artifacts') {
      when {
        expression { currentBuild.currentResult == 'SUCCESS' }
      }
      steps {
        archiveArtifacts artifacts: 'cypress/reports/mochawesome/*.html', allowEmptyArchive: true
      }
    }

    stage('Publish Report') {
      when {
        expression { currentBuild.currentResult == 'SUCCESS' }
      }
      steps {
        publishHTML(target: [
          reportDir: 'cypress/reports/mochawesome',
          reportFiles: 'mochawesome.html',
          reportName: 'Cypress Mochawesome Report'
        ])
      }
    }
  }

  post {
    always {
      echo "✅ Pipeline finalizado (éxito o falla)"
    }
    failure {
      echo "❌ Build FALLÓ"
    }
  }
}
