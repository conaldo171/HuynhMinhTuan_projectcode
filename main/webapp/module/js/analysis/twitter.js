/***************************************************************************
 Page Code:	analysis/twitter
 First Author:
 Created Date: 
 **************************************************************************/

  var total_fans = 0;
var arr = new Array();
var date = new Date();
var obj = new Array();
var object_summary_chart = new Object();
var object_content_chart = new Object();
var object_content_engagement= new Object();
var object_report = new Object();
var obj_follower = new Array();
var post_reply_tweet= new Object();
var array_follower = new Array();
var array_following = new Array();
var array_reach = new Array();
var array_top20 = new Array();
var arary_summary_engament= new Array();
var arary_summary_engament_export_chart=new Array();
var last_obj = new Array();
	var currentDate = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
	var lastDate = new Date();
	var days = 7;
	var res = date.setTime(date.getTime() - (days * 24 * 60 * 60 * 1000));		
	var lastDate = new Date(res);
	var newDate = (lastDate.getMonth() + 1) + "/" + lastDate.getDate() + "/" + lastDate.getFullYear();
	$("#analysis_twitter #dashboard_range_three").val(newDate +" to " + currentDate);
	$("#analysis_twitter #dashboard_range_two").val(newDate +" to " + currentDate);
	$('#analysis_twitter #dashboard_range_three').daterangepicker({opens: 'left',
        format: 'MM/dd/yyyy',
        separator: ' to ',
        startDate: Date.today().add({
            days: -7
        }),
        endDate: Date.today(),
        minDate: Date.today().add({
            days: -90
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
	
	$('#analysis_twitter #dashboard_range_two').daterangepicker({opens: 'left',
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
	
	setTimeout(function(){
		var load_option = $("#analysis_twitter .content_right").attr("load_option");
		
		if (load_option==1){
			$("#calendar_three").show();
			$("#calendar_two").hide();
		}else{
			$("#calendar_three").hide();
			$("#calendar_two").show();
		}
	},1000);
var count = 0;
$(document).ready(function() {
	checkExprired();
	aoFrm.setLang("#aoFrm-content","analysis/twitter");
	object_report.title_summary={date:"Date",followers:"Followers",newfollowers:"New Followers",following:"Following",reach:"Reach",engagement:"Engagement",brandroyalty:"Brand Royalty",activity:"Activity",spread:"Spreach",tweets:"Tweets",retweets:"Retweets",mentions:"Mentions",comment:"Comment",favorite:"Favorite" };
	object_report.title_top20={date:"Date",no:"No",title:"Title",engagement:"Engagement",mention:"Mentions",retweet:"Retwwet",comment:"Comment",favorite:"Favorite"};
	var token;
	$("#contents .action-nav-button a").click(function(){
		var type = $(this).attr("type");
		
		$("#contents .action-nav-button a").removeClass("active");
		
		$(this).addClass("active");
		contentChart(type);
		
	});
	$("#summary .action-nav-button a").click(function(){
		var type = $(this).attr("type");
		
		$("#summary .action-nav-button a").removeClass("active");
		
		$(this).addClass("active");
		summaryChart(type);
		
	});
	$("#engagement .list-action a").click(function(){
		var type = $(this).attr("type");
		$("#engagement .list-action a").removeClass("active");
		$(this).addClass("active");
		engagementChart(obj,type);
	});
	$("#save_data_tw").click(function(){
		$("#calendar_three").show();
		$("#calendar_two").hide();
		$("#reltime_tw").empty();
		var access_token = $("#analysis_twitter .content_right").attr("access_token");
		var channel_detail_id = $("#analysis_twitter .content_right").attr("id");
		var token = access_token.split("_");
		//alert(channel_detail_id)
		updateLoadData(channel_detail_id,1);
		$("#reltime_tw").append("Saved data");
		getTwStream(token[0],token[1],channel_detail_id,1);
	});
	$("#real_time_tw").click(function(){
		$("#calendar_three").hide();
		$("#calendar_two").show();
		$("#reltime_tw").empty();
		var access_token = $("#analysis_twitter .content_right").attr("access_token");
		var channel_detail_id = $("#analysis_twitter .content_right").attr("id");
		var token = access_token.split("_");
		updateLoadData(channel_detail_id,0);
		$("#reltime_tw").append("Real time data");
		getReportTw(token[0],token[1],channel_detail_id,0);
	});
	$.ajax({
		  url : 'GetChannelDetail.do',
		  dataType: 'json',
		  success : function(source) {
			  $("#list-twitter").empty();
			  	//var pchannel_id;
				for(var i=0; i<source.length;i++){
					if(source[i].channel_id=="3"){
						var html='<li id="'+source[i].channel_detail_id+'" load_option="'+source[i].load_option+'" pchannel_detail_id="'+source[i].pchannel_id+'" access-token="'+source[i].token_user+'"><a href="javascript:void(0)"><i class="icon-twitter-sign"></i><span style="margin-left:5px" title="'+source[i].channel_user+'" >'+source[i].channel_user+'</span></a></li>';
						  $("#list-twitter").append(html);
					}
					
				}
				checkEmptyChannelAnalysis("#box_channel_twitter_analysis");
				////var channel_detail_id = $("#analysis_twitter #list-twitter li:first").attr("id");
				//var access_token = $("#analysis_twitter #list-twitter li:first").attr("access-token");
				//token = access_token.split("_");
				//$("#analysis_twitter #list-twitter li:first").addClass("active");
				//var name = $("#analysis_twitter #list-twitter li:first a span").attr("title");
				//$("#analysis_twitter .block-title .left-title span.name").text(name);
				//$("#analysis_twitter .content_right").attr("id",channel_detail_id);
				//$("#analysis_twitter .content_right").attr("access_token",access_token);
				
				//var channel_detail_id = $("#analysis_twitter #list-twitter li:first").attr("pchannel_detail_id");
				//getReportTw(token[0],token[1],channel_detail_id);
				$("#analysis_twitter #list-twitter li").click(function(){
					$("#reltime_tw").empty();
					$("#analysis_twitter .list-action li a").removeClass("active");
					$("#analysis_twitter .list-action li:first a").addClass("active");
					$("#analysis_twitter #list-twitter li").removeClass("active");
					$(this).addClass("active");
					$("#analysis_twitter .block-title .left-title span.name").text($(this).children("a").children("span").attr("title"));
					var id = $(this).attr("id");
					var access_token = $(this).attr("access-token");
					var token = access_token.split("_");
					var channel_detail_id = $(this).attr("pchannel_detail_id");
					var load_option=$(this).attr("load_option");
					$("#analysis_twitter .content_right").attr("id",id);
					$("#analysis_twitter .content_right").attr("load_option",load_option);
					$("#analysis_twitter .content_right").attr("access_token",access_token);
					//getLastContent(token[0],token[1],channel_detail_id);
					if(load_option==1){
						$("#reltime_tw").append("Saved data");
						getTwStream(token[0],token[1],channel_detail_id,load_option);
					}
					else
						{
						$("#reltime_tw").append("Real time data");
						getReportTw(token[0],token[1],channel_detail_id,load_option);
						}
					
					
				});
				var channel_detail_id = $("#analysis_twitter #list-twitter li:first").attr("pchannel_detail_id");
				if (!isNull(channel_detail_id))
				{
				$("#analysis_twitter #list-twitter li:first").click();
				}
			}
	  });
});

$(".range_inputs .btn").click(function(){
	setTimeout(function(){
		var access_token = $("#analysis_twitter .content_right").attr("access_token");
		var channel_detail_id = $("#analysis_twitter .content_right").attr("id");
		var token = access_token.split("_");
		var load_option=$("#analysis_twitter .content_right").attr("load_option");
		if(load_option==1){
			getTwStream(token[0],token[1],channel_detail_id,1);
		}
		else
			{
			getReportTw(token[0],token[1],channel_detail_id,0);
			}
		
		//getLastContent(token[0],token[1],channel_detail_id);
	},100);
});

/*** Gray theme for Highcharts JS ***/

function chartResize()
{
	
	_dw = $(window).innerWidth();
	_bw = $("#analysis_twitter .demographic").innerWidth();
	if(_dw < 768)
	{
		console.log("small size " + _dw);
		_h = 150;
		if(_dw < 440)
		{
			_h = _dw;
		}
	}else
	{
		console.log("large size " + _dw);
		_h = _bw/4 + 15;
	}	
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
     function getReportTw(token,token_secret,id,load_option){
    	 try{
    		 $("#analysis_twitter .content_right").css("opacity","0.3");
    	 		$("#analysis_twitter .itemLoading").show();
    	 		
    	    	 last_obj=[];
    	    	 obj=[];
    	    	 obj_follower=[];
    	    	 total_fans=0;
    	    	 array_top20=[];
    	    	 object_content_chart={};
    	    	  object_content_engagement= {};

    	    	 object_summary_chart={};
    	    	 arary_summary_engament=[];
    	    	 arary_summary_engament_export_chart=[];
    	    	 var load_option = $("#analysis_twitter .content_right").attr("load_option");
    				
    			  	if (load_option==0){
    			  		
    			  		var stringDate = $("#analysis_twitter #dashboard_range_two").val();
    			  	}else{
    			  		var stringDate = $("#analysis_twitter #dashboard_range_three").val();
    			  	}
    	    	  
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
    	  		var tweet_number = 0;
    	  		var favorite_number = 0;
    	  		var reply_number = 0;
    	  		var reply_favorite_number = 0;
    	  		var retweet_number = 0;
    	  		var follower_number = 0;
    	  		var engagement = 0;
    	  		var active = 0;
    	  		//obj_follower
    	  		while (prevDate < newDateTo - (24 * 60 * 60)) {
    	  			prevDate = prevDate + (24 * 60 * 60);
    	  			var dateFrom = new Date(prevDate * 1000);
    	  	        obj.push({"day": (dateFrom.getMonth() + 1) + "/" + dateFrom.getDate() + "/" + dateFrom.getFullYear(),"engagement": 0,"brand_royalty":0,"activity":0,"spread":0,"tweet":0,"retweet":0,"mention":0,"comment":0,"favorite":0});
    	  	      var month = dateFrom.getMonth() + 1;
    				var date =dateFrom.getDate();
    				if(month<10)
    					month="0"+month;
    				if(date<10)
    					date="0"+date;
    				obj_follower.push({"day": month  + "/" + date + "/" + dateFrom.getFullYear(),"follower":0,"following":0,"reach":0});
    	  		}
    	  		var day = Math.round((newDateTo - newDateFrom)/60/60/24);
    	  		var lastDateTo = newDateFrom;
    	  		var lastDateFrom = lastDateTo - (day * 24 * 60 * 60);
    	  		var lastPrevDate = lastDateFrom;
    	  			while (lastPrevDate < lastDateTo - (24 * 60 * 60)) {
    	  				lastPrevDate = lastPrevDate + (24 * 60 * 60);
    	  				var dateFrom = new Date(lastPrevDate * 1000);
    	  		        last_obj.push({"last_day": (dateFrom.getMonth() + 1) + "/" + dateFrom.getDate() + "/" + dateFrom.getFullYear(),"tweet":0,"retweet":0,"mention":0,"comment":0,"favorite":0});
    	  		    }
    	  			getFollower_following(stringFrom,stringTo,id);
    	  		cb.setToken(token,token_secret);
    	  		cb.__call(
    				    "friends_ids",
    				    function (reply) {
    				    	if(!isNull(reply.errors)){
    				    		$("#analysis_twitter .itemLoading").hide();
    				    		 $("#analysis_twitter .content_right").append("<div id='div_error_twitter' style='width:100%; height:100%;position:absolute;z-index:9999;top:0'></div>")
    				    		showErrorTwitter(reply);
    				    	}
    				    	else
    				    		{
    				    		aoFrm.mess("close");
    				    		$("#div_error_twitter").remove();
    				    		total_fans = reply.ids.length;
        				    	getHomeTimeline(token,token_secret,stringFrom,stringTo,load_option);
    				    		}
    				    	
    				    }
    				    );
    	 }catch (e) {
    		 $("#analysis_twitter .content_right").css("opacity","1");
 	 		$("#analysis_twitter .itemLoading").hide();
		}
    	 
  		
      }
     function getHomeTimeline(token,token_secret,newDateFrom,newDateTo,load_option){
    	
    		var newData = [];
    		newData.push({
    	        name: "token", 
    	        value: token
    	    });
    		
    		newData.push({
    	        name: "token_secret", 
    	        value: token_secret
    	    });    
    		newData.push({
    	        name: "DateFrom", 
    	        value: newDateFrom
    	    });
    		
    		newData.push({
    	        name: "DateTo", 
    	        value: newDateTo
    	    }); 
    		newData.push({
    	        name: "Action", 
    	        value: "top"
    	    }); 
    	 $.ajax({
   		  url : 'AnalysisReport.do',
   		  dataType: 'json',
   		  data:newData,
   		  success : function(source) {
   			getTopTweet(token,token_secret,source,newDateFrom,newDateTo,load_option);
   			
   		  }
    	 });
     }
      function getTopTweet(token,token_secret,reply,DateFrom,DateTo,load_option){
    	  arr=[];
  		$("#analysis_twitter #block-top tbody").empty();
  		 var favorite_total = 0;
 		 var reply_total =0;
 		 var mention_total = 0;
 		 var retweet_total = 0;
 		 var tweet_total = 0;
 		
  		var title;
  		var string;
  		var htmlGeneral;
  		var retweet_tweet = 0;
  		var id_tweet;
  		var favorite_tweet = 0;
  		
  		var count=0;
  		var total = 0;
  		var mention_tweet = 0;
  		var reply_status;
  		var create_date;
  		var reply_tweet = 0;
  		var dateFrom = new Date(DateFrom);
  		var dateTo = new Date(DateTo);
  		var newDateFrom = toTimestamp(dateFrom);
  		//var prevDate = newDateFrom - (24 * 60 * 60);
  		var newDateTo = toTimestamp(dateTo) + (24 * 60 * 60);
  		
  		var day = Math.round((newDateTo - newDateFrom)/60/60/24);
		var lastDateTo = newDateFrom - (24 * 60 * 60);
		var lastDateFrom = lastDateTo - (day * 24 * 60 * 60);
  		var paging=1;
  		
  		for (var i=0;i<reply.length;i++){
  			var reply_tweet=0;
  			var date = reply[i].created_at;
  			if(load_option==1){
  				
  				date = reply[i].created_at;
  				create_date=date;
  				
  			}
  			else
  				{

  				//date =date.replace("ICT","+0000");
  	      		create_date = date/1000;
  				}
      		if ( lastDateFrom <= create_date && create_date <= newDateTo){
      		
  	    		reply_status = reply[i].in_reply_to_status_id;
  	    		paging= reply[i].paging;
      			if (reply_status=="-1"){
      				id_tweet = reply[i].id;
      				reply_tweet=0;
      				favorite_tweet = reply[i].favorite_count;
  		    		retweet_tweet = reply[i].retweet_count;
  		    		title = reply[i].text;
  		    		if (title.length > 60){
  						string = title.substring(0,60) + "...";
  					}else{
  						string = title;
  					}
  		    		
  		    		if (!isNull(reply[i].user_mentions)){
  		    		
  		    			mention_tweet = reply[i].user_mentions.length;
  		    		}
  		    		tweet_total++;
  		    		favorite_total = favorite_total + favorite_tweet;
  		    		retweet_total = retweet_total + retweet_tweet;
  		    		reply_total = reply_total + reply_tweet;
  		    		mention_total = mention_total + mention_tweet;
  		    		
  		    		if ( newDateFrom <= create_date && create_date <= newDateTo){
  		    			var url_tweet = "https://twitter.com/"+reply[i].user_tweet_name+"/status/"+id;
  		    			total = mention_tweet + retweet_tweet + reply_tweet + favorite_tweet;
  	  		    		htmlGeneral = '<td id="'+ id_tweet +'" class="story" title="'+title+'"><a href="'+url_tweet+'" target="_blank">'+string+'</a></td><td>'+mention_tweet+'</td><td>'+retweet_tweet+'</td><td id="reply_'+id_tweet+'">0</td><td>'+favorite_tweet+'</td></tr>';
  	      				arr.push({"total":total,"html":htmlGeneral,"id_tweet":id_tweet,"mention_tweet":mention_tweet,"retweet_tweet":retweet_tweet,"reply_tweet":0,"favorite_tweet":favorite_tweet,"title":string});
  		    		}
  		    		
  		    	}
      			else
      				{
      				reply_tweet=1
      				}
      			
      				this.reply_status= reply_status;
      				var reply_status=this['reply_status'];
    		  		   if(isNull(post_reply_tweet[reply_status])){
    		  			   
    						post_reply_tweet[reply_status] =1;
      		              }
    		  		   else
    		  			   {
    		  			 post_reply_tweet[reply_status]= parseInt( post_reply_tweet[reply_status])+1
    		  			   }
       			var date_post = new Date(create_date * 1000);
      			date_post = (date_post.getMonth() + 1) +"/"+ date_post.getDate()+ "/" +date_post.getFullYear();
		    		
		    		for (var k=0; k<obj.length;k++){
		    			if (obj[k].day == date_post){
		    				obj[k].engagement = parseInt(obj[k].engagement) + total;
		    				obj[k].brand_royalty = parseInt(obj[k].brand_royalty) + mention_tweet + reply_tweet + retweet_tweet;
		    				obj[k].activity = parseInt(obj[k].activity) + total;
		    				obj[k].spread = parseInt(obj[k].spread) + mention_tweet + retweet_tweet + reply_tweet;
		    				obj[k].tweet = parseInt(obj[k].tweet) + 1;
		    				obj[k].retweet = parseInt(obj[k].retweet) + retweet_tweet;
		    				obj[k].mention = parseInt(obj[k].mention) + mention_tweet;
		    				obj[k].comment = parseInt(obj[k].comment) + reply_tweet;
		    				obj[k].favorite = parseInt(obj[k].favorite) + favorite_tweet;
		    			}
		    		}
		    		for (var l=0; l<last_obj.length;l++){
   		    			if (last_obj[l].day == date_post){
   		    				
	   		    			last_obj[l].tweet = parseInt(last_obj[l].tweet) + 1;
	   		    			last_obj[l].retweet = parseInt(last_obj[l].retweet) + retweet_tweet;
	   		    			last_obj[l].mention = parseInt(last_obj[l].mention) + mention_tweet;
	   		    			last_obj[l].comment = parseInt(last_obj[l].comment) + reply_tweet;
	   		    			last_obj[l].favorite = parseInt(last_obj[l].favorite) + favorite_tweet;
   		    			}
   		    		}
  		
      	}
  		}
  		
  		if(lastDateFrom <= create_date && create_date <= newDateTo && load_option==0 ){
  			if(newDateFrom <= create_date && create_date <= newDateTo){
  				 getEngagement(tweet_total,favorite_total,retweet_total,reply_total,mention_total);
  				getLastContentMore(token,token_secret,DateFrom,DateTo,paging);
  				arr.sort(function(a,b){
  		  			return b.total - a.total;
  		  		});
  		      	for (var i=0;i<arr.length;i++){
  		      	if (i < 20){
  		      	count++;
	  				var object_content = new Object();
	  				 var engagement =(((arr[i].mention_tweet+arr[i].retweet_tweet+arr[i].reply_tweet+arr[i].favorite_tweet)/arr.length)/total_fans)*100;
		  				engagement = Math.floor(engagement*100)/100;
		  				object_content.date=DateFrom+" ~ "+DateTo;
		  				object_content.no=count;
	  				object_content.title=arr[i].title;
	  				object_content.engagement=engagement;
	  				object_content.mention=arr[i].mention_tweet;
	  				object_content.retweet=arr[i].retweet_tweet;
	  				object_content.comment=arr[i].reply_tweet;
	  				object_content.favorite=arr[i].favorite_tweet;
	  				array_top20.push(object_content);
			       
	  				var newHtml = "<tr id='tr_"+arr[i].id_tweet+"'><td>"+count+"</td>" + arr[i].html;
	  				$("#analysis_twitter #block-top tbody").append(newHtml);
	  			}
	  		}
  		      var sortArraypostid = converObjectToArray(post_reply_tweet)
  	  		
  	  		for (var i=0;i<sortArraypostid.length;i++){
  	  		 
  	  			  var id = sortArraypostid[i].key;
  	  			  var value=sortArraypostid[i].value;
  	  			$("#tr_"+id +" #reply_"+id).html(value);
  	  		  }
	      	object_report.content_top20=array_top20;
  			}
  			else
  			{
  		      	getLastContentMore(token,token_secret,DateFrom,DateTo,paging);
  			}
  			
  		}else{
  			
  			arr.sort(function(a,b){
		  			return b.total - a.total;
		  		});
		      	for (var i=0;i<arr.length;i++){
		  			if (i < 20){
		  				 count++;
		  				 var engagement =(((arr[i].mention_tweet+arr[i].retweet_tweet+arr[i].reply_tweet+arr[i].favorite_tweet)/arr.length)/total_fans)*100;
		  				engagement = Math.floor(engagement*100)/100;
		  				 var object_content = new Object();
		  				object_content.date=DateFrom+" ~ "+DateTo;
		  				object_content.no=count;
		  				object_content.title=arr[i].title;
		  				object_content.engagement=engagement;
		  				object_content.mention=arr[i].mention_tweet;
		  				object_content.retweet=arr[i].retweet_tweet;
		  				object_content.comment=arr[i].reply_tweet;
		  				object_content.favorite=arr[i].favorite_tweet;
		  				array_top20.push(object_content);
				      
		  				var newHtml = "<tr><td>"+count+"</td>" + arr[i].html;
		  				$("#analysis_twitter #block-top tbody").append(newHtml);
		  			}
		  		}
		      	object_report.content_top20=array_top20;	
		      	contentChart("tweet");
		      	contentChart_Export();
		      	//getLastContentMore(token,token_secret,DateFrom,DateTo,paging);
		      getEngagement(tweet_total,favorite_total,retweet_total,reply_total,mention_total);
  		}
  		

  	}
      
      	function getEngagement(tweet_total,favorite_total,retweet_total,reply_total,mention_total){
      		
      		var engagement = 0;
      		var brand_royalty = 0;
      		var activity = 0;
      		var spread = 0;
      		var engagement_rate=0;
		    for (var i = 0; i<obj.length;i++){
		    	var engagementDate = 0;
		    	var engagementRateDate = 0;
		    	var brand_royalty_date = 0;
		    	if (tweet_total>0&&total_fans>0){
		    		engagementDate = ((obj[i].engagement/tweet_total)/total_fans);
			    	engagementDate = Math.floor(engagementDate*100)/100;
			    	engagementRateDate = roundNumber((engagementDate/total_fans)*100,2);
			    	brand_royalty_date = ((obj[i].brand_royalty/tweet_total));
			    	brand_royalty_date = Math.floor(brand_royalty_date*100)/100;
		    	}else{
		    		engagementDate = 0;
		    		engagementRateDate = 0;
		    		brand_royalty_date = 0;
		    	}
		    	
		    	obj[i].engagement = engagementDate;
		    	obj[i].brand_royalty = brand_royalty_date;
		    	obj[i].engagementRate = engagementRateDate;
		    }
		    
		    if (tweet_total>0&&total_fans>0){
      			engagement = (((mention_total + reply_total + retweet_total + favorite_total)/tweet_total)/total_fans)*100;
    		    engagement = Math.floor(engagement*100)/100;
    		    engagement_rate = roundNumber((engagement/total_fans)*100,2);
    		    brand_royalty = (mention_total + reply_total + retweet_total/tweet_total)*100;
          		brand_royalty = Math.floor(brand_royalty*100)/100;
      		}else{
      			engagement = 0;
    		    engagement_rate = 0;
    		    brand_royalty = 0;
      		}
      		
      		spread = mention_total + reply_total + retweet_total;
      		activity = reply_total + mention_total + favorite_total + retweet_total;
      		object_content_engagement.total_engagement_value=engagement;
      		object_content_engagement.total_engagement_rate_value=engagement_rate;
      		object_content_engagement.total_brand_royalty_value=brand_royalty;
      		object_content_engagement.total_activity_value=activity;
      		object_report.content_engagement=object_content_engagement;
      		$("#brand_royalty").html(numberWithCommas(brand_royalty));
      		$("#activity_twitter").html(numberWithCommas(activity));
      		$("#engagement_rate").html(numberWithCommas(engagement_rate) + "%");
      		$("#engagement_twitter").html(numberWithCommas(engagement));
      		
      		engagementChart(obj,"engagement");
      		engagementChart_Export(obj);
      		//activityChart(obj);
      	}
      	function engagementChart(array_obj,type){
      		var array_date = new Array();
      		var array_engagement = new Array();
      		var array_brand_royalty = new Array();
      		var array_activity = new Array();
      		var array_engagement_rate = new Array();
      		for (var i=0;i<array_obj.length;i++){
      			var days = new Date(array_obj[i].day);
      			array_date.push(days.getMonth() + 1 + "/" + days.getDate());
      			array_engagement.push(array_obj[i].engagement);
      			array_brand_royalty.push(array_obj[i].brand_royalty);
      			array_activity.push(array_obj[i].activity);
      			array_engagement_rate.push(array_obj[i].engagementRate);
      		}
      		
      		var array_current = new Array();
      		
      		if (type == "engagement"){
      			array_current = array_engagement;
      		}else if(type =="activity"){
      			array_current = array_activity;
      		}else if(type =="engagement_rate"){
      			array_current = array_engagement_rate;
      		}else{
      			array_current = array_brand_royalty;
      		}
      		
      		info = new Highcharts.Chart({
      			chart: {
                    type: 'area',
                    renderTo: 'engagement-chart-all',
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
                        //stacking: 'normal',
                        lineColor: '#4DA944',
                        lineWidth: 1,
                        marker: {
                            lineWidth: 1,
                            lineColor: '#3880AA'
                        }
                    }
                },
                series: [{
                	name: type,
                    color: '#4DA944',
                    data: formatDayRange(array_current)
                }]

    		});
      		
      	}
          function contentChart(type){
        	 
      		aoFrm.setLang("#box-content","analysis/twitter");
      		$("#contents_title").html("<span text='contents'>"+type+"<span>");
      		if (type=="tweet"){
    			$("#contents_title").html("<span text='tweet'>"+type+"</span>");
    		}else if(type=="retweet"){
    			$("#contents_title").html("<span text='retweet'>"+type+"</span>");
    		}else if(type=="mention"){
    			$("#contents_title").html("<span text='mention'>"+type+"</span>");
    		}else if(type=="comment"){
    			$("#contents_title").html("<span text='comment'>"+type+"</span>");
    		}
    		else{
    			$("#contents_title").html("<span text='favorite'>"+type+"</span>");
    		}
      		var total_tweet=0;
      		
      		var new_tweet=0;
      		var total_retweet=0;
      		var new_retweet=0;
      		var total_mention=0;
      		var new_mention=0;
      		var total_comment=0;
      		var new_comment=0;
      		var total_favorite=0;
      		var new_favorite=0;
      		var last_total_tweet=0;
      		var last_total_retweet=0;
      		var last_total_mention=0;
      		var last_total_comment=0;
      		var last_total_favorite=0;
      		var array_date_title = new Array();
      		var array_date = new Array();
      		var array_tweet = new Array();
      		var array_retweet = new Array();
      		var array_mention = new Array();
      		var array_comment = new Array();
      		var array_favorite = new Array();
      		
      		var last_array_date_title = new Array();
      		var last_array_date = new Array();
      		var last_array_tweet = new Array();
      		var last_array_retweet = new Array();
      		var last_array_mention = new Array();
      		var last_array_comment = new Array();
      		var last_array_favorite = new Array();
      		for (var i=0;i<obj.length;i++){
      			var days = new Date(obj[i].day);
      			array_date.push(days.getMonth() + 1 + "/" + days.getDate());
      			array_date_title.push(days.getMonth() + 1 + "/" + days.getDate());
      			
      			array_tweet.push(obj[i].tweet);
      			array_retweet.push(obj[i].retweet);
      			array_mention.push(obj[i].mention);
      			array_comment.push(obj[i].comment);
      			array_favorite.push(obj[i].favorite);
      			total_tweet=total_tweet+obj[i].tweet;
      			total_retweet=total_retweet+obj[i].retweet;
      			total_mention=total_mention+obj[i].mention;
      			total_comment=total_comment+obj[i].comment;
      			total_favorite=total_favorite+obj[i].favorite;
      			/// export data
      			var obj_summary= new Object();
      			//var new_follower = array_follower[i] - array_follower[i-1];
      			obj_summary.date=obj[i].day;
      			obj_summary.followers=obj_follower[i].follower;
      			if(i>1){
      				obj_summary.newfollowers=obj_follower[i].follower-obj_follower[i-1].follower;
      			}
      			else{
      				obj_summary.newfollowers=obj_follower[i].follower;
      			}
      			obj_summary.following=obj_follower[i].following;	
      			obj_summary.reach=obj_follower[i].follower;
      			obj_summary.engagement=obj[i].engagement;
      			obj_summary.brandroyalty=obj[i].brand_royalty;
      			obj_summary.activity=obj[i].activity;
      			obj_summary.spread=obj[i].spread;
      			obj_summary.tweets=obj[i].tweet;
      			obj_summary.retweets=obj[i].retweet;
      			obj_summary.mentions=obj[i].mention;
      			obj_summary.comment=obj[i].comment;
      			obj_summary.favorite=obj[i].favorite;
      			arary_summary_engament.push(obj_summary);
      			
      			
      		}
      		object_report.content_summary=arary_summary_engament;
      		for (var j=0;j<last_obj.length;j++){
      			var days = new Date(last_obj[j].last_day);
      			last_array_date.push(days.getDate());
      			last_array_date_title.push(days.getMonth() + 1 + "/" + days.getDate());
      			last_array_tweet.push(last_obj[j].tweet);
      			last_array_retweet.push(last_obj[j].retweet);
      			last_array_mention.push(last_obj[j].mention);
      			last_array_comment.push(last_obj[j].comment);
      			last_array_favorite.push(last_obj[j].favorite);
      			last_total_tweet=last_total_tweet+last_obj[j].tweet;
      			last_total_retweet=last_total_retweet+last_obj[j].retweet;
      			last_total_mention=last_total_mention+last_obj[j].mention;
      			last_total_comment=last_total_comment+last_obj[j].comment;
      			last_total_favorite=last_total_favorite+last_obj[j].favorite;
      		}
      		new_tweet=total_tweet-last_total_tweet;
      		new_retweet=total_retweet-last_total_retweet;
      		new_mention=total_mention-last_total_mention;
      		new_comment=total_comment-last_total_comment;
      		new_favorite=total_favorite-last_total_favorite;
      		var array_current = new Array();
      		var last_array_current = new Array();
      		if (type == "tweet"){
      			//alert(total_tweet)
      			$("#content-text-total").html("<span text='totalcontent'>Total Tweet</span>");
      			$("#content-text-new").html("<span text='newcontent'>New Tweet</span>");
      			$("#content-text-growth").html("<span text='contentgrowth'>Growth of rate</span>");
      			$("#number-total").html(numberWithCommas(total_tweet));
      			$("#number-new").html(numberWithCommas(new_tweet));
      			if(last_total_tweet>0)
    				growth_of=Math.floor(((total_tweet-last_total_tweet)/last_total_tweet)*100);
    				else
    					growth_of=0;
    				contentGrowth(growth_of);
      			array_current = array_tweet;
      			
      			last_array_current = last_array_tweet;
      			//alert(last_array_current)
      		}else if(type =="retweet"){
      			$("#content-text-total").html("<span text='totalcontent'>Total Retweet</span>");
      			$("#content-text-new").html("<span text='newcontent'>New Retweet</span>");
      			$("#content-text-growth").html("<span text='contentgrowth'>Growth of rate</span>");
      			$("#number-total").html(numberWithCommas(total_retweet));
      			$("#number-new").html(numberWithCommas(new_retweet));
      			if(last_total_retweet>0)
    				growth_of=Math.floor(((total_retweet-last_total_retweet)/last_total_retweet)*100);
    				else
    					growth_of=0;
    				contentGrowth(growth_of);
      			array_current = array_retweet;
      			last_array_current = last_array_retweet;
      		}else if(type =="mention"){
      			$("#content-text-total").html("<span text='totalcontent'>Total Mention</span>");
      			$("#content-text-new").html("<span text='newcontent'>New Mention</span>");
      			$("#content-text-growth").html("<span text='contentgrowth'>Growth of rate</span>");
      			$("#number-total").html(numberWithCommas(total_mention));
      			$("#number-new").html(numberWithCommas(new_mention));
      			if(last_total_mention>0)
    				growth_of=Math.floor(((total_mention-last_total_mention)/last_total_mention)*100);
    				else
    					growth_of=0;
    				contentGrowth(growth_of);
      			array_current = array_mention;
      			last_array_current = last_array_mention;
      		}else if(type =="comment"){
      			$("#content-text-total").html("<span text='totalcontent'>Total Comment</span>");
      			$("#content-text-new").html("<span text='newcontent'>New Comment</span>");
      			$("#content-text-growth").html("<span text='contentgrowth'>Growth of rate</span>");
      			$("#number-total").html(numberWithCommas(total_comment));
      			$("#number-new").html(numberWithCommas(new_comment));
      			if(last_total_comment>0)
    				growth_of=Math.floor(((total_comment-last_total_comment)/last_total_comment)*100);
    				else
    					growth_of=0;
    				contentGrowth(growth_of);
      			array_current = array_comment;
      			last_array_current = last_array_comment;
      		}else{
      			$("#content-text-total").html("<span text='totalcontent'>Total Favorite</span>");
      			$("#content-text-new").html("<span text='newcontent'>New Favorite</span>");
      			$("#content-text-growth").html("<span text='contentgrowth'>Growth of rate</span>");
      			$("#number-total").html(numberWithCommas(total_favorite));
      			$("#number-new").html(numberWithCommas(new_favorite));
      			if(last_total_favorite>0)
    				growth_of=Math.floor(((total_favorite-last_total_favorite)/last_total_favorite)*100);
    				else
    					growth_of=0;
    				contentGrowth(growth_of);
      			array_current = array_favorite;
      			last_array_current = last_array_favorite;
      		}
      		info = new Highcharts.Chart({
      			chart: {
                    type: 'area',
                    renderTo: 'xchart-sine-content',
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
                        //stacking: 'normal',
                        lineColor: '#4DA944',
                        lineWidth: 1,
                        marker: {
                            lineWidth: 1,
                            lineColor: '#3880AA'
                        }
                    }
                },
                series: [{
                    name: type + "(" + last_array_date_title[0] + "-" +last_array_date_title[last_array_date_title.length-1] + ")",
                    color: '#3880AA',
                    data: formatDayRange(last_array_current)
                },
                {
                    name: type + "(" + array_date_title[0] + "-" +array_date_title[array_date_title.length-1] + ")",
                    color: '#4DA944',
                    data: formatDayRange(array_current)
                }
                
                ]
      		});
      		
      		$("#analysis_twitter .content_right").css("opacity","1");
     		$("#analysis_twitter .itemLoading").hide();
      	}
      	function getFollower_following(DateFrom,DateTo,channel_detail_id){
      		
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
	       name: "Action", 
	       value: "getfollower"
	   }); 
		$.ajax({
			 type:'GET',
			  url : 'AnalysisReport.do',
			  dataType: 'json',
			  data: dataString,
			  success : function(source) {
				  var follower;
					  for(var i=0; i<source.length;i++){
						  var date=source[i].day;
						  date =date.substring(0,10);
						  var follower= source[i].follower; 
						  var following= source[i].following; 
						 for(var j=0;j<obj_follower.length;j++){
							 if(obj_follower[j].day==date){
								 obj_follower[j].follower=follower;
								 obj_follower[j].following=following;
								 obj_follower[j].reach=follower;
							 }
						 }
					  }
						
					  summaryChart("follower"); 
					  summaryChart_Export();
				  
			  }
		});
      	}
    	function summaryChart(type){
      		aoFrm.setLang("#box-content","analysis/twitter");
      		$("#summary_title").html("<span text='contents'>"+type+"<span>");
      		if (type=="follower"){
    			$("#summary_title").html("<span text='follower'>"+type+"</span>");
    		}else if(type=="following"){
    			$("#summary_title").html("<span text='following'>"+type+"</span>");
    		}else{
    			$("#summary_title").html("<span text='reach'>"+type+"</span>");
    		}
      		//array_follower = [2,3,3,3,3,3,9];
      		//array_following = [4,6,6,6,6,5,8];
      		var array_date = new Array();
      		var total_follower = 0;
      		var total_following = 0;
      		var total_reach = 0;
      		var new_follower = 0;
      		var new_following = 0;
      		var new_reach = 0;
      		array_follower=[];
      		array_following=[];
      		array_reach=[];
      		var follower=0;
      		var following=0;
      		for (var i=0;i<obj_follower.length;i++){
      			var days = new Date(obj_follower[i].day);
      			array_date.push(days.getMonth() + 1 + "/" + days.getDate());
      			if(obj_follower[i].follower!=0){
      				follower=obj_follower[i].follower;
      			}
      			array_follower.push(follower);
      			if(obj_follower[i].following!=0){
      				following=obj_follower[i].following;
      			}
      			array_following.push(following);
      			
      			array_reach.push(follower);
      			if(!isNull(obj_follower[i].follower)){
      				total_follower = obj_follower[i].follower;	
      			}
      			if(!isNull(obj_follower[i].follower)){
      				total_following = obj_follower[i].following;
      			}
      			if(!isNull(obj_follower[i].follower)){
      				total_reach =  obj_follower[i].follower;
      			}
      			
      		}
      		
      		new_follower = array_follower[array_follower.length-1] - array_follower[array_follower.length-2];
      		new_following = array_following[array_following.length-1] - array_following[array_following.length-2];
      		new_reach = new_reach[new_reach.length-1] - new_reach[new_reach.length-2];
      		
      		var array_current = new Array();
      		if (type == "follower"){
      			$("#text-total").html("<span text='totalfan'>Total Follower</span>");
		  		$("#text-new").html("<span text='newfan'>New Follower</span>");
		  		$("#text-growth").html("<span text='growthofrate'>Growth Of Rate</span>");
      			array_current = array_follower;
      			$("#number-total-tw").html(total_follower);
      			if (new_follower>0){
      				$("#number-new-tw").html(new_follower);
      			}else{
      				$("#number-new-tw").html("0");
      			}
      		}else if(type =="following"){
      			$("#text-total").html("<span text='totalfan'>Total Following</span>");
		  		$("#text-new").html("<span text='newfan'>New Following</span>");
		  		$("#text-growth").html("<span text='growthofrate'>Growth Of Rate</span>");
      			array_current = array_following;
      			$("#number-total-tw").html(total_following);
      			if (new_following>0){
      				$("#number-new-tw").html(new_following);
      			}else{
      				$("#number-new-tw").html("0");
      			}
      		}else{
      			$("#text-total").html("<span text='totalfan'>Total Reach</span>");
		  		$("#text-new").html("<span text='newfan'>New Reach</span>");
		  		$("#text-growth").html("<span text='growthofrate'>Growth Of Rate</span>");
      			array_current = array_reach;
      			$("#number-total-tw").html(total_reach);
      			if (new_reach>0){
      				$("#number-new-tw").html(new_reach);
      			}else{
      				$("#number-new-tw").html("0");
      			}
      		}
      		var info = new Highcharts.Chart({
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
                        //stacking: 'normal',
                        lineColor: '#4DA944',
                        lineWidth: 1,
                        marker: {
                            lineWidth: 1,
                            lineColor: '#3880AA'
                        }
                    }
                },
                series: [{
                    name: type,
                    color: '#4DA944',
                    data: formatDayRange(array_current)
                }
                ]
      		});
      	
      	}
      	function getLastContentMore(token,token_secret,DateFrom,DateTo,paging){
    		var retweet_tweet = 0;
    		var id_tweet;
    		var favorite_tweet = 0;
    		
    		var mention_tweet = 0;
    		var reply_status;
    		var create_date;
    		var reply_tweet=0;
    		var dateFrom = new Date(DateFrom);
      		var dateTo = new Date(DateTo);
      		var newDateFrom = toTimestamp(dateFrom);
      		//var prevDate = newDateFrom - (24 * 60 * 60);
      		var newDateTo = toTimestamp(dateTo) + (24 * 60 * 60);
      		var day = Math.round((newDateTo - newDateFrom)/60/60/24);
    		var lastDateTo = newDateFrom - (24 * 60 * 60);
    		var lastDateFrom = lastDateTo - (day * 24 * 60 * 60);
    		var newData = [];
    		newData.push({
    	        name: "token", 
    	        value: token
    	    });
    		
    		newData.push({
    	        name: "token_secret", 
    	        value: token_secret
    	    });    
    		newData.push({
    	        name: "DateFrom", 
    	        value: DateFrom
    	    });
    		
    		newData.push({
    	        name: "DateTo", 
    	        value: DateTo
    	    }); 
    		newData.push({
    	        name: "paging", 
    	        value: paging
    	    }); 
    	 $.ajax({
   		  url : 'AnalysisReport.do',
   		  dataType: 'json',
   		  data:newData,
   		  success : function(reply) {
   			   for (var i=0;i<reply.length;i++){
	        		create_date = reply[i].created_at/1000;
	        		
	        		if ( lastDateFrom <= create_date && create_date <= lastDateTo){				    			
	    	    		reply_status = reply[i].in_reply_to_status_id;	
	    	    		
	        			if (reply_status=="-1"){						    		
	        				id_tweet = reply[i].id;
	        				favorite_tweet = reply[i].favorite_count;
	    		    		retweet_tweet = reply[i].retweet_count;
	    		    		if (!isNull(reply[i].user_mentions)){
	    		    			mention_tweet = reply[i].user_mentions.length;
		   		    		}

	    		    	}
	        			else
	        				{
	        				reply_tweet++;	
	        				}
	        			var date_post = new Date(create_date * 1000);
	   		    		date_post = (date_post.getMonth() + 1) +"/"+ date_post.getDate()+ "/" +date_post.getFullYear();
	        			for (var k=0; k<last_obj.length;k++){
	   		    			if (last_obj[k].day == date_post){
	   		    				
	   		    			last_obj[k].tweet = parseInt(last_obj[k].tweet) + 1;
	   		    			last_obj[k].retweet = parseInt(last_obj[k].retweet) + retweet_tweet;
	   		    			last_obj[k].mention = parseInt(last_obj[k].mention) + mention_tweet;
	   		    			last_obj[k].comment = parseInt(last_obj[k].comment) + reply_tweet;
	   		    			last_obj[k].favorite = parseInt(last_obj[k].favorite) + favorite_tweet;
	   		    			}
	   		    		}
	        		}
	        	}
 
   			contentChart("tweet");
   			contentChart_Export();
   		  }
    	 
    	 });
   				    	
   				    	
  
      	}
      	function exportCsvTwitter(){
      		var str = ''+''+JSON.stringify(object_report)+''+'';
    		$("#exportContent").val(str);
    		$("#exportForm").submit();	
      	}
      	function exportExcelTwitter(){
      		if(!$.browser.msie){
      		  	$("#follower_chart svg").attr("id","chart_follower");
        	  	$("#engagement_royalty svg").attr("id","chart_engagement_royalty");
        	  	$("#activity_spread svg").attr("id","chart_activity_spread");
        	  	$("#xchart-sine-content svg").attr("id","chart_content");
        	  	$("#following_chart svg").attr("id","chart_following");
        		$("#reach_chart svg").attr("id","chart_reach");
        		$("#tweet_chart svg").attr("id","chart_tweet");
        		$("#retweet_chart svg").attr("id","chart_retweet");
        		$("#comment_chart svg").attr("id","chart_comment");
        		$("#mention_chart svg").attr("id","chart_mention");
        		$("#favorite_chart svg").attr("id","chart_favorite");
        		$("#engagement-chart svg").attr("id","chart_engagement");
        		$("#engagement-rate-chart svg").attr("id","chart_engagement_rate");
        		$("#activity-chart svg").attr("id","chart_activity");
        		$("#brandroyalty-chart svg").attr("id","chart_brandroyalty");
        		
        	  //xchart-sine-content
        	    
        	   
        	     var svg_follower = document.getElementById("chart_follower");
        	     var svg_following = document.getElementById("chart_following");
        	     var svg_reach = document.getElementById("chart_reach");
        	     var svg_tweet = document.getElementById("chart_tweet");
        	     var svg_retweet = document.getElementById("chart_retweet");
        	     var svg_comment = document.getElementById("chart_comment");
        	     var svg_mention = document.getElementById("chart_mention");
        	     var svg_favorite = document.getElementById("chart_favorite");
        	     
        	     var svg_engagement = document.getElementById("chart_engagement");
        	     var svg_engagement_rate = document.getElementById("chart_engagement_rate");
        	     var svg_activity = document.getElementById("chart_activity");
        	     var svg_brandroyalty = document.getElementById("chart_brandroyalty");
        	     var load_option = $("#analysis_twitter .cotent_right").attr("load_option");
        			
        	 	if (load_option==0){
        	 		
        	 		var stringDate = $("#analysis_twitter #dashboard_range_two").val();
        	 	}else{
        	 		var stringDate = $("#analysis_twitter #dashboard_range_three").val();
        	 	}
        	     
        	     //var svg_content = document.getElementById("chart_content");
        			svg_follower.toDataURL("image/png", {
        				callback: function(data) {
        					
        					$("#image_follower").val(data);
        				}
        			});
        			svg_following.toDataURL("image/png", {
        				callback: function(data) {
        					
        					$("#image_following").val(data);
        				}
        			});
        			svg_reach.toDataURL("image/png", {
        				callback: function(data) {
        					
        					$("#image_reach").val(data);
        				}
        			});
        			svg_tweet.toDataURL("image/png", {
        				callback: function(data) {
        					
        					$("#image_tweet").val(data);
        				}
        			});
        			svg_retweet.toDataURL("image/png", {
        				callback: function(data) {
        					
        					$("#image_retweet").val(data);
        				}
        			});
        			svg_comment.toDataURL("image/png", {
        				callback: function(data) {
        					
        					$("#image_comment").val(data);
        				}
        			});
        			svg_mention.toDataURL("image/png", {
        				callback: function(data) {
        					
        					$("#image_mention").val(data);
        				}
        			});
        			svg_favorite.toDataURL("image/png", {
        				callback: function(data) {
        					
        					$("#image_favorite").val(data);
        				}
        			});
        			////
        			svg_engagement.toDataURL("image/png", {
        				callback: function(data) {
        					
        					$("#image_engagement").val(data);
        				}
        			});
        			svg_engagement_rate.toDataURL("image/png", {
        				callback: function(data) {
        					
        					$("#image_engagement_rate").val(data);
        				}
        			});
        			svg_activity.toDataURL("image/png", {
        				callback: function(data) {
        					
        					$("#image_activity").val(data);
        				}
        			});
        			svg_brandroyalty.toDataURL("image/png", {
        				callback: function(data) {
        					
        					$("#image_brandroyalty").val(data);
        				}
        			});
        			//engagement-chart
        	  		var str = ''+''+JSON.stringify(object_report)+''+'';
        			$("#exportExcelContent").val(str);
        			$("#daterange").val(stringDate);
        			$("#exportExcelForm").submit();	
      		}
      		else
      			{
      			aoFrm.mess("alert","Current Export Excel not support IE");
      			}
    	
      	}
      	function contentChart_Export(){
      		
      		var total_tweet=0;
      		var total_retweet=0;
      		var total_comment=0;
      		var total_mention=0;
      		var total_favorite=0;
      		var new_tweet=0;
      		var new_retweet=0;
      		var new_comment=0;
      		var new_mention=0;
      		var new_favorite=0;
      		var array_date_title = new Array();
      		var array_date = new Array();
      		var array_tweet = new Array();
      		var array_retweet = new Array();
      		var array_mention = new Array();
      		var array_comment = new Array();
      		var array_favorite = new Array();
      		
      		var last_array_date_title = new Array();
      		var last_array_date = new Array();
      		var last_array_tweet = new Array();
      		var last_array_retweet = new Array();
      		var last_array_mention = new Array();
      		var last_array_comment = new Array();
      		var last_array_favorite = new Array();
      		
      		for (var i=0;i<obj.length;i++){
      			var days = new Date(obj[i].day);
      			array_date.push(days.getDate());
      			array_date_title.push(days.getMonth() + 1 + "/" + days.getDate());
      			array_tweet.push(obj[i].tweet);
      			array_retweet.push(obj[i].retweet);
      			array_mention.push(obj[i].mention);
      			array_comment.push(obj[i].comment);
      			array_favorite.push(obj[i].favorite);
      			total_tweet=total_tweet+obj[i].tweet;
      			total_retweet=total_retweet+obj[i].retweet;
      			total_comment=total_comment+obj[i].comment;
      			total_mention=total_mention+obj[i].mention;
      			total_favorite=total_favorite+obj[i].favorite;
      			/// export data
      			var obj_summary= new Object();
      			//var new_follower = array_follower[i] - array_follower[i-1];
      			obj_summary.date=obj[i].day;
      			obj_summary.followers=obj_follower[i].follower;
      			if(i>1){
      				obj_summary.newfollowers=obj_follower[i].follower-obj_follower[i-1].follower;
      			}
      			else{
      				obj_summary.newfollowers=obj_follower[i].follower;
      			}
      			obj_summary.following=obj_follower[i].following;	
      			obj_summary.reach=obj_follower[i].follower;
      			obj_summary.engagement=obj[i].engagement;
      			obj_summary.brandroyalty=obj[i].brand_royalty;
      			obj_summary.activity=obj[i].activity;
      			obj_summary.spread=obj[i].spread;
      			obj_summary.tweets=obj[i].tweet;
      			obj_summary.retweets=obj[i].retweet;
      			obj_summary.mentions=obj[i].mention;
      			obj_summary.comment=obj[i].comment;
      			obj_summary.favorite=obj[i].favorite;
      			arary_summary_engament_export_chart.push(obj_summary);
      			
      			
      		}
      		new_tweet =array_tweet[array_tweet.length-1]-array_tweet[array_tweet.length-2];
      		new_retweet =array_retweet[array_retweet.length-1]-array_retweet[array_retweet.length-2];
      		new_mention=array_mention[array_mention.length-1]-array_mention[array_mention.length-2];
      		new_comment=array_comment[array_comment.length-1]-array_comment[array_comment.length-2];
      		new_favorite=array_favorite[array_favorite.length-1]-array_favorite[array_favorite.length-2];
      		if(new_tweet>0)
      			new_tweet=new_tweet;
      		else
      			new_tweet=0;
      		if(new_retweet>0)
      			new_retweet=new_retweet;
      		else
      			new_retweet=0;
      		if(new_mention>0)
      			new_mention=new_mention;
      		else
      			new_mention=0;
      		if(new_comment>0)
      			new_comment=new_comment;
      		else
      			new_comment=0;
      		if(new_favorite>0)
      			new_favorite=new_favorite;
      		else
      			new_favorite=0;
      		object_content_chart.total_tweet_value=total_tweet;
      		object_content_chart.new_tweet_value=new_tweet;
      		object_content_chart.total_retweet_value=total_retweet;
      		object_content_chart.new_retweet_value=new_retweet;
      		object_content_chart.total_comment_value=total_comment;
      		object_content_chart.new_comment_value=new_comment;
      		object_content_chart.total_mention_value=total_mention;
      		object_content_chart.new_mention_value=new_mention;
      		object_content_chart.total_favorite_value=total_favorite;
      		object_content_chart.new_favorite_value=new_favorite;
      		object_report.content_summary=arary_summary_engament_export_chart;
      		object_report.content_chart=object_content_chart;
      		for (var j=0;j<last_obj.length;j++){
      			var days = new Date(last_obj[j].last_day);
      			last_array_date.push(days.getDate());
      			last_array_date_title.push(days.getMonth() + 1 + "/" + days.getDate());
      			last_array_tweet.push(last_obj[j].tweet);
      			last_array_retweet.push(last_obj[j].retweet);
      			last_array_mention.push(last_obj[j].mention);
      			last_array_comment.push(last_obj[j].comment);
      			last_array_favorite.push(last_obj[j].favorite);
      		}
      		
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
                        //stacking: 'normal',
                        lineColor: '#4DA944',
                        lineWidth: 1,
                        marker: {
                            lineWidth: 1,
                            lineColor: '#3880AA'
                        }
                    }
                },
                series: [{
                    name: "Tweet" + "(" + last_array_date_title[0] + "-" +last_array_date_title[last_array_date_title.length-1] + ")",
                    color: '#3880AA',
                    data: formatDayRange(last_array_tweet)
                },
                {
                    name: "Tweet" + "(" + array_date_title[0] + "-" +array_date_title[array_date_title.length-1] + ")",
                    color: '#4DA944',
                    data: formatDayRange(array_tweet)
                }
                
                ]
      		});
      		//retweet chart
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
                        //stacking: 'normal',
                        lineColor: '#4DA944',
                        lineWidth: 1,
                        marker: {
                            lineWidth: 1,
                            lineColor: '#3880AA'
                        }
                    }
                },
                series: [{
                    name: "Retweet" + "(" + last_array_date_title[0] + "-" +last_array_date_title[last_array_date_title.length-1] + ")",
                    color: '#3880AA',
                    data: formatDayRange(last_array_retweet)
                },
                {
                    name: "Retweet" + "(" + array_date_title[0] + "-" +array_date_title[array_date_title.length-1] + ")",
                    color: '#4DA944',
                    data: formatDayRange(array_retweet)
                }
                
                ]
      		});
      	//mention chart
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
                        //stacking: 'normal',
                        lineColor: '#4DA944',
                        lineWidth: 1,
                        marker: {
                            lineWidth: 1,
                            lineColor: '#3880AA'
                        }
                    }
                },
                series: [{
                    name: "Mention" + "(" + last_array_date_title[0] + "-" +last_array_date_title[last_array_date_title.length-1] + ")",
                    color: '#3880AA',
                    data: formatDayRange(last_array_mention)
                },
                {
                    name: "Mention" + "(" + array_date_title[0] + "-" +array_date_title[array_date_title.length-1] + ")",
                    color: '#4DA944',
                    data: formatDayRange(array_mention)
                }
                
                ]
      		});
      	//comment chart
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
                        //stacking: 'normal',
                        lineColor: '#4DA944',
                        lineWidth: 1,
                        marker: {
                            lineWidth: 1,
                            lineColor: '#3880AA'
                        }
                    }
                },
                series: [{
                    name: "Comment" + "(" + last_array_date_title[0] + "-" +last_array_date_title[last_array_date_title.length-1] + ")",
                    color: '#3880AA',
                    data: formatDayRange(last_array_comment)
                },
                {
                    name: "Comment" + "(" + array_date_title[0] + "-" +array_date_title[array_date_title.length-1] + ")",
                    color: '#4DA944',
                    data: formatDayRange(array_comment)
                }
                
                ]
      		});
      	//favorite chart
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
                        //stacking: 'normal',
                        lineColor: '#4DA944',
                        lineWidth: 1,
                        marker: {
                            lineWidth: 1,
                            lineColor: '#3880AA'
                        }
                    }
                },
                series: [{
                    name: "Favorite" + "(" + last_array_date_title[0] + "-" +last_array_date_title[last_array_date_title.length-1] + ")",
                    color: '#3880AA',
                    data: formatDayRange(last_array_favorite)
                },
                {
                    name: "Favorite" + "(" + array_date_title[0] + "-" +array_date_title[array_date_title.length-1] + ")",
                    color: '#4DA944',
                    data: formatDayRange(array_favorite)
                }
                
                ]
      		});
      		
      		
      	}
      	function summaryChart_Export(){
      		
      		var array_date = new Array();
      		var total_follower = 0;
      		var total_following = 0;
      		var total_reach = 0;
      		var new_follower = 0;
      		var new_following = 0;
      		var new_reach = 0;
      		array_follower=[];
      		array_following=[];
      		array_reach=[];
      		for (var i=0;i<obj_follower.length;i++){
      			var days = new Date(obj_follower[i].day);
      			array_date.push(days.getDate());
      			array_follower.push(obj_follower[i].follower);
      			array_following.push(obj_follower[i].following);
      			array_reach.push(obj_follower[i].follower);
      			total_follower = total_follower + obj_follower[i].follower;
      			total_following = total_following + obj_follower[i].following;
      			total_reach = total_reach + obj_follower[i].follower;
      		}
      		
      		new_follower = array_follower[array_follower.length-1] - array_follower[array_follower.length-2];
      		new_following = array_following[array_following.length-1] - array_following[array_following.length-2];
      		new_reach = array_reach[array_reach.length-1] - array_reach[array_reach.length-2];
      		object_summary_chart.total_follower_value=total_follower;
      		object_summary_chart.new_follower_value=new_follower;
      		object_summary_chart.total_following_value=total_following;
      		object_summary_chart.new_following_value=new_following;
      		object_summary_chart.total_reach_value=total_reach;
      		object_summary_chart.new_reach_value=new_reach;
      		object_report.summary_chart=object_summary_chart;
      		// follower
      		var info = new Highcharts.Chart({
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
                        //stacking: 'normal',
                        lineColor: '#4DA944',
                        lineWidth: 1,
                        marker: {
                            lineWidth: 1,
                            lineColor: '#3880AA'
                        }
                    }
                },
                series: [{
                    name: "Follower",
                    color: '#4DA944',
                    data: formatDayRange(array_follower)
                }
                ]
      		});
      	// following
      		var info = new Highcharts.Chart({
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
                        //stacking: 'normal',
                        lineColor: '#4DA944',
                        lineWidth: 1,
                        marker: {
                            lineWidth: 1,
                            lineColor: '#3880AA'
                        }
                    }
                },
                series: [{
                    name: "Following",
                    color: '#4DA944',
                    data: formatDayRange(array_following)
                }
                ]
      		});
      	// reach
      		var info = new Highcharts.Chart({
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
                        //stacking: 'normal',
                        lineColor: '#4DA944',
                        lineWidth: 1,
                        marker: {
                            lineWidth: 1,
                            lineColor: '#3880AA'
                        }
                    }
                },
                series: [{
                    name: "Reach",
                    color: '#4DA944',
                    data: formatDayRange(array_reach)
                }
                ]
      		});
      	
      	}
    	function engagementChart_Export(array_obj){
      		var array_date = new Array();
      		var array_engagement = new Array();
      		var array_brand_royalty = new Array();
      		var array_activity = new Array();
      		var array_engagement_rate = new Array();
      		for (var i=0;i<array_obj.length;i++){
      			var days = new Date(array_obj[i].day);
      			array_date.push(days.getDate());
      			array_engagement.push(array_obj[i].engagement);
      			array_brand_royalty.push(array_obj[i].brand_royalty);
      			array_activity.push(array_obj[i].activity);
      			array_engagement_rate.push(array_obj[i].engagementRate);
      		}
      		
      		info = new Highcharts.Chart({
      			chart: {
                    type: 'area',
                    renderTo: 'engagement-chart',
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
                        //stacking: 'normal',
                        lineColor: '#4DA944',
                        lineWidth: 1,
                        marker: {
                            lineWidth: 1,
                            lineColor: '#3880AA'
                        }
                    }
                },
                series: [{
                	name: "Engagement",
                    color: '#4DA944',
                    data: formatDayRange(array_engagement)
                }]

    		});
      		
      		//chart engagement rate
      		info = new Highcharts.Chart({
      			chart: {
                    type: 'area',
                    renderTo: 'engagement-rate-chart',
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
                        //stacking: 'normal',
                        lineColor: '#4DA944',
                        lineWidth: 1,
                        marker: {
                            lineWidth: 1,
                            lineColor: '#3880AA'
                        }
                    }
                },
                series: [{
                	name: "Engagement Rate",
                    color: '#4DA944',
                    data: formatDayRange(array_engagement_rate)
                }]

    		});
      		// activity chart
      		info = new Highcharts.Chart({
      			chart: {
                    type: 'area',
                    renderTo: 'activity-chart',
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
                        //stacking: 'normal',
                        lineColor: '#4DA944',
                        lineWidth: 1,
                        marker: {
                            lineWidth: 1,
                            lineColor: '#3880AA'
                        }
                    }
                },
                series: [{
                	name: "Activity",
                    color: '#4DA944',
                    data: formatDayRange(array_activity)
                }]

    		});
      		// brand royalty chart
      		info = new Highcharts.Chart({
      			chart: {
                    type: 'area',
                    renderTo: 'brandroyalty-chart',
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
                        //stacking: 'normal',
                        lineColor: '#4DA944',
                        lineWidth: 1,
                        marker: {
                            lineWidth: 1,
                            lineColor: '#3880AA'
                        }
                    }
                },
                series: [{
                	name: "Brand Loyalty",
                    color: '#4DA944',
                    data: formatDayRange(array_brand_royalty)
                }]

    		});
      		
      	}
	
	function getTwStream(token,token_secret,channel_detail_id,load_option){
		 $("#analysis_twitter .content_right").css("opacity","0.3");
	 		$("#analysis_twitter .itemLoading").show();
		 last_obj=[];
    	 obj=[];
    	 obj_follower=[];
    	 total_fans=0;
    	 array_top20=[];
    	 object_content_chart={};
    	  object_content_engagement= {};

    	 object_summary_chart={};
    	 arary_summary_engament=[];
    	 //var load_option = $("#analysis_twitter .cotent_right").attr("load_option");
 		
    		if (load_option==0){
    			
    			var stringDate = $("#analysis_twitter #dashboard_range_two").val();
    		}else{
    			var stringDate = $("#analysis_twitter #dashboard_range_three").val();
    		}
		
			var newString = stringDate.split("to");
			var stringFrom = newString[0];
			var stringTo = newString[1];
			//alert(newString)
			//date for facebook: plus 1 day
			var newStringFrom = new Date(stringFrom);
			var newStringTo = new Date(stringTo);
			var dateFrom = new Date(newStringFrom);
			var dateTo = new Date(newStringTo);
			var start_date = toTimestamp(dateFrom) + (7 * 60 * 60);
			var end_date = toTimestamp(dateTo) + (30 * 60 * 60) ;
			var prevDate = start_date;
			while (prevDate < end_date){
	  			var dateFrom = new Date(prevDate * 1000);
	  			prevDate = prevDate + (24 * 60 * 60);
	  			obj.push({"day": (dateFrom.getMonth() + 1) + "/" + dateFrom.getDate() + "/" + dateFrom.getFullYear(),"engagement": 0,"brand_royalty":0,"activity":0,"spread":0,"tweet":0,"retweet":0,"mention":0,"comment":0,"favorite":0});
  	  	      var month = dateFrom.getMonth() + 1;
  				var date =dateFrom.getDate();
  				if(month<10)
  					month="0"+month;
  				if(date<10)
  					date="0"+date;
  				obj_follower.push({"day": month  + "/" + date + "/" + dateFrom.getFullYear(),"follower":0,"following":0,"reach":0});
	  		}
			
			var day = Math.round((end_date - start_date)/60/60/24);
	  		var lastDateTo = start_date - (24 * 60 * 60);
	  		var lastDateFrom = lastDateTo - (day * 24 * 60 * 60);
	  		var lastPrevDate = lastDateFrom;
	  		while (lastPrevDate < lastDateTo){
	  			var dateFrom = new Date(lastPrevDate * 1000);
  		        last_obj.push({"last_day": (dateFrom.getMonth() + 1) + "/" + dateFrom.getDate() + "/" + dateFrom.getFullYear(),"tweet":0,"retweet":0,"mention":0,"comment":0,"favorite":0});
	  			lastPrevDate = lastPrevDate + (24 * 60 * 60);
	  		}
	  		getTwReportFromDB(channel_detail_id,start_date,end_date,load_option);
	  		//getFollower_following(stringFrom,stringTo,channel_detail_id);
		  var dataString =[];
			 dataString.push({
	      name: "channel_detail_id", 
	      value: channel_detail_id
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
	      name: "Action", 
	      value: "twstream"
	  	});
		  $.ajax({
			  url : 'AnalysicFBReport.do',
			  dataType: 'json',
			  data: dataString,
			  success : function(source) {
				  
				  getTopTweet(token,token_secret,source,stringFrom,stringTo,load_option);
				  //getTopPost(source,start_date,end_date,channel_detail_id,pchannel_detail_id,access_token,load_option);
			  }
		  });
	}
