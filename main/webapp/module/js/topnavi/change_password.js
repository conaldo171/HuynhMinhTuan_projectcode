
/***************************************************************************
 Page Code:	topnavi/group_member
 First Author:
 Created Date: 
 **************************************************************************/
 
$(document).ready(function() {	
		$( "#btnChange_pass" ).click(function() {
		var oldpassword = $("#txt_oldpassword").val();
		var newpassword =   $("#txt_newpassword").val();
		var confirmpassword =   $("#txt_confirmpassword").val();
		changePassword(oldpassword,newpassword,confirmpassword);
		});
	});

function changePassword(oldpassword,newpassword,confirmpassword){
    var list = [];
	if(newpassword!= confirmpassword) {
		//alert('Your passwords do not match. Please type more carefully.');
		aoFrm.mess('alert','Your passwords do not match. Please type more carefully.')
		return false;
	}

	list.push({
		name: "newpassword",
		value: newpassword
	});
	list.push({
		name: "oldpassword",
		value: oldpassword
	});
	list.push({
		name: "Action",
		value: "changepassword"
	});
	//updateperson
	
	$.ajax({
		 type:'POST',
		  url : 'Profile.do',
		  dataType: 'text',
		  data: list,
		  success : function(source) {
			  if (source.trim()!="0"){
				//  $(parent + " .alert-error").addClass("hide");
				  aoFrm.mess("mess",mess.password_update);
				 // $("#idcancel").click();
			  }
			  else
				  {
				  aoFrm.mess("alert",mess.password_update_wrong);
				  }
		  }
	
	});
}