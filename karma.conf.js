const istanbul = require('istanbul-instrumenter-loader'); // Assumed to be installed

module.exports = function (config) {
  config.set({
    // ... other Karma configuration options ...

    reporters: ['progress', 'coverage-istanbul'], // Add 'coverage-istanbul' reporter

    coverageReporter: {
      type: 'html', // Output type (html, lcov, etc.)
      dir: path.join(__dirname, 'coverage') // Output directory for coverage reports
    },

    // ... other Karma configuration options ...
  });
};
