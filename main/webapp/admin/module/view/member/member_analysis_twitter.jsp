<script type="text/javascript" src="module/js/member/member_analysis_twitter.js"></script>
<%@include file="/admin/module/view/common/Permission.jsp"%>
 <!-- twitter -->
		 <div class="container-fluid" id="analysis_twitter">
		<div class="row-fluid">
		 <div class="span2 menu-left">
			<h5 text="twitter">Twitter</h5>
			<ul id="list-twitter">
				
			</ul>
		</div>
		
		<div class="span10 content_right">
		<div class="block_content">
		<div class="itemLoading" style="display:none"></div>
		 <div class="block-title">
			<div class="left-title"><i class="icon-twitter-sign blue"></i><span class="name"></span></div>
			<div class="right-title">
				<ul class="box-toolbar">
		        <li>
		          <div class="input-prepend"> <span class="add-on"><i class="icon-calendar"></i></span>
		            <input type="text" id="dashboard_range" class="m-wrap m-ctrl-medium date-range">
		            
		          </div>
		         
		        </li>
		        <li><input class="btn btn-red" type="button" id="export-csv" onclick="exportCsvTwitter();" text="export" value="Export Data" text="export_data"></li>
		        <form action="module/view/member/exportAnalysisTwitterCsv.jsp" id="exportFormTwitter" method="post">
					<input id="exportName" name="exportName" type="hidden" value="report_twitter.csv" style="display:none;"/>
					<input type="hidden" name="exportContenttwitter" value="" id="exportContenttwitter" style="display:none" />
				</form>
		      </ul>
			</div>
		</div>
		
		<div class="block block-summary box" id="twitter_summary">
			<div class="box-header">
				<span class="title"><i class="icon-list"></i><span class="name" text="summary">Summary</span></span>
				
			</div>
			<div class="block-content padded">
		  <div class="row-fluid">
			  
		    <div class="span3" id="summary">
		     
		      <!-- find me in partials/action_nav_normal --> 
		      
		      <!--big normal buttons-->
		      <div class="action-nav-normal">
		        <div class="row-fluid">
		          <div class="span6 action-nav-button"> <a href="javascript:void(0)" title="Follower" class="active" type="follower"> <i class="icon-file-alt"></i> <span text="follower">Follower</span> </a> <span class="triangle-button red"><i class="icon-plus"></i></span> </div>
		          <div class="span6 action-nav-button"> <a href="javascript:void(0)" title="Following" type="following"> <i class="icon-comments-alt"></i> <span text="following">Following</span> </a> <span class="label label-black">14</span> </div>
		        </div>
		        <div class="row-fluid">
		          <div class="span6 action-nav-button"> <a href="javascript:void(0)" title="Reach" type="reach"> <i class="icon-folder-open-alt"></i> <span text="reach">Reach</span> </a> </div>
		          <!-- <div class="span6 action-nav-button"> <a href="#" title="Friends"> <i class="icon-facebook-sign"></i> <span>Friends</span> </a> </div> -->
		        </div>
		        <!-- <div class="row-fluid">
		          
		          <div class="span6 action-nav-button"> <a href="#" title="Followers"> <i class="icon-twitter"></i> <span>Followers</span> </a> <span class="triangle-button blue"><span class="inner">+8</span></span> </div>
		        </div> -->
		      </div>
		    </div>
		    <div class="span9"> 
		      <!-- find me in partials/big_chart -->
		      
		      <div class="box">
		        <div class="box-header">
		          <div class="title" id="summary_title"></div>
		          
		        </div>
		        <div class="box-content padded" >
		          <div class="row-fluid">
		            <div class="span4 separate-sections" style="margin-top: 5px;">
		              <div class="row-fluid">
		                <div class="span12">
		                  <div class="dashboard-stats">
		                    <ul class="inline">
		                      <li class="glyph"><i class="icon-bolt icon-2x"></i></li>
		                      <li class="count" id="number-total">0</li>
		                    </ul>
		                    <div class="progress progress-blue">
		                      <div class="bar tip" title="80%" data-percent="80"></div>
		                    </div>
		                    <div class="stats-label" id="text-total" text="totalvisits">Total Visits</div>
		                  </div>
		                </div>
		              </div>
		              <div class="row-fluid" style="margin-top:30px;">
		                <div class="span12">
		                  <div class="dashboard-stats small">
		                    <ul class="inline">
		                      <li class="glyph"><i class="icon-user"></i></li>
		                      <li class="count" id="number-new">0</li>
		                    </ul>
		                    <div class="progress progress-blue">
		                      <div class="bar tip" title="65%" data-percent="65"></div>
		                    </div>
		                    <div class="stats-label" id="text-new" text="newvisitor">New Visitors</div>
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