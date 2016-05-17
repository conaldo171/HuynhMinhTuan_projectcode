/*******************************************************************************
 * Page Code: contents/sent First Author: Created Date:
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
 var _scrollLoad = false; 
 aoFrm.mess("close","close");
 checkExprired();
 $(document).scroll(function(e) {		
		if(!_scrollLoad) return;
		var aTop = $(document).innerHeight();
		var hW = $(window).height();
		var posLoad = $(document).scrollTop() + hW;
		if(posLoad >=aTop ){
			var time_post =$("#show_data_sent li").last().attr("time_post");
			
 		if(!isNull(time_post)){
 			
			loadMoreSend(time_post);
			
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
				filterByDateSent(_txtDate);
		}
	});
	$("#datepicker2").datepick({
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
			$("#date_value").html(_txtDate);
		}
	});
	$('#timepicker1').timepicker().on('changeTime.timepicker', function(e) {
		
		$(".body-sent .time_txt").html(e.time.value);
	});	

	$("#aoFrm-content-top #contentTop_contentsList").remove();
	$("#contents_sent_comment #contentTop_contentsList").clone().appendTo(
			"#aoFrm-content-top");
	$("#aoFrm-content-top #contentTop_contentsList").removeClass("hide");

	 
	
	 $("#contents_sent_comment #show_data_sent").append('<li class="itemLoading"></li>');
	var newData = [];
	newData.push({
        name: "status_id", 
        value: 3
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
			  var url_image="";
			  var icon_camera="";
			  $("#contents_sent_comment #show_data_sent .itemLoading").remove();
			 // $("#sent_draft").html(count_draft);
				// $("#sent_image_draft").attr("title",count_draft);
				// $("#sent_scheduled").html(count_schedule);
				// $("#sent_image_scheduled").attr("title",count_schedule);
				// var count_sent_st=  $(".nav_contents-sent .amount").html();
					//var count_all_st=  $(".nav_contents-all .amount").html();
				// $("#sent_sent").html(count_sent_st);
				// $("#sent_image_sent").attr("title",count_sent_st);
				// $("#sent_all").html(count_all_st);
				// $("#sent_image_all").attr("title",count_all_st);
				for ( var i = 0; i < data.length; i++) {
					
						
					if (data[i].channel_id == 2) {
						htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i></div><div class="content" id="'+data[i].message_id+'" ><blockquote><span id="content_sent">'+replaceURLWithHTMLLinks(data[i].content)+'</span> '+icon_camera+' </blockquote><div class="info"><span>Sent saved '+ data[i].create_date +' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span></div></div><div id="show_comment_sent'+data[i].message_id+'" class="block-comment"></div></li>');
						
					}else if((data[i].channel_id == 3)) {
						htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i></div><div class="content" id="'+data[i].message_id+'" ><blockquote ><span id="content_sent">'+replaceURLWithHTMLLinks(data[i].content)+'</span>  '+icon_camera+' </blockquote><div class="info"><span>Sent saved '+ data[i].create_date +' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span></div></div><div id="show_comment_sent'+data[i].message_id+'" class="block-comment"></div></li>');
					}
					
					$("#contents_sent_comment ul.timeline").append(htmlGeneral);
					
				}
				getCommentOfPost(3);
				checkEmptyChannelContent("#contents_sent_comment");
				_scrollLoad = true;
		  }
	 });
	

	filterprofile_comment('sent_profile',3);
	filterMemberComment('sent_member_list',3);
	aoFrm.reloadLang("#aoFrm-content-top");
	
	function loadMoreSend(time_post){
		_scrollLoad = false;
		$("#contents_sent_comment ul.timeline").append('<li class="itemLoading"></li>');
		var newData = [];
		newData.push({
	        name: "status_id", 
	        value: 3
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
							htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i></div><div class="content"  ><blockquote><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span> '+icon_camera+' </blockquote><div class="info"><span class="infor_cm">Draft saved '+ data[i].create_date +' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div id="delete_draft" style="display:none" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div></div><div id="show_comment_sent'+data[i].message_id+'" class="block-comment"></div></li>');
							
						}else if((data[i].channel_id == 3)) {
							htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i></div><div class="content" ><blockquote ><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span>  '+icon_camera+' </blockquote><div class="info"><span class="infor_cm" >Draft saved '+ data[i].create_date+' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div id="delete_draft" style="display:none" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div></div><div id="show_comment_sent'+data[i].message_id+'" class="block-comment"></div></li>');
						}
						
						$("#contents_sent_comment ul.timeline").append(htmlGeneral);
						
					}
					getCommentOfPost(3);
					if(data.length>0){
						_scrollLoad = true;
					}
					$("#contents_sent_comment .itemLoading").fadeOut();
			  }
		 });
	}
	function filterByDateSent(filterdate)
	{
		
		$("#show_data_sent").empty();
		$("#contents_sent_comment ul.timeline").append('<div class="itemLoading"></div>');
		var newData = [];
		newData.push({
	        name: "filterDate", 
	        value: filterdate
	    });
		newData.push({
	        name: "status_id", 
	        value: 3
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
				  var url_image="";
				  var icon_camera="";
					for ( var i = 0; i < data.length; i++) {
						if (data[i].channel_id == 2) {
							htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i></div><div class="content"  ><blockquote><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span> '+icon_camera+' </blockquote><div class="info"><span class="infor_cm">Draft saved '+ data[i].create_date +' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div id="delete_draft" style="display:none" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div></div><div id="show_comment_sent'+data[i].message_id+'" class="block-comment"></div></li>');
							
						}else if((data[i].channel_id == 3)) {
							htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i></div><div class="content" ><blockquote ><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span>  '+icon_camera+' </blockquote><div class="info"><span class="infor_cm" >Draft saved '+ data[i].create_date+' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div id="delete_draft" style="display:none" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div></div><div id="show_comment_sent'+data[i].message_id+'" class="block-comment"></div></li>');
						}
						
						$("#contents_sent_comment ul.timeline").append(htmlGeneral);
						
					}
					getCommentOfPost(3);
					checkEmptyChannelContent("#contents_sent_comment");
					_scrollLoad = false;
					$("#contents_sent_comment .itemLoading").fadeOut();
			   
			  }
		 });
		 
	}
