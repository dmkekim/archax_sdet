const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: false,
  defaultCommandTimeout: 60000,
  e2e: {
    setupNodeEvents(on, config) {
      require('@cypress/grep/src/plugin')(config);
      return config;
    },
  },
  env: {
    baseUrl: {
      qa: 'http://localhost:5173',
      dev: '',
      staging: ''
    }
  }
});
