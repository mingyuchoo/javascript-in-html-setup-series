// https://gulpjs.com/docs/en/getting-started/creating-tasks

const { series, src, dest, task, watch } = require('gulp');
const clean = require('gulp-clean');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

task('taskClean', function () {
  return src('public/js/*')
    .pipe(clean({ force: true }))
    .pipe(src('public/css/*'))
    .pipe(clean({ force: true }));
});

task('taskSASS', function () {
  return src('src/scss/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(dest('public/css'));
});

task('taskJavaScript', function () {
  return src('src/js/index.js')
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('public/js'));
});

task('default', series('taskClean', 'taskSASS', 'taskJavaScript'));
