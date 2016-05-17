<%@ page language="java" contentType="application/json; charset=utf-8" pageEncoding="utf-8"%>
<%@page import="java.util.ArrayList"%>
<%@page import="org.json.*"%>
<%@ page import="java.util.Date"%>
<%@page import="java.text.*"%>
<%@ page import="java.util.*"%>
<%@ page import="org.springframework.context.ApplicationContext" %>
<%@ page import="org.springframework.context.support.ClassPathXmlApplicationContext" %>
<%@ page import="com.andwise.admin.dao.MemberOverviewDao" %>
<%@ page import="com.andwise.admin.model.MemberOverview" %>
 <%@ page import="org.springframework.web.context.support.*"%>
  <%@ page import="com.andwise.common.*" %>
<%@include file="/admin/module/view/common/Permission.jsp"%>
<%
JSONArray jsonReturn = new JSONArray();
ApplicationContext appContext =  ApplicationContextProvider.getGlobalContext(this.getServletContext());
MemberOverviewDao memberDAO=(MemberOverviewDao)appContext.getBean("memberOverviewDAO");
try{
		
		int user_id=0;
		String channel_detail_id="";
		String action="";
		
		
		if(request.getParameter("user_id")!=null){
			user_id=Integer.parseInt(request.getParameter("user_id"));
		}
		if(request.getParameter("channel_detail_id")!=null){
			channel_detail_id=request.getParameter("channel_detail_id");
		}
		if(request.getParameter("Action")!=null){
			action=request.getParameter("Action");
		}
		if(action.equals("delchannel")){
			memberDAO.deleteChannelDetail(user_id, channel_detail_id);
			out.println("ok");
		}
		else  if(action.equals("deluser")){
			memberDAO.deleteMemberOverview(user_id);
			out.println("ok");
		}
		
		  
      
	
}
catch(Exception e){
	out.println("error");	
}
%>
