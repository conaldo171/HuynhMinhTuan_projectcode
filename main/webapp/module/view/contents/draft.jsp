<div class="container-fluid" id="contents_draft">
	<div class="row-fluid">
    <div class="span8" id="show_content">
      <ul id="show_draft" class="chat-box timeline">
        
      </ul>
    </div>
    <div class="span4">
      <div id="datepicker" class="mBT20"></div>
      <div class="box profiles" >
        <div class="box-header"> <span class="title" text="profiles">Profiles</span>         
        </div>
        <div class="box-content scrollable" > 
         <ul class="box-list check" id="draft_profile">
              
<!-- <li>
                <span><i class="icon-twitter-sign blue"></i> Auto accept new orders</span>
                <span class="pull-right" id="profile_twitter">   
                	<i class="icon-check-empty"></i>               
                </span>
              </li> -->
              
            </ul>                  
        </div>        
      </div>
      
      <div class="box teamMember" id="teamMember_draft">
        <div class="box-header"> <span class="title" text="team_member">Team Member</span>         
        </div>
        <div class="box-content scrollable" > 
         <ul class="box-list check" id="draft_member_list">
             
            </ul>
                  
        </div>        
      </div>
    </div>
  </div>
  
  
<ul class="inline pull-right sparkline-box hide" id="contentTop_contentsList" >
             <li class="sparkline-row">
              <h4 class="blue"><span text="all">All</span><span style="font-size:17.5px;color:#6E97AA;font-weight: 600" id="draft_all">0</span></h4> 
              <div class="sparkline big" data-color="blue"><img id="draft_image_all" src="common/images/chart_blue.png"></div>            
            </li>
            <li class="sparkline-row">
              <h4 class="green"><span text="draft">Draft</span> <span style="font-size:17.5px;color:#8FAE53;font-weight: 600" id="draft_draft">0</span></h4>  
              <div class="sparkline big" data-color="green"><img id="draft_image_draft" src="common/images/chart_green.png"></div>           
            </li>
            <li class="sparkline-row">
              <h4 class="orange"><span text="scheduled">Scheduled</span> <span style="font-size:17.5px;color:#FF9F01;font-weight: 600" id="draft_scheduled">0</span></h4> 
              <div class="sparkline big" data-color="orange"><img id="draft_image_scheduled" src="common/images/chart_orange.png"></div>             
            </li>
            <li class="sparkline-row">
              <h4 class="red"><span text="send">Sent</span> <span style="font-size:17.5px;color:#C75D5D;font-weight: 600" id="draft_sent">0</span></h4>
              <div class="sparkline big" data-color="red"><img id="draft_image_sent" src="common/images/chart_red.png"></div>             
            </li>
	</ul>
	<div id="connect_a_channel_Popup" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true" title="close">x</button>
      <h3 id="myModalLabel" text="review">Review for approval</h3>
    </div>
    <div class="modal-body">
      <div class="createForm">
        <div class="account"> 
          
          <!-- Account Thumbnail -->
          <div class="imgBox thumbnail">
          <span class="channel-icon"><i class="icon-facebook-sign channel-icon" id="icon-social"></i></span>
          
          <img id="avatar_draft" src="https://graph.facebook.com/100001917656179/picture" class="avatar-large">
          </div>
          <!-- Attach Button -->
          <p>
            <form id="upload-photo-form"  method="post" enctype="multipart/form-data">
            <span id="upload_photo_draft" class="btn btn-default fileinput-button" id="btn_attach"><i class="icon-paper-clip"></i> <span text="attach">Attach</span>
            <i class="icon-picture"></i>
		    <input type="text" id="message" name="message" value="">
		    <input id="upload-photo-form-file_draft" name="file" size="100" onchange="changevalue('draft')" type="file" />
            </span>
            </form>
            
            <span id="remove_image_draft" title="Delete photo" style="display: none;padding: 4px 7px"  class="btn btn-red fileinput-button" onclick="delete_image('draft')">
            <i class="icon-picture"></i>
			<span class="nickname" text="remove">Remove</span>
			<i class="icon-remove-sign btn_delete"></i>
			</span>
          </p>
        </div>
        <form data-validate="parsley">
          <div class="box rightBox">
            <div class="box-content padded">
              <textarea style="width:100%" rows="4" data-required="true" data-maxlength="5000" class="area_01 parsley-validated" id="contentPostOther"></textarea>
            </div>
          </div>
          <div class="row-fluid">
          
          <div class="alR btGroup fR span10">
          	<button onclick="" type="button" id="btn_discard" data-dismiss="modal" class="btn btn-default" title="Discard content"><span text="discard">Discard</span></button>
            <button type="button" id="btn_save_draft" data-dismiss="modal" class="btn btn-inverse" title="Save to Draft"><i class="icon-save"></i> <span text="save_to_draft">Save to Draft</span></button>
            <button data-target="#schedulePopup" data-toggle="modal" id="btn_scheduled" class="btn btn-inverse" title="Schedule"><i class="icon-time"></i> <span text="scheduled">Scheduled</span></button>
            <button onclick="postOther();" type="button" id="btn_send" data-dismiss="modal" class="btn btn-green" title="Send content"><i class="icon-chevron-right"></i> <span text="send">Send</span></button>
          </div>
      </div></form>
    </div>
    </div>
    <div class="modal-body body-draft close-scheduled">
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
                  <div class="mess"> <span text="message_send">Message will be sent at</span> <span id="time_send" class="time_txt"></span> <span text="on">on</span></div>
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
