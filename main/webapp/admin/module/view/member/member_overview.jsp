<script type="text/javascript" src="module/js/member/member_overview.js"></script>
<%@include file="/admin/module/view/common/Permission.jsp"%>
 <h5>Content</h5>
	      <div class="block-overview">
	      	<div class="box-table block-top-summary">
					<div class="block-content box">
						<table id="top-summary-all" class="table table-normal">
							<tr>
								<td text="all_member">All Member</td>
								<td id="all_member">0(0%)</td>
								<td text="draft">Draft</td>
								<td id="percent_draft">0(0%)</td>
								<td text="scheduled">Scheduled</td>
								<td id="percent_schedule">0(0%)</td>
								<td text="sent">Sent</td>
								<td id="percent_sent">0(0%)</td>
							</tr>
						</table>
					</div>
				</div>
	      		<div class="block-title">
					<div class="right-title">
						<ul class="box-toolbar">
				        <li>
				          <div class="input-prepend"> <span class="add-on"><i class="icon-calendar"></i></span>
				            <input type="text" class="m-wrap m-ctrl-medium date-range" id="dashboard_range">
				          </div>
				        </li>
				        <li><button text="export_data" type="button" onclick="exportCsvMemberOverview();" id="export-csv" class="btn btn-red">Export Data</button></li>
				        <form method="post" id="exportForm" action="module/view/member/exportMemberOverviewCsv.jsp">
							<input type="hidden" style="display:none;" value="report_MemberOverview.csv" name="exportName" id="exportName">
							<input type="hidden" style="display:none" id="exportContent" value="" name="exportContent">
						</form>
				      </ul>
					</div>
				</div>
				<div class="box-table block-top-summary">
					<div class="block-content box">
						<table id="top-summary" class="table table-normal">
							<tr>
								<td text="all_member">All Member</td>
								<td id="all_member_filter">0(0%)</td>
								<td text="draft">Draft</td>
								<td id="percent_draft_filter">0(0%)</td>
								<td text="scheduled">Scheduled</td>
								<td id="percent_schedule_filter">0(0%)</td>
								<td text="sent">Sent</td>
								<td id="percent_sent_filter">0(0%)</td>
							</tr>
						</table>
					</div>
				</div>
				<div class="box-table block-profile">
					<div class="box-content">
						<table id="channel_count_content_jqgrid" class="table table-normal">
							
						</table>
					</div>
				</div>
				<div class="box-table block-connect-channel">
					<h5 text="connectchannel">Connect & Channel</h5>
					<table id="connect_channel_jqgrid">
					
					</table>
				</div>
				<div class="box-table block-user-group">
					<h5 text="usergroup">User & Group</h5>
					<table id="user_group_jqgrid"></table>
				</div>
				<div class="box-table block-account">
					<h5 text="account">Account</h5>
					<div class="box">
						<table id="account" class="table table-normal">
							<tr>
								<td class="grey" text="createdate">Create Date</td>
								<td id="create_date">2013.11.01</td>
								<td class="grey"></td>
								<td></td>
							</tr>
							<tr>
								<td class="grey" text="name">Name</td>
								<td id="name">Seonyoung Park</td>
								<td class="grey" text="email">Email</td>
								<td id="email">gap@andwise.com</td>
							</tr>
							<tr>
								<td class="grey" text="cellphone">Cell Phone</td>
								<td id="cellphone">010-2063-1790</td>
								<td class="grey" text="website">Website</td>
								<td id="website">www.enpick.com</td>
							</tr>
							<tr>
								<td class="grey" text="industry">Industry</td>
								<td id="industry" text="agency">Agency</td>
								<td class="grey" text="company">Company</td>
								<td id="company">andwise</td>
							</tr>
							<tr>
								<td class="grey" text="companyaddress">Company address</td>
								<td id="address_company" colspan="3">seoul</td>
							</tr>
						</table>
					</div>
				</div>	
	      </div>
	      
<div id="popup-edit-member" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-header">
		<button aria-hidden="true" data-dismiss="modal" class="close" type="button">x</button>
		<h3 text="editmember">Edit Member</h3>
	</div>
	<div class="modal-body">
		<form data-validate="parsley" class="separate-sections editMemberform">
			<div class="input-prepend">
				<span class="add-on">
				<i class="icon-user"></i>
				</span>
	
				<input type="text" text="name" placeholder="Name" data-required="true" data-trigger="change" class="parsley-validated" id="namereset">
			</div>
			<div class="input-prepend">
				<span class="add-on">
				<i class="icon-building"></i>
				</span>
	
				<input type="text" text="company" placeholder="Company" data-required="true" data-trigger="change" class="parsley-validated" id="companyreset">
			</div>
			<div class="input-prepend">
				<span class="add-on">
				<i class="icon-envelope"></i>
				</span>
				<input type="text" text="email" disabled="disabled" placeholder="Email" data-required="true" data-trigger="change" data-type="email" class="parsley-validated" id="emailreset">
			</div>
			
			<div class="input-prepend">
          
	            <select id="services">
	                <option text="free">Free</option>
	                <option text="paid">Paid</option>
	                
	              </select>
	          </div>
	          <div class="block-calendar">
		          <div class="input-prepend" id="servicesstart_date">
	          		<span class="add-on"><i class="icon-calendar"></i></span>
		            <input type="text" placeholder="" data-required="true" data-trigger="change" class="parsley-validated" id="servicesstart">
		            <div id="datepick_start"></div>
		          </div>
		          <div id="datepick_start"></div>
	          </div>
	          <div class="block-calendar">
		          <div class="input-prepend" id="servicesend_date">
	          		<span class="add-on"><i class="icon-calendar"></i></span>
		            <input type="text" placeholder="" data-required="true" data-trigger="change" class="parsley-validated" id="servicesend">
		            
		          </div>
		          <div id="datepick_end"></div>
	          </div>
	          <button text="cancel" data-dismiss="modal" id="idcancel" class="btn btn-default" type="button" text="cancel">Cancel</button>
      		  <button  id="btnreset" class="btn btn-red" type="button" text="">Update</button>
		 </form>
	</div>
	<div class="modal-footer">
      
     
    </div>
</div>