<%@include file="../../../module/view/common/Permission.jsp"%>
<div class="container-fluid" id="monitoring_facebook_page">
  <div class="row-fluid">
   
    <div class="span12 postBox" id="persion-one">
   
      <div class="box">
        <div class="box-header" id="header_channel">
          	
        </div>
        <div class="box-content">
			    <div class="span12 monitoring_content" id="content-fb" channel-detail-id="">
		          	<ul class="chat-box timeline" id="content_message_all">
		        		
		      		</ul>
		      		<ul id="message_detail_1" class="chat-box timeline" style="display:none"></ul>
      			</div>
        </div>
      </div>
    </div>
    <!-- 
    <div class="span6 postBox" id="persion-two">
      <div class="box">
        <div class="box-header">
          	<div class="block-name"><i class="icon-user"></i> <span>van tu</span></div>
          	<i class="icon-remove"></i>
        </div>
        <div class="box-content">
          
        </div>
      </div>
    </div>
     -->
  </div>
</div>
<div id="create_task_from_page_1" style="display:none">

</div>


<ul class="dropdown-menu tooltip-profile" id="tooltip-profile">
    <li class="tooltip-icon"><i class="icon-caret-up"></i></li>
	<li id="loading"></li>
	<li id="information"><div class="profile-tip-cover">
			<img id="image-cover" src="">
		</div>
		<div class="profile-tip-avatar">
			<a target="_blank" href=""><img id="image-avatar"
				src="">
			</a>
		</div>
		<div class="block_info">
		<div class="profile-tip-info">
			<a id="fb-url-name" href="" target="_blank">
				<div class="cover-username" id="fb-name"></div>
				<div class="cover-headline" id="fb-categori"></div>
			</a>
			<ul class="list-information">
			<li id="fan-page-page"> likes</li>
			<li id="talking-about-page"> </li>
		</ul>
		</div>
		
		 <p id="manual_friends_page" class="mutual_friends"></p>
		<p id="friendship_page" class="friendship"  text="friendship"><a id="link_frienship_page" target="_blank" href="">See friendship</a></p> 
		</div>
		<div id="facebook_profile_btn_page" style="display:none" class="profile-tip-bio">
			 <span class="uibutton" id="fb-url-add-friend-page" text="add_friend">Add friend</span>
			<a target="_blank"
				href="" class="uibutton" id="fb-url-following-page" text="following">Following</a>
			<a target="_blank"
				href="" class="uibutton" id="fb-url-send-page" text="send_message">Send
				Message</a>
		</div>
		<div id="facebook_page_btn_page" style="display:none" class="profile-tip-bio">
			<a target="_blank"
				href="" class="uibutton" id="page-url-like-page" text="like">Like</a>
			<a target="_blank"
				href="" class="uibutton" id="page-url-following-page" text="following">Following</a> 
			<a target="_blank"
				href="" class="uibutton" id="page-url-send-page" text="send_message">Send
				Message</a>
		</div>
	</li>
</ul>

