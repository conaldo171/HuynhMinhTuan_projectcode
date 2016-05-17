/***************************************************************************
 Page Code:	contents/create

 First Author:
 Created Date: 
 **************************************************************************/
var list_post=new Array();
var obj_content_public = new Object();
var array_content_public=new Array();
$( document ).ready(function() {
	checkExprired();
	aoFrm.mess("close","close");
	getChannelDetail();
	 var paras;
	 var currentdatetime = new Date();
	 var date=currentdatetime.getFullYear()+"-"+currentdatetime.getMonth()+"-"+currentdatetime.getDate();
	 var time = "";
	 if (currentdatetime.getHours() > 12){
		 time = (currentdatetime.getHours() - 12)+":"+currentdatetime.getMinutes() + " PM";
	 }else{
		 time = currentdatetime.getHours()+":"+currentdatetime.getMinutes() + " AM";
	 }
	 $("#timepicker1").attr("value",time);
	 $("#time_send").text($("#timepicker1").val());
		$("#btn_save_draft").click(function(e) {  
			 var content=$("#contentpost").val();
			 var type= $("#btn_save_draft").attr("excel");
			 if(type=="excel"){
				 var send_date = new Date();
				 var parent = ".createForm";
				 $("#form_content").parsley('validate');
				 if (!$("#form_content").parsley('isValid')) {
						$(parent + " .parsley-error-list").hide();
						$(parent + " .alert-error").removeClass("hide");
						$(parent + " .alert-success").addClass("hide");
						//return false;
					}
				 var iframe='<iframe id="upload_iframe_upload_Excel_Draft" name="upload_iframe_upload_Excel_Draft"  witdh="0px" height="0px" border="0" style="width:0; height:0; border:none;"></iframe>';
					 
				 $("#contents_create").append(iframe);
					//$("#upload_iframe").attr("id", "upload_iframe_Sent");
				 	var action_url = "UploadExcelFile.do?Action=draft&status=1&create_date="+formatDateTimeCurrent();
					var form = document.getElementById("upload-excel-form");
					form.setAttribute('action', action_url);
					form.setAttribute('target', "upload_iframe_upload_Excel_Draft");
					form.submit();
					$("#upload_iframe_upload_Excel_Draft").load(function () {
						load_iframe_upload_excel("upload_iframe_upload_Excel_Draft","nav_contents-draft");
				    	
				           });
				// $("#upload-excel-form").submit();
			 }
			 else
				 {
				 var parent = ".createForm";
				 $("#form_content").parsley('validate');
				 if (!$("#form_content").parsley('isValid')) {
						
						$(parent + " .alert-error").removeClass("hide");
						$(parent + " .alert-success").addClass("hide");
						return false;
					}
					
					if(list_post.length==0){
					 aoFrm.mess("alert",mess.add_channel);
						return false;
				}
					 var image= document.getElementById("upload-photo-form-file_create").value;
					 if(image!=""){
						 var ext =image.split(".");
							ext=ext[1].toLowerCase();
								 if(ext!="jpg"&& ext!="png"&&ext!="jpeg" && ext!="gif"){
									// alert("Upload invalid image");
									 aoFrm.mess("alert",mess.image_invalid);
									 return false;
								 }
								 else
									 {
									
		                             if(!$.browser.msie){
		                            	 var filename= document.getElementById("upload-photo-form-file_create");
		                            	 var fileSize = filename.files[0].size;
		                            	 if(fileSize>=4096000){
		                            		 aoFrm.mess("alert",mess.file_size);
		                            		 //alert("File size limit 4mb");
		                            		 return false;
		                            	 }
		                             }
									 }
								 }
					
						var dataString =[];
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
				             value: "savedraft"
				         });    
						$.ajax({
							 type:'POST',
							  url : 'Create.do',
							  dataType: 'json',
							  data: dataString,
							  success : function(source) {
								  var image= document.getElementById("upload-photo-form-file_create").value;
								  var count_draft=  $(".nav_contents-draft .amount").html();
								var count_all=  $(".nav_contents-all .amount").html();
								$(".nav_contents-draft .amount").html(parseInt(count_draft)+list_post.length);
								$(".nav_contents-all .amount").html(parseInt(count_all)+list_post.length);	
								if(image!=""){
									var div_iframe_draft="upload_iframe_Draft";
									var class_draft="nav_contents-draft";
									             $('#upload_iframe_Draft').remove();
												 var iframe='<iframe id="upload_iframe_Draft" name="upload_iframe_Draft"  witdh="0px" height="0px" border="0" style="width:0; height:0; border:none;"></iframe>';
													 $("#contents_create").append(iframe);
													 	var action_url = 'SavePhoto.do?Action=draft&message_id='+source+"&list_post="+"'"+list_post+"'";
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
										    aoFrm.mess("mess",mess.message_save); 
										    $("#tree-menu .nav_contents-draft a").click();
										 }

						  }
						
					});
				 }

	    });
		$("#btn_scheduled").click(function(e) { 
			
			 var content=$("#contentpost").val();
			 var content=$("#contentpost").val();
			 var parent = ".createForm";
			 var type= $("#btn_scheduled").attr("excel");
			 if(type=="excel"){
				 var list_date= new Array();
				 var send_date = new Date();
				// var parent = ".createForm";
				 $("#form_content").parsley('validate');
				 if (!$("#form_content").parsley('isValid')) {
						$(parent + " .parsley-error-list").hide();
						$(parent + " .alert-error").removeClass("hide");
						$(parent + " .alert-success").addClass("hide");
						//return false;
					}
				 var list_date = getDateSchedule("timepicker1", "date_value");
				 var iframe='<iframe id="upload_iframe_upload_Excel_Schedule" name="upload_iframe_upload_Excel_Schedule"  witdh="0px" height="0px" border="0" style="width:0; height:0; border:none;"></iframe>';
					 
				 $("#contents_create").append(iframe);
					//$("#upload_iframe").attr("id", "upload_iframe_Sent");
				 	var action_url = "UploadExcelFile.do?Action=schedule&status=2&create_date="+"'"+list_date+"'";
					var form = document.getElementById("upload-excel-form");
					form.setAttribute('action', action_url);
					form.setAttribute('target', "upload_iframe_upload_Excel_Schedule");
					form.submit();
					$("#upload_iframe_upload_Excel_Draft").load(function () {
						load_iframe_upload_excel("upload_iframe_upload_Excel_Schedule","nav_contents-scheduled");
						
				           });
				// $("#upload-excel-form").submit();
			 }
			 else
				 {
				 var list_date= new Array();
				 $("#form_content").parsley('validate');
				 if (!$("#form_content").parsley('isValid')) {
						
						$(parent + " .alert-error").removeClass("hide");
						$(parent + " .alert-success").addClass("hide");
						return false;
					}
					
					if(list_post.length==0){
					 aoFrm.mess("alert",mess.add_channel);
						return false;
				}
					
					if(list_post.length==0){
						 aoFrm.mess("alert",mess.add_channel);
							return false;
					}
					 var image= document.getElementById("upload-photo-form-file_create").value;
					 if(image!=""){
						 var ext =image.split(".");
							ext=ext[1].toLowerCase();
								 if(ext!="jpg"&& ext!="png"&&ext!="jpeg" && ext!="gif"){
									 aoFrm.mess("alert",mess.image_invalid);
									 return false;
								 }
								 else
									 {
		                            if(!$.browser.msie){
		                            	 var filename= document.getElementById("upload-photo-form-file_create");
		                            	 var fileSize = filename.files[0].size;
		                            	 if(fileSize>=4096000){
		                            		 aoFrm.mess("alert",mess.file_size);
		                            	 return false;
		                            	 }
		                             }
									 }
								 }
				
				 var list_date = getDateSchedule("timepicker1", "date_value");
				// var send_date=currentdate;
						var dataString =[];
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
				             value: "saveschedule"
				         });    
						$.ajax({
							 type:'POST',
							  url : 'Create.do',
							  dataType: 'json',
							  data: dataString,
							  success : function(source) {
								  if(source=="0"){
									  aoFrm.mess("alert",mess.choose_date_pass);
					    			 }
					    			 else
					    				 {
					    				 var count_schedule=  $(".nav_contents-scheduled .amount").html();
					    				 var count_all=  $(".nav_contents-all .amount").html();	
					    				 $(".nav_contents-scheduled .amount").html(parseInt(count_schedule)+list_post.length);
											$(".nav_contents-all .amount").html(parseInt(count_all)+list_post.length);
											var image= document.getElementById("upload-photo-form-file_create").value;
										 if(image!=""){
											 var div_iframe_schedule="upload_iframe_Schedule";
												var class_schedule="nav_contents-scheduled";
											 $('#upload_iframe_Schedule').remove();
														 var iframe='<iframe id="upload_iframe_Schedule" name="upload_iframe_Schedule"  witdh="0px" height="0px" border="0" style="width:0; height:0; border:none;"></iframe>';
															 $("#contents_create").append(iframe);
																$("#upload_iframe").attr("id", "upload_iframe_Schedule");
															 	var action_url = 'SavePhoto.do?Action=schedule&message_id='+source+"&list_post="+"'"+list_post+"'";
																var form = document.getElementById("upload-photo-form");
																form.setAttribute('action', action_url);
																form.setAttribute('target', "upload_iframe_Schedule");
																form.submit();
																$("#upload_iframe_Schedule").load(function () {
																	  on_load_iframe(div_iframe_schedule,class_schedule);
															             
															            });
												
										 }
										 else
											 {
											 aoFrm.mess("mess",mess.message_schedule);
						    				 
						    				 $(".modal-header .close").click();
						    				  $("#tree-menu .nav_contents-scheduled a").click();
											 }

					    				 }
						  }
						
					});
				 }

	    });
});
	function getChannelDetail(){
		//alert("okie")
		
		$("#account_choice_post").empty();
		 $("#list_facebook_post").empty();
		 $("#list_facebook_default").empty();
		 $("#list_facebook_page_post").empty();
		 $("#list_facebook_page_default").empty();
		 $("#list_twitter_default").empty();
		 $("#list_twitter_post").empty();
		 var dataString=[];
		 dataString.push({
            name: "channel_id", 
            value: ""
        });
		$.ajax({
			  url : 'GetChannelDetail.do',
			  dataType: 'json',
			  data: dataString,
			  success : function(source) {
					for(var i=0; i<source.length;i++){
						var object_content = new Object();
						object_content.no=i+1;
						object_content.pageid=source[i].channel_detail_id;
						object_content.pagename=source[i].channel_user;
						array_content_public.push(object_content);
						if(source[i].channel_id=="1"){
							var html='<li id="page_'+source[i].channel_detail_id+'" onclick="addpost('+"'"+source[i].channel_detail_id+"'"+','+"'"+source[i].channel_user+"'"+','+"'facebook'"+')" title="'+source[i].channel_user+'"><i class="icon-facebook-sign blue" ></i>'+limitString(source[i].channel_user)+'</li>';
					   		  $("#list_facebook_post").append(html);
					   		  var html_default='<li id="page_'+source[i].channel_detail_id+'" onclick="selectDefault('+"'"+source[i].channel_detail_id+"'"+','+"'"+source[i].channel_user+"'"+','+"'facebook'"+')" title="'+source[i].channel_user+'"><i class="icon-facebook-sign blue" ></i>'+limitString(source[i].channel_user)+'</li>';
					   		 $("#list_facebook_default").append(html_default);
						}
						else if(source[i].channel_id=="2"){
							var html='<li id="page_'+source[i].channel_detail_id+'" onclick="addpost('+"'"+source[i].channel_detail_id+"'"+','+"'"+source[i].channel_user+"'"+','+"'facebook'"+')" title="'+source[i].channel_user+'"><i class="icon-facebook-sign blue" ></i>'+limitString(source[i].channel_user)+'</li>';
					   		  $("#list_facebook_page_post").append(html);
					   		  var html_default ='<li id="page_'+source[i].channel_detail_id+'" onclick="selectDefault('+"'"+source[i].channel_detail_id+"'"+','+"'"+source[i].channel_user+"'"+','+"'facebook'"+')" title="'+source[i].channel_user+'"><i class="icon-facebook-sign blue" ></i>'+limitString(source[i].channel_user)+'</li>';
					   		 $("#list_facebook_page_default").append(html_default);
						}
						else{
							var html='<li id="page_'+source[i].channel_detail_id+'" onclick="addpost('+"'"+source[i].channel_detail_id+"'"+','+"'"+source[i].channel_user+"'"+','+"'twitter'"+')" title="'+source[i].channel_user+'"><i class="icon-twitter-sign blue" ></i>'+limitString(source[i].channel_user)+'</li>';
					   		  $("#list_twitter_post").append(html);
					   		 var html_default ='<li id="page_'+source[i].channel_detail_id+'" onclick="selectDefault('+"'"+source[i].channel_detail_id+"'"+','+"'"+source[i].channel_user+"'"+','+"'twitter'"+')" title="'+source[i].channel_user+'"><i class="icon-twitter-sign blue" ></i>'+limitString(source[i].channel_user)+'</li>';
					   	  $("#list_twitter_default").append(html_default); 
						}
					  	 
			   		  if(source[i].select_post=="1"){
			   			list_post.push(source[i].channel_detail_id);
			   			if(source[i].channel_id==3){
			   				var html='<button class="btn btn-small btn-default" id="btnchoise_'+source[i].channel_detail_id+'" channel-type="twitter" onclick="delete_choise('+"'"+source[i].channel_detail_id+"'"+')" type="button" title="'+source[i].channel_user+'"><i class="icon-twitter-sign" ></i><span class="nickname">'+limitString(source[i].channel_user)+'</span><i class="icon-remove-sign btn_delete"></i></button>';
				   			$("#account_choice_post").append(html);
			   			}
			   			else
			   				{
			   				var html='<button class="btn btn-small btn-default" id="btnchoise_'+source[i].channel_detail_id+'" channel-type="facebook" onclick="delete_choise('+"'"+source[i].channel_detail_id+"'"+')" type="button" title="'+source[i].channel_user+'"><i class="icon-facebook-sign" ></i><span class="nickname">'+limitString(source[i].channel_user)+'</span><i class="icon-remove-sign btn_delete"></i></button>';
				   			$("#account_choice_post").append(html);
			   				}
			   			
			   		  }
			   		  if(source[i].default_show=="1"){
			   			if(source[i].channel_id==3){
			   				$("#contents_create .channel-icon i").attr("class","icon-twitter-sign blue");
			                $("#contents_create .thumbnail img.avatar-large").attr("src",source[i].channel_picture);	
			   			}
			   			else
			   				{
			   				var  url_image = "https://graph.facebook.com/"+ source[i].channel_detail_id +"/picture?type=normal";
			   				$("#contents_create .channel-icon i").attr("class","icon-facebook-sign blue");
				            $("#contents_create .thumbnail img.avatar-large").attr("src",url_image);
			   				}
			   		
			   		  }
					}
					obj_content_public.content_public=array_content_public;
				}
		  });
	}
	$("#datepicker" ).datepick({ dateFormat: 'yy-mm-dd', minDate:0 ,multiSelect: 999, onSelect: function(dateText, inst) {
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
			$("#schedulePopup .time_txt").html(e.time.value);
 	});	

	function addpost(id,name,type){
		$("#btnchoise_"+id).remove();
		if(type=="facebook"){
			var html='<button class="btn btn-small btn-default" id="btnchoise_'+id+'" channel-type="facebook" onclick="delete_choise('+"'"+id+"'"+')" type="button" title="'+name+'"><i class="icon-facebook-sign"></i><span class="nickname">'+limitString(name)+'</span><i class="icon-remove-sign btn_delete"></i></button>';
			$("#account_choice_post").append(html);
		}
		else{
			var html='<button class="btn btn-small btn-default" id="btnchoise_'+id+'" channel-type="twitter" onclick="delete_choise('+"'"+id+"'"+')" type="button" title="'+name+'"><i class="icon-twitter-sign" ></i><span class="nickname">'+limitString(name)+'</span><i class="icon-remove-sign btn_delete"></i></button>';
			$("#account_choice_post").append(html);
		}
			list_post.push(id);
			var dataString =[];
	         dataString.push({
	             name: "channel_detail_id", 
	             value: id
	         });
	         dataString.push({
	             name: "select_post", 
	             value: 1
	         });
	         
	         dataString.push({
	             name: "Action", 
	             value: "updatechannel"
	         });    
			$.ajax({
				 type:'POST',
				  url : 'Create.do',
				  dataType: 'json',
				  data: dataString,
				  success : function(source) {
			      //aoFrm.mess("mess","Message has been save"); 
			  }
			
		});
	
	}
	function delete_choise(id){
		$("#btnchoise_"+id).remove();
		list_post = list_post.filter(function(v) { return v != id;});
		
		var dataString =[];
        dataString.push({
            name: "channel_detail_id", 
            value: id
        });
        dataString.push({
            name: "select_post", 
            value: 0
        });
        
        dataString.push({
            name: "Action", 
            value: "updatechannel"
        });    
		$.ajax({
			 type:'POST',
			  url : 'Create.do',
			  dataType: 'text',
			  data: dataString,
			  success : function(source) {
		      //aoFrm.mess("mess",mess.message_save); 
		  }
		
	});

	}

	 function selectDefault(channel_detail_id,name,type){
		 var dataString =[];
         dataString.push({
             name: "channel_detail_id", 
             value: channel_detail_id
         });
         dataString.push({
             name: "default_show", 
             value: 1
         });
         
         dataString.push({
             name: "Action", 
             value: "updatedefault"
         });    
		$.ajax({
			 type:'POST',
			  url : 'Create.do',
			  dataType: 'text',
			  data: dataString,
			  success : function(source) {
				  getChannelDetail();
				 
				
		      //aoFrm.mess("mess",mess.message_save); 
		  }
		
	});
	 }
	 function postoffline(attr){
		var type= $(attr).attr("excel");
		 if(type=="excel"){
			 $("#contents_create").append('<div style="position: relative;margin-top:-35px" class="itemLoading"></div>');
			 var send_date = new Date();
			 var parent = ".createForm";
			 $("#form_content").parsley('validate');
			 if (!$("#form_content").parsley('isValid')) {
					$(parent + " .parsley-error-list").hide();
					$(parent + " .alert-error").removeClass("hide");
					$(parent + " .alert-success").addClass("hide");
					//return false;
				}
			 var iframe='<iframe id="upload_iframe_upload_Excel" name="upload_iframe_upload_Excel"  witdh="0px" height="0px" border="0" style="width:0; height:0; border:none;"></iframe>';
				 
			 $("#contents_create").append(iframe);
				//$("#upload_iframe").attr("id", "upload_iframe_Sent");
			 	var action_url = "UploadExcelFile.do?Action=sent&status=3&create_date="+formatDateTimeCurrent();
				var form = document.getElementById("upload-excel-form");
				
				form.setAttribute('action', action_url);
				form.setAttribute('target', "upload_iframe_upload_Excel");
				form.submit();
				$("#upload_iframe_upload_Excel").load(function () {
					load_iframe_upload_excel("upload_iframe_upload_Excel","nav_contents-sent");
			    	
			           });
			// $("#upload-excel-form").submit();
		 }
		 else
			 {
			 count_channel_post=0;
			 var content=$("#contentpost").val();
			 var parent = ".createForm";
			 $("#form_content").parsley('validate');
			 if (!$("#form_content").parsley('isValid')) {
					
					$(parent + " .alert-error").removeClass("hide");
					$(parent + " .alert-success").addClass("hide");
					return false;
				}
				
				if(list_post.length==0){
				
				 aoFrm.mess("alert",mess.add_channel);
					return false;
			}
				var count_sent=  $(".nav_contents-sent .amount").html();
				var count_all=  $(".nav_contents-all .amount").html();
				$(".nav_contents-sent .amount").html(parseInt(count_sent)+list_post.length);
				$(".nav_contents-all .amount").html(parseInt(count_all)+list_post.length);
				var dataString=[];

				 dataString.push({
			            name: "Action", 
			            value: "selectpost"
			        });	
				 //selectpost
				 $.ajax({
					  url : 'GetChannelDetail.do',
					  dataType: 'json',
					  data: dataString,
					  success : function(source) {	
						  $("#facebookaccount").empty();
							for(var i=0; i<source.length;i++){
								 var body= $("#contentpost").val();
									// if(source[i].select_post=="1"){
										 var channel_type=$("#btnchoise_"+source[i].channel_detail_id).attr("channel-type");
											
										 var access_token=source[i].token_user;
										var token_twitter= access_token.split("_");
										 if(channel_type=="twitter"){
											 var image= document.getElementById("upload-photo-form-file_create").value;
											 if(image!=""){
												 var ext =image.split(".");
													ext=ext[1].toLowerCase();
														 if(ext!="jpg"&& ext!="png"&&ext!="jpeg" && ext!="gif"){
															 aoFrm.mess("alert",mess.image_invalid);
															 return false;
														 }else{
															
								                            if(!$.browser.msie){
								                            	 var filename= document.getElementById("upload-photo-form-file_create");
								                            	 var fileSize = filename.files[0].size;
								                            	 if(fileSize>=4096000){
								                            		 aoFrm.mess("alert",mess.file_size);
								                            	 return false;
								                            	 }
								                             }
															 
															 var iframe='<iframe id="" name="upload_iframe_Twitter"  witdh="0px" height="0px" border="0" style="width:0; height:0; border:none;"></iframe>';
																 	$("#contents_create").append(iframe);
																	$("#upload_iframe").attr("id", "upload_iframe_Twitter");
																 	var action_url = 'module/view/contents/save_photo.jsp?token='+access_token+'&message='+body;
																	var form = document.getElementById("upload-photo-form");
																	form.setAttribute('action', action_url);
																	form.setAttribute('target', "upload_iframe_Twitter");
																	form.submit();
																	$("#upload_iframe_Twitter").load(function () {
																    	on_load_post_social(source.length);
																    	
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
															  			    	
															  			    	saveContentSend(content)
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
																				  aoFrm.mess("mess",mess.message_send);
																				  saveContentSend(content)
																				  }
																			  });
																	 }
																
																 }
											 
										 }
										 else
											 {
											 var image= document.getElementById("upload-photo-form-file_create").value;
											 if(image!=""){
												 var ext =image.split(".");
													ext=ext[1].toLowerCase();
														 if(ext!="jpg"&& ext!="png"&&ext!="jpeg" && ext!="gif"){
															 //alert("Upload invalid image");
															 aoFrm.mess("alert",mess.image_invalid);
															 return false;
														 }
														 else{
															 if(!$.browser.msie){
								                            	 var filename= document.getElementById("upload-photo-form-file_create");
								                            	 var fileSize = filename.files[0].size;
								                            	 if(fileSize>=4096000){
								                            		 aoFrm.mess("alert",mess.file_size);
								                            	 return false;
								                            	 }
								                             }
															 $("#message").val(body);
															  	var token_page;
																var pchannel_id = source[i].pchannel_id;
																if(source[i].channel_detail_id==pchannel_id){
																	postImageFacebook(pchannel_id,access_token,source.length,body);
																}
																else{
																	var page_id_post= source[i].channel_detail_id;
																	postimagepage(access_token,pchannel_id,page_id_post,'contents_create',source.length);												
																		
																}
													 
														 	}
								 }
								 else{ 
									 FB.api('/'+source[i].channel_detail_id+'/feed', 'post', { message: body,access_token:access_token}, function(response) {
										
							             if (!response || response.error) {
							                  //alert('Error occured');
							             } else {
							            	 saveContentSend(content)
							             }
							        });
									 }

							 }
							//}
										
							}
							aoFrm.mess("mess",mess.message_send);
							 //alert("Post to wall");  
							
					  }
				  });
			 }
	
		}
	 function saveContentSend(content){
			// var body= $("#"+div_type).val();
		 var send_date = new Date();
				var dataString =[];
				 dataString.push({
		       name: "content", 
		       value: content
		   });
				 dataString.push({
				       name: "send_date", 
				       value: formatDateTimeCurrent(send_date)
				   });
		   dataString.push({
		       name: "status_id", 
		       value: 3
		   });
		   dataString.push({
		       name: "Action", 
		       value: "savedraft"
		   });    
			$.ajax({
				 type:'POST',
				  url : 'Create.do',
				  dataType: 'json',
				  data: dataString,
				  success : function(source) {
					  var image= document.getElementById("upload-photo-form-file_create").value;
					
						 if(image!=""){
							 var div_iframe_sent="upload_iframe_Sent";
								var class_sent="nav_contents-sent";
							 $('#upload_iframe_Sent').remove();
							 var ext =image.split(".");
								ext=ext[1].toLowerCase();
									 if(ext!="jpg"&& ext!="png"&&ext!="jpeg" && ext!="gif"){
										 return false;
									 }
									 var iframe='<iframe id="upload_iframe_Sent" name="upload_iframe_Sent"  witdh="0px" height="0px" border="0" style="width:0; height:0; border:none;"></iframe>';
										 									 
										 $("#contents_create").append(iframe);
											//$("#upload_iframe").attr("id", "upload_iframe_Sent");
										 	var action_url = 'SavePhoto.do?message_id='+source+"&list_post="+"'"+list_post+"'";
											var form = document.getElementById("upload-photo-form");
											form.setAttribute('action', action_url);
											form.setAttribute('target', "upload_iframe_Sent");
											form.submit();
											$("#upload_iframe_Sent").load(function () {
												
												  on_load_iframe(div_iframe_sent,class_sent);
										             
										            });
						 }
						 else{
							 $("#tree-menu .nav_contents-sent a").click();
						 }
						  
			  }
			
		});
		}
	 function postImageFacebook(pchannel_id,access_token,channel_count,content){
			var iframe='<iframe id="upload_iframe_'+pchannel_id+'" name="upload_iframe_'+pchannel_id+'"  witdh="0px" height="0px" border="0" style="width:0; height:0; border:none;"></iframe>';
			 $("#contents_create").append(iframe);
			 	var action_url = 'https://graph.facebook.com/'+pchannel_id+'/photos?access_token=' + access_token;
				var form = document.getElementById("upload-photo-form");
				form.setAttribute('action', action_url);
				form.setAttribute('target', "upload_iframe_"+pchannel_id);
				form.submit();
				$("#upload_iframe_"+pchannel_id).load(function () {
			    	on_load_post_social(channel_count);
			           
			            });
		}
	 function postimagepage(token,pchannel_id,page_id_post,div_iframe,channel_count){
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
						    	 	on_load_post_social(channel_count);
						    	page_id_post="";
						    	 
						            });

					 }
				}
		 });
	 }
	 function on_load_post_social(channel_count){
			count_channel_post++;
			 if(count_channel_post==channel_count){
				var content=$("#contentpost").val();
				 saveContentSend(content);
				
			 }
			 
		}
	 function export_sample_file(){
		 var str = ''+''+JSON.stringify(obj_content_public)+''+'';
			$("#exportContent_public").val(str);
			$("#exportForm_public").submit();	
	 }



	
	
