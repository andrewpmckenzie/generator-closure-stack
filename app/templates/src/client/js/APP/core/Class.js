goog.provide('$_jsNamespace_$.core.Class');

$_jsNamespace_$.core.Class = {
  /**
   * @param {Inheriting} InheritingClass
   * @param {Base} BaseClass
   * @return {undefined}
   * @template Inheriting, Base
   */
  extend: function(InheritingClass, BaseClass) {
    InheritingClass.__superconstructor__ = BaseClass;
    InheritingClass.__super__ = BaseClass.prototype;

    for (var instanceMethod in BaseClass.prototype) {
      if (! instanceMethod in InheritingClass.prototype) {
        InheritingClass.prototype[instanceMethod] = BaseClass.prototype[instanceMethod];
      }
    }

    for (var staticMethod in BaseClass) {
      if (! (staticMethod in InheritingClass) ) {
        InheritingClass[staticMethod] = BaseClass[staticMethod];
      }
    }
  }
};
