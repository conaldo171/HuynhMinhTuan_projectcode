/***************************************************************************
 Page Code:	Dasboard/dasboard
 First Author:
 Created Date: 
 **************************************************************************/
var _margin_top =0;
function chartResize()
{
	_dw = $(window).innerWidth();
	_dh = $(window).innerHeight();
	_bw = $("#dashboard_facebook_profile .demographic").innerWidth();
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
	$("#dashboard_facebook_profile .demographic .chartBox .chart").css("height",_h);
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
$('#dashboard_facebook_profile .date-range').daterangepicker({opens: 'left',
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
var arr = new Array();
var htmlGeneral;
var total_num_married=0;
var total_num_singel=0;
var total_num_male=0;
var total_num_female=0;
var total_num_highschool=0;
var total_num_college=0;
var total_num_u20=0;
var total_num_u30=0;
var total_num_u40=0;
var total_num_u50=0;
var total_num_u60=0;
var total_num_u70=0;
var count_channel=0;
var total_friends_number=0;
var total_post_number = 0;
var total_like_number = 0;
var total_comment_number = 0;
var total_comment_like_number = 0;
var total_share_number = 0;
var total_active = 0;
var total_last_friends_number=0;
var total_last_post_number = 0;
var total_last_like_number = 0;
var total_last_comment_number = 0;
var total_last_comment_like_number = 0;
var total_last_share_number = 0;
var total_last_fans_number=0;
var count_getEngagement=0;
var count_EngagementLastFb=0;
var total_fans_number=0;
var count_get_top=0;
	var id_user;
	var date = new Date();
	var currentDate = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
	var lastDate = new Date();
	var days = 7;
	var res = date.setTime(date.getTime() - (days * 24 * 60 * 60 * 1000));		
	var lastDate = new Date(res);
	var newDate = (lastDate.getMonth() + 1) + "/" + lastDate.getDate() + "/" + lastDate.getFullYear();
	$("#dashboard_facebook_profile #dashboard_range").val(newDate +" to " + currentDate);
	
	$(document).ready(function() {
		aoFrm.mess("close","close");
		checkExprired();
		var page_id_post;
	  //if(load_summary_profile==true)
		  getChannelSummaryProfile();
	});
	
	$(".range_inputs .btn").click(function(){
		setTimeout(function(){
			clearData();
			getChannelSummaryProfile();
			//getEngagementTw(token[0],token[1],channel_detail_id);
		},100);
	});
	
	
	function statusChart(num_married,num_singel){
		num_married = Math.round(num_married/(num_married+num_singel)*100);//(/num_married+num_singel)*100;
		num_singel=100-num_married;
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
	function edudationChar(num_highschool,num_college){
		num_highschool=	Math.round(num_highschool/(num_highschool+num_college)*100);
		num_college= 100-num_highschool;
		
		info = new Highcharts.Chart({
			chart: {
				renderTo: 'education',
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
				name: 'Income',
				innerSize: '50%',
				showInLegend: true,
				data: [
					{ name: 'Hight School', y:num_highschool, color: '#62c462'},
					{ name: 'College', y: num_college, color: '#a8ca42'},
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
	                marginTop:-65 
								
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
			 $("#dashboard_facebook_profile .content_right .block_content").css("opacity","1");
			 $("#dashboard_facebook_profile .itemLoading").hide();	
	}
	

	function getTopPost(response,response_name ,total_channel){
		
		count_get_top++;
		var title;
		var string;
		
		var count = 0;
		var name = '';
		var link_post = '';
		
		
		name=response_name[0].name;
		for (var i=0;i<response.length;i++){
		   var like_num = 0;
			var comment_num = 0;
			var share_num = 0;
			var comment_like_num = 0;
			var active = 0;
				
				link_post = response[i].permalink;
					comment_num = response[i].comment_info.comment_count;
					like_num = response[i].like_info.like_count;
					share_num= response[i].share_count;
				active = parseInt(like_num) + parseInt(comment_num) + parseInt(share_num) + parseInt(comment_like_num);
				title = response[i].message;
				if (title.length > 60){
					string = title.substring(0,60) + "...";
				}else{
					string = title;
				}
				
				htmlGeneral = '<td class="story"><a href="'+link_post+'" target="_blank"><span class="name" title="'+name+'"> '+limitString(name)+' : </span><span title="'+title+'">'+string+'</span></a></td><td class="show-amount">'+active+'</td><td class="like">'+like_num+'</td><td class="share">'+share_num+'</td><td class="comment">'+comment_num+'</td><td class="comment-like">'+comment_like_num+'</td></tr>';
				arr.push({"active":active,"html":htmlGeneral});
				
			
			}
		if(count_get_top==total_channel){
			$("#dashboard_facebook_profile #block-top tbody").empty();
			$("#dashboard_facebook_profile #block-top thead").empty();
			$("#dashboard_facebook_profile #block-top thead").addClass("facebook");
			$("#dashboard_facebook_profile #block-top thead.facebook").append("<tr><td text='no'>No</td><td text='title'>Title</td><td text='reach'>Reach</td><td text='like'>Like</td><td text='share'>Share</td><td text='comment'>Comment</td><td text='commentlike'>Comment Like</td></tr>");
			aoFrm.reloadLang("#dashboard_facebook_profile #block-top thead.facebook");
			arr.sort(function(a,b){
				return b.active - a.active;
			});
			for (var i=0;i<arr.length;i++){
				
				if (i < 10){
					count++;
					var newHtml = "<tr><td>"+count+"</td>" + arr[i].html;
					$("#dashboard_facebook_profile #block-top tbody").append(newHtml);
				}
			}
		}
			
	}
    function demoGraphicProfileDashboard(channel_detail_id,access_token,total_channel,channel_user){
		  
			$("#fb_education").show();
			$("#fb_status").show();
			//$("#fb_impressionbreak").hide();
			$("#dashboard_facebook_profile .content_right .block_content").css("opacity","0.3");
			$("#dashboard_facebook_profile .itemLoading").show();
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
			var stringDate = $("#dashboard_facebook_profile #dashboard_range").val();
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
				var query = "";
				//FB.api('/'+channel_detail_id+'/friends?fields= id,gender,name,birthday,education,location,relationship_status',{since:newDateFrom,until:newDateTo,access_token:access_token}, function(response) {
	  			/*
				query = 'SELECT sex, birthday_date, education, relationship_status, uid, name from user where uid in (SELECT uid2 FROM friend WHERE uid1 = "'+channel_detail_id+'")' ;
				FB.api({method: 'fql.query',
			    query: query,access_token:access_token },function(response) {
				*/
				var query1 = "select mutual_friend_count from user where uid="+channel_detail_id;
				var query2 = 'SELECT sex, birthday_date, education, relationship_status, uid, name from user where uid in (SELECT uid2 FROM friend WHERE uid1 = "'+channel_detail_id+'")' ;
		  		FB.api({method: 'fql.multiquery',queries:{
		  			query1: query1,
		  			query2: query2
		  		},access_token:access_token
			      },function(response) {

				count_channel++;
				//if(!isNull(response.error)){
				if(!isNull(response[1].fql_result_set.error)){
					count_getEngagement++;
					 checkAccountError(response[1].fql_result_set,"facebookprofile",channel_user);
					$("#dashboard_facebook_profile .content_right .block_content").css("opacity","1");
					$("#dashboard_facebook_profile .itemLoading").hide();
				}
				else if(!isNull(response[1].fql_result_set))
					{
						var dat;
						var str;
						var currentTime = new Date();
						var year_now=currentTime.getFullYear();
						//var friends_number=response.data.length;
						var friends_number=response[0].fql_result_set[0].mutual_friend_count;
					    total_friends_number= friends_number;
			            for (var i = 0; i < response[1].fql_result_set.length; i++) {
							//dat=response.data[i].birthday;
			            	dat=response[1].fql_result_set[i].birthday_date;
							//calculate the number of males and female
								//if (response.data[i].gender=='male') total_num_male+=1;						 
								//if (response.data[i].gender=='female') total_num_female+=1;
							if (response[1].fql_result_set[i].sex=='male') total_num_male+=1;						 
							if (response[1].fql_result_set[i].sex=='female') total_num_female+=1;
							//relasionship
								//if (response.data[i].relationship_status=='Married')total_num_married+=1;
							if (response[1].fql_result_set[i].relationship_status=='Married')total_num_married+=1;
							
							//education
								//var edu=response.data[i].education;
							var edu=response[1].fql_result_set[i].education;
								
						   if (!isNull(edu)){
							   var edu_length=response[1].fql_result_set[i].education.length;
							  
							  
							   for (var j=0;j<edu_length;j++){
							   
									if (isNull(edu)) 
										num_other+=1;
									if (edu[j].type=='College'){
									total_num_college+=1;
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
									 if (age>18 && age<=24) total_num_u20+=1;
									else if (age>25 && age<=34) total_num_u30+=1;
									else if (age>35 && age<=44) total_num_u40+=1;
									else if (age>45 && age<=54) total_num_u50+=1;
									else if (age>55 && age<=64) total_num_u60+=1;
									else total_num_u70+=1;
									
								}
							}
							
						}
			            
			            getEngagementFb(channel_detail_id,friends_number,newDateFrom,newDateTo,access_token,total_channel);
			            if(count_channel==total_channel){
			            	
			  	           var num_male=Math.round(total_num_male/(total_num_male+total_num_female)*100);
			  			   total_num_highschool=total_friends_number-total_num_college;
			  			   ageChart(total_num_u20,total_num_u30, total_num_u40, total_num_u50, total_num_u60,total_num_u70);
			  			   genderChart(num_male);
			  			   edudationChar(total_num_highschool,total_num_college);
			  			   statusChart(total_num_married,total_friends_number-total_num_married);
			             }
					}
				else
					{
					 getEngagementFb(channel_detail_id,0,newDateFrom,newDateTo,access_token,total_channel);
					}
			
	           
	          
	        });
			
			
			}
			catch (ex) {
				 connectFberror();	
			}
		}
	
		function getEngagementFb(page_id_post,fans_number,newDateFrom,newDateTo,token_page,total_channel){
			$("#dashboard_facebook_profile .content_right .block-nodata").empty();
			var length = 200;
			var lastDateFrom;
			var lastDateTo;
			var day = Math.round((newDateTo - newDateFrom)/60/60/24);
			lastDateTo = newDateFrom - (24 * 60 * 60);
			lastDateFrom = lastDateTo - (day * 24 * 60 * 60);
			try{
				var query1 = 'SELECT permalink,source_id, post_id ,created_time,message,share_count,like_info,comment_info FROM stream WHERE message <> "" and source_id = "'+page_id_post+'" and created_time> '+newDateFrom+' and created_time< '+newDateTo+'  limit 0,200';
				var query2 = 'select uid, name from user where uid in ( SELECT source_id FROM stream WHERE message <> "" and source_id = "'+page_id_post+'" and created_time> '+newDateFrom+' and created_time< '+newDateTo+'  limit 0,200)' ;
		  		FB.api({method: 'fql.multiquery',queries:{
		  			query1: query1,
		  			query2: query2
		  		},access_token:token_page
			      },function(response) {
				//var query = "";
	  			//query = 'SELECT permalink,source_id, post_id ,created_time,message,share_count,like_info,comment_info FROM stream WHERE message <> "" and source_id = "'+page_id_post+'" and created_time> '+newDateFrom+' and created_time< '+newDateTo+'  limit 0,200' ;
				
	  			//FB.api({method: 'fql.query',
			       // query: query,access_token:token_page
			     // },function(response) {
			//FB.api('/'+page_id_post+'/feed?limit='+length+'&since='+newDateFrom+'&until='+newDateTo+'','get',{access_token:token_page} , function(response) {
				count_getEngagement++;
				for (var i=0;i<response[0].fql_result_set.length;i++){
						total_comment_number = total_comment_number +parseInt(response[0].fql_result_set[i].comment_info.comment_count);
						total_like_number = total_like_number + parseInt(response[0].fql_result_set[i].like_info.like_count);
						total_share_number = total_share_number +parseInt(response[0].fql_result_set[i].share_count);
				
				}
				total_fans_number =total_fans_number+parseInt(fans_number);
				
				total_post_number =total_post_number+ response[0].fql_result_set.length;
				total_active = total_like_number + total_comment_number + total_share_number;
				if(count_getEngagement==total_channel){
					 $("#dashboard_facebook_profile #like_num").text(numberWithCommas(total_like_number));
					 $("#dashboard_facebook_profile #share_num").text(numberWithCommas(total_share_number));
					 $("#dashboard_facebook_profile #comment_num").text(numberWithCommas(total_comment_number));
					 $("#dashboard_facebook_profile #reach_num").text(numberWithCommas(total_active));
					 $("#dashboard_facebook_profile #fan_num").text(numberWithCommas(total_fans_number));
				}
				
				
				getTopPost(response[0].fql_result_set,response[1].fql_result_set,total_channel);
				 
			 });
			 getEngagementLastFb(page_id_post,fans_number,newDateFrom,newDateTo,token_page,length,total_channel);
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
				
				for (var i=0;i<response.data.length;i++){
					if (!isNull(response.data[i].comments)){
						total_last_comment_number = total_last_comment_number + response.data[i].comments.data.length;
						for (var j=0;j<response.data[i].comments.data.length;j++){
							total_last_comment_like_number = total_last_comment_like_number + response.data[i].comments.data[j].like_count;
						}
						
					}
					if (!isNull(response.data[i].likes)){
						total_last_like_number = total_last_like_number + response.data[i].likes.data.length;
					}
					if (!isNull(response.data[i].shares)){
						total_last_share_number = total_last_share_number + response.data[i].shares.count;
					}
				}
				count_EngagementLastFb++;
				total_last_post_number =total_last_post_number+ response.data.length;
				total_last_active = total_last_like_number + total_last_comment_number + total_last_share_number + total_last_comment_like_number;
				total_last_fans_number=total_last_fans_number+fans_number;
				
				
				
				 
			 });
			if(count_EngagementLastFb=total_channel){
				var percent_comment=0;
				var percent_share=0;
				var percent_like=0;
				var percent_active=0;
				var percent_fans=0;
				if (total_comment_number == total_last_comment_number){
					percent_comment = 0;
					growth_of_percent(percent_comment,"comment");
				}else{
					if(total_comment_number>0)
					percent_comment = Math.floor(((total_comment_number - total_last_comment_number)/(total_comment_number))*100);
					growth_of_percent(percent_comment,"comment");
				}
				if (total_share_number == total_last_share_number){
					percent_share = 0;
					growth_of_percent(percent_share,"share");
				}else{
					if(total_share_number>0)
					percent_share = Math.floor(((total_share_number - total_last_share_number)/(total_share_number))*100);
					growth_of_percent(percent_share,"share");
				}
				if (total_like_number == total_last_like_number){
					percent_like = 0;
					growth_of_percent(percent_like,"like");
				}else{
					if(total_like_number>0)
					percent_like = Math.floor(((total_like_number - total_last_like_number)/(total_like_number))*100);
					growth_of_percent(percent_like,"like");
				}
				if (total_active == total_last_active){
					percent_active = 0;
					growth_of_percent(percent_active,"active");
				}else{
					if(total_active>0)
					percent_active = Math.floor(((total_active - total_last_active)/(total_active))*100);
					growth_of_percent(percent_active,"active");
				}
				if (total_fans_number == total_last_fans_number){
					percent_fans = 0;
					growth_of_percent(percent_fans,"fan");
				}else{
					if(total_fans_number>0)
					percent_fans = Math.floor(((total_fans_number - total_last_fans_number)/(total_fans_number))*100);
					growth_of_percent(percent_fans,"fan");
				}
				
			  
			}
			}
			catch (ex) {
				// connectFberror();			
			}
			
		}
		function growth_of_percent(value,type){
			if(type=="comment"){
				if(value>0){
					$("#growth_comment_cl").removeClass("red");
					$("#growth_comment_cl").addClass("blue");
					
				}
				else if( value<0){
					value=(-1)*value;//<i class="icon-caret-down"></i>
					$("#growth_comment_cl").removeClass("blue");
					$("#growth_comment_cl").addClass("red");
					$("#growth_comment_cl i").removeClass("icon-caret-up");
					$("#growth_comment_cl i").addClass("icon-caret-down"); 
					
				}
				else
					{
					$("#growth_comment_cl i").removeClass("icon-caret-down");
					$("#growth_comment_cl i").removeClass("icon-caret-up");				
					}
				$("#dashboard_facebook_profile #growth_comment_num").text(value+"%");
			}
			else if(type=="share")
				{
				if(value>0){
					$("#growth_share_cl").removeClass("red");
					$("#growth_share_cl").addClass("blue");
					
				}
				else if( value<0){
					value=(-1)*value;//<i class="icon-caret-down"></i>
					$("#growth_share_cl").removeClass("blue");
					$("#growth_share_cl").addClass("red");
					$("#growth_share_cl i").removeClass("icon-caret-up");
					$("#growth_share_cl i").addClass("icon-caret-down");
					 
					
				}
				else
					{
					$("#growth_share_cl i").removeClass("icon-caret-down");
					$("#growth_share_cl i").removeClass("icon-caret-up");	
					}
				$("#dashboard_facebook_profile #growth_share_num").text(value+"%");
				}
			else if(type=="like")
				{
				if(value>0){
					$("#growth_like_cl").removeClass("red");
					$("#growth_like_cl").addClass("blue");
					
				}
				else if( value<0){
					value=(-1)*value;//<i class="icon-caret-down"></i>
					$("#growth_like_cl").removeClass("blue");
					$("#growth_like_cl").addClass("red");
					$("#growth_like_cl i").removeClass("icon-caret-up");
					$("#growth_like_cl i").addClass("icon-caret-down");
					
					
				}
				else
					{
					$("#growth_like_cl i").removeClass("icon-caret-down");
					$("#growth_like_cl i").removeClass("icon-caret-up");
					}
				$("#dashboard_facebook_profile #growth_like_num").text(value+"%");
				}
			else if(type=="active"){
				if(value>0){
					$("#growth_reach_cl").removeClass("red");
					$("#growth_reach_cl").addClass("blue");
				
				}
				else if( value<0){
					value=(-1)*value;//<i class="icon-caret-down"></i>
					$("#growth_reach_cl").removeClass("blue");
					$("#growth_reach_cl").addClass("red");
					$("#growth_reach_cl i").removeClass("icon-caret-up");
					$("#growth_reach_cl i").addClass("icon-caret-down");
					
					
				}
				else
					{
					$("#growth_reach_cl i").removeClass("icon-caret-down");
					$("#growth_reach_cl i").removeClass("icon-caret-up");
					}
				$("#dashboard_facebook_profile #growth_reach_num").text(value+"%");
			}
			else
				{
				if(value>0){
					$("#growth_fan_cl").removeClass("red");
					$("#growth_fan_cl").addClass("blue");
					
				}
				else if( value<0){
					value=(-1)*value;//<i class="icon-caret-down"></i>
					$("#growth_fan_cl").removeClass("blue");
					$("#growth_fan_cl").addClass("red");
					$("#growth_fan_cl i").removeClass("icon-caret-up");
					$("#growth_fan_cl i").addClass("icon-caret-down");
					
					
				}
				else
					{
					$("#growth_fan_cl i").removeClass("icon-caret-down");
					$("#growth_fan_cl i").removeClass("icon-caret-up");
					}
				$("#dashboard_facebook_profile #growth_fan_num").text(value+"%");
				}
			
			  
				 
		}

	function clearData(){
		total_friends_number=0;
		total_post_number = 0;
		total_like_number = 0;
		total_comment_number = 0;
		total_comment_like_number = 0;
		total_share_number = 0;
		total_active = 0;
		total_last_friends_number=0;
		total_last_post_number = 0;
		total_last_like_number = 0;
		total_last_comment_number = 0;
		total_last_comment_like_number = 0;
		total_last_share_number = 0;
		total_last_fans_number=0;
		count_getEngagement=0;
		count_EngagementLastFb=0;
		total_fans_number=0;
		count_channel=0;
		count_getEngagement=0;
		count_EngagementLastFb=0;
		htmlGeneral="";
		arr=[];
		//$("#growth_reach_cl").remove("i")
    	}	
	function getChannelSummaryProfile(){
		try{
		//load_summary_profile=true;
		var dataString=[];
		 dataString.push({
             name: "channel_id", 
             value: 1
         });
		$.ajax({ 
			  url : 'GetChannelDetail.do',
			  dataType: 'json',
			  data: dataString,
			  success : function(source) {
				  $("#list-facebook").empty();
				  var current_date = formatDateCurrent();
				  current_date = current_date + " 00:00:00";
					for(var i=0; i<source.length;i++){
							demoGraphicProfileDashboard(source[i].channel_detail_id,source[i].token_user,source.length,source[i].channel_user);
					}
					checkEmptyChannel("#box_channel_profile");
				}
				
		  });
		}
		catch(ex){
			
		}
	}
	
		
		