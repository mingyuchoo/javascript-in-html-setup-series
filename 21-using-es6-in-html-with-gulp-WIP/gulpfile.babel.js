import { src, dest, series, parallel, watch } from 'gulp';
import clean from 'gulp-clean';
import sass from 'gulp-sass';
import eslint from 'gulp-eslint';
import gulpIf from 'gulp-if';
import plumber from 'gulp-plumber';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import replace from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';
import { create, reload } from 'browser-sync';
import babel from 'gulp-babel';
import Cache from 'gulp-file-cache';
import merge from 'merge-stream';

const browsersync = create();
const cache = new Cache();

const paths = {
  scss: {
    src: 'src/scss/**/*.scss',
    dest: 'public/css',
  },
  js: {
    scr: 'src/js/**/*.js',
    dest: 'public/js',
  },
};

// syncBrowser
const syncBrowser = (cb) => {
  browsersync.init({
    server: {
      baseDir: 'public',
    },
    port: 3000,
  });
  cb();
};

// syncBrowser Reload
const syncBrowserReload = (cb) => {
  reload();
  cb();
};

// Clean public directory
const cleanPublic = () => {
  const js = src('public/js/*').pipe(clean({ force: true }));

  const css = src('public/css/*').pipe(clean({ force: true }));

  const html = src(['public/index.html', 'public/html/*'], {
    allowEmpty: true,
  }).pipe(clean({ force: true }));

  return merge(js, css, html);
};

// Transpile SCSS to CSS
const transpileSCSS = () => {
  return src('src/scss/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(dest('public/css'))
    .pipe(browsersync.stream({ stream: true }));
};

// check some file is fiexed
const isFixed = (file) => {
  return file.eslint !== null && file.eslint.fixed;
};

// lint JavaScript
const lintJavaScript = () => {
  const js = src('src/js/**/*.js')
    .pipe(plumber())
    .pipe(eslint({ configFile: '.eslintrc.yml', fix: true }))
    .pipe(eslint.format())
    .pipe(gulpIf(isFixed, dest('src/js')))
    .pipe(eslint.failAfterError());

  const gulpfile = src('gulpfile.babel.js')
    .pipe(plumber())
    .pipe(eslint({ configFile: '.eslintrc.yml', fix: true }))
    .pipe(eslint.format())
    .pipe(gulpIf(isFixed, dest('./')))
    .pipe(eslint.failAfterError());

  return merge(js, gulpfile);
};

// transpile ES6 to ES5
export const transpileES6 = () => {
  return (
    src('src/js/index.js')
      .pipe(sourcemaps.init())
      .pipe(babel({ presets: ['@babel/preset-env'] }))
      .pipe(cache.cache())
      .pipe(concat('bundle.js'))
      // .pipe(uglify())
      .pipe(rename({ extname: '.min.js' }))
      .pipe(sourcemaps.write('.'))
      .pipe(dest('public/js'))
      .pipe(browsersync.stream({ stream: true }))
  );
};

// Copy HTML
export const copyHTML = () => {
  const root = src('src/index.html').pipe(dest('public'));

  const children = src('src/html/**/*.html').pipe(dest('public/html'));

  return merge(root, children).pipe(browsersync.stream({ stream: true }));
};

const watchFiles = () => {
  watch('src/scss/**/*.scss', transpileSCSS);
  watch('src/**/*.js', series(lintJavaScript, transpileES6));
  watch(['src/index.html', 'src/html/**/*.html'], copyHTML);
};

export const cleanAll = cleanPublic;
export const lintAll = lintJavaScript;
export const watchAll = parallel(watchFiles, syncBrowser);
const build = series(
  cleanPublic,
  parallel(transpileSCSS, series(lintJavaScript, transpileES6), copyHTML)
);

export default build;
