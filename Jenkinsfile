pipeline {
    agent {
        docker {
            image 'cypress/browsers:node-18.12.0-chrome-107-ff-106'
            args '-u root'
        }
    }

    environment {
        CYPRESS_CACHE_FOLDER = '.cypress_cache'
        HOME = '/root'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm ci --unsafe-perm=true'
            }
        }

        stage('Run Cypress Tests') {
            steps {
                sh 'npx cypress run --reporter mochawesome'
            }
        }

        stage('Publish Report') {
            steps {
                publishHTML(target: [
                    reportDir: 'cypress/reports/mochawesome-report',
                    reportFiles: 'mochawesome.html',
                    reportName: 'Mochawesome Report'
                ])
            }
        }

        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }
    }
}
