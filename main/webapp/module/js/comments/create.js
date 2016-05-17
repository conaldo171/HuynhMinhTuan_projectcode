/**
 * 
 */
var date = new Date();
var count_channel=0;
var array_content_post_comment= new Array();
var obj_comment_public = new Object();
var array_comment_public=new Array();
var currentDate = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
	var lastDate = new Date();
	var days = 1;
	var count_channel=0;
	var res = date.setTime(date.getTime() - (days * 24 * 60 * 60 * 1000));		
	var lastDate = new Date(res);
	var newDate = (lastDate.getMonth() + 1) + "/" + lastDate.getDate() + "/" + lastDate.getFullYear();
	$("#comment_create #comment_create_range").val(newDate +" to " + currentDate);
	$('#comment_create .date-range').daterangepicker({opens: 'left',
        format: 'MM/dd/yyyy',
        separator: ' to ',
        startDate: Date.today().add({
        days: -1
        }),
        endDate: Date.today(),
        minDate: Date.today().add({
            days: -60
        }),
        maxDate: '',
        locale: {
            applyLabel: 'Submit',
            fromLabel: 'From',
            toLabel: 'To',
            customRangeLabel: 'Custom Range',
            daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            firstDay: 1
     }
	});
	
	$("#datepicker_schedule").datepick({
		dateFormat : 'yy-mm-dd',
		altFormat: 'yy-mm-dd',
		minDate:0,
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
		
		$(".body-schedule .time_txt").html(e.time.value);
	});	
	$( document ).ready(function() {
		checkExprired();
		aoFrm.mess("close","close");
		getChannelPage_Twitter();
		
	});	
	

	
	$("#btn_scheduled").click(function(){
		if ($(".body-schedule").hasClass("open-scheduled")){
			$(".body-schedule").removeClass("open-scheduled");
			$(".body-schedule").addClass("close-scheduled");
		} else{
			$(".body-schedule").removeClass("close-scheduled");
			$(".body-schedule").addClass("open-scheduled");
		}
		
	});
	//btn_save_scheduled_comment
$("#btn_save_scheduled_comment").click(function(){
		
		save_Comment_Schedule();
	});
