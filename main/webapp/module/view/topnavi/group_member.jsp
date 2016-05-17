<%@include file="../../../module/view/common/Permission.jsp"%>


<div class="container-fluid" id="topnavi_group_member">

<div id="menu_left" class="menu_left">

<ul style="display: block;">
<%
if(administrator!=1){
	%>
	<li class="nav_person_setting"  title="Personal Setting">
<a class="file active" title="Personal Setting" id="personalsetting" href="javascript:void(0)">
<i class="icon-user"></i>
<span id="contents-create" class="file" url="" text="personalsetting">Personal Setting</span>

</a>
</li>
	<% 
}
else
{
	%>
	<li class="nav_person_setting"  title="Personal Setting">
<a class="file" title="Personal Setting" id="personalsetting" href="javascript:void(0)">
<i class="icon-user"></i>
<span id="contents-create" class="file" url="" text="personalsetting">Personal Setting</span>

</a>
</li>
<li class="nav_user_group"  title="Users & Groups">
<a class="file" title="Users & Groups" id="userGroup" href="javascript:void(0)">
<i class="icon-group"></i>
<span id="contents-create" class="file" url="" text="groups">Users & Groups</span>

</a>
</li>
<li class="nav_invite_member" title="Invite Team Members">
<a class="file" title="Invite Team Members" id="inviteMember" href="javascript:void(0)">
<i class="icon-plus-sign-alt"></i>
<span id="contents-create" class="file" url="" text="invite">Invite Team Members</span>

</a>
</li>

<li class="nav_change_password" title="Change Password">
<a class="file" title="Change Password" id="changePassword" href="javascript:void(0)">
<i class="icon-key"></i>
<span id="contents-create" class="file" url="" text="changepassword">Change Password</span>

</a>
</li>
	<%
	}
%>


</ul>
 </div>
<div id="content_right" class="content_right"></div>

</div>
