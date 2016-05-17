/***************************************************************************
 Page Code:	Dasboard/dasboard
 First Author:
 Created Date: 
 **************************************************************************/

/*** Gray theme for Highcharts JS ***/

function chartResize()
{
	
	_dw = $(window).innerWidth();
	_bw = $("#dashboard_dashboard .block-demographic").innerWidth();
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
	$("#dashboard_dashboard .block-demographic .chartBox .chart").css("height",_h);
}
//chartResize();
$(window).resize(function(e) {
   /// chartResize();	
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
$('#dashboard_dashboard .date-range').daterangepicker({opens: 'right',
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

var obj = new Object();
var object_report_dashboard = new Object();
var array_new_member = new Array();
var array_content = new Array();
var array_industry_content = new Array();
var obj_date_list = new Object();
var date = new Date();
var currentDate = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
var lastDate = new Date();
var days = 7;
var res = date.setTime(date.getTime() - (days * 24 * 60 * 60 * 1000));		
var lastDate = new Date(res);
var newDate = (lastDate.getMonth() + 1) + "/" + lastDate.getDate() + "/" + lastDate.getFullYear();
$("#dashboard_dashboard #dashboard_range").val(newDate +" to " + currentDate);
$(document).ready(function() {
	getMemberPaid();
	getMemberIndustry();
	getMessageType();
});

$(".range_inputs .btn").click(function(){
	setTimeout(function(){
		getMemberPaid();
		getMessageType();
		getMemberIndustry();
	},100);
});
function getMemberPaid(){
	var stringDate = $("#dashboard_dashboard #dashboard_range").val();
	var newString = stringDate.split("to");
	var stringFrom = formatDate(newString[0]);
	var stringTo = formatDate(newString[1]);
		
	//date for facebook: plus 1 day
	var newStringFrom = new Date(stringFrom);
	var newStringTo = new Date(stringTo);
	var dateFrom = new Date(newStringFrom);
	var dateTo = new Date(newStringTo);
	var newDateFrom = toTimestamp(dateFrom) + (24 * 60 * 60);
	var newDateTo = toTimestamp(dateTo) + (48 * 60 * 60) ;
	var prevDate = toTimestamp(dateFrom);
	array_new_member = [];
	array_content = [];
	array_industry_content = [];
	obj_date_list = {};
	while (prevDate < newDateTo - (24 * 60 * 60)){
		var dateFrom = new Date(prevDate * 1000);
		object_report_dashboard.title_content={date:"Date", draft:"Draft", scheduled:"Scheduled",sent:"Sent", all:"All"};
		object_report_dashboard.title_member={date:"Date", newmember:"New Member", paidmember:"Paid Member",freemember:"Free Member"};
		object_report_dashboard.title_industry={date:"Date", number:"Number", industry:"Industry"};
		array_new_member.push({"day": formatDate(dateFrom),"number":0,"free":0,"paid":0});
		array_content.push({"day": formatDate(dateFrom),"draft":0,"schedule":0,"sent":0,"all":0});
		array_industry_content.push({"day":formatDate(dateFrom)});
		obj_date_list[formatDate(dateFrom)] = 0;
		
		prevDate = prevDate + (24 * 60 * 60);
	}
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
         value: "memberpaid"
     });
	$.ajax({
		  url : '../AdminDashboard.do',
		  dataType: 'json',
		  data: dataString, 
		  success : function(source) {
			  memberChart(source);
		  }
	});
}
function getMemberIndustry(){
	var stringDate = $("#dashboard_dashboard #dashboard_range").val();
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
         value: "industry"
     });
	$.ajax({
		  url : '../AdminDashboard.do',
		  dataType: 'json',
		  data: dataString, 
		  success : function(source) {
			  
			  
			  
			  industryChart(source);
		  }
	});
}
function memberChart(source){
	for (var i=0;i < array_new_member.length;i++){
		for (var j=0;j<source.length;j++){
			if (array_new_member[i].day==source[j].create_date){
				if (source[j].type == 0){
					//array_new_member[i].free = source[j].type;
					array_new_member[i].free = source[j].number;
				}else{
					array_new_member[i].paid = source[j].number;
				}
				
				
			}
		}
	}
	object_report_dashboard.array_member=array_new_member;
	var array_date = new Array();
	var array_free_member = new Array();
	var array_paid_member = new Array();
	var leave_member = 0;
	var free_member = 0;
	var paid_member = 0;
	var percent_free = 0;
	var percent_paid = 0;
	var percent_leave = 0;
	var total=0;
	for (var k = 0; k< array_new_member.length;k++){
		var days = new Date(array_new_member[k].day);
		array_date.push(days.getDate());
		array_free_member.push(array_new_member[k].free);
		array_paid_member.push(array_new_member[k].paid);
		free_member = free_member + array_new_member[k].free;
		paid_member = paid_member + array_new_member[k].paid;
	}
	total=leave_member + free_member + paid_member;
	if(total>0)
	{
		percent_free = (free_member/total)*100;
		percent_paid = (paid_member/total)*100;
		percent_leave = (leave_member/total)*100;
	}
	else
		{
		percent_free = 0;
		percent_paid = 0;
		percent_leave = 0;
		}
	$("#all_member").html(leave_member + free_member + paid_member);
	$("#leave_member").html(leave_member);
	$("#free_member").html(free_member);
	$("#paid_member").html(paid_member);
	$("#percent_free_member").html(free_member + "(" + percent_free + "%)");
	$("#percent_paid_member").html(paid_member + "(" + percent_paid + "%)");
	$("#percent_leave_member").html(leave_member + "(" + percent_leave + "%)");
	info = new Highcharts.Chart({
			chart: {
            type: 'area',
            renderTo: 'member-chart',
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
                stacking: 'normal',
                lineColor: '#4DA944',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#3880AA'
                }
            }
        },
        series: [{
            name: "Free Member",
            color: '#3880AA',
            data: formatDayRange(array_free_member)
        },
        {
            name: "Paid Member",
            color: '#4DA944',
            data: formatDayRange(array_paid_member)
        }
        ]
		});
}

