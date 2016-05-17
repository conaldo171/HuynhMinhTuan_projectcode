<%@include file="../../../module/view/common/Permission.jsp"%>
<div class="container-fluid" id="contents_scheduled">
	<div class="row-fluid">
    <div class="span8" id="show_content">
      <ul id="show_schedule" class="chat-box timeline">
        
      </ul>
    </div>
    <div class="span4">
      <div id="datepicker" class="mBT20"></div>
      <div class="box profiles" >
        <div class="box-header"> <span class="title" text="profiles">Profiles</span>         
        </div>
        <div class="box-content scrollable" > 
         <ul class="box-list check" id="schedule_profile">
              
              <!--  <li>
                <span><i class="icon-twitter-sign blue"></i> Auto accept new orders</span>
                <span class="pull-right" id="profile_twitter" channel-type="twitter">   
                	<i class="icon-check-empty"></i>               
                </span>
              </li> -->
             
            </ul>                  
        </div>        
      </div>
    
      
      <div class="box teamMember" id="teamMember_scheduled">
        <div class="box-header"> <span class="title" text="team_member">Team Member</span>         
        </div>
        <div class="box-content scrollable" > 
         <ul class="box-list check" id="scheduled_member_list">
              
            </ul>
                  
        </div>        
      </div>
    </div>
  </div>
  
  
<ul class="inline pull-right sparkline-box hide" id="contentTop_contentsList" >
               <li class="sparkline-row">
              <h4 class="blue"><span text="all">All</span><span style="font-size:17.5px;color:#6E97AA;font-weight: 600" id="scheduled_all">0</span></h4> 
              <div class="sparkline big" data-color="blue"><img id="scheduled_image_all" src="common/images/chart_blue.png"></div>            
            </li>
            <li class="sparkline-row">
              <h4 class="green"><span text="draft">Draft</span> <span style="font-size:17.5px;color:#8FAE53;font-weight: 600" id="scheduled_draft">0</span></h4>  
              <div class="sparkline big" data-color="green"><img id="scheduled_image_draft" src="common/images/chart_green.png"></div>           
            </li>
            <li class="sparkline-row">
              <h4 class="orange"><span text="scheduled">Scheduled</span> <span style="font-size:17.5px;color:#FF9F01;font-weight: 600" id="scheduled_scheduled">0</span></h4> 
              <div class="sparkline big" data-color="orange"><img id="scheduled_image_scheduled" src="common/images/chart_orange.png"></div>             
            </li>
            <li class="sparkline-row">
              <h4 class="red"><span text="send">Sent</span> <span style="font-size:17.5px;color:#C75D5D;font-weight: 600" id="scheduled_sent">0</span></h4>
              <div class="sparkline big" data-color="red"><img id="scheduled_image_sent" src="common/images/chart_red.png"></div>             
            </li>
</ul>

