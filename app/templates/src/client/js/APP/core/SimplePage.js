goog.provide('$_jsNamespace_$.core.SimplePage');

goog.require('$_jsNamespace_$.core.Page');

/**
 * @extends {$_jsNamespace_$.core.Page}
 * @param {$_jsNamespace_$.core.Page.PageParams} options
 * @constructor
 */
$_jsNamespace_$.core.SimplePage = function(options) {
  $_jsNamespace_$.core.SimplePage.__superconstructor__.call(this, options);
};

$_jsNamespace_$.core.SimplePage.prototype = {
  template: function() { throw new Error('AbstractMethod - you need to override this'); },

  /**
   * @returns {$_jsNamespace_$.core.SimplePage}
   */
  render: function() {
    var html = this.template();
    this.$el.empty().append(html);
    return /** @type {$_jsNamespace_$.core.SimplePage} */(this.decorate());
  }
};

$_jsNamespace_$.core.Class.extend($_jsNamespace_$.core.SimplePage, $_jsNamespace_$.core.Page);
