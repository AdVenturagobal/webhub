const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

// CSS 合并压缩
const cssFiles = [
  'assets/css/bootstrap.css',
  'assets/css/xenon-core.css',
  'assets/css/xenon-components.css',
  'assets/css/xenon-skins.css',
  'assets/css/nav.css'
];

gulp.task('css', function() {
  return gulp.src(cssFiles)
    .pipe(concat('main.css'))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('assets/css'));
});

// JS 合并压缩（不包含jquery和lozad）
const jsFiles = [
  'assets/js/bootstrap.min.js',
  'assets/js/TweenMax.min.js',
  'assets/js/resizeable.js',
  'assets/js/joinable.js',
  'assets/js/xenon-api.js',
  'assets/js/xenon-toggles.js',
  'assets/js/xenon-custom.js'
];

gulp.task('js', function() {
  return gulp.src(jsFiles)
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('assets/js'));
});

gulp.task('build', gulp.parallel('css', 'js')); 