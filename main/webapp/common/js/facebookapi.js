
var current_id;
var name;
var url_image;
var url_image_large;
var flag_upload=true;
var check_login=false;
var facebook_user_id;
var load_analysis=false;
var load_monitoring_fb=false;
var load_monitoring_fb_page=false;
var array_channel_profile_detail= new Array();
var array_channel_page_detail= new Array();
var count_channel_post=0;
var list_post=new Array();
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
			    	//getProfile();
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
		getChannelReport();
		var hash_url = window.location.hash;
		if(hash_url=="#comments/create"){
			$("#tree-menu .nav_comments-create a").click();
		}
		else if(hash_url=="#brandkeyword/brand-keyword"){
			
			$("#tree-menu .nav_brandkeyword-brand-keyword a").click();
		}
		//alert(global_groupId)
		//alert(config.page_default)
		if(global_groupId=="dashboard")
		 $("#tree-menu .nav_dashboard-facebook-page a").click();
		//getChannelReportPage();
		//getChannelReportProfile();
		//getInforProfile();
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
	if (isNull(current_id)){
		aoFrm.mess("alert",mess.choosesocial);
	}else{
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
			    		 if(current_id=="facebookprofile"){
			    			 checkToken(access_token);

			    			 $("#idcancel").click();
			    		 }
			    	
			    		 else if(current_id=="facebookpage"){
			    				   $("#idcancel").click();
			    				   $("#channel_facebook_page").empty();
			    				   var data=[];
			    					 data.push({
			    			             name: "channel_id", 
			    			             value: ""
			    			         });
			    					$.ajax({
  				    				  url : 'GetChannelDetail.do',
  				    				  dataType: 'json',
  				    				  data: data,
  				    				  success : function(source) {
  				    					  var source=source;
  				    					  $("#facebookaccount").empty();
  				    						 $("#pageacountlist").empty();
  				    						 $("#twitteraccount").empty();
  				    						  FB.api({method: 'fql.query',
  					    				        query: 'SELECT page_id,page_url,name,pic_square FROM page WHERE page_id IN (SELECT page_id FROM page_admin WHERE uid = '+response.authResponse.userID +') and name!=""'  					    				      },
  					    				      function(data) {
  					    				        	if (data.length>0){
  					    				        		$('#connect_a_channel_Popup_Page').modal('show') ;
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
  	  		  				    						 var html='<div  class="span4 action-nav-button fb '+select+' "><a href="#" token="'+access_token+'"   id="facebookpage_'+page_id+'_'+response.authResponse.userID +'" title="'+page_name+'"><img id="'+page_id+'" class="avatar-small" src="'+page_picture+'"> <span id="pagename_'+page_id+'">'+limitString(page_name)+'</span><i class="icon-check"></i></a></div>';
  	  						    				    		  $("#channel_facebook_page").append(html);
  	  					    				    	  }
  	  					    				    	 var js_link = '<script type="text/javascript" src="module/js/topnavi/connect_a_channel.js" ></script>';
  	  							    				 $("#appScript").append(js_link);
  					    				        	}else{
  					    				        		aoFrm.mess("alert",mess.nopage);
  					    				        	}
  					    				    	
  					    				      });
  				    						
  				    					}
  				    			  });
			    				 
			    			 	}
			    			 	//if(current_id=="facebookprofile"){
			    			 		// $("#idcancel").click();
			    			 	//}  
			    	   } else {
			    	     console.log('User cancelled login or did not fully authorize.');
			    	   }
			     },{scope: 'publish_stream,publish_actions,read_stream,manage_pages,photo_upload,user_status,user_groups,user_activities,read_insights,manage_notifications,read_friendlists,read_mailbox,friends_education_history,friends_birthday,user_education_history,user_birthday,friends_relationships,user_relationships'});
				 $("#processpagebtn").prop('disabled', false);
				$("#processbtn").prop('disabled', false);
			}
			
			}
}
	
	 function getProfile()
	 {
		
		 FB.api('/me', function(response) {
	            name=response.name ;
	            url_image_large = "https://graph.facebook.com/"+ response.id +"/picture?type=normal";
	           // $("#contents_create .thumbnail img.avatar-large").attr("src",url_image_large);
	           // url_image= "https://graph.facebook.com/"+response.id+"/picture";
            
	          });
        
	 }
	
	
	 function getChannelDetail(){
		 var dataString=[];
		 dataString.push({
             name: "channel_id", 
             value: ""
         });
			$.ajax({
				  url : 'GetChannelDetail.do',
				  dataType: 'json',
				  data: dataString,
				  success : function(source) {
					  $("#facebookaccount").empty();
						 $("#pageacountlist").empty();
						 $("#twitteraccount").empty();
						for(var i=0; i<source.length;i++){
							if(source[i].channel_id=="2"){
								var html='<li class="account clearfix"><div class="avatar"><img class="avatar-small" src="'+source[i].channel_picture+'"><i class="icon-facebook-sign blue channel-icon" ></i></div><div class="account-name" >'+source[i].channel_user+'</div></li>';
								  $("#pageacountlist").append(html);
							}
							else if(source[i].channel_id=="1")
								{
								var html='<li class="account clearfix"><div class="avatar"><img class="avatar-small" src="'+source[i].channel_picture+'"><i class="icon-facebook-sign blue channel-icon" ></i></div><div class="account-name" >'+source[i].channel_user+'</div></li>';
						   		  $("#facebookaccount").append(html);
								}
							else
								{
								var html='<li class="account clearfix"><div class="avatar"><img class="avatar-small" src="'+source[i].channel_picture+'"><i class="icon-twitter-sign blue channel-icon" ></i></div><div class="account-name" >'+source[i].channel_user+'</div></li>';
						   		  $("#twitteraccount").append(html);
								}
							 
						}
					}
			  });
		}
	 function getChannelReport(){
		 try{
		 load_analysis=true;
		 var dataString=[];
		 dataString.push({
             name: "channel_id", 
             value: ""
         });
		 $.ajax({
			  url : 'GetChannelDetail.do',
			  dataType: 'json',
			  data: dataString,
			  success : function(source) {
				  getChannel_Monitoring(source);
				  $("#list-facebook-page-analysis").empty();
				  $("#list-facebook-profile-analysis").empty();
				  	//var pchannel_id;
					for(var i=0; i<source.length;i++){
						if(source[i].channel_id=="2"){
							var html='<li type="feed" id="'+source[i].channel_detail_id+'" channel_user="'+source[i].channel_user+'" load_option="'+source[i].load_option+'" pchannel_detail_id="'+source[i].pchannel_id+'" access-token="'+source[i].token_user+'"><a href="javascript:void(0)"><i class="icon-facebook-sign"></i><span style="margin-left:5px" title="'+source[i].channel_user+'" >'+limitString(source[i].channel_user)+'</span></a></li>';
							  $("#list-facebook-page-analysis").append(html);
							 // $("#list-facebook-page-analysis li:first").addClass("active");
							 // using monitoring facebook profile
							  //var htmlUser = "<div id='user_" + source[i].channel_detail_id + "' pchannel-id='"+source[i].pchannel_id+"' class='block-name' channel-id='"+source[i].channel_id+"' channel-detail-id='" + source[i].channel_detail_id + "' token-user='" + source[i].token_user + "' ><span id='number_"+source[i].channel_detail_id+"' style='display:none;margin-right: 3px' class='badge badge-dark-red'></span><i class='icon-user'></i> <span title='"+source[i].channel_user+"'>"+ limitString(source[i].channel_user) +"</span></div>";
							  
							  
							  
						}else if(source[i].channel_id=="1"){
							saveInforProfile(source[i].channel_detail_id,source[i].token_user);
							var html='<li type="home" id="'+source[i].channel_detail_id+'" channel_user="'+source[i].channel_user+'" load_option="'+source[i].load_option+'" pchannel_detail_id="'+source[i].pchannel_id+'" access-token="'+source[i].token_user+'"><a href="javascript:void(0)"><i class="icon-facebook-sign"></i><span style="margin-left:5px" title="'+source[i].channel_user+'" >'+limitString(source[i].channel_user)+'</span></a></li>';
							  $("#list-facebook-profile-analysis").append(html);
							 
						}
						else
							{
							saveInforTwitter(source[i].channel_detail_id,source[i].token_user);
							}
						
					}
			
					checkEmptyChannelAnalysis("#box_channel_analysis");
					$("#analysis_facebook #list-facebook-page-analysis li").click(function(){
						$("#reltime_fb_page").empty();
						$("#analysis_facebook #list-facebook-page-analysis li").removeClass("active");
						$("#summary_fb .action-nav-button a").removeClass("active");
						$("#summary_fb .action-nav-button a:first").addClass("active");
						$("#contents .action-nav-button a").removeClass("active");
						$("#contents .action-nav-button a:first").addClass("active");
						$("#engagement .list-action a").removeClass("active");
						$("#engagement .list-action a:first").addClass("active");
						$("#summary_title_fb").html("<span text='fan'>Fan</span>");
						$(this).addClass("active");
						$("#analysis_facebook .block-title .left-title span.name").attr("title",$(this).children("a").children("span").attr("title"));
						$("#analysis_facebook .block-title .left-title span.name").text(limitString($(this).children("a").children("span").attr("title")));
						var id = $(this).attr("id");
						var load_option=$(this).attr("load_option");
						var access_token = $(this).attr("access-token");
						var pchannel_detail_id = $(this).attr("pchannel_detail_id");
						var channel_user=$(this).attr("channel_user");
						var type_fb = $(this).attr("type");
						$("#analysis_facebook .content_right").attr("id",id);
						$("#analysis_facebook .content_right").attr("load_option",load_option);
						$("#analysis_facebook .content_right").attr("pchannel_detail_id",pchannel_detail_id);
						$("#analysis_facebook .content_right").attr("access_token",access_token);
						$("#analysis_facebook .content_right").attr("type",type_fb);
						$("#analysis_facebook .content_right").attr("channel_user",channel_user);
						if(load_option==1){
							$("#reltime_fb_page").html("Save data");
							getDataFBStream(id,pchannel_detail_id,access_token,load_option);
						}
						else
							{
							$("#reltime_fb_page").html("Real time data");
							getReportFb(id,pchannel_detail_id,access_token,load_option,channel_user);
							}
					
						loadInfluence(id,access_token);
					});
					
					var pchannel_fb_page= $("#analysis_facebook #list-facebook-page-analysis li:first").attr("pchannel_detail_id");
					
					if(!isNull(pchannel_fb_page))
					{
					
					$("#analysis_facebook #list-facebook-page-analysis li:first").click();
					}
					checkEmptyChannelAnalysis("#box_channel_profile_analysis");
					$("#analysis_facebook #list-facebook-profile-analysis li").click(function(){
						$("#reltime_fb").empty();
						$("#analysis_facebook #list-facebook-profile-analysis li").removeClass("active");
						$("#summary_fb .action-nav-button a").removeClass("active");
						$("#summary_fb .action-nav-button a:first").addClass("active");
						$("#contents .action-nav-button a").removeClass("active");
						$("#contents .action-nav-button a:first").addClass("active");
						$("#engagement .list-action a").removeClass("active");
						$("#engagement .list-action a:first").addClass("active");
						$("#summary_title_fb").html("<span text='fan'>Fan</span>");
						$(this).addClass("active");
						$("#analysis_facebook .block-title .left-title span.name").attr("title",$(this).children("a").children("span").attr("title"));
						$("#analysis_facebook .block-title .left-title span.name").text(limitString($(this).children("a").children("span").attr("title")));
						var id = $(this).attr("id");
						var load_option=$(this).attr("load_option");
						var access_token = $(this).attr("access-token");
						var pchannel_detail_id = $(this).attr("pchannel_detail_id");
						var channel_user=$(this).attr("channel_user");
						var type_fb = $(this).attr("type");
						$("#analysis_facebook .content_right").attr("id",id);
						$("#analysis_facebook .content_right").attr("load_option",load_option);
						$("#analysis_facebook .content_right").attr("pchannel_detail_id",pchannel_detail_id);
						$("#analysis_facebook .content_right").attr("access_token",access_token);
						$("#analysis_facebook .content_right").attr("type",type_fb);
						$("#analysis_facebook .content_right").attr("channel_user",channel_user);
						if(load_option==1){
							$("#reltime_fb").append("Save data");
							getDataFBStream(id,pchannel_detail_id,access_token,load_option);
						}
						else
							{
							
							$("#reltime_fb").append("Real time data");
							getReportFb(id,pchannel_detail_id,access_token,load_option,channel_user);
							}
						
						loadInfluence(id,access_token);
					});
					
					var pchannel_fb_profile = $("#analysis_facebook #list-facebook-profile-analysis li:first").attr("pchannel_detail_id");
					if (!isNull(pchannel_fb_profile))
					{
					$("#analysis_facebook #list-facebook-profile-analysis li:first").click();
					}
					
				    
			  }
		}); 
		 }
		 catch(ex){
			 
		 }
	 }
	
	function checkAccountError(response,type,channel_user){
		current_id=type;
		//alert((response.error.code))
		if(response.error.error_subcode==463){
			aoFrm.mess("alert",channel_user+": Session has expired. Please connect channel again.");
			
		}
		else if(response.error.error_subcode==460){
			aoFrm.mess("alert",channel_user+" : The session has been invalidated because the user has changed the password.Please connect channel again");
		}
		else
			{
			aoFrm.mess("alert",channel_user+" : An unknown error occurred. Please connect channel again");
			}
		return;
		//fbLogin();
	}
	function checkAccountFqlError(response,type,channel_user){
		
		current_id=type;
		if(response.error_subcode==463){
			aoFrm.mess("alert",channel_user+ " : Session has expired. Please connect channel again.");
			
		}
		else if(response.error_subcode==460){
			aoFrm.mess("alert",channel_user+ " : The session has been invalidated because the user has changed the password.Please connect channel again");
		}
		else
			{
			aoFrm.mess("alert",channel_user+ " :  An unknown error occurred. Please connect channel again");
			}
		return;
		//fbLogin();
	}

	function checkToken(access_token){
		 FB.api('/me', function(response) {
			
			 	var id= response.id;
	 	         var url_image= "https://graph.facebook.com/"+response.id+"/picture";
	 	         var channel_user=response.name;
			 	 var sourceString=[];        
			 	sourceString.push({
		            name: "pchannel_detail_id", 
		            value: id
		        }); 
			 	sourceString.push({
		            name: "Action", 
		            value: "checktoken"
		        });
	 	$.ajax({
			 type:'POST',
			  url : 'ConnectChannel.do',
			  dataType: 'text',
			  data: sourceString,
			  success : function(source) {
				  if(!isNull(source)){
					  var token_fb =source.trim();
					  $.ajax({
							 type:'GET',
							  url : 'https://graph.facebook.com/oauth/access_token_info?client_id='+app_id+'&access_token='+token_fb,
							  dataType: 'json',
							  success : function(source) {
							  var dataString =[];
						         dataString.push({
						             name: "fb_exchange_token", 
						             value: access_token
						         });
						         dataString.push({
						             name: "channel_user", 
						             value: channel_user 
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
						             value: "facebookpage"
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
							 
					  
				  },
				  error: function(request,error) 
				  {
					  var dataString =[];
				         dataString.push({
				             name: "fb_exchange_token", 
				             value: access_token
				         });
				         dataString.push({
				             name: "channel_user", 
				             value: channel_user 
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
				  }
					  })
			  }
	 	   }
	 
	 	          }); 
	});
	}
	
	 function saveInforProfile(channel_detail_id,token_user){
		 var current_date = formatDateCurrent();
		  current_date = current_date + " 24:00:00";
						  var dataString =[];
				      		 dataString.push({
				             name: "channel_detail_id", 
				             value: channel_detail_id
				         });
				         dataString.push({
				             name: "access_token", 
				             value: token_user
				         });
				         dataString.push({
				             name: "Action", 
				             value: "fb"
				         });
				         dataString.push({
				             name: "send_date", 
				             value: "'"+current_date+"'"
				         }); 
				         
						  $.ajax({
							  url : 'Follower.do',
							  dataType: 'json',
							  data: dataString,
							  success : function(source) {
								  
							  }
						  });
	 }
function getChannel_Monitoring(source){
	 $("#monitoring_facebook_page .box-header").empty();
	 $("#monitoring_facebook_profile .box-header").empty();
	for(var i=0; i<source.length;i++){
		if(source[i].channel_id=="1"){
			var type_fb="home";
	    	array_channel_profile_detail.push({"channel_detail_id":source[i].channel_detail_id,"last_view":source[i].last_view,"type":type_fb,"access_token": source[i].token_user});
	  
	    var htmlUser = "<div id='user_" + source[i].channel_detail_id + "' user_name='"+source[i].channel_user+"' pchannel-id='"+source[i].pchannel_id+"' class='block-name' channel-id='"+source[i].channel_id+"' channel-detail-id='" + source[i].channel_detail_id + "' token-user='" + source[i].token_user + "' ><span id='number_"+source[i].channel_detail_id+"' style='display:none;margin-right: 3px' class='badge badge-dark-red'></span><i class='icon-user'></i> <span>"+ source[i].channel_user +"</span></div>";
	    $("#monitoring_facebook_profile .box-header").append(htmlUser);
	    $("#monitoring_facebook_profile #content-fb").attr("channel-detail-id",$("#monitoring_facebook_profile .block-name:eq(0)").attr("channel-detail-id"));	
		}
		else if(source[i].channel_id=="2")
			{
			var type_fb="feed";
			array_channel_page_detail.push({"channel_detail_id":source[i].channel_detail_id,"last_view":source[i].last_view,"type":type_fb,"access_token": source[i].token_user});
			var htmlUser = "<div id='user_" + source[i].channel_detail_id + "' pchannel-id='"+source[i].pchannel_id+"' class='block-name' channel-id='"+source[i].channel_id+"' channel-detail-id='" + source[i].channel_detail_id + "' token-user='" + source[i].token_user + "' ><span id='number_"+source[i].channel_detail_id+"' style='display:none;margin-right: 3px' class='badge badge-dark-red'></span><i class='icon-user'></i> <span title='"+source[i].channel_user+"'>"+ limitString(source[i].channel_user) +"</span></div>";
			 $("#monitoring_facebook_page .box-header").append(htmlUser);
			    $("#monitoring_facebook_page #content-fb").attr("channel-detail-id",$("#monitoring_facebook_page .block-name:eq(0)").attr("channel-detail-id"));
			}
		}
	 $("#monitoring_facebook_profile #header_channel div").click(function()
			    {
			    	friends_count = "";
			    	$("#monitoring_facebook_profile .postBox .box-content .timeline").empty();
			    	$("#monitoring_facebook_profile .box-header .block-name").removeClass("active");
			    	$(this).addClass("active");
			    	$("#monitoring_facebook_profile .postBox .box-content .timeline").empty();
			    	$("#monitoring_facebook_profile #fb_menu_left").hide();
			    	$("#monitoring_facebook_profile #content-fb").attr("channel-detail-id",$(this).attr("channel-detail-id"));
			    	var _channel_detail_id = $(this).attr("channel-detail-id");
			    	var _token_user = $(this).attr("token-user");
			    	 var _channel_id = $(this).attr("channel-id");
			    	 var _time_last =$(this).attr("time_view");
			    	 var channel_user=$(this).attr("user_name");
			    	var url_image_user = 'https://graph.facebook.com/'+$(this).attr('channel-detail-id')+'/picture';
			    	getpostuser(_channel_id,_channel_detail_id,_token_user,url_image_user,type_fb,_time_last,channel_user);								    	
			    	//getAllFriends(_channel_id,_channel_detail_id,_token_user,url_image_user);
			    	updateLastview(_channel_detail_id,_channel_id,_time_last);
			    });
	$("#monitoring_facebook_page #header_channel div").click(function()
		    {
		    	friends_count = "";
		    	$("#monitoring_facebook_page .postBox .box-content .timeline").empty();
		    	$("#monitoring_facebook_page .box-header .block-name").removeClass("active");
		    	$(this).addClass("active");
		    	$("#monitoring_facebook_page .postBox .box-content .timeline").empty();
		    	$("#monitoring_facebook_page #fb_menu_left").hide();
		    	$("#monitoring_facebook_page #content-fb").attr("channel-detail-id",$(this).attr("channel-detail-id"));
		    	var _channel_detail_id = $(this).attr("channel-detail-id");
		    	var _token_user = $(this).attr("token-user");
		    	var _channel_id = $(this).attr("channel-id");
		    	var _time_last =$(this).attr("time_view");
		    	var channel_user=$(this).attr("channel_user");
		    	var url_image_user = 'https://graph.facebook.com/'+$(this).attr('channel-detail-id')+'/picture';
		    	//getFriends(_channel_detail_id,_token_user);
		    	
		    	getpostuser(_channel_id,_channel_detail_id,_token_user,url_image_user,"feed",_time_last,channel_user);								    	
		    	//pageLikeOfFacebookprofile(_channel_detail_id,_token_user);
		    	//getAllFriends(_channel_id,_channel_detail_id,_token_user,url_image_user);
		    	updateLastview(_channel_detail_id,_channel_id,_time_last);
		    });
	var pchannel_fb_profile = $("#monitoring_facebook_profile #header_channel div:first").attr("channel-detail-id");
    if(!isNull(pchannel_fb_profile)){
    	$("#monitoring_facebook_profile #header_channel div:first").click();
    }
	checkEmptyChannelMonitoring("#monitoring_facebook_profile");
	var pchannel_page = $("#monitoring_facebook_page #header_channel div:first").attr("channel-detail-id");
    if(!isNull(pchannel_page)){
    	$("#monitoring_facebook_page #header_channel div:first").click();
    }
	checkEmptyChannelMonitoring("#monitoring_facebook_page");
}
function saveInforTwitter(channel_detail_id, token_user){
	var current_date = formatDateCurrent();
	  current_date = current_date + " 24:00:00";
	 var dataString =[];
		 dataString.push({
     name: "channel_detail_id", 
     value: channel_detail_id
 });
 dataString.push({
     name: "access_token", 
     value: token_user
 });
 dataString.push({
     name: "Action", 
     value: "follow"
 });
 dataString.push({
     name: "send_date", 
     value: "'"+current_date+"'"
 }); 
 
  $.ajax({
	  url : 'Follower.do',
	  dataType: 'json',
	  data: dataString,
	  success : function(source) {
		  
	  }
  });
}

