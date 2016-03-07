import offCanvas from '@nib-components/off-canvas';
import backToTop from '@nib/back-to-top';
import hljs from 'highlight.js';
import './lib/forms';

offCanvas({el: document.querySelector('.js-offcanvas'), visibleClass: 'offcanvas--visible'});

backToTop({
  element: document.querySelector('.js-back-to-top'),
  hideClass: 'u-hidden',
  hideDistance: 0.25
});

//highlight syntax
const examples = document.querySelectorAll('.js-highlight');
hljs.configure({});
for (let i = 0; i < examples.length; ++i) {
  hljs.highlightBlock(examples[i]);
}
