var highLightActive = false;
var allowKeyBoard = true;

$(document).ready(function() {
	
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
   
   
	
   //loop through images looking for usemap attr
   //there can be more than 1 <AREA> for each <IMG>
   $('img').each(function() { 
   		
   		this.onload = function () {
   		
	   		var theImg = $(this);
	   		var imgPos = theImg.position();
			//alert(imgPos.left);
	   		
	   		// if usemap exists, set variable to attr usemap
	   		if ( $(this).attr('usemap') ) {	
	   		
	   			//delete '#' from usemap attr
	   			var useMapName = $(this).attr('usemap');
	   			
	   			if (useMapName.charAt('0') === '#') { 
	   				useMapName = useMapName.substr(1); 				
	   			}	

	   			
	   			//need to determine the area coords relative to this image
	   			//place the highlighting DIVs using the correct relative COORDS + document COORDS …but HOW?? how to nest .each/if{} functions/statements??
	   			//how connect usemap on an img with MAP name="useMapName" > AREA
	   			
	   			
	   			$('map').each( function() {
	   			
	   				if ( $(this).attr('name') == useMapName ) {
	   					
	   					//alert(useMapName);
	   					
	   					//iterating through each image map / <area> tag within
						$('area', this).each(function(){
								//alert("called");
								
							if ( i == undefined ) {
							
								i=0;
							
							} else {
							
								i++;
							
							}
							
							if ( $('area').length > 1 ) {
								multiple = 5;
							}
							
							
							
							//I need to find which image this area is attached to, then position the map-div <DIV> relative to that image, rather than relative to the body
								
							//var imgPos = $(theImg).position();
							//alert(imgPos.top);
							
							//coords: 1,2: Left, Top  3,4: Right, bottom 
							
							// returns coordinates in an array
							var coord_vals = $(this).attr('coords').split(',');						
							var divHeight = (parseInt(coord_vals[2]) - parseInt(coord_vals[0]));
							var divWidth = (parseInt(coord_vals[3]) - parseInt(coord_vals[1]));
							var divTop = parseInt(coord_vals[1]);
							var divLeft = parseInt(coord_vals[0]); 
							
							//var realPos = $(this).offset().top;
							//alert(realPos);
							
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
						  
						});		//end area each
	   					
	   				}  //end if
	   			
	   			});
	   			
	   			
	   			//alert(imagePosTop);			
	   		
	  			//get the assocaited <AREA> tag
	  			//add the DIVs, positioned according to relative position + image.offset().top / img.offset().left to position it correctly on the page
	  			
	  			
	   		
			}  //end if
					
	   		j++;
	   		
	   		$('.map-div').hover( function() {											//  on mouseover, map-div goes away
		
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
});


$(document).keyup(function (e) { 						// This function allows the user to press the 'v' on the keyboard to view clickable regions

}).keydown(function (e) {
  	
    if(e.which == 86 && highLightActive == false && allowKeyBoard == true) {		// if V hasn't been pressed
    	
    	//$('img').mapster('bind');
    	$('.map-div').css("display","block");
    	$('.map-div').css("background","#ff0000");	
    	$('.instructions').css("background","#ff0000");		
    	$('.instructions p').text('Links are highlighted in red');		
        highLightActive = true;
 		return false;
 	
 	} else if (e.which == 86 && highLightActive == true && allowKeyBoard == true) {	// if V has been pressed and the area is active
 
 		$('.map-div').css("display","none");
 		$('.instructions').css("background","#000");
 		$('.instructions p').text('Press V on the keyboard to view clickable areas');
        highLightActive = false;	
        return true;
 	}
});
