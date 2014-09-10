// Generated by CoffeeScript 1.6.2
/*
	Author: Taylor Baldwin (http://tbaldw.in)

	This project is meant to make it easy to add in an info panel
	on projects. If using Markdown, the Markdown.Converter.js file
	is required as a dependency (https://code.google.com/p/pagedown/wiki/PageDown).

	In the options object, you must include a container property which may be either
	a string or an HTML element. If you specify an 'el' property (which is to be the
	info element), it should reside outside of the container element.
*/


(function() {
  var Info,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Info = (function() {
    function Info(opts) {
      this.toggleInfo = __bind(this.toggleInfo, this);
      this.closeInfo = __bind(this.closeInfo, this);
      this.openInfo = __bind(this.openInfo, this);
      var MDConverter, arry, request, url,
        _this = this;

      this.opts = opts;
      this.el = opts.el || "info";
      this.btn = opts.btn || "info_btn";
      this.container = opts.container || "container";
      this.text = opts.text || null;
      this.isMarkdown = opts.isMarkdown || false;
      this.html = opts.html || null;
      this.keyTrigger = opts.keyTrigger || false;
      this.isOpen = false;
      if (typeof this.el === "string") {
        this.el = document.getElementById(this.el);
      }
      if (typeof this.container === "string") {
        this.container = document.getElementById(this.container);
      }
      if (typeof this.btn === "string") {
        this.btn = document.getElementById(this.btn);
      }
      if (this.el == null) {
        this.createDiv();
      }
      if (this.btn == null) {
        this.createButton();
      }
      this.container.className += " content_wrapper";
      this.el.className += " info_container";
      this.btn.className += " info_btn";
      if ((opts.text == null) && (this.html == null) && (opts.url != null)) {
        url = opts.url;
        arry = url.split(".");
        if (arry[arry.length - 1] === "md") {
          this.isMarkdown = true;
        }
        request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.responseType = "text";
        request.onload = function() {
          _this.text = request.response;
          return _this.setup();
        };
        request.send();
        this.loadingFromFile = true;
      }
      if (this.isMarkdown) {
        MDConverter = window.Markdown.Converter || window.pagedown.Converter;
        this.converter = new MDConverter();
      }
      if (this.loadingFromFile !== true) {
        this.setup();
      }
    }

    Info.prototype.setup = function() {
      if (this.html == null) {
        this.html = this.text;
      }
      if (this.isMarkdown) {
        this.html = this.converter.makeHtml(this.text);
      }
      if (this.html != null) {
        this.el.innerHTML = this.html;
      }
      return this.attachEvents();
    };

    Info.prototype.createDiv = function() {
      this.el = document.createElement('div');
      this.el.id = "info";
      return document.body.appendChild(this.el);
    };

    Info.prototype.createButton = function() {
      this.btn = document.createElement('div');
      this.btn.id = "info_btn";
      this.btn.innerHTML = "info";
      return this.container.appendChild(this.btn);
    };

    Info.prototype.attachEvents = function() {
      var _this = this;

      this.btn.addEventListener("click", this.toggleInfo);
      if (this.keyTrigger) {
        return document.addEventListener("keyup", function(e) {
          if (e.which === 73) {
            return _this.toggleInfo();
          }
        });
      }
    };

    Info.prototype.openInfo = function() {
      this.el.className += " open";
      this.container.className += " inactive";
      return this.isOpen = true;
    };

    Info.prototype.closeInfo = function() {
      this.el.className = this.el.className.replace("open", "");
      this.container.className = this.container.className.replace("inactive", "");
      return this.isOpen = false;
    };

    Info.prototype.toggleInfo = function() {
      if (!this.isOpen) {
        return this.openInfo();
      } else {
        return this.closeInfo();
      }
    };

    return Info;

  })();

  window.Info = Info;

}).call(this);
