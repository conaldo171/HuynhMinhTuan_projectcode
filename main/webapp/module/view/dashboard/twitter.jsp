<%@include file="../../../module/view/common/Permission.jsp"%>
<div class="container-fluid" id="dashboard_twitter">
  <div class="row-fluid">
<div class="span12">
<div class="content_right" id="" access_token="">
<div class="itemLoading" style="display:none"></div>
<div class="block_content">
<div class="block-title">
	<div class="right-title">
		<ul class="box-toolbar">
        <li>
          <div class="input-prepend"> <span class="add-on"><i class="icon-calendar"></i></span>
            <input type="text" class="m-wrap m-ctrl-medium date-range" id="dashboard_range" />
          </div>
        </li>
      </ul>
	</div>
</div>
<div class="box summary" >
    <div class="box-header"><span class="title"><i class="icon-list"></i> <span text="summary">Summary</span></span>
      
    </div>
    <div class="box-content" id="facebook_summary">
    	<div class="row-fluid">
    		<div class="span2 block-summary">
    			<div class="span6">
    				<i class="icon-twitter"></i>
    				<span class="follower" text="follower">follower</span>
    			</div>
    			<div class="span6 right">
	    			<span class="number" id="follower_num">0</span>
	    			<span class="growth blue" id="growth_follower"><span id="growth_follower_num" class="fL">0%</span><i class="icon-caret-up"></i></span>
    			</div>
    		</div>
    		<div class="span2 block-summary">
    			<div class="span6">
    				<i class="icon-twitter"></i>
    				<span class="following" text="following">following</span>
    			</div>
    			<div class="span6 right">
	    			<span class="number" id="following_num">0</span>
	    			<span class="growth red" id="growth_following"><span id="growth_following_num" class="fL">0%</span><i class="icon-caret-down"></i></span>
    			</div>
    		</div>
    		<div class="span2 block-summary">
    			<div class="span6">
    				<i class="icon-folder-open-alt"></i>
    				<span class="reach" text="reach">reach</span>
    			</div>
    			<div class="span6 right">
	    			<span class="number" id="reach_num">0</span>
	    			<span class="growth blue" id="growth_reach"><span id="growth_reach_num" class="fL">0%</span><i class="icon-caret-up"></i></span>
    			</div>
    		</div>
    		<div class="span2 block-summary">
    			<div class="span6">
    				<i class="icon-comments-alt"></i>
    				<span class="retweet" text="retweet">retweet</span>
    			</div>
    			<div class="span6 right">
	    			<span class="number" id="retweet_num">0</span>
	    			<span class="growth red" id="growth_retweet"><span id="growth_retweet_num" class="fL">0%</span><i class="icon-caret-down"></i></span>
    			</div>
    		</div>
    		<div class="span2 block-summary">
    			<div class="span6">
    				<i class="icon-file-alt"></i>
    				<span class="comment" text="comment">comment</span>
    			</div>
    			<div class="span6 right">
	    			<span class="number" id="comment_num">0</span>
	    			<span class="growth red" id="growth_comment"><span id="growth_comment_num" class="fL">0%</span><i class="icon-caret-down"></i></span>
    			</div>
    		</div>
    	</div>
    </div>
     <div class="box-content" id="twitter_summary" style="display:none">
    	<div class="row-fluid">
    		<div class="span2 block-summary">
    			<i class="icon-group"></i>
    			<span class="title" text="engagement">Engagement</span>
    			<span class="number" id="engagement">0</span>
    		</div>
    		<div class="span2 block-summary">
    			<i class="icon-book"></i>
    			<span class="title" text="engagementofgrowth">Growth of Engagement</span>
    			<span class="number"><span id="percent_engagement">0</span><span>%</span></span>
    		</div>
    		<div class="span2 block-summary">
    			<i class="icon-lightbulb"></i>
    			<span class="title" text="activity">Activity</span>
    			<span class="number" id="activity">0</span>
    		</div>
    		<div class="span2 block-summary">
    			<i class="icon-time"></i>
    			<span class="title" text="activityofgrowth">Growth of Activity</span>
    			<span class="number"><span id="percent_active">0</span><span>%</span></span>
    		</div>
    		<div class="span2 block-summary">
    			<i class="icon-keyboard"></i>
    			<span class="title" text="tweet">Tweet</span>
    			<span class="number" id="tweet-number">0</span>
    		</div>
    		<div class="span2 block-summary">
    			<i class="icon-tasks"></i>
    			<span class="title" text="tweetofgrowth">Growth of Tweet</span>
    			<span class="number"><span id="percent_tweet">0</span><span>%</span></span>
    		</div>
    		
    	</div>
    </div>
    
  </div>

  <div class="box summary" >
    <div class="box-header"> <span class="title"><i class="icon-signal"></i> <span text="contenttop10">Content Top 10</span></span>
      
    </div>
    <div class="box-content scrollable" >
      <table class="table table-normal" id="block-top">
        <thead>
          
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


