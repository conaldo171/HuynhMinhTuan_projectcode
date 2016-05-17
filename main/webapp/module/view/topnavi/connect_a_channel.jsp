<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@include file="../../../module/view/common/Permission.jsp"%>
<%
if(administrator!=1){
  response.sendRedirect("login.jsp");
  return;
}
%>
<div class="container-fluid" id="topnavi_connect_a_channel">
  <div class="row-fluid alR mBT20">
    <button type="button" id="btn_connect_channel" class="btn btn-red" data-toggle="modal" data-target="#connect_a_channel_Popup" text="connect">Connect a Channel <i class="icon-caret-right"></i></button>
  </div>
  <div class="row-fluid">
    <div class="box profiles" >
      <div class="box-header"> <span class="title"><i class="icon-facebook-sign blue" ></i> <span text="facebookprofile">Facebook  Profile</span> </span> </div>
      <div class="box-content scrollable" >
        <ul class="accCountList" id="facebookaccount">
         
        </ul>
      </div>
    </div>
  </div>
  <div class="row-fluid">
    <div class="box profiles" >
      <div class="box-header"> <span class="title"><i class="icon-facebook-sign blue" ></i> <span text="facebookpage">Facebook Page  Profile</span> </span> </div>
      <div class="box-content scrollable" >
        <ul class="accCountList" id="pageacountlist">
          
        </ul>
      </div>
    </div>
  </div>
  <div class="row-fluid">
    <div class="box profiles" >
      <div class="box-header"> <span class="title"><i class="icon-twitter-sign blue channel-icon" ></i> <span text="twitter">Twitter  Profile</span> </span> </div>
      <div class="box-content scrollable" >
        <ul class="accCountList" id="twitteraccount">
          
        </ul>
      </div>
    </div>
  </div>
  <div id="connect_a_channel_Popup" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>
      <h3 id="myModalLabel" text="connect">Connect a Channel</h3>
    </div>
    <div class="modal-body">
      <div class="action-nav-normal" >
        <div class="row-fluid channel-group" >
          <div class="span4 action-nav-button fb "><a href="#" id="facebookprofile" title="Faceboo profile"> <i class="icon-facebook-sign blue"></i> <span text="facebookprofile">Facebook Profile</span><i class="icon-check"></i></a></div>
          <div class="span4 action-nav-button fb "> <a href="#" id="facebookpage" title="Facebook Page"> <i class="icon-facebook-sign blue"></i> <span text="facebookpage">Facebook Page</span><i class="icon-check"></i></a></div>
          <div class="span4 action-nav-button tw "> <a href="#" id="twitter" title="Followers"> <i class="icon-twitter-sign blue"></i> <span text="twitter">Twitter</span><i class="icon-check"></i></a> </div>
        </div>
        <div class="row-fluid">
        	<div class="span12" text="selectprofile">Please select profile that you will register. <br />
You have to confirm after select profile and login to use service.
</div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default" id="idcancel" data-dismiss="modal" text="cancel">
      Cancel
      </button>
      <button type="button" class="btn btn-red" id="processbtn" onclick="return proccesslogin();" text="proceed">Proceed</button>
      <button type="button" class="btn btn-red" id="processpagebtn" style="display:none"  onclick="return proccesslogin();" text="proceed">Proceed</button>
      <button type="button" class="btn btn-red" id="processtwitterbtn" style="display: none;" onclick="loginTwitter();" text="proceed">Proceed</button>
    </div>
  </div>
  <div id="connect_a_channel_Popup_Page" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>
      <h3 id="myModalLabel" text="choosepage">Choose Facebook pages to connect</h3>
    </div>
    <div class="modal-body">
      <div class="action-nav-normal" >
        <div class="row-fluid channel-group" id="channel_facebook_page" >
          
        </div>
        <div class="row-fluid">
        	<div class="span12" text="connect_a_page_message" >Please select page that you will register. <br />
You have to confirm after select page and login to use service.
</div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default" id="cancelconnect" data-dismiss="modal" text="cancel">
      Cancel
      </button>
      <button type="button" class="btn btn-red" id="connect_page_btn" text="connect_channel">Connect</button>
    </div>
  </div>
</div>
