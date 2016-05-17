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
 		var li_id =$("#contents_sent .timeline li").last().attr("id");
 		if(!isNull(li_id)){
 			var str= li_id.split("_");
			var msg_id= str[0];
			loadMoreSend(msg_id);
			
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
	$("#contents_sent #contentTop_contentsList").clone().appendTo(
			"#aoFrm-content-top");
	$("#aoFrm-content-top #contentTop_contentsList").removeClass("hide");

	 
	
	 $("#contents_sent #show_data_sent").append('<li class="itemLoading"></li>');
	var newData = [];
	newData.push({
        name: "status_id", 
        value: 3
    });
	
	newData.push({
        name: "Action", 
        value: "draft"
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
			  $("#contents_sent #show_data_sent .itemLoading").remove();
			  $("#sent_draft").html(count_draft);
				 $("#sent_image_draft").attr("title",count_draft);
				 $("#sent_scheduled").html(count_schedule);
				 $("#sent_image_scheduled").attr("title",count_schedule);
				 var count_sent_st=  $(".nav_contents-sent .amount").html();
					var count_all_st=  $(".nav_contents-all .amount").html();
				 $("#sent_sent").html(count_sent_st);
				 $("#sent_image_sent").attr("title",count_sent_st);
				 $("#sent_all").html(count_all_st);
				 $("#sent_image_all").attr("title",count_all_st);
				for ( var i = 0; i < data.length; i++) {
					if(!isNull(data[i].file_name)){
						url_image = data[i].url_image+data[i].file_name;
						icon_camera ='<a  target="_blank" href="'+url_image+'"><span title="Show image" style="cursor:pointer;color:#3B5998;margin-left:3px;"><i class="icon-picture blue channel-icon"></i></span></a>';
						}
						
					if (data[i].channel_id == 1||data[i].channel_id == 2) {
						htmlGeneral = $('<li id="'+data[i].message_id+'_'+data[i].channel_detail_id+'" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i></div><div class="content" id="'+data[i].message_id+'" ><blockquote><span id="content_sent">'+replaceURLWithHTMLLinks(data[i].content)+'</span> '+icon_camera+' </blockquote><div class="info"><span>Sent saved '+ data[i].create_date +' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span></div>');
						
					}else if((data[i].channel_id == 3)) {
						htmlGeneral = $('<li id="'+data[i].message_id+'_'+data[i].channel_detail_id+'" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i></div><div class="content" id="'+data[i].message_id+'" ><blockquote ><span id="content_sent">'+replaceURLWithHTMLLinks(data[i].content)+'</span>  '+icon_camera+' </blockquote><div class="info"><span>Sent saved '+ data[i].create_date +' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span></div>');
					}
					
					$("#contents_sent ul.timeline").append(htmlGeneral);
					
				}
				checkEmptyChannelContent("#contents_sent");
				_scrollLoad = true;
		  }
	 });
	

	filterprofile('sent_profile',3);
	filterMember('sent_member_list',3);
	aoFrm.reloadLang("#aoFrm-content-top");
	
	function loadMoreSend(msg_id){
		_scrollLoad = false;
		$("#contents_sent ul.timeline").append('<li class="itemLoading"></li>');
		var newData = [];
		newData.push({
	        name: "status_id", 
	        value: 3
	    });
		newData.push({
	        name: "message_id", 
	        value: msg_id
	    });
		newData.push({
	        name: "Action", 
	        value: "loadMoreDraft"
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
						if(!isNull(data[i].file_name)){
							url_image = data[i].url_image+data[i].file_name;
							icon_camera ='<a  target="_blank" href="'+url_image+'"><span title="Show image" style="cursor:pointer;color:#3B5998;margin-left:3px;"><i class="icon-picture blue channel-icon"></i></span></a>';
							}
							
						if (data[i].channel_id == 1||data[i].channel_id == 2) {
							htmlGeneral = $('<li id="'+data[i].message_id+'_'+data[i].channel_detail_id+'" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i></div><div class="content" id="'+data[i].message_id+'" ><blockquote><span id="content_sent">'+replaceURLWithHTMLLinks(data[i].content)+'</span> '+icon_camera+' </blockquote><div class="info"><span>Sent saved '+ data[i].create_date +' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span></div>');
							
						}else if((data[i].channel_id == 3)) {
							htmlGeneral = $('<li id="'+data[i].message_id+'_'+data[i].channel_detail_id+'" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i></div><div class="content" id="'+data[i].message_id+'" ><blockquote ><span id="content_sent">'+replaceURLWithHTMLLinks(data[i].content)+'</span>  '+icon_camera+' </blockquote><div class="info"><span>Sent saved '+ data[i].create_date +' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span></div>');
						}
						
						$("#contents_sent ul.timeline").append(htmlGeneral);
						
					}
					if(data.length>0){
						_scrollLoad = true;
					}
					$("#contents_sent .itemLoading").fadeOut();
			  }
		 });
	}
	function filterByDateSent(filterdate)
	{
		
		$("#show_data_sent").empty();
		$("#contents_sent ul.timeline").append('<div class="itemLoading"></div>');
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
	        value: "filterbydate"
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
						if(!isNull(data[i].file_name)){
							url_image = data[i].url_image+data[i].file_name;
							icon_camera ='<a  target="_blank" href="'+url_image+'"><span title="Show image" style="cursor:pointer;color:#3B5998;margin-left:3px;"><i class="icon-picture blue channel-icon"></i></span></a>';
							}
							
						if (data[i].channel_id == 1||data[i].channel_id == 2) {
							htmlGeneral = $('<li id="'+data[i].message_id+'_'+data[i].channel_detail_id+'" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i></div><div class="content" id="'+data[i].message_id+'" ><blockquote><span id="content_sent">'+replaceURLWithHTMLLinks(data[i].content)+'</span> '+icon_camera+' </blockquote><div class="info"><span>Sent saved '+ data[i].create_date +' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span></div>');
							
						}else if((data[i].channel_id == 3)) {
							htmlGeneral = $('<li id="'+data[i].message_id+'_'+data[i].channel_detail_id+'" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i></div><div class="content" id="'+data[i].message_id+'" ><blockquote ><span id="content_sent">'+replaceURLWithHTMLLinks(data[i].content)+'</span>  '+icon_camera+' </blockquote><div class="info"><span>Sent saved '+ data[i].create_date +' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span></div>');
						}
						
						$("#contents_sent ul.timeline").append(htmlGeneral);
						
					}
					checkEmptyChannelContent("#contents_sent");
					_scrollLoad = false;
					$("#contents_sent .itemLoading").fadeOut();
			   
			  }
		 });
		 
	}
