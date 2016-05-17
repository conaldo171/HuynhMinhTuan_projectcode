/***************************************************************************
 Page Code:	analysis/facebook
 First Author:
 Created Date: 
 **************************************************************************/
 
/*** Gray theme for Highcharts JS ***/


var object_content_chart = new Object();
var object_summary_chart=new Object();
var array_summary=new Array();
var arraylast_summary=new Array();
var array_infulence= new Array();
var obj = new Array();
var last_obj = new Array();
var demographic_chart=new Object();
var obj_influence =new Object();
var object_report_fb = new Object();
var array_influence_export = new Array();
var array_content_top_20_export = new Array();
var array_summary_export = new Array();
var limitFrom = 0;
var limitTo = 200;
var list_post_id="";
var arr = new Array();
var post_arr=new Array();
var fans_number = 0;
var total_post = 0;
var like_total = 0;
var comment_total = 0;
var share_total = 0;
var comment_like_total = 0;
var total_reach=0;
var last_total_reach=0;
var last_channel_id;

$(document).ready(function() {
	checkExprired();
	var date = new Date();
	var currentDate = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
	var lastDate = new Date();
	var days = 7;
	var res = date.setTime(date.getTime() - (days * 24 * 60 * 60 * 1000));		
	var lastDate = new Date(res);
	var newDate = (lastDate.getMonth() + 1) + "/" + lastDate.getDate() + "/" + lastDate.getFullYear();
	$("#analysis_facebook #dashboard_range_three").val(newDate +" to " + currentDate);
	$("#analysis_facebook #dashboard_range_two").val(newDate +" to " + currentDate);
	$('#analysis_facebook #dashboard_range_three').daterangepicker({opens: 'left',
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
	
	$('#analysis_facebook #dashboard_range_two').daterangepicker({opens: 'left',
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
		var load_option = $("#analysis_facebook .content_right").attr("load_option");
		if (load_option==1){
			$("#calendar_three").show();
			$("#calendar_two").hide();
		}else{
			$("#calendar_three").hide();
			$("#calendar_two").show();
		}
	},1000);
	

	aoFrm.setLang("#aoFrm-content","analysis/facebook-page");
	object_report_fb.title_summary={date:"Date",fan:"Fan",newfan:"New Fan",friendsoffan:"Friend of Fan",reach:"Reach",peopletalking:"People Talikng",engagement:"Engagement",activity:"Activity",spread:"spread",engagementRate:"Engagement Rate",brandroyalty:"Brand Royalty",content:"Content",like:"Like",share:"Share",comment:"Comment",likeofcomment:"Like of Comment" };
	object_report_fb.title_top20={date:"Date",no:"No",title:"Title",engagement:"Engagement",peopletalking:"People Talikng",reach:"Reach",like:"Like",share:"Share",comment:"Comment",commentoflike:"Like of Comment"};
	object_report_fb.title_influence={date:"Date",no:"No",account:"Account",spread:"Spread",brandroyalty:"Brand Royalty"};
	$("#summary_fb .action-nav-button a").click(function(){
		var type = $(this).attr("type");
		$("#summary_fb .action-nav-button a").removeClass("active");
		$(this).addClass("active");
		$("#summary_title_fb").html("<span text='"+type+"'>"+type+"</span>");
		var load_option = $("#analysis_facebook .content_right").attr("load_option");
		drawSumaryChart(type,load_option);
		
		
	});
	$("#contents .action-nav-button a").click(function(){
		var type = $(this).attr("type");
		$("#contents .action-nav-button a").removeClass("active");
		$(this).addClass("active");
		var load_option = $("#analysis_facebook .content_right").attr("load_option");
		drawContentChart(type,load_option);
		//drawContentChart_Export();
		
	});
	$("#engagement .list-action a").click(function(){
		var type = $(this).attr("type");
		$("#engagement .list-action a").removeClass("active");
		$(this).addClass("active");
		var load_option = $("#analysis_facebook .content_right").attr("load_option");
		drawEngagementChart(type,load_option);
		
	});
	$("#save_data_fb_page").click(function(){
		$("#calendar_three").show();
		$("#calendar_two").hide();
		$("#reltime_fb_page").empty();
		var pchannel_detail_id = $("#analysis_facebook .content_right").attr("pchannel_detail_id");
		var access_token = $("#analysis_facebook .content_right").attr("access_token");
		var channel_detail_id = $("#analysis_facebook .content_right").attr("id");
		updateLoadData(channel_detail_id,1);
		$("#reltime_fb_page").append("Saved Data");
		
		 getDataFBStream(channel_detail_id,pchannel_detail_id,access_token,1);
				
	});
	$("#real_time_fb_page").click(function(){
		$("#calendar_three").hide();
		$("#calendar_two").show();
		$("#reltime_fb_page").empty();
		var pchannel_detail_id = $("#analysis_facebook .content_right").attr("pchannel_detail_id");
		var access_token = $("#analysis_facebook .content_right").attr("access_token");
		var channel_detail_id = $("#analysis_facebook .content_right").attr("id");
		var channel_user=$("#analysis_facebook .content_right").attr("channel_user");
		updateLoadData(channel_detail_id,0);
		$("#reltime_fb_page").append("Real time data");
		getReportFb(channel_detail_id,pchannel_detail_id,access_token,0,channel_user);
	});
	var page_id_post;
	if(load_analysis==true){
	getChannelReport();
	}
});

$(".range_inputs .btn").click(function(){
	setTimeout(function(){
		var pchannel_detail_id = $("#analysis_facebook .content_right").attr("pchannel_detail_id");
		var access_token = $("#analysis_facebook .content_right").attr("access_token");
		var channel_detail_id = $("#analysis_facebook .content_right").attr("id");
		var load_option = $("#analysis_facebook .content_right").attr("load_option");
		var channel_user=$("#analysis_facebook .content_right").attr("channel_user");
		//var type_fb = $("#analysis_facebook .content_right").attr("type");
		$("#summary_fb .action-nav-button a").removeClass("active");
		$("#summary_fb .action-nav-button a:first").addClass("active");
		$("#contents .action-nav-button a").removeClass("active");
		$("#contents .action-nav-button a:first").addClass("active");
		$("#engagement .list-action a").removeClass("active");
		$("#engagement .list-action a:first").addClass("active");
		if(load_option==1){
			 getDataFBStream(channel_detail_id,pchannel_detail_id,access_token,1);
		}
		else
			{
			getReportFb(channel_detail_id,pchannel_detail_id,access_token,load_option,channel_user);
			}
		
	},100);
});

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

/*** age Chart  ***/

	  	var num_male=0;
		var num_female=0;
		var num_u20=0;
		var num_u30=0;
		var num_u40=0;
		var num_u50=0;
		var num_u60=0;
		var num_u70=0;
		var count=0;
		var countPage=0;
	var locale_array=new Array();
	var locale_data = new Array();
	var locale_time= new Array();
   

      function genderChart(num_male){
    	  var obj_gender_chart=new Object();
    	  obj_gender_chart.women_value=100-num_male;
    	  obj_gender_chart.men_value=num_male;
    	  object_report_fb.gender_chart=obj_gender_chart;
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
    	  var obj_age_chart= new Object();
  		var  u20data=0;
  		var  u30data=0;
  		var  u40data=0;
  		var  u50data=0;
  		var  u60data=0;
  		var  u70data=0;
  		var sum =1;
  		sum=num_u20+num_u30+num_u40+num_u50+num_u60+num_u70;
  		
  			u20data=Math.round(num_u20/sum*100);
  			u30data=Math.round(num_u30/sum*100);
  			u40data=Math.round(num_u40/sum*100);
  			u50data=Math.round(num_u50/sum*100);
  			u60data=Math.round(num_u60/sum*100);
  			u70data=100-u20data-u30data-u40data-u50data-u60data;
  			obj_age_chart.u20data=u20data;
  			obj_age_chart.u30data=u30data;
  			obj_age_chart.u40data=u40data;
  			obj_age_chart.u50data=u50data;
  			obj_age_chart.u60data=u60data;
  			obj_age_chart.u70data=u70data;
  			object_report_fb.age_chart=obj_age_chart;
  			info = new Highcharts.Chart({
  				chart: {
  					renderTo: 'age',
  					margin: [0, 0, 0, 0],
  					backgroundColor: null,
  	                plotBackgroundColor: 'none',
  	                marginTop: -65
  								
  				},
  				credits: {
  	                enabled: false
  	            },
  				title: {
  					text: null
  				},
  				legend: {
  					width: 170
  				},
  				tooltip: {
  					formatter: function() { 
  						return this.point.name +': '+ this.y +' %';
  							
  					} 	
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
  							name: 'From 18 to 24 years old',
  							y: u20data,
  							color: '#62c462'
  						},
  						{
  							name: 'From 25 to 34 years old',
  							y: u30data,
  							color: '#2f9734'
  						},
  						{
  							name: 'From 35 to 44 years old',
  							y: u40data,
  							color: '#edb836'
  						},
  						{
  							name: 'From 45 to 54 years old',
  							y: u50data,
  							color: '#8A9499'
  						},
  						{
  							name: 'Fron 55 to 64 years old',
  							y: u60data,
  							color: '#d84436'
  						},
  							
  						{
  							name: 'Above 65 years old',
  							y: u70data,
  							color: '#babab8'
  						}
  						],
  						
  						dataLabels: {
  							enabled: false,
  							color: '#000000',
  							connectorColor: '#000000',
  							 showInLegend: true
  						}
  				}]
  			});
  			 	
  		} 
      
      function getReportFb(channel_detail_id,pchannel_detail_id,token,load_option,channel_user){
    	 
    	  aoFrm.mess("close","close");
    	$("#analysis_facebook .content_right .block_content").css("opacity","0.3");
  		$("#analysis_facebook .itemLoading").show();
  		//var load_option = $("#analysis_facebook .content_right").attr("load_option");
  		var stringDate ="";
		if (load_option==0){
			
			stringDate = $("#analysis_facebook #dashboard_range_two").val();
		}else{
			stringDate = $("#analysis_facebook #dashboard_range_three").val();
		}
    	
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
  		var day = Math.round((newDateTo - newDateFrom)/60/60/24);
  		if(day>60){
  			var tempdate=day-60;
  			day=60;
  			newDateFrom=newDateFrom+(tempdate * 24 * 60 * 60);
  		}
  		var prevDate = newDateFrom-(24 * 60 * 60);
  		arraylast_summary=[];
  		array_summary=[];
  		obj =[];
  		last_obj=[];
  		arr = [];
		post_arr= [];
  		list_post_id="";
  		obj_influence = {};
  		object_content_chart={};
  		object_summary_chart={};
  		demographic_chart={};
  		array_influence_export=[];
  		array_content_top_20_export=[];
  		array_summary_export=[];
  		object_report_fb.content_influence=[];
  		total_post = 0;
  		like_total = 0;
	  	comment_total = 0;
	  	share_total = 0;
	  	comment_like_total = 0;
	  
  		while (prevDate < newDateTo - (24 * 60 * 60)){
  			var dateFrom = new Date(prevDate * 1000);
  			obj.push({"day": (dateFrom.getMonth() + 1) + "/" + dateFrom.getDate() + "/" + dateFrom.getFullYear(),"content":0,"like":0,"share":0,"comment":0,"likeofcomment":0,"engagement":0,"activity":0,"spread":0,"engagementRate":0,"brand_royalty":0});
  			array_summary.push({"day": (dateFrom.getMonth() + 1) + "/" + dateFrom.getDate() + "/" + dateFrom.getFullYear(),"fan":0,"reach":0,"peopletalking":0,"friendsoffan":0});
  			prevDate = prevDate + (24 * 60 * 60);
  		}
  		var query = "";
 			query = 'SELECT permalink,source_id, post_id ,created_time,message,share_count,like_info,comment_info FROM stream WHERE message <> "" and source_id = '+channel_detail_id+' limit 0,200' ;
  			// getFriendsSummary(stringFrom,stringTo,channel_detail_id,"facebookpage");
			FB.api({method: 'fql.query',
		        query: query,access_token:token
		      },function(response) {
		    		selectFqlComment(channel_detail_id, token,newDateFrom,newDateTo,channel_user);
		    	  if(!isNull(response.error)){
						// $("#analysis_facebook .content_right .block_content").css("opacity","1");
						 $("#analysis_facebook .content_right").append("<div id='div_error_fb_page' style='width:100%; height:100%;position:absolute;z-index:9999;top:0'></div>")
					  		$("#analysis_facebook .itemLoading").hide();
						 checkAccountError(response,"facebookpage",channel_user);
					}
		    	  else
		    		  {
		    		  $("#div_error_fb_page").remove();
		    		  getTopPost(response,newDateFrom,newDateTo,channel_detail_id,pchannel_detail_id,token,load_option,day);
		    		//  if(channel_detail_id != pchannel_detail_id){
		    	  			if(day>56){
		    	  				
		    	  				getTokenPage(channel_detail_id,pchannel_detail_id,token,lastDateTo,newDateTo,load_option);	
		    	  			}
		    	  			else
		    	  				{
		    	  				getTokenPage(channel_detail_id,pchannel_detail_id,token,lastDateFrom,newDateTo,load_option);
		    	  				}
		    	  			
		    					
		    			//}
		    		  }
					
  	  				//contentChartFb(response);
					//drawContentChart("content");
		      });
  		
  		
  		var lastDateTo = newDateFrom - (24 * 60 * 60);
  		var lastDateFrom = lastDateTo - (day * 24 * 60 * 60);
  		var lastPrevDate = lastDateFrom;
  		while (lastPrevDate < lastDateTo){
  			var dateFrom = new Date(lastPrevDate * 1000);
  			last_obj.push({"day": (dateFrom.getMonth() + 1) + "/" + dateFrom.getDate() + "/" + dateFrom.getFullYear(),"content":0,"like":0,"share":0,"comment":0,"likeofcomment":0});
  			arraylast_summary.push({"day": (dateFrom.getMonth() + 1) + "/" + dateFrom.getDate() + "/" + dateFrom.getFullYear(),"fan":0,"reach":0,"peopletalking":0,"friendsoffan":0,"engagement":0});
  			lastPrevDate = lastPrevDate + (24 * 60 * 60);
  		}
  		//lastContentChartFb(channel_detail_id,token,lastDateFrom,lastDateTo,type_fb);
  		
      }
      
      function getTopPost(response,newDateFrom,newDateTo,channel_detail_id,pchannel_detail_id,token,load_option,day){
    	 if (last_channel_id!=channel_detail_id){
    		return;
    	}
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
  			total_fans = fans_number;
  			var number_no=0;
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
  	  		var link_post;
  	  		//var source_id;
  	  		link_post = response[i].permalink;
  	  		time_post = response[i].created_time;
  				
  				if ((lastDateFrom<=time_post)&&(time_post<=newDateTo)){
  					
  					this.source_id = response[i].source_id;
  					var user_id=this['source_id'];
  					post_id = response[i].post_id;
  					list_post_id =list_post_id+","+'"'+post_id+'"';
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
	  	  			total = parseInt(comment_num) + parseInt(share_num) + parseInt(like_num) + parseInt(comment_like_num);
	  	  			
	  	  			spread = total;
	  	  			brand_royalty = parseInt(share_num) + parseInt(comment_num);
	  	  			
	  	  			//var tweet_day_total = 0;
	  	  			like_total = parseInt(like_total) + parseInt(like_num);
	  	  			comment_total = parseInt(comment_total) + parseInt(comment_num);
	  	  			share_total = parseInt(share_total) + parseInt(share_num);
	  	  			comment_like_total = parseInt(comment_like_total) + parseInt(comment_like_num);
  		  			var date_post = new Date(time_post * 1000);
  		  			date_post = (date_post.getMonth() + 1) +"/"+ date_post.getDate()+ "/" +date_post.getFullYear();
  		  			
  	  				for (var k=0; k<obj.length;k++){
  			    			if (obj[k].day == date_post){
  			    				obj[k].content = parseInt(obj[k].content) + 1;
  			    				obj[k].like = parseInt(obj[k].like) + parseInt(like_num);
  			    				obj[k].share = parseInt(obj[k].share) + parseInt(share_num);
  			    				obj[k].comment = parseInt(obj[k].comment) +  parseInt(comment_num);
  			    				//obj[k].likeofcomment = parseInt(obj[k].likeofcomment) + parseInt(comment_like_num);
  			    				obj[k].engagement = parseInt(obj[k].engagement) + parseInt(total);
  			    				obj[k].activity = parseInt(obj[k].activity) + parseInt(total);
  			    				obj[k].spread = parseInt(obj[k].spread) + parseInt(spread);
  			    				obj[k].brand_royalty = parseInt(obj[k].brand_royalty) + parseInt(brand_royalty);
  			    			//array of summary
  			    				//array_summary[k].peopletalking = total;
  			    				//array_summary[k].reach = total;
  			    			}
  			    		}
	  	  			for (var l=0; l<last_obj.length;l++){
		  	  			if (last_obj[l].day == date_post){
			  	  			last_obj[l].content = parseInt(last_obj[l].content) + 1;
			  				last_obj[l].like = parseInt(last_obj[l].like) + parseInt(like_num);
			  				last_obj[l].share = parseInt(last_obj[l].share) + parseInt(share_num);
			  				last_obj[l].comment = parseInt(last_obj[l].comment) + parseInt(comment_num);
			  				last_obj[l].likeofcomment = parseInt(last_obj[l].likeofcomment) + parseInt(comment_like_num);
			  				//arraylast_summary[l].peopletalking = total;
			  				//arraylast_summary[l].reach = total;
		  	  			}
		  	  			
		    		}
		  	  		if ((newDateFrom<=time_post)&&(time_post<=newDateTo)){
		  	  		    number_no++;
		  				htmlGeneral = '<td class="story" title="'+title+'" id="'+post_id+'"><a href="'+link_post+'" target="_blank">'+string+'</a></td><td class="show-amount">'+total+'</td><td class="like">'+like_num+'</td><td class="share">'+share_num+'</td><td class="comment">'+comment_num+'</td><td class="comment-like">'+comment_like_num+'</td></tr>';		  				
		  				arr.push({"total":total,"html":htmlGeneral,"like":like_num,"share":share_num,"comment":comment_num,"commentlike":comment_like_num,"title":string,"post_id":post_id,"link_post":link_post});
						
						
					}
  	  				
  	  		}
  			//	}
  		}
		//--------------tuan----------------------4-11-14
  		var number_top = $("#number-content-top").val();
	
  		if ((lastDateFrom <= time_post)&&(time_post<=newDateTo)){
  			if (total_post<=1000){
  				if ((newDateFrom<=time_post)&&(time_post<=newDateTo)&&(load_option==0)&& (day <56)){
  	  				getReportFbMore(channel_detail_id,pchannel_detail_id,token,time_post,load_option,day);
  	  				
  	  			}else{
  	  				last_channel_id = channel_detail_id;
  	  				arr.sort(function(a,b){
  	  	  				return b.total - a.total;
  	  	  			});
  	  				var number_top = $("#number-content-top").val(); 
	  	  			loadHtmlTop(number_top,arr,total_fans,date1,date2);
	  	  			
		  	  		$("#number-content-top").keydown(function(e) {
		                if(e.keyCode==13){
		              	  number_top = $(this).val();
		              	  loadHtmlTop(number_top,arr,total_fans,date1,date2);
						  
						  getReachPost(list_post_id,token);
		    			}			
		            });
	  	  	  		object_report_fb.content_top20=array_content_top_20_export;	
	  	  	  		getReachPost(list_post_id,token);
	  	  	  			//getsummary_export();
	  	  	  		if(load_option==1){
	  	  	  			
	  	  	  		drawEngagementChart("engagement");
  	  	  			drawEngagementChart_export();
	  	  	  		}
	  	  	  			
	  	  	  			drawContentChart("content");
	  	  	  		   drawContentChart_Export();
	  		  	  		$("#analysis_facebook .content_right .block_content").css("opacity","1");
	  					$("#analysis_facebook .itemLoading").hide();
  	  			}
  			}else{
  				last_channel_id = channel_detail_id;
  				aoFrm.mess("alert",mess.report_exceed);
  				
  	  			arr.sort(function(a,b){
  		  				return b.total - a.total;
  		  			});
	  	  		var number_top = $("#number-content-top").val(); 
		  			loadHtmlTop(number_top,arr,total_fans,date1,date2);
					
	  	  		$("#number-content-top").keydown(function(e) {
	                if(e.keyCode==13){
	              	  number_top = $(this).val();
	              	  loadHtmlTop(number_top,arr,total_fans,date1,date2);
					
					   getReachPost(list_post_id,token);
	    			}			
	            });	
  		  		    object_report_fb.content_top20=array_content_top_20_export;	
  		  	        getReachPost(list_post_id,token);
  		  			//getsummary_export();
  		  	    if(load_option==1){
	  	  	  		drawEngagementChart("engagement");
  	  	  			drawEngagementChart_export();
	  	  	  		}
  		  			drawContentChart("content");
	  	  	  		drawContentChart_Export();
	  		  		$("#analysis_facebook .content_right .block_content").css("opacity","1");
					$("#analysis_facebook .itemLoading").hide();
  			}
  			
  		}else{
  			
	  			arr.sort(function(a,b){
		  				return b.total - a.total;
		  			});
	  			var number_top = $("#number-content-top").val(); 
					loadHtmlTop(number_top,arr,total_fans,date1,date2);
					
	  	  		$("#number-content-top").keydown(function(e) {
	                if(e.keyCode==13){
	              	  number_top = $(this).val();
	              	  loadHtmlTop(number_top,arr,total_fans,date1,date2);
					
					   getReachPost(list_post_id,token);
	    			}			
	            });
	  			object_report_fb.content_top20=array_content_top_20_export;	
	  			getReachPost(list_post_id,token);
	  			//getsummary_export();
	  			if(load_option==1){
	  	  	  		drawEngagementChart("engagement");
  	  	  			drawEngagementChart_export();
	  	  	  		}
	  			drawContentChart("content");
	  	  	  	drawContentChart_Export();
	  			$("#analysis_facebook .content_right .block_content").css("opacity","1");
				$("#analysis_facebook .itemLoading").hide();
  		}
	
      }
      
      function getFansPage(page_id_post,token_page,newDateFrom,newDateTo,load_option){
    	  total_reach=0;
    	  var channel_user=$("#analysis_facebook .content_right").attr("channel_user");
    	if(load_option==1){
    		getFbReportFromDB(page_id_post,newDateFrom,newDateTo,load_option);
    		demoGraphicPageProfile(page_id_post,fans_number,token_page,newDateFrom,newDateTo);
    	}  
    	else
    		{
    		
    		FB.api('/'+page_id_post+'/insights/page_fans?since='+newDateFrom+'&until='+newDateTo+'',{access_token:token_page}, function(response) {
    			if(!isNull(response.error)){
    				
    				 $("#analysis_facebook .content_right").append("<div id='div_error_fb_page' style='width:100%; height:100%;position:absolute;z-index:9999;top:0'></div>")
    			  		$("#analysis_facebook .itemLoading").hide();
    				 checkAccountError(response,"facebookpage",channel_user);
    			}
      			if (!isNull(response.data)){
      				$("#div_error_fb_page").remove();
      				for (var i=0;i<response.data[0].values.length;i++){
      					fans_number = response.data[0].values[i].value;
      				}
      				$("#analysis_facebook .content_right .block-nodata").empty();
      				if(fans_number >= 30){
      					
      					demoGraphicPageProfile(page_id_post,fans_number,token_page,newDateFrom,newDateTo);
      					sumaryPagesChart(response.data[0].values);
      					peopletalkingSummaryPage(page_id_post,token_page,newDateFrom,newDateTo);
      					engagementInsightFB(page_id_post,token_page,newDateFrom,newDateTo)
      					reachSummaryPage(page_id_post,token_page,newDateFrom,newDateTo);
      				}else{
      					$("#analysis_facebook .content_right .block_content").css("opacity","0.3");
      					
      					$("#analysis_facebook .content_right").append("<div class='block-nodata'><div class='nodata span3'><h4 text='nodata'>NO DATA FROM FACEBOOK</h4><p text='providedata'>Facebook will only provide data for pages that have a certain level of activity. Please verify that the Facebook accounts you included in this group have more than 30 fans.</p></div></div>");
      					$("#analysis_facebook .content_right").append("<div id='div_error_fb_page' style='width:100%; height:100%;position:absolute;z-index:9999;top:0'></div>")
      					sumaryPagesChart(response.data[0].values);
      					peopletalkingSummaryPage(page_id_post,token_page,newDateFrom,newDateTo);
      					//drawSumaryChart("fan",load_option);
      					//drawSumaryChart_Export(0);
      					//sumaryPagesChart(response.data[0].values);
      					//peopletalkingSummaryPage(page_id_post,token_page,newDateFrom,newDateTo);
      					//drawEngagementChart("engagement");
      		  			//drawEngagementChart_export();
      					//demoGraphicPageProfile(page_id_post,0,token_page,newDateFrom,newDateTo);
      					$("#analysis_facebook .itemLoading").hide();
      				}
      			}
      			
      		 });
    		}
  		
  		
  	 }
      
     
  	function demoGraphicPageProfile(channel_detail_id,fans_number,token_page,newDateFrom,newDateTo){
  		$("#fb_education").hide();
		$("#fb_status").hide();
  		FB.api('/'+channel_detail_id+'/insights/page_fans_gender_age?since='+newDateFrom+'&until='+newDateTo+'',{access_token:token_page}, function(response) {
  			//var num_u25 = 0;//response.data[0].values[0].value["M.25-34"]+response.data[0].values[0].value["F.25-34"];
  			var num_male=0;
  			var num_female=0;
  			var num_u20=1;
  			var num_u30=0;
  			var num_u40=0;
  			var num_u50=0;
  			var num_u60=0;
  			var num_u70=0;
  			if(!isNull(response.data[0].values[0].value["M.25-34"])){
  				num_u30 = num_u30+response.data[0].values[0].value["M.25-34"];
  				num_male=num_male+response.data[0].values[0].value["M.25-34"];
  			}
  			if(!isNull(response.data[0].values[0].value["F.25-34"]))	
  				{
  				num_u30 = num_u30+response.data[0].values[0].value["F.25-34"];
  				num_female=num_female+response.data[0].values[0].value["F.25-34"];
  				}
  			if(!isNull(response.data[0].values[0].value["F.18-24"])){
  				num_u20 = num_u20+response.data[0].values[0].value["F.18-24"];
  				num_male=num_male+response.data[0].values[0].value["F.18-24"];
  			}
  			if(!isNull(response.data[0].values[0].value["M.18-24"])){
  				num_u20 = num_u20+response.data[0].values[0].value["M.18-24"];
  				num_female=num_female+response.data[0].values[0].value["M.18-24"];
  			}
  			if(!isNull(response.data[0].values[0].value["F.35-44"])){
  				num_u40 = num_u40+response.data[0].values[0].value["F.35-44"];
  				num_male=num_male+response.data[0].values[0].value["F.35-44"];
  			}
  			if(!isNull(response.data[0].values[0].value["M.35-44"])){
  				num_u40 = num_u40+response.data[0].values[0].value["M.35-44"];
  				num_female=num_female+response.data[0].values[0].value["M.35-44"];
  			}
  			if(!isNull(response.data[0].values[0].value["M.45-54"])){
  				num_u50 = num_u50+response.data[0].values[0].value["M.45-54"];
  				num_male=num_male+response.data[0].values[0].value["M.45-54"];
  			}
  			if(!isNull(response.data[0].values[0].value["M.45-54"])){
  				num_u50 = num_u50+response.data[0].values[0].value["M.45-54"];
  				num_female=num_female+response.data[0].values[0].value["M.45-54"];
  			}
  			
  			if(!isNull(response.data[0].values[0].value["M.55-64"])){
  				num_u60 = num_u60+response.data[0].values[0].value["M.55-64"];
  				num_male=num_male+response.data[0].values[0].value["M.55-64"];
  			}
  			if(!isNull(response.data[0].values[0].value["M.55-64"])){
  				num_u60 = num_u60+response.data[0].values[0].value["M.55-64"];
  				num_female=num_female+response.data[0].values[0].value["M.55-64"];
  			}
  			if(!isNull(response.data[0].values[0].value["M.65-74"])){
  				num_u70 = num_u70+response.data[0].values[0].value["M.65-74"];
  				num_male=num_male+response.data[0].values[0].value["M.65-74"];
  			}
  			if(!isNull(response.data[0].values[0].value["M.65-74"])){
  				num_u70 = num_u70+response.data[0].values[0].value["M.65-74"];
  				num_female=num_female+response.data[0].values[0].value["M.65-74"];
  			}
  			var total_gender=0;
  			total_gender=num_male+num_female;
  			if(total_gender>0){
  				num_male=Math.round(num_male/total_gender*100);
  			}
  			else
  				num_male=100;
  			
  			ageChart(num_u20, num_u30, num_u40, num_u50, num_u60,num_u70);
  			genderChart(num_male);
  			
  			$("#analysis_facebook .content_right .block_content").css("opacity","1");
  			 $("#analysis_facebook .itemLoading").hide();	
  		
  	});
  	}
  	
  	
  	function drawContentChart(type){
  		aoFrm.setLang("#box-content","analysis/facebook-page");
  		$("#contents_title_fb").html("<span text='contents'>"+type+"<span>");
  		if (type=="content"){
			$("#contents_title_fb").html("<span text='contents'>"+type+"</span>");
		}else if(type=="like"){
			$("#contents_title_fb").html("<span text='like'>"+type+"</span>");
		}
		else if(type=="share"){
			$("#contents_title_fb").html("<span text='share'>"+type+"</span>");
		}else if(type=="comment"){
			$("#contents_title_fb").html("<span text='comment'>"+type+"</span>");
		}else{
			$("#contents_title_fb").html("<span text='commentlike'>"+type+"</span>");
		}
  		
  		var total_content = 0;
  		var last_total_content = 0;
  		var new_content = 0;
  		var total_like = 0;
  		var new_like = 0;
  		var last_total_like =0;
  		var total_share = 0;
  		var last_total_share = 0;
  		var new_share = 0;
  		var total_comment = 0;
  		var last_total_comment = 0;
  		var new_comment = 0;
  		var total_comment_like = 0;
  		var last_total_comment_like = 0;
  		var new_comment_like = 0;
  		
  		
  		var array_date_title = new Array();
  		var array_date = new Array();
  		var array_content = new Array();
  		var array_like = new Array();
  		var array_comment = new Array();
  		var array_share = new Array();
  		var array_comment_like = new Array();
  		var array_engagement = new Array();
  		
  		var last_array_date_title = new Array();
  		var last_array_content = new Array();
  		var last_array_like = new Array();
  		var last_array_comment = new Array();
  		var last_array_share = new Array();
  		var last_array_comment_like = new Array();
  		var day_number=obj.length-1;
  		for (var i=0;i<obj.length;i++){
  			
  			var days = new Date(obj[i].day);
  			array_date.push(days.getMonth() + 1 + "/" + days.getDate());
  			array_date_title.push(days.getMonth() + 1 + "/" + days.getDate());
  			array_content.push(obj[i].content);
  			total_content = total_content + obj[i].content;
  			array_like.push(obj[i].like);
  			total_like = total_like + obj[i].like;
  			array_comment.push(obj[i].comment);
  			total_comment = total_comment + obj[i].comment;
  			array_share.push(obj[i].share);
  			total_share = total_share + obj[i].share;
  			array_comment_like.push(obj[i].likeofcomment);
  			total_comment_like = total_comment_like + obj[i].likeofcomment;
  			//array_engagement.push(obj[i].likeofcomment);
  			
  		}
  		for (var j=0;j<last_obj.length;j++){
  			var days = new Date(last_obj[j].day);
  			last_array_date_title.push(days.getMonth() + 1 + "/" + days.getDate());
  			last_array_content.push(last_obj[j].content);
  			last_total_content = last_total_content + last_obj[j].content;
  			last_array_like.push(last_obj[j].like);
  			last_total_like = last_total_like + last_obj[j].like;
  			last_array_comment.push(last_obj[j].comment);
  			last_total_comment = last_total_comment + last_obj[j].comment;
  			last_array_share.push(last_obj[j].share);
  			last_total_share = last_total_share + last_obj[j].share;
  			last_array_comment_like.push(last_obj[j].likeofcomment);
  			last_total_comment_like = last_total_comment_like + last_obj[j].likeofcomment;
  		}
  		
  		new_content = total_content - last_total_content;
  		new_like = total_like - last_total_like;
  		new_comment = total_comment - last_total_comment;
  		new_share = total_share - last_total_share;
  		new_comment_like = total_comment_like - last_total_comment_like;
  		var current_date="";
		var last_date="";
		if(day_number==1){
			current_date=" recent day";
			last_date=" day before";
		}
		else
			{
			current_date=" recent days";
			last_date=" days before";
			}
  		if (new_like>0){
			$("#box-new-like").text(numberWithCommas(new_like));
			}else{
				$("#box-new-like").text(0);
			}
  		if (total_content > last_total_content){
  			$("#box-new-content").addClass("green");
  			$("#box-new-content").removeClass("red");
  			$("#box-new-content").html("<i class='icon-plus'></i>");
  		}else{
  			$("#box-new-content").addClass("red");
  			$("#box-new-content").removeClass("green");
  			$("#box-new-content").html("<i class='icon-minus'></i>");
  		}
  		
  		var array_current = new Array();
  		var last_array_current = new Array();
  		if (type == "content"){
  			
  			if(last_total_content>0)
				growth_of=Math.floor(((total_content-last_total_content)/last_total_content)*100);
				else
					growth_of=0;
				contentGrowth(growth_of);
				if (new_content>0){
					new_content = new_content;
      			}else{
      				new_content = 0;
      			}
  			$("#content-text-total").html("<span text='totalcontent'>Total Content</span>");
  			$("#content-text-new").html("<span text='newcontent'>New Content</span>");
  			$("#content-text-growth").html("<span text='contentgrowth'>Growth of rate</span>");
  			$("#number-total").html(numberWithCommas(total_content));
  			$("#number-new").html(numberWithCommas(new_content));
  			
  			array_current = array_content;
  			last_array_current = last_array_content;
  		}else if(type =="like"){
  			
  			if(last_total_like>0)
				growth_of=Math.floor(((total_like-last_total_like)/last_total_like)*100);
				else
					growth_of=0;
				contentGrowth(growth_of);
				if (new_like>0){
					new_like = new_like;
      			}else{
      				new_like = 0;
      			}
				
				
  			$("#number-total").html(total_like);
  			$("#number-new").html(new_like);
  			
  			$("#content-text-total").html("<span>"+day_number+"</span><span text='total_current_date'>"+current_date+"</span>");
  			$("#content-text-new").html("<span>"+day_number+"</span><span text='total_last_date'>"+last_date+"</span>");
  			$("#content-text-growth").html("<span text='contentgrowth'>Growth of rate</span>");
  			array_current = array_like;
  			last_array_current = last_array_like;
  		}else if(type =="share"){
  			
  			if(last_total_share>0)
				growth_of=Math.floor(((total_share-last_total_share)/last_total_share)*100);
				else
					growth_of=0;
				contentGrowth(growth_of);
				if (new_share>0){
					new_share = new_share;
      			}else{
      				new_share = 0;
      			}
  			$("#number-total").html(numberWithCommas(total_share));
  			$("#number-new").html(numberWithCommas(new_share));
  			$("#content-text-total").html("<span>"+day_number+"</span><span text='total_current_date'>"+current_date+"</span>");
  			$("#content-text-new").html("<span>"+day_number+"</span><span text='total_last_date'>"+last_date+"</span>");
  			$("#content-text-growth").html("<span text='contentgrowth'>Growth of rate</span>");
  			array_current = array_share;
  			last_array_current = last_array_share;
  		}else if(type =="comment"){
  			
  			if(last_total_comment>0)
				growth_of=Math.floor(((total_comment-last_total_comment)/last_total_comment)*100);
				else
					growth_of=0;
				contentGrowth(growth_of);
				if (new_comment>0){
					new_comment = new_comment;
      			}else{
      				new_comment = 0;
      			}
  			$("#number-total").html(numberWithCommas(total_comment));
  			$("#number-new").html(numberWithCommas(new_comment));
  			
  			$("#content-text-total").html("<span>"+day_number+"</span><span text='total_current_date'>"+current_date+"</span>");
  			$("#content-text-new").html("<span>"+day_number+"</span><span text='total_last_date'>"+last_date+"</span>");
  			$("#content-text-growth").html("<span text='contentgrowth'>Growth of rate</span>");
  			array_current = array_comment;
  			last_array_current = last_array_comment;
  		}else{
  			
  			if(last_total_comment_like>0)
				growth_of=Math.floor(((total_comment_like-last_total_comment_like)/last_total_comment_like)*100);
				else
					growth_of=0;
				contentGrowth(growth_of);
				if (new_comment_like>0){
					new_comment_like=new_comment_like;
      			}else{
      				new_comment_like=0;
      			}
	  			
  			$("#number-total").html(numberWithCommas(total_comment_like));
  			$("#number-new").html(numberWithCommas(new_comment_like));
  			
  			$("#content-text-total").html("<span>"+day_number+"</span><span text='total_current_date'>"+current_date+"</span>");
  			$("#content-text-new").html("<span>"+day_number+"</span><span text='total_last_date'>"+last_date+"</span>");
  			$("#content-text-growth").html("<span text='contentgrowth'>Growth of rate</span>");
  			array_current = array_comment_like;
  			last_array_current = last_array_comment_like;
  		}
  		//object_report_fb.content_chart=object_content_chart;
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
                   // fillOpacity:0.5
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
  	}
  	
  	function getReportFbMore(channel_detail_id,pchannel_detail_id,token,time_post,load_option,day){
  		var stringDate="";
  		if(load_option==1){
  			stringDate= $("#analysis_facebook #dashboard_range_three").val();
  		}
  		else
  			{
  			stringDate= $("#analysis_facebook #dashboard_range_two").val();
  			}
    	
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
  				query = 'SELECT permalink,source_id, post_id ,created_time, message,share_count,like_info,comment_info FROM stream WHERE message <> "" and source_id = '+channel_detail_id+' and created_time < '+time_post+' limit 200' ;
			FB.api({method: 'fql.query',
		        query: query,access_token:token
		      },function(response) {
					getTopPost(response,newDateFrom,newDateTo,channel_detail_id,pchannel_detail_id,token,day);
  	  		      });
      }
 	
  	function getsummary_export(){
   		var object_engagement= new Object();
  		var engagement = 0;
  		var brand_royalty = 0;
  		var activity = 0;
  		var engagementRate = 0;
  		var spread = 0;
  		var total_friends = 0;
  			total_friends = fans_number;
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
	    	
	    	//obj[i].engagement = engagementDate;
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
  			obj_summary_fb.reach=array_summary[i].reach;
  			obj_summary_fb.peopletalking=peopletalking;
  			obj_summary_fb.peopletalkinggrowth=roundNumber((peopletalking/total_friends)*100,2);
  			obj_summary_fb.engagement=obj[i].engagement;
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
	   // $("#engagement_num").html(engagement);
	    $("#activity_num").html(spread);
	    $("#engagement_rate_num").html(engagementRate + "%");
	    $("#brand_royalty_num").html(brand_royalty);
	    object_engagement.engagement= "Engagement";
	    object_engagement.engagement_value=engagement;
	    object_engagement.engagement_rate="Engagement Rate";
	    object_engagement.engagement_rate_value=engagementRate + "%";
	    object_engagement.activity="Activity";
	    object_engagement.activity_value=spread;
	    object_engagement.brand_royalty="Brand Royalty";
	    object_engagement.brand_royalty_value=brand_royalty;
	    object_report_fb.content_engagement=object_engagement;

  	}
  	
  	function drawEngagementChart(type){
  		
  		var array_date = new Array();
  		var array_engagement = new Array();
  		var array_activity = new Array();
  		var array_engagement_rate = new Array();
  		var array_brand_royalty = new Array();
  		
  		for (var i=0;i<obj.length;i++){
  			var days = new Date(obj[i].day);
  			array_date.push(days.getMonth() + 1 + "/" + days.getDate());
  			array_engagement.push(obj[i].engagement);
  			array_activity.push(obj[i].activity);
  			array_engagement_rate.push(obj[i].engagementRate);
  			array_brand_royalty.push(obj[i].brand_royalty);
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
                name: type,
                color: '#4DA944',
                data: formatDayRange(array_current)
            }
            ]
  		});
  	}
  	function sumaryPagesChart(data_obj){
  		var days_curent = new Date();
  		for(var i=0;i<data_obj.length;i++){
  			var date=toTimestampReport(data_obj[i].end_time);
  			var date_post = new Date(date*1000);
  			 date_post = (date_post.getMonth() + 1) +"/"+ date_post.getDate()+ "/" +date_post.getFullYear();
  			for(var j=0; j<array_summary.length;j++){
  				
  				if(array_summary[j].day==date_post)
  				array_summary[j].fan=data_obj[i].value;
  				
  			}
  			for(var k=0; k<arraylast_summary.length;k++){
  				if(arraylast_summary[k].day==date_post)
  				arraylast_summary[k].fan=data_obj[i].value;
  				
  			}
  		
  		}
  	
  		
  	}
  	function drawSumaryChart(type,load_option){
  	
  		aoFrm.setLang("#box-summary","analysis/facebook-page");
  		
  		var total_fan=0;
  	var reach_week_temp=0;
  	var peopletalking_week_temp=0;
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
  			//array_friend_of_fan.push(array_summary[j].friendsoffan);
  			if (array_summary[j].fan!=0)
  				total_fan= array_summary[j].fan;
  			//array_reach.push(array_summary[j].reach);
  			if(isNull(array_summary[j].reach)){
				array_reach.push(0);
			}
			else
				{
				array_reach.push(array_summary[j].reach);
				}
  			if(load_option==1){
  				if(j-1>0){
  					if(array_summary[j-1].reach_week>0){
  						reach_week_temp=array_summary[j-1].reach_week	
  					}
  					if(array_summary[j-1].peopletalking_week>0){
  						peopletalking_week_temp=array_summary[j-1].peopletalking_week	
  					}
  					total_reach=reach_week_temp;
  	  				total_peopletalking=peopletalking_week_temp;
  				}
  				
  			}
  			else
  				{
  				total_peopletalking=total_peopletalking+array_summary[j].peopletalking;
  				}
  			if(isNull(array_summary[j].reach)){
  				array_peopletalking.push(0);
			}
			else
				{
				array_peopletalking.push(array_summary[j].peopletalking);
				}
  			
  			
  			if(array_summary[j].fan!=0){
  				var value_peopletalking =(array_summary[j].peopletalking/array_summary[j].fan)*100;
  				var peopletalking_fan=roundNumber(value_peopletalking,2);
  				array_peopletalking_fan.push(peopletalking_fan);
  				total_peopletalking_fan =parseFloat(total_peopletalking_fan)+parseFloat(peopletalking_fan);	
  	  		
  			}
  			else
  				{
  				array_peopletalking_fan.push(0);
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
	  			else
	  				{
	  				array_last_peopletalking_fan.push(0);
	  				}
	  				
	  				if (arraylast_summary[k].friendsoffan!=0)
	  	  				last_friend_of_fan= arraylast_summary[k].friendsoffan;
	  			  			
	  			  
	  				
			}
			var day_number=array_summary.length-1;
			var current_date="";
			var last_date="";
			if(day_number==1){
				current_date=" recent day";
				last_date=" day before";
			}
			else
				{
				current_date=" recent days";
				last_date=" days before";
				}
			//c=array_peopletalking[array_peopletalking.length-1]-array_peopletalking[array_peopletalking.length-2];
			//new_peopletalking_fan=array_peopletalking_fan[array_peopletalking_fan.length-1]-array_peopletalking_fan[array_peopletalking_fan.length-2];
			//if(array_fan.length-1>0)
			//new_fan=array_fan[array_fan.length-1]-array_fan[array_fan.length-2];
			if(array_friend_of_fan.length-1>0){
				new_friend_of_fan =array_friend_of_fan[array_friend_of_fan.length-1]-array_friend_of_fan[array_friend_of_fan.length-2];
			}
			if(new_friend_of_fan>0)
			$("#new_fan").html(numberWithCommas(new_friend_of_fan));
			else
				$("#new_fan").html("0");
			if(type=="fan"){
				$("#lev3_summary_people_talking").hide();
				$("#lev3_summary_reach").hide();
				$("#lev3_summary_people_talking_percent").hide();
				$("#summary_title_fb").html("<span text='fan'>"+type+"</span>");
				$("#text-total").html("<span text='totalfan'>Total Fan</span>");
		  		$("#text-new").html("<span text='newfan'>New Fan</span>");
		  		$("#text-growth").html("<span text='growthofrate'>Growth Of Rate</span>");
				array_current=array_fan;
				array_last= array_last_fan;
				new_fan=total_fan-last_total_fan
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
				$("#number-total-fb").html(numberWithCommas(total_fan));//number-total-fb
				appendGrowth(growth_of);
				
      			if (new_fan>0){
      			
      				$("#number-total-visiter").html(numberWithCommas(new_fan));
      			}else{
      				
      				$("#number-total-visiter").html("0");
      				
      			}
			}
  			//$("#content-text-total").html("<span>"+day_number+"</span><span text='total_current_date'>"+current_date+"</span>");
  			//$("#content-text-new").html("<span>"+day_number+"</span><span text='total_last_date'>"+last_date+"</span>");
			else if(type=="reach"){
				$("#lev3_summary_people_talking").hide();
				$("#lev3_summary_reach").show();
				$("#lev3_summary_people_talking_percent").hide();
				$("#summary_title_fb").html("<span text='reach'>"+type+"</span>");
				$("#text-total").html("<span>"+day_number+"</span><span text='total_current_date'>"+current_date+"</span>");
		  		$("#text-new").html("<span>"+day_number+"</span><span text='total_last_date'>"+last_date+"</span>");
		  		$("#text-growth").html("<span text='growthofrate'>Growth Of Rate</span>");
				array_current=array_reach;
				array_last= array_last_reach;	
				$("#number-total-fb").html(numberWithCommas(total_reach));
				new_reach = last_total_reach;
				if(last_total_reach>0)
				growth_of=Math.floor((new_reach/last_total_reach)*100);
				else
					growth_of=0;
			
				appendGrowth(growth_of);
				
				
      			if (new_reach>0){
      				
      				$("#number-total-visiter").html(numberWithCommas(new_reach));
      				
      			}else{
      				
      				$("#number-total-visiter").html("0");
      			}
			}
			else if(type=="people talking")
				
				{
				$("#lev3_summary_people_talking").show();
				$("#lev3_summary_reach").hide();
				$("#lev3_summary_people_talking_percent").hide();
				$("#summary_title_fb").html("<span text='people_talking'>"+type+"</span>");
				$("#text-total").html("<span>"+day_number+"</span><span text='total_current_date'>"+current_date+"</span>");
		  		$("#text-new").html("<span>"+day_number+"</span><span text='total_last_date'>"+last_date+"</span>");
		  		$("#text-growth").html("<span text='growthofrate'>Growth Of Rate</span>");
				if(last_total_peopletalking>0)
					growth_of=Math.floor(((total_peopletalking-last_total_peopletalking)/last_total_peopletalking)*100);
					else
						growth_of=0;
				
				appendGrowth(growth_of);
				
				array_current=array_peopletalking;
				array_last= array_last_peopletalking;
				$("#number-total-fb").html(numberWithCommas(total_peopletalking));
				new_peopletalking=last_total_peopletalking
      			if (new_peopletalking>0){
      			
      				$("#number-total-visiter").html(numberWithCommas(new_peopletalking));
      			}else{
      			
      				$("#number-total-visiter").html("0");
      			}
			
				}
			else
				{
				$("#lev3_summary_people_talking").hide();
				$("#lev3_summary_reach").hide();
				$("#lev3_summary_people_talking_percent").show();
				$("#summary_title_fb").html("<span text='peopletalkinggrowth'>"+type+"</span>");
				$("#text-total").html("<span>"+day_number+"</span><span text='total_current_date'>"+current_date+"</span>");
		  		$("#text-new").html("<span>"+day_number+"</span><span text='total_last_date'>"+last_date+"</span>");
		  		$("#text-growth").html("<span text='growthofrate'>Growth Of Rate</span>");
				array_current=array_peopletalking_fan;
				array_last= array_last_peopletalking_fan;	
				
				if(last_total_peopletalking_fan>0)
					growth_of=Math.floor(((total_peopletalking_fan-last_total_peopletalking_fan)/last_total_peopletalking_fan)*100);
					else
						growth_of=0;
					$("#number-total-fb").html(roundNumber(total_peopletalking_fan,2)+"%");
				
					appendGrowth(growth_of);
					new_peopletalking_fan=last_total_peopletalking_fan;
      			if (new_peopletalking_fan>0){
      				
      				$("#number-total-visiter").html(roundNumber(new_peopletalking_fan,2));
      			}else{
      				
      				$("#number-total-visiter").html("0");
      			}
				
				}
		
			//object_report_fb.content_summary_chart=object_summary_chart;
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
                categories: formatDayRange(array_date_title),
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
                    //fillOpacity:0.5
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
  					var date=toTimestampReport(obj[i].end_time);
  		  			var date_post = new Date(date*1000);
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
  					var date=toTimestampReport(obj[i].end_time);
  		  			var date_post = new Date(date*1000);
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
  		  			
  	  		  			last_total_reach=obj_reach_week[k].reach ;
  	  		  			
  	  		  		
  		  			}
  			}
  			}
  			
  				drawSumaryChart("fan",0);
  	  			drawSumaryChart_Export(0);
  		
  			
  			
  		});
  		
  	}
  
  	function exportCsvFacebook(){
  		var str = ''+''+JSON.stringify(object_report_fb)+''+'';
		$("#exportContent").val(str);
		$("#exportForm").submit();	
  	}
  	function exportExcelFacebookPage(){
  		if(!$.browser.msie){
  			//$("#xchart-sine svg").attr("id","chart_sumamry");
  		  	$("#engagement_chart_export svg").attr("id","chart_engagement");
  		  	$("#content_chart svg").attr("id","chart_content");
  		  	$("#gender svg").attr("id","chart_gender");
  			$("#age svg").attr("id","chart_age");
  			$("#fan_chart svg").attr("id","chart_fan_export");
  			$("#reach_chart svg").attr("id","chart_reach_export");
  			$("#peopletalking_chart svg").attr("id","chart_peopletalking_export");
  			$("#peopletalking_fan_chart svg").attr("id","chart_peopletalking_fan_export");
  			$("#like_chart svg").attr("id","chart_like_export");
  			$("#engagement_growth_chart_export svg").attr("id","chart_engagement_growth_export");
  			$("#engagement_activity_chart_export svg").attr("id","chart_activity_export");
  			$("#engagement_brandroyalty_chart_export svg").attr("id","chart_brandroyalty_export");
  			$("#share_chart svg").attr("id","chart_share");
  			$("#comment_chart svg").attr("id","chart_comment");
  			$("#comment_like_chart svg").attr("id","chart_comment_like");
  			//comment_like_chart
  		   //  var svg = document.getElementById("chart_sumamry");
  		     var svg_engagement = document.getElementById("chart_engagement");
  		     var svg_content = document.getElementById("chart_content");
  		     var svg_gender = document.getElementById("chart_gender");
  		     var svg_age = document.getElementById("chart_age");
  		     var svg_chart_fan = document.getElementById("chart_fan_export");
  		     var svg_chart_reach = document.getElementById("chart_reach_export");
  		     var svg_chart_peopletalking = document.getElementById("chart_peopletalking_export");
  		     var svg_chart_peopletalking_fan = document.getElementById("chart_peopletalking_fan_export");
  		     var svg_chart_like = document.getElementById("chart_like_export");
  		     var svg_chart_engagement_growth = document.getElementById("chart_engagement_growth_export");
  		     var svg_chart_activity = document.getElementById("chart_activity_export");
  		     var svg_chart_brandroyalty = document.getElementById("chart_brandroyalty_export");
  		     var svg_chart_share = document.getElementById("chart_share");
  		     var svg_chart_comment = document.getElementById("chart_comment");
  		     var svg_chart_comment_like = document.getElementById("chart_comment_like");
  		     var stringDate = $("#analysis_facebook #dashboard_range").val();
  			
  				svg_engagement.toDataURL("image/png", {
  					callback: function(data) {
  						
  						$("#image_engagement").val(data);
  					}
  				});
  				svg_content.toDataURL("image/png", {
  					callback: function(data) {
  						
  						$("#image_content").val(data);
  					}
  				});
  				svg_gender.toDataURL("image/png", {
  					callback: function(data) {
  						$("#image_gender").val(data);
  					}
  				});
  				svg_age.toDataURL("image/png", {
  					callback: function(data) {
  						
  						$("#image_age").val(data);
  					}
  				});
  				svg_chart_fan.toDataURL("image/png", {
  					callback: function(data) {
  						
  						$("#image_chart_fan").val(data);
  					}
  				});
  				svg_chart_reach.toDataURL("image/png", {
  					callback: function(data) {
  						
  						$("#image_chart_reach").val(data);
  					}
  				});
  				svg_chart_peopletalking.toDataURL("image/png", {
  					callback: function(data) {
  						
  						$("#image_chart_peopletalking").val(data);
  					}
  				});
  				svg_chart_peopletalking_fan.toDataURL("image/png", {
  					callback: function(data) {
  						
  						$("#image_chart_peopletalking_fan").val(data);
  					}
  				});
  				svg_chart_like.toDataURL("image/png", {
  					callback: function(data) {
  						
  						$("#image_chart_like").val(data);
  					}
  				});
  				svg_chart_engagement_growth.toDataURL("image/png", {
  					callback: function(data) {
  						
  						$("#image_chart_engagement_growth").val(data);
  					}
  				});
  				svg_chart_activity.toDataURL("image/png", {
  					callback: function(data) {
  						
  						$("#image_chart_activity").val(data);
  					}
  				});
  				svg_chart_brandroyalty.toDataURL("image/png", {
  					callback: function(data) {
  						
  						$("#image_chart_brandroyalty").val(data);
  					}
  				});
  				svg_chart_share.toDataURL("image/png", {
  					callback: function(data) {
  						
  						$("#image_chart_share").val(data);
  					}
  				});
  				svg_chart_comment.toDataURL("image/png", {
  					callback: function(data) {
  						
  						$("#image_chart_comment").val(data);
  					}
  				});
  				svg_chart_comment_like.toDataURL("image/png", {
  					callback: function(data) {
  						
  						$("#image_chart_comment_like").val(data);
  					}
  				});
  				//engagement-chart
  		  		var str = ''+''+JSON.stringify(object_report_fb)+''+'';
  				$("#exportExcelContent").val(str);
  				$("#daterange").val(stringDate);
  				$("#exportExcelForm").submit();	
  		}
  		else
  			{
  			 aoFrm.mess("alert","Current Export Excel not support IE");
  			}
      
	  
  	}
  	
  	function influenceFbPage(channel_detail_id,token,newDateFrom,newDateTo){
  		FB.api({method: 'fql.multiquery',queries:{
  			query1: "select fromid, username, text, time, post_id,likes from comment where fromid <>'"+channel_detail_id+"' and  post_id in (SELECT post_id  FROM stream WHERE source_id ='"+channel_detail_id+"' limit 0,200)",
  			query2: "select user_id,post_id from like where user_id <>'"+channel_detail_id+"' and  post_id in (SELECT post_id  FROM stream WHERE source_id ='"+channel_detail_id+"' limit 0,200)"
  		},access_token:token
	      },function(response) {
	    	  if(!isNull(response.error_subcode)){
	    	 
	    	  $("#analysis_facebook .content_right").append("<div id='div_error_fb_page' style='width:100%; height:100%;position:absolute;z-index:9999;top:0'></div>")
	    	  checkAccountFqlError(data_source,"facebookpage","");
	    	  }
	    	  else
	    		  {
	    		  $("#div_error_fb_page").remove();
	    		  getInfluenceFbPage(response,channel_detail_id,newDateFrom,newDateTo,token); 
	    		  }
	    	   	 
	      });
  	}
  	
  	function getInfluenceFbPage(response,channel_detail_id,newDateFrom,newDateTo,token){
  		try{
  		if (last_channel_id!=channel_detail_id){
  			return;
  		}
  		var dateFrom = new Date((newDateFrom - (24 * 60 * 60)) * 1000);
		var date1= (dateFrom.getMonth() + 1) + "/" + dateFrom.getDate() + "/" + dateFrom.getFullYear();
		var dateTo = new Date((newDateTo - (48 * 60 * 60)) * 1000);
		var date2= (dateTo.getMonth() + 1) + "/" + dateTo.getDate() + "/" + dateTo.getFullYear();
		var time_post;
		var array_post_id = new Array();
		var list_user_id="";
  		for (var i=0;i<response[0].fql_result_set.length;i++){
	  		//var source_id;
  			var like_num = 0;
  			var comment_num = 0;
  	  		var share_num = 0;
  	  		var comment_like_num = 0;
	  		time_post = response[0].fql_result_set[i].time;
	  		if (!isNull(response[0].fql_result_set[i].likes)){
	  			comment_like_num = response[0].fql_result_set[i].likes;
	  		}else{
	  			comment_like_num = 0;
	  		}
	  		
	  		array_post_id.push(response[0].fql_result_set[i].post_id);
			
			this.source_id = response[0].fql_result_set[i].fromid;
			var user_id=this['source_id'];
					 
			if (isNull(obj_influence[user_id])){
						
				obj_influence[user_id] = parseInt(comment_like_num) + 1 ;
				list_user_id=list_user_id +","+response[0].fql_result_set[i].fromid;
			}else{
				obj_influence[user_id] = obj_influence[user_id] + parseInt(comment_like_num) + 1;
			}
			//comment_num= response[0].fql_result_set[i].
			
	  		
		}
  		for (var j=0;j<response[1].fql_result_set.length;j++){
  			for (var k=0;k<array_post_id.length;k++){
  				if (response[1].fql_result_set[j].post_id==array_post_id[k]){
  					if (isNull(obj_influence[user_id])){
  		  				obj_influence[user_id] = 1;
  		  				list_user_id=list_user_id +","+response[1].fql_result_set[j].user_id;
  		  			}else{
  		  				obj_influence[user_id] = obj_influence[user_id] + 1;
  		  			}
  				}
  			}
  			
  		}
  		if (response[0].fql_result_set.length > 0){
  			getInfluenceFbPageMore(channel_detail_id,newDateFrom,newDateTo,token,time_post);
  		}else{
  			
  			list_user_id =list_user_id.substring(1);
    	  updateFrienofFan(channel_detail_id,list_user_id,token);
    	  var number_top = $("#number-influence-top").val();
    	  appendHtmlInfluencePage(number_top,date1,date2,token);
    	  $("#number-influence-top").keydown(function(e) {
              if(e.keyCode==13){
            	  number_top = $(this).val();
            	  appendHtmlInfluencePage(number_top,date1,date2,token);
  			}			
          });
    	  
  		}
  	 }
	 catch(ex){
		 
	 }
  	}
  	
  	function getInfluenceFbPageMore(channel_detail_id,newDateFrom,newDateTo,token,time_post){
  		FB.api({method: 'fql.multiquery',queries:{
  			query1: "select fromid, username, text, time, post_id from comment where time < '"+time_post+"' and fromid <>'"+channel_detail_id+"' and  post_id in (SELECT post_id  FROM stream WHERE source_id ='"+channel_detail_id+"' limit 200)",
  			query2: "select user_id,post_id from like where user_id <>'"+channel_detail_id+"' and  post_id in (SELECT post_id  FROM stream WHERE source_id ='"+channel_detail_id+"' limit 200)"
  		},access_token:token
	      },function(response) {
	    	  getInfluenceFbPage(response,channel_detail_id,newDateFrom,newDateTo,token);  	 
	      });
  	}
  	function updateFrienofFan(channel_detail_id,list_user,token_user){
  		 var dataString =[];
  		  var current_date = formatDateCurrent();
		  current_date = current_date + " 00:00:00";
  		 dataString.push({
         name: "channel_detail_id", 
         value: channel_detail_id
     });
  		dataString.push({
  	         name: "list_user", 
  	         value: "'"+list_user+"'"
  	     });
     dataString.push({
         name: "access_token", 
         value: token_user
     });
     dataString.push({
         name: "Action", 
         value: "facebookpage"
     });
     dataString.push({
         name: "send_date", 
         value: "'"+current_date+"'"
     }); 
     
	  $.ajax({
		  type:"POST",
		  url : 'Follower.do',
		  dataType: 'json',
		  data: dataString,
		  success : function(source) {
			  
		  }
	  });
  	}
  	function appendGrowth(growth_of)
  	{
  		var growth=growth_of;
  		if(growth_of>0)
		{
		$("#number_growth_of_rate").html(growth_of+"%"+"<i class='icon-caret-up green'></i>");
		}
	else if(growth_of<0)
		{
		growth_of=(-1)*growth_of;
		growth=growth_of;
		$("#number_growth_of_rate").html(growth_of+"%"+"<i class=' icon-caret-down red'></i>");
		}
	else
		{
		$("#number_growth_of_rate").html(growth_of+"%");
		}
  		object_summary_chart.growth_value=growth;
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
  		object_content_chart.growth="Growth of Rate";
  		object_content_chart.growth_value=growth;
  	}
  	function appendGrowth_export(growth_of,type)
  	{
  		var growth=growth_of;
  		if(growth_of>0)
		{
		$("#number_growth_of_rate").html(growth_of+"%"+"<i class='icon-caret-up green'></i>");
		}
	else if(growth_of<0)
		{
		growth_of=(-1)*growth_of;
		growth=growth_of;
		$("#number_growth_of_rate").html(growth_of+"%"+"<i class=' icon-caret-down red'></i>");
		}
	else
		{
		$("#number_growth_of_rate").html(growth_of+"%");
		}
  		this.growth="growth_"+type+"_value";
  		var growth_type=this["growth"];
  		object_summary_chart[growth_type]=growth;
  	}

  	function selectFqlComment(channel_detail_id, token,newDateFrom,newDateTo,channel_user){
  		var query="";
  		var day = Math.round((newDateTo - newDateFrom)/60/60/24);
  		var lastDateTo = newDateFrom - (24 * 60 * 60);
  		var lastDateFrom = lastDateTo - (day * 24 * 60 * 60);
  			query="select time, post_id,likes from comment where  post_id in (SELECT post_id  FROM stream WHERE  source_id = '"+channel_detail_id+"'  limit 200)";
		  FB.api({method: 'fql.query',
		        query: query,access_token:token
		      },function(response) { 
		    	  if(!isNull(response.error_subcode)){
		    	  
		    	  $("#analysis_facebook .content_right").append("<div id='div_error_fb_page' style='width:100%; height:100%;position:absolute;z-index:9999;top:0'></div>")
		    	  checkAccountFqlError(response,"facebookpage",channel_user);
		    	  }
		    	  else
		    		  {
		    		  $("#div_error_fb_page").remove();
		    	  getTopLikeofComment(response,newDateFrom,newDateTo,token,channel_detail_id);
		    		  }
		      }
  	);
  	}
  	function getLikeofCommentMore(channel_detail_id,token,time_comment,newDateFrom,newDateTo){
  		var query="";
  			query="select time, post_id,likes from comment where  post_id in (SELECT post_id  FROM stream WHERE  source_id = '"+channel_detail_id+"'   limit 200) and time<'"+time_comment+"'";
  		
		  FB.api({method: 'fql.query',
		        query: query,access_token:token
		      },function(response) {
		    	  if(!isNull(response.error_subcode)){
		    	 
		    	  $("#analysis_facebook .content_right").append("<div id='div_error_fb_page' style='width:100%; height:100%;position:absolute;z-index:9999;top:0'></div>")
		    	  checkAccountFqlError(data_source,"facebookpage","");
		    	  }
		    	  else
		    		  {
		    		  $("#div_error_fb_page").remove();
		    	  getTopLikeofComment(response,newDateFrom,newDateTo,token,channel_detail_id);
		    		  }
		      }
  	);
  	}
  	function getTopLikeofComment(response,newDateFrom,newDateTo,token,channel_detail_id){
  		 var time_comment;
  		var day = Math.round((newDateTo - newDateFrom)/60/60/24);
  		var lastDateTo = newDateFrom - (24 * 60 * 60);
  		var lastDateFrom = lastDateTo - (day * 24 * 60 * 60);
  		var obj_post_id= new Object();
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
 				this.post_id = response[i].post_id;
 				var post_id=this['post_id'];
 						 
 				if (isNull(obj_post_id[post_id])){
 							
 					obj_post_id[post_id] = parseInt(response[i].likes) ;
 					
 				}else{
 					obj_post_id[post_id] = obj_post_id[post_id] + parseInt(response[i].likes);
 				}
	  			}
 				
   	  }
   //	var sortArraypostid = converObjectToArray(obj_post_id)
	//$("#tr_"+response[i].post_id).find("td.comment-like").text(response[i].likes);
	var sortArraypostid = converObjectToArray(obj_post_id)
	for (var i=0;i<sortArraypostid.length;i++){
	 
		  var id = sortArraypostid[i].key;
		  var value=sortArraypostid[i].value;
		//$("#tr_"+id).find("td.comment-like").text(value);
		jQuery("#top_jqgrid").jqGrid('setCell',id,'like_of_comment',value);

	  }
   	if ((lastDateFrom<=time_comment)&&(time_comment<=newDateTo)){
   		if ((newDateFrom<=time_comment)&&(time_comment<=newDateTo)){
   			
   			getLikeofCommentMore(channel_detail_id,token,time_comment,newDateFrom,newDateTo);
   		}
   	}
  	}
  	function loadInfluence(channel_detail_id,token){
  		last_channel_id = channel_detail_id;
  		$("#block-influence tbody").empty();
  		$("#loading-small").html("<i class='icon-spinner icon-spin'></span>");
  		
  		var load_option = $("#analysis_facebook .content_right").attr("load_option");
		var stringDate="";
  		if (load_option==0){
  			
  			stringDate = $("#analysis_facebook #dashboard_range_two").val();
  		}else{
  			stringDate = $("#analysis_facebook #dashboard_range_three").val();
  		}
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
  		obj_influence = {};
  			influenceFbPage(channel_detail_id,token,newDateFrom,newDateTo);
  	}
  	function appendHtmlInfluencePage(number_top,date1,date2,token){
  		var sortArrayInfluenePage = converObjectToArray(obj_influence).sort(function(a,b){
				return b.value - a.value;
			});
  		var strid = "";
  		for (var i=0;i<sortArrayInfluenePage.length;i++){
  		  if (i < number_top){
  			  var id = sortArrayInfluenePage[i].key;
  			  strid = strid + "," + id; 
  		  }
	  	  }
	  	  
	  	  strid = strid.substring(1);
	  	  var name;
	  	  var wall_count = 0;
	  	  var brand_royalty = 0;
  	  
		  var query = 'SELECT uid,name,wall_count from user where uid in ('+strid+')';
		  var spread = 0;
		  FB.api({method: 'fql.query',
		        query: query,access_token:token
		      },function(data_source) {
		    	  if(!isNull(data_source.error_subcode)){
		    	 
		    	  $("#analysis_facebook .content_right").append("<div id='div_error_fb_page' style='width:100%; height:100%;position:absolute;z-index:9999;top:0'></div>")
		    	  checkAccountFqlError(data_source,"facebookpage","");
		    	  }
		    	  else
		    		  {
		    		  $("#div_error_fb_page").remove();
		    		  aoFrm.mess("close");
		    		  $("#block-influence tbody").empty();
			    	  var count_inf = 0;
				  	  var brand_royalty = 0;
				  	  var newHtml = "";
				  	  for (var j=0;j<sortArrayInfluenePage.length;j++){
				  		 if (j<number_top){
				  			  var id = sortArrayInfluenePage[j].key;
				  			  var url_influence = "https://www.facebook.com/" + id;
				  			  spread = sortArrayInfluenePage[j].value;
				  			  for (var k=0;k<data_source.length;k++){
				  				  if (id==data_source[k].uid){
				  					  var object_influence_page= new Object();
				  					  count_inf++;
				  					  name = data_source[k].name;
				  		    		  wall_count = data_source[k].wall_count;
				  		    		  if (!isNull(wall_count)){
				  		    			  brand_royalty = (spread/wall_count) * 100;
				  		    			  brand_royalty = Math.floor(brand_royalty*100)/100;
				  		    		  }else{
				  		    			  brand_royalty = 0;
				  		    		  }
					  		    		object_influence_page.date=date1+" ~ "+date2;
					  		    		object_influence_page.no=count_inf;
					  		    		object_influence_page.account=name;
					  		    		object_influence_page.spread=spread;
					  		    		object_influence_page.brandroyalty=brand_royalty;
				  			          array_influence_export.push(object_influence_page);
				  			    	  newHtml = "<tr><td>"+count_inf+"</td><td class='left'><a href='"+url_influence+"' target='_blank'>"+name+"</span></td><td>"+spread+"</td><td>"+brand_royalty+"%</td></tr>";
				  			    	  $("#block-influence tbody").append(newHtml);
				  				  }
				  	    	  }
				  		 }
				  		
				  	  }
			    	  object_report_fb.content_influence= array_influence_export;
			    	  $("#loading-small").empty();
		    		  }
		    	 
		      });
  	}
  	
  	
  	function loadHtmlTop(number_top,arr,total_fans,date1,date2){
  		$("#analysis_facebook #block-top tbody").empty();
  		var count = 0;
  		for (var i=0;i<arr.length;i++){
				
				if (i < number_top){
				count++;
			var peopletalking=	roundNumber(arr[i].like,2)+ roundNumber(arr[i].share,2)+ roundNumber(arr[i].comment,2)+ roundNumber(arr[i].commentlike,2);
				 var engagement =((peopletalking/arr.length)/total_fans)*100;
				//var peopletalking= arr[i].like+arr[i].comment+arr[i].commentlike+arr[i].share;
				 var object_content = new Object();
				object_content.date=date1+" ~ "+date2;
				object_content.no=count;
				object_content.post_id=arr[i].post_id;
				object_content.title=arr[i].title;
				object_content.engagement=roundNumber(engagement,2);
				object_content.peopletalking=peopletalking;
				object_content.reach=peopletalking;
				object_content.like=arr[i].like;
				object_content.share=arr[i].share;
				object_content.comment=arr[i].comment;
				object_content.commentoflike=arr[i].commentlike;
				array_content_top_20_export.push(object_content);
 					//var newHtml = "<tr id=tr_"+arr[i].post_id+"><td>"+count+"</td>" + arr[i].html;
 					//$("#analysis_facebook #block-top tbody").append(newHtml);
				var link_post=arr[i].link_post;
				var content='<a href="'+link_post+'" target="_blank">'+arr[i].title+'</a>';
  				post_arr.push({"no":count,"post_id":arr[i].post_id,"tittle":content,"reach":0,"like":arr[i].like,"share":arr[i].share,"comment":arr[i].comment,"like_of_comment":0});
				}
				
			}
  		getPost(post_arr);
  	}
  	// export chart