function industryChart(source){
	
	var list_industry = new Array();
	var industry_obj = new Object();
	for (var i=0;i<source.length;i++){
		list_industry.push(source[i].industry);
		
		if (isNull(industry_obj[source[i].industry])){
			var clone_date_list_obj = jQuery.extend(true, {}, obj_date_list);
			clone_date_list_obj[source[i].create_date] =  source[i].number;
			industry_obj[source[i].industry] = clone_date_list_obj;
		}else{
			var date_list_obj = industry_obj[source[i].industry];
			date_list_obj[source[i].create_date] = source[i].number;
		}
	}
	
	
	var array_chart = new Array();
	var obj_chart = new Object();
	for (property in industry_obj) {
		var obj_item = new Object();
		obj_item.name = property;
		if(!isNull(industry[obj_item.name])){
			obj_item.name = industry[obj_item.name];
		}
		obj_item.data = formatDayRange(converValueObjectToArray(industry_obj[property]));
		array_chart.push(obj_item);
	}
	
	var array_date = new Array();
	var array_industry = new Array();
	for (var k = 0; k< array_industry_content.length;k++){
		var days = new Date(array_industry_content[k].day);
		array_date.push(days.getDate());
		
	}
	//alert(JSON.stringify(array_chart))
	object_report_dashboard.array_member_industry=source;
	info = new Highcharts.Chart({
		chart: {
            type: 'column',
            renderTo: 'member-industry-chart',
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
        series: array_chart
		});
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
	object_report_dashboard.array_member_content=array_content;
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
            renderTo: 'member-contents-chart',
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

function getMessageType(){
	var stringDate = $("#dashboard_dashboard #dashboard_range").val();
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
function exportCsvDashboard(){
	//alert(JSON.stringify(object_report_dashboard))
	var str = ''+''+JSON.stringify(object_report_dashboard)+''+'';
	$("#exportContent").val(str);
	$("#exportForm").submit();
}
	
	
		
		