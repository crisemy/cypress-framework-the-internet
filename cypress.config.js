const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:7080',  // Configuring the URL to gaing access with. TODO: Add different envs if needed
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
