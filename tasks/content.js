var fs          = require('fs');
var path        = require('path');
var gulp        = require('gulp');
var minHTML     = require('gulp-htmlmin');
var ejs         = require('ejs');
var metalsmith  = require('metalsmith');
var rename      = require('metalsmith-rename');
var layouts     = require('metalsmith-layouts');
var templates   = require('metalsmith-in-place');
var rootPath    = require('metalsmith-rootpath');
var filePath    = require('metalsmith-filepath');
var collections = require('metalsmith-collections');
var headings    = require('metalsmith-headings');

//TODO: metalsmith-git-rev
function versionify(files, metalsmith, next) {

  //figure out the git SHA
  require('git-rev').short(function(version) {

    for (var path in files) {
      files[path].version = version;
    }

    next();
  });

}

module.exports = function(cfg) {

  var CONTENT_SRC_DIR = cfg.srcdir+'';
  var CONTENT_SRC_GLOB = [cfg.srcdir+'/content/**/*', cfg.srcdir+'/layouts/**/*', cfg.srcdir+'/templates/**/*'];

  /**
   * Render a partial template
   * @param   {string} path
   * @param   {Object} data
   * @returns {string}
   */
  function partial(path, data) {
    data.partial = partial;
    return ejs.render(fs.readFileSync(CONTENT_SRC_DIR+'/templates/partials/'+path+'.ejs').toString(), data);
  }

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
      .use(rename([[/\.ejs$/, '.html']]))
      .use(versionify)
      .use(collections({
        atoms: {
          pattern: 'atoms/*.html',
          sortBy: 'title'
        },
        molecules: {
          pattern: 'molecules/*.html',
          sortBy: 'title'
        },
        organisms: {
          pattern: 'organisms/*.html',
          sortBy: 'title'
        },
        templates: {
          pattern: 'templates/*.html',
          sortBy: 'title'
        },
        pages: {
          pattern: 'pages/*.html',
          sortBy: 'title'
        },
        processes: {
          pattern: 'processes/*.html',
          sortBy: 'title'
        },
      }))
      .use(rootPath())
      .use(filePath({absolute: false}))
      .use(templates({engine: 'ejs', partials: './templates', pattern: '**/*.html', partial: partial}))
      .use(headings('h2'))
      .use(layouts({engine: 'ejs', directory: './layouts', default: 'index.ejs', pattern: '**/*.html'}))
      .build(done)
    ;

  });

  /*==================================
   * Watch content
   *==================================*/

  gulp.task('content.watch', function() {
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
