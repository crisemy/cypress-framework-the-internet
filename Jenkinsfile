pipeline {
    agent any

    environment {
        CYPRESS_CACHE_FOLDER = "${WORKSPACE}/.cypress_cache"
        npm_config_cache = "${WORKSPACE}/.npm_cache"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'mkdir -p $npm_config_cache'
                sh 'mkdir -p $CYPRESS_CACHE_FOLDER'
                sh 'npm ci'
            }
        }

        stage('Run Cypress Tests') {
            agent {
                docker {
                    image 'cypress/browsers:node18.12.0-chrome107-ff106'
                    args '-u root:root'
                }
            }
            steps {
                sh '''
                    npx cypress run \
                      --reporter mochawesome \
                      --reporter-options reportDir=cypress/reports/mochawesome,overwrite=false,html=false,json=true
                '''
            }
        }

        stage('Publish Report') {
            steps {
                publishHTML(target: [
                    allowMissing: true,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'cypress/reports/mochawesome',
                    reportFiles: 'mochawesome.html',
                    reportName: 'Mochawesome Report'
                ])
            }
        }
    }

    post {
        always {
            echo "Pipeline completed (success or fail)"
        }
        failure {
            echo "❌ Build FAILED"
        }
    }
}