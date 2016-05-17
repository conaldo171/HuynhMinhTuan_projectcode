<%@include file="../../../module/view/common/Permission.jsp"%>

<div class="container-fluid" id="dashboard_facebook_page">
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
    				<i class="icon-facebook-sign"></i>
    				<span class="fan" text="fan">FAN</span>
    			</div>
    			<div class="span6 right">
	    			<span class="number" id="fan_num">0</span>
	    			<span id="growth_fan_cl" class="growth"><span id="growth_fan_num" class="fL">0%</span><i class="icon-caret-up"></i></span>
    			</div>
    		</div>
    		<div class="span2 block-summary">
    			<div class="span6">
    				<i class="icon-folder-open-alt"></i>
    				<span class="reach" text="reach">REACH</span>
    			</div>
    			<div class="span6 right">
	    			<span class="number" id="reach_num">0</span>
	    			<span id="growth_reach_cl" class="growth "><span id="growth_reach_num" class="fL">0%</span><i class="icon-caret-up"></i></span>
    			</div>
    		</div>
    		<div class="span2 block-summary">
    			<div class="span6">
    				<i class="icon-comments-alt"></i>
    				<span class="like" text="like">LIKE</span>
    			</div>
    			<div class="span6 right">
	    			<span class="number" id="like_num">0</span>
	    			<span id="growth_like_cl" class="growth"><span id="growth_like_num" class="fL">0%</span><i class="icon-caret-up"></i></span>
    			</div>
    		</div>
    		<div class="span2 block-summary">
    			<div class="span6">
    				<i class="icon-folder-open-alt"></i>
    				<span class="share" text="share">SHARE</span>
    			</div>
    			<div class="span6 right">
	    			<span class="number" id="share_num">0</span>
	    			<span id="growth_share_cl" class="growth"><span id="growth_share_num" class="fL">0%</span><i class="icon-caret-up"></i></span>
    			</div>
    		</div>
    		<div class="span2 block-summary">
    			<div class="span6">
    				<i class="icon-file-alt"></i>
    				<span class="comment" text="comment">comment</span>
    			</div>
    			<div class="span6 right">
	    			<span class="number" id="comment_num">0</span>
	    			<span id="growth_comment_cl" class="growth"><span id="growth_comment_num" class="fL">0%</span></span>
    			</div>
    		</div>
    	</div>
    </div>
    
    
  </div>
<div class="box summary demographic" >
    <div class="box-header"><span class="title"><i class="icon-bar-chart"></i> <span text="demographic">DemoGraphic</span></span>
     
    </div>
    <div class="box-content">
    	
    	<div class="clearfix">
		<div class="fL" id="gender-chart">
			<div class="chartBox">			
	        	<p><i class="icon-user"></i></p>
				<div class="chart" id="gender"></div>
			</div>
	        <h5 text="gender">Gender</h5>	       
		</div><!--/span3 -->
        
        <div class="fL" id="age-chart">
        	<div class="chartBox">
				<p><i class="icon-time"></i></p>
				<div class="chart" id="age"></div>
			</div>
			<h5 text="age">Age</h5>			
        </div><!--/span3 -->
        
        <div class="span3" id="fb_status">
        	<div class="chartBox">
				<p><i class="icon-heart"></i></p>
		        <div  class="chart" id="status" ></div>
	        </div>
	        <h5 text="status">Status</h5>	       
       </div><!--/span3 -->
       
        <div class="span3" id="fb_education">
        	<div class="chartBox">	
	        	<p><i class="icon-thumbs-up"></i></p>   
		        <div class="chart" id="education" ></div>
	        </div>
	        <h5 text="education">Education</h5>	       
		</div><!--/span3 -->

      </div><!-- /row -->
    		
    	
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


