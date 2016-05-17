<%@ page language="java" contentType="application/json; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.text.*"%>
<%@ page import="java.util.*"%>
<%@page import="org.json.*"%>
<%@ page import="org.springframework.context.ApplicationContext" %>
<%@ page import="org.springframework.context.support.ClassPathXmlApplicationContext" %>
<%@ page import="com.andwise.task.dao.TaskDao" %>
<%@ page import="com.andwise.task.model.Task" %>
<%@ page import="com.andwise.common.*" %>
<%@include file="../../module/view/common/Permission.jsp"%>
<%
String  task_id="",message="",avatar_task="",gmt="",create_date="",action="",profile_name="",message_comment="";
int type_task=0,priority=0,type_social=0,status=0;
long l_create_date=0,l_time_post=0;
String creator="";
String assign_user="",remove_assign_user="",name_assign="", email_assign="", list_assign_user="", list_email_assign="",list_name_assign="",list_remove_assign_user="";
if(session.getAttribute("SessionGmt")!=null){
	gmt=(String)session.getAttribute("SessionGmt");
}

if(session.getAttribute("SessionFirstName")!=null&& session.getAttribute("SessionLastName")!=null){
	creator= (String)session.getAttribute("SessionFirstName")+" "+(String)session.getAttribute("SessionLastName");
}
if(request.getParameter("task_id")!=null){
	task_id=request.getParameter("task_id");
}
if(request.getParameter("message")!=null){
	message=request.getParameter("message");
}
if(request.getParameter("message_comment")!=null){
	message_comment=request.getParameter("message_comment");
}
if(request.getParameter("avatar_task")!=null){
	avatar_task=request.getParameter("avatar_task");
}
if(request.getParameter("name")!=null){
	profile_name=request.getParameter("name");
}
if(request.getParameter("create_date")!=null){
	create_date=request.getParameter("create_date");
}
if(request.getParameter("profile_name")!=null){
	profile_name=request.getParameter("profile_name");
}
if(request.getParameter("type_task")!=null){
	type_task=Integer.parseInt(request.getParameter("type_task"));
}
if(request.getParameter("status")!=null){
	status=Integer.parseInt(request.getParameter("status"));
}
if(request.getParameter("type_social")!=null){
	type_social=Integer.parseInt(request.getParameter("type_social"));
}
if(request.getParameter("priority")!=null){
	priority=Integer.parseInt(request.getParameter("priority"));
}
if(request.getParameter("time_post")!=null){
	l_time_post=Long.parseLong(request.getParameter("time_post"));
}
if(request.getParameter("Action")!=null){
	action=request.getParameter("Action");
}
if(request.getParameter("array_member_assign")!=null){
	assign_user=request.getParameter("array_member_assign");
}
if(request.getParameter("array_email_assign")!=null){
	email_assign=request.getParameter("array_email_assign");
	
}
if(request.getParameter("array_name_assign")!=null){
	name_assign=request.getParameter("array_name_assign");
}
if(request.getParameter("array_remove_assign")!=null){
	remove_assign_user=request.getParameter("array_remove_assign");
	
}
//array_name_assign
String str_assign_user[]=assign_user.replace("'","").split(",");
//remove_assign_user
String str_email_assign[]=email_assign.replace("'","").split(",");
String str_remove_assign_user[]=remove_assign_user.replace("'","").split(",");
String str_name_assign[]=name_assign.replace("'","").split(",");
for(int i=0; i<str_assign_user.length;i++){
	list_assign_user+=str_assign_user[i]+",";
	list_email_assign+=str_email_assign[i]+",";
	list_name_assign+=str_name_assign[i]+",";
}
for(int j=0; j<str_remove_assign_user.length;j++){
	list_remove_assign_user+=str_remove_assign_user[j]+",";
}
try{
	if(action.equals("savetask")){
		DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		formatter.setTimeZone(TimeZone.getTimeZone(gmt));
		Date datetime = (Date)formatter.parse(create_date);
		l_create_date = datetime.getTime();
		 ApplicationContext appContext =  ApplicationContextProvider.getGlobalContext(this.getServletContext());
		 TaskDao taskDAO=(TaskDao)appContext.getBean("taskDAO");
		 String task_history="Assigned to key_list_member by key_user";
		int return_id = taskDAO.saveTask(task_id,message,profile_name,user_id,l_create_date,l_time_post,avatar_task,type_social,0,priority,type_task,message_comment,list_assign_user,task_history);
	    if(return_id==1){
	    	 JSONObject objSend = new JSONObject();
	    	 objSend.put("task_id",task_id);
	    	 objSend.put("task_name",message);
	    	 objSend.put("creator",creator);
	    	 objSend.put("list_email_assign",email_assign);
	    	 objSend.put("list_name_assign",list_name_assign);
	    	 objSend.put("list_assign_user_id",assign_user);
	    	 objSend.put("list_email_send",email_assign);
	    	 //assign_user
	    	 objSend.put("title_content_email","Task Assignment On Enpick Social");
	    	// objSend.put("history_task",creator + "has been assigned "+list_name_assign+" the following task");
	    	// objSend.put()
	    	new Messages(this.getServletContext()).processSendTask(user_id,objSend.toString());
	    }
		out.print(return_id);
	}
	else if(action.equals("updatetask"))
	{
		DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		formatter.setTimeZone(TimeZone.getTimeZone(gmt));
		Date datetime = (Date)formatter.parse(create_date);
		l_create_date = datetime.getTime();
		 ApplicationContext appContext =  ApplicationContextProvider.getGlobalContext(this.getServletContext());
		 TaskDao taskDAO=(TaskDao)appContext.getBean("taskDAO");
		 String task_history="Assigned to key_list_member by key_user";
		 ArrayList<Task> obj_content = taskDAO.updateTask(message_comment,l_create_date,task_id,user_id,status,priority,type_task,list_assign_user,list_remove_assign_user,list_email_assign,list_name_assign);
		 JSONArray jsonArray = new JSONArray();
		 int comment_id=0;
		 String title_content="";
			for (int i = 0; i < obj_content.size() ; i++) {
				Task listtask = obj_content.get(i);
				comment_id=listtask.getComment_id();
				JSONObject objSend = new JSONObject();
				 objSend.put("task_id",task_id);
		    	 objSend.put("task_name",message);
		    	 objSend.put("creator",creator);
		    	 objSend.put("list_email_send",email_assign);
		    	 objSend.put("task_history",listtask.getTask_history());
		    	 if(listtask.getList_email()!=null){
		    		 objSend.put("list_email_assign",listtask.getList_email());
		    		 title_content= "Task Assignment On Enpick Social";
		    	 }
		    	 else{
		    		 objSend.put("list_email_assign","");
		    		 title_content="Task Update on Enpick social";
		    	 }
		    	 if(listtask.getList_user()!=null){
		    		 objSend.put("list_assign_user_id",listtask.getList_user_id());
		    	 }
		    	 else
		    	 {
		    		 objSend.put("list_assign_user_id","");
		    	 }
		    	if(listtask.getList_user()!=null){
		    		objSend.put("list_name_assign",listtask.getList_user());
		    	}
		    	else
		    	{
		    		objSend.put("list_name_assign","");
		    	}
		    	 objSend.put("title_content_email",title_content);
		    	 if(comment_id>0){
		    		 new Messages(this.getServletContext()).processSendTask(user_id,objSend.toString());	 
		    	 }
		    	 
				}
			
			 
		 
		 out.print(comment_id);
	}
	
}
catch(Exception e){
	out.print(e);
}
%>