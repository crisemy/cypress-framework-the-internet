const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_baseUrl || 'http://localhost:7080', // default for local dev
    // TODO: Add more envs if needed:
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome-report',
    overwrite: true,
    html: true,
    json: false
  }
  
});
