<div class="container-fluid" id="competitors_facebook" >
	<div class="block_save_competitors">
	<div class="row-fluid mBT10">
	
		<div class="span6 leftName">
			<div class="block_name_search"  id="search_page_name1">
			<input  type="text" name="" id="txt_page_name1" placeholder="Facebook page name" role="textbox" />
			
			</div>
		</div>
		
		<div class="content-area">
			   	<ul id="list-page1" style="display:none;">
					
				</ul>
				</div>
		<div class="span1 centerName">
			VS
		</div>
		
		<div class="span5 rightName">
			<div class="block_name_search" id="search_page_name2">
			<form class="">
				<input aria-haspopup="true" aria-autocomplete="list" " type="text" name="" id="txt_page_name2" placeholder="Facebook page name" role="textbox" autocomplete="off"  onclick="this.name='';" onfocus="this.select()" />
			</form>
			</div>
		</div>
		
		<div class="content-area">
			   	<ul id="list-page2" style="display:none;">
					
				</ul>
				</div>
	</div>
	<div class="row-fluid">
		<div class="span6 leftName">
			<ul class="blockPage fR clearfix">
				<li class="name" text="nofacebookpage">No Facebook Page</li>
				<li><img src=".../../common/images/no_page.png" /></li>
			</ul>
		</div>
		<div class="span1 centerName">
			VS
		</div>
		
		<div class="span5 rightName">
			<ul class="blockPage clearfix">
				<li><img src=".../../common/images/no_page.png" /></li>
				<li class="name" text="nofacebookpage">No Facebook Page</li>
			</ul>
		</div>
	</div>
	<div class="row-fluid">
		<div class="span7">
			<button id="btn_Save" class="btn btn-red fR mR50" text="saveandcompare">Save & Compare</button>
		</div>
		<div class="span5 mL0">
			<button id="btn_Compare" class="btn btn-red" text="compare">Compare</button>
		</div>
	</div>
	<div class="row-fluid block-compare" style="margin-top:10px;margin-bottom:10px;width:100%">
		<table id="jQgrid_compare" ></table>
	</div>
	</div>
	<div class="block_show_competitors">
	<div class="row-fluid">
		<div id="page1" class="span6 leftName">
			<button class="btn btn-default" id="btn_back" text="back">Back</button>
			<ul class="blockPage fR clearfix">
				<li class="name">No Facebook Page</li>
				<li><img src=".../../common/images/no_page.png" /></li>
			</ul>
		</div>
		
		<div id="page2" class="span6 rightName">
			<ul class="blockPage clearfix">
				<li><img src=".../../common/images/no_page.png" /></li>
				<li class="name">No Facebook Page</li>
			</ul>
		</div>
	</div>
	<div class="row-fluid blockCompare mBT10">
		<div class="span12 mBT10">
			<div class="span6 alR leftCompare">
				<label>Fan</label>
				<div  class="blockGray clearfix">
					<div id="fan_left" class="blockColor">
						<p id="number_fan" class="number fR">0</p>
						<p class="percent fL" id="percent_fan">0</p>
					</div>
				</div>
			</div>
			<div class="span6 rightCompare">
				<label>Fan</label>
				<div  class="blockGray clearfix">
					<div id="fan_right"  class="blockColor">
						<p id="number_fan_right" class="number fL">0</p>
						<p class="percent fR" id="percent_fan_right">0</p>
					</div>
				</div>
			</div>
		</div>
	<!-- 	<div class="row-fluid mBT10">
		<div class="span12">
			<div class="span6 alR leftCompare">
				<label>Reach</label>
				<div  class="blockGray clearfix">
					<div id="reach_left" class="blockColor">
						<p id="number_fan" class="number fR">0</p>
						<p class="percent fL" id="percent_fan">0</p>
					</div>
				</div>
			</div>
			<div  class="span6 rightCompare">
				<label>Reach</label>
				<div  class="blockGray clearfix">
					<div id="reach_right" class="blockColor">
						<p id="number_reach_right" class="number fL">0</p>
						<p class="percent fR" id="percent_reach_right">0</p>
					</div>
				</div>
			</div>
		</div>
		</div> -->
		<div class="row-fluid mBT10">
		<div class="span12">
			<div class="span6 alR leftCompare">
				<label>People Talking</label>
				<div  class="blockGray clearfix">
					<div id="ptat_left" class="blockColor">
						<p id="number_people_talking" class="number fR">0</p>
						<p class="percent fL" id="percent_people_talking">0</p>
					</div>
				</div>
			</div>
			<div class="span6 rightCompare">
				<label>People Talking</label>
				<div  class="blockGray clearfix">
					<div id="ptat_right" class="blockColor">
						<p id="number_people_talking_right" class="number fL">0</p>
						<p class="percent fR" id="percent_people_talking_right">0</p>
					</div>
				</div>
			</div>
		</div>
		</div>
		<div class="row-fluid mBT10">
		<div class="span12">
			<div class="span6 alR leftCompare">
				<label text="engagement">Engagement</label>
				<div  class="blockGray clearfix">
					<div id="engagement_left" class="blockColor">
						<p id="number_engagement" class="number fR">0</p>
						<p class="percent fL" id="percent_engagement">0</p>
					</div>
				</div>
			</div>
			<div class="span6 rightCompare">
				<label text="engagement">Engagement</label>
				<div class="blockGray clearfix">
					<div  id ="engagement_right" class="blockColor">
						<p id="number_engagement_right" class="number fL">0</p>
						<p class="percent fR" id="percent_engagement_right">0</p>
					</div>
				</div>
			</div>
		</div>
		</div>
		<div class="row-fluid mBT10">
		<div class="span12">
			<div class="span6 alR leftCompare">
				<label text="activity">Activity</label>
				<div  class="blockGray clearfix">
					<div id="activity_left" class="blockColor">
						<p id="number_activity" class="number fR">0</p>
						<p class="percent fL" id="percent_activity">0</p>
					</div>
				</div>
			</div>
			<div class="span6 rightCompare">
				<label text="activity">Activity</label>
				<div  class="blockGray clearfix">
					<div id="activity_right" class="blockColor">
						<p id="number_activity_right" class="number fL">0</p>
						<p class="percent fR" id="percent_activity_right">0</p>
					</div>
				</div>
			</div>
		</div>
		</div>
		<div class="row-fluid mBT10">
		<div class="span12">
			<div class="span6 alR leftCompare">
				<label text="brand_loyalty">Brand Loyalty</label>
				<div  class="blockGray clearfix">
					<div id="brand_loyalty_left" class="blockColor">
						<p id="number_brand_loyalty" class="number fR">0</p>
						<p class="percent fL" id="percent_brand_loyalty">0</p>
					</div>
				</div>
			</div>
			<div class="span6 rightCompare">
				<label text="brand_loyalty">Brand Loyalty</label>
				<div  class="blockGray clearfix">
					<div id="brand_loyalty_right" class="blockColor">
						<p id="number_brand_loyalty_right" class="number fL">0</p>
						<p class="percent fR" id="percent_brand_loyalty_right">0</p>
					</div>
				</div>
			</div>
		</div>
		</div>
		<div class="row-fluid mBT10">
			<div class="span6">
				<ul class="list_note">
					<li class="line_blue"></li>
					<li id="page_name1" text="no_page" >No facebook Page</li>
					<li class="line_green"></li>
					<li id="page_name2" text="no_page" >No facebook Page</li>
				</ul>
			</div>
			<div class="span6">
				<div class="right-title">
								<ul class="box-toolbar">
									<li>
										<div class="input-prepend">
											<span class="add-on"><i class="icon-calendar"></i> </span> <input type="text" class="m-wrap m-ctrl-medium date-range" id="competitors_range">

										</div>
									</li>
									<li class="dropdown"><a text="export_data" href="#" data-toggle="dropdown" class="dropdown-toggle btn btn-red">Export Data</a>
										<ul class="dropdown-menu">
											<li><a type="excel" onclick="exportExcelTwitter();" href="javascript:void(0)" title=""> <span text="excel">Excel</span> </a>
											</li>
											<li class="divider" style="margin: 1px 1px"></li>
											<li><a type="csv" onclick="exportCsvTwitter();" href="javascript:void(0)" title=""> <span text="csv">CSV</span> </a>
											</li>
										</ul>
									</li>
								</ul>
							</div>
			</div>
		</div>
		<div class="row-fluid mBT10">
			<div class="box">
				<div class="box-header">
					<span class="title" text="fan">Fan</span>
				</div>
				<div class="box-content padded">
					<div id="fan_chart" class="chart_content"></div>
				</div>
			</div>
		</div>
		<!-- <div class="row-fluid mBT10">
			<div class="box">
				<div class="box-header">
					<span class="title" text="reach">Reach</span>
				</div>
				<div class="box-content padded">
					<div id="reach_chart"></div>
				</div>
			</div>
		</div> -->
		<div class="row-fluid mBT10">
			<div class="box">
				<div class="box-header">
					<span class="title" text="people_talking">People Talking</span>
				</div>
				<div class="box-content padded">
					<div id="people_talking_chart" class="chart_content"></div>
				</div>
			</div>
		</div>
		<div class="row-fluid mBT10">
			<div class="box">
				<div class="box-header">
					<span class="title" text="engagement">Engagement</span>
				</div>
				<div class="box-content padded">
					<div id="engagement_chart" class="chart_content"></div>
				</div>
			</div>
		</div>
		
		<div class="row-fluid mBT10">
			<div class="box">
				<div class="box-header">
					<span class="title" text="activity">Activity</span>
				</div>
				<div class="box-content padded">
					<div id="activity_chart" class="chart_content"></div>
				</div>
			</div>
		</div>
		<div class="row-fluid mBT10">
			<div class="box">
				<div class="box-header">
					<span class="title" text="brand_loyalty">Brand Loyalty</span>
				</div>
				<div class="box-content padded">
					<div id="brand_loyalty_chart" class="chart_content"></div>
				</div>
			</div>
		</div>
		<div class="row-fluid mBT10">
			<div class="box">
				<div class="box-header">
					<span class="title" text="content">Content</span>
				</div>
				<div class="box-content padded">
					<div id="content_chart" class="chart_content"></div>
				</div>
			</div>
		</div>
		<div class="row-fluid mBT10">
			<div class="box">
				<div class="box-header">
					<span class="title" text="like">Like</span>
				</div>
				<div class="box-content padded">
					<div id="like_chart" class="chart_content"></div>
				</div>
			</div>
		</div>
		<div class="row-fluid mBT10">
			<div class="box">
				<div class="box-header">
					<span class="title" text="comment">Comment</span>
				</div>
				<div class="box-content padded">
					<div id="comment_chart" class="chart_content"></div>
				</div>
			</div>
		</div>
		
		<div class="row-fluid mBT10">
			<div class="box">
				<div class="box-header">
					<span class="title" text="share">Share</span>
				</div>
				<div class="box-content padded">
					<div id="share_chart" class="chart_content"></div>
				</div>
			</div>
		</div>
		
		<div class="row-fluid mBT10">
			<div class="box clearfix">
			<div class="box-header">
			<span class="title" text="influence_user">Influence User</span>
			</div>
			<div class="box-content">
			<div class="span6">
				<table id="left_influence" class="table table-normal">
					<thead>
					<tr>
						<td text="account">Account</td>
						<td text="spread">Activity</td>
						<td text="brand_loyalty">Brand Loyalty</td>
					</tr>
					</thead>
					<tbody>
					
					</tbody>
				</table>
			</div>
			
			<div class="span6">
				<table id="right_influence" class="table table-normal">
					<thead>
					<tr>
						<td text="account">Account</td>
						<td text="spread">Activity</td>
						<td text="brand_loyalty">Brand Loyalty</td>
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
 	<!--<div class="row-fluid mBT10">
			<div class="box">
				<div class="box-header">
					<span class="title" text="demographic">Demographic</span>
				</div>
				<div class="box-content">
					<div class="span3">
						<div id="gender_chart"></div>
					</div>
					<div class="span3">
						<div id="age_chart"></div>
					</div>
					<div class="span3">
						<div id="gender_chart"></div>
					</div>
					<div class="span3">
						<div id="age_chart"></div>
					</div>
				</div>
			</div>
		</div>-->
	</div>
</div>
