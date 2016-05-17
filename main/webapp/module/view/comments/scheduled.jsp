<%@include file="../../../module/view/common/Permission.jsp"%>
<div class="container-fluid" id="contents_scheduled_comment">
	<div class="row-fluid">
    <div class="span8" id="show_content">
      <ul id="show_schedule_comment" class="chat-box timeline">
        
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

<div id="popup_edit_comment" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>
      <h3 id="myModalLabel" text="review">Publish comment</h3>
    </div>
    <div class="modal-body">
      <div class="createForm">
      
          <div class="box rightBox">
            <div class="box-content padded">
              <textarea style="width:100%" rows="4" data-required="true" data-maxlength="5000" class="area_01 parsley-validated" id="comment_post"></textarea>
            </div>
          </div>
          <div class="row-fluid">
          
          <div class="alR btGroup fR span10">
          
            <button type="button" id="btn_save_comment" data-dismiss="modal" class="btn btn-inverse"><i class="icon-save"></i> <span text="save_to_draft">Save to Draft</span></button>
            <button data-target="#schedulePopup" data-toggle="modal" id="btn_scheduled" class="btn btn-inverse"><i class="icon-time"></i> <span text="scheduled">Scheduled</span></button>
            <button type="button" id="btn_send_comment" data-dismiss="modal" class="btn btn-success"><i class="icon-chevron-right"></i> <span text="send">Send</span></button>
          </div>
      </div>
    </div>
    </div>
    <div class="modal-body body-draft close-scheduled">
            <div class="row-fluid">
              <div class="span6 dateGroup">
                <div id="datepicker_schedule"></div>
              </div>
              <div class="span6 time-group">
                <div class="wrapGroup">
                  <div class="row-fluid mBT20">
                    <label text="time">TIME</label>
                    <div class="input-append bootstrap-timepicker"><div class="bootstrap-timepicker-widget dropdown-menu"><table><tbody><tr><td><a data-action="incrementHour" href="#"><i class="icon-chevron-up"></i></a></td><td class="separator">&nbsp;</td><td><a data-action="incrementMinute" href="#"><i class="icon-chevron-up"></i></a></td><td class="separator">&nbsp;</td><td class="meridian-column"><a data-action="toggleMeridian" href="#"><i class="icon-chevron-up"></i></a></td></tr><tr><td><input type="text" maxlength="2" class="bootstrap-timepicker-hour" name="hour"></td> <td class="separator">:</td><td><input type="text" maxlength="2" class="bootstrap-timepicker-minute" name="minute"></td> <td class="separator">&nbsp;</td><td><input type="text" maxlength="2" class="bootstrap-timepicker-meridian" name="meridian"></td></tr><tr><td><a data-action="decrementHour" href="#"><i class="icon-chevron-down"></i></a></td><td class="separator"></td><td><a data-action="decrementMinute" href="#"><i class="icon-chevron-down"></i></a></td><td class="separator">&nbsp;</td><td><a data-action="toggleMeridian" href="#"><i class="icon-chevron-down"></i></a></td></tr></tbody></table></div>
                      <input type="text" class="input-small" id="timepicker_schedule">
                      <span class="add-on"><i class="icon-time"></i></span> </div>
                  </div>
                  <div class="mess"> <span text="message_send">Message wiil be sent at</span> <span class="time_txt"></span> <span text="on">on</span></div>
                  <div class="date_txt" id="date_value_schedule" value="" text="date_not_choose"> Date(s) not chosen </div>
                </div>
                <div class="alC">
                  <button text="save" type="button" data-dismiss="modal" id="btn_save_scheduled_comment" class="btn btn-red">Save <i class="icon-chevron-right"></i></button>
                </div>
              </div>
            </div>
          </div>
  </div>

</div>
