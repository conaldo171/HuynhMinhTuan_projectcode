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

var obj_influence =new Object();
var object_report_fb = new Object();
var array_influence_export = new Array();
var array_content_top_20_export = new Array();
var array_summary_export = new Array();
var limitFrom = 0;
var limitTo = 200;
var arr = new Array();
 var post_arr=new Array();
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
	
	aoFrm.setLang("#aoFrm-content","analysis/facebook");
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
		
	});
	$("#engagement .list-action a").click(function(){
		var type = $(this).attr("type");
		$("#engagement .list-action a").removeClass("active");
		$(this).addClass("active");
		var load_option = $("#analysis_facebook .content_right").attr("load_option");
		drawEngagementChart(type,load_option);
		
	});
	$("#save_data_fb").click(function(){
		$("#calendar_three").show();
		$("#calendar_two").hide();
		$("#reltime_fb").empty();
		var pchannel_detail_id = $("#analysis_facebook .content_right").attr("pchannel_detail_id");
		var access_token = $("#analysis_facebook .content_right").attr("access_token");
		var channel_detail_id = $("#analysis_facebook .content_right").attr("id");
		updateLoadData(channel_detail_id,1);
		$("#reltime_fb").append("Saved Data");
		getDataFBStream(channel_detail_id,pchannel_detail_id,access_token,1);
	});
	$("#real_time_fb").click(function(){
		$("#calendar_three").hide();
		$("#calendar_two").show();
		$("#reltime_fb").empty();
		var pchannel_detail_id = $("#analysis_facebook .content_right").attr("pchannel_detail_id");
		var access_token = $("#analysis_facebook .content_right").attr("access_token");
		var channel_detail_id = $("#analysis_facebook .content_right").attr("id");
		var channel_user=$("#analysis_facebook .content_right").attr("channel_user");
		updateLoadData(channel_detail_id,0);
		$("#reltime_fb").append("Real time data");
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
		//var type_fb = $("#analysis_facebook .content_right").attr("type");
		var channel_user=$("#analysis_facebook .content_right").attr("channel_user");
		var load_option = $("#analysis_facebook .content_right").attr("load_option");
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
		_margin_top = -80;
		_dh = _h+75;
		$("#age-chart p").css("margin-top",-25);
	}	
	$("#analysis_facebook .block-demographic .chartBox .chart").css("height",_h);
	$("#age").css("height",_dh );
	//$("#age").css("margin-top",-top );
	
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
  
	 
      function statusChart(num_married,num_singel){
    	  if((num_married+num_singel)>0){
    		  num_married = Math.round(num_married/(num_married+num_singel)*100);//(/num_married+num_singel)*100;
    	  }
    	  else
    		  {
    		  num_married=0;
    		  }
  		num_singel=100-num_married;
  		var obj_status_chart=new Object();
  		obj_status_chart.married_value=num_married;
  		obj_status_chart.single_value=num_singel;
  		object_report_fb.status_chart=obj_status_chart;
  		info = new Highcharts.Chart({
  			chart: {
  				renderTo: 'status',
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
  				name: 'SiteInfo',
  				innerSize: '50%',
  				showInLegend: true,
  				data: [
  					{ name: 'married ', y: num_married, color: '#d84436' },
  					{ name: 'single', y:num_singel, color: '#babab8' }
  				],
  				dataLabels: {
  					enabled: false,
  					color: '#000000',
  					connectorColor: '#000000'
  				}
  			}]
  		});
  	}
      function edudationChar(num_highschool,num_college){
    	  var obj_education_chart = new Object();
    	  if((num_highschool+num_college)>0){
    		  num_highschool=Math.round(num_highschool/(num_highschool+num_college)*100);
    	  }
    	  else
    		  {
    		  num_highschool=0;
    		  }
  		
  		num_college= 100-num_highschool;
  		obj_education_chart.highschool_value=num_highschool;
  		obj_education_chart.college_value=num_college;
  		object_report_fb.education_chart=obj_education_chart;
  		info = new Highcharts.Chart({
  			chart: {
  				renderTo: 'education',
  				margin: [0, 0, 0, 0],
  				backgroundColor: null,
                  plotBackgroundColor: 'none'
                
                 // marginTop: -10
  							
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
  				name: 'Income',
  				innerSize: '50%',
  				showInLegend: true,
  				data: [
  					{ name: 'Hight School', y:num_highschool, color: '#62c462'},
  					{ name: 'College', y: num_college, color: '#a8ca42'}
  					//{ name: 'Other', y:100 -( num_college+num_highschool), color: '#edb836'}
  										
  				],
  				dataLabels: {
  					enabled: false,
  					color: '#000000',
  					connectorColor: '#000000'
  				}
  			}]
  		});
  	}
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
  		var sum =0;
  		sum=num_u20+num_u30+num_u40+num_u50+num_u60+num_u70;
  		if(sum>0){
  			u20data=Math.round(num_u20/sum*100);
  			u30data=Math.round(num_u30/sum*100);
  			u40data=Math.round(num_u40/sum*100);
  			u50data=Math.round(num_u50/sum*100);
  			u60data=Math.round(num_u60/sum*100);
  			u70data=100-u20data-u30data-u40data-u50data-u60data;
  		}
  		else
  			{
  			u70data=100-u20data-u30data-u40data-u50data-u60data;
  			}
  			
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
  			 	
  		} 
      
      function getReportFb(channel_detail_id,pchannel_detail_id,token,load_option,channel_user){
    	  
    	  aoFrm.mess("close","close");
    	$("#analysis_facebook .content_right .block_content").css("opacity","0.3");
  		$("#analysis_facebook .itemLoading").show();
  		var load_option = $("#analysis_facebook .content_right").attr("load_option");
  		var stringDate
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
  		var prevDate = toTimestamp(dateFrom);
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
  		obj_influence = {};
  		object_summary_chart={};
  		object_content_chart={};
  		array_influence_export=[];
  		array_content_top_20_export=[];
  		array_summary_export=[];
  		object_report_fb.content_influence=[];
  		total_post = 0;
  		like_total = 0;
	  	comment_total = 0;
	  	share_total = 0;
	  	friends_number=0;
	  	comment_like_total = 0;
	  
  		while (prevDate < newDateTo - (24 * 60 * 60)){
  			var dateFrom = new Date(prevDate * 1000);
  			obj.push({"day": (dateFrom.getMonth() + 1) + "/" + dateFrom.getDate() + "/" + dateFrom.getFullYear(),"content":0,"like":0,"share":0,"comment":0,"likeofcomment":0,"engagement":0,"activity":0,"spread":0,"engagementRate":0,"brand_royalty":0});
  			array_summary.push({"day": (dateFrom.getMonth() + 1) + "/" + dateFrom.getDate() + "/" + dateFrom.getFullYear(),"fan":0,"reach":0,"peopletalking":0,"friendsoffan":0});
  			prevDate = prevDate + (24 * 60 * 60);
  		}
  		
  		var query = "";
  			query = 'SELECT permalink,source_id, post_id ,created_time,message,share_count,like_info,comment_info FROM stream WHERE message <> "" and source_id = "'+channel_detail_id+'" limit 0,200' ;
			FB.api({method: 'fql.query',
		        query: query,access_token:token
		      },function(response) {
		    	  getFriendsSummary(stringFrom,stringTo,channel_detail_id,"facebook");
		    	  selectFqlComment(channel_detail_id, token,newDateFrom,newDateTo,channel_user);
		    	  if(!isNull(response.error)){
						
						 $("#analysis_facebook .content_right").append("<div id='div_error_fb' style='width:100%; height:100%;position:absolute;z-index:9999;top:0'></div>")
					  		$("#analysis_facebook .itemLoading").hide();
						 checkAccountError(response,"facebookprofile",channel_user);
					}
		    	  else
		    		  {
		    			//aoFrm.mess("close","close");
		    			$("#div_error_fb").remove();
		    			getTopPost(response,newDateFrom,newDateTo,channel_detail_id,pchannel_detail_id,token,day);
		    		  }
					
  	  				//contentChartFb(response);
					//drawContentChart("content");
		      });
  		
  		//var day = Math.round((newDateTo - newDateFrom)/60/60/24);
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
			demoGraphicProfile(pchannel_detail_id,token);
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
	  		total_fans = friends_number;
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
  	  		var brand_royalty = 0;var link_post;
  	  		var link_post;
	  		//var source_id;
	  		link_post = response[i].permalink;
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
  			    				array_summary[k].peopletalking = total;
  			    				array_summary[k].reach = total;
  			    				break;
  			    			}
  			    		}
	  	  			for (var l=0; l<last_obj.length;l++){
		  	  			if (last_obj[l].day == date_post){
			  	  			last_obj[l].content = parseInt(last_obj[l].content) + 1;
			  				last_obj[l].like = parseInt(last_obj[l].like) + parseInt(like_num);
			  				last_obj[l].share = parseInt(last_obj[l].share) + parseInt(share_num);
			  				last_obj[l].comment = parseInt(last_obj[l].comment) + parseInt(comment_num);
			  				last_obj[l].likeofcomment = parseInt(last_obj[l].likeofcomment) + parseInt(comment_like_num);
			  				arraylast_summary[l].peopletalking = total;
			  				arraylast_summary[l].reach = total;
			  				break;
		  	  			}
		  	  			
		    		}
		  	  		if ((newDateFrom<=time_post)&&(time_post<=newDateTo)){
		  	  			number_no++;
		  				htmlGeneral = '<td class="story" title="'+title+'" id="'+post_id+'"><a href="'+link_post+'" target="_blank">'+string+'</a></td><td class="show-amount">'+total+'</td><td class="like">'+like_num+'</td><td class="share">'+share_num+'</td><td class="comment">'+comment_num+'</td><td class="comment-like">'+comment_like_num+'</td></tr>';		  				
		  				arr.push({"no":number_no,"total":total,"html":htmlGeneral,"like":like_num,"share":share_num,"comment":comment_num,"commentlike":comment_like_num,"title":title,"post_id":post_id,"link_post":link_post,"string":string});

						
		  	  		}
  	  				
  	  		}
  			//	}
  		}
		//--------------tuan----------------------4-11-14
  		var number_top = $("#number-content-top").val();
  		if ((lastDateFrom <= time_post)&&(time_post<=newDateTo)){
  			if (total_post<=1000){
  				if ((newDateFrom<=time_post)&&(time_post<=newDateTo)&&(load_option==0) && (day<59)){
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
						 
		    			}			
		            });
	  	  	  		object_report_fb.content_top20=array_content_top_20_export;	
	  	  	  			//getEngagementFb();
	  	  	  			drawEngagementChart("engagement",load_option);
	  	  	  		drawEngagementChart_export(load_option);
  	  	  			drawContentChart("content",load_option);
  	  	  			drawContentChart_Export(load_option);
  	  		
	  	  	  			
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
	    			}			
	            });	
  		  		object_report_fb.content_top20=array_content_top_20_export;	
  		  			//getEngagementFb();
  		  			drawEngagementChart("engagement",load_option);
  		  			drawEngagementChart_export(load_option);
	  	  			drawContentChart("content",load_option);
	  	  			drawContentChart_Export(load_option);
	  		
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
					 
	    			}			
	            });
	  			object_report_fb.content_top20=array_content_top_20_export;	
	  			//getEngagementFb();
	  			drawEngagementChart("engagement",load_option);
	  			drawEngagementChart_export(load_option);
	  	  		drawContentChart("content",load_option);
	  	  		drawContentChart_Export(load_option);
	  			$("#analysis_facebook .content_right .block_content").css("opacity","1");
				$("#analysis_facebook .itemLoading").hide();
  		}
	
      }
      
     
      
      function demoGraphicProfile(channel_detail_id,access_token ){
  		$("#fb_education").show();
  		$("#fb_status").show();
  		$("#analysis_facebook .content_right .block-nodata").empty();
  		$("#analysis_facebook .content_right .block_content").css("opacity","0.3");
  		$("#analysis_facebook .itemLoading").show();
  		var channel_user=$("#analysis_facebook .content_right").attr("channel_user");
  		var num_male=0;
  		var num_female=0;
  		var percent=0;
  		//declare value for age chart
  		var  num_u20=0;
  		var  num_u30=0;
  		var  num_u40=0;
  		var  num_u50=0;
  		var  num_u60=0;
  		var  num_u70=0;
  		var num_other=0;
  		
  		var  num_highschool=0;
  		var  num_college=0;
  		var num_married=0;
  		var num_singel=0;
  		
  		//$(".content_right .block-nodata").empty();
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
  		var newDateTo = toTimestamp(dateTo) + (24 * 60 * 60) ;
  		FB.api('/'+channel_detail_id+'/friends?fields= id,gender,name,birthday,education,location,relationship_status',{since:newDateFrom,until:newDateTo,access_token:access_token}, function(response) {
  			 if(!isNull(response.error)){
				
				 $("#analysis_facebook .content_right").append("<div id='div_error_fb' style='width:100%; height:100%;position:absolute;z-index:9999;top:0'></div>")
			  		$("#analysis_facebook .itemLoading").hide();
				 checkAccountError(response,"facebookprofile",channel_user);
			}
  			 //$(".btnClose").click();
  			 else
  				 {
  				$("#div_error_fb").remove();
  				aoFrm.mess("close","close");
  				num_male=0;
  	  			num_female=0;
  	  			num_highschool=0;
  	  			num_college=0;

  	  			var dat;
  	  			var str;
  	  			var currentTime = new Date();
  	  			var year_now=currentTime.getFullYear();
  	  			friends_number=response.data.length;//friends_number
  	              for (var i = 0; i < response.data.length; i++) {
  	  				dat=response.data[i].birthday;
  	  				//calculate the number of males and female
  	  				if (response.data[i].gender=='male') num_male+=1;						 
  	  				if (response.data[i].gender=='female') num_female+=1;
  	  				//relasionship
  	  				if (response.data[i].relationship_status=='Married')num_married+=1;
  	  				
  	  				//education
  	  				var edu=response.data[i].education;
  	  			   if (!isNull(edu)){
  	  				   var edu_length=response.data[i].education.length;
  	  				   
  	  				  
  	  				   for (var j=0;j<edu_length;j++){
  	  						if (isNull(edu)) 
  	  							num_other+=1;
  	  						if (edu[j].type=='College'){
  	  						num_college+=1;
  	  						break;
  	  						
  	  						}
  	  						
  	  						}
  	  				}
  	  				//calculate the age of friends 
  	  				if (!isNull(dat)){
  	  					str=dat.split("/");
  	  					if (!isNull(str[2])){
  	  					var Inte=parseInt(str[2]);
  	  					var age=year_now-Inte;
  	  					
  	  					
  	  					//if (age<=20) num_u20+=1;
  	  						 if (age>18 && age<=24) num_u20+=1;
  	  						else if (age>25 && age<=34) num_u30+=1;
  	  						else if (age>35 && age<=44) num_u40+=1;
  	  						else if (age>45 && age<=54) num_u50+=1;
  	  						else if (age>55 && age<=64) num_u60+=1;
  	  						else num_u70+=1;

  	  					}
  	  				}
  	  				
  	  			}
  	              if((num_male+num_female)>0){
  	            	num_male=Math.round(num_male/(num_male+num_female)*100); 
  	              }
  	              
  	              else
  	            	  {
  	            	  num_male=0;
  	            	  
  	            	  }
  	  		   num_highschool=friends_number-num_college;
  	  		   ageChart(num_u20, num_u30, num_u40, num_u50, num_u60,num_u70);
  	  		   genderChart(num_male);
  	  		   edudationChar(num_highschool,num_college);
  	  		   statusChart(num_married,friends_number-num_married);
  	           //o day 
  				 }
  			
  		
          });
  	}
  	function drawContentChart(type,load_option){
  		aoFrm.setLang("#box-content","analysis/facebook");
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
  		
  		new_content = last_total_content;
  		new_like =  last_total_like;
  		new_comment =  last_total_comment;
  		new_share = last_total_share;
  		new_comment_like =last_total_comment_like;
  		
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
	 			
  			$("#number-total").html(numberWithCommas(total_like));
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
             
  			$("#number-total").html(numberWithCommas(total_comment/2));
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
	  			
  			$("#number-total").html(total_comment_like);
  			$("#number-new").html(new_comment_like);
  			$("#content-text-total").html("<span>"+day_number+"</span><span text='total_current_date'>"+current_date+"</span>");
  			$("#content-text-new").html("<span>"+day_number+"</span><span text='total_last_date'>"+last_date+"</span>");
  			$("#content-text-growth").html("<span text='contentgrowth'>Growth of rate</span>");
  			array_current = array_comment_like;
  			last_array_current = last_array_comment_like;
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
  				query = 'SELECT permalink,source_id, post_id ,created_time, message,share_count,like_info,comment_info FROM stream WHERE message <> "" and source_id = "'+channel_detail_id+'" and created_time < '+time_post+' limit 200';
			FB.api({method: 'fql.query',
		        query: query,access_token:token
		      },function(response) {
		    	  if(!isNull(response.error_subcode)){
			    	 
			    	  $("#analysis_facebook .content_right").append("<div id='div_error_fb' style='width:100%; height:100%;position:absolute;z-index:9999;top:0'></div>")
			    	  $("#analysis_facebook .itemLoading").hide();
			    	  checkAccountFqlError(data_source,"facebookpage","");
		    	  }
		    	  else
		    		  {
		    		  $("#div_error_fb").remove();
					getTopPost(response,newDateFrom,newDateTo,channel_detail_id,pchannel_detail_id,token,day);
		    		  }
		    		  });
      }
 	
  	function getEngagementFb(){
  		var object_engagement= new Object();
  		var engagement = 0;
  		var brand_royalty = 0;
  		var activity = 0;
  		var engagementRate = 0;
  		var spread = 0;
  		var total_friends = 0;
	  	total_friends = friends_number;
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
  				obj_summary_fb.newfan=array_summary[i-1].fan-array_summary[i-2].fan;	
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
	    $("#engagement_num").html(engagement);
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
  
  	function drawSumaryChart(type,load_option){
  		aoFrm.setLang("#box-summary","analysis/facebook");
  		$("#summary_title_fb").html("<span text='fan'>"+type+"<span>");
  		if (type=="fan"){
			$("#summary_title_fb").html("<span text='fan'>"+type+"</span>");
		}else if(type=="friend of fan"){
			$("#summary_title_fb").html("<span text='friend_of_fan'>"+type+"</span>");
		}
		else if(type=="reach"){
			$("#summary_title_fb").html("<span text='reach'>"+type+"</span>");
		}else if(type=="people talking"){
			$("#summary_title_fb").html("<span text='people_talking'>"+type+"</span>");
		}else{
			$("#summary_title_fb").html("<span text='peopletalkinggrowth'>"+type+"</span>");
		}
  		var total_fan=0;
  		
  		var friend_of_fan=0;
  		var last_friend_of_fan=0;
  		var total_peopletalking=0;
  		var total_reach=0;
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
  		var fan_tem=0;
  		var friendsoffan_tem=0;
  		var last_fan_tem=0;
  		var last_friendsoffan_tem=0;
  		var current_date="";
		var last_date="";
		var day_number=array_summary.length-1;
		if(day_number==1){
			current_date=" recent day";
			last_date=" day before";
		}
		else
			{
			current_date=" recent days";
			last_date=" days before";
			}
  		for(var j=0; j<array_summary.length;j++){
  			var days = new Date(array_summary[j].day);
  			array_date.push(days.getMonth() + 1 + "/" + days.getDate());
  			array_date_title.push(days.getMonth() + 1 + "/" + days.getDate());
  			if(array_summary[j].fan>0){
  				fan_tem=array_summary[j].fan;
  				array_fan.push(array_summary[j].fan);
  			}
  			else
  				{
  					array_fan.push(fan_tem);
  				}
  			
  			if(array_summary[j].friendsoffan>0){
  				friendsoffan_tem=array_summary[j].friendsoffan;
  				array_friend_of_fan.push(array_summary[j].friendsoffan);
  				}
  				
  			else{
  					array_friend_of_fan.push(friendsoffan_tem);
  				
  				
  			}
  				
  			if (array_summary[j].fan!=0)
  				total_fan= array_summary[j].fan;
			//friend_of_fan
  			if (array_summary[j].friendsoffan!=0)
  				friend_of_fan= array_summary[j].friendsoffan;
  			array_reach.push(array_summary[j].reach);
  			total_reach=total_reach+array_summary[j].reach;
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
      			if(arraylast_summary[k].fan>0){
      				last_fan_tem=arraylast_summary[k].fan;
      				array_last_fan.push(arraylast_summary[k].fan);
      			}
      			else
      				{
      				array_last_fan.push(last_fan_tem);
      				
      				}
				if(arraylast_summary[k].friendsoffan>0){
					last_friendsoffan_tem=arraylast_summary[k].friendsoffan;
					array_last_friend_of_fan.push(arraylast_summary[k].friendsoffan);
				}
				else
					{
					
						array_last_friend_of_fan.push(last_friendsoffan_tem);
					
					}
				
	  			
	  			array_last_peopletalking.push(arraylast_summary[k].peopletalking);
	  			last_total_peopletalking=roundNumber((last_total_peopletalking+arraylast_summary[k].peopletalking),2);
	  			if (arraylast_summary[k].fan!=0)
	  				{
	  				last_total_fan= arraylast_summary[k].fan;
	  				array_last_peopletalking_fan.push(roundNumber((arraylast_summary[k].peopletalking/arraylast_summary[k].fan)*100,2));
	  				last_total_peopletalking_fan =roundNumber(last_total_peopletalking_fan,2)+roundNumber((arraylast_summary[k].peopletalking/arraylast_summary[k].fan)*100,2);
	  				}
	  			else{
	  				array_last_peopletalking_fan.push(0);
	  			}
  				
	  				if (arraylast_summary[k].friendsoffan!=0)
	  	  				last_friend_of_fan= arraylast_summary[k].friendsoffan;
  			
	  				
			}
			//new_reach=array_reach[array_reach.lenght-1]-array_reach[array_reach.lenght-2];
			new_peopletalking=last_total_peopletalking;
			new_peopletalking_fan=last_total_peopletalking_fan;
			if(array_fan.length-1>0)
			new_fan=array_fan[array_fan.length-1]-array_fan[array_fan.length-2];
			if(array_friend_of_fan.length-1>0){
				
				new_friend_of_fan =array_friend_of_fan[array_friend_of_fan.length-1]-array_friend_of_fan[array_friend_of_fan.length-2];
			}
			if(new_friend_of_fan>0)
			$("#new_fan").html(numberWithCommas(new_friend_of_fan));
			else
				$("#new_fan").html("0");
			if(type=="fan"){
				$("#text-total").html("<span text='totalfan'>Total Friend</span>");
		  		$("#text-new").html("<span text='newfan'>New Friend</span>");
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
				$("#number-total-fb").html(numberWithCommas(total_fan));
				appendGrowth(growth_of);
      			if (new_fan>0){
      				$("#number-total-visiter").html(numberWithCommas(new_fan));
      			}else{
      			
      				$("#number-total-visiter").html("0");
      				
      			}
			}
			else if(type=="friend of fan"){
				$("#text-total").html("<span text='totalfriend'>Friend of Friend</span>");
		  		$("#text-new").html("<span text='newfriend'>New Friend of Friend</span>");
		  		$("#text-growth").html("<span text='growthofrate'>Growth Of Rate</span>");
				array_current=array_friend_of_fan;
				array_last= array_last_friend_of_fan;
				if(last_friend_of_fan>0)
				growth_of=Math.floor(((friend_of_fan-last_friend_of_fan)/last_friend_of_fan)*100);
				else
					growth_of=0;
				
				//$("#number-total-fb").html(total_fan);
			
				appendGrowth(growth_of);
				$("#number-total-fb").html(numberWithCommas(friend_of_fan));
      			if (new_friend_of_fan>0){
      			
      				$("#number-total-visiter").html(numberWithCommas(new_friend_of_fan));
      			}else{
      			
      				$("#new_fan").html("0");
      				$("#number-total-visiter").html("0");
      			}
			}
			else if(type=="reach"){
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
				$("#number-total-fb").html(total_peopletalking);
      			if (new_peopletalking>0){
      				
      				$("#number-total-visiter").html(roundNumber(new_peopletalking,2));
      			}else{
      				$("#number-total-visiter").html("0");
      			}
			
				}
			else
				{
				$("#text-total").html("<span>"+day_number+"</span><span text='total_current_date'>"+current_date+"</span>");
		  		$("#text-new").html("<span>"+day_number+"</span><span text='total_last_date'>"+last_date+"</span>");
		  		$("#text-growth").html("<span text='growthofrate'>Growth Of Rate</span>");
				array_current=array_peopletalking_fan;
				array_last= array_last_peopletalking_fan;	
			
				//$("#number-total-fb").html(total_peopletalking_fan+"%");
				if(last_total_peopletalking_fan>0)
					growth_of=Math.floor(((total_peopletalking_fan-last_total_peopletalking_fan)/last_total_peopletalking_fan)*100);
					else
						growth_of=0;
					$("#number-total-fb").html(roundNumber(total_peopletalking_fan,2)+"%");
					appendGrowth(growth_of);
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
 
  	
  	function getFriendsSummary(DateFrom,DateTo,channel_detail_id,type){
  	//alert(JSON.stringify(arraylast_summary))
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
       value: "getfb"
   }); 
   dataString.push({
       name: "type", 
       value: type
   }); 
	$.ajax({
		 type:'GET',
		  url : 'AnalysisReport.do',
		  dataType: 'json',
		  data: dataString,
		  success : function(source) {
   		var coun_source1=0;
			  var friends;
                 
				  for(var i=0; i<source.length;i++){
					  coun_source1++;
					  var date_post = new Date(source[i].day);
					  date_post = (date_post.getMonth() + 1) +"/"+ date_post.getDate()+ "/" +date_post.getFullYear();
					  friends= source[i].following; 
					
					 for(var j=0;j<array_summary.length;j++){
					
						 if(array_summary[j].day==date_post){
							 array_summary[j].fan=friends;
							 array_summary[j].friendsoffan=source[i].friendsoffan;
						 }
					 }
					 for(var k=0;k<arraylast_summary.length;k++){
						 if(arraylast_summary[k].day==date_post){
							 arraylast_summary[k].fan=friends;
							 arraylast_summary[k].friendsoffan=source[i].friendsoffan;
						 }
					 }
					 if(coun_source1==source.length){
						 getEngagementFb();
						  drawSumaryChart("fan");
					  	  	drawSumaryChart_Export();
					 }
				  }
				

			  
		  }
	});
  	}
  	
  	function exportCsvFacebook(){
  		var str = ''+''+JSON.stringify(object_report_fb)+''+'';
		$("#exportContent").val(str);
		$("#exportForm").submit();	
  	}
  	
  	function influenceFb(channel_detail_id,token,newDateFrom,newDateTo){
		var query1 = 'SELECT source_id, post_id ,created_time,message, like_info,  share_count,comment_info FROM stream WHERE source_id in (select uid2 from friend where uid1='+channel_detail_id+')and message <> "" limit 0,200';
		var query2 = "select fromid, username, text, time, post_id,likes from comment where fromid <>'"+channel_detail_id+"' and  post_id in (SELECT post_id  FROM stream WHERE source_id ='"+channel_detail_id+"' limit 0,200)";
  		FB.api({method: 'fql.multiquery',queries:{
  			query1: query1,
  			query2: query2
  		},access_token:token
	      },function(response) {
	    	  if(!isNull(response.error_subcode)){
		    	
		    	  $("#analysis_facebook .content_right").append("<div id='div_error_fb' style='width:100%; height:100%;position:absolute;z-index:9999;top:0'></div>")
		    	  $("#analysis_facebook .itemLoading").hide();  
		    	  checkAccountFqlError(data_source,"facebookpage","");
	    	  }
	    	  else
	    		  {
	    		  $("#div_error_fb").remove();
	    	  getInfluence(response,channel_detail_id,newDateFrom,newDateTo,token);  	 
	    		  }
	    		  });
  		
  	}
  	
  	function influenceFbMore(channel_detail_id,token,newDateFrom,newDateTo,time_post){
		var query1 = 'SELECT source_id, post_id ,created_time,message, like_info, share_count,comment_info FROM stream WHERE created_time < '+time_post+' and  source_id in (select uid2 from friend where uid1='+channel_detail_id+') and message <> "" limit 200';
		var query2 = "select fromid, username, text, time, post_id,likes from comment where fromid <>'"+channel_detail_id+"' and  post_id in (SELECT post_id  FROM stream WHERE source_id ='"+channel_detail_id+"' limit 200)";
  		FB.api({method: 'fql.multiquery',queries:{
  			query1: query1,
  			query2: query2
  		},access_token:token
	      },function(response) {
	    	  if(!isNull(response.error_subcode)){
		    	 
		    	  $("#analysis_facebook .content_right").append("<div id='div_error_fb' style='width:100%; height:100%;position:absolute;z-index:9999;top:0'></div>")
		    	  $("#analysis_facebook .itemLoading").hide(); 
		    	  checkAccountFqlError(data_source,"facebookpage","");
	    	  }
	    	  else
	    		  {
	    		  $("#div_error_fb").remove();
	    		  getInfluence(response,channel_detail_id,newDateFrom,newDateTo,token); 
	    		  }
	    	    	 
	      });
  		
  	}
  	
  	function getInfluence(response,channel_detail_id,newDateFrom,newDateTo,token){
  		if (last_channel_id!=channel_detail_id){
  			return;
  		}
  		var dateFrom = new Date((newDateFrom - (24 * 60 * 60)) * 1000);
		var date1= (dateFrom.getMonth() + 1) + "/" + dateFrom.getDate() + "/" + dateFrom.getFullYear();
		var dateTo = new Date((newDateTo - (48 * 60 * 60)) * 1000);
		var date2= (dateTo.getMonth() + 1) + "/" + dateTo.getDate() + "/" + dateTo.getFullYear();
		var time_post;
		var array_post_id = new Array();
  		for (var i=0;i<response[0].fql_result_set.length;i++){
			var post_id;
	  		var like_num = 0;
	  		var comment_num = 0;
	  		var share_num = 0;
	  		//var source_id;
	  		
	  		time_post = response[0].fql_result_set[i].created_time;
			//if (!isNull(response[i].message)) {
				//if ((newDateFrom<=time_post)&&(time_post<=newDateTo)){
					this.source_id = response[0].fql_result_set[i].source_id;
					var user_id=this['source_id'];
					post_id = response[0].fql_result_set[i].post_id;
	  				comment_num = response[0].fql_result_set[i].comment_info.comment_count;
	  				share_num= response[0].fql_result_set[i].share_count;
	  				like_num = response[0].fql_result_set[i].like_info.like_count;
		  			if (isNull(obj_influence[user_id])){
	  		  				obj_influence[user_id] = parseInt(comment_num) + parseInt(like_num) + parseInt(share_num);
	  		  			}else{
	  		  				obj_influence[user_id] = obj_influence[user_id] + parseInt(comment_num) + parseInt(like_num) + parseInt(share_num);
		  			
		  			}
	  		//}
			
		}
  		for (var j=0; j< response[1].fql_result_set.length;j++){
  			var comment_like_num = 0;
  			if (!isNull(response[1].fql_result_set[j].likes)){
	  			comment_like_num = response[1].fql_result_set[j].likes;
	  		}else{
	  			comment_like_num = 0;
	  		}
  			obj_influence[user_id] = obj_influence[user_id] + parseInt(comment_like_num);
  		}
	  if (response[0].fql_result_set.length > 0){
		  influenceFbMore(channel_detail_id,token,newDateFrom,newDateTo,time_post);
	  }else{
    	  var number_top = $("#number-influence-top").val();
    	  appendHtmlInfluence(number_top,date1,date2,token);
    	  $("#number-influence-top").keydown(function(e) {
    	        if(e.keyCode==13){
    	      	  number_top = $(this).val();
    	      	  appendHtmlInfluence(number_top,date1,date2,token);
    			}			
    	    });
	  }
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

  	function selectFqlComment(channel_detail_id, token,newDateFrom,newDateTo,channel_user){
  		var query="";
  		
  		var day = Math.round((newDateTo - newDateFrom)/60/60/24);
  		var lastDateTo = newDateFrom - (24 * 60 * 60);
  		var lastDateFrom = lastDateTo - (day * 24 * 60 * 60);
  		query= "select time, post_id,likes from comment where  post_id in (SELECT post_id  FROM stream WHERE source_id = '"+channel_detail_id+"'  limit 200)";
		  FB.api({method: 'fql.query',
		        query: query,access_token:token
		      },function(response) {
		    	  if(!isNull(response.error_subcode)){
			    	  
			    	  $("#analysis_facebook .content_right").append("<div id='div_error_fb' style='width:100%; height:100%;position:absolute;z-index:9999;top:0'></div>")
			    	  $("#analysis_facebook .itemLoading").hide(); 
			    	  checkAccountFqlError(response,"facebookpage",channel_user);
		    	  }
		    	  else
		    		  {
		    		  $("#div_error_fb").remove();
		    	  getTopLikeofComment(response,newDateFrom,newDateTo,token,channel_detail_id);
		    		  }
		      }
  	);
  	}
  	function getLikeofCommentMore(channel_detail_id,token,time_comment,newDateFrom,newDateTo){
  		var query="";
  		query= "select time, post_id,likes from comment where  post_id in (SELECT post_id  FROM stream WHERE source_id = '"+channel_detail_id+"' limit 200) and time < '"+time_comment+"'";
		  FB.api({method: 'fql.query',
		        query: query,access_token:token
		      },function(response) {
		    	  if(!isNull(response.error_subcode)){
			    	 
			    	  $("#analysis_facebook .content_right").append("<div id='div_error_fb' style='width:100%; height:100%;position:absolute;z-index:9999;top:0'></div>")
			    	  $("#analysis_facebook .itemLoading").hide();  
			    	  checkAccountFqlError(data_source,"facebookpage","");
		    	  }
		    	  else
		    		  {
		    		  $("#div_error_fb").remove();
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
   	var sortArraypostid = converObjectToArray(obj_post_id)
		//$("#tr_"+response[i].post_id).find("td.comment-like").text(response[i].likes);
   	//var sortArraypostid = converObjectToArray(obj_post_id)
		for (var i=0;i<sortArraypostid.length;i++){
		 
			  var id = sortArraypostid[i].key;
			  var value=sortArraypostid[i].value;
			//$("#tr_"+id).find("td.comment-like").text(value);
			jQuery("#top_jqgrid").jqGrid('setCell',id, 'like_of_comment',value);
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
  		influenceFb(channel_detail_id,token,newDateFrom,newDateTo);
  	}
  	
  	function appendHtmlInfluence(number_top,date1,date2,token){
  		var sortArrayInfluene = converObjectToArray(obj_influence).sort(function(a,b){
				return b.value - a.value;
			});
  		var strid = "";
	   	for (var i=0;i<sortArrayInfluene.length;i++){
  		  if (i < number_top){
  			  var id = sortArrayInfluene[i].key;
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
		      },function(response) {
		    	  if(!isNull(response.error_subcode)){
			    	  
			    	  $("#analysis_facebook .content_right").append("<div id='div_error_fb' style='width:100%; height:100%;position:absolute;z-index:9999;top:0'></div>")
			    	  $("#analysis_facebook .itemLoading").hide();  
			    	  checkAccountFqlError(data_source,"facebookpage","");
		    	  }
		    	  else
		    		  {
		    		  $("#div_error_fb").remove();
		    	  $("#block-influence tbody").empty();
		    	  var count_inf = 0;
		   		 var brand_royalty = 0;
		 	   	  var newHtml = "";
		 	   	  for (var j=0;j<sortArrayInfluene.length;j++){
		 	   		  if (j<number_top){
		 	   			  var id = sortArrayInfluene[j].key;
		 	   			  var url_influence = "https://www.facebook.com/" + id;
		 	   			  spread = sortArrayInfluene[j].value;
		 	   			  for (var k=0;k<response.length;k++){
		 	   				  if (id==response[k].uid){
		 	   					  var object_influence= new Object();
		 	   					  count_inf++;
		 	   					  name = response[k].name;
	 				    		  wall_count = response[k].wall_count;
	 				    		  if (!isNull(wall_count)){
	 	   						  brand_royalty = (spread/wall_count) * 100;
	 						    	  brand_royalty = Math.floor(brand_royalty*100)/100;
		 	   					  }else{
		 	   						  brand_royalty = 0;
		 	   					  }
	 					    	  object_influence.date=date1+" ~ "+date2;
	 					          object_influence.no=count_inf;
	 					          object_influence.account=name;
	 					          object_influence.spread=spread;
	 					          object_influence.brandroyalty=brand_royalty;
	 					          array_influence_export.push(object_influence);
	 					    	  newHtml = "<tr><td>"+count_inf+"</td><td class='left'><a href='"+url_influence+"' target='_blank'>"+name+"</a></td><td>"+spread+"</td><td>"+brand_royalty+"%</td></tr>";
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
						var content='<a href="'+arr[i].link_post+'" target="_blank">'+arr[i].string+'</a>';
		  				post_arr.push({"no":count,"post_id":arr[i].post_id,"tittle":content,"reach":arr[i].total,"like":arr[i].like,"share":arr[i].share,"comment":arr[i].comment,"like_of_comment":arr[i].commentlike});
				}
				
			}
			getPost(post_arr);
  	}
  	function exportExcelFacebookProfile(){
  		if(!$.browser.msie){
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
  			$("#status svg").attr("id","chart_status");
  			$("#fb_education svg").attr("id","chart_education");
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
  		     var svg_education = document.getElementById("chart_education");
  		     var svg_status = document.getElementById("chart_status");
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
  				svg_status.toDataURL("image/png", {
  					callback: function(data) {
  						
  						$("#image_status").val(data);
  					}
  				});
  				svg_education.toDataURL("image/png", {
  					callback: function(data) {
  						
  						$("#image_education").val(data);
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
  			
  			new_content = last_total_content;
  			new_like =  last_total_like;
  			new_comment = last_total_comment;
  			new_share =last_total_share;
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
  		function drawSumaryChart_Export(){
  			var count_array=0;
  			object_summary_chart={};
  			var total_fan=0;
  			var friend_of_fan=0;
  			var last_friend_of_fan=0;
  			var total_peopletalking=0;
  			var total_reach=0;
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
  			var fan_tem=0;
  			var friendsoffan_tem=0;
  			var last_fan_tem=0;
  			var last_friendsoffan_tem=0;
  			for(var j=0; j<array_summary.length;j++){
  				var days = new Date(array_summary[j].day);
  				array_date.push(days.getDate());
  				array_date_title.push(days.getMonth() + 1 + "/" + days.getDate());
  				if(array_summary[j].fan>0){
  	  				fan_tem=array_summary[j].fan;
  	  				array_fan.push(array_summary[j].fan);
  	  			}
  	  			else
  	  				{
  	  					array_fan.push(fan_tem);
  	  				}
  				if(array_summary[j].friendsoffan>0){
  	  				friendsoffan_tem=array_summary[j].friendsoffan;
  	  				array_friend_of_fan.push(array_summary[j].friendsoffan);
  	  				}
  	  				
  	  			else{
  	  					array_friend_of_fan.push(friendsoffan_tem);
  	  				
  	  				
  	  			}
  				if (array_summary[j].fan!=0)
  					total_fan= array_summary[j].fan;
  				if (array_summary[j].friendsoffan!=0)
  					friend_of_fan= array_summary[j].friendsoffan;
  				array_reach.push(array_summary[j].reach);
  				total_reach=total_reach+array_summary[j].reach;
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
  				
  			/*	else if(friends_number!=0){
  					array_peopletalking_fan.push(roundNumber((array_summary[j].peopletalking/friends_number)*100),2);
  		  			total_peopletalking_fan =roundNumber(total_peopletalking_fan,2)+roundNumber((array_summary[j].peopletalking/friends_number)*100,2);			
  				}
  		*/
  					
  			}
  			
  			for(var k=0; k<arraylast_summary.length;k++){
  				var days = new Date(arraylast_summary[k].day);
  	  			last_array_date_title.push(days.getMonth() + 1 + "/" + days.getDate());
  	  		if(arraylast_summary[k].fan>0){
  				last_fan_tem=arraylast_summary[k].fan;
  				array_last_fan.push(arraylast_summary[k].fan);
  			}
  			else
  				{
  				array_last_fan.push(last_fan_tem);
  				
  				}
			if(arraylast_summary[k].friendsoffan>0){
				last_friendsoffan_tem=arraylast_summary[k].friendsoffan;
				array_last_friend_of_fan.push(arraylast_summary[k].friendsoffan);
			}
			else
				{
				
					array_last_friend_of_fan.push(last_friendsoffan_tem);
				
				}
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
  	  			  			
  	  			  /* if(friends_number!=0){
  	  				 array_last_peopletalking_fan.push(roundNumber((arraylast_summary[k].peopletalking/friends_number)*100,2));
  	  				 last_total_peopletalking_fan =roundNumber(last_total_peopletalking_fan,2)+roundNumber((arraylast_summary[k].peopletalking/friends_number)*100,2);
  	  			   }*/
  	  				
  			}
  			//new_reach=array_reach[array_reach.lenght-1]-array_reach[array_reach.lenght-2];
  			new_peopletalking=last_total_peopletalking;
  			new_peopletalking_fan=last_total_peopletalking_fan;
  			if(array_fan.length-1>0)
  			new_fan=array_fan[array_fan.length-1]-array_fan[array_fan.length-2];
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
  				object_summary_chart.new_fan_value=new_fan;
  				if(last_friend_of_fan>0)
  				growth_of=Math.floor(((friend_of_fan-last_friend_of_fan)/last_friend_of_fan)*100);
  				else
  					growth_of=0;
  				
  				appendGrowth(growth_of);
  			  
  	  			if (new_friend_of_fan>0){
  	  				new_friend_of_fan=new_friend_of_fan;
  	  			}else{
  	  				new_friend_of_fan=0;
  	  			}
  			
  				new_reach = total_reach-last_total_reach;
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
  				object_summary_chart.new_peopletalking_fan_value=new_peopletalking_fan;

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
  	            data: formatDayRange(array_peopletalking)
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
	  	  	friends_number=0;
	  	  	comment_like_total = 0;
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
  			var prevDate = start_date;
  			while (prevDate < end_date){
  	  			var dateFrom = new Date(prevDate * 1000);
  	  			obj.push({"day": (dateFrom.getMonth() + 1) + "/" + dateFrom.getDate() + "/" + dateFrom.getFullYear(),"content":0,"like":0,"share":0,"comment":0,"likeofcomment":0,"engagement":0,"activity":0,"spread":0,"engagementRate":0,"brand_royalty":0});
  	  			array_summary.push({"day": (dateFrom.getMonth() + 1) + "/" + dateFrom.getDate() + "/" + dateFrom.getFullYear(),"fan":0,"reach":null,"peopletalking":null,"friendsoffan":0});
  	  			prevDate = prevDate + (24 * 60 * 60);
  	  		}
  			
  			var day = Math.round((end_date - start_date)/60/60/24);
  	  		var lastDateTo = start_date - (24 * 60 * 60);
  	  		var lastDateFrom = lastDateTo - (day * 24 * 60 * 60);
  	  		var lastPrevDate = lastDateFrom;
  	  		while (lastPrevDate < lastDateTo){
  	  			var dateFrom = new Date(lastPrevDate * 1000);
  	  			last_obj.push({"day": (dateFrom.getMonth() + 1) + "/" + dateFrom.getDate() + "/" + dateFrom.getFullYear(),"content":0,"like":0,"share":0,"comment":0,"likeofcomment":0});
  	  			arraylast_summary.push({"day": (dateFrom.getMonth() + 1) + "/" + dateFrom.getDate() + "/" + dateFrom.getFullYear(),"fan":0,"reach":0,"peopletalking":0,"friendsoffan":0});
  	  			lastPrevDate = lastPrevDate + (24 * 60 * 60);
  	  		}
  	  	getFbReportFromDB(channel_detail_id,lastDateFrom,end_date,load_option);
  	  	demoGraphicProfile(pchannel_detail_id,access_token);
  	  		//getTokenPage(channel_detail_id,pchannel_detail_id,access_token,lastDateFrom,end_date);
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
  			  var count_source=0;
  			  for(var i=0; i<source.length;i++){
  				count_source++;
  				  var date_post = new Date(source[i].create_date* 1000);
  		  			date_post = (date_post.getMonth() + 1) +"/"+ date_post.getDate()+ "/" +date_post.getFullYear();
  		  			
  		  			for(var j=0; j<array_summary.length;j++){
  		  				
  		  				if(array_summary[j].day==date_post){
  		  				  array_summary[j].fan=source[i].friends;
  		  				  array_summary[j].friendsoffan=source[i].friendsoffan;
  		  					
  		  				}
  		  			}
  		  			
  		  			for(var j=0; j<arraylast_summary.length;j++){

  		  				if(arraylast_summary[j].day==date_post){
  		  					arraylast_summary[j].fan=source[i].friends;
  		  					arraylast_summary[j].friendsoffan=source[i].friendsoffan;
  		  					
  		  				}
  		  			}
  		  			if(count_source==source.length){
  		  			getEngagementFb();
  		  			drawSumaryChart("fan",load_option);
  		  			drawSumaryChart_Export();
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
			width: 100
		},
		{
			name: 'like',
			index: 'like',
			width: 100
		},
		{
			name: 'share',
			index: 'share',
			width: 100
		},
		{
			name: 'comment',
			index: 'comment',
			width: 100
		},
		{
			name: 'like_of_comment',
			index: 'like_of_comment',
			width: 120
		},
		]
		});
	jQuery("#top_jqgrid").jqGrid('clearGridData');
	/*
	for(var i=0;i<=(row-1);i++) {
		//jQuery("#top_jqgrid").jqGrid('addRowData',i+1,arr[i]);
		//jQuery("#top_jqgrid").jqGrid('setCell',i+1, 'no', i+1);
	}
	*/
	 jQuery("#top_jqgrid").jqGrid('setGridParam', {data: arr}).trigger('reloadGrid');
}	
function showCalendarProfile(load_option){
	  	
		var day = 0;
		if (load_option==0){
			day = -60;
		}else{
			day = -90;
		}
		$('#analysis_facebook .date-range').daterangepicker({opens: 'left',
	        format: 'MM/dd/yyyy',
	        separator: ' to ',
	        startDate: Date.today().add({
	            days: -7
	        }),
	        endDate: Date.today(),
	        minDate: Date.today().add({
	            days: day
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
	
}
  	

  	

  	
  	
  	
      
      
	
	
	
	
	