function drawEngagementChart_export(){
  		
  		var array_date = new Array();
  		var array_engagement = new Array();
  		var array_activity = new Array();
  		var array_engagement_rate = new Array();
  		var array_brand_royalty = new Array();
  		
  		for (var i=0;i<obj.length;i++){
  			var days = new Date(obj[i].day);
  			array_date.push(days.getDate());
  			array_engagement.push(obj[i].engagement);
  			array_activity.push(obj[i].activity);
  			array_engagement_rate.push(obj[i].engagementRate);
  			array_brand_royalty.push(obj[i].brand_royalty);
  		}
  		 		
  		info = new Highcharts.Chart({
  			chart: {
                type: 'area',
                renderTo: 'engagement_chart_export',
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
                    //fillOpacity:0.5
                }
            },
            series: [{
                name: 'Engagement',
                color: '#4DA944',
                data: formatDayRange(array_engagement)
            }
            ]
  		});
  		
  		//engagement_growth_chart_export
  		info = new Highcharts.Chart({
  			chart: {
                type: 'area',
                renderTo: 'engagement_growth_chart_export',
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
                    //fillOpacity:0.5
                }
            },
            series: [{
                name: 'Enagagement Rate',
                color: '#4DA944',
                data: formatDayRange(array_engagement_rate)
            }
            ]
  		});
  		///engagement_activity_chart_export
  		info = new Highcharts.Chart({
  			chart: {
                type: 'area',
                renderTo: 'engagement_activity_chart_export',
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
                    //fillOpacity:0.5
                }
            },
            series: [{
                name: 'Activity',
                color: '#4DA944',
                data: formatDayRange(array_activity)
            }
            ]
  		});
  		///engagement_brandroyalty_chart_export
  		info = new Highcharts.Chart({
  			chart: {
                type: 'area',
                renderTo: 'engagement_brandroyalty_chart_export',
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
                    //fillOpacity:0.5
                }
            },
            series: [{
                name: 'Brand Royalty',
                color: '#4DA944',
                data: formatDayRange(array_brand_royalty)
            }
            ]
  		});
  		//	$("#age svg").attr("id","chart_age");
	    // var svg = document.getElementById("chart_sumamry");
  		$("#engagement_chart_export svg").attr("id","chart_engagement_chart_export");
  		
  		
  	}
