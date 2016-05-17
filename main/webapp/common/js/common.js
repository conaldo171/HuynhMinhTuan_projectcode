/*******************************************************************************
 * Page Code: First Author: Created Date:
 ******************************************************************************/

/* Erro Handler */
function _log(source, e) {
	console.log(source);
}

/*******************************************************************************
 * public:formatDateInGrid
 ******************************************************************************/
var defaultCal = "KO";
var check_exprired=0;
var array_member_assign= new Array();
var array_email_assign= new Array();
var array_name_assign= new Array();
var obj_profile_name=new Object();
var array_remove_assign=new Array();
var count_channel_other=0;
//$("#tour").click(function(){
		if(localStorage.lang=="kr"){
			var user_guide_kr=$("#user_guide_kr").val();
			$("#tour").attr("href",user_guide_kr);
		}
		else
			{
			var user_guide_en=$("#user_guide_en").val();
			$("#tour").attr("href",user_guide_en);
			}
	//});

function formatDate(inputDate, nation) {
	try {
		var date;
		if (checkEmptyValue(inputDate))
			date = new Date();
		else
			date = new Date(inputDate);

		if (checkEmptyValue(nation))
			nation = defaultCal;

		var sMonth = "0" + (date.getMonth() + 1);
		sMonth = sMonth.substr(sMonth.length - 2);
		var sDay = "0" + date.getDate();
		sDay = sDay.substr(sDay.length - 2);

		var sDate = inputDate;
		if (nation.toUpperCase() == "KO")
			sDate = date.getFullYear() + "-" + sMonth + "-" + sDay;
		else if (nation.toUpperCase() == "KO2")
			sDate = date.getFullYear() + "/" + sMonth + "/" + sDay;
		else if (nation.toUpperCase() == "EN")
			sDate = sMonth + "-" + sDay + "-" + date.getFullYear();
		else if (nation.toUpperCase() == "VN")
			sDate = sDay + "-" + sMonth + "-" + date.getFullYear();
		else if (nation.toUpperCase() == "PURE")
			sDate = date.getFullYear() + sMonth + sDay;

		return sDate;
	} catch (e) {
		if (debugMode)
			throw e;
		else {
			_log("getInfoMessage", e);
		}
	}
}

/*******************************************************************************
 * enumerateObject
 ******************************************************************************/
function enumerateObject(obj) {
	try {
		var property, propCollection = "";

		for (property in obj) {
			propCollection += (property + "==>" + obj[property] + "\n");
		}

		return propCollection;
	} catch (e) {
		if (debugMode)
			throw e;
		else {
			_log("getInfoMessage", e);
		}
	}
}

/*******************************************************************************
 * convert Object to Array
 ******************************************************************************/
function converObjectToArray(obj){
	var arrObj = new Array();
	var property, propCollection = "";
	for (property in obj) {
		var childObj = {"key":property,"value":obj[property]};
		arrObj.push(childObj);
	}

	return arrObj;
}

/*******************************************************************************
 * convert value of Object to Array
 ******************************************************************************/
function converValueObjectToArray(obj){
	var arrObj = new Array();
	var property, propCollection = "";
	for (property in obj) {
		arrObj.push(obj[property]);
	}

	return arrObj;
}

/*******************************************************************************
 * enumerateObject
 ******************************************************************************/
function enumerateArray(arr) {
	try {
		var sReturn = "";
		for ( var i = 0; i < arr.length; i++) {
			sReturn += "[" + i + "]\n";
			sReturn += enumerateObject(arr[i]);
		}

		return sReturn;
	} catch (e) {
		if (debugMode)
			throw e;
		else {
			_log("getInfoMessage", e);
		}
	}
}

/*******************************************************************************
 * enumerateObject
 ******************************************************************************/
function isNull(obj) {
	return (obj == null || typeof obj == 'undefined' || obj == "");
}

/*******************************************************************************
 * parseXMLItemAttr
 ******************************************************************************/
function parseXMLItemAttr(node) {
	try {
		var obj = new Object();

		$.each(node.attributes, function(i, attrib) {
			obj[attrib.name] = attrib.value;
		});

		return obj;
	} catch (e) {
		if (debugMode)
			throw e;
		else {
			_log("getInfoMessage", e);
		}
	}
}

/*******************************************************************************
 * multi-language
 ******************************************************************************/

var defaultLang = "EN";

/*******************************************************************************
 * getInfoMessage
 ******************************************************************************/
function getInfoMessage(messageID, lang) {
	try {
		var langMessages;
		if (lang == null)
			lang = defaultLang;

		lang = lang.toUpperCase();

		langMessages = this[config.main_lang + "_Messages"];

		if (isNull(langMessages[messageID]))
			return messageID;

		return langMessages[messageID];
	} catch (e) {
		if (debugMode)
			throw e;
		else {
			_log("getInfoMessage", e);
		}
	}
}

/*******************************************************************************
 * IsEmail
 ******************************************************************************/
function IsEmail(email) {
	try {
		var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return regex.test(email);
	} catch (e) {
		if (debugMode)
			throw e;
		else {
			_log("IsEmail", e);
		}
	}

}
/*******************************************************************************
 * formatDateInputGridone
 ******************************************************************************/
function formatDateInputGridone(date) {
	try {
		var year = date.substring(0, 4);
		var month = date.substring(4, 6);
		var date = date.substring(6, 8);
		var datetimeFull = year + "-" + month + "-" + date;
		return datetimeFull;
	} catch (e) {
		if (debugMode)
			throw e;
		else {
			_log("formatDateInputGridone", e);
		}
	}
}
/*******************************************************************************
 * formatDateOutputGridone
 ******************************************************************************/
function formatDateOutputGridone(date) {
	try {
		var str = date.split("-");
		var date = str[0] + str[1] + str[2];
		return date;
	} catch (e) {
		if (debugMode)
			throw e;
		else {
			_log("formatDateOutputGridone", e);
		}
	}

}
/*******************************************************************************
 * formatTimeStamp
 ******************************************************************************/
function formatTimeStamp(date) {

	try {
		var date_Obj = new Date(date);
		var dateformat;
		var PM = "AM";
		var hour = date_Obj.getHours();
		var date = date_Obj.getDate();
		var month = date_Obj.getMonth();
		var minute = date_Obj.getMinutes();
		if (minute < 10)
			minute = "0" + minute;
		if (month < 10)
			month = "0" + month;
		if (date < 10)
			date = "0" + date;
		if (hour > 12) {
			hour = hour - 12;
			PM = "PM";
		}
		dateformat = date_Obj.getFullYear() + "-" + month + "-" + date + "-"
				+ PM + "-" + hour + ":" + minute;
		return dateformat;
	} catch (e) {
		if (debugMode)
			throw e;
		else {
			_log("formatDateOutputGridone", e);
		}
	}
}
function toTimestampReport(strDate){
	var datetime="";
		datetime=strDate.substring("0","10");
	 var date_Obj = new Date(datetime);
	 var datum = Date.parse(date_Obj);
	 return datum/1000;
}
function formatDate(date) {

	try {
		var date_Obj = new Date(date);
		var dateformat;
		var PM = "AM";
		var date = date_Obj.getDate();
		var month = date_Obj.getMonth()+1;
		if (month < 10)
			month = "0" + month;
		if (date < 10)
			date = "0" + date;
		
	
		dateformat = date_Obj.getFullYear() + "-" + month + "-" + date ;
		return dateformat;
	} catch (e) {
		if (debugMode)
			throw e;
		else {
			_log("formatDateOutputGridone", e);
		}
	}
}
function formatDateCurrent(){
	try {
		var date_Obj = new Date();
		var dateformat;
		var PM = "AM";
		var hour = date_Obj.getHours();
		var date = date_Obj.getDate();
		var month = date_Obj.getMonth()+1;
		var minute = date_Obj.getMinutes();
		var second=date_Obj.getSeconds();
        
		if (minute < 10)
			minute = "0" + minute;
		if (month < 10)
			month = "0" + month;
		if (date < 10)
			date = "0" + date;
		if (second < 10)
			second = "0" + second;
		if (hour > 12) {
			hour = hour - 12;
			PM = "PM";
		}
		dateformat = date_Obj.getFullYear() + "-" + month + "-" + date;
		return dateformat;
	} catch (e) {
		if (debugMode)
			throw e;
		else {
			_log("formatDateCurrent", e);
		}
	}
}
function formatDateTimeCurrent(){
	try {
		var date_Obj = new Date();
		var dateformat;
		var PM = "AM";
		var hour = date_Obj.getHours();
		var date = date_Obj.getDate();
		var month = date_Obj.getMonth()+1;
		var minute = date_Obj.getMinutes();
		var second=date_Obj.getSeconds();
        
		if (minute < 10)
			minute = "0" + minute;
		if (month < 10)
			month = "0" + month;
		if (date < 10)
			date = "0" + date;
		if (second < 10)
			second = "0" + second;
		
		dateformat = date_Obj.getFullYear() + "-" + month + "-" + date +" "+hour+":"+minute+":"+second;
		return dateformat;
	} catch (e) {
		if (debugMode)
			throw e;
		else {
			_log("formatDateCurrent", e);
		}
	}
}
function formatLongToDateGMT(date){
	var date_Obj = new Date(date);
	var dateformat;
	var PM = "AM";
	var date = date_Obj.getDate();
	var month = date_Obj.getMonth()+1;
	var hour = date_Obj.getHours();
	var minute = date_Obj.getMinutes();
	var second=date_Obj.getSeconds();
	if (month < 10)
		month = "0" + month;
	if (date < 10)
		date = "0" + date;
	if (hour > 12) {
		hour = hour - 12;
		PM = "PM";
	}
	else
		{
		if(hour ==12&& minute>0){
			PM = "PM";
		}
		else
			{
			PM = "AM";
			}
		}
	if(minute<10)
		minute="0"+minute;
	if(second<10)
		second="0"+second;
	dateformat = date_Obj.getFullYear() + "-" + month + "-" + date + " at " +hour +":"+ minute+":"+second +" "+PM;

	return dateformat;
	
}
function formatDateGMT(date){
	try {
		var datetime="";
		if($.browser.msie){
			datetime =date.replace("+0000","");	
		}
		else
			datetime=date;
		var date_Obj = new Date(datetime);

		var dateformat;
		var PM = "AM";
		var date = date_Obj.getDate();
		var month = date_Obj.getMonth()+1;
		var hour = date_Obj.getHours();
		var minute = date_Obj.getMinutes();
		var second=date_Obj.getSeconds();
		if (month < 10)
			month = "0" + month;
		if (date < 10)
			date = "0" + date;
		if (hour > 12) {
			hour = hour - 12;
			PM = "PM";
		}
		else
			{
			if(hour ==12&& minute>0){
				PM = "PM";
			}
			else
				{
				PM = "AM";
				}
			}
		if(minute<10)
			minute="0"+minute;
		if(second<10)
			second="0"+second;
		dateformat = date_Obj.getFullYear() + "-" + month + "-" + date + " at " +hour +":"+ minute+":"+second +" "+PM;

		return dateformat;
	} catch (e) {
		if (debugMode)
			throw e;
		else {
			_log("formatDateOutputGridone", e);
		}
	}
}
/*******************************************************************************
 * setCookie
 ******************************************************************************/
function setCookie(c_name, value, exdays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value = escape(value)
			+ ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
	document.cookie = c_name + "=" + c_value;
}
/*******************************************************************************
 * getCookie
 ******************************************************************************/
function getCookie(c_name) {
	var c_value = document.cookie;
	var c_start = c_value.indexOf(" " + c_name + "=");
	if (c_start == -1) {
		c_start = c_value.indexOf(c_name + "=");
	}
	if (c_start == -1) {
		c_value = null;
	} else {
		c_start = c_value.indexOf("=", c_start) + 1;
		var c_end = c_value.indexOf(";", c_start);
		if (c_end == -1) {
			c_end = c_value.length;
		}
		c_value = unescape(c_value.substring(c_start, c_end));
	}

	return c_value;

}

function roundNumber(num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	
	return result;
	}

function delete_schedule(channel_detail_id, msg_id){
	var r=confirm(mess.message_delete_message);
	if (r==true)
	  {
		var dataString =[];
        dataString.push({
            name: "message_id", 
            value: msg_id
        });
		dataString.push({
            name: "channel_detail_id", 
            value: channel_detail_id
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
				  var count_schedule=  $(".nav_contents-scheduled .amount").html();
 				 var count_all=  $(".nav_contents-all .amount").html();	
 				 $(".nav_contents-scheduled .amount").html(parseInt(count_schedule)-1);
				 $(".nav_contents-all .amount").html(parseInt(count_all)-1);
				 $("#scheduled_scheduled").html(parseInt(count_schedule)-1);
					$("#scheduled_all").html(parseInt(count_all)-1);
					$("#scheduled_image_all").attr("title",parseInt(count_all)-1);
					$("#scheduled_image_scheduled").attr("title",parseInt(count_schedule)-1);
					 $("#all_all").html(parseInt(count_all)-1);
					 $("#all_image_all").attr("title",parseInt(count_all)-1);
					$("#all_scheduled").html(parseInt(count_schedule)-1);
					 $("#all_image_scheduled").attr("title",parseInt(count_schedule)-1);
				 $("#"+msg_id+"_"+channel_detail_id).fadeOut();
				  aoFrm.mess("mess",mess.message_delete); 
			  }
		
	}); 

}
			
	 		
	
}
function delete_draft(channel_detail_id, msg_id){
	
			
	var r=confirm(mess.message_delete_message);
	if (r==true)
	  {
		$("#"+msg_id+"_"+channel_detail_id).fadeOut();
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
				  var count_draft=  $(".nav_contents-draft .amount").html();
					var count_all=  $(".nav_contents-all .amount").html();
					$(".nav_contents-draft .amount").html(parseInt(count_draft)-1);
					$(".nav_contents-all .amount").html(parseInt(count_all)-1);	
					$("#draft_all").html(parseInt(count_all)-1);
					$("#draft_image_all").attr("title",parseInt(count_all)-1);
					$("#draft_draft").html(parseInt(count_draft)-1);
				    $("#draft_image_draft").attr("title",parseInt(count_draft)-1);
				    $("#all_all").html(parseInt(count_all)-1);
					 $("#all_image_all").attr("title",parseInt(count_all)-1);
					 $("#all_draft").html(parseInt(count_draft)-1);
					 $("#all_image_draft").attr("title",parseInt(count_draft)-1);
				     aoFrm.mess("mess",mess.message_delete); 
			  }
		
	});
}
			
		
}
function changevalue(type){
	var image= document.getElementById("upload-photo-form-file_"+type).value;
    var ext =image.split(".");
		ext=ext[1].toLowerCase();
			 if(ext!="jpg"&& ext!="png"&&ext!="jpeg" && ext!="gif"){
				// alert("Upload invalid image");
				 aoFrm.mess("alert",mess.image_invalid);
				 return false;
			 }
	 $("#remove_image_"+type).show();
     $("#upload_photo_"+type).hide();
}
function changevalueExcel(type){
	//alert("uploade-excel-form-file_"+type)
	var file= document.getElementById("uploade-excel-form-file_"+type).value;
    var ext =file.split(".");
		ext=ext[1].toLowerCase();
			 if(ext!="xls"){
				// alert("Upload invalid image");
				 aoFrm.mess("alert",mess.file_invalid);
				 return false;
			 }
		$("#contents_create #btn_send").attr("excel","excel");
		$("#contents_create #btn_save_draft").attr("excel","excel");
		$("#contents_create #schedulePopup #btn_scheduled").attr("excel","excel");
		//
		//btn_save_draft
		//$("#contents_create #contentpost").html(file);
		//$("#contents_create #contentpost").removeClass("parsley-validated");
		//
		//data-required="true"
	 $("#remove_excel_"+type).show();
     $("#upload_excel_"+type).hide();
}
function changevalueCommentExcel(type){
	//alert("uploade-excel-form-file_"+type)
	var file= document.getElementById("uploade-excel-form-file_comment_"+type).value;
    var ext =file.split(".");
		ext=ext[1].toLowerCase();
			 if(ext!="xls"){
				// alert("Upload invalid image");
				 aoFrm.mess("alert",mess.file_invalid);
				 return false;
			 }
		
	 $("#remove_excel_comment_"+type).show();
     $("#upload_excel_comment_"+type).hide();
}
//delete_excelfile_comment
function delete_excelfile_comment(type){
	 $("#remove_excel_comment_"+type).hide();
     $("#upload_excel_comment_"+type).show();
     document.getElementById("uploade-excel-form-file_"+type).value="";
     $("#contents_create #btn_send").attr("excel","");
     $("#contents_create #btn_save_draft").attr("excel","");
     $("#contents_create #schedulePopup #btn_scheduled").attr("excel","");
     if(type!="create"){
    	 
     }
     
     }
