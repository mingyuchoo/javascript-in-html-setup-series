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
const browsersync = require('browser-sync').create();
const reload = browsersync.reload;

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: 'public',
    },
    port: 3000,
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Clean pbulic directory
function cleanPublic() {
  return src('public/js/*')
    .pipe(clean({ force: true }))
    .pipe(src('public/css/*'))
    .pipe(clean({ force: true }))
    .pipe(src(['public/index.html', 'public/html/*'], { allowEmpty: true }))
    .pipe(clean({ force: true }));
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
  return src('src/js/**/*.js')
    .pipe(plumber())
    .pipe(eslint({ configFile: '.eslintrc.yml', fix: true }))
    .pipe(eslint.format())
    .pipe(gulpIf(isFixed, dest('src/js')))
    .pipe(eslint.failAfterError());
}

function lintGulpfile() {
  return src('gulpfile.js')
    .pipe(plumber())
    .pipe(eslint({ configFile: '.eslintrc.yml', fix: true }))
    .pipe(eslint.format())
    .pipe(gulpIf(isFixed, dest('./')))
    .pipe(eslint.failAfterError());
}

// Urglify JavaScript
function uglifyJavaScript() {
  return src('src/js/index.js')
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('public/js'))
    .pipe(browsersync.stream({ stream: true }));
}

// Copy HTML
function copyHTML() {
  return src('src/index.html')
    .pipe(dest('public'))
    .pipe(src('src/html/**/*.html'))
    .pipe(dest('public/html'))
    .pipe(browsersync.stream({ stream: true }));
}

// Watch files changed
function watchFiles() {
  watch('src/scss/**/*.scss', transpileSCSS);
  watch('src/js/**/*.js', series(lintJavaScript, uglifyJavaScript));
  watch(['src/index.html', 'src/html/**/*.html'], copyHTML);
  //watch(['src/index.html', 'src/html/**/*.html'], browserSyncReload);
}

exports.clean = cleanPublic;

exports.lint = parallel(lintJavaScript, lintGulpfile);

exports.watch = parallel(watchFiles, browserSync);

exports.default = series(
  cleanPublic,
  parallel(
    transpileSCSS,
    series(parallel(lintJavaScript, lintGulpfile), uglifyJavaScript),
    copyHTML
  )
);
