<%@include file="/admin/module/view/common/Permission.jsp"%>
<%
session.setAttribute("Sessiondateto",null);
session.setAttribute("Sessiondatefrom",null);
%>
<div class="container-fluid" id="member_member">
  	<div class="block-title">
		
		<div class="right-title">
			<ul class="box-toolbar">
	        <li>
	          <div class="input-prepend"> <span class="add-on"><i class="icon-calendar"></i></span>
	            <input type="text" class="m-wrap m-ctrl-medium date-range" id="dashboard_range">
	          </div>
	        </li>
	        <li>
	          <div class="input-prepend" > 
	            <select id="industry" style="width:140px;">
	            	<option value="industry" text="industry">Industry</option>
	            	<option value ="all" text="all">All</option>
	            	<option value="agency" text="agency">Agency</option>
	                <option value="education" text="education">Education</option>
	                <option value="entertainment" text="entertainment">Entertainment</option>
	                <option value="financial" text="financial">Financial</option>
	                <option value="franchise" text="franchise">Franchise</option>
	                <option value="government" text="government">Government</option>
	                <option value="healthcare" text="healthcare">Healthcare</option>
	                <option value="hospitality" text="hospitality">Hospitality</option>
	                <option value="insurance" text="insurance">Insurance</option>
	                <option value="media" text="media">Media</option>
	                <option value="nonprofit" text="nonprofit">Non Profit</option>
	                <option value="other" text="other">Other</option>
	                <option value="publicrelations" text="publicrelations">Public Relations</option>
	                <option value="retail" text="retail">Retail</option>
	                <option value="socialmediaconsultant" text="socialmediaconsultant">Social Media Consultant</option>
	                <option value="sports" text="sports">Sports</option>
	                <option value="technology" text="technology">Technology</option>
	                <option value="telecommunications" text="telecommunications">Telecommunications</option>
	                <option value="travel" text="travel">Travel</option>
	            </select> 
	          </div>
	        </li>
	        <li>
	          <div class="input-prepend" > 
	            <select id="service" style="width:140px;">
	            	<option value ="" text="service">Service</option>
	            	<option value ="" text="all">All</option>
	            	<option value="0" text="free">Free</option>
	            	<option value="1" text="basic">Basic</option>
	            </select> 
	          </div>
	        </li>
	        <li>
	          <div class="input-prepend" > 
	            <select id="all-user" style="width:140px;">
	            	<option value="" text="all">All</option>
	            	<option value="name" text="name">Name</option>
	            	<option value="email" text="email">Email</option>
	            </select> 
	          </div>
	        </li>
	        <li>
	          <div class="input-prepend"> 
	           <input id="txt_email_name" class=""   style="width:200px;" type="text">
	          </div>
	        </li>
	        <li><button text="export_data" type="button" id="search" class="btn btn-red" onclick="loadMemberAfterSearch()" text="search">Search</button></li>
	        <li><button text="export_data" type="button" onclick="exportCsvMember();" id="export-csv" class="btn btn-red" text="export">Export Data</button></li>
	        
	        <form method="post" id="exportForm" action="module/view/member/exportMemberCsv.jsp">
				<input type="hidden" style="display:none;" value="report_Member.csv" name="exportName" id="exportName">
				<input type="hidden" style="display:none" id="exportContent" value="" name="exportContent">
			</form>
			
	      </ul>
		</div>
	</div>
	<div class="block-table box-table">
	 <div id="outertable" style="width:100%; height:100%;">
		<table id="member-jqgrid"></table>
		<div id="padtable"></div>
	</div>
	</div>
</div>