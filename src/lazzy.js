
function Lazzy (els, settings) {
  this.els = els;
  this.settings = settings;
}

Lazzy.prototype.onScroll = function() {
  var triggerPosition = this.els.offset().top,
      self = this;
  
  $(window).scroll(function(){
    var triggerNumber = $('body').scrollTop() + ($(window).height() - self.settings.triggerOffset);
    if ( triggerNumber > triggerPosition && !self.els.hasClass(self.settings.className)) {
      self.addClassNames();
    }
  });
};

Lazzy.prototype.onReverseScroll = function() {
  var triggerPosition = this.els.last().offset().top
      self = this;
  
  $(window).scroll(function(){
    var triggerNumber = $('body').scrollTop();
    if ( triggerNumber = triggerPosition && self.els.last().hasClass(self.settings.className)) {
      console.log("hola")
      self.removeClassNames();
    }
  });
};

Lazzy.prototype.addClassNames = function() {
  var className = this.settings.className,
      afterFinish = this.settings.afterFinish,
      delay = this.settings.delay,
      els = this.els;

  for (var i = 0; i < els.length; i++) {
    var el = $(els);
    (function(index) {
        setTimeout(function() {
          $(el[index]).addClass(className);

          if ($(el[el.length - 1]).hasClass(className) && afterFinish) {
            afterFinish();
          }

        }, i * delay);
    })(i);
  }
};

Lazzy.prototype.removeClassNames = function() {
  var className = this.settings.className,
      afterFinish = this.settings.afterFinish,
      delay = this.settings.delay,
      els = this.els;
  
  for (var i =  els.length; i > 0; i--) {
    var el = $(els);
    (function(index) {
        setTimeout(function() {
          $(el[index]).removeClass(className);

          if ($(el[0]).hasClass(className) && afterFinish) {
            afterFinish();
          }
        }, i * delay);
    })(i);
  }
};



Lazzy.prototype.setUp = function() {
  if (this.settings.onScroll){
    this.onScroll();
  } else {
    this.addClassNames();
  }

  if (this.settings.reverseScroll) {
    this.onReverseScroll();
  }
};

$.fn.lazzy = function(options) {
  var settings = $.extend({
            delay: 200,
            className: "is-show",
            afterFinish: null,
            onScroll: false,
            triggerOffset: 0,
            reverseScroll: false
  }, options );

  var h = new Lazzy( this, settings);
  h.setUp();
}