function getTwReportFromDB(channel_detail_id,start_date,end_date,load_option){
  		
  		var dataString =[];
  		 dataString.push({
  	  name: "channel_detail_id", 
  	  value: channel_detail_id
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
  	  name: "Action", 
  	  value: "twreport"
  		});
  	  $.ajax({
  		  url : 'AnalysicFBReport.do',
  		  dataType: 'json',
  		  data: dataString,
  		  success : function(source) {
  			  for(var i=0; i<source.length;i++){
  				  var date_post = new Date(source[i].create_date* 1000);
  		  			date_post = (date_post.getMonth() + 1) +"/"+ date_post.getDate()+ "/" +date_post.getFullYear();
  		  			
  		  		 for(var j=0;j<obj_follower.length;j++){
					 if(obj_follower[j].day==date_post){
						 obj_follower[j].follower=source[i].followers;
						 obj_follower[j].following=source[i].following;
						 obj_follower[j].reach=source[i].followers;
					 }
				 }
  		  			}
  			  
  			  setTimeout(function() {
  				 summaryChart("follower"); 
				  summaryChart_Export();
  			}, 2000);
  		  }
  	  });
  	}	
function contentGrowth(growth_of){
		var growth=growth_of;
		if(growth_of>0)
	{
			if(growth_of>1000)
			var growth_of_percent = Math.floor(growth_of/1000);
			if (growth_of_percent > 1){
				
				growth_of = growth_of_percent + "K";
				growth=growth_of;
			}else{
				growth_of = growth_of;
				growth=growth_of;
			}
			$("#number-growth").html(growth_of+"%"+"<i class='icon-caret-up green'></i>");
	}
		else if(growth_of<0)
	{
			growth_of=(-1)*growth_of;
			growth=growth_of;
			$("#number-growth").html(growth_of+"%"+"<i class='icon-caret-down red'></i>");
	}
		else
	{
			$("#number-growth").html(growth_of+"%");
	}
		//object_content_chart.growth="Growth of Rate";
		//object_content_chart.growth_value=growth;
	}