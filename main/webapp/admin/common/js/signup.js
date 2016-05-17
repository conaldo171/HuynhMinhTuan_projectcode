// JavaScript Document
$(document).ready(function(e) {
	$(".block-terms i").click(function(){
		if($(this).hasClass("checked")){
		
			$(this).attr("class","icon-check-empty");
			$(this).removeClass("checked");
			$(this).addClass("uncheck");
		}else{
			$("#temrs").hide();
			$(this).attr("class","icon-check");
			$(this).addClass("checked");
			$(this).removeClass("uncheck");
		}
	});
	aoFrm.setLang("#aoFrm","signup/signup");
	aoFrm.loadMessage();
});


function signup(){
	
	var parent = ".signupPage";
	$(parent + " form").parsley('validate');
	
    if(!$(parent + " form").parsley('isValid')) { 
    	
       $(parent + " .alert-error").removeClass("hide");
       $(parent + " .alert-success").addClass("hide");
       return false;
    }
    if($(".block-terms .icon-check").hasClass("checked")){
    	$("#temrs").hide();
    	
    	 var email = $("#email").val();
		    var firstname = $("#firstname").val();
		    var lastname= $("#lastname").val();
			var password = $("#password").val();
			var company_name =$("#company").val();
			var cell_phone=$("#cell_phone").val();
			var industry=$("#industry").val();
			var contentemail="";
			var titleemail="";
			if(!isNull(localStorage.lang)){
				var lang_config=localStorage.lang;
				if(lang_config=="en"){
					contentemail= array_content_email_en[0].__contentemailsignup;
					titleemail=array_content_email_en[0].__titleemailsingup;
				}
				else if(lang_config=="ko")
					{
					contentemail= array_content_email_ko[0].__contentemailsignup;
					titleemail=array_content_email_ko[0].__titleemailsingup;
					}
				else
					{
					contentemail= array_content_email_en[0].__contentemailsignup;
					titleemail=array_content_email_en[0].__titleemailsingup;
					}
			}
			else
				{
				contentemail= array_content_email_en[0].__contentemailsignup;
				titleemail=array_content_email_en[0].__titleemailsingup;
				}
			var data =[];
			data.push({
				name: "firstname",
				value: firstname
			});
			data.push({
				name: "lastname",
				value: lastname
			});
			data.push({
				name: "email",
				value: email
			});
			data.push({
				name: "password",
				value: password
			});
			data.push({
				name: "company_name",
				value: company_name
			});
			data.push({
				name: "cell_phone",
				value: cell_phone
			});
			data.push({
				name: "industry",
				value: industry
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
								 type:'POST',
								  url : 'Signup.do',
								  dataType: 'text',
								  data: data,
								  success : function(source) {
									
									  if(source.trim()!="0"){
										  window.location = "RegisterSuccess.jsp?email="+email+"&active=signup";
										  $(parent + " .alert-error").addClass("hide");
									  }
									  else
										{
										  $(parent + " .alert-error").removeClass("hide");
										  $(parent + " .alert-error").text("Email does exist");
										}
									 
								  }
							
							});
    	}
			else
			{
			$("#temrs").show();
			}
   

      
	
}