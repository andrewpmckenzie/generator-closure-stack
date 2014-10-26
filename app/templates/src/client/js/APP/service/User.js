goog.provide('$_jsNamespace_$.service.User');
goog.require('$_jsNamespace_$.core.Service');

$_jsNamespace_$.service.User = {
  /**
   * @param {{userId: string}} data
   * @param {function(Object)=} success
   * @param {function(string)=} error
   * @return {undefined}
   */
  details: function(data, success, error) {
    $_jsNamespace_$.core.Service.getInstance().get('/api/user/' + data.userId, data, success, error);
  }
};
