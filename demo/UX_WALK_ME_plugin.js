/**
 * UX_Walk_Me
 * Version: 1
 * URL: URL
 * Description: DESCRIPTION
 * Requires: JQUERY_VERSION
 * Author: Jonathan Simmons (jonathanpsimmons.com)
 * Copyright: Copyright 2013 Jonathan Simmons
 * License: LICENSE_INFO
 */

// Plugin closure wrapper
// Uses dollar, but calls jQuery to prevent conflicts with other libraries
// Semicolon to prevent breakage with concatenation
// Pass in window as local variable for efficiency (could do same for document)
// Pass in undefined to prevent mutation in ES3
;(function($, document, window, undefined) {
    // Optional, but considered best practice by some
    "use strict";

    // Name the plugin so it's only in one place
    var pluginName = 'UX_WALK_ME';

    // Default options for the plugin as a simple object
    var defaults = {
        property: 'value',
        anotherProperty: 10
    };

    // Plugin constructor
    // This is the boilerplate to set up the plugin to keep our actual logic in one place
    function Plugin(element, options) {
        this.element = element;

        // Merge the options given by the user with the defaults
        this.options = $.extend({}, defaults, options)

        // Attach data to the elment
        this.$el      = $(element);
        this.$el.data(name, this);

        this._defaults = defaults;

        var meta      = this.$el.data(name + '-opts');
        this.opts     = $.extend(this._defaults, options, meta);

        // Initialization code to get the ball rolling
        // If your plugin is simple, this may not be necessary and
        // you could place your implementation here


        var highLightActive = false;
        var allowKeyBoard = true;


        //set a cooke to be retreived later - how do I d
        //document.cookie = window.location;
        //alert(document.cookie);

        // IF anchor or area tags exist, then deliver the message pinned to the bottom of the screen accordingly

        if ($('body a').length > 0 || $('body area').length > 0){

            $("body").append('<div class="instructions"><p>Press V on the keyboard to view clickable areas</p></div>');
            $('.instructions').css({
                'background-color': '#000',
            })

        } else { // flow is done (no anchor tags or image maps found)

            $("body").append('<div class="instructions"><p>Finished! Thanks for stopping by</p></div>');
            $('.instructions').css({
                'background-color': '#009900',
            }).delay(2000).fadeOut('fast');

            allowKeyBoard = false;

        }


        // INSTRUCTIONS <DIV> fadeOut on click

        $('.instructions').click( function () {

            $(this).css("display", "none");
            $(".instr-text").css("display", "none");

        });

        //counting variables
        var i;
        var j = 0;
        var multiple = 0;

        $('img').each(function() {

                this.onload = function () {

                var theImg = $(this);
                var imgPos = theImg.position();

                // if usemap exists, set variable to attr usemap
                if ( $(this).attr('usemap') ) {

                    //delete '#' from usemap attr
                    var useMapName = $(this).attr('usemap');

                    if (useMapName.charAt('0') === '#') {
                        useMapName = useMapName.substr(1);
                    }

                    $('map').each( function() {

                        if ( $(this).attr('name') == useMapName ) {

                            //iterating through each image map / <area> tag within
                            $('area', this).each(function(){

                                if ( i == undefined ) {

                                    i=0;

                                } else {

                                    i++;

                                }

                                if ( $('area').length > 1 ) {
                                    multiple = 5;
                                }

                                // returns coordinates in an array
                                var coord_vals = $(this).attr('coords').split(',');
                                var divHeight = (parseInt(coord_vals[2]) - parseInt(coord_vals[0]));
                                var divWidth = (parseInt(coord_vals[3]) - parseInt(coord_vals[1]));
                                var divTop = parseInt(coord_vals[1]);
                                var divLeft = parseInt(coord_vals[0]);


                                $('<div class="map-div' + ' v' + i + '"></div>').appendTo('body').css({

                                    'background-color': '#000',
                                    'display': 'none',
                                    'z-index':'5000',
                                    'opacity':'0.4',
                                    'width':divHeight,
                                    'height':divWidth,
                                    'position':'absolute',
                                    'top':(parseInt(divTop + imgPos.top)),
                                    'left':'50%',
                                    'margin-left': (parseInt(divLeft - 600 - multiple) )

                                });

                            });     //end area each

                        }  //end if

                    });

                }  //end if

                j++;

                $('.map-div').hover( function() {//  on mouseover, map-div goes away

                    $('.map-div').css("display","none");

                    if (highLightActive == false) {

                        $('.instructions').css("background","#000");
                        $('.instructions p').text('Press V on the keyboard to view clickable areas');

                    }

                    highLightActive = false;

                });

                }//end onload

        }); //end img.each()


        $('div.instructions').css({
            'font-family': 'Helvetica, arial, sans-serif',
            'opacity': '0.8',
            'filter': 'alpha(opacity=40)',
            'width': '100%',
            'position': 'fixed',
            'bottom': '0',
            'z-index': '5000',
            'height': '50px'
        });

        $('.instructions p').css({
            'margin-bottom': '-12px',
            'position': 'fixed',
            'bottom': '0',
            'width': '100%',
            'z-index': '6000',
            'height': '50px',
            'color': '#fff',
            'font-size': '24px',
            'text-align': 'center',
            'padding-top': '10px',
            'opacity': '.9',
            'filter': 'alpha(opacity=100)'
        });



        $(document).keyup(function (e) { // This function allows the user to press the 'v' on the keyboard to view clickable regions

        }).keydown(function (e) {

        if(e.which == 86 && highLightActive == false && allowKeyBoard == true) {        // if V hasn't been pressed

            //$('img').mapster('bind');
            $('.map-div').css("display","block");
            $('.map-div').css("background","#ff0000");
            $('.instructions').css("background","#ff0000");
            $('.instructions p').text('Links are highlighted in red');
            highLightActive = true;
                return false;

            } else if (e.which == 86 && highLightActive == true && allowKeyBoard == true) { // if V has been pressed and the area is active

                $('.map-div').css("display","none");
                $('.instructions').css("background","#000");
                $('.instructions p').text('Press V on the keyboard to view clickable areas');
            highLightActive = false;
            return true;
            }
        });

    }

    $.fn[pluginName] = function(options) {
        // Iterate through each DOM element and return it
        return this.each(function() {
            // prevent multiple instantiations
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };

    // init onready since there are no options
    $(function(){
        $('body').UX_WALK_ME ();
    });

})(jQuery, document, window);