<script type="text/javascript" src="module/js/member/member_analysis_facebook.js"></script>
<%@include file="/admin/module/view/common/Permission.jsp"%>
<div class="container-fluid" id="analysis_facebook">
	<div class="row-fluid">
		<div class="span2 menu-left">
			<h5 text="facebookpage">Facebook Page</h5>
			<ul id="list-facebook-page-analysis" class="list-facebook">
				
			</ul>
			<h5 text="facebookprofile">Facebook Profile</h5>
			<ul id="list-facebook-profile-analysis" class="list-facebook">
				
			</ul>
		</div>
		
		<div class="span10 content_right">
		<div class="block_content">
		<div class="block-title">
			<div class="left-title"><i class="icon-facebook-sign blue"></i><span class="name"></span></div>
			<div class="right-title">
				<ul class="box-toolbar">
		        <li>
		          <div class="input-prepend"> <span class="add-on"><i class="icon-calendar"></i></span>
		            <input type="text" id="dashboard_range" class="m-wrap m-ctrl-medium date-range">
		          </div>
		        </li>
		        <li><button class="btn btn-red"  id="export-csv" onclick="exportCsvFacebook();" type="button" text="export_data">Export Data</button></li>
		        <form action="module/view/member/exportAnalysisFBCsv.jsp" id="exportForm_Analysis" method="post">
					<input id="exportName" name="exportName" type="hidden" value="report_facebook.csv" style="display:none;"/>
					<input type="hidden" name="exportContent_Analysis" value="" id="exportContent_Analysis" style="display:none" />
				</form>
		      </ul>
			</div>
		</div>
		
		<div class="itemLoading"></div>
		<div class="block block-summary box">
			<div class="box-header">
				<span class="title"><i class="icon-list"></i><span class="name" text="summary">Summary</span></span>
				
			</div>
			<div class="block-content padded">
		  <div class="row-fluid">
			  
		    <div class="span3" id="summary_fb">
		     
		      <!-- find me in partials/action_nav_normal --> 
		      
		      <!--big normal buttons-->
		      <div class="action-nav-normal">
		        <div class="row-fluid">
		          <div class="span6 action-nav-button"> <a href="javascript:void(0)" type="fan" title="Fan"  class="active"> <i class="icon-file-alt"></i> <span text="fan">Fan</span> </a> <span id="box-new-fan-plus" class="triangle-button red"><i class="icon-plus"></i></span> </div>
		          <div class="span6 action-nav-button"> <a href="javascript:void(0)" type="friend of fan" title="Friend of Fan"> <i class="icon-comments-alt"></i> <span text="friendfan">Friend of Fan</span> </a> <span id="new_fan" class="label label-black">0</span> </div>
		        </div>
		        <div class="row-fluid">
		          <div class="span6 action-nav-button"> <a href="javascript:void(0)" type="reach" title="Reach"> <i class="icon-folder-open-alt"></i> <span text="reach">Reach</span> </a> </div>
		          <div class="span6 action-nav-button"> <a href="javascript:void(0)" type="people talking" title="People Talking"> <i class="icon-facebook-sign"></i> <span text="peopletalking">People Talking</span> </a> </div>
		        </div>
		        <div class="row-fluid">
		          
		          <div class="span6 action-nav-button"> <a href="javascript:void(0)" type="people talking growth"  title="People Talking"> <i class="icon-twitter"></i> <span text="peopletalkingofgrowth">People Talking</span> </a> </div>
		        </div>
		      </div>
		    </div>
		    <div class="span9"> 
		      <!-- find me in partials/big_chart -->
		      
		      <div class="box">
		        <div class="box-header">
		          <div class="title" id="summary_title_fb" text="fan">Fan</div>
		          
		        </div>
		        <div class="box-content padded">
		          <div class="row-fluid">
		            <div class="span4 separate-sections" style="margin-top: 5px;">
		              <div class="row-fluid">
		                <div class="span12">
		                  <div class="dashboard-stats">
		                    <ul class="inline">
		                      <li class="glyph"><i class="icon-bolt icon-2x"></i></li>
		                      <li class="count" id="number-total-fb">0</li>
		                    </ul>
		                    <div class="progress progress-blue">
		                      <div class="bar tip" title="80%" data-percent="80"></div>
		                    </div>
		                    <div class="stats-label" id="text-total" text="totalfan">Total Fan</div>
		                  </div>
		                </div>
		              </div>
		              <div class="row-fluid" style="margin-top:30px;">
		                <div class="span6">
		                  <div class="dashboard-stats small">
		                    <ul class="inline">
		                      <li class="glyph"><i class="icon-user"></i></li>
		                      <li class="count" id="number-total-visiter" >0</li>
		                    </ul>
		                    <div class="progress progress-blue">
		                      <div class="bar tip" title="65%" data-percent="65"></div>
		                    </div>
		                    <div class="stats-label" id="text-new" text="newfan">New Fan</div>
		                  </div>
		                </div>
		              <div class="span6">
		                  <div class="dashboard-stats small">
		                    <ul class="inline">
		                      <li class="glyph"><i class="icon-eye-open"></i></li>
		                      <li class="count" id="number_growth_of_rate">0</li>
		                    </ul>
		                    <div class="progress progress-blue">
		                      <div class="bar tip" title="80%" data-percent="80"></div>
		                    </div>
		                    <div class="stats-label" id="text-growth" text="growthofrate">Growth of rate</div>
		                  </div> 
		                </div>
		              </div>
		            </div>
		            <div class="span8">
		              <div class="sine-chart" id="xchart-sine"></div>
		            </div>
		          </div>
		        </div>
		      </div>
		    </div>
		  </div>
		  </div>
		 </div>
		 </div>
		 </div>
	</div>
</div>