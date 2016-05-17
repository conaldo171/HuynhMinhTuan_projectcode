/***************************************************************************
 Page Code:	contents/all
 First Author:
 Created Date: 
 **************************************************************************/
 
  var token_array=new Array();
	 var currentdatetime = new Date(); 
 var date=currentdatetime.getFullYear()+"-"+currentdatetime.getMonth()+"-"+currentdatetime.getDate();
 var time = "";
 if (currentdatetime.getHours() > 12){
	 time = (currentdatetime.getHours() - 12)+":"+currentdatetime.getMinutes() + " PM";
 }else{
	 time = currentdatetime.getHours()+":"+currentdatetime.getMinutes() + " AM";
 }
 var _scrollLoad = false; 
 var channel_count_schedule=0;
 var channel_count_draft=0;
 aoFrm.mess("close","close");
 $(document).scroll(function(e) {		
		if(!_scrollLoad) return;
		var aTop = $(document).innerHeight();
		var hW = $(window).height();
		var posLoad = $(document).scrollTop() + hW;
		if(posLoad >=aTop ){
 		var time_post =$("#show_data_all_comment li").last().attr("time_post");
 		if(!isNull(time_post)){
 			
			loadMoreAll(time_post);	
 		}
		}
	});
 $( document ).ready(function() {
	 checkExprired();
 });
 $("#timepicker_draft").attr("value",time);
 $("#time_send").text($("#timepicker_draft").val());
 $("#timepicker_schedule").attr("value",time);
 $("#time_send").text($("#timepicker_schedule").val());
	$("#datepicker").datepick({
		dateFormat : 'yy-mm-dd',
		minDate: Date.today().add({
            days: -60
        }),
		onSelect : function(dateText, inst) { /* do some thing */
				var _txtDate =formatDate(dateText);// date_Obj.getUTCFullYear() + "-" + (date_Obj.getUTCMonth() + 1) + "-" + date_Obj.getUTCDate();				
				filterByDateAll(_txtDate);
		}
	});
	
	$("#datepicker_schedule").datepick({
		dateFormat : 'yy-mm-dd',
		minDate : -60,
		multiSelect: 999,
		onSelect : function(dateText, inst) { /* do some thing */
			var _txtDate = "";
			for(var i=0;i<dateText.length;i++)
			{
				var _txt1 = dateText[i].getUTCFullYear() + "-" + (dateText[i].getUTCMonth() + 1) + "-" + dateText[i].getUTCDate();
				_txtDate+= _txt1 + "; ";
			}
			$("#date_value_schedule").html(_txtDate);
			$("#date_value_schedule").attr("value",_txtDate);
		}
	});
	
