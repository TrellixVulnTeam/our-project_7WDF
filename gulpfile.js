const { src, dest, task, series, watch } = require('gulp');
const rm = require( 'gulp-rm' );
const sass = require('gulp-sass');
const concat = require('gulp-concat');

sass.compiler = require('node-sass');

task('clean', () => {
  return src('dist/**/*', { read: false }).pipe(rm());
});

task('copy', () => {
  return src('./css/**/*.scss').pipe(dest('dist'))
});

const styles = [
  'css/layout/normalize.css',
  'css/main.scss'
]

task('styles', () => {
  return src(styles)
  .pipe(concat('main.scss'))
  .pipe(sass().on('error', sass.logError))
  .pipe(dest('dist'));
});

watch('./css/**/*.scss', series('styles'))

task('default', series('clean', 'styles'))