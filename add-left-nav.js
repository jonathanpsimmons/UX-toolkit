
	
	//passing a variable called addImage[]
	

	
	if (typeof addImage != 'undefined') { 	
	
			alert("works");							
	
			$("body").append($('<div class="navigation"></div>'));				
			
			$(".navigation").css({
			
				 //height, width, background, top, margin-left
				
				"height": addImage[0] + 'px',
				"width": addImage[1] + 'px',
				'background':'url(' + addImage[2] + ') no-repeat',
				"top": addImage[3] + 'px'
						
			});

	} 
	


