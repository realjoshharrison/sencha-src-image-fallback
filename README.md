Fallback for src.sencha.io
=

Sometimes src.sencha.io, the dynamic image resizing service, fails unpredictably with a 503. Obviously not good for production use! 

This fallback provides a graceful solution.

If the first image request to Sencha's service fails, all images in the document running through src.sencha.io will have their `src` attributes replaced with the non-sencha equivalents.

Example Usage
-
    
Images should be initially routed through src.sencha.io. Sencha's optional domain sharding is supported.

    <img src="http://src.sencha.io/http://mysite.com/image1.png">
    <img src="http://src1.sencha.io/http://mysite.com/image2.png">
    <img src="http://src2.sencha.io/http://mysite.com/image3.png">

If Sencha fails, the above images will become:

    <img src="http://mysite.com/image1.png">
    <img src="http://mysite.com/image2.png">
    <img src="http://mysite.com/image3.png">

The javascript:

    <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
    <script src="/path/to/sencha_src_fallback.js"></script>
    <script>
    
        // Instantiate the fallback
        var senchafallback = new SenchaSRCFallback().init();
    
        // Listen for failure like this:
        senchafallback.onsenchafailure = function() {
            // log failure event in google analytics, etc
        };
    
        // Or, if you want to use jQuery's event handling, listen for failure like this:
        $(senchafallback).on("senchafailure", function() {
            // log failure event in google analytics, etc
        });
    
    </script>

Dependencies
-
jQuery.


Changelog
-

**1.0.0** – 5th March 2014

* Initial Commit