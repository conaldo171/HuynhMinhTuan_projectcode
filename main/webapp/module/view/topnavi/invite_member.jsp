<%@include file="../../../module/view/common/Permission.jsp"%>
<%
if(administrator!=1){
  response.sendRedirect("login.jsp");
  return;
}
%>
<div class="container-fluid" id="topnavi_profile">

<div class="box">
        <div class="box-header">
         <span class="title" style="font-size:15px;" text="invite">Invite Member</span>
        </div>
        <div class="box-content">
          <div class="tab-content">
          <!-- persional setting -->
            <div id="invite" class="tab-pane active">
              <div class="row-fluid">
              	<form data-validate="parsley" class="separate-sections" id="form-persional">
					<p class="alert-error hide" text="fillwrong">You must fill in all of the fields.</p>
		         <div class="fields">
		         	<label style="width:60px" text="name">Name</label>
		         	<div class="input-prepend yourname">
		          <!-- <span class="add-on">
		            <i class="icon-user"></i>
		          </span>-->
		            <input text="firstname" type="text" data-trigger="focusout" data-required="true" placeholder="Firstname" value="" id="firstname_invi" class="parsley-validated">
		            <input text="lastname" type="text" data-trigger="focusout" data-required="true" placeholder="Lastname" value="" class="lastname parsley-validated" id="lastname_invi">
		          </div>
		         </div> 
		          
		         <div class="fields">
		         	<label style="width:60px" text="email">Email</label> 
		          <div class="input-prepend">
		          <!-- <span class="add-on">
		            <i class="icon-envelope"></i>
		          </span>-->
		            <input text="email" type="text" placeholder="Email" value="" data-required="true" data-trigger="change" data-type="email" id="email_invi">
		          </div>
		          </div>
		          <div class="fields">
		         	<label style="width:60px" text="division">Division</label> 
		          <div class="input-prepend">
		            <select id="permission" style="width:170px;">
		                <option value="0" text="teammembers">Team Members</option>
		                <option value="2" text="administrator">Administrator</option>
		                <option value="3" text="client">Client</option>
		              </select>
         			 </div>
         			 </div>
         			
		          </form>
		          
		          </div>
		          <div style="margin-bottom:5px; font-size:14px"><span text="selectprofilesassign">Select profiles assign</span></div>
		           <div class="box profiles" style="margin-right:10px;">
						<div class="box-header">
						<span class="title">
						<i class="icon-twitter-sign blue"></i>
						<span text="twitterprofile">Twitter Profile</span>
						</span>
						</div>
						<div class="box-content scrollable">
						<ul id="twitteraccount" class="accCountList">
						
						</ul>
						</div>
						</div>
						
         			   <div class="box profiles" style="margin-right:10px;">
						<div class="box-header">
						<span class="title">
						<i class="icon-facebook-sign blue"></i>
						<span text="facebookprofile">Facebook Profile</span>
						</span>
						</div>
						<div class="box-content scrollable">
						<ul id="facebookaccount" class="accCountList"></ul>
						</div>
						</div>
				  <div class="block-button" style="margin-left:50px;margin-bottom: 10px;">
				  	<button class="btn btn-blue" type="button" id="btnSave" onclick="inviteMember();" text="invite">Invite</button>
				  		<button class="btn btn-blue" type="button" id="btnUpdate" style="display:none" onclick="updateMember();" text="save">Save</button>
				  <!-- <button class="btn btn-blue" type="button" id="btnCancle">Cancel</button> -->	
				  </div>
		        </form>
              </div>
            </div>
            
          
           
          </div>
        </div>
      </div>


</div>