$('#timepicker_schedule').timepicker().on('changeTime.timepicker', function(e) {
		
		$(".body-schedule .time_txt").html(e.time.value);
	});	
	$("#aoFrm-content-top #contentTop_contentsList").remove();
	$("#contents_all_comment #contentTop_contentsList").clone().appendTo(
			"#aoFrm-content-top");
	$("#aoFrm-content-top #contentTop_contentsList").removeClass("hide");
	
	
	
	
	filterprofile_comment('all_profile',"0");
	filterMemberComment('all_member_list',"0");
	aoFrm.reloadLang("#aoFrm-content-top");
	$("#contents_all_comment #show_data_all_comment").append('<li class="itemLoading"></li>');
	var newData = [];
	
	
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
			  $("#contents_all_comment #show_data_all_comment .itemLoading").remove();
			    // var count_schedule_sch=  $(".nav_contents-scheduled .amount").html();
				// var count_all_all=  $(".nav_contents-all .amount").html();	
				// var count_draft_df=  $(".nav_contents-draft .amount").html();
				/// var count_sent_st=  $(".nav_contents-sent .amount").html();
				// $("#all_all").html(count_all_all);
				 //$("#all_image_all").attr("title",count_all_all);
				 //$("#all_draft").html(count_draft_df);
				// $("#all_image_draft").attr("title",count_draft_df);
				// $("#all_scheduled").html(count_schedule_sch);
				// $("#all_image_scheduled").attr("title",count_schedule_sch);
				// $("#all_sent").html(count_sent_st);
				// $("#all_image_sent").attr("title",count_sent_st);
				for ( var i = 0; i < data.length; i++) {
					var url_image="";                      
					  var icon_camera="";
					
					if (data[i].channel_id == 2) {
						if(data[i].status_id==1){
							htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i><span class="label label-black" text="draft">Draft</span></div><div class="content"  ><blockquote><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span> '+icon_camera+' </blockquote><div class="info"><span class="infor_cm">Draft saved '+ data[i].create_date +' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div id="delete_draft" style="display:none" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div></div><div id="show_comment_draft'+data[i].message_id+'" class="block-comment"></div></li>');				
						}
						else if(data[i].status_id==2)
							{
							htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i><span class="label label-green" text="schedule">Schedule</span></div><div class="content"  ><blockquote><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span> '+icon_camera+' </blockquote><div class="info"><span class="infor_cm">Schedule saved '+ data[i].create_date +' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div id="delete_draft" style="display:none" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div></div><div id="show_comment_schedule'+data[i].message_id+'" class="block-comment"></div></li>');
							}
						else
						{
							htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i><span class="label label-blue" text="send">Send</span></div><div class="content" id="'+data[i].message_id+'" ><blockquote><span id="content_sent">'+replaceURLWithHTMLLinks(data[i].content)+'</span> '+icon_camera+' </blockquote><div class="info"><span>Sent saved '+ data[i].create_date +' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span></div></div><div id="show_comment_sent'+data[i].message_id+'" class="block-comment"></div></li>');
							}
						
						
					}else if((data[i].channel_id == 3)) {
						if(data[i].status_id==1){
							htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i><span class="label label-black" text="draft">Draft</span></div><div class="content" ><blockquote ><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span>  '+icon_camera+' </blockquote><div class="info"><span class="infor_cm" >Draft saved '+ data[i].create_date+' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div id="delete_draft" style="display:none" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div></div><div id="show_comment_draft'+data[i].message_id+'" class="block-comment"></div></li>');
						}
						else if(data[i].status_id==2)
							{
							htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i><span class="label label-green" text="schedule">Schedule</span></div><div class="content" ><blockquote ><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span>  '+icon_camera+' </blockquote><div class="info"><span class="infor_cm" >Schedule saved '+ data[i].create_date+' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div id="delete_draft" style="display:none" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div></div><div id="show_comment_schedule'+data[i].message_id+'" class="block-comment"></div></li>');
							}
						else 
						{
							htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i><span class="label label-blue" text="send">Send</span></div><div class="content" id="'+data[i].message_id+'" ><blockquote ><span id="content_sent">'+replaceURLWithHTMLLinks(data[i].content)+'</span>  '+icon_camera+' </blockquote><div class="info"><span>Sent saved '+ data[i].create_date +' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span></div></div><div id="show_comment_sent'+data[i].message_id+'" class="block-comment"></div></li>');
							}
					}
					
					$("#show_data_all_comment").append(htmlGeneral);
					aoFrm.reloadLang("#show_data_all_comment");
				}
				getCommentOfPost(1);
				getCommentOfPost(2);
				getCommentOfPost(3);
				_scrollLoad = true;
				$("#btn_scheduled").click(function(){
					if ($(".body-all").hasClass("open-scheduled")){
						$(".body-all").removeClass("open-scheduled");
						$(".body-all").addClass("close-scheduled");
					} else{
						$(".body-all").removeClass("close-scheduled");
						$(".body-all").addClass("open-scheduled");
					}
					
				});
				
				
		  }
	 });
	

		function loadMoreAll(time_post){
			_scrollLoad = false;
			$("#contents_all_comment ul.timeline").append('<div class="itemLoading"></div>');
			var newData = [];
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
									if(data[i].status_id==1){
										htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i><span class="label label-black" text="draft">Draft</span></div><div class="content"  ><blockquote><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span> '+icon_camera+' </blockquote><div class="info"><span class="infor_cm">Draft saved '+ data[i].create_date +' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div id="delete_draft" style="display:none" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div></div><div id="show_comment_draft'+data[i].message_id+'" class="block-comment"></div></li>');				
									}
									else if(data[i].status_id==2)
										{
										htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i><span class="label label-green" text="schedule">Schedule</span></div><div class="content"  ><blockquote><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span> '+icon_camera+' </blockquote><div class="info"><span class="infor_cm">Schedule saved '+ data[i].create_date +' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div id="delete_draft" style="display:none" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div></div><div id="show_comment_schedule'+data[i].message_id+'" class="block-comment"></div></li>');
										}
									else
									{
										htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i><span class="label label-blue" text="send">Send</span></div><div class="content" id="'+data[i].message_id+'" ><blockquote><span id="content_sent">'+replaceURLWithHTMLLinks(data[i].content)+'</span> '+icon_camera+' </blockquote><div class="info"><span>Sent saved '+ data[i].create_date +' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span></div></div><div id="show_comment_sent'+data[i].message_id+'" class="block-comment"></div></li>');
										}
									
									
								}else if((data[i].channel_id == 3)) {
									if(data[i].status_id==1){
										htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i><span class="label label-black" text="draft">Draft</span></div><div class="content" ><blockquote ><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span>  '+icon_camera+' </blockquote><div class="info"><span class="infor_cm" >Draft saved '+ data[i].create_date+' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div id="delete_draft" style="display:none" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div></div><div id="show_comment_draft'+data[i].message_id+'" class="block-comment"></div></li>');
									}
									else if(data[i].status_id==2)
										{
										htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i><span class="label label-green" text="schedule">Schedule</span></div><div class="content" ><blockquote ><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span>  '+icon_camera+' </blockquote><div class="info"><span class="infor_cm" >Schedule saved '+ data[i].create_date+' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div id="delete_draft" style="display:none" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div></div><div id="show_comment_schedule'+data[i].message_id+'" class="block-comment"></div></li>');
										}
									else 
									{
										htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i><span class="label label-blue" text="send">Send</span></div><div class="content" id="'+data[i].message_id+'" ><blockquote ><span id="content_sent">'+replaceURLWithHTMLLinks(data[i].content)+'</span>  '+icon_camera+' </blockquote><div class="info"><span>Sent saved '+ data[i].create_date +' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span></div></div><div id="show_comment_sent'+data[i].message_id+'" class="block-comment"></div></li>');
										}
								}
							
							$("#show_data_all_comment").append(htmlGeneral);
							aoFrm.reloadLang("#show_data_all_comment");
						}
						if(data.length>0){
							_scrollLoad = true;
						}
						getCommentOfPost(1);
						getCommentOfPost(2);
						getCommentOfPost(3)
						$("#contents_all_comment .itemLoading").fadeOut();
				  }
			 });
		}
		function filterByDateAll(filterdate){
			$("#show_data_all_comment").empty();
			$("#contents_all_comment ul.timeline").append('<div class="itemLoading"></div>');
			var newData = [];
			newData.push({
		        name: "filterDate", 
		        value: filterdate
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
									if(data[i].status_id==1){
										htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i><span class="label label-black" text="draft">Draft</span></div><div class="content"  ><blockquote><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span> '+icon_camera+' </blockquote><div class="info"><span class="infor_cm">Draft saved '+ data[i].create_date +' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div id="delete_draft" style="display:none" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div></div><div id="show_comment_draft'+data[i].message_id+'" class="block-comment"></div></li>');				
									}
									else if(data[i].status_id==2)
										{
										htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i><span class="label label-green" text="schedule">Schedule</span></div><div class="content"  ><blockquote><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span> '+icon_camera+' </blockquote><div class="info"><span class="infor_cm">Schedule saved '+ data[i].create_date +' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div id="delete_draft" style="display:none" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div></div><div id="show_comment_schedule'+data[i].message_id+'" class="block-comment"></div></li>');
										}
									else
									{
										htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i><span class="label label-blue" text="send">Send</span></div><div class="content" id="'+data[i].message_id+'" ><blockquote><span id="content_sent">'+replaceURLWithHTMLLinks(data[i].content)+'</span> '+icon_camera+' </blockquote><div class="info"><span>Sent saved '+ data[i].create_date +' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span></div></div><div id="show_comment_sent'+data[i].message_id+'" class="block-comment"></div></li>');
										}
									
									
								}else if((data[i].channel_id == 3)) {
									if(data[i].status_id==1){
										htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i><span class="label label-black" text="draft">Draft</span></div><div class="content" ><blockquote ><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span>  '+icon_camera+' </blockquote><div class="info"><span class="infor_cm" >Draft saved '+ data[i].create_date+' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div id="delete_draft" style="display:none" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div></div><div id="show_comment_draft'+data[i].message_id+'" class="block-comment"></div></li>');
									}
									else if(data[i].status_id==2)
										{
										htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i><span class="label label-green" text="schedule">Schedule</span></div><div class="content" ><blockquote ><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span>  '+icon_camera+' </blockquote><div class="info"><span class="infor_cm" >Schedule saved '+ data[i].create_date+' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div id="delete_draft" style="display:none" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div></div><div id="show_comment_schedule'+data[i].message_id+'" class="block-comment"></div></li>');
										}
									else 
									{
										htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i><span class="label label-blue" text="send">Send</span></div><div class="content" id="'+data[i].message_id+'" ><blockquote ><span id="content_sent">'+replaceURLWithHTMLLinks(data[i].content)+'</span>  '+icon_camera+' </blockquote><div class="info"><span>Sent saved '+ data[i].create_date +' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span></div></div><div id="show_comment_sent'+data[i].message_id+'" class="block-comment"></div></li>');
										}
								}
							
							$("#show_data_all_comment").append(htmlGeneral);
							
							aoFrm.reloadLang("#show_data_all_comment");
						}
						getCommentOfPost(1);
						getCommentOfPost(2);
						getCommentOfPost(3)
						checkEmptyChannelContent("#contents_all_comment");
						_scrollLoad = false;
						$("#contents_all_comment .itemLoading").fadeOut();
				  }
			 });
		}
		function checkImage(){
			 var image= document.getElementById("upload-photo-form-file_schedule").value;
			 if(image!=""){
				 var ext =image.split(".");
					ext=ext[1].toLowerCase();
						 if(ext!="jpg"&& ext!="png"&&ext!="jpeg" && ext!="gif"){
							 aoFrm.mess("alert",mess.image_invalid);
							 return false;
						 }
			if(!$.browser.msie){
	       	 var filename= document.getElementById("upload-photo-form-file_schedule");
	       	 var fileSize = filename.files[0].size;
	       	 if(fileSize>=4096000){
	       		 aoFrm.mess("alert",mess.file_size);
	       		 return false;
	       	 }
	        }
			return true;
		}
			 else
				 {
				 return true;
				 }
		}
		
		function on_load_post_draft( channel_count, type_div,channel_detail_id){
			var message= $("#contentPostOther").val();
			channel_count_draft++;
			if(channel_count_draft==channel_count){
				$("#tree-menu .nav_contents-sent a").click();
				saveMessageToSend(message,channel_detail_id,type_div);
			}
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