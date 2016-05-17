/*******************************************************************************
 * Page Code: contents/draft First Author: Created Date:1
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
 var channel_count_draft=0;
 checkExprired();
 aoFrm.mess("close","close");
 $(document).scroll(function(e) {		
		if(!_scrollLoad) return;
		var aTop = $(document).innerHeight();
		var hW = $(window).height();
		var posLoad = $(document).scrollTop() + hW;
		if(posLoad >=aTop ){
 		var li_id =$("#show_draft li").last().attr("id");
 		if(!isNull(li_id)){
 			var str= li_id.split("_");
			var msg_id= str[0];
			loadMoreDraft(msg_id);
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
			$("#date_value").attr("value",_txtDate)
		}
	});
	$('#timepicker1').timepicker().on('changeTime.timepicker', function(e) {
		
		$(".body-draft .time_txt").html(e.time.value);
	});	

	$("#aoFrm-content-top #contentTop_contentsList").remove();
	$("#contents_draft #contentTop_contentsList").clone().appendTo(
			"#aoFrm-content-top");
	$("#aoFrm-content-top #contentTop_contentsList").removeClass("hide");
	$("#contents_draft #show_draft").append('<li class="itemLoading"></li>');
	var newData = [];
	newData.push({
        name: "status_id", 
        value: 1
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
			 $("#contents_draft #show_draft .itemLoading").remove();
			  var count_draft_df=  $(".nav_contents-draft .amount").html();
				var count_all_df=  $(".nav_contents-all .amount").html();
				 $("#draft_all").html(count_all_df);
				 $("#draft_image_all").attr("title",count_all_df);
				 $("#draft_draft").html(count_draft_df);
				 $("#draft_image_draft").attr("title",count_draft_df);
			 $("#draft_scheduled").html(count_schedule);
			 $("#draft_image_scheduled").attr("title",count_schedule);
			 $("#draft_sent").html(count_send);
			 $("#draft_image_sent").attr("title",count_send);
			  var htmlGeneral;
			 
				for ( var i = 0; i < data.length; i++) {
					 var url_image="";
					  var icon_camera="";
					if(!isNull(data[i].file_name)){
						url_image = data[i].url_image+data[i].file_name;
						icon_camera ='<a  target="_blank" href="'+url_image+'"><span title="Show image" style="cursor:pointer;color:#3B5998;margin-left:3px;"><i class="icon-picture blue channel-icon"></i></span></a>';
						}
						
					if (data[i].channel_id == 1||data[i].channel_id == 2) {
						htmlGeneral = $('<li id="'+data[i].message_id+'_'+data[i].channel_detail_id+'" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i></div><div class="content" id="'+data[i].message_id+'" ><blockquote><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span> '+icon_camera+' </blockquote><div class="info"><span>Draft saved '+ data[i].create_date +' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div  onclick="editdraft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+')" class="edit" data-toggle="modal" data-target="#connect_a_channel_Popup"><i class="icon-edit" title="edit"></i></div><div id="delete_draft" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div>');
						
					}else if((data[i].channel_id == 3)) {
						htmlGeneral = $('<li id="'+data[i].message_id+'_'+data[i].channel_detail_id+'" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i></div><div class="content" id="'+data[i].message_id+'" ><blockquote ><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span>  '+icon_camera+' </blockquote><div class="info"><span>Draft saved '+ data[i].create_date +' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div  onclick="editdraft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+')" class="edit" data-toggle="modal" data-target="#connect_a_channel_Popup"><i class="icon-edit" title="edit"></i></div><div id="delete_draft" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div>');
					}
					
					$("#contents_draft ul.timeline").append(htmlGeneral);
					
				}
				_scrollLoad = true;
				$("#btn_scheduled").click(function(){
					
					if ($("#contents_draft .body-draft").hasClass("open-scheduled")){
						$("#contents_draft .body-draft").removeClass("open-scheduled");
						$("#contents_draft .body-draft").addClass("close-scheduled");
					} else{
						
						$("#contents_draft .body-draft").removeClass("close-scheduled");
						$("#contents_draft .body-draft").addClass("open-scheduled");
					}
					
				});
				$("#btn_discard").click(function(){
					var str=$("textarea").attr("msg_id");
					$("#"+str).fadeOut();
					var strtemp=str.split("_");
					var msg_id=strtemp[0];
					var channel_detail_id=strtemp[1];
					var dataString =[];
			         dataString.push({
			             name: "msg_id", 
			             value: msg_id
			         });
			            
					$.ajax({
						 type:'POST',
						  url : 'DraftAndSchedule.do',
						  dataType: 'json',
						  data: dataString,
						  success : function(source) {
							  aoFrm.mess("mess",mess.message_delete); 
						  }
					
				});
				});
				checkEmptyChannelContent("#contents_draft");
				$("#btn_save_scheduled").click(function(){
					if(!checkImage())
						return false;
					 var list_date= new Array();
					var str=$("textarea").attr("msg_id");
					var strtemp=str.split("_");
					var msg_id=strtemp[0];
					var channel_detail_id=strtemp[1];
					var content= $("#contentPostOther").val();
					var currentdate;
					//var str="Date(s) not chosen";
					var content= $("#contentPostOther").val();
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
						 
						  if(source[0].error=="error"){
							  //alert("You cannot choose a date and time in the past");
							  aoFrm.mess("alert",mess.choose_date_pass);
						  }
						  else
							  {
							  var image= document.getElementById("upload-photo-form-file_draft").value;
								 if(image!=""){
									 var div_iframe_draft="upload_iframe_Schedule";
										var class_draft="nav_contents-scheduled";
										             $('#upload_photo_draft').remove();
												 var iframe='<iframe id="upload_iframe_Schedule" name="upload_iframe_Schedule"  witdh="0px" height="0px" border="0" style="width:0; height:0; border:none;"></iframe>';
													 $("#contents_draft").append(iframe);
														//$("#upload_iframe").attr("id", "upload_photo_draft");
													 	var action_url = 'SavePhoto.do?message_id='+msg_id+"&list_post="+"'"+channel_detail_id+"'";
														var form = document.getElementById("upload-photo-form");
														form.setAttribute('action', action_url);
														form.setAttribute('target', "upload_iframe_Schedule");
														form.submit();
														$("#upload_iframe_Schedule").load(function () {
															on_load_iframe(div_iframe_draft,class_draft);
													            });
										
								 }
								 else
									 {
									 aoFrm.mess("mess",mess.message_save);
									  $("#"+msg_id+"_"+channel_detail_id).remove();
									  $(".modal-header .close").click();
				    				  $("#tree-menu .nav_contents-scheduled a").click();
									 }
							 
							  }
					  }
				
			});

				});
				$("#btn_save_draft").click(function(){
					if(!checkImage())
						return false;
					var str=$("textarea").attr("msg_id");
					var strtemp=str.split("_");
					var msg_id=strtemp[0];
					var channel_detail_id=strtemp[1];
					$("#"+msg_id+"_"+channel_detail_id+ " #content_draft").html("");
					var content= $("#contentPostOther").val();
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
			             value: 1
			         });
			         dataString.push({
			             name: "Action", 
			             value: "draft"
			         });    
					$.ajax({
						 type:'POST',
						  url : 'DraftAndSchedule.do',
						  dataType: 'json',
						  data: dataString,
						  success : function(source) {
							  $("#"+msg_id+"_"+channel_detail_id+ " #content_draft").html(replaceURLWithHTMLLinks(content));
							  var image= document.getElementById("upload-photo-form-file_draft").value;
								 if(image!=""){
											 var iframe='<iframe id="upload_iframe_Draft" name="upload_iframe_Draft" witdh="0px" height="0px" border="0" style="width:0; height:0; border:none;"></iframe>';
												 $("#contents_draft").append(iframe);
													$("#upload_iframe").attr("id", "upload_iframe_Draft");
												 	var action_url = 'SavePhoto.do?message_id='+msg_id+"&list_post="+channel_detail_id;
													var form = document.getElementById("upload-photo-form");
													form.setAttribute('action', action_url);
													form.setAttribute('target', "upload_iframe_Draft");
													form.submit();
								 }
							  aoFrm.mess("mess",mess.message_save); 
					  }
					
				});
			   }); 
		  }
	 });
	

	filterprofile('draft_profile',1);
	filterMember('draft_member_list',1);
	aoFrm.reloadLang("#aoFrm-content-top");
	function postOther(){
		channel_count_draft=0;
		count_channel_post=0;
		count_channel_other=0;
		var type_div="contents_draft";
			var str=$("textarea").attr("msg_id");
			var strtemp=str.split("_");
			var msg_id=strtemp[0];
			var channel_detail_id=strtemp[1];
			var dataString =[];
	         dataString.push({
	             name: "msg_id", 
	             value: msg_id
	         });
	         dataString.push({
	             name: "status_id", 
	             value:3
	         });  
	         dataString.push({
	             name: "Action", 
	             value: "send"
	         });    
			$.ajax({
				 type:'GET',
				  url : 'DraftAndSchedule.do',
				  dataType: 'json',
				  data: dataString,
				  success : function(source) {
					  $("#facebookaccount").empty();
					  $("#"+str).remove();
						 var body= $("#contentPostOther").val();
								 var access_token=source[0].token_user;
								 var pchannel_id=source[0].pchannel_id;
								 var token_twitter= access_token.split("_");
									var channel_type=$("#contentPostOther").attr("chanel-type");
								if(channel_type=="twitter"){
									var url_server=$("#remove_image_draft").attr("href_image");
									var image_server=$("#remove_image_draft").attr("item_image");
									 var image= document.getElementById("upload-photo-form-file_draft").value;
									 if(!isNull(image_server)){
					                   postImageFromServerTwitter(body,access_token,"draft",1);
									 }
									 else if(image!=""){
										 var ext =image.split(".");
											ext=ext[1].toLowerCase();
												 if(ext!="jpg"&& ext!="png"&&ext!="jpeg" && ext!="gif"){
													 aoFrm.mess("alert",mess.image_invalid);
													 return false;
												 }else{
													 if(!$.browser.msie){
												       	 var filename= document.getElementById("upload-photo-form-file_draft");
												       	 var fileSize = filename.files[0].size;
												       	 if(fileSize>=4096000){
												       		 aoFrm.mess("alert",mess.file_size);
												       		 return false;
												       	 }
												        }
													 //var type_div="contents_draft";
													 var iframe='<iframe id="upload_iframe_Twitter" name="upload_iframe_Twitter"  witdh="0px" height="0px" border="0" style="width:0; height:0; border:none;"></iframe>';
														 $("#contents_draft").append(iframe);
															$("#upload_iframe").attr("id", "upload_iframe_Twitter");
														 	var action_url = 'module/view/contents/save_photo.jsp?token='+access_token+'&message='+body;
															var form = document.getElementById("upload-photo-form");
															form.setAttribute('action', action_url);
															form.setAttribute('target', "upload_iframe_Twitter");
															form.submit();
															$("#upload_iframe_Twitter").load(function () {
																on_load_post_draft(1,type_div,channel_detail_id);
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
													  			    	saveMessageToSend(body,channel_detail_id,"contents_draft","draft");
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
																	  success : function(source) {
																		  saveMessageToSend(body,channel_detail_id,"contents_draft","draft");
																		  }
																	  });
															 }
														// saveMessageToSend(body,channel_detail_id,"contents_draft");
														 }
								}
								else{
									var url_server=$("#remove_image_draft").attr("href_image");
									var image_server=$("#remove_image_draft").attr("item_image");
									var image= document.getElementById("upload-photo-form-file_draft").value;
									
									if(!isNull(image_server)){
								    	 $("#message").val(body);
										 if(channel_detail_id==pchannel_id){
											 postImageFromServer(body,channel_detail_id,access_token,"draft",1);
									 	}
										 else
										 {
											 postImagePageFromServer(access_token,body,pchannel_id,channel_detail_id,url_server,1);	
										 }
											
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
												       	 var filename= document.getElementById("upload-photo-form-file_draft");
												       	 var fileSize = filename.files[0].size;
												       	 if(fileSize>=4096000){
												       		 aoFrm.mess("alert",mess.file_size);
												       		 return false;
												       	 }
												        }
													 $("#message").val(body);
													 if(channel_detail_id==pchannel_id){
															var iframe='<iframe id="upload_iframe_'+channel_detail_id+'" name="upload_iframe_'+channel_detail_id+'"  witdh="0px" height="0px" border="0" style="width:0; height:0; border:none;"></iframe>';
															 $("#contents_draft").append(iframe);
																$("#upload_iframe").attr("id", "upload_iframe_"+channel_detail_id);
															 	var action_url = 'https://graph.facebook.com/'+channel_detail_id+'/photos?access_token=' + access_token;
																var form = document.getElementById("upload-photo-form");
																form.setAttribute('action', action_url);
																form.setAttribute('target', "upload_iframe_"+channel_detail_id);
																form.submit();
																$("#upload_iframe_"+channel_detail_id).load(function () {
																	on_load_post_draft(1,type_div,channel_detail_id);
															            });
											 
												 	}
													 else
													 {
														 postImagePageDraft(access_token,pchannel_id,channel_detail_id,'contents_draft',1,type_div);	
													 }
														aoFrm.mess("mess",mess.message_send);
												 }
												 
						 }
						 else{
							 FB.api('/'+channel_detail_id+'/feed', 'post', { message: body,access_token:access_token}, function(response) {
					             if (!response || response.error) {
					                  //alert('Error occured');
					             } else {
					            		aoFrm.mess("mess",mess.message_send);
					            		saveMessageToSend(body,channel_detail_id,"contents_draft","draft");
					            		//saveMessageToSend(body,channel_detail_id,"contents_draft");
					             }
					        });
							 }
								}
								//
								
					}
			
			  });
			
			
			}
	 function postImagePageDraft(token,pchannel_id,page_id_post,div_iframe,channel_count,type_div){
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
							//page_id_post="";
						    form.submit();
						    $("#upload_iframe_"+page_id_post).load(function () {
								on_load_post_draft(1,type_div,page_id_post);
								page_id_post="";
						            });

					 }
				}
		 });
	 }
	function loadMoreDraft(msg_id){
		_scrollLoad = false;
		$("#contents_draft ul.timeline").append('<div class="itemLoading"></div>');
		var newData = [];
		newData.push({
	        name: "status_id", 
	        value: 1
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
							htmlGeneral = $('<li id="'+data[i].message_id+'_'+data[i].channel_detail_id+'" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i></div><div class="content" id="'+data[i].message_id+'" ><blockquote><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span> '+icon_camera+' </blockquote><div class="info"><span>Draft saved '+ data[i].create_date +' by</span> <span class="name"><strong>'+data[i].channel_user+'</strong></span><div  onclick="editdraft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+')" class="edit" data-toggle="modal" data-target="#connect_a_channel_Popup"><i class="icon-edit" title="edit"></i></div><div id="delete_draft" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div>');
							
						}else if((data[i].channel_id == 3)) {
							htmlGeneral = $('<li id="'+data[i].message_id+'_'+data[i].channel_detail_id+'" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i></div><div class="content" id="'+data[i].message_id+'" ><blockquote ><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span>  '+icon_camera+' </blockquote><div class="info"><span>Draft saved '+ data[i].create_date +' by</span> <span class="name"><strong>'+data[i].channel_user+'</strong></span><div  onclick="editdraft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+')" class="edit" data-toggle="modal" data-target="#connect_a_channel_Popup"><i class="icon-edit" title="edit"></i></div><div id="delete_draft" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div>');
						}
						
						$("#contents_draft ul.timeline").append(htmlGeneral);
						
					}
					if(data.length>0){
						_scrollLoad = true;
					}
					
					$("#contents_draft .itemLoading").fadeOut();
					//$("#contents_draft ul.timeline").removeClass('itemLoading');
					
							  }
		 });
	}
	
	function filterByDateDraft(filterdate){
		$("#show_draft").empty();
		$("#contents_draft ul.timeline").append('<div class="itemLoading"></div>');
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
							htmlGeneral = $('<li id="'+data[i].message_id+'_'+data[i].channel_detail_id+'" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i></div><div class="content" id="'+data[i].message_id+'" ><blockquote><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span> '+icon_camera+' </blockquote><div class="info"><span>Draft saved '+ data[i].create_date +' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div  onclick="editdraft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+')" class="edit" data-toggle="modal" data-target="#connect_a_channel_Popup"><i class="icon-edit" title="edit"></i></div><div id="delete_draft" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div>');
							
						}else if((data[i].channel_id == 3)) {
							htmlGeneral = $('<li id="'+data[i].message_id+'_'+data[i].channel_detail_id+'" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i></div><div class="content" id="'+data[i].message_id+'" ><blockquote ><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span>  '+icon_camera+' </blockquote><div class="info"><span>Draft saved '+ data[i].create_date +' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div  onclick="editdraft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+')" class="edit" data-toggle="modal" data-target="#connect_a_channel_Popup"><i class="icon-edit" title="edit"></i></div><div id="delete_draft" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div>');
						}
						
						$("#contents_draft ul.timeline").append(htmlGeneral);
						
					}
				  	checkEmptyChannelContent("#contents_draft");
					_scrollLoad = false;
					$("#contents_draft .itemLoading").fadeOut();
				
					
			  }
		 });
	}
	function checkImage(){
		 var image= document.getElementById("upload-photo-form-file_draft").value;
		 if(image!=""){
			 var ext =image.split(".");
				ext=ext[1].toLowerCase();
					 if(ext!="jpg"&& ext!="png"&&ext!="jpeg" && ext!="gif"){
						 aoFrm.mess("alert",mess.image_invalid);
						 return false;
					 }
		if(!$.browser.msie){
       	 var filename= document.getElementById("upload-photo-form-file_draft");
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
	
	function on_load_post_draft(channel_count, type_div,channel_detail_id){
		var message= $("#contentPostOther").val();
		channel_count_draft++;
		if(channel_count_draft==channel_count){
			saveMessageToSend(message,channel_detail_id,type_div,"draft");
			//$("#tree-menu .nav_contents-sent a").click();
			
		}
	}
	
	
	
	
	
