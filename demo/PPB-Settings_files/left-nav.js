

$(document).ready(function() {
	
	
	if (typeof addLeftNav != 'undefined') { 									// if addLeftNav is defined on the page, then it will add the left nav
	
			$("body").append($('<div class="navigation"></div>'));				// appending a div to hold the navigation, 'navigation' is defined in HASP/product/css/gradient-background.css

	} 
	
	
	// what's the pass-through
	// fadeout(true/false), width, position from left, message, color, onclick url, image to use 
	//var message = new Array(false,935,-370,"Please confirm your changes","warning","SOR-change-made.html","confirm-button.png");
	
	if (typeof message != 'undefined') {  //if success is defined 
			
			// success[] = width (no px), pos from left (no px), message
			
			if (message.length > 1) {
			
				
				$("body").append($('<div class="message"><p><span></span> ' + message[3] + '</p></div>'));
			
				$(".message").css({
				
					"width": message[1] + "px",
					"margin-left": message[2] + "px"
				
				});
			
			} else {
			
				$("body").append($('<div class="message"><p><span class="ss-check"></span> ' + message[1] + '</p></div>'));
			
			}
			
			if (message[0] == true && message[4] != "success") { // if fadeout is true
			
				$('.message').fadeIn(500).delay(2000).fadeOut(500).click( function () {
					$(this).css("display", "none");
				});
			
			} else { // then it may need an onclick behavior and may have an image attached
			
				// if a URL exists
				if (message.length > 5) {
					
					$(".message").css("cursor","pointer").click( function () {
				
						window.location = message[5];
				
					});
				}
				
				if (message.length > 5) {
				
					//alert("THere's a button!");
					// need to place button, the click event is already handled by message[5]
					
					//alert("message.length is over 5");
					
					$(".message p").css({
					
						"text-align":"left",
						"width": "50%",
						"float":"left",
						"margin-left":"20px"
					
					});
					
					$('<img src="' + message[6] + '" />').appendTo(".message").css({
					
						"float":"right",
						"padding-top":"10px"
					
					});
				
				}
			
			} //end else from message[0] fadeout
			
			if ( message[4] == "warning"){
			
				$(".message").css({
				
					"display":"block",
					"background-color":"#f5a04f"
				
				});
				
				$(".message span").addClass("ss-alert");
			
			}
			
			/*if ( message[4] == "alert"){
			
				$(".message").css({
				
					"display":"block",
					"background-color":"#f5a04f"
				
				});
				
				$(".message span").addClass("ss-alert");
			
			}*/
			
			if ( message[4] == "success"){
			
				$(".message").css({
				
					"background-color":"##79b559"
				
				});
				
				$('.message').fadeIn(500).delay(2000).fadeOut(500).click( function () {
					$(this).css("display", "none");
				});
				
				$(".message span").addClass("ss-check");
			
			}
			
			
			
	} 
	
	
	if (typeof success != 'undefined') {										//if success is defined 
			
			// success[] = width (no px), pos from left (no px), message
			
			if (success.length > 1) {
			
				$("body").append($('<div class="success"><p><span class="ss-check"></span> ' + success[2] + '</p></div>'));
			
				$(".success").css({
				
					"width": success[0] + "px",
					"margin-left": success[1] + "px"
				
				});
			
			} else {
			
				$("body").append($('<div class="success"><p><span class="ss-check"></span> ' + success[0] + '</p></div>'));
			
			}
			
			$('.success').fadeIn(500).delay(2000).fadeOut(500).click( function () {
				$(this).css("display", "none");
			});
			
	} 
	
	if (typeof addDropDown != 'undefined') {
		
			/* $("body").append('<ul class="dropdown-menu"></ul>');
			
			<ul class="dropdown-menu">
			  <li><a href="#">Action</a></li>
			  <li><a href="#">Another action</a></li>
			  <li><a href="#">Something else here</a></li>
			  <li class="divider"></li>
			  <li><a href="#">Separated link</a></li>
			</ul>

			
			for(var j; j<10; j++){
				$("dropdown-menu").append('<li><a href="">' + addDropDown[0] + '</a></li>');
			}
			*/
			
			
	
			for(var i=0; i<10; i++) {
					
					$("body").append('<img ' + ' ' + 'src=' + addDropDown[0] + ' class="down' + i + ' dropdown added link" />');
					
					var topPos = parseInt(addDropDown[2]) + parseInt(i * addDropDown[3]);
					
					$(".down" + i).css({													// Turn insert into an array with styling position embedded so can do this programmatically from the home page
						"position": "absolute",
						"z-index": "1000",
						"top": topPos + "px",
						"left": "50%",
						"margin-left": addDropDown[4]
					});

			} //end for loop
			
			//$(".down" + i).after('<p>' + position.left + ' ' + position.top + '</p>');
			
			$(".dropdown").click( function () {
			
				var p = $(this);
				var position = p.position();
			
				//	alert(position.left);
			
				$(".dropdown-menu").fadeToggle(100).css({
				
					"position": "absolute",
					"top": (parseInt(position.top) + 35)  + "px",
					"left": "50%",
					"margin-left": "390px"
					
				});
			});
	
	} 
	
	if (typeof insert != 'undefined') {											//if insert is defined then an image swap will happen, need to do more work around this
		
			$(".mainimage").before('<img ' + ' ' + 'src=' + insert + ' style="display: none" class="second" />'); //.css("display","none");
			
			$(".second").css({													// Turn insert into an array with styling position embedded so can do this programmatically from the home page
			
				"position": "absolute",
				"z-index": "1000",
				"top": "0px",
				"left": "50%",
				"margin-left": "-605px"
			
			}).delay(1000).fadeIn(3000);
		
	}
	
	
	if (typeof scrollToTop != 'undefined') {
	
		$('body').append($('<div class="scrollup"><span class="ss-up"></span></div>'));
		
		$('.scrollup').click(function(){
		
		    $("html, body").animate({ scrollTop: 0 }, 200);
		    return false;
		    
	    });
	    

	
		$(window).scroll( function() {
		
			if ($(this).scrollTop() > 100) {
			
				$('.scrollup').fadeIn('fast');
			
			} else {
			
				$('.scrollup').fadeOut('fast');
				
			}
			
	
		});
	
	}
	
	if (typeof pageBottomAlert != 'undefined') {
	
		$('body').append($('<div class="scrollupup"><span class="ss-up"></span></div>'));
		
		/*$('.scrollup').click(function(){
		
		    $("html, body").animate({ scrollTop: 0 }, 200);
		    return false;
		    
	    });*/
	    	
		$(window).scroll( function() {
		
			if ($(this).scrollTop() > ( $(document).height() -1000 )) {

				$('.scrollupup').addClass("show").css("display","block").animate({

					"right": "300px"
				
				}, 100 );
			
			} else if ( ($('.scrollupup').hasClass("show") == true) && $(this).scrollTop() < ( $(document).height() -1000 ) ) {
			
				$('.scrollupup').removeClass("show").css("display","block").animate({

					"right": "-100px"
				
				}, 100 );
			
			}
		});
	
	}
	
	//allowKey = Array("keyboardcode, url")
	
	if (typeof allowKeyboard != 'undefined') {
	
		$(document).keyup(function (e) { 						// This function allows the user to press the 'v' on the keyboard to view clickable regions
		
		}).keydown(function (e) {
		  	
		    if(e.which == allowKeyboard[0]) {		// on enter press
		    	
				window.location = allowKeyboard[1];
		 		return false;
		 	
		 	} 
		});
	}


});






