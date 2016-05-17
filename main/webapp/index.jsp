<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%@include file="module/view/common/Permission.jsp"%>

<%@ page import="com.andwise.common.*" %>
<meta name="viewport" content="width=device-width, maximum-scale=1, initial-scale=1, user-scalable=0">
<link href="common/css/font_google.css" media="screen" rel="stylesheet" type="text/css" />
 <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<!-- Always force latest IE rendering engine or request Chrome Frame -->
<meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
<!-- Use title if it's in the page YAML frontmatter -->
<title>Enpick </title>
<link href="common/css/jquery.fileupload-ui.css" media="screen" rel="stylesheet" type="text/css" />
<link href="common/css/application.css" media="screen" rel="stylesheet" type="text/css" />
<link href="common/css/main.css" media="screen" rel="stylesheet" type="text/css" />
<link href="common/css/font-awesome.css" media="screen" rel="stylesheet" type="text/css" />
<link href="common/js/plugin/jquery-ui/theme/delta/jquery-ui.css" media="screen" rel="stylesheet" type="text/css" />
<link href="common/css/jquery.datepick.css" media="screen" rel="stylesheet" type="text/css" />
<link href="common/css/ui.jqgrid.css" media="screen" rel="stylesheet" type="text/css" />
<script src="common/js/plugin.js?v=130916" type="text/javascript"></script>
<script src="common/js/grid.locale-en.js" type="text/javascript"></script>
<script src="common/js/jquery.jqGrid.min.js" type="text/javascript"></script>
<!--[if lt IE 9]>
<script src="common/javascripts/vendor/html5shiv.js" type="text/javascript"></script>
<script src="common/javascripts/vendor/excanvas.js" type="text/javascript"></script>
<![endif]-->

</head>
<%
	ConfigTable cfTable = ConfigFactory.getInstance() ;
	String first_name = (String)session.getAttribute("SessionFirstName");
	String last_name = (String)session.getAttribute("SessionLastName");
	String username = first_name + " " + last_name;
	String token_user="";
	String token_secret="";
	 String tw_consumer_key =cfTable.getValue("tw_consumer_key"); 
     String tw_consumer_secret =cfTable.getValue("tw_consumer_secret");
     String fb_consumer_key =cfTable.getValue("fb_consumer_key"); 
     String server_address=cfTable.getValue("server_address");
     String user_guide_kr=cfTable.getValue("user_guide_kr");
     String user_guide_en=cfTable.getValue("user_guide_en");
     int iexpreri=0;
    // String fb_consumer_secret =cfTable.getValue("fb_consumer_secret");
    if(request.getParameter("user_id")!=null){
    	user_id = Integer.parseInt(request.getParameter("user_id"));
    	session.setAttribute("SessionUserId", Integer.toString(user_id));
    }
    if(session.getAttribute("Sessiontoken_user")!=null){
    	token_user=(String)session.getAttribute("Sessiontoken_user");
    }
    if(session.getAttribute("Sessiontoken_secret")!=null){
    	token_secret=(String)session.getAttribute("Sessiontoken_secret");
    }
    
   
%>
<body id="aoFrm" >
<!-- Header -->
<div id="overlay_html" style="position: fixed; top: 0; left: 0; width:100%;height:100%; display: none; z-index:99999">
	 
