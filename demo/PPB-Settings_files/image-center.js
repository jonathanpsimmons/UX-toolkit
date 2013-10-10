//automatically adds a center tag to images so I don't go mad

$(document).ready(function() {

	if ( $("table") ) {
		
		$("table").wrap('<center />').addClass("mainimage");
		
	}
	
	

	$('img').wrap('<center />').addClass("mainimage");
});




