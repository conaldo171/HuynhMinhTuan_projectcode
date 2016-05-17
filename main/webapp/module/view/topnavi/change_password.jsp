<%@include file="../../../module/view/common/Permission.jsp"%>
<script type="text/javascript" src="module/js/topnavi/change_password.js"></script>
<%
if(administrator!=1){
  response.sendRedirect("login.jsp");
  return;
}
%>
<div class="container-fluid" id="topnavi_profile">

<div class="box">
        <div class="box-header">
         <span class="title" style="font-size:15px;" text="changepassword">Change Password</span>
        </div>
        <div class="box-content">
          <div class="tab-content">
          <!-- change pass -->
            <div id="changepass" class="tab-pane active padded">
				<form data-validate="parsley" class="separate-sections" id="form-changepassword" >
					<div class="fields">
						<label text="oldpassword">Old Password</label>
						<div class="input-prepend password">
							
							<input text="oldpassword" type="password" data-trigger="focusout" data-required="true" placeholder="Old Password" value="" id="txt_oldpassword" class="parsley-validated"><br>
							
						</div>
						<br>
					 </div>
					 <div class="fields">
						 <label text="newpassword">New Password</label>
						 <div class="input-prepend password">
							<input text="newpassword" type="password" data-minlength="8"  data-trigger="focusout" data-required="true" placeholder="New Password" value=""  id="txt_newpassword" >
						</div>
					</div> 
					<div class="fields">
						 <label text="confirmpassword">Confirm Password</label>
						 <div class="input-prepend password">
							<input text="newpassword" type="password" data-trigger="focusout" data-required="true" placeholder="Confirm Password" value=""  id="txt_confirmpassword" class="parsley-validated">
						</div>
					</div> 
					<div class="block-button" style="margin-left: 120px">
						<button id="btnChange_pass" class="btn btn-blue" >Change Password</button>
					</div> 
					 <!-- <input type=button onclick="ChangePassword()" Value="Change Password"> -->
				</form>

            </div>
         
          </div>
        </div>
      </div>


</div>
