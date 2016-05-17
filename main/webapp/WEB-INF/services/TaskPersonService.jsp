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
String gmt="",action="";
int tracker=0,status=0,type=0;
String task_id="";
String creator="";
if(session.getAttribute("SessionGmt")!=null){
	gmt=(String)session.getAttribute("SessionGmt");
}
if(request.getParameter("tracker")!=null){
	tracker= Integer.parseInt(request.getParameter("tracker"));
}
if(request.getParameter("status")!=null){
	status= Integer.parseInt(request.getParameter("status"));
}
if(request.getParameter("type")!=null){
	type= Integer.parseInt(request.getParameter("type"));
}
if(request.getParameter("Action")!=null){
	action=request.getParameter("Action");
}
if(request.getParameter("task_id")!=null){
	task_id=request.getParameter("task_id");
}


try{
	JSONArray jsonReturn = new JSONArray();
	 DateFormat formatter = new SimpleDateFormat("E  MMM dd, yyyy 'at' hh:mm a");
	 ApplicationContext appContext =  ApplicationContextProvider.getGlobalContext(this.getServletContext());
	 TaskDao taskDAO=(TaskDao)appContext.getBean("taskDAO");
	if(action.equals("gettask")){
		
		formatter.setTimeZone(TimeZone.getTimeZone(gmt));
		
		
		 ArrayList<Task> listArr=taskDAO.selectTaskListType(user_id,tracker,status,type);
		 JSONArray jsonArray = new JSONArray();
			for (int i = 0; i < listArr.size() ; i++) {
				Task listtask = listArr.get(i);
				JSONObject json = new JSONObject();
				 long lcreate_date=listtask.getCreate_date();
				    Date date=new Date(lcreate_date);
				    long lcreate_at=listtask.getCreate_at();
				    Date date_at=new Date(lcreate_at*1000);
				    String create_date = formatter.format(date);
				    String create_at = formatter.format(date_at);
				json.put("task_id",listtask.getTask_id());
				json.put("task_name",listtask.getTask_name());
				json.put("profile_name", listtask.getProfile_name());
				json.put("user_id", listtask.getUser_id());
				json.put("create_date", create_date);
				json.put("create_at", create_at);
				json.put("task_avatar", listtask.getTask_avatar());
				json.put("type_social", listtask.getType_social());
				json.put("status", listtask.getStatus());
				json.put("priority", listtask.getPriority());
				json.put("tracker",listtask.getTracker());
			    jsonArray.put(i,json);
			} 
			jsonReturn=jsonArray;
			out.print(jsonReturn);
	}
	else if(action.equals("getmemberassign")){
		 ArrayList<Task> listArr=taskDAO.selectTaskAssign(task_id);
		 JSONArray jsonArray = new JSONArray();
			for (int i = 0; i < listArr.size() ; i++) {
				Task listtask = listArr.get(i);
				JSONObject json = new JSONObject();
				json.put("task_id",listtask.getTask_id());
				json.put("user_id", listtask.getUser_id());
			    jsonArray.put(i,json);
			} 
			jsonReturn=jsonArray;
			out.print(jsonReturn);
	}
	
}
catch(Exception e){
	
}
%>