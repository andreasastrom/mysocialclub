
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('hello/static/style/main_style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('hello/static/style/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('hello/static/style/scss/**/*.scss', ['sass']);
});


gulp.task('default', function() {  
  gulp.start('sass:watch')
});