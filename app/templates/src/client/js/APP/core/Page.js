goog.provide('$_jsNamespace_$.core.Page');

goog.require('$_jsNamespace_$.core.View');

/**
 * @extends {$_jsNamespace_$.core.View}
 * @constructor
 * @param {$_jsNamespace_$.core.Page.PageParams} options
 */
$_jsNamespace_$.core.Page = function(options) {
  $_jsNamespace_$.core.Page.__superconstructor__.call(this, options);

  /**
   * @protected
   * @type {$_jsNamespace_$.core.Router.Route}
   */
  this.route_ = options.route;
};

$_jsNamespace_$.core.Page.prototype = {
  render: function() { throw new Error('AbstractMethod - you need to override this'); }
};

/**
 * @param {$_jsNamespace_$.core.Router.Route} route
 * @return {boolean}
 */
$_jsNamespace_$.core.Page.matchesRoute = function(route) { throw new Error('AbstractMethod - you need to override this'); };

/**
 * @typedef {{
 *   el: jQuery,
 *   route: $_jsNamespace_$.core.Router.Route
 * }}
 */
$_jsNamespace_$.core.Page.PageParams;

$_jsNamespace_$.core.Class.extend($_jsNamespace_$.core.Page, $_jsNamespace_$.core.View);
