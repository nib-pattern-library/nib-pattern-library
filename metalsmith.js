var Metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var templates   = require('metalsmith-templates');
var collections = require('metalsmith-collections');

var fs          = require('fs');
var p           = require('path');
var ejs         = require('ejs');
var extend      = require('extend');

module.exports  = function(done) {

  //build the static site
  Metalsmith(__dirname)
    .clean(false)
    .source('./content')
    .use(collections({pages: {pattern: 'pages/*.html'}}))
    .use(function(files, metalsmith, next) {

      for (var path in files) {

        var
          from  = p.dirname(__dirname+'/content/'+path),
          to    = __dirname+'/content'
        ;

        var relative = p.relative(from, to);
        if (relative === '') {
          relative = '.';
        } else {
          relative = relative.replace('\\', '/');
        }

        files[path].path = '/'+path;
        files[path].relativePathToRoot = relative;

      }
      next();
    })
    .use(function(files, metalsmith, next) { //parse the page content and render any partials

      function partial(path, data) {
        return ejs.render(fs.readFileSync(__dirname+'/templates/partials/'+path+'.html').toString(), {locals: data}) //TODO: handle errors
      }

      for (var path in files) {

        files[path].contents = ejs.render(
          files[path].contents.toString(),
          {
            filename: path,
            locals:   extend(files[path], { partial: partial })
          }
        );

      }

      next();
    })
    .use(templates('ejs'))
    .build(function(err, files) {
      if (err) {
        done(err);
      } else {
        done();
      }
    })
  ;

};
