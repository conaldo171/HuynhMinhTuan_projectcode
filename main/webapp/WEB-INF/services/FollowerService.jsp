<%@ page language="java" contentType="application/json; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.text.*"%>
<%@ page import="java.util.*"%>
<%@ page import="org.springframework.context.ApplicationContext" %>
<%@ page import="org.springframework.context.support.ClassPathXmlApplicationContext" %>
<%@ page import="com.andwise.content.dao.CreateDao" %>
<%@ page import="com.andwise.content.model.Create" %>
<%@ page import="com.andwise.common.*" %>
<%@ page import="com.restfb.*"%>
<%@ page import="com.restfb.types.*"%>
<%@ page import="com.restfb.json.*"%>
<%@include file="../../module/view/common/Permission.jsp"%>
<% 
String gmt="";
String channel_detail_id="";
String send_date="";
String access_token="";
String action="";
String type="twitter";
String list_user_id="";
if(session.getAttribute("SessionGmt")!=null){
	gmt=(String)session.getAttribute("SessionGmt");
}

if(request.getParameter("channel_detail_id")!=null){
	channel_detail_id=  request.getParameter("channel_detail_id");
}
if(request.getParameter("list_user")!=null){
	list_user_id=  request.getParameter("list_user");
	list_user_id =list_user_id.replace("'","");
}
if(request.getParameter("send_date")!=null){
	send_date = request.getParameter("send_date");
	send_date=send_date.replace("'","");
}
if(request.getParameter("access_token")!=null){
	access_token= request.getParameter("access_token");
}
if(request.getParameter("Action")!=null){
	action=request.getParameter("Action");
}
DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
Date date_time_msg = new Date();//(Date)formatter.parse(strdate[0]);
date_time_msg = (Date)formatter.parse(send_date);
long send_date_message = date_time_msg.getTime()-60*1000;
try
{
	//ApplicationContext appContext = WebApplicationContextUtils.getRequiredWebApplicationContext(servletContext);
	//CreateDao createDAO = (CreateDao) appContext.getBean("createDAO");
	 ApplicationContext appContext =  ApplicationContextProvider.getGlobalContext(this.getServletContext());
	 CreateDao createDAO=(CreateDao)appContext.getBean("createDAO");
  if(action.equals("follow"))
			createDAO.insertFollow(channel_detail_id,access_token,user_id,send_date_message,type);
  else if(action.equals("facebookpage")){
	  type="facebookpage";
	  FacebookClient facebookClient = new DefaultFacebookClient(access_token);
	  String queryfriendoffan = "select friend_count from user where uid in ('"+list_user_id+"') and friend_count<>'null'";
	  List<JsonObject> queryResultsFan = facebookClient.executeFqlQuery(queryfriendoffan, JsonObject.class);
     // Connection<User> myfriends = facebookClient.fetchConnection(channel_detail_id+"/friends", User.class);
      int friendoffan=0;
      
    for (int i=0;i<queryResultsFan.size();i++)
      {
    	  friendoffan =friendoffan+queryResultsFan.get(i).getInt("friend_count");
      } 
    createDAO.insertFriendsFacebook(channel_detail_id,0,friendoffan,user_id,send_date_message,type);
  }
  else
  {
	  type="facebook";
	  FacebookClient facebookClient = new DefaultFacebookClient(access_token);
	  String query = "select friend_count from user where uid="+channel_detail_id;//SELECT post_id ,created_time,message,description,share_count,like_info,comment_info FROM stream WHERE source_id = "+channel_detail_id+" limit 0,200";
	  List<JsonObject> queryResults = facebookClient.executeFqlQuery(query, JsonObject.class);
	  //Connection<User> myFriends = facebookClient.fetchConnection("me/friends", User.class);
 		String queryfriendoffan = "select friend_count from user where uid in (select uid2 from friend where uid1='"+channel_detail_id+"') and friend_count<>'null'";
	  List<JsonObject> queryResultsFan = facebookClient.executeFqlQuery(queryfriendoffan, JsonObject.class);
     // Connection<User> myfriends = facebookClient.fetchConnection(channel_detail_id+"/friends", User.class);
      int friendoffan=0;
    for (int i=0;i<queryResultsFan.size();i++)
      {
    	  friendoffan =friendoffan+queryResultsFan.get(i).getInt("friend_count");
      }
     
		int friends_number= queryResults.get(0).getInt("friend_count");
	  createDAO.insertFriendsFacebook(channel_detail_id,friends_number,friendoffan,user_id,send_date_message,type);
  }
}
catch(Exception e){
	
	
}
%>