$("#btn_save_comment").click(function(){
		
		post_Comment("draft",1);
	});
	$("#btn_send_comment").click(function(){
		
		post_Comment("sent",3);
	});
	
	$(".range_inputs .btn").click(function(){
		setTimeout(function(){
			getChannelPage_Twitter();
			
		},100);
	});
	function getChannelPage_Twitter(){
		count_channel=0;
		array_content_post_comment=[];
		$("#comment_create").append('<li style="list-style: none outside none;" class="itemLoading"></li>');
		var stringDate= $("#comment_create #comment_create_range").val();
		var newString = stringDate.split("to");
  		var stringFrom = newString[0];
  		var stringTo = newString[1];
  		var newStringFrom = new Date(stringFrom);
  		var newStringTo = new Date(stringTo);
  		var dateFrom = new Date(newStringFrom);
  		var dateTo = new Date(newStringTo);
  		var newDateFrom = toTimestamp(dateFrom) + (24 * 60 * 60);
  		var newDateTo = toTimestamp(dateTo) + (24 * 60 * 60) ;

		var channel_id="2,3"
		 var dataString=[];
		 dataString.push({
            name: "channel_id", 
            value: "'"+channel_id+"'"
        });
		 dataString.push({
	            name: "Action", 
	            value: "channel_comment"
	        });
		$.ajax({
			  url : 'GetChannelDetail.do',
			  dataType: 'json',
			  data: dataString,
			  success : function(source) {
					for(var i=0; i<source.length;i++){
						var object_content = new Object();
						 if(source[i].channel_id=="2"){
						 getPostFbPage(source[i].channel_detail_id,source[i].token_user,newDateFrom,newDateTo,source.length,source[i].channel_id,source[i].channel_user)
						}
						else if(source[i].channel_id=="3"){
							
							getTweetTwitter(source[i].channel_detail_id,source[i].token_user,newDateFrom,newDateTo,source.length,source[i].channel_id)
						}
					  	 
			   		 
			   		  
					}
					
				}
		  });
	}
	function getTweetTwitter(channel_detail_id,token_user,newDateFrom,newDateTo,total_channel,type){
		var str_token= token_user.split("_");
		var newData = [];
		newData.push({
	        name: "token", 
	        value: str_token[0]
	    });
		
		newData.push({
	        name: "token_secret", 
	        value: str_token[1]
	    });    
		newData.push({
	        name: "DateFrom", 
	        value: newDateFrom
	    });
		
		newData.push({
	        name: "DateTo", 
	        value: newDateTo
	    }); 
		newData.push({
	        name: "Action", 
	        value: "gettweet"
	    }); 
	 $.ajax({
		  url : 'GetTweet.do',
		  dataType: 'json',
		  data:newData,
		  success : function(source) {
			 
			  showContentChannel(source,total_channel, type)
		  }
	 });
	}
	function getPostFbPage(channel_detail_id,token,newDateFrom,newDateTo,total_channel,type,channel_user){
		var query = 'SELECT source_id, post_id ,created_time,message,like_info,comment_info FROM stream WHERE message <> "" and created_time < '+newDateTo+' and created_time > '+newDateFrom+' and source_id = '+channel_detail_id;
		FB.api({method: 'fql.query',
	        query: query,access_token:token
	      },function(response) {
	    	  showContentChannel(response,total_channel,type,channel_user,channel_detail_id);
	      });
	}
	function showContentChannel(response,total_channel,type,channel_user,channel_detail_id){
		
		if(type=="2")
			{
			count_channel++;
			for(var i=0;i<response.length;i++){
				if(response[i].source_id==channel_detail_id){
					
					array_content_post_comment.push({"post_id":response[i].post_id,"channel_detail_id":response[i].source_id,"page_name":channel_user,"message":response[i].message, "like":response[i].like_info.like_count,"comment":response[i].comment_info.comment_count,"create_time":formatLongToDateGMT(response[i].created_time*1000),"type":2})	
				}
				
			}
			}
		else if(type=="3"){
			count_channel++;	
			for(var j=0;j<response.length;j++){
			array_content_post_comment.push({"post_id":response[j].id,"channel_detail_id":response[j].user_id,"page_name":response[j].user_tweet_name, "message":response[j].text, "like":response[j].favorite_count,"comment":0,"create_time":formatLongToDateGMT(response[j].created_at),"type":3});
			}
			}
		if(total_channel==count_channel){
			
			showDataToGrid(array_content_post_comment)
			}
	}
	function showDataToGrid(datasource){
		
		$("#comment_create .itemLoading").remove();
		var grid_width = $(".block_content").innerWidth();
		var grid = jQuery("#JqGrid_create");
		grid.clearGridData();
		grid.jqGrid({
			         
			datatype: "local",
		    mtype: 'GET',
			height: 400,
			colNames:['Id','Page Id','Page Name', 'Contents', 'Like', 'Comment', 'Date'],
			width: grid_width,
			colModel: [
			{
				name: 'post_id',
				index: 'post_id',
				sortable: false,
				editable: false,
				hidden:true,
				key:true,
				resizable:false,
				fixed:true,
				width: 1
			},
			{
				name: 'channel_detail_id',
				index: 'channel_detail_id',
				sortable: false,
				editable: false,
				
				hidden:true,
				resizable:false,
				fixed:true,
				width: 120
			},
			{
				name: 'page_name',
				index: 'page_name',
				width: 200
			},
			{
				name: 'message',
				index: 'message',
				width: 300
			},
			{
				name: 'like',
				index: 'like',
				width: 70
			},
			{
				name: 'comment',
				index: 'comment',
				width: 70
			},
			{
				name: 'create_time',
				index: 'create_time',
				width: 120
			}
			],
			multiselect: true,
			rowNum:10,
			rowList:[20,50,100],
			sortname: 'create_time',
			loadone: true,
			//viewrecords: true,
			sortorder: "desc",
			pager: '#pager_create',
			loadComplete : function(source) {
		
				
				
			},
			onSelectRow: function(id) {
				//currentIndex = id;
				//var singleRow = grid.jqGrid('getGridParam', 'selrow');
				//var prow = grid.jqGrid('getRowData', singleRow);
				//var team_id=prow.team_id;
				//loadSelectedMember(id,team_id);
				//getChannelReport(id);
			}
			});
		
		//jQuery("#list9").jqGrid('navGrid','#pager9',{add:false,del:false,edit:false,position:'right'});
		//grid.jqGrid("navGrid","#pager_create",{edit:false,add:false,del:false});
		
		grid.jqGrid('setGridParam', {data: datasource}).trigger('reloadGrid');
	}
	function export_sample_file(){
		var grid = jQuery("#JqGrid_create");
		var datarows = grid.jqGrid('getGridParam', 'selarrrow');
		if(datarows.length==0){
			aoFrm.mess("alert",mess.message_select_download);
			return false;
		}
		for(var i=0; i<datarows.length;i++){
			var prow = grid.jqGrid('getRowData', datarows[i]);
			var object_comment = new Object();
			object_comment.no=i+1;
			object_comment.post_id=prow.post_id;
			object_comment.page_id=prow.channel_detail_id;
			object_comment.page_name=prow.page_name;
			object_comment.contents=prow.message;
			//object_comment.comment="";
			array_comment_public.push(object_comment);
			//alert(prow.page_name)
		}
		obj_comment_public.comment_public=array_comment_public;
		 var str = ''+''+JSON.stringify(obj_comment_public)+''+'';
			$("#export_comment_public").val(str);
			$("#export_form_comment_public").submit();	
	}
	function post_Comment(type,status){
		
		 var excel_file= document.getElementById("uploade-excel-form-file_comment_create").value;
		 
		 if(excel_file!=""){
			 
				 commentFromExcelFile(type,status);  
			
		 }
		 else
			 {
			 saveCommentFromPostDirect(type, status);
			 
			 }
	}
	function save_Comment_Schedule(){
         var excel_file= document.getElementById("uploade-excel-form-file_comment_create").value;
      var list_date = getDateSchedule("timepicker_schedule", "date_value_schedule");
		
		// var send_date=currentdate;
		 if(excel_file!=""){
		var iframe='<iframe id="upload_iframe_upload_comment_Excel_Schedule" name="upload_iframe_upload_comment_Excel_Schedule"  witdh="0px" height="0px" border="0" style="width:0; height:0; border:none;"></iframe>';
		 $("#comment_create").append(iframe);
			//$("#upload_iframe").attr("id", "upload_iframe_Sent");
		 	var action_url = "UploadCommentExcelFile.do?Action=schedule&status=2&create_date="+"'"+list_date+"'";
			var form = document.getElementById("upload-excel-form-comment");
			form.setAttribute('action', action_url);
			form.setAttribute('target', "upload_iframe_upload_comment_Excel_Schedule");
			form.submit();
			$("#uploade-excel-form-file_comment_create").load(function () {
				//load_iframe_upload_excel_comment("upload_iframe_upload_comment_Excel","nav_comments-sent");
		    	
		           });
		 }
		 else
			 {
			 saveCommentFromDirectToSchedule(list_date)
			 }
		
	}
	function commentFromExcelFile(type,status){
		var iframe='<iframe id="upload_iframe_upload_comment_Excel" name="upload_iframe_upload_comment_Excel"  witdh="0px" height="0px" border="0" style="width:0; height:0; border:none;"></iframe>';
		 
		 $("#comment_create").append(iframe);
			//$("#upload_iframe").attr("id", "upload_iframe_Sent");
		 	var action_url = "UploadCommentExcelFile.do?Action="+type+"&status="+status+"&create_date="+formatDateTimeCurrent();
			var form = document.getElementById("upload-excel-form-comment");
			form.setAttribute('action', action_url);
			form.setAttribute('target', "upload_iframe_upload_comment_Excel");
			form.submit();
			$("#uploade-excel-form-file_comment_create").load(function () {
				//load_iframe_upload_excel_comment("upload_iframe_upload_comment_Excel","nav_comments-sent");
		    	
		           });
	}
	function saveCommentFromDirectToSchedule(list_date){
		var object_json= new Object();
		var array_comment_public_direct = new Array();
		var grid = jQuery("#JqGrid_create");
		var datarows = grid.jqGrid('getGridParam', 'selarrrow');
		var message=$("#comment_post").val();
		if(datarows.length==0){
			aoFrm.mess("alert",mess.message_select_post);
			return false;
		}
		else
			{
			aoFrm.mess("close","close");			
			}
		for(var i=0; i<datarows.length;i++){
			var prow = grid.jqGrid('getRowData', datarows[i]);
			var object_comment = new Object();
			object_comment.post_id=prow.post_id;
			object_comment.page_id=prow.channel_detail_id;
			object_comment.content=prow.message;
			array_comment_public_direct.push(object_comment);
			
		}
		object_json.object_comment_public=array_comment_public_direct;
		
		var newData = [];
		newData.push({
	        name: "message", 
	        value: message
	    });
		
		newData.push({
	        name: "object_json", 
	        value: ''+''+JSON.stringify(object_json)+''+''
	    });    
		newData.push({
	        name: "status", 
	        value: 2
	    }); 
		newData.push({
	        name: "create_date", 
	        value: "'"+list_date+"'"
	    }); 
		newData.push({
	        name: "Action", 
	        value: "schedule"
	    }); 
	 $.ajax({
		  url : 'CreateComment.do',
		  dataType: 'json',
		  data:newData,
		  success : function(source) {
			  //showContentChannel(source,total_channel, type)
		  }
	 });	
	}
	function saveCommentFromPostDirect(type, status){
		var object_json= new Object();
		var array_comment_public_direct = new Array();
		var grid = jQuery("#JqGrid_create");
		var datarows = grid.jqGrid('getGridParam', 'selarrrow');
		var message=$("#comment_post").val();
		if(datarows.length==0){
			aoFrm.mess("alert",mess.message_select_post);
			return false;
		}
		else
			{
			aoFrm.mess("close","close");			
			}
		for(var i=0; i<datarows.length;i++){
			var prow = grid.jqGrid('getRowData', datarows[i]);
			var object_comment = new Object();
			object_comment.post_id=prow.post_id;
			object_comment.page_id=prow.channel_detail_id;
			object_comment.content=prow.message;
			array_comment_public_direct.push(object_comment);
			
		}
		object_json.object_comment_public=array_comment_public_direct;
		var newData = [];
		newData.push({
	        name: "message", 
	        value: message
	    });
		
		newData.push({
	        name: "object_json", 
	        value: ''+''+JSON.stringify(object_json)+''+''
	    });    
		newData.push({
	        name: "status", 
	        value: status
	    }); 
		newData.push({
	        name: "create_date", 
	        value: formatDateTimeCurrent()
	    }); 
		newData.push({
	        name: "Action", 
	        value: type
	    }); 
	 $.ajax({
		  url : 'CreateComment.do',
		  dataType: 'json',
		  data:newData,
		  success : function(source) {
			  //showContentChannel(source,total_channel, type)
		  }
	 });
	}