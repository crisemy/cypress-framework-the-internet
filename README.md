# My own Cypress Framework

This is a custom-built Cypress automation framework designed to facilitate UI testing. The framework is structured around **Page Object Model** (POM) principles for better scalability and maintainability. It is intended to be used with a sample web application (`the-internet`), which can be tested using Docker or directly from the source repository.

## Prerequisites
Before starting, ensure you have the following tools installed:
- **Docker** (if you prefer to run the app in a container)
- **Node.js** and **npm** (for managing dependencies)

## Use a site to test against.
1. Download the following repo:
https://github.com/saucelabs/the-internet.git
2. Follow up the instructions contained in that repo in order to get a localhost to test against.
3. If you wouldn't want to download it (in my case the documentation is not clear and didn't want to work with rackup),

get the docker image: 
a. docker pull gprestes/the-internet
b. docker run -d -p 7080:5000 gprestes/the-internet
c. run the app and Access the app via: http://localhost:7080

More information in here -> https://hub.docker.com/r/gprestes/the-internet/

https://github.com/crisemy/cypress-framework-the-internet.git

## Installing cypress plus dependencies
1. npm init -y -> Will generate a package.json file to start doing your configuration
2. Installing cypress: npm install cypress --save-dev
3. npx cypress open -> To generate the environment

4. Generating the structure of the framework

cypress/
├── e2e/
│   └── home.cy.js         # First test
├── fixtures/
├── pages/                 # Page Objects
│   └── LoginPage.js
├── support/
│   ├── commands.js
│   └── e2e.js

5. Adding the .gitignore file containing the following:

node_modules
.cypress
.DS_Store

6.  Made the commit: 

git add .
git commit -m "Initial setup: Node project, Cypress installed, base folder structure"
git push origin main

7. Example Test Structure:
- Page Object: In cypress/pages/LoginPage.js, you define methods to interact with the login page:

class LoginPage {
  visit() {
    cy.visit('/login');
  }

  enterUsername(username) {
    cy.get('input[name="username"]').type(username);
  }

  enterPassword(password) {
    cy.get('input[name="password"]').type(password);
  }

  submit() {
    cy.get('button[type="submit"]').click();
  }
}

export default LoginPage;

- Test File: In cypress/e2e/home.cy.js, you reference the page object and perform tests:
import LoginPage from '../pages/LoginPage';

const loginPage = new LoginPage();

describe('Login Tests', () => {
  it('should login successfully with valid credentials', () => {
    loginPage.visit();
    loginPage.enterUsername('validUser');
    loginPage.enterPassword('validPassword');
    loginPage.submit();

    cy.url().should('include', '/dashboard');
  });
});

8. Follow up the first ticket: https://github.com/crisemy/cypress-framework-the-internet/issues/1

9. Follow up the rest of the tickets...

## Continous Integration 

10. ## GitHub Actions

The framework is integrated with GitHub Actions for Continuous Integration (CI). The pipeline job includes the following steps:
- Checkout the repository: Uses the actions/checkout@v3 to get the latest code.
- Setup Node.js environment: Uses actions/setup-node@v3 to configure Node.js.
- Install dependencies: Runs npm install to install Cypress and other required packages.
- Run Docker container for the test site: Pulls and runs the gprestes/the-internet Docker image.
- Wait for the app to be ready: Uses wait-on to ensure the app is accessible before running tests.
- Run Cypress tests: Executes the tests using npx cypress run.
- Upload Cypress artifacts (on failure): If the tests fail, it uploads videos and screenshots for debugging.

Example of the YAML file:

name: Cypress Automation Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  cypress-run:
    runs-on: ubuntu-22.04

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Pull Docker image of the app
        run: docker pull gprestes/the-internet

      - name: Start the app container
        run: docker run -d -p 7080:5000 gprestes/the-internet

      - name: Wait for the app to be ready
        run: npx wait-on http://localhost:7080

      - name: Run Cypress tests
        run: npx cypress run

      - name: Upload Cypress videos (on failure)
        if: failure()
        uses: actions/upload-artifact@v2
        with:
          name: cypress-videos
          path: cypress/videos

      - name: Upload Cypress screenshots (on failure)
        if: failure()
        uses: actions/upload-artifact@v2
        with:
          name: cypress-screenshots
          path: cypress/screenshots

11. ## Jenkins CI Integration (Alternative to GitHub Actions)

In case you prefer to run your tests via Jenkins (e.g., due to persistent GitHub Actions issues or for professional/local CI control), you can integrate Cypress using a Jenkins pipeline.

- Requirements:

Docker installed (Jenkins will be run inside a container)
Jenkins plugins:
  - NodeJS Plugin
  - Pipeline
  - Docker Pipeline
  - HTML Publisher Plugin (to visualize Mochawesome reports)

- Running Jenkins in Docker

You can start Jenkins via Docker with the following command from your terminal (not from Docker CLI):

docker run -d \
  --name jenkins-cypress \
  -p 8080:8080 -p 50000:50000 \
  -v jenkins-data:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkins/jenkins:lts

Add a Jenkinsfile to the root of your project:

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
                sh 'npm ci'
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
    }
}

- Reporter Configuration

In cypress.config.js, make sure Mochawesome is enabled:

reporter: 'mochawesome',
reporterOptions: {
  reportDir: 'cypress/reports/mochawesome-report',
  overwrite: true,
  html: true,
  json: false
}

After each pipeline run, you’ll be able to view the Mochawesome HTML report directly in Jenkins under “Published HTML Reports”.

##  Conclusion
This framework is an excellent starting point for automating UI tests with Cypress, offering flexibility and scalability for larger test suites. The integration with Docker allows you to easily set up a consistent test environment, and the CI pipeline ensures that your tests are automatically executed with every change.

Feel free to fork this repository and contribute if you have suggestions for improvement or new features.