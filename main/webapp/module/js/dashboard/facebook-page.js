/***************************************************************************
 Page Code:	Dasboard/dasboard
 First Author:
 Created Date: 
 **************************************************************************/
var _margin_top = 0;
function chartResize()
{
	_dw = $(window).innerWidth();
	_dh = $(window).innerHeight();
	_bw = $("#dashboard_facebook_page .demographic").innerWidth();
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
		_margin_top = -80;
		_dh = _h+75;
		$("#age-chart p").css("margin-top",-25);
	}	
	$("#dashboard_facebook_page .demographic .chartBox .chart").css("height",_h);
	$("#age").css("height",_dh );
	//$("#age-chart p").css("margin-top",_margin_top/3);
	
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
$('#dashboard_facebook_page .date-range').daterangepicker({opens: 'left',
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
var total_last_fans_number=0;
var count_getEngagementLastFb=0;
var count_reachSummaryPage_last=0;
var last_total_reach=0;
var total_reach=0;
var total_num_male=0;
var total_num_female=0;
var total_num_u20=0;
var total_num_u30=0;
var total_num_u40=0;
var total_num_u50=0;
var total_num_u60=0;
var total_num_u70=0;
var total_post_number = 0;
var total_like_number = 0;
var total_comment_number = 0;
var total_comment_like_number = 0;
var total_share_number = 0;
var total_engagement = 0;
var total_active = 0;
var total_last_post_number = 0;
var total_last_like_number = 0;
var total_last_comment_number = 0;
var total_last_comment_like_number = 0;
var total_last_share_number = 0;
var total_fans_number=0;
var count_demochart=0;
var count_getEngagementFb=0;
var count_getTopPost=0;
var count_reachSummaryPage=0;
var count_getFansPageLast=0;
var arr = new Array();
var id_user;
	var date = new Date();
	var currentDate = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
	var lastDate = new Date();
	var days = 7;
	var res = date.setTime(date.getTime() - (days * 24 * 60 * 60 * 1000));		
	var lastDate = new Date(res);
	var newDate = (lastDate.getMonth() + 1) + "/" + lastDate.getDate() + "/" + lastDate.getFullYear();
	$("#dashboard_facebook_page #dashboard_range").val(newDate +" to " + currentDate);
	
	$(document).ready(function() {
		aoFrm.mess("close","close");
		checkExprired();
		var page_id_post;
		var administrator= $("#permit").val();
		if(administrator=="1")
		checkChannelDetail();
		 /* $(".help li a").each(function(){
	          if($(this).attr("tour") == "tour"){
	          $(this).attr("id","tour_page");
	          $( "#tour_page" ).unbind();
	          $("#tour_page").click(function(){
	      		showTourPage();
	      	});
	          }
	        });*/
		
		
	 // if(load_summary_page==true)
		  getChannelSummaryPage();
	  	  
	});
	
	$(".range_inputs .btn").click(function(){
		setTimeout(function(){
			clearData();
			 getChannelSummaryPage();
			//getToken(channel_detail_id,pchannel_detail_id,access_token);
			var channel_detail_id = $("#dashboard_facebook_page .content_right").attr("id");
			
		},100);
	});

	function genderChart(num_male){
		info = new Highcharts.Chart({
			chart: {
				renderTo: 'gender',
				margin: [0, 0, 0, 0],
				backgroundColor: null,
                plotBackgroundColor: 'none'
							
			},
			credits: {
                enabled: false
            },
			title: {
				text: null
			},
			
			tooltip: {
				formatter: function() { 
					return this.point.name +': '+ this.y +' %';
						
				} 	
			},
		    series: [
				{
				borderWidth: 2,
				borderColor: '#F1F3EB',
				shadow: false,	
				type: 'pie',
				name: 'otherstat',
				innerSize: '50%',
				showInLegend: true,
				data: [					
					{ name: 'Man', y: num_male, color: '#08c6d4' },
					{ name: 'Woman', y: 100-num_male, color: '#babab8' }
				],
				dataLabels: {
					enabled: false,
					color: '#000000',
					connectorColor: '#000000'
				}
			}]
		});
	}
	
	
	function ageChart(num_u20, num_u30, num_u40, num_u50, num_u60,num_u70){
		var  u20data=0;
		var  u30data=0;
		var  u40data=0;
		var  u50data=0;
		var  u60data=0;
		var  u70data=0;
		var sum=num_u20+num_u30+num_u40+num_u50+num_u60+num_u70;
			u20data=Math.round(num_u20/sum*100);
			u30data=Math.round(num_u30/sum*100);
			u40data=Math.round(num_u40/sum*100);
			u50data=Math.round(num_u50/sum*100);
			u60data=Math.round(num_u60/sum*100);
			u70data=100-u20data-u30data-u40data-u50data-u60data;
			info = new Highcharts.Chart({
				chart: {
					renderTo: 'age',
					margin: [0, 0, 0, 0],
					backgroundColor: null,
	                plotBackgroundColor: 'none',
	                marginTop: -65
								
				},
				title: {
					text: null
				},
				credits: {
	                enabled: false
	            },
				tooltip: {
					formatter: function() { 
						return this.point.name +': '+ this.y +' %';
							
					} 	
				},
				legend: {
  					width: 170
  				},
				series: [{
					borderWidth: 2,
					borderColor: '#F1F3EB',
					shadow: false,	
					type: 'pie',
					name: 'Income',
					innerSize: '50%',
					showInLegend: true,
					data:[
						{
							name: 'from 18 to 24 years old',
							y: u20data,
							color: '#62c462'
						},
						{
							name: 'from 25 to 34 years old',
							y: u30data,
							color: '#2f9734'
						},
						{
							name: 'from 35 to 44 years old',
							y: u40data,
							color: '#edb836'
						},
						{
							name: 'from 45 to 54 years old',
							y: u50data,
							color: '#8A9499'
						},
						{
							name: '55 to 64 years old',
							y: u60data,
							color: '#d84436'
						},
							
						{
							name: 'above 65 years old',
							y: u70data,
							color: '#babab8'
						}
						],
						
						dataLabels: {
							enabled: false,
							color: '#000000',
							connectorColor: '#000000'
						}
				}]
			});
			 $("#dashboard_facebook_page .content_right .block_content").css("opacity","1");
			 $("#dashboard_facebook_page .itemLoading").hide();	
	}
	
	
	//summary facebook

	function getTopPost(response,total_channel){
		aoFrm.reloadLang("#dashboard_facebook_page #block-top thead.facebook");
		var htmlGeneral;
		var title;
		var string;
		var like_num = 0;
		var comment_num = 0;
		var share_num = 0;
		var comment_like_num = 0;
		var active = 0;
		var count = 0;
		var name = '';
		var link_post = '';
		
		count_getTopPost++;
		for (var i=0;i<response.data.length;i++){
			
			if (!isNull(response.data[i].description)) {
				name = response.data[i].from.name;
				link_post = response.data[i].actions[0].link;
				if (!isNull(response.data[i].comments)){
					comment_num = response.data[i].comments.data.length;
					for (var j=0;j<response.data[i].comments.data.length;j++){
						comment_like_num = response.data[i].comments.data[j].like_count;
					}
				}else{
					comment_num = 0;
					comment_like_num = 0;
				}
				if (!isNull(response.data[i].likes)){
					like_num = response.data[i].likes.data.length;
				}else{
					like_num = 0;
				}
				if (!isNull(response.data[i].shares)){
					share_num= response.data[i].shares.count;
				}else{
					share_num = 0;
				}
				active = like_num + comment_num + share_num + comment_like_num;
				title = response.data[i].description;
				if (title.length > 60){
					string = title.substring(0,60) + "...";
				}else{
					string = title;
				}
				htmlGeneral = '<td class="story"><a href="'+link_post+'" target="_blank"><span class="name" title="'+name+'">"'+limitString(name)+'" : </span><span  title="'+title+'">'+string+'</span></a></td><td class="show-amount">'+active+'</td><td class="like">'+like_num+'</td><td class="comment">'+comment_num+'</td><td class="share">'+share_num+'</td><td class="comment-like">'+comment_like_num+'</td></tr>';
				arr.push({"active":active,"html":htmlGeneral});
				
			}else if(!isNull(response.data[i].message)){
				name = response.data[i].from.name;
				link_post = response.data[i].actions[0].link;
				if (!isNull(response.data[i].comments)){
					comment_num = response.data[i].comments.data.length;
					for (var j=0;j<response.data[i].comments.data.length;j++){
						comment_like_num = response.data[i].comments.data[j].like_count;
					}
				}else{
					comment_num = 0;
					comment_like_num = 0;
				}
				if (!isNull(response.data[i].likes)){
					like_num = response.data[i].likes.data.length;
				}else{
					like_num = 0;
				}
				if (!isNull(response.data[i].shares)){
					share_num= response.data[i].shares.count;
				}else{
					share_num = 0;
				}
				active = like_num + comment_num + share_num + comment_like_num;
				title = response.data[i].message;
				if (title.length > 60){
					string = title.substring(0,60) + "...";
				}else{
					string = title;
				}
				htmlGeneral = '<td class="story"><a href="'+link_post+'" target="_blank"><span class="name" title='+name+'>'+limitString(name)+' : </span><span title="'+title+'">'+string+'</span></a></td><td class="show-amount">'+active+'</td><td class="like">'+like_num+'</td><td class="share">'+share_num+'</td><td class="comment">'+comment_num+'</td><td class="comment-like">'+comment_like_num+'</td></tr>';
				arr.push({"active":active,"html":htmlGeneral});
			}
			}
		if(count_getTopPost==total_channel){
			$("#dashboard_facebook_page #block-top tbody").empty();
			$("#dashboard_facebook_page #block-top thead").empty();
			$("#dashboard_facebook_page #block-top thead").addClass("facebook");
			$("#dashboard_facebook_page #block-top thead.facebook").append("<tr><td text='no'>No</td><td text='title'>Title</td><td text='reach'>Reach</td><td text='like'>Like</td><td text='share'>Share</td><td text='comment'>Comment</td><td text='commentlike'>Comment Like</td></tr>");
			arr.sort(function(a,b){
				return b.active - a.active;
			});
			for (var i=0;i<arr.length;i++){
				if (i < 10){
					count++;
					var newHtml = "<tr><td>"+count+"</td>" + arr[i].html;
					$("#dashboard_facebook_page #block-top tbody").append(newHtml);
				}
			}
		}
			
	}
	 ////function of summary
	 function getToken(channel_detail_id,pchannel_detail_id,token,total_channel,channel_user){
		
			$("#dashboard_facebook_page .content_right .block_content").css("opacity","0.3");
			$("#dashboard_facebook_page .itemLoading").show();
			var stringDate = $("#dashboard_facebook_page #dashboard_range").val();
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
			try{
				FB.api('/'+pchannel_detail_id+'/accounts',{access_token:token}, function(response) {
					if(!isNull(response.error)){
						 checkAccountError(response,"facebookpage",channel_user);
						 $("#dashboard_facebook_page .content_right .block_content").css("opacity","1");
							$("#dashboard_facebook_page .itemLoading").hide();
					} 
					if(!isNull(response.data)){
						 var datasource=response.data;
						 for(var j=0; j<datasource.length;j++){
								 if(datasource[j].id==channel_detail_id){
									token_page = datasource[j].access_token;
									getFansPage(channel_detail_id,token_page,newDateFrom,newDateTo,total_channel);
									
								 }
							} 
					 }
				 });
	      }catch (ex) {
	    	  connectFberror();		
				}
		}
	
		function getFansPage(page_id_post,token_page,newDateFrom,newDateTo,total_channel){
			var fans_number = 0;
			try{
			FB.api('/'+page_id_post+'/insights/page_fans?since='+newDateFrom+'&until='+newDateTo+'',{access_token:token_page}, function(response) {
				if (!isNull(response.data)){
					for (var i=0;i<response.data[0].values.length;i++){
						fans_number = response.data[0].values[i].value;
					}
					total_fans_number=total_fans_number+fans_number;
						$("#dashboard_facebook_page .content_right .block-nodata").empty();
						getEngagementFb(page_id_post,fans_number,newDateFrom,newDateTo,token_page,total_channel);
						demoGraphicPageProfile(page_id_post,fans_number,token_page,newDateFrom,newDateTo,total_channel);
						reachSummaryPage(page_id_post,token_page,newDateFrom,newDateTo,total_channel);
						getFansPageLast(page_id_post,token_page,newDateFrom,newDateTo,total_channel)
				}else{
					$("#dashboard_facebook_page .content_right .block-nodata").empty();
					$("#dashboard_facebook_page .content_right").append("<div class='block-nodata'><div class='nodata span3'><h4 text='nodata'>NO DATA FROM FACEBOOK</h4></div></div>");
					aoFrm.reloadLang("#dashboard_facebook_page .content_right");
					$("#dashboard_facebook_page .itemLoading").hide();
				}
			 });
		 
		}
		catch (ex) {
			 connectFberror();			
		}
		}
		function getFansPageLast(page_id_post,token_page,newDateFrom,newDateTo,total_channel){
			var fans_number = 0;
			var lastDateFrom;
			var lastDateTo;
			var day = Math.round((newDateTo - newDateFrom)/60/60/24);
			lastDateTo = newDateFrom - (24 * 60 * 60);
			lastDateFrom = lastDateTo - (day * 24 * 60 * 60);
			try{
			FB.api('/'+page_id_post+'/insights/page_fans?since='+lastDateFrom+'&until='+lastDateTo+'',{access_token:token_page}, function(response) {
				count_getFansPageLast++;
				if (!isNull(response.data)){
					for (var i=0;i<response.data[0].values.length;i++){
						fans_number = response.data[0].values[i].value;
					}
				}
				total_last_fans_number=total_last_fans_number+fans_number;
					if(count_getFansPageLast==total_channel){
						var percent_fans=0;
						$("#dashboard_facebook_page #fan_num").text(numberWithCommas(total_fans_number));
						if(total_fans_number>0){
							percent_fans=Math.floor(((total_fans_number-total_last_fans_number)/total_fans_number)*100)	
							//alert(total_fans_number+"_"+(total_fans_number-total_last_fans_number))
						}
						//alert(total_last_fans_number+"__"+percent_fans)
						if(percent_fans>0){
							$("#growth_fan_cl").removeClass("red");
							$("#growth_fan_cl").addClass("blue");
							}
						  else if(percent_fans<0){
							  percent_fans=(-1)*percent_fans;
							  $("#growth_fan_cl").removeClass("blue");
								$("#growth_fan_cl").addClass("red");
								$("#growth_fan_cl i").removeClass("icon-caret-up");
							  $("#growth_fan_cl i").addClass("icon-caret-down");
						  }
						  else
							{
							$("#growth_fan_cl i").removeClass("icon-caret-up");
							$("#growth_fan_cl i").removeClass("icon-caret-down");
							}
						 $("#dashboard_facebook_page #growth_fan_num").text(percent_fans+"%");
					}	
			 });
		 
		}
		catch (ex) {
			 connectFberror();			
		}
		}
		function getEngagementFb(page_id_post,fans_number,newDateFrom,newDateTo,token_page,total_channel){
			$("#dashboard_facebook_page .content_right .block-nodata").empty();
			var length = 200;
			var lastDateFrom;
			var lastDateTo;
			var day = Math.round((newDateTo - newDateFrom)/60/60/24);
			lastDateTo = newDateFrom - (24 * 60 * 60);
			lastDateFrom = lastDateTo - (day * 24 * 60 * 60);
			
			
			try{
			FB.api('/'+page_id_post+'/feed?limit='+length+'&since='+newDateFrom+'&until='+newDateTo+'','get',{access_token:token_page} , function(response) {
				count_getEngagementFb++;
				for (var i=0;i<response.data.length;i++){
					if (!isNull(response.data[i].comments)){
						total_comment_number = total_comment_number + response.data[i].comments.data.length;
						for (var j=0;j<response.data[i].comments.data.length;j++){
							total_comment_like_number = total_comment_like_number + response.data[i].comments.data[j].like_count;
						}
					}
					if (!isNull(response.data[i].likes)){
						total_like_number = total_like_number + response.data[i].likes.data.length;
					}
					if (!isNull(response.data[i].shares)){
						total_share_number = total_share_number + response.data[i].shares.count;
					}
				}
				//alert(total_comment_number);
				//total_fans_number=total_fans_number+fans_number;
				total_post_number = response.data.length;
				if(count_getEngagementFb==total_channel){
					$("#dashboard_facebook_page #like_num").text(numberWithCommas(total_like_number));
					 $("#dashboard_facebook_page #share_num").text(numberWithCommas(total_share_number));
					 $("#dashboard_facebook_page #comment_num").text(numberWithCommas(total_comment_number));
					 //$("#dashboard_facebook_page #fan_num").text(total_fans_number);
				}
				getEngagementLastFb(page_id_post,fans_number,newDateFrom,newDateTo,token_page,length,total_channel);
				 
				 
				 getTopPost(response,total_channel);
				 
			 });
			}
			catch (ex) {
				 connectFberror();		
			}
			
		}

		
		function getEngagementLastFb(page_id_post,fans_number,newDateFrom,newDateTo,token_page,length,total_channel){
			var lastDateFrom;
			var lastDateTo;
			var day = Math.round((newDateTo - newDateFrom)/60/60/24);
			lastDateTo = newDateFrom - (24 * 60 * 60);
			lastDateFrom = lastDateTo - (day * 24 * 60 * 60);
			
			try{
			FB.api('/'+page_id_post+'/feed?limit='+length+'&since='+lastDateFrom+'&until='+lastDateTo+'','get',{access_token:token_page} , function(response) {
				count_getEngagementLastFb++;
				for (var i=0;i<response.data.length;i++){
					if (!isNull(response.data[i].comments)){
						total_last_comment_number = total_last_comment_number + response.data[i].comments.data.length;
	
					}
					if (!isNull(response.data[i].likes)){
						total_last_like_number = total_last_like_number + response.data[i].likes.data.length;
					}
					if (!isNull(response.data[i].shares)){
						total_last_share_number = total_last_share_number + response.data[i].shares.count;
					}
				}
				//alert(total_last_comment_number);
				if(count_getEngagementLastFb==total_channel){
					var percent_comment=0;
					var percent_like=0;
					var percent_share=0;
					if (total_comment_number == total_last_comment_number){
						percent_comment = 0;
					}else{
						if(total_comment_number>0)
						percent_comment = Math.floor((((total_comment_number - total_last_comment_number)/total_comment_number)*100));
					}
					if (total_like_number == total_last_like_number){
						percent_like = 0;
					}else{
						if(total_like_number>0)
						percent_like = Math.floor(((total_like_number - total_last_like_number)/total_like_number)*100);
					}
					if (total_share_number == total_last_share_number){
						percent_share = 0;
					}else{
						if(total_share_number>0)
						percent_share = Math.floor(((total_share_number - total_last_share_number)/total_share_number)*100);
					}
					
					if(percent_comment>0)
						{
						$("#growth_comment_cl").removeClass("red");
						$("#growth_comment_cl").addClass("blue");
						//$("#growth_comment_cl").append('<i class="icon-caret-up"></i>'); 
						}
					else if(percent_comment<0)
						{
						percent_comment=(-1)*percent_comment;
						$("#growth_comment_cl").removeClass("blue");
						$("#growth_comment_cl").addClass("red");
						$("#growth_comment_cl i").removeClass("icon-caret-up");
						$("#growth_comment_cl i").addClass("icon-caret-down");
						//$("#growth_comment_cl").append('<i class="icon-caret-down"></i>');
						}
					else
					{
					$("#growth_comment_cl i").removeClass("icon-caret-up");
					$("#growth_comment_cl i").removeClass("icon-caret-down");
					}
					if(percent_like>0){
						$("#growth_like_cl").removeClass("red");
						$("#growth_like_cl").addClass("blue");
						//$("#growth_like_cl").append('<i class="icon-caret-up"></i>');
					}
					else if(percent_like<0)
					{
						percent_like=(-1)*percent_like;
						$("#growth_like_cl").removeClass("blue");
						$("#growth_like_cl").addClass("red");
						$("#growth_like_cl i").removeClass("icon-caret-up");
						$("#growth_like_cl i").addClass("icon-caret-down");
					}
					else
					{
					$("#growth_like_cl i").removeClass("icon-caret-up");
					$("#growth_like_cl i").removeClass("icon-caret-down");
					}
					if(percent_share>0){
						$("#growth_share_cl").removeClass("red");
						$("#growth_share_cl").addClass("blue");
						//$("#growth_share_cl").append('<i class="icon-caret-up"></i>');
					}
					else if(percent_share<0)
						{
						percent_share=(-1)*percent_share;
						$("#growth_share_cl").removeClass("blue");
						$("#growth_share_cl").addClass("red");
						$("#growth_share_cl i").removeClass("icon-caret-up");
						$("#growth_share_cl i").addClass("icon-caret-down");
						//$("#growth_share_cl").append('<i class="icon-caret-down"></i>');
						}
					else
					{
						//alert(percent_comment);
					$("#growth_share_cl i").removeClass("icon-caret-up");
					$("#growth_share_cl i").removeClass("icon-caret-down");
					}
					$("#dashboard_facebook_page #growth_like_num").text(percent_like+"%");
					 $("#dashboard_facebook_page #growth_share_num").text(percent_share+"%");
					 $("#dashboard_facebook_page #growth_comment_num").text(percent_comment+"%");
					 //$("#dashboard_facebook_page #fan_num").text(total_fans_number);
				}
				
			 });
			}
			catch (ex) {
				 connectFberror();			
			}
			
		}

		
		function demoGraphicPageProfile(channel_detail_id,fans_number,token_page,newDateFrom,newDateTo,total_channel){
			try{
			FB.api('/'+channel_detail_id+'/insights/page_fans_gender_age?since='+newDateFrom+'&until='+newDateTo+'',{access_token:token_page}, function(response) {
				//var num_u25 = 0;//response.data[0].values[0].value["M.25-34"]+response.data[0].values[0].value["F.25-34"];
				count_demochart++;
				
				if(!isNull(response.data[0].values[0].value["M.25-34"])){
					total_num_u30 = total_num_u30+response.data[0].values[0].value["M.25-34"];
					total_num_male=total_num_male+response.data[0].values[0].value["M.25-34"];
				}
				if(!isNull(response.data[0].values[0].value["F.25-34"]))	
					{
					total_num_u30 = total_num_u30+response.data[0].values[0].value["F.25-34"];
					total_num_female=total_num_female+response.data[0].values[0].value["F.25-34"];
					}
				if(!isNull(response.data[0].values[0].value["F.18-24"])){
					total_num_u20 = total_num_u20+response.data[0].values[0].value["F.18-24"];
					total_num_male=total_num_male+response.data[0].values[0].value["F.18-24"];
				}
				if(!isNull(response.data[0].values[0].value["M.18-24"])){
					total_num_u20 = total_num_u20+response.data[0].values[0].value["M.18-24"];
					total_num_female=total_num_female+response.data[0].values[0].value["M.18-24"];
				}
				if(!isNull(response.data[0].values[0].value["F.35-44"])){
					total_num_u40 = total_num_u40+response.data[0].values[0].value["F.35-44"];
					total_num_male=total_num_male+response.data[0].values[0].value["F.35-44"];
				}
				if(!isNull(response.data[0].values[0].value["M.35-44"])){
					total_num_u40 = total_num_u40+response.data[0].values[0].value["M.35-44"];
					total_num_female=total_num_female+response.data[0].values[0].value["M.35-44"];
				}
				if(!isNull(response.data[0].values[0].value["M.45-54"])){
					total_num_u50 = total_num_u50+response.data[0].values[0].value["M.45-54"];
					total_num_male=total_num_male+response.data[0].values[0].value["M.45-54"];
				}
				if(!isNull(response.data[0].values[0].value["M.45-54"])){
					total_num_u50 = total_num_u50+response.data[0].values[0].value["M.45-54"];
					total_num_female=total_num_female+response.data[0].values[0].value["M.45-54"];
				}
				
				if(!isNull(response.data[0].values[0].value["M.55-64"])){
					total_num_u60 = total_num_u60+response.data[0].values[0].value["M.55-64"];
					total_num_male=total_num_male+response.data[0].values[0].value["M.55-64"];
				}
				if(!isNull(response.data[0].values[0].value["M.55-64"])){
					total_num_u60 = total_num_u60+response.data[0].values[0].value["M.55-64"];
					total_num_female=total_num_female+response.data[0].values[0].value["M.55-64"];
				}
				if(!isNull(response.data[0].values[0].value["M.65-74"])){
					total_num_u70 = total_num_u70+response.data[0].values[0].value["M.65-74"];
					total_num_male=total_num_male+response.data[0].values[0].value["M.65-74"];
				}
				if(!isNull(response.data[0].values[0].value["M.65-74"])){
					total_num_u70 = total_num_u70+response.data[0].values[0].value["M.65-74"];
					total_num_female=total_num_female+response.data[0].values[0].value["M.65-74"];
				}
					if(count_demochart==total_channel){
					total_num_male=Math.round(total_num_male/(total_num_male+total_num_female)*100);
					ageChart(total_num_u20, total_num_u30, total_num_u40, total_num_u50, total_num_u60,total_num_u70);
					genderChart(total_num_male);
					$("#fb_education").hide();
					$("#fb_status").hide();
					//$("#fb_impressionbreak").show();
					$("#dashboard_facebook_page .content_right .block_content").css("opacity","1");
					 $("#dashboard_facebook_page .itemLoading").hide();	
				}
				
				
				
				
		});
			}
			catch (ex) {
				 connectFberror();		
			}
		}
		function reachSummaryPage(page_id_post,token_page,newDateFrom,newDateTo,total_channel){
	  		//total_reach=0;
	  		last_total_reach=0;
	  		
	  		FB.api('/'+page_id_post+'/insights/page_impressions_unique?since='+newDateFrom+'&until='+newDateTo+'',{access_token:token_page}, function(response) {
	  			count_reachSummaryPage++;
	  			if (!isNull(response.data)){
	  				
	  			    var obj_reach_week =($.map(response.data[1].values, function(item) {
	  		            return {
	   		               end_time: item.end_time,
	   		               reach: item.value
	   		            };
	   		        }));
	  		  		 total_reach=total_reach+ obj_reach_week[obj_reach_week.length-1].reach;
	  		  			if(count_reachSummaryPage==total_channel){
	  		  			$("#dashboard_facebook_page #reach_num").text(numberWithCommas(total_reach));	
	  		  			}
	  			}
	  			reachSummaryPageLast(page_id_post,token_page,newDateFrom,newDateTo,total_channel);
	  		});
	  		
	  	}
		function reachSummaryPageLast(page_id_post,token_page,newDateFrom,newDateTo,total_channel){
			var lastDateFrom;
			var lastDateTo;
			var day = Math.round((newDateTo - newDateFrom)/60/60/24);
			lastDateTo = newDateFrom - (24 * 60 * 60);
			lastDateFrom = lastDateTo - (day * 24 * 60 * 60);
	  		//last_total_reach=0;
		
	  		FB.api('/'+page_id_post+'/insights/page_impressions_unique?since='+lastDateFrom+'&until='+lastDateTo+'',{access_token:token_page}, function(response) {
	  			count_reachSummaryPage_last++;
	  			if (!isNull(response.data)){
	  				
	  			    var obj_reach_week =($.map(response.data[1].values, function(item) {
	  		            return {
	   		               end_time: item.end_time,
	   		               reach: item.value
	   		            };
	   		        }));
	  			  last_total_reach=last_total_reach+ obj_reach_week[obj_reach_week.length-1].reach;
	  		  			if(count_reachSummaryPage_last==total_channel){
	  		  			var percent_reach=0;
	  		  				if(total_reach>0){
	  		  				percent_reach= Math.floor(((total_reach-last_total_reach)/total_reach)*100);
	  		  				}
	  		  				
	  		  				if(percent_reach>0){
	  		  					
							$("#growth_reach_cl").removeClass("red");
							$("#growth_reach_cl").addClass("blue");
							//$("#growth_reach_cl").append('<i class="icon-caret-up"></i>');
						}
						else if(percent_reach<0)
							{
							percent_reach=(-1)*percent_reach;
							$("#growth_reach_cl").removeClass("blue");
							$("#growth_reach_cl").addClass("red");
							$("#growth_reach_cl i").removeClass("icon-caret-up");
							$("#growth_reach_cl i").addClass("icon-caret-down");
							///$("#growth_reach_cl").append('<i class="icon-caret-down"></i>');
							}
						else
							{
							$("#growth_reach_cl i").removeClass("icon-caret-up");
							$("#growth_reach_cl i").removeClass("icon-caret-down");
							}
						$("#dashboard_facebook_page #growth_reach_num").text(percent_reach+"%");
	  		  			}
	  			}
  			
	  		});
	  		
	  	}
		function clearData(){
			 total_num_male=0;
			 total_num_female=0;
			 total_num_u20=0;
			 total_num_u30=0;
			 total_num_u40=0;
			 total_num_u50=0;
			 total_num_u60=0;
			 total_num_u70=0;
			 total_post_number = 0;
			 total_last_post_number = 0;
			 total_like_number = 0;
			 total_last_like_number = 0;
			 total_comment_number = 0;
			 total_last_comment_number = 0;
			 total_comment_like_number = 0;
			 total_last_comment_like_number = 0;
			 total_share_number = 0;
			 total_last_share_number = 0;
			 total_fans_number=0;
			 total_last_fans_number=0;
			 total_engagement = 0;
			 total_active = 0;
			 count_demochart=0;
			 count_getEngagementFb=0;
			 count_getTopPost=0;
			 count_reachSummaryPage=0;
			 last_total_reach=0;
			 total_reach=0;
			 count_reachSummaryPage_last=0;
			 count_getEngagementLastFb=0;
			 //total_last_fans_number=0;
			 count_getFansPageLast=0;
		}
	
		function checkChannelDetail(){
			try{
			//load_summary_page=true;
			
			$.ajax({ 
				  url : 'GetChannelDetail.do',
				  dataType: 'json',
				 // data: dataString,
				  success : function(source) {
					 if(source.length==0){
						 $("#connect_a_channel").click();

					 }
						
					}
					
			  });
			}
			catch(ex){
				
			}
		}
		function getChannelSummaryPage(){
			try{
			//load_summary_page=true;
			var dataString=[];
			 dataString.push({
	            name: "channel_id", 
	            value: 2
	        });
			$.ajax({ 
				  url : 'GetChannelDetail.do',
				  dataType: 'json',
				  data: dataString,
				  success : function(source) {
					  $("#list-facebook-page").empty();
					  var current_date = formatDateCurrent();
					  current_date = current_date + " 00:00:00";
						for(var i=0; i<source.length;i++){
						getToken(source[i].channel_detail_id,source[i].pchannel_id,source[i].token_user,source.length,source[i].channel_user);
						}
						checkEmptyChannel("#box_channel");
						
					}
					
			  });
			}
			catch(ex){
				
			}
		}
		