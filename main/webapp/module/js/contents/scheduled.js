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
	aoFrm.mess("close","close");
	checkExprired();
	 $(document).scroll(function(e) {		
			if(!_scrollLoad) return;
			var aTop = $(document).innerHeight();
			var hW = $(window).height();
			var posLoad = $(document).scrollTop() + hW;
			if(posLoad >=aTop ){
	 		var li_id =$("#show_schedule li").last().attr("id");
	 		if(!isNull(li_id)){
	 			var str= li_id.split("_");
				var msg_id= str[0];
				loadMoreSchedule(msg_id);
	 		}
				
				
				
			}
		});
	$("#contents_scheduled #datepicker" ).datepick({ dateFormat: 'yy-mm-dd',minDate : 0, onSelect: function(dateText, inst) {	
		var _txtDate =formatDate(dateText);// date_Obj.getUTCFullYear() + "-" + (date_Obj.getUTCMonth() + 1) + "-" + date_Obj.getUTCDate();				
		filterByDateSchedule(_txtDate);
		
		
	}});
	
	$("#datepicker2").datepick({
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
			$("#date_value").html(_txtDate);
			$("#date_value").attr("value",_txtDate)
		}
	});
	
	$('#timepicker1').timepicker().on('changeTime.timepicker', function(e) {
		$(".body-scheduled .time_txt").html(e.time.value);
	});	
	
	$("#aoFrm-content-top #contentTop_contentsList").remove();
	$("#contents_scheduled #contentTop_contentsList").clone().appendTo("#aoFrm-content-top");
	$("#aoFrm-content-top #contentTop_contentsList").removeClass("hide");
	
	 
	var messageid;
	 $("#contents_scheduled #show_schedule").append('<li class="itemLoading"></li>');
	var newData = [];
	newData.push({
        name: "status_id", 
        value: 2
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
			  $("#contents_scheduled #show_schedule .itemLoading").remove();
			  $("#scheduled_draft").html(count_draft);
				 $("#scheduled_image_draft").attr("title",count_draft);
				
				 $("#scheduled_sent").html(count_send);
				 $("#scheduled_image_sent").attr("title",count_send);
				 var count_schedule_sch=  $(".nav_contents-scheduled .amount").html();
				 var count_all_sch=  $(".nav_contents-all .amount").html();	
				 $("#scheduled_scheduled").html(count_schedule_sch);
				$("#scheduled_all").html(count_all_sch);
				$("#scheduled_image_all").attr("title",count_all_sch);
				$("#scheduled_image_scheduled").attr("title",count_schedule_sch);
				for ( var i = 0; i < data.length; i++) {
					 var url_image="";
					  var icon_camera="";
					if(!isNull(data[i].file_name)){
						url_image = data[i].url_image+data[i].file_name;
						icon_camera ='<a  target="_blank" href="'+url_image+'"><span title="Show image" style="cursor:pointer;color:#3B5998;margin-left:3px;"><i class="icon-picture blue channel-icon"></i></span></a>';
							
					}
					if (data[i].channel_id == 1||data[i].channel_id == 2) {
						
						htmlGeneral = $('<li id="'+data[i].message_id+'_'+data[i].channel_detail_id+'" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i></div><div id="'+data[i].message_id+'" class="content"><blockquote><span id="content_schedule">'+replaceURLWithHTMLLinks(data[i].content)+'</span> '+icon_camera+'</blockquote><div class="info"><span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span> <span>'+ data[i].send_date +'</span><div onclick="editscheduled('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+')" class="edit" data-toggle="modal" data-target="#connect_a_channel_Popup_sch"><i class="icon-edit" title="edit"></i></div><div class="delete" onclick="delete_schedule('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" id="delete_schedule"><i class="icon-eraser" title="delete this message"></i></div>  </div>');
						
					}else if((data[i].channel_id == 3)) {
						messageid  = data[i].message_id;
						htmlGeneral = $('<li id="'+data[i].message_id+'_'+data[i].channel_detail_id+'" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i></div><div id="'+data[i].message_id+'" class="content"><blockquote><span id="content_schedule">'+replaceURLWithHTMLLinks(data[i].content)+'</span> '+icon_camera+'</blockquote><div class="info"><span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span> <span>'+ data[i].send_date +'</span><div onclick="editscheduled('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+')" class="edit" data-toggle="modal" data-target="#connect_a_channel_Popup_sch"><i class="icon-edit" title="edit"></i></div><div class="delete" onclick="delete_schedule('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" id="delete_schedule"><i class="icon-eraser" title="delete this message"></i></div>  </div>');
					}
					$("#contents_scheduled ul.timeline").append(htmlGeneral);
				}
				checkEmptyChannelContent("#contents_scheduled");
				_scrollLoad = true;
				$("#btn_save_draft").click(function(){
					 var content=$("#contentPostSchedule").val();
						if(aoFrm.validation())
						{
							//for(var i=0; i<list_post.length;i++){
								var dataString =[];
						         dataString.push({
						             name: "list_channel_detail_id", 
						             value: "'"+list_post+"'"
						         });
						         dataString.push({
						             name: "content", 
						             value: content
						         });
						         dataString.push({
						             name: "status_id", 
						             value: 1
						         });
						         dataString.push({
						             name: "Action", 
						             value: "savedraftschedule"
						         });    
								$.ajax({
									 type:'POST',
									  url : 'Create.do',
									  dataType: 'json',
									  data: dataString,
									  success : function(source) {
								      aoFrm.mess("mess",mess.message_save); 
                                    var image= document.getElementById("upload-photo-form-file_schedule").value;
										 if(image!=""){
											 var div_iframe_draft="upload_iframe_Draft";
												var class_draft="nav_contents-draft";
												             $('#upload_iframe_Draft').remove();
													 var iframe='<iframe id="upload_iframe_Draft" name="upload_iframe_Draft"  witdh="0px" height="0px" border="0" style="width:0; height:0; border:none;"></iframe>';
														 $("#contents_scheduled").append(iframe);
															$("#upload_iframe").attr("id", "upload_iframe_Draft");
														 	var action_url = 'SavePhoto.do?message_id='+source+"&list_post="+list_post;
															var form = document.getElementById("upload-photo-form");
															form.setAttribute('action', action_url);
															form.setAttribute('target', "upload_iframe_Draft");
															form.submit();
															 $("#upload_iframe_Draft").load(function () {
																 on_load_iframe(div_iframe_draft,class_draft);
																	
															            });
										 }
										 else
											 {
											 $("#tree-menu .nav_contents-draft a").click();
											 }
										  
								  }
								
							});
								
							//}
						}
				});
				$("#btn_save_scheduled").click(function(){
					var list_date=new Array();
					var str=$("textarea").attr("msg_id");
					var strtemp=str.split("_");
					var msg_id=strtemp[0];
					var channel_detail_id=strtemp[1];
				
					var currentdate;
					//var str="Date(s) not chosen";
					var content= $("#contentPostSchedule").val();
					var list_date = getDateSchedule("timepicker1", "date_value");
				var dataString =[];
		         dataString.push({
		             name: "msg_id", 
		             value: msg_id
		         });
		         dataString.push({
		             name: "content", 
		             value: content
		         });
		         dataString.push({
		             name: "status_id", 
		             value: 2
		         });
		         dataString.push({
		             name: "send_date", 
		             value: "'"+list_date+"'"
		         });  
		         dataString.push({
		             name: "Action", 
		             value: "schedule"
		         });    
				$.ajax({
					 type:'POST',
					  url : 'DraftAndSchedule.do',
					  dataType: 'json',
					  data: dataString,
					  success : function(source) {
						  $("#"+msg_id+"_"+channel_detail_id+ " #content_schedule").html(replaceURLWithHTMLLinks(content));
						  if(source[0].error=="error"){
							  aoFrm.mess("alert",mess.choose_date_pass);
							  //alert("You cannot choose a date and time in the past");
							  $("#btn_save_scheduled").attr("data-toggle","");
							  $("#btn_save_scheduled").attr("data-dismiss","modal");
						  }
						  else
							  {
							  var image= document.getElementById("upload-photo-form-file_schedule").value;
								 if(image!=""){
									 var div_iframe_draft="upload_iframe_Schedule";
										var class_draft="nav_contents-scheduled";
										             $('#upload_iframe_Schedule').remove();
												     var iframe='<iframe id="upload_iframe_Schedule" name="upload_iframe_Schedule"  witdh="0px" height="0px" border="0" style="width:0; height:0; border:none;"></iframe>';
													 $("#contents_scheduled").append(iframe);
														$("#upload_iframe").attr("id", "upload_iframe_Schedule");
													 	var action_url = 'SavePhoto.do?message_id='+msg_id+"&list_post="+"'"+channel_detail_id+"'";
														var form = document.getElementById("upload-photo-form");
														form.setAttribute('action', action_url);
														form.setAttribute('target', "upload_iframe_Schedule");
														form.submit();
														 $("#"+div_iframe_draft).load(function () {
															 on_load_iframe(div_iframe_draft,class_draft);
																
														            });
										
								 }
								 else
									 {
									  aoFrm.mess("mess",mess.message_save);
									  $(".modal-header .close").click();
									  $("#tree-menu .nav_contents-scheduled a").click();
									 }
							
							  
							  }
					  }
				
			});

				});
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
	
	filterprofile('schedule_profile',"2"); 
	filterMember('scheduled_member_list',2);
	aoFrm.reloadLang("#aoFrm-content-top"); 
	function addpost(id,name,type){
		
		$("#btnchoise_"+id).remove();
		var str_temp= $("#contentPostSchedule").attr("msg_id");
		var str= str_temp.split("_");
		var msg_id=str[0];
		if(type=="twitter"){
			var html='<button class="btn btn-small btn-lightblue" id="btnchoise_'+id+'" channel-type="twitter" onclick="delete_choise('+"'"+id+"'"+')" type="button"><i class="icon-twitter-sign" ></i><span class="nickname" title="'+name+'">'+limitString(name)+'</span><i class="icon-remove-sign btn_delete"></i></button>';
			$("#account_choice_post").append(html);
		}
		else
			{
			var html='<button class="btn btn-small btn-lightblue" id="btnchoise_'+id+'" channel-type="facebook" onclick="delete_choise('+"'"+id+"'"+')" type="button"><i class="icon-facebook-sign" ></i><span class="nickname" title="'+name+'">'+limitString(name)+'</span><i class="icon-remove-sign btn_delete"></i></button>';
			$("#account_choice_post").append(html);
			}
		
		$("#btnchoise_"+id).attr("pchannel_id",id);
		list_post.push(id);
		//var paras= {message_id:msg_schedule_id,channel_detail_id:id};
		var dataString=[];
		dataString.push({
            name: "message_id", 
            value: msg_id
        });
		dataString.push({
            name: "channel_detail_id", 
            value: id
        });
        dataString.push({
            name: "Action", 
            value: "saveMessageDetail"
        });
		$.ajax({
			 type:'POST',
			  url : 'Message.do',
			  dataType: 'json',
			  data: dataString,
			  success : function(source) {
				  //aoFrm.mess("mess","Message has been save"); 
			  }
		
	});
		
	}
	function delete_choise(id){
		$("#btnchoise_"+id).remove();

		var str_temp= $("#contentPostSchedule").attr("msg_id");
		var str= str_temp.split("_");
		var msg_id=str[0];
		list_post = list_post.filter(function(v) { return v != id;});
		//var paras={message_id:msg_schedule_id,channel_detail_id:id};
		var dataString=[];
		dataString.push({
            name: "message_id", 
            value: msg_id
        });
		dataString.push({
            name: "channel_detail_id", 
            value: id
        });
        dataString.push({
            name: "Action", 
            value: "deleteMessageDetail"
        });
		$.ajax({
			 type:'POST',
			  url : 'Message.do',
			  dataType: 'json',
			  data: dataString,
			  success : function(source) {
				  //aoFrm.mess("mess","Message has been save"); 
			  }
		
	});
		 
	}

	function postSchedule(){
			$("#facebookaccount").empty();
			var type_div="contents_scheduled";
			var source=list_post;
			count_channel_other=0;
			 var body= $("#contentPostSchedule").val();
			for(var i=0; i<source.length;i++){
				var channel_type=$("#btnchoise_"+source[i]).attr("channel-type");
				
						 var access_token=token_array[i];
						 var token_twitter= access_token.split("_");
						 if(channel_type=="twitter"){
							 var url_server=$("#remove_image_schedule").attr("href_image");
								var image_server=$("#remove_image_schedule").attr("item_image");
								 var image= document.getElementById("upload-photo-form-file_schedule").value;
								 if(!isNull(image_server)){
				                   postImageFromServerTwitter(body,access_token,"schedule",source.length);
								 }
								 else if(image!=""){
								 var ext =image.split(".");
									ext=ext[1].toLowerCase();
										 if(ext!="jpg"&& ext!="png"&&ext!="jpeg" && ext!="gif"){
											// alert("Upload invalid image");
											 aoFrm.mess("alert",mess.image_invalid);
											 return false;
										 }else{
											 if(!$.browser.msie){
				                            	 var filename= document.getElementById("upload-photo-form-file_schedule");
				                            	 var fileSize = filename.files[0].size;
				                            	 if(fileSize>=4096000){
				                            		 aoFrm.mess("alert",mess.file_size);
				                            	 return false;
				                            	 }
				                             }
											 var iframe='<iframe id="upload_iframe_Twitter" name="upload_iframe_Twitter"  witdh="0px" height="0px" border="0" style="width:0; height:0; border:none;"></iframe>';
												 $("#contents_scheduled").append(iframe);
													$("#upload_iframe").attr("id", "upload_iframe_Twitter");
												 	var action_url = 'module/view/contents/save_photo.jsp?token='+access_token+'&message='+body;
													var form = document.getElementById("upload-photo-form");
													form.setAttribute('action', action_url);
													form.setAttribute('target', "upload_iframe_Twitter");
													form.submit();
													 $("#upload_iframe_Twitter").load(function () {
														 on_load_post_schedule(source.length,source,type_div);
															
													            });
											   }
											 }else
												 {
												 if(!$.browser.msie){
													 cb.setToken(token_twitter[0],token_twitter[1]);
													  cb.__call(
											  			    "statuses_update",
											  			    {"status": body},
											  			    function (reply) {
											  			    	saveMessageToSend(body,source,"contents_scheduled","schedule");
											  			    }
											  			); 
												 }
												 else
													 {
													 var dataString=[];
													 dataString.push({
												        name: "token", 
												        value: token_twitter[0]
												    });
													 dataString.push({
													        name: "token_secret", 
													        value: token_twitter[1]
													    });
													 dataString.push({
													        name: "message", 
													        value: body
													    });
													 dataString.push({
													        name: "Action", 
													        value: "posttw"
													    });
														$.ajax({
															  url : 'Twitter.do',
															  dataType: 'json',
															  data:dataString,
															  success : function(response) {
																  saveMessageToSend(body,source,"contents_scheduled","schedule");
																  }
															  });
													 }
												 
												 }
						}
						 else
							 {
							 var url_server=$("#remove_image_schedule").attr("href_image");
								var image_server=$("#remove_image_schedule").attr("item_image");
								var image= document.getElementById("upload-photo-form-file_schedule").value;
							if(!isNull(image_server)){
									var pchannel_id = $("#btnchoise_"+source[i]).attr("pchannel_id");
							    	 $("#message").val(body);
									 if(source[i]==pchannel_id){
										 postImageFromServer(body,source[i],access_token,"schedule",source.length);
								 	}
									 else
									 {
										 postImagePageFromServer(access_token,body,pchannel_id,source[i],url_server,source.length);	
									 }
										//aoFrm.mess("mess","Message has been send");
								}
								else if(image!=""){
								 var ext =image.split(".");
									ext=ext[1].toLowerCase();
										 if(ext!="jpg"&& ext!="png"&&ext!="jpeg" && ext!="gif"){
                                          aoFrm.mess("alert",mess.image_invalid);
											 return false;
										 }
										 else{
											 if(!$.browser.msie){
				                            	 var filename= document.getElementById("upload-photo-form-file_schedule");
				                            	 var fileSize = filename.files[0].size;
				                            	 if(fileSize>=4096000){
				                            		 aoFrm.mess("alert",mess.file_size);
				                            	 return false;
				                            	 }
				                             }
											 $("#message").val(body);
											  	var token_page;
												var pchannel_id = $("#btnchoise_"+source[i]).attr("pchannel_id");
													if(source[i]==pchannel_id){
													var iframe='<iframe id="upload_iframe_'+pchannel_id+'" name="upload_iframe_'+pchannel_id+'"  witdh="0px" height="0px" border="0" style="width:0; height:0; border:none;"></iframe>';
													 $("#contents_scheduled").append(iframe);
														$("#upload_iframe").attr("id", "upload_iframe_"+pchannel_id);
													 	var action_url = 'https://graph.facebook.com/'+pchannel_id+'/photos?access_token=' + access_token;
														var form = document.getElementById("upload-photo-form");
														form.setAttribute('action', action_url);
														form.setAttribute('target', "upload_iframe_"+pchannel_id);
														form.submit();
														$("#upload_iframe_"+pchannel_id).load(function () {
															 on_load_post_schedule(source.length,source,type_div);
																
														            });
												}
												else{
													var page_id_post= source[i];
													postImagePageSchedule(access_token,pchannel_id,page_id_post,source.length,'contents_scheduled',source);												
														
												}
													 aoFrm.mess("mess",mess.message_send); 
										 	}
				 }
				 else{ 
					 FB.api('/'+source[i]+'/feed', 'post', { message: body,access_token:access_token}, function(response) {
			             if (!response || response.error) {
			                  //alert('Error occured');
			             } else {
			            	  aoFrm.mess("mess",mess.message_send); 
			            	  saveMessageToSend(body,source,"contents_scheduled","schedule");
			             }
			        });
					 }
							 }
						

						
			}
				
			
		  
	
	}
	function loadMoreSchedule(msg_id){
		_scrollLoad = false;
		$("#contents_schedule ul.timeline").append('<li class="itemLoading"></li>');
		var newData = [];
		newData.push({
	        name: "status_id", 
	        value: 2
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
				 
					for ( var i = 0; i < data.length; i++) {
						 var url_image="";
						  var icon_camera="";
						if(!isNull(data[i].file_name)){
							url_image = data[i].url_image+data[i].file_name;
							icon_camera ='<a  target="_blank" href="'+url_image+'"><span title="Show image" style="cursor:pointer;color:#3B5998;margin-left:3px;"><i class="icon-picture blue channel-icon"></i></span></a>';
								
						}
						if (data[i].channel_id == 1||data[i].channel_id == 2) {
							
							htmlGeneral = $('<li id="'+data[i].message_id+'_'+data[i].channel_detail_id+'" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i></div><div id="'+data[i].message_id+'" class="content"><blockquote><span id="content_schedule">'+replaceURLWithHTMLLinks(data[i].content)+'</span> '+icon_camera+'</blockquote><div class="info"><span class="name"><strong>'+data[i].channel_user+'</strong></span> <span>'+ data[i].send_date +'</span><div onclick="editscheduled('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+')" class="edit" data-toggle="modal" data-target="#connect_a_channel_Popup"><i class="icon-edit" title="edit"></i></div><div class="delete" onclick="delete_schedule('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" id="delete_schedule"><i class="icon-eraser" title="delete this message"></i></div>  </div>');
							
						}else if((data[i].channel_id == 3)) {
							messageid  = data[i].message_id;
							htmlGeneral = $('<li id="'+data[i].message_id+'_'+data[i].channel_detail_id+'" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i></div><div id="'+data[i].message_id+'" class="content"><blockquote><span id="content_schedule">'+replaceURLWithHTMLLinks(data[i].content)+'</span> '+icon_camera+'</blockquote><div class="info"><span class="name"><strong>'+data[i].channel_user+'</strong></span> <span>'+ data[i].send_date +'</span><div onclick="editscheduled('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+')" class="edit" data-toggle="modal" data-target="#connect_a_channel_Popup"><i class="icon-edit" title="edit"></i></div><div class="delete" onclick="delete_schedule('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" id="delete_schedule"><i class="icon-eraser" title="delete this message"></i></div>  </div>');
						}
						$("#contents_scheduled ul.timeline").append(htmlGeneral);
					}
					if(data.length>0){
						_scrollLoad = true;
					}
					
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
		
		$("#show_schedule").empty();
		$("#contents_scheduled ul.timeline").append('<div class="itemLoading"></div>');
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
	        value: "filterbydate"
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
						if(!isNull(data[i].file_name)){
							url_image = data[i].url_image+data[i].file_name;
							icon_camera ='<a  target="_blank" href="'+url_image+'"><span title="Show image" style="cursor:pointer;color:#3B5998;margin-left:3px;"><i class="icon-picture blue channel-icon"></i></span></a>';
								
						}
						if (data[i].channel_id == 1||data[i].channel_id == 2) {
							
							htmlGeneral = $('<li id="'+data[i].message_id+'_'+data[i].channel_detail_id+'" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i></div><div id="'+data[i].message_id+'" class="content"><blockquote><span id="content_schedule">'+replaceURLWithHTMLLinks(data[i].content)+'</span> '+icon_camera+'</blockquote><div class="info"><span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span> <span>'+ data[i].send_date +'</span><div onclick="editscheduled('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+')" class="edit" data-toggle="modal" data-target="#connect_a_channel_Popup_sch"><i class="icon-edit" title="edit"></i></div><div class="delete" onclick="delete_schedule('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" id="delete_schedule"><i class="icon-eraser" title="delete this message"></i></div>  </div>');
							
						}else if((data[i].channel_id == 3)) {
							messageid  = data[i].message_id;
							htmlGeneral = $('<li id="'+data[i].message_id+'_'+data[i].channel_detail_id+'" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i></div><div id="'+data[i].message_id+'" class="content"><blockquote><span id="content_schedule">'+replaceURLWithHTMLLinks(data[i].content)+'</span> '+icon_camera+'</blockquote><div class="info"><span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span> <span>'+ data[i].send_date +'</span><div onclick="editscheduled('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+')" class="edit" data-toggle="modal" data-target="#connect_a_channel_Popup_sch"><i class="icon-edit" title="edit"></i></div><div class="delete" onclick="delete_schedule('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" id="delete_schedule"><i class="icon-eraser" title="delete this message"></i></div>  </div>');
						}
						$("#contents_scheduled ul.timeline").append(htmlGeneral);
					}
					checkEmptyChannelContent("#contents_scheduled");
					_scrollLoad = false;
					$("#contents_scheduled .itemLoading").fadeOut();
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
	 function postImagePageSchedule(token,pchannel_id,page_id_post,channel_count,div_iframe,source){
		 FB.api('/'+pchannel_id+'/accounts',{access_token:token}, function(response) {
			 var datasource=response.data;
			 for(var j=0; j<datasource.length;j++){
					 if(datasource[j].id==page_id_post){
						 var iframe='<iframe id="upload_iframe_'+page_id_post+'" name="upload_iframe_'+page_id_post+'"  witdh="0px" height="0px" border="0" style="width:0; height:0; border:none;"></iframe>';
							 $("#"+div_iframe).append(iframe);
							 $("#upload_iframe").attr("id", "upload_iframe_"+page_id_post);
						 var token_page = datasource[j].access_token;
						 var action_url = 'https://graph.facebook.com/'+page_id_post+'/photos?access_token=' + token_page;
						 var form = document.getElementById('upload-photo-form');
							form.setAttribute('action', action_url);
							form.setAttribute('target', "upload_iframe_"+page_id_post);
							
						    form.submit();
						    $("#upload_iframe_"+page_id_post).load(function () {
								 on_load_post_schedule(channel_count,source,div_iframe);
								 page_id_post="";
									
							            });

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
	
	
