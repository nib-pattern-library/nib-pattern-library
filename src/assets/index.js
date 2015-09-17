var backToTop = require('@nib/back-to-top')
require('./lib/navigation')

backToTop({
  element: document.querySelector('.js-back-to-top'),
  hideClass: 'u-hidden',
  hideDistance: 0.25
})
