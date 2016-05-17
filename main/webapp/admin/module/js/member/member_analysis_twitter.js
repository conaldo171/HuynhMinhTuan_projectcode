
/*****************Twitter**************/

var total_fans = 0;
var arr = new Array();
var date = new Date();
var obj = new Array();
var object_report = new Object();
var obj_follower = new Array();
var post_reply_tweet= new Object();
var array_follower = new Array();
var array_following = new Array();
var array_reach = new Array();
var array_top20 = new Array();
var arary_summary_engament= new Array();
var user_id = $("#analysis_tab").attr("user_id");
var last_obj = new Array();
	var currentDate = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
	var lastDate = new Date();
	var days = 7;
	var res = date.setTime(date.getTime() - (days * 24 * 60 * 60 * 1000));		
	var lastDate = new Date(res);
	var newDate = (lastDate.getMonth() + 1) + "/" + lastDate.getDate() + "/" + lastDate.getFullYear();
	$("#analysis_twitter #dashboard_range").val(newDate +" to " + currentDate);
	$('#analysis_twitter .date-range').daterangepicker({opens: 'left',
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
var count = 0;

$(document).ready(function() {
	object_report.title_summary={date:"Date",followers:"Followers",newfollowers:"New Followers",following:"Following",reach:"Reach",engagement:"Engagement",brandroyalty:"Brand Royalty",activity:"Activity",spread:"Spreach",tweets:"Tweets",retweets:"Retweets",mentions:"Mentions",comment:"Comment",favorite:"Favorite" };
	object_report.title_top20={date:"Date",no:"No",title:"Title",engagement:"Engagement",mention:"Mentions",retweet:"Retwwet",comment:"Comment",favorite:"Favorite"};
	var token;
	var user_id = $("#analysis_tab").attr("user_id");
	$("#summary .action-nav-button a").click(function(){
		var type = $(this).attr("type");
		
		$("#summary .action-nav-button a").removeClass("active");
		
		$(this).addClass("active");
		summaryChart(type);
		
	});
	
	$.ajax({
		  url : '../AdminAnalysis.do?user_id='+user_id,
		  dataType: 'json',
		  success : function(source) {
			
				  $("#list-twitter").empty();
				  	//var pchannel_id;
					for(var i=0; i<source.length;i++){
						if(source[i].channel_id=="3"){
							var html='<li id="'+source[i].channel_detail_id+'" pchannel_detail_id="'+source[i].pchannel_id+'" access-token="'+source[i].token_user+'"><a href="javascript:void(0)"><i class="icon-twitter-sign"></i><span style="margin-left:5px" title="'+source[i].channel_user+'" >'+source[i].channel_user+'</span></a></li>';
							  $("#list-twitter").append(html);
						}
						
					}
					var channel_detail_id = $("#analysis_twitter #list-twitter li:first").attr("id");
					
					if (isNull(channel_detail_id)){
						
						$(".menu-left h5").hide();
						$(".block_content").css("opacity","0.3");
						$(".content_right").append("<div class='no-channel'><h5>No Channel</h5></div>");
					}
					
					var access_token = $("#analysis_twitter #list-twitter li:first").attr("access-token");
					token = access_token.split("_");
					$("#analysis_twitter #list-twitter li:first").addClass("active");
					var name = $("#analysis_twitter #list-twitter li:first a span").attr("title");
					$("#analysis_twitter .block-title .left-title span.name").text(name);
					$("#analysis_twitter .content_right").attr("id",channel_detail_id);
					$("#analysis_twitter .content_right").attr("access_token",access_token);
					
					var channel_detail_id = $("#analysis_twitter #list-twitter li:first").attr("pchannel_detail_id");
					getReportTw(token[0],token[1],channel_detail_id);
					//getFollower_following(stringFrom,stringTo,id);
					$("#analysis_twitter #list-twitter li").click(function(){
						$("#analysis_twitter #list-twitter li").removeClass("active");
						$(this).addClass("active");
						$("#analysis_twitter .block-title .left-title span.name").text($(this).children("a").children("span").attr("title"));
						var id = $(this).attr("id");
						var access_token = $(this).attr("access-token");
						var token = access_token.split("_");
						var channel_detail_id = $(this).attr("pchannel_detail_id");
						
						$("#analysis_twitter .content_right").attr("id",id);
						$("#analysis_twitter .content_right").attr("access_token",access_token);
						//getLastContent(token[0],token[1],channel_detail_id);
					   getReportTw(token[0],token[1],channel_detail_id);
						
					}); 
			 
			}
	  });
});

$(".range_inputs .btn").click(function(){
	setTimeout(function(){
		var access_token = $("#analysis_twitter .content_right").attr("access_token");
		var channel_detail_id = $("#analysis_twitter .content_right").attr("id");
		var token = access_token.split("_");
		//getReportTw(token[0],token[1],channel_detail_id);
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
     function getReportTw(token,token_secret,id){
    	 try{
    		 $("#analysis_twitter .content_right").css("opacity","0.3");
    	 		$("#analysis_twitter .itemLoading").show();
    	 		
    	    	 last_obj=[];
    	    	 obj=[];
    	    	 obj_follower=[];
    	    	 total_fans=0;
    	    	 array_top20=[];
    	    	 arary_summary_engament=[];
    	    	  var stringDate = $("#dashboard_range").val();
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
    				    	total_fans = reply.ids.length;
    				    	getHomeTimeline(token,token_secret,stringFrom,stringTo);
    				    }
    				    );
    	 }catch (e) {
    		 $("#analysis_twitter .content_right").css("opacity","1");
 	 		$("#analysis_twitter .itemLoading").hide();
		}
    	 
  		
      }
     function getHomeTimeline(token,token_secret,newDateFrom,newDateTo){
    	 
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
   		  url : '../AdminAnalysisReport.do',
   		  dataType: 'json',
   		  data:newData,
   		  success : function(source) {
   			getTopTweet(token,token_secret,source,newDateFrom,newDateTo);
   			
   		  }
    	 });
     }
      function getTopTweet(token,token_secret,reply,DateFrom,DateTo){
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
  			var date = reply[i].created_at;
  			date =date.replace("ICT","+0000");
  			
      		create_date = toTimestamp(date) + (24 * 60 * 60);
      		
      		if ( lastDateFrom <= create_date && create_date <= newDateTo){	
      			
  	    		reply_status = reply[i].in_reply_to_status_id;
  	    		paging= reply[i].paging;
      			if (reply_status=="-1"){
      				
      				id_tweet = reply[i].id;
      				favorite_tweet = reply[i].favorite_count;
  		    		retweet_tweet = reply[i].retweet_count;
  		    		
  		    		title = reply[i].text;
  		    		if (title.length > 60){
  						string = title.substring(0,60) + "...";
  					}else{
  						string = title;
  					}
  		    		
  		    		/*for (var j=0;j<reply.length;j++){						    			
  		    			if (id_tweet == reply[j].in_reply_to_status_id && !isNull(reply[j].in_reply_to_status_id))
  			    		{	
  		    				reply_tweet++;						    				
  			    		}
  		    		}*/
  		    		 this.id_tweet= id_tweet;
  		    		 var id=this['id_tweet'];
  		    		post_reply_tweet[id] =0;
  		    		if (!isNull(reply[i].user_mentions)){
  		    			//mention_tweet = reply[i].entities.user_mentions.length;//user_mentions
  		    			mention_tweet = reply[i].user_mentions.length;
  		    		}
  		    		tweet_total++;
  		    		//var tweet_day_total = 0;
  		    		favorite_total = favorite_total + favorite_tweet;
  		    		retweet_total = retweet_total + retweet_tweet;
  		    		reply_total = reply_total + reply_tweet;
  		    		mention_total = mention_total + mention_tweet;
  		    		
  		    		if ( newDateFrom <= create_date && create_date <= newDateTo){
  		    			total = mention_tweet + retweet_tweet + reply_tweet + favorite_tweet;
  	  		    		htmlGeneral = '<td id="'+ id_tweet +'" class="story" title="'+title+'">'+string+'</td><td>'+mention_tweet+'</td><td>'+retweet_tweet+'</td><td id="reply_'+id_tweet+'">'+reply_tweet+'</td><td>'+favorite_tweet+'</td></tr>';
  	      				arr.push({"total":total,"html":htmlGeneral,"id_tweet":id_tweet,"mention_tweet":mention_tweet,"retweet_tweet":retweet_tweet,"reply_tweet":reply_tweet,"favorite_tweet":favorite_tweet,"title":string});
  		    		}
  		    		
  		    	}
      			else
      				{
      				reply_tweet++;
      				this.id_tweet= reply_status;
      				var in_reply_to_status_id=this['id_tweet'];
			  		   if(post_reply_tweet.hasOwnProperty(in_reply_to_status_id)){
							post_reply_tweet[in_reply_to_status_id] =post_reply_tweet[in_reply_to_status_id]+1;
	  		     }
      			
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
  		if(lastDateFrom <= create_date && create_date <= newDateTo){
  			if(newDateFrom <= create_date && create_date <= newDateTo){
   		      	getLastContentMore(token,token_secret,DateFrom,DateTo,paging);
	  			}
		
  			else{
		      	contentChart();
  		}
  		
  	}
      }
      function contentChart(){
    		   for (var i=0;i<obj.length;i++){
    		
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
			       name: "user_id", 
			       value: user_id
			   });   
			   dataString.push({
			       name: "Action", 
			       value: "getfollower"
			   }); 
				$.ajax({
					 type:'GET',
					  url : '../AdminAnalysisReport.do',
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
						  
					  }
				});
      	}
    	function summaryChart(type){
      		$("#summary_title").html(type);
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
      		new_reach = new_reach[new_reach.length-1] - new_reach[new_reach.length-2];
      		
      		var array_current = new Array();
      		if (type == "follower"){
      			array_current = array_follower;
      			$("#number-total").html(total_follower);
      			if (new_follower>0){
      				$("#number-new").html(new_follower);
      			}else{
      				$("#number-new").html("0");
      			}
      		}else if(type =="following"){
      			array_current = array_following;
      			$("#number-total").html(total_following);
      			if (new_following>0){
      				$("#number-new").html(new_following);
      			}else{
      				$("#number-new").html("0");
      			}
      		}else{
      			array_current = array_reach;
      			$("#number-total").html(total_reach);
      			if (new_reach>0){
      				$("#number-new").html(new_reach);
      			}else{
      				$("#number-new").html("0");
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
                    categories: array_date,
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
                    name: type,
                    color: '#4DA944',
                    data: array_current
                }
                ]
      		});
      		 //$("#analysis_twitter .content_right").css("opacity","1");
  	 		//$("#analysis_twitter .itemLoading").hide();
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
   		  url : '../AdminAnalysisReport.do',
   		  dataType: 'json',
   		  data:newData,
   		  success : function(reply) {
   			
   			   for (var i=0;i<reply.length;i++){
	        		create_date = toTimestamp(reply[i].created_at) + (24 * 60 * 60);
	        		
	        		if ( lastDateFrom <= create_date && create_date <= lastDateTo){				    			
	    	    		reply_status = reply[i].in_reply_to_status_id;	
	    	    		
	        			if (reply_status=="-1"){						    		
	        				id_tweet = reply[i].id;
	        				favorite_tweet = reply[i].favorite_count;
	    		    		retweet_tweet = reply[i].retweet_count;
	    		    		if (!isNull(reply[i].entities.user_mentions)){
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
   			contentChart();
   		  }
    	 
    	 });
   				    	
   				    	
  
      	}
      	function exportCsvTwitter(){
      		var str = ''+''+JSON.stringify(object_report)+''+'';
    		$("#exportContenttwitter").val(str);
    		$("#exportFormTwitter").submit();	
      	}

  	