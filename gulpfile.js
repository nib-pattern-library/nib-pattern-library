var gulp        = require('gulp');
var path        = require('path');
var readdir     = require('readdir');
var sequence    = require('run-sequence');

var cfg = {
  srcdir: './src',
  distdir: './dist'
};

//load gulp tasks
var taskDir = path.join(__dirname, 'tasks');
var taskFiles = readdir.readSync(taskDir, ['**.js']);
taskFiles.forEach(function(taskFile) {
  require(path.join(taskDir, taskFile))(cfg);
});

gulp.task('default', function(done) {
  sequence("build", done);
});

gulp.task('all', function(done) {
  sequence("clean", "install", "build", "test", "optimise", done);
});

gulp.task('install', function(done) {
  sequence("packages.install", "packages.dedupe", done);
});

gulp.task('build', function(done) {
  sequence(["scripts.bundle","styles.bundle","content.build"], done);
});

gulp.task('test', function(done) {
  sequence("scripts.test", done);
});

gulp.task('optimise', function(done) {
  sequence(["scripts.optimise","styles.optimise","images.optimise","content.optimise"], "cachebust", done);
});

gulp.task('watch', function(done) {
  sequence(["scripts.watch","styles.watch","packages.watch","content.watch"], done);
});

gulp.task('debug', function(done) {
  sequence("scripts.debug", done);
});
