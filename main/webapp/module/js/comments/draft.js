/*******************************************************************************
 * Page Code: comments/draft First Author: Created Date:1
 ******************************************************************************/
 var currentdatetime = new Date(); 
 var date=currentdatetime.getFullYear()+"-"+currentdatetime.getMonth()+"-"+currentdatetime.getDate();
 var time=currentdatetime.getHours()+":"+currentdatetime.getMinutes();
 var time = "";
 if (currentdatetime.getHours() > 12){
	 time = (currentdatetime.getHours() - 12)+":"+currentdatetime.getMinutes() + " PM";
 }else{
	 time = currentdatetime.getHours()+":"+currentdatetime.getMinutes() + " AM";
 }
 var url_image;

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
 var _scrollLoad = false; 
 var channel_count_draft=0;
 checkExprired();
 aoFrm.mess("close","close");
 $(document).scroll(function(e) {		
		if(!_scrollLoad) return;
		var aTop = $(document).innerHeight();
		var hW = $(window).height();
		var posLoad = $(document).scrollTop() + hW;
		if(posLoad >=aTop ){
 		var time_post =$("#show_draft_comment li").last().attr("time_post");
 		if(!isNull(time_post)){
 			//var str= li_id.split("_");
			//var msg_id= str[0];
			loadMoreDraft(time_post);
 		}
			
			
			
		}
	});
 $("#timepicker1").attr("value",time);
 $("#time_send").text($("#timepicker1").val());

 $("#datepicker").datepick({
		dateFormat : 'yy-mm-dd',
		minDate: Date.today().add({
            days: -60
        }),
		onSelect : function(dateText, inst) { /* do some thing */
				var _txtDate =formatDate(dateText);// date_Obj.getUTCFullYear() + "-" + (date_Obj.getUTCMonth() + 1) + "-" + date_Obj.getUTCDate();				
				filterByDateDraft(_txtDate);
		}
	});
	$("#datepicker_schedule").datepick({
		dateFormat : 'yy-mm-dd',
		minDate: Date.today().add({
            days: -60
        }),
		multiSelect: 999,
		onSelect : function(dateText, inst) { /* do some thing */
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
		
		$(".body-draft .time_txt").html(e.time.value);
	});	

	$("#aoFrm-content-top #contentTop_contentsList").remove();
	$("#contents_draft_comment #contentTop_contentsList").clone().appendTo(
			"#aoFrm-content-top");
	$("#aoFrm-content-top #contentTop_contentsList").removeClass("hide");
	$("#contents_draft_comment #show_draft_comment").append('<li class="itemLoading"></li>');
	var newData = [];
	newData.push({
        name: "status_id", 
        value: 1
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
			 $("#contents_draft_comment #show_draft_comment .itemLoading").remove();
			  //var count_draft_df=  $(".nav_contents-draft .amount").html();
				//var count_all_df=  $(".nav_contents-all .amount").html();
				 //$("#draft_all").html(count_all_df);
				// $("#draft_image_all").attr("title",count_all_df);
				// $("#draft_draft").html(count_draft_df);
				// $("#draft_image_draft").attr("title",count_draft_df);
			// $("#draft_scheduled").html(count_schedule);
			// $("#draft_image_scheduled").attr("title",count_schedule);
			 //$("#draft_sent").html(count_send);
			 //$("#draft_image_sent").attr("title",count_send);
			  var htmlGeneral;
			 
				for ( var i = 0; i < data.length; i++) {
					 var url_image="";
					  var icon_camera="";

					if (data[i].channel_id == 2) {
						htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i></div><div class="content"  ><blockquote><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span> '+icon_camera+' </blockquote><div class="info"><span class="infor_cm">Draft saved '+ data[i].create_date +' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div id="delete_draft" style="display:none" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div></div><div id="show_comment_draft'+data[i].message_id+'" class="block-comment"></div></li>');
						
					}else if((data[i].channel_id == 3)) {
						htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i></div><div class="content" ><blockquote ><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span>  '+icon_camera+' </blockquote><div class="info"><span class="infor_cm" >Draft saved '+ data[i].create_date+' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div id="delete_draft" style="display:none" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div></div><div id="show_comment_draft'+data[i].message_id+'" class="block-comment"></div></li>');
					}
					
					$("#contents_draft_comment ul.timeline").append(htmlGeneral);
					
				}
				$("#contents_draft_comment .content").click(function(){
					var post_id=$(this).parent().attr("id");
					getCommentDetail(post_id);	
					
				});
				getCommentOfPost(1);
				_scrollLoad = true;
				$("#btn_scheduled").click(function(){
					
					if ($("#contents_draft_comment .body-draft").hasClass("open-scheduled")){
						$("#contents_draft_comment .body-draft").removeClass("open-scheduled");
						$("#contents_draft_comment .body-draft").addClass("close-scheduled");
					} else{
						
						$("#contents_draft_comment .body-draft").removeClass("close-scheduled");
						$("#contents_draft_comment .body-draft").addClass("open-scheduled");
					}
					
				});
				
				checkEmptyChannelContent("#contents_draft_comment");
			
				
		  }
	 });
	

	 filterprofile_comment('draft_profile_comment',1);
	 filterMemberComment('draft_member_list',1);
	aoFrm.reloadLang("#aoFrm-content-top");
	
	
	function loadMoreDraft(time_post){
		_scrollLoad = false;
		$("#contents_draft_comment ul.timeline").append('<div class="itemLoading"></div>');
		var newData = [];
		newData.push({
	        name: "status_id", 
	        value: 1
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
							htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i></div><div class="content"  ><blockquote><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span> '+icon_camera+' </blockquote><div class="info"><span class="infor_cm">Draft saved '+ data[i].create_date +' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div id="delete_draft" style="display:none" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div></div><div id="show_comment_draft'+data[i].message_id+'" class="block-comment"></div></li>');
							
						}else if((data[i].channel_id == 3)) {
							htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i></div><div class="content" ><blockquote ><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span>  '+icon_camera+' </blockquote><div class="info"><span class="infor_cm" >Draft saved '+ data[i].create_date+' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div id="delete_draft" style="display:none" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div></div><div id="show_comment_draft'+data[i].message_id+'" class="block-comment"></div></li>');
						}
						
						
						$("#contents_draft_comment ul.timeline").append(htmlGeneral);
						
					}
					if(data.length>0){
						_scrollLoad = true;
					}
					
					$("#contents_draft_comment .itemLoading").fadeOut();
					//$("#contents_draft_comment ul.timeline").removeClass('itemLoading');
					 getCommentOfPost(1);	
			  }
		
		 });
	}
	
	function filterByDateDraft(filterdate){
		$("#show_draft_comment").empty();
		$("#contents_draft_comment ul.timeline").append('<div class="itemLoading"></div>');
		var newData = [];
		newData.push({
	        name: "filterDate", 
	        value: filterdate
	    });
		newData.push({
	        name: "status_id", 
	        value: 1
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
								htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i></div><div class="content"  ><blockquote><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span> '+icon_camera+' </blockquote><div class="info"><span class="infor_cm">Draft saved '+data[i].create_date +' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div id="delete_draft" style="display:none" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div></div><div id="show_comment_draft'+data[i].message_id+'" class="block-comment"></div></li>');
								
							}else if((data[i].channel_id == 3)) {
								htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i></div><div class="content" ><blockquote ><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span>  '+icon_camera+' </blockquote><div class="info"><span class="infor_cm" >Draft saved '+ data[i].create_date+' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div id="delete_draft" style="display:none" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div></div><div id="show_comment_draft'+data[i].message_id+'" class="block-comment"></div></li>');
							}
						
						$("#contents_draft_comment ul.timeline").append(htmlGeneral);
						
					}
				  getCommentOfPost(1);	
				  	checkEmptyChannelContent("#contents_draft_comment");
					_scrollLoad = false;
					$("#contents_draft_comment .itemLoading").fadeOut();
				
					
			  }
		 });
	}
	
	

