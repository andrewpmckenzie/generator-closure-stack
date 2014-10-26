goog.provide('$_jsNamespace_$.page.index.UserInformationView');
goog.require('$_jsNamespace_$.core.View');

/**
 * @constructor
 * @extends {$_jsNamespace_$.core.View}
 * @param {{el: jQuery}} options
 */
$_jsNamespace_$.page.index.UserInformationView = function(options) {
  $_jsNamespace_$.page.index.UserInformationView.__superconstructor__.call(this, options);
};

$_jsNamespace_$.page.index.UserInformationView.prototype = {
  /**
   * @return {$_jsNamespace_$.page.index.UserInformationView}
   */
  decorate: function() {
    $_jsNamespace_$.page.index.UserInformationView.__super__.decorate.call(this);
    this.$el.find('.submit').click(_.bind(this.loadUser_, this));
    return this;
  },

  /**
   * @private
   * @return {undefined}
   */
  loadUser_: function() {
    var userId = /** @type {string} */(this.$el.find('.userId').val());
    $_jsNamespace_$.service.User.details({userId: userId}, _.bind(this.userLoaded_, this))
  },

  /**
   * @private
   * @param {Object} user
   */
  userLoaded_: function(user) {
    this.$el.find('.result').empty().text(JSON.stringify(user));
  }
};

$_jsNamespace_$.core.Class.extend($_jsNamespace_$.page.index.UserInformationView, $_jsNamespace_$.core.View);
