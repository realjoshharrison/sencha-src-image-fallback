/** SENCHA SRC IMAGE FALLBACK ***************************************
 *
 * Author: Josh Harrison (http://wwwjoshharrison.net/)
 * URL: https://github.com/ultrapasty/sencha-src-image-fallback
 * Version: 1.0.0
 * Requires: jQuery
 *
 * Tests to see if the src.sencha.io service is down, and if so,
 * falls back to local images, by removing the sencha domain
 * from the src.
 *
 * Can be instantiated with `new SenchaSRCFallback().init();`
 * Or `var instance = new SenchaSRCFallback().init();`
 *
 * Emits the event `senchafailure` if sencha fails.
 * Listen with `instance.onsenchafailure = func;`
 *
 */

;(function(window, $) {
  
  var SenchaSRCFallback = function() {

    this.sencha_path_identifier = '.sencha.io/';
    this.sencha_path_regex = /http:\/\/src[1-4]?\.sencha\.io\//i;
    this.$imgs = null;

  };
  SenchaSRCFallback.prototype = {
    
    init : function() {
      this.$imgs = $("img[src*='" + this.sencha_path_identifier + "']");

      if(this.$imgs.length) {
        this.test_sencha_availability();
      }
    },
    
    test_sencha_availability : function() {
      var t = this, img = new Image();
      
      img.onerror = function() {
        $(t).trigger("senchafailure");
        t.fallback_to_local_srcs();
      };
      
      img.src = this.$imgs[0].getAttribute("src");
    },
    
    fallback_to_local_srcs : function() {
      var t = this;

      this.$imgs.each(function() {
        this.setAttribute("src", this.getAttribute("src").replace(t.sencha_path_regex, ""));
      });
    }

  };
  
  window.SenchaSRCFallback = SenchaSRCFallback;

})(window, jQuery);