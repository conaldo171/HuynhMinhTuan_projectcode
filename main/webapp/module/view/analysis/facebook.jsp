<div class="container-fluid" id="analysis_facebook">
<div class="row-fluid">
	<div class="span12">
	<div class="box" id="box_channel_profile_analysis">
	<div class="box-header" id="header_channel">
		<ul id="list-facebook-profile-analysis"></ul>
	</div>
	<div class="box-content padded">
	<div class="content_right">
	<div class="itemLoading" style="display: none"></div>
	<div class="block_content">
	<div class="block-title clearfix">
		<div class="left-title"><i class="icon-facebook-sign blue"></i><span class="name"></span></div>
		<div class="right-title">
			<ul class="box-toolbar">
			<li class="dropdown option-save-data">             
	            <a data-toggle="dropdown" class="dropdown-toggle dropdown-data" href="#"> <span><!--  <img class="menu-avatar" src="common/images/avatars/avatar1.jpg" /> -->
	             <span  ><span text="realtime" id="reltime_fb">Real time data</span><i class="icon-caret-down"></i></span></span> </a>
	            <ul id="dropdown_menu" class="dropdown-menu">
	               	<li class="" id="save_data_fb"><a href="javascript:void(0)" ><span text="trackdata">Saved data</span></a></li>
	               	<li class="" id="real_time_fb"><a href="javascript:void(0)"><span text="realtime">Real time data</span></a></li>
	            </ul>
	          </li>
			<li><a href="javascript:void(0)" id="lev3_question_save" tooltip="tooltip_question_save" title=""><i class="icon-info-sign"></i></a></li>
	        <li id="calendar_three" style="display: none">
	          <div class="input-prepend"> <span class="add-on"><i class="icon-calendar"></i></span>
	            <input type="text" id="dashboard_range_three" class="m-wrap m-ctrl-medium date-range">
	          </div>
	        </li>
	        <li id="calendar_two" style="display: none">
	          <div class="input-prepend"> <span class="add-on"><i class="icon-calendar"></i></span>
	            <input type="text" id="dashboard_range_two" class="m-wrap m-ctrl-medium date-range">
	          </div>
	        </li>
	        <li class="dropdown">
	        <a class="dropdown-toggle btn btn-red" data-toggle="dropdown" href="#" text="export_data">Export Data</a>
	        <ul class="dropdown-menu">
			<li>
			<a title="" href="javascript:void(0)" onclick="exportExcelFacebookProfile();" type="excel">
			<span text="excel">Excel</span>
			</a>
			</li>
			<li style="margin:1px 1px" class="divider"></li>
			<li>
			<a title="" href="javascript:void(0)" onclick="exportCsvFacebook();" type="csv">
			<span text="csv">CSV</span>
			</a>
			</li>
			</ul>
	        </li>
	        <form action="module/view/analysis/exportFacebookCsv.jsp" id="exportForm" method="post">
				<input id="exportName" name="exportName" type="hidden" value="report_facebook.csv" style="display:none;"/>
				<input type="hidden" name="exportContent" value="" id="exportContent" style="display:none" />
			</form>
			 <form action="ExportFacebookProfileExcel.do" id="exportExcelForm" method="post">
				<input type="hidden" name="exportExcelContent" value="" id="exportExcelContent" style="display:none" />
				<input type="hidden"  name="image_engagement" id="image_engagement" value="" style="display:none" />
			    <input type="hidden"  name="image_content" id="image_content" value="" style="display:none" />
			    <input type="hidden"  name="image_gender" id="image_gender" value="" style="display:none" />
			    <input type="hidden"  name="image_age" id="image_age" value="" style="display:none" />
			    <input type="hidden"  name="image_chart_fan" id="image_chart_fan" value="" style="display:none" />
			    <input type="hidden"  name="image_chart_reach" id="image_chart_reach" value="" style="display:none" />
			    <input type="hidden"  name="image_chart_peopletalking" id="image_chart_peopletalking" value="" style="display:none" />
			    <input type="hidden"  name="image_chart_peopletalking_fan" id="image_chart_peopletalking_fan" value="" style="display:none" />
			    <input type="hidden"  name="image_chart_like" id="image_chart_like" value="" style="display:none" />
			    <input type="hidden"  name="image_chart_engagement_growth" id="image_chart_engagement_growth" value="" style="display:none" />
			    <input type="hidden"  name="image_chart_activity" id="image_chart_activity" value="" style="display:none" />
			    <input type="hidden"  name="image_chart_brandroyalty" id="image_chart_brandroyalty" value="" style="display:none" />
			    <input type="hidden"  name="image_chart_share" id="image_chart_share" value="" style="display:none" />
			    <input type="hidden"  name="image_chart_comment" id="image_chart_comment" value="" style="display:none" />
			     <input type="hidden"  name="image_chart_comment_like" id="image_chart_comment_like" value="" style="display:none" />
			     <input type="hidden"  name="daterange" id="daterange" value="" style="display:none" />
			    <input type="hidden"  name="image_status" id="image_status" value="" style="display:none" />
			    <input type="hidden"  name="image_education" id="image_education" value="" style="display:none" />
			</form>
	      </ul>
		</div>
	</div>
	<div class="block block-summary box">
	<div class="box-header">
		<span class="title"><i class="icon-list"></i><span class="name" text="summary">Summary</span></span>
		<div id="lev3_summary_tip" class="tooltip_icon breadcrumb-button" tooltip="tooltip_summary_tip" title=""><i  class="icon-info-sign"></i></div>
	</div>
	<div class="block-content padded">
  <div class="row-fluid">
	  
    <div class="span3" id="summary_fb">
     
      <!-- find me in partials/action_nav_normal --> 
      
      <!--big normal buttons-->
      <div class="action-nav-normal">
        <div class="row-fluid">
          <div class="span6 action-nav-button"> <a href="javascript:void(0)" type="fan" title="Fan"  class="active"> <i class="icon-facebook-sign"></i> <span text="fan">Friend</span> </a> <span id="box-new-fan-plus" class="triangle-button red"><i class="icon-plus"></i></span> </div>
          <div class="span6 action-nav-button"> <a href="javascript:void(0)" type="friend of fan" title="Friend of Fan"> <i class="icon-facebook-sign"></i> <span text="friendfan">Friend of Friend</span> </a> <span id="new_fan" class="label label-black">0</span> </div>
        </div>
        <div class="row-fluid">
          <div class="span6 action-nav-button"> <a href="javascript:void(0)" type="reach" title="Reach"> <i class="icon-folder-open-alt"></i> <span text="reach">Reach</span> </a> </div>
          <div class="span6 action-nav-button"> <a href="javascript:void(0)" type="people talking" title="People Talking"> <i class="icon-comments-alt"></i> <span text="peopletalking">People Talking</span> </a> </div>
        </div>
        <div class="row-fluid">
          
          <div class="span6 action-nav-button"> <a href="javascript:void(0)" type="people talking growth"  title="People Talking"> <i class="icon-comments-alt"></i> <span text="peopletalkingofgrowth">People Talking</span> </a> </div>
        </div>
      </div>
    </div>
    <div class="span9"> 
      <!-- find me in partials/big_chart -->
      
      <div class="box" id="box-summary">
        <div class="box-header">
          <div class="title" id="summary_title_fb">Friend</div>
          <span data-toggle="modal" style="display:none" data-target="#help_people_talking" class="help_tooltip"><i class="icon-info-sign"></i></span>
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
                      <div class="bar tip" title="" data-percent="80"></div>
                    </div>
                    <div class="stats-label" id="text-total">Total Friend</div>
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
                      <div class="bar tip" title="" data-percent="65"></div>
                    </div>
                    <div class="stats-label" id="text-new">New Friend</div>
                  </div>
                </div>
              <div class="span6">
                  <div class="dashboard-stats small">
                    <ul class="inline">
                      <li class="glyph"><i class="icon-eye-open"></i></li>
                      <li class="count" id="number_growth_of_rate">0</li>
                    </ul>
                    <div class="progress progress-blue">
                      <div class="bar tip" title="" data-percent="80"></div>
                    </div>
                    <div class="stats-label" id="text-growth">Growth of rate</div>
                  </div> 
                </div>
              </div>
            </div>
            <div class="span8">
              <div class="sine-chart" id="xchart-sine"></div>
              <div class="sine-chart" id="fan_chart" style="display:none"></div>
               <div class="sine-chart" id="reach_chart" style="display:none"></div>
               <div class="sine-chart" id="peopletalking_chart" style="display:none"></div>
               <div class="sine-chart" id="peopletalking_fan_chart" style="display:none"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
 </div>
 <!-- block-engagement -->
 <div class="block block-engagement box">
 	<div class="box-header">
 		<span class="title"><i class="icon-user"></i><span class="name" text="engagement">Engagement</span></span>
 	<div id="lev3_engagement_tip" class="tooltip_icon breadcrumb-button" tooltip="tooltip_engagement_tip" title=""><i  class="icon-info-sign"></i></div>
 	</div>
 	<div class="block-content padded">
 	<div class="row-fluid">
 		<div class="span3" id="engagement">
 			<ul class="list-action">
 				<li><a href="javascript:void(0)" type="engagement" class="active"><span text="engagement">Engagement</span><!--  <span class="help_tooltip" data-target="#help_engagement" data-toggle="modal" "><i class="icon-info-sign"></i></span>--><span class="amount" id="engagement_num">0%</span></a></li>
 				<li><a href="javascript:void(0)" type="engagement_rate"><span text="engagement_rate">Engagement Rate</span><!--<span class="help_tooltip" data-target="#help_percent_engagement" data-toggle="modal" ><i class="icon-info-sign"></i></span>--><span class="amount" id="engagement_rate_num">0</span></a></li>
 				<li><a href="javascript:void(0)" type="activity"><span text="activity">Activity</span><!--<span class="help_tooltip" data-target="#help_activity" data-toggle="modal" ><i class="icon-info-sign"></i></span>--><span class="amount" id="activity_num">0</span></a></li>
 				<li><a href="javascript:void(0)" type="brand royalty"><span text="brandroyality">Brand Royalty</span><!--<span class="help_tooltip" data-target="#help_brand_loyalty" data-toggle="modal" ><i class="icon-info-sign"></i></span>--><span class="amount" id="brand_royalty_num">0%</span></a></li>
 			</ul>
 		</div>
 		<div class="span9">
 			<div class="xcharts-line-dotted" id="engagement-chart" style="width: 100%; height: 200px"></div>
 			<div class="xcharts-line-dotted" id="engagement_chart_export" style="width: 40%; height: 200px;display: none"></div>
 			<div class="xcharts-line-dotted" id="engagement_growth_chart_export" style="width: 40%; height: 200px;display: none"></div>
 			<div class="xcharts-line-dotted" id="engagement_activity_chart_export" style="width: 40%; height: 200px;display: none"></div>
 			<div class="xcharts-line-dotted" id="engagement_brandroyalty_chart_export" style="width: 40%; height: 200px;display: none"></div>
 		</div>
 	</div>
 	</div>
 </div>
 <!-- block-contents -->
 <div class="block block-content box">
	<div class="box-header">
		<span class="title"><i class="icon-list"></i><span class="name" text="contents">Contents</span></span>
		<div id="lev3_contents_tip" class="tooltip_icon breadcrumb-button" tooltip="tooltip_contents_tip" title=""><i  class="icon-info-sign"></i></div>
	</div>
	<div class="block-content padded">
  <div class="row-fluid">
	  
    <div class="span3" id="contents">
     
      <!-- find me in partials/action_nav_normal --> 
      
      <!--big normal buttons-->
      <div class="action-nav-normal">
        <div class="row-fluid">
          <div class="span6 action-nav-button"> <a href="javascript:void(0)" type="content" class="active" title="Post"> <i class="icon-file-alt"></i> <span text="contents">Contents</span> </a> <span class="triangle-button red" id="box-new-content"><i class="icon-plus"></i></span> </div>
          <div class="span6 action-nav-button"> <a href="javascript:void(0)" type="like" title="Like"> <i class="icon-comments-alt"></i> <span text="like">Like</span> </a> <span class="label label-black" id="box-new-like">0</span> </div>
        </div>
        <div class="row-fluid">
          <div class="span6 action-nav-button"> <a href="javascript:void(0)" type="share" title="Share"> <i class="icon-folder-open-alt"></i> <span text="share">Share</span> </a> </div>
          <div class="span6 action-nav-button"> <a href="javascript:void(0)" type="comment" title="Comment"> <i class="icon-file-alt"></i> <span text="comment">Comment</span> </a> </div>
        </div>
        <div class="row-fluid">
          
          <div class="span6 action-nav-button"> <a href="javascript:void(0)" type="like of comment" title="Like of Comment"> <i class="icon-comments-alt"></i> <span text="commentlike">Like of Comment</span> </a> </div>
        </div>
      </div>
    </div>
    <div class="span9" id="box-content"> 
      <!-- find me in partials/big_chart -->
      
      <div class="box">
        <div class="box-header">
          <div class="title" id="contents_title_fb">Friend</div>
          
        </div>
        <div class="box-content padded">
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
                      <div class="bar tip" title="" data-percent="80"></div>
                    </div>
                    <div class="stats-label" id="content-text-total">Total Friend</div>
                  </div>
                </div>
              </div>
              <div class="row-fluid" style="margin-top:30px;">
                <div class="span6">
                  <div class="dashboard-stats small">
                    <ul class="inline">
                      <li class="glyph"><i class="icon-user"></i></li>
                      <li class="count" id="number-new" >0</li>
                    </ul>
                    <div class="progress progress-blue">
                      <div class="bar tip" title="" data-percent="65"></div>
                    </div>
                    <div class="stats-label" id="content-text-new">New Friend</div>
                  </div>
                </div>
              <div class="span6">
                  <div class="dashboard-stats small">
                    <ul class="inline">
                      <li class="glyph"><i class="icon-eye-open"></i></li>
                      <li class="count" id="number-growth">0</li>
                    </ul>
                    <div class="progress progress-blue">
                      <div class="bar tip" title="" data-percent="80"></div>
                    </div>
                    <div class="stats-label" id="content-text-growth">Growth of rate</div>
                  </div> 
                </div>
              </div>
            </div>
            <div class="span8">
              <div class="sine-chart" id="xchart-sine-content"></div>
              <div class="sine-chart" id="content_chart" style="display:none"></div>
              <div class="sine-chart" id="like_chart" style="display:none"></div>
              <div class="sine-chart" id="share_chart" style="display:none"></div>
              <div class="sine-chart" id="comment_chart" style="display:none"></div>
              <div class="sine-chart" id="comment_like_chart" style="display:none"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
 </div>
 
    	<div class="box block content-top">
  	<div class="box-header"> <span class="title"><i class="icon-signal"></i> <span text="contenttop20">Content Top 20</span></span>
     <div id="lev3_contenttop20_tip" class="tooltip_icon_left breadcrumb-button" tooltip="tooltip_contenttop20_tip" title=""><i  class="icon-info-sign"></i></div>
      <ul class="box-toolbar">
          <li class="toolbar-link"><span>Top: </span><input type="number" data-mask="number" id="number-content-top" value="10" data-type="number" /></li>
        </ul>
    </div>
	 <div id="content_top_table" style="width:100%; height:100%;">
		<table id="top_jqgrid"></table>
	</div>
	</div>
  <!-- block user: influence -->
  <div class="block block-influence box">
  	<div class="box-header">
		<span class="title"><i class="icon-user"></i><span class="name" text="userinfluence">User: influence</span></span>
		<span id="loading-small"></span>
		<div id="lev3_userinfluence_tip" class="tooltip_icon_left breadcrumb-button" tooltip="tooltip_userinfluence_tip" title=""><i  class="icon-info-sign"></i></div>
		<ul class="box-toolbar">
          <li class="toolbar-link"><span>Top: </span><input type="number" data-mask="number" id="number-influence-top" value="10" data-type="number" /></li>
        </ul>
	</div>
	<div class="block-content">
	<div class="row-fluid">
		<table class="table table-normal" id="block-influence">
        <thead>
          <tr>
          	<td text="no">No</td>
            <td text="account">Account</td>
            <td text="activity">Activity</td>
            <td text="brandroyality">Brand Royality</td>
          </tr>
        </thead>
        <tbody>
          
        </tbody>
      </table>
	</div>
	</div>
  </div>
  <!-- block user: demographic -->
  <div class="block block-demographic box">
  	<div class="box-header">
		<span class="title"><i class="icon-user"></i><span class="name" text="userdemographic">User: Demographic</span></span>
		<div id="lev3_demographic_tip" class="tooltip_icon breadcrumb-button" tooltip="tooltip_demographic_tip" title=""><i  class="icon-info-sign"></i></div>
	</div>
	<div class="box-content">
    	
    	<div class="clearfix">
    	<div class="item_chart">
		<div id="gender-chart">
			<div class="chartBox">			
	        	<p><i class="icon-user"></i></p>
				<div class="chart" id="gender"></div>
			</div>
	        <h5 text="gender">Gender</h5>	       
		</div>
		</div><!--/span3 -->
        <div class="item_chart">
        <div id="age-chart">
        	<div class="chartBox">
				<p><i class="icon-time"></i></p>
				<div class="chart" id="age"></div>
			</div>
			<h5 text="age">Age</h5>			
        </div>
        </div><!--/span3 -->
        <div class="item_chart">
        <div id="fb_status">
        	<div class="chartBox">
				<p><i class="icon-heart"></i></p>
		        <div  class="chart" id="status" ></div>
	        </div>
	        <h5 text="status">Status</h5>	       
       </div>
       </div><!--/span3 -->
       <div class="item_chart">
        <div id="fb_education">
        	<div class="chartBox">	
	        	<p><i class="icon-thumbs-up"></i></p>   
		        <div class="chart" id="education" ></div>
	        </div>
	        <h5 text="education">Education</h5>	       
		</div>
		</div><!--/span3 -->

      </div><!-- /row -->
    		
    	
    </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