<div id="connect_a_channel_Popup_sch" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true" title="close">x</button>
      <h3 id="myModalLabel" text="edit_scheduled">Edit scheduled message</h3>
    </div>
    <div class="modal-body">
      <div class="createForm">
        <div class="account"> 
          
          <!-- Account Thumbnail -->
          <div class="imgBox thumbnail">
          <span class="channel-icon"><i class="icon-facebook-sign" id="icon-social"></i></span>
          
          <img id="avatar_scheduled" src="https://graph.facebook.com/100001917656179/picture" class="avatar-large">
          <span class="caret"></span>
          </div>
          <!-- Add Button -->
          <div class="dropdown dropdown-tip mBT10" title="Add profile">
            <button class="btn btn-default dropdown-toggle" data-toggle="dropdown" id="btn_add"><i class="icon-plus-sign"></i> <span text="add">Add</span> <b class="caret"></b></button>
            <ul class="dropdown-menu account_list" role="menu" aria-labelledby="dLabel">
              <li id="twitter" class="item"><span class="title">TWITTER</span>
                <ul id="list_twitter_post">
                
                </ul>
              </li>
              <li class="divider"></li>
              <li id="facebook" class="item"><span class="title">FACEBOOK</span>
                <ul id="list_facebook_post">
                </ul>
              </li>
               <li class="divider"></li>
              <li id="facebook" class="item"><span class="title">FACEBOOK PAGE</span>
                <ul id="list_facebook_page_post">
                  
                </ul>
              </li>
            </ul>
          </div>
          <!-- Attach Button -->
          <p>
             <form title="Attach image" id="upload-photo-form"  method="post" enctype="multipart/form-data">
            <span id="upload_photo_schedule" class="btn btn-red fileinput-button" id="btn_attach"><i class="icon-paper-clip"></i> <span text="attach">Attach</span>
            <i class="icon-picture"></i>
		    <input type="text" id="message" name="message" value="">
		    <input id="upload-photo-form-file_schedule" name="file" size="100" onchange="changevalue('schedule')" type="file" />
            </span>
            </form>
            
            <span title="Remove image" id="remove_image_schedule" style="display: none;padding: 4px 7px"  class="btn btn-red fileinput-button" onclick="delete_image('schedule')">
            <i class="icon-picture"></i>
			<span class="nickname" text="remove">Remove</span>
			<i class="icon-remove-sign btn_delete"></i>
			</span>
          </p>
        </div>
        <form data-validate="parsley">
          <div class="box rightBox">
            <div class="box-content padded">
              <textarea style="width:100%" rows="4" data-required="true" data-maxlength="5000" class="area_01 parsley-validated" id="contentPostSchedule"></textarea>
            </div>
          </div>
          <div class="row-fluid">
          <div class="account_choice span4" id="account_choice_post">
            
          </div>
          <div class="alR btGroup fR span8">
            <button type="button" id="btn_save_draft" data-dismiss="modal" class="btn btn-default" title="Save to draft"><i class="icon-save"></i> <span text="save_to_draft">Save to Draft</span></button>
            <button data-target="#schedulePopup" data-toggle="modal" id="btn_scheduled" class="btn btn-default" title="Schedule"><i class="icon-time"></i> <span text="scheduled">Scheduled</span></button>
             <button onclick="postSchedule();" type="button" id="btn_send" data-dismiss="modal" class="btn btn-default" title="Send content"><i class="icon-chevron-right"></i> <span text="send">Send</span></button>
          </div>
        
       
      </div></form>
    </div>
    </div>
    <div class="modal-body body-scheduled open-scheduled">
            <div class="row-fluid">
              <div class="span6 dateGroup">
                <div id="datepicker2"></div>
              </div>
              <div class="span6 time-group">
                <div class="wrapGroup">
                  <div class="row-fluid mBT20">
                    <label text="time">TIME</label>
                    <div class="input-append bootstrap-timepicker" title="Choose time"><div class="bootstrap-timepicker-widget dropdown-menu"><table><tbody><tr><td><a data-action="incrementHour" href="#"><i class="icon-chevron-up"></i></a></td><td class="separator">&nbsp;</td><td><a data-action="incrementMinute" href="#"><i class="icon-chevron-up"></i></a></td><td class="separator">&nbsp;</td><td class="meridian-column"><a data-action="toggleMeridian" href="#"><i class="icon-chevron-up"></i></a></td></tr><tr><td><input type="text" maxlength="2" class="bootstrap-timepicker-hour" name="hour"></td> <td class="separator">:</td><td><input type="text" maxlength="2" class="bootstrap-timepicker-minute" name="minute"></td> <td class="separator">&nbsp;</td><td><input type="text" maxlength="2" class="bootstrap-timepicker-meridian" name="meridian"></td></tr><tr><td><a data-action="decrementHour" href="#"><i class="icon-chevron-down"></i></a></td><td class="separator"></td><td><a data-action="decrementMinute" href="#"><i class="icon-chevron-down"></i></a></td><td class="separator">&nbsp;</td><td><a data-action="toggleMeridian" href="#"><i class="icon-chevron-down"></i></a></td></tr></tbody></table></div>
                      <input type="text" class="input-small" id="timepicker1">
                      <span class="add-on"><i class="icon-time"></i></span> </div>
                  </div>
                  <div class="mess"> <span text="message_send">Message wiil be sent at</span> <span class="time_txt"></span> <span text="on">on</span></div>
                  <div class="date_txt" id="date_value" value="" text="date_not_choose"> Date(s) not chosen </div>
                </div>
                <div class="alC">
                  <button type="button" data-dismiss="" data-toggle="" id="btn_save_scheduled" class="btn btn-red" title="Save schedule"><span text="save">Save</span> <i class="icon-chevron-right"></i></button>
                </div>
              </div>
            </div>
          </div>
  </div>

</div>
