/**
 * 
 */

function showTourPage(){
			var tourdata=[
			              {
			            	  html:'<h1>Welcome to Enpick social</h1>',
			            	  element:$(".main-content"),
							  overlayOpacity: 0.5
							 
			              },
			              {
			            	  html:'Connect social media.',
			            	  element:$("#connect_a_channel"),
			            	  position: 'sw',
							  expose: true,
							  live: 3000,
							  overlayOpacity: 0.5
							 
			              },
			              {
			            	  html:'Select Range date to show data',
			            	  element:$("#dashboard_facebook_page #dashboard_range"),
			            	  position: 'sw',
							  expose: false,
							  live: 3000,
							  overlayOpacity: 0.5
			              },
			              {
			            	  html:'Show data summary all facebook',
			            	  element:$("#facebook_summary"),
			            	  position: 'sw',
							  expose: false,
							  live: 3000,
							  overlayOpacity: 0.5
			              },
			              {
			            	  html:'Show chart demographic',
			            	  element:$("#dashboard_facebook_page .demographic"),
			            	  position: 'sw',
							  expose: false,
							  live: 2000,
							  overlayOpacity: 0.5
			              }
			              ,
			              {
			            	  html:'Show top post of facebook page',
			            	  element:$("#dashboard_facebook_page #block-top"),
			            	  position: 'n',
							  expose: true,
							  live: 2000,
							  overlayOpacity: 0.5
							 
			              }
			             
			              ];
			var myTour = jTour(tourdata);
			myTour.start();
		}	

function showTourCreate(){
	 var tourdata=[
		              {
		            	  html:'Select channel post to facebook or twitter',
		            	  element:$("#btn_add"),
		            	  position: 'sw',
						  expose: true,
						  live: 3000,
						  overlayOpacity: 0.5//upload_photo_create
		              },
		              {
		            	  html:'Select a image post to facebook or twitter',
		            	  element:$("#upload_photo_create"),
		            	  position: 'sw',
						  expose: true,
						  live: 3000,
						  overlayOpacity: 0.5//upload_photo_create
		              },
		              {
		            	  html:'Message will post to channel',
		            	  element:$("#account_choice_post"),
		            	  position: 'sw',
						  expose: true,
						  live: 3000,
						  overlayOpacity: 0.5//upload_photo_create
		              }
		              ,
		              {
		            	  html:'Type a message post to channel',
		            	  element:$("#contentpost"),
		            	  position: 'n',
						  expose: true,
						  live: 3000,
						  overlayOpacity: 0.5,
						  onStep: function(e, p) {
								var l = myText.length;
								e.html(myText.substr(0, Math.round(l/100*p)));
								e.trigger('keyup');
							},
							onShow: function(e) {
								e.trigger('click');
							}
		              }
		              ,
		              {
		            	  html:'Click send message to channel select',
		            	  element:$("#btn_send"),
		            	  position: 'se',
						  expose: true,
						  live: 3000,
						  overlayOpacity: 0.5//upload_photo_create
		              },
		              {
		            	  html:'Click save message to draft',
		            	  element:$("#btn_save_draft"),
		            	  position: 'se',
						  expose: true,
						  live: 3000,
						  overlayOpacity: 0.5//upload_photo_create
		              },
		              {
		            	  html:'Click create scheduled message',
		            	  element:$("#btn_scheduled"),
		            	  position: 'se',
						  expose: true,
						  live: 3000,
						  overlayOpacity: 0.5//upload_photo_create
		              }
		              ];
	
	 var myText = 'Hi, Welcome to enpick';
		var myTour = jTour(tourdata);
		myTour.start();
}


