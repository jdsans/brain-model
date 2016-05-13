/* File: gulpfile.js */

// grab our packages
var gulp = require('gulp'),
    uglify = require('gulp-uglify');

// process JS files and return the stream.
gulp.task('js', function() {
    return gulp.src('source/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});
