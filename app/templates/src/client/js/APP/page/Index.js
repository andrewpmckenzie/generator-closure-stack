goog.provide('$_jsNamespace_$.page.Index');

goog.require('$_jsNamespace_$.core.Page');
goog.require('$_jsNamespace_$.core.Router');

/**
 * @constructor
 * @extends {$_jsNamespace_$.core.Page}
 * @param {$_jsNamespace_$.core.Page.PageParams} options
 */
$_jsNamespace_$.page.Index = function(options) {
  $_jsNamespace_$.page.Index.__superconstructor__.call(this, options);
};

$_jsNamespace_$.page.Index.prototype = {
  /** @inheritDoc */
  render: function() {
    var html = $_jsNamespace_$.templates.pages.index.page();
    this.$el.empty().append(html);
  }
};

/**
 * @param {$_jsNamespace_$.core.Router.Route} route
 * @return {boolean}
 */
$_jsNamespace_$.page.Index.matchesRoute = function(route) { return route.rawPath === '/' || route.rawPath === ''; };

$_jsNamespace_$.core.Class.extend($_jsNamespace_$.page.Index, $_jsNamespace_$.core.Page);

$_jsNamespace_$.core.Router.getInstance().register($_jsNamespace_$.page.Index.matchesRoute, $_jsNamespace_$.page.Index);
