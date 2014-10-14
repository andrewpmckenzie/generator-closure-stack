/** @suppress {duplicate} */
var $_jsNamespace_$ = $_jsNamespace_$ || {};
$_jsNamespace_$.core = $_jsNamespace_$.core || {};

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
