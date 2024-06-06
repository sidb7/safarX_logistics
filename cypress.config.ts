import { defineConfig } from "cypress";
import mochawesomeReporter from "cypress-mochawesome-reporter/plugin";

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // require the cypress-mochawesome-reporter plugin
      require("cypress-mochawesome-reporter/plugin")(on);
      return config;
    },
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: true,
      json: true,
      charts: true,
    },
  },
});

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      mochawesomeReporter(on);
      return config;
    },
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: true,
      json: true,
      charts: true,
    },
  },
});
