/***************************************************************************
 Page Code:	monitoring/facebook
 First Author:
 Created Date: 
 **************************************************************************/
var _curentUser = -1;
var _moreUser = false;
var _scrollLoad = false; 
var _posPage = 1;
var _posNumBeforedays = 1;
var _posBeforedays;
var _token_user;
var count = 0;
var url_image_user;
var count_offer=0;
var friends_count;
var fans_count = 0;
var user_id;
var _tooltipTimeOut;
//var array_channel_page_detail= new Array();
//var _boxContent = 0;
var image_user = 'https://graph.facebook.com/'+facebook_user_id+'/picture';
var type_loadmore='feed';
//$( document ).unbind();
$(document).scroll(function(e) {	
	
	if(!_scrollLoad) return;
	var aTop = $(document).innerHeight();
	var hW = $(window).height();
	var posLoad = $(document).scrollTop() + hW;
	if(posLoad >=aTop ){
		
		//_autoFindPost = 0;//what's use?
		getpostuserloadmore();				
	}
});

$( document ).ready(function() {
	checkExprired();
	var tooltip = $("#tooltip-profile").clone();	
	$("#tooltip-profile").remove();
	$("body").append(tooltip);
	$("#tooltip-profile").mouseleave(function(e) {
        clearTimeout(_tooltipTimeOut);
        $("#tooltip-profile").hide();
     });
	$("#tooltip-profile").mouseover(function(e) {
		$("#tooltip-profile").show();
		clearTimeout(_tooltipTimeOut);
	});
	if(load_analysis==true){
	getChannelReport();
	}
	var refesh = setInterval(function() {
		getPostofChannel();	 
	  },180000);
	
});

	function getTotalLike(list_post_id,token_user,comment_like_count){
		var list_post_id=list_post_id.substring(1);
		var query = "SELECT post_id,like_info,share_count,comment_info FROM stream where post_id in ("+list_post_id+")";
	
		FB.api({method: 'fql.query',
	        query: query,access_token:token_user
	      },function(response) {
	    	  for(var i=0;i<response.length;i++){
	    		  var like_count = 0;
					var share_count = 0;
					var comment_count = 0;
					var active = 0;
					var post_id=response[i].post_id;
						share_count = response[i].share_count;
				    	  like_count = response[i].like_info.like_count;
				    	  comment_count = response[i].comment_info.comment_count;
				    	  active = like_count + share_count + comment_count + comment_like_count;
				    	  $("#monitoring_facebook_page #"+post_id+" .block-actions .engagement-num").attr("active",active);
				    	  $("#monitoring_facebook_page #"+post_id+" .block-actions .like-num").html(like_count);
				    	  $("#monitoring_facebook_page #"+post_id+" .block-actions .comment-num").html(comment_count);
				    	  $("#monitoring_facebook_page #"+post_id+" .block-actions .share-num").html(share_count);
  
	    	  }
	    	  				
	      });
	}
	
	function getFbEngagement(list_post_id,token_user){
		/*var list_post_id=list_post_id.substring(1);
		var str_post_id=list_post_id.split(",");
		if(array_profile_id.length>0){
			var list_profile_id="";
			for(var i=0; i<array_profile_id.length;i++ ){
				list_profile_id =list_profile_id+","+'"'+array_profile_id[i]+'"';
				
			}
			list_profile_id=list_profile_id.substring(1);
			var query = "SELECT uid,wall_count,friend_count FROM user where uid in ("+list_profile_id+")";	
			FB.api({method: 'fql.query',
		        query: query,access_token:token_user
		      },function(response) {
		    	  for(var i=0;i<response.length;i++){
		    		 for(var k=0;k<str_post_id.length;k++){
		    			 var post_id=str_post_id[k];
		    			 var str_user_id=post_id.split("_");
		    			 if(str_user_id[0]==response[i].uid){
		    				 var active = $("#monitoring_facebook_page #"+post_id+" .block-actions .engagement-num").attr("active");
		    				 if (response[i].wall_count == 0 || response[i].friend_count == 0||isNull(response[i].wall_count)||isNull(response[i].friend_count)){
									engagement = 0;
								}else{
									engagement = ((active/response[i].wall_count)/response[i].friend_count)*100;
									engagement = Math.floor(engagement*100)/100;
								}
								$("#monitoring_facebook_page #"+post_id+" .block-actions .engagement-num").html(engagement);
		    			 }
		    		 }
					}
		    	  
		    	  				
		      });
		}
		if(array_page_id.length>0){
			var list_page_id="";
			for(var j=0; j<array_page_id.length;j++ ){
				list_page_id =list_page_id+","+'"'+array_page_id[j]+'"';
				
			}
			list_page_id=list_page_id.substring(1);
			FB.api({method: 'fql.multiquery',queries:{
	  			query1: "SELECT page_id,fan_count FROM page where page_id= "+list_page_id,
	  			query2: "SELECT post_id FROM stream where source_id in ("+list_page_id+") limit 200"
			},access_token:token_user
		      },function(response) {
		    	 
		    	  var wall_count=response[1].fql_result_set.length;
		    	
		    	  for(var i=0;i<response[0].fql_result_set.length;i++){
		    	  for(var k=0;k<str_post_id.length;k++){
		    			 var post_id=str_post_id[k];
		    			 var str_user_id=post_id.split("_");
		    			 if(str_user_id[0]==response[0].fql_result_set[i].page_id){
		    				 var active = $("#monitoring_facebook_page #"+post_id+" .block-actions .engagement-num").attr("active");
		    				 if (wall_count == 0 || response[0].fql_result_set[i].fan_count == 0||isNull(wall_count)||isNull(response[0].fql_result_set[i].fan_count)){
									engagement = 0;
								}else{
									engagement = ((active/wall_count)/response[0].fql_result_set[i].fan_count)*100;
									engagement = Math.floor(engagement*100)/100;
								}
								$("#monitoring_facebook_page #"+post_id+" .block-actions .engagement-num").html(engagement);
		    			 }
		    		 }
		    	  }
		    	  
		    	  				
		      });
		}	*/
		var strid = list_post_id.substring(1);
		var query = "";
			query = "SELECT value,object_id FROM insights WHERE object_id IN ("+strid+") AND metric ='post_engaged_users' AND period='lifetime'";
			FB.api({method: 'fql.query',
	    query: query,access_token:token_user
	  },function(response) {
		  //array_content_top_20_export
			for (var i=0; i<response.length;i++)
				{
				$("#monitoring_facebook_page #"+response[i].object_id+" .block-actions .engagement-num").html(response[i].value);
				//$("#tr_"+response[i].object_id).find("td.show-amount").text(response[i].value); 
				
				}
			});	
	
	}
	
	function getFans(channel_detail_id,token_page){
		FB.api('/'+channel_detail_id+'/insights/page_fans',{access_token:token_page}, function(response) {
			if (!isNull(response.data)){
				for (var i=0;i<response.data[0].values.length;i++){
					
					fans_count = response.data[0].values[i].value;
				}
			}
		});
	}
		
	function getpostuser(channel_id,channel_detail_id,token_user,url_image_user,type,_time_last,channel_user){
		$("#monitoring_facebook_page .postBox .box-content .timeline").empty();		
		$("#monitoring_facebook_page .postBox .box-content .timeline").addClass("itemLoading");
		$("#content_message_all").show();
		$("#message_detail_1").hide();
		var list_post_id="";
		var image_cover;
		var category;
		var fan_friend_num = 0;
		var array_page_id=new Array();
		var array_profile_id=new Array();
		FB
		.api(
				'/'+channel_detail_id+'/'+type,
				'get',{access_token:token_user},
				function(response) {
					if(!isNull(response.error)){
						$("#monitoring_facebook_page .postBox .box-content .timeline").removeClass("itemLoading");
						 checkAccountError(response,"facebookpage",channel_user);
					}
					 else {	
						 aoFrm.mess("close","close");
						var id;
					
						var time;
						var strTime;
						var name;
						var hmtlGeneral;
						var inputcomment;
						var post_id;
						var picture;
						var url_image;
						var like_count = 0;
						var link_picture;
						var comment_count = 0;
						var share_count = 0;
						var comment_like_count = 0;
						var engagement = 0;
						var post_count = 0;
						var active = 0;
						var time_post=0;
						var link_post="";
					
						var url_profile = 'https://www.facebook.com/' + channel_detail_id;
						var url_profile_post = '';
						$("#monitoring_facebook_page .postBox .box-content .timeline").removeClass("itemLoading");
						for ( var i = 0; i < response.data.length; i++) {
							var div="content_message_all";
							var display_like="";
							var display_comment="";
							var new_post ="";
							var message="";
							var display="none";
							count++;
							var fb_page=0;
							id = response.data[i].from.id;
							post_id = response.data[i].id;
							list_post_id =list_post_id+","+'"'+post_id+'"';
							post_count = response.data.length;
							time_post=toTimestamp(response.data[i].created_time)-1;
							if (!isNull(response.data[i].message)) {
								message = response.data[i].message;
							}
							else if (!isNull(response.data[i].description)){
								message = response.data[i].description;
							}
							if(!isNull(message)){
								if(!isNull(response.data[i].actions)){
									display_like="";
									display_comment="";
								}
								else
									{
									display_like="none";
									display_comment="none";
									}
								if(!isNull(response.data[i].from.category))	{
									fb_page=1;
									array_page_id = array_page_id.filter(function(v) { return v != id;});
									array_page_id.push(id)
								}
								else
									{
									fb_page=0;
									array_profile_id = array_profile_id.filter(function(v) { return v != id;});
									array_profile_id.push(id)
									}
								
								url_profile_post = 'https://www.facebook.com/' + id;
								strTime = response.data[i].created_time;
								//long_time_create=toTimestamp(strTime);
								time = formatDateGMT(strTime);
								//time = time.replace("+0000"," ");
								url_image= 'https://graph.facebook.com/'+response.data[i].from.id+'/picture';
								name = response.data[i].from.name;
								
								 if(!isNull(response.data[i].link))
								  {
									 link_picture = response.data[i].link;
									 display="";
								  }
								 else{
									 link_picture="";
									 display="none"
								 }
								if(!isNull(response.data[i].actions))
									 link_post=response.data[i].actions[0].link;
									else
									link_post=response.data[i].link;
									
								if (!isNull(response.data[i].comments)){
									
									for (var j=0;j<response.data[i].comments.data.length;j++){
										comment_like_count = comment_like_count + response.data[i].comments.data[j].like_count;
									}
									
								}else{
									comment_like_count = 0;
								}
								
								if (!isNull(response.data[i].picture)){
									picture = response.data[i].picture;
								}else{
									picture = "";
								}
							
								if(_time_last<=time_post){
									
									new_post ='<span id="number_new" style="margin-right:5px" class="badge badge-dark-red">New</span>';
								}

									hmtlGeneral = '<li count="'+count+'" fb_page="'+fb_page+'" id="'+ post_id +'" channel-id="'+channel_id+'" channel-detail-id="'+id+'" link_post="'+link_post+'" access-token="'+token_user+'" class="arrow-box-left gray facebook itemNew" chanel-type="facebook"><div class="avatar"><img class="avatar-small" id="avatar-post" src="'
									+ url_image
									+ '"><i class="icon-facebook-sign blue channel-icon" ></i></div>'
									+ '<div class="content"><div class="block-name">'+new_post+'<a href="'+url_profile_post+'" target="_blank"><span class="name"><strong class="indent">'
									+ name
									+'</strong></span></a><span class="timePost" time-post="'+time_post+'">' +time +'</span> </div><span style="cursor:pointer" class ="detail_id" title="Click to comment" id="detail_id"><blockquote class="status">'
									+ replaceURLWithHTMLLinks(message)
									+ '</blockquote></span><div style="display:'+display+'" class="picture"><a href="'+link_picture+'" target="_blank"><img src="'+ picture +'" alt=""/></a></div></div><div class="info navbar"><div class="content_share" onclick="shareContent('+"'"+post_id+"'"+');"><i class="icon-share" title="Share this post"></i></div><div style="display:'+display_like+'" class="menuLike liked" title="" id="like-click"><i class="icon-thumbs-up" title="Like this post" id="like_'+post_id+'"></i></div><div class="menuDelFb" id="delete" onclick="deleteStatus('+"'"+post_id+"'"+','+"'"+ token_user+"'"+','+"'"+ div+"'"+')" title="Delete this post"><i class="icon-eraser"></i></div><div class="content_share" title="" id="comment-click"><i class="icon-reply" title="Comment this post" onclick="comment('+"'"+post_id+"'"+','+"'"+ channel_detail_id+"'"+')" id="comment_'+post_id+'"></i></div><ul class="menu_task nav" style="display:none"><li><i title="Create New Task" class="icon-tasks dropdown-toggle" data-toggle="dropdown"></i><ul class="dropdown-menu" id="dropdown_menu"><li><a title="" type="0" href="javascript:void(0)"><span text="task_general">General</span></a></li><li class="divider" style="margin:1px 1px"></li><li><a title="" type="1" href="javascript:void(0)"><span text="task_sale">Sale Lead</span></a></li><li class="divider" style="margin:1px 1px"></li><li><a title="" type="2" href="javascript:void(0)"><span text="task_support">Support</span></a></li></ul></li></ul></span><div class="block-actions"><i class="icon-thumbs-up-alt" title="Like"></i><span class="like-num">0</span><i class="icon-comment" title="Comment"></i><span class="comment-num">0</span><i class="icon-share" title="Share"></i><span class="share-num">0</span><i class="icon-meh" title="Like on comment"></i><span id="comment-like-num">'+comment_like_count+'</span><i class="icon-user" title="Engagement"></i><span class="engagement-num"  active="'+active+'" post-count="'+post_count+'">0</span></div></div></div></li>';
									$("#monitoring_facebook_page #content_message_all").append(hmtlGeneral);
								
								//getComment(post_id,channel_detail_id,token_user,count);
								// Check Like
														
								//getTotalLike(post_id,token_user,comment_like_count);						
								//getFbEngagement(channel_detail_id,post_id,token_user);	
							}	
							
						}
						getTotalLike(list_post_id,token_user,0);
						checkLikeUnLike(list_post_id,channel_detail_id,token_user);	
						getFbEngagement(list_post_id,token_user);
						getLikeOfComment(list_post_id,token_user)
						
					/*	setTimeout(function(){
							clickLikeComment(count);
						},2000);*/
						
						$("#monitoring_facebook_page #like-click").click(function(){							
							var id = $(this).parent().parent().attr("id");
							var access_token = $(this).parent().parent().attr("access-token");
							if(!isNull(id))
							{	
								if ($(this).hasClass("liked")){
									fbLike(id,access_token);																			
									$("#like_" + id).attr("class","icon-thumbs-down");
									$("#like_" + id).parent().removeClass("liked");
									$("#like_" + id).attr("title","Unlike");
									$("#like_" + id).parent().addClass("unlike");
									
								}else{												
									fbUnLike(id,access_token);
									$("#like_" + id).attr("class","icon-thumbs-up");
									$("#like_" + id).parent().removeClass("unlike");
									$("#like_" + id).attr("title","Like this post");
									$("#like_" + id).parent().addClass("liked");												
								}
							}
						});
						$("#monitoring_facebook_page .detail_id").click(function(){
							var post_id=$(this).parent().parent().attr("id");
							getDetail(post_id,channel_detail_id);	
							
						});
						$("#monitoring_facebook_page .dropdown-menu li a").click(function(){
							
							var type_task= $(this).attr("type");
							var task_id=$(this).parent().parent().parent().parent().parent().parent().attr("id");
							
							var message=$("#"+task_id+" .content blockquote").html();
							
							var avatar_task=$("#"+task_id+" #avatar-post").attr("src");
							var time_post=$("#"+task_id+" .content .timePost").attr("time-post");
							var create_at=$("#"+task_id+" .content .timePost").html();
							var name =  $("#"+task_id+" .content .block-name span strong").html();
							appendCreateTask(type_task,task_id,message,avatar_task,create_at,name,time_post,1);
						});
						var idWaitForLoad;
						
					
						_scrollLoad = true;
						$(".timeline .itemNew .avatar img#avatar-post").mouseover(function(){
							var post_id = $(this).parent().parent().attr("channel-detail-id");
							var fb_page = $(this).parent().parent().attr("fb_page");
							var id = $(this).parent().parent().attr("id");
							pchannel_detail_id = id.split("_");
							pchannel_detail_id = pchannel_detail_id[0];
							facebookProfileTip(this,post_id,pchannel_detail_id,token_user,fb_page);
						});
						}
				});
		
	}
	
	function getpostuserloadmore(){
		_scrollLoad = false;
		var	timepost = $("#monitoring_facebook_page .timeline li .block-name .timePost:last").attr("time-post");
		var channel_detail_id = $("#monitoring_facebook_page #content-fb").attr("channel-detail-id");
		var token_user = $("#monitoring_facebook_page .timeline li").attr("access-token");
		var channel_id = $("#monitoring_facebook_page .timeline li").attr("channel-id");
		var _time_last =$("#user_"+channel_detail_id).attr("time_view");
		var	url_image_user = 'https://graph.facebook.com/'+channel_detail_id+'/picture';
		count++;
		var list_post_id="";
		var array_page_id=new Array();
		var array_profile_id=new Array();
		//$("#monitoring_facebook_page .postBox .itemLoading").show();
		$("#monitoring_facebook_page .postBox .timeline li").removeClass("itemNew");
		$("#monitoring_facebook_page .postBox .timeline").append('<li class="itemLoading"></li>');
		
		FB
		.api(
				'/'+channel_detail_id+'/feed?limit=25&until='+timepost,
				'get',{access_token:token_user},
				function(response) {
					
					if (!response || response.error) {
							$("#monitoring_facebook_page .box-content .timeline .itemLoading").remove();
							$("#monitoring_facebook_page .fb_error").removeClass("hide");
							$("#monitoring_facebook_page .fb_error").html("Facebook Alert Message : <br /> " + enumerateObject(response.error));									
							
					} else {						
						var id;
						
						var strTime;
						var time;
						var name;
						var hmtlGeneral;
						var inputcomment;
						
						var picture;
						var like_count;
						var url_image;
						var link_picture;
						var like_count = 0;
						var link_picture;
						var comment_count = 0;
						var share_count = 0;
						var comment_like_count = 0;
						var engagement = 0;
						var post_count = 0;
						var active = 0;
						var url_profile = 'https://www.facebook.com/' + channel_detail_id;
						var url_profile_post = '';
						var link_post="";
						
						//$("#monitoring_facebook_page .postBox .box-content .timeline").empty();
						$("#monitoring_facebook_page .itemLoading").fadeOut();
						//count++;
						for ( var i = 0; i < response.data.length; i++) {
							
							var div="content_message_all";
							var display_like="";
							var display_comment="";
							var message="";
							var display="none";
							var new_post ="";
							var fb_page=0;
							var post_id = response.data[i].id;
							id = response.data[i].from.id;
							list_post_id =list_post_id+","+'"'+post_id+'"';
							post_count = response.data.length;
							if (!isNull(response.data[i].message)) {
								message = response.data[i].message;
							}
							 else if (!isNull(response.data[i].description)){
								 message = response.data[i].description; 
							 }
							if(!isNull(message)){
								if(!isNull(response.data[i].actions)){
									display_like="";
									display_comment="";
								}
								else
									{
									display_like="none";
									display_comment="none";
									}
								if(!isNull(response.data[i].from.category))	{
									fb_page=1;
									array_page_id = array_page_id.filter(function(v) { return v != id;});
									array_page_id.push(id)
								}
								else
									{
									fb_page=0;
									array_profile_id = array_profile_id.filter(function(v) { return v != id;});
									array_profile_id.push(id)
									}
								
								url_profile_post = 'https://www.facebook.com/' + id;
								strTime = response.data[i].created_time;
								time = formatDateGMT(strTime);
								var time_post=toTimestamp(response.data[i].created_time)-1;
								url_image= 'https://graph.facebook.com/'+response.data[i].from.id+'/picture';
								name = response.data[i].from.name;
								
								 if(!isNull(response.data[i].link))
								  {
									 link_picture = response.data[i].link;
									 display="";
								  }
								 else{
									 link_picture="";
									 display="none";
								 }
								if(!isNull(response.data[i].actions))
									 link_post=response.data[i].actions[0].link;
									else
									link_post=response.data[i].link;
									
								if (!isNull(response.data[i].picture)){
									picture = response.data[i].picture;
								}else{
									picture = "";
								}
								if (!isNull(response.data[i].picture)){
									picture = response.data[i].picture;
								}else{
									picture = "";
								}
								
								if (!isNull(response.data[i].comments)){
									for (var j=0;j<response.data[i].comments.data.length;j++){
										comment_like_count = comment_like_count + response.data[i].comments.data[j].like_count;
									}
									
								}else{
									comment_like_count = 0;
								}
								if(_time_last<=time_post){
									
									new_post ='<span id="number_new" style="margin-right:5px" class="badge badge-dark-red">New</span>';
								}
									hmtlGeneral = '<li count="'+count+'" fb_page="'+fb_page+'" id="'+ post_id +'" channel-id="'+channel_id+'" channel-detail-id="'+id+'" link_post="'+link_post+'" access-token="'+token_user+'" class="arrow-box-left gray facebook itemNew" chanel-type="facebook"><div class="avatar"><img class="avatar-small" id="avatar-post" src="'
									+ url_image
									+ '"><i class="icon-facebook-sign blue channel-icon" ></i></div>'
									+ '<div class="content"><div class="block-name">'+new_post+'<a href="'+url_profile_post+'" target="_blank"><span class="name"><strong class="indent">'
									+ name
									+'</strong></a></span><span class="timePost" time-post="'+time_post+'">' +time +'</span> </div><span style="cursor:pointer" class ="detail_id_more_'+count+'" title="Click to comment" id="detail_id" ><blockquote class="status">'
									+ replaceURLWithHTMLLinks(message)
									+ '</blockquote></span><div style="display:'+display+'" class="picture"><a href="'+link_picture+'" target="_blank"><img src="'+ picture +'" alt=""/></a></div></div><div class="info navbar"><div class="content_share" onclick="shareContent('+"'"+post_id+"'"+');"><i class="icon-share" title="Share this post"></i></div><div style="display:'+display_like+'" class="menuLike liked" title="" id="like-click-more'+count+'"><i class="icon-thumbs-up" title="Like this post" id="like_'+post_id+'"></i></div><div class="menuDelFb" id="delete" onclick="deleteStatus('+"'"+post_id+"'"+','+"'"+ token_user+"'"+','+"'"+ div+"'"+')" title="Delete this post"><i class="icon-eraser"></i></div><div class="content_share" title="" id="comment-click"><i class="icon-reply" title="Comment this post" onclick="comment('+"'"+post_id+"'"+','+"'"+ channel_detail_id+"'"+')" id="comment_'+post_id+'"></i></div><ul class="menu_task nav" style="display:none"><li><i title="Create New Task" class="icon-tasks dropdown-toggle" data-toggle="dropdown"></i><ul class="dropdown-menu" id="dropdown_menu_'+post_id+'"><li><a title="" type="0" href="javascript:void(0)"><span text="general">General</span></a></li><li class="divider" style="margin:1px 1px"></li><li><a title="" type="1" href="javascript:void(0)"><span text="sale_lead">Sale Lead</span></a></li><li class="divider" style="margin:1px 1px"></li><li><a title="" type="2" href="javascript:void(0)"><span text="support">Support</span></a></li></ul></li></ul></span><div class="block-actions"><i class="icon-thumbs-up-alt" title="Like"></i><span class="like-num">0</span><i class="icon-comment" title="Comment"></i><span class="comment-num">0</span><i class="icon-share" title="Share"></i><span class="share-num">0</span><i class="icon-meh" title="Like on comment"></i><span id="comment-like-num">'+comment_like_count+'</span><i class="icon-user" title="Engagement"></i><span class="engagement-num"  active="'+active+'" post-count="'+post_count+'">0</span></div></div></div></li>';
									$("#monitoring_facebook_page #content_message_all").append(hmtlGeneral);
								
						
							$("#monitoring_facebook_page .postBox .timeline").remove("itemLoading");
							
							//getComment(post_id,channel_detail_id,token_user,count);
							// Check Like
							//checkLikeUnLike(post_id,channel_detail_id,token_user);
													
							
						/*
						setTimeout(function(){
							clickLikeComment(count);
						},2000);*/
						
						$("#monitoring_facebook_page #like-click-more"+count+"").click(function(){
							var id = $(this).parent().parent().attr("id");
							var access_token = $(this).parent().parent().attr("access-token");
							if(!isNull(id))
							{	
								if ($(this).hasClass("liked")){
									fbLike(id,access_token);																			
									$("#like_" + id).attr("class","icon-thumbs-down");
									$("#like_" + id).parent().removeClass("liked");
									$("#like_" + id).attr("title","Unlike");
									$("#like_" + id).parent().addClass("unlike");
									
								}else{												
									fbUnLike(id,access_token);
									$("#like_" + id).attr("class","icon-thumbs-up");
									$("#like_" + id).parent().removeClass("unlike");
									$("#like_" + id).attr("title","Like this post");
									$("#like_" + id).parent().addClass("liked");												
								}
							}
						});
						
						$("#monitoring_facebook_page #dropdown_menu_"+post_id+" li a").click(function(){
							
							var type_task= $(this).attr("type");
							var task_id=$(this).parent().parent().parent().parent().parent().parent().attr("id");
							var message=$("#"+task_id+" .content blockquote").html();
							var avatar_task=$("#"+task_id+" #avatar-post").attr("src");
							var time_post=$("#"+task_id+" .content .timePost").attr("time-post");
							var create_at=$("#"+task_id+" .content .timePost").html();
							var name =  $("#"+task_id+" .content .block-name span strong").html();
	
							appendCreateTask(type_task,task_id,message,avatar_task,create_at,name,time_post,1);
						});
						if (response.data.length == 1) return;
						
						var idWaitForLoad;
						
							}
							
						}
						$("#monitoring_facebook_page .detail_id_more_"+count).click(function(){
							
							var post_id=$(this).parent().parent().attr("id");
							getDetail(post_id,channel_detail_id);	
						});
						getTotalLike(list_post_id,token_user,0);
						checkLikeUnLike(list_post_id,channel_detail_id,token_user);
						getFbEngagement(list_post_id,token_user);
						getLikeOfComment(list_post_id,token_user)
						_scrollLoad = true;
						$(".timeline .itemNew .avatar img#avatar-post").mouseover(function(){
							var post_id = $(this).parent().parent().attr("channel-detail-id");
							var id = $(this).parent().parent().attr("id");
							var fb_page = $(this).parent().parent().attr("fb_page");
							pchannel_detail_id = id.split("_");
							pchannel_detail_id = pchannel_detail_id[0];
							facebookProfileTip(this,post_id,pchannel_detail_id,token_user,fb_page);
						});
						}
				});
		
	}
	/*
	function getComment(id,channel_detail_id,access_token,count){
		$("#"+ id +" .block-comment").empty();
	
	  FB
		.api(
				'/'+id+'/comments',
				'get',{access_token:access_token},
				function(response) {
					var user_comment;
					var htmlGuestComment;
					var commentImage;
					var commentName;
					var strTime;
					var commentTime;
					var commentMessage;
					var url_comment = '';
					for ( var i = 0; i < response.data.length; i++){
						user_comment = response.data[i].from.id;
						commentName = response.data[i].from.name;
						commentImage = 'https://graph.facebook.com/'+response.data[i].from.id+'/picture';
						url_comment = 'https://www.facebook.com/' + response.data[i].from.id;
						strTime = response.data[i].created_time;
						//commentTime = strTime.replace("T"," ");
						commentTime = formatDateGMT(strTime);
						//commentTime = commentTime.replace("+0000"," ");
						commentMessage = response.data[i].message;
						comment_id = response.data[i].id;
     					if (channel_detail_id==user_comment){
							htmlGuestComment = '<div count="'+count+'" class="guest-comment" user_comment="'+user_comment+'" post_id="'+id+'" id="'+comment_id+'"><div class="gray facebook comment"><div class="avatar"><a href="'+url_comment+'" target="_blank"><img src="'+commentImage+'" class="avatar-small"></a></div></div><div class="arrow-box-left content"><div class="block-content"><blockquote><span class="name"><strong class="indent">'+commentName+'</strong></span> '+replaceURLWithHTMLLinks(commentMessage)+'</blockquote></div><div class="info"> <span class="timePost">'+commentTime+'</span> </div><div id="click-like-comment'+count+'" class="likeComment liked"><i class="icon-thumbs-up" id="like_comment_'+comment_id+'" title=""></i></div><i class="icon-eraser delComment" onclick="delComment('+"'"+comment_id+"'"+','+"'"+access_token+"'"+')" title="delete this comment"></i></div></div>';
						}else{
							htmlGuestComment = '<div count="'+count+'" class="guest-comment" user_comment="'+user_comment+'" id="'+comment_id+'"><div class="gray facebook comment"><div class="avatar"><a href="'+url_comment+'" target="_blank"><img src="'+commentImage+'" class="avatar-small"></a></div></div><div class="arrow-box-left content"><div class="block-content"><blockquote><span class="name"><strong class="indent">'+commentName+'</strong></span> '+replaceURLWithHTMLLinks(commentMessage)+'</blockquote></div><div class="info"> <span class="timePost">'+commentTime+'</span> </div><div id="click-like-comment'+count+'" class="likeComment liked"><i class="icon-thumbs-up" id="like_comment_'+comment_id+'" title=""></i></div></div></div>';
						}
						
						$("#"+ id +" .block-comment").append(htmlGuestComment);
						// Check Like Comment
						checkLikeUnLikeComment(comment_id,channel_detail_id,access_token);	
						}
					
					}
				); 
			

	}*/
	
	function checkLikeUnLike(list_post_id,channel_detail_id,token_user){
		
		var list_post_id=list_post_id.substring(1);
		var query = "SELECT post_id,user_id FROM like where post_id in ("+list_post_id+")";
	
		FB.api({method: 'fql.query',
	        query: query,access_token:token_user
	      },function(response) {
	    	  for(var i=0;i<response.length;i++){
	    		  var _obj = $('.timeline #'+ response[i].post_id +' .menuLike');
	    		  if(response[i].user_id == channel_detail_id)
					{
						$(_obj).find("i").attr("class","icon-thumbs-down");
						$(_obj).find("i").attr("title","Unlike");
						$(_obj).addClass("unlike");
						$(_obj).removeClass("liked");						
					}
				}
	    	  
	    	  				
	      });
		
	}
	
	function updateLastview(channel_detail_id,channel_id,time_last){
		var current_date = new Date();//user_
		//var first_time_post = $("#monitoring_facebook_page .timeline li:first .info .timePost").attr("time-post");
		$("#number_"+channel_detail_id).hide();
		
		current_date= toTimestamp(current_date);
		$("#user_"+channel_detail_id).attr("time_view",time_last);
		for(var i=0; i<array_channel_page_detail.length;i++){
				if(array_channel_page_detail[i].channel_detail_id==channel_detail_id)
					array_channel_page_detail[i].last_view=current_date+"000";
				}

		var dataString =[];
         dataString.push({
             name: "channel_detail_id", 
             value: channel_detail_id
         });
        
         dataString.push({
             name: "Action", 
             value: "update"
         }); 
	 	      $.ajax({
			 type:'POST',
			  url : 'ConnectChannel.do',
			  dataType: 'text',
			  data: dataString,
			  success : function(source) {
				  
			  }
	 	   });
	}
	function getPostofChannel(){
  		for(var i=0; i<array_channel_page_detail.length;i++){
  			var last_time=parseInt(array_channel_page_detail[i].last_view)/1000;
  			var channel_detail_id=array_channel_page_detail[i].channel_detail_id;
  			getnewPost(channel_detail_id,array_channel_page_detail[i].access_token,last_time,array_channel_page_detail[i].type);
  		   
  		}
  	}
	function getnewPost(channel_detail_id,access_token,last_time,type){
		$("#number_"+channel_detail_id).hide();
	
		FB.api(
					'/'+channel_detail_id+'/'+type,
					'get',{access_token:access_token,since:last_time},
					function(response) {
						if(!isNull(response.error)){
							$("#monitoring_facebook_page .postBox .box-content .timeline").removeClass("itemLoading");
							// checkAccountError(response,"facebookpage");
								
						}
						else if(response.data.length>0){
								$("#number_"+channel_detail_id).show();
								if(response.data.length>=25){
									$("#number_"+channel_detail_id).html(response.data.length+"+");
								}
								else
									{
									$("#number_"+channel_detail_id).html(response.data.length);
									}
								
								$("#user_"+channel_detail_id).attr("time_view",last_time);
							}
								
						//}
						
					});
	}
	
	function facebookProfileTip(obj,post_id,pchannel_detail_id,token,fb_page) {
		var _top = $(obj).offset().top + $(obj).innerHeight()+ 10;
		var _left = $(obj).offset().left;
		$("#tooltip-profile #information").hide();
		$("#tooltip-profile #loading").show();
		$("#tooltip-profile").css("top",_top);
		$("#tooltip-profile").css("left",_left);
		$("#tooltip-profile").fadeIn();		
		$(obj).mouseleave(function(e) {
           clearTimeout(_tooltipTimeOut);           
		   _tooltipTimeOut = setTimeout(function(){
			   $("#tooltip-profile").fadeOut();
			},200);
        });
		
		if (fb_page==1){
			loadInformationPage(post_id,pchannel_detail_id,token);
		}else{
			loadInformationProfile(post_id,pchannel_detail_id,token);
		}
	}
	
	function loadInformationProfile(post_id,pchannel_detail_id,token){
		var channel_detail_id = $("#monitoring_facebook_page #content-fb").attr("channel-detail-id");
		var query = "";
		var image_cover = '';
	  	var image_avatar = '';
	  	var categori = '';
	  	var friend_count = 0;
	  	var profile_url = '';
	  	var subscriber_count = 0;
		var manual_friend="";
		query = "SELECT pic_cover,pic_big,friend_count,profile_url,subscriber_count,first_name,last_name,mutual_friend_count  FROM user WHERE uid = '"+post_id+"'";
		FB.api({method: 'fql.query',
	        query: query,access_token:token
	      },function(response) {
	    	  
		  	  for (var i=0;i<response.length;i++){
		  		  	if (!isNull(response[i].pic_cover))
		  			  image_cover = response[i].pic_cover.source;
			  		if (!isNull(response[i].pic_big))
			  		  image_avatar = response[i].pic_big;
			  		if (!isNull(response[i].last_name))
			  		  name = response[i].first_name+" "+response[i].last_name;
			  		if (!isNull(response[i].friend_count))
			  		  friend_count = response[i].friend_count;
			  		if (!isNull(response[i].profile_url))
			  		  profile_url = response[i].profile_url;
			  		if (!isNull(response[i].subscriber_count))
			  		  subscriber_count = response[i].subscriber_count;
			  		if (!isNull(response[i].mutual_friend_count) ){
			  			manual_friend = response[i].mutual_friend_count;
			  			
			  			if(manual_friend>0){
			  				var url_friendship_page="https://www.facebook.com/"+channel_detail_id+"?and="+username;
			  				 $("#manual_friends_page").text(manual_friend+" mutual friends");
			  				$("#manual_friends_page").css("height","14px")
					  		  $("#link_frienship_page").show();
			  				$("#link_frienship").attr("href",url_friendship_page);
			  			}
			  			else
			  				{
			  				$("#manual_friends_page").empty();
			  				$("#manual_friends_page").css("height","25px")
			  				$("#friendship_page").hide();
			  				}
			  		}
			  		 $("#fb-categori").empty();
		  		  $("#image-cover").attr("src",image_cover);
		  		  $("#image-avatar").attr("src",image_avatar);
		  		  $("#fb-name").text(name);
		  		 $("#facebook_profile_btn_page").show();
		    	  $("#facebook_page_btn_page").hide();
		  		  $("#fan-page-page").html(friend_count + "<span text='friends'> friends</span>");
		  		  $("#talking-about-page").html(subscriber_count + "<span text='follower'> follower</span>");
		  		  
		  		  $(".profile-tip-avatar a").attr("href",profile_url);
		  		  $("#page-url-send-page").attr("href",profile_url);
		  		  $("#fb-url-name").attr("href",profile_url);
		  		$("#fb-url-following-page").attr("href",profile_url)
		  	  }

	  		  $("#tooltip-profile #information").show();
			  $("#tooltip-profile #loading").hide();
			  FB.api('/'+channel_detail_id+'/friends/'+post_id,{access_token:token}, function(source) {
				  if(!isNull(source.error)){
						
						}
					else
						{
						if(source.data.length>0){
					  		$("#fb-url-add-friend-page").text("Friend");
					  	
						}
						else
							{
							
					  		$("#fb-url-add-friend-page").text("Add Friend");
					  		$("#fb-url-add-friend-page").attr("id","fb-url-add-friend-page-add-"+post_id)
					  		 $("#fb-url-add-friend-page-add-"+post_id).click(function(){
									addFriend(post_id);
								});
					  		
					  		//fb-url-following-brand
					  		
							}
						
						}
					});
	      });
		
	}
	
	function loadInformationPage(post_id,pchannel_detail_id,token){
		var query = "";
		var image_cover = '';
	  	var image_avatar = '';
	  	var categori = '';
	  	var fan_count = 0;
	  	var people_talking = 0;
	  	var page_url = '';
		query = "SELECT pic_cover,pic_large,name,categories,talking_about_count,page_url,fan_count,type FROM page WHERE page_id = '"+post_id+"'";
		FB.api({method: 'fql.query',
	        query: query,access_token:token
	      },function(response) {
		  	  for (var i=0;i<response.length;i++){
		  		if (!isNull(response[i].pic_cover))
		  			  image_cover = response[i].pic_cover.source;
		  		  if (!isNull(response[i].pic_large))
		  			  image_avatar = response[i].pic_large;
		  		  if (!isNull(response[i].name))
		  			  name = response[i].name;
		  		  if (!isNull(response[i].talking_about_count))
		  			  people_talking = response[i].talking_about_count;
		  		  if (!isNull(response[i].fan_count))
		  			  fan_count = response[i].fan_count;
		  		  if (!isNull(response[i].page_url))
		  			  page_url = response[i].page_url; 
		  		  if (!isNull(response[i].type))
		  			  categori = response[i].type;
		  		  $("#image-cover").attr("src",image_cover);
		  		  $("#image-avatar").attr("src",image_avatar);
		  		  $("#fb-name").text(name);
		  		  $("#fb-categori").text(categori);
		  		$("#manual_friends_page").empty();
		  		 $("#friendship_page").hide();
		  		$("#talking-about-page").empty();
		  		$("#manual_friends_page").css("height","25px")
		  		  $("#fan-page-page").html(fan_count + "<span text='likes'> likes</span>");
		  		 // $("#talking-about-page").html(people_talking + "<span text='peopletalking'> talking about this</span>");
		  		$("#facebook_profile_btn_page").hide();
		    	  $("#facebook_page_btn_page").show();
		  		  $(".profile-tip-avatar a").attr("href",page_url);
		  		  $("#page-url-send-page").attr("href",page_url);
		  		  $("#fb-url-name").attr("href",page_url);
		  		$("#page-url-following-page").attr("href",page_url);
		  		$("#page-url-send-page").attr("href",page_url);
		  		  $("#page-url-like-page").attr("href",page_url);
		  	  }
	    	  $("#tooltip-profile #information").show();
			  $("#tooltip-profile #loading").hide();
	      });
	}
	function getLikeOfComment(list_post_id,token_user){
		var list_post_id=list_post_id.substring(1);
		var query = "select post_id,likes from comment where  post_id in ("+list_post_id+")";

		FB.api({method: 'fql.query',
	        query: query,access_token:token_user
	      },function(response) {
	    	  var obj_post_id= new Object();
	    	  for(var i=0;i<response.length;i++){
	    		  this.post_id = response[i].post_id;
	 				var post_id=this['post_id'];
	 						 
	 				if (isNull(obj_post_id[post_id])){
	 							
	 					obj_post_id[post_id] = parseInt(response[i].likes) ;
	 					
	 				}else{
	 					obj_post_id[post_id] = obj_post_id[post_id] + parseInt(response[i].likes);
	 				}
				    	  

	    	  }
	    	  var sortArraypostid = converObjectToArray(obj_post_id)
	  		
	  		for (var i=0;i<sortArraypostid.length;i++){
	  		 
	  			  var id = sortArraypostid[i].key;
	  			  var value=sortArraypostid[i].value;
	  			$("#monitoring_facebook_page #"+id+" .block-actions #comment-like-num").html(value);
	  		  }
	    	  				
	      });
	}
	function addFriend(id){
		FB.ui({
			  method: 'friends',
			  id: id
			}, function(response){
				if(!isNull(response))
				  aoFrm.mess("mess",mess.message_addfriend);
			});
	}
	function comment(post_id,channel_detail_id){
		 getDetail(post_id,channel_detail_id);		
	}
	function getDetail(post_id,channel_detail_id){
		//var post_id=$(this).parent().parent().attr("id");
		var link_post=$("#"+post_id).attr("link_post");//$(this).parent().parent().attr("link_post");
		var message=$("#"+post_id+" .content blockquote").html();
		var avatar_post=$("#"+post_id+" #avatar-post").attr("src");
		var time_post=$("#"+post_id+" .content .timePost").attr("time-post");
		var create_at=$("#"+post_id+" .content .timePost").html();
		var name =  $("#"+post_id+" .content .block-name span strong").html();
		var token_user=$("#"+post_id).attr("access-token");
		var like_count =$("#"+post_id+" .block-actions .like-num").html();
		var like_of_comment=$("#"+post_id+" .block-actions #comment-like-num").html();
    	var comment_count=  $("#"+post_id+" .block-actions .comment-num").html();
    	var share_count=  $("#"+post_id+" .block-actions .share-num").html();
    	var engagement=$("#"+post_id+" .block-actions .engagement-num").html();
    	var class_like=$("#like_"+post_id).attr("class");
    	var picture=$("#"+post_id+" .picture img").attr("src");
       var link_picture=$("#"+post_id+" .picture a").attr("href");
       var channel_post =$("#"+post_id).attr("channel-detail-id");
		_scrollLoad = false;
		var time_post_last=$("#monitoring_facebook_page .timeline li .block-name .timePost:last").attr("time-post");
		messageDetail(post_id,message,avatar_post,time_post_last,create_at,name,token_user,channel_detail_id,link_post,like_count,comment_count,share_count,like_of_comment,engagement,class_like,picture,link_picture,1,channel_post);
		$("#cancel_detail").click(function(){
			$("#content_message_all").show();
			$("#message_detail_1").hide();
			_scrollLoad = true;
			
		});
	}