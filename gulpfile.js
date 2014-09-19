var gulp = require('gulp');
var rimraf = require('rimraf');
var builder = require('nib-component-builder');

gulp.task('clean', function(done) {
  rimraf('build/', done)
});

gulp.task('metalsmith', function(done) {
  require('./metalsmith')(done);
});

gulp.task('component', function(done) {
  builder('components', {installDir: __dirname+'/build/components', buildDir:  __dirname+'/build/assets'}, function(errors) {
    if (errors.length) {
      done(errors[0]);
    } else {
      done();
    }
  });
});

gulp.task('watch', function() {

  gulp.watch(
    [
      'content/**',
      'templates/**'
    ],
    ['metalsmith']
  );

  gulp.watch('components/*', ['component']);

});

gulp.task('default', ['clean'], function() {
  gulp.start('metalsmith', 'component');
});