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
	if(localStorage.lang=="kr"){
		$("#term_of_service").attr("href","http://www.enpick.com/enpick_kr/service.jsp")
	}
	else
		{
		$("#term_of_service").attr("href","http://www.enpick.com/enpick_en/service.jsp")
		}
});

/*******************************************************************************
 * enumerateObject
 ******************************************************************************/
function isNull(obj) {
	return (obj == null || typeof obj == 'undefined' || obj == "");
}
function signup(promotion){
	var pr="";
	if(!isNull(promotion)){
		pr=promotion
	}
	else
		{
		pr=""
		}
	var parent = ".signupPage";
	$(parent + " form").parsley('validate');
	
    if(!$(parent + " form").parsley('isValid')) { 
    	
       $(parent + " .alert-error").removeClass("hide");
       $(parent + " .alert-success").addClass("hide");
       return false;
    }
    if($(".block-terms .icon-check").hasClass("checked")){
    	$("#temrs").hide();
    	var curdate = new Date();
		var offset = curdate.toString().match(/([A-Z]+[\+-][0-9]+.*)/)[1];
		var gmt= offset.substring(0,8);
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
				else if(lang_config=="kr")
					{
					contentemail= array_content_email_kr[0].__contentemailsignup;
					titleemail=array_content_email_kr[0].__titleemailsingup;
					}
				
				else if(lang_config=="vn")
					{
					contentemail= array_content_email_vn[0].__contentemailsignup;
					titleemail=array_content_email_vn[0].__titleemailsingup;
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
			data.push({
				name: "start_date",
				value: formatDateTimeCurrent()
			});
			data.push({
				name: "promotion",
				value: pr
			});
			data.push({
				name: "gmt",
				value: gmt
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
