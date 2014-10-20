goog.provide('$_jsNamespace_$.page.About');

goog.require('$_jsNamespace_$.core.SimplePage');
goog.require('$_jsNamespace_$.core.Router');

/**
 * @constructor
 * @extends {$_jsNamespace_$.core.SimplePage}
 * @param {$_jsNamespace_$.core.Page.PageParams} options
 */
$_jsNamespace_$.page.About = function(options) {
  $_jsNamespace_$.page.About.__superconstructor__.call(this, options);
};

$_jsNamespace_$.page.About.prototype = {
  /** @inheritDoc */
  template: $_jsNamespace_$.templates.pages.about.page
};

/**
 * @param {$_jsNamespace_$.core.Router.Route} route
 * @return {boolean}
 */
$_jsNamespace_$.page.About.matchesRoute = function(route) { return route.rawPath === '/about'; };

$_jsNamespace_$.core.Class.extend($_jsNamespace_$.page.About, $_jsNamespace_$.core.SimplePage);

$_jsNamespace_$.core.Router.getInstance().register($_jsNamespace_$.page.About.matchesRoute, $_jsNamespace_$.page.About);
