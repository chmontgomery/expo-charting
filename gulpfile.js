var gulp = require('gulp'),
  argv = require('yargs').argv,
  path = require('path'),
  spawn = require('child_process').spawn,
  srcPath = './src',
  srcPublicPath = srcPath + '/public',
  publicPath = './public',
  srcJs = [
    srcPath + '/lib/**/*.js',
    srcPath + '/models/**/*.js',
    srcPath + '/routes/**/*.js',
    srcPath + '/*.js'
  ],
  options = {
    paths: {
      lint: [
        './*.js'
      ].concat(srcJs),
      felint: [
        srcPublicPath + '/**/*.js'
      ],
      cover: [
        './server.js'
      ].concat(srcJs),
      test: [
        './test/**/*.js'
      ]
    },
    coverageSettings: {
      thresholds: {
        statements: 60,
        branches: 20,
        functions: 20,
        lines: 60
      }
    }
  };

require('load-common-gulp-tasks')(gulp, options);

// do a clean and build when first starting up
gulp.task('develop', 'Watch and restart server on change', function (cb) {
  require('run-sequence')('build',
    ['nodemon', 'watch'],
    cb);
}, {
  options: {
    'debug': 'Start in debug mode'
  },
  aliases: ['dev']
});

gulp.task('nodemon', false, function (cb) {
  var nodemon = require('gulp-nodemon'),
    gutil = require('gulp-util');

  var nodemonOpts = {
    script: 'server.js',
    ext: 'dust js',
    ignore: [ // only watch server files
      'bower_components/**',
      'node_modules/**',
      'public/**',
      'src/public/**',
      'target/**',
      'bundle.result.json',
      'gulpfile.js'
    ],
    stdout: false
  };
  if (argv.debug) {
    nodemonOpts.nodeArgs = ['--debug'];
  }
  nodemon(nodemonOpts)
    .on('restart', function () {
      var d = new Date();
      console.log(gutil.colors.bgBlue('server restarted at ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()));
    })
    .on('readable', function () {
      var bunyan = spawn('node', [path.join(__dirname, 'node_modules/bunyan/bin/bunyan')], {stdio: ['pipe', process.stdout, process.stderr]});
      this.stdout.pipe(bunyan.stdin);
      this.stderr.pipe(bunyan.stdin);
    });
  cb();
});

gulp.task('clean', 'Clean all assets out of /public', function () {
  return gulp.src([publicPath + '/*'], {read: false})
    .pipe(require('gulp-rimraf')());
});

gulp.task('watch', 'Watch assets and build on change', function (cb) {
  var livereload = require('gulp-livereload'),
    gutil = require('gulp-util'),
    gbundle = require('gulp-bundle-assets');

  livereload.listen();
  gbundle.watch({
    configPath: path.join(__dirname, 'bundle.config.js'),
    results: {
      dest: __dirname,
      pathPrefix: '/public/'
    },
    dest: path.join(__dirname, publicPath)
  });
  gulp.watch(publicPath + '/**/*.*').on('change', function (file) {
    livereload();
    //console.log(gutil.colors.grey('Changed:', file));
    var d = new Date();
    console.log(gutil.colors.bgBlue('browser livereload at ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()));
  });
  cb();
});

function bundle() {
  var gbundle = require('gulp-bundle-assets');
  return gulp.src('./bundle.config.js')
    .pipe(gbundle())
    .pipe(gbundle.results({
      dest: './',
      pathPrefix: '/public/'
    }))
    .pipe(gulp.dest(publicPath));
}

gulp.task('bundle', 'Builds all static files', function () {
  return bundle();
});

gulp.task('build', 'Cleans and builds all static files', ['clean'], function () {
  return bundle();
});
