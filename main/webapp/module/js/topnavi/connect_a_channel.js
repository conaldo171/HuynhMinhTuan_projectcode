/***************************************************************************
 Page Code:	topnavi/connect_a_channel
 First Author:
 Created Date: 
 **************************************************************************/
var list_page = new Array();
var check_connect=false;
$( document ).ready(function() {
	checkExprired();
	getChannelDetail();
	$("#channel_facebook_page").find("div.selected").each(function(i, ob) {
		
		var id=$(this).find("a").attr("id").split("_");
	       	var infor_page= new Array();
	       	var page_id=id[1];
	       	var pchannel_detail_id=id[2];
	    	var url_image=$("#"+page_id).attr("src");
	    	var channel_user=$("#pagename_"+page_id).html();
	    	var token=$(this).attr("token");
	    	var object_channel= new Object();
	    	object_channel.page_id=page_id;
	    	object_channel.url_image=url_image;
	    	object_channel.channel_user=channel_user;
	    	object_channel.pchannel_detail_id=pchannel_detail_id;
	    	object_channel.token=token;
	      	
	    	list_page.push(object_channel);
	});
	$("#connect_a_channel_Popup .action-nav-button a").click(function(e) {
		aoFrm.mess("close");
		$("#connect_a_channel_Popup .action-nav-button").removeClass("selected");
		//$(this).parent(this).removeClass("selected");
       	$(this).parent(this).addClass("selected");
     	current_id=$(this).attr("id");
     	if(current_id=="facebookpage"){
     		$("#processpagebtn").show();
     		$("#processbtn").hide();
     		$("#processtwitterbtn").hide();
     	}
     	if(current_id=="facebookprofile"){
     		$("#processpagebtn").hide();
     		$("#processbtn").show();
     		$("#processtwitterbtn").hide();
     	}
     	
     	if(current_id=="twitter"){
     		$("#processtwitterbtn").show();
     		$("#processpagebtn").hide();
     		$("#processbtn").hide();
     	}
    });
	
	
	$("#connect_a_channel_Popup_Page .action-nav-button a").click(function(e) {
       	$(this).parent(this).addClass("selected");
       	var id=$(this).attr("id").split("_");
       	var page_id=id[1];
       	var pchannel_detail_id=id[2];
    	var url_image=$("#"+page_id).attr("src");
    	var channel_user=$("#pagename_"+page_id).html();
    	var token=$(this).attr("token");
    	var object_channel= new Object();
    	object_channel.page_id=page_id;
    	object_channel.url_image=url_image;
    	object_channel.channel_user=channel_user;
    	object_channel.pchannel_detail_id=pchannel_detail_id;
    	object_channel.token=token;
    	list_page.push(object_channel);

    });
	
	$("#connect_page_btn").click(function(e) {
		var count_channel=0;
		if(!check_connect){
			check_connect=true;
			if(list_page.length==0){
				 aoFrm.mess("alert",mess.choosepage); 
				 return false;
			}
	         for(var i=0;i<list_page.length;i++){
	            
	            	 var id= list_page[i].page_id;
	            	 var page_url=list_page[i].url_image;
	            	  var name_page= list_page[i].channel_user;
	            	  var pchannel_id=list_page[i].pchannel_detail_id;
	            	  var token_fb=list_page[i].token;
	            	//fb_exchange_token
	            	   var dataString =[];
				         dataString.push({
				             name: "channel_user", 
				             value: name_page
				         });
				         dataString.push({
				             name: "fb_exchange_token", 
				             value: token_fb
				         });
				         dataString.push({
				             name: "channel_picture", 
				             value: page_url
				         });
				         dataString.push({
				             name: "channel_id", 
				             value: 2
				         });
				         dataString.push({
				             name: "channel_detail_id", 
				             value: id
				         });
				         dataString.push({
				             name: "pchannel_detail_id", 
				             value: pchannel_id
				         });
				         dataString.push({
				             name: "Action", 
				             value: "pageprofile"
				         }); 
		  		 	      $.ajax({
							 type:'POST',
							  url : 'ConnectChannel.do',
							  dataType: 'text',
							  data: dataString,
							  success : function(source) {
								  count_channel++;
								  if(count_channel==list_page.length){
									  getChannelDetail();
								  }
							  }
		  		 	   });
		  		 	      
	           
	  
	         }

	        $("#cancelconnect").click();
	       
		}
    });
	
});
	

	function getChannelDetail(){
		$.ajax({
			  url : 'GetChannelDetail.do',
			  dataType: 'json',
			  success : function(source) {
				  $("#facebookaccount").empty();
					 $("#pageacountlist").empty();
					 $("#twitteraccount").empty();
					 if(source.length==0){
						 $("#btn_connect_channel").click();
					 }
					 else
						 {
						 for(var i=0; i<source.length;i++){
								if(source[i].channel_id=="2"){
									var html='<li class="account clearfix"><div class="avatar"><img class="avatar-small" src="'+source[i].channel_picture+'"><i class="icon-facebook-sign blue channel-icon" ></i></div><div class="account-name" title="'+source[i].channel_user+'">'+limitString(source[i].channel_user)+'</div></li>';
									  $("#pageacountlist").append(html);
								}
								else if(source[i].channel_id=="1")
									{
									var html='<li class="account clearfix"><div class="avatar"><img class="avatar-small" src="'+source[i].channel_picture+'"><i class="icon-facebook-sign blue channel-icon" ></i></div><div class="account-name" title="'+source[i].channel_user+'">'+limitString(source[i].channel_user)+'</div></li>';
							   		  $("#facebookaccount").append(html);
									}
								else
									{
									var html='<li class="account clearfix"><div class="avatar"><img class="avatar-small" src="'+source[i].channel_picture+'"><i class="icon-twitter-sign blue channel-icon" ></i></div><div class="account-name" title="'+source[i].channel_user+'">'+limitString(source[i].channel_user)+'</div></li>';
							   		  $("#twitteraccount").append(html);
									}
								 
							}
						 }
					
				}
		  });

	}
	
	
	
	
	
	
	
	
	
	
 
	
	
