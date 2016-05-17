$('#overview .date-range').daterangepicker({opens: 'right',
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

$("#servicesstart_date span").click(function(){
	$("#datepick_start").show();
	$("#datepick_start").datepick({
		dateFormat : 'yy-mm-dd',
		onSelect : function(dateText, inst) { /* do some thing */
			var _txtDate = "";
			for(var i=0;i<dateText.length;i++)
			{
				var _txt1 = dateText[i].getUTCFullYear() + "-" + (dateText[i].getUTCMonth() + 1) + "-" + dateText[i].getUTCDate();
				_txtDate+= _txt1;
			}
			$("#servicesstart").val(_txtDate);
			$("#datepick_start").hide();
		}
	});
});

$("#btnreset").click(function(){
	 var user_id=$(this).attr("user_id");
	  
	updatePerson(user_id);
});

$("#servicesend_date span").click(function(){
	$("#datepick_end").show();
	$("#datepick_end").datepick({
		dateFormat : 'yy-mm-dd',
		onSelect : function(dateText, inst) { /* do some thing */
			var _txtDate = "";
			for(var i=0;i<dateText.length;i++)
			{
				var _txt1 = dateText[i].getUTCFullYear() + "-" + (dateText[i].getUTCMonth() + 1) + "-" + dateText[i].getUTCDate();
				_txtDate+= _txt1;
			}
			$("#servicesend").val(_txtDate);
			$("#datepick_end").hide();
		}
	});
});


var date = new Date();
var currentDate = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
var lastDate = new Date();
var days = 7;
var res = date.setTime(date.getTime() - (days * 24 * 60 * 60 * 1000));		
var lastDate = new Date(res);
var newDate = (lastDate.getMonth() + 1) + "/" + lastDate.getDate() + "/" + lastDate.getFullYear();
var draft=0;
var scheduled=0;
var sent=0;
var all=0;
$("#overview #dashboard_range").val(newDate +" to " + currentDate);
var array_content_type= new Array();
var obj_content_overview_export= new Object();
$(document).ready(function() {
	obj_content_overview_export.title_content={channel:"",name:"Name",draft:"Draft",scheduled:"Scheduled",sent:"Sent", all:"All"};
	obj_content_overview_export.title_connect_channel={no:"No",channel:"Channel",name:"Name",create_date:"Create Date"};
	obj_content_overview_export.title_user_group={no:"No",division:"Division",name:"Name",email:"Email",create_date:"Create Date"};
	obj_content_overview_export.title_content_all={all:"All Member",all_value:0+" (0%)",draft:"Draft", draft_value:0+" ("+0+"%)",scheduled:"Scheduled",scheduled_value:0+" ("+0+"%)",sent:"Sent",sent_value:0+" ("+0+"%)" };
	$(".range_inputs .btn").click(function(){
		setTimeout(function(){
			 draft=0;
			scheduled=0;
			 sent=0;
			 all=0;
			var id=$("#overview_tab").attr("user_id");
			getNumberContent(id);
		},100);
	});
	
	var id=$("#overview_tab").attr("user_id");
	var team_id=$("#overview_tab").attr("team_id");
	getTeamMember(team_id);
	getChannelUser(id);
	getNumberContent(id);
	getInforUser(id);
	contentNumberAll(id);
	
	$("#datepick_start").mouseleave(function(){
		$(this).hide();
	});
	$("#datepick_end").mouseleave(function(){
		$(this).hide();
	});
});
function getChannelUser(user_id){
	var grid_width = $(".block-connect-channel").innerWidth();
	var grid = jQuery("#connect_channel_jqgrid");
	var stringDate = $("#overview #dashboard_range").val();
	var newString = stringDate.split("to");
	var stringFrom = formatDate(newString[0]);
	var stringTo = formatDate(newString[1]);
	grid.jqGrid({
		url:'../AdminMemberOverview.do?Action=channel&user_id='+user_id,           
		datatype: "json",
	    mtype: "POST",  
		height: 200,
		rowNum:200,
		colNames:['Id','No','Channel','Name','Create Date', 'Analysis', 'Delete'],
		width: grid_width,
		colModel: [
		           {
			name: 'id',
			index: 'id',
			hidden:true,
			key:true,
			resizable:false,
			fixed:true,
			width: 1
		},{
			name: 'no',
			index: 'no',
			sortable: false,
			width: 20,
			editable: false
		},
		{
			name: 'channel',
			index: 'channel',
			sortable: false,
			width: 150
		},
		
		{
			name: 'channel_user',
			index: 'channel_user',
			sortable: false,
			editable: false,
			width: 150
		},
		{
			name: 'create_date',
			index: 'create_date',
			width: 100
		},
		{
			name: 'analysis',
			index: 'analysis',
			sortable: false,
			editable: false,
			width: 150
		},
		{
			name: 'delete',
			index: 'delete',
			width: 100
		}
		],
		rowNum:10,
		rowList:[10,20,40],
		sortname: 'no',
		viewrecords: true,
		sortorder: "desc",
		//pager: '#padtable',
		
		loadComplete: function() {
			var rowData = grid.jqGrid("getRowData");
			obj_content_overview_export.content_connect_channel=rowData;
		},
		onSelectRow: function(id) {

		}
		});
	
}
function getTeamMember(team_id){
	
	var grid_width = $(".block-user-group").innerWidth();
	var grid = jQuery("#user_group_jqgrid");
	var stringDate = $("#overview #dashboard_range").val();
	var newString = stringDate.split("to");
	var stringFrom = formatDate(newString[0]);
	var stringTo = formatDate(newString[1]);
	grid.jqGrid({
		url:'../AdminMemberOverview.do?Action=group&team_id='+team_id,           
		datatype: "json",
	    mtype: "POST",  
		height: 200,
		rowNum:200,
		colNames:['id','No','Division','Name','Email', 'Create Date','Edit', 'Delete'],
		width: grid_width,
		colModel: [
		             {
			name: 'id',
			index: 'id',
			hidden:true,
			key:true,
			resizable:false,
			fixed:true,
			width: 1
		},{
			name: 'no',
			index: 'no',
			sortable: false,
			width: 20,
			editable: false
		},
		{
			name: 'division',
			index: 'division',
			sortable: false,
			width: 150
		},
		
		{
			name: 'name',
			index: 'name',
			sortable: false,
			editable: false,
			width: 150
		},
		{
			name: 'email',
			index: 'email',
			sortable: false,
			editable: false,
			width: 150
		},
		{
			name: 'create_date',
			index: 'create_date',
			width: 100
		},
		{
			name: 'edit',
			index: 'edit',
			sortable: false,
			editable: false,
			width: 150
		},
		{
			name: 'delete',
			index: 'delete',
			width: 100
		}
		],
		rowNum:10,
		rowList:[10,20,40],
		sortname: 'no',
		viewrecords: true,
		sortorder: "desc",
		//pager: '#padtable',
		
		loadComplete: function() {
			var rowData = grid.jqGrid("getRowData");
			obj_content_overview_export.content_user_group=rowData;
		},
		onSelectRow: function(id) {
		}
		});
	
	
	
}
function contentNumberAll(user_id){
	//array_content_type=[];
	var sent_all=0;
	var draft_all=0;
	var scheduled_all=0;
	var all_all=0;
	
	var stringDate = $("#overview #dashboard_range").val();
	var newString = stringDate.split("to");
	var stringFrom = formatDate(newString[0]);
	var stringTo = formatDate(newString[1]);
	var dataString =[];
		 dataString.push({
    name: "user_id", 
    value: user_id
});

dataString.push({
    name: "Action", 
    value: "contentall"
});    
	$.ajax({
		 type:'POST',
		  url : '../AdminMemberOverview.do',
		  dataType: 'json',
		  data: dataString,
		  success : function(source) {
			  var percent_draft=0;
			  var percent_sent=0;
			  var percent_scheduled =0;
			  for(var i=0; i<source.length;i++){
				  if(source[i].type=="Draft"){
					  draft_all =draft_all+ parseInt(source[i].number); 
				  }
				  if(source[i].type=="Sent"){
					  sent_all =sent_all+ parseInt(source[i].number); 
				  }
				  if(source[i].type=="Scheduled"){
					  scheduled_all =scheduled_all+ parseInt(source[i].number); 
				  }
			  }
			  all_all = parseInt(draft_all)+parseInt(sent_all)+parseInt(scheduled_all);
			  if(all_all>0){
				  percent_draft = roundNumber((draft_all/all_all)*100,2);
					percent_sent = roundNumber((sent_all/all_all)*100,2);
					percent_scheduled = roundNumber((scheduled_all/all_all)*100,2); 
			  }
				
				$("#all_member").html(all_all+" (100%)");
				$("#percent_draft").html(draft_all+" ("+percent_draft+"%)");
				$("#percent_schedule").html(scheduled_all+" ("+percent_scheduled+"%)");
				$("#percent_sent").html(sent_all+" ("+percent_sent+"%)");
		  }
	
	   
	});
}
function getNumberContent(user_id){
	array_content_type=[];
	var stringDate = $("#overview #dashboard_range").val();
	var newString = stringDate.split("to");
	var stringFrom = formatDate(newString[0]);
	var stringTo = formatDate(newString[1]);
	var dataString =[];
		 dataString.push({
    name: "user_id", 
    value: user_id
});
dataString.push({
    name: "datefrom", 
    value: stringFrom
});
dataString.push({
    name: "dateto", 
    value: stringTo
});
dataString.push({
    name: "Action", 
    value: "content"
});    
	$.ajax({
		 type:'POST',
		  url : '../AdminMemberOverview.do',
		  dataType: 'json',
		  data: dataString,
		  success : function(source) {
			  if(source.length>0){
				 // obj_content={"name":"","draft":0,"scheduled":0,"sent":0,"all":0,"channel":"","channel_detail_id":""};
				  var obj_content = new Object();
				  for(var i=0; i<source.length; i++){
					 var obj_new = new Object();
					  this.channel_detail_id = source[i].channel_detail_id;
						var channel_detail_id=this['channel_detail_id'];
					
						
						obj_new.name=source[i].name;
						obj_new.channel_detail_id= source[i].channel_detail_id;
					  if(source[i].type=="Draft"){
						  obj_new.draft=source[i].number;
						  obj_new.scheduled=0;
						  obj_new.sent=0;
						  obj_new.all=source[i].number;
						  draft =parseInt(draft)+parseInt(source[i].number);
					  }
					  else if(source[i].type=="Scheduled"){
						  obj_new.draft=0;
						  obj_new.scheduled=source[i].number;
						  obj_new.sent=0;
						  obj_new.all=source[i].number;
						  scheduled= parseInt(scheduled)+parseInt(source[i].number);
					  }
					  else if(source[i].type=="Sent"){
						  obj_new.draft=0;
						  obj_new.scheduled=0;
						  obj_new.sent=source[i].number;
						  obj_new.all=source[i].number; 
						  sent= parseInt(sent)+parseInt(source[i].number);
					  }
					  
					  obj_new.channel= source[i].channel;
					 
					  if(isNull(obj_content[channel_detail_id])){
						 
						  obj_content[channel_detail_id]= obj_new;
					  }
					  else
						  {

						  obj_content[channel_detail_id].draft=obj_content[channel_detail_id].draft+ obj_new.draft;
						  obj_content[channel_detail_id].scheduled=obj_content[channel_detail_id].scheduled+ obj_new.scheduled;
						  obj_content[channel_detail_id].sent=obj_content[channel_detail_id].sent+ obj_new.sent;
						  obj_content[channel_detail_id].all=obj_content[channel_detail_id].all+ obj_new.all;
						  }
					  //array_content_type.push(obj_content);
				  }
				  array_content_type= converValueObjectToArray(obj_content);
				  appendContentNumber(array_content_type);
					//alert(JSON.stringify(array_content_type))			
				
			  }
			  else
				  {
				  obj_content_overview_export.content_summary=source;
				  }
		  }
	});
}
function appendContentNumber(sourceData){
	all = parseInt(draft)+parseInt(scheduled)+parseInt(sent);
	var percent_draft = roundNumber((draft/all)*100,2);
	var percent_sent = roundNumber((sent/all)*100,2);
	var percent_scheduled = roundNumber((scheduled/all)*100,2);
	$("#all_member_filter").html(all+" (100%)");
	$("#percent_draft_filter").html(draft+" ("+percent_draft+"%)");
	$("#percent_schedule_filter").html(scheduled+" ("+percent_scheduled+"%)");
	$("#percent_sent_filter").html(sent+" ("+percent_sent+"%)");
	obj_content_overview_export.title_content_all={all:"All Member",all_value:all+" (100%)",draft:"Draft", draft_value:draft+" ("+percent_draft+"%)",scheduled:"Scheduled",scheduled_value:scheduled+" ("+percent_scheduled+"%)",sent:"Sent",sent_value:sent+" ("+percent_sent+"%)" };
	var grid_width = $(".block-user-group").innerWidth();
	var grid = jQuery("#channel_count_content_jqgrid");
	var stringDate = $("#overview #dashboard_range").val();
	var newString = stringDate.split("to");
	var stringFrom = formatDate(newString[0]);
	var stringTo = formatDate(newString[1]);
	grid.jqGrid({
		//url:'../AdminMemberOverview.do?Action=group&team_id='+team_id,           
		datatype: "local",
	    mtype: "POST",  
		height: 200,
		rowNum:200,
		colNames:['','Name','Draft', 'Scheduled','Sent', 'All'],
		width: grid_width,
		colModel: [{
			name: 'channel',
			index: 'channel',
			sortable: false,
			width: 200,
			editable: false
		},
		{
			name: 'name',
			index: 'name',
			sortable: false,
			width: 150
		},
		
		{
			name: 'draft',
			index: 'draft',
			sortable: false,
			editable: false,
			width: 150
		},
		{
			name: 'scheduled',
			index: 'scheduled',
			sortable: false,
			editable: false,
			width: 150
		},
		{
			name: 'sent',
			index: 'sent',
			width: 100
		},
		{
			name: 'all',
			index: 'all',
			sortable: false,
			editable: false,
			width: 150
		}
		
		],
		rowNum:10,
		rowList:[10,20,40],
		sortname: 'name',
		viewrecords: true,
		sortorder: "desc",
		//pager: '#padtable',
		
		loadComplete: function() {
			
			
			
		},
		onSelectRow: function(id) {
			
		}
		});
	grid.clearGridData();
	obj_content_overview_export.content_summary=sourceData;
	grid.jqGrid('setGridParam', {data: sourceData}).trigger('reloadGrid');
}
function getInforUser(user_id){
	var dataString =[];
		 dataString.push({
    name: "user_id", 
    value: user_id
});
dataString.push({
    name: "Action", 
    value: "infor"
});    
	$.ajax({
		 type:'POST',
		  url : '../AdminMemberOverview.do',
		  dataType: 'json',
		  data: dataString,
		  success : function(source) {
			  for(var i=0; i<source.length;i++){
				  $("#create_date").html(source[i].create_date);
				  $("#name").html(source[i].name);
				  $("#cellphone").html(source[i].cell_phone);
				  if(!isNull(industry[source[i].industry])){
					  source[i].industry = industry[source[i].industry];
					}
				  $("#industry").html(source[i].industry);
				  $("#address_company").html(source[i].company_address);
				  $("#email").html(source[i].email);
				  $("#website").html(source[i].company_website);
				  $("#company").html(source[i].company_name);
				  
			  }
			 //alert(JSON.stringify(source));
		  }
	});
	
}
function deleteChannel(user_id, channel_detail_id){
	var dataString =[];
	 dataString.push({
	name: "user_id", 
	value: user_id
	});
	 dataString.push({
	 name: "channel_detail_id", 
	 value: channel_detail_id
	});
	dataString.push({
	name: "Action", 
	value: "delchannel"
	});    
$.ajax({
	 type:'POST',
	  url : '../AdminDeleteOverview.do',
	  dataType: 'text',
	  data: dataString,
	  success : function(source) {
		  if(source.trim()=="ok")
		  $('#connect_channel_jqgrid').jqGrid('delRowData',channel_detail_id);
	  }
});
	
}
function deleteUser(user_id){
	var dataString =[];
	 dataString.push({
	name: "user_id", 
	value: user_id
	});
	
	dataString.push({
	name: "Action", 
	value: "deluser"
	});    
$.ajax({
	 type:'POST',
	  url : '../AdminDeleteOverview.do',
	  dataType: 'text',
	  data: dataString,
	  success : function(source) {
		  if(source.trim()=="ok")
		  $('#user_group_jqgrid').jqGrid('delRowData',user_id);
	  }
});
	
}

function analysisOverview(channel_detail_id, type, pchannel_detail_id){
	
	$("#tab-analysis").click();
		
} 
function editUserOverview(user_id){
	var dataString =[];
	 dataString.push({
	name: "user_id", 
	value: user_id
	});
	   
$.ajax({
	 type:'POST',
	  url : '../AdminMemberOverview.do',
	  dataType: 'json',
	  data: dataString,
	  success : function(source) {
	
		 	$("#btnreset").attr("user_id",user_id);
			  $("#namereset").val(source[0].name);
			  $("#emailreset").val(source[0].email);
			  $("#companyreset").val(source[0].company_name);
			  $("#servicesstart").val(source[0].date_start);
			  $("#servicesend").val(source[0].date_expired);
			 
			 
		  
	  }
});
		
}
function exportCsvMemberOverview(){
	var str = ''+''+JSON.stringify(obj_content_overview_export)+''+'';

	$("#exportContent").val(str);
	$("#exportForm").submit();
}

function updatePerson(user_id){
	
	/*var parent = "#persional";
	//$(parent + " #form-persional").parsley('validate');
	
    if(!$(parent + " #form-persional").parsley('isValid')) { 	    	
       $(parent + " .alert-error").removeClass("hide");
       $(parent + " .alert-success").addClass("hide");
       return false;
    }*/
   
    var company_name = $("#companyreset").val();
    var date_start =   $("#servicesstart").val();
    var date_expired =  $("#servicesend").val();
    var list = [];
	list.push({
		name: "user_id",
		value: user_id
	});
	list.push({
		name: "company_name",
		value: company_name
	});

	list.push({
		name: "date_expired",
		value: date_expired
	});
	list.push({
		name: "Action",
		value: "updateperson"
	});
	//updateperson
	$.ajax({
		 type:'POST',
		  url : '../AdminEditMemberOverview.do',
		  dataType: 'text',
		  data: list,
		  success : function(source) {
			  if (source.trim()!="0"){
				//  $(parent + " .alert-error").addClass("hide");
				  aoFrm.mess("mess",mess.user_update);
				  $("#idcancel").click();
			  }
		  }
	
	});
}