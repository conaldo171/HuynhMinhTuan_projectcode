/***************************************************************************
 Page Code:	monitoring/twitter
 First Author:
 Created Date: 
 **************************************************************************/
 var _curentUser = -1;
var _moreUser = false;
var __scrollLoad = false;
var tokenTitter;
var token;
var _channel_detail_id;
var current_channel_detail_id;
var currentToken;
var currentTokenSecret;
var current_user;
var count=0;
var tweet_number = 0;
var channel_picture_tw;
var _tooltipTimeOut;

$( document ).ready(function() {
	checkExprired();
	var tooltip = $("#tooltip-twitter").clone();	
	$("#tooltip-twitter").remove();
	$("body").append(tooltip);	
	$("#tooltip-twitter").mouseleave(function(e) {
		$("#tooltip-twitter").stop(1,1).delay(500).hide();
    });
	$("#tooltip-twitter").mouseover(function(e) {
		$("#tooltip-twitter").show();
    });
	getposttowall();
});
//$( document ).unbind();
$(document).scroll(function(e) {
	if(!__scrollLoad) return;
	current_channel_detail_id = $("#monitoring_twitter .timeline li").attr("channel_detail_id");
	currentToken = $("#monitoring_twitter .timeline li").attr("token");
	currentTokenSecret = $("#monitoring_twitter .timeline li").attr("token_secret");
	current_user = $("#monitoring_twitter .timeline li").attr("username");
	var aTop = $(document).innerHeight();
	var hW = $(window).height();
	var posLoad = $(document).scrollTop() + hW;
	if(posLoad >=aTop ){
		gettweetuserloadmore(currentToken,currentTokenSecret,current_channel_detail_id,current_user);				
	}
});
function getposttowall() {
	// Total post loaded;
	
	var _totalLoaded = 0;
	var dataString=[];
	 dataString.push({
        name: "channel_id", 
        value: 3
    });
		$.ajax({
			  url : 'GetChannelDetail.do',
			  dataType: 'json',
			  data:dataString,
			  success : function(source) {
				    var _count = 0;
				    var _flgNext = false;
					$(source).each(function(index, element) {						
								channel_picture_tw = source[index].channel_picture;
							  	_channel_detail_id = source[index].channel_detail_id;
								tokenTitter = source[index].token_user;
				            	token = tokenTitter.split("_");
							    _count++;
							    var htmlUser = "<div avartar='"+channel_picture_tw+"' username='"+source[index].channel_user+"' id='user_" + source[index].channel_detail_id + "' class='block-name' channel-detail-id='" + source[index].channel_detail_id + "' token-user='" + source[index].token_user + "' ><i class='icon-user'></i> <span>"+ source[index].channel_user +"</span></div>";
							    $("#monitoring_twitter .box-header").append(htmlUser);
							    $("#monitoring_twitter .box-header #user_" + source[index].channel_detail_id).click(function()
							    {
							    	$("#monitoring_twitter .box-header .block-name").removeClass("active");
							    	$(this).addClass("active");
							    	var currentTokenTwitter = $(this).attr("token-user");
							    	var currentToken = currentTokenTwitter.split("_");
							    	gettweetuser(currentToken[0],currentToken[1],source[index].channel_detail_id,source[index].channel_user);
							    });
							    if(_count == 1)
							    {
							    	$("#monitoring_twitter .box-header .block-name:eq(0)").addClass("active");
							    	gettweetuser(token[0],token[1],source[index].channel_detail_id,source[index].channel_user);
							    }								    
												 
		            });
					checkEmptyChannelMonitoring("#monitoring_twitter");
			  }
		
		});
}
	var date = 1;
	var tweet_number = 0;
	var reply_number = 0;
	function gettweetuser(token,token_secret,channel_detail_id,username){
		$("#monitoring_twitter .postBox .itemLoading").show();
		$("#monitoring_twitter .postBox .box-content .timeline").empty();
		aoFrm.mess("close");
		var htmlGeneral;
		var image;
		var url_image_user = $("#user_"+channel_detail_id).attr("avartar");
		cb.setToken(token,token_secret);
		cb.__call(
				    "statuses_homeTimeline",
				    {"user_id": channel_detail_id,"count":20},
				    function (reply) {
				    	var obj_tweet_id=new Object();
				    	if(!isNull(reply.errors)){
				    		$("#monitoring_twitter .postBox .itemLoading").fadeOut();
				    		showErrorTwitter(reply);
				    	}
				    	var id;
				    	var id_tweet;
				    	var name;
				    	var img_user;
				    	var create_date;
				    	var strDate;
				    	var message;
				    	var reply_name;
				    	var reply_status;
				    	var image_comment;
				    	var favorite_count;
				    	var favorite_me;
				    	
						var favorite_number = 0;
						var retweet_number = 0;
						var follower_number = 0;
						var mention_number = 0;
						var engagement = 0;
						var active = 0;
						var link_post;
						var url_profile = 'https://twitter.com/'+username;
						var url_tweet ='';
						var url_reply ='';
						var display_del="none";
						var in_reply_to_status_id_str="";
				    	$("#monitoring_twitter .postBox .box-content .timeline").empty();
						$("#monitoring_twitter .postBox .itemLoading").fadeOut();
						for (var i=0;i<reply.length;i++){
							id = reply[i].id_str;
							id_tweet = reply[i].user.id;
							if(id_tweet==channel_detail_id){
								display_del="";
							}
							else
								{
								display_del="none";
								}
							name = reply[i].user.screen_name;
							img_user = reply[i].user.profile_image_url;
							
							strDate = reply[i].created_at;
							var time_post=toTimestamp(strDate)-1;
							
							create_date = formatDateGMT(strDate);
							message = reply[i].text;
							in_reply_to_status_id_str=reply[i].in_reply_to_status_id_str;
							reply_name = reply[i].in_reply_to_screen_name;
							reply_status = reply[i].in_reply_to_status_id;
							favorite_count = reply[i].favorite_count;
							favorite_me = reply[i].favorited;
							retweet_number = reply[i].retweet_count;
							follower_number = reply[i].user.followers_count;
							tweet_number = reply[i].user.statuses_count;
							reply_number = 0;
							url_tweet ='https://twitter.com/' + name;
							url_reply ='https://twitter.com/' + reply_name;
							link_post = "https://twitter.com/"+name+"/status/"+id;
							this.tweet_id = in_reply_to_status_id_str;
							var tweet_id=this['tweet_id'];
							if(!isNull(tweet_id)){
								if (isNull(obj_tweet_id[tweet_id])){
		 							
				 					obj_tweet_id[tweet_id] = 1 ;
				 					
				 				}else{
				 					obj_tweet_id[tweet_id] = obj_tweet_id[tweet_id] + 1;
				 				}
							}
			 				
							/*if (isNull(reply_status)){
			    				for (var j=0;j<reply.length;j++){						    			
					    			if (in_reply_to_status_id_str == reply[j].id_str && !isNull(reply[j].in_reply_to_status_id_str))
						    		{	
					    				reply_number++;						    				
						    		}
					    		}
			    			}*/
							if (!isNull(reply[i].entities.user_mentions)){
		    		    			mention_number = reply[i].entities.user_mentions.length;
			   		    		}
							active = favorite_count + reply_number + retweet_number + mention_number;
							 if (tweet_number !=0 && follower_number !=0){
						    		engagement = (((active)/tweet_number)/follower_number)*100;
						    		engagement = Math.floor(engagement*100)/100;
						    	}else{
						    		engagement = 0;
						    	}
								if (isNull(reply_status)){
									hmtlGeneral = '<li token="'+token+'" username="'+name+'" token_secret="'+token_secret+'" channel_detail_id = "'+channel_detail_id+'" id_tweet="'+id_tweet+'" id="'+id+'" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img class="avatar-small" id="avatar-tweet" src="'+img_user+'"><i class="icon-twitter-sign blue channel-icon" ></i></div><div class="content"><div class="block-content-top"><span class="name"><a href="'+url_tweet+'" target="_blank"><strong class="indent">'+name+'</strong></a> Sent <strong></strong></span> <span time_post="'+time_post+'" class="timePost">'+create_date+'</span> </div><a href="'+link_post+'" target="_blank"><blockquote>'+replaceURLWithHTMLLinks(message)+'</blockquote></a></div><div class="block-actions"><i class="icon-mail-reply-all" title="Reply"></i><span id="reply-num"></span><i class="icon-retweet" title="Retweet"></i><span id="retweet-num">'+retweet_number+'</span><i class="icon-star" title="Favorite"></i><span id="favorite-num">'+favorite_count+'</span><i class="icon-user" title="Engagement"></i><span id="engagement-num">'+engagement+'</span><span id="percent">%</span></div><div class="info navbar"> <div class="menuFavorite" id="favorite" title=""><i class="icon-thumbs-up" favorite-count="'+favorite_count+'"></i></div><div style="display:'+display_del+'" class="menuDel" id="delete" title="Delete this tweet"><i class="icon-eraser"></i></div><ul class="menu_task nav pull-right" style="display:none"><li><i class="icon-tasks dropdown-toggle" data-toggle="dropdown"></i><ul class="dropdown-menu" id="dropdown_menu"><li><a title="" type="0" href="javascript:void(0)"><span text="task_general">General</span></a></li><li class="divider" style="margin:1px 1px"></li><li><a title="" type="1" href="javascript:void(0)"><span text="task_sale">Sale Lead</span></a></li><li class="divider" style="margin:1px 1px"></li><li><a title="" type="2" href="javascript:void(0)"><span text="task_support">Support</span></a></li></ul></li></ul></div><div class="post_comment"><div class="gray facebook comment"><div class="avatar"><a href="'+url_profile+'" target="_blank"><img class="avatar-small" src="'+url_image_user+'"></a></div></div><div class="arrow-box-left content"><div class="block-content"><input type="text" placeholder="Reply..." id="txtComment_'+id+'" class="txtComment"></div></div></div></li>';
									
								}else{
									hmtlGeneral = '<li token="'+token+'" username="'+name+'" token_secret="'+token_secret+'" channel_detail_id = "'+channel_detail_id+'" id_tweet="'+id_tweet+'" id="'+id+'" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img class="avatar-small" id="avatar-tweet" src="'+img_user+'"><i class="icon-twitter-sign blue channel-icon" ></i></div><div class="content"><div class="block-content-top"><span class="name"><a href="'+url_tweet+'" target="_blank"><strong class="indent"></strong></a> replied to <a href="'+url_reply+'" target="_blank"><strong class="indent">'+name+'</strong><strong></strong> </span><span time_post="'+time_post+'" class="timePost">'+create_date+'</span> </div><a href="'+link_post+'" target="_blank"><blockquote>'+replaceURLWithHTMLLinks(message)+'</blockquote></a></div><div class="block-actions"><i class="icon-mail-reply-all" title="Reply"></i><span id="reply-num">'+reply_number+'</span><i class="icon-retweet" title="Retweet"></i><span id="retweet-num">'+retweet_number+'</span><i class="icon-star" title="Favorite"></i><span id="favorite-num">'+favorite_count+'</span><i class="icon-user" title="Engagement"></i><span id="engagement-num">'+engagement+'</span><span id="percent">%</span></div><div class="info navbar"> <div class="menuFavorite" id="favorite" title=""><i class="icon-thumbs-up" favorite-count="'+favorite_count+'"></i></div><div class="menuDel" id="delete" title="Delete this tweet"><i class="icon-eraser"></i></div><ul class="menu_task nav pull-right" style="display:none"><li><i class="icon-tasks dropdown-toggle" data-toggle="dropdown"></i><ul class="dropdown-menu" id="dropdown_menu"><li><a title="" type="0" href="javascript:void(0)"><span text="general">General</span></a></li><li class="divider" style="margin:1px 1px"></li><li><a title="" type="1" href="javascript:void(0)"><span text="save_lead">Sale Lead</span></a></li><li class="divider" style="margin:1px 1px"></li><li><a title="" type="2" href="javascript:void(0)"><span text="support">Support</span></a></li></ul></li></ul> </div><div class="post_comment"><div class="gray facebook comment"><div class="avatar"><a href="'+url_profile+'" target="_blank"><img class="avatar-small" src="'+url_image_user+'"></a></div></div><div class="arrow-box-left content"><div class="block-content"><input type="text" placeholder="Reply..." id="txtComment_'+id+'" class="txtComment"></div></div></div></li>';
									
								}
								
								$("#monitoring_twitter .timeline").append(hmtlGeneral);
							img_comment = $('#' + id + ' .avatar-small').attr('src');
							$('#comment_twitter_Popup .modal-body .imgBox .avatar-large').attr('src',img_comment);
							$("li#"+ id + " .reply").click(function(){
								$("#comment_twitter_Popup").attr("tweet-id",$(this).attr("tweet-id"));
							});
							//check favorite 
							var _objTw = $('#monitoring_twitter .timeline #'+ id +' #favorite');
							
							if (favorite_count == 0){
								$(_objTw).addClass("favorite");
								$(_objTw).attr("title","Favorite this tweet");
								$(_objTw).find("i").attr("class","icon-thumbs-up");
							}else{
								if (favorite_me){
									$(_objTw).addClass("unfavorite");
									$(_objTw).attr("title","Unfavorite");
									$(_objTw).find("i").attr("class","icon-thumbs-down");
								}
								else
									{
									$(_objTw).addClass("favorite");
									$(_objTw).attr("title","Favorite this tweet");
									}
							}
							
							
							
						}
						 var sortArraypostid = converObjectToArray(obj_tweet_id)
					  		
					  		for (var i=0;i<sortArraypostid.length;i++){
					  		 
					  			  var id = sortArraypostid[i].key;
					  			  var value=sortArraypostid[i].value;
					  			$("#monitoring_twitter #"+id+" .block-actions #reply-num").html(value);
					  		  }
						//favorite twitter
						$("#monitoring_twitter  #favorite").click(function(){
							var _tweetid = $(this).parent(this).parent(this).attr("id");
							if ($(this).hasClass("favorite")){
								favoriteTweet(token,token_secret,_tweetid);
								$(this).removeClass("favorite");
								$(this).attr("title","Unfavorite");
								$(this).addClass("unfavorite");
								$(this).find("i").attr("class","icon-thumbs-down");
							}else{
								delFavoriteTweet(token,token_secret,_tweetid);
								$(this).addClass("favorite");
								$(this).attr("title","Favorite this tweet");
								$(this).removeClass("unfavorite");
								$(this).find("i").attr("class","icon-thumbs-up");
							}
						});
						$("#monitoring_twitter #dropdown_menu li a").click(function(){
							
							var type_task= $(this).attr("type");
							var task_id=$(this).parent().parent().parent().parent().parent().parent().attr("id");
							
							var message=$("#"+task_id+" .content blockquote a").html();
							var avatar_task=$("#"+task_id+" #avatar-tweet").attr("src");
							var time_post=$("#"+task_id+" .content .block-content-top .timePost").attr("time_post");
							var create_at=$("#"+task_id+" .content .block-content-top .timePost").html();
							var name =  $("#"+task_id+" .content .block-content-top .name a strong").html();
							
							appendCreateTask(type_task,task_id,message,avatar_task,create_at,name,time_post,3);
						});
						$("#monitoring_twitter #delete").click(function(){
							var _tweetid = $(this).parent(this).parent(this).attr("id");
							delTweet(token,token_secret,_tweetid);
							$(this).parent().parent().fadeOut();
						});
						
						$("#monitoring_twitter .txtComment").keydown(function(e) {
				            if(e.keyCode==13){
				            	var id = $(this).parent().parent().parent().parent().attr("id");
				            	var screen_name=$(this).parent().parent().parent().parent().attr("username");
				            	retweet(token,token_secret,id,screen_name);
				            	$(this).val("");
				            	/*setTimeout(function(){
				            		gettweetuser(token,token_secret,_channel_detail_id);
				            	},2000);*/
							}			
				        });
						__scrollLoad = true;
						$(".timeline .twitter .avatar img#avatar-tweet").mouseover(function(){
							var token = $(this).parent().parent().attr("token");
							var token_secret = $(this).parent().parent().attr("token_secret");
							var id = $(this).parent().parent().attr("id_tweet");
							twitterProfileTip(this,token,token_secret,id);
						});
				    }		
				);
	 }
	
	function gettweetuserloadmore(token,token_secret,channel_detail_id,username){
		
		__scrollLoad = false;
		count++;
		last_id = $(".timeline .twitter:last").attr("id");
		var url_image_user = $("#user_"+channel_detail_id).attr("avartar");
		$("#monitoring_twitter .timeline").append("<li class='itemLoading'></li>");
		var htmlGeneral;
		var image;
		cb.setToken(token,token_secret);
		 cb.__call(
				    "statuses_homeTimeline",
				    {"user_id": channel_detail_id,"count":21,"max_id": last_id},
				    function (reply) {
				    	var id;
				    	var id_tweet;
				    	var name;
				    	var img_user;
				    	var create_date;
				    	var strDate;
				    	var message;
				    	var reply_name;
				    	var reply_status;
				    	var image_comment;
				    	var favorite_count;
				    	var favorite_me;
				    	
				    	var mention_number = 0;
						var retweet_number = 0;
						var follower_number = 0;
						var engagement = 0;
						var active = 0;
						var link_post;
						var url_profile = 'https://twitter.com/'+username;
						var url_tweet ='';
						var url_reply ='';
						var display_del="none";
						var in_reply_to_status_id_str="";
						for (var i=0;i<reply.length;i++){
							id = reply[i].id_str;
							id_tweet = reply[i].user.id;
							if(id_tweet==channel_detail_id){
								display_del="";
							}
							else
								{
								display_del="none";
								}
							in_reply_to_status_id_str=reply[i].in_reply_to_status_id_str;
							name = reply[i].user.screen_name;
							img_user = reply[i].user.profile_image_url;
							strDate = reply[i].created_at;
							create_date = formatDateGMT(strDate);
							var time_post=toTimestamp(strDate)-1;
							message = reply[i].text;
							reply_name = reply[i].in_reply_to_screen_name;
							reply_status = reply[i].in_reply_to_status_id;
							favorite_count = reply[i].favorite_count;
							favorite_me = reply[i].favorited;
							retweet_number = reply[i].retweet_count;
							follower_number = reply[i].user.followers_count;
							tweet_number = reply[i].user.statuses_count;
							url_tweet ='https://twitter.com/' + name;
							url_reply ='https://twitter.com/' + reply_name;
							link_post = "https://twitter.com/"+name+"/status/"+id;
							this.tweet_id = in_reply_to_status_id_str;
							var tweet_id=this['tweet_id'];
							if(!isNull(tweet_id)){
								if (isNull(obj_tweet_id[tweet_id])){
		 							
				 					obj_tweet_id[tweet_id] = 1 ;
				 					
				 				}else{
				 					obj_tweet_id[tweet_id] = obj_tweet_id[tweet_id] + 1;
				 				}
							}
							/*if (isNull(reply_status)){
			    				if (isNull(reply_status)){
				    				for (var j=0;j<reply.length;j++){						    			
						    			if (in_reply_to_status_id_str == reply[j].id_str && !isNull(reply[j].in_reply_to_status_id_str))
							    		{	
						    				reply_number++;						    				
							    		}
						    		}
				    			}
			    			}*/
							if (!isNull(reply[i].entities.user_mentions)){
	    		    			mention_number = reply[i].entities.user_mentions.length;
		   		    		}
							active = favorite_count + reply_number + retweet_number + mention_number;
							
							if (tweet_number !=0 && follower_number !=0){
					    		engagement = (((active)/tweet_number)/follower_number)*100;
					    		engagement = Math.floor(engagement*100)/100;
					    	}else{
					    		engagement = 0;
					    	}
							if (isNull(reply_status)){
								hmtlGeneral = '<li username="'+name+'" token="'+token+'" token_secret="'+token_secret+'" channel_detail_id = "'+channel_detail_id+'" id_tweet="'+id_tweet+'" id="'+id+'" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img class="avatar-small" id="avatar-tweet" src="'+img_user+'"><i class="icon-twitter-sign blue channel-icon" ></i></div><div class="content"><div class="block-content-top"><span class="name"><a href="'+url_tweet+'" target="_blank"><strong class="indent">'+name+'</strong></a> Sent <strong></strong></span> <span time_post="'+time_post+'" class="timePost">'+create_date+'</span> </div><a href="'+link_post+'" target="_blank"><blockquote>'+replaceURLWithHTMLLinks(message)+'</blockquote></a></div><div class="block-actions"><i class="icon-mail-reply-all" title="Reply"></i><span id="reply-num"></span><i class="icon-retweet" title="Retweet"></i><span id="retweet-num">'+retweet_number+'</span><i class="icon-star" title="Favorite"></i><span id="favorite-num">'+favorite_count+'</span><i class="icon-user" title="Engagement"></i><span id="engagement-num">'+engagement+'</span><span id="percent">%</span></div><div class="info navbar"> <div class="menuFavorite" id="favorite" title=""><i class="icon-thumbs-up" favorite-count="'+favorite_count+'"></i></div><div style="display:'+display_del+'" class="menuDel" id="delete" title="Delete this tweet"><i class="icon-eraser"></i></div><ul class="menu_task nav pull-right" style="display:none"><li><i class="icon-tasks dropdown-toggle" data-toggle="dropdown"></i><ul class="dropdown-menu" id="dropdown_menu_'+id+'"><li><a title="" type="0" href="javascript:void(0)"><span text="general">General</span></a></li><li class="divider" style="margin:1px 1px"></li><li><a title="" type="1" href="javascript:void(0)"><span text="save_lead">Sale Lead</span></a></li><li class="divider" style="margin:1px 1px"></li><li><a title="" type="2" href="javascript:void(0)"><span text="support">Support</span></a></li></ul></li></ul></div><div class="post_comment"><div class="gray facebook comment"><div class="avatar"><a href="'+url_profile+'" target="_blank"><img class="avatar-small" src="'+url_image_user+'"></a.</div></div><div class="arrow-box-left content"><div class="block-content"><input type="text" placeholder="Reply..." id="txtComment_'+id+'" class="txtComment"></div></div></div></li>';
								
							}else{
								hmtlGeneral = '<li username="'+name+'" token="'+token+'" token_secret="'+token_secret+'" channel_detail_id = "'+channel_detail_id+'" id_tweet="'+id_tweet+'" id="'+id+'" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img class="avatar-small" id="avatar-tweet" src="'+img_user+'"><i class="icon-twitter-sign blue channel-icon" ></i></div><div class="content"><div class="block-content-top"><span class="name"><a href="'+url_tweet+'" target="_blank"><strong class="indent">'+reply_name+'</strong></a> replied to <a href="'+url_reply+'" target="_blank"><strong class="indent">'+name+'</strong><strong></strong> </span><span time_post="'+time_post+'" class="timePost">'+create_date+'</span> </div><a href="'+link_post+'" target="_blank"><blockquote>'+replaceURLWithHTMLLinks(message)+'</blockquote></a></div><div class="block-actions"><i class="icon-mail-reply-all" title="Reply"></i><span id="reply-num"></span><i class="icon-retweet" title="Retweet"></i><span id="retweet-num">'+retweet_number+'</span><i class="icon-star" title="Favorite"></i><span id="favorite-num">'+favorite_count+'</span><i class="icon-user" title="Engagement"></i><span id="engagement-num">'+engagement+'</span><span id="percent">%</span></div><div class="info navbar"> <div class="menuFavorite" id="favorite" title=""><i class="icon-thumbs-up" favorite-count="'+favorite_count+'"></i></div><div class="menuDel" id="delete" title="Delete this tweet"><i class="icon-eraser"></i></div><ul class="menu_task nav pull-right" style="display:none"><li><i class="icon-tasks dropdown-toggle" data-toggle="dropdown"></i><ul class="dropdown-menu_'+id+'" id="dropdown_menu"><li><a title="" type="0" href="javascript:void(0)"><span text="general">General</span></a></li><li class="divider" style="margin:1px 1px"></li><li><a title="" type="1" href="javascript:void(0)"><span text="save_lead">Sale Lead</span></a></li><li class="divider" style="margin:1px 1px"></li><li><a title="" type="2" href="javascript:void(0)"><span text="support">Support</span></a></li></ul></li></ul> </div><div class="post_comment"><div class="gray facebook comment"><div class="avatar"><a href="'+url_profile+'" target="_blank"><img class="avatar-small" src="'+url_image_user+'"></a></div></div><div class="arrow-box-left content"><div class="block-content"><input type="text" placeholder="Reply..." id="txtComment_'+id+'" class="txtComment"></div></div></div></li>';
								
							}
							
							$("#monitoring_twitter .timeline").append(hmtlGeneral);
							img_comment = $('#' + id + ' .avatar-small').attr('src');
							$('#comment_twitter_Popup .modal-body .imgBox .avatar-large').attr('src',img_comment);
							$("li#"+ id + " .reply").click(function(){
								$("#comment_twitter_Popup").attr("tweet-id",$(this).attr("tweet-id"));
							});
							$("#monitoring_twitter .timeline li#" + last_id + ":last-child").remove();
							
							//check favorite 
							var _objTw = $('#monitoring_twitter .timeline #'+ id +' #favorite-more'+count+'');
							if (favorite_count == 0){
								$(_objTw).addClass("favorite");
								$(_objTw).attr("title","Favorite this tweet");
								$(_objTw).find("i").attr("class","icon-thumbs-up");
							}else{
								if (favorite_me){
									$(_objTw).addClass("unfavorite");
									$(_objTw).attr("title","Unfavorite");
									$(_objTw).find("i").attr("class","icon-thumbs-down");
								}
								else
								{
								$(_objTw).addClass("favorite");
								$(_objTw).attr("title","Favorite this tweet");
								//$(_objTw).find("i").attr("class","icon-thumbs-up");
								}
							}
							$("#monitoring_twitter .postBox .itemLoading").fadeOut();
							if (reply.length==1) return;
							
							//favorite twitter
							$("#monitoring_twitter #" +id+" #favorite-more"+count+"").click(function(){
								var _tweetid = $(this).parent(this).parent(this).attr("id");
								if ($(this).hasClass("favorite")){
									favoriteTweet(token,token_secret,_tweetid);
									$(this).removeClass("favorite");
									$(this).attr("title","Unfavorite");
									$(this).addClass("unfavorite");
									$(this).find("i").attr("class","icon-thumbs-down");
								}else{
									delFavoriteTweet(token,token_secret,_tweetid);
									$(this).addClass("favorite");
									$(this).attr("title","Favorite this tweet");
									$(this).removeClass("unfavorite");
									$(this).find("i").attr("class","icon-thumbs-up");
								}
							});
							$("#monitoring_twitter #dropdown_menu_"+id+" li a").click(function(){
								
								var type_task= $(this).attr("type");
								var task_id=$(this).parent().parent().parent().parent().parent().parent().attr("id");
								
								var message=$("#"+task_id+" .content blockquote a").html();
								var avatar_task=$("#"+task_id+" #avatar-tweet").attr("src");
								var time_post=$("#"+task_id+" .content .block-content-top .timePost").attr("time_post");
								var create_at=$("#"+task_id+" .content .block-content-top .timePost").html();
								var name =  $("#"+task_id+" .content .block-content-top .name a strong").html();
								appendCreateTask(type_task,task_id,message,avatar_task,create_at,name,time_post,3);
							});
							$("#monitoring_twitter #" +id+" #delete-more"+count+"").click(function(){
								var _tweetid = $(this).parent(this).parent(this).attr("id");
								delTweet(token,token_secret,_tweetid);
								$(this).parent().parent().fadeOut();
							});
							
							
						}
						var sortArraypostid = converObjectToArray(obj_tweet_id)
				  		
				  		for (var i=0;i<sortArraypostid.length;i++){
				  		 
				  			  var id = sortArraypostid[i].key;
				  			  var value=sortArraypostid[i].value;
				  			$("#monitoring_twitter #"+id+" .block-actions #reply-num").html(value);
				  		  }
						__scrollLoad = true;
						
						$("#monitoring_twitter .txtComment-more"+count+"").keydown(function(e) {
				            if(e.keyCode==13){
				            	var id = $(this).parent().parent().parent().parent().attr("id");
				            	var screen_name=$(this).parent().parent().parent().parent().attr("username");
				            	
				            	retweet(token,token_secret,id,screen_name);
				            	$(this).val("");
				            	/*setTimeout(function(){
				            		gettweetuser(token,token_secret,_channel_detail_id);
				            	},2000);*/
							}			
				        });
						
						$(".timeline .twitter .avatar img#avatar-tweet").mouseover(function(){
							var token = $(this).parent().parent().attr("token");
							var token_secret = $(this).parent().parent().attr("token_secret");
							var id = $(this).parent().parent().attr("id_tweet");
							twitterProfileTip(this,token,token_secret,id);
						});
						
				    }
				    
				);
	 }
	
	function favoriteTweet(token,token_secret,id){
		  if(!$.browser.msie){
			  cb.setToken(token,token_secret);
			  cb.__call(
	  			    "favorites_create",
	  			    {"id": id},
	  			    function (reply) {
	  			    var favorite_number=$("#monitoring_twitter #"+id+" .block-actions #reply-num").html();
	  			  favorite_number=  parseInt(favorite_number)+1
	  			$("#monitoring_twitter #"+id+" .block-actions #favorite-num").html(favorite_number);
	  			    	aoFrm.mess("mess",mess.message_favorite);
	  			    }
	  			);
		  }
		  else
			  {
			  var dataString=[];
				 dataString.push({
			        name: "token", 
			        value: token
			    });
				 dataString.push({
				        name: "token_secret", 
				        value: token_secret
				    });
				 dataString.push({
				        name: "post_id", 
				        value: id
				    });
				 dataString.push({
				        name: "Action", 
				        value: "favorite"
				    });
					$.ajax({
						  url : 'Twitter.do',
						  dataType: 'json',
						  data:dataString,
						  success : function(source) {
							  var favorite_number=$("#monitoring_twitter #"+id+" .block-actions #reply-num").html();
				  			  favorite_number=  parseInt(favorite_number)+1
				  			$("#monitoring_twitter #"+id+" .block-actions #favorite-num").html(favorite_number);
							  aoFrm.mess("mess",mess.message_favorite);
							  }
						  });
			  }
		
	}
	
	function delFavoriteTweet(token,token_secret,id){
		if(!$.browser.msie){
			cb.setToken(token,token_secret);
			  cb.__call(
	  			    "favorites_destroy",
	  			    {"id": id},
	  			    function (reply) {
	  			    	 var favorite_number=$("#monitoring_twitter #"+id+" .block-actions #reply-num").html();
	  		  			  favorite_number=  parseInt(favorite_number)-1
	  		  			$("#monitoring_twitter #"+id+" .block-actions #favorite-num").html(favorite_number);
	  			    	aoFrm.mess("mess",mess.message_unfavorite);
	  			    }
	  			);
		}
		else
			{
			 var dataString=[];
			 dataString.push({
		        name: "token", 
		        value: token
		    });
			 dataString.push({
			        name: "token_secret", 
			        value: token_secret
			    });
			 dataString.push({
			        name: "post_id", 
			        value: id
			    });
			 dataString.push({
			        name: "Action", 
			        value: "delfavorite"
			    });
				$.ajax({
					  url : 'Twitter.do',
					  dataType: 'json',
					  data:dataString,
					  success : function(source) {
						  var favorite_number=$("#monitoring_twitter #"+id+" .block-actions #reply-num").html();
	  		  			  favorite_number=  parseInt(favorite_number)-1
	  		  			$("#monitoring_twitter #"+id+" .block-actions #favorite-num").html(favorite_number);
						  aoFrm.mess("mess",mess.message_unfavorite);
						  }
					  });
			}
		
	}
	
	function delTweet(token,token_secret,id){
		if(!$.browser.msie){
			cb.setToken(token,token_secret);
			  cb.__call(
	  			    "statuses_destroy_ID",
	  			    {"id": id},
	  			    function (reply) {
	  			    	aoFrm.mess("mess",mess.message_delete);
	  			    }
	  			);
		}
		else
			{
			 var dataString=[];
			 dataString.push({
		        name: "token", 
		        value: token
		    });
			 dataString.push({
			        name: "token_secret", 
			        value: token_secret
			    });
			 dataString.push({
			        name: "post_id", 
			        value: id
			    });
			 dataString.push({
			        name: "Action", 
			        value: "deltweet"
			    });
				$.ajax({
					  url : 'Twitter.do',
					  dataType: 'json',
					  data:dataString,
					  success : function(source) {
						  aoFrm.mess("mess",mess.message_delete);
						  }
					  });
			}
		
	}
	
	function retweet(token,token_secret,id,screen_name){
		var msg= "@"+screen_name+" "+ $("#txtComment_" + id).val();
		cb.setToken(token,token_secret);
		  cb.__call(
  			    "statuses_update",
  			    {"status": msg,"in_reply_to_status_id": id},
  			    function (reply) {
  			    	var hmtlGeneral="";
  			    	var username="";
  			    	var id_tweet=""
  			    		var img_user="";
  			    	var create_date="";
  			    	var message="";
  			    	var time_post="";
  			    	var url_profile_tweet="";
  			    	var img_user="";
  			    	var link_post="";
  			    	var in_reply_to_status_id_str="";
  			    	var reply_name=reply.in_reply_to_screen_name;
  			    	var id= reply.id_str;
  			    	username=reply.user.screen_name;
  			    	id_tweet=reply.user.id;	
  			    	img_user=reply.user.profile_image_url;
  			    	create_date = formatDateGMT(reply.created_at);
  			    	message=reply.text;
  			    	time_post=toTimestamp(reply.created_at)-1;
  			    	url_profile_tweet='https://twitter.com/' + username;
  			    	link_post="https://twitter.com/"+username+"/status/"+id;
  			    	var url_reply ='https://twitter.com/' + reply_name;
  			        in_reply_to_status_id_str=reply.in_reply_to_status_id_str;
  			    	aoFrm.mess("mess",mess.comment_tweet);
  			    	var reply_number=$("#monitoring_twitter #"+in_reply_to_status_id_str+" .block-actions #reply-num").html();
					hmtlGeneral = '<li token="'+token+'" username="'+username+'" token_secret="'+token_secret+'" channel_detail_id = "" id_tweet="'+id_tweet+'" id="'+id+'" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img class="avatar-small" id="avatar-tweet" src="'+img_user+'"><i class="icon-twitter-sign blue channel-icon" ></i></div><div class="content"><div class="block-content-top"><span class="name"><a href="'+url_profile_tweet+'" target="_blank"><strong class="indent"></strong></a> replied to <a href="'+url_reply+'" target="_blank"><strong class="indent">'+reply_name+'</strong><strong></strong> </span><span time_post="'+time_post+'" class="timePost">'+create_date+'</span> </div><a href="'+link_post+'" target="_blank"><blockquote>'+replaceURLWithHTMLLinks(message)+'</blockquote></a></div><div class="block-actions"><i class="icon-mail-reply-all" title="Reply"></i><span id="reply-num">0</span><i class="icon-retweet" title="Retweet"></i><span id="retweet-num">0</span><i class="icon-star" title="Favorite"></i><span id="favorite-num">0</span><i class="icon-user" title="Engagement"></i><span id="engagement-num">0</span><span id="percent">%</span></div><div class="info navbar"> <div class="menuFavorite favorite" id="favorite" title=""><i class="icon-thumbs-up" favorite-count="0"></i></div><div class="menuDel" id="delete" title="Delete this tweet"><i class="icon-eraser"></i></div><ul class="menu_task nav pull-right" style="display:none"><li><i class="icon-tasks dropdown-toggle" data-toggle="dropdown"></i><ul class="dropdown-menu" id="dropdown_menu"><li><a title="" type="0" href="javascript:void(0)"><span text="general">General</span></a></li><li class="divider" style="margin:1px 1px"></li><li><a title="" type="1" href="javascript:void(0)"><span text="save_lead">Sale Lead</span></a></li><li class="divider" style="margin:1px 1px"></li><li><a title="" type="2" href="javascript:void(0)"><span text="support">Support</span></a></li></ul></li></ul> </div><div class="post_comment"><div class="gray facebook comment"><div class="avatar"><a href="'+url_profile_tweet+'" target="_blank"><img class="avatar-small" src="'+img_user+'"></a></div></div><div class="arrow-box-left content"><div class="block-content"><input type="text" placeholder="Reply..." id="txtComment_'+id+'" class="txtComment"></div></div></div></li>';
  			    	$("#monitoring_twitter .timeline").prepend(hmtlGeneral);
  			    	$("#monitoring_twitter #"+in_reply_to_status_id_str+" .block-actions #reply-num").html(parseInt(reply_number)+1);
  			    	$("#monitoring_twitter .txtComment").keydown(function(e) {
			            if(e.keyCode==13){
			            	//var id = $(this).parent().parent().parent().parent().attr("id");
			            	
			            	retweet(token,token_secret,id,screen_name);
			            	$(this).val("");
			            	
						}			
			        });
  			    	$("#monitoring_twitter  #favorite").click(function(){
						var _tweetid = $(this).parent(this).parent(this).attr("id");
						if ($(this).hasClass("favorite")){
							favoriteTweet(token,token_secret,_tweetid);
							$(this).removeClass("favorite");
							$(this).attr("title","Unfavorite");
							$(this).addClass("unfavorite");
							$(this).find("i").attr("class","icon-thumbs-down");
						}else{
							delFavoriteTweet(token,token_secret,_tweetid);
							$(this).addClass("favorite");
							$(this).attr("title","Favorite this tweet");
							$(this).removeClass("unfavorite");
							$(this).find("i").attr("class","icon-thumbs-up");
						}
					});
					$("#monitoring_twitter #dropdown_menu li a").click(function(){
						
						var type_task= $(this).attr("type");
						var task_id=$(this).parent().parent().parent().parent().parent().parent().attr("id");
						
						var message=$("#"+task_id+" .content blockquote a").html();
						var avatar_task=$("#"+task_id+" #avatar-tweet").attr("src");
						var time_post=$("#"+task_id+" .content .block-content-top .timePost").attr("time_post");
						var create_at=$("#"+task_id+" .content .block-content-top .timePost").html();
						var name =  $("#"+task_id+" .content .block-content-top .name a strong").html();
						
						appendCreateTask(type_task,task_id,message,avatar_task,create_at,name,time_post,3);
					});
					$("#monitoring_twitter #delete").click(function(){
						var _tweetid = $(this).parent(this).parent(this).attr("id");
						delTweet(token,token_secret,_tweetid);
						$(this).parent().parent().fadeOut();
					});
  			    }
  			);
	}
	
	function twitterProfileTip(obj,token,token_secret,id) {
		var _top = $(obj).offset().top + $(obj).innerHeight() + 10;
		var _left = $(obj).offset().left;
		$("#information-content").hide();
		$("#tooltip-twitter #loading").show();
		$("#tooltip-twitter").css("top",_top);
		$("#tooltip-twitter").css("left",_left);
		$("#tooltip-twitter").stop(1,1).show();			
		$(obj).mouseleave(function(e) {
			$("#tooltip-twitter").delay(500).hide();
        });
		cb.setToken(token,token_secret);
		  cb.__call(
			    "users_show",
			    {"id": id},
			    function (reply) {
			    	var name = '';
			    	var location = '';
			    	var categori = '';
			    	var follower = 0;
			    	var following = 0;
			    	name = reply.name;
			    	location = reply.location;
			    	categori = reply.description;
			    	follower = reply.followers_count;
			    	following = reply.friends_count;
			    	$("#tw-name").text(name);
			    	$("#tw-place").text(location);
			    	$("#tw-category").text();
			    	$("#tw-follower").text(follower + " followers | ");
			    	$("#tw-following").text(" "+following + " following");
			    	$("#information-content").show();
					$("#tooltip-twitter #loading").hide();
			    }
			);
	}