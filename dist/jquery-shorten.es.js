/**
* jQuery shorten v0.3.2
* https://github.com/amazingSurge/jquery-shorten
*
* Copyright (c) amazingSurge
* Released under the LGPL-3.0 license
*/
import $ from 'jquery';

var DEFAULTS = {
  namespace: 'shorten',
  chars: 100,
  ellipses: '...',
  more: 'more',
  less: 'less'
};

const NAMESPACE$1 = 'shorten';

/**
 * Plugin constructor
 **/
class shorten {
  constructor(element, options) {
    this.element = element;
    this.$element = $(element);
    this.text = this.$element.text();
    this.expanded = false;

    // options
    const metas = [];

    $.each(this.$element.data(), (k, v) => {
      const re = new RegExp("^shorten", "i");
      if (re.test(k)) {
        metas[k.toLowerCase().replace(re, '')] = v;
      }
    });
    this.options = $.extend(true, {}, DEFAULTS, options, metas);

    // Namespacing
    this.namespace = this.options.namespace;

    if (this.needShorten()) {
      this._init();
    }
  }


  _init() {
    this._prepare();

    // bind event
    this.$element.on('shorten::expand', () => {
      this.expanded = true;
      this.$element.addClass(this.namespace + '_expand');
    });
    this.$element.on('shorten::collapse', () => {
      this.expanded = false;
      this.$element.removeClass(this.namespace + '_expand');
    });

    this._bindEvents();

    this._trigger('ready');
  }

  _trigger(eventType, ...params) {
    let data = [this].concat(params);

    // event
    this.$element.trigger(`${NAMESPACE$1}::${eventType}`, data);

    // callback
    eventType = eventType.replace(/\b\w+\b/g, (word) => {
      return word.substring(0, 1).toUpperCase() + word.substring(1);
    });
    let onFunction = `on${eventType}`;

    if (typeof this.options[onFunction] === 'function') {
      this.options[onFunction].apply(this, params);
    }
  }

  _prepare() {
    this.summaryText = this.text.slice(0, this.options.chars);
    this.detailText = this.text.slice(this.summaryText.length);

    this.$element.html(this.summaryText +
      this._ellipsesHtml() +
      '<span class="' + this.namespace + '-detail">' + this.detailText + '</span>' +
      this._toggleHtml()
    );
  }

  _ellipsesHtml() {
    if (this.options.ellipses) {
      return '<span class="' + this.namespace + '-ellipses">' + this.options.ellipses + '</span>';
    }
    return '';
  }

  _toggleHtml() {
    var text;
    if (this.expanded) {
      text = this.options.less;
    } else {
      text = this.options.more;
    }
    return '<a class="' + this.namespace + '-toggle" href="#">' + text + '</a>';
  }

  _bindEvents() {
    this.$toggle = this.$element.find('.' + this.namespace + '-toggle');

    const that = this;
    this.$element.on('click.shorten', '.' + this.namespace + '-toggle', function() {
      if (that.expanded) {
        that._trigger('collapse');
        $(this).html(that.options.more);
      } else {
        that._trigger('expand');
        $(this).html(that.options.less);
      }
      return false;
    });
  }

  needShorten() {
    if (this.text.length > this.options.chars) {
      return true;
    }
    return false;
  }

  text() {
    return this.text;
  }

  expand() {
    this._trigger('expand');
  }

  collapse() {
    this._trigger('collapse');
  }

  destroy() {
    this.$element.html(this.text);
    this.$element.data('shorten', null);
    this.$element.off('.shorten');
    this.$element.off('shorten::expand');
    this.$element.off('shorten::collapse');
  }

  update(text) {
    this.text = text;
    if (this.needShorten()) {
      this.prepare();
    } else {
      this.$element.html(text);
    }

    this._trigger('expand', text);
  }

  static setDefaults(options) {
    $.extend(DEFAULTS, $.isPlainObject(options) && options);
  }
}

var info = {
  version:'0.3.2'
};

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
