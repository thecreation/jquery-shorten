/*! jQuery shorten - v0.2.0 - 2013-07-17
* https://github.com/amazingsurge/jquery-shorten
* Copyright (c) 2013 amazingsurge; Licensed MIT */
(function(window, document, $, undefined) {
  "use strict";

  // Constructor
  var Shorten = function(element, options) {
    // Attach element to the 'this' keyword
    this.element = element;
    this.$element = $(element);
    this.text = this.$element.text();
    this.expanded = false;

    // options
    var meta_data = [];
    $.each(this.$element.data(), function(k, v) {
      var re = new RegExp("^shorten", "i");
      if (re.test(k)) {
        meta_data[k.toLowerCase().replace(re, '')] = v;
      }
    });
    this.options = $.extend(true, {}, Shorten.defaults, options, meta_data);

    // Namespacing
    this.namespace = this.options.namespace;

    var self = this;
    $.extend(self, {
      init: function() {
        this.prepare();

        // bind event
        self.$element.on('shorten:expand', function() {
          self.expanded = true;
          self.$element.addClass(self.namespace + '_expand');
        });
        self.$element.on('shorten:collapse', function() {
          self.expanded = false;
          self.$element.removeClass(self.namespace + '_expand');
        });

        this.toggle.bind();
      },
      prepare: function() {
        self.summaryText = self.text.slice(0, self.options.chars);
        self.detailText = self.text.slice(self.summaryText.length);

        self.$element.html(self.summaryText +
          this.ellipses.html() +
          '<span class="' + self.namespace + '-detail">' + self.detailText + '</span>' +
          this.toggle.html()
        );
      },
      ellipses: {
        html: function() {
          if (self.options.ellipses) {
            return '<span class="' + self.namespace + '-ellipses">' + self.options.ellipses + '</span>';
          } else {
            return '';
          }
        }
      },
      toggle: {
        html: function() {
          var text;
          if (self.expanded) {
            text = self.options.less;
          } else {
            text = self.options.more;
          }
          return '<a class="' + self.namespace + '-toggle" href="#">' + text + '</a>';
        },
        bind: function() {
          self.$toggle = self.$element.find('.' + self.namespace + '-toggle');

          self.$element.on('click.shorten', '.' + self.namespace + '-toggle', function() {
            if (self.expanded) {
              self.$element.trigger('shorten:collapse');
              $(this).html(self.options.more);
            } else {
              self.$element.trigger('shorten:expand');
              $(this).html(self.options.less);
            }
            return false;
          });
        }
      },
      needShorten: function() {
        if (this.text.length > this.options.chars) {
          return true;
        } else {
          return false;
        }
      }
    });

    if (self.needShorten()) {
      self.init();
    }
  };

  // Default options
  Shorten.defaults = {
    chars: 100,
    ellipses: '...',
    more: 'more',
    less: 'less',
    namespace: 'shorten'
  };

  Shorten.prototype = {
    constructor: Shorten,

    text: function() {
      return this.text;
    },
    expand: function() {
      this.$element.trigger('shorten:expand');
    },
    collapse: function() {
      this.$element.trigger('shorten:collapse');
    },
    destroy: function() {
      this.$element.html(this.text);
      this.$element.data('shorten', null);
      this.$element.off('.shorten');
      this.$element.off('shorten:expand');
      this.$element.off('shorten:collapse');
    },
    update: function(text) {
      this.text = text;
      if (this.needShorten()) {
        this.prepare();
      } else {
        this.$element.html(text);
      }
    }
  };

  // Collection method.
  $.fn.shorten = function(options) {
    if (typeof options === 'string') {
      var method = options;
      var method_arguments = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : undefined;

      return this.each(function() {
        var api = $.data(this, 'shorten');
        if (api && typeof api[method] === 'function') {
          api[method].apply(api, method_arguments);
        }
      });
    } else {
      return this.each(function() {
        var api = $.data(this, 'shorten');
        if (!api) {
          api = new Shorten(this, options);
          $.data(this, 'shorten', api);
        }
      });
    }
  };
}(window, document, jQuery));
