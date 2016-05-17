<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta name="viewport"
	content="width=device-width, maximum-scale=1, initial-scale=1, user-scalable=0">
<link rel="stylesheet"
	href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,800">
<meta charset="utf-8">
<!-- Always force latest IE rendering engine or request Chrome Frame -->
<meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
<!-- Use title if it's in the page YAML frontmatter -->
<title>Enpick | Register Success</title>
<link href="common/css/main.css" media="screen" rel="stylesheet"
	type="text/css" />
<link href="common/css/application.css" media="screen" rel="stylesheet"
	type="text/css" />
<link href="common/css/login.css" media="screen" rel="stylesheet"
	type="text/css" />
<!--  <script src="common/js/common.js" type="text/javascript"></script>-->
<script src="common/js/config.js" type="text/javascript"></script>
<script src="common/js/plugin.js?v=130916" type="text/javascript"></script>
<script src="common/js/main.js" type="text/javascript"></script>

</head>
<%
	String active = "";
	String email = "";
	String key = "";
	String id = "";
	session.setAttribute("SessionFirstName",null);
	session.setAttribute("SessionLastName",null);
	session.setAttribute("SessionUserId",null);
	session.setAttribute("SessionEmail",null);
	session.setAttribute("SessionCellPhone",null);
	session.setAttribute("SessionCompanyName",null);
	session.setAttribute("SessionCompanyWebsite",null);
	session.setAttribute("SessionCompanyAddress",null);
	session.setAttribute("SessionTeamId",null);
   	session.setAttribute("SessionAdmin",null);
    session.setAttribute("SessionUserId",null);
   
	if (request.getParameter("active") != null)
		active = request.getParameter("active");
	if (request.getParameter("email") != null)
		email = request.getParameter("email");
	if (request.getParameter("key") != null)
		key = request.getParameter("key");
	if (request.getParameter("id") != null)
		id = request.getParameter("id");
%>
<body id="aoFrm" class="loginPage">

	<div class="navbar navbar-top navbar-inverse">
		<div class="navbar-inner">
			<div class="container-fluid">

				<a class="brand" href="login.jsp"><img src="common/images/logo.png"
					height="45" alt="Enpick" />
				</a>

				<!-- the new toggle buttons -->

				<ul class="nav pull-right">

					<li class="toggle-primary-sidebar hidden-desktop"
						data-toggle="collapse" data-target=".nav-collapse-primary"><button
							type="button" class="btn btn-navbar">
							<i class="icon-th-list"></i>
						</button>
					</li>

					<li class="hidden-desktop" data-toggle="collapse"
						data-target=".nav-collapse-top"><button type="button"
							class="btn btn-navbar">
							<i class="icon-align-justify"></i>
						</button>
					</li>

				</ul>
			</div>
		</div>
	</div>
	<div class="container">
		<div class="span6 offset3"
			style="margin-left: 10%; width: 800px; font-size: 13px;">

			<div class="padded">

				<div id="registersuccess" class="login box"
					style="margin-top: 80px;">

					<div class="box-header">
						<span class="title" style="font-size: 20px;" text="registersuccess">Register
							Success</span>
					</div>

					<div class="box-content padded">
						<p>
							<span text="registeremail">Registration Email Sent to</span>
							<%=email%></p>
						<p text="check_your_email">Check your email for the link to complete your
							registration.</p>
						<p text="you_dont_see">If you don't see this email in your inbox within 15
							minutes, look for it in your junk-mail folder. If you find it
							there, please mark the email as Not Junk and add @enpick.com to
							your address book.</p>

					</div>
				</div>
				<div id="activeAlready" class="login box"
					style="margin-top: 80px; display: none">

					<div class="box-header">
						<span class="title" style="font-size: 20px;" text="confirmaccount">Account
							already confirmed</span>
					</div>

					<div class="box-content padded">
						<p style="color: red">
							<span text="accountexist">This account has already been created, click</span> <a
								style="color: blue" href="/enpick/login.jsp" text="login">log in</a> <span text="begin">to begin
							using it.</span>
						</p>
					</div>
				</div>
				<div id="activeInvite" class="login box"
					style="margin-top: 80px; display: none">

					<div class="box-header">
						<span class="title" style="font-size: 20px;" text="welcome">Welcome to
							Enpick social</span>
					</div>

					<div class="box-content padded">
						<p style="margin-bottom: 20px" text="enpick_admin">A Enpick admin has added you as
							a user on their account.</p>
						<p style="" text="username_login">Your username for login is:</p>
						<p style="color: blue; margin-bottom: 20px;" id="email"><%=email%>
						</p>
						<p style="" text="set_password">Set a password to gain access:</p>
						<form class="separate-sections signupform" data-validate="parsley">
							<p class="alert-error hide" text="fillwronginfor">You must fill in all of the
								fields.</p>
							<div class="input-prepend" style="width: 70%">
								<span class="add-on" href="#"> <i class="icon-key"></i> </span>
								<input text="password" type="password" id="password" placeholder="Password"
									data-minlength="8" data-trigger="focusout" data-required="true">
							</div>

							<div class="input-prepend" style="width: 70%">
								<span class="add-on" href="#"> <i class="icon-key"></i> </span>
								<input text="confirmpassword" id="confirmpass" type="password" data-equalto="#password"
									placeholder="Confirm password" data-trigger="focusout"
									data-required="true">
							</div>
							<div>
								<a class="btn btn-blue btn-block" style="width: 70%;"
									href="javascript:void(0);" onclick="updatePassword();" text="startenpick">
									Start using Enpick </a>
							</div>

						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
<script type="text/javascript">
$( document ).ready(function() {
	aoFrm.setLang("#aoFrm","signup/signup");
	 var active='<%=active%>';
		 if(active=="error"){
		$("#registersuccess").hide();
		$("#activeAlready").show();
	 }
		 else if(active=="signup"){
			 $("#activeInvite").hide();
			 $("#registersuccess").show();
			$("#activeAlready").hide();
		 }
	  else 
			 {
			 $("#activeInvite").show();
			 $("#registersuccess").hide();
			 $("#activeAlready").hide();
			 }
	});
	function updatePassword(){
	
		var email='<%=email%>';
		var pass=$("#password").val();
		var confirmpass=$("#confirmpass").val();
		var id="<%=id%>";
		var key='<%=key%>';

		  if(pass.length<8)
			  {
			  return false;
			  }
      if(pass==""){
    	  return false;
      }
	  if(confirmpass!=pass){
		  return false;
	  }
		
		var dataString = [];
		dataString.push({
			name : "email",
			value : email
		});
		dataString.push({
			name : "password",
			value : pass
		});
		dataString.push({
			name : "token",
			value : key
		});
		dataString.push({
			name : "id",
			value : id
		});
		dataString.push({
			name : "action",
			value : "setpass"
		});
		$.ajax({
			type : 'POST',
			url : 'ActiveUser.do',
			dataType : 'text',
			data : dataString,
			success : function(source) {
				if (source.trim() != "-1")
					location.replace("index.jsp");
				else
					{
					$("#registersuccess").hide();
					$("#activeAlready").show();
					}

			}
			
		});
	}
</script>
</html>

