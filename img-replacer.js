//imgReplacer[n] is the passed variable


$(document).ready(function() {
	
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
	
							//don't change the v in this class name, I use it elsewhere in the function 
							$('<div class="map-div' + ' v' + i + '"></div>').appendTo('body').css({
								
								"background": 'url(' + imgReplacer[0] + ') no-repeat',
								'background-position':'right center',
								'display': 'none',
								'z-index':'5000',
								'opacity':'1',
								'width':divHeight,
								'height':divWidth,
								'position':'absolute',
								'top':(parseInt(divTop + imgPos.top)),
								'left':'50%',
								'margin-left': (divLeft - imgReplacer[1])
								
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
									
										function () {
									
										$('.map-div').css('display','none');	
										$(this).css({
											'display':'block',
											'cursor': 'pointer'
										});
							
									},
									function () {
									
										$('.map-div').css('display','none');
										$(this).css({
											'display':'none',
											'cursor': 'pointer'
										});
									
									}).click ( function () {
									
										//alert(imgReplacer[2]);
										window.location = imgReplacer[2];
							
									});
							
							});
							
	
						  
						});		//end area each
	   					
	   				}  //end if
	   			
	   			}); // end each img
	   		
			}  //end if
					
	   		j++;
	   		

		   		
   		}//end onload
   
   }); //end img.each()
	
}); //end document read