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
$('#contents_contents .date-range').daterangepicker({opens: 'right',
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
var object_report_content = new Object();
var obj_content = new Object();
var array_content = new Array();
var array_content_channel = new Array();
var array_content_channel_facebook_export= new Array();
var array_content_channel_facebook_page_export= new Array();
var array_content_channel_twitter_export = new Array();
var date = new Date();
var currentDate = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
var lastDate = new Date();
var days = 7;
var res = date.setTime(date.getTime() - (days * 24 * 60 * 60 * 1000));		
var lastDate = new Date(res);
var newDate = (lastDate.getMonth() + 1) + "/" + lastDate.getDate() + "/" + lastDate.getFullYear();
$("#contents_contents #dashboard_range").val(newDate +" to " + currentDate);

$(document).ready(function() {
	adminContent();
	getMessageType();
   getMessageByChannel();
	
	object_report_content.title_content={date:"Date", draft:"Draft", scheduled:"Scheduled",sent:"Sent", all:"All"};
	object_report_content.title_Facebook_profile={facebook:"Facebook profile"};
	object_report_content.title_Facebook_page={ facebookpage:"Facebook page"};
	object_report_content.title_Twitter={twitter:"Twitter"};
	$("#contents_contents .block-channel").click(function(){
		$("#contents_contents .block-channel").removeClass("active");
		$(this).addClass("active");
		//adminContent();
		var channel_id =$(this).attr("type");
		if(channel_id==1){
			profileChart(array_content_channel_facebook_export);
		}
		else if(channel_id==2){
			profileChart(array_content_channel_facebook_page_export);
		}
		else
			{
			profileChart(array_content_channel_twitter_export);
			}
		//getMessageByChannel($(this).attr("type"));
	  });
	  
});

$(".range_inputs .btn").click(function(){
	setTimeout(function(){
		adminContent();
		getMessageType();
		//getMessageByChannel(1);
		getMessageByChannel();
	},100);
});

function adminContent(){
	var stringDate = $("#contents_contents #dashboard_range").val();
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
	
	obj_content = [];
	array_content = [];
	array_content_channel=[];
	array_content_channel_twitter_export=[];
	array_content_channel_facebook_export=[];
	array_content_channel_facebook_page_export=[];
	while (prevDate < newDateTo - (24 * 60 * 60)){
		var dateFrom = new Date(prevDate * 1000);
		array_content.push({"day": formatDate(dateFrom),"draft":0,"schedule":0,"sent":0,"all":0});
		array_content_channel.push({"day": formatDate(dateFrom),"draft":0,"schedule":0,"sent":0,"all":0});
		array_content_channel_facebook_export.push({"day": formatDate(dateFrom),"draft":0,"schedule":0,"sent":0,"all":0});
		array_content_channel_facebook_page_export.push({"day": formatDate(dateFrom),"draft":0,"schedule":0,"sent":0,"all":0});
		array_content_channel_twitter_export.push({"day": formatDate(dateFrom),"draft":0,"schedule":0,"sent":0,"all":0});
		prevDate = prevDate + (24 * 60 * 60);
	}
}


function contentsChart(source){
	for (var i=0;i < array_content.length;i++){
		for (var j=0;j<source.length;j++){
			if (array_content[i].day==source[j].create_date){
				if (source[j].type == 1){
					//array_new_member[i].free = source[j].type;
					array_content[i].draft = source[j].number;
				}else if (source[j].type == 2){
					array_content[i].schedule = source[j].number;
				}else {
					array_content[i].sent = source[j].number;
				}
			}
			array_content[i].all = parseInt(array_content[i].draft) + parseInt(array_content[i].schedule) + parseInt(array_content[i].sent);
		}
	}
	object_report_content.array_content =array_content;
	var array_date =new Array();
	var array_draft = new Array();
	var array_schedule = new Array();
	var array_sent = new Array();
	var array_all = new Array();
	
	for (var k = 0; k< array_content.length;k++){
		var days = new Date(array_content[k].day);
		array_date.push(days.getDate());
		array_draft.push(array_content[k].draft);
		array_schedule.push(array_content[k].schedule);
		array_sent.push(array_content[k].sent);
		array_all.push(array_content[k].all);
	}
	info = new Highcharts.Chart({
		chart: {
            type: 'column',
            renderTo: 'contents-chart',
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
            min: 0,
            title: {
                text: ''
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Draft',
            data: formatDayRange(array_draft)

        }, {
            name: 'Schedule',
            data: formatDayRange(array_schedule)

        }, {
            name: 'Sent',
            data: formatDayRange(array_sent)

        }, {
            name: 'All',
            data: formatDayRange(array_all)

        }]
		});
}

function profileChart(source){

	var array_date =new Array();
	var array_draft = new Array();
	var array_schedule = new Array();
	var array_sent = new Array();
	var array_all = new Array();
	for (var k = 0; k< source.length;k++){
		var days = new Date(source[k].day);
		array_date.push(days.getDate());
		array_draft.push(source[k].draft);
		array_schedule.push(source[k].schedule);
		array_sent.push(source[k].sent);
		array_all.push(source[k].all);
	}
	
	info = new Highcharts.Chart({
		chart: {
            type: 'column',
            renderTo: 'profile-chart',
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
            min: 0,
            title: {
                text: ''
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Draft',
            data: formatDayRange(array_draft)

        }, {
            name: 'Schedule',
            data: formatDayRange(array_schedule)

        }, {
            name: 'Sent',
            data: formatDayRange(array_sent)

        }, {
            name: 'All',
            data: formatDayRange(array_all)

        }]
		});
}

function getMessageByChannel(){
	var stringDate = $("#contents_contents #dashboard_range").val();
	var newString = stringDate.split("to");
	var stringFrom = formatDate(newString[0]);
	var stringTo = formatDate(newString[1]);
	var list_channel_id='1,2,3';
	
var dataString=[];
 dataString.push({
     name: "dateto", 
     value: stringTo
 });
 dataString.push({
     name: "datefrom", 
     value: stringFrom
 });
 dataString.push({
     name: "list_channel_id", 
     value: list_channel_id
 });
 dataString.push({
     name: "Action", 
     value: "contentchannelall"
 });
$.ajax({
	  url : '../AdminContent.do',
	  dataType: 'json',
	  data: dataString, 
	  success : function(source) {
		  //var array_content_channel_fb= new Array();
		  for (var i=0;i < array_content_channel_facebook_export.length;i++){
				for (var j=0;j<source.length;j++){
					if (array_content_channel_facebook_export[i].day==source[j].create_date){
						if(source[j].channel_id==1){
							if (source[j].type == 1){
								//array_new_member[i].free = source[j].type;
								array_content_channel_facebook_export[i].draft = source[j].number;
							}else if (source[j].type == 2){
								array_content_channel_facebook_export[i].schedule = source[j].number;
							}else {
								array_content_channel_facebook_export[i].sent = source[j].number;
							}
							//array_content_channel_export[i].channel_id=source[j].channel_id;
							array_content_channel_facebook_export[i].all = parseInt(array_content_channel_facebook_export[i].draft) + parseInt(array_content_channel_facebook_export[i].schedule) + parseInt(array_content_channel_facebook_export[i].sent);
						}
						else if(source[j].channel_id==2){
							if (source[j].type == 1){
								//array_new_member[i].free = source[j].type;
								array_content_channel_facebook_page_export[i].draft = source[j].number;
							}else if (source[j].type == 2){
								array_content_channel_facebook_page_export[i].schedule = source[j].number;
							}else {
								array_content_channel_facebook_page_export[i].sent = source[j].number;
							}
							//array_content_channel_export[i].channel_id=source[j].channel_id;
							array_content_channel_facebook_page_export[i].all = parseInt(array_content_channel_facebook_page_export[i].draft) + parseInt(array_content_channel_facebook_page_export[i].schedule) + parseInt(array_content_channel_facebook_page_export[i].sent);	
						}
						else if(source[j].channel_id==3){
							if (source[j].type == 1){
								//array_new_member[i].free = source[j].type;
								array_content_channel_twitter_export[i].draft = source[j].number;
							}else if (source[j].type == 2){
								array_content_channel_twitter_export[i].schedule = source[j].number;
							}else {
								array_content_channel_twitter_export[i].sent = source[j].number;
							}
							//array_content_channel_export[i].channel_id=source[j].channel_id;
							array_content_channel_twitter_export[i].all = parseInt(array_content_channel_twitter_export[i].draft) + parseInt(array_content_channel_twitter_export[i].schedule) + parseInt(array_content_channel_twitter_export[i].sent);	
						}
						
						
					}
						}
						
			}
		  object_report_content.array_conten_facebook_profile=array_content_channel_facebook_export;
		  object_report_content.array_conten_facebook_page=array_content_channel_facebook_page_export;
		  object_report_content.array_conten_twitter=array_content_channel_twitter_export;
		  profileChart(array_content_channel_facebook_export);
		  
	  }
});
}
/*function contentsIndustryChart(){
	info = new Highcharts.Chart({
		chart: {
            type: 'column',
            renderTo: 'contents-industry-chart',
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
            categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
            tickmarkPlacement: 'on'
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Facebook Profile',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

        }, {
            name: 'Facebook Page',
            data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

        }, {
            name: 'Twitter',
            data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
        }]
		});
}*/
function getMessageType(){
	var stringDate = $("#contents_contents #dashboard_range").val();
	var newString = stringDate.split("to");
	var stringFrom = formatDate(newString[0]);
	var stringTo = formatDate(newString[1]);
var dataString=[];
 dataString.push({
     name: "dateto", 
     value: stringTo
 });
 dataString.push({
     name: "datefrom", 
     value: stringFrom
 });
 dataString.push({
     name: "Action", 
     value: "contenttype"
 });
$.ajax({
	  url : '../AdminContent.do',
	  dataType: 'json',
	  data: dataString, 
	  success : function(source) {
		  contentsChart(source);
	  }
});
}

function exportCsvContent(){
	//alert(JSON.stringify(object_report_content))
	var str = ''+''+JSON.stringify(object_report_content)+''+'';
	$("#exportContent").val(str);
	$("#exportForm").submit();
}