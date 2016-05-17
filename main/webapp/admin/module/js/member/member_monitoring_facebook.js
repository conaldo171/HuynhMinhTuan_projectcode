

var _curentUser = -1;
var _moreUser = false;
var _scrollLoad = false; 
var _posPage = 1;
var _posNumBeforedays = 1;
var _posBeforedays;
var timepost;
var _channel_detail_id;
var _token_user;
var _channel_id;
var count = 0;
var url_image_user;
var count_offer=0;
var friends_count;
var fans_count = 0;
var user_id;
var array_channel_detail= new Array();

$(document).scroll(function(e) {
	if(!_scrollLoad) return;
	
	var aTop = $(document).innerHeight();
	var hW = $(window).height();
	var posLoad = $(document).scrollTop() + hW;
	if(posLoad >=aTop ){
		_autoFindPost = 0;
		timepost = $("#member-monitoring-facebook .timeline li:last .block-name .timePost").attr("time-post");
		_channel_detail_id = $("#member-monitoring-facebook #content-fb").attr("channel-detail-id");
		_token_user = $("#member-monitoring-facebook .timeline li").attr("access-token");
		_channel_id = $("#member-monitoring-facebook .timeline li").attr("channel-id");
		var _time_last =$("#user_"+_channel_detail_id).attr("time_view");
		if(_channel_id=="2")
			{
			type_loadmore ="feed";
			}
		else
			{
			type_loadmore ="home";
			}
		getpostuserloadmore(_channel_id,_channel_detail_id,_token_user,timepost,type_loadmore,_time_last);				
	}
});

$( document ).ready(function() {
	var user_id = $("#monitoring_tab").attr("user_id");
	$("#member-monitoring-twitter").hide();
	$(".block-channel a#monitoring-facebook").click(function(){
		$(".block-channel a").removeClass("active");
		$(this).addClass("active");
		getposttowalluser(user_id);
		$("#member-monitoring-twitter").hide();
		$("#member-monitoring-facebook").show();
		
	});

	
	getposttowalluser(user_id);
	var refesh = setInterval(function() {
		getPostofChannel();	 
	},180000);
});
//var _boxContent = 0;
var image_user = 'https://graph.facebook.com/'+facebook_user_id+'/picture';
var type_loadmore='feed';

