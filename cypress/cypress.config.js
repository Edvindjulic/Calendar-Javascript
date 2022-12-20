const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:8080",
    defaultCommandTimeout: 2000,
    specPattern: ["**/@plugga-tech/**/*.cy.{js,ts}"],
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
