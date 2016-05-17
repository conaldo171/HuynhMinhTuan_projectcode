
var grid_width = $(".block-compare").innerWidth();
$("#jQgrid_compare").jqGrid({ 
		url: "GetCompetitors.do?type=2",
		datatype: "json",
	    mtype: "POST",  
		height: 200,
		colNames:['id','Register Date','Facebook Page Name','page_name1','page_name2','Compare','Delete','page_id1','page_id2'],
		width: grid_width,
		colModel: [
		{
			name: 'competitors_id',
			index: 'competitors_id',
			resizable:false,
			fixed:true,
			width: 1,
			hidden:true,
			key:true
		},
		{
			name: 'create_date',
			index: 'create_date',
			resizable:false,
			fixed:true,
			width: 200
		},{
			name: 'page_name',
			index: 'page_name',
			sortable: false,
			width: 500,
			editable: false
		},
		{
			name: 'page_name1',
			index: 'page_name1',
			sortable: false,
			width: 1,
			editable: false,
			hidden:true
		},
		{
			name: 'page_name2',
			index: 'page_name2',
			sortable: false,
			width: 1,
			editable: false,
			hidden:true
		},
		{
			name: 'compare',
			index: 'compare',
			sortable: false,
			width: 150
		},
		
		{
			name: 'delete',
			index: 'delete',
			sortable: false,
			editable: false,
			width: 150
		},
		{
			name: 'page_id1',
			index: 'page_id1',
			sortable: false,
			editable: false,
			width: 1,
			hidden:true
		},
		{
			name: 'page_id2',
			index: 'page_id2',
			sortable: false,
			editable: false,
			width: 1,
			hidden:true
		}
		],
		sortname: 'page_name',
		viewrecords: true,
		sortorder: "desc",
		gridComplete: function() {
			var ids = $("#jQgrid_compare").jqGrid('getDataIDs');
			for ( var i = 0; i <= ids.length; i++) {
				if(i%2==0){
					
				}
				else
					{
					$("#"+ids[i])
                    .css({
                        "background": "none repeat scroll 0 0 #F3F4F8"
                        
                    });
					}
			}
			 // using common.js
		},
		
         onSelectRow: function(id) {
        	 
        	var singleRow = $("#jQgrid_compare").jqGrid('getGridParam', 'selrow');
 			var prow = $("#jQgrid_compare").jqGrid('getRowData', singleRow);
 			var page_name1=prow.page_name1;
 			var page_name2=prow.page_name2;
 			var page_id1=prow.page_id1;
 			var page_id2=prow.page_id2;
 			showPageCompetitor(page_name1,page_name2,page_id1,page_id2);
			}
		});

