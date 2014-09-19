var Metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var templates   = require('metalsmith-templates');
var collections = require('metalsmith-collections');

var fs          = require('fs');
var p           = require('path');
var Handlebars  = require('handlebars');

module.exports  = function(done) {

  /**
   * Registers a partial template
   * @param   {String} name
   */
  function registerPartialTemplate(name) {
    Handlebars.registerPartial(name, String(fs.readFileSync('./templates/partials/'+name+'.hbt')));
  }

  //register partial templates
  registerPartialTemplate('header');
  registerPartialTemplate('footer');
  registerPartialTemplate('page-list');

  //build the static site
  Metalsmith(__dirname)
    .clean(false)
    .source('./content')
    .use(collections({pages: {pattern: 'pages/*.md'}}))
    .use(markdown())
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
    .use(templates('handlebars'))
    .build(function(err, files) {
      if (err) {
        done(err);
      } else {
        done();
      }
    })
  ;

};
