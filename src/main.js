import $ from 'jquery';
import shorten from './shorten';
import info from './info';

const NAMESPACE = 'shorten';
const OtherAsShorten = $.fn.shorten;

const jQueryShorten = function(options, ...args) {
  if (typeof options === 'string') {
    const method = options;

    if (/^_/.test(method)) {
      return false;
    } else if ((/^(get)/.test(method))) {
      const instance = this.first().data(NAMESPACE);
      if (instance && typeof instance[method] === 'function') {
        return instance[method](...args);
      }
    } else {
      return this.each(function() {
        const instance = $.data(this, NAMESPACE);
        if (instance && typeof instance[method] === 'function') {
          instance[method](...args);
        }
      });
    }
  }

  return this.each(function() {
    if (!$(this).data(NAMESPACE)) {
      $(this).data(NAMESPACE, new shorten(this, options));
    }
  });
};

$.fn.shorten = jQueryShorten;

$.shorten = $.extend({
  setDefaults: shorten.setDefaults,
  noConflict: function() {
    $.fn.shorten = OtherAsShorten;
    return jQueryShorten;
  }
}, info);
