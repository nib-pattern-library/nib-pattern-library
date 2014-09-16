var Metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var templates   = require('metalsmith-templates');
var permalinks  = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');

var fs          = require('fs');
var HandleBars  = require('handlebars');

HandleBars.registerPartial('page-list', String(fs.readFileSync('./templates/partials/page-list.hbt')));

Metalsmith(__dirname)
  .source('./content')
  .use(collections({pages: {pattern: 'pages/*.md'}}))
  .use(markdown())
  .use(templates('handlebars'))
  .use(permalinks({pattern: '/page/:slug'}))
  .build(function(err) {
    if (err) {
      console.log('An error occurred: ', err);
    } else {
      console.log('Your style guide iz built.');
    }
  })
;