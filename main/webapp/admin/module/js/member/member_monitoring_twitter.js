
var _curentUser = -1;
var _moreUser = false;
var __scrollLoad = false;
var tokenTitter;
var token;
var _channel_detail_id;
var current_channel_detail_id;
var currentToken;
var currentTokenSecret;
var count=0;
var tweet_number = 0;
var channel_picture_tw;

$(document).scroll(function(e) {
	
	if(!__scrollLoad) return;
	current_channel_detail_id = $("#member-monitoring-twitter .timeline li").attr("channel_detail_id");
	currentToken = $("#member-monitoring-twitter .timeline li").attr("token");
	currentTokenSecret = $("#member-monitoring-twitter .timeline li").attr("token_secret");
	var aTop = $(document).innerHeight();
	var hW = $(window).height();
	var posLoad = $(document).scrollTop() + hW;
	if(posLoad >=aTop ){
		gettweetuserloadmore(currentToken,currentTokenSecret,current_channel_detail_id);				
	}
});
$( document ).ready(function() {
	var user_id = $("#monitoring_tab").attr("user_id");
	getposttowall(user_id);
	$(".block-channel a#monitoring-twitter").click(function(){
		$(".block-channel a").removeClass("active");
		$(this).addClass("active");
		getposttowall(user_id);
		$("#member-monitoring-twitter").show();
		$("#member-monitoring-facebook").hide();
		
	});
});
	/****************Twitter********************/
	
	function getposttowall(user_id) {
		// Total post loaded;
		var _totalLoaded = 0;
			$.ajax({
				  url : '../AdminAnalysis.do?user_id='+user_id,
				  dataType: 'json',
				  success : function(source) {
					  $("#member-monitoring-twitter .box-header").empty();
					    var _count = 0;
					    var _flgNext = false;
						$(source).each(function(index, element) {						
							if ((source[index].channel_id == 3)){
									channel_picture_tw = source[index].channel_picture;
								  	_channel_detail_id = source[index].channel_detail_id;
									tokenTitter = source[index].token_user;
					            	token = tokenTitter.split("_");
								    _count++;
								    var htmlUser = "<div avartar='"+channel_picture_tw+"' id='user_" + source[index].channel_detail_id + "' class='block-name' channel-detail-id='" + source[index].channel_detail_id + "' token-user='" + source[index].token_user + "' ><i class='icon-user'></i> <span>"+ source[index].channel_user +"</span></div>";
								    $("#member-monitoring-twitter .box-header").append(htmlUser);
								    $("#member-monitoring-twitter .box-header #user_" + source[index].channel_detail_id).click(function()
								    {
								    	$("#member-monitoring-twitter .box-header .block-name").removeClass("active");
								    	$(this).addClass("active");
								    	var currentTokenTwitter = $(this).attr("token-user");
								    	var currentToken = currentTokenTwitter.split("_");
								    	gettweetuser(currentToken[0],currentToken[1],source[index].channel_detail_id);
								    });
								    if(_count == 1)
								    {
								    	/*var params = {
											    screen_name: source[index].channel_user
											};
										 cb.__call(
												    "users_show",params,
												    function (reply) {
												    	tweet_number = reply.statuses_count;
												    	
												    });*/
								    	$("#member-monitoring-twitter .box-header .block-name:eq(0)").addClass("active");
								    	gettweetuser(token[0],token[1],source[index].channel_detail_id);
								    }								    
							}							 
			            });
				  }
			});
	}
		var tweet_number = 0;
		var reply_number = 0;
		function gettweetuser(token,token_secret,channel_detail_id){
			$("#member-monitoring-twitter .postBox .box-content .timeline").empty();		
			$("#member-monitoring-twitter .postBox .box-content .timeline").addClass("itemLoading");
			var htmlGeneral;
			var image;
			var url_image_user = $("#user_"+channel_detail_id).attr("avartar");
			cb.setToken(token,token_secret);
			 cb.__call(
					    "statuses_homeTimeline",
					    {"user_id": channel_detail_id,"count":20},
					    function (reply) {
					    	var id;
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
					    	$("#member-monitoring-twitter .postBox .box-content .timeline").empty();
					    	$("#member-monitoring-twitter .postBox .box-content .timeline").removeClass("itemLoading");
							for (var i=0;i<reply.length;i++){
								id = reply[i].id_str;
								name = reply[i].user.screen_name;
								img_user = reply[i].user.profile_image_url;
								strDate = reply[i].created_at;
								create_date = strDate.replace("+0000","");
								message = reply[i].text;
								reply_name = reply[i].in_reply_to_screen_name;
								reply_status = reply[i].in_reply_to_status_id;
								favorite_count = reply[i].favorite_count;
								favorite_me = reply[i].favorited;
								retweet_number = reply[i].retweet_count;
								follower_number = reply[i].user.followers_count;
								tweet_number = reply[i].user.statuses_count;
								
								reply_number = 0;
								if (isNull(reply_status)){
				    				for (var j=0;j<reply.length;j++){						    			
						    			if (id == reply[j].in_reply_to_status_id && !isNull(reply[j].in_reply_to_status_id))
							    		{	
						    				reply_number++;						    				
							    		}
						    		}
				    			}
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
										hmtlGeneral = '<li token="'+token+'" token_secret="'+token_secret+'" channel_detail_id = "'+channel_detail_id+'" id="'+id+'" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img class="avatar-small" src="'+img_user+'"><i class="icon-twitter-sign blue channel-icon" ></i></div><div class="content"><div class="block-content-top"><span class="name"><strong class="indent">'+name+'</strong> Sent <strong></strong></span> <span class="timePost">'+create_date+'</span> </div><blockquote>'+replaceURLWithHTMLLinks(message)+'</blockquote></div><div class="block-actions"><i class="icon-mail-reply-all" title="Reply"></i><span id="reply-num">'+reply_number+'</span><i class="icon-retweet" title="Retweet"></i><span id="retweet-num">'+retweet_number+'</span><i class="icon-star" title="Favorite"></i><span id="favorite-num">'+favorite_count+'</span><i class="icon-user" title="Engagement"></i><span id="engagement-num">'+engagement+'</span><span id="percent">%</span></div><div class="info"> <div class="menuFavorite" id="favorite" title=""><i class="icon-thumbs-up" favorite-count="'+favorite_count+'"></i></div><div class="menuDel" id="delete" title="Delete this tweet"><i class="icon-eraser"></i></div></div><div class="post_comment"><div class="gray facebook comment"><div class="avatar"><img class="avatar-small" src="'+url_image_user+'"></div></div><div class="arrow-box-left content"><div class="block-content"><input type="text" placeholder="Reply..." id="txtComment_'+id+'" class="txtComment"></div></div></div></li>';
										
									}else{
										hmtlGeneral = '<li token="'+token+'" token_secret="'+token_secret+'" channel_detail_id = "'+channel_detail_id+'" id="'+id+'" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img class="avatar-small" src="'+img_user+'"><i class="icon-twitter-sign blue channel-icon" ></i></div><div class="content"><div class="block-content-top"><span class="name"><strong class="indent">'+reply_name+'</strong> replied to <strong class="indent">'+name+'</strong><strong></strong> </span><span class="timePost">'+create_date+'</span> </div><blockquote>'+replaceURLWithHTMLLinks(message)+'</blockquote></div><div class="block-actions"><i class="icon-mail-reply-all" title="Reply"></i><span id="reply-num">'+reply_number+'</span><i class="icon-retweet" title="Retweet"></i><span id="retweet-num">'+retweet_number+'</span><i class="icon-star" title="Favorite"></i><span id="favorite-num">'+favorite_count+'</span><i class="icon-user" title="Engagement"></i><span id="engagement-num">'+engagement+'</span><span id="percent">%</span></div><div class="info"> <div class="menuFavorite" id="favorite" title=""><i class="icon-thumbs-up" favorite-count="'+favorite_count+'"></i></div><div class="menuDel" id="delete" title="Delete this tweet"><i class="icon-eraser"></i></div> </div><div class="post_comment"><div class="gray facebook comment"><div class="avatar"><img class="avatar-small" src="'+url_image_user+'"></div></div><div class="arrow-box-left content"><div class="block-content"><input type="text" placeholder="Reply..." id="txtComment_'+id+'" class="txtComment"></div></div></div></li>';
										
									}
									
									$("#member-monitoring-twitter .timeline").append(hmtlGeneral);
								img_comment = $('#' + id + ' .avatar-small').attr('src');
								$('#comment_twitter_Popup .modal-body .imgBox .avatar-large').attr('src',img_comment);
								$("li#"+ id + " .reply").click(function(){
									$("#comment_twitter_Popup").attr("tweet-id",$(this).attr("tweet-id"));
								});
								//check favorite 
								var _objTw = $('#member-monitoring-twitter .timeline #'+ id +' #favorite');
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
								}
								//favorite twitter
								$("#member-monitoring-twitter #" +id+" #favorite").click(function(){
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
								
								$("#member-monitoring-twitter #" +id+" #delete").click(function(){
									var _tweetid = $(this).parent(this).parent(this).attr("id");
									delTweet(token,token_secret,_tweetid);
									$(this).parent().parent().fadeOut();
								});
								
								
							}
							
							$("#member-monitoring-twitter .txtComment").keydown(function(e) {
					            if(e.keyCode==13){
					            	var id = $(this).parent().parent().parent().parent().attr("id");
					            	
					            	retweet(token,token_secret,id);
					            	$(this).val("");
					            	setTimeout(function(){
					            		gettweetuser(token,token_secret,_channel_detail_id);
					            	},2000);
								}			
					        });
							__scrollLoad = true;
					    }		
					);
		 }
		
		function gettweetuserloadmore(token,token_secret,channel_detail_id){
			__scrollLoad = false;
			count++;
			last_id = $(".timeline .twitter:last").attr("id");
			$("#member-monitoring-twitter .postBox .timeline").append('<li class="itemLoading"></li>');
			var htmlGeneral;
			var image;
			var url_image_user = $("#user_"+channel_detail_id).attr("avartar");
			cb.setToken(token,token_secret);
			 cb.__call(
					    "statuses_homeTimeline",
					    {"user_id": channel_detail_id,"count":21,"max_id": last_id},
					    function (reply) {
					    	var id;
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
							$("#member-monitoring-twitter .itemLoading").fadeOut();
							for (var i=0;i<reply.length;i++){
								id = reply[i].id_str;
								name = reply[i].user.screen_name;
								img_user = reply[i].user.profile_image_url;
								strDate = reply[i].created_at;
								create_date = strDate.replace("+0000","");
								message = reply[i].text;
								reply_name = reply[i].in_reply_to_screen_name;
								reply_status = reply[i].in_reply_to_status_id;
								favorite_count = reply[i].favorite_count;
								favorite_me = reply[i].favorited;
								retweet_number = reply[i].retweet_count;
								follower_number = reply[i].user.followers_count;
								tweet_number = reply[i].user.statuses_count;
								if (isNull(reply_status)){
				    				if (isNull(reply_status)){
					    				for (var j=0;j<reply.length;j++){						    			
							    			if (id == reply[j].in_reply_to_status_id && !isNull(reply[j].in_reply_to_status_id))
								    		{	
							    				reply_number++;						    				
								    		}
							    		}
					    			}
				    			}
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
									hmtlGeneral = '<li token="'+token+'" token_secret="'+token_secret+'" channel_detail_id = "'+channel_detail_id+'" id="'+id+'" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img class="avatar-small" src="'+img_user+'"><i class="icon-twitter-sign blue channel-icon" ></i></div><div class="content"><div class="block-content-top"><span class="name"><strong class="indent">'+name+'</strong> Sent <strong></strong> </span><span class="timePost">'+create_date+'</span> </div><blockquote>'+replaceURLWithHTMLLinks(message)+'</blockquote></div><div class="block-actions"><i class="icon-mail-reply-all" title="Reply"></i><span id="reply-num">'+reply_number+'</span><i class="icon-retweet" title="Retweet"></i><span id="retweet-num">'+retweet_number+'</span><i class="icon-star" title="Favorite"></i><span id="favorite-num">'+favorite_count+'</span><i class="icon-user" title="Engagement"></i><span id="engagement-num">'+engagement+'</span><span id="percent">%</span></div><div class="info"> <div class="menuFavorite" id="favorite" title=""><i class="icon-thumbs-up" favorite-count="'+favorite_count+'"></i></div><div class="menuDel" id="delete" title="Delete this tweet"><i class="icon-eraser"></i></div></div><div class="post_comment"><div class="gray facebook comment"><div class="avatar"><img class="avatar-small" src="'+url_image_user+'"></div></div><div class="arrow-box-left content"><div class="block-content"><input type="text" placeholder="Reply..." id="txtComment_'+id+'" class="txtComment"></div></div></div></li>';
									
								}else{
									hmtlGeneral = '<li token="'+token+'" token_secret="'+token_secret+'" channel_detail_id = "'+channel_detail_id+'" id="'+id+'" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img class="avatar-small" src="'+img_user+'"><i class="icon-twitter-sign blue channel-icon" ></i></div><div class="content"><div class="block-content-top"><span class="name"><strong class="indent">'+reply_name+'</strong> replied to <strong class="indent">'+name+'</strong><strong></strong></span><span class="timePost">'+create_date+'</span> </div><blockquote>'+replaceURLWithHTMLLinks(message)+'</blockquote></div><div class="block-actions"><i class="icon-mail-reply-all" title="Reply"></i><span id="reply-num">'+reply_number+'</span><i class="icon-retweet" title="Retweet"></i><span id="retweet-num">'+retweet_number+'</span><i class="icon-star" title="Favorite"></i><span id="favorite-num">'+favorite_count+'</span><i class="icon-user" title="Engagement"></i><span id="engagement-num">'+engagement+'</span><span id="percent">%</span></div><div class="info"><div class="menuFavorite" id="favorite" title=""><i class="icon-thumbs-up" favorite-count="'+favorite_count+'"></i></div><div class="menuDel" id="delete" title="Delete this tweet"><i class="icon-eraser"></i></div> </div><div class="post_comment"><div class="gray facebook comment"><div class="avatar"><img class="avatar-small" src="'+url_image_user+'"></div></div><div class="arrow-box-left content"><div class="block-content"><input type="text" placeholder="Reply..." id="txtComment_'+id+'" class="txtComment"></div></div></div></li>';
									
								}
								
								$("#member-monitoring-twitter .timeline").append(hmtlGeneral);
								img_comment = $('#' + id + ' .avatar-small').attr('src');
								$('#comment_twitter_Popup .modal-body .imgBox .avatar-large').attr('src',img_comment);
								$("li#"+ id + " .reply").click(function(){
									$("#comment_twitter_Popup").attr("tweet-id",$(this).attr("tweet-id"));
								});
								$("#member-monitoring-twitter .timeline li#" + last_id + ":last-child").remove();
								
								//check favorite 
								var _objTw = $('#member-monitoring-twitter .timeline #'+ id +' #favorite-more'+count+'');
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
								}
								$("#member-monitoring-twitter .postBox .timeline").remove("itemLoading");
								if (reply.length==1) return;
								
								//favorite twitter
								$("#member-monitoring-twitter #" +id+" #favorite-more"+count+"").click(function(){
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
								
								$("#member-monitoring-twitter #" +id+" #delete-more"+count+"").click(function(){
									var _tweetid = $(this).parent(this).parent(this).attr("id");
									delTweet(token,token_secret,_tweetid);
									$(this).parent().parent().fadeOut();
								});
								
								
							}
							__scrollLoad = true;
							
							$("#member-monitoring-twitter .txtComment-more"+count+"").keydown(function(e) {
					            if(e.keyCode==13){
					            	var id = $(this).parent().parent().parent().parent().attr("id");
					            	
					            	retweet(token,token_secret,id);
					            	$(this).val("");
					            	setTimeout(function(){
					            		gettweetuser(token,token_secret,_channel_detail_id);
					            	},2000);
								}			
					        });
							
							
					    }
					    
					);
		 }
		
		function favoriteTweet(token,token_secret,id){
			cb.setToken(token,token_secret);
			  cb.__call(
	  			    "favorites_create",
	  			    {"id": id},
	  			    function (reply) {
	  			    	aoFrm.mess("mess",mess.message_favorite);
	  			    }
	  			);
		}
		
		function delFavoriteTweet(token,token_secret,id){
			cb.setToken(token,token_secret);
			  cb.__call(
	  			    "favorites_destroy",
	  			    {"id": id},
	  			    function (reply) {
	  			    	aoFrm.mess("mess",mess.message_unfavorite);
	  			    }
	  			);
		}
		
		function delTweet(token,token_secret,id){
			cb.setToken(token,token_secret);
			  cb.__call(
	  			    "statuses_destroy_ID",
	  			    {"id": id},
	  			    function (reply) {
	  			    	aoFrm.mess("mess",mess.message_delete);
	  			    }
	  			);
		}
		
		function retweet(token,token_secret,id){
			var msg= $("#txtComment_" + id).val();
			cb.setToken(token,token_secret);
			  cb.__call(
	  			    "statuses_update",
	  			    {"status": msg,"in_reply_to_status_id": id},
	  			    function (reply) {
	  			    	aoFrm.mess("mess",mess.comment_tweet);
	  			    }
	  			);
		}