function drawContentChart_Export(){

	    object_content_chart={};		
		var total_content = 0;
		var last_total_content = 0;
		var new_content = 0;
		var total_like = 0;
		var new_like = 0;
		var last_total_like =0;
		var total_share = 0;
		var last_total_share = 0;
		var new_share = 0;
		var total_comment = 0;
		var last_total_comment = 0;
		var new_comment = 0;
		var total_comment_like = 0;
		var last_total_comment_like = 0;
		var new_comment_like = 0;
		
		
		var array_date_title = new Array();
		var array_date = new Array();
		var array_content = new Array();
		var array_like = new Array();
		var array_comment = new Array();
		var array_share = new Array();
		var array_comment_like = new Array();
		var array_engagement = new Array();
		
		var last_array_date_title = new Array();
		var last_array_content = new Array();
		var last_array_like = new Array();
		var last_array_comment = new Array();
		var last_array_share = new Array();
		var last_array_comment_like = new Array();
		
		for (var i=0;i<obj.length;i++){
			
			var days = new Date(obj[i].day);
			array_date.push(days.getDate());
			array_date_title.push(days.getMonth() + 1 + "/" + days.getDate());
			array_content.push(obj[i].content);
			total_content = total_content + obj[i].content;
			array_like.push(obj[i].like);
			total_like = total_like + obj[i].like;
			array_comment.push(obj[i].comment);
			total_comment = total_comment + obj[i].comment;
			array_share.push(obj[i].share);
			total_share = total_share + obj[i].share;
			array_comment_like.push(obj[i].likeofcomment);
			total_comment_like = total_comment_like + obj[i].likeofcomment;
			//array_engagement.push(obj[i].likeofcomment);
			
		}
		for (var j=0;j<last_obj.length;j++){
			var days = new Date(last_obj[j].day);
			last_array_date_title.push(days.getMonth() + 1 + "/" + days.getDate());
			last_array_content.push(last_obj[j].content);
			last_total_content = last_total_content + last_obj[j].content;
			last_array_like.push(last_obj[j].like);
			last_total_like = last_total_like + last_obj[j].like;
			last_array_comment.push(last_obj[j].comment);
			last_total_comment = last_total_comment + last_obj[j].comment;
			last_array_share.push(last_obj[j].share);
			last_total_share = last_total_share + last_obj[j].share;
			last_array_comment_like.push(last_obj[j].likeofcomment);
			last_total_comment_like = last_total_comment_like + last_obj[j].likeofcomment;
		}
		
		new_content = total_content - last_total_content;
		new_like =  last_total_like;
		new_comment =last_total_comment;
		new_share = last_total_share;
		new_comment_like = last_total_comment_like;

		//var array_current = new Array();
		//var last_array_current = new Array();
		
			
			if(last_total_content>0)
			growth_of=Math.floor(((total_content-last_total_content)/last_total_content)*100);
			else
				growth_of=0;
			contentGrowth_chart(growth_of,"contents");
			if (new_content>0){
				new_content = new_content;
  			}else{
  				new_content = 0;
  			}
			//object_content_chart.total="Total Contents";
			object_content_chart.total_content_value=total_content;
			//object_content_chart.new_content="New Contents";
			object_content_chart.new_content_value=new_content;
			//array_current = array_content;
			//last_array_current = last_array_content;
		  
			
			if(last_total_like>0)
			growth_of=Math.floor(((total_like-last_total_like)/last_total_like)*100);
			else
				growth_of=0;
			contentGrowth_chart(growth_of,"like");
			if (new_like>0){
				new_like = new_like;
  			}else{
  				new_like = 0;
  			}
			
			object_content_chart.total_like_value=total_like;
			object_content_chart.new_like_value=new_like;
			if(last_total_share>0)
			growth_of=Math.floor(((total_share-last_total_share)/last_total_share)*100);
			else
				growth_of=0;
			contentGrowth_chart(growth_of,"share");
			if (new_share>0){
				new_share = new_share;
  			}else{
  				new_share = 0;
  			}
		
			
			object_content_chart.total_share_value=total_share;
			object_content_chart.new_share_value=new_share;
			if(last_total_comment>0)
			growth_of=Math.floor(((total_comment-last_total_comment)/last_total_comment)*100);
			else
				growth_of=0;
			contentGrowth_chart(growth_of,"comment");
			if (new_comment>0){
				new_comment = new_comment;
  			}else{
  				new_comment = 0;
  			}
			
			object_content_chart.total_comment_value=total_comment;
			
			object_content_chart.new_comment_value=new_comment;
			
			if(last_total_comment_like>0)
			growth_of=Math.floor(((total_comment_like-last_total_comment_like)/last_total_comment_like)*100);
			else
				growth_of=0;
			contentGrowth_chart(growth_of,"comment_like");
			if (new_comment_like>0){
				new_comment_like=new_comment_like;
  			}else{
  				new_comment_like=0;
  			}
  			
			
			object_content_chart.total_comment_like_value=total_comment_like;
			object_content_chart.new_comment_like_value=new_comment_like;
		object_report_fb.content_chart=object_content_chart;
		
		info = new Highcharts.Chart({
			chart: {
            type: 'area',
            renderTo: 'content_chart',
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
               // fillOpacity:0.5
            }
        },
        series: [{
            name: "Contents" + "(" + last_array_date_title[0] + "-" +last_array_date_title[last_array_date_title.length-1] + ")",
            color: '#3880AA',
            data: formatDayRange(last_array_content)
        },
        {
            name: "Contents" + "(" + array_date_title[0] + "-" +array_date_title[array_date_title.length-1] + ")",
            color: '#4DA944',
            data: formatDayRange(array_content)
        }
        ]
		});
		/// like chart
		info = new Highcharts.Chart({
			chart: {
            type: 'area',
            renderTo: 'like_chart',
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
               // fillOpacity:0.5
            }
        },
        series: [{
            name: "Like" + "(" + last_array_date_title[0] + "-" +last_array_date_title[last_array_date_title.length-1] + ")",
            color: '#3880AA',
            data: formatDayRange(last_array_like)
        },
        {
            name: "Like" + "(" + array_date_title[0] + "-" +array_date_title[array_date_title.length-1] + ")",
            color: '#4DA944',
            data: formatDayRange(array_like)
        }
        ]
		});
		/// share chart
		info = new Highcharts.Chart({
			chart: {
            type: 'area',
            renderTo: 'share_chart',
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
               // fillOpacity:0.5
            }
        },
        series: [{
            name: "Share" + "(" + last_array_date_title[0] + "-" +last_array_date_title[last_array_date_title.length-1] + ")",
            color: '#3880AA',
            data: formatDayRange(last_array_share)
        },
        {
            name: "Share" + "(" + array_date_title[0] + "-" +array_date_title[array_date_title.length-1] + ")",
            color: '#4DA944',
            data: formatDayRange(array_share)
        }
        ]
		});
		/// comment chart
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
               // fillOpacity:0.5
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
		/// comment like chart
		info = new Highcharts.Chart({
			chart: {
            type: 'area',
            renderTo: 'comment_like_chart',
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
               // fillOpacity:0.5
            }
        },
        series: [{
            name: "Like of Comment" + "(" + last_array_date_title[0] + "-" +last_array_date_title[last_array_date_title.length-1] + ")",
            color: '#3880AA',
            data: formatDayRange(last_array_comment_like)
        },
        {
            name: "Like of Comment" + "(" + array_date_title[0] + "-" +array_date_title[array_date_title.length-1] + ")",
            color: '#4DA944',
            data: formatDayRange(array_comment_like)
        }
        ]
		});
	}
	function drawSumaryChart_Export(load_option){
		object_summary_chart={};
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
			if(isNull(array_summary[j].reach)){
				array_reach.push(0);
			}
			else
				{
				array_reach.push(array_summary[j].reach);
				}
			
			//total_reach=total_reach+array_summary[j].reach;
			array_peopletalking.push(array_summary[j].peopletalking);
			total_peopletalking=total_peopletalking+array_summary[j].peopletalking;
			if(array_summary[j].fan!=0){
				var value_peopletalking =(array_summary[j].peopletalking/array_summary[j].fan)*100;
				var peopletalking_fan=roundNumber(value_peopletalking,2);
				
				array_peopletalking_fan.push(peopletalking_fan);
				total_peopletalking_fan =parseFloat(total_peopletalking_fan)+parseFloat(peopletalking_fan);	
			}
			else
				{
				array_peopletalking_fan.push(0);
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
  			else
  				{
  				array_last_peopletalking_fan.push(0);
  				}
  				
  				if (arraylast_summary[k].friendsoffan!=0)
  	  				last_friend_of_fan= arraylast_summary[k].friendsoffan;
		}
		
		//new_reach=array_reach[array_reach.lenght-1]-array_reach[array_reach.lenght-2];
		//new_peopletalking=array_peopletalking[array_peopletalking.length-1]-array_peopletalking[array_peopletalking.length-2];
		//new_peopletalking_fan=array_peopletalking_fan[array_peopletalking_fan.length-1]-array_peopletalking_fan[array_peopletalking_fan.length-2];
		//if(array_fan.length-1>0)
		//new_fan=array_fan[array_fan.length-1]-array_fan[array_fan.length-2];
		if(array_friend_of_fan.length-1>0){
			
			new_friend_of_fan =array_friend_of_fan[array_friend_of_fan.length-1]-array_friend_of_fan[array_friend_of_fan.length-2];
		}
			if(last_total_fan>0){
				growth_of=Math.floor(((total_fan-last_total_fan)/last_total_fan)*100);
				
			}
			else{
				growth_of=0;
			}	
  			if (new_fan>0){
  				new_fan=new_fan;

  			}else{
  				new_fan=0;
  				  				
  			}
  			
			object_summary_chart.total_fan_value=total_fan;
			appendGrowth_export(growth_of,"fan");
			//object_summary_chart.new_summary="New Fan";
			new_fan=total_fan-last_total_fan;
			object_summary_chart.new_fan_value=new_fan;
			new_reach = last_total_reach;
			if(last_total_reach>0)
			growth_of=Math.floor((new_reach/last_total_reach)*100);
			else
				growth_of=0;
  			if (new_reach>0){
  				new_reach=new_reach;
  				
  			}else{
  				new_reach=0;
  			}
  			
			object_summary_chart.total_reach_value=total_reach;
			appendGrowth_export(growth_of,"reach");
			object_summary_chart.new_reach_value=new_reach;
			if(last_total_peopletalking>0)
				growth_of=Math.floor(((total_peopletalking-last_total_peopletalking)/last_total_peopletalking)*100);
				else
					growth_of=0;
		
  			if (new_peopletalking>0){
  				
  				new_peopletalking=new_peopletalking;
  			}else{
  				new_peopletalking=0;
  				
  			}
  			//object_summary_chart.total="Total People Talking";
			object_summary_chart.total_peopletalking_value=total_peopletalking;
			appendGrowth_export(growth_of,"peopletalking");
			new_peopletalking=last_total_peopletalking;
			object_summary_chart.new_peopletalking_value=new_peopletalking;
			{
			
			if(last_total_peopletalking_fan>0)
				growth_of=Math.floor(((total_peopletalking_fan-last_total_peopletalking_fan)/last_total_peopletalking_fan)*100);
				else
					growth_of=0;
		
  			if (new_peopletalking_fan>0){
  				new_peopletalking_fan=new_peopletalking_fan;
  				
  			}else{
  				new_peopletalking_fan=0;
  			}
			object_summary_chart.total_peopletalking_fan_value=roundNumber(total_peopletalking_fan,2)+"%";
			appendGrowth_export(growth_of,"peopletalking_fan");
			new_peopletalking_fan=last_total_peopletalking_fan;
			object_summary_chart.new_peopletalking_fan_value=roundNumber(new_peopletalking_fan,2);

			}
		object_report_fb.content_summary_chart=object_summary_chart;
		info = new Highcharts.Chart({
			chart: {
            type: 'area',
            renderTo: 'fan_chart',
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
                //fillOpacity:0.5
            }
        },
        series: [{
            name: "Fan" + " (" + last_array_date_title[0] + "-" +last_array_date_title[last_array_date_title.length-1] + ")",
            color: '#3880AA',
            data: formatDayRange(array_last_fan)
        },
        {
            name: "Fan" + " (" + array_date_title[0] + "-" +array_date_title[array_date_title.length-1] + ")",
            color: '#4DA944',
            data: formatDayRange(array_fan)
        }
        ]
		});
		
		/// reach chart
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
                //fillOpacity:0.5
            }
        },
        series: [{
            name: "Reach" + " (" + last_array_date_title[0] + "-" +last_array_date_title[last_array_date_title.length-1] + ")",
            color: '#3880AA',
            data: formatDayRange(array_last_reach)
        },
        {
            name: "Reach" + " (" + array_date_title[0] + "-" +array_date_title[array_date_title.length-1] + ")",
            color: '#4DA944',
            data: formatDayRange(array_reach)
        }
        ]
		});
		
		// peopletalking chart
		info = new Highcharts.Chart({
			chart: {
            type: 'area',
            renderTo: 'peopletalking_chart',
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
                //fillOpacity:0.5
            }
        },
        series: [{
            name: "People talking" + " (" + last_array_date_title[0] + "-" +last_array_date_title[last_array_date_title.length-1] + ")",
            color: '#3880AA',
            data: formatDayRange(array_last_peopletalking)
        },
        {
            name: "People talking" + " (" + array_date_title[0] + "-" +array_date_title[array_date_title.length-1] + ")",
            color: '#4DA944',
            data: formatDayRange(array_peopletalking)
        }
        ]
		});
		
		/// people talking fan 
		
		info = new Highcharts.Chart({
			chart: {
            type: 'area',
            renderTo: 'peopletalking_fan_chart',
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
                //fillOpacity:0.5
            }
        },
        series: [{
            name: "% People  talking " + " (" + last_array_date_title[0] + "-" +last_array_date_title[last_array_date_title.length-1] + ")",
            color: '#3880AA',
            data: formatDayRange(array_last_peopletalking_fan)
        },
        {
            name: "% People  talking " + " (" + array_date_title[0] + "-" +array_date_title[array_date_title.length-1] + ")",
            color: '#4DA944',
            data: formatDayRange(array_peopletalking_fan)
        }
        ]
		});
	}
