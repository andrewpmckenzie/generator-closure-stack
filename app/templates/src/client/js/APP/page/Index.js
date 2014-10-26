goog.provide('$_jsNamespace_$.page.Index');

goog.require('$_jsNamespace_$.core.SimplePage');
goog.require('$_jsNamespace_$.core.Router');

/**
 * @constructor
 * @extends {$_jsNamespace_$.core.SimplePage}
 * @param {$_jsNamespace_$.core.Page.PageParams} options
 */
$_jsNamespace_$.page.Index = function(options) {
  $_jsNamespace_$.page.Index.__superconstructor__.call(this, options);

  /**
   * @private
   * @type {$_jsNamespace_$.page.index.UserInformationView|null}
   */
  this.userInformationView_ = null;
};

$_jsNamespace_$.page.Index.prototype = {
  /** @inheritDoc */
  template: $_jsNamespace_$.templates.pages.index.page,

  /** @inheritDoc */
  decorate: function() {
    $_jsNamespace_$.page.Index.__super__.decorate.call(this);

    this.userInformationView_ = new $_jsNamespace_$.page.index.UserInformationView({
      el: this.$el.find('.userInformation')
    }).decorate();

    return this;
  }
};

/**
 * @param {$_jsNamespace_$.core.Router.Route} route
 * @return {boolean}
 */
$_jsNamespace_$.page.Index.matchesRoute = function(route) { return route.rawPath === '/' || route.rawPath === ''; };

$_jsNamespace_$.core.Class.extend($_jsNamespace_$.page.Index, $_jsNamespace_$.core.SimplePage);

$_jsNamespace_$.core.Router.getInstance().register($_jsNamespace_$.page.Index.matchesRoute, $_jsNamespace_$.page.Index);