</div>

<!--  <div id="popup-question-save" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-header">
		<button aria-hidden="true" data-dismiss="modal" class="close" type="button">x</button>
		<h3 text="helpsavedata">Save data help</h3>
	</div>
	<div class="modal-body">
		<h4 text="titlerealsave">1. Real-time data analysis</h4>
		<p text="contentrealsave">Real-time data means that show the  result of our social media marketing now.<br />
Real-time data isn't save, so you can't check again this data.<br />
We can gather and analysis under 1,000 post.<br />
(It is followed policy of facebook and twitter)
		</p>
		<h4 text="titlesavedata">2. Saved-data analysis</h4>
		<p text="contenttrackdata">We gather the data from facebook and twitter everyday at 24pm.<br />
You can check data after 7 days from login.<br />
So you can't check result of analysis with real-time, <br />
Also you can't check past data before login with Enpick.<br />
But your result of analysis is saved and check, save anytime.
		</p>
	</div>
	<div class="modal-footer">
		<p text="trackdatareach">* The latest value of "<b>reach</b>" is only supported until the day before yesterday.</p>
		<p text="trackdatapeopletalking">* The latest value of "<b>people talking</b>" is only supported until the day before yesterday.</p>
	</div>
</div>-->

<div id="popup-track-data" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-header">
		<button aria-hidden="true" data-dismiss="modal" class="close" type="button">x</button>
		<h3 text="titletrackdata">Track data analysis</h3>
	</div>
	<div class="modal-body">
		<p text="contentcheckdata">You can check data after 7 days from login.
		</p>
		
	</div>
