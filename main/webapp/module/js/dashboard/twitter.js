/***************************************************************************
 Page Code:	Dasboard/dasboard
 First Author:
 Created Date: 
 **************************************************************************/

	

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
$('#dashboard_twitter .date-range').daterangepicker({opens: 'left',
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
	var id_user;
	var date = new Date();
	var currentDate = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
	var lastDate = new Date();
	var days = 7;
	var res = date.setTime(date.getTime() - (days * 24 * 60 * 60 * 1000));		
	var lastDate = new Date(res);
	var newDate = (lastDate.getMonth() + 1) + "/" + lastDate.getDate() + "/" + lastDate.getFullYear();
	$("#dashboard_twitter #dashboard_range").val(newDate +" to " + currentDate);
	var post_reply_tweet= new Object();
	
	$(document).ready(function() {
		aoFrm.mess("close","close");
		checkExprired();
		$(".dashboard_twitter_page .tour_play").click(function(){
			$("#overlay_html").show();
			$("#overlay_html").append('<iframe src="tour.html" height="100%" width="100%" frameborder="0" style="margin: 0; padding: 0; border: none" scrolling="no"></iframe>');
			/*setTimeout(function(){
				$("#overlay_html").hide();
			},3000);*/
			$("body").css("overflow",'hidden');
		});
		
		var page_id_post;
		  getChannelSummaryTwitter();
	});
	
	$(".range_inputs .btn").click(function(){
		setTimeout(function(){
			var pchannel_detail_id = $("#dashboard_twitter .content_right").attr("pchannel_detail_id");
			var access_token = $("#dashboard_twitter .content_right").attr("access_token");
			var channel_detail_id = $("#dashboard_twitter .content_right").attr("id");
			
			var channel_detail_id = $("#dashboard_twitter .content_right").attr("id");
			var token = access_token.split("_");
			getEngagementTw(token[0],token[1],channel_detail_id);
		},100);
	});
	
	//summary twitter
	
	var follower_total = 0;
	var following_total = 0;
	var reach_total = 0;
	var retweet_total = 0;
	var comment_total = 0;
	
	var last_follower_total = 0;
	var last_following_total = 0;
	var last_reach_total = 0;
	var last_retweet_total = 0;
	var last_comment_total = 0;
	
	var htmlGeneral;
	var arr = new Array();
	
	var reach_channel_total =0;
	var retweet_channel_total = 0;
	var comment_channel_total = 0;
	
	var last_reach_channel_total =0;
	var last_retweet_channel_total = 0;
	var last_comment_channel_total = 0;
	
	var count_summary =0;
	var count_summary_more = 0;
	//var reply_tweet_=0;
	function getEngagementTw(token,token_secret,id,total_channel){
		
		$("#dashboard_twitter .content_right .block_content").css("opacity","0.3");
		$("#dashboard_twitter .itemLoading").show();
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
		var newDateTo = toTimestamp(dateTo) + (24 * 60 * 60) ;
		
		var tweet_number = 0;
		var favorite_number = 0;
		var reply_number = 0;
		var reply_favorite_number = 0;
		var retweet_number = 0;
		var total_fans = 0;
		getFollower_following(stringFrom,stringTo,id);
		cb.setToken(token,token_secret);
  		cb.__call(
			    "friends_ids",
			    function (reply) {
			    	//total_fans = reply.ids.length;
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
				        value: stringFrom
				    });
					
					newData.push({
				        name: "DateTo", 
				        value: stringTo
				    }); 
					newData.push({
				        name: "Action", 
				        value: "top"
				    }); 
				 $.ajax({
					  url : 'AnalysisReport.do',
					  dataType: 'json',
					  data:newData,
					  success : function(reply) {
						  getTopTweet(reply,newDateFrom,newDateTo,total_fans,token,token_secret,total_channel);
					  }
				 });
			    }
			    );
	}
	
	function getTopTweet(reply,newDateFrom,newDateTo,total_fans,token,token_secret,total_channel){
		count_summary++;
		$("#dashboard_twitter #block-top tbody").empty();
		$("#dashboard_twitter #block-top thead").empty();
		$("#dashboard_twitter #block-top thead").addClass("twitter");
		$("#dashboard_twitter #block-top thead.twitter").append("<tr><td text='no'>No</td><td text='title'>Title</td><td text='mention'>Mention</td><td text='retweet'>Retweet</td><td text='comment'>Comment</td><td text='favorite'>Favorite</td></tr>");
		aoFrm.reloadLang("#dashboard_twitter #block-top thead.twitter");
		var count = 0;
		var title;
		var string;
		
		var retweet_tweet = 0;
		var id_tweet;
		var favorite_tweet = 0;
		var mention_tweet = 0;
		var reply_tweet = 0;
		var total = 0;
		var reply_status;
		var create_date=0;
		var engagement = 0;
		var favorite_total=0;
		var active = 0;
		var reply_total=0;
		var retweet_total=0;
		var tweet_total=0;
		var reply_favorite_number=0;
		var paging=1;
		var name;
		
		var stringDate = $("#dashboard_range").val();
		var newString = stringDate.split("to");
		var stringFrom = newString[0];
		var stringTo = newString[1];
		var day = Math.round((newDateTo - newDateFrom)/60/60/24);
		var lastDateTo = newDateFrom - (24 * 60 * 60);
		var lastDateFrom = lastDateTo - (day * 24 * 60 * 60);
		for (var i=0;i<reply.length;i++){
			var date = reply[i].created_at;
  			//date =date.replace("ICT","+0000");
			//date =date.replace("ICT","+0000");
			date=date/1000;
      		create_date = date ;
      		
    		if ( newDateFrom <= create_date && create_date <= newDateTo){				    			
	    		reply_status = reply[i].in_reply_to_status_id;
	    		paging= reply[i].paging;
	    		
    			if (reply_status=="-1"){
    				//alert(newDateFrom+"_"+create_date+"_"+newDateTo)
    				name = reply[i].user_tweet_name;
    				id_tweet = reply[i].id;
    				favorite_tweet= reply[i].favorite_count;
    				favorite_total =favorite_total+ favorite_tweet;
		    		retweet_tweet = reply[i].retweet_count;
		    		retweet_total = retweet_total + retweet_tweet;
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
		    		reply_total = reply_total + reply_tweet;
		    		total = retweet_tweet + reply_tweet + favorite_tweet;
		    		
		    		htmlGeneral = '<td id="'+ id_tweet +'" class="story" title="'+title+'"><a href="https://twitter.com/'+name+'/status/'+id_tweet+'" target="_blank"><span class="name">'+name+'</span> :'+string+'</a></td><td>'+mention_tweet+'</td><td>'+retweet_tweet+'</td><td id="reply_tweet">0</td><td>'+favorite_tweet+'</td></tr>';
    				arr.push({"total":total,"html":htmlGeneral,"id":id_tweet});
		    	}
    			else
  				{
  				reply_tweet++;
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
    		}
    	}
		if(lastDateFrom <= create_date && create_date <= newDateTo){
			
  			if(newDateFrom <= create_date && create_date <= newDateTo){
  				
  				retweet_channel_total = retweet_channel_total + retweet_total;
  				comment_channel_total = comment_channel_total + reply_total;
  				reach_channel_total = reach_channel_total + total;
  				
  		    	getLastContentMore(token,token_secret,stringFrom,stringTo,paging,active,engagement,tweet_total,total_fans,total_channel);
  		    	
  		    	if (total_channel==count_summary){
  		    		
  		    		$("#dashboard_twitter #reach_num").text(numberWithCommas(reach_channel_total));
  	  		    	$("#dashboard_twitter #retweet_num").text(numberWithCommas(retweet_channel_total));
  	  		    	$("#dashboard_twitter #comment_num").text(numberWithCommas(comment_channel_total));		
  	  		    
					arr.sort(function(a,b){
	  					return b.total - a.total;
	  				});
		    	for (var i=0;i<arr.length;i++){
					if (i < 10){
						
							count++;
	  						var newHtml = "<tr id='tr_"+arr[i].id+"'><td>"+count+"</td>" + arr[i].html;
	  						$("#dashboard_twitter #block-top tbody").append(newHtml);
						
					}
				}
		    	 var sortArraypostid = converObjectToArray(post_reply_tweet)
		  	  		
		  	  		for (var i=0;i<sortArraypostid.length;i++){
		  	  		 
		  	  			  var id = sortArraypostid[i].key;
		  	  			  var value=sortArraypostid[i].value;
		  	  			$("#tr_"+id +" #reply_tweet").html(value);
		  	  		  }
  		    	}
  		    	
  				
  				/*if (total_channel==count_summary){
  					
  				}*/
  			}
  			else
  				{
  				getLastContentMore(token,token_secret,stringFrom,stringTo,paging,active,engagement,tweet_total,total_fans,total_channel);
  				}
  				}
		else
			{
			getLastContentMore(token,token_secret,stringFrom,stringTo,paging,active,engagement,tweet_total,total_fans,total_channel);
			}
		
	}
	function getLastContentMore(token,token_secret,DateFrom,DateTo,paging,active,engagement,tweet_total,total_fans,total_channel){
		count_summary_more++;
		var last_tweet_number = 0;
		var last_favorite_number = 0;
		var last_reply_number = 0;
		var last_reply_favorite_number = 0;
		var last_retweet_number = 0;
		var last_follower_number = 0;
		var last_engagement = 0;
		var last_active = 0;
		var percent_active = 0;
		var percent_engagement = 0;
		var percent_tweet = 0;
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
			  var create_date;
	    	var last_reply_status;
	    
	    	for (var i=0;i<reply.length;i++){
	    		last_follower_number = total_fans;
	    		var date = reply[i].created_at;
	    		date=date/1000;
	  			//date =date.replace("ICT","+0000");
	      		create_date = date;
	    		if ( lastDateFrom <= create_date && create_date <= lastDateTo){
	    			last_reply_status = reply[i].in_reply_to_status_id;
		    		last_retweet_number = last_retweet_number + reply[i].retweet_count;
	    			if (last_reply_status == "-1"){
	    				last_tweet_number++;
	    				last_favorite_number = last_favorite_number + reply[i].favorite_count; 
	    			}else{
	    				last_reply_number++;
	    				last_reply_favorite_number = last_reply_favorite_number + reply[i].favorite_count;
	    			}
	    			
	    		}
	    	}
	    	last_reach_channel_total = last_reach_channel_total + last_reply_number + last_retweet_number + last_favorite_number;
	    	last_retweet_channel_total = last_retweet_channel_total + last_retweet_number;
	    	last_comment_channel_total = last_comment_channel_total + last_reply_number;
	    	var percent_reach = 0;
	    	var percent_retweet = 0;
	    	var percent_comment = 0;
	    	if (total_channel==count_summary_more){
	    		
		    	if (reach_channel_total!=0){
		    		percent_reach = roundNumber(((reach_channel_total-last_reach_channel_total)/reach_channel_total)*100,2);
		    	}else{
		    		percent_reach = 0;
		    	}
		    		
		    	if (retweet_channel_total!=0){
		    		percent_retweet = roundNumber(((retweet_channel_total-last_retweet_channel_total)/retweet_channel_total)*100,2);
		    	}else{
		    		percent_retweet = 0;
		    	}
		    	   	
		    	if (comment_channel_total!=0){
		    		percent_comment = roundNumber(((comment_channel_total-last_comment_channel_total)/comment_channel_total)*100,2);
		    	}else{
		    		percent_comment = 0;
		    	}
		    	
		    	growth_percent(percent_reach,"reach");
		    	growth_percent(percent_retweet,"retweet");
		    	growth_percent(percent_comment,"comment");
	    	}
	    	$("#dashboard_twitter .content_right .block_content").css("opacity","1");
			$("#dashboard_twitter .itemLoading").hide();
		  }
	 
	 });
  	}
	
	function getFollower_following(DateFrom,DateTo,channel_detail_id){
		var lDateFrom= toTimestamp(DateFrom);
		var lDateTo= toTimestamp(DateTo);
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
					  var follower_num = 0;
					  var following_num = 0;
					  var last_follower_num = 0;
					  var last_following_num = 0;
					  var percent_follower = 0;
					  var percent_following = 0;
					  for(var i=0; i<source.length;i++){
							  var date=source[i].day;
							  
							 // date =date.replace("ICT","+0000");
							  date = toTimestamp(date) ;
							  if (lDateFrom < date){
								  follower_num= source[i].follower; 
								  following_num= source[i].following;
							  }else{
								  last_follower_num= source[i].follower; 
								  last_following_num= source[i].following;
							  }
							 
					  }
					  follower_total = follower_total + follower_num;
					  following_total = following_total + following_num;
					  last_follower_total = last_follower_total + last_follower_num;
					  last_following_total = last_following_total + last_following_num;
					  if(follower_total>0){
						  percent_follower = ((follower_total-last_follower_total)/follower_total)*100;
					  }
					  else
						  {
						  percent_follower=0;
						  }
					 if(following_total>0){
						 percent_following = ((following_total-last_following_total)/following_total)*100; 
					 }
					 else
						 {
						 percent_following=0;
						 }
					  $("#follower_num").text(follower_total);
					  $("#following_num").text(following_total);
					  growth_percent(percent_follower,"follower");
					  growth_percent(percent_following,"following");
				  }
			
			});
  	}
	
	function growth_percent(growth,type){
		if (type=="follower"){
			if (growth>0){
				  $(".block-summary .right #growth_follower").removeClass("red");
				  $(".block-summary .right #growth_follower").addClass("blue");
				  $("#growth_follower_num").html(growth + "%");
				  $(".block-summary .right #growth_follower i").removeClass("icon-caret-down");
				  $(".block-summary .right #growth_follower i").addClass("icon-caret-up");
			  }else{
				  growth = (-1)*growth;
				  $(".block-summary .right #growth_follower").removeClass("blue");
				  $(".block-summary .right #growth_follower").addClass("red");
				  $("#growth_follower_num").html(growth + "%");
				  $(".block-summary .right #growth_follower i").removeClass("icon-caret-up");
				  $(".block-summary .right #growth_follower i").addClass("icon-caret-down");
			  }
		}else if(type="following"){
			if (growth>0){
				  $(".block-summary .right #growth_following").removeClass("red");
				  $(".block-summary .right #growth_following").addClass("blue");
				  $("#growth_following_num").html(growth + "%");
				  $(".block-summary .right #growth_following i").removeClass("icon-caret-down");
				  $(".block-summary .right #growth_following i").addClass("icon-caret-up");
			  }else{
				  growth = (-1)*growth;
				  $(".block-summary .right #growth_following").removeClass("blue");
				  $(".block-summary .right #growth_following").addClass("red");
				  $("#growth_following_num").html(growth + "%");
				  $(".block-summary .right #growth_following i").removeClass("icon-caret-up");
				  $(".block-summary .right #growth_following i").addClass("icon-caret-down");
			  }
		}else if(type="reach"){
			if (growth>0){
				  $(".block-summary .right #growth_reach").removeClass("red");
				  $(".block-summary .right #growth_reach").addClass("blue");
				  $("#growth_reach_num").html(growth + "%");
				  $(".block-summary .right #growth_reach i").removeClass("icon-caret-down");
				  $(".block-summary .right #growth_reach i").addClass("icon-caret-up");
			  }else{
				  growth = (-1)*growth;
				  $(".block-summary .right #growth_reach").removeClass("blue");
				  $(".block-summary .right #growth_reach").addClass("red");
				  $("#growth_reach_num").html(growth + "%");
				  $(".block-summary .right #growth_reach i").removeClass("icon-caret-up");
				  $(".block-summary .right #growth_reach i").addClass("icon-caret-down");
			  }
		}else if(type="retweet"){
			if (growth>0){
				  $(".block-summary .right #growth_retweet").removeClass("red");
				  $(".block-summary .right #growth_retweet").addClass("blue");
				  $("#growth_retweet_num").html(growth + "%");
				  $(".block-summary .right #growth_retweet i").removeClass("icon-caret-down");
				  $(".block-summary .right #growth_retweet i").addClass("icon-caret-up");
			  }else{
				  growth = (-1)*growth;
				  $(".block-summary .right #growth_retweet").removeClass("blue");
				  $(".block-summary .right #growth_retweet").addClass("red");
				  $("#growth_retweet_num").html(growth + "%");
				  $(".block-summary .right #growth_retweet i").removeClass("icon-caret-up");
				  $(".block-summary .right #growth_retweet i").addClass("icon-caret-down");
			  }
		}else{
			if (growth>0){
				  $(".block-summary .right #growth_comment").removeClass("red");
				  $(".block-summary .right #growth_comment").addClass("blue");
				  $("#growth_comment_num").html(growth + "%");
				  $(".block-summary .right #growth_comment i").removeClass("icon-caret-down");
				  $(".block-summary .right #growth_comment i").addClass("icon-caret-up");
			  }else{
				  growth = (-1)*growth;
				  $(".block-summary .right #growth_comment").removeClass("blue");
				  $(".block-summary .right #growth_comment").addClass("red");
				  $("#growth_comment_num").html(growth + "%");
				  $(".block-summary .right #growth_comment i").removeClass("icon-caret-up");
				  $(".block-summary .right #growth_comment i").addClass("icon-caret-down");
			  }
		}
		
	}
	function getChannelSummaryTwitter(){
		try{
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
					  $("#list-twitter-db").empty();
					  var current_date = formatDateCurrent();
					  current_date = current_date + " 00:00:00";
					 
						for(var i=0; i<source.length;i++){
								  var token = source[i].token_user;
								  token = token.split("_");
								  getEngagementTw(token[0],token[1],source[i].channel_detail_id,source.length);
								 
							
						}
						checkEmptyChannel("#box_channel_twitter");
				  }
					
			  });
		}
		catch(ex){
			
		}
		
	}
	

	function hidetour()
	{
		$("body").css("overflow",'auto');		
	}
	