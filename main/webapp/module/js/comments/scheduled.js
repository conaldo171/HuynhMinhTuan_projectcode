/***************************************************************************
 Page Code:	contents/scheduled
 First Author:
 Created Date: 
 **************************************************************************/
     var currentdatetime = new Date(); 
     
 var date=currentdatetime.getFullYear()+"-"+currentdatetime.getMonth()+"-"+currentdatetime.getDate();
 var time=currentdatetime.getHours()+":"+currentdatetime.getMinutes();
 var time = "";
 if (currentdatetime.getHours() > 12){
	 time = (currentdatetime.getHours() - 12)+":"+currentdatetime.getMinutes() + " PM";
 }else{
	 time = currentdatetime.getHours()+":"+currentdatetime.getMinutes() + " AM";
 }
 $("#timepicker1").attr("value",time);
 $("#time_send").text($("#timepicker1").val());
	 var list_post=new Array();
	 var token_array=new Array();
	var date;
	var msg_schedule_id;
	var channel_count_schedule=0;
	var _scrollLoad = false; 
	 $( document ).ready(function() {
			checkExprired();
			aoFrm.mess("close","close");
			$("#btn_send_comment").click(function(){
				postComment();
			});
			$("#btn_save_comment").click(function(){
				updateCommentToDraft();
			});
			$("#btn_save_scheduled_comment").click(function(){
				updateCommentToSchedule();
			});
			//btn_scheduled
		});
	 $(document).scroll(function(e) {		
			if(!_scrollLoad) return;
			var aTop = $(document).innerHeight();
			var hW = $(window).height();
			var posLoad = $(document).scrollTop() + hW;
			if(posLoad >=aTop ){
				var time_post =$("#show_schedule_comment li").last().attr("time_post");
	 		//var li_id =$("#show_schedule_comment li").last().attr("id");
	 		if(!isNull(time_post)){
	 			//var str= li_id.split("_");
				//var msg_id= str[0];
	 			
				loadMoreSchedule(time_post);
	 		}
				
				
				
			}
		});
	$("#contents_scheduled_comment #datepicker" ).datepick({ dateFormat: 'yy-mm-dd',minDate : 0, onSelect: function(dateText, inst) {	
		var _txtDate =formatDate(dateText);// date_Obj.getUTCFullYear() + "-" + (date_Obj.getUTCMonth() + 1) + "-" + date_Obj.getUTCDate();				
		filterByDateSchedule(_txtDate);
		
		
	}});
	
	$("#datepicker_schedule").datepick({
		dateFormat : 'yy-mm-dd',
		altFormat: 'yy-mm-dd',
		minDate: Date.today().add({
            days: -60
        }),
		multiSelect: 999,
		onSelect : function(dateText, inst) { 
			var _txtDate = "";
			for(var i=0;i<dateText.length;i++)
			{
				var _txt1 = dateText[i].getUTCFullYear() + "-" + (dateText[i].getUTCMonth() + 1) + "-" + dateText[i].getUTCDate();
				_txtDate+= _txt1 + "; ";
			}
			$("#date_value_schedule").html(_txtDate);
			$("#date_value_schedule").attr("value",_txtDate)
		}
	});
	
	$('#timepicker_schedule').timepicker().on('changeTime.timepicker', function(e) {
		$(".body-scheduled .time_txt").html(e.time.value);
	});	
	
	$("#aoFrm-content-top #contentTop_contentsList").remove();
	$("#contents_scheduled_comment #contentTop_contentsList").clone().appendTo("#aoFrm-content-top");
	$("#aoFrm-content-top #contentTop_contentsList").removeClass("hide");
	
	 
	var messageid;
	 $("#contents_scheduled_comment #show_schedule_comment").append('<li class="itemLoading"></li>');
	var newData = [];
	newData.push({
        name: "status_id", 
        value: 2
    });
	
	newData.push({
        name: "Action", 
        value: "draft_comment"
    });    
	 $.ajax({
		 type:"GET",
		  url : 'Message.do',
		  dataType: 'json',
		  data:newData,
		  success : function(data) {
			  var htmlGeneral;
			  $("#contents_scheduled_comment #show_schedule_comment .itemLoading").remove();
			//  $("#scheduled_draft").html(count_draft);
				// $("#scheduled_image_draft").attr("title",count_draft);
				
				// $("#scheduled_sent").html(count_send);
				// $("#scheduled_image_sent").attr("title",count_send);
				// var count_schedule_sch=  $(".nav_contents-scheduled .amount").html();
				// var count_all_sch=  $(".nav_contents-all .amount").html();	
				// $("#scheduled_scheduled").html(count_schedule_sch);
				//$("#scheduled_all").html(count_all_sch);
				//$("#scheduled_image_all").attr("title",count_all_sch);
				//$("#scheduled_image_scheduled").attr("title",count_schedule_sch);
				for ( var i = 0; i < data.length; i++) {
					 var url_image="";
					  var icon_camera="";
					  if (data[i].channel_id == 2) {
							htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i></div><div class="content"  ><blockquote><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span> '+icon_camera+' </blockquote><div class="info"><span class="infor_cm">Schedule saved '+data[i].create_date +' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div id="delete_draft" style="display:none" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div></div><div id="show_comment_schedule'+data[i].message_id+'" class="block-comment"></div></li>');
							
						}else if((data[i].channel_id == 3)) {
							htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i></div><div class="content" ><blockquote ><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span>  '+icon_camera+' </blockquote><div class="info"><span class="infor_cm" >Schedule saved '+ data[i].create_date+' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div id="delete_draft" style="display:none" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div></div><div id="show_comment_schedule'+data[i].message_id+'" class="block-comment"></div></li>');
						}
					$("#contents_scheduled_comment ul.timeline").append(htmlGeneral);
				}
				getCommentOfPost(2);
				checkEmptyChannelContent("#contents_scheduled_comment");
				_scrollLoad = true;
				
				$("#btn_scheduled").click(function(){
					if ($(".body-scheduled").hasClass("open-scheduled")){
						$(".body-scheduled").removeClass("open-scheduled");
						$(".body-scheduled").addClass("close-scheduled");
					} else{
						$(".body-scheduled").removeClass("close-scheduled");
						$(".body-scheduled").addClass("open-scheduled");
					}
					
				});  
		  }
	 });
	
	filterprofile_comment('schedule_profile',"2"); 
	filterMemberComment('scheduled_member_list',2);
	aoFrm.reloadLang("#aoFrm-content-top"); 

	function loadMoreSchedule(time_post){
		
		_scrollLoad = false;
		$("#contents_schedule ul.timeline").append('<li class="itemLoading"></li>');
		var newData = [];
		newData.push({
	        name: "status_id", 
	        value: 2
	    });
		newData.push({
	        name: "time_post", 
	        value: time_post
	    });
		newData.push({
	        name: "Action", 
	        value: "draft_comment_more"
	    });    
		 $.ajax({
			 type:"GET",
			  url : 'Message.do',
			  dataType: 'json',
			  data:newData,
			  success : function(data) {
				  var htmlGeneral;
				 
					for ( var i = 0; i < data.length; i++) {
						 var url_image="";
						  var icon_camera="";
						  if (data[i].channel_id == 2) {
								htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i></div><div class="content"  ><blockquote><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span> '+icon_camera+' </blockquote><div class="info"><span class="infor_cm">Schedule saved '+ data[i].create_date +' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div id="delete_draft" style="display:none" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div></div><div id="show_comment_schedule'+data[i].message_id+'" class="block-comment"></div></li>');
								
							}else if((data[i].channel_id == 3)) {
								htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i></div><div class="content" ><blockquote ><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span>  '+icon_camera+' </blockquote><div class="info"><span class="infor_cm" >Schedule saved '+ data[i].create_date+' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div id="delete_draft" style="display:none" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div></div><div id="show_comment_schedule'+data[i].message_id+'" class="block-comment"></div></li>');
							}
						$("#contents_scheduled_comment ul.timeline").append(htmlGeneral);
					}
					if(data.length>0){
						_scrollLoad = true;
					}
					
					getCommentOfPost(2);	
					$("#contents_schedule .itemLoading").fadeOut();

				
					$("#btn_scheduled").click(function(){
						if ($(".body-scheduled").hasClass("open-scheduled")){
							$(".body-scheduled").removeClass("open-scheduled");
							$(".body-scheduled").addClass("close-scheduled");
						} else{
							$(".body-scheduled").removeClass("close-scheduled");
							$(".body-scheduled").addClass("open-scheduled");
						}
						
					});  
			  }
		 });
	}
	function filterByDateSchedule(filterdate)
	{
		//alert(filterdate)
		$("#show_schedule_comment").empty();
		$("#contents_scheduled_comment ul.timeline").append('<div class="itemLoading"></div>');
		var newData = [];
		newData.push({
	        name: "filterDate", 
	        value: filterdate
	    });
		newData.push({
	        name: "status_id", 
	        value: 2
	    });
		newData.push({
	        name: "Action", 
	        value: "filterbydatecomment"
	    });    
		 $.ajax({
			 type:"GET",
			  url : 'Message.do',
			  dataType: 'json',
			  data:newData,
			  success : function(data) {
				  var htmlGeneral;
				 
					for ( var i = 0; i < data.length; i++) {
						 var url_image="";
						  var icon_camera="";
						  if (data[i].channel_id == 2) {
								htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i></div><div class="content"  ><blockquote><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span> '+icon_camera+' </blockquote><div class="info"><span class="infor_cm">Schedule saved '+ data[i].create_date +' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div id="delete_draft" style="display:none" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div></div><div id="show_comment_schedule'+data[i].message_id+'" class="block-comment"></div></li>');
								
							}else if((data[i].channel_id == 3)) {
								htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i></div><div class="content" ><blockquote ><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span>  '+icon_camera+' </blockquote><div class="info"><span class="infor_cm" >Schedule saved '+ data[i].create_date+' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div id="delete_draft" style="display:none" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div></div><div id="show_comment_schedule'+data[i].message_id+'" class="block-comment"></div></li>');
							}
						$("#contents_scheduled_comment ul.timeline").append(htmlGeneral);
					}
					checkEmptyChannelContent("#contents_scheduled_comment");
					getCommentOfPost(2);
					_scrollLoad = false;
					$("#contents_scheduled_comment .itemLoading").fadeOut();
					$("#btn_scheduled").click(function(){
						if ($(".body-scheduled").hasClass("open-scheduled")){
							$(".body-scheduled").removeClass("open-scheduled");
							$(".body-scheduled").addClass("close-scheduled");
						} else{
							$(".body-scheduled").removeClass("close-scheduled");
							$(".body-scheduled").addClass("open-scheduled");
						}
						
					});  
			  }
		 });
	}
	function postComment(){
		var message=$("#comment_post").val();
		var str_cm=$("#comment_post").attr("comment_id");
		var str_cm_temp=str_cm.split("_");
		var post_id=$("#comment_post").attr("post_id");
		var channel_id=$("#comment_post").attr("channel_id");
		var channel_user=$("#comment_post").attr("user_name")
		
		var newData = [];
		newData.push({
	        name: "message", 
	        value: message
	    });
		newData.push({
	        name: "comment_id", 
	        value: str_cm_temp[0]
	    });
		newData.push({
	        name: "post_id", 
	        value: post_id
	    });
		newData.push({
	        name: "channel_detail_id", 
	        value: str_cm_temp[1]
	    });
		newData.push({
	        name: "channel_id", 
	        value: channel_id
	    });
		newData.push({
	        name: "channel_user", 
	        value: channel_user
	    });
		newData.push({
	        name: "create_date", 
	        value: formatDateTimeCurrent()
	    });
		newData.push({
	        name: "Action", 
	        value: "sentfromsch"
	    });    
		 $.ajax({
			 type:"GET",
			  url : 'CommentPublish.do',
			  dataType: 'text',
			  data:newData,
			  success : function(data) {
				  if(data.trim()!=""){
					  aoFrm.mess("mess",mess.message_send);  
					  $("#tree-menu .nav_comments-sent a").click();
				  }
				 
			   
			  }
		 });
	}
	function updateCommentToDraft(){
		var message=$("#comment_post").val();
		var str_cm=$("#comment_post").attr("comment_id");
		var str_cm_temp=str_cm.split("_");
		var post_id=$("#comment_post").attr("post_id");
		var channel_id=$("#comment_post").attr("channel_id");
		var channel_user=$("#comment_post").attr("user_name")
		
		var newData = [];
		newData.push({
	        name: "message", 
	        value: message
	    });
		newData.push({
	        name: "comment_id", 
	        value: str_cm_temp[0]
	    });
		newData.push({
	        name: "post_id", 
	        value: post_id
	    });
		newData.push({
	        name: "channel_detail_id", 
	        value: str_cm_temp[1]
	    });
		newData.push({
	        name: "channel_id", 
	        value: channel_id
	    });
		newData.push({
	        name: "channel_user", 
	        value: channel_user
	    });
		newData.push({
	        name: "create_date", 
	        value: formatDateTimeCurrent()
	    });
		newData.push({
	        name: "Action", 
	        value: "savedraftfromsch"
	    });    
		 $.ajax({
			 type:"GET",
			  url : 'CommentPublish.do',
			  dataType: 'text',
			  data:newData,
			  success : function(data) {
				  if(data.trim()!=""){
					  aoFrm.mess("mess",mess.message_send);  
					  $("#tree-menu .nav_comments-draft a").click();
				  }
				 
			   
			  }
		 });
	}
	function on_load_post_schedule(channel_count,source, type_div){
		var message= $("#contentPostSchedule").val();
		channel_count_schedule++;
		if(channel_count_schedule==channel_count){
			saveMessageToSend(message,source,type_div,"schedule");
			//$("#tree-menu .nav_contents-sent a").click();
			//saveMessageToSend(message,channel_detail_id,type_div);
		}
	}	
	
	
