goog.provide('$_jsNamespace_$.core.Service');

/**
 * @constructor
 */
$_jsNamespace_$.core.Service = function() {

};

$_jsNamespace_$.core.Service.prototype = {
  /**
   * @param {string} url
   * @param {Object} data
   * @param {function(Object)=} success
   * @param {function(string)=} error
   * @param {$_jsNamespace_$.core.Service.Options=} options
   * @return {undefined}
   */
  post: function(url, data, success, error, options) {
    this.request_('POST', url, data, success, error, options);
  },

  /**
   * @param {string} url
   * @param {Object} data
   * @param {function(Object)=} success
   * @param {function(string)=} error
   * @param {$_jsNamespace_$.core.Service.Options=} options
   * @return {undefined}
   */
  get: function(url, data, success, error, options) {
    this.request_('GET', url, data, success, error, options);
  },

  /**
   * @private
   * @param {string} type
   * @param {string} url
   * @param {Object} data
   * @param {function(Object)=} success
   * @param {function(string)=} error
   * @param {$_jsNamespace_$.core.Service.Options=} options
   * @return {undefined}
   */
  request_: function(type, url, data, success, error, options) {
    $.ajax({
      url: url,
      data: data,
      type: type,
      success: success,
      error: error,
      dataType: 'json'
    });
  }
};

/**
 * @private
 * @type {$_jsNamespace_$.core.Service|null}
 */
$_jsNamespace_$.core.Service.instance_ = null;

/**
 * @return {$_jsNamespace_$.core.Service}
 */
$_jsNamespace_$.core.Service.getInstance = function() {
  if (!$_jsNamespace_$.core.Service.instance_) {
    $_jsNamespace_$.core.Service.instance_ = new $_jsNamespace_$.core.Service();
  }

  return $_jsNamespace_$.core.Service.instance_;
};

/**
 * Options to control requests. They don't do anything at the moment, but
 * could come in useful e.g. if you were to implement response caching
 * {noCache: boolean, invalidateCache: boolean}.
 *
 * @typedef {null}
 */
$_jsNamespace_$.core.Service.Options;
