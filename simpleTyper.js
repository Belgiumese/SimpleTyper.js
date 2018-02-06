//Written by https://github.com/Belgiumese
'use strict';

(function(factory) {
  if (typeof define === 'function' && define.amd) {
    //AMD support
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    //NodeJS & CommonJS support
    module.exports = factory(require('jquery'));
  } else if (jQuery) {
    //No module loaders
    window.typer = factory(jQuery);
  } else {
    console.log('Could not detect jQuery. Exiting.');
  }
})(function($) {
  //Always return api to allow method chaining.
  var options = {
      speed: 100,
      cursorSpeed: 500,
      cursorStopDelay: 1000,
      delay: 0,
      random: 0.1
    },

    api = {
      init: function init() {
        $('.typer').each(function(i, element) {
          var typerText = TyperText($(element));
          typerText.id = typerTexts.length;
          typerText.elem.attr('data-typer-id', typerText.id);
          typerTexts.push(typerText);
        });
        return api;
      },
      startAll: function startAll() {
        for (var i = 0; i < typerTexts.length; i++) {
          typerTexts[i].startType();
        }
        return api;
      },
      settings: function setting(optionsIn) {
        $.extend(options, optionsIn);
        return api;
      },
      start: function start(elem) {
        typerTexts[$(elem).attr('data-typer-id')].startType();
        return api;
      },
      stop: function stop(elem) {
        typerTexts[$(elem).attr('data-typer-id')].stopType();
        return api;
      }
    },
    typerTexts = [];

  var elemProto = {
    chars: 0,
    text: '',
    textTimer: undefined,
    cursorTimer: undefined,

    startType: function startType() {
      this.startCursor();
      setTimeout(keepScope(this, this.type), this.settings.delay);
    },

    type: function type() {
      this.chars++;
      this.elem.text(this.text.slice(0, this.chars + 1));
      if (this.chars <= this.text.length) {
        var typeTime = this.settings.speed + (Math.random() - 0.5) * this.settings.random;
        this.textTimer = setTimeout(keepScope(this, this.type), typeTime);
      } else {
        setTimeout(keepScope(this, this.stopCursor), this.settings.cursorStopDelay);
      }
    },

    startCursor: function startCursor() {
      var obj = this;
      this.cursorTimer = setInterval(function() {
        obj.elem.toggleClass('typeCursor');
      }, this.settings.cursorSpeed);
    },

    stopCursor: function stopCursor() {
      clearInterval(this.cursorTimer);
      this.elem.removeClass('typeCursor');
    },

    stopType: function stopType() {
      clearTimeout(this.textTimer);
      this.stopCursor();
    }
  };

  function keepScope(scope, func) {
    return function() {
      func.call(scope);
    };
  }

  function TyperText(elem) {
    var instance = Object.create(elemProto);
    instance.settings = options;
    instance.elem = elem;
    instance.text = instance.elem.attr('data-typer-text') || '';
    for (var property in instance.settings) {
      var newProperty = instance.elem.attr('data-typer-' + property);
      if (newProperty) {
        instance.settings[property] = parseInt(newProperty, 10);
      }
    }
    return instance;
  }

  return api;
});