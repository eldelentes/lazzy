$.fn.lazzy = function(options) {
  var settings = $.extend({
            delay: 200,
            className: "is-show",
            afterFinish: null
  }, options );

  for (var i = 0; i < this.length; i++) {
    var el = $(this);
    (function(index) {
        setTimeout(function() {
          $(el[index]).addClass(settings.className);
          if ($(el[el.length - 1]).hasClass(settings.className) && settings.afterFinish) {
            settings.afterFinish();
          }
        }, i * settings.delay);
    })(i);
  }
}