function delete_excelfile(type){
	$("#remove_excel_"+type).hide();
    $("#upload_excel_"+type).show();
     document.getElementById("uploade-excel-form-file_comment_"+type).value="";
   
     if(type!="create"){
    	 
     }
     
     }
     

function delete_image(type){
	$("#remove_image_"+type).hide();
     $("#upload_photo_"+type).show();
     document.getElementById("upload-photo-form-file_"+type).value="";
     if(type!="create"){
    	 var image =$("#remove_image_"+type).attr("item_image");
         if(image!=""){
        	 var temp= image.split("_");
        	 var msg_id=temp[0];
        	 var file_name= temp[1]+"_"+temp[2];
        	 var dataString =[];
             dataString.push({
                 name: "message_id", 
                 value: msg_id
             });
             dataString.push({
                 name: "file_name", 
                 value: file_name
             }); 
             dataString.push({
                 name: "Action", 
                 value: "delete"
             }); 
        	 $.ajax({
       		  url : 'SavePhoto.do',
       		  dataType: 'text',
       		  data:dataString,
       		  success : function(source) {
       			$("#remove_image_"+type).attr("href_image","")
       			$("#remove_image_"+type).attr("item_image","");
       			  
       		  }
        	 }); 
     }
    
     }
     
}
function filterprofile(div_id,type){
	//alert(("#"+div_id +" ul.timeline"))
	
	$.ajax({
		  url : 'GetChannelDetail.do',
		  dataType: 'json',
		  success : function(source) {
			  $("#"+div_id).empty();  		 
				for(var i=0; i<source.length;i++){
					if(source[i].channel_id==1||source[i].channel_id==2){
					 var html= ' <li id="page_'+source[i].channel_detail_id+'" title="'+source[i].channel_user+'"><span><i class="icon-facebook-sign blue"></i> '+limitString(source[i].channel_user)+'</span><div class="pull-right checked" id="profile_facebook"  channel-type="facebook" > <i class="icon-check"></i></div></li>';//'<li id="page_'+source[i].id+'" ><i class="icon-facebook-sign blue" ></i>'+source[i].channel_user+'</li>';
			   		  $("#"+div_id).append(html);
					}else
			   			 {
			   			var html= ' <li id="page_'+source[i].channel_detail_id+'" title="'+source[i].channel_user+'"><span><i class="icon-twitter-sign blue"></i> '+limitString(source[i].channel_user)+'</span><div class="pull-right checked" id="profile_twitter"  channel-type="twitter" > <i class="icon-check"></i></div></li>';//'<li id="page_'+source[i].id+'" ><i class="icon-facebook-sign blue" ></i>'+source[i].channel_user+'</li>';
				   		  $("#"+div_id).append(html);
			   			 } 
				}
				var arrfilter= new Array();
				 $(".profiles .box-list.check .pull-right").click(function(e) {
					
					 $("#"+div_id +" ul.timeline").append('<li class="itemLoading"></li>');
		   				if($(this).hasClass("checked"))
		   				{
		   					var str;
		   					pchannel_id = $(this).parent().attr("id");
		   					str = pchannel_id.split("_");
		   					$(this).find("i").attr("class","icon-check-empty");
		   					$(this).removeClass("checked");
		   					arrfilter.push(str[1]);
		   					getMessageProfileFilter(arrfilter,type,div_id);
		   					
		   				}else
		   				{
		   					$(this).find("i").attr("class","icon-check");
		   					$(this).addClass("checked");
		   					var str;
		   					pchannel_id = $(this).parent().attr("id");
		   					str = pchannel_id.split("_");
		   					
		   					arrfilter = arrfilter.filter(function(v) { return v != str[1];});
		   					getMessageProfileFilter(arrfilter,type,div_id);
		   					
		   				}
		   				
		   	    	});	
			}
	  });
	
	
}
function filterprofile_comment(div_id,type){
	//alert(("#"+div_id +" ul.timeline"))
	
	$.ajax({
		  url : 'GetChannelDetail.do',
		  dataType: 'json',
		  success : function(source) {
			  $("#"+div_id).empty();  		 
				for(var i=0; i<source.length;i++){
					if(source[i].channel_id==2){
					 var html= ' <li id="page_'+source[i].channel_detail_id+'" title="'+source[i].channel_user+'"><span><i class="icon-facebook-sign blue"></i> '+limitString(source[i].channel_user)+'</span><div class="pull-right checked" id="profile_facebook"  channel-type="facebook" > <i class="icon-check"></i></div></li>';//'<li id="page_'+source[i].id+'" ><i class="icon-facebook-sign blue" ></i>'+source[i].channel_user+'</li>';
			   		  $("#"+div_id).append(html);
					}else
			   			 {
			   			var html= ' <li id="page_'+source[i].channel_detail_id+'" title="'+source[i].channel_user+'"><span><i class="icon-twitter-sign blue"></i> '+limitString(source[i].channel_user)+'</span><div class="pull-right checked" id="profile_twitter"  channel-type="twitter" > <i class="icon-check"></i></div></li>';//'<li id="page_'+source[i].id+'" ><i class="icon-facebook-sign blue" ></i>'+source[i].channel_user+'</li>';
				   		  $("#"+div_id).append(html);
			   			 } 
				}
				var arrfilter= new Array();
				 $(".profiles .box-list.check .pull-right").click(function(e) {
					
					 $("#"+div_id +" ul.timeline").append('<li class="itemLoading"></li>');
		   				if($(this).hasClass("checked"))
		   				{
		   					var str;
		   					pchannel_id = $(this).parent().attr("id");
		   					str = pchannel_id.split("_");
		   					$(this).find("i").attr("class","icon-check-empty");
		   					$(this).removeClass("checked");
		   					arrfilter.push(str[1]);
		   					getMessageProfileFilterComment(arrfilter,type,div_id);
		   					
		   				}else
		   				{
		   					$(this).find("i").attr("class","icon-check");
		   					$(this).addClass("checked");
		   					var str;
		   					pchannel_id = $(this).parent().attr("id");
		   					str = pchannel_id.split("_");
		   					
		   					arrfilter = arrfilter.filter(function(v) { return v != str[1];});
		   					getMessageProfileFilterComment(arrfilter,type,div_id);
		   					
		   				}
		   				
		   	    	});	
			}
	  });
	
	
}
function getFileImage(messageid,type){
	
	 $("#remove_image_"+type).hide();
	 $("#upload_photo_"+type).show();
	 $("#remove_image_"+type).attr("item_image","");
	 $("#remove_image_"+type).attr("href_image","");
	var dataString =[];
    dataString.push({
        name: "msg_id", 
        value: messageid
    });
	$.ajax({
		  url : 'GetFile.do',
		  dataType: 'json',
		  data:dataString,
		  success : function(source) {
			// var photo ="";
            for(var i=0; i<source.length; i++){

            	url_image=source[i].url_image; 
            	 $("#remove_image_"+type).show();
            	 $("#remove_image_"+type).attr("item_image",messageid+"_"+source[i].file_name);
            	 $("#remove_image_"+type).attr("href_image",url_image);
        	     $("#upload_photo_"+type).hide();
            }
		  }
	});
}
function postImageFromServer(message,channel_detail_id,access_token,type,count){
	 var url_image_server=$("#remove_image_"+type).attr("href_image");
	
	 $.ajax({
           type: "POST",
           url: "https://graph.facebook.com/"+channel_detail_id+"/photos",
           data: {
               message: message,
               url: url_image_server,
               access_token: access_token,
               format: "json"
           },
           success: function(data){
        	   count_channel_other++;
        	   if(count_channel_other==count){
           		$("#tree-menu .nav_contents-sent a").click();
           		aoFrm.mess("mess",mess.message_send)
           	}
           	; }
           });
}
function postImageFromServerTwitter(message,access_token,type,count){
	 
	 var url_image_server=$("#remove_image_"+type).attr("href_image");
	 var dataString =[];
        dataString.push({
            name: "message", 
            value: message
        });
        dataString.push({
            name: "url_image_server", 
            value: url_image_server
        });  
        dataString.push({
            name: "token", 
            value: access_token
        });    
	 $.ajax({
           type: "POST",
           url: "module/view/contents/save_photo.jsp",
           dataType: 'json',
           data:dataString,
           success: function(data){
        	   count_channel_other++;
        	   if(count_channel_other==count){
           		$("#tree-menu .nav_contents-sent a").click();
           		aoFrm.mess("mess",mess.message_send);
           	}
           	; }
           });
}
function postImagePageFromServer(token,message,pchannel_id,page_id_post,url_server,count){
	 FB.api('/'+pchannel_id+'/accounts',{access_token:token}, function(response) {
		 var datasource=response.data;
		 for(var j=0; j<datasource.length;j++){
				 if(datasource[j].id==page_id_post){
					var token_page = datasource[j].access_token;
					 $.ajax({
				            type: "POST",
				            url: "https://graph.facebook.com/"+page_id_post+"/photos",
				            data: {
				                message: message,
				                url: url_server,
				                access_token: token_page,
				                format: "json"
				            },
				            success: function(data){
				            	count_channel_other++;
				            	if(count_channel_other==count){
				            		$("#tree-menu .nav_contents-sent a").click();
				            		aoFrm.mess("mess",mess.message_send)
				            	}
				            	
				            	; }
				            });

				 }
			}
	 });
} 
function editscheduled(channel_id,messageid){
	list_post=[];
	token_array=[];
	var text = $("#"+messageid+"_"+channel_id+" #"+messageid+" blockquote #content_schedule").text();
	$("#contentPostSchedule").val(text);
	$("#contentPostSchedule").attr("msg_id",messageid+"_"+channel_id);
	var image = $("#"+messageid+"_"+channel_id +" img").attr("src");
	$("#avatar_scheduled").attr("src",image);
	var chanel_type=$("#"+messageid+"_"+channel_id ).attr("chanel-type");
	if(chanel_type=="twitter"){
		$("#icon-social").attr("class","icon-twitter-sign blue");
		$("#icon-social-schedule").attr("class","icon-twitter-sign blue");
		$("#contentPostSchedule").attr("chanel-type",'twitter');
		$("#contentPostSchedule").attr("data-maxlength",'140');
	}
	else{
		$("#icon-social").attr("class","icon-facebook-sign blue");
		$("#icon-social-schedule").attr("class","icon-facebook-sign blue");
		$("#contentPostSchedule").attr("chanel-type",'facebook');
		$("#contentPostSchedule").attr("data-maxlength",'5000');
	}
	$('#contentPostSchedule').keyup(function(){
		 var max = parseInt($(this).attr('data-maxlength'));
		 if($(this).val().length > max){
		 $(this).val($(this).val().substr(0, $(this).attr('data-maxlength'))); 
	 }
	 });
	getListPostSchedule(messageid);
	getChannelUser();
	getListDateSchedule(messageid,0);
	getFileImage(messageid,"schedule");
}
function editdraft(channel_id,messageid){

	var text = $("#"+messageid+" blockquote #content_draft").text();
	$("#contentPostOther").val(text);
	$("#contentPostOther").attr("msg_id",messageid+"_"+channel_id);
	var image = $("#"+messageid+"_"+channel_id +" img").attr("src");
	var chanel_type=$("#"+messageid+"_"+channel_id ).attr("chanel-type");
	if(chanel_type=="twitter"){
		$("#icon-social").attr("class","icon-twitter-sign blue");
		$("#contentPostOther").attr("chanel-type",'twitter');
		$("#contentPostOther").attr("data-maxlength",'140');
	}
	else{
		$("#icon-social").attr("class","icon-facebook-sign blue");
		$("#contentPostOther").attr("chanel-type",'facebook');
		$("#contentPostOther").attr("data-maxlength",'5000');
	}

	$('#contentPostOther').keyup(function(){
			 var max = parseInt($(this).attr('data-maxlength'));
			 if($(this).val().length > max){
			 $(this).val($(this).val().substr(0, $(this).attr('data-maxlength'))); 
		 }
		 });
	$("#avatar_draft").attr("src",image);
	getFileImage(messageid,"draft");
	
	
}
function getListPostSchedule(messageid){
	var dataString=[];
	dataString.push({
        name: "message_id", 
        value: messageid
    });
    dataString.push({
        name: "Action", 
        value: "listschedule"
    });
	 $.ajax({
		 type:"GET",
		  url : 'GetChannelDetail.do',
		  dataType: 'json',
		  data:dataString,
		  success : function(source){
			  $("#account_choice_post").empty();
				for(var i=0;i<source.length;i++){
					list_post.push(source[i].channel_detail_id);
					token_array.push(source[i].token_user);
					if(source[i].channel_id==1||source[i].channel_id==2){
						var html='<button class="btn btn-small btn-lightblue" id="btnchoise_'+source[i].channel_detail_id+'" channel-type="facebook"  onclick="delete_choise('+"'"+source[i].channel_detail_id+"'"+')" type="button"><i class="icon-facebook-sign" ></i><span class="nickname">'+source[i].channel_user+'</span><i class="icon-remove-sign btn_delete"></i></button>';
						$("#account_choice_post").append(html);
						$("#btnchoise_"+source[i].channel_detail_id).attr("pchannel_id",source[i].pchannel_id);	
					}
					else
						{
						var html='<button class="btn btn-small btn-lightblue" id="btnchoise_'+source[i].channel_detail_id+'" channel-type="twitter"  onclick="delete_choise('+"'"+source[i].channel_detail_id+"'"+')" type="button"><i class="icon-twitter-sign" ></i><span class="nickname">'+source[i].channel_user+'</span><i class="icon-remove-sign btn_delete"></i></button>';
						$("#account_choice_post").append(html);
						$("#btnchoise_"+source[i].channel_detail_id).attr("pchannel_id",source[i].pchannel_id);	
						}
					
				}
		  }
	});
	
}
function getListDateSchedule(messageid,type){
	$("#date_value").html("");
	$("#date_value_schedule").html("");
	var dataString=[];
	dataString.push({
        name: "message_id", 
        value: messageid
    });
	dataString.push({
        name: "type", 
        value: type
    });
	dataString.push({
        name: "Action", 
        value: "listdate"
    });
	 $.ajax({
		 type:"GET",
		  url : 'GetChannelDetail.do',
		  dataType: 'json',
		  data:dataString,
		  success : function(source){
			  var _txtDate = "";
			  var time;
				for(var i=0;i<source.length;i++)
				{
					//alert(source[i].send_date)
					var date=source[i].send_date;
					
					//var _txt1 = source[i].getUTCFullYear() + "-" + (dateText[i].getUTCMonth() + 1) + "-" + dateText[i].getUTCDate();
					time=date.substr(11,5);
				
					_txtDate+= date.substring(0,10) + "; ";
					//return false;
					//alert(time);
					var timetemp=time.split(":");
					var hour=timetemp[0];
					if(hour>12){
						time = (hour - 12)+":"+timetemp[1] + " PM";
					}
					else
						{
						time =time+" AM";
						}
				}
				if(type==0){
					$("#timepicker1").val(time);
					$("#date_value").html(_txtDate);
					$("#date_value").attr("value",_txtDate)
				}
				
					$("#timepicker_schedule").val(time);
					$("#date_value_schedule").html(_txtDate);
					$("#date_value_schedule").attr("value",_txtDate)
					
				 
		  }
	 });
}
function getChannelUser(){
	 $.ajax({
		  url : 'GetChannelDetail.do',
		  dataType: 'json',
		  success : function(source) {
			  $("#list_facebook_post").empty();
			  $("#list_facebook_page_post").empty();
			  $("#list_twitter_post").empty();
				for(var i=0; i<source.length;i++){
					if(source[i].channel_id=="1"){
						var html='<li id="page_'+source[i].channel_detail_id+'" onclick="addpost('+"'"+source[i].channel_detail_id+"'"+','+"'"+source[i].channel_user+"'"+','+"'facebook'"+')"><i class="icon-facebook-sign blue" ></i>'+source[i].channel_user+'</li>';
				   		  $("#list_facebook_post").append(html);
					}
					else if(source[i].channel_id=="2"){
						var html='<li id="page_'+source[i].channel_detail_id+'" onclick="addpost('+"'"+source[i].channel_detail_id+"'"+','+"'"+source[i].channel_user+"'"+','+"'facebook'"+')"><i class="icon-facebook-sign blue" ></i>'+source[i].channel_user+'</li>';
				   		  $("#list_facebook_page_post").append(html);
					}
					else
						{
							var html='<li id="page_'+source[i].channel_detail_id+'" onclick="addpost('+"'"+source[i].channel_detail_id+"'"+','+"'"+source[i].channel_user+"'"+','+"'twitter'"+')"><i class="icon-twitter-sign blue" ></i>'+source[i].channel_user+'</li>';
					   		  $("#list_twitter_post").append(html);
						}
						
				}
			}
	  });
}