</div>

<div id="help_people_talking" class="modal hide fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-header" >
		<button aria-hidden="true" data-dismiss="modal" class="close" type="button">x</button>
		<h3 text="title_help_people_talking">People are talking about this</h3>
	</div>
	<div class="modal-body">
		<p text="content_help_people_talking">
			- liking a Page<br />
			- posting to a Page's Wall<br />
			- liking, commenting on or sharing a Page post <br />
			- (or other content on a page, like photos, videos or albums)<br />
			- answering a Question posted<br />
			- RSVPing to an event<br />
			- mentioning a Page in a post<br />
			- phototagging a Page<br />
			- liking or sharing a check-in deal<br />
			- or checking in at a Place. 
		</p>
		
	</div>
</div>

<div id="help_percent_people_talking" class="modal_help modal hide fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-header" >
		<button aria-hidden="true" data-dismiss="modal" class="close" type="button">x</button>
		<h3 text="title_help_percent_people_talking">% People are talking about this</h3>
	</div>
	<div class="modal-body">
		<p text="content_help_percent_people_talking">
			people are talking about this/total fan *100
		</p>
		
	</div>
</div>

<div id="help_engagement" class="modal_help modal hide fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-header" >
		<button aria-hidden="true" data-dismiss="modal" class="close" type="button">x</button>
		<h3 text="title_help_engagement">Engagement </h3>
	</div>
	<div class="modal-body">
		<p text="content_help_engagement">
			the unigue nember of people who liked, commented, shared 
for clicked on your post. 
		</p>
		
	</div>
</div>

<div id="help_percent_engagement" class="modal_help modal hide fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-header" >
		<button aria-hidden="true" data-dismiss="modal" class="close" type="button">x</button>
		<h3 text="title_help_percent_engagement">% engagement </h3>
	</div>
	<div class="modal-body">
		<p text="content_help_percent_engagement">
			% engagement = engagement/total fan *100 
		</p>
		
	</div>
</div>

<div id="help_activity" class="modal_help modal hide fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-header" >
		<button aria-hidden="true" data-dismiss="modal" class="close" type="button">x</button>
		<h3 text="title_help_activity">Activity </h3>
	</div>
	<div class="modal-body">
		<p text="content_help_activity">
			Activity = like + share +comment + comment like
		</p>
		
	</div>
</div>

<div id="help_brand_loyalty" class="modal_help modal hide fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-header" >
		<button aria-hidden="true" data-dismiss="modal" class="close" type="button">x</button>
		<h3 text="title_help_brand_loyalty">Brand loyalty  </h3>
	</div>
	<div class="modal-body">
		<p text="content_help_brand_loyalty">
			Brand loyalty = (share + comment)/total post
		</p>
		
	</div>
</div>
