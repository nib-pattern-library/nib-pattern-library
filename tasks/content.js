var gulp        = require('gulp');
var path        = require('path');
var metalsmith  = require('metalsmith');
var minHTML     = require('gulp-htmlmin');
var layouts     = require('metalsmith-layouts');
var templates   = require('metalsmith-in-place');
var rootPath    = require('metalsmith-rootpath');
var filepath    = require('metalsmith-filepath');
var rename      = require('metalsmith-rename');
var collections = require('metalsmith-collections');

//TODO: metalsmith-in-place locals
//TODO: metalsmith-git-rev
//TODO: metalsmith-headings for anchors

module.exports = function(cfg) {

  var CONTENT_SRC_DIR = cfg.srcdir+'/static';
  var CONTENT_SRC_GLOB = cfg.srcdir+'/static/**/*';

  /*==================================
   * Build content
   *==================================*/

  gulp.task('content.build', function(done) {

    var
      src   = './content',
      dest  = path.relative(CONTENT_SRC_DIR, cfg.distdir)
    ;

    metalsmith(CONTENT_SRC_DIR)
      .clean(false)
      .source(src)
      .destination(dest)
      .metadata({version: 'foo'})
      .use(rename([[/\.ejs$/, '.html']]))
      .use(collections({pages: {pattern: 'pages/*.html', sortBy: 'title'}}))
      .use(rootPath())
      .use(filepath({absolute: false}))
      //.use(templates({engine: 'ejs', directory: 'templates', pattern: '**/*.html'}))
      .use(layouts({engine: 'ejs', directory: 'layouts', default: 'index.ejs', pattern: '**/*.html'}))
      .build(done)
    ;

  });

  /*==================================
   * Watch content
   *==================================*/

  gulp.task('packages.watch', function() {
    gulp.watch(CONTENT_SRC_GLOB, ['content.build']);
  });

  /*==================================
   * Optimise content
   *==================================*/

  gulp.task('content.optimise', function() {
    return gulp.src(cfg.distdir+'/**/*.html')
      .pipe(minHTML({
        collapseWhitespace: true,
        conservativeCollapse: true,
        minifyJS: true,
        minifyCSS: true
      }))
      .pipe(gulp.dest(cfg.distdir))
    ;
  });
};