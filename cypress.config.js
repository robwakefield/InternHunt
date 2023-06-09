const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "je19fj",

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    "baseUrl": "http://drp45.doc.ic.ac.uk/"
  },
});
