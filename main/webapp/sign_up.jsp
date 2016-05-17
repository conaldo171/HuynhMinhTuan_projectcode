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
  <title>Enpick | Sign Up</title>
  <link href="common/css/main.css" media="screen" rel="stylesheet" type="text/css" />
  <link href="common/stylesheets/application.css" media="screen" rel="stylesheet" type="text/css" />
  <link href="common/css/signup.css" media="screen" rel="stylesheet" type="text/css" />
  <script src="common/js/contentemail.js" type="text/javascript"></script>
<script src="common/js/config.js" type="text/javascript"></script>
<script src="common/js/plugin.js?v=130916" type="text/javascript"></script>
<script src="common/js/main.js" type="text/javascript"></script>
<script src="common/js/signup.js" type="text/javascript"></script>
</head>
<%

%>
<body id="aoFrm" class="loginPage signupPage">

<div class="navbar navbar-top navbar-inverse">
  <div class="navbar-inner">
    <div class="container-fluid">

       <a class="brand" href="login.jsp"><img src="common/images/logo.png" height="45" alt="Enpick" /></a>

      <!-- the new toggle buttons -->

      <ul class="nav pull-right">

        <li class="toggle-primary-sidebar hidden-desktop" data-toggle="collapse" data-target=".nav-collapse-primary"><button type="button" class="btn btn-navbar"><i class="icon-th-list"></i></button></li>

        <li class="hidden-desktop" data-toggle="collapse" data-target=".nav-collapse-top"><button type="button" class="btn btn-navbar"><i class="icon-align-justify"></i></button></li>

      </ul>

      

    </div>
  </div>
</div>
<div class="container">
  