function replaceURLWithHTMLLinks(text) {
    var exp = /(\b(https?|ftp|file):\/\/([-A-Z0-9+&@#%?=~_|!:,.;]*)([-A-Z0-9+&@#%?\/=~_|!:,.;]*)[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(exp, "<a style='color: #0088CC' href='$1' target='_blank'>$1</a>");
}
function toTimestamp(strDate){
	var datetime=strDate.toString();
	 if($.browser.msie){
			datetime =datetime.replace("+0000","");	
			
		}
		else
			datetime=strDate;
	 var date_Obj = new Date(datetime);
	 var datum = Date.parse(date_Obj);
	 return datum/1000;
}
function saveMessageToSend(message,list_channel_detail,type_div,type){
	var dataString =[];
	var send_date= new Date();
	//formatDateTimeCurrent(send_date)
    dataString.push({
        name: "content", 
        value: message
    });
    dataString.push({
	       name: "send_date", 
	       value: formatDateTimeCurrent()
	   });
    dataString.push({
        name: "status_id", 
        value:3
    }); 
    dataString.push({
        name: "list_detail_id", 
        value:"'"+list_channel_detail+"'"
    }); 
    dataString.push({
        name: "Action", 
        value: "sendschedule"
    });    
	$.ajax({
		 type:'GET',
		  url : 'Create.do',
		  dataType: 'json',
		  data: dataString,
		  success : function(source) {
			  aoFrm.mess("mess",mess.message_send); 
			  var image= document.getElementById("upload-photo-form-file_"+type).value;
				 if(image!=""){
					 var div_iframe_schedule="upload_iframe_Schedule1";
						var class_schedule="nav_contents-sent";
					         $('#upload_iframe_Schedule1').remove();
								 var iframe='<iframe id="upload_iframe_Schedule1" name="upload_iframe_Schedule1"  witdh="0px" height="0px" border="0" style="width:0; height:0; border:none;"></iframe>';
									 $("#"+type_div).append(iframe);
										//$("#upload_iframe").attr("id", "upload_iframe_Schedule1");
									 	var action_url = 'SavePhoto.do?message_id='+source+"&list_post="+"'"+list_channel_detail+"'";
										var form = document.getElementById("upload-photo-form");
										form.setAttribute('action', action_url);
										form.setAttribute('target', "upload_iframe_Schedule1");
										form.submit();
										$("#"+div_iframe_schedule).load(function () {
											  on_load_iframe(div_iframe_schedule,class_schedule);
									             
									            });
								
						
				 }
				 else
					 {
					 $("#tree-menu .nav_contents-sent a").click();
					 }
				
		  }
	});
}

	function htmlEscape(str) {
	    return String(str)
	            .replace(/&/g, '&amp;')
	            .replace(/"/g, '&quot;')
	            .replace(/'/g, '&#39;')
	            .replace(/</g, '&lt;')
	            .replace(/>/g, '&gt;');
	}

	function htmlUnescape(value){
	    return String(value)
	        .replace(/&quot;/g, '"')
	        .replace(/&#39;/g, "'")
	        .replace(/&lt;/g, '<')
	        .replace(/&gt;/g, '>')
	        .replace(/&amp;/g, '&');
	}
	function connectFberror()
	{
		//$("#tree-menu .nav_dashboard-facebook-page a").click();
		//aoFrm.mess("alert","Could not connect facebook, please try again");
		$("#dashboard_dashboard .content_right .block_content").css("opacity","1");
		$("#dashboard_dashboard .itemLoading").hide();
		return false;	
	}
	function filterMember(div_id,type){
		var dataString = [];
		dataString.push({
			name: "Action",
			value: "getmember"
		});
		$.ajax({
			  url : 'Profile.do',
			  dataType: 'json',
			  data:dataString,
			  success : function(source) {
					for(var i=0; i<source.length;i++){
						var html='<li><span><i class="icon-caret-right"></i>'+source[i].first_name+' '+source[i].last_name+'</span><div id='+source[i].user_id+' class="pull-right checked"><i class="icon-check"></i></div></li>';
						  $("#"+div_id).append(html);
					}
					var arrMemberfilter= new Array();
					 $(".teamMember .box-list.check .pull-right").click(function(e) {
						 if($(this).hasClass("checked"))
			   				{
							 $(this).find("i").attr("class","icon-check-empty");
			   					$(this).removeClass("checked");
			   					var user_id =$(this).attr("id");
			   					arrMemberfilter.push(user_id);
			   					getMessageMemberFilter(arrMemberfilter, type,div_id);
			   				}
						 else
							 {
							 $(this).find("i").attr("class","icon-check");
			   					$(this).addClass("checked");
			   					var user_id =$(this).attr("id");
			   					arrMemberfilter = arrMemberfilter.filter(function(v) { return v != user_id;});
			   					getMessageMemberFilter(arrMemberfilter, type,div_id);
							 }
				});
			  }
		  });
	}
	function filterMemberComment(div_id,type){
		var dataString = [];
		dataString.push({
			name: "Action",
			value: "getmember"
		});
		$.ajax({
			  url : 'Profile.do',
			  dataType: 'json',
			  data:dataString,
			  success : function(source) {
					for(var i=0; i<source.length;i++){
						var html='<li><span><i class="icon-caret-right"></i>'+source[i].first_name+' '+source[i].last_name+'</span><div id='+source[i].user_id+' class="pull-right checked"><i class="icon-check"></i></div></li>';
						  $("#"+div_id).append(html);
					}
					var arrMemberfilter= new Array();
					 $(".teamMember .box-list.check .pull-right").click(function(e) {
						 if($(this).hasClass("checked"))
			   				{
							 $(this).find("i").attr("class","icon-check-empty");
			   					$(this).removeClass("checked");
			   					var user_id =$(this).attr("id");
			   					arrMemberfilter.push(user_id);
			   					getMessageMemberFilterComment(arrMemberfilter, type,div_id);
			   				}
						 else
							 {
							 $(this).find("i").attr("class","icon-check");
			   					$(this).addClass("checked");
			   					var user_id =$(this).attr("id");
			   					arrMemberfilter = arrMemberfilter.filter(function(v) { return v != user_id;});
			   					getMessageMemberFilterComment(arrMemberfilter, type,div_id);
							 }
				});
			  }
		  });
	}
	function getListMember(div_id,type,task_id){
		$("#"+div_id).empty();
		var dataString = [];
		dataString.push({
			name: "Action",
			value: "getmember"
		});
		$.ajax({
			  url : 'Profile.do',
			  dataType: 'json',
			  data:dataString,
			  success : function(source) {
					for(var i=0; i<source.length;i++){
						var html='<li><span>'+source[i].first_name+' '+source[i].last_name+'</span><div id='+source[i].user_id+' email='+source[i].email+' name="'+source[i].first_name+' '+source[i].last_name+'" class="pull-right"><i class="icon-check-empty"></i></div></li>';
						  $("#"+div_id).append(html);
					}
					//var arrMemberfilter= new Array();
					 $(".teamMember .box-list.check .pull-right").click(function(e) {
						 if($(this).hasClass("checked"))
			   				{
							 
							 $(this).find("i").attr("class","icon-check-empty");
			   					$(this).removeClass("checked");
			   					//var user_id =$(this).attr("id");
			   					//var email=$(this).attr("email");
			   					//var name=$(this).attr("name");
			   					//array_member_assign = array_member_assign.filter(function(v) { return v != user_id;});
			   					//array_email_assign=array_email_assign.filter(function(v) { return v != email;});
			   					//array_name_assign=array_name_assign.filter(function(v) { return v != name;});
			   					
			   				}
						 else
							 {
							 $(this).find("i").attr("class","icon-check");
			   					$(this).addClass("checked");
			   					//var user_id =$(this).attr("id");
			   					//var email=$(this).attr("email");
			   					//var name=$(this).attr("name");
			   					//array_member_assign.push(user_id);
			   					//array_email_assign.push(email);
			   					//array_name_assign.push(name);
			   					
			   					
							 }
				});
					if(type=="1"){
						getMemberAssignTask(task_id);
					} 
			  }
		  });
	}
	function getMessageProfileFilter(arrfilter,type,div_id){
		var newData = [];
			newData.push({
		        name: "channel_detail_id", 
		        value: "'"+arrfilter+"'"
		    });
			newData.push({
		        name: "status_id", 
		        value: type
		    });    
			newData.push({
		        name: "Action", 
		        value: "filter"
		    });    
		 $.ajax({
			 type:"GET",
			  url : 'Message.do',
			  dataType: 'json',
			  data:newData,
			  success : function(data) {
				if(type==1){
					$("#contents_draft ul.timeline").empty();
				}
				else if (type==2){
					$("#contents_scheduled ul.timeline").empty();
				}
				else if (type==3){
					$("#contents_sent ul.timeline").empty();
				}
				else
					{
					$("#contents_all ul.timeline").empty();
					}
			

				var htmlGeneral;
				
				for ( var i = 0; i < data.length; i++) {
					var url_image="";
					var icon_camera="";
					if(!isNull(data[i].file_name)){
						url_image = data[i].url_image+data[i].file_name;
						icon_camera ='<a  target="_blank" href="'+url_image+'"><span title="Show image" style="cursor:pointer;color:#3B5998;margin-left:3px;"><i class="icon-picture blue channel-icon"></i></span></a>';
						}
					
					if(type==1){
						if (data[i].channel_id == 1||data[i].channel_id == 2) {
							htmlGeneral = $('<li id="'+data[i].message_id+'_'+data[i].channel_detail_id+'" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i></div><div class="content" id="'+data[i].message_id+'" ><blockquote><span id="content_draft">'+data[i].content+'</span> '+icon_camera+'</blockquote><div class="info"><span>Draft saved '+ data[i].create_date +' by</span> <span class="name"><strong>'+data[i].channel_user+'</strong></span><div  onclick="editdraft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+')" class="edit" data-toggle="modal" data-target="#connect_a_channel_Popup"><i class="icon-edit"></i></div><div id="delete_draft" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div>');	
						
								
						}else if((data[i].channel_id == 3)) {
							
								htmlGeneral = $('<li id="'+data[i].message_id+'_'+data[i].channel_detail_id+'" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i></div><div class="content" id="'+data[i].message_id+'" ><blockquote ><span id="content_draft">'+data[i].content+'</span> '+icon_camera+' </blockquote><div class="info"><span>Draft saved '+ data[i].create_date +' by</span> <span class="name"><strong>'+data[i].channel_user+'</strong></span><div  onclick="editdraft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+')" class="edit" data-toggle="modal" data-target="#connect_a_channel_Popup"><i class="icon-edit"></i></div><div id="delete_draft" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div>');
							
						}
						$("#contents_draft ul.timeline").append(htmlGeneral);
					}
					else if(type==2){
						if (data[i].channel_id == 1||data[i].channel_id == 2) {
							
							htmlGeneral = $('<li id="'+data[i].message_id+'_'+data[i].channel_detail_id+'" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i></div><div id="'+data[i].message_id+'" class="content"><blockquote><span id="content_schedule">'+data[i].content+'</span> '+icon_camera+'</blockquote><div class="info"><span class="name"><strong>'+data[i].channel_user+'</strong></span> <span>'+ data[i].send_date +'</span><div onclick="editscheduled('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+')" class="edit" data-toggle="modal" data-target="#connect_a_channel_Popup"><i class="icon-edit" title="edit"></i></div><div class="delete" onclick="delete_schedule('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" id="delete_schedule"><i class="icon-eraser" title="delete this message"></i></div>  </div>');
							
						}else if((data[i].channel_id == 3)) {
							messageid  = data[i].message_id;
							htmlGeneral = $('<li id="'+data[i].message_id+'_'+data[i].channel_detail_id+'" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i></div><div id="'+data[i].message_id+'" class="content"><blockquote><span id="content_schedule">'+data[i].content+'</span> '+icon_camera+'</blockquote><div class="info"><span class="name"><strong>'+data[i].channel_user+'</strong></span> <span>'+ data[i].send_date +'</span><div onclick="editscheduled('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+')" class="edit" data-toggle="modal" data-target="#connect_a_channel_Popup"><i class="icon-edit" title="edit"></i></div><div class="delete" onclick="delete_schedule('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" id="delete_schedule"><i class="icon-eraser" title="delete this message"></i></div>  </div>');
						}
						$("#contents_scheduled ul.timeline").append(htmlGeneral);
					}
						
					else if (type == 3){
						if (data[i].channel_id == 1||data[i].channel_id == 2) {
							htmlGeneral = $('<li id="'+data[i].message_id+'_'+data[i].channel_detail_id+'" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i></div><div class="content" id="'+data[i].message_id+'" ><blockquote><span id="content_draft">'+data[i].content+'</span> '+icon_camera+'</blockquote><div class="info"><span>Draft saved '+ data[i].create_date +' by</span> <span class="name"><strong>'+data[i].channel_user+'</strong></span></div>');	
						
								
						}else if((data[i].channel_id == 3)) {
							
								htmlGeneral = $('<li id="'+data[i].message_id+'_'+data[i].channel_detail_id+'" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i></div><div class="content" id="'+data[i].message_id+'" ><blockquote ><span id="content_draft">'+data[i].content+'</span> '+icon_camera+' </blockquote><div class="info"><span>Draft saved '+ data[i].create_date +' by</span> <span class="name"><strong>'+data[i].channel_user+'</strong></span></div>');
							
						}
						$("#contents_sent ul.timeline").append(htmlGeneral);
					}
					else{
						if (data[i].channel_id == 1||data[i].channel_id == 2) {
							if(data[i].status_id==1){
								htmlGeneral = $('<li id="'+data[i].message_id+'_'+data[i].channel_detail_id+'" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i><span class="label label-black">Draft</span></div><div class="content" id="'+data[i].message_id+'" ><blockquote><span id="content_draft">'+data[i].content+'</span> '+icon_camera+'</blockquote><div class="info"><span>Draft saved '+ data[i].create_date +' by</span> <span class="name"><strong>'+data[i].channel_user+'</strong></span><div  onclick="editdraft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+')" class="edit" data-toggle="modal" data-target="#connect_a_channel_Popup_Draft"><i class="icon-edit"></i></div><div id="delete_draft" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div>');				
							}
							else if(data[i].status_id==2)
								{
								htmlGeneral = $('<li id="'+data[i].message_id+'_'+data[i].channel_detail_id+'" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i><span class="label label-green">Schedule</span></div><div id="'+data[i].message_id+'" class="content"><blockquote><span id="content_schedule">'+data[i].content+'</span> '+icon_camera+'</blockquote><div class="info"><span class="name"><strong>'+data[i].channel_user+'</strong></span> <span>'+ data[i].send_date +'</span><div onclick="editscheduled('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+')" class="edit" data-toggle="modal" data-target="#connect_a_channel_Popup_Schedule"><i class="icon-edit"></i></div> <div id="delete_schedule" onclick="delete_schedule('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div>');
								}
							else
							{
								htmlGeneral = $('<li id="'+data[i].message_id+'_'+data[i].channel_detail_id+'" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i><span class="label label-blue">Send</span></div><div id="'+data[i].message_id+'" class="content"><blockquote><span id="content_draft">'+data[i].content+'</span> '+icon_camera+'</blockquote><div class="info"><span class="name"><strong>'+data[i].channel_user+'</strong></span> <span>'+ data[i].send_date +'</span> </div>');
								}	
							
								
						}else if((data[i].channel_id == 3)) {
							if(data[i].status_id==1){
								htmlGeneral = $('<li id="'+data[i].message_id+'_'+data[i].channel_detail_id+'" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i><span class="label label-black">Draft</span></div><div class="content" id="'+data[i].message_id+'" ><blockquote>'+data[i].content+'</blockquote><div class="info"><span>Draft saved '+ data[i].create_date +' by</span> <span class="name"><strong>'+data[i].channel_user+'</strong></span><div  onclick="editdraft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+')" class="edit" data-toggle="modal" data-target="#connect_a_channel_Popup_Draft"><i class="icon-edit"></i></div><div id="delete_draft" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div>');
							}
							else if(data[i].status_id==2)
								{
								htmlGeneral = $('<li id="'+data[i].message_id+'_'+data[i].channel_detail_id+'" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i><span class="label label-green">Schedule</span></div><div id="'+data[i].message_id+'" class="content"><blockquote>'+data[i].content+'</blockquote><div class="info"><span class="name"><strong>'+data[i].channel_user+'</strong></span> <span>'+ data[i].send_date +'</span><div onclick="editscheduled('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+')" class="edit" data-toggle="modal" data-target="#connect_a_channel_Popup_Schedule"><i class="icon-edit"></i></div><div id="delete_schedule" onclick="delete_schedule('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div>  </div>');
								}
							else 
							{
								htmlGeneral = $('<li id="'+data[i].message_id+'_'+data[i].channel_detail_id+'" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i><span class="label label-blue">Send</span></div><div id="'+data[i].message_id+'" class="content"><blockquote>'+data[i].content+'</blockquote><div class="info"><span class="name"><strong>'+data[i].channel_user+'</strong></span> <span>'+ data[i].send_date +'</span>  </div>');
								}
							
						}
						$("#contents_all ul.timeline").append(htmlGeneral);
						
						}
					
					
				}
				checkEmptyChannelContentProfile(".container-fluid");
				$("#"+div_id +" ul.timeline").fadeOut();	
				
			  }
		 });
	}
	function getMessageProfileFilterComment(arrfilter,type,div_id){
		var newData = [];
			newData.push({
		        name: "channel_detail_id", 
		        value: "'"+arrfilter+"'"
		    });
			newData.push({
		        name: "status_id", 
		        value: type
		    });    
			newData.push({
		        name: "Action", 
		        value: "filter_comment"
		    });    
		 $.ajax({
			 type:"GET",
			  url : 'Message.do',
			  dataType: 'json',
			  data:newData,
			  success : function(data) {
				if(type==1){
					getCommentOfPost(1);
					$("#contents_draft_comment ul.timeline").empty();
				}
				else if (type==2){
					getCommentOfPost(2);
					$("#contents_scheduled_comment ul.timeline").empty();
				}
				else if (type==3){
					getCommentOfPost(3)
					$("#contents_sent_comment ul.timeline").empty();
				}
				else
					{
					getCommentOfPost(1);
					getCommentOfPost(2);
					getCommentOfPost(3);
					$("#contents_all_comment ul.timeline").empty();
					}
			

				var htmlGeneral;
				
				for ( var i = 0; i < data.length; i++) {
					var url_image="";
					var icon_camera="";
					if(type==1){
						if (data[i].channel_id == 2) {
							htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i></div><div class="content"  ><blockquote><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span> '+icon_camera+' </blockquote><div class="info"><span class="infor_cm">Draft saved '+ data[i].create_date +' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div id="delete_draft" style="display:none" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div></div><div id="show_comment_draft'+data[i].message_id+'" class="block-comment"></div></li>');
							
						}else if((data[i].channel_id == 3)) {
							htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i></div><div class="content" ><blockquote ><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span>  '+icon_camera+' </blockquote><div class="info"><span class="infor_cm" >Draft saved '+ data[i].create_date+' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div id="delete_draft" style="display:none" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div></div><div id="show_comment_draft'+data[i].message_id+'" class="block-comment"></div></li>');
						}
						$("#contents_draft_comment ul.timeline").append(htmlGeneral);
					}
					else if(type==2){
						if (data[i].channel_id == 2) {
							htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i></div><div class="content"  ><blockquote><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span> '+icon_camera+' </blockquote><div class="info"><span class="infor_cm">Draft saved '+ data[i].create_date +' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div id="delete_draft" style="display:none" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div></div><div id="show_comment_schedule'+data[i].message_id+'" class="block-comment"></div></li>');
							
						}else if((data[i].channel_id == 3)) {
							htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i></div><div class="content" ><blockquote ><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span>  '+icon_camera+' </blockquote><div class="info"><span class="infor_cm" >Draft saved '+ data[i].create_date+' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div id="delete_draft" style="display:none" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div></div><div id="show_comment_schedule'+data[i].message_id+'" class="block-comment"></div></li>');
						}
						$("#contents_scheduled_comment ul.timeline").append(htmlGeneral);
					}
						
					else if (type == 3){
						if (data[i].channel_id == 2) {
							htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i></div><div class="content"  ><blockquote><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span> '+icon_camera+' </blockquote><div class="info"><span class="infor_cm">Draft saved '+ data[i].create_date +' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div id="delete_draft" style="display:none" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div></div><div id="show_comment_sent'+data[i].message_id+'" class="block-comment"></div></li>');
							
						}else if((data[i].channel_id == 3)) {
							htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i></div><div class="content" ><blockquote ><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span>  '+icon_camera+' </blockquote><div class="info"><span class="infor_cm" >Draft saved '+ data[i].create_date+' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div id="delete_draft" style="display:none" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div></div><div id="show_comment_sent'+data[i].message_id+'" class="block-comment"></div></li>');
						}
						$("#contents_sent_comment ul.timeline").append(htmlGeneral);
					}
					else{
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
						$("#contents_all_comment ul.timeline").append(htmlGeneral);
						
						}
					
					
				}
				checkEmptyChannelContentProfile(".container-fluid");
				$("#"+div_id +" ul.timeline").fadeOut();	
				
			  }
		 });
	}
	function getMessageMemberFilterComment(arrayMember,type,div_id){
		var newData = [];
		newData.push({
	        name: "user_id_list", 
	        value: "'"+arrayMember+"'"
	    });
		newData.push({
	        name: "status_id", 
	        value: type
	    });    
		newData.push({
	        name: "Action", 
	        value: "filtermembercomment"
	    });    
	 $.ajax({
		 type:"GET",
		  url : 'Message.do',
		  dataType: 'json',
		  data:newData,
		  success : function(data) {
			  
			if(type==1){
				getCommentOfPost(1);
				$("#contents_draft_comment ul.timeline").empty();
			}
			else if (type==2){
				getCommentOfPost(2);
				$("#contents_scheduled_comment ul.timeline").empty();
			}
			else if (type==3){
				getCommentOfPost(3);
				$("#contents_sent_comment ul.timeline").empty();
			}
			else
				{
				getCommentOfPost(1);
				getCommentOfPost(2);
				getCommentOfPost(3);
				$("#contents_all_comment ul.timeline").empty();
				}
		

			var htmlGeneral;
			
			for ( var i = 0; i < data.length; i++) {
				var url_image="";
				var icon_camera="";
				if(type==1){
					if (data[i].channel_id == 2) {
						htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i></div><div class="content"  ><blockquote><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span> '+icon_camera+' </blockquote><div class="info"><span class="infor_cm">Draft saved '+ data[i].create_date +' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div id="delete_draft" style="display:none" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div></div><div id="show_comment_draft'+data[i].message_id+'" class="block-comment"></div></li>');
						
					}else if((data[i].channel_id == 3)) {
						htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i></div><div class="content" ><blockquote ><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span>  '+icon_camera+' </blockquote><div class="info"><span class="infor_cm" >Draft saved '+ data[i].create_date+' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div id="delete_draft" style="display:none" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div></div><div id="show_comment_draft'+data[i].message_id+'" class="block-comment"></div></li>');
					}
					$("#contents_draft_comment ul.timeline").append(htmlGeneral);
				}
				else if(type==2){
					if (data[i].channel_id == 2) {
						htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i></div><div class="content"  ><blockquote><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span> '+icon_camera+' </blockquote><div class="info"><span class="infor_cm">Draft saved '+ data[i].create_date +' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div id="delete_draft" style="display:none" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div></div><div id="show_comment_schedule'+data[i].message_id+'" class="block-comment"></div></li>');
						
					}else if((data[i].channel_id == 3)) {
						htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i></div><div class="content" ><blockquote ><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span>  '+icon_camera+' </blockquote><div class="info"><span class="infor_cm" >Draft saved '+ data[i].create_date+' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div id="delete_draft" style="display:none" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div></div><div id="show_comment_schedule'+data[i].message_id+'" class="block-comment"></div></li>');
					}
					$("#contents_scheduled_comment ul.timeline").append(htmlGeneral);
				}
					
				else if (type == 3){
					if (data[i].channel_id == 2) {
						htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i></div><div class="content"  ><blockquote><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span> '+icon_camera+' </blockquote><div class="info"><span class="infor_cm">Draft saved '+data[i].create_date +' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div id="delete_draft" style="display:none" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div></div><div id="show_comment_sent'+data[i].message_id+'" class="block-comment"></div></li>');
						
					}else if((data[i].channel_id == 3)) {
						htmlGeneral = $('<li id="'+data[i].message_id+'" time_post="'+data[i].time_post+'" style="cursor:pointer" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i></div><div class="content" ><blockquote ><span id="content_draft">'+replaceURLWithHTMLLinks(data[i].content)+'</span>  '+icon_camera+' </blockquote><div class="info"><span class="infor_cm" >Draft saved '+ data[i].create_date+' by</span> <span class="name" title="'+data[i].channel_user+'"><strong>'+limitString(data[i].channel_user)+'</strong></span><div id="delete_draft" style="display:none" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div></div><div id="show_comment_sent'+data[i].message_id+'" class="block-comment"></div></li>');
					}
					$("#contents_sent_comment ul.timeline").append(htmlGeneral);
				}
				else{
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
					$("#contents_all_comment ul.timeline").append(htmlGeneral);
					
					}
				
				
			}
			$("#"+div_id +" ul.timeline").fadeOut();	
			checkEmptyChannelContentProfile(".container-fluid");
		  }
	 });
	}
	function getMessageMemberFilter(arrayMember,type,div_id){
		var newData = [];
		newData.push({
	        name: "user_id_list", 
	        value: "'"+arrayMember+"'"
	    });
		newData.push({
	        name: "status_id", 
	        value: type
	    });    
		newData.push({
	        name: "Action", 
	        value: "filtermember"
	    });    
	 $.ajax({
		 type:"GET",
		  url : 'Message.do',
		  dataType: 'json',
		  data:newData,
		  success : function(data) {
			if(type==1){
				$("#contents_draft ul.timeline").empty();
			}
			else if (type==2){
				$("#contents_scheduled ul.timeline").empty();
			}
			else if (type==3){
				$("#contents_sent ul.timeline").empty();
			}
			else
				{
				$("#contents_all ul.timeline").empty();
				}
		

			var htmlGeneral;
			
			for ( var i = 0; i < data.length; i++) {
				var url_image="";
				var icon_camera="";
				if(!isNull(data[i].file_name)){
					url_image = data[i].url_image+data[i].file_name;
					icon_camera ='<a  target="_blank" href="'+url_image+'"><span title="Show image" style="cursor:pointer;color:#3B5998;margin-left:3px;"><i class="icon-picture blue channel-icon"></i></span></a>';
					}
				
				if(type==1){
					if (data[i].channel_id == 1||data[i].channel_id == 2) {
						htmlGeneral = $('<li id="'+data[i].message_id+'_'+data[i].channel_detail_id+'" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i></div><div class="content" id="'+data[i].message_id+'" ><blockquote><span id="content_draft">'+data[i].content+'</span> '+icon_camera+'</blockquote><div class="info"><span>Draft saved '+ data[i].create_date +' by</span> <span class="name"><strong>'+data[i].channel_user+'</strong></span><div  onclick="editdraft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+')" class="edit" data-toggle="modal" data-target="#connect_a_channel_Popup"><i class="icon-edit"></i></div><div id="delete_draft" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div>');	
					
							
					}else if((data[i].channel_id == 3)) {
						
							htmlGeneral = $('<li id="'+data[i].message_id+'_'+data[i].channel_detail_id+'" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i></div><div class="content" id="'+data[i].message_id+'" ><blockquote ><span id="content_draft">'+data[i].content+'</span> '+icon_camera+' </blockquote><div class="info"><span>Draft saved '+ data[i].create_date +' by</span> <span class="name"><strong>'+data[i].channel_user+'</strong></span><div  onclick="editdraft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+')" class="edit" data-toggle="modal" data-target="#connect_a_channel_Popup"><i class="icon-edit"></i></div><div id="delete_draft" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div>');
						
					}
					$("#contents_draft ul.timeline").append(htmlGeneral);
				}
				else if(type==2){
					if (data[i].channel_id == 1||data[i].channel_id == 2) {
						
						htmlGeneral = $('<li id="'+data[i].message_id+'_'+data[i].channel_detail_id+'" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i></div><div id="'+data[i].message_id+'" class="content"><blockquote><span id="content_schedule">'+data[i].content+'</span> '+icon_camera+'</blockquote><div class="info"><span class="name"><strong>'+data[i].channel_user+'</strong></span> <span>'+ data[i].send_date +'</span><div onclick="editscheduled('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+')" class="edit" data-toggle="modal" data-target="#connect_a_channel_Popup"><i class="icon-edit" title="edit"></i></div><div class="delete" onclick="delete_schedule('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" id="delete_schedule"><i class="icon-eraser" title="delete this message"></i></div>  </div>');
						
					}else if((data[i].channel_id == 3)) {
						messageid  = data[i].message_id;
						htmlGeneral = $('<li id="'+data[i].message_id+'_'+data[i].channel_detail_id+'" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i></div><div id="'+data[i].message_id+'" class="content"><blockquote><span id="content_schedule">'+data[i].content+'</span> '+icon_camera+'</blockquote><div class="info"><span class="name"><strong>'+data[i].channel_user+'</strong></span> <span>'+ data[i].send_date +'</span><div onclick="editscheduled('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+')" class="edit" data-toggle="modal" data-target="#connect_a_channel_Popup"><i class="icon-edit" title="edit"></i></div><div class="delete" onclick="delete_schedule('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" id="delete_schedule"><i class="icon-eraser" title="delete this message"></i></div>  </div>');
					}
					$("#contents_scheduled ul.timeline").append(htmlGeneral);
				}
					
				else if (type == 3){
					if (data[i].channel_id == 1||data[i].channel_id == 2) {
						htmlGeneral = $('<li id="'+data[i].message_id+'_'+data[i].channel_detail_id+'" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i></div><div class="content" id="'+data[i].message_id+'" ><blockquote><span id="content_draft">'+data[i].content+'</span> '+icon_camera+'</blockquote><div class="info"><span>Draft saved '+ data[i].create_date +' by</span> <span class="name"><strong>'+data[i].channel_user+'</strong></span></div>');	
					
							
					}else if((data[i].channel_id == 3)) {
						
							htmlGeneral = $('<li id="'+data[i].message_id+'_'+data[i].channel_detail_id+'" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i></div><div class="content" id="'+data[i].message_id+'" ><blockquote ><span id="content_draft">'+data[i].content+'</span> '+icon_camera+' </blockquote><div class="info"><span>Draft saved '+ data[i].create_date +' by</span> <span class="name"><strong>'+data[i].channel_user+'</strong></span></div>');
						
					}
					$("#contents_sent ul.timeline").append(htmlGeneral);
				}
				else{
					if (data[i].channel_id == 1||data[i].channel_id == 2) {
						if(data[i].status_id==1){
							htmlGeneral = $('<li id="'+data[i].message_id+'_'+data[i].channel_detail_id+'" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i><span class="label label-black">Draft</span></div><div class="content" id="'+data[i].message_id+'" ><blockquote><span id="content_draft">'+data[i].content+'</span> '+icon_camera+'</blockquote><div class="info"><span>Draft saved '+ data[i].create_date +' by</span> <span class="name"><strong>'+data[i].channel_user+'</strong></span><div  onclick="editdraft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+')" class="edit" data-toggle="modal" data-target="#connect_a_channel_Popup_Draft"><i class="icon-edit"></i></div><div id="delete_draft" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div>');				
						}
						else if(data[i].status_id==2)
							{
							htmlGeneral = $('<li id="'+data[i].message_id+'_'+data[i].channel_detail_id+'" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i><span class="label label-green">Schedule</span></div><div id="'+data[i].message_id+'" class="content"><blockquote><span id="content_schedule">'+data[i].content+'</span> '+icon_camera+'</blockquote><div class="info"><span class="name"><strong>'+data[i].channel_user+'</strong></span> <span>'+ data[i].send_date +'</span><div onclick="editscheduled('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+')" class="edit" data-toggle="modal" data-target="#connect_a_channel_Popup_Schedule"><i class="icon-edit"></i></div> <div id="delete_schedule" onclick="delete_schedule('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div>');
							}
						else
						{
							htmlGeneral = $('<li id="'+data[i].message_id+'_'+data[i].channel_detail_id+'" class="arrow-box-left gray facebook" chanel-type="facebook"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i><span class="label label-blue">Send</span></div><div id="'+data[i].message_id+'" class="content"><blockquote><span id="content_draft">'+data[i].content+'</span> '+icon_camera+'</blockquote><div class="info"><span class="name"><strong>'+data[i].channel_user+'</strong></span> <span>'+ data[i].send_date +'</span> </div>');
							}	
						
							
					}else if((data[i].channel_id == 3)) {
						if(data[i].status_id==1){
							htmlGeneral = $('<li id="'+data[i].message_id+'_'+data[i].channel_detail_id+'" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i><span class="label label-black">Draft</span></div><div class="content" id="'+data[i].message_id+'" ><blockquote>'+data[i].content+'</blockquote><div class="info"><span>Draft saved '+ data[i].create_date +' by</span> <span class="name"><strong>'+data[i].channel_user+'</strong></span><div  onclick="editdraft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+')" class="edit" data-toggle="modal" data-target="#connect_a_channel_Popup_Draft"><i class="icon-edit"></i></div><div id="delete_draft" onclick="delete_draft('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div> </div>');
						}
						else if(data[i].status_id==2)
							{
							htmlGeneral = $('<li id="'+data[i].message_id+'_'+data[i].channel_detail_id+'" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i><span class="label label-green">Schedule</span></div><div id="'+data[i].message_id+'" class="content"><blockquote>'+data[i].content+'</blockquote><div class="info"><span class="name"><strong>'+data[i].channel_user+'</strong></span> <span>'+ data[i].send_date +'</span><div onclick="editscheduled('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+')" class="edit" data-toggle="modal" data-target="#connect_a_channel_Popup_Schedule"><i class="icon-edit"></i></div><div id="delete_schedule" onclick="delete_schedule('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].message_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div>  </div>');
							}
						else 
						{
							htmlGeneral = $('<li id="'+data[i].message_id+'_'+data[i].channel_detail_id+'" class="arrow-box-left gray twitter" chanel-type="twitter"><div class="avatar"><img src='+ data[i].channel_picture +' class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i><span class="label label-blue">Send</span></div><div id="'+data[i].message_id+'" class="content"><blockquote>'+data[i].content+'</blockquote><div class="info"><span class="name"><strong>'+data[i].channel_user+'</strong></span> <span>'+ data[i].send_date +'</span>  </div>');
							}
						
					}
					$("#contents_all ul.timeline").append(htmlGeneral);
					
					}
				
				
			}
			$("#"+div_id +" ul.timeline").fadeOut();	
			checkEmptyChannelContentProfile(".container-fluid");
		  }
	 });
	}
	
	function checkEmptyChannel(div){
		var elementHtml = $(div +" #header_channel ul li").size();
	  	  if (elementHtml==0){
	  		$(div +" .content_right").append('<div class="nodata span4"><h4 text="nodata">No data</h4><p text="pleaseconnect">Please add a channel to use.</p></div>');
	  		$(div +" .content_right .block_content").css("opacity",0.3);
	  	  }else{
	  		$(div +" .content_right .nodata").empty();
	  		$(div +" .content_right .block_content").css("opacity",1);
	  	  }
	}
	
	function checkEmptyChannelAnalysis(div){
		var elementHtml = $(div +" #header_channel ul li").size();
	  	  if (elementHtml==0){
	  		$(div +" .content_right").append('<div class="nodata span4"><h4 text="nodata">No data</h4><p text="pleaseconnect">Please add a channel to use.</p></div>');
	  		$(div +" .content_right .block_content").css("opacity",0.3);
	  	  }else{
	  		$(div +" .content_right .nodata").empty();
	  		$(div +" .content_right .block_content").css("opacity",1);
	  	  }
	}
	
	function checkEmptyChannelAnalysis(div){
		var elementHtml = $(div +" #header_channel ul li").size();
	  	  if (elementHtml==0){
	  		$(div +" .content_right").append('<div class="nodata span4"><h4 text="nodata">No data</h4><p text="pleaseconnect">Please add a channel to use.</p></div>');
	  		$(div +" .content_right .block_content").css("opacity",0.3);
	  	  }else{
	  		$(div +" .content_right .nodata").empty();
	  		$(div +" .content_right .block_content").css("opacity",1);
	  	  }
	}
	
	function checkEmptyChannelMonitoring(div){
		var elementHtml = $(div +" #header_channel div.block-name").size();
	  	  if (elementHtml==0){
	  		$(div +" .box-content .span12").append('<div class="nodata span4"><h4 text="nodata">No data</h4><p text="pleaseconnect">Please add a channel to use.</p></div>');
	  		
	  	  }else{
	  		$(div +" .box-content .span12 .nodata").empty();
	  		
	  	  }
	}
	
	function checkEmptyChannelContent(div){
		$(div + " .nodata").hide();
		var elementHtml = $(div +" .chat-box li").size();
	  	  if (elementHtml==0){
	  		$(div +" #show_content").append('<div class="nodata span4"><h4 text="nodata">No data</h4><p text="pleasewritter">Please write a message.</p></div>');
	  	  }else{
	  		$(div +" #show_content .nodata").empty();
	  	  }
	}
	
	function checkEmptyChannelContentProfile(div){
		$(div + " .nodata").hide();
		var elementHtml = $(div +" .chat-box li").size();
	  	  if (elementHtml==0){
	  		$(div +" #show_content").append('<div class="nodata span4"><h4 text="nodata">No Data</h4><p text="pleasechoosechannel">No channel twitter. Please connect channel twitter to compare.</p></div>');
	  	  }else{
	  		$(div +" #show_content .nodata").empty();
	  	  }
	}
	
	function checkEmptyKeyword(div){
		$(div + " .nodata").hide();
		var elementHtml = $("#list_brand_keyword li").size();
	  	  if (elementHtml==0){
	  		$(div).append('<div class="nodata span4"><h4 text="nokeyword">No Keyword</h4><p text="pleaseaddkeyword">Please add a keyword to search.</p></div>');
	  		$(div + " .itemLoading").hide();
	  	  }else{
	  		$(div+ " .nodata").empty();
	  	  }
	}
	
	function checkNodataKeyword(div,reponse,message){
		$(div + " .nodata").hide();
	  	  if (reponse.length==0){
	  		$(div).append('<div class="nodata span4"><h4 text="nodata">No data</h4><p text="nodatasearch">'+message+'</p></div>');
	  		$(div + " .itemLoading").hide();
	  	  }else{
	  		$(div+ " .nodata").hide();
	  	  }
	}
	
	function numberWithCommas(x) {
	    var parts = x.toString().split(".");
	    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	    return parts.join(".");
	}
	function formatDayRange(array_date_format){
		//alert(array_date_format.length)
		var array_date= new Array();
		if(array_date_format.length>14){
			var date_size=0;
			if(array_date_format.length%14==0){
				date_size=array_date_format.length-1;
			}
			else
				{
				date_size=array_date_format.length;
				}
			var date_number_du= parseInt(date_size%14);
			var date_number= parseInt(date_size/14);
			//alert(date_number_du)
			var number=-date_number;
			var numtemp= date_number-date_number_du;
			for(var i=0; i<date_size; i++){
			if(array_date.length<date_number_du && array_date.length<14){
				if(i>0){
					number=number+date_number+1;
					array_date.push(array_date_format[number]);
				}
				else
					{
					number=number+date_number;
					array_date.push(array_date_format[number]);
					}
				
			}
			else 
				{
				if(array_date.length<=14){
					number=number+date_number;
					array_date.push(array_date_format[number]);
				}
				
				}
					
			}
		}
		else
			{
			array_date=array_date_format;
			}
		
		return array_date;
	}
	
	function getDayString(str){
		var day = '';
		day = str.split("/");
		return day[1];
	}
	
	function updateLoadData(channel_detail_id,value){
		
		var newData = [];
		newData.push({
	        name: "channel_detail_id", 
	        value: channel_detail_id
	    });
		newData.push({
	        name: "load_option", 
	        value: value
	    });    
		newData.push({
	        name: "Action", 
	        value: "updateload"
	    });    
	 $.ajax({
		 type:"POST",
		  url : 'ConnectChannel.do',
		  dataType: 'text',
		  data:newData,
		  success : function(data) {
			  
			  }
		  });
	}
	
	function limitString(str){
		var newStr ='';
		if (str.length > 20){
			newStr = str.substring(0,20) + "...";
		}else{
			newStr = str;
		}
		return newStr;
	}
function showErrorTwitter(response){
	if(response.errors[0].code==32){
		aoFrm.mess("alert","Could not authenticate you. Please connect channel again.");
	}
	else
		{
		aoFrm.mess("alert","An unknown error occurred. Please connect channel again.");
		}
	return;
}	

function appendCreateTask(type_task,task_id,message,avatar_task,create_at,name,time_post,type_social){
	aoFrm.reloadLang("#aoFrm-content");
	var type_task = type_task;
	$("#create_task_from_page_"+type_social).empty();
	if(type_social=="1"){
		$("#monitoring_facebook_page").hide();
	}
	else if(type_social=="2"){
		$("#monitoring_facebook_profile").hide();
	}
	else
		{
		$("#monitoring_twitter").hide();
		//monitoring_twitter
		}
	
	$("#create_task_from_page_"+type_social).show();
	array_member_assign=[];
	array_email_assign=[];
	array_name_assign=[];
	array_remove_assign=[];
	var html_create_task='<div id="new_task"><div class="box-content" style="padding-bottom:10px" ><a id="task_general" href="javascript:void(0)" type="0" class="btn btn-blue"><i class="icon-pushpin icon-text"></i><span text="task_general">General</span></a><a id="task_sale" href="javascript:void(0)" type="1" class="btn btn-blue" ><i class="icon-bullhorn icon-text"></i><span text="task_sale">Sales Lead</span></a><a id="task_support" href="javascript:void(0)" type="2" class="btn btn-blue"><i class="icon-phone-sign icon-text"></i><span text="task_support">Support</span></a></div>'
		+' <div class="container-fluid" id="contents_create_task">'
	    +' <div class="row-fluid">'
	      +' <div class="span8" id="show_content">'
	       +' <ul id="show_draft" class="chat-box timeline">'
	        +' <li  class="arrow-box-left gray facebook" chanel-type="facebook">'
	              +' <div class="avatar">'
	              +' <img class="avatar-small" src="'+avatar_task+'">'
	              +' <i class="icon-facebook-sign blue channel-icon"></i>'
	              +' </div>'
	              +' <div id="'+task_id+'" class="content">'
	              +' <div class="block-name"><span class="name"><strong class="indent">'+name+'</strong></span>'
	              
	              +' <blockquote><span id="content_new_task">'+message+'</span></blockquote>'
	              +' <div class="info"><span>'+create_at+'</span></div>'
	              +' </div>'
	              +' </li>'
	              +' </ul>'
	              +'  <form data-validate="parsley"><div class="box-content comment-task"><textarea style="width:99%;height:60px" rows="4"  placeholder="Write a comment..." data-required="true" data-maxlength="5000" class="area_01 parsley-validated" id="comment_create_task"></textarea> </div><div class="row-fluid"> <div  class="alR btGroup fR span10">'
	              +' <span id="span_bottom" priority="0"><i class="icon-check-empty" ></i><span class="priority-text" text="hight_priority">Hight Priority</span></span><button type="button" id="btn_cancel"  class="btn btn-blue" title="Cancel"><span text="cancel">Cancel</span></button><button type="button" id="btn_save_task"  class="btn btn-inverse" title="Save Task"><i class="icon-save"></i> <span text="save_task">Save</span></button></div> </div></form>'
	              +' </div>'
	              +' <div class="span4">'
	              +'  <div class="box teamMember" id="teamMember_draft">'
	              +'  <div class="box-header"> <span class="title" text="assign_member">Assign to Member</span></div>'
	              +' <div class="box-content scrollable" >'
	              +' <ul class="box-list check" id="assign_member_list">'
	              
	               +' </ul>'
	               +' </div>'
	               +' </div>'
	               +' </div>'
	               +' </div>'
	               +' </div>'
	               +' </div>'
	        // alert(html_create_task)
	$("#create_task_from_page_"+type_social).append(html_create_task)
	if(type_task=="0"){
		$("#task_general").addClass("active");
	}
	else if(type_task=="1"){
		$("#task_sale").addClass("active");
	}
	else
		{
		$("#task_support").addClass("active");
		}
					$("#span_bottom").click(function(e) {
						 if($(this).hasClass("checked"))
			   				{
							 $(this).find("i").attr("class","icon-check-empty");
			   					$(this).removeClass("checked");
			   					$(this).attr("priority",0);
			   				}
						 else
							 {
							
							 $(this).find("i").attr("class","icon-check");
			   					$(this).addClass("checked");
			   					$(this).attr("priority",1);
							 }
						 
						});
					
	$("#new_task .box-content a").click(function(){
		$("#new_task .box-content").find("a").removeClass("active");
		$(this).addClass("active");
		var type= $(this).attr("type");
		type_task=type;
		
	});
	getListMember('assign_member_list',0,task_id);
	$("#btn_save_task").click(function(){
		var message_comment =$("#comment_create_task").val();
		var priority= $("#span_bottom").attr("priority");
		//alert(name)
		$("#assign_member_list li").find("div").each(function(i, ob) {
			if($(ob).hasClass("checked")){
				array_member_assign.push($(ob).attr("id"));
				array_email_assign.push($(ob).attr("email"));
				array_name_assign.push($(ob).attr("name"));
			}

		});
		saveTask(type_task,task_id,message,avatar_task,name,time_post,priority,message_comment,type_social);
		
	});
	$("#btn_cancel").click(function(){
		$("#create_task_from_page_"+type_social).hide();
		if(type_social=="1"){
			$("#monitoring_facebook_page").show();
		}
		else if(type_social=="2"){
			$("#monitoring_facebook_profile").show();
		}
		else
			{
			$("#monitoring_twitter").show();
			//monitoring_twitter
			}
	});
}
function saveTask(type_task,task_id,message,avatar_task,name,time_post,priority,message_comment,type_social){
	var dataString = [];
	var create_date= new Date();
	dataString.push({
		name: "type_task",
		value: type_task
	});
	dataString.push({
		name: "task_id",
		value: task_id
	});
	dataString.push({
		name: "type_social",
		value: type_social
	});
	dataString.push({
		name: "message",
		value: message
	});
	dataString.push({
		name: "avatar_task",
		value: avatar_task
	});
	dataString.push({
		name: "create_date",
		value: formatDateTimeCurrent()
	});
	dataString.push({
		name: "name",
		value: name
	});
	dataString.push({
		name: "time_post",
		value: time_post
	});
	dataString.push({
        name: "array_member_assign", 
        value: "'"+array_member_assign+"'"
    });
	dataString.push({
        name: "array_email_assign", 
        value: "'"+array_email_assign+"'"
    });
	dataString.push({
        name: "array_name_assign", 
        value: "'"+array_name_assign+"'"
    });
	//array_name_assign
	dataString.push({
		name: "priority",
		value: priority
	});
	dataString.push({
		name: "message_comment",
		value: message_comment
	});
	//array_email_assign
	dataString.push({
		name: "Action",
		value: "savetask"
	});
	$.ajax({
		 type:'POST',
		  url : 'Task.do',
		  dataType: 'json',
		  data:dataString,
		  success : function(source) {
			  if(source==1){
				  aoFrm.mess("mess",mess.message_save_task); 
				  $("#tree-menu .nav_task-task-open a").click();
			  }
			 
			}
		  
	  });
}
	
	
function appendEditTask(type_task,task_id,task_name,avatar_task,create_at,name,priority,status){
	var type_task = type_task;
	$("#edit_task_from_task").empty();
	
	$("#content_list_tasks").hide();
	$("#edit_task_from_task").show();
	array_member_assign=[];
	array_email_assign=[];
	array_name_assign=[];
	array_remove_assign=[];
	var html_create_task='<div id="edit_task"><div class="box-content" style="padding-bottom:10px" ><a id="task_general" href="javascript:void(0)" type="0" class="btn btn-blue" text="task_general" ><i class="icon-pushpin icon-text"></i>General</a><a id="task_sale" href="javascript:void(0)" type="1" class="btn btn-blue" ><i class="icon-bullhorn icon-text" text="task_sale"></i>Sales Lead</a><a id="task_support" href="javascript:void(0)" type="2" class="btn btn-blue" text="task_support" ><i class="icon-phone-sign icon-text"></i>Support</a></div>'
		+' <div class="container-fluid" id="contents_edit_task">'
	    +' <div class="row-fluid">'
	      +' <div class="span8" id="show_content">'
	       +' <ul id="show_draft" class="chat-box timeline">'
	        +' <li  class="arrow-box-left gray facebook" chanel-type="facebook">'
	              +' <div class="avatar">'
	              +' <img class="avatar-small" src="'+avatar_task+'">'
	              +' <i class="icon-facebook-sign blue channel-icon"></i>'
	              +' </div>'
	              +' <div id="'+task_id+'" class="content">'
	              +' <div class="block-name"><span class="name"><strong class="">'+name+'</strong></span>'
	              
	              +' <blockquote><span id="content_new_task">'+task_name+'</span></blockquote>'
	              +' <div class="info"><span>'+create_at+'</span></div>'
	              +' </div>'
	              +' </li>'
	              +' </ul>'
	              
	              +' <form data-validate="parsley">'
	              +'<div  class="comment-content">'
	              +'<div class="comment-box-content"  >'
	               +'<span class="title" text="comment">Comment</span> '
	               +'<ul id="show_comment_task">'
	              
	               +'</ul>'
	               ///using show comment
	               +'</div>'
	              +' </div>'
	              +'<div class="box-content comment-task"><textarea style="width:99%;height:60px"  placeholder="Write a comment..." rows="4" data-required="true" data-maxlength="5000" class="area_01 parsley-validated" id="comment_create_task"></textarea> </div><div class="row-fluid"> <div  class="alR btGroup fR span10">'
	              +' <span id="span_bottom_complete" complete="0"><i class="icon-check-empty"></i><span class="priority-text" text="task_complete">Task Compelete</span></span>'
	              +' <span id="span_bottom" priority="0"><i class="icon-check-empty" ></i><span class="priority-text" text="hight_priority">Hight Priority</span></span><button type="button" id="btn_cancel"  class="btn btn-blue" title="Cancel"><span text="cancel">Cancel</span></button><button type="button" id="btn_update_task"  class="btn btn-inverse" title="Save Task"><i class="icon-save"></i> <span text="save_task">Save</span></button></div> </div></form>'
	              +' </div>'
	              +' <div class="span4">'
	              +'  <div class="box teamMember" id="teamMember_draft">'
	              +'  <div class="box-header"> <span class="title" text="assign_member">Assign to Member</span></div>'
	              +' <div class="box-content scrollable" >'
	              +' <ul class="box-list check" id="assign_member_list">'
	              
	               +' </ul>'
	               
	               +' </div>'
	               +' </div>'
	               +' </div>'
	               +' </div>'
	               +' </div>'
	               +' </div>'
	        // alert(html_create_task)
	$("#edit_task_from_task").append(html_create_task)
	if(type_task=="0"){
		$("#task_general").addClass("active");
	}
	else if(type_task=="1"){
		$("#task_sale").addClass("active");
	}
	else
		{
		$("#task_support").addClass("active");
		}
					$("#span_bottom").click(function(e) {
						 if($(this).hasClass("checked"))
			   				{
							 $(this).find("i").attr("class","icon-check-empty");
			   					$(this).removeClass("checked");
			   					$(this).attr("priority",0);
			   				}
						 else
							 {
							
							 $(this).find("i").attr("class","icon-check");
			   					$(this).addClass("checked");
			   					$(this).attr("priority",1);
							 }
						 
						});
					$("#span_bottom_complete").click(function(e) {
						
						 if($(this).hasClass("checked"))
			   				{
							 $(this).find("i").attr("class","icon-check-empty");
			   					$(this).removeClass("checked");
			   					$(this).attr("complete",0);
			   				}
						 else
							 {
							
							 $(this).find("i").attr("class","icon-check");
			   					$(this).addClass("checked");
			   					$(this).attr("complete",1);
							 }
						 
						});
	$("#edit_task .box-content a").click(function(){
		$("#edit_task .box-content").find("a").removeClass("active")
		$(this).addClass("active");
		var type= $(this).attr("type");
		type_task=type;
		
	});
	if(priority=="1"){
		$("#span_bottom").addClass("checked");
		$("#span_bottom i").removeClass("icon-check-empty");
		$("#span_bottom i").addClass("icon-check");
		$("#span_bottom").attr("priority",1);
		$("#contents_edit_task #"+task_id).addClass("priority");
	}
	if(status==1){
		$("#span_bottom_complete").addClass("checked");
		$("#span_bottom_complete i").removeClass("icon-check-empty");
		$("#span_bottom_complete i").addClass("icon-check");
		$("#span_bottom_complete").attr("complete",1);
	}
	getListMember('assign_member_list',1,task_id);
	getCommentofTask(task_id);
	
	$("#btn_update_task").click(function(){
		var comment_content =$("#comment_create_task").val();
		var priority= $("#span_bottom").attr("priority");
		var status=$("#span_bottom_complete").attr("complete");
		
		$("#assign_member_list li").find("div").each(function(i, ob) {
			if($(ob).hasClass("checked")){
				array_member_assign.push($(ob).attr("id"));
				array_email_assign.push($(ob).attr("email"));
				array_name_assign.push($(ob).attr("name"));
			}
			
			else
				array_remove_assign.push($(ob).attr("id"));	
		});
		updateTask(type_task,task_id,comment_content,status,priority,task_name);
		
	});
	$("#btn_cancel").click(function(){
		/*$("#create_task_from_page_"+type_social).hide();
		if(type_social=="1"){
			$("#monitoring_facebook_page").show();
		}
		else if(type_social=="2"){
			$("#monitoring_facebook_profile").show();
		}
		else
			{
			$("#monitoring_twitter").show();
			//monitoring_twitter
			}*/
		$("#content_list_tasks").show();
		$("#edit_task_from_task").hide();
	});
}	
function getCommentofTask(task_id){
	$("#show_comment_task").empty();
var dataString = [];
	
	dataString.push({
		name: "task_id",
		value: task_id
	});
	dataString.push({
		name: "Action",
		value: "getcomment"
	});
	$.ajax({
		 type:"GET",
		  url : 'CommentTask.do',
		  dataType: 'json',
		  data:dataString,
		  success : function(data) {
			  getNodeComment(task_id);
				for ( var i = 0; i < data.length; i++) {
					var comment_content="";
						comment_content=data[i].comment_content;
				
					var html_comment='<li class="list-content-comment"><span class="name"><strong>'+data[i].profile_name+'</strong></span><span >'+comment_content+' </span><p><span id="'+data[i].comment_id+'">'+data[i].task_history+'</span> | ' +data[i].create_date+'</p> </li>';
                     $("#show_comment_task").append(html_comment);
				}
				
		  }
	});
}
function getMemberAssignTask(task_id){
	var dataString = [];
	
	dataString.push({
		name: "task_id",
		value: task_id
	});
	dataString.push({
		name: "Action",
		value: "getmemberassign"
	});
	$.ajax({
		 type:"GET",
		  url : 'TaskPerson.do',
		  dataType: 'json',
		  data:dataString,
		  success : function(data) {
				for ( var i = 0; i < data.length; i++) {
					 $("#assign_member_list #"+data[i].user_id).addClass("checked");
					 $("#assign_member_list #"+data[i].user_id +" i").removeClass("icon-check-empty");
					 $("#assign_member_list #"+data[i].user_id +" i").addClass("icon-check");
				}
		  }
	});
}
function getNodeComment(task_id){
	
	obj_profile_name={};
	var array_comment_by=new Array();
	$("#show_comment_task").empty();
	var dataString = [];
		
		dataString.push({
			name: "task_id",
			value: task_id
		});
		dataString.push({
			name: "Action",
			value: "getnodecomment"
		});
		$.ajax({
			 type:"GET",
			  url : 'CommentTask.do',
			  dataType: 'json',
			  data:dataString,
			  success : function(data) {
					for ( var i = 0; i < data.length; i++) {
						this.comment_id =data[i].comment_id;
						var id=this['comment_id'];
						 
						if (isNull(obj_profile_name[id])){
							obj_profile_name[id] = data[i].profile_name;
							
							}
						else
							{
							obj_profile_name[id]=obj_profile_name[id]+","+data[i].profile_name;
							}
			  }
					var array_profile_name = converObjectToArray(obj_profile_name);
					for(var j=0;j<array_profile_name.length;j++){
						var content_comment=$("#"+array_profile_name[j].key).html();
					    content_comment=content_comment.replace("key_list_member",'<span style="color:#3B5998">'+array_profile_name[j].value+'</span>');
					   
					    $("#show_comment_task li").find("strong").each(function(i, ob) {
						var comment_by =$(ob).html();
						
						content_comment=content_comment.replace("key_user",'<span style="color:#3B5998">'+comment_by+'</span>');
						$("#show_comment_task "+"#"+array_profile_name[j].key).html(content_comment);
					});  
					
					}
					
					
		}
		});
}

function updateTask(type_task,task_id,comment_content,status,priority,task_name){
	var dataString = [];
	var create_date= new Date();
	dataString.push({
		name: "type_task",
		value: type_task
	});
	dataString.push({
		name: "message",
		value: task_name
	});
	//task_name
	dataString.push({
		name: "task_id",
		value: task_id
	});
	dataString.push({
		name: "status",
		value: status
	});
	dataString.push({
		name: "create_date",
		value: formatDateTimeCurrent()
	});
	dataString.push({
		name: "priority",
		value: priority
	});

	dataString.push({
        name: "array_member_assign", 
        value: "'"+array_member_assign+"'"
    });
	dataString.push({
        name: "array_email_assign", 
        value: "'"+array_email_assign+"'"
    });
	dataString.push({
    name: "array_remove_assign", 
    value: "'"+array_remove_assign+"'"
});
	dataString.push({
        name: "array_name_assign", 
        value: "'"+array_name_assign+"'"
    });
	dataString.push({
		name: "message_comment",
		value: comment_content
	});
	dataString.push({
		name: "Action",
		value: "updatetask"
	});
	$.ajax({
		 type:'POST',
		  url : 'Task.do',
		  dataType: 'json',
		  data:dataString,
		  success : function(source) {
			 // if(source==1){
				  aoFrm.mess("mess",mess.message_update_task); 
			 // }
				  if(priority==1){
					  $("#content_list_tasks #"+task_id).attr("priority",1);
					  $("#content_list_tasks #"+task_id).addClass("priority");
				  }
				  else
					  {
					  $("#content_list_tasks #"+task_id).attr("priority",0);
					  $("#content_list_tasks #"+task_id).removeClass("priority");
					  }
			  $("#content_list_tasks").show();
				$("#edit_task_from_task").hide();
			}
		  
	  });
}


function getComentLimit1(list_task_id,div){
	var list_task_id=list_task_id.substring(1);
	//var array_comment_by=new Array();
	//$("#show_comment_task").empty();
	var dataString = [];
		
		dataString.push({
			name: "list_task_id",
			value: "'"+list_task_id+"'"
		});
		dataString.push({
			name: "Action",
			value: "getlimitcomment1"
		});
		$.ajax({
			 type:"GET",
			  url : 'CommentTask.do',
			  dataType: 'json',
			  data:dataString,
			  success : function(data) {
				  var list_comment_id="";
					for ( var i = 0; i < data.length; i++) {
						list_comment_id=list_comment_id+","+data[i].comment_id;
						$("#"+div+ " #"+data[i].task_id+" #task_assign").html(data[i].profile_name);
						var task_hsitory =data[i].task_history.replace("by key_user","");
						$("#"+div+ " #"+data[i].task_id+" #task_history").html(task_hsitory);
						$("#"+div+ " #"+data[i].task_id+" #task_history").attr("id",data[i].comment_id)
					}
					getNodeCommentLimit1(list_comment_id,div)
					}
					
					
		
		});
}
function getNodeCommentLimit1(list_comment_id,div ){
	obj_profile_name={};
	list_comment_id=list_comment_id.substring(1);
	var dataString = [];
	
	dataString.push({
		name: "list_comment_id",
		value: "'"+list_comment_id+"'"
	});
	dataString.push({
		name: "Action",
		value: "getnodecommentlimit"
	});
	$.ajax({
		 type:"GET",
		  url : 'CommentTask.do',
		  dataType: 'json',
		  data:dataString,
		  success : function(data) {
				for ( var i = 0; i < data.length; i++) {
					
					this.comment_id =data[i].comment_id;
					var id=this['comment_id'];
					 
					if (isNull(obj_profile_name[id])){
						obj_profile_name[id] = data[i].profile_name;
						
						}
					else
						{
						obj_profile_name[id]=obj_profile_name[id]+","+data[i].profile_name;
						}
					
				}
				var array_profile_name = converObjectToArray(obj_profile_name);
				for(var j=0;j<array_profile_name.length;j++){
					var content_comment=$("#"+div  +" #"+array_profile_name[j].key).html();
				    content_comment=content_comment.replace("key_list_member",'<span style="color:#3B5998">'+array_profile_name[j].value+'</span>');
				   
				  //  $("#show_comment_task li").find("strong").each(function(i, ob) {
					//var comment_by =$(ob).html();
					
					//content_comment=content_comment.replace("key_user",'<span style="color:#3B5998">'+comment_by+'</span>');
					$("#"+div+" #"+array_profile_name[j].key).html(content_comment);
				//});  
				
				}
				}
				
				
	
	});
}

function messageDetail(post_id,message,avatar_post,time_post,create_at,name,token_user,channel_detail_id,link_post,like_count,comment_count,share_count,like_of_comment,engagement,class_like,picture,link_picture,type,channel_post){
	$("#content_message_all").hide();
	$("#message_detail_"+type).show();
	$("#message_detail_"+type).empty();
	var url_profile_post= 'https://www.facebook.com/' + channel_post;
	var div="message_detail_"+type;
	var like="unlike";
	var title="";
	var avatar_comment = "https://graph.facebook.com/"+channel_detail_id+"/picture";
	if(class_like=="icon-thumbs-down"){
		like="unlike";	
		title="Unlike this post";
	}
	else
		{
		 like="like";
		 title="Like this post";
		}
	var display="none";
	if(isNull(picture)){
		display="none";
	}
	else
		{
		display="";
		}
	var html_messge='<li id="cancel_detail" class="hide_detail" style=""><span class="btnClose" style="margin-right: 5px;"><i class="icon-remove-sign"></i></span><span>Close detail</span></li></a>'
		            +'<li id="'+post_id+'" class="arrow-box-left gray facebook itemNew" chanel-type="facebook" access-token="" channel-detail-id="" fb_page="">'
		            +'<div class="avatar"><img id="avatar-post" class="avatar-small" src="'+avatar_post+'"><i class="icon-facebook-sign blue channel-icon"></i></div>'
		            +'<div class="content">'
		            +'<div class="block-name">' 
		            +'<a target="_blank" href="'+url_profile_post+'"><span class="name"><strong class="indent">'+name+'</strong></span></a><span class="timePost" time-post="'+time_post+'">'+create_at+'</span>'
		            +'</div>'
		            +'<a target="_blank" href="'+link_post+'"><blockquote class="status">'+message+'</blockquote></a>'
		            +'<div class="picture" style="display:'+display+'"><a target="_blank" href="'+link_picture+'"><img alt="" src="'+picture+'"></a></div>'
		            +'</div>'
		            +'<div class="info">'
		            +'<div class="content_share" onclick="shareContent('+"'"+post_id+"'"+');"><i class="icon-share" title="Share this post"></i></div> '
		            +'<div id="like-click" class="menuLike '+like+'" title="" style="display:"><i id="like_'+post_id+'" title="'+title+'" class="'+class_like+'"></i></div>'
		            +'<div id="delete" class="menuDelFb" title="Delete this post" onclick="deleteStatus('+"'"+post_id+"'"+','+"'"+ token_user+"'"+','+"'"+div+"'"+')" ><i class="icon-eraser"></i></div>'
		            +'<div class="block-actions"><i class="icon-thumbs-up-alt" title="Like"></i><span class="like-num">'+like_count+'</span><i class="icon-comment" title="Comment"></i><span class="comment-num">'+comment_count+'</span><i class="icon-share" title="Share"></i><span class="share-num">'+share_count+'</span><i class="icon-meh" title="Like on comment"></i><span id="comment-like-num">'+like_of_comment+'</span><i class="icon-user" title="Engagement"></i><span class="engagement-num" post-count="25" active="1010">'+engagement+'</span></div></div>'
		            +'<div class="post_comment" style=""><div class="gray facebook comment"><div class="avatar"><a target="_blank" href="'+url_profile_post+'"><img class="avatar-small" src="'+avatar_comment+'"></a></div></div>'
		            +'<div class="arrow-box-left content"><div class="block-content"><input id="txtComment" type="text" placeholder="Write a comment..."></div></div></div>'
		            +'<div id="show_comment" class="block-comment"></div>'
		            +'</li> ' ;
		           // alert(html_messge)
		            $("#message_detail_"+type).append(html_messge);
					getComment(post_id,channel_detail_id,token_user,type);
					
					$("#txtComment").keydown(function(e) {
			            if(e.keyCode==13){
			            	var name_comment=$("#monitoring_facebook_profile #user_"+channel_detail_id).attr("user_name");
			               	postComment(post_id,token_user,name_comment,avatar_comment,channel_detail_id,type);
			            	$(this).val("");
			          
						}			
			        });
					$("#"+div+ " #like-click").click(function(){							
						if(!isNull(post_id))
						{	
							if ($(this).hasClass("liked")){
								fbLike(post_id,token_user);																			
								$("#"+div+" #like_" + post_id).attr("class","icon-thumbs-down");
								$("#"+div+" #like_" + post_id).parent().removeClass("liked");
								$("#"+div+" #like_" + post_id).attr("title","Unlike");
								$("#"+div+" #like_" + post_id).parent().addClass("unlike");
								
							}else{												
								fbUnLike(post_id,token_user);
								$("#"+div+" #like_" + post_id).attr("class","icon-thumbs-up");
								$("#"+div+" #like_" + post_id).parent().removeClass("unlike");
								$("#"+div+" #like_" + post_id).attr("title","Like this post");
								$("#"+div+" #like_" + post_id).parent().addClass("liked");												
							}
						}
					});
}
 
function getComment(post_id,channel_detail_id,access_token,type){
	$("#show_comment").empty();
	FB.api({method: 'fql.multiquery',queries:{
			query1: "SELECT fromid,id ,text,time,attachment from comment where post_id='"+post_id+"' order by time desc",
			query2: "SELECT uid,name FROM user where uid in (SELECT fromid from comment where post_id='"+post_id+"')"
	},access_token:access_token
      },function(response) {
    	 
    	  for(var i=0;i<response[0].fql_result_set.length;i++){
    		  var user_id_comment="";
    		  var avatar_comment="";
    		  var time_comment="";
    		  var message="";
    		  var comment_id="";
    		  var url_comment="";
    		  var link_image_comment="";
    		  var html_image="";
    		  url_comment = 'https://www.facebook.com/' + response[0].fql_result_set[i].fromid;
    		  user_id_comment=response[0].fql_result_set[i].fromid;
    		  message=response[0].fql_result_set[i].text;
    		  time_comment=response[0].fql_result_set[i].time;
    		  var date_time=formatLongToDateGMT(time_comment*1000)
    		  comment_id=response[0].fql_result_set[i].id;
    		
    		  if(!isNull(response[0].fql_result_set[i].attachment)){
    			  link_image_comment=response[0].fql_result_set[i].attachment.media.image.src;
    			  html_image='<img src="'+link_image_comment+'" >'
    		  }
    		  avatar_comment='https://graph.facebook.com/'+response[0].fql_result_set[i].fromid+'/picture';
    		  if (channel_detail_id==user_id_comment){
					htmlGuestComment = '<div count="" class="guest-comment" user_comment="'+user_id_comment+'" post_id="'+post_id+'" id="'+comment_id+'"><div class="gray facebook comment"><div class="avatar"><a href="'+url_comment+'" target="_blank"><img src="'+avatar_comment+'" class="avatar-small"></a></div></div><div class="arrow-box-left content"><div class="block-content"><blockquote><span id="'+user_id_comment+'" class="name"><strong class="indent"> </strong></span> '+replaceURLWithHTMLLinks(message)+'</blockquote>'+html_image+'</div><div class="info"> <span class="timePost">'+date_time+'</span> </div><div id="click-like-comment" class="likeComment liked"><i class="icon-thumbs-up" id="like_comment_'+comment_id+'" title="like"></i></div><i class="icon-eraser delComment" onclick="delComment('+"'"+comment_id+"'"+','+"'"+access_token+"'"+','+"'"+type+"'"+')" title="delete this comment"></i></div></div>';
				}else{
					htmlGuestComment = '<div count="" class="guest-comment" user_comment="'+user_id_comment+'" id="'+comment_id+'"><div class="gray facebook comment"><div class="avatar"><a href="'+url_comment+'" target="_blank"><img src="'+avatar_comment+'" class="avatar-small"></a></div></div><div class="arrow-box-left content"><div class="block-content"><blockquote><span id="'+user_id_comment+'" class="name"><strong class="indent"></strong></span> '+replaceURLWithHTMLLinks(message)+'</blockquote>'+html_image+'</div><div class="info"> <span class="timePost">'+date_time+'</span> </div><div id="click-like-comment" class="likeComment liked"><i class="icon-thumbs-up" id="like_comment_'+comment_id+'" title="like"></i></div></div></div>';
				}
    		  $("#show_comment").append(htmlGuestComment);
    	  }
    	  for(var j=0;j<response[1].fql_result_set.length;j++){
    		  $("#"+response[1].fql_result_set[j].uid+ " strong").html(response[1].fql_result_set[j].name)
    	  }
      });
 
		
	clickLikeComment(type,access_token);
	checkLikeUnLikeComment(post_id,access_token,type);	
}
function postComment(post_id,access_token,user_comment,avatar_post,channel_detail_id,type){
	var url_profile_post= 'https://www.facebook.com/' + channel_detail_id;
	var strTime =new Date();
	var commentTime = formatDateGMT(strTime);
	var msg = $("#txtComment").val();
	FB.api('/'+post_id+'/comments','post',{ message: msg,access_token: access_token }, function(response) {
         if (!response || response.error) {
        	 aoFrm.mess("alert",enumerateObject(response.error));
         } else {
        	 aoFrm.mess("mess",mess.comment_post);
        	 var number_comment =$("#message_detail_"+type+" #"+post_id+" .block-actions .comment-num").html();
        		$("#content_message_all #"+post_id+" .block-actions .comment-num").html(parseInt(number_comment)+1);
        		$("#message_detail_"+type+" #"+post_id+" .block-actions .comment-num").html(parseInt(number_comment)+1);
        	 var html_comment='<div count="" class="guest-comment" user_comment="'+user_comment+'" post_id="'+post_id+'" id="'+response.id+'"><div class="gray facebook comment"><div class="avatar"><a href="'+url_profile_post+'" target="_blank"><img src="'+avatar_post+'" class="avatar-small"></a></div></div><div class="arrow-box-left content"><div class="block-content"><blockquote><span class="name"><strong class="indent">'+user_comment+'</strong></span> '+replaceURLWithHTMLLinks(msg)+'</blockquote></div><div class="info"> <span class="timePost">'+commentTime+'</span> </div><div id="click-like-comment" class="likeComment liked"><i class="icon-thumbs-up" id="like_comment_'+response.id+'" title=""></i></div><i class="icon-eraser delComment" onclick="delComment('+"'"+response.id+"'"+','+"'"+access_token+"'"+','+"'"+type+"'"+')" title="delete this comment"></i></div></div>';
        	 $("#show_comment").prepend(html_comment);
         }
    });
	
	
}

function shareContent(post_id){
	var picture = $(".timeline #" + post_id + " .content .picture img").attr("src");
	if (picture == ""){
		var str = post_id.split("_");
		window.open(
			      'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent("https://www.facebook.com/"+str[0]+"/posts/"+str[1]+""), 
			      'facebook_share_dialog', 
			      'width=626,height=436'); 
			    return false;
	}else{
		var link = $(".timeline #" + post_id + " .content .picture a").attr("href");
		window.open(
			      'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(link), 
			      'facebook_share_dialog', 
			      'width=626,height=436'); 
			    return false;
	}
	
}

function deleteStatus(post_id,access_token,div){
	FB.api('/'+post_id,'post','delete',{access_token:access_token}, function(response) {
         if (!response || response.error) {
        	 aoFrm.mess("alert",enumerateObject(response.error));
         } else {
        	 aoFrm.mess("mess",mess.message_delete);
        	 if(div!="content_message_all"){
        		 $("#content_message_all").show();
     			$("#"+div).show();
     			$("#"+div+ " #" + post_id).fadeOut();
     			$("#content_message_all #" + post_id).fadeOut();
        	 }
        	 else
        		 {
        		 $("#"+div+ " #" + post_id).fadeOut();
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

function clickLikeComment(type,access_token){
	//like comment
	$("#message_detail_"+type+" .likeComment").click(function(){
		var comment_id = $(this).parent().parent().attr("id");
		//alert(comment_id)
		//var access_token = $(this).parent().parent().parent().parent().attr("access-token");
		if(!isNull(comment_id))
		{	
			
			if ($(this).hasClass("liked")){
				likeComment(comment_id,access_token);																			
				$("#like_comment_" + comment_id).attr("class","icon-thumbs-down");
				$("#like_comment_" + comment_id).parent().removeClass("liked");
				$("#like_comment_" + comment_id).attr("title","Unlike");
				$("#like_comment_" + comment_id).parent().addClass("unlike");
				
			}else{												
				unLikeComment(comment_id,access_token);
				$("#like_comment_" + comment_id).attr("class","icon-thumbs-up");
				$("#like_comment_" + comment_id).parent().removeClass("unlike");
				$("#like_comment_" + comment_id).attr("title","Like this comment");
				$("#like_comment_" + comment_id).parent().addClass("liked");
			}
		}
	});
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

function checkLikeUnLikeComment(post_id,access_token,type){
	
	//var list_post_id=list_post_id.substring(1);
	var query = "SELECT id,fromid,user_likes from comment where post_id= '"+post_id+"'";

	FB.api({method: 'fql.query',
        query: query,access_token:access_token
      },function(response) {
    	  for(var i=0;i<response.length;i++){
    		  var _obj = $('#message_detail_'+type+ '#'+post_id +' .likeComment ');
    		 
    		  if(response[i].user_likes == true)
				{
    			 // alert(response[i].user_likes)
					$("#like_comment_"+response[i].id).attr("class","icon-thumbs-down");
					$("#like_comment_"+response[i].id).attr("title","Unlike");
					$(_obj).addClass("unlike");
					$(_obj).removeClass("liked");						
				}
			}
    	  
    	  				
      });
	
}
function delComment(comment_id,access_token,type){
	var post_id= $("#"+comment_id).attr("post_id");
	
	var number_comment =$("#message_detail_"+type+" #"+post_id+" .block-actions .comment-num").html();
	$("#content_message_all #"+post_id+" .block-actions .comment-num").html(parseInt(number_comment)-1);
	$("#message_detail_"+type+" #"+post_id+" .block-actions .comment-num").html(parseInt(number_comment)-1);
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

function on_load_iframe(div,_class) {
	var okie=$('#'+div)[0].contentWindow.document.body.innerHTML;//$('#'+div).contents().find('body').text();
	if(okie.trim()=="ok"){
		if(div=="upload_iframe_Schedule"){
			 $(".modal-header .close").click();
		}
		$("#tree-menu ."+_class+" a").click();
	}
	else
		{
		if(div=="upload_iframe_Schedule"){
			 $(".modal-header .close").click();
		}
		 aoFrm.mess("alert",mess.image_invalid);
		 $("#tree-menu ."+_class+" a").click();
		}
	}
function load_iframe_upload_excel(div,_class){
	var data=$('#'+div)[0].contentWindow.document.body.innerHTML;

	if(data.trim()==""){
		if(div=="upload_iframe_upload_Excel_Schedule"){
			 $(".modal-header .close").click();
			 aoFrm.mess("mess",mess.message_schedule);
		}
		else if(div=="upload_iframe_upload_Excel_Draft"){
			 aoFrm.mess("mess",mess.message_save); 
		}
		else
			{
			aoFrm.mess("mess",mess.message_send);
			}
		 
		$("#tree-menu ."+_class+" a").click();
	}
	
	else
		{
		var page_error=data.substring(1);
		aoFrm.mess("alert",page_error+": "+mess.message_error_page);
		//$("#tree-menu ."+_class+" a").click();
		}
	 $("#contents_create .itemLoading").remove();
	
}
function checkExprired(){
	//var exprired=$("#exprired").val();
	//alert(check_exprired);
	if(check_exprired=="1"){
		$("#group_member").click();
	}
	
}
function getDateSchedule(div_picker, date_value){
	 var currentdate="";
	 var list_date= new Array();
		var timetemp =$("#"+div_picker).val().replace(" AM",":AM").replace(" PM",":PM");
		 var time=timetemp.split(":");
		 var timefull;
		 if(time[2]=="PM"){
			 if(time[0]==12){
				 timefull= time[0]+":"+time[1]+":00"; 
			 }
			 else
				 {
				 timefull= parseInt(time[0])+12+":"+time[1]+":00";
				 }
		 }
		 else
			 {
			 if(time[0]==12){
				 timefull= "00:"+time[1]+":00";
			 }
			 else
				 {
				 timefull= timetemp.replace(":AM",":00");
				 }
			 }
		var str=$("#"+date_value).attr("value");
	 if(isNull(str)){
		 currentdate= formatDateCurrent()+" "+timefull;
		 list_date.push(currentdate);
		
	 }
	 else
		 {
		 var date_chose= $("#"+date_value).html();
		 var datetemp = date_chose.split(";");
		 for(var i=0;i<datetemp.length-1;i++){
			list_date.push(datetemp[i]+" " +timefull) ; 
		 }
		 }
	
	 return list_date;
}
function commentDetail(post_id,content,infor_cm,username,avatar,channel_type,type){
	$("#show_draft_comment").hide();
	$("#show_draft_comment_detail_"+type).show();
	$("#show_draft_comment_detail_"+type).empty();
	var class_icon="";
	if(channel_type=="twitter"){
		class_icon="icon-twitter-sign";
	}
	else if(channel_type=="facebook"){
		class_icon="icon-facebook-sign";
	}
	var div="show_draft_comment_detail_"+type;
      var html_messge='<li id="cancel_detail" class="hide_detail" style=""><span class="btnClose" style="margin-right: 5px;"><i class="icon-remove-sign"></i></span><span>Close detail</span></li></a>'
		             +'<li id="'+post_id+'" class="arrow-box-left gray twitter" chanel-type="twitter" style="cursor:pointer">' 
		             +'<div class="avatar">'
		             +'<img class="avatar-small" src="'+avatar+'">'
		             +'<i class="'+class_icon+' blue channel-icon"></i>'
		             +'</div>'
		             +'<div id="detail_'+post_id+'" class="content"><blockquote> <span id="content_draft">'+content+'</span></blockquote>'
		             +'<div class="info"><span class="infor_cm">'+infor_cm+' </span><span class="name" title="ods6"><strong>' +username+'</strong></span>'
		             +'</div></div><div id="show_comment_detail" class="block-comment"></div></li>';
		            $("#show_draft_comment_detail_"+type).append(html_messge);
					//getComment(post_id,channel_detail_id,token_user,type);
					
					
					
}
function getCommentDetail(post_id,type){
	
}
function getCommentOfPost(status){
	var newData = [];
	newData.push({
        name: "comment_from", 
        value: 1
    });
	newData.push({
        name: "status", 
        value: status
    });
	newData.push({
        name: "Action", 
        value: "commentdraft"
    });    
	 $.ajax({
		 type:"GET",
		  url : 'CommentTask.do',
		  dataType: 'json',
		  data:newData,
		  success : function(data) {
			  //alert(JSON.stringify(data))
		   var type=1;
			  var htmlGeneral;
			  if(status==1){
				  for ( var i = 0; i < data.length; i++) {
						 
					  htmlGeneral='<div count="" status="'+status+'" class="guest-comment" user_comment="" id="'+data[i].comment_id+'" ><div class="gray facebook comment"><div class="avatar"><img src="'+data[i].channel_picture+'" class="avatar-small"></div></div><div class="arrow-box-left content"><div class="block-content"><blockquote><span class="name"><strong class="indent">'+data[i].channel_user+'</span></strong></span><span id="'+data[i].comment_id+'_message"> '+replaceURLWithHTMLLinks(data[i].comment_content)+'</blockquote></div><div class="info"> <span class="timePost">'+data[i].create_date+'</span> <div id="delete_draft" onclick="delete_draft_comment('+"'"+data[i].comment_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div><div  onclick="edit_comment('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].comment_id+"'"+','+"'"+data[i].comment_content+"'"+','+"'"+data[i].post_id+"'"+','+"'"+data[i].channel_user+"'"+','+"'"+data[i].channel_id+"'"+')" class="edit" data-toggle="modal" data-target="#popup_edit_comment"><i class="icon-edit" title="edit comment"></i></div> </div></div>'
					 // alert("#show_comment_"+data[i].post_id)
					  $("#show_comment_draft"+data[i].post_id).append(htmlGeneral);
						
				  }  
			  }
			  else if(status==3){
				  for ( var i = 0; i < data.length; i++) {
						 
					  htmlGeneral='<div count="" status="'+status+'" class="guest-comment" user_comment="" id="'+data[i].comment_id+'" ><div class="gray facebook comment"><div class="avatar"><img src="'+data[i].channel_picture+'" class="avatar-small"></div></div><div class="arrow-box-left content"><div class="block-content"><blockquote><span class="name"><strong class="indent">'+data[i].channel_user+'</span></strong></span><span id="'+data[i].comment_id+'_message"> '+replaceURLWithHTMLLinks(data[i].comment_content)+'</blockquote></div><div class="info"> <span class="timePost">'+data[i].create_date+'</span>  </div></div>'
					 // alert("#show_comment_"+data[i].post_id)
					  $("#show_comment_sent"+data[i].post_id).append(htmlGeneral);
						
				  }
			  }
			  else if(status==2){
				  for ( var i = 0; i < data.length; i++) {
						 
					  htmlGeneral='<div count="" status="'+status+'" class="guest-comment" user_comment="" id="'+data[i].comment_id+'" ><div class="gray facebook comment"><div class="avatar"><img src="'+data[i].channel_picture+'" class="avatar-small"></div></div><div class="arrow-box-left content"><div class="block-content"><blockquote><span class="name"><strong class="indent">'+data[i].channel_user+'</span></strong></span><span id="'+data[i].comment_id+'_message"> '+replaceURLWithHTMLLinks(data[i].comment_content)+'</blockquote></div><div class="info"> <span class="timePost">'+data[i].create_date+'</span> <div id="delete_draft" onclick="delete_schedule_comment('+"'"+data[i].comment_id+"'"+');" class="delete"><i title="delete this message" class="icon-eraser"></i></div><div  onclick="edit_comment('+"'"+data[i].channel_detail_id+"'"+','+"'"+data[i].comment_id+"'"+','+"'"+data[i].comment_content+"'"+','+"'"+data[i].post_id+"'"+','+"'"+data[i].channel_user+"'"+','+"'"+data[i].channel_id+"'"+')" class="edit" data-toggle="modal" data-target="#popup_edit_comment"><i class="icon-edit" title="edit comment"></i></div> </div></div>'
					 // alert("#show_comment_"+data[i].post_id)
					  $("#show_comment_schedule"+data[i].post_id).append(htmlGeneral);
						
				  }  
			  }
			 
		  }
	 });
}	
function edit_comment(channel_detail_id, comment_id, message,post_id,channel_user,channel_id){
	//var text = $("#"+comment_id+" blockquote #content_draft").text();
	$("#comment_post").val(message);
	$("#comment_post").attr("comment_id",comment_id+"_"+channel_detail_id);
	$("#comment_post").attr("post_id",post_id);
	$("#comment_post").attr("channel_id",channel_id);
	$("#comment_post").attr("user_name",channel_user);
	var status=$("#"+comment_id).attr("status");
	//var chanel_type=$("#"+messageid+"_"+channel_id ).attr("chanel-type");
	if(channel_id=="1"){
		//$("#icon-social").attr("class","icon-twitter-sign blue");
		//$("#comment_post").attr("chanel-type",'twitter');
		$("#comment_post").attr("data-maxlength",'140');
	}
	else{
		//$("#icon-social").attr("class","icon-facebook-sign blue");
		//$("#comment_post").attr("chanel-type",'facebook');
		$("#comment_post").attr("data-maxlength",'5000');
	}

	$('#contentPostOther').keyup(function(){
			 var max = parseInt($(this).attr('data-maxlength'));
			 if($(this).val().length > max){
			 $(this).val($(this).val().substr(0, $(this).attr('data-maxlength'))); 
		 }
		 });
	
	if(status==2){
		getListDateSchedule(comment_id,1);
	}
}
function updateCommentToSchedule(){
	var list_date = getDateSchedule("timepicker_schedule", "date_value_schedule");
	var message=$("#comment_post").val();
	var str_cm=$("#comment_post").attr("comment_id");
	var str_cm_temp=str_cm.split("_");
	
	
	var newData = [];
	newData.push({
        name: "message", 
        value: message
    });
	newData.push({
         name: "create_date", 
         value: "'"+list_date+"'"
     }); 
	newData.push({
        name: "comment_id", 
        value: str_cm_temp[0]
    });
	
	newData.push({
        name: "Action", 
        value: "schedule"
    });    
	 $.ajax({
		 type:"GET",
		  url : 'CommentPublish.do',
		  dataType: 'text',
		  data:newData,
		  success : function(data) {
			  if(data.trim()!=""){
				  aoFrm.mess("mess",mess.message_save); 
				
				  // $("#"+str_cm_temp[0]+"_message").html(" "+message);
				  $("#tree-menu .nav_comments-scheduled a").click();
			  }
			 
		   
		  }
	 });
}