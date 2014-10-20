goog.provide('$_jsNamespace_$.core.View');

/**
 * @constructor
 * @param {{
 *   el: (jQuery|Element|undefined)
 * }} options
 */
$_jsNamespace_$.core.View = function(options) {
  /**
   * @type {jQuery}
   */
  this.$el = $(options.el || '<div></div>');

};

$_jsNamespace_$.core.View.prototype = {

  /**
   * @return {$_jsNamespace_$.core.View}
   */
  render: function() { return this; },

  /**
   * @return {$_jsNamespace_$.core.View}
   */
  decorate: function() { return this; }
};