function getCommentDetail(post_id){
	var content =$("#"+post_id +" #content_draft").html();
	var infor_cm=$("#"+post_id +" .infor_cm").html();
	var username=$("#"+post_id +" .name strong").html();
	var avatar=$("#"+post_id +" .avatar img").attr("src");
	var chanel_type=$("#"+post_id).attr("chanel-type");
	_scrollLoad = false;
	commentDetail(post_id,content,infor_cm,username,avatar,chanel_type,"draft");
	$("#cancel_detail").click(function(){
		$("#show_draft_comment").show();
		$("#show_draft_comment_detail_draft").hide();
		_scrollLoad = true;
		
	});
	//alert(content+"_"+infor_cm+"_"+username+"_"+avatar)
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
	        value: "sent"
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
	function delete_draft_comment(comment_id){
				
		var newData = [];
		
		newData.push({
	        name: "comment_id", 
	        value:comment_id
	    });
		
		newData.push({
	        name: "Action", 
	        value: "delete_comment"
	    });    
		 $.ajax({
			 type:"GET",
			  url : 'CommentPublish.do',
			  dataType: 'text',
			  data:newData,
			  success : function(data) {
				  if(data.trim()!=""){
					  aoFrm.mess("mess",mess.message_delete);  
					  //$("#tree-menu .nav_comments-sent a").click();
					  $("#"+comment_id).remove();
				  }
				 
			   
			  }
		 });
	}
	function updateCommentToDraft(){
		var message=$("#comment_post").val();
		var str_cm=$("#comment_post").attr("comment_id");
		var str_cm_temp=str_cm.split("_");
		
		
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
	        name: "Action", 
	        value: "draft"
	    });    
		 $.ajax({
			 type:"GET",
			  url : 'CommentPublish.do',
			  dataType: 'text',
			  data:newData,
			  success : function(data) {
				  if(data.trim()!=""){
					  aoFrm.mess("mess",mess.message_save); 
					
					  $("#"+str_cm_temp[0]+"_message").html(" "+message);
					  //$("#tree-menu .nav_comments-sent a").click();
				  }
				 
			   
			  }
		 });
	}
