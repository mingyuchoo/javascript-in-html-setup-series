// https://gulpjs.com/docs/en/getting-started/creating-tasks
// https://gist.github.com/jeromecoupe/0b807b0c1050647eb340360902c3203a#file-webstoemp-gulpfile-js-L23

const { series, parallel, src, dest, watch } = require('gulp');
const clean = require('gulp-clean');
const sass = require('gulp-sass');
const eslint = require('gulp-eslint');
const gulpIf = require('gulp-if');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const merge = require('merge-stream');
const browsersync = require('browser-sync').create();
const reload = browsersync.reload;

// BrowserSync
function browserSync(cb) {
  browsersync.init({
    server: {
      baseDir: 'public',
    },
    port: 3000,
  });
  cb();
}

// BrowserSync Reload
function browserSyncReload(cb) {
  browsersync.reload();
  cb();
}

// Clean pbulic directory
function cleanPublic() {
  const js = src('public/js/*').pipe(clean({ force: true }));
  const css = src('public/css/*').pipe(clean({ force: true }));
  const html = src(['public/index.html', 'public/html/*'], {
    allowEmpty: true,
  }).pipe(clean({ force: true }));
  return merge(js, css, html);
}

// Transpile SCSS to CSS
function transpileSCSS() {
  return src('src/scss/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(dest('public/css'))
    .pipe(browsersync.stream({ stream: true }));
}

// check some file is fiexed
function isFixed(file) {
  return file.eslint !== null && file.eslint.fixed;
}

function lintJavaScript() {
  const js = src('src/js/**/*.js')
    .pipe(plumber())
    .pipe(eslint({ configFile: '.eslintrc.yml', fix: true }))
    .pipe(eslint.format())
    .pipe(gulpIf(isFixed, dest('src/js')))
    .pipe(eslint.failAfterError());
  const gulpfile = src('gulpfile.js')
    .pipe(plumber())
    .pipe(eslint({ configFile: '.eslintrc.yml', fix: true }))
    .pipe(eslint.format())
    .pipe(gulpIf(isFixed, dest('./')))
    .pipe(eslint.failAfterError());
  return merge(js, gulpfile);
}

// Urglify JavaScript
function uglifyJavaScript() {
  return src('src/js/index.js')
    .pipe(replace('module.exports', '//module.exports'))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('public/js'))
    .pipe(browsersync.stream({ stream: true }));
}

// Copy HTML
function copyHTML() {
  const root = src('src/index.html').pipe(dest('public'));
  const children = src('src/html/**/*.html').pipe(dest('public/html'));
  return merge(root, children).pipe(browsersync.stream({ stream: true }));
}

// Watch files changed
function watchFiles() {
  watch('src/scss/**/*.scss', transpileSCSS);
  watch('src/js/**/*.js', series(lintJavaScript, uglifyJavaScript));
  watch(['src/index.html', 'src/html/**/*.html'], copyHTML);
  //watch(['src/index.html', 'src/html/**/*.html'], browserSyncReload);
}

exports.clean = cleanPublic;

exports.lint = lintJavaScript;

exports.watch = parallel(watchFiles, browserSync);

exports.default = series(
  cleanPublic,
  parallel(transpileSCSS, series(lintJavaScript, uglifyJavaScript), copyHTML)
);
