	var email;
	var password;
	var checkRemem = 0;

	$( document ).ready(function() {
		//clickCheck();
    	checkRemember();
		$("#pass").keydown(function(e) {
            if(e.keyCode==13){
				login();
			}			
        });
		
		try {
	          if (isNull(localStorage.lang))
	           {
	        	  //$.ajax("http://ipinfo.io", function(response) {
	        	  $.get("http://www.codehelper.io/api/ips/?js", function(response) {
	        		  //var country = response.country;
		  			    var country = response.Country;
		  			    country = country.toLowerCase();
		  			    var list_lg = config.list_lang;	
		  			   
		  			    for(var i=0;i<list_lg.length;i++){
		  			    	if(list_lg[i]==country)
		  			    	{
		  			    		config.main_lang = country;
		  			    		localStorage.lang = country;
		  			    	}
		  			    }			    
		  			    aoFrm.setLang("#aoFrm","login/login");
		  			    aoFrm.loadMessage();
		  			    
		  			},"jsonp").done(function() {
		  				
		  			})
		  			.fail(function(jqXHR, textStatus, errorThrown) { 
			  				aoFrm.setLang("#aoFrm","login/login");aoFrm.loadMessage();
			  			})
		  			.always(function() {
		  				
		  			});
	        	  
	              }
			      else
			        {
			           aoFrm.setLang("#aoFrm","login/login");
			           aoFrm.loadMessage();
			        }
	        
	    } catch (e) {
	    	aoFrm.setLang("#aoFrm","login/login");
	    	aoFrm.loadMessage();
	    }	
	});
	
	function checkRemember(){
		checkRemem = getCookie("checkRemem");
		if (checkRemem == 1){
			$(".block-remember i").attr("class","icon-check");
			$(".block-remember i").removeClass("uncheck");
			$(".block-remember i").addClass("checked");
			$(".loginform .input-prepend input").change(function(){
				setCookie("email",$("#email").val(),2);
				//$("#email").attr("value",getCookie("email"));
				//$("#pass").attr("value",getCookie("password"));
				//setCookie("email",$("#email").val(),2);
				//setCookie("password",$("#pass").val(),2);
			});
			$("#email").attr("value",getCookie("email"));
			//$("#pass").attr("value",getCookie("password"));
		}else{
			$("#email").attr("value","");
			//$("#pass").attr("value",getCookie("password"));
		}
		setCookie("email",$("#email").val(),2);
		//setCookie("password",$("#pass").val(),2);
		
	}
	
	function clickCheck(){
		if($(".block-remember i").hasClass("checked")){
			checkRemem = 0;
			$(".block-remember i").attr("class","icon-check-empty");
			$(".block-remember i").removeClass("checked");
			$(".block-remember i").addClass("uncheck");
			setCookie("checkRemem",checkRemem,2);
		}else{
			checkRemem = 1;
			$(".block-remember i").attr("class","icon-check");
			$(".block-remember i").addClass("checked");
			$(".block-remember i").removeClass("uncheck");
			setCookie("checkRemem",checkRemem,2);
			setCookie("email",$("#email").val(),2);
			//setCookie("password",$("#pass").val(),2);
		}
	}
	/*******************************************************************************
	 * enumerateObject
	 ******************************************************************************/
	function isNull(obj) {
		return (obj == null || typeof obj == 'undefined' || obj == "");
	}
	function login(){
		var curdate = new Date();
		var offset = curdate.toString().match(/([A-Z]+[\+-][0-9]+.*)/)[1];
		var gmt= offset.substring(0,8);
		$("#login").addClass("itemLoading");
		var parent = ".loginPage";
		$(parent + " form").parsley('validate');
	    if(!$(parent + " form").parsley('isValid')) { 
	    	
	       $(parent + " .alert-error").removeClass("hide");
	       $(parent + " .alert-success").addClass("hide");
	       return false;
	    }
	    
	
	    email = $("#email").val();		
		password = $("#pass").val();
		var list = [];
		list.push({
			name: "email",
			value: email
		});
		list.push({
			name: "gmt",
			value: gmt
		});
		list.push({
			name: "password",
			value: password
		});
		$.ajax({
			 type:'POST',
			  url : 'CheckLogin.do',
			  dataType: 'json',
			  data: list,
			  success : function(source) {
				
				  if (source.length == 0){
					  $(parent + " .alert-error").removeClass("hide");
					  $(parent + " .alert-error").text("Wrong email or password.");
				  } else{
					 
					  check_exprired=source[0].exprire;
					
					  $("#login").addClass("itemLoading");
					  window.location = ("./");
				  }
			  }
		
		});
	}
	function resetPassword(){ 
		var contentemail="";
		var titleemail="";
		if(!isNull(localStorage.lang)){
			var lang_config=localStorage.lang;
			if(lang_config=="en"){
				contentemail= array_content_email_en[0].__contentemailresetpass;
				titleemail=array_content_email_en[0].__titleresetpassword;
			}
			else if(lang_config=="kr")
				{
				contentemail= array_content_email_kr[0].__contentemailresetpass;
				titleemail=array_content_email_kr[0].__titleresetpassword;
				}
			else if(lang_config=="vn")
				{
				contentemail= array_content_email_vn[0].__contentemailresetpass;
				titleemail=array_content_email_vn[0].__titleresetpassword;
				}
			else
			{
			contentemail= array_content_email_en[0].__contentemailresetpass;
			titleemail=array_content_email_en[0].__titleresetpassword;
			}
		}
		else
			{
			contentemail= array_content_email_en[0].__contentemailresetpass;
			titleemail=array_content_email_en[0].__titleresetpassword;
			}
		
		//return false;
		var parent = "#divResetPassword";
		$(parent + " form").parsley('validate');
	    if(!$(parent + " form").parsley('isValid')) { 
	       $(parent + " .alert-error").removeClass("hide");
	       $(parent + " .alert-success").addClass("hide");
	       return false;
	    }
	    
	  var  email = $("#emailreset").val();
	 
		
		var list = [];
		list.push({
			name: "email",
			value: email
		});
		list.push({
			name: "contentemail",
			value: contentemail
		});
		list.push({
			name: "titleemail",
			value: titleemail
		});
		
		$.ajax({
			 type:'POST',
			  url : 'ResetPassword.do',
			  dataType: 'text',
			  data: list,
			  success : function(source) {
				 
				  if (source.trim() == 0){
					  $(parent + " .alert-error").text("Wrong email");
				  } 
				  else
					  {
					  //aoFrm.mess("mess","Message has been save");
					  $("#idcancel").click();
					  }
			  }
		
		});
	}
	
	
	
	

