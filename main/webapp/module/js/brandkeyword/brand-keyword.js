/***************************************************************************
 Page Code:	analysis/twitter
 First Author:
 Created Date: 
 **************************************************************************/
	var token_fb="";
	var token_tw="";
	var pchannel_detail_id="";
	var channel_twitter="";
	var channel_user_fb="";
	var count=0;
	var avatar_twitter="";
	var count_keyword_all=0;
	var count_keyword=0;
	var _scrollLoad = false; 
	var _tooltipTimeOut;
	var start_date_more=0;
	var count_select_search = 0;
 	var date = new Date();
 	var array_top_influence= new Array();
 	var array_post_search= new Array();
 	var array_keyword = new Array();
	var currentDate = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
	var lastDate = new Date();
	var days = 7;
	var count_channel=0;
	var res = date.setTime(date.getTime() - (days * 24 * 60 * 60 * 1000));		
	var lastDate = new Date(res);
	var newDate = (lastDate.getMonth() + 1) + "/" + lastDate.getDate() + "/" + lastDate.getFullYear();
	$("#analysis_brand_keyword #brand_keyword_range").val(newDate +" to " + currentDate);
	$('#analysis_brand_keyword .date-range').daterangepicker({opens: 'left',
        format: 'MM/dd/yyyy',
        separator: ' to ',
        startDate: Date.today().add({
        days: -7
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
	var flag_key_add = false;
	var flag_key_modify = false;
	//$( document ).unbind();
	$(document).scroll(function(e) {	
		if(!_scrollLoad) return;
		var aTop = $(document).innerHeight();
		var hW = $(window).height();
		var posLoad = $(document).scrollTop() + hW;
		if(posLoad >=aTop ){
			count_keyword_all=0;
			count_channel=0;
			var _last_time=$("#brand_keyword").attr("last_time");
			
			var start_date_more_new=start_date_more-(3*60*60);
			var end_date_more_new=start_date_more-1;
			if(!isNull(_last_time))
			searchBrandKeyword(array_keyword,start_date_more_new, end_date_more_new,_last_time);
			else
				{
				var current_date= new Date();
				var start_date=toTimestamp(current_date);
				searchBrandKeyword(array_keyword,start_date_more_new, end_date_more_new,start_date);
				}
		}
	});

	$(document).ready(function() {
		checkExprired();
		aoFrm.mess("close","close");
		var tooltip = $("#tooltip-page-brand-keyword").clone();	
		$("#tooltip-page-brand-keyword").remove();
		$("body").append(tooltip);
		$("#tooltip-page-brand-keyword").mouseleave(function(e) {
	        clearTimeout(_tooltipTimeOut);
	        $("#tooltip-page-brand-keyword").hide();
	     });
		$("#tooltip-page-brand-keyword").mouseover(function(e) {
			$("#tooltip-page-brand-keyword").show();
			clearTimeout(_tooltipTimeOut);
		});
		
		var tooltip = $("#tooltip-twitter").clone();	
		$("#tooltip-twitter").remove();
		$("body").append(tooltip);	
		$("#tooltip-twitter").mouseleave(function(e) {
			$("#tooltip-twitter").stop(1,1).delay(500).hide();
	    });
		$("#tooltip-twitter").mouseover(function(e) {
			$("#tooltip-twitter").show();
	    });
		getChannelDetail();

		$("#add_keyword").click(function(){
			if (flag_key_add==false){
				$("#box_add_keyword").show();
				$("#box_modify_keyword").hide();
				flag_key_add = true;
			}else{
				$("#box_add_keyword").hide();
				flag_key_add = false;
			}
		});
		var refesh = setInterval(function() {
			loadNewSearch();	 
		  },300000);
		
		//btn_save_modify
		$("#btn_save").click(function(){
			saveBrandkeyword();
		});
		//btn_delete_edit
		$("#btn_save_modify").click(function(){
			editBrandkeyword();
		});
		$("#btn_delete_edit").click(function(){
			deleteBrandkeyword();
		});
		$(".range_inputs .btn").click(function(){
			setTimeout(function(){
				count_keyword_all=0;
				$("#content_search").empty();
				 var end_date=toTimestamp(current_date);
				 searchBrandKeyword(array_keyword,"",end_date);
			},100);
		});
	});
	function saveBrandkeyword(){
		var brand_keyword=$("#txt_keyword").val();
		if(!isNull(brand_keyword)){
			var type = $('input:radio[name=keyword]:checked').val();
			var dataString =[];
			 dataString.push({
			  name: "brand_keyword", 
			  value: brand_keyword
			});
			dataString.push({
			  name: "type", 
			  value: type
			});
			dataString.push({
			  name: "Action", 
			  value: "save"
			});    

			$.ajax({
			 type:'POST',
			  url : 'BrandKeywords.do',
			  dataType: 'text',
			  data: dataString,
			  success : function(source) {
				  if(source.trim()!="0"){
					  aoFrm.mess("mess",mess.message_save_brand_keyword);  
					  getBrandKeyword();
					  $("#box_modify_keyword").hide();
				  }
				  }
		  });
		}
		else{
			aoFrm.mess("alert",mess.checkkeyword);  	
		}
			
	}
	function editBrandkeyword(){
		var brand_keyword=$("#txt_keyword_edit").val();
		if(!isNull(brand_keyword)){
			var type  = $('input:radio[name=keyword_edit]:checked').val();
			var keyword_id=$("#txt_keyword_edit").attr("key_id");
			var dataString =[];
			 dataString.push({
			  name: "brand_keyword", 
			  value: brand_keyword
			});
			 dataString.push({
				  name: "keyword_id", 
				  value: keyword_id
				});
			dataString.push({
			  name: "type", 
			  value: type
			});
			dataString.push({
			  name: "Action", 
			  value: "update"
			});    
		$.ajax({
			 type:'POST',
			  url : 'BrandKeywords.do',
			  dataType: 'text',
			  data: dataString,
			  success : function(source) {
				  if(source.trim()!="0"){
					  aoFrm.mess("mess",mess.message_save_brand_keyword);  
					  getBrandKeyword();
					  $("#box_modify_keyword").hide();
				  }
				  }
			  });	
		}
		else{
			aoFrm.mess("alert",mess.checkkeyword);  	
		}
		
	}	
	function  getBrandKeyword(){
		 $("#list_brand_keyword").empty();
		 $("#content_search").empty();
		 array_keyword=[];
		 count_keyword_all=0;
		 count_select_search = 0;
		 array_top_influence=[];
		 $("#list_top_influence").empty();

	$.ajax({
		 type:'POST',
		  url : 'GetBrandKeywords.do',
		  dataType: 'json',
		   success : function(source) {
			   var html="";
			   $(".content_right .block-title .left-title").empty();
			   for(var i=0; i<source.length;i++){
				   
				   if(source[i].type==1){
					   var checked='';
					   var empty_check='';
					  
					   if(source[i].select_search==1){
						   count_select_search++;
						   checked='checked';
						   empty_check='icon-check';
						   array_keyword.push({"type":source[i].type,"keyword":source[i].brand_keyword,"last_view":source[i].last_view,"keyword_id":source[i].keyword_id,"limit_load_search_keyword_fb":source[i].limit_load_search_keyword_fb,"limit_load_search_keyword_tw":source[i].limit_load_search_keyword_tw});
					       
					   }
					   else
						   {
						   checked='';
						   empty_check='icon-check-empty';
						   }
					   html='<li id="keyword_'+source[i].keyword_id+'" rang_time="'+source[i].time_brand_keyword+'" last_view="'+source[i].last_view+'" class="facebook edit_keyword"><span limit_load_fb="'+source[i].limit_load_search_keyword_fb+'" id="'+source[i].keyword_id+'_'+source[i].type+'"><i class="icon-search blue"></i>'+source[i].brand_keyword+'</span><span id="number_'+source[i].keyword_id+'" style="display:none;margin-left: 10px" class="badge badge-dark-red"></span><div  id="profile_facebook_'+source[i].keyword_id+'" class="pull-right '+checked+'"><i class="'+empty_check+'"></i></div><i class="icon-pencil"></i></li>' ;
				   }
				   else
					   {
					   var checked='';
					   var empty_check='';
					   if(source[i].select_search==1){
						   count_select_search++;
						   checked='checked';
						   empty_check='icon-check';
						   array_keyword.push({"type":source[i].type,"keyword":source[i].brand_keyword,"last_view":source[i].last_view,"keyword_id":source[i].keyword_id,"limit_load_search_keyword_fb":source[i].limit_load_search_keyword_fb,"limit_load_search_keyword_tw":source[i].limit_load_search_keyword_tw});	   
					   }
					   else
						   {
						   checked='';
						   empty_check='icon-check-empty';
						   }
					   html='<li id="keyword_'+source[i].keyword_id+'" rang_time="'+source[i].time_brand_keyword+'" last_view="'+source[i].last_view+'" class="twitter edit_keyword"><span limit_load_tw="'+source[i].limit_load_search_keyword_tw+'" id="'+source[i].keyword_id+'_'+source[i].type+'"><i class="icon-search green"></i>'+source[i].brand_keyword+'</span><span id="number_'+source[i].keyword_id+'" style="display:none;margin-left: 10px" class="badge badge-dark-red"></span><div id="profile_twitter_'+source[i].keyword_id+'" class="pull-right '+checked+'"><i class="'+empty_check+'"></i></div><i class="icon-pencil"></i></li>';
					   
					   }
				 
				   $("#list_brand_keyword").prepend(html);
				   
			   }
			   if (count_select_search==0){
				   
				   $("#analysis_brand_keyword .itemLoading").hide();
				   $("#show_content").append('<div class="nodata span4"><h4 text="nokeyword">No Keyword</h4><p text="pleaseaddkeyword">Please add a keyword to search.</p></div>');
			   }else{
				   var current_date= new Date();
				   var end_date=toTimestamp(current_date);
				 
				   var start_date=end_date - (2*60*60);
				   searchBrandKeyword(array_keyword,start_date,end_date);
				   getInfluenceSearchTw(array_keyword);
				   getInfluenceSearchFb(array_keyword);
				   $("#show_content .nodata").hide();
			   }
			  
			   loadNewSearch();
			   
			   $("#list_brand_keyword li").hover(function(){
				   $(this).children(".icon-pencil").show();
			   },function(){
				   $(this).children(".icon-pencil").hide();
			   });
			   
			   $(".edit_keyword .icon-pencil").click(function(){
					if (flag_key_modify==false){
						$("#box_modify_keyword").show();
						$("#box_add_keyword").hide();
						flag_key_modify == true;
						flag_key_add = false;
						var brand_keyword= $(this).parent().find("span").text();
						var keyword_id_type =$(this).parent().find("span").attr("id");
						showBrandkeyword(brand_keyword,keyword_id_type);
						
					}else{
						$("#box_modify_keyword").hide();
						flag_key_modify = false;
					}
					
				});
			   $(".edit_keyword span").click(function(){
				   $("#show_content .nodata").hide();
				   $(".content_right .block-title .left-title").empty();
				   array_keyword=[];
				   count_channel=0;
				   var brand_keyword= $(this).text();
					var keyword_id_type =$(this).attr("id");
					var str=keyword_id_type.split("_");
					var last_time= $(this).parent().attr("last_view");
					var limit_load_fb=$(this).attr("limit_load_fb");
					var html = '';
					array_top_influence=[];
					$("#list_top_influence").empty();
					if (str[1]==1){
						
						var limit_load_fb=$(this).attr("limit_load_fb");
						array_keyword.push({"type":str[1],"keyword":brand_keyword,"last_view":last_time,"keyword_id":str[0],"limit_load_search_keyword_fb":limit_load_fb});//tong
						html = '<div id="brand_keyword" last_time="'+last_time+'"  class="left-title"><i class="icon-facebook-sign blue"></i><span class="name">'+brand_keyword+'</span></div>';
						getInfluenceSearchFb(array_keyword);
					}else{
						var limit_load_tw=$(this).attr("limit_load_tw");
						array_keyword.push({"type":str[1],"keyword":brand_keyword,"last_view":last_time,"keyword_id":str[0],"limit_load_search_keyword_tw":limit_load_tw});//tong
						html = '<div id="brand_keyword" last_time="'+last_time+'" class="left-title"><i class="icon-twitter-sign blue"></i><span class="name">'+brand_keyword+'</span></div>';
						getInfluenceSearchTw(array_keyword);
					}
					$(".content_right .block-title").append(html);
					$("#content_search").empty();
					 var current_date= new Date();
					   var end_date=toTimestamp(current_date);
					   var start_date=end_date - (6*60*60);
					   count=0;
					   count_keyword_all=0;
					   update_time_view_keyword(str[0]);
				   searchBrandKeyword(array_keyword,start_date,end_date,last_time);
					
				});
			   $(".brand_keyword .box-list.check .pull-right").click(function(e) {
				  
		   				if($(this).hasClass("checked"))
		   				{
		   					var str;
		   					$(this).find("i").attr("class","icon-check-empty");
		   					$(this).removeClass("checked");
		   					var keyword_id=$(this).parent().attr("id");
		   					var str_id=keyword_id.split("_"); 
		   					updateSelect_search_keyword(str_id[1],0);
		   					
		   				}else
		   				{
		   					$(this).find("i").attr("class","icon-check");
		   					$(this).addClass("checked");
		   					var keyword_id=$(this).parent().attr("id");
		   					var str_id=keyword_id.split("_"); 
		   					updateSelect_search_keyword(str_id[1],1);

		   				}
		   				
		   	    	});
			   checkEmptyKeyword("#content_search");
			  }
		  });
	}
	function deleteBrandkeyword(){
		var keyword_id=$("#txt_keyword_edit").attr("key_id");
		var dataString =[];
		 dataString.push({
			  name: "keyword_id", 
			  value: keyword_id
			});
			dataString.push({
			  name: "Action", 
			  value: "delete"
			});    
	$.ajax({
		 type:'POST',
		  url : 'BrandKeywords.do',
		  dataType: 'text',
		  data: dataString,
		  success : function(source) {
			  if(source.trim()!="0"){
				  aoFrm.mess("mess",mess.message_delete_brand_keyword);  
				  getBrandKeyword();
				  $("#box_modify_keyword").hide();
			  }
			  }
		  });	
	}
	function showBrandkeyword(brand_keyword,keyword_id_type){
		$("#txt_keyword_edit").val(brand_keyword);
		var str=keyword_id_type.split("_");
		var type=str[1];
		$("#txt_keyword_edit").attr("key_id",str[0]);
		if(type==1){
			$("#facebook_keyword_edit").attr('checked', 'checked');
		}
		else
			{
			$("#twitter_keyword_edit").attr('checked', 'checked');
			}
	}
	function searchBrandKeyword(array_keyword,start_date,end_date,last_view){
		_scrollLoad = false;
		start_date_more=start_date;
		
		//$("#content_search").empty();
		count_keyword=0;
		array_post_search=[];
		$("#analysis_brand_keyword #content_search").append("<li class='itemLoading'></li>");
		var str_keyword_fb='';
		var str_keyword_tw='';
		var limit_load_fb=0;
		var limit_load_tw=0;
		for(var i=0; i<array_keyword.length;i++){
			if(array_keyword[i].type==1){
				str_keyword_fb=str_keyword_fb+" | "+ array_keyword[i].keyword;
				limit_load_fb=array_keyword[i].limit_load_search_keyword_fb;
			}
			else if(array_keyword[i].type==3)
				{
				str_keyword_tw=str_keyword_tw+" "+ array_keyword[i].keyword;
				limit_load_tw=array_keyword[i].limit_load_search_keyword_tw;
				
		}
		
	}
		if(str_keyword_fb!=""){
			count_keyword_all++;
			searchFacebook(str_keyword_fb,start_date,end_date,last_view,limit_load_fb);
		}
		
		if(str_keyword_tw!=""){
			count_keyword_all++;
			searchTwitter(str_keyword_tw,end_date,last_view,limit_load_tw);
		}
		
	}
	
	function getChannelDetail(){
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
				  $("#list_facebook").empty();
				  $("#select_fb").hide();
				  $("#list_twitter").empty();
				  $("#select_tw").hide();
				  for(var i=0; i<source.length;i++){
					  if(source[i].channel_id==1||source[i].channel_id==2){
						  if(source[i].default_channel_comment==1){
							  token_fb=source[i].token_user;	
							  pchannel_detail_id=source[i].pchannel_id;
							  channel_user_fb=source[i].channel_user;
						  }
						  if(source[i].channel_id==1){
							  var html='<li class="list_facebook" id="page_'+source[i].channel_detail_id+'" token="'+source[i].token_user+'" avatar="'+source[i].channel_picture+'"  title="'+source[i].channel_user+'"><i class="icon-facebook-sign blue" ></i>'+limitString(source[i].channel_user)+'</li>';
					   		  $("#list_facebook").append(html); 
					   		
						  }
						  
						  
					  }
					  else
						  {
						  if(source[i].default_channel_comment==1){
							  token_tw=source[i].token_user;
							  channel_twitter=source[i].pchannel_id;
							  avatar_twitter=source[i].channel_picture; 
							 // screen_name=source[i].channel_user;
						  }
						  var html='<li class="list_twitter"  id="page_'+source[i].channel_detail_id+'" token="'+source[i].token_user+'" avatar="'+source[i].channel_picture+'"   title="'+source[i].channel_user+'"><i class="icon-twitter-sign blue" ></i>'+limitString(source[i].channel_user)+'</li>';
				   		  $("#list_twitter").append(html);
						  }
					  	  }
				  
				
				  $("#list_twitter .list_twitter").click(function(){
						//veBrandkeyword();
			   			var id=$(this).attr("id");
			   			var id_str=id.split("_");
			   			var channel_detail_id= id_str[1];
			   			var post_id=$(this).parent().parent().attr("post_id");
			   			$("#"+post_id).attr("token",$(this).attr("token"));
			   			$("#"+post_id).attr("profile_id",$(this).attr("id"));
			   			$("#"+post_id+ " #select_channel_tw img").attr("src",$(this).attr("avatar"));
						  $("#select_tw").hide();
			   			//updateChannel_Default_Select(channel_detail_id,3,1);
					});
				  getBrandKeyword();
			  }
		 });
	}
	function showDataSearch(response,total_keyword,type,end_date,last_view){
		var stringDate = $("#analysis_brand_keyword #brand_keyword_range").val();
		var newString = stringDate.split("to");
		var stringFrom = newString[0];
		var stringTo = newString[1];

		//date for facebook: plus 1 day
		var newStringFrom = new Date(stringFrom);
		var newStringTo = new Date(stringTo);
		var dateFrom = new Date(newStringFrom);
		var dateTo = new Date(newStringTo);
		var newDateFrom = toTimestamp(dateFrom)+(7 * 60 * 60);
		var newDateTo = toTimestamp(dateTo)+(30 * 60 * 60);
		if(type==1){
			count_keyword++;
			for(var i=0;i<response.data.length;i++){
				var display_like="";
				var display_comment="";
				var channel_detail_id=response.data[i].from.id;
				var name=response.data[i].from.name;
				var create_date=response.data[i].created_time;
				var time = formatDateGMT(create_date);
				var time_post=toTimestamp(response.data[i].created_time);
				var link_post='';
				var fb_page=0;
				var message="";
				if ((newDateFrom<=time_post)&&(time_post<=newDateTo)){
					if(!isNull(response.data[i].message)){
						
						message=response.data[i].message;
						if(!isNull(response.data[i].name)){
							message =message +" "+ response.data[i].name;
						}
					}
					else if(!isNull(response.data[i].caption)){
						message=response.data[i].caption;
					}
					else if(!isNull(response.data[i].description)){
						message=response.data[i].description;
					}
					
					if(!isNull(message)){
						var post_id=response.data[i].id;
						if(!isNull(response.data[i].actions)){
							 link_post=response.data[i].actions[0].link;
						    var name_action=response.data[i].actions[0].name;
						    if(name_action=="Comment"){
						    	display_like="";
								display_comment="";
						    }
						    else
						    	{
						    	display_like="";
								display_comment="none";
						    	}
						}
							else{
								link_post=response.data[i].link;
								display_like="none";
								display_comment="none";
							}
						if(!isNull(response.data[i].from.category))	{
							fb_page=1;
						}
						else
							{
							fb_page=0;
							}
						var avartar = 'https://graph.facebook.com/'+channel_detail_id+'/picture';
						array_post_search.push({"time_post":time_post,"html":html,"message":message,"avartar":avartar,"time_display":time,"name":name,"channel_detail_id":channel_detail_id,"type":type,"post_id":post_id,"link_post":link_post,"display_like":display_like,"display_comment":display_comment,"favorite_me":"false","friends":0,"fb_page":fb_page});
					}
					
				}
					
			}
			
			}
			else{
				count_keyword++;
				for(var i=0;i<response.statuses.length;i++){
		    		var avartar = response.statuses[i].user.profile_image_url_https;
					var name=response.statuses[i].user.name;
					var screen_name = response.statuses[i].user.screen_name;
					var create_date=response.statuses[i].created_at;
					var time = formatDateGMT(create_date);
					var time_post=toTimestamp(response.statuses[i].created_at);
					var favorite_me=response.statuses[i].favorited;
				
					
					if ((newDateFrom<=time_post)&&(time_post<=newDateTo)){
						var message="";
						if(!isNull(response.statuses[i].text)){
							message=response.statuses[i].text;
							var friends=response.statuses[i].user.friends_count;
							var url_tweet = "https://twitter.com/"+screen_name+"/status/"+response.statuses[i].id_str;
							array_post_search.push({"time_post":time_post,"html":html,"message":message,"avartar":avartar,"time_display":time,"name":name,"channel_detail_id":screen_name,"type":type,"post_id":response.statuses[i].id_str,"link_post":url_tweet,"display_like":"","display_comment":"","favorite_me":favorite_me,"friends":friends});
						}
					}

				}
				
			}
		if(count_keyword==total_keyword){
			var new_post="";
			var str_keyword_fb = "";
			var str_keyword_tw = "";
			
			if(array_post_search.length>0){
				_scrollLoad = true;
				array_post_search.sort(function(a,b){
					return b.time_post - a.time_post;
				});
				var list_post_id="";
				for (var j=0;j<array_post_search.length;j++){
					var display_like=array_post_search[j].display_like;
					var display_comment=array_post_search[j].display_comment;
					var avartar = array_post_search[j].avartar;
					var name = array_post_search[j].name;
					var time_post = array_post_search[j].time_post;
					var time = array_post_search[j].time_display;
					var channel_detail_id = array_post_search[j].channel_detail_id;
					var post_id=array_post_search[j].post_id;
					var html="";
					var link_post=array_post_search[j].link_post;
					var old_message = array_post_search[j].message;
					var fb_page=array_post_search[j].fb_page;
					for (var k=0;k<array_keyword.length;k++){
						if (array_post_search[j].type==1){
							var url_profile = "https://www.facebook.com/"+pchannel_detail_id;
							var url_image_user='https://graph.facebook.com/'+pchannel_detail_id+'/picture'
							//var keyword_search=array_keyword[k].keyword;
							list_post_id =list_post_id+","+'"'+post_id+'"';
							var newMessage = old_message.replace(new RegExp(array_keyword[k].keyword,"gi"),"<span>$&</span>");
							old_message = newMessage;
								var last_time=last_view/1000;
									if(last_time<=time_post){
									new_post ='<span id="number_new" style="margin-right:5px" class="badge badge-dark-red">New</span>';
								}
									html='<li id="'+post_id+'" fb_page="'+fb_page+'" time_post="'+time_post+'" link_post="'+link_post+'" display_like="'+display_like+'" display_comment="'+display_comment+'" access-token="'+token_fb+'" class="brand_keyword_fb arrow-box-left"><div class="avatar"><img src="'+avartar+'" id="avatar-post" class="avatar-small"><i class="icon-facebook-sign blue channel-icon"></i></div><div class="content"><div class="block-name">'+new_post+'<a target="_blank" href="https://www.facebook.com/'+channel_detail_id+'"><span class="name"><strong class="indent">'+name+'</strong></span></a><span time-post="'+time_post+'" class="timePost">'+time+'</span></div><span style="cursor:pointer" class ="detail_id" id="detail_id"><blockquote class="status">'+newMessage+'</blockquote></span><div class="picture"></div></div><div class="info"><div class="content_share" onclick="shareContent('+"'"+post_id+"'"+');"><i class="icon-share" title="Share this post"></i></div><div class="menuLike liked" title="" style="display:'+display_like+'" id="like-click"><i class="icon-thumbs-up" id="like_'+post_id+'"></i></div><div class="content_share" title="" id="comment-click"><i class="icon-reply" title="Comment this post"  id="comment_'+post_id+'"></i></div></li>';
							//	$("#content_search").append(html);
						}else{
							
							var newMessage = old_message.replace(new RegExp(array_keyword[k].keyword,"gi"),"<span>$&</span>");
							old_message = newMessage;
							html='<li id="'+post_id+'" screen_name="'+array_post_search[j].channel_detail_id+'"  post_id="'+array_post_search[j].post_id+'" class="brand_keyword_tw arrow-box-left"><div class="avatar"><img src="'+avartar+'" id="avatar-post" class="avatar-small"><i class="icon-twitter-sign blue channel-icon"></i></div><div class="content"><div class="block-name"><a target="_blank" href="https://www.twitter.com/'+channel_detail_id+'"><span class="name"><strong class="indent">'+name+'</strong></span></a><span time-post="'+time_post+'" class="timePost">'+time+'</span></div><a href="'+link_post+'" target="_blank"><blockquote class="status">'+newMessage+'</blockquote></a><div class="picture"></div></div><div class="info"> <div class="menuFavorite" id="favorite" title=""><i class="icon-thumbs-up" favorite-count=""></i></div><div class="post_comment"><div class="gray facebook comment"><div id="select_channel_tw" class="avatar"><img title="Select channel comment" class="avatar-small" src="'+avatar_twitter+'"><span class="caret" title="Select channel comment"></span></div></div><div class="arrow-box-left content"><div class="block-content"><input type="text" placeholder="Reply..." id="txtComment_'+array_post_search[j].post_id+'" class="txtComment"></div></div></div></li>';
							
							//check favorite 
							
							
						}
						
					}
				
					
					$("#content_search").append(html);
					var _objTw = $('#analysis_brand_keyword .timeline #'+ post_id +' #favorite');
					if (favorite_me){
							$(_objTw).addClass("unfavorite");
							$(_objTw).attr("title","Unfavorite");
							$(_objTw).find("i").attr("class","icon-thumbs-down");
						}
						else
							{
							$(_objTw).addClass("favorite");
							$(_objTw).attr("title","Favorite this tweet");
							$(_objTw).find("i").attr("class","icon-thumbs-up");
							}
					
				}
				$("#analysis_brand_keyword .detail_id").click(function(){
					
					var post_id=$(this).parent().parent().attr("id");
					var link_post=$(this).parent().parent().attr("link_post");
					var message=$("#"+post_id+" .content blockquote").html();
					var avatar_post=$("#"+post_id+" #avatar-post").attr("src");
					var time_post=$("#"+post_id+" .content .timePost").attr("time-post");
					var create_at=$("#"+post_id+" .content .timePost").html();
					var name =  $("#"+post_id+" .content .block-name span strong").html();
					var token_user=$(this).parent().parent().attr("access-token");
					var display_comment=$(this).parent().parent().attr("display_comment");
					var display_like=$(this).parent().parent().attr("display_like");
					//var like_count =$("#"+post_id+" .block-actions .like-num").html();
					//var like_of_comment=$("#"+post_id+" .block-actions #comment-like-num").html();
			    	//var comment_count=  $("#"+post_id+" .block-actions .comment-num").html();
			    	//var share_count=  $("#"+post_id+" .block-actions .share-num").html();
			    	//var engagement=$("#"+post_id+" .block-actions .engagement-num").html();
			    	var class_like=$("#like_"+post_id).attr("class");
			    	var picture=$("#"+post_id+" .picture img").attr("src");
                    var link_picture=$("#"+post_id+" .picture a").attr("href");
					_scrollLoad = false;
					var time_post_last=$("#monitoring_facebook_profile .timeline li .block-name .timePost:last").attr("time-post");
					messageDetailBrandKeyword(post_id,message,avatar_post,time_post_last,create_at,name,token_user,pchannel_detail_id,link_post,class_like,picture,link_picture,display_comment,display_like);
					$("#cancel_detail").click(function(){
						$("#content_search").show();
						$("#message_detail_brand_keyword").hide();
						$("#cancel_detail").hide();
						_scrollLoad = true;
						
					});
				});
				$("#analysis_brand_keyword #comment-click").click(function(){
					
					var post_id=$(this).parent().parent().attr("id");
			var link_post=$(this).parent().parent().attr("link_post");
			var message=$("#"+post_id+" .content blockquote").html();
			var avatar_post=$("#"+post_id+" #avatar-post").attr("src");
			var time_post=$("#"+post_id+" .content .timePost").attr("time-post");
			var create_at=$("#"+post_id+" .content .timePost").html();
			var name =  $("#"+post_id+" .content .block-name span strong").html();
			var token_user=$(this).parent().parent().attr("access-token");
			var display_comment=$(this).parent().parent().attr("display_comment");
			var display_like=$(this).parent().parent().attr("display_like");
			//var like_count =$("#"+post_id+" .block-actions .like-num").html();
			//var like_of_comment=$("#"+post_id+" .block-actions #comment-like-num").html();
	    	//var comment_count=  $("#"+post_id+" .block-actions .comment-num").html();
	    	//var share_count=  $("#"+post_id+" .block-actions .share-num").html();
	    	//var engagement=$("#"+post_id+" .block-actions .engagement-num").html();
	    	var class_like=$("#like_"+post_id).attr("class");
	    	var picture=$("#"+post_id+" .picture img").attr("src");
            var link_picture=$("#"+post_id+" .picture a").attr("href");
			_scrollLoad = false;
			var time_post_last=$("#monitoring_facebook_profile .timeline li .block-name .timePost:last").attr("time-post");
			messageDetailBrandKeyword(post_id,message,avatar_post,time_post_last,create_at,name,token_user,pchannel_detail_id,link_post,class_like,picture,link_picture,display_comment,display_like);
			$("#cancel_detail").click(function(){
				$("#content_search").show();
				$("#message_detail_brand_keyword").hide();
				$("#cancel_detail").hide();
				_scrollLoad = true;
				
			});
		
		});
				// Check Like
				checkLikeUnLike(list_post_id,channel_detail_id,token_fb);
				$("#analysis_brand_keyword #like-click").click(function(){							
					var id = $(this).parent().parent().attr("id");
					var token="";
					var current_token=$(this).parent(this).parent(this).attr("token");
					if(!isNull(current_token)){
						token=current_token;
					}
					else
						{
						token = token_fb;
						}
					if(!isNull(id))
					{	
						if ($(this).hasClass("liked")){
							fbLike(id,token);																			
							$("#like_" + id).attr("class","icon-thumbs-down");
							$("#like_" + id).parent().removeClass("liked");
							$("#like_" + id).attr("title","Unlike");
							$("#like_" + id).parent().addClass("unlike");
							
						}else{	
							fbUnLike(id,token);
							$("#like_" + id).attr("class","icon-thumbs-up");
							$("#like_" + id).parent().removeClass("unlike");
							$("#like_" + id).attr("title","Like this post");
							$("#like_" + id).parent().addClass("liked");												
						}
					}
				});
				
				
				$("#analysis_brand_keyword #select_channel_tw").click(function(){
					var _top = $(this).offset().top + $(this).innerHeight()- 77;
					$("#select_tw").css("top",_top);
					var post_id=$(this).parent().parent().parent().parent().attr("id");
					$("#select_tw").show();
					$("#select_tw").attr("post_id",post_id);
					 $(document.body).mousedown(function(event) {
						 var target = $(event.target);
                         if (!target.parents().andSelf().is('#list_twitter')) { // Clicked outside
                        	 $("#select_tw").hide();
                         }
                     });
				});
				
			
				//favorite twitter
				$("#analysis_brand_keyword  #favorite").click(function(){
					var token="";
					var _tweetid = $(this).parent(this).parent(this).attr("id");
					var current_token=$(this).parent(this).parent(this).attr("token");
					if(!isNull(current_token)){
						token=current_token.split("_");
					}
					else
						{
						token = token_tw.split("_");
						}
				
					if ($(this).hasClass("favorite")){
						favoriteTweet(token[0],token[1],_tweetid);
						$(this).removeClass("favorite");
						$(this).attr("title","Unfavorite");
						$(this).addClass("unfavorite");
						$(this).find("i").attr("class","icon-thumbs-down");
					}else{
						delFavoriteTweet(token[0],token[1],_tweetid);
						$(this).addClass("favorite");
						$(this).attr("title","Favorite this tweet");
						$(this).removeClass("unfavorite");
						$(this).find("i").attr("class","icon-thumbs-up");
					}
				});
				$("#analysis_brand_keyword .txtComment").keydown(function(e) {
		            if(e.keyCode==13){
		            	var token="";
		            	var id = $(this).parent().parent().parent().parent().parent().attr("id");
		            	var current_token=$(this).parent(this).parent(this).attr("token");
		            	var user_name=$(this).parent().parent().parent().parent().parent().attr("screen_name")
						if(!isNull(current_token)){
							token=current_token.split("_");
						}else
							{
							token = token_tw.split("_");
							}
		            	
		            	retweet(token[0],token[1],id,user_name);
		            	$(this).val("");
		            	setTimeout(function(){
		            		//gettweetuser(token,token_secret,_channel_detail_id);
		            	},2000);
					}			
		        });
				$(".brand_keyword_fb .avatar img#avatar-post").mouseover(function(){
					 var channel_detail_id = $(this).parent().parent().attr("id");
					 var user_id= channel_detail_id.split("_");
					 var fb_page= $(this).parent().parent().attr("fb_page");
					brandKeywordTip(this,user_id[0],token_fb,fb_page);
				});
				$(".brand_keyword_tw .avatar img#avatar-post").mouseover(function(){
					var screen_name = $(this).parent().parent().attr("screen_name");
					var token = token_tw.split("_");
					twitterProfileTip(this,token[0],token[1],screen_name);
				});
				$("#analysis_brand_keyword .itemLoading").hide();
			}
			else 
				{
				for (var k=0;k<array_keyword.length;k++){
					if (array_keyword[k].type == 1){
						str_keyword_fb = str_keyword_fb + " and " + array_keyword[k].keyword;
					}else{
						str_keyword_tw = str_keyword_tw + " and " + array_keyword[k].keyword;
					}
					
				}
				if(isNull(last_view))
				checkNodataKeyword("#show_content",array_post_search,"No data search for keyword<br /> <b>facebook</b>:"+str_keyword_fb.substring(5)+" <br /> <b>twitter</b>: "+str_keyword_tw.substring(5));
				$("#analysis_brand_keyword .itemLoading").hide();
				}
			
		}
	}
	function replaceKeyword(array_keyword,message){
		var newMessage = "";
		for (var i=0;i<array_keyword.length;i++){
			newMessage = message.replace(new RegExp(array_keyword[i].keyword,"gi"),"<span>$&</span>");
			return newMessage;
		}
	}
	function update_time_view_keyword(keyword_id){
		var current_date = new Date();//user_
		$("#number_"+keyword_id).hide();
		current_date= toTimestamp(current_date);
		var time_view=current_date+"000";
		$("#keyword_"+keyword_id).attr("last_view",time_view);
		var dataString =[];
		 dataString.push({
			  name: "keyword_id", 
			  value: keyword_id
			});
		 dataString.push({
			  name: "time_view", 
			  value: time_view
			});
			dataString.push({
			  name: "Action", 
			  value: "updatetime"
			});    
			$.ajax({
		 type:'POST',
		  url : 'BrandKeywords.do',
		  dataType: 'text',
		  data: dataString,
		  success : function(source) {
			  if(source.trim()!="0"){
				 // aoFrm.mess("mess",mess.message_delete_brand_keyword);  
				  $("#box_modify_keyword").hide();
			  }
			  }
		  });
	}
	function updateSelect_search_keyword(keyword_id,select_search){
		var dataString =[];
		 dataString.push({
			  name: "keyword_id", 
			  value: keyword_id
			});
		 dataString.push({
			  name: "select_search", 
			  value: select_search
			});
			dataString.push({
			  name: "Action", 
			  value: "updatesearch"
			});    
			$.ajax({
		 type:'POST',
		  url : 'BrandKeywords.do',
		  dataType: 'text',
		  data: dataString,
		  success : function(source) {
			  if(source.trim()!="0"){
				 // aoFrm.mess("mess",mess.message_delete_brand_keyword);  
				  getBrandKeyword();
				  $("#box_modify_keyword").hide();
			  }
			  }
		  });
	}
	function searchTwitter(str_keyword_tw,end_date,last_view,limit_load_tw){
		var keyword=str_keyword_tw.substring(1);
		var token = token_tw.split("_");
		cb.setToken(token[0],token[1]);
		var last_id="";
		last_id=$(".brand_keyword_tw").last().attr("post_id");
		
		if(isNull(last_id)){
			last_id="";
		}
		else
			{
			last_id=parseInt(last_id)-1;
			if(count_keyword>0)
			count_keyword--;
			}
		cb.__call(
				    "search_tweets",
				    {"q":keyword,"count":limit_load_tw,"max_id":last_id},
				    function (reply) {
				    	showDataSearch(reply,count_keyword_all,3,end_date,last_view);
				    });
		}
	function loadNewSearch(){
		for(var i=0; i<array_keyword.length;i++){
			if(array_keyword[i].type==1){
				getTopSearchKFB(array_keyword[i].keyword,array_keyword[i].last_view/1000,array_keyword[i].keyword_id);
			}
			else if(array_keyword[i].type==3)
				{

		}
	}
		
	}
	function getTopSearchKFB(str_keyword,last_view,keyword_id){
		var current_date= new Date();
		   var start_date=toTimestamp(current_date);
		FB.api('/search?q='+str_keyword+'&type=post&limit=50&since='+last_view+'&until='+start_date,{access_token:token_fb}, function(response) {		
			if(response.data.length>0){
				$("#number_"+keyword_id).show();
			$("#number_"+keyword_id).html(response.data.length+"+");
			}
			
		});
	}
	function getTopSearchKTW(str_keyword_tw){
		var keyword=str_keyword_tw.substring(1);
		var token = token_tw.split("_");
		cb.setToken(token[0],token[1]);
		var last_id="";
		last_id=$(".brand_keyword_tw").last().attr("post_id");
		if(isNull(last_id)){
			last_id="";
		}
		cb.__call(
				    "search_tweets",
				    {"q":keyword,"count":80,"max_id":last_id},
				    function (reply) {
				    				    });
	}
	function searchFacebook(str_keyword_fb,start_date,end_date,last_view,limit_load_fb){
		var last_time="";
		last_time=$(".brand_keyword_fb").last().attr("time_post");
		
		
		if(isNull(last_time)){
			last_time=end_date;
		}
		else
			{
			last_time=last_time-1;
			if(count_keyword>0)
			count_keyword--;
			}
		
		var keyword= str_keyword_fb.substring(2);
		FB.api('/search?q='+keyword+'&type=post&limit='+limit_load_fb+'&until='+parseInt(last_time),{access_token:token_fb}, function(response) {		
			showDataSearch(response,count_keyword_all,1,last_time,last_view);
		});
	}
	function brandKeywordTip(obj,channel_detail_id,token,fb_page) {
		var _top = $(obj).offset().top + $(obj).innerHeight()+ 10;
		var _left = $(obj).offset().left;
		$("#tooltip-page-brand-keyword #information-page").hide();
		$("#tooltip-page-brand-keyword #loading-page").show();
		$("#tooltip-page-brand-keyword").css("top",_top);
		$("#tooltip-page-brand-keyword").css("left",_left);
		$("#tooltip-page-brand-keyword").fadeIn();		
		$(obj).mouseleave(function(e) {
           clearTimeout(_tooltipTimeOut);           
		   _tooltipTimeOut = setTimeout(function(){
			   $("#tooltip-page-brand-keyword").fadeOut();
			},200);
        });
		getInforFacebook(channel_detail_id,token,fb_page);
	
	}
	function getInforFacebook(channel_detail_id,token,fb_page){
		if(fb_page==1){
			FB.api('/'+channel_detail_id+'?fields=cover,likes,talking_about_count,name,category,picture',{access_token:token_fb}, function(response) {
				if(isNull(response.error)){
					var image_cover = '';
				  	var image_avatar = '';
				  	var category = '';
				  	var fan_count = 0;
				  	var url_page="https://www.facebook.com/"+channel_detail_id;
				  	var people_talking = 0;
					  		if (!isNull(response.cover))
					  			  image_cover = response.cover.source;
					  		  if (!isNull(response.picture))
					  			  image_avatar = response.picture.data.url;
					  		  if (!isNull(response.name))
					  			  name = response.name;
					  		  if (!isNull(response.talking_about_count))
					  			  people_talking = response.talking_about_count;
					  		  if (!isNull(response.likes))
					  			  fan_count = response.likes;
					  		  if (!isNull(response.category))
					  			category = response.category;
					  		  $("#image-cover-page").attr("src",image_cover);
					  		  $("#image-avatar-page").attr("src",image_avatar);
					  		  $("#fb-name-page").text(name);
					  		 $("#manual_friends_brand").empty();
					  		 $("#friendship_brand").hide();
					  		$("#talking-about-brand").empty();
					  		$("#manual_friends_brand").css("height","25px")
					  		 $(".list-information").removeClass("information-profile");
					  		 $("#fb-category-page").text(category);
					  		 $("#fan-page-brand").html(numberWithCommas(fan_count) + "<span text='likes'> likes</span>");
					  		 // $("#talking-about-brand").html(numberWithCommas(people_talking) + "<span text='peopletalking'> talking about this</span>");
					  		$("#facebook_profile_btn_brand").hide();
					  		$("#facebook_page_btn_brand").show();
					  		
					  		 $(".profile-tip-avatar-profile a").attr("href",url_page);
					  		  $("#page-url-send-brand").attr("href",url_page);
					  		  $("#page-url-like-brand").attr("href",url_page);
					  		  $("#fb-url-name").attr("href",url_page);
					  		  $("#page-url-following-brand").attr("href",url_page)
				    	  $("#tooltip-page-brand-keyword #information-page").show();
						  $("#tooltip-page-brand-keyword #loading-page").hide();
				}
				
				});
		}else
			
			{
			loadInformationProfile(channel_detail_id,token_fb);
			
			}

	}
	function loadInformationProfile(user_id,token){
		var query = "";
		var image_cover = '';
	  	var image_avatar = '';
	  	var manual_friend = '';
	  	var friend_count = 0;
	  	var profile_url = '';
	  	var subscriber_count = 0;
	  	var username="";

		query = "SELECT pic_cover,pic_big,mutual_friend_count,friend_count,profile_url,subscriber_count,first_name,last_name,username  FROM user WHERE uid = '"+user_id+"'";
		FB.api({method: 'fql.query',
	        query: query,access_token:token
	      },function(response) {
		  	  for (var i=0;i<response.length;i++){
		  		  	if (!isNull(response[i].pic_cover))
		  			  image_cover = response[i].pic_cover.source;
			  		if (!isNull(response[i].pic_big))
			  		  image_avatar = response[i].pic_big;
			  		if (!isNull(response[i].last_name))
			  		  name = response[i].first_name+" "+response[i].last_name;
			  		if (!isNull(response[i].friend_count))
			  		  friend_count = response[i].friend_count;
			  		if (!isNull(response[i].profile_url))
			  		  profile_url = response[i].profile_url;
			  		if (!isNull(response[i].subscriber_count))
			  		  subscriber_count = response[i].subscriber_count;
			  		if (!isNull(response[i].username))
			  			username = response[i].username;
			  		if (!isNull(response[i].mutual_friend_count) ){
			  			manual_friend = response[i].mutual_friend_count;
			  			
			  			if(manual_friend>0){
			  				var url_friendship_brand="https://www.facebook.com/"+pchannel_detail_id+"?and="+username;
			  				 $("#manual_friends_brand").text(manual_friend+" mutual friends");
			  				$("#manual_friends_brand").css("height","14px")
					  		  $("#friendship_brand").show();
			  				$("#link_frienship").attr("href",url_friendship_brand);
			  			}
			  			else
			  				{
			  				$("#manual_friends_brand").empty();
			  				$("#manual_friends_brand").css("height","25px")
			  				$("#friendship_brand").hide();
			  				}
			  		}
		  			  
			  		//alert(manual_friend)
			  		//http://www.facebook.com/plugins/follow.php?href=http%3A%2F%2Fwww.facebook.com%2Fzuck&width&height=80&colorscheme=dark&layout=button&show_faces=true&appId=522800927792341
			  		//var url_following="http://www.facebook.com/plugins/follow.php?href=http://www.facebook.com/"+user_id+"&layout=button&show_faces=true&&&appId="+app_id;
			  		//$("#fb-url-following-brand").attr("href",url_following)
			  		$("#facebook_profile_btn_brand").show();
			  		$("#facebook_page_btn_brand").hide();
		  		  $("#image-cover-page").attr("src",image_cover);
		  		  $("#image-avatar-page").attr("src",image_avatar);
		  		  $("#fb-name-page").text(name);
		  		 $("#fb-category-page").empty();
		  		  $(".list-information").addClass("information-profile");
		  		  $("#fan-page-brand").html(numberWithCommas(friend_count) + "<span text='friends'> friends</span>");
		  		  $("#talking-about-brand").html(numberWithCommas(subscriber_count) + "<span text='follower'> follower</span>");
		  		  
		  		  $(".profile-tip-avatar-profile a").attr("href",profile_url);
		  		  $("#fb-url-send-brand").attr("href",profile_url);
		  		  $("#fb-url-name").attr("href",profile_url);
		  		  $("#fb-url-following-brand").attr("href",profile_url)
		  	  }
	  		  $("#tooltip-page-brand-keyword #information-page").show();
			  $("#tooltip-page-brand-keyword #loading-page").hide();
			  FB.api('/'+pchannel_detail_id+'/friends/'+user_id,{access_token:token_fb}, function(source) {
				 
				  if(!isNull(source.error)){
						
						}
					else
						{
						if(source.data.length>0){
					  		$("#fb-url-friend-brand").text("Friend");
					  	
						}
						else
							{
							
					  		$("#fb-url-friend-brand").text("Add Friend");
					  		$("#fb-url-friend-brand").attr("id","fb-url-friend-brand-add-"+user_id)
					  		 $("#fb-url-friend-brand-add-"+user_id).click(function(){
									addFriend(user_id);
								});
					  		
					  		//fb-url-following-brand
					  		
							}
						
						}
					});
	      });
		
		
	}
	
	function twitterProfileTip(obj,token,token_secret,screen_name) {
		var _top = $(obj).offset().top + $(obj).innerHeight() + 10;
		var _left = $(obj).offset().left;
		$("#information-content").hide();
		$("#tooltip-twitter #loading").show();
		$("#tooltip-twitter").css("top",_top);
		$("#tooltip-twitter").css("left",_left);
		$("#tooltip-twitter").stop(1,1).show();			
		$(obj).mouseleave(function(e) {
			$("#tooltip-twitter").delay(500).hide();
        });
		cb.setToken(token,token_secret);
		  cb.__call(
			    "users_show",
			    {"screen_name": screen_name},
			    function (reply) {
			    	var name = '';
			    	var location = '';
			    	var categori = '';
			    	var follower = 0;
			    	var following = 0;
			    	name = reply.name;
			    	location = reply.location;
			    	categori = reply.description;
			    	follower = reply.followers_count;
			    	following = reply.friends_count;
			    	$("#tw-name").text(name);
			    	$("#tw-place").text(location);
			    	$("#tw-category").text();
			    	$("#tw-follower").text(numberWithCommas(follower) + " followers | ");
			    	$("#tw-following").text(" "+numberWithCommas(following) + " following");
			    	$("#information-content").show();
					$("#tooltip-twitter #loading").hide();
			    }
			);
	}
	function shareContent(post_id){
			var link = $("#" + post_id).attr("link_post");
			window.open(
				      'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(link), 
				      'facebook-share-dialog', 
				      'width=626,height=436'); 
				    return false;
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
	
	function postComment(post_id,access_token,user_comment,avatar_post){
		//var url_profile_post= 'https://www.facebook.com/' + channel_detail_id;
		var msg = $("#analysis_brand_keyword #" + post_id + " .post_comment .arrow-box-left .block-content input").val();
		var strTime =new Date();
		var commentTime = formatDateGMT(strTime);
		FB.api('/'+post_id+'/comments','post',{ message: msg,access_token: access_token }, function(response) {
	         if (!response || response.error) {
	        	 aoFrm.mess("alert",enumerateObject(response.error));
	         } else {
	        	 aoFrm.mess("mess",mess.comment_post);
	        	
	        	 var html_comment='<div count="" class="guest-comment" user_comment="'+user_comment+'" post_id="'+post_id+'" id="'+response.id+'"><div class="gray facebook comment"><div class="avatar"><img src="'+avatar_post+'" class="avatar-small"></div></div><div class="arrow-box-left content"><div class="block-content"><blockquote><span class="name"><strong class="indent">'+user_comment+'</strong></span> '+replaceURLWithHTMLLinks(msg)+'</blockquote></div><div class="info"> <span class="timePost">'+commentTime+'</span> </div><div id="click-like-comment" class="likeComment liked"><i class="icon-thumbs-up" id="like_comment_'+response.id+'" title=""></i></div></div></div>'
	        	 $("#show_comment").prepend(html_comment);
	         }
	    });
		$("#analysis_brand_keyword .post_comment .arrow-box-left .block-content input").attr("value","");
	}
	function favoriteTweet(token,token_secret,id){
		if(!$.browser.msie){
			cb.setToken(token,token_secret);
			  cb.__call(
	  			    "favorites_create",
	  			    {"id": id},
	  			    function (reply) {
	  			    	aoFrm.mess("mess",mess.message_favorite);
	  			    }
	  			);
		}
		else
			{
			 var dataString=[];
			 dataString.push({
		        name: "token", 
		        value: token
		    });
			 dataString.push({
			        name: "token_secret", 
			        value: token_secret
			    });
			 dataString.push({
			        name: "post_id", 
			        value: id
			    });
			 dataString.push({
			        name: "Action", 
			        value: "favorite"
			    });
				$.ajax({
					  url : 'Twitter.do',
					  dataType: 'json',
					  data:dataString,
					  success : function(source) {
						  aoFrm.mess("mess",mess.message_favorite);
						  }
					  });
			}
		
	}
	
	function delFavoriteTweet(token,token_secret,id){
		if(!$.browser.msie){
			cb.setToken(token,token_secret);
			  cb.__call(
	  			    "favorites_destroy",
	  			    {"id": id},
	  			    function (reply) {
	  			    	aoFrm.mess("mess",mess.message_unfavorite);
	  			    }
	  			);
		}
		else
			{
			 var dataString=[];
			 dataString.push({
		        name: "token", 
		        value: token
		    });
			 dataString.push({
			        name: "token_secret", 
			        value: token_secret
			    });
			 dataString.push({
			        name: "post_id", 
			        value: id
			    });
			 dataString.push({
			        name: "Action", 
			        value: "delfavorite"
			    });
				$.ajax({
					  url : 'Twitter.do',
					  dataType: 'json',
					  data:dataString,
					  success : function(source) {
						  aoFrm.mess("mess",mess.message_unfavorite);
						  }
					  });
			}
		
	}
	function retweet(token,token_secret,id,user_name){
		var msg= "@"+user_name+" "+ $("#txtComment_" + id).val();
		cb.setToken(token,token_secret);
		  cb.__call(
  			    "statuses_update",
  			    {"status": msg,"in_reply_to_status_id": id},
  			    function (reply) {
  			    	aoFrm.mess("mess",mess.comment_tweet);
  			    }
  			);
	}
	function getComment(post_id,channel_detail_id,access_token){
		
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
						htmlGuestComment = '<div count="" class="guest-comment" user_comment="'+user_id_comment+'" post_id="'+post_id+'" id="'+comment_id+'"><div class="gray facebook comment"><div class="avatar"><a href="'+url_comment+'" target="_blank"><img src="'+avatar_comment+'" class="avatar-small"></a></div></div><div class="arrow-box-left content"><div class="block-content"><blockquote><span id="'+user_id_comment+'" class="name"><strong class="indent"> </strong></span> '+replaceURLWithHTMLLinks(message)+'</blockquote>'+html_image+'</div><div class="info"> <span class="timePost">'+date_time+'</span> </div><div id="click-like-comment" class="likeComment liked"><i class="icon-thumbs-up" id="like_comment_'+comment_id+'" title="like"></i></div></div></div>';
					}else{
						htmlGuestComment = '<div count="" class="guest-comment" user_comment="'+user_id_comment+'" id="'+comment_id+'"><div class="gray facebook comment"><div class="avatar"><a href="'+url_comment+'" target="_blank"><img src="'+avatar_comment+'" class="avatar-small"></a></div></div><div class="arrow-box-left content"><div class="block-content"><blockquote><span id="'+user_id_comment+'" class="name"><strong class="indent"></strong></span> '+replaceURLWithHTMLLinks(message)+'</blockquote>'+html_image+'</div><div class="info"> <span class="timePost">'+date_time+'</span> </div><div id="click-like-comment" class="likeComment liked"><i class="icon-thumbs-up" id="like_comment_'+comment_id+'" title="like"></i></div></div></div>';
					}
	    		  $("#show_comment").append(htmlGuestComment);
	    	  }
	    	  
	    	  for(var j=0;j<response[1].fql_result_set.length;j++){
	    		  $("#"+response[1].fql_result_set[j].uid+ " strong").html(response[1].fql_result_set[j].name)
	    	  }
	    	  clickLikeComment();
	      });
	 
			
		//clickLikeComment(type,access_token);
		checkLikeUnLikeComment(post_id,access_token);	
	}
