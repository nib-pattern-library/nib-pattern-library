
// === create in-page component navigation ===

//create a list of component anchors
var anchors = [];
var sections = document.querySelectorAll('section.guide-component');
for (var i=0; i<sections.length; ++i) {
  anchors.push({
    name: sections[i].querySelector('.guide-component__title').innerHTML,
    slug: sections[i].getAttribute('id')
  });
}

//render the template data
var rendered = Mustache.render(require('./templates/in-page-navigation.html'), {components: anchors});
console.log(rendered);
//replace the template in the document
var nav = document.querySelector('.js-in-page-nav');
nav.innerHTML = rendered;



