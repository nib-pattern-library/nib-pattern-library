var gulp      = require('gulp');
var sequence  = require('run-sequence');
var rimraf    = require('rimraf');
var builder   = require('nib-component-builder');
var open      = require('open');

gulp.task('clean', function(done) {
  rimraf('public/', function() {
	rimraf('build/', done);
  });
});

gulp.task('metalsmith', function(done) {
  require('./metalsmith')(done);
});

gulp.task('component', function(done) {
  builder('components', {installDir: __dirname+'/public/components', buildDir:  __dirname+'/public/assets'}, function(errors) {
    if (errors.length) {
      done(errors[0]);
    } else {
      done();
    }
  });
});

gulp.task('open', function() {
  open('./public/index.html')
});

gulp.task('watch', function() {

  gulp.watch(
    [
      'content/**',
      'templates/**'
    ],
    ['metalsmith']
  );

  gulp.watch('components/**', ['component']);

});

gulp.task('build', ['clean'], function() {
  sequence(
    ['metalsmith', 'component']
  );
});

gulp.task('default', ['clean'], function() {
  sequence(
    ['metalsmith', 'component'],
    ['open']
  );
});
