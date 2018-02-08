//Written by https://github.com/Belgiumese

(function(factory) {
  if (typeof define === 'function' && define.amd) {
    //AMD support
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    //NodeJS & CommonJS support
    module.exports = factory(require('jquery'));
  } else if (jQuery) {
    //No module loaders
    window.simpleTyper = factory(jQuery);
  } else {
    console.log('Could not detect jQuery. Exiting.');
  }
})(function($) {
  'use strict';
  //Default settings, can be overwritten with .settings()
  var options = {
      speed: 100,
      cursorSpeed: 500,
      cursorStopDelay: 1000,
      delay: 0,
      random: 0.1
    },

    //Always return api to allow method chaining.
    api = {
      //Find all relevant elements and initialise them
      init: function init() {
        $('.simpleTyper').each(function(i, element) {
          var typerText = TyperText($(element));
          typerText.id = typerTexts.length;
          typerText.elem.attr('data-typer-id', typerText.id);
          typerTexts.push(typerText);
        });
        return api;
      },
      //Begin the animation on all elements
      startAll: function startAll() {
        for (var i = 0; i < typerTexts.length; i++) {
          typerTexts[i].startType();
        }
        return api;
      },
      //Change the default settings
      settings: function setting(optionsIn) {
        $.extend(options, optionsIn);
        return api;
      },
      //Start on a specific element
      start: function start(elem) {
        typerTexts[$(elem).attr('data-typer-id')].startType();
        return api;
      },
      //Stop a specific element
      stop: function stop(elem) {
        typerTexts[$(elem).attr('data-typer-id')].stopType();
        return api;
      }
    },
    typerTexts = [];

  //Prototype to extend for each instance
  var elemProto = {
    chars: 0,
    text: '',
    textTimer: undefined,
    cursorTimer: undefined,
    settings: {},

    //Initialise the typing animation
    startType: function startType() {
      this.startCursor();
      setTimeout(keepScope(this, this.type), this.settings.delay);
    },
    //Recursive function that types a character
    type: function type() {
      this.chars++;
      this.elem.text(this.text.slice(0, this.chars + 1));
      if (this.chars <= this.text.length) {
        var typeTime = this.settings.speed * (this.settings.random * (Math.random() - 0.5) + 1);
        this.textTimer = setTimeout(keepScope(this, this.type), typeTime);
      } else {
        setTimeout(keepScope(this, this.stopCursor), this.settings.cursorStopDelay);
      }
    },
    //Initialise the cursor animation toggle
    startCursor: function startCursor() {
      var obj = this;
      obj.elem.toggleClass('simpleTyperCursor');
      this.cursorTimer = setInterval(function() {
        obj.elem.toggleClass('simpleTyperCursor');
      }, this.settings.cursorSpeed);
    },
    //Stop the cursor animation toggle
    stopCursor: function stopCursor() {
      clearInterval(this.cursorTimer);
      this.elem.removeClass('simpleTyperCursor');
    },
    //Stop the animation completely (instantly)
    stopType: function stopType() {
      clearTimeout(this.textTimer);
      this.stopCursor();
    }
  };
  //Fix bugs around 'this' being undefined
  function keepScope(scope, func) {
    return function() {
      func.call(scope);
    };
  }
  //Create a new instance of TyperText
  function TyperText(elem) {
    var instance = Object.create(elemProto);
    instance.settings = $.extend({}, options);
    instance.elem = elem;
    instance.text = instance.elem.attr('data-typer-text') || '';
    for (var property in instance.settings) {
      var newProperty = parseFloat(instance.elem.attr('data-typer-' + property));
      if (newProperty) {
        instance.settings[property] = newProperty;
      }
    }
    return instance;
  }

  return api;
});