$('#competitors_range').daterangepicker({opens: 'left',
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


var date = new Date();
var token_page=0;
var currentDate = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
var lastDate = new Date();
var days = 7;
var page_limit=100;
var array_infor_page= new Array();
var array_data_page= new Array();
var array_data_fb_fan_people_talking= new Array();
var array_object_chart_data= new Array();
var array_fan_people_talking= new Array();
var array_page_name=new Array();
var obj_influence1 =new Object();
var obj_influence2 =new Object();
var count_channel=0;
var count_inforPage=0;
var showFan_People_talking_count=0;
var count_influence=0;
var array_influence=0;
var res = date.setTime(date.getTime() - (days * 24 * 60 * 60 * 1000));		
var lastDate = new Date(res);
var newDate = (lastDate.getMonth() + 1) + "/" + lastDate.getDate() + "/" + lastDate.getFullYear();
$("#competitors_range").val(newDate +" to " + currentDate);
$(document).ready(function() {
	checkExprired();
	aoFrm.reloadLang(".competitors_twitter_page");
	aoFrm.mess("close","close");
	getChannelDetail();
	//btn_save_modify
	$("#btn_Save").click(function(){
		
		clearData();
		 aoFrm.mess("close","close");
		 var array_page= new Array();
			var channel_detail_id1=$("#txt_page_name1").attr("channel_detail_id");
			var channel_detail_id2=$("#txt_page_name2").attr("channel_detail_id");
			var page_name1=$("#txt_page_name1").val();
			var page_name2=$("#txt_page_name2").val();
			if(!isNull(channel_detail_id1)&&!isNull(channel_detail_id2)&&!isNull(page_name1)&&!isNull(page_name1)){
				//array_page.push(channel_detail_id1);
				//array_page.push(channel_detail_id2);
				$("#competitors_facebook .block_save_competitors").hide();
				$("#competitors_facebook .block_show_competitors").show();
				saveCompetitors();
				compareFBP1(channel_detail_id1);
				compareFBP2(channel_detail_id2);
				influentPage1(channel_detail_id1);
				influentPage2(channel_detail_id2);
			}
			else
				{
				  aoFrm.mess("alert",mess.message_page_empty);
				}
	});
	
	$("#btn_back").click(function(){
		$("#competitors_facebook .block_save_competitors").show();
		$("#competitors_facebook .block_show_competitors").hide();
	});
	$("#btn_Compare").click(function(){
		
		clearData();
		 aoFrm.mess("close","close");
		// var array_page= new Array();
		var channel_detail_id1=$("#txt_page_name1").attr("channel_detail_id");
		var channel_detail_id2=$("#txt_page_name2").attr("channel_detail_id");
		//alert(channel_detail_id1+"_"+channel_detail_id2)
		if(!isNull(channel_detail_id1)&&!isNull(channel_detail_id2)){
			$("#competitors_facebook .block_save_competitors").hide();
			$("#competitors_facebook .block_show_competitors").show();
			//array_page.push(channel_detail_id1);
			//array_page.push(channel_detail_id2);
			compareFBP1(channel_detail_id1);
			compareFBP2(channel_detail_id2);
			influentPage1(channel_detail_id1);
			influentPage2(channel_detail_id2);
		}
		else
			{
			  aoFrm.mess("alert",mess.message_page_empty);
			}
		
	});
	$( "#txt_page_name1").keypress(function(event) {
		var text=$( "#txt_page_name1" ).val();
		
		if(!isNull(text)){
			 searchPage1(text);
		}
		});
	$( "#txt_page_name2").keypress(function(event) {
		var text=$( "#txt_page_name2" ).val();
		
		if(!isNull(text)){
			 searchPage2(text);
		}
		});
	$(".range_inputs .btn").click(function(){
		setTimeout(function(){
			clearData();
			 aoFrm.mess("close","close");
			// var array_page= new Array();
			var channel_detail_id1=$("#txt_page_name1").attr("channel_detail_id");
			var channel_detail_id2=$("#txt_page_name2").attr("channel_detail_id");
			if(!isNull(channel_detail_id1)&&!isNull(channel_detail_id2)){
				//array_page.push(channel_detail_id1);
				//array_page.push(channel_detail_id2);
				compareFBP1(channel_detail_id1);
				compareFBP2(channel_detail_id2);
				influentPage1(channel_detail_id1);
				influentPage2(channel_detail_id2);
			}
		},100);
		
	
});
});
function getChannelDetail(){
	var dataString=[];
	 dataString.push({
       name: "channel_id", 
       value: ""
   });	
	 $.ajax({
		  url : 'GetChannelDetail.do',
		  dataType: 'json',
		  data: dataString,
		  success : function(source) {
			  for(var i=0; i<source.length;i++){
				  if(source[i].channel_id==1||source[i].channel_id==2){
					  token_page=source[i].token_user;	
				  }
		  }
			  if (isNull(token_page)){
				  $(".competitors_facebook-page_page #aoFrm-content").append('<div class="nodata span4"><h4 text="nochannel">'+mess.message_nodata+'</h4><p text="channelcompare">'+mess.channelcomparefb+'</p></div>');
				  $("#competitors_facebook").css("opacity","0.3");
			  }else{
				  $(".competitors_facebook-page_page #aoFrm-content .nodata").empty();
				  $("#competitors_facebook").css("opacity","1");
			  }
	 }
});
}
function saveCompetitors(){
	var txt_page_name1=$("#txt_page_name1").val();
	var txt_page_name2=$("#txt_page_name2").val();
	var channel_detail_id1=$("#txt_page_name1").attr("channel_detail_id");
	var channel_detail_id2=$("#txt_page_name2").attr("channel_detail_id");
	var dataString =[];
	 dataString.push({
	  name: "page_name1", 
	  value: txt_page_name1
	});
	 dataString.push({
		  name: "page_name2", 
		  value: txt_page_name2
		});
	 dataString.push({
		  name: "channel_detail_id1", 
		  value: channel_detail_id1
		});
		 dataString.push({
			  name: "channel_detail_id2", 
			  value: channel_detail_id2
			});
	dataString.push({
	  name: "type", 
	  value: 2
	});
	dataString.push({
	  name: "Action", 
	  value: "save"
	});    

	$.ajax({
	 type:'POST',
	  url : 'Competitors.do',
	  dataType: 'text',
	  data: dataString,
	  success : function(source) {
		  if(source.trim()!="0"){
			  aoFrm.mess("mess",mess.message_save_competitors);  
			  addNewRowInGrid(source,txt_page_name1,txt_page_name2,channel_detail_id1,channel_detail_id2);
		  }
		  }
  });	
}
function searchPage1(str_keyword){
	 array_source=[];
	var url="https://graph.facebook.com/search?q="+str_keyword+"&access_token="+token_page+"&type=page&limit="+page_limit
	 $("#search_page_name1").append("<div class='loading-small'></div>");
	$("#txt_page_name1").autocomplete({
	       appendTo: "#search_page_name1",
	       position: { my: "left top", at: "left bottom", of: "#search_page_name1" },
	       minLength: 0,
	       source:function( request, response ){
	    	   $.ajax({
	    		   url: url,
	    		   dataType: "jsonp",
	    		   success: function( source ) {
	    		   response( $.map( source.data, function( item ) {
	    		   return {
	    		   label: item.name ,
	    		   value: item.id
	    		   }
	    		   }));
	    		   }
	    		   });
	    		   
	       },
	       focus: function (event, ui) {
	           $("#txt_page_name1").val(ui.item.label);
	           return false;
	       },
	       select: function (event, ui) {
	    	   $("#txt_page_name1").attr("channel_detail_id",ui.item.value);
	    	   $("#page1").attr("channel_detail_id",ui.item.value);
	    	   $("#page_name1").attr("title",ui.item.label);
	    	   $("#page_name1").html(limitString(ui.item.label));
	    	   $(".leftName .blockPage li.name").attr("title",ui.item.label);
	    	   $(".leftName .blockPage li.name").text(limitString(ui.item.label));
	    	   $(".leftName .blockPage li img").attr('src','https://graph.facebook.com/'+ui.item.value+'/picture');
	    	   $("#search_page_name1 .loading-small").hide();
	           return false;
	       }
	   })
	   .data("ui-autocomplete")._renderItem = function (ul, item) {
		return $('<li style="width:82%"></li>')
	       .append("<a><span style='margin-left: 10px;'>"+item.label+"</span></a>")
	       .appendTo(ul);
	     };

}

 function searchPage2(str_keyword){
	 array_source=[];
	 var url="https://graph.facebook.com/search?q="+str_keyword+"&access_token="+token_page+"&type=page&limit="+page_limit
	 $("#search_page_name2").append("<div class='loading-small'></div>");
				$("#txt_page_name2").autocomplete({
				       appendTo: "#search_page_name2",
				       position: { my: "right top", at: "right bottom", of: "#search_page_name2" },
				       minLength: 1,
				       source:function( request, response ){
				    	   $.ajax({
				    		   url: url,
				    		   dataType: "jsonp",
				    		   
				    		   success: function( source ) {
				    		   response( $.map( source.data, function( item ) {
				    		   return {
				    		   label: item.name ,
				    		   value: item.id
				    		   }
				    		   }));
				    		   }
				    		   });
				    		   
				       },
				       focus: function (event, ui) {
				    	   
				           $("#txt_page_name2").val(ui.item.label);
				           return false;
				       },
				       select: function (event, ui) {
				    	   $("#txt_page_name2").attr("channel_detail_id",ui.item.value);
				    	   $("#page2").attr("channel_detail_id",ui.item.value);
				    	   $(".rightName .blockPage li.name").attr("title",ui.item.label);
				    	   $(".rightName .blockPage li.name").text(limitString(ui.item.label));
				    	   $("#page_name2").attr("title",ui.item.label);
				    	   $("#page_name2").html(limitString(ui.item.label));
				    	   $(".rightName .blockPage li img").attr('src','https://graph.facebook.com/'+ui.item.value+'/picture');
				    	   $("#search_page_name2 .loading-small").hide();
				           return false;
				       }
				   })
				   .data("ui-autocomplete")._renderItem = function (ul, item) {
				       return $('<li style="width:82%"></li>')
				       .append("<a><span style='margin-left: 10px;'>" + item.label + "</span></a>")
				       .appendTo(ul);
				   };

}
 
function compareFBP1(page_id){
	$(".competitors_facebook-page_page #aoFrm-content").append("<div class='itemLoading'></div>");
	$("#competitors_facebook").css("opacity","0.3");
	var stringDate = $("#competitors_facebook #competitors_range").val();
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
	while (prevDate < newDateTo - (24 * 60 * 60)){
			var dateFrom = new Date(prevDate * 1000);
			array_object_chart_data.push({"day": (dateFrom.getMonth() + 1) + "/" + dateFrom.getDate() + "/" + dateFrom.getFullYear(),"content_page1":0,"content_page2":0,"like_page1":0,"like_page2":0,"share_page1":0,"share_page2":0,"comment_page1":0,"comment_page2":0,"engagement_page1":0,"engagement_page2":0,"activity_page1":0,"activity_page2":0,"brand_loyalty_page1":0,"brand_loyalty_page2":0});
			//array_summary.push({"day": (dateFrom.getMonth() + 1) + "/" + dateFrom.getDate() + "/" + dateFrom.getFullYear(),"fan":0,"reach":null,"peopletalking":null,"friendsoffan":0});
			array_fan_people_talking.push({"day": (dateFrom.getMonth() + 1) + "/" + dateFrom.getDate() + "/" + dateFrom.getFullYear(),"fan1":0,"fan2":0,"people_talking1":0,"people_talking2":0});
			prevDate = prevDate + (24 * 60 * 60);
		}
	   		var query = "";
  				query = 'SELECT permalink,source_id, post_id ,created_time, message,share_count,like_info,comment_info FROM stream WHERE permalink <> "" and source_id = '+page_id+' and actor_id='+page_id+' limit 200' ;
			FB.api({method: 'fql.query',
		        query: query,access_token:token_page
		      },function(response) {
					showDataCompare(response);
					
  	  		      });
			FB.api('/'+page_id+'?fields=id,likes,talking_about_count,category',{access_token:token_page}, function(reply) {
				showInforPage(reply);
				getFBCompetitors(page_id, newDateFrom, newDateTo);
			});
	
}
function compareFBP2(page_id){
	var stringDate = $("#competitors_facebook #competitors_range").val();
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
 		var query = "";
 				query = 'SELECT permalink,source_id, post_id ,created_time, message,share_count,like_info,comment_info FROM stream WHERE message <> "" and source_id = '+page_id+' and actor_id='+page_id+' limit 200' ;
			FB.api({method: 'fql.query',
		        query: query,access_token:token_page
		      },function(response) {
					showDataCompare(response);
					
 	  		      });
			FB.api('/'+page_id+'?fields=id,likes,talking_about_count,category',{access_token:token_page}, function(reply) {
				showInforPage(reply);
				getFBCompetitors(page_id, newDateFrom, newDateTo);
			});
	
}
function showInforPage(response){
	count_inforPage++;
			var image_cover = '';
		  	var id;
		  	var category = '';
		  	var fan_count = 0;
		  	var people_talking = 0;
		  	var object_infor= new Object();
			  		  if (!isNull(response.talking_about_count))
			  			  people_talking = response.talking_about_count;
			  		  if (!isNull(response.likes))
			  			  fan_count = response.likes;
			  		  if (!isNull(response.category))
			  			category = response.category;
			  		 if (!isNull(response.id))
				  			id = response.id;
			  		object_infor.id=id;
			  		object_infor.likes=fan_count;
			  		object_infor.people_talking_about=people_talking;
			  		array_infor_page.push(object_infor);
			  		 
			  	
		if(count_inforPage==2){
			var page_id1=$("#page1").attr("channel_detail_id");
			var page_id2=$("#page2").attr("channel_detail_id");
			var like_page1;
			var like_page2;
			var ptat_page1;
			var ptat_page2;
			var percent_like_page1;
			var percent_like_page2;
			var percent_ptat_page1;
			var percent_ptat_page2;
			for(var j=0; j<array_infor_page.length;j++){
				if(array_infor_page[j].id==page_id1){
					like_page1=array_infor_page[j].likes;
					ptat_page1=array_infor_page[j].people_talking_about;
					$("#number_fan").html(numberWithCommas(like_page1));
					$("#number_people_talking").html(numberWithCommas(ptat_page1));
					
				}
				else if(array_infor_page[j].id==page_id2)
					{
					like_page2=array_infor_page[j].likes;
					ptat_page2=array_infor_page[j].people_talking_about;
					$("#number_fan_right").html(numberWithCommas(like_page2));
					$("#number_people_talking_right").html(numberWithCommas(ptat_page2));
					}
			}
			if ((like_page1+like_page2)>0){
				percent_like_page1=roundNumber((like_page1/(like_page1+like_page2))*100,2);
				percent_like_page2=roundNumber((100-percent_like_page1),2);
			}else{
				percent_like_page1=0;
				percent_like_page2=0;
			}
			if ((ptat_page1+ptat_page2)>0){
				percent_ptat_page1=roundNumber((ptat_page1/(ptat_page1+ptat_page2))*100,2);
				percent_ptat_page2=roundNumber((100-percent_ptat_page1) ,2);
			}else{
				percent_ptat_page1= 0;
				percent_ptat_page2= 0;
			}
			
			$("#percent_fan").html(percent_like_page1+"%");
			$("#fan_left").css("width",percent_like_page1+"%");
			$("#percent_fan_right").html(percent_like_page2+"%");
			$("#fan_right").css("width",percent_like_page2+"%");
			$("#percent_people_talking").html(percent_ptat_page1+"%");
			$("#ptat_left").css("width",percent_ptat_page1+"%");
			$("#percent_people_talking_right").html(percent_ptat_page2+"%");
			$("#ptat_right").css("width",percent_ptat_page2+"%");
		}

}
//showDataCompare("");
function showDataCompare(response){
	count_channel++;
	var stringDate = $("#competitors_facebook #competitors_range").val();
	var newString = stringDate.split("to");
	var stringFrom = newString[0];
	var stringTo = newString[1];

	//date for facebook: plus 1 day
	var newStringFrom = new Date(stringFrom);
	var newStringTo = new Date(stringTo);
	var dateFrom = new Date(newStringFrom);
	var dateTo = new Date(newStringTo);
	var newDateFrom = toTimestamp(dateFrom)+(7 * 60 * 60);
	var newDateTo = toTimestamp(dateTo)+(30 * 60 * 60);

	var htmlGeneral;
	var title;
	var string;
	var like_num = 0;
	var comment_num = 0;
	var share_num = 0;
	var active = 0;
	var count = 0;
	
	//count_getTopPost++;
	for (var i=0;i<response.length;i++){
		var obj_data= new Object();
		var time_post = response[i].created_time;
		if ((newDateFrom<=time_post)&&(time_post<=newDateTo)){
			 obj_data.id=response[i].source_id;
				comment_num = response[i].comment_info.comment_count;
				obj_data.comment=comment_num;
				like_num =  response[i].like_info.like_count;
				obj_data.like=like_num;
				share_num= response[i].share_count;
				obj_data.share=share_num;
				active = parseInt(like_num) + parseInt(comment_num) + parseInt(share_num) ;
				obj_data.active=active;
				obj_data.created_time=response[i].created_time;
				array_data_page.push(obj_data);
		}
		  
		}
	if(count_channel==2){
		var page_id1=$("#page1").attr("channel_detail_id");
		var page_id2=$("#page2").attr("channel_detail_id");
		var total_activity_page1=0;
		var total_activity_page2=0;
		var total_post_page1=0;
		var total_post_page2=0;
		var total_engagement_page1=0;
		var total_engagement_page2=0;
		var total_brand_loyalty_page1=0;
		var total_brand_loyalty_page2=0;
		var percent_activity_page1=0;
		var percent_activity_page2=0;
		var percent_brand_loyalty_page1=0;
		var percent_brand_loyalty_page2=0;
		for (var j=0; j<array_data_page.length;j++){
			if(array_data_page[j].id==page_id1){
				total_post_page1++;
				total_activity_page1=total_activity_page1+array_data_page[j].active;
				total_brand_loyalty_page1=parseInt(total_brand_loyalty_page1) +parseInt(array_data_page[j].comment)+parseInt(array_data_page[j].share);
				var date_post = new Date(array_data_page[j].created_time * 1000);
		  			date_post = (date_post.getMonth() + 1) +"/"+ date_post.getDate()+ "/" +date_post.getFullYear();
				for (var k=0; k<array_object_chart_data.length;k++){
		    			if (array_object_chart_data[k].day == date_post){
		    				array_object_chart_data[k].content_page1 = parseInt(array_object_chart_data[k].content_page1) + 1;
		    				array_object_chart_data[k].like_page1 = parseInt(array_object_chart_data[k].like_page1) + parseInt(array_data_page[j].like);
		    				array_object_chart_data[k].share_page1 = parseInt(array_object_chart_data[k].share_page1) + parseInt(array_data_page[j].share);
		    				array_object_chart_data[k].comment_page1 = parseInt(array_object_chart_data[k].comment_page1) +  parseInt(array_data_page[j].comment);
		    				array_object_chart_data[k].engagement_page1 = parseInt(array_object_chart_data[k].engagement_page1) +  parseInt(array_data_page[j].active);
		    				array_object_chart_data[k].activity_page1 = parseInt(array_object_chart_data[k].activity_page1) + parseInt(array_data_page[j].active);
		    				array_object_chart_data[k].brand_loyalty_page1 = parseInt(array_object_chart_data[k].brand_loyalty_page1) +  parseInt(array_data_page[j].share)+parseInt(array_data_page[j].comment);
		    			break;
		    				
		    			}
		    		}
			}
			else if(array_data_page[j].id==page_id2)
				{
				total_post_page2++;
				total_activity_page2=total_activity_page2+array_data_page[j].active;
				total_brand_loyalty_page2=parseInt(total_brand_loyalty_page2) +parseInt(array_data_page[j].comment)+parseInt(array_data_page[j].share);
				var date_post = new Date(array_data_page[j].created_time * 1000);
	  			date_post = (date_post.getMonth() + 1) +"/"+ date_post.getDate()+ "/" +date_post.getFullYear();
				for (var k=0; k<array_object_chart_data.length;k++){
	    			if (array_object_chart_data[k].day == date_post){
	    				array_object_chart_data[k].content_page2 = parseInt(array_object_chart_data[k].content_page2) + 1;
	    				array_object_chart_data[k].like_page2 = parseInt(array_object_chart_data[k].like_page2) + parseInt(array_data_page[j].like);
	    				array_object_chart_data[k].share_page2 = parseInt(array_object_chart_data[k].share_page2) + parseInt(array_data_page[j].share);
	    				array_object_chart_data[k].comment_page2 = parseInt(array_object_chart_data[k].comment_page2) +  parseInt(array_data_page[j].comment);
	    				array_object_chart_data[k].engagement_page2 = parseInt(array_object_chart_data[k].engagement_page2) +  parseInt(array_data_page[j].active);
	    				array_object_chart_data[k].activity_page2 = parseInt(array_object_chart_data[k].activity_page2) + parseInt(array_data_page[j].active);
	    				array_object_chart_data[k].brand_loyalty_page2 = parseInt(array_object_chart_data[k].brand_loyalty_page2) +  parseInt(array_data_page[j].share)+parseInt(array_data_page[j].comment);
	    			break;
	    				
	    			}
	    		}
				}
		}
		if ((total_activity_page1+total_activity_page2)>0){
			percent_activity_page1 = roundNumber(total_activity_page1/(total_activity_page1+total_activity_page2)*100,2);
			percent_activity_page2=roundNumber((100-percent_activity_page1),2);
		}else{
			percent_activity_page1 = 0;
			percent_activity_page2= 0;
		}
		if ((total_brand_loyalty_page1+total_brand_loyalty_page2)>0){
			percent_brand_loyalty_page1=roundNumber(total_brand_loyalty_page1/(total_brand_loyalty_page1+total_brand_loyalty_page2)*100,2);
			percent_brand_loyalty_page2=roundNumber((100-percent_brand_loyalty_page1),2);
		}else{
			percent_brand_loyalty_page1=0;
			percent_brand_loyalty_page2=0;
		}
		
		$("#number_activity").html(numberWithCommas(total_activity_page1));
		$("#number_activity_right").html(numberWithCommas(total_activity_page2));
		$("#number_engagement").html(numberWithCommas(total_activity_page1));
		$("#number_engagement_right").html(numberWithCommas(total_activity_page2));
		$("#number_brand_loyalty").html(numberWithCommas(total_brand_loyalty_page1));
		$("#number_brand_loyalty_right").html(numberWithCommas(total_brand_loyalty_page2));
		$("#percent_activity").html(percent_activity_page1+"%");
		$("#percent_activity_right").html(percent_activity_page2+"%");
		$("#activity_left").css("width",percent_activity_page1+"%");
		$("#activity_right").css("width",percent_activity_page2+"%");
		$("#percent_engagement").html(percent_activity_page1+"%");
		$("#percent_engagement_right").html(percent_activity_page2+"%");
		$("#engagement_left").css("width",percent_activity_page1+"%");
		$("#engagement_right").css("width",percent_activity_page2+"%");
		$("#percent_brand_loyalty").html(percent_brand_loyalty_page1+"%");
		$("#percent_brand_loyalty_right").html(percent_brand_loyalty_page2+"%");
		$("#brand_loyalty_left").css("width",percent_brand_loyalty_page1+"%");
		$("#brand_loyalty_right").css("width",percent_brand_loyalty_page2+"%");
		drawContent();
		$(".competitors_facebook-page_page #aoFrm-content .itemLoading").hide();
		$("#competitors_facebook").css("opacity","1");
	}
}
function drawContent(){
		$(".chart_content").css("height",250);
		var array_date = new Array();
		var array_engagement_page1 = new Array();
		var array_engagement_page2 = new Array();
		var array_activity_page1 = new Array();
		var array_activity_page2 = new Array();
		var array_brand_loyalty_page1 = new Array();
		var array_brand_loyalty_page2 = new Array();
		var array_content_page1 = new Array();
		var array_content_page2 = new Array();
		var array_like_page1=new Array();
		var array_like_page2=new Array();
		var array_comment_page1= new Array();
		var array_comment_page2= new Array();
		var array_share_page1= new Array();
		var array_share_page2= new Array();
		var page_name1= $("#page_name1").attr("title");
		var page_name2=$("#page_name2").attr("title");
		
		for (var i=0;i<array_object_chart_data.length;i++){
			var days = new Date(array_object_chart_data[i].day);
			array_date.push(days.getMonth() + 1 + "/" + days.getDate());
			array_engagement_page1.push(array_object_chart_data[i].engagement_page1);
			array_engagement_page2.push(array_object_chart_data[i].engagement_page2);
			array_activity_page1.push(array_object_chart_data[i].activity_page1);
			array_activity_page2.push(array_object_chart_data[i].activity_page2);
			array_brand_loyalty_page1.push(array_object_chart_data[i].brand_loyalty_page1);
			array_brand_loyalty_page2.push(array_object_chart_data[i].brand_loyalty_page2);
			array_content_page1.push(array_object_chart_data[i].content_page1);
			array_content_page2.push(array_object_chart_data[i].content_page2);
			array_like_page1.push(array_object_chart_data[i].like_page1);
			array_like_page2.push(array_object_chart_data[i].like_page2);
			array_comment_page1.push(array_object_chart_data[i].comment_page1);
			array_comment_page2.push(array_object_chart_data[i].comment_page2);
			array_share_page1.push(array_object_chart_data[i].share_page1);
			array_share_page2.push(array_object_chart_data[i].share_page2);
		}

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
            tickmarkPlacement: 'on',
            labels: {
            	formatter: function(){
                	return this.value;
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
            name: page_name1,
            color: '#3880AA',
            data: formatDayRange(array_content_page1)
        },
        {
            name: page_name2,
            color: '#4DA944',
            data: formatDayRange(array_content_page2)
        }
        ]
		});
		drawLike(array_date,array_like_page1,array_like_page2,page_name1,page_name2);
		drawShare(array_date,array_share_page1,array_share_page2,page_name1,page_name2);
		drawComment(array_date,array_comment_page1,array_comment_page2,page_name1,page_name2);
		drawEngagement(array_date,array_engagement_page1,array_engagement_page2,page_name1,page_name2);
		drawActivity(array_date,array_activity_page1,array_activity_page2,page_name1,page_name2);
		drawBrand_Loyalty(array_date,array_brand_loyalty_page1,array_brand_loyalty_page2,page_name1,page_name2);
}
function drawLike(array_date,array_like_page1,array_like_page2,page_name1,page_name2){
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
        tickmarkPlacement: 'on',
        labels: {
        	formatter: function(){
            	return this.value;
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
        name: page_name1,
        color: '#3880AA',
        data: formatDayRange(array_like_page1)
    },
    {
        name: page_name2,
        color: '#4DA944',
        data: formatDayRange(array_like_page2)
    }
    ]
	});
}
function drawShare(array_date,array_share_page1,array_share_page2,page_name1,page_name2){
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
        tickmarkPlacement: 'on',
        labels: {
        	formatter: function(){
            	return this.value;
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
        name: page_name1,
        color: '#3880AA',
        data: formatDayRange(array_share_page1)
    },
    {
        name: page_name2,
        color: '#4DA944',
        data: formatDayRange(array_share_page2)
    }
    ]
	});
}
function drawComment(array_date,array_comment_page1,array_comment_page2,page_name1,page_name2){
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
        tickmarkPlacement: 'on',
        labels: {
        	formatter: function(){
            	return this.value;
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
        name: page_name1,
        color: '#3880AA',
        data: formatDayRange(array_comment_page1)
    },
    {
        name: page_name2,
        color: '#4DA944',
        data: formatDayRange(array_comment_page2)
    }
    ]
	});
}
function drawEngagement(array_date,array_engagement_page1,array_engagement_page2,page_name1,page_name2){
	info = new Highcharts.Chart({
		chart: {
        type: 'area',
        renderTo: 'engagement_chart',
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
            	return this.value;
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
        name: page_name1,
        color: '#3880AA',
        data: formatDayRange(array_engagement_page1)
    },
    {
        name: page_name2,
        color: '#4DA944',
        data: formatDayRange(array_engagement_page2)
    }
    ]
	});
}
function drawActivity(array_date,array_activity_page1,array_activity_page2,page_name1,page_name2){
	info = new Highcharts.Chart({
		chart: {
        type: 'area',
        renderTo: 'activity_chart',
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
            	return this.value;
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
        name: page_name1,
        color: '#3880AA',
        data: formatDayRange(array_activity_page1)
    },
    {
        name: page_name2,
        color: '#4DA944',
        data: formatDayRange(array_activity_page2)
    }
    ]
	});
}
function drawBrand_Loyalty(array_date,array_brand_loyalty_page1,array_brand_loyalty_page2,page_name1,page_name2){
	
	info = new Highcharts.Chart({
		chart: {
        type: 'area',
        renderTo: 'brand_loyalty_chart',
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
            	return this.value;
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
        name: page_name1,
        color: '#3880AA',
        data: formatDayRange(array_brand_loyalty_page1)
    },
    {
        name: page_name2,
        color: '#4DA944',
        data:formatDayRange( array_brand_loyalty_page2)
    }
    ]
	});
}
function drawFan(){
	$(".chart_content").css("height",250);
	var array_date=new Array();
	var array_fan1= new Array();
	var array_fan2= new Array();
	var array_people_talking1= new Array();
	var array_people_talking2= new Array();
	var page_name1= $("#page_name1").attr("title");
	var page_name2=$("#page_name2").attr("title");
	for(var i =0;i<array_fan_people_talking.length;i++ ){
		var days = new Date(array_object_chart_data[i].day);
		array_date.push(days.getMonth() + 1 + "/" + days.getDate());
		array_fan1.push(array_fan_people_talking[i].fan1);
		array_fan2.push(array_fan_people_talking[i].fan2);
		array_people_talking1.push(array_fan_people_talking[i].people_talking1);
		array_people_talking2.push(array_fan_people_talking[i].people_talking2);
	}
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
        tickmarkPlacement: 'on',
        labels: {
        	formatter: function(){
            	return this.value;
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
        name: page_name1,
        color: '#3880AA',
        data: formatDayRange(array_fan1)
    },
    {
        name: page_name2,
        color: '#4DA944',
        data: formatDayRange(array_fan2)
    }
    ]
	});
	drawPeople_talking(page_name1,page_name2,array_people_talking1,array_people_talking2,array_date);
}
function drawPeople_talking(page_name1,page_name2,array_people_talking1,array_people_talking2,array_date){
	info = new Highcharts.Chart({
		chart: {
        type: 'area',
        renderTo: 'people_talking_chart',
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
            	return this.value;
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
        name: page_name1,
        color: '#3880AA',
        data: formatDayRange(array_people_talking1)
    },
    {
        name: page_name2,
        color: '#4DA944',
        data: formatDayRange(array_people_talking2)
    }
    ]
	});
}
function comparePage(page_id1, page_id2,page_name1, page_name2){
	$("#competitors_facebook .block_save_competitors").hide();
	$("#competitors_facebook .block_show_competitors").show();
	clearData();
	$("#txt_page_name1").attr("channel_detail_id",page_id1);
	
	   $("#page1").attr("channel_detail_id",page_id1);
	   $("#page_name1").attr("title",page_name1);
	   $("#page_name1").html(limitString(page_name1));
	   $(".leftName .blockPage li.name").text(page_name1);
	   $(".leftName .blockPage li img").attr('src','https://graph.facebook.com/'+page_id1+'/picture');
	   $("#txt_page_name2").attr("channel_detail_id",page_id2);
	   $("#page2").attr("channel_detail_id",page_id2);
	   $(".rightName .blockPage li.name").text(page_name2);
	   $("#page_name2").attr("title",page_name2);
	   $("#page_name2").html(limitString(page_name2));
	   $(".rightName .blockPage li img").attr('src','https://graph.facebook.com/'+page_id2+'/picture');
	compareFBP1(page_id1);
	compareFBP2(page_id2);
	influentPage1(page_id1);
	influentPage2(page_id2);
}
function deleteCompetitors(competitors_id){
	var dataString =[];
	 dataString.push({
		  name: "competitors_id", 
		  value: competitors_id
		});
	dataString.push({
	  name: "Action", 
	  value: "delete"
	});    

	$.ajax({
	 type:'POST',
	  url : 'Competitors.do',
	  dataType: 'text',
	  data: dataString,
	  success : function(source) {
		  if(source.trim()!="0"){
			  aoFrm.mess("mess",mess.message_delete_competitors);  
			  $('#jQgrid_compare').jqGrid('delRowData',competitors_id);
			  //$('#jQgrid_compare').reload
			  $('#jQgrid_compare').trigger("reloadGrid");
		  }
		  }
 });	
}
function showPageCompetitor(page_name1,page_name2,page_id1,page_id2){
	clearData();
	array_page_name=[];
	$("#txt_page_name1").val("");
	$("#txt_page_name2").val("");
	$("#txt_page_name1").attr("channel_detail_id",page_id1);
	
	   $("#page1").attr("channel_detail_id",page_id1);
	   $("#page_name1").attr("title",page_name1);
	   $("#page_name1").html(limitString(page_name1));
	   $(".leftName .blockPage li.name").text(page_name1);
	   $(".leftName .blockPage li img").attr('src','https://graph.facebook.com/'+page_id1+'/picture');
	   $("#search_page_name1 .loading-small").hide();
	   var obj_name= new Object();
	   obj_name.page_name1=page_name1;
	   array_page_name.push(obj_name);
	   $("#txt_page_name2").attr("channel_detail_id",page_id2);
	   $("#page2").attr("channel_detail_id",page_id2);
	   $(".rightName .blockPage li.name").text(page_name2);
	   $("#page_name2").attr("title",page_name2);
	   $("#page_name2").html(limitString(page_name2));
	   $(".rightName .blockPage li img").attr('src','https://graph.facebook.com/'+page_id2+'/picture');
	   $("#search_page_name2 .loading-small").hide();
	   var obj_name= new Object();
	   obj_name.page_name2=page_name2;
	   array_page_name.push(obj_name);
	   
}
function influentPage1(channel_detail_id){
	FB.api({method: 'fql.multiquery',queries:{
			query1: "select fromid, username, text, time, post_id,likes from comment where fromid <>'"+channel_detail_id+"' and  post_id in (SELECT post_id  FROM stream WHERE source_id ='"+channel_detail_id+"' limit 0,200)",
			query2: "select user_id,post_id from like where user_id <>'"+channel_detail_id+"' and  post_id in (SELECT post_id  FROM stream WHERE source_id ='"+channel_detail_id+"' limit 0,200)"
		},access_token:token_page
      },function(response) {
    	  getInfluenceFbPage1(response,channel_detail_id,token_page);  	 
      });
}
function influentPage2(channel_detail_id){
	FB.api({method: 'fql.multiquery',queries:{
		query1: "select fromid, username, text, time, post_id,likes from comment where fromid <>'"+channel_detail_id+"' and  post_id in (SELECT post_id  FROM stream WHERE source_id ='"+channel_detail_id+"' limit 0,200)",
		query2: "select user_id,post_id from like where user_id <>'"+channel_detail_id+"' and  post_id in (SELECT post_id  FROM stream WHERE source_id ='"+channel_detail_id+"' limit 0,200)"
	},access_token:token_page
  },function(response) {
	  getInfluenceFbPage2(response,channel_detail_id,token_page);  	 
  });
}
function getInfluenceFbPage1(response,channel_detail_id,token){

	var time_post;
	var array_post_id = new Array();
	var list_user_id="";
		for (var i=0;i<response[0].fql_result_set.length;i++){

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
				 
		if (isNull(obj_influence1[user_id])){
					
			obj_influence1[user_id] = parseInt(comment_like_num) + 1 ;
			list_user_id=list_user_id +","+response[0].fql_result_set[i].fromid;
		}else{
			obj_influence1[user_id] = obj_influence1[user_id] + parseInt(comment_like_num) + 1;
		}
	}
		array_post_id=$.unique(array_post_id);
		
		for (var j=0;j<response[1].fql_result_set.length;j++){
			for (var k=0;k<array_post_id.length;k++){
				this.source_id = response[1].fql_result_set[j].user_id;
				var user_id=this['source_id'];
				if (response[1].fql_result_set[j].post_id==array_post_id[k]){
					if (isNull(obj_influence1[user_id])){
		  				obj_influence1[user_id] = 1;
		  				list_user_id=list_user_id +","+response[1].fql_result_set[j].user_id;
		  			}else{
		  				obj_influence1[user_id] = obj_influence1[user_id] + 1;
		  			}
				}
			}
			
		}
		if (response[0].fql_result_set.length > 0){
			//getInfluenceFbPageMore(channel_detail_id,newDateFrom,newDateTo,token,time_post,type_fb);
		}else{
			
	  list_user_id =list_user_id.substring(1);
	  //var number_top = $("#number-influence-top").val();
	 
	 
	  
		}
		 appendHtmlInfluencePage1(10,token);
	}