<div class="span6 offset3">

  <div class="padded">

    <div class="login box" style="margin-top: 80px;">

      <div class="box-header">
        <span class="title" text="signup">Sign Up</span>
      </div>

      <div class="box-content padded">
      
        <form class="separate-sections signupform" data-validate="parsley">
			<p class="alert-error hide" text="fillwronginfor">You must fill in all of the fields.</p>
          <div class="input-prepend yourname">
          <span class="add-on" href="#">
            <i class="icon-user"></i>
          </span>
            <input text="firstname" id="firstname" type="text" placeholder="Firstname" data-required="true" data-trigger="focusout">
            <input text="lastname" id="lastname" class="lastname" type="text" placeholder="Lastname" data-required="true" data-trigger="focusout">
          </div>
          
          <div class="input-prepend">
          <span class="add-on" href="#">
            <i class="icon-envelope"></i>
          </span>
            <input text="email" id="email" type="text" placeholder="Email" data-required="true" data-trigger="change" data-type="email">
          </div>

          <div class="input-prepend">
          <span class="add-on" href="#">
            <i class="icon-key"></i>
          </span>
            <input text="password" type="password" id="password" placeholder="Password" data-minlength="8"  data-trigger="focusout" data-required="true">
          </div>

          <div class="input-prepend">
          <span class="add-on" href="#">
            <i class="icon-key"></i>
          </span>
            <input text="confirmpassword" type="password" data-equalto="#password" placeholder="Confirm password" data-trigger="focusout" data-required="true">
          </div>
          
          
          <div class="input-prepend">
          <span class="add-on">
            <i class="icon-building"></i>
          </span>
            <input text="company" type="text" id="company" data-required="true" data-trigger="focusout" placeholder="Company" value="" class="parsley-validated"> 
          </div>
          
          <div class="input-prepend" >
		       <span class="add-on">
		          <i class="icon-phone"></i>
		       </span>
		       <input text="cellphone" type="text" id="cell_phone" data-type="phone" data-required="true" data-trigger="focusout" placeholder="Cell phone" value="" id="cellphone" class="parsley-validated">
		  </div>
		  
		  <div class="input-prepend">
          
            <select id="industry">
                <optgroup text="brand" label="Brand & Company">
                	<option text="advertising" value="advertising">Advertising/Media/Publisher</option>
                	<option text="architecture" value="architecture">Architecture</option>
                	<option text="automotive" value="automotive">Automotive/Industrial</option>
                	<option text="corporate" value="corporate">Corporate group</option>
                	<option text="design" value="design">Design/Decor</option>
                	<option text="entertainment" value="entertainment">Entertainment</option>
                	<option text="fashion" value="fashion">Fashion/Beauty</option>
                	<option text="food" value="food">Food/Beverage</option>
                	<option text="health" value="health">Health/Medicine/Care</option>
                	<option text="technology" value="technology">IT/Technology/Electronics</option>
                	<option text="kids" value="kids">Kids/Baby</option>
                	<option text="money" value="money">Money/Finance</option>
                	<option text="retail" value="retail">Retail</option>
                	<option text="services" value="services">Services</option>
                	<option text="travel" value="travel">Travel/Leisure</option>
                	<option text="other" value="other">Other</option>
                </optgroup>
                
                <optgroup text="organization" label="Organization">
                	<option text="academia" value="academia">Academia</option>
                	<option text="colleges" value="colleges">Colleges/Universities</option>
                	<option text="education" value="education">Education</option>
                	<option text="government" value="government">Government</option>
                	<option text="media" value="media">Media</option>
                	<option text="nonprofits" value="nonprofits">Nonprofits</option>
                	<option text="places" value="places">Places</option>
                	<option text="religion" value="religion">Religion</option>
                	<option text="other" value="other">Other</option>
                </optgroup>
                
                <optgroup text="people" label="People">
                	<option text="artists" value="artists">Artists</option>
                	<option text="athletes" value="athletes">Athletes</option>
                	<option text="celebrities" value="celebrities">Celebrities/Fan page</option>
                	<option text="journalist" value="journalist">Journalist/Critic</option>
                	<option text="politicians" value="politicians">Politicians</option>
                	<option text="other" value="other">Other</option>
                </optgroup>
                
                <optgroup text="media" label="Media / Entertainment">
                	<option text="art" value="art">Art/Performance</option>
                	<option text="film" value="film">Film/Music/Books</option>
                	<option text="hobby" value="hobby">Hobby/Culture</option>
                	<option text="mobile" value="mobile">Mobile/App</option>
                	<option text="sports" value="sports">Sports/Games</option>
                	<option text="networks" value="networks">TV Shows/Networks</option>
                	<option text="other" value="other">Other</option>
                </optgroup>
                
                <optgroup text="community" label="Community">
                	<option text="daily" value="daily">Daily Life</option>
                	<option text="humor" value="humor">Humor</option>
                	<option text="information" value="information">Information</option>
                	<option text="networking" value="networking">Networking</option>
                	<option text="other" value="other">Other</option>
                </optgroup>
                
                <optgroup text="global" label="global">
                	<option text="brand" value="brand">Brand / Company</option>
                	<option text="community" value="community">Community</option>
                	<option text="entertainment" value="entertainment">Entertainment</option>
                	<option text="organization" value="organization">Organization</option>
                	<option text="people" value="people">People</option>
                </optgroup>
                
              </select>
          </div>
          
          <div class="mBT10 block-terms">
			<i class="icon-check-empty uncheck" ></i>
			<span text="readandagree">I have read and agree to the</span> <a id="term_of_service" href="terms.jsp" target="_blank"><strong text="term">Terms of Use</strong></a>
		  <span id="temrs" style="display:none; color:red" text="nochoosetoagree">You must agree to Enpick's Terms of Service</span>
		</div>
		<div class="mBT10 block-terms">
			<i class="icon-check-empty uncheck"></i>
			<span text="receivenewsletters">I'd like to receive  ENPICK newsletters</span>
			
		</div>

          <div>
            <a class="btn btn-blue btn-block" href="javascript:void(0);" onclick="signup();">
                <span text="signup">Sign Up</span> <i class="icon-ok"></i>
            </a>
          </div>

        </form>

        <div>
          <a href="login.jsp">
              <span text="alreadyhaveaccount">Already have an account?</span> <strong text="signin">Sign In</strong>
          </a>
        </div>
      </div>

    </div>

    <div class="row-fluid">
      <div class="span6">
        <a href="https://www.facebook.com/Enpick" target="_blank" class="btn btn-facebook btn-block"><i class="icon-facebook-sign"></i> <span text="like">Like</span></a>
      </div>
      <div class="span6">
        <a href="http://twitter.com/enpick2013" target="_blank" class="btn btn-twitter btn-block"><i class="icon-twitter"></i> <span text="Follow"></span></a>
      </div>
    </div>
  </div>
</div>
</div>

</body>
</html>
