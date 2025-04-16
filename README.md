# My own Cypress Framework
## Use a site to test against.
1. Download the following repo:
https://github.com/saucelabs/the-internet.git
2. Follow up the instructions contained in that repo in order to get a localhost to test against.
3. If you wouldn't want to download it (in my case the documentation is not clear and didn't want to work with rackup),
get the docker image: 
a. docker pull gprestes/the-internet
b. docker run -d -p 7080:5000 gprestes/the-internet
c. run the app and voala! http://localhost:7080

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


