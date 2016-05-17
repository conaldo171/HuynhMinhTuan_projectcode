function inviteMember() {
	var listChannel_detail = new Array();

	$("#invite").find("input:checked").each(function(i, ob) {
		listChannel_detail.push($(ob).val());
		// listChannel_detail+= $(ob).val()+",";
	});
	var parent = "#invite";
	$(parent + " form").parsley('validate');

	if (!$(parent + " form").parsley('isValid')) {

		$(parent + " .alert-error").removeClass("hide");
		$(parent + " .alert-success").addClass("hide");
		return false;
	}
	var email = $("#email_invi").val();
	var firstname = $("#firstname_invi").val();
	var lastname = $("#lastname_invi").val();
	var permission = $("#permission").val();
	var contentemail="";
	var titleemail="";
	if(!isNull(localStorage.lang)){
		var lang_config=localStorage.lang;
		if(lang_config=="en"){
			contentemail= array_content_email_en[0].__contentemailinvite;
			titleemail=array_content_email_en[0].__titleemailinvite;
		}
		else if(lang_config=="kr")
			{
			contentemail= array_content_email_kr[0].__contentemailinvite;
			titleemail=array_content_email_kr[0].__titleemailinvite;
			}
		else if(lang_config=="vn")
			{
			contentemail= array_content_email_vn[0].__contentemailinvite;
			titleemail=array_content_email_vn[0].__titleemailinvite;
			}
		else
		{
		contentemail= array_content_email_en[0].__contentemailsignup;
		titleemail=array_content_email_en[0].__titleemailsingup;
		}
	}
	else
		{
		contentemail= array_content_email_en[0].__contentemailinvite;
		titleemail=array_content_email_en[0].__titleemailinvite;
		}
	var data = [];
	data.push({
		name : "firstname",
		value : firstname
	});
	data.push({
		name : "lastname",
		value : lastname
	});
	data.push({
		name : "email",
		value : email
	});

	
	data.push({
		name : "list_channel_detail",
		value : "'" + listChannel_detail + "'"
	});
	data.push({
		name : "permission",
		value : permission
	});
	data.push({
		name: "contentemail",
		value: contentemail
	});
	data.push({
		name: "titleemail",
		value: titleemail
	});
	$.ajax({
		type : 'POST',
		url : 'InviteMember.do',
		dataType : 'text',
		data : data,
		success : function(source) {

			if (source.trim() != "0") {
				if (source.trim() == "error") {
					window.location = "login.jsp";
				} else {
					// window.location = "RegisterSuccess.jsp?email="+email;
					$(parent + " .alert-error").addClass("hide");
					$("#email_invi").val("");
					$("#firstname_invi").val("");
					$("#lastname_invi").val("");
					aoFrm.mess("mess", mess.invite_sent);
				}

			}

			else {
				$(parent + " .alert-error").removeClass("hide");
				$(parent + " .alert-error").text("Email does exist");
			}

		}

	});
}
function updateMember() {
		var listChannel_detail = new Array();
    $("#invite").find("input:checked").each(function(i, ob) {
		listChannel_detail.push($(ob).val());
	});
	var permission = $("#permission").val();
	var data = [];
	data.push({
		name : "member_id",
		value : member_id
	});
	data.push({
		name : "list_channel_detail",
		value : "'" + listChannel_detail + "'"
	});
	data.push({
		name : "permission",
		value : permission
	});
	data.push({
		name : "Action",
		value : "update"
	});
	$.ajax({
		type : 'POST',
		url : 'InviteMember.do',
		dataType : 'text',
		data : data,
		success : function(source) {
			
     		if (source.trim() != "-1") {
				if (source.trim() == "error") {
					window.location = "login.jsp";
				} else {
					//alert(source)
					// window.location = "RegisterSuccess.jsp?email="+email;
					//$(parent + " .alert-error").addClass("hide");
				
					aoFrm.mess("mess", "Update successful");
				}

			}

		}

	});
}