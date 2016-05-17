
var current_id;
var name;
var url_image;
var url_image_large;
var flag_upload=true;
var check_login=false;
var facebook_user_id;
var load_summary=false;
var load_analysis=false;
var app_id=$("#fb_consumer_key").val();
var server_address=$("#server_address").val();
var isiPad = navigator.userAgent.match(/iPad/i) != null;
$(document).ready(function() {
	window.fbAsyncInit = function() {
		FB.init({
		  appId      : app_id, // App ID
	      channelUrl : '', // Channel File
		  status     : true, // check login status
		  cookie     : true, // enable cookies to allow the server to access the session
		  xfbml      : true  // parse XFBML
		 
		});
		FB.Event.subscribe('auth.authResponseChange', function(response) {
			    if (response.status === 'connected') {
			    	getProfile();
			    	check_login=true;
			 	    name=response.name ;
			    	facebook_user_id=response.authResponse.userID;
			    } else if (response.status === 'not_authorized') {
			    	check_login=false;
			    	$("#contents_create .thumbnail img.avatar-large").attr("src","upload/avatars/avatar1.jpg");
			     
			    } else {
			    	$("#contents_create .thumbnail img.avatar-large").attr("src","upload/avatars/avatar1.jpg");
			    }
		});
		//getChannelReport();
		//getChannelSummary();
		
		};
		// Load the SDK asynchronously
		(function(d){
		 var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
		 if (d.getElementById(id)) {return;}
		 js = d.createElement('script'); js.id = id; js.async = true;
		 js.src = "//connect.facebook.net/en_US/all.js";
		 ref.parentNode.insertBefore(js, ref);
		}(document));
	});


function proccesslogin(){
	$("#processbtn").addClass('btn-disabled');
	$("#processbtn").prop('disabled', true);
	$("#processpagebtn").addClass('btn-disabled');
	$("#processpagebtn").prop('disabled', true);
	if (check_login == false){
		fbLogin();
	}else{
		var answer = confirm(mess.check_login_facebook);
		if (answer){
			check_login = false;
			FB.logout(function(response) {
				fbLogin();
			});
		}
		$("#processpagebtn").prop('disabled', false);
		$("#processbtn").prop('disabled', false);
	}
	}