function getposttowalluser(user_id) {
			$.ajax({
				  url : '../AdminAnalysis.do?user_id='+user_id,
				  dataType: 'json',
				  success : function(source) {
					    var _count = 0;
					    var _flgNext = false;
					    $("#member-monitoring-facebook .box-header").empty();
					    $("#fb_menu_left").hide();
						$("#content-fb").attr("class","span12");
						$("#content-fb").css("margin-left","0");
						$(source).each(function(index, element) {
							
							if ((source[index].channel_id == 1)||(source[index].channel_id == 2)){
								var type_fb="";
								    _count++;
								    if(source[index].channel_id == 1){
								    	type_fb="home";
								    	array_channel_detail.push({"channel_detail_id":source[index].channel_detail_id,"last_view":source[index].last_view,"type":type_fb,"access_token": source[index].token_user});
								    }
								    else
								    	{
								    	type_fb="feed";
								    	array_channel_detail.push({"channel_detail_id":source[index].channel_detail_id,"last_view":source[index].last_view,"type":type_fb,"access_token": source[index].token_user});
								    	}
								    var htmlUser = "<div id='user_" + source[index].channel_detail_id + "' pchannel-id='"+source[index].pchannel_id+"' class='block-name' channel-id='"+source[index].channel_id+"' channel-detail-id='" + source[index].channel_detail_id + "' token-user='" + source[index].token_user + "' ><span id='number_"+source[index].channel_detail_id+"' style='display:none;margin-right: 3px' class='badge badge-dark-red'></span><i class='icon-user'></i> <span>"+ source[index].channel_user +"</span></div>";
								    
								    $("#member-monitoring-facebook .box-header").append(htmlUser);
								    $("#member-monitoring-facebook .box-header #user_" + source[index].channel_detail_id).click(function()
								    {
								    	friends_count = "";
								    	$("#member-monitoring-facebook .postBox .box-content .timeline").empty();
								    	$("#member-monitoring-facebook .box-header .block-name").removeClass("active");
								    	$(this).addClass("active");
								    	$("#member-monitoring-facebook .postBox .box-content .timeline").empty();
								    	$("#member-monitoring-facebook #fb_menu_left").hide();
								    	$("#member-monitoring-facebook #content-fb").attr("channel-detail-id",$(this).attr("channel-detail-id"));
								    	_channel_detail_id = $(this).attr("channel-detail-id");
								    	_token_user = $(this).attr("token-user");
								    	_channel_id = $(this).attr("channel-id");
								    	var _time_last =$(this).attr("time_view");
								    	url_image_user = 'https://graph.facebook.com/'+$(this).attr('channel-detail-id')+'/picture';
								    	//getFriends(_channel_detail_id,_token_user);
								    	
								    	getpostuser(_channel_id,_channel_detail_id,_token_user,url_image_user,type_fb,_time_last);								    	
								    	//pageLikeOfFacebookprofile(_channel_detail_id,_token_user);
								    	getAllFriends(_channel_id,_channel_detail_id,_token_user,url_image_user);
								    	updateLastview(_channel_detail_id,_channel_id,_time_last);
								    });
								    if(_count == 1)
								    {
								    	$("#member-monitoring-facebook .box-header .block-name:eq(0)").addClass("active");
								    	url_image_user = 'https://graph.facebook.com/'+$('#member-monitoring-facebook .box-header .block-name:eq(0)').attr('channel-detail-id')+'/picture';
								    	var _time_last =$(this).attr("time_view");
								    	getpostuser(source[index].channel_id,source[index].channel_detail_id,source[index].token_user,url_image_user,type_fb,_time_last);
								    	updateLastview(source[index].channel_detail_id,_channel_id,_time_last);
								    }								    
							}
							getPostofChannel();	 
			            });
						
				  }
			});
	}
	
	
	function getTotalLike(post_id,token_user,comment_like_count){
		var query = 'SELECT like_info,share_count,comment_info FROM stream where post_id=' + "'"+post_id+"'";
		
		FB.api('/'+post_id+'/fql',{q: query,access_token:token_user}, function(response) {
			var like_count = 0;
			var share_count = 0;
			var comment_count = 0;
			var active = 0;
			
			share_count = response.data[0].share_count;
	    	  like_count = response.data[0].like_info.like_count;
	    	  comment_count = response.data[0].comment_info.comment_count;
	    	  active = like_count + share_count + comment_count + comment_like_count;
	    	  $("#member-monitoring-facebook #"+post_id+" .block-actions .engagement-num").attr("active",active);
	    	  $("#member-monitoring-facebook #"+post_id+" .block-actions .like-num").html(like_count);
	    	  $("#member-monitoring-facebook #"+post_id+" .block-actions .comment-num").html(comment_count);
	    	  $("#member-monitoring-facebook #"+post_id+" .block-actions .share-num").html(share_count);
		});
		
	}
	
	function getFbEngagement(channel_detail_id,post_id,token_user){
		var query = 'SELECT post_id FROM stream  where source_id=' + "'"+channel_detail_id+"'" + ' limit 1000';
		var channel_id =$("#member-monitoring-facebook #user_" + channel_detail_id).attr("channel-id");
		if (channel_id == 2){
			var pchannel_id = $("#member-monitoring-facebook #user_" + channel_detail_id).attr("pchannel-id");
			FB.api('/'+pchannel_id+'/accounts',{access_token:token_user}, function(response) {
					 var datasource=response.data;
					 for(var j=0; j<datasource.length;j++){
						token_page = datasource[j].access_token;
							getFans(channel_detail_id,token_page);
							FB.api('/'+channel_detail_id+'/fql',{q: query,access_token:token_user}, function(response) {
								var post_count = response.data.length;
								var active = $("#member-monitoring-facebook #"+post_id+" .block-actions .engagement-num").attr("active");
								if (post_count == 0 || fans_count == 0){
									engagement = 0;
								}else{
									engagement = ((active/post_count)/fans_count)*100;
									engagement = Math.floor(engagement*100)/100;
								}
								$("#member-monitoring-facebook #"+post_id+" .block-actions .engagement-num").html(engagement);
							});
						} 
			 });
			
		}else{
			FB.api('/'+channel_detail_id+'/fql',{q: query,access_token:token_user}, function(response) {
				var post_count = response.data.length;
				var active = $("#member-monitoring-facebook #"+post_id+" .block-actions .engagement-num").attr("active");
				if (post_count == 0 || friends_count == 0){
					engagement = 0;
				}else{
					engagement = ((active/post_count)/friends_count)*100;
					engagement = Math.floor(engagement*100)/100;
				}
				$("#member-monitoring-facebook #"+post_id+" .block-actions .engagement-num").html(engagement);
			});
		}
		
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
		
	function getpostuser(channel_id,channel_detail_id,token_user,url_image_user,type,_time_last){
		$("#member-monitoring-facebook .postBox .box-content .timeline").empty();		
		$("#member-monitoring-facebook .postBox .box-content .timeline").addClass("itemLoading");
		FB
		.api(
				'/'+channel_detail_id+'/'+type,
				'get',{access_token:token_user},
				function(response) {
					if (!response || response.error) {
							$("#member-monitoring-facebook .box-content .timeline .itemLoading").remove();
							$("#member-monitoring-facebook .fb_error").removeClass("hide");
							$("#member-monitoring-facebook .fb_error").html("Facebook Alert Message : <br /> " + enumerateObject(response.error));									
						
					} else {						
						var id;
						var message;
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
						$("#member-monitoring-facebook .postBox .box-content .timeline").removeClass("itemLoading");
						for ( var i = 0; i < response.data.length; i++) {
							//var long_time_create=0;
							var new_post ="";
							post_id = response.data[i].id;
							post_count = response.data.length;
							time_post=toTimestamp(response.data[i].created_time)-1;
							if (!isNull(response.data[i].description)) {
								id = response.data[i].from.id;
								strTime = response.data[i].created_time;
								//long_time_create=toTimestamp(strTime);
								time = formatDateGMT(strTime);
								
								//time = time.replace("+0000"," ");
								url_image= 'https://graph.facebook.com/'+response.data[i].from.id+'/picture';
								name = response.data[i].from.name;
								message = response.data[i].description;
								link_picture = response.data[i].link;
								
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
									
								// alert(new_post)
								}
								
								if (channel_id == 1){
									
									hmtlGeneral = '<li count="'+count+'" id="'+ post_id +'" channel-id="'+channel_id+'" channel-detail-id="'+id+'" access-token="'+token_user+'" class="arrow-box-left gray facebook itemNew" chanel-type="facebook"><div class="avatar"><img class="avatar-small" src="'
									+ url_image
									+ '"><i class="icon-facebook-sign blue channel-icon" ></i></div><div class="content"><div class="block-name">'+new_post+'<span class="name"><strong class="indent">'
									+ name
									+'</strong></span><span class="timePost" time-post="'+time_post+'">' +time +'</span></div><blockquote class="status">'
									+ replaceURLWithHTMLLinks(message)
									+ '</blockquote><div class="picture"><a href="'+link_picture+'" target="_blank"><img src="'+ picture +'" alt=""/></a></div></div><div class="info"><div class="content_share" onclick="shareContent('+"'"+post_id+"'"+');"><i class="icon-share" title="Share this post"></i></div><div class="menuLike liked" title="" id="like-click"><i class="icon-thumbs-up" id="like_'+post_id+'"></i></div></span><div class="block-actions"><i class="icon-thumbs-up-alt" title="Like"></i><span class="like-num">0</span><i class="icon-comment" title="Comment"></i><span class="comment-num">0</span><i class="icon-share" title="Share"></i><span class="share-num">0</span><i class="icon-meh" title="Like on comment"></i><span id="comment-like-num">'+comment_like_count+'</span><i class="icon-user" title="Engagement"></i><span class="engagement-num"  active="'+active+'" post-count="'+post_count+'">0</span><span class="percent">%</span></div></div></div><div class="post_comment"><div class="gray facebook comment"><div class="avatar"><img src="'+url_image_user+'" class="avatar-small"></div></div><div class="arrow-box-left content"><div class="block-content"><input type="text" id="txtComment" placeholder="Write a comment..."></input></div></div></div><div class="block-comment"></div></li>';
									$("#member-monitoring-facebook .box-content .timeline").append(hmtlGeneral);
								}else{
									//alert("11"+new_post)
									hmtlGeneral = '<li count="'+count+'" id="'+ post_id +'" channel-id="'+channel_id+'" channel-detail-id="'+id+'" access-token="'+token_user+'" class="arrow-box-left gray facebook itemNew" chanel-type="facebook"><div class="avatar"><img class="avatar-small" src="'
									+ url_image
									+ '"><i class="icon-facebook-sign blue channel-icon" ></i></div><div class="content"><div class="block-name">'+new_post+'<span class="name"><strong class="indent">'
									+ name
									+'</strong></span><span class="timePost" time-post="'+time_post+'">' +time +'</span> </div><blockquote class="status">'
									+ replaceURLWithHTMLLinks(message)
									+ '</blockquote><div class="picture"><a href="'+link_picture+'" target="_blank"><img src="'+ picture +'" alt=""/></a></div></div><div class="info"><div class="content_share" onclick="shareContent('+"'"+post_id+"'"+');"><i class="icon-share" title="Share this post"></i></div><div class="menuLike liked" title="" id="like-click"><i class="icon-thumbs-up" id="like_'+post_id+'"></i></div><div class="menuDelFb" id="delete" onclick="deleteStatus('+"'"+post_id+"'"+','+"'"+ token_user+"'"+')" title="Delete this post"><i class="icon-eraser"></i></div></span><div class="block-actions"><i class="icon-thumbs-up-alt" title="Like"></i><span class="like-num">0</span><i class="icon-comment" title="Comment"></i><span class="comment-num">0</span><i class="icon-share" title="Share"></i><span class="share-num">0</span><i class="icon-meh" title="Like on comment"></i><span id="comment-like-num">'+comment_like_count+'</span><i class="icon-user" title="Engagement"></i><span class="engagement-num"  active="'+active+'" post-count="'+post_count+'">0</span><span class="percent">%</span></div></div></div><div class="post_comment"><div class="gray facebook comment"><div class="avatar"><img src="'+url_image_user+'" class="avatar-small"></div></div><div class="arrow-box-left content"><div class="block-content"><input type="text" id="txtComment" placeholder="Write a comment..."></input></div></div></div><div class="block-comment"></div></li>';
									$("#member-monitoring-facebook .box-content .timeline").append(hmtlGeneral);
									
								}
								getTotalLike(post_id,token_user,comment_like_count);
							} else if (!isNull(response.data[i].message)) {
								
								id = response.data[i].from.id;
								message = response.data[i].message;
								strTime = response.data[i].created_time;
								time = formatDateGMT(strTime);
								//var time_post=toTimestamp( response.data[i].created_time)-1;
								url_image= 'https://graph.facebook.com/'+response.data[i].from.id+'/picture';
								name = response.data[i].from.name;
								link_picture = response.data[i].link;
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
								if (channel_id == 1){
									hmtlGeneral = '<li count="'+count+'" id="'+ post_id +'" channel-id="'+channel_id+'" channel-detail-id="'+id+'" access-token="'+token_user+'" class="arrow-box-left gray facebook itemNew" chanel-type="facebook"><div class="avatar"><img class="avatar-small" src="'
									+ url_image
									+ '"><i class="icon-facebook-sign blue channel-icon" ></i></div><div class="content"><div class="block-name">'+new_post+'<span class="name"><strong class="indent">'
									+ name
									+'</strong></span><span class="timePost" time-post="'+time_post+'">' +time +'</span></div><blockquote class="status">'
									+ replaceURLWithHTMLLinks(message)
									+ '</blockquote><div class="picture"><a href="'+link_picture+'" target="_blank"><img src="'+ picture +'" alt=""/></a></div></div><div class="info"><div class="content_share" onclick="shareContent('+"'"+post_id+"'"+');"><i class="icon-share" title="Share this post"></i></div><div class="menuLike liked" title="" id="like-click"><i class="icon-thumbs-up" id="like_'+post_id+'"></i></div></span><div class="block-actions"><i class="icon-thumbs-up-alt" title="Like"></i><span class="like-num">0</span><i class="icon-comment" title="Comment"></i><span class="comment-num">0</span><i class="icon-share" title="Share"></i><span class="share-num">0</span><i class="icon-meh" title="Like on comment"></i><span id="comment-like-num">'+comment_like_count+'</span><i class="icon-user" title="Engagement"></i><span class="engagement-num"  active="'+active+'" post-count="'+post_count+'">0</span><span class="percent">%</span></div></div></div><div class="post_comment"><div class="gray facebook comment"><div class="avatar"><img src="'+url_image_user+'" class="avatar-small"></div></div><div class="arrow-box-left content"><div class="block-content"><input type="text" id="txtComment" placeholder="Write a comment..."></input></div></div></div><div class="block-comment"></div></li>';
									$("#member-monitoring-facebook .box-content .timeline").append(hmtlGeneral);
								}else{
									hmtlGeneral = '<li count="'+count+'" id="'+ post_id +'" channel-id="'+channel_id+'" channel-detail-id="'+id+'" access-token="'+token_user+'" class="arrow-box-left gray facebook itemNew" chanel-type="facebook"><div class="avatar"><img class="avatar-small" src="'
									+ url_image
									+ '"><i class="icon-facebook-sign blue channel-icon" ></i></div><div class="content"><div class="block-name">'+new_post+'<span class="name"><strong class="indent">'
									+ name
									+'</strong></span><span class="timePost" time-post="'+time_post+'">' +time +'</span></div><blockquote class="status">'
									+ replaceURLWithHTMLLinks(message)
									+ '</blockquote><div class="picture"><a href="'+link_picture+'" target="_blank"><img src="'+ picture +'" alt=""/></a></div></div><div class="info"><div class="content_share" onclick="shareContent('+"'"+post_id+"'"+');"><i class="icon-share" title="Share this post"></i></div><div class="menuLike liked" title="" id="like-click"><i class="icon-thumbs-up" id="like_'+post_id+'"></i></div><div class="menuDelFb" id="delete-more" onclick="deleteStatus('+"'"+post_id+"'"+','+"'"+ token_user+"'"+')" title="Delete this post"><i class="icon-eraser"></i></div></span><div class="block-actions"><i class="icon-thumbs-up-alt" title="Like"></i><span class="like-num">0</span><i class="icon-comment" title="Comment"></i><span class="comment-num">0</span><i class="icon-share" title="Share"></i><span class="share-num">0</span><i class="icon-meh" title="Like on comment"></i><span id="comment-like-num">'+comment_like_count+'</span><i class="icon-user" title="Engagement"></i><span class="engagement-num"  active="'+active+'" post-count="'+post_count+'">0</span><span class="percent">%</span></div></div></div><div class="post_comment"><div class="gray facebook comment"><div class="avatar"><img src="'+url_image_user+'" class="avatar-small"></div></div><div class="arrow-box-left content"><div class="block-content"><input type="text" id="txtComment" placeholder="Write a comment..."></input></div></div></div><div class="block-comment"></div></li>';
									$("#member-monitoring-facebook .box-content .timeline").append(hmtlGeneral);
									
								}
								getTotalLike(post_id,token_user,comment_like_count);
							}
							
							getComment(post_id,channel_detail_id,token_user,count);
							// Check Like
							checkLikeUnLike(post_id,channel_detail_id,token_user);							
													
							getFbEngagement(channel_detail_id,post_id,token_user);
						}
						
						setTimeout(function(){
							clickLikeComment(count);
						},2000);
						
						$("#member-monitoring-facebook #like-click").click(function(){							
							var id = $(this).parent().parent().attr("id");
							var access_token = $(this).parent().parent().attr("access-token");
							if(!isNull(id))
							{	
								if ($(this).hasClass("liked")){
									fbLike(id,access_token);																			
									$("#like_" + id).attr("class","icon-thumbs-down");
									$("#like_" + id).parent().removeClass("liked");
									$("#like_" + id).parent().attr("title","Unlike");
									$("#like_" + id).parent().addClass("unlike");
									
								}else{												
									fbUnLike(id,access_token);
									$("#like_" + id).attr("class","icon-thumbs-up");
									$("#like_" + id).parent().removeClass("unlike");
									$("#like_" + id).parent().attr("title","Like this post");
									$("#like_" + id).parent().addClass("liked");												
								}
							}
						});
						
						var idWaitForLoad;
						
						$("#member-monitoring-facebook .post_comment .arrow-box-left #txtComment").keydown(function(e) {
							
				            if(e.keyCode==13){
				            	var id = $(this).parent().parent().parent().parent().attr("id");
				            	var access_token = $(this).parent().parent().parent().parent().attr("access-token");
				            	
				               	postComment(id,access_token);
				            	$(this).val("");
				            	idWaitForLoad = id;
				            	setTimeout(function(){
				            		 getComment(idWaitForLoad,id,access_token,count);
				            	},1000);
				            	var count = $(this).parent().parent().parent().parent().attr("count");
				            	setTimeout(function(){
									clickLikeComment(count);
								},3000);
							}			
				        });
						_scrollLoad = true;
						}
				});
	}
	
	function getpostuserloadmore(channel_id,channel_detail_id,token_user,timepost,type,_time_last){
		
		_scrollLoad = false;
		//alert(channel_detail_id+"_"+timepost)
		var	url_image_user = 'https://graph.facebook.com/'+channel_detail_id+'/picture';
		count++;
		//$("#member-monitoring-facebook .postBox .itemLoading").show();
		$("#member-monitoring-facebook .postBox .timeline li").removeClass("itemNew");
		$("#member-monitoring-facebook .postBox .timeline").append('<li class="itemLoading"></li>');
		FB
		.api(
				'/'+channel_detail_id+'/'+type+'?limit=25&until=' + timepost,
				'get',{access_token:token_user},
				function(response) {
					
					if (!response || response.error) {
							$("#member-monitoring-facebook .box-content .timeline .itemLoading").remove();
							$("#member-monitoring-facebook .fb_error").removeClass("hide");
							$("#member-monitoring-facebook .fb_error").html("Facebook Alert Message : <br /> " + enumerateObject(response.error));									
							
					} else {						
						var id;
						var message;
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
						//$("#member-monitoring-facebook .postBox .box-content .timeline").empty();
						$("#member-monitoring-facebook .itemLoading").fadeOut();
						for ( var i = 0; i < response.data.length; i++) {
							//alert(enumerateArray(response.data));
							var new_post ="";
							var post_id = response.data[i].id;
							post_count = response.data.length;
							if (!isNull(response.data[i].description)) {
								//alert(response.data[i].description);
								id = response.data[i].from.id;
								strTime = response.data[i].created_time;
								time = formatDateGMT(strTime);
								var time_post=toTimestamp(response.data[i].created_time)-1;
								url_image= 'https://graph.facebook.com/'+response.data[i].from.id+'/picture';
								name = response.data[i].from.name;
								message = response.data[i].description;
								link_picture = response.data[i].link;
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
								if (channel_id == 1){
									hmtlGeneral = '<li count="'+count+'" id="'+ post_id +'" channel-id="'+channel_id+'" channel-detail-id="'+id+'" access-token="'+token_user+'" class="arrow-box-left gray facebook itemNew" chanel-type="facebook"><div class="avatar"><img class="avatar-small" src="'
									+ url_image
									+ '"><i class="icon-facebook-sign blue channel-icon" ></i></div><div class="content"><div class="block-name">'+new_post+'<span class="name"><strong class="indent">'
									+ name
									+'</strong></span><span class="timePost" time-post="'+time_post+'">' +time +'</span></div><blockquote class="status">'
									+ replaceURLWithHTMLLinks(message)
									+ '</blockquote><div class="picture"><a href="'+link_picture+'" target="_blank"><img src="'+ picture +'" alt=""/></a></div></div><div class="info"><div class="content_share" onclick="shareContent('+"'"+post_id+"'"+');"><i class="icon-share" title="Share this post"></i></div><div class="menuLike liked" title="" id="like-click-more'+count+'"><i class="icon-thumbs-up" id="like_'+post_id+'"></i></div></span><div class="block-actions"><i class="icon-thumbs-up-alt" title="Like"></i><span class="like-num">0</span><i class="icon-comment" title="Comment"></i><span class="comment-num">0</span><i class="icon-share" title="Share"></i><span class="share-num">0</span><i class="icon-meh" title="Like on comment"></i><span id="comment-like-num">'+comment_like_count+'</span><i class="icon-user" title="Engagement"></i><span class="engagement-num"  active="'+active+'" post-count="'+post_count+'">0</span><span class="percent">%</span></div></div></div><div class="post_comment"><div class="gray facebook comment"><div class="avatar"><img src="'+url_image_user+'" class="avatar-small"></div></div><div class="arrow-box-left content"><div class="block-content"><input type="text" id="txtComment-more'+count+'" placeholder="Write a comment..."></input></div></div></div><div class="block-comment"></div></li>';
									$("#member-monitoring-facebook .box-content .timeline").append(hmtlGeneral);
								}else{
									hmtlGeneral = '<li count="'+count+'" id="'+ post_id +'" channel-id="'+channel_id+'" channel-detail-id="'+id+'" access-token="'+token_user+'" class="arrow-box-left gray facebook itemNew" chanel-type="facebook"><div class="avatar"><img class="avatar-small" src="'
									+ url_image
									+ '"><i class="icon-facebook-sign blue channel-icon" ></i></div><div class="content"><div class="block-name">'+new_post+'<span class="name"><strong class="indent">'
									+ name
									+'</strong></span><span class="timePost" time-post="'+time_post+'">' +time +'</span></div><blockquote class="status">'
									+ replaceURLWithHTMLLinks(message)
									+ '</blockquote><div class="picture"><a href="'+link_picture+'" target="_blank"><img src="'+ picture +'" alt=""/></a></div></div><div class="info"><div class="content_share" onclick="shareContent('+"'"+post_id+"'"+');"><i class="icon-share" title="Share this post"></i></div><div class="menuLike liked" title="" id="like-click-more'+count+'"><i class="icon-thumbs-up" id="like_'+post_id+'"></i></div><div class="menuDelFb" onclick="deleteStatus('+"'"+post_id+"'"+','+"'"+ token_user+"'"+')" title="Delete this post"><i class="icon-eraser"></i></div></span><div class="block-actions"><i class="icon-thumbs-up-alt" title="Like"></i><span class="like-num">0</span><i class="icon-comment" title="Comment"></i><span class="comment-num">0</span><i class="icon-share" title="Share"></i><span class="share-num">0</span><i class="icon-meh" title="Like on comment"></i><span id="comment-like-num">'+comment_like_count+'</span><i class="icon-user" title="Engagement"></i><span class="engagement-num"  active="'+active+'" post-count="'+post_count+'">0</span><span class="percent">%</span></div></div></div><div class="post_comment"><div class="gray facebook comment"><div class="avatar"><img src="'+url_image_user+'" class="avatar-small"></div></div><div class="arrow-box-left content"><div class="block-content"><input type="text" id="txtComment-more'+count+'" placeholder="Write a comment..."></input></div></div></div><div class="block-comment"></div></li>';
									$("#member-monitoring-facebook .box-content .timeline").append(hmtlGeneral);
								}
								getTotalLike(post_id,token_user,comment_like_count);
							} else if (!isNull(response.data[i].message)) {
								//alert(response.data[i].message);
								id = response.data[i].from.id;
								message = response.data[i].message;
								strTime = response.data[i].created_time;
								time = formatDateGMT(strTime);
								var time_post=toTimestamp( response.data[i].created_time)-1;
								url_image= 'https://graph.facebook.com/'+response.data[i].from.id+'/picture';
								name = response.data[i].from.name;
								link_picture = response.data[i].link;
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
								if (channel_id == 1){
									hmtlGeneral = '<li count="'+count+'" id="'+ post_id +'" channel-id="'+channel_id+'" channel-detail-id="'+id+'" access-token="'+token_user+'" class="arrow-box-left gray facebook itemNew" chanel-type="facebook"><div class="avatar"><img class="avatar-small" src="'
									+ url_image
									+ '"><i class="icon-facebook-sign blue channel-icon" ></i></div><div class="content"><div class="block-name">'+new_post+'<span class="name"><strong class="indent">'
									+ name
									+'</strong></span><span class="timePost" time-post="'+time_post+'">' +time +'</span></div><blockquote class="status">'
									+ replaceURLWithHTMLLinks(message)
									+ '</blockquote><div class="picture"><a href="'+link_picture+'" target="_blank"><img src="'+ picture +'" alt=""/></a></div></div><div class="info"><div class="content_share" onclick="shareContent('+"'"+post_id+"'"+');"><i class="icon-share" title="Share this post"></i></div><div class="menuLike liked" id="like-click-more'+count+'" title=""><i class="icon-thumbs-up" id="like_'+post_id+'"></i></div></span><div class="block-actions"><i class="icon-thumbs-up-alt" title="Like"></i><span class="like-num">0</span><i class="icon-comment" title="Comment"></i><span class="comment-num">0</span><i class="icon-share" title="Share"></i><span class="share-num">0</span><i class="icon-meh" title="Like on comment"></i><span id="comment-like-num">'+comment_like_count+'</span><i class="icon-user" title="Engagement"></i><span class="engagement-num"  active="'+active+'" post-count="'+post_count+'">0</span><span class="percent">%</span></div></div></div><div class="post_comment"><div class="gray facebook comment"><div class="avatar"><img src="'+url_image_user+'" class="avatar-small"></div></div><div class="arrow-box-left content"><div class="block-content"><input type="text" id="txtComment-more'+count+'" placeholder="Write a comment..."></input></div></div></div><div class="block-comment"></div></li>';
									$("#member-monitoring-facebook .box-content .timeline").append(hmtlGeneral);
									
								}else{
									hmtlGeneral = '<li count="'+count+'" id="'+ post_id +'" channel-id="'+channel_id+'" channel-detail-id="'+id+'" access-token="'+token_user+'" class="arrow-box-left gray facebook itemNew" chanel-type="facebook"><div class="avatar"><img class="avatar-small" src="'
									+ url_image
									+ '"><i class="icon-facebook-sign blue channel-icon" ></i></div><div class="content"><div class="block-name">'+new_post+'<span class="name"><strong class="indent">'
									+ name
									+'</strong></span><span class="timePost" time-post="'+time_post+'">' +time +'</span> </div><blockquote class="status">'
									+ replaceURLWithHTMLLinks(message)
									+ '</blockquote><div class="picture"><a href="'+link_picture+'" target="_blank"><img src="'+ picture +'" alt=""/></a></div></div><div class="info"><div class="content_share" onclick="shareContent('+"'"+post_id+"'"+');"><i class="icon-share" title="Share this post"></i></div><div class="menuLike liked" id="like-click-more'+count+'" title=""><i class="icon-thumbs-up" id="like_'+post_id+'"></i></div><div class="menuDelFb" onclick="deleteStatus('+"'"+post_id+"'"+','+"'"+ token_user+"'"+')" title="Delete this post"><i class="icon-eraser"></i></div></span><div class="block-actions"><i class="icon-thumbs-up-alt" title="Like"></i><span class="like-num">0</span><i class="icon-comment" title="Comment"></i><span class="comment-num">0</span><i class="icon-share" title="Share"></i><span class="share-num">0</span><i class="icon-meh" title="Like on comment"></i><span id="comment-like-num">'+comment_like_count+'</span><i class="icon-user" title="Engagement"></i><span class="engagement-num"  active="'+active+'" post-count="'+post_count+'">0</span><span class="percent">%</span></div></div></div><div class="post_comment"><div class="gray facebook comment"><div class="avatar"><img src="'+url_image_user+'" class="avatar-small"></div></div><div class="arrow-box-left content"><div class="block-content"><input type="text" id="txtComment-more'+count+'" placeholder="Write a comment..."></input></div></div></div><div class="block-comment"></div></li>';
									$("#member-monitoring-facebook .box-content .timeline").append(hmtlGeneral);
									
								}
								getTotalLike(post_id,token_user,comment_like_count);
							}
							$("#member-monitoring-facebook .postBox .timeline").remove("itemLoading");
							
							getComment(post_id,channel_detail_id,token_user,count);
							// Check Like
							checkLikeUnLike(post_id,channel_detail_id,token_user);
													
							getFbEngagement(channel_detail_id,post_id,token_user);
						}
						
						setTimeout(function(){
							clickLikeComment(count);
						},2000);
						
						$("#member-monitoring-facebook #like-click-more"+count+"").click(function(){
							var id = $(this).parent().parent().attr("id");
							var access_token = $(this).parent().parent().attr("access-token");
							if(!isNull(id))
							{	
								if ($(this).hasClass("liked")){
									fbLike(id,access_token);																			
									$("#like_" + id).attr("class","icon-thumbs-down");
									$("#like_" + id).parent().removeClass("liked");
									$("#like_" + id).parent().attr("title","Unlike");
									$("#like_" + id).parent().addClass("unlike");
									
								}else{												
									fbUnLike(id,access_token);
									$("#like_" + id).attr("class","icon-thumbs-up");
									$("#like_" + id).parent().removeClass("unlike");
									$("#like_" + id).parent().attr("title","Like this post");
									$("#like_" + id).parent().addClass("liked");												
								}
							}
						});
						
						if (response.data.length == 1) return;
						
						var idWaitForLoad;
						
						$("#member-monitoring-facebook .post_comment .arrow-box-left #txtComment-more"+count+"").keydown(function(e) {
							
				            if(e.keyCode==13){
				            	var id = $(this).parent().parent().parent().parent().attr("id");
				            	var access_token = $(this).parent().parent().parent().parent().attr("access-token");
				            	var count = $(this).parent().parent().parent().parent().attr("count");
				            	
				               	postComment(id,access_token);
				            	$(this).val("");
				            	idWaitForLoad = id;
				            	setTimeout(function(){
				            		 getComment(idWaitForLoad,id,access_token,count);
				            	},1000);
				            	setTimeout(function(){
									clickLikeComment(count);
								},3000);
							}			
				        });
						_scrollLoad = true;
					
						}
				});
		
	}
	function getComment(id,channel_detail_id,access_token,count){
		$("#"+ id +" .block-comment").empty();
	  FB
		.api(
				'/'+id+'/comments',
				'get',{access_token:access_token},
				function(response) {
					var htmlGuestComment;
					var commentImage;
					var commentName;
					var strTime;
					var commentTime;
					var commentMessage;
					var comment_id;
					for ( var i = 0; i < response.data.length; i++){
						commentName = response.data[i].from.name;
						commentImage = 'https://graph.facebook.com/'+response.data[i].from.id+'/picture';
						strTime = response.data[i].created_time;
						//commentTime = strTime.replace("T"," ");
						commentTime = formatDateGMT(strTime);
						//commentTime = commentTime.replace("+0000"," ");
						commentMessage = response.data[i].message;
						comment_id = response.data[i].id;
						htmlGuestComment = '<div class="guest-comment" id="'+comment_id+'"><div class="gray facebook comment"><div class="avatar"><img src="'+commentImage+'" class="avatar-small"></div></div><div class="arrow-box-left content"><div class="block-content"><blockquote><span class="name"><strong class="indent">'+commentName+'</strong></span> '+replaceURLWithHTMLLinks(commentMessage)+'</blockquote></div><div class="info"> <span class="timePost">'+commentTime+'</span> </div><div id="click-like-comment'+count+'" class="likeComment liked"><i class="icon-thumbs-up" id="like_comment_'+comment_id+'" title=""></i></div><i class="icon-eraser delComment" onclick="delComment('+"'"+comment_id+"'"+','+"'"+access_token+"'"+')" title="delete this comment"></i></div></div>';
						$("#"+ id +" .block-comment").append(htmlGuestComment);
						// Check Like Comment
						checkLikeUnLikeComment(comment_id,channel_detail_id,access_token);	
						}
					
					}
				); 
			

	}
	
	function checkLikeUnLike(post_id,id,access_token){
		FB.api('/'+ post_id +'/likes','get',{access_token:access_token}, function(_response) {
			var _obj = $('.timeline #'+ post_id +' .menuLike');
			if (_response.data.length == 0){
				$(_obj).find("i").attr("class","icon-thumbs-up");
				$(_obj).addClass("liked");
				$(_obj).attr("title","Like this post");
				$(_obj).removeClass("unlike");
			}else{
				try
				{	
					for(var j=0;j<_response.data.length;j++)
					{
						if(_response.data[j].id == id)
						{
							//alert(id);
							$(_obj).find("i").attr("class","icon-thumbs-down");
							$(_obj).attr("title","Unlike");
							$(_obj).addClass("unlike");
							$(_obj).removeClass("liked");						}
					}	
				}catch(e)
				{
					
				}
			}
			
		});
	}
	
	function fbLike(id,access_token) {
		  FB.api('/'+ id +'/likes', 'post',{access_token:access_token}, function(response) {
		    if (!response || response.error) {
		      aoFrm.mess("alert",enumerateObject(response.error));
		    } else {
		    	aoFrm.mess("mess",mess.message_like);
		    }
		   });
		}
	
	function fbUnLike(id,access_token) {
		  FB.api('/'+ id +'/likes', 'post','delete',{access_token:access_token}, function(response) {
		    if (!response || response.error) {
		    	aoFrm.mess("alert",mess.error_occured);
		    } else {
		    	aoFrm.mess("mess",mess.message_unlike);
		    }
		   });
		}
	
	function deleteStatus(post_id,access_token){
		FB.api('/'+post_id,'post','delete',{access_token:access_token}, function(response) {
	         if (!response || response.error) {
	        	 aoFrm.mess("alert",enumerateObject(response.error));
	         } else {
	        	 aoFrm.mess("mess",mess.message_delete);
	        	 $(".timeline #" + post_id).fadeOut();
	         }
	    });
	}
	
	function delComment(comment_id,access_token){
		FB
		.api(
				'/'+comment_id,
				'delete',{access_token:access_token},
				function(response) {
					if (!response || response.error) {
					    aoFrm.mess("alert",enumerateObject(response.error));
					} else {
						aoFrm.mess("mess",mess.comment_delete);
					}
				});
		$('.block-comment #' + comment_id).fadeOut();
	}
	
	function postComment(post_id,access_token){
		var msg = $("#member-monitoring-facebook #" + post_id + " .post_comment .arrow-box-left .block-content input").val();
		FB.api('/'+post_id+'/comments','post',{ message: msg,access_token: access_token }, function(response) {
	         if (!response || response.error) {
	        	 aoFrm.mess("alert",enumerateObject(response.error));
	         } else {
	        	 aoFrm.mess("mess",mess.comment_post);
	         }
	    });
		$("#member-monitoring-facebook .post_comment .arrow-box-left .block-content input").attr("value","");
	}
	
	function likeComment(comment_id,access_token){
		FB.api('/'+ comment_id +'/likes', 'post',{access_token:access_token}, function(response) {
		    if (!response || response.error) {
		      aoFrm.mess("alert",enumerateObject(response.error));
		    } else {
		    	aoFrm.mess("mess",mess.message_like);
		    }
		   });
	}
	
	function unLikeComment(comment_id,access_token) {
		  FB.api('/'+ comment_id +'/likes', 'post','delete',{access_token:access_token}, function(response) {
		    if (!response || response.error) {
		    	aoFrm.mess("alert",mess.error_occured);
		    } else {
		    	aoFrm.mess("mess",mess.message_unlike);
		    }
		   });
		}
	
	function checkLikeUnLikeComment(comment_id,id,access_token){
		FB.api('/'+ comment_id +'/likes','get',{access_token:access_token}, function(_response) {
			var _obj = $('.block-comment #'+ comment_id +' .likeComment');
			if (_response.data.length == 0){
				$(_obj).find("i").attr("class","icon-thumbs-up");
				$(_obj).addClass("liked");
				$(_obj).attr("title","Like this post");
				$(_obj).removeClass("unlike");
			}else{
				try
				{	
					for(var j=0;j<_response.data.length;j++)
					{
						if(_response.data[j].id == id)
						{
							$(_obj).find("i").attr("class","icon-thumbs-down");
							$(_obj).attr("title","Unlike");
							$(_obj).addClass("unlike");
							$(_obj).removeClass("liked");						}
					}	
				}catch(e)
				{
					
				}
			}
			
		});
	}
	
	function clickLikeComment(count){
		//like comment
		$("#member-monitoring-facebook #click-like-comment"+count+"").click(function(){
			var comment_id = $(this).parent().parent().attr("id");
			var access_token = $(this).parent().parent().parent().parent().attr("access-token");
			if(!isNull(comment_id))
			{	
				if ($(this).hasClass("liked")){
					likeComment(comment_id,access_token);																			
					$("#like_comment_" + comment_id).attr("class","icon-thumbs-down");
					$("#like_comment_" + comment_id).parent().removeClass("liked");
					$("#like_comment_" + comment_id).parent().attr("title","Unlike");
					$("#like_comment_" + comment_id).parent().addClass("unlike");
					
				}else{												
					unLikeComment(comment_id,access_token);
					$("#like_comment_" + comment_id).attr("class","icon-thumbs-up");
					$("#like_comment_" + comment_id).parent().removeClass("unlike");
					$("#like_comment_" + comment_id).parent().attr("title","Like this post");
					$("#like_comment_" + comment_id).parent().addClass("liked");
				}
			}
		});
	}
	
	function shareContent(post_id){
		var picture = $(".timeline #" + post_id + " .content .picture img").attr("src");
		if (picture == ""){
			var str = post_id.split("_");
			window.open(
				      'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent("https://www.facebook.com/"+str[0]+"/posts/"+str[1]+""), 
				      'facebook-share-dialog', 
				      'width=626,height=436'); 
				    return false;
		}else{
			var link = $(".timeline #" + post_id + " .content .picture a").attr("href");
			window.open(
				      'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(link), 
				      'facebook-share-dialog', 
				      'width=626,height=436'); 
				    return false;
		}
		
	}
	
	
	function getAllFriends(channel_id,channel_detail_id,token_user,url_image_user){
		FB.api('/'+channel_detail_id+'/friends',{access_token:token_user}, function(response) {
		  //  var dataSource= response.data;
			friends_count = response.data.length;
		    var source = ($.map(response.data, function(item) {
	            return {
	                label: item.name,
	                value: item.id
	            };
	        }));
		    //searchFriend(source,channel_id,token_user,url_image_user);
	  });
	}
	function updateLastview(channel_detail_id,channel_id,time_last){
		var current_date = new Date();//user_
		//var first_time_post = $("#member-monitoring-facebook .timeline li:first .info .timePost").attr("time-post");
		$("#number_"+channel_detail_id).hide();
		//alert(first_time_post)
		
		current_date= toTimestamp(current_date);
		$("#user_"+channel_detail_id).attr("time_view",time_last);
		for(var i=0; i<array_channel_detail.length;i++){
				if(array_channel_detail[i].channel_detail_id==channel_detail_id)
					array_channel_detail[i].last_view=current_date+"000";
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
			  url : '../ConnectChannel.do',
			  dataType: 'text',
			  data: dataString,
			  success : function(source) {
				  
			  }
	 	   });
	}
	function getPostofChannel(){
  		for(var i=0; i<array_channel_detail.length;i++){
  			var last_time=parseInt(array_channel_detail[i].last_view)/1000;
  			var channel_detail_id=array_channel_detail[i].channel_detail_id;
  			getnewPost(channel_detail_id,array_channel_detail[i].access_token,last_time,array_channel_detail[i].type);
  		   
  		}
  	}
	function getnewPost(channel_detail_id,access_token,last_time,type){
		$("#number_"+channel_detail_id).hide();
		FB.api(
					'/'+channel_detail_id+'/'+type,
					'get',{access_token:access_token,since:last_time},
					function(response) {
						//alert(JSON.stringify(response));
						if(!isNull(response)){
							//alert(channel_detail_id+"_"+response.data.length);
							if(response.data.length>0){
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
								
						}
						
					});
	}
	