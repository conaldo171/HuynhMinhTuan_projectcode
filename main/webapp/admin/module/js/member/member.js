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
 //   chartResize();	
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
$('#member_member .date-range').daterangepicker({opens: 'right',
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

var date = new Date();
var currentDate = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
var lastDate = new Date();
var days = 7;
var res = date.setTime(date.getTime() - (days * 24 * 60 * 60 * 1000));		
var lastDate = new Date(res);
var newDate = (lastDate.getMonth() + 1) + "/" + lastDate.getDate() + "/" + lastDate.getFullYear();
$("#member_member #dashboard_range").val(newDate +" to " + currentDate);
var array_member_export = new Object();


$(document).ready(function() {
	array_member_export.title_member={date:"Date", no:"No",create_date:"Create Date", industry:"Industry",company:"Company", name:"Name",email:"Email", channel:"Channel",team_member:"Team Member",total_content:"Totals Content",service:"Service",service_start:"Service Start", service_end:"Service End"};
	$(".range_inputs .btn").click(function(){
		setTimeout(function(){
			loadMemberAfterSelectDate();	
		},100);
	});
	getMember();
	
});
function getMember(){
	var grid_width = $(".block-table").innerWidth();
	var grid = jQuery("#member-jqgrid");
	var stringDate = $("#member_member #dashboard_range").val();
	var newString = stringDate.split("to");
	var stringFrom = formatDate(newString[0]);
	var stringTo = formatDate(newString[1]);
	grid.jqGrid({
		url:'../AdminMember.do',           
	    datatype: "json",
	    mtype: 'GET',
		height: 200,
		rowNum:200,
		colNames:['No','Id','Team Id', 'Since', 'Industry', 'Company', 'Name', 'Email', 'Channel','list channel', 'Team member', 'Total cotents', 'Service', 'Service Started', 'Service End'],
		width: grid_width,
		colModel: [{
			name: 'no',
			index: 'no',
			sortable: false,
			width: 20,
			editable: false
		},
		{
			name: 'user_id',
			index: 'user_id',
			sortable: false,
			editable: false,
			hidden:true,
			key:true,
			resizable:false,
			fixed:true,
			width: 1
		},
		{
			name: 'team_id',
			index: 'team_id',
			sortable: false,
			editable: false,
			hidden:true,
			
			resizable:false,
			fixed:true,
			width: 1
		},
		{
			name: 'since',
			index: 'since',
			sortable: false,
			editable: false,
			width: 150
		},
		{
			name: 'industry',
			index: 'industry',
			width: 100
		},
		{
			name: 'company_name',
			index: 'company_name',
			width: 100
		},
		{
			name: 'name',
			index: 'name',
			width: 100
		},
		{
			name: 'email',
			index: 'email',
			width: 200
		},
		{
			name: 'list_channel',
			index: 'list_channel',
			width: 100,
			align:"center"
		},
		{
			name: 'channel',
			index: 'channel',
			width: 1,
			hidden:true,
			align:"center"
		},
		{
			name: 'member',
			index: 'member',
			width: 60
		},
		{
			name: 'totalcontent',
			index: 'totalcontent',
			width: 60
		},
		{
			name: 'type',
			index: 'type',
			width: 100
		},
		{
			name: 'date_start',
			index: 'date_start',
			width: 100
		},
		{
			name: 'date_expired',
			index: 'date_expired',
			width: 100
		},
		],
		rowNum:10,
		rowList:[10,20,40],
		sortname: 'name',
		//viewrecords: true,
		sortorder: "desc",
		pager: '#padtable',
		loadComplete : function(source) {
	
			var rowData = grid.jqGrid("getRowData");
			array_member_export.content_member=rowData;
			
		},
		onSelectRow: function(id) {
			//currentIndex = id;
			var singleRow = grid.jqGrid('getGridParam', 'selrow');
			var prow = grid.jqGrid('getRowData', singleRow);
			var team_id=prow.team_id;
			loadSelectedMember(id,team_id);
			//getChannelReport(id);
		}
		});
	
	//jQuery("#list9").jqGrid('navGrid','#pager9',{add:false,del:false,edit:false,position:'right'});
	grid.jqGrid("navGrid","#padtable",{edit:false,add:false,del:false});
}
function loadMemberAfterSearch(){
	var stringDate = $("#member_member #dashboard_range").val();
	var newString = stringDate.split("to");
	var stringFrom = formatDate(newString[0]);
	var stringTo = formatDate(newString[1]);
	var industry=$("#industry").val();
	var service=$("#service").val();
	var all = $("#all-user").val();
	var txtsearch= $("#txt_email_name").val();
	var grid = jQuery("#member-jqgrid");//?datefrom='+stringFrom+'&dateto='+stringTo
    $.post('../AdminMember.do',
    {search:'OK',countonly:'true',industry:industry,service:service,all:all,
    	txtsearch:txtsearch,datefrom:stringFrom,dateto:stringTo},
    function(result){
        if(result!=''){
             grid.jqGrid('setGridParam',{postData:{'search':'OK'} });
            grid.jqGrid('setGridParam',{postData:{'industry': industry}});
            grid.jqGrid('setGridParam',{postData:{'service': service}});
            grid.jqGrid('setGridParam',{postData:{'all': all}});
            grid.jqGrid('setGridParam',{postData:{'txtsearch':txtsearch}});
            grid.jqGrid('setGridParam',{postData:{'datefrom': stringFrom}});
            grid.jqGrid('setGridParam',{postData:{'dateto':stringTo}});
            grid.trigger("reloadGrid");
           
                    
            //Clear post data
            delete grid.jqGrid('getGridParam' ,'postData' )['search'];
            delete grid.jqGrid('getGridParam' ,'postData' )['industry'];
            delete grid.jqGrid('getGridParam' ,'postData' )['service'];
            delete grid.jqGrid('getGridParam' ,'postData' )['all'];
            delete grid.jqGrid('getGridParam' ,'postData' )['txtsearch'];
           delete grid.jqGrid('getGridParam' ,'postData' )['datefrom'];
           delete grid.jqGrid('getGridParam' ,'postData' )['dateto'];
        }
    });       
}
function loadMemberAfterSelectDate(){
	var grid = jQuery("#member-jqgrid");
	var stringDate = $("#member_member #dashboard_range").val();
	var newString = stringDate.split("to");
	var stringFrom = formatDate(newString[0]);
	var stringTo = formatDate(newString[1]);
	 $.post('../AdminMember.do',
			    {search:'OK',countonly:'true',datefrom:stringFrom,dateto:stringTo},
			    function(result){
			        if(result!=''){
			        	  grid.jqGrid('setGridParam',{postData:{'search':'OK'} });
			        	  grid.jqGrid('setGridParam',{postData:{'datefrom': stringFrom}});
			              grid.jqGrid('setGridParam',{postData:{'dateto':stringTo}});
			            grid.trigger("reloadGrid");
			            delete grid.jqGrid('getGridParam' ,'postData' )['search'];
			           delete grid.jqGrid('getGridParam' ,'postData' )['datefrom'];
			           delete grid.jqGrid('getGridParam' ,'postData' )['dateto'];
       
			            
			        }
			    });  
}

function loadSelectedMember(id,team_id){
	$.get('module/view/member/member_children.jsp',
		    {user_id:id,team_id:team_id},

		    function(result){
		      $("#member_member").html(result) ;
		    });  
}
function exportCsvMember(){
	var str = ''+''+JSON.stringify(array_member_export)+''+'';
	$("#exportContent").val(str);
	$("#exportForm").submit();
}



