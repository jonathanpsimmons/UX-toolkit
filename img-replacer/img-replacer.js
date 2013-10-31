//imgReplacer[n] is the passed variable

/*

Name: imgReplacer
Version: v1.1
What it does:
    This is a function built for UX designers. If a UX designer ever needs a way to make parts of a document hoverable, this will provide an easy way to make that happen.You'll specify the hoverable parts of a static image by using image maps. If you have some image maps you don't want to be used by imgReplacer, simply give them the class 'no-hover'. Then you'll pass the image you'd like to use as the hover state. When a user hovers the part of the document you've set up, the image you specified will appear. You also have control over positioning the hovered element from the left and from the top

Author: Jonathan P Simmons
documentation URL:http://mockups/HASP/Product/js/Code-Documentation.html

*/



$(document).ready(function() {

   //counting variables
   var i;
   var j = 0;
   var multiple = 0;

   $('img').each(function() {

            var theImg = $(this);
            var imgPos = theImg.position();

            // if usemap exists, set variable to attr usemap
            if ( $(this).attr('usemap') ) {

                //where to add 'no-hover' check? Here?

                //delete '#' from usemap attr
                var useMapName = $(this).attr('usemap');

                if (useMapName.charAt('0') === '#') {
                    useMapName = useMapName.substr(1);
                }


                //iterate through all of the MAP tags,
                $('map').each( function() {

                    if ( $(this).attr('name') == useMapName ) {

                        //iterating through each <area> tag within an image map
                        $('area', this).not('.no-hover').each(function(){

                            if ( i == undefined ) {
                                i=0;
                            } else {
                                i++;
                            }

                            //this is a magic number, not sure where it's coming from
                            if ( $('area').length > 1 ) {
                                multiple = 5;
                            }

                            // returns coordinates of each <AREA> in an array
                            //the values in the array will be used to construct a DIV on top of each <AREA> that will be hoverable
                            var coord_vals = $(this).attr('coords').split(',');
                            var divHeight = (parseInt(coord_vals[2]) - parseInt(coord_vals[0]));
                            var divWidth = (parseInt(coord_vals[3]) - parseInt(coord_vals[1]));
                            var divTop = parseInt(coord_vals[1]) + imgReplacer[2];
                            var divLeft = parseInt(coord_vals[0]);
                            var bckgrnd;

                            //allowing the mouseover to just be a color
                            if(imgReplacer[0] == 'color' && imgReplacer[4] != 'undefined') {

                                bckgrnd = '#' + imgReplacer[4];
                                opcty = '.3';

                            } else if(imgReplacer[0] != 'color') {

                                bckgrnd = 'url(' + imgReplacer[0] + ') no-repeat';  //imgReplacer[0] from the passed variable
                                opcty = '1';

                            } else {

                                console.log("There's a problem with one of the variables being passed. Are you trying to pass a color or image?");

                            }


                            //Append the DIV to the body, give it CSS attributes
                            //v in classname is used elsewhere in function
                            $('<div class="map-div' + ' v' + i + '"></div>').appendTo('body').css({

                                'background': bckgrnd,
                                'background-position':'right center',
                                'display': 'none',  //this seems to be the problem
                                'z-index':'5000',
                                'opacity': opcty,
                                'width':divHeight,                         //from above
                                'height':divWidth,                         //from above
                                'position':'absolute',
                                'top':(parseInt(divTop + imgPos.top)), //from above
                                'left':'50%',
                                'margin-left': (divLeft - imgReplacer[1])  //from above

                            });


                            //connect the <AREA> with the <DIV> above it using the same class…?
                            $(this).addClass(' v' + i);

                            var classname = $(this).attr('class');
                            var vClass = classname.substr(classname.indexOf('v') + 1 ); //returns only the numeric value


                            //make sure that if there's white space that I take it away
                            if (vClass.indexOf(' ') != -1) {
                                vClass = vClass.trim();
                            }

                            // I've bound a hover to the <AREA> tag, now I need co-ordinate bringing up the correct <DIV>
                            $(this).bind('mouseenter', function () {

                                    $('.map-div' + '.v' + vClass).css('display','block').hover(

                                        function () {                           //mouse enter

                                            $('.map-div').css('display','none');
                                            $(this).css({
                                                'display':'block',
                                                'cursor': 'pointer'
                                            });

                                    },function () {                             //mouse leave

                                            $('.map-div').css('display','none');
                                            $(this).css({
                                                'display':'none',
                                                'cursor': 'pointer'
                                            });

                                    }).click ( function () {

                                        if (imgReplacer[3] == true && imgReplacer[3] != '#') { //make sure there's been a URL passed and it's not #

                                            window.location = imgReplacer[3];

                                        }
                                    });

                            });

                        });     //end area each

                    }  //end if

                }); // end each img

            }  //end if

            j++;

   }); //end img.each()

}); //end document read