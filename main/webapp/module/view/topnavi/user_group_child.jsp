<%@include file="../../../module/view/common/Permission.jsp"%>
<%
if(administrator!=1){
  response.sendRedirect("login.jsp");
  return;
}
%>
<div class="container-fluid" id="topnavi_profile">

<div class="box">
        
        <div class="box-content">
        <div class="box-header">
          <div class="box-header">
         <span class="title" style="font-size:15px;" text="profile">Profile</span>
         <!-- <button class="btn btn-red" style="display:none;float:right;margin-top:6px; margin-right:5px;" data-target="#connect_a_channel_Popup" data-toggle="modal" type="button">
		Connect a Channel
		<i class="icon-caret-right"></i>
		</button> -->
        </div>
          <div id="profiles">
          <ul id="profileaccount" class="accCountList"></ul>
          </div>
          <div class="box-header">
         <span class="title" style="font-size:15px;" text="teammembers">Team Members</span>
        </div>
          <div id="members">
              <ul id="teammembers" class="accCountList"></ul>
          </div>
        </div>
   
      </div>


</div>
</div>