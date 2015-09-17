var throttle = require('throttleit')

/**
 * Find an element by selector
 * @param   {HTMLDocument|HTMLElement}  parent
 * @param   {HTMLElement|string}        selector
 * @returns {HTMLElement}
 */
function findEl (parent, selector) {
  if (typeof selector === 'string') {
    selector = parent.querySelector(selector)
  }
  return selector
}

/**
 * Off-canvas component
 * @constructor
 * @param   {Object}              options
 * @param   {HTMLElement}         options.el
 * @param   {HTMLElement|string}  options.canvas
 * @param   {HTMLElement|string}  [options.trigger]
 * @param   {string}              [options.className]
 *
 */
function OffCanvas (options) {
  this.className = options.className || 'is-open'

  this.el = findEl(document, options.el || '.js-offcanvas')
  if (!this.el) throw new Error('offcanvas: Element not found')

  this.triggerEl = findEl(this.el, options.triggerEl || '.js-offcanvas-trigger')
  this.canvasEl = findEl(this.el, options.canvasEl || '.js-offcanvas-canvas')
  if (!this.canvasEl) throw new Error('offcanvas: Canvas element not found')

  this.onToggled = this.onToggled.bind(this)
  this.onWindowResizedThrottled = throttle(this.onWindowResized.bind(this))

  this.close()
}

OffCanvas.prototype = {

  /**
   * Show the off-canvas content
   * @returns {OffCanvas}
   */
  open: function () { // TODO: disable while transition is happening
    this.el.classList.add(this.className)
    window.addEventListener('resize', this.onWindowResizedThrottled)
    if (this.triggerEl) this.triggerEl.removeEventListener('click', this.onToggled)
    this.canvasEl.addEventListener('click', this.onToggled)
    return this
  },

  /**
   * Hide the off-canvas content
   * @returns {OffCanvas}
   */
  close: function () { // TODO: disable while transition is happening
    this.el.classList.remove(this.className)
    window.removeEventListener('resize', this.onWindowResizedThrottled)
    if (this.triggerEl) this.triggerEl.addEventListener('click', this.onToggled)
    this.canvasEl.removeEventListener('click', this.onToggled)
    return this
  },

  /**
   * Toggle the visibility of the off-canvas content
   * @returns {OffCanvas}
   */
  toggle: function () {
    if (this.el.classList.contains(this.className)) {
      this.close()
    } else {
      this.open()
    }
    return this
  },

  /**
   * Handle user events
   * @param event
   */
  onToggled: function (event) {
    event.stopPropagation()
    this.toggle()
  },

  /**
   * Handle user events
   * @param event
   */
  onWindowResized: function (event) {
    this.close()
  }

}

var offcanvas = new OffCanvas({className: 'offcanvas--visible'})
offcanvas.close()
