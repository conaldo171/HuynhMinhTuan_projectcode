<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    </head>
<div class="container-fluid" id="competitors_twitter">
	<div class="block_save_competitors">
	<div class="row-fluid mBT10">
		
		<div class="span6 leftName">
		<div class="block_name_search" id="search_twitter1">
		<form class="">
			<input aria-haspopup="true" aria-autocomplete="list" " type="text" name="" id="txt_twitter1" placeholder="Twitter name" role="textbox" autocomplete="off"  onclick="this.name='';" onfocus="this.select()" />
		</form>
		</div>
		</div>
		
		<div class="content-area">
			   	<ul id="list-twitter1" style="display:none;"></ul>
		</div>
		
		<div class="span1 centerName">
			VS
		</div>
		<div class="span5 rightName">
		<div class="block_name_search" id="search_twitter2">
		<form class="">
			<input aria-haspopup="true" aria-autocomplete="list" " type="text" name="" id="txt_twitter2" placeholder="Twitter name" role="textbox" autocomplete="off"  onclick="this.name='';" onfocus="this.select()" />
		</form>
		</div>
		</div>
		
		<div class="content-area">
			   	<ul id="list-twitter2" style="display:none;">
					
				</ul>
				</div>
	</div>

	<div class="row-fluid">
		<div class="span6 leftName" id="twitter1" channel_detail_id="">
			<ul class="blockPage fR clearfix">
				<li class="name" text="notwitter">No Twitter</li>
				<li><img src=".../../common/images/no_twitter.jpg"></li>
			</ul>
		</div>
		<div class="span1 centerName">
			VS
		</div>
		
		<div class="span5 rightName" id="twitter2" channel_detail_id="">
			<ul class="blockPage clearfix">
				<li><img src=".../../common/images/no_twitter.jpg"></li>
				<li class="name" text="notwitter">No Twitter</li>
			</ul>
		</div>
	</div>
	<div class="row-fluid mBT10">
		<div class="span7">
			<button id="btn_Save" class="btn btn-red fR mR50" text="saveandcompare">Save & Compare</button>
		</div>
		<div class="span5 mL0">
			<button id="btn_compare" class="btn btn-red" text="compare">Compare</button>
		</div>
	</div>
	<div class="row-fluid block-compare mBT10">
		<table id="jQgrid_compare"></table>
	</div>
	</div>
	<div class="block_show_competitors">
	<div class="row-fluid">
		<div class="span6 leftName">
			<button class="btn btn-default" id="btn_back" text="back">Back</button>
			<ul class="blockPage fR clearfix">
				<li class="name">No Twitter</li>
				<li><img src=".../../common/images/no_twitter.jpg"></li>
			</ul>
		</div>
		
		<div class="span6 rightName">
			<ul class="blockPage clearfix">
				<li><img src=".../../common/images/no_twitter.jpg"></li>
				<li class="name">No Twitter</li>
			</ul>
		</div>
	</div>
	<div class="row-fluid blockCompare mBT10">
		<div class="span12 mBT10">
			<div class="span6 alR leftCompare">
				<label text="follower">Follower</label>
				<div class="blockGray clearfix">
					<div class="blockColor" id="width_follower_left">
						<p id="number_follower" class="number fR">0</p>
						<p class="percent fL" id="percent_follower">0%</p>
					</div>
				</div>
			</div>
			<div class="span6 rightCompare">
				<label text="follower">Follower</label>
				<div class="blockGray clearfix">
					<div class="blockColor" id="width_follower_right">
						<p id="number_follower_right" class="number fL">0</p>
						<p class="percent fR" id="percent_follower_right">0%</p>
					</div>
				</div>
			</div>
		</div>
		<div class="row-fluid mBT10">
		<div class="span12">
			<div class="span6 alR leftCompare">
				<label text="following">Following</label>
				<div class="blockGray clearfix">
					<div class="blockColor" id="width_following_left">
						<p id="number_following" class="number fR">0</p>
						<p class="percent fL" id="percent_following">0%</p>
					</div>
				</div>
			</div>
			<div class="span6 rightCompare">
				<label text="following">Following</label>
				<div class="blockGray clearfix">
					<div class="blockColor" id="width_following_right">
						<p id="number_following_right" class="number fL">0</p>
						<p class="percent fR" id="percent_following_right">0%</p>
					</div>
				</div>
			</div>
		</div>
		</div>
		<div class="row-fluid mBT10">
		<div class="span12">
			<div class="span6 alR leftCompare">
				<label text="spread">Spread</label>
				<div class="blockGray clearfix">
					<div class="blockColor" id="width_reach_left">
						<p id="number_reach" class="number fR">0</p>
						<p class="percent fL" id="percent_reach">0%</p>
					</div>
				</div>
			</div>
			<div class="span6 rightCompare">
				<label text="spread">Spread</label>
				<div class="blockGray clearfix">
					<div class="blockColor" id="width_reach_right">
						<p id="number_reach_right" class="number fL">0</p>
						<p class="percent fR" id="percent_reach_right">0%</p>
					</div>
				</div>
			</div>
		</div>
		</div>
		<div class="row-fluid mBT10">
		<div class="span12">
			<div class="span6 alR leftCompare">
				<label text="engagement">Engagement</label>
				<div class="blockGray clearfix">
					<div class="blockColor" id="width_engagement_left">
						<p id="number_engagement" class="number fR">0</p>
						<p class="percent fL" id="percent_engagement">0%</p>
					</div>
				</div>
			</div>
			<div class="span6 rightCompare">
				<label text="engagement">Engagement</label>
				<div class="blockGray clearfix">
					<div class="blockColor" id="width_engagement_right">
						<p id="number_engagement_right" class="number fL">0</p>
						<p class="percent fR" id="percent_engagement_right">0%</p>
					</div>
				</div>
			</div>
		</div>
		</div>
		<div class="row-fluid mBT10">
		<div class="span12">
			<div class="span6 alR leftCompare">
				<label text="activity">Activity</label>
				<div class="blockGray clearfix">
					<div class="blockColor" id="width_activity_left">
						<p id="number_activity" class="number fR">0</p>
						<p class="percent fL" id="percent_activity">0%</p>
					</div>
				</div>
			</div>
			<div class="span6 rightCompare">
				<label text="activity">Activity</label>
				<div class="blockGray clearfix">
					<div class="blockColor" id="width_activity_right">
						<p id="number_activity_right" class="number fL">0</p>
						<p class="percent fR" id="percent_activity_right">0%</p>
					</div>
				</div>
			</div>
		</div>
		</div>
		<div class="row-fluid mBT10">
		<div class="span12">
			<div class="span6 alR leftCompare">
				<label text="brand_loyalty">Brand Loyalty</label>
				<div class="blockGray clearfix">
					<div class="blockColor" id="width_brand_loyalty_left">
						<p id="number_brand_loyalty" class="number fR">0</p>
						<p class="percent fL" id="percent_brand_loyalty">0%</p>
					</div>
				</div>
			</div>
			<div class="span6 rightCompare">
				<label text="brand_loyalty">Brand Loyalty</label>
				<div class="blockGray clearfix">
					<div class="blockColor" id="width_brand_loyalty_right">
						<p id="number_brand_loyalty_right" class="number fL">0</p>
						<p class="percent fR" id="percent_brand_loyalty_right">0%</p>
					</div>
				</div>
			</div>
		</div>
		</div>
		<div class="row-fluid mBT10">
			<div class="span6">
				<ul class="list_note">
					<li class="line_blue"></li>
					<li id="name_compare_tw1">No Twitter</li>
					<li class="line_green"></li>
					<li id="name_compare_tw2">No Twitter</li>
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
					<span class="title" text="follower">Follower</span>
				</div>
				<div class="box-content padded">
					<div id="follower_chart" class="chart_content"></div>
				</div>
			</div>
		</div>
		<div class="row-fluid mBT10">
			<div class="box">
				<div class="box-header">
					<span class="title" text="following">Following</span>
				</div>
				<div class="box-content padded">
					<div id="following_chart" class="chart_content"></div>
				</div>
			</div>
		</div>
		<div class="row-fluid mBT10">
			<div class="box">
				<div class="box-header">
					<span class="title" text="spread">Spread</span>
				</div>
				<div class="box-content padded">
					<div id="reach_chart" class="chart_content"></div>
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
					<span class="title" text="tweet">Tweet</span>
				</div>
				<div class="box-content padded">
					<div id="tweet_chart" class="chart_content"></div>
				</div>
			</div>
		</div>
		<div class="row-fluid mBT10">
			<div class="box">
				<div class="box-header">
					<span class="title" text="retweet">Retweet</span>
				</div>
				<div class="box-content padded">
					<div id="retweet_chart" class="chart_content"></div>
				</div>
			</div>
		</div>
		
		<div class="row-fluid mBT10">
			<div class="box">
				<div class="box-header">
					<span class="title" text="mention">Mention</span>
				</div>
				<div class="box-content padded">
					<div id="mention_chart" class="chart_content"></div>
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
					<span class="title" text="favorite">Favorite</span>
				</div>
				<div class="box-content padded">
					<div id="favorite_chart" class="chart_content"></div>
				</div>
			</div>
		</div>
		
	</div>
	</div>
</div>