function checkLikeUnLike(list_post_id,channel_detail_id,token_user){
		
		var list_post_id=list_post_id.substring(1);
		var query = "SELECT post_id,user_id FROM like where post_id in ("+list_post_id+")";
	
		FB.api({method: 'fql.query',
	        query: query,access_token:token_user
	      },function(response) {
	    	
	    	  for(var i=0;i<response.length;i++){
	    		  var _obj = $('.timeline #'+ response[i].post_id +' .menuLike');
	    		  if(response[i].user_id == channel_detail_id)
					{
						$(_obj).find("i").attr("class","icon-thumbs-down");
						$(_obj).find("i").attr("title","Unlike");
						$(_obj).addClass("unlike");
						$(_obj).removeClass("liked");						
					}
				}
	    	  
	    	  				
	      });
		
	}

function clickLikeComment(){
	
	//like comment
	$("#message_detail_brand_keyword .likeComment").click(function(){
		var token="";
		
		var comment_id = $(this).parent().parent().attr("id");
		var current_token=$(this).parent(this).parent(this).attr("token");
		if(!isNull(current_token)){
			token=current_token;
		}
		else
			{
			token = token_fb;
			}
	
		if(!isNull(comment_id))
		{	
			if ($(this).hasClass("liked")){
				likeComment(comment_id,token);																			
				$("#like_comment_" + comment_id).attr("class","icon-thumbs-down");
				$("#like_comment_" + comment_id).parent().removeClass("liked");
				$("#like_comment_" + comment_id).attr("title","Unlike");
				$("#like_comment_" + comment_id).parent().addClass("unlike");
				
			}else{												
				unLikeComment(comment_id,token);
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

function checkLikeUnLikeComment(post_id,access_token){
	
	//var list_post_id=list_post_id.substring(1);
	var query = "SELECT id,fromid,user_likes from comment where post_id= '"+post_id+"'";

	FB.api({method: 'fql.query',
        query: query,access_token:access_token
      },function(response) {
    	  for(var i=0;i<response.length;i++){
    		  var _obj = $('#message_detail_brand_keyword'+ '#'+post_id +' .likeComment ');
    		 
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
function updateChannel_Default_Select(channel_detail_id,channel_id,type){
	 var dataString =[];
     dataString.push({
         name: "channel_detail_id", 
         value: channel_detail_id
     });
     dataString.push({
         name: "default_comment", 
         value: 1
     });
     dataString.push({
         name: "channel_id", 
         value: channel_id
     });
     dataString.push({
         name: "Action", 
         value: "defaultcomment"
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
function showTopInfluence(){
  count_channel++;
   // if(count_channel==3){
    	$("#list_top_influence").empty();
    	var arr_top_influence = unique( array_top_influence )
    	//var arr_top_influence =  array_top_influence;
    	arr_top_influence.sort(function(a,b){
    				return b.friends - a.friends;
    			});
    	var tem_array_influence=[];
    	for(var i=0; i<arr_top_influence.length;i++){
    		
    		
    		var html='';
    		if(i<20){
    			if(arr_top_influence[i].type==1){
    				tem_array_influence.push({"screen_name":arr_top_influence[i].screen_name,"friends":arr_top_influence[i].friends,"url_twitter":arr_top_influence[i].url_twitter,"type":1,"user_id":0})
    				html='<li id="'+arr_top_influence[i].user_id+'"  class="twitter"><a href="'+arr_top_influence[i].url_twitter+'" target="_blank"><span class="green" title="'+arr_top_influence[i].screen_name+'">'+parseInt(i+1)+'. '+limitString(arr_top_influence[i].screen_name)+'</span></a><span id="number_'+i+'" style="margin-left: 20px" class="">'+numberWithCommas(arr_top_influence[i].friends)+'<span text="friends"> friends</span></span><div title="Add Friends" id="add_friend_fb" class="pull-right "><i class="icon-circle blue"></i></div></li>';
    			}
    			else
    				{
    				tem_array_influence.push({"screen_name":arr_top_influence[i].screen_name,"friends":arr_top_influence[i].friends,"url_twitter":arr_top_influence[i].url_twitter,"type":3,"user_id":0})
    				html='<li id="'+arr_top_influence[i].screen_name+'"  class="twitter"><a href="'+arr_top_influence[i].url_twitter+'" target="_blank"><span class="green" title="'+arr_top_influence[i].screen_name+'">'+parseInt(i+1)+'. '+limitString(arr_top_influence[i].screen_name)+'</span></a><span id="number_'+i+'" style="margin-left: 20px" class="">'+numberWithCommas(arr_top_influence[i].friends)+'<span text="friends"> friends</span></span><div title="Following" id="add_friend_tw" class="pull-right "><i class="icon-circle green"></i></div></li>';
    				}
    				
    		$("#list_top_influence").append(html)
    		}
    		array_top_influence	=tem_array_influence;
    	}
    	$("#list_top_influence #add_friend_tw").click(function(){
    		var id=$(this).parent().attr("id");
    		//var str_id= id.split("___#");
    		
    		addFriendTwitter(id);
    	});
    	$("#list_top_influence #add_friend_fb").click(function(){
    		var id=$(this).parent().attr("id");
    		addFriend(id);
    		
    	});
   //}
	
}
function addFriendTwitter(screen_name){
	var token = token_tw.split("_");
	var dataString=[];
	 dataString.push({
       name: "token", 
       value: token[0]
   });
	 dataString.push({
	        name: "token_secret", 
	        value: token[1]
	    });
	 dataString.push({
	        name: "screen_name", 
	        value: screen_name
	    });
	 dataString.push({
	        name: "Action", 
	        value: "addfriends"
	    });
		$.ajax({
			  url : 'Twitter.do',
			  dataType: 'json',
			  data:dataString,
			  success : function(source) {
				  aoFrm.mess("mess",mess.message_follwing);
				  }
			  });
}
function getfriendFb(strid){
	var list_id=strid.substring(1); 
	 var query = 'SELECT uid,name,friend_count from user where uid in ('+list_id+')';
	  FB.api({method: 'fql.query',
	        query: query,access_token:token_fb
	      },function(response) {
	    	  if(response.length>0){
	    		  for(var i=0; i<response.length;i++){
	    			  array_top_influence.push({"screen_name":response[i].name,"friends":response[i].friend_count,"url_twitter":"https://www.facebook.com/"+response[i].uid,"type":1,"user_id":response[i].uid})  
	    		  }
	    		  
	    		 
		    	 // $("#analysis_facebook .content_right").append("<div id='div_error_fb' style='width:100%; height:100%;position:absolute;z-index:9999;top:0'></div>")
		    	 // $("#analysis_facebook .itemLoading").hide();  
		    	 // checkAccountFqlError(data_source,"facebookpage");
	    	  }
	    	  showTopInfluence();
	      });
}
function getfriendFb_page(strid){
	var list_id=strid.substring(1); 
	 var query = 'SELECT page_id,name,fan_count from page where page_id in ('+list_id+')';
	  FB.api({method: 'fql.query',
	        query: query,access_token:token_fb
	      },function(response) {
	    	  if(response.length>0){
	    		  for(var i=0; i<response.length;i++){
	    			  array_top_influence.push({"screen_name":response[i].name,"friends":response[i].fan_count,"url_twitter":"https://www.facebook.com/"+response[i].page_id,"type":1,"user_id":response[i].page_id})  
	    		  }
	    		  
		    	 // $("#analysis_facebook .content_right").append("<div id='div_error_fb' style='width:100%; height:100%;position:absolute;z-index:9999;top:0'></div>")
		    	 // $("#analysis_facebook .itemLoading").hide();  
		    	 // checkAccountFqlError(data_source,"facebookpage");
	    	  }
	    	  showTopInfluence();
	      });
}
function getInfluenceSearchFb(array_keyword){
	var str_keyword_fb='';
	for(var i=0; i<array_keyword.length;i++){
		if(array_keyword[i].type==1){
			str_keyword_fb=str_keyword_fb+" | "+ array_keyword[i].keyword;
		}
	}
	if(str_keyword_fb!=""){
		influenceSearchFacebook(str_keyword_fb);
	}
	
	
}
function getInfluenceSearchTw(array_keyword){
	var str_keyword_tw='';

	for(var i=0; i<array_keyword.length;i++){
		 if(array_keyword[i].type==3)
			{
			str_keyword_tw=str_keyword_tw+" "+ array_keyword[i].keyword;
	
	      }
	
}
	if(str_keyword_tw!=""){
		influenceSearchTwitter(str_keyword_tw);
	}
}
function influenceSearchTwitter(str_keyword_tw){
	var keyword=str_keyword_tw.substring(1);
	var token = token_tw.split("_");
	var dataString=[];
	 dataString.push({
      name: "token", 
      value: token[0]
  });
	 dataString.push({
	        name: "token_secret", 
	        value: token[1]
	    });
	 dataString.push({
	        name: "key_word", 
	        value: keyword
	    });
	 dataString.push({
	        name: "Action", 
	        value: "searchtw"
	    });
		$.ajax({
			  url : 'Twitter.do',
			  dataType: 'json',
			  data:dataString,
			  success : function(source) {
				 if(source.length>0){
					 for(var i=0; i<source.length; i++){
						 array_top_influence = array_top_influence.filter(function(v) { return v != source[i].screen_name;});
						 
						 array_top_influence.push({"screen_name":source[i].screen_name,"friends":source[i].friends,"url_twitter":"https://www.twitter.com/"+source[j].screen_name,"type":3,"user_id":source[j].user_id}); 
					 }
					
				 }
				 showTopInfluence();
				  }
			  });
	
	
}
function influenceSearchFacebook(str_keyword_fb){
	var keyword=str_keyword_fb.substring(1);
	var dataString=[];
	 dataString.push({
      name: "access_token", 
      value: token_fb
  });

	 dataString.push({
	        name: "key_word", 
	        value: keyword
	    });
	 dataString.push({
	        name: "Action", 
	        value: "searchfb"
	    });
		$.ajax({
			  url : 'Facebook.do',
			  dataType: 'json',
			  data:dataString,
			  success : function(source) {
				 if(source.length>0){
					//alert(JSON.stringify(source))
					 var str_id_page="";
					 var str_id_fb="";
					 for(var  i=0; i<source.length;i++){
						 if(source[i].category==1){
							 str_id_page =str_id_page+"," +source[i].user_id;
						 }
						 else
							 {
							 str_id_fb =str_id_fb+"," +source[i].user_id;
							 }
					 }
					 getfriendFb_page(str_id_page);
					 getfriendFb(str_id_fb);
				 }
				 //showTopInfluence();
				  }
			  });
}
function unique(arr) {
    var comparer = function compareObject(a, b) {
        if (a.screen_name == b.screen_name) {
                return 0;
        } else
        	{
        	return 1;
        	}
    }

    arr.sort(comparer);
    var end;
    for (var i = 0; i < arr.length - 1; ++i) {
        if (comparer(arr[i], arr[i+1]) === 0) {
            arr.splice(i, 1);
        }
    }
    return arr;
}
function addFriend(id){
	FB.ui({
		  method: 'friends',
		  id: id
		}, function(response){
			if(!isNull(response))
			  aoFrm.mess("mess",mess.message_addfriend);
		});
}
function followingFB(id){
	//http://www.facebook.com/plugins/follow.php?href=http%3A%2F%2Fwww.facebook.com%2Fzuck&width&height=80&colorscheme=dark&layout=button&show_faces=true&appId=522800927792341
}

function messageDetailBrandKeyword(post_id,message,avatar_post,time_post,create_at,name,token_user,channel_detail_id,link_post,class_like,picture,link_picture,display_comment,display_like){
	$("#content_search").hide();
	$("#message_detail_brand_keyword").show();
	$("#message_detail_brand_keyword").empty();
	$("#cancel_detail").show();
	var url_profile_post= 'https://www.facebook.com/' + channel_detail_id;
	var div="message_detail_brand_keyword";
	var like="unlike";
	var avatar_comment = "https://graph.facebook.com/"+channel_detail_id+"/picture";
	if(class_like=="icon-thumbs-down"){
		like="unlike";	
	}
	else
		{
		 like="like";
		}
	var display="none";
	if(isNull(picture)){
		display="none";
	}
	else
		{
		display="";
		}
	var html_messge=''
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
		            +'<div id="like-click" class="menuLike '+like+'" title="" style="display:'+display_like+'"><i id="like_'+post_id+'" class="'+class_like+'"></i></div>'
                   
		            +'<div style="display:'+display_comment+'" class="post_comment"><div class="gray facebook comment"><div id="select_channel_fb" class="avatar"><img  title="Select channel comment" src="'+avatar_comment+'" class="avatar-small"><span class="caret" title="Select channel comment" ></span></div></div><div  class="arrow-box-left content"><div class="block-content"><input type="text" id="txtComment" placeholder="Write a comment..."></input></div></div></div></div>'
		           
		            
		            +'<div id="show_comment" class="block-comment"></div>'
		            +'</li> ' 
		           // alert(html_messge)
		            $("#message_detail_brand_keyword").append(html_messge);
					getComment(post_id,channel_detail_id,token_user)
					
					$("#txtComment").keydown(function(e) {
			            if(e.keyCode==13){
			            	  //if(e.keyCode==13){
					            	var token="";
					            	//var id = $(this).parent().parent().parent().parent().attr("id");
					            	//var access_token = $(this).parent().parent().parent().parent().attr("access-token");
					            	var current_token=$(this).parent(this).parent(this).attr("token");
									if(!isNull(current_token)){
										token=current_token;
									}
									else
										{
										token = token_fb;
										}
					               	postComment(post_id,token,channel_user_fb,avatar_comment);
					            	$(this).val("");
					            	
					            	//idWaitForLoad = id;
					            	/*setTimeout(function(){
					            		// getComment(idWaitForLoad,id,token);
					            	},1000);*/
					            	//var count = $(this).parent().parent().parent().parent().attr("count");
					            	/*setTimeout(function(){
										
									},3000);*/
											
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
					$("#analysis_brand_keyword #select_channel_fb").click(function(){
						var _top = $(this).offset().top + $(this).innerHeight()- 77;
						$("#select_fb").css("top",_top);
						var post_id=$(this).parent().parent().parent().attr("id");
						$("#select_fb").show();
						$("#select_fb").attr("post_id",post_id);
						 $(document.body).mousedown(function(event) {
							 var target = $(event.target);
	                         if (!target.parents().andSelf().is('#list_facebook')) { // Clicked outside
	                        	 $("#select_fb").hide();
	                         }
	                     });
					});
					$("#list_facebook .list_facebook").click(function(){
			   			//var id=$(this).attr("id");
			   			//var id_str=id.split("_");
			   			//var channel_detail_id= id_str[1];
			   			
			   			//var post_id=$(this).parent().parent().attr("post_id");
			   			$("#"+div+" #"+post_id).attr("token",$(this).attr("token"));
			   			$("#"+div+" #"+post_id).attr("profile_id",$(this).attr("id"));
			   			$("#"+div+" #"+post_id).attr("user_name",$(this).attr("title"));
			   			$("#"+div+" #"+post_id+ " #select_channel_fb img").attr("src",$(this).attr("avatar"));
						  $("#select_fb").hide();
			   			//updateChannel_Default_Select(channel_detail_id,1,1);
					});
}