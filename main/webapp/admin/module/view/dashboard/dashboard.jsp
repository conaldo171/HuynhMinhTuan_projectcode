<div class="container-fluid" id="dashboard_dashboard">
 	<div class="block-content">
 		<div class="block-title">
		
		<div class="right-title">
			<ul class="box-toolbar">
	        <li>
	          <div class="input-prepend"> <span class="add-on"><i class="icon-calendar"></i></span>
	            <input type="text" class="m-wrap m-ctrl-medium date-range" id="dashboard_range">
	          </div>
	        </li>
	        <li><button text="export_data" type="button" onclick="exportCsvDashboard();" id="export-csv" class="btn btn-red">Export Data</button></li>
	        <form method="post" id="exportForm" action="module/view/dashboard/exportDashboardCsv.jsp">
				<input type="hidden" style="display:none;" value="report_dashboard.csv" name="exportName" id="exportName">
				<input type="hidden" style="display:none" id="exportContent" value="" name="exportContent">
			</form>
	      </ul>
		</div>
	</div>
	<div class="box block-top-summary">
		<div class="block-content">
			<table id="top-summary" class="table table-normal">
				<tr>
					<td text="all_member">All Member</td>
					<td id="all_member">0</td>
					<td text="paid_member">Paid Member</td>
					<td id="percent_paid_member">0(0%)</td>
					<td text="free_member">Free Member</td>
					<td id="percent_free_member">0(0%)</td>
					<td text="leave_member">Leave Member</td>
					<td id="percent_leave_member">0(0%)</td>
					<td text="sale">Sales</td>
					<td id="sale">0</td>
				</tr>
			</table>
		</div>
		
	</div>
	<div class="box block content-top">
    <div class="box-header"> <span class="title"><i class="icon-user"></i> <span text="member">Member</span></span>
      	<!-- <ul class="box-toolbar">
          <li class="toolbar-link"><a href="#"><i class="icon-refresh"></i><span>Update Stats</span></a></li>
        </ul> -->
    </div>
    <div class="box-content padded">
      	<div class="row-fluid">
 		<div id="member" class="span3">
 			<ul class="list-member">
 				<li><a class="active" href="javascript:void(0)"><span text="leave_member">Leave Member</span><span id="new_member" class="amount">0</span></a></li>
 				<li><a href="javascript:void(0)"><span text="paid_member">Paid Member</span><span id="paid_member" class="amount">0</span></a></li>
 				<li><a href="javascript:void(0)"><span text="free_member">Free Member</span><span id="free_member" class="amount">0</span></a></li>
 			</ul>
 		</div>
 		<div class="span9">
 			<div id="member-chart" class="member-chart"></div>
 		</div>
 	</div>
    </div>
  </div>
  
  <div class="box block member-industry">
    <div class="box-header"> <span class="title"><i class="icon-user"></i> <span text="member_industry">Member-Industry</span></span>
      	
    </div>
    <div class="box-content padded">
      	<div id="member-industry-chart"></div>
    </div>
  </div>
  
  <div class="box block member-contents">
    <div class="box-header"> <span class="title"><i class="icon-user"></i> <span text="contents">Contents</span></span>
      	
    </div>
    <div class="box-content padded">
      	<div id="member-contents-chart"></div>
    </div>
  </div>
	
 	</div> 
</div>


