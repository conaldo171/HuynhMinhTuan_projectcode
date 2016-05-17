<%@ page language="java" contentType="application/json; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.text.*"%>
<%@ page import="java.util.*"%>
<%@ page import="org.springframework.context.ApplicationContext" %>
<%@ page import="org.springframework.context.support.ClassPathXmlApplicationContext" %>
<%@ page import="com.andwise.competitors.dao.CompetitorsDao" %>
<%@ page import="com.andwise.competitors.model.Competitors" %>
<%@ page import="com.andwise.common.*" %>
<%@include file="../../module/view/common/Permission.jsp"%>
<%
String page_name1="";
String page_name2="";
int type=0;
long lcreate_date=0;
int competitors_id=0;
String action="";
String channel_detail_id1="";
String channel_detail_id2="";
String avatar_tw1="";
String avatar_tw2="";
DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
Date date = new Date();
String gmt="";

if(session.getAttribute("SessionGmt")!=null){
	gmt=(String)session.getAttribute("SessionGmt");
}
if(request.getParameter("page_name1")!=null){
	page_name1=  request.getParameter("page_name1");
}
if(request.getParameter("page_name2")!=null){
	page_name2=  request.getParameter("page_name2");
}
if(request.getParameter("channel_detail_id1")!=null){
	channel_detail_id1=  request.getParameter("channel_detail_id1");
}
if(request.getParameter("channel_detail_id2")!=null){
	channel_detail_id2=  request.getParameter("channel_detail_id2");
}
if(request.getParameter("avatar_tw1")!=null){
	avatar_tw1=  request.getParameter("avatar_tw1");
}
if(request.getParameter("avatar_tw2")!=null){
	avatar_tw2=  request.getParameter("avatar_tw2");
}
if(request.getParameter("type")!=null){
	type= Integer.parseInt(request.getParameter("type"));
}
if(request.getParameter("Action")!=null){
	action=request.getParameter("Action");
}

formatter.setTimeZone(TimeZone.getTimeZone(gmt));
Date currentdate=(Date)formatter.parse(formatter.format(date));
lcreate_date= currentdate.getTime();
	try
	{
		 ApplicationContext appContext =  ApplicationContextProvider.getGlobalContext(this.getServletContext());
		 CompetitorsDao competitorsDAO=(CompetitorsDao)appContext.getBean("competitorsDAO");
		if(action.equals("save"))
		{
			competitors_id=competitorsDAO.saveCompetitor(page_name1,page_name2,channel_detail_id1,channel_detail_id2,lcreate_date,user_id,type,avatar_tw1,avatar_tw2);
		}
		else if(action.equals("delete"))
			
		{
			int id=0;
			if(request.getParameter("competitors_id")!=null){
				id= Integer.parseInt(request.getParameter("competitors_id"));
			}
			competitorsDAO.deleteCompetitors(id,user_id);
			competitors_id=2;
			}

	}
	catch(Exception e)
	{
		out.println(e);
	}

%>
<%=competitors_id%>