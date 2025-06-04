pipeline {
    agent any

    environment {
        NPM_CONFIG_CACHE = "${env.WORKSPACE}/.npm_cache"
        CYPRESS_CACHE_FOLDER = "${env.WORKSPACE}/.cypress_cache"
    }

    options {
        skipStagesAfterUnstable()
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

        stage('Run Cypress Tests') {
            steps {
                sh '''
                    npx cypress run --reporter mochawesome --reporter-options reportDir=cypress/reports/mochawesome,overwrite=false,html=false,json=true
                '''
            }
        }

        stage('Publish Report') {
            steps {
                // Archiva los reportes generados (ajusta ruta si es distinta)
                archiveArtifacts artifacts: 'cypress/reports/mochawesome/*.json', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed (success or fail)'
        }
        success {
            echo '✅ Build SUCCESSFUL'
        }
        failure {
            echo '❌ Build FAILED'
        }
    }
}