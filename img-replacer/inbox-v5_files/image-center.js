//automatically adds a center tag to images so I don't go mad

$(document).ready(function() {

	if (typeof bgColor != 'undefined') { 								
	
		//console.log(bgColor[0]);
	
		$("body").css({
		
		"background-color": bgColor[0],
		"background-img": "none"
		
		});

	} 
	
	if ( $("table") ) {
		
		$("table").wrap('<center />').addClass("mainimage");
		
	}
	
	$('img').wrap('<center />').addClass("mainimage");
});




