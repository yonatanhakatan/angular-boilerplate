module.exports = function(config) {
  config.set({
    basePath: './',

    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'assets/js/**/*.module.js',
      'assets/js/**/*.js'
    ],

    preprocessors: {
      'assets/js/**/!(tests)/**/*.js': ['coverage']
    },

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Firefox'],

    singleRun: true,

    reporters: ['dots', 'coverage'],

    coverageReporter: {
      // specify a common output directory
      dir: './coverage',
      reporters: [
        {type: 'html', subdir: 'report-html'},
        {type: 'lcov', subdir: 'report-lcov'}
      ]
    }
  });
};
