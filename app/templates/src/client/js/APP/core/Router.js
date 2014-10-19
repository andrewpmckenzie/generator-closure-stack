goog.provide('$_jsNamespace_$.core.Router');

/**
 * @constructor
 */
$_jsNamespace_$.core.Router = function() {
  /**
   * @private
   * @type {Array.<{routeMatcher: function($_jsNamespace_$.core.Router.Route):boolean, page: $_jsNamespace_$.core.Router.PageConstructor}>}
   */
  this.pages_ = [];

  /**
   * @private
   * @type {jQuery|null}
   */
  this.$page_ = null;

  /**
   * @private
   * @type {$_jsNamespace_$.core.Page|null}
   */
  this.currentPage_ = null;
};

$_jsNamespace_$.core.Router.prototype = {
  /**
   * @param {jQuery} $page
   * @return {undefined}
   */
  start: function($page) {
    this.$page_ = $page;
    this.loadPageFromUrl_();

    $(window).on('popstate', this.loadPageFromUrl_.bind(this));
    $(window).on('click', 'a[href]', function(e) {
      var $el = $(e.currentTarget);
      var href = $el.prop('href');
      if (/^\//.test(href) && !e.metaKey) {
        e.preventDefault();
        this.loadUrl(href);
      }
    }.bind(this));
  },

  /**
   * @param {function($_jsNamespace_$.core.Router.Route): boolean} routeMatcher
   * @param {$_jsNamespace_$.core.Router.PageConstructor} page
   * @return {undefined}
   */
  register: function(routeMatcher, page) {
    this.pages_.push({routeMatcher: routeMatcher, page: page});
  },

  /**
   * @param {string} url
   * @return {undefined}
   */
  loadUrl: function(url) {
    var route = this.extractRoute_(url);
    var Page = _.find(this.pages_, function(page) { return page.routeMatcher(route); });

    if (Page) {
      this.currentPage_ = new Page.page({ el: this.$page_, route: route });
      this.currentPage_.render();
    } else {
      throw new Error('Could not find page that matches route', route);
    }
  },

  /**
   * @private
   * @return {undefined}
   */
  loadPageFromUrl_: function() {
    var url = window.location.pathname + window.location.search;
    this.loadUrl(url);
  },

  /**
   * @private
   * @param {string} url
   * @return {$_jsNamespace_$.core.Router.Route}
   */
  extractRoute_: function(url) {
    var components = url.split('?');
    var rawPath = components[0];
    var path = rawPath.split('/');
    var params = {};
    if (components[1]) {
      var splitParams = components[1].split('&');
      _.each(splitParams, function (paramPair) {
        var splitPair = paramPair.split('=');
        params[splitPair[0]] = (splitPair[1] || '');
      });
    }

    return {
      rawPath: rawPath,
      path: path,
      params: params
    }
  }
};

/* ----------------------------------------------------------------------------------------------- Static methods --- */

/**
 * @private
 * @type {$_jsNamespace_$.core.Router}
 */
$_jsNamespace_$.core.Router.instance_ = null;

/**
 * @return {$_jsNamespace_$.core.Router}
 */
$_jsNamespace_$.core.Router.getInstance = function() {
  if (! $_jsNamespace_$.core.Router.instance_) {
    $_jsNamespace_$.core.Router.instance_ = new $_jsNamespace_$.core.Router();
  }

  return $_jsNamespace_$.core.Router.instance_;
};

/**
 * @param {jQuery} $page
 * @return {undefined}
 */
$_jsNamespace_$.core.Router.init = function($page) {
  $_jsNamespace_$.core.Router.getInstance().start($page);
};

/* ----------------------------------------------------------------------------------------- Types and Interfaces --- */

/**
 * @typedef {{
 *   rawPath: string,
 *   path: Array.<string>,
 *   params: Object.<string, string>
 * }}
 */
$_jsNamespace_$.core.Router.Route;

/**
 * @typedef {function(new:$_jsNamespace_$.core.Page, {el: jQuery, route: $_jsNamespace_$.core.Router.Route})}
 */
$_jsNamespace_$.core.Router.PageConstructor;

/* -------------------------------------------------------------------------------------- Advanced compile export --- */
window['$_jsNamespace_$'] = window['$_jsNamespace_$'] || {};
window['$_jsNamespace_$']['core'] = window['$_jsNamespace_$']['core'] || {};
window['$_jsNamespace_$']['core']['Router'] = $_jsNamespace_$.core.Router;
window['$_jsNamespace_$']['core']['Router']['init'] = $_jsNamespace_$.core.Router.init;
