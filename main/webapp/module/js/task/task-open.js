
$( document ).ready(function() {
	checkExprired();
	getTaskList(0,0,1);
	
	$("#content_list_tasks .box-content a").click(function(){
		
		$("#content_list_tasks .box-content").find("a").removeClass("active")
		$(this).addClass("active");
		var tracker= $(this).attr("tracker");
		getTaskList(tracker,0,1);
		
	});
});
function getTaskList(tracker,status,type){
	var icon_tracker="";
	if(tracker=="0")
		{
		icon_tracker="icon-pushpin";
		}
	else if(tracker=="1")
		{
		icon_tracker="icon-bullhorn";
		}
	else
		{
		icon_tracker="icon-phone-sign";
		}
	$("#show_task_open").empty();
	var newData = [];
	newData.push({
        name: "tracker", 
        value: tracker
    });
	newData.push({
        name: "status", 
        value: status
    });
	newData.push({
        name: "type", 
        value: type
    });
	newData.push({
        name: "Action", 
        value: "gettask"
    });    
	 $.ajax({
		 type:"GET",
		  url : 'TaskPerson.do',
		  dataType: 'json',
		  data:newData,
		  success : function(data) {
			  var list_task_id="";
			  $("#content_list_tasks .nodata").remove(); 
				 if(data.length==0)
						  $("#content_list_tasks").append('<div class="nodata span4"><h4 text="notask">No Task</h4><p text="pleasecreatetask">Please Create a Task.</p></div>');
				for ( var i = 0; i < data.length; i++) {
					
					  var htmlGeneral="";
					  list_task_id=list_task_id+","+data[i].task_id;
					  htmlGeneral='<div id="'+data[i].task_id+'" tracker="'+tracker+'" profile_name="'+data[i].profile_name+'" priority="'+data[i].priority+'" status="'+data[i].status+'" class="task_open task_priority clearfix">'
					               +'<div id="task_priority" class=""></div>' 
						           +' <div class="task_box task_icon"><i class="'+icon_tracker+'"></i></div>'
						           +' <div class="task_assisgn" ><span id="task_assign" >Ngo Van Tu</span><p class="assign" id="task_history"><span style="margin-right:5px" ></span></p></div>'
						           +' <div class="task_content"><p class="image_avatar"><img id="avatar_'+data[i].task_id+'" class="avatar-small" src="'+data[i].task_avatar+'"><i class="icon-facebook-sign"></i></i></p><div class="content"><span id="content_task">'+data[i].task_name+'</span><p id="create_at" class="date">'+data[i].create_at+'</p></div></div>'
						           +' </div> ';
					  $("#show_task_open").append(htmlGeneral);
					  var priority = data[i].priority;
					  if(priority==1){
						  $("#show_task_open #"+data[i].task_id).addClass("priority");
					  }
					  $("#"+data[i].task_id).click(function(){
						  	aoFrm.reloadLang("#edit_task_from_task");
							var task_id=$(this).attr("id");
							var avatar_task=$("#avatar_"+task_id).attr("src");
							var task_name=$("#"+task_id+ " #content_task").html();
							var create_at=$("#"+task_id+ " #create_at").html();
							var tracker=$(this).attr("tracker");
							var name=$(this).attr("profile_name");
							var priority=$(this).attr("priority");
							var status=$(this).attr("status");
							appendEditTask(tracker,task_id,task_name,avatar_task,create_at,name,priority,status)
							
						});
				}
				getComentLimit1(list_task_id,"show_task_open");
		  }
	 });
	
}
