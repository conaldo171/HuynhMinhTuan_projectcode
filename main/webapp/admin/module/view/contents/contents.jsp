<div class="container-fluid" id="contents_contents">
  	<div class="block-content">
 		<div class="block-title">
		
		<div class="right-title">
			<ul class="box-toolbar">
	        <li>
	          <div class="input-prepend"> <span class="add-on"><i class="icon-calendar"></i></span>
	            <input type="text" class="m-wrap m-ctrl-medium date-range" id="dashboard_range">
	          </div>
	        </li>
	        <li><button type="button" onclick="exportCsvContent();" id="export-csv" class="btn btn-red" text="export">Export Data</button></li>
	        <form method="post" id="exportForm" action="module/view/contents/exportContentCsv.jsp">
				<input type="hidden" style="display:none;" value="report_content.csv" name="exportName" id="exportName">
				<input type="hidden" style="display:none" id="exportContent" value="" name="exportContent">
			</form>
	      </ul>
		</div>
	</div>
	<div class="box block block-contents">
	    <div class="box-header"> <span class="title"><i class="icon-list-alt"></i> <span text="contents">Contents</span></span>
	      	
	    </div>
	    <div class="box-content padded">
	      	<div id="contents-chart"></div>
	    </div>
	  </div>
	  
	  <div class="box block block-contents">
	    <div class="box-header"> 
	      	<div class="block-channel active" type="1"><i class="icon-facebook-sign blue"></i><span text="facebookprofile">Facebook Profile</span></div>
	      	<div class="block-channel" type="2"><i class="icon-facebook-sign blue"></i><span text="facebookpage">Facebook Page</span></div>
	      	<div class="block-channel" type="3"><i class="icon-twitter-sign blue"></i><span text="twitter">Twitter Profile</span></div>
	    </div>
	    <div class="box-content padded">
	      	<div id="profile-chart"></div>
	    </div>
	  </div>
	  
	  <!-- <div class="box block block-contents">
	    <div class="box-header"> <span class="title"><i class="icon-list-alt"></i> <span>Contents-Industry</span></span>
	      	
	    </div>
	    <div class="box-content padded">
	      	<div id="contents-industry-chart"></div>
	    </div>
	  </div> -->
</div>
</div>