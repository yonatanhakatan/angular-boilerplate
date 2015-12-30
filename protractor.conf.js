exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    'assets/js/**/tests/e2e/**/*.js'
  ],

  capabilities: {
    'browserName': 'firefox'
  },

  baseUrl: 'http://localhost:8000/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  },

  directConnect: true
};
