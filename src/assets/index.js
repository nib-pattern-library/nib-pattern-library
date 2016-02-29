
var offCanvas = require('@nib-components/off-canvas');
var backToTop = require('@nib/back-to-top');

import Form from './lib/forms/index.js';

offCanvas({el: document.querySelector('.js-offcanvas'), visibleClass: 'offcanvas--visible'});

backToTop({
  element: document.querySelector('.js-back-to-top'),
  hideClass: 'u-hidden',
  hideDistance: 0.25
});