function appendHtmlInfluencePage1(number_top,token){
		var sortArrayInfluenePage = converObjectToArray(obj_influence1).sort(function(a,b){
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
		  		    			  if(wall_count>0){
		  		    				  brand_royalty = (spread/wall_count) * 100;
			  		    			  brand_royalty = Math.floor(brand_royalty*100)/100; 
		  		    			  }
		  		    			  else
		  		    				  {
		  		    				brand_royalty = 0;
		  		    				  }
		  		    			
		  		    		  }else{
		  		    			  brand_royalty = 0;
		  		    		  }
			  		    		
		  			    	  newHtml = "<tr><td class='left'><a href='"+url_influence+"' target='_blank'>"+name+"</span></td><td>"+spread+"</td><td>"+brand_royalty+"%</td></tr>";
		  			    	  $("#left_influence tbody").append(newHtml);
		  				  }
		  	    	  }
		  		 }
		  		
		  	  }
	    	 // object_report_fb.content_influence= array_influence_export;
	    	  $("#loading-small").empty();
	      });
	}
function getInfluenceFbPage2(response,channel_detail_id,token){

var time_post;
var array_post_id = new Array();
var list_user_id="";
for (var i=0;i<response[0].fql_result_set.length;i++){
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
		//alert(obj_influence2[user_id])
	if (isNull(obj_influence2[user_id])){
			//alert(parseInt(comment_like_num) + 1)
		obj_influence2[user_id] = parseInt(comment_like_num) + 1 ;
		list_user_id=list_user_id +","+response[0].fql_result_set[i].fromid;
	}else{
		
		//alert(JSON.stringify(obj_influence2[user_id]))
		obj_influence2[user_id] = parseInt(obj_influence2[user_id]) + parseInt(comment_like_num);
	}
}
	array_post_id=$.unique(array_post_id);
	for (var j=0;j<response[1].fql_result_set.length;j++){
		this.source_id = response[1].fql_result_set[j].user_id;
		var user_id=this['source_id'];
		for (var k=0;k<array_post_id.length;k++){
			if (response[1].fql_result_set[j].post_id==array_post_id[k]){
				if (isNull(obj_influence2[user_id])){
	  				obj_influence2[user_id] = 1;
	  				list_user_id=list_user_id +","+response[1].fql_result_set[j].user_id;
	  			}else{
	  				obj_influence2[user_id] = parseInt(obj_influence2[user_id]) + 1;
	  			}
			}
		}
		
	}
	
	if (response[0].fql_result_set.length > 0){
		//getInfluenceFbPageMore(channel_detail_id,newDateFrom,newDateTo,token,time_post,type_fb);
	}else{
		
  list_user_id =list_user_id.substring(1);
  //var number_top = $("#number-influence-top").val();
 
 
  
	}
	 appendHtmlInfluencePage2(10,token);
}
function appendHtmlInfluencePage2(number_top,token){
	
	var sortArrayInfluenePage = converObjectToArray(obj_influence2).sort(function(a,b){
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
	  		    			  if(wall_count>0){
	  		    				 brand_royalty = (spread/wall_count) * 100;
		  		    			  brand_royalty = Math.floor(brand_royalty*100)/100; 
	  		    			  }
	  		    			  else
	  		    				  {
	  		    				brand_royalty=0;
	  		    				  }
	  		    			 
	  		    		  }else{
	  		    			  brand_royalty = 0;
	  		    		  }
		  		    		///object_influence_page.date=date1+" ~ "+date2;
		  		    		//object_influence_page.no=count_inf;
		  		    		//object_influence_page.account=name;
		  		    		//object_influence_page.spread=spread;
		  		    		//object_influence_page.brandroyalty=brand_royalty;
	  			          //array_influence_export.push(object_influence_page);
	  			    	  newHtml = "<tr><td class='left'><a href='"+url_influence+"' target='_blank'>"+name+"</span></td><td>"+spread+"</td><td>"+brand_royalty+"%</td></tr>";
	  			    	  $("#right_influence tbody").append(newHtml);
	  				  }
	  	    	  }
	  		 }
	  		
	  	  }
	  	  	array_page_name=[];
    	 // object_report_fb.content_influence= array_influence_export;
    	  $("#loading-small").empty();
      });
}
function clearData(){
	array_infor_page=[];
	array_data_page=[];
	count_channel=0;
	count_inforPage=0;
	array_object_chart_data=[];
	array_data_fb_fan_people_talking=[];
	obj_influence2={};
	obj_influence1={};
	showFan_People_talking_count=0;
	array_fan_people_talking=[];
	$("#right_influence tbody").empty();
	 $("#left_influence tbody").empty();
	
}
function getFBCompetitors(channel_id, start_date, end_date){
	
  var dataString =[];
	 dataString.push({
  name: "channel_id", 
  value: channel_id
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
	      name: "type", 
	      value: 2
	  	});
	 dataString.push({
  name: "Action", 
  value: "fbtw"
	});
  $.ajax({
	  url : 'GetCompetitors.do',
	  dataType: 'json',
	  data: dataString,
	  success : function(source) {
		  showFan_People_talking(source);
	  }
  });
}
function showFan_People_talking(response){
	var page_id1=$("#page1").attr("channel_detail_id");
	var page_id2=$("#page2").attr("channel_detail_id");
	 showFan_People_talking_count++;
	for(var i=0; i<response.length; i++){
		var object_fb= new Object();
		object_fb.channel_id=response[i].channel_id;
		object_fb.fan=response[i].fan;
		object_fb.people_talking=response[i].people_talking;
		object_fb.create_date= response[i].create_date;
		array_data_fb_fan_people_talking.push(object_fb);
	}
	//alert(JSON.stringify(array_data_fb_fan_people_talking))
	 if(showFan_People_talking_count==2){
		 for(var j=0; j<array_data_fb_fan_people_talking.length; j++){
			// alert(array_data_fb_fan_people_talking[j].channel_id+"_"+page_id1)
		
			 if(array_data_fb_fan_people_talking[j].channel_id==page_id1){
				 var date_post = new Date(array_data_fb_fan_people_talking[j].create_date * 1000);
		  			date_post = (date_post.getMonth() + 1) +"/"+ date_post.getDate()+ "/" +date_post.getFullYear();
		  			for (var k=0; k<array_fan_people_talking.length;k++){
		  				if (array_fan_people_talking[k].day == date_post){
		  					array_fan_people_talking[k].fan1=array_data_fb_fan_people_talking[j].fan;
		  					array_fan_people_talking[k].people_talking1=array_data_fb_fan_people_talking[j].people_talking;
		  				   break;
		  				}
		  			}
			 }
			 if(array_data_fb_fan_people_talking[j].channel_id==page_id2){
				 var date_post = new Date(array_data_fb_fan_people_talking[j].create_date * 1000);
		  			date_post = (date_post.getMonth() + 1) +"/"+ date_post.getDate()+ "/" +date_post.getFullYear();
		  			for (var k=0; k<array_fan_people_talking.length;k++){
		  				if (array_fan_people_talking[k].day == date_post){
		  					array_fan_people_talking[k].fan2=array_data_fb_fan_people_talking[j].fan;
		  					array_fan_people_talking[k].people_talking2=array_data_fb_fan_people_talking[j].people_talking;
		  				  break;
		  				}
		  			}
			 }
		 }
		 drawFan();
	 }
}
function addNewRowInGrid(id,txt_page_name1,txt_page_name2,channel_detail_id1,channel_detail_id2){      
    try{
   	 var date= formatDateCurrent();
   	 var page_name=txt_page_name1+" vs "+txt_page_name2;
        var datarow = { "competitors_id": id,
            "create_date": date, "page_name": page_name,"page_name1":txt_page_name1,"page_name2":txt_page_name2,"compare":"<a onclick='comparePage("+channel_detail_id1+","+channel_detail_id2+")' href='javascript:void(0)'>Compare</a>","delete":"<a onclick='deleteCompetitors("+id+")' href='javascript:void(0)'>Delete</a>","page_id1":channel_detail_id1,"page_id2":channel_detail_id2};
        $('#jQgrid_compare').jqGrid('addRowData',id, datarow, "first");            
       // $('#jQgrid_compare').jqGrid('resetSelection');
       
    }
    catch (ex){
    }
    return false;
}
