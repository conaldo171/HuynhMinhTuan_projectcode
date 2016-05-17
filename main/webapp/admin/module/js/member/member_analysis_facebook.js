/***************************************************************************
 Page Code:	analysis/facebook
 First Author:
 Created Date: 
 **************************************************************************/
 
/*** Gray theme for Highcharts JS ***/	
var date = new Date();
	var currentDate = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
	var lastDate = new Date();
	var days = 7;
	var res = date.setTime(date.getTime() - (days * 24 * 60 * 60 * 1000));		
	var lastDate = new Date(res);
	var newDate = (lastDate.getMonth() + 1) + "/" + lastDate.getDate() + "/" + lastDate.getFullYear();
	$("#analysis_facebook #dashboard_range").val(newDate +" to " + currentDate);
$('#analysis_facebook .date-range').daterangepicker({opens: 'left',
        format: 'MM/dd/yyyy',
        separator: ' to ',
        startDate: Date.today().add({
            days: -7
        }),
        endDate: Date.today(),
        minDate: '02/04/2004',
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
var array_summary=new Array();
var arraylast_summary=new Array();
var array_infulence= new Array();
var obj = new Array();
var last_obj = new Array();

var obj_influence =new Object();
var object_report_fb = new Object();
var array_influence_export = new Array();
var array_content_top_20_export = new Array();
var array_summary_export = new Array();
var limitFrom = 0;
var limitTo = 200;
var arr = new Array();
var fans_number = 0;
var friends_number = 0;
var total_post = 0;
var like_total = 0;
var comment_total = 0;
var share_total = 0;
var comment_like_total = 0;
var total_reach=0;
var last_total_reach=0;
var last_channel_id;
var user_id = $("#analysis_tab").attr("user_id");
$(document).ready(function() {
	object_report_fb.title_summary={date:"Date",fan:"Fan",newfan:"New Fan",friendsoffan:"Friend of Fan",reach:"Reach",peopletalking:"People Talikng",engagement:"Engagement",activity:"Activity",spread:"spread",engagementRate:"Engagement Rate",brandroyalty:"Brand Royalty",content:"Content",like:"Like",share:"Share",comment:"Comment",likeofcomment:"Like of Comment" };
	//object_report_fb.title_top20={date:"Date",no:"No",title:"Title",engagement:"Engagement",peopletalking:"People Talikng",reach:"Reach",like:"Like",share:"Share",comment:"Comment",commentoflike:"Like of Comment"};
	//object_report_fb.title_influence={date:"Date",no:"No",account:"Account",spread:"Spread",brandroyalty:"Brand Royalty"};
	$("#summary_fb .action-nav-button a").click(function(){
		var type = $(this).attr("type");
		$("#summary_fb .action-nav-button a").removeClass("active");
		$(this).addClass("active");
		$("#summary_title_fb").html("<span text='"+type+"'>"+type+"</span>");
		drawSumaryChart(type);
	});
	
	var page_id_post;
	getChannelReport(user_id);
	
});

$(".range_inputs .btn").click(function(){
	setTimeout(function(){
		var pchannel_detail_id = $("#analysis_facebook .content_right").attr("pchannel_detail_id");
		var access_token = $("#analysis_facebook .content_right").attr("access_token");
		var channel_detail_id = $("#analysis_facebook .content_right").attr("id");
		var type_fb = $("#analysis_facebook .content_right").attr("type");
		$("#summary_fb .action-nav-button a").removeClass("active");
		$("#summary_fb .action-nav-button a:first").addClass("active");
		$("#contents .action-nav-button a").removeClass("active");
		$("#contents .action-nav-button a:first").addClass("active");
		$("#engagement .list-action a").removeClass("active");
		$("#engagement .list-action a:first").addClass("active");
		getReportFb(channel_detail_id,pchannel_detail_id,access_token,type_fb);
	},100);
});

/*** Gray theme for Highcharts JS ***/

function chartResize()
{
	
	_dw = $(window).innerWidth();
	_bw = $("#analysis_facebook .block-demographic").innerWidth();
	if(_dw < 768)
	{
		console.log("small size " + _dw);
		_h = 400;
		if(_dw < 440)
		{
			_h = _dw;
		}
	}else
	{
		console.log("large size " + _dw);
		_h = _bw/4 + 15;
	}	
	$("#analysis_facebook .block-demographic .chartBox .chart").css("height",_h);
}
chartResize();

$(window).resize(function(e) {
    chartResize();	
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


/*****dashboard stats******/
$(".tip, [rel=tooltip]").tooltip({
    gravity: "n",
    fade: !0,
    html: !0
}), $("[data-percent]").each(function () {
    return $(this).css({
        width: "" + $(this).attr("data-percent") + "%"
    });
});


      function getReportFb(channel_detail_id,pchannel_detail_id,token,type_fb){
    	$("#analysis_facebook .content_right .block_content").css("opacity","0.3");
  		$("#analysis_facebook .itemLoading").show();
    	var stringDate = $("#analysis_facebook #dashboard_range").val();
  		var newString = stringDate.split("to");
  		var stringFrom = newString[0];
  		var stringTo = newString[1];
  		//date for facebook: plus 1 day
  		var newStringFrom = new Date(stringFrom);
  		var newStringTo = new Date(stringTo);
  		var dateFrom = new Date(newStringFrom);
  		var dateTo = new Date(newStringTo);
  		var newDateFrom = toTimestamp(dateFrom) + (24 * 60 * 60);
  		var newDateTo = toTimestamp(dateTo) + (48 * 60 * 60) ;
  		var prevDate = toTimestamp(dateFrom);
  		arraylast_summary=[];
  		array_summary=[];
  		obj =[];
  		last_obj=[];
  		arr = [];
  		
  		array_summary_export=[];
  		total_post = 0;
  		like_total = 0;
	  	comment_total = 0;
	  	share_total = 0;
	  	friends_number=0;
	  	comment_like_total = 0;
	  	selectFqlComment(channel_detail_id, token,type_fb,newDateFrom,newDateTo);
  		while (prevDate < newDateTo - (24 * 60 * 60)){
  			var dateFrom = new Date(prevDate * 1000);
  			obj.push({"day": (dateFrom.getMonth() + 1) + "/" + dateFrom.getDate() + "/" + dateFrom.getFullYear(),"content":0,"like":0,"share":0,"comment":0,"likeofcomment":0,"engagement":0,"activity":0,"spread":0,"engagementRate":0,"brand_royalty":0});
  			array_summary.push({"day": (dateFrom.getMonth() + 1) + "/" + dateFrom.getDate() + "/" + dateFrom.getFullYear(),"fan":0,"reach":0,"peopletalking":0,"friendsoffan":0});
  			prevDate = prevDate + (24 * 60 * 60);
  		}
  		
  		var query = "";
  		if (type_fb=="feed"){
  			query = 'SELECT source_id, post_id ,created_time,message,share_count,like_info,comment_info FROM stream WHERE message <> "" and source_id = '+channel_detail_id+' limit 0,200' ;
  			 getFriendsSummary(stringFrom,stringTo,channel_detail_id,"facebookpage");
  		
  		}else{
  			query = 'SELECT source_id, post_id ,created_time,message,share_count,like_info,comment_info FROM stream WHERE message <> "" and filter_key in (SELECT filter_key FROM stream_filter WHERE uid = "'+channel_detail_id+'" and type = "newsfeed") limit 0,200' ;
  				//getAllFriends(channel_detail_id,token);
  			getFriendsSummary(stringFrom,stringTo,channel_detail_id,"facebook");
  			 
  		}
  		
  		FB.api({method: 'fql.query',
	        query: query,access_token:token
	      },function(response) {
				getTopPost(response,newDateFrom,newDateTo,channel_detail_id,pchannel_detail_id,type_fb,token);
	  				//contentChartFb(response);
				//drawContentChart("content");
	      });
  		
  		var day = Math.round((newDateTo - newDateFrom)/60/60/24);
  		var lastDateTo = newDateFrom - (24 * 60 * 60);
  		var lastDateFrom = lastDateTo - (day * 24 * 60 * 60);
  		var lastPrevDate = lastDateFrom;
  		while (lastPrevDate < lastDateTo){
  			var dateFrom = new Date(lastPrevDate * 1000);
  			last_obj.push({"day": (dateFrom.getMonth() + 1) + "/" + dateFrom.getDate() + "/" + dateFrom.getFullYear(),"content":0,"like":0,"share":0,"comment":0,"likeofcomment":0});
  			arraylast_summary.push({"day": (dateFrom.getMonth() + 1) + "/" + dateFrom.getDate() + "/" + dateFrom.getFullYear(),"fan":0,"reach":0,"peopletalking":0,"friendsoffan":0});
  			lastPrevDate = lastPrevDate + (24 * 60 * 60);
  		}
  		//lastContentChartFb(channel_detail_id,token,lastDateFrom,lastDateTo,type_fb);
  		if(channel_detail_id != pchannel_detail_id){
			FB.api('/'+pchannel_detail_id+'/accounts',{access_token:token}, function(response) {
				 if(!isNull(response.data)){
					 var datasource=response.data;
					 for(var j=0; j<datasource.length;j++){
							 if(datasource[j].id==channel_detail_id){
								token_page = datasource[j].access_token;
								getFansPage(channel_detail_id,token_page,lastDateFrom,newDateTo);
								
							 }
						} 
				 }
			 });
				
		}
  		
      }
      
      
      function getFansPage(page_id_post,token_page,newDateFrom,newDateTo){
    	  total_reach=0;
  		FB.api('/'+page_id_post+'/insights/page_fans?since='+newDateFrom+'&until='+newDateTo+'',{access_token:token_page}, function(response) {
  			
  			if (!isNull(response.data)){
  				for (var i=0;i<response.data[0].values.length;i++){
  					fans_number = response.data[0].values[i].value;
  				}
  				if(fans_number >= 30){
  					$("#analysis_facebook .content_right .block-nodata").empty();
  					sumaryPagesChart(response.data[0].values);
  					peopletalkingSummaryPage(page_id_post,token_page,newDateFrom,newDateTo);
  					reachSummaryPage(page_id_post,token_page,newDateFrom,newDateTo);
  				}else{
  					$("#analysis_facebook .content_right .block_content").css("opacity","1");
  					$("#analysis_facebook .itemLoading").hide();
  				}
  			}
  		 });
  		
  	 }
  
  	function sumaryPagesChart(obj){
  		var days_curent = new Date();
  		for(var i=0;i<obj.length;i++){
  			var date_post = new Date(obj[i].end_time);
  			date_post = (date_post.getMonth() + 1) +"/"+ date_post.getDate()+ "/" +date_post.getFullYear();
  			for(var j=0; j<array_summary.length;j++){
  				if(array_summary[j].day==date_post)
  				array_summary[j].fan=obj[i].value;
  				
  			}
  			for(var k=0; k<arraylast_summary.length;k++){
  				if(arraylast_summary[k].day==date_post)
  				arraylast_summary[k].fan=obj[i].value;
  				
  			}
  		
  		}
  		
  	}
  	function drawSumaryChart(type){
  		var total_fan=0;
  		
  		var friend_of_fan=0;
  		var last_friend_of_fan=0;
  		var total_peopletalking=0;
  		var total_peopletalking_fan=0;
  		var last_total_peopletalking=0;
  		var last_total_peopletalking_fan=0;
  		var new_reach=0;
  		var new_fan=0;
  		var last_total_fan=0;
  		var new_friend_of_fan=0;
  		var new_peopletalking=0;
  		var new_peopletalking_fan=0;
  		var growth_of=0;
  		var array_date_title = new Array();
  		var array_date= new Array();
  		var array_fan = new Array();
  		var array_friend_of_fan =new Array();
  		var array_reach=new Array();
  		var array_peopletalking=new Array();
  		var array_peopletalking_fan=new Array();
  		
  		var last_array_date_title = new Array();
  		var array_last_fan = new Array();
  		var array_last_friend_of_fan=new Array();
  		var array_last_reach=new Array();
  		var array_last_peopletalking=new Array();
  		var array_last_peopletalking_fan=new Array();
  		var array_last=new Array();
  		var array_current=new Array();
  		
  		
  		for(var j=0; j<array_summary.length;j++){
  			var days = new Date(array_summary[j].day);
  			array_date.push(days.getDate());
  			array_date_title.push(days.getMonth() + 1 + "/" + days.getDate());
  			array_fan.push(array_summary[j].fan);
  			array_friend_of_fan.push(array_summary[j].friendsoffan);
  			if (array_summary[j].fan!=0)
  				total_fan= array_summary[j].fan;
			//friend_of_fan
  			if (array_summary[j].friendsoffan!=0)
  				friend_of_fan= array_summary[j].friendsoffan;
  			array_reach.push(array_summary[j].reach);
  			//total_reach=total_reach+array_summary[j].reach;
  			array_peopletalking.push(array_summary[j].peopletalking);
  			total_peopletalking=total_peopletalking+array_summary[j].peopletalking;
  			if(array_summary[j].fan!=0){
  				var value_peopletalking =(array_summary[j].peopletalking/array_summary[j].fan)*100;
  				var peopletalking_fan=roundNumber(value_peopletalking,2);
  				array_peopletalking_fan.push(peopletalking_fan);
  				//alert(roundNumber((array_summary[j].peopletalking/array_summary[j].fan)*100,2))

  				total_peopletalking_fan =parseFloat(total_peopletalking_fan)+parseFloat(peopletalking_fan);	
  	  			//alert(total_peopletalking_fan)
  	  		
  			}
  			
  			else if(friends_number!=0){
  				array_peopletalking_fan.push(roundNumber((array_summary[j].peopletalking/friends_number)*100),2);
  	  			total_peopletalking_fan =roundNumber(total_peopletalking_fan,2)+roundNumber((array_summary[j].peopletalking/friends_number)*100,2);			
  			}
		
  				
  		}
			for(var k=0; k<arraylast_summary.length;k++){
				var days = new Date(arraylast_summary[k].day);
      			last_array_date_title.push(days.getMonth() + 1 + "/" + days.getDate());
				array_last_fan.push(arraylast_summary[k].fan);
				array_last_friend_of_fan.push(arraylast_summary[k].friendsoffan);
	  			array_last_reach.push(arraylast_summary[k].reach);
	  			array_last_peopletalking.push(arraylast_summary[k].peopletalking);
	  			last_total_peopletalking=roundNumber((last_total_peopletalking+arraylast_summary[k].peopletalking),2);
	  			if (arraylast_summary[k].fan!=0)
	  				{
	  				last_total_fan= arraylast_summary[k].fan;
	  				array_last_peopletalking_fan.push(roundNumber((arraylast_summary[k].peopletalking/arraylast_summary[k].fan)*100,2));
	  				last_total_peopletalking_fan =roundNumber(last_total_peopletalking_fan,2)+roundNumber((arraylast_summary[k].peopletalking/arraylast_summary[k].fan)*100,2);
	  				}
	  				
	  				if (arraylast_summary[k].friendsoffan!=0)
	  	  				last_friend_of_fan= arraylast_summary[k].friendsoffan;
	  			  			
	  			   if(friends_number!=0){
	  				 array_last_peopletalking_fan.push(roundNumber((arraylast_summary[k].peopletalking/friends_number)*100,2));
	  				 last_total_peopletalking_fan =roundNumber(last_total_peopletalking_fan,2)+roundNumber((arraylast_summary[k].peopletalking/friends_number)*100,2);
	  			   }
	  				
			}
			//new_reach=array_reach[array_reach.lenght-1]-array_reach[array_reach.lenght-2];
			//new_peopletalking=array_peopletalking[array_peopletalking.length-1]-array_peopletalking[array_peopletalking.length-2];
			//new_peopletalking_fan=array_peopletalking_fan[array_peopletalking_fan.length-1]-array_peopletalking_fan[array_peopletalking_fan.length-2];
			if(array_fan.length-1>0)
			new_fan=array_fan[array_fan.length-1]-array_fan[array_fan.length-2];
			if(array_friend_of_fan.length-1>0){
				
				new_friend_of_fan =array_friend_of_fan[array_friend_of_fan.length-1]-array_friend_of_fan[array_friend_of_fan.length-2];
			}
			if(new_friend_of_fan>0)
			$("#new_fan").html(new_friend_of_fan);
			else
				$("#new_fan").html("0");
			if(type=="fan"){
				$("#text-total").html("<span text='totalfan'>Total Fan</span>");
		  		$("#text-new").html("<span text='newfan'>New Fan</span>");
		  		$("#text-growth").html("<span text='growthofrate'>Growth Of Rate</span>");
				array_current=array_fan;
				array_last= array_last_fan;
				if(last_total_fan>0){
					
					growth_of=Math.floor(((total_fan-last_total_fan)/last_total_fan)*100);
					if(growth_of>0){
						
						$("#box-new-fan-plus").show();
				  			$("#box-new-fan-plus").addClass("green");
				  			$("#box-new-fan-plus").removeClass("red");
				  			$("#box-new-fan-plus").html("<i class='icon-plus'></i>");
				  		}else {
				  			
				  			$("#box-new-fan-plus").show();
				  			$("#box-new-fan-plus").addClass("red");
				  			$("#box-new-fan-plus").removeClass("green");
				  			$("#box-new-fan-plus").html("<i class='icon-minus'></i>");
				  		}
					
				}
				else{
					growth_of=0;
		  			$("#box-new-fan-plus").hide();
				}	
				$("#number-total-fb").html(total_fan);
				appendGrowth(growth_of);
				
      			if (new_fan>0){
      				
      				$("#number-total-visiter").html(new_fan);
      			}else{
      				$("#number-total-visiter").html("0");
      				
      			}
			}
			else if(type=="friend of fan"){
				$("#text-total").html("<span text='totalfriend'>Friend of Fan</span>");
		  		$("#text-new").html("<span text='newpeople'>New Friend of Fan</span>");
		  		$("#text-growth").html("<span text='growthofrate'>Growth Of Rate</span>");
				array_current=array_friend_of_fan;
				array_last= array_last_friend_of_fan;
				if(last_friend_of_fan>0)
				growth_of=Math.floor(((friend_of_fan-last_friend_of_fan)/last_friend_of_fan)*100);
				else
					growth_of=0;
				$("#number-total-fb").html(total_fan);
				appendGrowth(growth_of);
				$("#number-total-fb").html(friend_of_fan);
      			if (new_friend_of_fan>0){
      				
      				$("#number-total-visiter").html(new_friend_of_fan);
      			}else{
      				$("#new_fan").html("0");
      				$("#number-total-visiter").html("0");
      			}
			}
			else if(type=="reach"){
				$("#text-total").html("<span text='totalreach'>Total Reach</span>");
		  		$("#text-new").html("<span text='newreach'>New Reach</span>");
		  		$("#text-growth").html("<span text='growthofrate'>Growth Of Rate</span>");
				array_current=array_reach;
				array_last= array_last_reach;	
				$("#number-total-fb").html(total_reach);
				new_reach = total_reach-last_total_reach;
				if(last_total_reach>0)
				growth_of=Math.floor((new_reach/last_total_reach)*100);
				else
					growth_of=0;
				appendGrowth(growth_of);
				
      			if (new_reach>0){
      				$("#number-total-visiter").html(new_reach);
      				
      			}else{
      				$("#number-total-visiter").html("0");
      			}
			}
			else if(type=="people talking")
				
				{
				$("#text-total").html("<span text='totalpeople'>Total People Talking</span>");
		  		$("#text-new").html("<span text='newpeople'>New People Talking</span>");
		  		$("#text-growth").html("<span text='growthofrate'>Growth Of Rate</span>");
				if(last_total_peopletalking>0)
					growth_of=Math.floor(((total_peopletalking-last_total_peopletalking)/last_total_peopletalking)*100);
					else
						growth_of=0;
				appendGrowth(growth_of);
				array_current=array_peopletalking;
				array_last= array_last_peopletalking;
				new_peopletalking=total_peopletalking-last_total_peopletalking;
				$("#number-total-fb").html(total_peopletalking);
      			if (new_peopletalking>0){
      				$("#number-total-visiter").html(new_peopletalking);
      			}else{
      				$("#number-total-visiter").html("0");
      			}
			
				}
			else
				{
				$("#text-total").html("<span text='totalpeople'>Total People Talking</span>");
		  		$("#text-new").html("<span text='newpeople'>New People Talking</span>");
		  		$("#text-growth").html("<span text='growthofrate'>Growth Of Rate</span>");
			//array_last_peopletalking_fan
				array_current=array_peopletalking_fan;
				array_last= array_last_peopletalking_fan;	
			
				//$("#number-total-fb").html(total_peopletalking_fan+"%");
				if(last_total_peopletalking_fan>0)
					growth_of=Math.floor(((total_peopletalking_fan-last_total_peopletalking_fan)/last_total_peopletalking_fan)*100);
					else
						growth_of=0;
					$("#number-total-fb").html(roundNumber(total_peopletalking_fan,2)+"%");
					appendGrowth(growth_of);
					new_peopletalking_fan=	total_peopletalking_fan-last_total_peopletalking_fan;
      			if (new_peopletalking_fan>0){
      				$("#number-total-visiter").html(roundNumber(new_peopletalking_fan,2));
      			}else{
      				$("#number-total-visiter").html("0");
      			}
				
				}
  		info = new Highcharts.Chart({
  			chart: {
                type: 'area',
                renderTo: 'xchart-sine',
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
                tickmarkPlacement: 'on'
                
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
                }
            },
            series: [{
                name: type + " (" + last_array_date_title[0] + "-" +last_array_date_title[last_array_date_title.length-1] + ")",
                color: '#3880AA',
                data: formatDayRange(array_last)
            },
            {
                name: type + " (" + array_date_title[0] + "-" +array_date_title[array_date_title.length-1] + ")",
                color: '#4DA944',
                data: formatDayRange(array_current)
            }
            ]
  		});
  		
  	}
  	function peopletalkingSummaryPage(page_id_post,token_page,newDateFrom,newDateTo){
  		FB.api('/'+page_id_post+'/insights/page_storytellers?since='+newDateFrom+'&until='+newDateTo+'',{access_token:token_page}, function(response) {
  			
  			if (!isNull(response.data)){
  				 var obj = ($.map(response.data[0].values, function(item) {
  		            return {
  		               end_time: item.end_time,
  		              peopletalking: item.value
  		            };
  		        }));
  				for(var i=0;i<obj.length;i++){
  		  			var date_post = new Date(obj[i].end_time);
  		  			date_post = (date_post.getMonth() + 1) +"/"+ date_post.getDate()+ "/" +date_post.getFullYear();
  		  			for(var j=0; j<array_summary.length;j++){
  		  				if(array_summary[j].day==date_post){
  		  					if(i-1>0)
  		  				array_summary[j].peopletalking=obj[i-1].peopletalking;
  		  				}
  		  				
  		  			}
  		  			for(var k=0; k<arraylast_summary.length;k++){
  		  				if(arraylast_summary[k].day==date_post)
  		  				arraylast_summary[k].peopletalking=obj[i].peopletalking;
  		  			}
  			}
  				
  			}
  			
  		});
  		
  	}
  	function reachSummaryPage(page_id_post,token_page,newDateFrom,newDateTo){
  		total_reach=0;
  		last_total_reach=0;
  		FB.api('/'+page_id_post+'/insights/page_impressions_unique?since='+newDateFrom+'&until='+newDateTo+'',{access_token:token_page}, function(response) {
  			
  			if (!isNull(response.data)){
  				 var obj = ($.map(response.data[0].values, function(item) {
  		            return {
  		               end_time: item.end_time,
  		               reach: item.value
  		            };
  		        }));
  			    var obj_reach_week =($.map(response.data[1].values, function(item) {
  		            return {
   		               end_time: item.end_time,
   		               reach: item.value
   		            };
   		        }));
  				for(var i=0;i<obj.length;i++){
  		  			var date_post = new Date(obj[i].end_time);
  		  			date_post = (date_post.getMonth() + 1) +"/"+ date_post.getDate()+ "/" +date_post.getFullYear();
  		  			for(var j=0; j<array_summary.length;j++){
  		  				if(array_summary[j].day==date_post)
  		  				array_summary[j].reach=obj[i].reach;
  		  			  
  		  			}
  		  		 //var last_r=i-1;
  		  		 if(i-1>0)
  		  		 total_reach= obj_reach_week[i-1].reach;
  		  			for(var k=0; k<arraylast_summary.length;k++){
  		  				if(arraylast_summary[k].day==date_post)
  		  				arraylast_summary[k].reach=obj[i].reach;
  		  			 if(k-1>0){
  	  		  			last_total_reach=obj_reach_week[k-1].reach ;
  	  		  			
  	  		  		 }
  		  			}
  			}
  				
  				
  			}
  			drawSumaryChart("fan");
  			
  		});
  		
  	}
  	function getFriendsSummary(DateFrom,DateTo,channel_detail_id,type){
  		var dataString =[];
		 dataString.push({
       name: "channel_detail_id", 
       value: channel_detail_id
   });
   dataString.push({
       name: "DateFrom", 
       value: DateFrom
   });
   dataString.push({
       name: "DateTo", 
       value: DateTo
   });  
   dataString.push({
       name: "user_id", 
       value: user_id
   }); 
   dataString.push({
       name: "Action", 
       value: "getfb"
   }); 
   dataString.push({
       name: "type", 
       value: type
   }); 
	$.ajax({
		 type:'GET',
		  url : '../AdminAnalysisReport.do',
		  dataType: 'json',
		  data: dataString,
		  success : function(source) {
			  var friends;
				  for(var i=0; i<source.length;i++){
					  var date=source[i].day;
					  date =date.substring(0,10);
					 // var follower= source[i].follower; 
					  var friends= source[i].following; 
					 for(var j=0;j<array_summary.length;j++){
						 if(array_summary[j].day==date){
							 array_summary[j].fan=friends;
							 array_summary[j].friendsoffan=source[i].friendsoffan;
						 }
					 }
					 for(var k=0;j<arraylast_summary.length;k++){
						 if(arraylast_summary[k].day==date){
							 arraylast_summary[k].fan=friends;
							 arraylast_summary[k].friendsoffan=source[i].friendsoffan;
						 }
					 }
				  }
				 
				  drawSumaryChart("fan");  
		  }
	});
  	}
  
  	function appendGrowth(growth_of)
  	{
  		if(growth_of>0)
		{
		$("#number_growth_of_rate").html(growth_of+"%"+"<i class='icon-caret-up green'></i>");
		}
	else if(growth_of<0)
		{
		growth_of=(-1)*growth_of;
		$("#number_growth_of_rate").html(growth_of+"%"+"<i class=' icon-caret-down red'></i>");
		}
	else
		{
		$("#number_growth_of_rate").html(growth_of+"%");
		}
  	}
  	
  	function getTopPost(response,newDateFrom,newDateTo,channel_detail_id,pchannel_detail_id,type_fb,token){
	   	var htmlGeneral;
	   	var time_post;
 		var total_fans=0;
 		var day = Math.round((newDateTo - newDateFrom)/60/60/24);
 		var lastDateTo = newDateFrom - (24 * 60 * 60);
 		var lastDateFrom = lastDateTo - (day * 24 * 60 * 60);
 		
 		var dateFrom = new Date((newDateFrom - (24 * 60 * 60)) * 1000);
			var date1= (dateFrom.getMonth() + 1) + "/" + dateFrom.getDate() + "/" + dateFrom.getFullYear();
			var dateTo = new Date((newDateTo - (48 * 60 * 60)) * 1000);
			var date2= (dateTo.getMonth() + 1) + "/" + dateTo.getDate() + "/" + dateTo.getFullYear();
 		if (type_fb == "feed"){
 			total_fans = fans_number;
	  	}else{
	  		total_fans = friends_number;
	  	}
 		for (var i=0;i<response.length;i++){
 			var post_id;
 	  		var title;
 	  		var string;
 	  		var like_num = 0;
 	  		var comment_num = 0;
 	  		var share_num = 0;
 	  		var comment_like_num = 0;
 	  		var total = 0;
 	  		var count = 0;
 	  		var engagement = 0;
 	  		var spread = 0;
 	  		var brand_royalty = 0;
 	  		//var source_id;
 	  		
 	  		time_post = response[i].created_time;
 			//if (!isNull(response[i].message)) {
 				
 				if ((lastDateFrom<=time_post)&&(time_post<=newDateTo)){
 					this.source_id = response[i].source_id;
 					var user_id=this['source_id'];
 					post_id = response[i].post_id;
 					total_post++;
 	  				comment_num = response[i].comment_info.comment_count;
 	  				share_num= response[i].share_count;
 	  				like_num = response[i].like_info.like_count;
 	  				title = response[i].message;
 	  				title = htmlEscape(title);
 	  				if (title.length > 60){
 	  					string = title.substring(0,60) + "...";
 	  				}else{
 	  					string = title;
 	  				}
	  	  			total = roundNumber(comment_num,2) + roundNumber(share_num,2) + roundNumber(like_num,2) + roundNumber(comment_like_num,2);
	  	  			
	  	  			spread = total;
	  	  			brand_royalty = roundNumber(share_num,2) + roundNumber(comment_num,2);
	  	  			
	  	  			//var tweet_day_total = 0;
	  	  			like_total = roundNumber(like_total,2) + roundNumber(like_num,2);
	  	  			comment_total = roundNumber(comment_total,2) + roundNumber(comment_num,2);
	  	  			share_total = roundNumber(share_total,2) + roundNumber(share_num,2);
	  	  			comment_like_total = roundNumber(comment_like_total,2) + roundNumber(comment_like_num,2);
 		  			var date_post = new Date(time_post * 1000);
 		  			date_post = (date_post.getMonth() + 1) +"/"+ date_post.getDate()+ "/" +date_post.getFullYear();
 		  			
 	  				for (var k=0; k<obj.length;k++){
 			    			if (obj[k].day == date_post){
 			    				obj[k].content = roundNumber(obj[k].content,2) + 1;
 			    				obj[k].like = roundNumber(obj[k].like,2) + roundNumber(like_num,2);
 			    				obj[k].share = roundNumber(obj[k].share,2) + roundNumber(share_num,2);
 			    				obj[k].comment = roundNumber(obj[k].comment,2) +  roundNumber(comment_num,2);
 			    				//obj[k].likeofcomment = parseInt(obj[k].likeofcomment) + parseInt(comment_like_num);
 			    				obj[k].engagement = roundNumber(obj[k].engagement,2) + roundNumber(total,2);
 			    				obj[k].activity = roundNumber(obj[k].activity,2) + roundNumber(total,2);
 			    				obj[k].spread = roundNumber(obj[k].spread,2) + roundNumber(spread,2);
 			    				obj[k].brand_royalty = roundNumber(obj[k].brand_royalty,2) + roundNumber(brand_royalty,2);
 			    			//array of summary
 			    				array_summary[k].peopletalking = total;
 			    				array_summary[k].reach = total;
 			    			}
 			    		}
	  	  			for (var l=0; l<last_obj.length;l++){
		  	  			if (last_obj[l].day == date_post){
			  	  			last_obj[l].content = roundNumber(last_obj[l].content,2) + 1;
			  				last_obj[l].like = roundNumber(last_obj[l].like,2) + roundNumber(like_num,2);
			  				last_obj[l].share = roundNumber(last_obj[l].share,2) + roundNumber(share_num,2);
			  				last_obj[l].comment = roundNumber(last_obj[l].comment,2) + roundNumber(comment_num,2);
			  				last_obj[l].likeofcomment = roundNumber(last_obj[l].likeofcomment,2) + roundNumber(comment_like_num,2);
			  				arraylast_summary[l].peopletalking = total;
			  				arraylast_summary[l].reach = total;
		  	  			}
		  	  			
		    		}
		  	  		
 	  		}
 		}
 		
 		if ((lastDateFrom <= time_post)&&(time_post<=newDateTo)){
 			if (total_post<=1000){
 				if ((newDateFrom<=time_post)&&(time_post<=newDateTo)){
 	  				getReportFbMore(channel_detail_id,pchannel_detail_id,token,type_fb,time_post);
 	  			}else{
 	  				
	  	  	  		//object_report_fb.content_top20=array_content_top_20_export;
 	  				getEngagementFb(type_fb);
	  		  	  		$("#analysis_facebook .content_right .block_content").css("opacity","1");
	  					$("#analysis_facebook .itemLoading").hide();
 	  			}
 			}else{
 				
 				aoFrm.mess("alert",mess.report_exceed);
 		  		//object_report_fb.content_top20=array_content_top_20_export;	
 				getEngagementFb(type_fb);
	  		  		$("#analysis_facebook .content_right .block_content").css("opacity","1");
					$("#analysis_facebook .itemLoading").hide();
 			}
 			
 		}else{
	  			//object_report_fb.content_top20=array_content_top_20_export;	
 			getEngagementFb(type_fb);
	  			$("#analysis_facebook .content_right .block_content").css("opacity","1");
				$("#analysis_facebook .itemLoading").hide();
 		}
	
     }
  	
function getReportFbMore(channel_detail_id,pchannel_detail_id,token,type_fb,time_post){
    	var stringDate = $("#analysis_facebook #dashboard_range").val();
  		var newString = stringDate.split("to");
  		var stringFrom = newString[0];
  		var stringTo = newString[1];

  		//date for facebook: plus 1 day
  		var newStringFrom = new Date(stringFrom);
  		var newStringTo = new Date(stringTo);
  		var dateFrom = new Date(newStringFrom);
  		var dateTo = new Date(newStringTo);
  		var newDateFrom = toTimestamp(dateFrom) + (24 * 60 * 60);
  		var newDateTo = toTimestamp(dateTo) + (24 * 60 * 60) ;
  		var query = "";
  			if (type_fb=="feed"){
  				query = 'SELECT source_id, post_id ,created_time, message,share_count,like_info,comment_info FROM stream WHERE message <> "" and source_id = '+channel_detail_id+' and created_time < '+time_post+' limit 200' ;
  				
  			}else{
  				query = 'SELECT source_id, post_id ,created_time, message,share_count,like_info,comment_info FROM stream WHERE message <> "" and filter_key in (SELECT filter_key FROM stream_filter WHERE uid = "'+channel_detail_id+'" and type = "newsfeed") and created_time < '+time_post+' limit 200';
  			}
			FB.api({method: 'fql.query',
		        query: query,access_token:token
		      },function(response) {
					getTopPost(response,newDateFrom,newDateTo,channel_detail_id,pchannel_detail_id,type_fb,token);
  	  		      });
      }
function getEngagementFb(type_fb){
	
		var engagement = 0;
		var brand_royalty = 0;
		var activity = 0;
		var engagementRate = 0;
		var spread = 0;
		var total_friends = 0;
		if (type_fb == "feed"){
			total_friends = fans_number;
  	}else{
  		total_friends = friends_number;
  	}
    for (var i = 0; i<obj.length;i++){
    	var engagementDate = 0;
    	var brand_royalty_date = 0;
    	var engagementRateDate = 0;
    	if (total_friends==0||total_post==0){
    		engagementDate = 0;
    		engagementRateDate = 0;
    		brand_royalty_date = 0;
    	}else{
    		engagementDate = roundNumber(((obj[i].engagement/total_post)/total_friends),2);
    		//engagementDate = Math.floor(engagementDate*100)/100;
    		engagementRateDate = roundNumber((engagementDate/total_friends)*100,2);
    		//engagementRateDate = Math.floor(engagementRateDate*100)/100;
    		brand_royalty_date = ((obj[i].brand_royalty/total_post));
    		brand_royalty_date = Math.floor(brand_royalty_date*100)/100;
    	}
    	
    	obj[i].engagement = engagementDate;
    	obj[i].brand_royalty = brand_royalty_date;
    	obj[i].engagementRate = engagementRateDate;
    	engagement = roundNumber(engagement,2) + roundNumber(obj[i].engagement,2);
    	engagement = roundNumber(engagement,2);
    	engagementRate = roundNumber(engagementRate,2) + roundNumber(obj[i].engagementRate,2);
    	engagementRate = roundNumber(engagementRate,2);
    	spread = roundNumber(spread,2) + roundNumber(obj[i].spread,2);
    	brand_royalty = roundNumber(brand_royalty,2) + roundNumber(obj[i].brand_royalty,2);
    	brand_royalty = roundNumber(brand_royalty,2);
    	
    		///////////////////////
			var obj_summary_fb= new Object();
			var peopletalking=	roundNumber(obj[i].like,2)+ roundNumber(obj[i].share,2)+ roundNumber(obj[i].comment,2)+ roundNumber(obj[i].likeofcomment,2);
			obj_summary_fb.date=obj[i].day;
			obj_summary_fb.fan=array_summary[i].fan;//array_summary[j].fan
			if(i>1){
				obj_summary_fb.newfan=array_summary[i].fan-array_summary[i-1].fan;	
			}
			else
				{
				obj_summary_fb.newfan=array_summary[i].fan;
				}
			
			obj_summary_fb.friendsoffan=array_summary[i].friendsoffan;
			obj_summary_fb.reach=peopletalking;
			obj_summary_fb.peopletalking=peopletalking;
			obj_summary_fb.peopletalkinggrowth=roundNumber((peopletalking/total_friends)*100,2);
			obj_summary_fb.engagement=engagement;
			obj_summary_fb.activity=peopletalking;
			obj_summary_fb.engagementRate=obj[i].engagementRate;
			obj_summary_fb.brandroyalty=brand_royalty_date;
			obj_summary_fb.content=obj[i].content;
			obj_summary_fb.like=obj[i].like;
			obj_summary_fb.share=obj[i].share;
			obj_summary_fb.comment=obj[i].comment;
			obj_summary_fb.likeofcomment=obj[i].likeofcomment;
			array_summary_export.push(obj_summary_fb);
    }
    object_report_fb.content_summary =array_summary_export;
    //$("#engagement_num").html(engagement + "%");
   // $("#activity_num").html(spread);
  //  $("#engagement_rate_num").html(engagementRate + "%");
  //  $("#brand_royalty_num").html(brand_royalty + "%");
	}
function selectFqlComment(channel_detail_id, token,type_fb,newDateFrom,newDateTo){
		var query="";
		var day = Math.round((newDateTo - newDateFrom)/60/60/24);
		var lastDateTo = newDateFrom - (24 * 60 * 60);
		var lastDateFrom = lastDateTo - (day * 24 * 60 * 60);
		if (type_fb=="feed"){
			query="select time, post_id,likes from comment where  post_id in (SELECT post_id  FROM stream WHERE  source_id = '"+channel_detail_id+"'  limit 200)";
		}
		else
			{
			query= "select time, post_id,likes from comment where  post_id in (SELECT post_id  FROM stream WHERE filter_key in (SELECT filter_key FROM stream_filter WHERE uid = '"+channel_detail_id+"' and type = 'newsfeed')  limit 200)";
			}

	  FB.api({method: 'fql.query',
	        query: query,access_token:token
	      },function(response) {
	    	 
	    	  getTopLikeofComment(response,newDateFrom,newDateTo,token,type_fb,channel_detail_id);
	    	 
	      }
	);
	}
	function getLikeofCommentMore(channel_detail_id,token,type_fb,time_comment,newDateFrom,newDateTo){
		var query="";
		
		if (type_fb=="feed"){
			query="select time, post_id,likes from comment where  post_id in (SELECT post_id  FROM stream WHERE  source_id = '"+channel_detail_id+"'   limit 200) and time<'"+time_comment+"'";
		}
		else
			{
			query= "select time, post_id,likes from comment where  post_id in (SELECT post_id  FROM stream WHERE filter_key in (SELECT filter_key FROM stream_filter WHERE uid = '"+channel_detail_id+"' and type = 'newsfeed')   limit 200) and time < '"+time_comment+"'";
			}
		
	  FB.api({method: 'fql.query',
	        query: query,access_token:token
	      },function(response) {
	    	 
	    	  getTopLikeofComment(response,newDateFrom,newDateTo,token,type_fb,channel_detail_id);
	    	 
	      }
	);
	}
	function getTopLikeofComment(response,newDateFrom,newDateTo,token,type_fb,channel_detail_id){
		 var time_comment;
		var day = Math.round((newDateTo - newDateFrom)/60/60/24);
		var lastDateTo = newDateFrom - (24 * 60 * 60);
		var lastDateFrom = lastDateTo - (day * 24 * 60 * 60);
	  for(var i=0; i<response.length;i++){
		  time_comment=response[i].time;
		  var date_post = new Date(time_comment * 1000);
  			date_post = (date_post.getMonth() + 1) +"/"+ date_post.getDate()+ "/" +date_post.getFullYear();
  			if ((lastDateFrom<=time_comment)&&(time_comment<=newDateTo)){
  				for (var k=0; k<obj.length;k++){
	    			if (obj[k].day == date_post){
	    				obj[k].comment = parseInt(obj[k].comment) + 1;
	    				obj[k].likeofcomment = parseInt(obj[k].likeofcomment) + parseInt(response[i].likes);
	    			}
				} 
				for (var j=0; j<last_obj.length;j++){
    			if (last_obj[j].day == date_post){
    				last_obj[j].comment = parseInt(last_obj[j].comment) + 1;
    				last_obj[j].likeofcomment = parseInt(last_obj[j].likeofcomment) + parseInt(response[i].likes);
    			}
			} 
  			}
				
	  }
	if ((lastDateFrom<=time_comment)&&(time_comment<=newDateTo)){
		if ((newDateFrom<=time_comment)&&(time_comment<=newDateTo)){
			
			getLikeofCommentMore(channel_detail_id,token,type_fb,time_comment,newDateFrom,newDateTo);
		}
	}
	}
function exportCsvFacebook(){
	var str = ''+''+JSON.stringify(object_report_fb)+''+'';
	$("#exportContent_Analysis").val(str);
	$("#exportForm_Analysis").submit();	
}
  	
