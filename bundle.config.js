var less = require('gulp-less'),
  lazypipe = require('lazypipe'),
  gif = require('gulp-if'),
  srcPath = './src/public';

function stringEndsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}
function isLessFile(file) {
  return stringEndsWith(file.relative, 'less');
}
var styleTransforms = lazypipe()
  .pipe(function () {
    return gif(isLessFile, less());
  });

module.exports = {
  bundle: {
    vendor: {
      scripts: [
        {
          src: './bower_components/angular/angular.js',
          minSrc: './bower_components/angular/angular.min.js'
        },
        {
          src: './bower_components/angular-ui/build/angular-ui.js',
          minSrc: './bower_components/angular-ui/build/angular-ui.min.js'
        },
        {
          src: './bower_components/jquery/dist/jquery.js',
          minSrc: './bower_components/jquery/dist/jquery.min.js'
        },
        {
          src: './bower_components/bootstrap/dist/js/bootstrap.js',
          minSrc: './bower_components/bootstrap/dist/js/bootstrap.min.js'
        },
        {
          src: './bower_components/lodash/dist/lodash.js',
          minSrc: './bower_components/lodash/dist/lodash.min.js'
        },
        {
          src: './bower_components/moment/moment.js',
          minSrc: './bower_components/moment/min/moment.min.js'
        },
        {
          src: './bower_components/angular-strap/dist/angular-strap.js',
          minSrc: './bower_components/angular-strap/dist/angular-strap.min.js'
        },
        {
          src: './bower_components/angular-strap/dist/angular-strap.tpl.js',
          minSrc: './bower_components/angular-strap/dist/angular-strap.tpl.min.js'
        },
        {
          src: './bower_components/angular-animate/angular-animate.js',
          minSrc: './bower_components/angular-animate/angular-animate.min.js'
        }
      ],
      styles: [
        {
          src: './bower_components/angular-ui/build/angular-ui.css',
          minSrc: './bower_components/angular-ui/build/angular-ui.min.css'
        },
        {
          src: './bower_components/bootstrap/dist/css/bootstrap-theme.css',
          minSrc: './bower_components/bootstrap/dist/css/bootstrap-theme.min.css'
        }
      ],
      options: {
        useMin: ['min'],
        rev: ['min'],
        skipWatch: {
          scripts: true,
          styles: true
        }
      }
    },
    main: {
      scripts: srcPath + '/**/*.js',
      styles: srcPath + '/**/*.less',
      options: {
        uglify: ['min'],
        minCSS: ['min'],
        rev: ['min'],
        transforms: {
          styles: styleTransforms
        }
      }
    }
  },
  copy: [
    {
      src: [
          srcPath + '/images/**'
      ],
      base: srcPath
    },
    {
      src: "./bower_components/bootstrap/dist/fonts/*",
      base: './bower_components/bootstrap/dist/'
    },
    {
      src: './src/public/partials/**/*.html',
      base: './src/public'
    }
  ]
};