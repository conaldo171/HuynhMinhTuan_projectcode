/*** Gray theme for Highcharts JS ***/
var _margin_top = 0;
function chartResize()
{
	_dw = $(window).innerWidth();
	_dh = $(window).innerHeight();
	var top = 0;
	_bw = $("#analysis_facebook .block-demographic").innerWidth();
	if(_dw < 768)
	{
		console.log("small size " + _dw);
		_h = 400;		
		if(_dw < 440)
		{
			_h = _dw;
			_dh = _h+70;
		}
		_dh= _h + 100;
	}else
	{
		console.log("large size " + _dw);
		_h = _bw/4 + 15;
		_margin_top = -70;
		_dh = _h+75;
		$("#age-chart p").css("margin-top",-25);
	}	
	$("#analysis_facebook .block-demographic .chartBox .chart").css("height",_h);
	$("#age").css("height",_dh );
	
}
//chartResize();

$(window).resize(function(e) {
    //chartResize();	
	//bubbleChart();
});

Highcharts.theme = {
	colors: ["#c1d177", "#0e3d59", "#9d7cbb", "#d92525", "#d7ad63", "#ff0066", "#eeaaee", 
		"#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
	chart: {
		borderWidth: 0,
		borderRadius: 10,
		plotBackgroundColor: null,
		plotBorderWidth: 0
	},
	title: {
		style: { 
			color: '#000',
			font: '16px Arial, Helvetica, sans-serif'
		}
	},
	subtitle: {
		style: { 
			color: '#000',
			font: '12px Arial, Helvetica, sans-serif'
		}
	},
	xAxis: {
		gridLineWidth: 0,
		lineColor: '#a1adb3',
		labels: {
			style: {
				color: '#4c453d',
				fontWeight: 'normal'
			}
		},
		title: {
			style: {
				color: '#000',
				font: 'bold 12px Arial, Helvetica, sans-serif'
			}				
		}
	},
	yAxis: {
		alternateGridColor: null,
		minorTickInterval: null,
		gridLineColor: '#a1adb3',
		lineWidth: 0,
		tickWidth: 0,
		labels: {
			style: {
				color: '#4c453d',
				fontWeight: 'normal'
			}
		},
		title: {
			style: {
				color: '#000',
				font: 'bold 12px Arial, Helvetica, sans-serif'
			}				
		}
	},
	legend: {
		backgroundColor: '#4D5357',

		itemStyle: {
			color: '#8a9499'
		},
		itemHoverStyle: {
			color: '#F1F3EB'
		},
		itemHiddenStyle: {
			color: '#42474a'
		}
	},
	labels: {
		style: {
			color: '#CCC'
		}
	},
	tooltip: {
		backgroundColor: '#F1F3EB',
		borderWidth: 0,
		style: {
			color: '#4D5357'
		}
	},
	
	
	plotOptions: {
		line: {
			dataLabels: {
				color: '#CCC'
			},
			marker: {
				lineColor: '#333'
			}
		},
		spline: {
			marker: {
				lineColor: '#333'
			}
		},
		scatter: {
			marker: {
				lineColor: '#333'
			}
		},
		candlestick: {
			lineColor: 'white'
		}
	},
	
	toolbar: {
		itemStyle: {
			color: '#CCC'
		}
	},
	
	navigation: {
		buttonOptions: {
			backgroundColor: {
				linearGradient: [0, 0, 0, 20],
				stops: [
					[0.4, '#606060'],
					[0.6, '#333333']
				]
			},
			borderColor: '#000000',
			symbolStroke: '#C0C0C0',
			hoverSymbolStroke: '#FFFFFF'
		}
	},
	
	exporting: {
		buttons: {
			exportButton: {
				symbolFill: '#55BE3B'
			},
			printButton: {
				symbolFill: '#7797BE'
			}
		}
	},
	
	// scroll charts
	rangeSelector: {
		buttonTheme: {
			fill: {
				linearGradient: [0, 0, 0, 20],
				stops: [
					[0.4, '#888'],
					[0.6, '#555']
				]
			},
			stroke: '#000000',
			style: {
				color: '#CCC',
				fontWeight: 'bold'
			},
			states: {
				hover: {
					fill: {
						linearGradient: [0, 0, 0, 20],
						stops: [
							[0.4, '#BBB'],
							[0.6, '#888']
						]
					},
					stroke: '#000000',
					style: {
						color: 'white'
					}
				},
				select: {
					fill: {
						linearGradient: [0, 0, 0, 20],
						stops: [
							[0.1, '#000'],
							[0.3, '#333']
						]
					},
					stroke: '#000000',
					style: {
						color: 'yellow'
					}
				}
			}					
		},
		inputStyle: {
			backgroundColor: '#333',
			color: 'silver'
		},
		labelStyle: {
			color: 'silver'
		}
	},
	
	navigator: {
		handles: {
			backgroundColor: '#666',
			borderColor: '#AAA'
		},
		outlineColor: '#CCC',
		maskFill: 'rgba(16, 16, 16, 0.5)',
		series: {
			color: '#7798BF',
			lineColor: '#A6C7ED'
		}
	},
	
	scrollbar: {
		barBackgroundColor: {
				linearGradient: [0, 0, 0, 20],
				stops: [
					[0.4, '#888'],
					[0.6, '#555']
				]
			},
		barBorderColor: '#CCC',
		buttonArrowColor: '#CCC',
		buttonBackgroundColor: {
				linearGradient: [0, 0, 0, 20],
				stops: [
					[0.4, '#888'],
					[0.6, '#555']
				]
			},
		buttonBorderColor: '#CCC',
		rifleColor: '#FFF',
		trackBackgroundColor: {
			linearGradient: [0, 0, 0, 10],
			stops: [
				[0, '#000'],
				[1, '#333']
			]
		},
		trackBorderColor: '#666'
	},
	
	// special colors for some of the demo examples
	legendBackgroundColor: 'rgba(48, 48, 48, 0.8)',
	legendBackgroundColorSolid: 'rgb(70, 70, 70)',
	dataLabelsColor: '#444',
	textColor: '#E0E0E0',
	maskColor: 'rgba(255,255,255,0.3)'
};

// Apply the theme
var highchartsOptions = Highcharts.setOptions(Highcharts.theme);

//----------------------------------------------------------

var token_tw="";
var grid_width = $(".block-compare").innerWidth();
var array_content = new Array();
var count_twitter = 0;

var total_fans1 = 0;
var total_fans2 = 0;
var date = new Date();
var array_twitter = new Array();
var array_twitter_chart = new Array();
var count_info_twitter = 0;
var array_info_twitter = new Array();
var array_tw_name = new Array();
var array_data_tw= new Array();

$("#jQgrid_compare").jqGrid({
	url: "GetCompetitors.do?type=3",
	datatype: "json",
    mtype: "POST",  
	height: 200,
	colNames:['id','Register Date','Twitter Name','page_name1','page_name2','Compare','Delete','page_id1','page_id2','avatar_tw1','avatar_tw2'],
	width: grid_width,
	colModel: [
	{
		name: 'competitors_id',
		index: 'competitors_id',
		resizable:false,
		fixed:true,
		width: 1,
		hidden:true,
		key:true
	},
	{
		name: 'create_date',
		index: 'create_date',
		resizable:false,
		fixed:true,
		width: 200
	},{
		name: 'page_name',
		index: 'page_name',
		sortable: false,
		width: 500,
		editable: false
	},
	{
		name: 'page_name1',
		index: 'page_name1',
		sortable: false,
		width: 1,
		editable: false,
		hidden:true
	},
	{
		name: 'page_name2',
		index: 'page_name2',
		sortable: false,
		width: 1,
		editable: false,
		hidden:true
	},
	{
		name: 'compare',
		index: 'compare',
		sortable: false,
		width: 150
	},
	
	{
		name: 'delete',
		index: 'delete',
		sortable: false,
		editable: false,
		width: 100
	},
	{
		name: 'page_id1',
		index: 'page_id1',
		sortable: false,
		editable: false,
		width: 1,
		hidden:true
	},
	{
		name: 'page_id2',
		index: 'page_id2',
		sortable: false,
		editable: false,
		width: 1,
		hidden:true
	},
	{
		name: 'avatar_tw1',
		index: 'avatar_tw1',
		sortable: false,
		editable: false,
		width: 1,
		hidden:true
	},
	{
		name: 'avatar_tw2',
		index: 'avatar_tw2',
		sortable: false,
		editable: false,
		width: 1,
		hidden:true
	}
	],
	sortname: 'page_name',
	viewrecords: true,
	sortorder: "desc",
	//pager: '#padtable',
	gridComplete: function() {
		var ids = $("#jQgrid_compare").jqGrid('getDataIDs');
		for ( var i = 0; i <= ids.length; i++) {
			if(i%2==0){
				
			}
			else
				{
				$("#"+ids[i])
                .css({
                    "background": "none repeat scroll 0 0 #F3F4F8"
                    
                });
				}
		}
		 // using common.js
	},
     onSelectRow: function(id) {
    	 var singleRow = $("#jQgrid_compare").jqGrid('getGridParam', 'selrow');
			var prow = $("#jQgrid_compare").jqGrid('getRowData', singleRow);
			var tw_name1=prow.page_name1;
			var tw_name2=prow.page_name2;
			var tw_id1=prow.page_id1;
			var tw_id2=prow.page_id2;
			var avatar_tw1=prow.avatar_tw1;
			var avatar_tw2=prow.avatar_tw2;
			showTwitterCompetitor(tw_name1,tw_name2,tw_id1,tw_id2,avatar_tw1,avatar_tw2);
		}
		});

$('#competitors_range').daterangepicker({opens: 'left',
    format: 'MM/dd/yyyy',
    separator: ' to ',
    startDate: Date.today().add({
        days: -7
    }),
    endDate: Date.today(),
    minDate: Date.today().add({
        days: -60
    }),
    maxDate: '',
    locale: {
        applyLabel: 'Submit',
        fromLabel: 'From',
        toLabel: 'To',
        customRangeLabel: 'Custom Range',
        daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        firstDay: 1
 }
});

$(".range_inputs .btn").click(function(){
	setTimeout(function(){
		var twitter1 = $("#twitter1").attr("channel_detail_id");
		var twitter2 = $("#twitter2").attr("channel_detail_id");
		if (!isNull(twitter1)&&!isNull(twitter2)){
			compareTwitter1(twitter1);
			compareTwitter2(twitter2);
		}else
		{
			 aoFrm.mess("alert",mess.message_page_empty);
		}
	},100);
});
var array_data_tw_follower_following = new Array();
var date = new Date();
var currentDate = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
var lastDate = new Date();
var days = 7;
var res = date.setTime(date.getTime() - (days * 24 * 60 * 60 * 1000));		
var lastDate = new Date(res);
var newDate = (lastDate.getMonth() + 1) + "/" + lastDate.getDate() + "/" + lastDate.getFullYear();
$("#competitors_range").val(newDate +" to " + currentDate);
$(document).ready(function() {
	checkExprired();
	aoFrm.mess("close","close");
	clearData();
	getChannelDetail();
	//btn_save_modify
	aoFrm.mess("close","close");
	$("#btn_Save").click(function(){
		var twitter1 = $("#twitter1").attr("channel_detail_id");
		var twitter2 = $("#twitter2").attr("channel_detail_id");
		var tw_name1= $("#txt_twitter1").val();
		var tw_name2= $("#txt_twitter2").val();
		if (!isNull(twitter1)&&!isNull(twitter2)&&!isNull(tw_name1)&&!isNull(tw_name2)){
			$("#competitors_twitter .block_save_competitors").hide();
			$("#competitors_twitter .block_show_competitors").show();
			saveCompetitors();
			compareTwitter1(twitter1);
			compareTwitter2(twitter2);
		}
		else
		{
		  aoFrm.mess("alert",mess.message_page_empty);
		}
	});
	$("#btn_back").click(function(){
		$("#competitors_twitter .block_save_competitors").show();
		$("#competitors_twitter .block_show_competitors").hide();
	});
	
	$("#btn_compare").click(function(){
		var twitter1 = $("#twitter1").attr("channel_detail_id");
		var twitter2 = $("#twitter2").attr("channel_detail_id");
		if (!isNull(twitter1)&&!isNull(twitter2)){
			$("#competitors_twitter .block_save_competitors").hide();
			$("#competitors_twitter .block_show_competitors").show();
			compareTwitter1(twitter1);
			compareTwitter2(twitter2);
		}else
		{
			 aoFrm.mess("alert",mess.message_page_empty);
		}
		
	});
	$( "#txt_twitter1").keypress(function(event) {
		var text=$( "#txt_twitter1" ).val();
		//alert(text.length)
		if(text.length>2){
			 searchTwitter1(text);
		}
		});
	$( "#txt_twitter2").keypress(function(event) {
		var text=$( "#txt_twitter2" ).val();
		
		if(text.length>2){
			 searchTwitter2(text);
		}
		});
});
function saveCompetitors(){
	var txt_twitter1=$("#txt_twitter1").val();
	var txt_twitter2=$("#txt_twitter2").val();
	var channel_detail_id1=$("#txt_twitter1").attr("channel_detail_id");
	var channel_detail_id2=$("#txt_twitter2").attr("channel_detail_id");
	var avatar_tw1=$("#twitter1 img").attr("src");
	var avatar_tw2=$("#twitter2 img").attr("src");
	//var type = $('input:radio[name=keyword]:checked').val();
	var dataString =[];
	 dataString.push({
	  name: "page_name1", 
	  value: txt_twitter1
	});
	 dataString.push({
		  name: "page_name2", 
		  value: txt_twitter2
		});
	 dataString.push({
		  name: "channel_detail_id1", 
		  value: channel_detail_id1
		});
		 dataString.push({
			  name: "channel_detail_id2", 
			  value: channel_detail_id2
			});
		 dataString.push({
			  name: "avatar_tw1", 
			  value: avatar_tw1
			});
			 dataString.push({
				  name: "avatar_tw2", 
				  value: avatar_tw2
				});
	dataString.push({
	  name: "type", 
	  value: 3
	});
	dataString.push({
	  name: "Action", 
	  value: "save"
	});    

	$.ajax({
	 type:'POST',
	  url : 'Competitors.do',
	  dataType: 'text',
	  data: dataString,
	  success : function(source) {
		  if(source.trim()!="0"){
			  aoFrm.mess("mess",mess.message_save_competitors);  
			  addNewRowInGrid(source,txt_twitter1,txt_twitter2,channel_detail_id1,channel_detail_id2,avatar_tw1,avatar_tw2);
		  }
		  }
  });	
}

function getChannelDetail(){
	var dataString=[];
	 dataString.push({
       name: "channel_id", 
       value: 3
   });	
	 $.ajax({
		  url : 'GetChannelDetail.do',
		  dataType: 'json',
		  data: dataString,
		  success : function(source) {
			  for(var i=0; i<source.length;i++){
				  token_tw=source[i].token_user;
			  }
			  if (isNull(token_tw)){
				  $(".competitors_twitter_page #aoFrm-content").append('<div class="nodata span4"><h4 text="nochannel">'+mess.message_nodata+'</h4><p text="channelcompare">'+mess.channelcompare+'</p></div>');
				  $("#competitors_twitter").css("opacity","0.3");
			  }else{
				  $(".competitors_twitter_page #aoFrm-content .nodata").empty();
				  $("#competitors_twitter").css("opacity","1");
			  }
		  }
	 });
}

function searchTwitter1(txt_twitter1){
	$("#search_twitter1").append("<div class='loading-small'></div>");
	var token = token_tw.split("_");
	
				var dataString=[];
				dataString.push({
				       name: "keyword", 
				       value: encodeURI(txt_twitter1)
				   });	
				dataString.push({
				       name: "token", 
				       value: token[0]
				   });	
				dataString.push({
				       name: "token_secret", 
				       value: token[1]
				   });	
		    	$("#txt_twitter1").autocomplete({
				       appendTo: "#search_twitter1",
				       position: { my: "right top", at: "right bottom", of: "#search_twitter1" },
				       minLength: 1,
				       source:function( request, response ){
				    	   $.ajax({
				    		   //type:"POST",
				    		   url: "UserSearchTwitter.do",
				    		   dataType: "json",
				    		   data:dataString,
				    		   success: function( source ) {
				    		   response( $.map( source, function( item ) {
				    			  
				    		   return {
				    		   s_label: item.user_name +' @'+item.name,
				    		   label: item.user_name,
				    		   value: item.id,
				    		   icon:item.avatar
				    		   }
				    		   }));
				    		   }
				    		   });
				       },
				       focus: function (event, ui) {
				    	   $("#txt_twitter1").val(ui.item.label);
				    	   //$("#txt_twitter1").val(ui.item.user_name);
				           return false;
				       },
				       select: function (event, ui) {
				    	   $("#txt_twitter1").attr("channel_detail_id",ui.item.value);
				    	   $("#name_compare_tw1").attr("title",ui.item.label);
				    	   $("#name_compare_tw1").text(limitString(ui.item.label));
				    	   $(".leftName .blockPage li.name").attr("title",ui.item.label);
				    	   $(".leftName .blockPage li.name").text(limitString(ui.item.label));
				    	   $(".leftName .blockPage li img").attr('src',ui.item.icon);
				    	   $("#twitter1").attr("channel_detail_id",ui.item.value);
				    	  // var obj_tw_name = new Object();
				    	   //obj_tw_name.twitter_name1 = ui.item.label;
				    	  // array_tw_name.push(obj_tw_name);
				           return false;
				       }
				   })
				   .data("ui-autocomplete")._renderItem = function (ul, item) {
		    			$("#search_twitter1 .loading-small").hide();
				       return $('<li style="width:82%"></li>')
				       .append("<a><span style=';margin-left: 10px;'>" + item.s_label + "</span></a>")
				       .appendTo(ul);
				   };
		    	
		   // });
	 
}
function searchTwitter2(txt_twitter2){
	array_source=[];
	var obj_content2 = new Object();
	$("#search_twitter2").append("<div class='loading-small'></div>");
	var token = token_tw.split("_");
				var dataString=[];
				dataString.push({
				       name: "keyword", 
				       value: encodeURI(txt_twitter2)
				   });	
				dataString.push({
				       name: "token", 
				       value: token[0]
				   });	
				dataString.push({
				       name: "token_secret", 
				       value: token[1]
				   });	
		    	$("#txt_twitter2").autocomplete({
				       appendTo: "#search_twitter2",
				       position: { my: "right top", at: "right bottom", of: "#search_twitter2" },
				       minLength: 1,
				       source:function( request, response ){
				    	   $.ajax({
				    		   url: "UserSearchTwitter.do",
				    		   dataType: "json",
				    		   data:dataString,
				    		   success: function( source ) {
				    		   response( $.map( source, function( item ) {
				    		   return {
				    		   s_label: item.user_name+' @'+item.name,
				    		   label: item.user_name,
				    		   value: item.id,
				    		   icon:item.avatar
				    		   }
				    		   }));
				    		   }
				    		   });
				       },
				       focus: function (event, ui) {
				          // $("#txt_twitter2").val(ui.item.label);
				    	   $("#txt_twitter2").val(ui.item.label);
				           return false;
				       },
				       select: function (event, ui) {
				    	   $("#txt_twitter2").attr("channel_detail_id",ui.item.value);
				    	   $("#name_compare_tw2").attr("title",ui.item.label);
				    	   $("#name_compare_tw2").text(limitString(ui.item.label));
				    	   $(".rightName .blockPage li.name").text(limitString(ui.item.label));
				    	   $(".rightName .blockPage li.name").attr("title",ui.item.label);
				    	   $(".rightName .blockPage li img").attr('src',ui.item.icon);
				    	   $("#twitter2").attr("channel_detail_id",ui.item.value);
				    	 
				           return false;
				       }
				   })
				   .data("ui-autocomplete")._renderItem = function (ul, item) {
		    			$("#search_twitter2 .loading-small").hide();
				       return $('<li style="width:82%"></li>')
				       .append("<a><span style=';margin-left: 10px;'>" + item.s_label + "</span></a>")
				       .appendTo(ul);
				   };
		    	
		   
}
function compareTwitter1(twitter_id1){
	clearData();
	$(".competitors_twitter_page #aoFrm-content").append("<div class='itemLoading'></div>");
	$("#competitors_twitter").css("opacity","0.3");
	var stringDate = $("#competitors_range").val();
	var newString = stringDate.split("to");
	var stringFrom = newString[0];
	var stringTo = newString[1];

	//date for facebook: plus 1 day
	var newStringFrom = new Date(stringFrom);
	var newStringTo = new Date(stringTo);
	var dateFrom = new Date(newStringFrom);
	var dateTo = new Date(newStringTo);
	var newDateFrom = toTimestamp(dateFrom);
	var prevDate = newDateFrom - (24 * 60 * 60);
	var newDateTo = toTimestamp(dateTo) + (24 * 60 * 60);
	
	while (prevDate < newDateTo - (24 * 60 * 60)) {
			prevDate = prevDate + (24 * 60 * 60);
			var dateFrom = new Date(prevDate * 1000);
			array_twitter_chart.push({"day": (dateFrom.getMonth() + 1) + "/" + dateFrom.getDate() + "/" + dateFrom.getFullYear(),"engagement_tw1": 0,"engagement_tw2": 0,"brand_loyalty_tw1":0,"brand_loyalty_tw2":0,"activity_tw1":0,"activity_tw2":0,"spread_tw1":0,"spread_tw2":0,"tweet_tw1":0,"tweet_tw2":0,"retweet_tw1":0,"retweet_tw2":0,"mention_tw1":0,"mention_tw2":0,"comment_tw1":0,"comment_tw2":0,"favorite_tw1":0,"favorite_tw2":0});
			array_data_tw_follower_following.push({"day": (dateFrom.getMonth() + 1) + "/" + dateFrom.getDate() + "/" + dateFrom.getFullYear(),"follower1": 0,"follower2": 0,"following1":0,"following2":0});
	     
		}
	var token = token_tw.split("_");
	getUserTimeline(token[0],token[1],newDateFrom,newDateTo,twitter_id1);
	getInfoTwitter(token[0],token[1],twitter_id1);
	 getTWCompetitors(twitter_id1, newDateFrom, newDateTo);
}

function compareTwitter2(twitter_id2){
	var stringDate = $("#competitors_range").val();
	var newString = stringDate.split("to");
	var stringFrom = newString[0];
	var stringTo = newString[1];

	//date for facebook: plus 1 day
	var newStringFrom = new Date(stringFrom);
	var newStringTo = new Date(stringTo);
	var dateFrom = new Date(newStringFrom);
	var dateTo = new Date(newStringTo);
	var newDateFrom = toTimestamp(dateFrom);
	var newDateTo = toTimestamp(dateTo) + (24 * 60 * 60);
	
	
	var token = token_tw.split("_");
	getUserTimeline(token[0],token[1],newDateFrom,newDateTo,twitter_id2);
	getInfoTwitter(token[0],token[1],twitter_id2);
	 getTWCompetitors(twitter_id2, newDateFrom, newDateTo);
}



function getInfoTwitter(token,token_secret,id){
	cb.setToken(token,token_secret);
		cb.__call(
		    "users_show",{"user_id":id},
		    function (reply) {
		    	showInfoTwitter(reply);
		    	//getDataTwitter(token,token_secret,reply,stringFrom,stringTo);
		    }
		);
}

function showInfoTwitter(reply){
	//alert(JSON.stringify(reply))
	count_info_twitter++;
	var twitter1 = $("#twitter1").attr("channel_detail_id");
	var twitter2 = $("#twitter2").attr("channel_detail_id");
	
	var follower_tw1 =0;
	var follower_tw2 = 0;
	var following_tw1 = 0;
	var following_tw2 = 0;
	var percent_follower_tw1;
	var percent_following_tw1;
	var percent_follower_tw2;
	var percent_following_tw2;
 	
 	var object_infor= new Object();
 	object_infor.id = reply.id;
 	object_infor.follower = reply.followers_count;
 	object_infor.following = reply.friends_count;
 	array_info_twitter.push(object_infor);
	if (count_info_twitter==2){
		for (var i=0;i<array_info_twitter.length;i++){
			if (array_info_twitter[i].id==twitter1){
				follower_tw1 = array_info_twitter[i].follower;
				following_tw1 = array_info_twitter[i].following;
				$("#number_follower").text(numberWithCommas(follower_tw1));
				$("#number_following").text(numberWithCommas(following_tw1));
			}else{
				follower_tw2 = array_info_twitter[i].follower;
				following_tw2 = array_info_twitter[i].following;
				$("#number_follower_right").text(numberWithCommas(follower_tw2));
				$("#number_following_right").text(numberWithCommas(following_tw2));
			}
		}
		if ((follower_tw1+follower_tw2)>0){
			percent_follower_tw1 = roundNumber((follower_tw1/(follower_tw1+follower_tw2))*100,2);
			percent_following_tw1 = roundNumber((following_tw1/(following_tw1+following_tw2))*100,2);
		}else{
			percent_follower_tw1 = 0;
			percent_following_tw1 = 0;
		}
		if ((follower_tw1+follower_tw2)>0){
			percent_follower_tw2 = roundNumber((follower_tw2/(follower_tw1+follower_tw2))*100,2);
			percent_following_tw2 = roundNumber((following_tw2/(following_tw1+following_tw2))*100,2);
		}else{
			percent_follower_tw2 = 0;
			percent_following_tw2 = 0;
		}
		
		$("#percent_follower").html(percent_follower_tw1 + "%");
		$("#percent_following").html(percent_following_tw1 + "%");
		$("#percent_follower_right").html(percent_follower_tw2 + "%");
		$("#percent_following_right").html(percent_following_tw2 + "%");
		$("#width_follower_left").css("width",percent_follower_tw1 + "%");
		$("#width_follower_right").css("width",percent_follower_tw2 + "%");
		$("#width_following_left").css("width",percent_following_tw1 + "%");
		$("#width_following_right").css("width",percent_following_tw2 + "%");
	}
}

function getUserTimeline(token,token_secret,stringFrom,stringTo,id){
	cb.setToken(token,token_secret);
		cb.__call(
		    "statuses_userTimeline",{"user_id":id},
		    function (reply) {
		    	getDataTwitter(token,token_secret,reply,stringFrom,stringTo);
		    }
		);
}


function getDataTwitter(token,token_secret,reply,newDateFrom,newDateTo){
	 count_twitter++;
	var channel_id;
	var retweet_tweet = 0;
	var id_tweet;
	var favorite_tweet = 0;
	var user_mention = 0;
	var tweet = 0;
	
	var count=0;
	var total = 0;
	var mention_tweet = 0;
	var reply_status;
	var create_date;
	var reply_tweet = 0;
	
	var paging=1;
	for (var i=0;i<reply.length;i++){
		var obj_twitter= new Object();
		var date = reply[i].created_at;
		date = date.replace("ICT","+0000");
		create_date = toTimestamp(date);
		if ( newDateFrom <= create_date && create_date <= newDateTo){
	  		reply_status = reply[i].in_reply_to_status_id;
			if (isNull(reply_status)){
				tweet = 1;
	    	}
			else{
				reply_tweet = 1;
			}
	  		if (!isNull(reply[i].user_mentions)){
	  		  	user_mention = reply[i].user_mentions.length;
	    	}
	  			obj_twitter.id = reply[i].user.id;
	  		  obj_twitter.mention = user_mention;
	  		  obj_twitter.favorite = reply[i].favorite_count;
	  		  obj_twitter.retweet = reply[i].retweet_count;
	  		  obj_twitter.tweet = tweet;
	  		  obj_twitter.reply = reply_tweet;
	  		  obj_twitter.create_date = create_date;
	  		  array_twitter.push(obj_twitter);
		}
	  		
	}
	
	if (count_twitter==2){
		//alert(JSON.stringify(array_twitter))
		var twitter1 = $("#twitter1").attr("channel_detail_id");
		var twitter2 = $("#twitter2").attr("channel_detail_id");
		var total_engagement_tw1 = 0;
		var total_engagement_tw2 = 0;
		var percent_engagement_tw1 = 0;
		var percent_engagement_tw2 = 0;
		
		var total_activity_tw1 = 0;
		var total_activity_tw2 = 0;
		var percent_activity_tw1 = 0;
		var percent_activity_tw2 = 0;
		
		var total_reply_tw1 = 0;
		var total_reply_tw2 = 0;
		var total_tweet_tw1 = 0;
		var total_tweet_tw2 = 0;
		
		var total_spread_tw1 = 0;
		var total_spread_tw2 = 0;
		var percent_spread_tw1 = 0;
		var percent_spread_tw2 = 0;
		
		var total_brand_loyalty_tw1 = 0;
		var total_brand_loyalty_tw2 = 0;
		var percent_brand_loyalty_tw1 = 0;
		var percent_brand_loyalty_tw2 = 0;
		var brand_loyalty_tw1 = 0;
		var brand_loyalty_tw2 = 0;
		for (var j=0;j<array_twitter.length;j++){
			if (array_twitter[j].id==twitter1){
				if (array_twitter[j].tweet==1){
					total_tweet_tw1++;
				}
				if (array_twitter[j].reply==1){
					total_reply_tw1++;
				}
				total_activity_tw1 = parseInt(total_activity_tw1) + parseInt(array_twitter[j].mention) + parseInt(array_twitter[j].retweet) +parseInt(array_twitter[j].reply) +parseInt(array_twitter[j].favorite);
				total_brand_loyalty_tw1 = parseInt(total_brand_loyalty_tw1) + parseInt(array_twitter[j].mention) + parseInt(array_twitter[j].retweet) +parseInt(array_twitter[j].reply);
				var date_post = new Date(array_twitter[j].create_date * 1000);
	  			date_post = (date_post.getMonth() + 1) +"/"+ date_post.getDate()+ "/" +date_post.getFullYear();
	  			for (var k=0; k<array_twitter_chart.length;k++){
	    			if (array_twitter_chart[k].day == date_post){
	    				var engagement_tw1 =  parseInt(array_twitter[j].mention) + parseInt(array_twitter[j].retweet) +parseInt(array_twitter[j].reply) +parseInt(array_twitter[j].favorite);
	    				var activity_tw1 = parseInt(array_twitter[j].mention) + parseInt(array_twitter[j].retweet) +parseInt(array_twitter[j].reply) +parseInt(array_twitter[j].favorite);
	    				
	    				var brand_loyalty_tw1 = parseInt(array_twitter[j].mention) + parseInt(array_twitter[j].retweet) +parseInt(array_twitter[j].reply);
	    				var spread_tw1 = parseInt(array_twitter[j].mention) + parseInt(array_twitter[j].retweet) +parseInt(array_twitter[j].reply);
	    				var retweet_tw1 = parseInt(array_twitter[j].retweet);
	    				var mention_tw1 = parseInt(array_twitter[j].mention);
	    				var comment_tw1 = parseInt(array_twitter[j].reply);
	    				var favorite_tw1 = parseInt(array_twitter[j].favorite);
	    				var tweet_tw1 = parseInt(array_twitter[j].tweet);
	    				array_twitter_chart[k].engagement_tw1 = parseInt(array_twitter_chart[k].engagement_tw1) +  parseInt(engagement_tw1);
	    				array_twitter_chart[k].activity_tw1 = parseInt(array_twitter_chart[k].activity_tw1) + parseInt(activity_tw1);
	    				array_twitter_chart[k].tweet_tw1 = parseInt(array_twitter_chart[k].tweet_tw1) + parseInt(tweet_tw1);
	    				array_twitter_chart[k].brand_loyalty_tw1 = parseInt(array_twitter_chart[k].brand_loyalty_tw1) +  parseInt(brand_loyalty_tw1);
	    				array_twitter_chart[k].spread_tw1 = parseInt(array_twitter_chart[k].spread_tw1) +  parseInt(spread_tw1);
	    				array_twitter_chart[k].retweet_tw1 = parseInt(array_twitter_chart[k].retweet_tw1) + parseInt(retweet_tw1);
	    				array_twitter_chart[k].mention_tw1 = parseInt(array_twitter_chart[k].mention_tw1) +  parseInt(mention_tw1);
	    				array_twitter_chart[k].comment_tw1 = parseInt(array_twitter_chart[k].comment_tw1) +  parseInt(comment_tw1);
	    				array_twitter_chart[k].favorite_tw1 = parseInt(array_twitter_chart[k].favorite_tw1) +  parseInt(favorite_tw1);
	    			break;
	    				
	    			}
	    		}
			}else{
				if (array_twitter[j].tweet==1){
					total_tweet_tw2++;
				}
				if (array_twitter[j].reply==1){
					total_reply_tw2++;
				}
				
				total_activity_tw2 = parseInt(total_activity_tw2) + parseInt(array_twitter[j].mention) + parseInt(array_twitter[j].retweet) +parseInt(array_twitter[j].reply) +parseInt(array_twitter[j].favorite);
				total_brand_loyalty_tw2 = parseInt(total_brand_loyalty_tw2) + parseInt(array_twitter[j].mention) + parseInt(array_twitter[j].retweet) +parseInt(array_twitter[j].reply);
				var date_post = new Date(array_twitter[j].create_date * 1000);
	  			date_post = (date_post.getMonth() + 1) +"/"+ date_post.getDate()+ "/" +date_post.getFullYear();
	  			for (var k=0; k<array_twitter_chart.length;k++){
	    			if (array_twitter_chart[k].day == date_post){
	    				var engagement_tw2 =  parseInt(array_twitter[j].mention) + parseInt(array_twitter[j].retweet) +parseInt(array_twitter[j].reply) +parseInt(array_twitter[j].favorite);
	    				var activity_tw2 = parseInt(array_twitter[j].mention) + parseInt(array_twitter[j].retweet) +parseInt(array_twitter[j].reply) +parseInt(array_twitter[j].favorite);
	    				
	    				var brand_loyalty_tw2 = parseInt(array_twitter[j].mention) + parseInt(array_twitter[j].retweet) +parseInt(array_twitter[j].reply);
	    				var spread_tw2 = parseInt(array_twitter[j].mention) + parseInt(array_twitter[j].retweet) +parseInt(array_twitter[j].reply);
	    				var retweet_tw2 = parseInt(array_twitter[j].retweet);
	    				var mention_tw2 = parseInt(array_twitter[j].mention);
	    				var comment_tw2 = parseInt(array_twitter[j].reply);
	    				var favorite_tw2 = parseInt(array_twitter[j].favorite);
	    				var tweet_tw2 = parseInt(array_twitter[j].tweet);
	    				array_twitter_chart[k].engagement_tw2 = parseInt(array_twitter_chart[k].engagement_tw2) +  parseInt(engagement_tw2);
	    				array_twitter_chart[k].activity_tw2 = parseInt(array_twitter_chart[k].activity_tw2) + parseInt(activity_tw2);
	    				array_twitter_chart[k].tweet_tw2 = parseInt(array_twitter_chart[k].tweet_tw2) + parseInt(tweet_tw2);
	    				array_twitter_chart[k].brand_loyalty_tw2 = parseInt(array_twitter_chart[k].brand_loyalty_tw2) +  parseInt(brand_loyalty_tw2);
	    				array_twitter_chart[k].spread_tw2 = parseInt(array_twitter_chart[k].spread_tw2) +  parseInt(spread_tw2);
	    				array_twitter_chart[k].retweet_tw2 = parseInt(array_twitter_chart[k].retweet_tw2) + parseInt(retweet_tw2);
	    				array_twitter_chart[k].mention_tw2 = parseInt(array_twitter_chart[k].mention_tw2) +  parseInt(mention_tw2);
	    				array_twitter_chart[k].comment_tw2 = parseInt(array_twitter_chart[k].comment_tw2) +  parseInt(comment_tw2);
	    				array_twitter_chart[k].favorite_tw2 = parseInt(array_twitter_chart[k].favorite_tw2) +  parseInt(favorite_tw2);
	    			break;
	    				
	    			}
	    		}
			}
		}
		if (total_tweet_tw1>0){
			brand_loyalty_tw1 = (total_brand_loyalty_tw1/total_tweet_tw1)*100;
		}else{
			brand_loyalty_tw1 = 0;
		}
		
		if (total_tweet_tw2>0){
			brand_loyalty_tw2 = (total_brand_loyalty_tw2/total_tweet_tw2)*100;
		}else{
			brand_loyalty_tw2 = 0;
		}
		if ((total_activity_tw1 + total_activity_tw2)>0){
			percent_activity_tw1 = roundNumber((total_activity_tw1/(total_activity_tw1 + total_activity_tw2))*100,2);
			percent_activity_tw2 = roundNumber((100-percent_activity_tw1),2);
		}else{
			percent_activity_tw1 = 0;
			percent_activity_tw2 = 0;
		}
		if ((brand_loyalty_tw1 + brand_loyalty_tw2)>0){
			percent_brand_loyalty_tw1 = roundNumber((brand_loyalty_tw1/(brand_loyalty_tw1 + brand_loyalty_tw2))*100,2);
			percent_brand_loyalty_tw2 = roundNumber((100-percent_brand_loyalty_tw1),2);
		}else{
			percent_brand_loyalty_tw1 = 0;
			percent_brand_loyalty_tw2 = 0;
		}
		
		if ((total_brand_loyalty_tw1 + total_brand_loyalty_tw2)>0){
			percent_spread_tw1 = roundNumber((total_brand_loyalty_tw1/(total_brand_loyalty_tw1 + total_brand_loyalty_tw2))*100,2);
			percent_spread_tw2 = roundNumber((100-percent_spread_tw1),2);
		}else{
			percent_spread_tw1 = 0;
			percent_spread_tw2 = 0;
		}
		//alert(JSON.stringify(array_twitter_chart))
		$("#number_reach").text(numberWithCommas(roundNumber(brand_loyalty_tw1,2)));
		$("#number_reach_right").text(numberWithCommas(roundNumber(brand_loyalty_tw2,2)));
		$("#number_engagement").text(numberWithCommas(total_activity_tw1));
		$("#number_engagement_right").text(numberWithCommas(total_activity_tw2));
		$("#number_activity").text(numberWithCommas(total_activity_tw1));
		$("#number_activity_right").text(numberWithCommas(total_activity_tw2));
		$("#number_brand_loyalty").text(numberWithCommas(roundNumber(brand_loyalty_tw1,2)));
		$("#number_brand_loyalty_right").text(numberWithCommas(roundNumber(brand_loyalty_tw2,2)));
		
		$("#percent_reach").html(percent_brand_loyalty_tw1 + "%");
		$("#percent_reach_right").html(percent_brand_loyalty_tw2 + "%");
		$("#percent_engagement").html(percent_activity_tw1 + "%");
		$("#percent_engagement_right").html(percent_activity_tw2 + "%");
		$("#percent_activity").html(percent_activity_tw1 + "%");
		$("#percent_activity_right").html(percent_activity_tw2 + "%");
		$("#percent_brand_loyalty").html(percent_brand_loyalty_tw1 + "%");
		$("#percent_brand_loyalty_right").html(percent_brand_loyalty_tw2 + "%");
		
		
		$("#width_reach_left").css("width",percent_spread_tw1 + "%");
		$("#width_reach_right").css("width",percent_spread_tw2 + "%");
		$("#width_engagement_left").css("width",percent_activity_tw1 + "%");
		$("#width_engagement_right").css("width",percent_activity_tw2 + "%");
		$("#width_brand_loyalty_left").css("width",percent_brand_loyalty_tw1 + "%");
		$("#width_brand_loyalty_right").css("width",percent_brand_loyalty_tw2 + "%");
		$("#width_activity_left").css("width",percent_activity_tw1 + "%");
		$("#width_activity_right").css("width",percent_activity_tw2 + "%");
		drawSpread();
		$(".competitors_twitter_page #aoFrm-content .itemLoading").hide();
		$("#competitors_twitter").css("opacity","1");
	}
	
}
function showTwitterCompetitor(page_name1,page_name2,page_id1,page_id2,avatar_tw1,avatar_tw2){
	//clearData();
	$("#txt_twitter1").val("");
	$("#txt_twitter2").val("");
	$("#txt_twitter1").attr("channel_detail_id",page_id1);
	   $(".leftName .blockPage li.name").text(page_name1);
	   $(".leftName .blockPage li img").attr('src',avatar_tw1);
	   $("#twitter1").attr("channel_detail_id",page_id1);
	   $("#name_compare_tw1").attr("title",page_name1);
	   $("#name_compare_tw1").text(limitString(page_name1));
	   var obj_tw_name = new Object();
	   obj_tw_name.twitter_name1 = page_name1;
	   array_tw_name.push(obj_tw_name);
	   $("#txt_twitter2").attr("channel_detail_id",page_id2);
	   $(".rightName .blockPage li.name").text(page_name2);
	   $(".rightName .blockPage li img").attr('src',avatar_tw2);
	   $("#twitter2").attr("channel_detail_id",page_id2);
	   $("#name_compare_tw2").attr("title",page_name2);
	   $("#name_compare_tw2").text(limitString(page_name2));
	   var obj_tw_name = new Object();
	   obj_tw_name.twitter_name2 = page_name2;
	   array_tw_name.push(obj_tw_name);
	   
}
	
	function deleteCompetitors(competitors_id){
		var dataString =[];
		 dataString.push({
			  name: "competitors_id", 
			  value: competitors_id
			});
		dataString.push({
		  name: "Action", 
		  value: "delete"
		});    

		$.ajax({
		 type:'POST',
		  url : 'Competitors.do',
		  dataType: 'text',
		  data: dataString,
		  success : function(source) {
			  if(source.trim()!="0"){
				  aoFrm.mess("mess",mess.message_delete_competitors);  
				  $('#jQgrid_compare').jqGrid('delRowData',competitors_id);
				  $('#jQgrid_compare').trigger("reloadGrid");
			  }
			  }
	 });	
	}
	
	function comparePage(twitter1, twitter2,tw_name1,tw_name2,avatar_tw1,avatar_tw2){
		//clearData();
		$("#competitors_twitter .block_save_competitors").hide();
		$("#competitors_twitter .block_show_competitors").show();
		$("#txt_twitter1").attr("channel_detail_id",twitter1);
		   $(".leftName .blockPage li.name").text(tw_name1);
		   $(".leftName .blockPage li img").attr('src',avatar_tw1);
		   $("#twitter1").attr("channel_detail_id",twitter1);
		   $("#name_compare_tw1").attr("title",tw_name1);
		   $("#name_compare_tw1").text(limitString(tw_name1));
		  
		   $("#txt_twitter2").attr("channel_detail_id",twitter2);
		   $(".rightName .blockPage li.name").text(tw_name2);
		   $(".rightName .blockPage li img").attr('src',avatar_tw2);
		   $("#twitter2").attr("channel_detail_id",twitter2);
		   $("#name_compare_tw2").attr("title",tw_name2);
		   $("#name_compare_tw2").text(limitString(tw_name2));
		compareTwitter1(twitter1);
		compareTwitter2(twitter2);
	}
	function drawfollower(){
		
		$(".chart_content").css("height",250);
		var array_date = new Array();
		var array_follower1= new Array();
		var array_follower2= new Array();
		var array_following1= new Array();
		var array_following2= new Array();
		var twitter_name1=$("#name_compare_tw1").attr("title");
		var twitter_name2=$("#name_compare_tw2").attr("title");
		
		for (var i=0;i<array_data_tw_follower_following.length;i++){
			var days = new Date(array_data_tw_follower_following[i].day);
			array_date.push(days.getMonth() + 1 + "/" + days.getDate());
			array_follower1.push(array_data_tw_follower_following[i].follower1);
			array_follower2.push(array_data_tw_follower_following[i].follower2);
			array_following1.push(array_data_tw_follower_following[i].following1);
			array_following2.push(array_data_tw_follower_following[i].following2);
			}
		info = new Highcharts.Chart({
			chart: {
            type: 'area',
            renderTo: 'follower_chart',
            backgroundColor: null,
            plotBackgroundColor: 'none'
        },
        credits: {
            enabled: false
        },
        title: {
            text: null
        },
        subtitle: {
            text: null
        },
        xAxis: {
            categories: formatDayRange(array_date),
            tickmarkPlacement: 'on',
            labels: {
            	formatter: function(){
                	return getDayString(this.value);
                }
            }
            
        },
        yAxis: {
            title: {
                text: null
            },
            labels: {
                formatter: function() {
                    return this.value;
                }
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ''
        },
        plotOptions: {
            area: {
               // stacking: 'normal',
                lineColor: '#4DA944',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#3880AA'
                }
                //fillOpacity:0.5
            }
        },
        series: [{
            name: twitter_name1,
            color: '#3880AA',
            data: formatDayRange(array_follower1)
        },
        {
            name: twitter_name2,
            color: '#4DA944',
            data: formatDayRange(array_follower2)
        }
        ]
		});
		drawFollowing(twitter_name1,twitter_name2,array_following1,array_following2, array_date);
	}
	function drawFollowing(twitter_name1,twitter_name2,array_following1,array_following2, array_date){
		info = new Highcharts.Chart({
			chart: {
            type: 'area',
            renderTo: 'following_chart',
            backgroundColor: null,
            plotBackgroundColor: 'none'
        },
        credits: {
            enabled: false
        },
        title: {
            text: null
        },
        subtitle: {
            text: null
        },
        xAxis: {
            categories: formatDayRange(array_date),
            tickmarkPlacement: 'on',
            labels: {
            	formatter: function(){
                	return getDayString(this.value);
                }
            }
            
        },
        yAxis: {
            title: {
                text: null
            },
            labels: {
                formatter: function() {
                    return this.value;
                }
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ''
        },
        plotOptions: {
            area: {
               // stacking: 'normal',
                lineColor: '#4DA944',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#3880AA'
                }
                //fillOpacity:0.5
            }
        },
        series: [{
            name: twitter_name1,
            color: '#3880AA',
            data: formatDayRange(array_following1)
        },
        {
            name: twitter_name2,
            color: '#4DA944',
            data: formatDayRange(array_following2)
        }
        ]
		});
	}
	function drawSpread(){
		$(".chart_content").css("height",250);
		var array_date = new Array();
		var array_engagement_tw1 = new Array();
		var array_engagement_tw2 = new Array();
		var array_spread_tw1 = new Array();
		var array_spread_tw2 = new Array();
		var array_activity_tw1 = new Array();
		var array_activity_tw2 = new Array();
		var array_brand_loyalty_tw1 = new Array();
		var array_brand_loyalty_tw2 = new Array();
		var array_favorite_tw1=new Array();
		var array_favorite_tw2=new Array();
		var array_reply_tw1= new Array();
		var array_reply_tw2= new Array();
		var array_tweet_tw1= new Array();
		var array_tweet_tw2= new Array();
		var array_retweet_tw1= new Array();
		var array_retweet_tw2= new Array();
		var array_mention_tw1= new Array();
		var array_mention_tw2= new Array();
		var twitter_name1=$("#name_compare_tw1").attr("title");
		var twitter_name2=$("#name_compare_tw2").attr("title");
		
		for (var i=0;i<array_twitter_chart.length;i++){
			var days = new Date(array_twitter_chart[i].day);
			array_date.push(days.getMonth() + 1 + "/" + days.getDate());
			array_engagement_tw1.push(array_twitter_chart[i].engagement_tw1);
			array_engagement_tw2.push(array_twitter_chart[i].engagement_tw2);
			array_spread_tw1.push(array_twitter_chart[i].spread_tw1);
			array_spread_tw2.push(array_twitter_chart[i].spread_tw2);
			array_activity_tw1.push(array_twitter_chart[i].activity_tw1);
			array_activity_tw2.push(array_twitter_chart[i].activity_tw2);
			array_brand_loyalty_tw1.push(array_twitter_chart[i].brand_loyalty_tw1);
			array_brand_loyalty_tw2.push(array_twitter_chart[i].brand_loyalty_tw2);
			array_favorite_tw1.push(array_twitter_chart[i].favorite_tw1);
			array_favorite_tw2.push(array_twitter_chart[i].favorite_tw2);
			array_reply_tw1.push(array_twitter_chart[i].comment_tw1);
			array_reply_tw2.push(array_twitter_chart[i].comment_tw2);
			array_tweet_tw1.push(array_twitter_chart[i].tweet_tw1);
			array_tweet_tw2.push(array_twitter_chart[i].tweet_tw2);
			array_retweet_tw1.push(array_twitter_chart[i].retweet_tw1);
			array_retweet_tw2.push(array_twitter_chart[i].retweet_tw2);
			array_mention_tw1.push(array_twitter_chart[i].mention_tw1);
			array_mention_tw2.push(array_twitter_chart[i].mention_tw2);
		}

		info = new Highcharts.Chart({
			chart: {
            type: 'area',
            renderTo: 'reach_chart',
            backgroundColor: null,
            plotBackgroundColor: 'none'
        },
        credits: {
            enabled: false
        },
        title: {
            text: null
        },
        subtitle: {
            text: null
        },
        xAxis: {
            categories: formatDayRange(array_date),
            tickmarkPlacement: 'on',
            labels: {
            	formatter: function(){
                	return getDayString(this.value);
                }
            }
            
        },
        yAxis: {
            title: {
                text: null
            },
            labels: {
                formatter: function() {
                    return this.value;
                }
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ''
        },
        plotOptions: {
            area: {
               // stacking: 'normal',
                lineColor: '#4DA944',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#3880AA'
                }
                //fillOpacity:0.5
            }
        },
        series: [{
            name: twitter_name1,
            color: '#3880AA',
            data: formatDayRange(array_spread_tw1)
        },
        {
            name: twitter_name2,
            color: '#4DA944',
            data: formatDayRange(array_spread_tw2)
        }
        ]
		});
		drawEngagement(array_date,array_engagement_tw1,array_engagement_tw2,twitter_name1,twitter_name2);
		drawActivity(array_date,array_activity_tw1,array_activity_tw2,twitter_name1,twitter_name2);
		drawBrandLoyalty(array_date,array_brand_loyalty_tw1,array_brand_loyalty_tw2,twitter_name1,twitter_name2);
		drawTweet(array_date,array_tweet_tw1,array_tweet_tw2,twitter_name1,twitter_name2);
		drawReTweet(array_date,array_retweet_tw1,array_retweet_tw2,twitter_name1,twitter_name2);
		drawMention(array_date,array_mention_tw1,array_mention_tw2,twitter_name1,twitter_name2);
		drawComment(array_date,array_reply_tw1,array_reply_tw2,twitter_name1,twitter_name2);
		drawFavorite(array_date,array_favorite_tw1,array_favorite_tw2,twitter_name1,twitter_name2);
}
	
	function drawEngagement(array_date,array_engagement_tw1,array_engagement_tw2,twitter_name1,twitter_name2){
		info = new Highcharts.Chart({
			chart: {
	        type: 'area',
	        renderTo: 'engagement_chart',
	        backgroundColor: null,
	        plotBackgroundColor: 'none'
	    },
	    credits: {
	        enabled: false
	    },
	    title: {
	        text: null
	    },
	    subtitle: {
	        text: null
	    },
	    xAxis: {
	        categories: formatDayRange(array_date),
	        tickmarkPlacement: 'on',
            labels: {
            	formatter: function(){
                	return getDayString(this.value);
                }
            }
	        
	    },
	    yAxis: {
	        title: {
	            text: null
	        },
	        labels: {
	            formatter: function() {
	                return this.value;
	            }
	        }
	    },
	    tooltip: {
	        shared: true,
	        valueSuffix: ''
	    },
	    plotOptions: {
	        area: {
	           // stacking: 'normal',
	            lineColor: '#4DA944',
	            lineWidth: 1,
	            marker: {
	                lineWidth: 1,
	                lineColor: '#3880AA'
	            }
	            //fillOpacity:0.5
	        }
	    },
	    series: [{
	        name: twitter_name1,
	        color: '#3880AA',
	        data: formatDayRange(array_engagement_tw1)
	    },
	    {
	        name: twitter_name2,
	        color: '#4DA944',
	        data: formatDayRange(array_engagement_tw2)
	    }
	    ]
		});
	}
	
	function drawActivity(array_date,array_activity_tw1,array_activity_tw2,twitter_name1,twitter_name2){
		info = new Highcharts.Chart({
			chart: {
	        type: 'area',
	        renderTo: 'activity_chart',
	        backgroundColor: null,
	        plotBackgroundColor: 'none'
	    },
	    credits: {
	        enabled: false
	    },
	    title: {
	        text: null
	    },
	    subtitle: {
	        text: null
	    },
	    xAxis: {
	        categories: formatDayRange(array_date),
	        tickmarkPlacement: 'on',
            labels: {
            	formatter: function(){
                	return getDayString(this.value);
                }
            }
	        
	    },
	    yAxis: {
	        title: {
	            text: null
	        },
	        labels: {
	            formatter: function() {
	                return this.value;
	            }
	        }
	    },
	    tooltip: {
	        shared: true,
	        valueSuffix: ''
	    },
	    plotOptions: {
	        area: {
	           // stacking: 'normal',
	            lineColor: '#4DA944',
	            lineWidth: 1,
	            marker: {
	                lineWidth: 1,
	                lineColor: '#3880AA'
	            }
	            //fillOpacity:0.5
	        }
	    },
	    series: [{
	        name: twitter_name1,
	        color: '#3880AA',
	        data: formatDayRange(array_activity_tw1)
	    },
	    {
	        name: twitter_name2,
	        color: '#4DA944',
	        data: formatDayRange(array_activity_tw2)
	    }
	    ]
		});
	}
	
	function drawBrandLoyalty(array_date,array_brand_loyalty_tw1,array_brand_loyalty_tw2,twitter_name1,twitter_name2){
		info = new Highcharts.Chart({
			chart: {
	        type: 'area',
	        renderTo: 'brand_loyalty_chart',
	        backgroundColor: null,
	        plotBackgroundColor: 'none'
	    },
	    credits: {
	        enabled: false
	    },
	    title: {
	        text: null
	    },
	    subtitle: {
	        text: null
	    },
	    xAxis: {
	        categories: formatDayRange(array_date),
	        tickmarkPlacement: 'on',
            labels: {
            	formatter: function(){
                	return getDayString(this.value);
                }
            }
	        
	    },
	    yAxis: {
	        title: {
	            text: null
	        },
	        labels: {
	            formatter: function() {
	                return this.value;
	            }
	        }
	    },
	    tooltip: {
	        shared: true,
	        valueSuffix: ''
	    },
	    plotOptions: {
	        area: {
	           // stacking: 'normal',
	            lineColor: '#4DA944',
	            lineWidth: 1,
	            marker: {
	                lineWidth: 1,
	                lineColor: '#3880AA'
	            }
	            //fillOpacity:0.5
	        }
	    },
	    series: [{
	        name: twitter_name1,
	        color: '#3880AA',
	        data: formatDayRange(array_brand_loyalty_tw1)
	    },
	    {
	        name: twitter_name2,
	        color: '#4DA944',
	        data: formatDayRange(array_brand_loyalty_tw2)
	    }
	    ]
		});
	}
	
	function drawTweet(array_date,array_tweet_tw1,array_tweet_tw2,twitter_name1,twitter_name2){
		info = new Highcharts.Chart({
			chart: {
	        type: 'area',
	        renderTo: 'tweet_chart',
	        backgroundColor: null,
	        plotBackgroundColor: 'none'
	    },
	    credits: {
	        enabled: false
	    },
	    title: {
	        text: null
	    },
	    subtitle: {
	        text: null
	    },
	    xAxis: {
	        categories: formatDayRange(array_date),
	        tickmarkPlacement: 'on',
            labels: {
            	formatter: function(){
                	return getDayString(this.value);
                }
            }
	        
	    },
	    yAxis: {
	        title: {
	            text: null
	        },
	        labels: {
	            formatter: function() {
	                return this.value;
	            }
	        }
	    },
	    tooltip: {
	        shared: true,
	        valueSuffix: ''
	    },
	    plotOptions: {
	        area: {
	           // stacking: 'normal',
	            lineColor: '#4DA944',
	            lineWidth: 1,
	            marker: {
	                lineWidth: 1,
	                lineColor: '#3880AA'
	            }
	            //fillOpacity:0.5
	        }
	    },
	    series: [{
	        name: twitter_name1,
	        color: '#3880AA',
	        data: formatDayRange(array_tweet_tw1)
	    },
	    {
	        name: twitter_name2,
	        color: '#4DA944',
	        data: formatDayRange(array_tweet_tw2)
	    }
	    ]
		});
	}
	function drawReTweet(array_date,array_retweet_tw1,array_retweet_tw2,twitter_name1,twitter_name2){
		info = new Highcharts.Chart({
			chart: {
	        type: 'area',
	        renderTo: 'retweet_chart',
	        backgroundColor: null,
	        plotBackgroundColor: 'none'
	    },
	    credits: {
	        enabled: false
	    },
	    title: {
	        text: null
	    },
	    subtitle: {
	        text: null
	    },
	    xAxis: {
	        categories: formatDayRange(array_date),
	        tickmarkPlacement: 'on',
            labels: {
            	formatter: function(){
                	return getDayString(this.value);
                }
            }
	        
	    },
	    yAxis: {
	        title: {
	            text: null
	        },
	        labels: {
	            formatter: function() {
	                return this.value;
	            }
	        }
	    },
	    tooltip: {
	        shared: true,
	        valueSuffix: ''
	    },
	    plotOptions: {
	        area: {
	           // stacking: 'normal',
	            lineColor: '#4DA944',
	            lineWidth: 1,
	            marker: {
	                lineWidth: 1,
	                lineColor: '#3880AA'
	            }
	            //fillOpacity:0.5
	        }
	    },
	    series: [{
	        name: twitter_name1,
	        color: '#3880AA',
	        data: formatDayRange(array_retweet_tw1)
	    },
	    {
	        name: twitter_name2,
	        color: '#4DA944',
	        data: formatDayRange(array_retweet_tw2)
	    }
	    ]
		});
	}
	
	function drawMention(array_date,array_mention_tw1,array_mention_tw2,twitter_name1,twitter_name2){
		info = new Highcharts.Chart({
			chart: {
	        type: 'area',
	        renderTo: 'mention_chart',
	        backgroundColor: null,
	        plotBackgroundColor: 'none'
	    },
	    credits: {
	        enabled: false
	    },
	    title: {
	        text: null
	    },
	    subtitle: {
	        text: null
	    },
	    xAxis: {
	        categories: formatDayRange(array_date),
	        tickmarkPlacement: 'on',
            labels: {
            	formatter: function(){
                	return getDayString(this.value);
                }
            }
	        
	    },
	    yAxis: {
	        title: {
	            text: null
	        },
	        labels: {
	            formatter: function() {
	                return this.value;
	            }
	        }
	    },
	    tooltip: {
	        shared: true,
	        valueSuffix: ''
	    },
	    plotOptions: {
	        area: {
	           // stacking: 'normal',
	            lineColor: '#4DA944',
	            lineWidth: 1,
	            marker: {
	                lineWidth: 1,
	                lineColor: '#3880AA'
	            }
	            //fillOpacity:0.5
	        }
	    },
	    series: [{
	        name: twitter_name1,
	        color: '#3880AA',
	        data: formatDayRange(array_mention_tw1)
	    },
	    {
	        name: twitter_name2,
	        color: '#4DA944',
	        data: formatDayRange(array_mention_tw2)
	    }
	    ]
		});
	}
	
	function drawComment(array_date,array_reply_tw1,array_reply_tw2,twitter_name1,twitter_name2){
		info = new Highcharts.Chart({
			chart: {
	        type: 'area',
	        renderTo: 'comment_chart',
	        backgroundColor: null,
	        plotBackgroundColor: 'none'
	    },
	    credits: {
	        enabled: false
	    },
	    title: {
	        text: null
	    },
	    subtitle: {
	        text: null
	    },
	    xAxis: {
	        categories: formatDayRange(array_date),
	        tickmarkPlacement: 'on',
            labels: {
            	formatter: function(){
                	return getDayString(this.value);
                }
            }
	        
	    },
	    yAxis: {
	        title: {
	            text: null
	        },
	        labels: {
	            formatter: function() {
	                return this.value;
	            }
	        }
	    },
	    tooltip: {
	        shared: true,
	        valueSuffix: ''
	    },
	    plotOptions: {
	        area: {
	           // stacking: 'normal',
	            lineColor: '#4DA944',
	            lineWidth: 1,
	            marker: {
	                lineWidth: 1,
	                lineColor: '#3880AA'
	            }
	            //fillOpacity:0.5
	        }
	    },
	    series: [{
	        name: twitter_name1,
	        color: '#3880AA',
	        data: formatDayRange(array_reply_tw1)
	    },
	    {
	        name: twitter_name2,
	        color: '#4DA944',
	        data: formatDayRange(array_reply_tw2)
	    }
	    ]
		});
	}
	
	function drawFavorite(array_date,array_favorite_tw1,array_favorite_tw2,twitter_name1,twitter_name2){
		info = new Highcharts.Chart({
			chart: {
	        type: 'area',
	        renderTo: 'favorite_chart',
	        backgroundColor: null,
	        plotBackgroundColor: 'none'
	    },
	    credits: {
	        enabled: false
	    },
	    title: {
	        text: null
	    },
	    subtitle: {
	        text: null
	    },
	    xAxis: {
	        categories: formatDayRange(array_date),
	        tickmarkPlacement: 'on',
            labels: {
            	formatter: function(){
                	return getDayString(this.value);
                }
            }
	        
	    },
	    yAxis: {
	        title: {
	            text: null
	        },
	        labels: {
	            formatter: function() {
	                return this.value;
	            }
	        }
	    },
	    tooltip: {
	        shared: true,
	        valueSuffix: ''
	    },
	    plotOptions: {
	        area: {
	           // stacking: 'normal',
	            lineColor: '#4DA944',
	            lineWidth: 1,
	            marker: {
	                lineWidth: 1,
	                lineColor: '#3880AA'
	            }
	            //fillOpacity:0.5
	        }
	    },
	    series: [{
	        name: twitter_name1,
	        color: '#3880AA',
	        data: formatDayRange(array_favorite_tw1)
	    },
	    {
	        name: twitter_name2,
	        color: '#4DA944',
	        data: formatDayRange(array_favorite_tw2)
	    }
	    ]
		});
	}
	
	function clearData(){
		showFollower_Following_count=0;
		array_info_twitter=[];
		array_twitter_chart=[];
		count_twitter=0;
		count_info_twitter=0;
		array_twitter=[];
		array_data_tw=[];
		array_data_tw_follower_following=[];
		
	}
	
	function getTWCompetitors(channel_id, start_date, end_date){
		
		  var dataString =[];
			 dataString.push({
		  name: "channel_id", 
		  value: channel_id
			 });
			 dataString.push({
			      name: "start_date", 
			      value: start_date
			  	});
			 dataString.push({
			      name: "end_date", 
			      value: end_date
			  	});
			 dataString.push({
			      name: "type", 
			      value: 3
			  	});
			 dataString.push({
		  name: "Action", 
		  value: "fbtw"
			});
		  $.ajax({
			  url : 'GetCompetitors.do',
			  dataType: 'json',
			  data: dataString,
			  success : function(source) {
				  showFollower_Following(source);
			  }
		  });
		}
		function showFollower_Following(response){
			 
			var twitter1 = $("#twitter1").attr("channel_detail_id");
			var twitter2 = $("#twitter2").attr("channel_detail_id");
			showFollower_Following_count++;
			for(var i=0; i<response.length; i++){
				var object_tw= new Object();
				object_tw.channel_id=response[i].channel_id;
				object_tw.follower=response[i].follower;
				object_tw.following=response[i].following;
				object_tw.create_date= response[i].create_date;
				array_data_tw.push(object_tw);
			}
			 if(showFollower_Following_count==2){
				
				 for(var j=0; j<array_data_tw.length; j++){
					 if(array_data_tw[j].channel_id==twitter1){
						 var date_post = new Date(array_data_tw[j].create_date * 1000);
						
				  			date_post = (date_post.getMonth() + 1) +"/"+ date_post.getDate()+ "/" +date_post.getFullYear();
				  			
				  			for (var k=0; k<array_data_tw_follower_following.length;k++){
				  				
				  				if (array_data_tw_follower_following[k].day == date_post){
				  					array_data_tw_follower_following[k].follower1=array_data_tw[j].follower;
				  					array_data_tw_follower_following[k].following1=array_data_tw[j].following;
				  				   break;
				  				}
				  			}
					 }
					 if(array_data_tw[j].channel_id==twitter2){
						 var date_post = new Date(array_data_tw[j].create_date * 1000);
				  			date_post = (date_post.getMonth() + 1) +"/"+ date_post.getDate()+ "/" +date_post.getFullYear();
				  			for (var k=0; k<array_data_tw_follower_following.length;k++){
				  				if (array_data_tw_follower_following[k].day == date_post){
				  					array_data_tw_follower_following[k].follower2=array_data_tw[j].follower;
				  					array_data_tw_follower_following[k].following2=array_data_tw[j].following;
				  				  break;
				  				}
				  			}
					 }
				 }
				 drawfollower();
			 }
		}
	
		 function addNewRowInGrid(id,txt_twitter1,txt_twitter2,channel_detail_id1,channel_detail_id2,avatar_tw1,avatar_tw2){      
             try{
            	 var date= formatDateCurrent();
            	 var page_name=txt_twitter1+" vs "+txt_twitter2;
                 var datarow = { "competitors_id": id,
                     "create_date": date, "page_name": page_name,"page_name1":txt_twitter1,"page_name2":txt_twitter2,"compare":"<a onclick='comparePage("+channel_detail_id1+","+channel_detail_id2+")' href='javascript:void(0)'>Compare</a>","delete":"<a onclick='deleteCompetitors("+id+")' href='javascript:void(0)'>Delete</a>","page_id1":channel_detail_id1,"page_id2":channel_detail_id2,"avatar_tw1":avatar_tw1,"avatar_tw2":avatar_tw2};
                 $('#jQgrid_compare').jqGrid('addRowData',id, datarow, "first");            
                // $('#jQgrid_compare').jqGrid('resetSelection');
                
             }
             catch (ex){
             }
             return false;
         }
