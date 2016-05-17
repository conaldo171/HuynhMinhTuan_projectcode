<%@ page language="java" contentType="application/json; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.text.*"%>
<%@ page import="java.util.*"%>
<%@page import="org.json.*"%>
<%@ page import="org.springframework.context.ApplicationContext" %>
<%@ page import="org.springframework.context.support.ClassPathXmlApplicationContext" %>
<%@ page import="com.andwise.task.dao.CommentTaskDao" %>
<%@ page import="com.andwise.task.model.CommentTask" %>
<%@ page import="com.andwise.common.*" %>
<%@include file="../../module/view/common/Permission.jsp"%>
<%
String gmt="",action="";
String task_id="";
int comment_from=0;
int status=0;
String list_task_id="",l_task_id="";
String list_comment_id="",comment_id_temp="";

if(session.getAttribute("SessionGmt")!=null){
	gmt=(String)session.getAttribute("SessionGmt");
}

if(request.getParameter("Action")!=null){
	action=request.getParameter("Action");
}
if(request.getParameter("comment_from")!=null){
	comment_from=Integer.parseInt(request.getParameter("comment_from"));
}
if(request.getParameter("status")!=null){
	status=Integer.parseInt(request.getParameter("status"));
}
if(request.getParameter("task_id")!=null){
	task_id=request.getParameter("task_id");
}
if(request.getParameter("list_task_id")!=null){
	l_task_id=request.getParameter("list_task_id");
	
}
if(request.getParameter("list_comment_id")!=null){
	comment_id_temp=request.getParameter("list_comment_id");
	
}
try{
	JSONArray jsonReturn = new JSONArray();
	 DateFormat formatter = new SimpleDateFormat("E  MMM dd, yyyy 'at' hh:mm a");
	 ApplicationContext appContext =  ApplicationContextProvider.getGlobalContext(this.getServletContext());
	 CommentTaskDao taskDAO=(CommentTaskDao)appContext.getBean("commenttaskDAO");
	if(action.equals("getcomment")){
		
		 formatter.setTimeZone(TimeZone.getTimeZone(gmt));
		 ArrayList<CommentTask> listArr=taskDAO.selectCommentByTask(task_id,comment_from,user_id);
		 JSONArray jsonArray = new JSONArray();
			for (int i = 0; i < listArr.size() ; i++) {
				CommentTask listtask = listArr.get(i);
				JSONObject json = new JSONObject();
				 long lcreate_date=listtask.getCreate_date();
				    Date date=new Date(lcreate_date);
				    
				String create_date = formatter.format(date);
				json.put("comment_id",listtask.getComment_id());
				json.put("comment_content",listtask.getComment_content());
				json.put("task_history", listtask.getTask_history());
				json.put("user_id", listtask.getUser_id());
				json.put("create_date", create_date);
				json.put("task_id", listtask.getTask_id());
				json.put("user_id", listtask.getUser_id());
				json.put("profile_name",listtask.getProfile_name());
                jsonArray.put(i,json);
			} 
			jsonReturn=jsonArray;
			out.print(jsonReturn);
	}
	else if(action.equals("getnodecomment")){
		 ArrayList<CommentTask> listArr=taskDAO.selectNodeComment(task_id);
		 JSONArray jsonArray = new JSONArray();
			for (int i = 0; i < listArr.size() ; i++) {
				CommentTask listtask = listArr.get(i);
				JSONObject json = new JSONObject();
				json.put("comment_id",listtask.getComment_id());
				json.put("comment_by",listtask.getComment_by());
				json.put("user_id", listtask.getUser_id());
				json.put("profile_name",listtask.getProfile_name());
                jsonArray.put(i,json);
			} 
			jsonReturn=jsonArray;
			out.print(jsonReturn);
	}
	else if(action.equals("getlimitcomment1")){
		String str_task_id[]=l_task_id.replace("'","").split(",");
		for(int j=0; j<str_task_id.length;j++){
			list_task_id+=str_task_id[j]+",";
		}
		ArrayList<CommentTask> listArr=taskDAO.selectComentLimit1(list_task_id);
		 JSONArray jsonArray = new JSONArray();
			for (int i = 0; i < listArr.size() ; i++) {
				CommentTask listtask = listArr.get(i);
				JSONObject json = new JSONObject();
				json.put("comment_id",listtask.getComment_id());
				json.put("task_history",listtask.getTask_history());
				json.put("task_id", listtask.getTask_id());
				json.put("profile_name", listtask.getProfile_name());
               jsonArray.put(i,json);
			} 
			jsonReturn=jsonArray;
			out.print(jsonReturn);
	}
	else if(action.equals("getnodecommentlimit")){
		
		String str_comment_id[]=comment_id_temp.replace("'","").split(",");
		for(int j=0; j<str_comment_id.length;j++){
			list_comment_id+=str_comment_id[j]+",";
		}
		 ArrayList<CommentTask> listArr=taskDAO.selectNodeCommentLimit1(list_comment_id);
		 JSONArray jsonArray = new JSONArray();
			for (int i = 0; i < listArr.size() ; i++) {
				CommentTask listtask = listArr.get(i);
				JSONObject json = new JSONObject();
				json.put("comment_id",listtask.getComment_id());
				json.put("comment_by",listtask.getComment_by());
				json.put("user_id", listtask.getUser_id());
				json.put("profile_name",listtask.getProfile_name());
                jsonArray.put(i,json);
			} 
			jsonReturn=jsonArray;
			out.print(jsonReturn);
	}
	else if(action.equals("commentdraft")){
		 formatter.setTimeZone(TimeZone.getTimeZone(gmt));
		 ArrayList<CommentTask> listArr=taskDAO.selectCommentOfPost(user_id, comment_from, status);
		 JSONArray jsonArray = new JSONArray();
			for (int i = 0; i < listArr.size() ; i++) {
				CommentTask listtask = listArr.get(i);
				JSONObject json = new JSONObject();
				 long lcreate_date=listtask.getCreate_date();
				    Date date=new Date(lcreate_date);
				    
				String create_date = formatter.format(date);
				json.put("comment_id",listtask.getComment_id());
				json.put("comment_content",listtask.getComment_content());
				json.put("user_id", listtask.getUser_id());
				json.put("create_date", create_date);
				json.put("post_id", listtask.getTask_id());
				json.put("channel_user",listtask.getChannel_user());
				json.put("channel_picture",listtask.getChannel_picture());
				json.put("channel_detail_id",listtask.getChannel_detail_id());
				json.put("channel_id", listtask.getChannel_id());
                jsonArray.put(json);
			} 
			jsonReturn=jsonArray;
			out.print(jsonReturn);
	}
	else if (action.equals("listdate")){
		
	}
	
}
catch(Exception e){
	
}
%>