function getChannelReport(user_id){
	 load_analysis=true;
	 $.ajax({
		  url : '../AdminAnalysis.do?user_id='+user_id,
		  dataType: 'json',
		  success : function(source) {
			  $("#list-facebook-page-analysis").empty();
			  $("#list-facebook-profile-analysis").empty();
			  	//var pchannel_id;
				for(var i=0; i<source.length;i++){
					if(source[i].channel_id=="2"){
						var html='<li type="feed" id="'+source[i].channel_detail_id+'" pchannel_detail_id="'+source[i].pchannel_id+'" access-token="'+source[i].token_user+'"><a href="javascript:void(0)"><i class="icon-facebook-sign"></i><span style="margin-left:5px" title="'+source[i].channel_user+'" >'+source[i].channel_user+'</span></a></li>';
						  $("#list-facebook-page-analysis").append(html);
						 // array_influence.push({"channel_user":source[i].channel_user,"channel_detail_id":source[i].channel_detail_id,"access_token":source[i].token_user,"spread":0,"branroyalty":0});
						  
						  
					}else if(source[i].channel_id=="1"){
						var html='<li type="home" id="'+source[i].channel_detail_id+'" pchannel_detail_id="'+source[i].pchannel_id+'" access-token="'+source[i].token_user+'"><a href="javascript:void(0)"><i class="icon-facebook-sign"></i><span style="margin-left:5px" title="'+source[i].channel_user+'" >'+source[i].channel_user+'</span></a></li>';
						  $("#list-facebook-profile-analysis").append(html);
						//  array_influence.push({"channel_user":source[i].channel_user,"channel_detail_id":source[i].channel_detail_id,"access_token":source[i].token_user,"spread":0,"branroyalty":0});
					}
					
				}
		
				$("#analysis_facebook .list-facebook li").click(function(){
					$("#analysis_facebook .list-facebook li").removeClass("active");
					$("#summary_fb .action-nav-button a").removeClass("active");
					$("#summary_fb .action-nav-button a:first").addClass("active");
					$("#contents .action-nav-button a").removeClass("active");
					$("#contents .action-nav-button a:first").addClass("active");
					$("#engagement .list-action a").removeClass("active");
					$("#engagement .list-action a:first").addClass("active");
					$("#summary_title_fb").html("<span text='fan'>Fan</span>");
					$(this).addClass("active");
					$("#analysis_facebook .block-title .left-title span.name").text($(this).children("a").children("span").attr("title"));
					var id = $(this).attr("id");
					var access_token = $(this).attr("access-token");
					var pchannel_detail_id = $(this).attr("pchannel_detail_id");
					var type_fb = $(this).attr("type");
					$("#analysis_facebook .content_right").attr("id",id);
					$("#analysis_facebook .content_right").attr("pchannel_detail_id",pchannel_detail_id);
					$("#analysis_facebook .content_right").attr("access_token",access_token);
					$("#analysis_facebook .content_right").attr("type",type_fb);
					getReportFb(id,pchannel_detail_id,access_token,type_fb);

				});
				var pchannel_fb_page= $("#analysis_facebook .list-facebook li:first").attr("pchannel_detail_id");
				var pchannel_fb_profile = $("#analysis_facebook .list-facebook li:first").attr("pchannel_detail_id");
				if(!isNull(pchannel_fb_page))
				{
				
				$("#analysis_facebook #list-facebook-page-analysis li:first").click();
				
				}else if(isNull(pchannel_fb_page)){
					$(".itemLoading").hide();
					$(".menu-left h5").hide();
					$(".block_content").css("opacity","0.3");
					$(".content_right").append("<div class='no-channel'><h5>No Channel</h5></div>");
				}
			 else if (!isNull(pchannel_fb_profile))
				{
				$("#analysis_facebook #list-facebook-profile-analysis li:first").click();
				}
			
		  }
	}); 
}
function fbLogin(){
	var permissions='publish_stream,publish_actions,read_stream,manage_pages,photo_upload,user_status,user_groups,user_activities,read_insights,manage_notifications,read_friendlists,read_mailbox';
	var redirectPage=server_address+'enpick/index.jsp';
		if(isiPad){
			var permissionUrl = "https://m.facebook.com/dialog/oauth?client_id=" + app_id + "&response_type=code&redirect_uri=" +redirectPage + "&scope=" + permissions;
		    window.location = permissionUrl;
		    return;	
		}
		else
			{
			if((current_id=="facebookprofile")||(current_id=="facebookpage")){
				 FB.login(function(response){
			    	 if (response.authResponse) {
			    		 var token_offline;
			    		 var access_token =FB.getAuthResponse()['accessToken'];
			    		 FB.api('/me', function(response) {
		  		 	         var id= response.id;
		  		 	         var url_image= "https://graph.facebook.com/"+response.id+"/picture";
		  		 	         var dataString =[];
				         dataString.push({
				             name: "fb_exchange_token", 
				             value: access_token
				         });
				         dataString.push({
				             name: "channel_user", 
				             value: response.name 
				         });
				         dataString.push({
				             name: "channel_picture", 
				             value: url_image
				         });
				         dataString.push({
				             name: "channel_id", 
				             value: 1
				         });
				         dataString.push({
				             name: "channel_detail_id", 
				             value: id
				         });
				         dataString.push({
				             name: "pchannel_detail_id", 
				             value: id
				         });
				         dataString.push({
				             name: "Action", 
				             value: "facebookprofile"
				         }); 
		  		 	      $.ajax({
							 type:'POST',
							  url : 'ConnectChannel.do',
							  dataType: 'text',
							  data: dataString,
							  success : function(source) {
								  getChannelDetail();
							  }
		  		 	   });
		  		 	          });
			    			   if(current_id=="facebookpage"){
			    				   $("#idcancel").click();
			    				   $("#channel_facebook_page").empty();
			    					$.ajax({
  				    				  url : 'GetChannelDetail.do',
  				    				  dataType: 'json',
  				    				  success : function(source) {
  				    					  var source=source;
  				    					  $("#facebookaccount").empty();
  				    						 $("#pageacountlist").empty();
  				    						 $("#twitteraccount").empty();
  				    						  FB.api({method: 'fql.query',
  					    				        query: 'SELECT page_id,page_url,name,pic_square FROM page WHERE page_id IN (SELECT page_id FROM page_admin WHERE uid = '+response.authResponse.userID +') and name!=""' //'SELECT page_id FROM page_admin WHERE uid = '+ response.authResponse.userID
  					    				      },
  					    				      function(data) {
  					    				    	  for(var i=0; i<data.length;i++){
  					    				    		  var select="";
  					    				    		  var page_id= data[i].page_id;
  					    				    		  var page_name=data[i].name;
  					    				    		  var page_picture= data[i].pic_square;
  					    				    		for(var j=0; j<source.length;j++){
  		  				    							
  		  				    							if(source[j].channel_id=="2"){
  		  				    								if(page_id==source[j].channel_detail_id){
  		  				    									select = "selected";
  		  				    								}
  		  				    							}
  		  				    							
  		  				    							 
  		  				    						}

  		  				    						 var html='<div  class="span4 action-nav-button fb '+select+' "><a href="#" id="facebookpage_'+page_id+'_'+response.authResponse.userID +'" title="'+page_name+'"><img id="'+page_id+'" class="avatar-small" src="'+page_picture+'"> <span id="pagename_'+page_id+'">'+page_name+'</span><i class="icon-check"></i></a></div>';
  						    				    		  $("#channel_facebook_page").append(html);
  					    				    	  }
  					    				    	  var js_link = '<script type="text/javascript" src="module/js/topnavi/connect_a_channel.js" ></script>';
  							    				   $("#appScript").append(js_link);
  					    				      });
  				    						
  				    					}
  				    			  });
			    				 
			    			 	}
			    			 	if(current_id=="facebookprofile"){
			    			 		
			    			 		 $("#idcancel").click();
			    			 	}  
			    	   } else {
			    	     console.log('User cancelled login or did not fully authorize.');
			    	   }
			     },{scope: 'publish_stream,publish_actions,read_stream,manage_pages,photo_upload,user_status,user_groups,user_activities,read_insights,manage_notifications,read_friendlists,read_mailbox,friends_education_history,friends_birthday,user_education_history,user_birthday,friends_relationships,user_relationships'});
				 $("#processpagebtn").prop('disabled', false);
				$("#processbtn").prop('disabled', false);
			}
			
			}
}
	
	 
	
	
	 
	
	
	 
