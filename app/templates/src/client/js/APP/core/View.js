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
   * @return {undefined}
   */
  render: function() { },

  /**
   * @return {undefined}
   */
  decorate: function() { }
};
