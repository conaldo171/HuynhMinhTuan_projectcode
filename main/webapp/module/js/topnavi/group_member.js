/***************************************************************************
 Page Code:	topnavi/group_member
 First Author:
 Created Date: 
 **************************************************************************/
 var member_id;
$(document).ready(function() {
	if(check_exprired=="1"){
		aoFrm.mess("alert",mess.message_exprire);
	}
  var permit	=$("#permit").val();
    aoFrm.setLang("#aoFrm-content","topnavi/group_member");
	  $.get("module/view/topnavi/profile.jsp", function( data ) {
			$("#content_right").html( data );
			
			aoFrm.setLang("#topnavi_profile","topnavi/profile");
			loadUserProfile();
			});
	
	  $( "#personalsetting" ).addClass("active");
	$( "#personalsetting" ).click(function() {
		$("#topnavi_group_member #menu_left li a").removeClass("active");
		$(this).addClass("active");
		$.get("module/view/topnavi/profile.jsp", function( data ) {
			$("#content_right").html( data );
			//var jsLang = "module/languages/" + config.main_lang + "/topnavi/profile" + ".js";
			aoFrm.setLang("#topnavi_profile","topnavi/profile");
			loadUserProfile();
			
		});
		
		});
	//--------------tuan 10-4-14-change password----------
	$( "#changePassword" ).click(function() {
		$("#topnavi_group_member #menu_left li a").removeClass("active");
		$(this).addClass("active");
		$.get("module/view/topnavi/change_password.jsp", function( data ) {
			$("#content_right").html( data );
			aoFrm.setLang("#topnavi_profile","topnavi/change_password");
			
			});
		});
	//inviteMember
	$( "#inviteMember" ).click(function() {
		//
		$("#topnavi_group_member #menu_left li a").removeClass("active");
		$(this).addClass("active");
		$.get("module/view/topnavi/invite_member.jsp", function( data ) {
			$("#content_right").html( data );
			aoFrm.setLang("#topnavi_profile","topnavi/invite_member");
			$.ajax({
				  url : 'GetChannelDetail.do',
				  dataType: 'json',
				  success : function(source) {
					  $("#facebookaccount").empty();
						 $("#pageacountlist").empty();
						for(var i=0; i<source.length;i++){
							if(source[i].channel_id=="2"||source[i].channel_id=="1"){
								var html='<li><label title="'+source[i].channel_user+'" >'+source[i].channel_user+'</label><input id="'+source[i].channel_detail_id+'" class="checkinput" type="checkbox" value="'+source[i].channel_detail_id+'" ></li>';
								  $("#facebookaccount").append(html);
							}
							else
								{
								var html='<li><label title="'+source[i].channel_user+'" >'+source[i].channel_user+'</label><input id="'+source[i].channel_detail_id+'" class="checkinput" type="checkbox" value="'+source[i].channel_detail_id+'" ></li>';
								  $("#twitteraccount").append(html);
								}
							 
						}
						 var js_link = '<script type="text/javascript" src="module/js/topnavi/invite_member.js" ></script>';
	    				   $("#appScript").append(js_link);
					}
			  });
			});
		});
	$( "#userGroup" ).click(function() {
		$("#topnavi_group_member #menu_left li a").removeClass("active");
		$(this).addClass("active");
		$.get("module/view/topnavi/user_group_child.jsp", function( data ) {
			$("#content_right").html( data );
			aoFrm.setLang("#topnavi_profile","topnavi/user_group_child");
			loadChannelProfile();
			loadTeamMember();
			
			});
		});
	
	});

function saveUserProfile(){
	var parent = "#persional";
    if(!$(parent + " #form-persional").parsley('isValid')) { 	    	
       $(parent + " .alert-error").removeClass("hide");
       $(parent + " .alert-success").addClass("hide");
       return false;
    }
    var first_name = $("#firstname").val();
    var last_name = $("#lastname").val();
    var email = $("#email").val();
    var cell_phone = $("#cell_phone").val();
    var company_name = $("#company_name").val();
    var company_website = $("#company_website").val();
    var company_address = $("#company_address").val();
    var list = [];
	list.push({
		name: "first_name",
		value: first_name
	});
	list.push({
		name: "last_name",
		value: last_name
	});
	list.push({
		name: "email",
		value: email
	});
	list.push({
		name: "cell_phone",
		value: cell_phone
	});
	list.push({
		name: "company_name",
		value: company_name
	});
	list.push({
		name: "company_website",
		value: company_website
	});
	list.push({
		name: "company_address",
		value: company_address
	});
	$.ajax({
		 type:'POST',
		  url : 'Profile.do',
		  dataType: 'text',
		  data: list,
		  success : function(source) {
			  if (source.trim()!="0"){
				  $(parent + " .alert-error").addClass("hide");
				  aoFrm.mess("mess",mess.user_update);
			  }
		  }
	
	});
}
 function loadUserProfile(){
	  var data =[];
		data.push({
			name: "Action",
			value: "user_by_id"
		});
		$.ajax({
			  url : 'GetData.do',
			  dataType: 'json',
			  data:data,
			  success : function(source) {
				  for(var i=0; i<source.length;i++){
						//$("#user_name_select").prepend(source[i].first_name +" "+source[i].last_name);	
					    $("#firstname").val(source[i].first_name);
					    $("#lastname").val(source[i].last_name);
					    $("#email").val(source[i].email);
					    $("#cell_phone").val(source[i].cell_phone);
					    $("#company_name").val(source[i].company_name);
					    $("#company_website").val(source[i].company_website);
					    $("#company_address").val(source[i].company_address);
				  }
				  	  
			  }
		});
		
 }