function contentGrowth_chart(growth_of,type){
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
			//$("#number-growth").html(growth_of+"%"+"<i class='icon-caret-up green'></i>");
	}
		else if(growth_of<0)
	{
			growth_of=(-1)*growth_of;
			growth=growth_of;
			//$("#number-growth").html(growth_of+"%"+"<i class='icon-caret-down red'></i>");
	}
		this.growth="growth_"+type+"_value";
		var growth_type=this["growth"];
		//object_content_chart.growth="Growth of Rate";
		object_content_chart[growth_type]=growth;
	}
function getDataFBStream(channel_detail_id,pchannel_detail_id,access_token,load_option){
	  aoFrm.mess("close","close");
	  $("#analysis_facebook .content_right .block-nodata").empty();
  	$("#analysis_facebook .content_right .block_content").css("opacity","0.3");
		$("#analysis_facebook .itemLoading").show();
	arraylast_summary=[];
		array_summary=[];
		obj =[];
		last_obj=[];
		arr = [];
		obj_influence = {};
		object_content_chart={};
		object_summary_chart={};
		demographic_chart={};
		array_influence_export=[];
		array_content_top_20_export=[];
		array_summary_export=[];
		object_report_fb.content_influence=[];
		total_post = 0;
		like_total = 0;
  	comment_total = 0;
  	share_total = 0;
  	comment_like_total = 0;
  	//var load_option = $("#analysis_facebook .content_right").attr("load_option");
  	var stringDate="";
	if (load_option==0){
		
		stringDate = $("#analysis_facebook #dashboard_range_two").val();
	}else{
		stringDate = $("#analysis_facebook #dashboard_range_three").val();
	}
		var newString = stringDate.split("to");
		var stringFrom = newString[0];
		var stringTo = newString[1];
		
		//date for facebook: plus 1 day
		var newStringFrom = new Date(stringFrom);
		var newStringTo = new Date(stringTo);
		var dateFrom = new Date(newStringFrom);
		var dateTo = new Date(newStringTo);
		var start_date = toTimestamp(dateFrom) + (7 * 60 * 60);
		var end_date = toTimestamp(dateTo) + (30 * 60 * 60) ;
		var day = Math.round((end_date - start_date)/60/60/24);
		var prevDate = start_date;
		while (prevDate < end_date){
  			var dateFrom = new Date(prevDate * 1000);
  			obj.push({"day": (dateFrom.getMonth() + 1) + "/" + dateFrom.getDate() + "/" + dateFrom.getFullYear(),"content":0,"like":0,"share":0,"comment":0,"likeofcomment":0,"engagement":0,"activity":0,"spread":0,"engagementRate":0,"brand_royalty":0});
  			array_summary.push({"day": (dateFrom.getMonth() + 1) + "/" + dateFrom.getDate() + "/" + dateFrom.getFullYear(),"fan":0,"reach":null,"peopletalking":null,"friendsoffan":0,"reach_week":0,"reach_month":0,"peopletalking_week":0,"peopletalking_month":0,"engagement":0,"engagement_week":0,"engagement_month":0});
  			prevDate = prevDate + (24 * 60 * 60);
  		}
		
		var day = Math.round((end_date - start_date)/60/60/24);
  		var lastDateTo = start_date - (24 * 60 * 60);
  		var lastDateFrom = lastDateTo - (day * 24 * 60 * 60);
  		var lastPrevDate = lastDateFrom;
  		while (lastPrevDate < lastDateTo){
  			var dateFrom = new Date(lastPrevDate * 1000);
  			last_obj.push({"day": (dateFrom.getMonth() + 1) + "/" + dateFrom.getDate() + "/" + dateFrom.getFullYear(),"content":0,"like":0,"share":0,"comment":0,"likeofcomment":0});
  			arraylast_summary.push({"day": (dateFrom.getMonth() + 1) + "/" + dateFrom.getDate() + "/" + dateFrom.getFullYear(),"fan":0,"reach":0,"peopletalking":0,"friendsoffan":0,"reach_week":0,"reach_month":0,"peopletalking_week":0,"peopletalking_month":0,"engagement":0,"engagement_week":0,"engagement_month":0});
  			lastPrevDate = lastPrevDate + (24 * 60 * 60);
  		}
  		getTokenPage(channel_detail_id,pchannel_detail_id,access_token,lastDateFrom,end_date,load_option);
	  var dataString =[];
		 dataString.push({
      name: "channel_detail_id", 
      value: channel_detail_id
		 });
		 dataString.push({
		      name: "start_date", 
		      value: lastDateFrom
		  	});
		 dataString.push({
		      name: "end_date", 
		      value: end_date
		  	});
		 dataString.push({
      name: "Action", 
      value: "fbstream"
  	});
	  $.ajax({
		  url : 'AnalysicFBReport.do',
		  dataType: 'json',
		  data: dataString,
		  success : function(source) {
			  getTopPost(source,start_date,end_date,channel_detail_id,pchannel_detail_id,access_token,load_option,day);
		  }
	  });
}
function getTokenPage(channel_detail_id,pchannel_detail_id,token,lastDateFrom,newDateTo,load_option){
	FB.api('/'+pchannel_detail_id+'/accounts',{access_token:token}, function(response) {
		 if(!isNull(response.data)){
			 var datasource=response.data;
			 for(var j=0; j<datasource.length;j++){
					 if(datasource[j].id==channel_detail_id){
						token_page = datasource[j].access_token;
						getFansPage(channel_detail_id,token_page,lastDateFrom,newDateTo,load_option);
						
					 }
				} 
		 }
	 });
}
function getFbReportFromDB(channel_detail_id,start_date,end_date,load_option){
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
  value: "fbreport"
	});
  $.ajax({
	  url : 'AnalysicFBReport.do',
	  dataType: 'json',
	  data: dataString,
	  success : function(source) {
		  var count=0;
		  
		  for(var i=0; i<source.length;i++){
			  count++;
			  var date_post = new Date(source[i].create_date* 1000);
	  			date_post = (date_post.getMonth() + 1) +"/"+ date_post.getDate()+ "/" +date_post.getFullYear();
	  			
	  			for(var j=0; j<array_summary.length;j++){
	  				
	  				if(array_summary[j].day==date_post){
	  					array_summary[j].fan=source[i].friends;
	  					array_summary[j].reach=source[i].reach;
	  					
	  					array_summary[j].reach_week=source[i].reach_week;
	  					array_summary[j].peopletalking=source[i].people_talking;
	  					array_summary[j].peopletalking_week=source[i].people_talking_week;
	  				}
	  			}
	  			
	  			for(var j=0; j<arraylast_summary.length;j++){
	  				if(arraylast_summary[j].day==date_post){
	  					arraylast_summary[j].fan=source[i].friends;
	  					arraylast_summary[j].reach=source[i].reach;
	  					arraylast_summary[j].reach_week=source[i].reach_week;
	  					arraylast_summary[j].peopletalking=source[i].people_talking;
	  					arraylast_summary[j].peopletalking_week=source[i].people_talking_week;
	  				}
	  			}
	  			if(count==source.length){
	  				drawSumaryChart("fan",load_option);
		  			drawSumaryChart_Export(load_option);
	  			}
		  }
		
	  }
  });
}
function getReachPost(list_post_id,token){
	var strid = list_post_id.substring(1);
	var query = "";
		query = "SELECT value,object_id FROM insights WHERE object_id IN ("+strid+") AND metric ='post_impressions_unique' AND period='lifetime'";
		FB.api({method: 'fql.query',
    query: query,access_token:token
  },function(response) {
	  //array_content_top_20_export
		for (var i=0; i<response.length;i++)
			{
			//$("#tr_"+response[i].object_id).find("td.show-amount").text(response[i].value); 
			jQuery("#top_jqgrid").jqGrid('setCell',response[i].object_id, 'reach', response[i].value);
			//jQuery("#top_jqgrid").jqGrid('setCell',i+1, 'no', i+1);
			for(var j=0; j<array_content_top_20_export.length;j++){
				if(response[i].object_id==array_content_top_20_export[j].post_id){
					array_content_top_20_export[j].reach=response[i].value;
				}
			}
			}
		});	
		
}

