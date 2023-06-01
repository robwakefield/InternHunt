const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'je19fj',
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
