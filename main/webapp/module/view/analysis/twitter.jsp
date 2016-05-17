<%@ page language="java" contentType="charset=utf-8" pageEncoding="utf-8"%>
<div class="container-fluid" id="analysis_twitter">
<div class="row-fluid">
	<div class="span12">
	<div class="box" id="box_channel_twitter_analysis">
	<div class="box-header" id="header_channel">
		<ul id="list-twitter"></ul>
	</div>
	<div class="box-content padded">
	<div class="content_right">
	<div class="block_content">
	<div class="itemLoading" style="display:none"></div>
	<div class="block-title clearfix">
		<div class="left-title"><i class="icon-twitter-sign blue"></i><span class="name"></span></div>
		<div class="right-title">
			<ul class="box-toolbar">
			<li class="dropdown option-save-data">             
	            <a data-toggle="dropdown" class="dropdown-toggle dropdown-data" href="#"> <span><!--  <img class="menu-avatar" src="common/images/avatars/avatar1.jpg" /> -->
	             <span ><span text="realtime" id="reltime_tw">Real time data</span><i class="icon-caret-down"></i></span></span> </a>
	            <ul id="dropdown_menu" class="dropdown-menu">
	               	<li class="" id="save_data_tw"><a href="javascript:void(0)" ><span text="trackdata">Saved data</span></a></li>
	               	<li class="" id="real_time_tw"><a href="javascript:void(0)"><span text="realtime">Real time data</span></a></li>
	            </ul>
	          </li>
			<li><a href="javascript:void(0)" id="lev3_question_save_tw" tooltip="tooltip_question_save_tw" title=""><i class="icon-info-sign"></i></a></li>
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
			<a title="" href="javascript:void(0)" onclick="exportExcelTwitter();" type="excel">
			<span text="excel">Excel</span>
			</a>
			</li>
			<li style="margin:1px 1px" class="divider"></li>
			<li>
			<a title="" href="javascript:void(0)" onclick="exportCsvTwitter();" type="csv">
			<span text="csv">CSV</span>
			</a>
			</li>
			</ul>
	        </li>
	        
	        <form action="module/view/analysis/exportTwitterCsv.jsp" id="exportForm" method="post">
				<input id="exportName" name="exportName" type="hidden" value="report_twitter.csv" style="display:none;"/>
				<input type="hidden" name="exportContent" value="" id="exportContent" style="display:none" />
			</form>
			 <form  action="ExportTwitterExcel.do" id="exportExcelForm" method="post">
				<input type="hidden" name="exportExcelContent" value="" id="exportExcelContent" style="display:none" />
				<input type="hidden"  name="image_summary" id="image_summary" value="" style="display:none" />
			    <input type="hidden"  name="image_engagement" id="image_engagement" value="" style="display:none" />
			    <input type="hidden"  name="image_activity_spread" id="image_activity_spread" value="" style="display:none" />
			    <input type="hidden"  name="image_content" id="image_content" value="" style="display:none" />
			    <input type="hidden"  name="image_follower" id="image_follower" value="" style="display:none" />
			    <input type="hidden"  name="image_following" id="image_following" value="" style="display:none" />
			    <input type="hidden"  name="image_reach" id="image_reach" value="" style="display:none" />
			     <input type="hidden"  name="image_tweet" id="image_tweet" value="" style="display:none" />
			      <input type="hidden"  name="image_retweet" id="image_retweet" value="" style="display:none" />
			       <input type="hidden"  name="image_comment" id="image_comment" value="" style="display:none" />
			        <input type="hidden"  name="image_mention" id="image_mention" value="" style="display:none" />
			         <input type="hidden"  name="image_favorite" id="image_favorite" value="" style="display:none" />
			         
			          <input type="hidden"  name="image_engagement" id="image_engagement" value="" style="display:none" />
			       <input type="hidden"  name="image_engagement_rate" id="image_engagement_rate" value="" style="display:none" />
			        <input type="hidden"  name="image_activity" id="image_activity" value="" style="display:none" />
			         <input type="hidden"  name="image_brandroyalty" id="image_brandroyalty" value="" style="display:none" />
			    <input type="hidden"  name="daterange" id="daterange" value="" style="display:none" />
			</form>
	      </ul>
		</div>
	</div>
	<div class="block block-summary box" id="twitter_summary">
	<div class="box-header">
		<span class="title"><i class="icon-list"></i><span class="name" text="summary">Summary</span></span>
		<div class="tooltip_icon breadcrumb-button" id="lev3_summary_tw_tip" tooltip="tooltip_summary_tw_tip" title=""><i  class="icon-info-sign"></i></div>
	</div>
	<div class="block-content padded">
  <div class="row-fluid">
	  
    <div class="span3" id="summary">
     
      <!-- find me in partials/action_nav_normal --> 
      
      <!--big normal buttons-->
      <div class="action-nav-normal">
        <div class="row-fluid">
          <div class="span6 action-nav-button"> <a href="javascript:void(0)" title="Follower" class="active" type="follower"> <i class="icon-twitter"></i> <span text="follower">Follower</span> </a> <span class="triangle-button red"><i class="icon-plus"></i></span> </div>
          <div class="span6 action-nav-button"> <a href="javascript:void(0)" title="Following" type="following"> <i class="icon-twitter"></i> <span text="following">Following</span> </a> <!-- <span class="label label-black">14</span> --> </div>
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
      
      <div class="box" id="box-summary">
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
                      <li class="count" id="number-total-tw">0</li>
                    </ul>
                    <div class="progress progress-blue">
                      <div class="bar tip"  data-percent="80"></div>
                    </div>
                    <div class="stats-label" id="text-total">Total Follower</div>
                  </div>
                </div>
              </div>
              <div class="row-fluid" style="margin-top:30px;">
                <div class="span12">
                  <div class="dashboard-stats small">
                    <ul class="inline">
                      <li class="glyph"><i class="icon-user"></i></li>
                      <li class="count" id="number-new-tw">0</li>
                    </ul>
                    <div class="progress progress-blue">
                      <div class="bar tip"  data-percent="65"></div>
                    </div>
                    <div class="stats-label" id="text-new">New  Follower</div>
                  </div>
                </div>
               
                <!-- <div class="span6">
                  <div class="dashboard-stats small">
                    <ul class="inline">
                      <li class="glyph"><i class="icon-eye-open"></i></li>
                      <li class="count">25668</li>
                    </ul>
                    <div class="progress progress-blue">
                      <div class="bar tip"  data-percent="80"></div>
                    </div>
                    <div class="stats-label">Page Views</div>
                  </div>
                </div> -->
              </div>
            </div>
            <div class="span8">
              <div class="sine-chart" id="xchart-sine"></div>
               <div class="sine-chart" id="follower_chart" style="display:none"></div>
                <div class="sine-chart" id="following_chart" style="display:none"></div>
                 <div class="sine-chart" id="reach_chart" style="display:none"></div>
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
 	<div class="tooltip_icon breadcrumb-button" id="lev3_engagement_tw_tip" tooltip="tooltip_engagement_tw_tip" title=""><i  class="icon-info-sign"></i></div>
 	</div>
 	<div class="block-content padded">
 	<div class="row-fluid">
 		<div class="span3" id="engagement">
 			<ul class="list-action">
 				<li><a href="javascript:void(0)" type="engagement" class="active"><span text="engagement">Engagement</span><!--  <span class="help_tooltip" data-target="#help_engagement" data-toggle="modal" "><i class="icon-info-sign"></i></span>--><span class="amount" id="engagement_twitter">0</span></a></li>
 				<li><a href="javascript:void(0)" type="engagement_rate"><span text="engagement_rate">Engagement Rate</span><!--<span class="help_tooltip" data-target="#help_percent_engagement" data-toggle="modal" ><i class="icon-info-sign"></i></span>--><span class="amount" id="engagement_rate">0%</span></a></li>
 				<li><a href="javascript:void(0)" type="activity"><span text="activity">Activity</span><!--<span class="help_tooltip" data-target="#help_activity" data-toggle="modal" ><i class="icon-info-sign"></i></span>--><span class="amount" id="activity_twitter">0</span></a></li>
 				<li><a href="javascript:void(0)" type="brand royalty"><span text="brandroyaly">Brand Royalty</span><!--<span class="help_tooltip" data-target="#help_brand_loyalty" data-toggle="modal" ><i class="icon-info-sign"></i></span>--><span class="amount" id="brand_royalty">0</span></a></li>
 			</ul>
 		</div>
 		<div class="span9">
 		<div id="engagement-chart-all" class="xcharts-line-dotted" style="margin: 0 auto; width: 80%; height: 200px"></div>
 			<div id="engagement-chart" class="xcharts-line-dotted" style="margin: 0 auto; width: 40%; height: 200px ; display: none"></div>
 			<div id="engagement-rate-chart" class="xcharts-line-dotted" style="margin: 0 auto; width: 40%; height: 200px; display: none"></div>
 			
 			<div id="activity-chart" class="xcharts-line-dotted" style="margin: 0 auto; width: 40%; height: 200px; display: none"></div>
 		<div id="brandroyalty-chart" class="xcharts-line-dotted" style="margin: 0 auto; width: 40%; height: 200px; display: none"></div>
 		</div>
 	</div>
 	
 	</div>
 </div>
 <!-- block-contents -->
 <div class="block block-content box" id="twitter_contents">
	<div class="box-header">
		<span class="title"><i class="icon-list"></i><span class="name" text="contents">Contents</span></span>
		<div class="tooltip_icon breadcrumb-button" id="lev3_contents_tw_tip" tooltip="tooltip_contents_tw_tip" title=""><i  class="icon-info-sign"></i></div>
	</div>
	<div class="block-content padded">
  <div class="row-fluid">
	  
    <div class="span3">
     
      <!-- find me in partials/action_nav_normal --> 
      
      <!--big normal buttons-->
      <div class="action-nav-normal" id="contents">
        <div class="row-fluid">
          <div class="span6 action-nav-button"> <a href="javascript:void(0)" title="Tweet" class="active" type="tweet"> <i class="icon-file-alt"></i> <span text="tweet">Tweet</span> </a> <span class="triangle-button red"><i class="icon-plus"></i></span> </div>
          <div class="span6 action-nav-button"> <a href="javascript:void(0)" title="Retweet" type="retweet"> <i class="icon-comments-alt"></i> <span text="retweet">Retweet</span> </a> <!--  <span class="label label-black">14</span>--> </div>
        </div>
        <div class="row-fluid">
          <div class="span6 action-nav-button"> <a href="javascript:void(0)" title="Mention" type="mention"> <i class="icon-folder-open-alt"></i> <span text="mention">Mention</span> </a> </div>
          <div class="span6 action-nav-button"> <a href="javascript:void(0)" title="Comment" type="comment"> <i class="icon-file-alt"></i> <span text="comment">Comment</span> </a> </div>
        </div>
        <div class="row-fluid">
          <div class="span6 action-nav-button"> <a href="javascript:void(0)" title="Favorite" type="favorite"> <i class="icon-comments-alt"></i> <span text="favorite">Favorite</span> </a></div>
          <!-- <div class="span6 action-nav-button"> <a href="javascript:void(0)" title="Followers"> <i class="icon-twitter"></i> <span>Followers</span> </a> <span class="triangle-button blue"><span class="inner">+8</span></span> </div> -->
        </div>
      </div>
    </div>
    <div class="span9" id="box-content"> 
      <!-- find me in partials/big_chart -->
      
      <div class="box">
        <div class="box-header">
          <div class="title" id="contents_title">Tweet</div>
          
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
                      <div class="bar tip"  data-percent="80"></div>
                    </div>
                    <div class="stats-label" id="content-text-total">Total Tweet</div>
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
                      <div class="bar tip"  data-percent="65"></div>
                    </div>
                    <div class="stats-label" id="content-text-new">New Tweet</div>
                  </div>
                </div>
              <div class="span6">
                  <div class="dashboard-stats small">
                    <ul class="inline">
                      <li class="glyph"><i class="icon-eye-open"></i></li>
                      <li class="count" id="number-growth">0</li>
                    </ul>
                    <div class="progress progress-blue">
                      <div class="bar tip"  data-percent="80"></div>
                    </div>
                    <div class="stats-label" id="content-text-growth">Growth of rate</div>
                  </div> 
                </div>
              </div>
            </div>
            <div class="span8">
              <div class="sine-chart" id="xchart-sine-content"></div>
              <div class="sine-chart" id="tweet_chart" style="display:none;width:40%"></div>
              <div class="sine-chart" id="retweet_chart"  style="display:none;width:40%"></div>
              <div class="sine-chart" id="mention_chart"  style="display:none;width:40%"></div>
              <div class="sine-chart" id="comment_chart"  style="display:none;width:40%"></div>
              <div class="sine-chart" id="favorite_chart"  style="display:none;width:40%"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
 </div>
 <!-- content-top -->
 <div class="box content-top" >
    <div class="box-header"> <span class="title"><i class="icon-signal"></i> <span text="contenttop20">Content Top 20</span></span>
      <div id="lev3_contenttop20_tw_tip" class="tooltip_icon breadcrumb-button" tooltip="tooltip_contenttop20_tw_tip" title=""><i  class="icon-info-sign"></i></div>
    </div>
    <div class="box-content scrollable" >
      <table class="table table-normal" id="block-top">
        <thead>
          <tr>
            <td text="no">No</td>
            <td text="tittle">Title</td>
            <td text="mention">Mention</td>
            <td text="retweet">Retweet</td>
            <td text="comment">Comment</td>
            <td text="favorite">Favorite</td>
          </tr>
        </thead>
        <tbody>
          
        </tbody>
      </table>
    </div>
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
<div id="help_engagement" class="modal_help modal hide fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-header" >
		<button aria-hidden="true" data-dismiss="modal" class="close" type="button">x</button>
		<h3 text="title_help_engagement">Engagement </h3>
	</div>
	<div class="modal-body">
		<p text="content_help_engagement">
			Engagement : ((comments +mention+ retweet+ favorite)/(total tweet)*100%)/Total fans
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
			Activity  : Comments +mention + favorite + retweet
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
			Brand Royalty : mention + comment + retweet/tweet*100%
		</p>
		
	</div>
</div>
