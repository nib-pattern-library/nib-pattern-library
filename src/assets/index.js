
var offCanvas = require('@nib-components/off-canvas')
offCanvas({openClass: 'offcanvas--visible'})

var backToTop = require('@nib/back-to-top')
backToTop({
  element: document.querySelector('.js-back-to-top'),
  hideClass: 'u-hidden',
  hideDistance: 0.25
})
