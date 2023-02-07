var gulp = require('gulp');
var rename = require('gulp-rename')
var sass = require('gulp-sass')(require('sass'));
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();


exports.css = css =(cb) =>{
  gulp.src('./scss/style.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({
    errorLogToConsole:true,
    outputStyle: 'compressed'
  }))
  .pipe(autoprefixer({
    cascade: false
  }))
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./css/'))
  .pipe(browserSync.stream())
  cb()
}

exports.print = print = (cb) => {
  console.log('hi');
  cb()
}

exports.reload = reload = (cb) => {
  browserSync.reload();
  cb()
}

exports.browserS = browserS = (cb) => {
  browserSync.init({
    server: {
      baseDir: './',
    },
    port: 3000
  })
  cb()
}

exports.watchSass = watchSass = () => {
  gulp.watch("./scss/**/*", css)
}
exports.watchFiles = watchFiles = () => {
  gulp.watch(["./**/*"], reload)
}

gulp.task('default', gulp.parallel(browserS, watchSass, watchFiles))