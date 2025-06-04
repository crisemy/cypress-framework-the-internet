pipeline {
  agent any

  environment {
    NPM_CONFIG_CACHE = "${env.WORKSPACE}/.npm_cache"
    CYPRESS_CACHE_FOLDER = "${env.WORKSPACE}/.cypress_cache"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install dependencies') {
      steps {
        sh '''
          mkdir -p $NPM_CONFIG_CACHE
          mkdir -p $CYPRESS_CACHE_FOLDER
          npm ci
        '''
      }
    }

    stage('Install Xvfb') {
      steps {
        sh '''
          apt-get update
          apt-get install -y xvfb
        '''
      }
    }

    stage('Run Cypress Tests') {
      steps {
        sh '''
          Xvfb :99 & export DISPLAY=:99
          npx cypress run --reporter mochawesome --reporter-options reportDir=cypress/reports/mochawesome,overwrite=false,html=false,json=true
        '''
      }
    }

    stage('Publish Report') {
      steps {
        archiveArtifacts artifacts: 'cypress/reports/mochawesome/*.json', allowEmptyArchive: true
      }
    }
  }

  post {
    always {
      echo 'Pipeline completed (success or fail)'
    }
    failure {
      echo '❌ Build FAILED'
    }
    success {
      echo '✅ Build SUCCESS'
    }
  }
}