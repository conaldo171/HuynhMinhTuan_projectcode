<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    </head>
    
<div class="container-fluid" id="contents_create">
  <div class="row-fluid">
    <div class="span12" >
      <div class="createForm">
        <div class="account"> 
          <!-- Account Thumbnail -->
          <div class="imgBox thumbnail">
          <span class="channel-icon"><i class="icon-facebook-sign channel-icon" ></i></span>
          
          <img class="avatar-large" src="" data-toggle="dropdown" style="cursor:pointer;width:100px;height:95px">
          
          <span class="caret dropdown-toggle" data-toggle="dropdown" title="Select channel default"></span>
          <ul class="dropdown-menu account_list" role="menu" aria-labelledby="dLabel">
              <li id="twitter" class="item"><span class="title" text="twitter">TWITTER</span>
                <ul id="list_twitter_default">
                 
                </ul>
              </li>
              <li class="divider"></li>
              <li id="facebook" class="item"><span class="title" text="facebookprofile">FACEBOOK</span>
                <ul id="list_facebook_default">
                  
                </ul>
              </li>
               <li class="divider"></li>
              <li id="facebook" class="item"><span class="title" text="facebookpage">FACEBOOK PAGE</span>
                <ul id="list_facebook_page_default">
                  
                </ul>
              </li>
            </ul>
          </div>
          <!-- Add Button -->
          <div class="dropdown dropdown-tip mBT10" title="Add profile">
            <button class="btn btn-default dropdown-toggle" data-toggle="dropdown" id="btn_add"><i class="icon-plus-sign"></i> <span text="add">Add</span> <b class="caret"></b></button>
            <ul class="dropdown-menu account_list" role="menu" aria-labelledby="dLabel">
              <li id="twitter" class="item"><span class="title" text="twitter">TWITTER</span>
                <ul id="list_twitter_post">
                 
                </ul>
              </li>
              <li class="divider"></li>
              <li id="facebook" class="item"><span class="title" text="facebookprofile">FACEBOOK</span>
                <ul id="list_facebook_post">
                  
                </ul>
              </li>
               <li class="divider"></li>
              <li id="facebook" class="item"><span class="title" text="facebookpage">FACEBOOK PAGE</span>
                <ul id="list_facebook_page_post">
                  
                </ul>
              </li>
            </ul>
          </div>
          
          <!-- Attach Button -->
          <p>
          <form id="upload-photo-form"  class="mBT10"  method="post" enctype="multipart/form-data">
          	
            <span id="upload_photo_create" class="btn btn-red fileinput-button" id="btn_attach"><i class="icon-paper-clip"></i> <span text="attach">Attach</span>
            <i class="icon-picture"></i>
		    <input type="text" id="message" name="message" value="">
		    <input id="upload-photo-form-file_create" name="file" size="100" onchange="parent.changevalue('create')" type="file" />
            </span>
            </form>
         
            <span id="remove_image_create" style="display: none"  class="btn btn-red fileinput-button mBT10" onclick="delete_image('create')">
            <i class="icon-picture"></i>
			<span class="nickname" text="remove">Remove</span>
			<i class="icon-remove-sign btn_delete"></i>
			</span>
			<!-- upload file excel -->
			<form id="upload-excel-form" style="display: none"  class="mBT10" method="post" enctype="multipart/form-data">
          	
            <span id="upload_excel_create" class="btn btn-red fileinput-button" id="btn_upload_excel"><span text="upload_excel">Upload Excel File</span>
		    <input id="uploade-excel-form-file_create" name="file" size="100" onchange="parent.changevalueExcel('create')" type="file" />
            </span>
            </form>
         
            <span id="remove_excel_create" style="display: none"  class="btn btn-red fileinput-button mBT10" onclick="delete_excelfile('create')">
            
			<span class="nickname" text="remove_excel">Remove Excel File</span>
			<i class="icon-remove-sign btn_delete"></i>
			</span>
			 <div class="mBT10" style="display: none" title="DownLoad Sample Excel File">
           <button class="btn btn-default" onclick="export_sample_file();"  id="btn_download"><span text="samplefile">Sample File</span></button>
          </div>
          <!-- export sample file -->
          <form action="DownloadSampleFile.do" style="display: none" id="exportForm_public" method="post">
				<input type="hidden" name="exportContent_public" value="" id="exportContent_public" style="display:none" />
				
			  
			</form>
          </p>
          
        </div>
        <form id="form_content" data-validate="parsley" >
          <div class="box rightBox">
            <div class="box-content padded">
              <textarea id="contentpost" class="area_01 " data-maxlength="5000" data-required="true" rows="4" style="width:100%" />
            </div>
          </div>
          <div class="row-fluid" >
          <div class="account_choice span4" id="account_choice_post">
            
          </div>
          <div class="alR btGroup span8" >

            <button class="btn btn-inverse" id="btn_save_draft" type="button" excel="" title="Save to Draft"><i class="icon-save"></i> <span text="save_to_draft">Save to Draft</span></button>
            <button class="btn btn-inverse"   data-toggle="modal" data-target="#schedulePopup" title="Schedule"><i class="icon-time"></i> <span text="scheduled">Scheduled</span></button>
            <button class="btn btn-success" id="btn_send" type="button" onclick="postoffline(this);" excel=""  title="Send content"><i class="icon-chevron-right"></i> <span text="send">Send</span></button>
          </div>
        </form>
        <div id="schedulePopup" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>
            <h3 id="myModalLabel" text="scheduled">Schedule</h3>
          </div>
          <div class="modal-body">
            <div class="row-fluid" >
              <div class="span6 dateGroup" >
                <div id="datepicker"></div>
              </div>
              <div class="span6 time-group" >
                <div class="wrapGroup">
                  <div class="row-fluid mBT20" >
                    <label text="time">TIME</label>
                    <div class="input-append bootstrap-timepicker" title="Choose time">
                      <input id="timepicker1" type="text" class="input-small">
                      <span class="add-on"><i class="icon-time"></i></span> </div>
                  </div>
                  <div class="mess"> <span text="message_send">Message will be sent at</span> <span id="time_send" class="time_txt"></span> <span text="on">on</span></div>
                  <div id="date_value" class="date_txt" value="" text="date_not_choose"> Date(s) not chosen </div>
                </div>
                <div class="alC" >
                  <button class="btn btn-red" id="btn_scheduled" excel="" type="button" data-dismiss="" data-toggle="" title="Save schedule"><span text="save">Save</span> <i class="icon-chevron-right"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</div>
</html>

