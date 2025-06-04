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
        stage('Inicio') {
            steps {
                echo 'Pipeline iniciado correctamente'
            }
        }

        stage('Checkout') {
            steps {
                echo 'Haciendo checkout del código...'
                checkout scm
                sh 'ls -la'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Cypress Tests') {
            steps {
                sh 'npx cypress run --reporter mochawesome'
            }
        }

        stage('Post test debug') {
            steps {
                sh 'ls -R cypress/reports/mochawesome-report || echo "Reporte no encontrado"'
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
    }
}

