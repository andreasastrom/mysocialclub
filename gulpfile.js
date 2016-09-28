
var gulp = require('gulp'),
sass = require('gulp-sass'),
precss = require('precss'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
sorting = require('postcss-sorting');

gulp.task('build', function () {
  return gulp.src('hello/static/style/main_style.scss')
  	.pipe(postcss([
  		require('precss'),
  		require('autoprefixer'),
  		require("stylelint")({
            "rules": {
            	// "unit-whitelist": ["px", "em", "rem", "%", "s"]
            }
        	})
		]))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('hello/static/style/css'));
});

gulp.task('watch', function () {
  gulp.watch('hello/static/style/scss/**/*.scss', ['build'], ['sortcss']);
});


gulp.task('default', function() {  
  gulp.start('watch')
});

gulp.task('sortcss', function () {
    return gulp.src('hello/static/style/main_style.scss')
    .pipe(
        postcss(
        	[sorting(
        		{"sort-order": "default",
        		"empty-lines-between-children-rules": 0,
    			"empty-lines-between-media-rules": 0,
    			"preserve-empty-lines-between-children-rules": false
    		})])
    ).pipe(
        gulp.dest('hello/static/style/css')
    );
});