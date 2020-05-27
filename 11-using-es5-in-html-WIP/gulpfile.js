// https://gulpjs.com/docs/en/getting-started/creating-tasks
// https://gist.github.com/jeromecoupe/0b807b0c1050647eb340360902c3203a#file-webstoemp-gulpfile-js-L23

const { series, parallel, src, dest, watch } = require('gulp');
const clean = require('gulp-clean');
const sass = require('gulp-sass');
const eslint = require('gulp-eslint');
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

function cleanPublic() {
  return src('public/js/*')
    .pipe(clean({ force: true }))
    .pipe(src('public/css/*'))
    .pipe(clean({ force: true }));
}

function transpileSCSS() {
  return src('src/scss/**/*.scss', { sourcemaps: true })
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(dest('public/css', { sourcemaps: true }))
    .pipe(browsersync.stream());
}

// Lint scripts
function lintJavaScript() {
  return src(['src/js/**/*.js', 'gulpfile.js'])
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

function uglifyJavaScript() {
  return src('src/js/index.js', { sourcemaps: true })
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('public/js', { sourcemaps: true }));
}

function watchFiles() {
  watch('src/scss/**/*.scss', transpileSCSS);
  watch('src/js/**/*.js', series(lintJavaScript, uglifyJavaScript));
  watch(['public/index.html', 'public/html/**/*'], browserSyncReload);
}
exports.watch = parallel(watchFiles, browserSync);
exports.default = series(
  cleanPublic,
  parallel(transpileSCSS, series(lintJavaScript, uglifyJavaScript))
);
