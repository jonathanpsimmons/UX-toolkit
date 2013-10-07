var highLightActive = false;

$(document).keyup(function (e) { 			// This function allows the user to press the 'v' on the keyboard to view clickable regions

}).keydown(function (e) {
  	
    if(e.which == 86 && highLightActive == false) {
    
    	//$('img').mapster();
    	//alert("called");
    	
    	$('img').mapster({
	        fillColor: 'ff0000',
	        fillOpacity: 0.3
    	});
        	
 		console.log(e);
 		$("td a img").css({										// this only controls img links. img maps styles are controlled inmaphighlight.js (near the bottom of the file)
 			"border":"2px solid #333333", 
 			"box-sizing":"border-box", 
 			"-moz-box-sizing":"border-box",
 			"border-radius": "3px"
 			});
 			
 		$(".link").css({										// this only controls img links. img maps styles are controlled inmaphighlight.js (near the bottom of the file)
 			"border":"2px solid #333333", 
 			"box-sizing":"border-box", 
 			"-moz-box-sizing":"border-box",
 			"border-radius": "3px"
 			});
        
        $('img[usemap]').maphilight({							// calls maphighlight
			alwaysOn: 'true'
        	});
        
        highLightActive = true;
        
 	return false;
 	
 } else if (e.which == 86 && highLightActive == true) {
 	
 		console.log(e);
 		$("td a img").css({										// this only controls img links. img maps styles are controlled inmaphighlight.js (near the bottom of the file)
 			"border":"none", 
 			"box-sizing":"border-box", 
 			"-moz-box-sizing":"border-box",
 			"border-radius": "3px"
 			});
 			
 		$(".link").css({										// this only controls img links. img maps styles are controlled inmaphighlight.js (near the bottom of the file)
 			"border":"none", 
 			"box-sizing":"border-box", 
 			"-moz-box-sizing":"border-box",
 			"border-radius": "3px"
 			});
        
       // $('img[usemap]').maphilight({							// calls maphighlight
			//alwaysOn: 'false'
        	//});
        	
         $('map area').data('maphilight', {
       		 alwaysOn: false
    	}).trigger('alwaysOn.maphilight');

        	
        //alert('off');
        	
        $('.maphilighted').removeClass('.maphilighted');
        
        highLightActive = false;
        	
        return true;
 	
 }
 
});


/*  
I want to toggle the variable isCtrl from true to false - using the 'V' keystroke. AND deliver a function chain based on that event
THEN use the keystoke to test if the variable is true or false, then deliver an A or B result based on variable status
*/