function loadChannelProfile(){
	$.ajax({
		  url : 'GetChannelDetail.do',
		  dataType: 'json',
		  success : function(source) {
			  $("#facebookaccount").empty();
				 $("#pageacountlist").empty();
				for(var i=0; i<source.length;i++){
					if(source[i].channel_id=="2"){
						var html='<li id="'+source[i].user_id+'_'+source[i].channel_detail_id+'"  class="account clearfix"><div class="avatar"><img class="avatar-small" src="'+source[i].channel_picture+'"><i class="icon-facebook-sign blue channel-icon" ></i></div><div class="account-name" >'+source[i].channel_user+'</div><span  onclick="deleteProfile('+"'"+source[i].channel_detail_id+"'"+','+"'"+source[i].user_id+"'"+');" class="remove ficon glow_x" title="Remove">x</span></li>';
						  $("#profileaccount").append(html);
					}
					else if(source[i].channel_id=="1")
						{
						var html='<li id="'+source[i].user_id+'_'+source[i].channel_detail_id+'"  class="account clearfix"><div class="avatar"><img class="avatar-small" src="'+source[i].channel_picture+'"><i class="icon-facebook-sign blue channel-icon" ></i></div><div class="account-name" >'+source[i].channel_user+'</div><span onclick="deleteProfile('+"'"+source[i].channel_detail_id+"'"+','+"'"+source[i].user_id+"'"+');" class="remove ficon glow_x" title="Remove">x</span></li>';
				   		  $("#profileaccount").append(html);
						}
					else
						{
						var html='<li id="'+source[i].user_id+'_'+source[i].channel_detail_id+'" class="account clearfix"><div class="avatar"><img class="avatar-small" src="'+source[i].channel_picture+'"><i class="icon-twitter-sign blue channel-icon" ></i></div><div class="account-name" >'+source[i].channel_user+'</div><span onclick="deleteProfile('+"'"+source[i].channel_detail_id+"'"+','+"'"+source[i].user_id+"'"+');" class="remove ficon glow_x" title="Remove">x</span></li>';
				   		  $("#profileaccount").append(html);
						}
					 
				}
			}
	  });
}
function loadTeamMember(){
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
					if(source[i].team_role=="1"){
						var html='<li id="'+source[i].user_id+'"  class="account clearfix"><div class="account-name" ><Strong>'+source[i].first_name+' '+source[i].last_name+'</Strong></div><div class="account-name" >'+source[i].email+'</div><div class="account-name" >Owner</div></li>';
						 
					}
					else if(source[i].team_role=="2"){
						//2 admin
						var html='<li id="'+source[i].user_id+'"  class="account clearfix"><div class="account-name" ><Strong>'+source[i].first_name+' '+source[i].last_name+'</Strong></div><span onclick="editProfile('+"'"+source[i].user_id+"'"+','+"'"+source[i].first_name+"'"+','+"'"+source[i].last_name+"'"+','+"'"+source[i].email+"'"+','+"'"+source[i].team_role+"'"+');" title="Edit Team member" class="remove glow_x"><i class="icon-edit remove"></i></span><div class="account-name" >'+source[i].email+'</div><span onclick="deleteTeamMember('+"'"+source[i].user_id+"'"+');" title="Delete Team member" class="remove glow_x"><i class=" icon-remove-sign remove"></i></span><div id="account_name_'+source[i].user_id+'" per="'+source[i].team_role+'" class="account-name" >Admin</div></li>';
						  
					}
					else if(source[i].team_role=="3"){
						//3 client
						var html='<li id="'+source[i].user_id+'"  class="account clearfix"><div class="account-name" ><Strong>'+source[i].first_name+' '+source[i].last_name+'</Strong></div><span onclick="editProfile('+"'"+source[i].user_id+"'"+','+"'"+source[i].first_name+"'"+','+"'"+source[i].last_name+"'"+','+"'"+source[i].email+"'"+','+"'"+source[i].team_role+"'"+');" title="Edit Team member" class="remove glow_x"><i class="icon-edit remove"></i></span><div class="account-name" >'+source[i].email+'</div><span onclick="deleteTeamMember('+"'"+source[i].user_id+"'"+');" title="Delete Team member" class="remove glow_x"><i class=" icon-remove-sign remove"></i></span><div id="account_name_'+source[i].user_id+'" per="'+source[i].team_role+'" class="account-name" >Client</div></li>';
						  
					}
					else{
						var html='<li id="'+source[i].user_id+'"  class="account clearfix"><div class="account-name" ><Strong>'+source[i].first_name+' '+source[i].last_name+'</Strong></div><span onclick="editProfile('+"'"+source[i].user_id+"'"+','+"'"+source[i].first_name+"'"+','+"'"+source[i].last_name+"'"+','+"'"+source[i].email+"'"+','+"'"+source[i].team_role+"'"+');" title="Edit Team member" class="remove glow_x"><i class="icon-edit remove"></i></span><div class="account-name" >'+source[i].email+'</div><span onclick="deleteTeamMember('+"'"+source[i].user_id+"'"+');" title="Delete Team member" class="remove glow_x"><i class=" icon-remove-sign remove"></i></span><div id="account_name_'+source[i].user_id+'" per="'+source[i].team_role+'" class="account-name" >Team Member</div></li>';
						
					}
					  $("#teammembers").append(html);
				}
			}
	  });
}
function deleteProfile(channel_detail_id, user_id){
	var r=confirm(mess.confirm_delete_profile);
	if (r==true)
	  {
		$("#"+user_id+"_"+channel_detail_id).remove();
		var dataString = [];
		dataString.push({
			name: "user_id",
			value: user_id
		});
		dataString.push({
			name: "channel_detail_id",
			value: channel_detail_id
		});
		 $.ajax({
			 type:'POST',
			  url : 'DeleteChannel.do',
			  dataType: 'text',
			  data: dataString,
			  success : function(source) {
				  aoFrm.mess("mess",mess.delete_profile);  
			  }
		 });
	  }
	else
	  {
	  //x="You pressed Cancel!";
	  }
	
}
function editProfile(user_id,first_name, last_name, email,per){
	member_id=user_id;
	$.get("module/view/topnavi/invite_member.jsp", function(data) {
		$("#content_right").html( data );
		$("#permission option").each(
				function() {
					$('#permission option[value='+ per+ ']').attr("selected","selected");
				});
		$("#firstname_invi").val(first_name);
		$("#lastname_invi").val(last_name);
		$("#email_invi").val(email);
		$("#btnSave").hide();
		$("#btnUpdate").show();
		$.ajax({
			  url : 'GetChannelDetail.do',
			  dataType: 'json',
			  success : function(source) {
				  $("#facebookaccount").empty();
					 $("#pageacountlist").empty();
					 var dataString=[];
					 dataString.push({
							name: "Action",
							value: "listassign"
						});
					 dataString.push({
							name: "user_assign",
							value: user_id
						});
					 $.ajax({
						  url : 'GetChannelDetail.do',
						  dataType: 'json',
						  data:dataString,
						  success : function(sourceAssign) {
							  for(var i=0; i<source.length;i++){
								  if(source[i].channel_id=="2"||source[i].channel_id=="1"){
										var html='<li><label title="'+source[i].channel_user+'" >'+source[i].channel_user+'</label><input id="'+source[i].channel_detail_id+'" class="checkinput" type="checkbox" value="'+source[i].channel_detail_id+'" ></li>';
										  $("#facebookaccount").append(html);
									}
									else
										{
										var html='<li><label title="'+source[i].channel_user+'" >'+source[i].channel_user+'</label><input id="'+source[i].channel_detail_id+'" class="checkinput" type="checkbox" value="'+source[i].channel_detail_id+'" ></li>';
										  $("#twitteraccount").append(html);
										}
								  	for(var h=0; h<sourceAssign.length;h++){
										if(source[i].channel_detail_id==sourceAssign[h].channel_detail_id){
											$("#"+sourceAssign[h].channel_detail_id).attr("checked","checked"); 
									}
									
									}
						  }
						  }
					 });
				
					 var js_link = '<script type="text/javascript" src="module/js/topnavi/invite_member.js" ></script>';
    				   $("#appScript").append(js_link);
				}
		  });
		//var id= $("#account_name_"+user_id).attr("per");
		//alert(per);
		
		});
	
}
function deleteTeamMember(user_id){
	var r=confirm(mess.delete_confirm_member);
	if (r==true){
		$("#"+user_id).remove();
		var dataString = [];
		dataString.push({
			name: "user_id",
			value: user_id
		});
		dataString.push({
			name: "Action",
			value: "DeleteMember"
		});
		 $.ajax({
			 type:'POST',
			  url : 'Profile.do',
			  dataType: 'text',
			  data: dataString,
			  success : function(source) {
				  aoFrm.mess("mess",mess.delete_member);  
			  }
		 });
	}
	
}
//inviteMember