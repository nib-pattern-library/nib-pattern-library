import offCanvas from '@nib-components/off-canvas';
import backToTop from '@nib/back-to-top';
import './lib/forms';

offCanvas({el: document.querySelector('.js-offcanvas'), visibleClass: 'offcanvas--visible'});

backToTop({
  element: document.querySelector('.js-back-to-top'),
  hideClass: 'u-hidden',
  hideDistance: 0.25
});
