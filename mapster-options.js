var highLightActive = false;

$(document).ready(function() {


	$('img').mapster({								// sets mapster style
        fillColor: 'ff0000',
        fillOpacity: 0.3
	});
	
	$('area').mapster({								// sets mapster style
        fillColor: 'ff0000',
        fillOpacity: 0.3
	});

	
	// IF anchor or area tags exist, then deliver the message pinned to the bottom of the screen accordingly

	if ($('body a').length > 0 || $('body area').length > 0){ 
	
		$("body").append('<div class="instructions"><p>Press V on the keyboard to view clickable areas</p></div>');
		$('.instructions').css({
			'background-color': '#000',
		})
	
	} else { // anchor or area tags DONT exist meaning the flow is done
	
		$("body").append('<div class="instructions"><p>Finished! Thanks for stopping by</p></div>');
		$('.instructions').css({
			'background-color': '#ff0000',
		}).delay(4000).fadeOut('fast');
	
	}


	// INSTRUCTIONS <DIV> fadeOut on click

	$('.instructions').click( function () {				
	
		$(this).css("display", "none");
		$(".instr-text").css("display", "none");
		
	});
	
	
	if (typeof usingSlices != 'undefined') {		// using slices, disable  mouseover
		
			//$('area').mapster('unbind');
			//$('img').mapster('unbind');
			//alert("here");
	
	}
	

	$('img').hover( function () {
	
		if (highLightActive == true && typeof usingSlices == 'undefined') {					// if links are highlighted
				$('img').mapster('unbind');
				highLightActive = false;	
				//alert(usingSlices);
		
		} else if (highLightActive == true && typeof usingSlices != 'undefined') {		// if this program is using slices, disable  mouseover
		
			$('area').mapster('deselect');
			//alert("slices");
			//$('img').mapster('unbind');
			//$('area').mapster('highlight',false);
			//highLightActive = false;
			
			/*$('img').mapster({								// sets mapster style
				staticState: false
			});
			
			$('area').mapster({								// sets mapster style
				staticState: false
			});*/
			highLightActive = false;
			
		} else if (highLightActive == false && typeof usingSlices != 'undefined') {	// if this uses slices but not selected
				//$('area').mapster('deselect');
			//$('img').mapster('unbind');
			highLightActive = true;
		}
			
	}); 
	
	$('div.instructions').css({
		'font-family': 'Helvetica, arial, sans-serif',
		'opacity': '0.4',
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
  	
    if(e.which == 86 && highLightActive == false) {		// if V hasn't been pressed
    	
    	//$('img').mapster('bind');
    	$('area').mapster('select');					// binds it to area 
        highLightActive = true;
 		return false;
 	
 	} else if (e.which == 86 && highLightActive == true) {	// if V has been pressed and the mapster area is active
 
 		$('area').mapster('deselect');
        highLightActive = false;	
        return true;
 	}
});
