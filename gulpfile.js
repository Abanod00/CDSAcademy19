var gulp = require('gulp'),
  gutil = require('gulp-util'),
  webserver = require('gulp-webserver');

gulp.task('js', function() {
  gulp.src('builds/CDSAcademy19/js/**/*');
});

gulp.task('html', function() {
  gulp.src('builds/CDSAcademy19/*.html');
});

gulp.task('css', function() {
  gulp.src('builds/CDSAcademy19/css/*.css');
});

gulp.task('watch', function() {
  gulp.watch('builds/CDSAcademy19/js/**/*', ['js']);
  gulp.watch('builds/CDSAcademy19/css/*.css', ['css']);
  gulp.watch(['builds/CDSAcademy19/*.html',
    'builds/CDSAcademy19/views/*.html'], ['html']);
});

gulp.task('webserver', function() {
  gulp.src('builds/CDSAcademy19/')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['watch', 'html', 'js', 'css', 'webserver']);
