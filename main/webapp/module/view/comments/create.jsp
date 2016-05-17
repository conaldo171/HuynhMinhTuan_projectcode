<%@ page language="java" contentType="charset=utf-8"
	pageEncoding="utf-8"%>
<div class="container-fluid" id="comment_create">
	<div class="row-fluid">
		<div class="span12">
			<div class="box-content">
				<div class="content_right">
					<div class="block_content box-table">
						<div class="block-title clearfix">
						<div id="create_comment" class="create_comment" style=""><button class="btn btn-default"   id="btn_create_comment" data-toggle="modal" data-target="#popup_create_comment"><span text="createcomment">Create the comment</span></button></div>
						<div id="download_sample_file" class="download_sample" style=""><button class="btn btn-default" onclick="export_sample_file();"  id="btn_download"><span text="samplefile">Sample File</span></button></div>
							 <!-- export sample file -->
          <form action="DownloadSampleComment.do" id="export_form_comment_public" method="post">
				<input type="hidden" name="export_comment_public" value="" id="export_comment_public" style="display:none" />
				
			  
			</form>
							<div class="right-title">
								<ul class="box-toolbar">
									<li>
										<div class="input-prepend">
											<span class="add-on"><i class="icon-calendar"></i> </span> <input
												type="text" id="comment_create_range"
												class="m-wrap m-ctrl-medium date-range">

										</div>
									</li>
									

								
								</ul>
							</div>
						</div>
						<div id="JqGrid_create_box" class="" ><table id="JqGrid_create"></table>
						 <div id="pager_create"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	
	<div id="popup_create_comment" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
          	<!-- upload file excel -->
			<form id="upload-excel-form-comment"  class="mBT10" style="float:left;margin-left:45px;" method="post" enctype="multipart/form-data">
            <span id="upload_excel_comment_create" class="btn btn-red fileinput-button" id="btn_upload_excel"><span text="comment_upload">Comment File Upload</span>
		    <input id="uploade-excel-form-file_comment_create" name="file" size="100" onchange="parent.changevalueCommentExcel('create')" type="file" />
            </span>
            </form>
         
            <span id="remove_excel_comment_create" style="display: none"  class="btn btn-red fileinput-button" onclick="delete_excelfile_comment('create')">
            
			<span class="nickname" text="remove_excel_comment_create">Remove Excel File</span>
			<i class="icon-remove-sign btn_delete"></i>
			</span>
            <button type="button" id="btn_save_comment" data-dismiss="modal" class="btn btn-inverse"><i class="icon-save"></i> <span text="save_to_draft">Save to Draft</span></button>
            <button data-target="#schedulePopup" data-toggle="modal" id="btn_scheduled" class="btn btn-inverse"><i class="icon-time"></i> <span text="scheduled">Scheduled</span></button>
            <button type="button" id="btn_send_comment" data-dismiss="modal" class="btn btn-success"><i class="icon-chevron-right"></i> <span text="send">Send</span></button>
          </div>
      </div>
    </div>
    </div>
    <div class="modal-body body-schedule close-scheduled">
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




