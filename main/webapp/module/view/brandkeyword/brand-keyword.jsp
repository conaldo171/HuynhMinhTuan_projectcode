<%@ page language="java" contentType="charset=utf-8"
	pageEncoding="utf-8"%>
<div class="container-fluid" id="analysis_brand_keyword">
	<div class="row-fluid">
		<div class="span12">
			<div class="box-content">
				<div class="content_right">
					<div class="block_content">
						<div class="block-title clearfix">
							
							<div id="cancel_detail" class="hide_detail span8" style="display:none"><span class="btnClose" style="margin-right: 5px;"><i class="icon-remove-sign"></i></span><span>Close detail</span></div>
							<div class="right-title">
								<ul class="box-toolbar">
									<li>
										<div class="input-prepend">
											<span class="add-on"><i class="icon-calendar"></i> </span> <input
												type="text" id="brand_keyword_range"
												class="m-wrap m-ctrl-medium date-range">

										</div>
									</li>
									<li class="dropdown"><a
										class="dropdown-toggle btn btn-red" data-toggle="dropdown"
										href="#" text="export_data">Export Data</a>
										<ul class="dropdown-menu">
											<li><a title="" href="javascript:void(0)"
												onclick="exportExcelTwitter();" type="excel"> <span
													text="excel">Excel</span> </a>
											</li>
											<li style="margin: 1px 1px" class="divider"></li>
											<li><a title="" href="javascript:void(0)"
												onclick="exportCsvTwitter();" type="csv"> <span
													text="csv">CSV</span> </a>
											</li>
										</ul>
									</li>

									<form action="module/view/analysis/exportTwitterCsv.jsp"
										id="exportForm" method="post">
										<input id="exportName" name="exportName" type="hidden"
											value="report_twitter.csv" style="display: none;" /> <input
											type="hidden" name="exportContent" value=""
											id="exportContent" style="display: none" />
									</form>
									<form action="ExportTwitterExcel.do" id="exportExcelForm"
										method="post">
										
									</form>
								</ul>
							</div>
						</div>
						<div class="row-fluid">
							<div id="show_content" class="span8">
								<div class="itemLoading" style="display: none"></div>
								<ul id="content_search" class="chat-box timeline">
									
									
								</ul>
								<ul id="message_detail_brand_keyword" class="chat-box timeline" style="display:none"></ul>
							</div>
							<div class="span4">
								<div class="box brand_keyword">
									<div class="box-header">
										<span text="brand_keyword" class="title">Brand Keyword</span>
									</div>
									<div class="box-content scrollable">
										<ul id="list_brand_keyword" class="box-list check">
											
										</ul>
										<ul id="add_brand_keyword" class="box-list check">
											<li id="add_keyword"><span text="add_keyword"><i
													class="icon-plus-sign"></i>Add Keyword</span></li>
										</ul>
									</div>
								</div>
								<div class="box box_keyword" id="box_add_keyword">
									<div class="box-header">
										<span class="title" text="add_keyword">Add Keyword</span>
									</div>
									<div class="box-content padded clearfix">
										<input type="text" placeholder="keyword" id="txt_keyword" text="keyword" />
										<h5 text="search_netword">Search Network</h5>
										<ul class="box-list">
											<li>
												<span><i class="icon-facebook-sign blue"></i>Facebook</span>
												<div class="pull-right">
													<input type="radio" group="keyword" id="facebook_keyword" checked value="1" name="keyword" />
												</div>
											</li>
											<li>
												<span><i class="icon-twitter-sign blue"></i>Twitter</span>
												<div class="pull-right">
													<input type="radio" group="keyword" id="twitter_keyword" value="3" name="keyword" />
												</div>
											</li>
										</ul>
										<div class="block_button">
											<button id="btn_cancle" class="btn btn-default" text="cancel" type="button">Cancel</button>
											<button id="btn_save" class="btn btn-red" text="save" type="button">Save</button>
											
										</div>
									</div>
								</div>
								
								<div class="box box_keyword" id="box_modify_keyword">
									<div class="box-header">
										<span class="title" text="add_keyword">Modify Keyword</span>
									</div>
									<div class="box-content padded clearfix">
										<input type="text" placeholder="keyword" id="txt_keyword_edit" />
										<h5 text="search_netword">Search Network</h5>
										<ul class="box-list">
											<li>
												<span><i class="icon-facebook-sign blue"></i>Facebook</span>
												<div class="pull-right">
													<input type="radio" group="keyword_edit" id="facebook_keyword_edit" value="1" name="keyword_edit" />
												</div>
											</li>
											<li>
												<span><i class="icon-twitter-sign blue"></i>Twitter</span>
												<div class="pull-right">
													<input type="radio" group="keyword_edit" id="twitter_keyword_edit" value="3" name="keyword_edit" />
												</div>
											</li>
										</ul>
										<div class="block_button">
											<button id="btn_delete_edit" class="btn btn-default" text="delete" type="button">Delete</button>
											<button id="btn_save_modify" class="btn btn-red" text="save" type="button">Save</button>
										</div>
									</div>
								</div>
								<div class="box brand_keyword">
									<div class="box-header">
										<span text="top_influence" class="title">Top Influence</span>
									</div>
									<div class="box-content scrollable">
										<ul id="list_top_influence" class="box-list">
											
										</ul>
										
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<ul class="dropdown-menu tooltip-profile" id="tooltip-page-brand-keyword">
    <li class="tooltip-icon"><i class="icon-caret-up"></i></li>
	<li id="loading-page"></li>
	<li id="information-page"><div class="profile-tip-cover">
			<img id="image-cover-page" src="">
		</div>
		<div class="profile-tip-avatar-profile">
			<a target="_blank" href=""><img id="image-avatar-page"
				src="">
			</a>
		</div>
		<div class="block_info">
		<div class="profile-tip-info">
			<a id="fb-url-name" href="" target="_blank">
				<div class="cover-username" id="fb-name-page"></div>
				<div class="cover-headline" id="fb-category-page"></div>
				
			</a>
			<ul class="list-information">
			<li id="fan-page-brand"> likes</li>
			<li id="talking-about-brand"> </li>
		</ul>
		</div>
		
		 <p id="manual_friends_brand" class="mutual_friends"></p>
		<p id="friendship_brand" class="friendship"><a id="link_frienship" href="" target="_blank">See friendship</a></p>
		</div>
		<div id="facebook_profile_btn_brand" style="display:none" class="profile-tip-bio">
			 <span
				 class="uibutton" id="fb-url-friend-brand" text="add_friend">Add Friend</span>
			<a href=""
				 class="uibutton" target="_blank"  id="fb-url-following-brand" text="following">Following</a> 
			<a href=""
				target="_blank" class="uibutton" id="fb-url-send-brand" text="send_message">Send Message</a>
		</div>
		<div id="facebook_page_btn_brand" style="display:none" class="profile-tip-bio">
			 <a href=""  class="uibutton" target="_blank" id="page-url-like-brand" text="like">Like</a>
			<a href=""  class="uibutton" target="_blank" id="page-url-following-brand" text="following">Following</a> 
			<a href="" class="uibutton" target="_blank" id="page-url-send-brand" text="send_message">Send Message</a>
		</div>
	</li>
</ul>

<div class="information" id="tooltip-twitter">
	<p class="tooltip-icon"><i class="icon-caret-up"></i></p>
	<p id="loading"></p>
	<div id="information-content">
		
		<p id="tw-name"></p>
		<p id="tw-place"></p>
		<p id="tw-category"></p>
		<ul id="tw-follow">
			<li id="tw-follower"></li>
			<li id="tw-following"></li>
		</ul>
	</div>
</div>
  <div id="select_tw" style="display:none" class="" title="Select Channel Comment">
                <ul id="list_twitter">
                </ul>
          </div>	
          <div id="select_fb" style="display:none" class="" title="Select Channel Comment">
            <ul class="" id="list_facebook">
            </ul>
          </div>	
</div>


