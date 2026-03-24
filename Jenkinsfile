pipeline {
  agent any

  environment {
    BASE_URL = "http://the-internet:5000"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
        sh 'ls -la'
      }
    }

    stage('Start Test App & Network') {
      steps {
        script {
          // Create the CI network if it doesn't exist
          sh 'docker network create ci-net || true'
          
          def isRunning = sh(
            script: "docker ps -q -f name=the-internet",
            returnStatus: true
          ) == 0

          if (!isRunning) {
            echo "Starting the-internet container..."
            sh 'docker start the-internet || docker run -d --name the-internet --network ci-net -p 7080:5000 gprestes/the-internet'
          } else {
            echo "the-internet container already running. Ensuring it connects to ci-net..."
            sh 'docker network connect ci-net the-internet || true'
          }

          // Wait for the container to start serving
          sh 'sleep 10'
        }
      }
    }

    stage('Run Tests in Docker') {
      steps {
        script {
          // Add the "--network ci-net" argument so Cypress can access the-internet via its container name
          docker.image('cypress/browsers:node-18.16.1-chrome-114.0.5735.133-1-ff-114.0.2-edge-114.0.1823.51-1').inside('--network ci-net --user=root') {
            withEnv([
              "CYPRESS_baseUrl=${BASE_URL}"
            ]) {
              sh 'npm ci'
              // Wait for the URL to return HTTP 200 before running tests
              sh 'npx wait-on -t 60000 ${BASE_URL}'
              sh 'npx cypress run --reporter mochawesome --reporter-options reportDir=cypress/reports/mochawesome,overwrite=false,html=true,json=true'
            }
          }
        }
      }
    }

    stage('Archive Artifacts') {
      steps {
        archiveArtifacts artifacts: 'cypress/reports/mochawesome/*.html', allowEmptyArchive: true
      }
    }
  }

  post {
    always {
      echo "✅ Pipeline finalizado (éxito o falla)"
      cleanWs()
    }
    failure {
      echo "❌ Build FALLÓ"
    }
  }
}