</div>
<div class="navbar navbar-top navbar-inverse" id="aoFrm-Header">
  <div class="navbar-inner">
    <!-- Logo -->
    <div class="container-fluid"><a class="brand" id="top" href="./"><img src="common/images/logo.png" height="45" alt="Enpic" /></a> 
    <!-- /Logo -->
     
      <!-- the new toggle buttons -->      
      <ul class="nav pull-right">
        <li class="toggle-primary-sidebar hidden-desktop" data-toggle="collapse" data-target=".nav-collapse-primary">
          <button type="button" class="btn btn-navbar"><i class="icon-th-list"></i></button>
        </li>
        <li class="hidden-desktop" data-toggle="collapse" data-target=".nav-collapse-top">
          <button type="button" class="btn btn-navbar"><i class="icon-align-justify"></i></button>
        </li>
      </ul>
      
      <!-- Top Navi -->
      <div class="nav-collapse nav-collapse-top collapse" id="aoFrm-Header-Right">
        <ul class="nav pull-right">
          <li class="help"><a href="#" title="Help" class="dropdown-toggle" data-toggle="dropdown"><i class="icon-question-sign"></i><span class="hidden" text="help" >Help</span><i class="icon-caret-down"></i></a>
          	<ul class="dropdown-menu menu_languages">
              <li><a class="tour_play" href="javascript:void(0)" target="blank" tour="tour" id="tour" title="" ><i class="icon-user"></i><span text="userguide">User Guide</span></a></li>
              <li style="margin:1px 1px" class="divider"></li>              
              <li><a href="javascript:void(0)" title="" id="help_support"><i class="icon-info-sign"></i><span text="suport">Support</span></a>
              		<script type="text/javascript" src="//assets.zendesk.com/external/zenbox/v2.6/zenbox.js"></script>
						<style type="text/css" media="screen, projection">
						  @import url(//assets.zendesk.com/external/zenbox/v2.6/zenbox.css);
						</style>
						<script type="text/javascript">
						  if (typeof(Zenbox) !== "undefined") {
						    Zenbox.init({
						      dropboxID:   "20099669",
						      url:         "https://enpick.zendesk.com",
						      tabTooltip:  "",
						      tabImageURL: "",
						      tabColor:    "",
						      tabPosition: ""
						    });
						  }
						</script>
						
						
              </li>
              <li style="margin:1px 1px" class="divider"></li>              
              <li><a href="https://enpick.zendesk.com" title="" id="help_center" target="_blank"><i class="icon-info-sign"></i><span text="helpcenter">Help Center</span></a></li> 
            </ul>
          </li>
         </ul>
        <ul class="nav full pull-right">
        	<li class="dropdown languages">             
            <a href="#" class="dropdown-toggle" data-toggle="dropdown"> <span>
             <span id="flag-languages" text="languages">Language</span><i class="icon-caret-down"></i> </span> </a>
            <ul class="dropdown-menu menu_languages">
              <li><a type="en" href="javascript:void(0)" title="" ><img alt="" src="common/images/en.png" width="15" height="15" /> <span text="english">English</span></a></li>
              <li style="margin:1px 1px" class="divider"></li>              
              <li><a href="javascript:void(0)" title="" type="kr"><img alt="" src="common/images/ko.png" width="17" height="17" /> <span text="korea">Korea</span></a></li>
              <li style="margin:1px 1px" class="divider"></li>
              <li><a href="javascript:void(0)" title="" type="jp"><img alt="" src="common/images/jp.png" width="17" height="17" /> <span text="japan">Japan</span></a></li>
              <li style="margin:1px 1px" class="divider"></li>
              <li><a href="javascript:void(0)" title="" type="vn"><img alt="" src="common/images/vn.jpg" width="17" height="17" /> <span text="vietname">Vietnam</span></a></li>
            </ul>
          </li> 
          </ul>
          <ul class="nav full pull-right">
          <li class="dropdown user-avatar">             
            <a href="#" class="dropdown-toggle" data-toggle="dropdown"> <span><!--  <img class="menu-avatar" src="common/images/avatars/avatar1.jpg" /> -->
             <span><span id="user_name_select"></span><i class="icon-caret-down"></i></span><!-- <span class="badge badge-dark-red">5</span> -->  </span> </a>
            <ul class="dropdown-menu" id="dropdown_menu">              
               <!-- <li class="with-image"><span></span> </li><li class="divider"></li>-->
              <li class="profile"><a href="page=topnavi/group_member" title="Profile"><i class="icon-user"></i> <span text="profiles">Profile</span></a></li>              
              <li class="logout"><a href="login.jsp" title="Logout"><i class="icon-off"></i> <span text="logOut">Logout</span></a></li>
            </ul>
          </li>
        </ul>
        <!-- <form class="navbar-search pull-right">
          <input type="text" class="search-query animated" placeholder="Search" text="search">
          <i class="icon-search"></i>
        </form> -->
        <ul class="nav pull-right">
        <% 
        if(administrator==1){
        	%>
        	<li  class="connect_a_channel"><a  href="?page=topnavi/connect_a_channel" title="Connect a Channel"><i class="icon-thumbs-up"></i> <span id="connect_a_channel" text="connect">Connect Social Media</span></a></li>
          <li class="group_member"><a id="group_member" href="?page=topnavi/group_member" title="Group & Member"><i class="icon-group"></i> <span text="group">Group & Member</span></a></li>
         <!-- <li class="billing"><a href="?page=topnavi/billing" title="Billing"><i class="icon-credit-card"></i> <span text="billing">Billing</span></a></li> --> 
         <!-- <li class="billing"><a href="#" title="Billing"><i class="icon-credit-card"></i> <span text="billing">Billing</span></a></li> -->
        	<%
        }
        %>
          
        </ul>
        <ul class="nav pull-right">
        	<li><a href="javascript:void(0)" id="link_renewal" text="renewal">Renewal</a>
        		
        	</li>
        </ul>
        <ul class="nav pull-right">
        	<li id="day_free"></li>
        </ul>
      </div>
    </div>
    <!-- //Top Navi -->
     
  </div>
</div>
<!-- /Header -->

<div id="aoFrm-Main" >
  <div class="sidebar-background">
    <div class="primary-sidebar-background"></div>
  </div>
  <div class="primary-sidebar" id="navLeft"  > 
    
    <!-- Main nav -->
    <div id="tree-menu" > </div>
    
  </div>
  <div class="main-content" >
    <div class="container-fluid">
      <div class="row-fluid">
        <div class="area-top clearfix" id="aoFrm-content-top">
          <div class="pull-left header">
            <h3 class="title"> <i class=""></i> <span></span></h3>
            <h5></h5>
          </div>            
        </div>
      </div>
    </div>
    
    <div class="container-fluid padded">
      <div class="row-fluid"> 
        
        <!-- Breadcrumb line -->        
        <div id="breadcrumbs">
          <div class="breadcrumb-button blue" > <a href="./"><span class="breadcrumb-label"><i class="icon-home"></i> <span text="home">Home</span></span> <span class="breadcrumb-arrow"><span></span></span></a> </div>
          <div class="breadcrumb-button" id="lev1" style="display:none"><span class="breadcrumb-label"><i class="icon-dashboard"></i> <span class="name"></span></span><span class="breadcrumb-arrow" style="display:none"><span></span></span></div>
          <div class="breadcrumb-button" id="lev2" style="display:none"><span class="breadcrumb-label"><i class="icon-dashboard"></i> <span class="name"></span></span></span></span></div>
        </div>
        
      </div>
    </div>
    <!-- Child Page Content -->
    <div class="container-fluid padded" id="aoFrm-content"> </div>
  	<!-- /Child Page Content -->
  </div>
</div>
<!-- Footer -->
<div id="aoFrm-copyright" class="hide">
  <address text="copyright">Copyright Enpick. All Rights Reserved.</address>
</div>
<input type="hidden" name="permit" id="permit" value="<%=administrator%>">
<input type="hidden" name="tw_consumer_key" id="tw_consumer_key" value="<%=tw_consumer_key%>">
<input type="hidden" name="tw_consumer_secret" id="tw_consumer_secret" value="<%=tw_consumer_secret%>">
<input type="hidden" name="fb_consumer_key" id="fb_consumer_key" value="<%=fb_consumer_key%>">
<input type="hidden" name="server_address" id="server_address" value="<%=server_address%>">
<input type="hidden" name="tw_token_user" id="tw_token_user" value="<%=token_user%>">
<input type="hidden" name="tw_token_secret" id="tw_token_secret" value="<%=token_secret%>">
<input type="hidden" name="user_guide_kr" id="user_guide_kr" value="<%=user_guide_kr%>">
<input type="hidden" name="user_guide_en" id="user_guide_en" value="<%=user_guide_en%>">

<div id="aoFrm-notification" >
	<span class="text"></span><span class="btnClose"><i class="icon-remove-sign" ></i></span>
</div>
<!-- /Footer -->

</body>

<script src="common/js/config.js" type="text/javascript"></script>
<script src="common/js/main.js" type="text/javascript"></script>
<script src="common/js/codebird/sha1.js" type="text/javascript"></script>
<script src="common/js/facebookapi.js" type="text/javascript"></script>
<script src="common/js/codebird/codebird.js" type="text/javascript"></script>
<script src="common/js/twitterapi.js" type="text/javascript"></script>
<script src="common/js/vendor/jquery.ui.widget.js" type="text/javascript"></script>
<script src="common/js/jquery.fileupload.js" type="text/javascript"></script>
<script src="common/js/jquery.timestamp.common.js" type="text/javascript"></script>
<script src="common/js/common.js" type="text/javascript"></script>
<script src="common/js/contentemail.js" type="text/javascript"></script>
<script src="common/js/base64.js" type="text/javascript"></script>
<script src="common/js/rgbcolor.js" type="text/javascript"></script>
<script src="common/js/svg_todataurl.js" type="text/javascript"></script>
<script src="common/js/canvg.js" type="text/javascript"></script>
<script src="common/js/jquery.easing.js" type="text/javascript"></script>
<script type="text/javascript">
	try {
	    debugMode = config.debugMode;
	    aoFrm.init();
	} catch (e) {   
	   // alert('Building Layout False.');
	}
	
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	ga('create', 'UA-48153898-1', 'enpick.com');
	  ga('send', 'pageview');

	
</script>
</html>
