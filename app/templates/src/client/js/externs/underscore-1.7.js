/**
 * @param {Object|number} obj
 * @return {!_}
 * @constructor
 */
function _(obj) { };

/**
 * @param {Array.<T>} arr
 * @param {function(T):boolean} matcher
 * @return {T|undefined}
 * @template T
 */
_.find = function(arr, matcher) { };

/**
 * @param {Array.<T>} arr
 * @param {function(T)} iterator
 * @return {undefined}
 * @template T
 */
_.each = function(arr, iterator) { };

/**
 * @param {Function} fct
 * @param {T} context
 * @return {function(this:T)}
 * @template T
 * @suppress {checkTypes}
 */
_.bind = function(fct, context) { };
