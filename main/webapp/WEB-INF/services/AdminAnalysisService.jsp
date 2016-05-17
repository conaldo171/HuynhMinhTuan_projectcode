<%@ page language="java" contentType="application/json; charset=utf-8" pageEncoding="utf-8"%>
<%@page import="java.util.ArrayList"%>
<%@page import="org.json.*"%>
<%@page import="java.text.*"%>
<%@ page import="java.util.Date"%>
<%@ page import="org.springframework.context.ApplicationContext" %>
<%@ page import="org.springframework.context.support.ClassPathXmlApplicationContext" %>
<%@ page import="com.andwise.admin.dao.MemberOverviewDao" %>
<%@ page import="com.andwise.admin.model.MemberOverview" %>
 <%@ page import="org.springframework.web.context.support.*"%>
 <%@ page import="com.andwise.common.*" %>
<%@include file="/admin/module/view/common/Permission.jsp"%>
   
<%

 	int msg_id=0;  
	String action="";
	int user_id=0;
	if(request.getParameter("user_id")!=null)
		user_id= Integer.parseInt(request.getParameter("user_id"));
		if(request.getParameter("Action")!=null)
		action= request.getParameter("Action");
	try
	{
		JSONArray jsonReturn = new JSONArray();
		ApplicationContext appContext =  ApplicationContextProvider.getGlobalContext(this.getServletContext());
		MemberOverviewDao memberDAO=(MemberOverviewDao)appContext.getBean("memberOverviewDAO");
		
			ArrayList<MemberOverview> channelDetailArr = memberDAO.selectChannelUser(user_id);
			
			JSONArray jsonArray = new JSONArray();
			
			for (int i = 0; i < channelDetailArr.size() ; i++) {
				MemberOverview channelDetail = channelDetailArr.get(i);
				JSONObject json = new JSONObject();
				json.put("channel_id", channelDetail.getType() );
				json.put("channel_detail_id", channelDetail.getChannel_detail_id());
			    json.put("channel_user", channelDetail.getChannel_user());
			    //json.put("select_post", channelDetail.getSelect_post());
			   json.put("channel_picture", channelDetail.getChannel_picture());
			    json.put("token_user", channelDetail.getToken_user());
			     json.put("pchannel_id", channelDetail.getPchannel_id());
			    //json.put("user_id", channelDetail.getUser_id());
			    //json.put("default_show", channelDetail.getDefault_show());
			    json.put("last_view", channelDetail.getLast_view());
			    
			    
			    jsonArray.put(i,json);
			}
			jsonReturn=jsonArray;
		
		
				
			 
		out.println(jsonReturn);
		
	}
	catch(Exception e)
	{
		System.out.println(e);
	}
%>