function getPost(arr){
	var grid_width = $(".content-top").innerWidth();
	var grid = jQuery("#top_jqgrid");
	grid.jqGrid({          
	    datatype: "local",
		height: 200,
		colNames:['Post_id','No','Tittle','Reach', 'Like', 'Share', 'Comment', 'Like of Comment'],
		width: grid_width,
		colModel: [{
				name: 'post_id',
				index: 'post_id',
				sortable: false,
				editable: false,
				hidden:true,
				key:true,
				resizable:false,
				fixed:true,
				width: 1
			},
			{
			name: 'no',
			index: 'no',
			sortable: false,
			width: 40,
			editable: false
		},
		
		{
			name: 'tittle',
			index: 'tittle',
			sortable: false,
			editable: false,
			width: 500
		},
		{
			name: 'reach',
			index: 'reach',
			width: 90
		},
		{
			name: 'like',
			index: 'like',
			width: 90
		},
		{
			name: 'share',
			index: 'share',
			width: 90
		},
		{
			name: 'comment',
			index: 'comment',
			width: 90
		},
		{
			name: 'like_of_comment',
			index: 'like_of_comment',
			width: 120
		},
		]
		});
	jQuery("#top_jqgrid").jqGrid('clearGridData');
	jQuery("#top_jqgrid").jqGrid('setGridParam', {data: arr}).trigger('reloadGrid');
	//for(var i=0;i<=(row-1);i++) jQuery("#top_jqgrid").jqGrid('addRowData',i+1,arr[i]);
}
function engagementInsightFB(page_id_post,token_page,newDateFrom,newDateTo){
	FB.api('/'+page_id_post+'/insights/page_engaged_users?since='+newDateFrom+'&until='+newDateTo+'',{access_token:token_page}, function(response) {
		var total_engagement=0;
			if (!isNull(response.data)){
				 var obj_engagement = ($.map(response.data[0].values, function(item) {
		            return {
		               end_time: item.end_time,
		               engagement: item.value
		            };
		        }));
			    var obj_engagement_week =($.map(response.data[1].values, function(item) {
		            return {
		               end_time: item.end_time,
		               engagement: item.value
		            };
		        }));
				for(var i=0;i<obj_engagement.length;i++){
					var date=toTimestampReport(obj_engagement[i].end_time);
		  			var date_post = new Date(date*1000);
		  			date_post = (date_post.getMonth() + 1) +"/"+ date_post.getDate()+ "/" +date_post.getFullYear();
		  			for(var j=0; j<obj.length;j++){
		  				if(obj[j].day==date_post){
		  					obj[j].engagement=obj_engagement[i].engagement;
		  				}
		  					
		  			  
		  			}
		  		 //var last_r=i-1;
		  		 if(i-1>0)
		  		 total_engagement= obj_engagement_week[i-1].engagement;
		  		$("#engagement_num").html(total_engagement);	
			}
			}
			   
			    drawEngagementChart("engagement");
	  			drawEngagementChart_export();
	  			 getsummary_export();
		
			
			
		});
		
	}









  	
  	
  	
      
      
	
	
	
	
	
