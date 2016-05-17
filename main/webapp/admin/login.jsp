<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

  <meta name="viewport" content="width=device-width, maximum-scale=1, initial-scale=1, user-scalable=0">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,800">

  <meta charset="utf-8">

  <!-- Always force latest IE rendering engine or request Chrome Frame -->
  <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">

  <!-- Use title if it's in the page YAML frontmatter -->
  <title>Enpick | Login Page</title>
  <link href="../common/css/main.css" media="screen" rel="stylesheet" type="text/css" />
  <link href="../common/css/application.css" media="screen" rel="stylesheet" type="text/css" />
  <link href="../common/css/login.css" media="screen" rel="stylesheet" type="text/css" />
<script src="../common/js/config.js" type="text/javascript"></script>
<script src="../common/js/plugin.js?v=130916" type="text/javascript"></script>
<script src="../common/js/main.js" type="text/javascript"></script>
 <script src="../admin/common/js/login.js" type="text/javascript"></script>
</head>
<%
session.setAttribute("SessionEmailAdmin",null);
%>
<body id="aoFrm" class="loginPage">

<div class="navbar navbar-top navbar-inverse">
  <div class="navbar-inner">
    <div class="container-fluid">

      <a class="brand" href="./"><img src="../common/images/logo.png" height="45" alt="Enpick" /></a>

      <!-- the new toggle buttons -->

      <ul class="nav pull-right">

        <li class="toggle-primary-sidebar hidden-desktop" data-toggle="collapse" data-target=".nav-collapse-primary"><button type="button" class="btn btn-navbar"><i class="icon-th-list"></i></button></li>

        <li class="hidden-desktop" data-toggle="collapse" data-target=".nav-collapse-top"><button type="button" class="btn btn-navbar"><i class="icon-align-justify"></i></button></li>

      </ul>

      

    </div>
  </div>
</div>
<div class="container">
  
<div id="login" class="span4 offset4">


  <div class="padded">
    <div class="login box" style="margin-top: 80px;">

      <div class="box-header">
        <span class="title" text="titleLogin">Login</span>
      </div>

      <div class="box-content padded">
        <form class="separate-sections loginform" data-validate="parsley">
        <p class="alert-error hide" text="fillwronginfor">You must fill email and password.</p>
          <div class="input-prepend">
          <span class="add-on">
            <i class="icon-user"></i>
          </span>
            <input type="text" placeholder="Email" id="email" data-required="true" data-trigger="focusout" text="email">
          </div>

          <div class="input-prepend">
          <span class="add-on">
            <i class="icon-key"></i>
          </span>
            <input type="password" placeholder="Password" id="pass" data-required="true" data-trigger="focusout" text="password">
          </div>

          <div>
            <a class="btn btn-blue btn-block" href="javascript:void(0);" id="btnLogin" onclick="login();">
                <span text="buttonLogin">Login</span> <i class="icon-signin"></i>
            </a>
          </div>

        </form>
		<div class="mBT10 block-remember">
			<div class="left">
				<i class="icon-check-empty checked" onclick="clickCheck();"></i>
				<span text="rememberme">Remember me</span>
			</div>
			<div class="right">
				<a href="#"  data-toggle="modal" data-target="#divResetPassword" text="forgotpassword">Forgot your password?</a>
			</div>
		</div>
        
      </div>

    </div>
  </div>
</div>
</div>
<div id="divResetPassword" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>
            <h3 id="myModalLabel" text="resetpassword">Reset Password</h3>
          </div>
         
          <div class="modal-body">
            <div class="row-fluid" >
			<h2 class="thin-sub" text="forgotpassword">Forgot your password?</h2>

			<p><span style="font-size:13px;" text="letsfixthat">
			Let's fix that. Provide us with the email address you
			use to log in to Enpick, and we'll send you a link
			to reset your password.</span>
			</p>
			 <form class="separate-sections loginform" data-validate="parsley">
			<div class="input-prepend">
			<span class="add-on" >
			<i class="icon-envelope"></i>
			</span>

		<input id="emailreset" class="parsley-validated" type="text" data-type="email" data-trigger="change" data-required="true" placeholder="Email" text="email">
		</div>
		 </form>
            </div>
          </div>
           <div class="modal-footer">
      <button type="button" class="btn btn-default" id="idcancel" data-dismiss="modal" text="cancel">
      Cancel
      </button>
      <button type="button" class="btn btn-red" id="btnreset" onclick="resetPassword();" text="resetyourpassword">Reset your password</button>
     
    </div>
   
        </div>  
      
</body>
<script src="common/js/codebird/sha1.js" type="text/javascript"></script>
<script src="common/js/codebird/codebird.js" type="text/javascript"></script>
<script src="common/js/twitterapi.js" type="text/javascript"></script>
<script src="common/js/common.js" type="text/javascript"></script>
<script src="common/js/contentemail.js" type="text/javascript"></script>
</html>

