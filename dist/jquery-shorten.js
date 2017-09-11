/**
* jQuery shorten v0.3.2
* https://github.com/amazingSurge/jquery-shorten
*
* Copyright (c) amazingSurge
* Released under the LGPL-3.0 license
*/
(function(global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(require('jquery'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.jQuery);
    global.jqueryShortenEs = mod.exports;
  }
})(this, function(_jquery) {
  'use strict';

  var _jquery2 = _interopRequireDefault(_jquery);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule
      ? obj
      : {
          default: obj
        };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }

  var _createClass = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function(Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();

  var DEFAULTS = {
    namespace: 'shorten',
    chars: 100,
    ellipses: '...',
    more: 'more',
    less: 'less'
  };

  var NAMESPACE$1 = 'shorten';

  /**
   * Plugin constructor
   **/

  var shorten = (function() {
    function shorten(element, options) {
      _classCallCheck(this, shorten);

      this.element = element;
      this.$element = (0, _jquery2.default)(element);
      this.text = this.$element.text();
      this.expanded = false;

      // options
      var metas = [];

      _jquery2.default.each(this.$element.data(), function(k, v) {
        var re = new RegExp('^shorten', 'i');
        if (re.test(k)) {
          metas[k.toLowerCase().replace(re, '')] = v;
        }
      });
      this.options = _jquery2.default.extend(
        true,
        {},
        DEFAULTS,
        options,
        metas
      );

      // Namespacing
      this.namespace = this.options.namespace;

      if (this.needShorten()) {
        this._init();
      }
    }

    _createClass(
      shorten,
      [
        {
          key: '_init',
          value: function _init() {
            var _this = this;

            this._prepare();

            // bind event
            this.$element.on('shorten::expand', function() {
              _this.expanded = true;
              _this.$element.addClass(_this.namespace + '_expand');
            });
            this.$element.on('shorten::collapse', function() {
              _this.expanded = false;
              _this.$element.removeClass(_this.namespace + '_expand');
            });

            this._bindEvents();

            this._trigger('ready');
          }
        },
        {
          key: '_trigger',
          value: function _trigger(eventType) {
            for (
              var _len = arguments.length,
                params = Array(_len > 1 ? _len - 1 : 0),
                _key = 1;
              _key < _len;
              _key++
            ) {
              params[_key - 1] = arguments[_key];
            }

            var data = [this].concat(params);

            // event
            this.$element.trigger(NAMESPACE$1 + '::' + eventType, data);

            // callback
            eventType = eventType.replace(/\b\w+\b/g, function(word) {
              return word.substring(0, 1).toUpperCase() + word.substring(1);
            });
            var onFunction = 'on' + eventType;

            if (typeof this.options[onFunction] === 'function') {
              this.options[onFunction].apply(this, params);
            }
          }
        },
        {
          key: '_prepare',
          value: function _prepare() {
            this.summaryText = this.text.slice(0, this.options.chars);
            this.detailText = this.text.slice(this.summaryText.length);

            this.$element.html(
              this.summaryText +
                this._ellipsesHtml() +
                '<span class="' +
                this.namespace +
                '-detail">' +
                this.detailText +
                '</span>' +
                this._toggleHtml()
            );
          }
        },
        {
          key: '_ellipsesHtml',
          value: function _ellipsesHtml() {
            if (this.options.ellipses) {
              return (
                '<span class="' +
                this.namespace +
                '-ellipses">' +
                this.options.ellipses +
                '</span>'
              );
            }
            return '';
          }
        },
        {
          key: '_toggleHtml',
          value: function _toggleHtml() {
            var text;
            if (this.expanded) {
              text = this.options.less;
            } else {
              text = this.options.more;
            }
            return (
              '<a class="' +
              this.namespace +
              '-toggle" href="#">' +
              text +
              '</a>'
            );
          }
        },
        {
          key: '_bindEvents',
          value: function _bindEvents() {
            this.$toggle = this.$element.find('.' + this.namespace + '-toggle');

            var that = this;
            this.$element.on(
              'click.shorten',
              '.' + this.namespace + '-toggle',
              function() {
                if (that.expanded) {
                  that._trigger('collapse');
                  (0, _jquery2.default)(this).html(that.options.more);
                } else {
                  that._trigger('expand');
                  (0, _jquery2.default)(this).html(that.options.less);
                }
                return false;
              }
            );
          }
        },
        {
          key: 'needShorten',
          value: function needShorten() {
            if (this.text.length > this.options.chars) {
              return true;
            }
            return false;
          }
        },
        {
          key: 'text',
          value: function text() {
            return this.text;
          }
        },
        {
          key: 'expand',
          value: function expand() {
            this._trigger('expand');
          }
        },
        {
          key: 'collapse',
          value: function collapse() {
            this._trigger('collapse');
          }
        },
        {
          key: 'destroy',
          value: function destroy() {
            this.$element.html(this.text);
            this.$element.data('shorten', null);
            this.$element.off('.shorten');
            this.$element.off('shorten::expand');
            this.$element.off('shorten::collapse');
          }
        },
        {
          key: 'update',
          value: function update(text) {
            this.text = text;
            if (this.needShorten()) {
              this.prepare();
            } else {
              this.$element.html(text);
            }

            this._trigger('expand', text);
          }
        }
      ],
      [
        {
          key: 'setDefaults',
          value: function setDefaults(options) {
            _jquery2.default.extend(
              DEFAULTS,
              _jquery2.default.isPlainObject(options) && options
            );
          }
        }
      ]
    );

    return shorten;
  })();

  var info = {
    version: '0.3.2'
  };

  var NAMESPACE = 'shorten';
  var OtherAsShorten = _jquery2.default.fn.shorten;

  var jQueryShorten = function jQueryShorten(options) {
    for (
      var _len2 = arguments.length,
        args = Array(_len2 > 1 ? _len2 - 1 : 0),
        _key2 = 1;
      _key2 < _len2;
      _key2++
    ) {
      args[_key2 - 1] = arguments[_key2];
    }

    if (typeof options === 'string') {
      var method = options;

      if (/^_/.test(method)) {
        return false;
      } else if (/^(get)/.test(method)) {
        var instance = this.first().data(NAMESPACE);
        if (instance && typeof instance[method] === 'function') {
          return instance[method].apply(instance, args);
        }
      } else {
        return this.each(function() {
          var instance = _jquery2.default.data(this, NAMESPACE);
          if (instance && typeof instance[method] === 'function') {
            instance[method].apply(instance, args);
          }
        });
      }
    }

    return this.each(function() {
      if (!(0, _jquery2.default)(this).data(NAMESPACE)) {
        (0, _jquery2.default)(this).data(NAMESPACE, new shorten(this, options));
      }
    });
  };

  _jquery2.default.fn.shorten = jQueryShorten;

  _jquery2.default.shorten = _jquery2.default.extend(
    {
      setDefaults: shorten.setDefaults,
      noConflict: function noConflict() {
        _jquery2.default.fn.shorten = OtherAsShorten;
        return jQueryShorten;
      }
    },
    info
  );
});
