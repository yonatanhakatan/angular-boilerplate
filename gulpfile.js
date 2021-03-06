var del = require('del');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var Server = require('karma').Server;

/**
 * Paths
 */
var bowerFolder = 'bower_components/';
var destFolder = 'public/';
var srcFolder = 'assets/';


/**
 * Clean all destination folders
 */
gulp.task('clean', function(cb) {
  return del([
    destFolder + '*'
  ], {dot: true}, cb)

  return gulp.pipe(plugins.if(isMac, plugins.notify('Clean task complete')));
});

/**
 * Clean destination folders during development.
 * This does not clean the vendor folder.
 */
gulp.task('clean-dev', function(cb) {
  return del([
    destFolder + '*',
    destFolder + '_js/site/**',
    '!' + destFolder + '_js',
    '!' + destFolder + '_js/vendor/**'
  ], {dot: true}, cb)

  return gulp.pipe(plugins.if(isMac, plugins.notify('Clean (dev) task complete')));
});

/**
 * Install Bower components
 */
gulp.task('bower', function() {
  return plugins.bower();
});

/**
 * Css generation
 */
gulp.task('styles', function() {
  return gulp
    .src(srcFolder + 'sass/style.scss')
    .pipe(plugins.sass({errLogToConsole: true}))
    .pipe(plugins.plumber())
    .pipe(plugins.autoprefixer({
      browsers: ['last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
    }))
    .pipe(gulp.dest(destFolder + '_css/'))
    .pipe(plugins.minifyCss({keepSpecialComments: 0}))
    .pipe(plugins.rename({extname: '.min.css'}))
    .pipe(gulp.dest(destFolder + '_css/'));
});


/**
 * Vendor scripts
 */
gulp.task('vendor-scripts', ['bower'], function() {
  return gulp
    .src([
      bowerFolder + 'angular/angular.min.js',
      bowerFolder + 'angular-ui-router/release/angular-ui-router.min.js'
    ])
    .pipe(plugins.plumber())
    .pipe(plugins.concat('vendor.js'))
    .pipe(gulp.dest(destFolder + '_js/vendor/'))
    .pipe(plugins.uglify())
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(gulp.dest(destFolder + '_js/vendor/'));
});

/**
 * Main site scripts
 */
gulp.task('scripts', function() {
  return gulp
    .src([
      srcFolder + 'js/**/*.js',
      '!' + srcFolder + '**/tests/**/*'
    ])
    .pipe(plugins.plumber())
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'))
    .pipe(plugins.jscs())
    .pipe(plugins.jscs.reporter())
    .pipe(plugins.concat('site.js'))
    .pipe(gulp.dest(destFolder + '_js/site/'))
    .pipe(plugins.uglify())
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(gulp.dest(destFolder + '_js/site/'));
});

/**
 * Karma Tests
 */
gulp.task('test-karma', function(done) {
  return new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, function() {
    done();
  }).start();
});

/**
 * Protractor Tests
 */
gulp.task('test-protractor', function(done) {
  return gulp
    .src(['assets/js/**/tests/e2e/**/*.js'])
    .pipe(plugins.protractor.protractor({
      configFile: 'protractor.conf.js'
    }))
    .on('error', function() {
      done();
    });
});

/**
 * Run scripts then test
 */
gulp.task('tested-scripts', function(done) {
  return runSequence(
    'scripts',
    'test-karma',
    'test-protractor',
    done
  );
});

/**
 * Copy images from src to dest
 */
gulp.task('copy-images', function() {
  return gulp
    .src(srcFolder + 'img/**/*')
    .pipe(gulp.dest(destFolder + '_img'));
});

/**
 * Copy fonts from src to dest
 */
gulp.task('copy-fonts', function() {
  return gulp
    .src(srcFolder + 'fonts/**/*')
    .pipe(gulp.dest(destFolder + '_fonts'));
});

/**
 * Copy angular partials from src to dest
 */
gulp.task('copy-ng-partials', function() {
  return gulp
    .src(srcFolder + 'ng-partials/**/*')
    .pipe(gulp.dest(destFolder + '_ng-partials'));
});

/**
 * Copy data files from src to dest
 */
gulp.task('copy-data', function() {
  return gulp
    .src(srcFolder + 'data/**/*')
    .pipe(gulp.dest(destFolder + '_data'));
});

/**
 * Copy root files from src to dest
 */
gulp.task('copy-root', function() {
  return gulp
    .src(srcFolder + 'root/**/*', {dot: true})
    .pipe(gulp.dest(destFolder));
});


/**
 * Watch various files and run appropriate task
 */
gulp.task('watch', function() {
  // Watch this file
  gulp.watch('gulpfile.js', ['dev']);

  // Watch .scss files
  gulp.watch(srcFolder + 'scss/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch(srcFolder + 'js/**/*.js', ['tested-scripts']);

  // Watch Angular partials
  gulp.watch(srcFolder + 'ng-partials/**/*.html', ['copy-ng-partials']);

  // Watch image files
  gulp.watch(srcFolder + 'img/**/*', ['copy-images']);

  // Watch font files
  gulp.watch(srcFolder + 'fonts/**/*', ['copy-fonts']);

  // Watch data files
  gulp.watch(srcFolder + 'data/**/*', ['copy-data']);

  // Watch root files
  gulp.watch(srcFolder + 'root/**/*', ['copy-root']);

  // Watch bower files
  gulp.watch('bower.json', ['vendor-scripts']);

});

/**
 * Default task. Runs all other tasks.
 */
gulp.task('default', ['clean'], function() {
  return runSequence(
    'vendor-scripts',
    'scripts',
    'styles',
    'copy-images',
    'copy-fonts',
    'copy-ng-partials',
    'copy-data',
    'copy-root'
  );
});

/**
 * Run this during development as does not run bower each time.
 * Requires 'vendor-scripts' task to have been run once first.
 */
gulp.task('dev', ['clean-dev'], function() {
  return runSequence(
    'styles',
    'copy-images',
    'copy-fonts',
    'copy-ng-partials',
    'copy-data',
    'copy-root',
    'tested-scripts'
  );
});
