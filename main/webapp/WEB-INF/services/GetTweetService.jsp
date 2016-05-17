<%@ page language="java" contentType="application/json; charset=utf-8" pageEncoding="utf-8"%>
 <%@page import="java.text.*"%>
<%@ page import="java.util.Date"%>
 <%@ page import="com.andwise.common.*" %>
<%@ page import="org.springframework.context.ApplicationContext" %>
<%@ page import="org.springframework.context.support.ClassPathXmlApplicationContext" %>
<%@ page import="com.andwise.channel.dao.ChannelDetailDao" %>
<%@ page import="com.andwise.channel.model.ChannelDetail" %>
 <%@ page import="org.springframework.web.context.support.*"%>
<%@ page import="com.andwise.common.*" %>
<%@page import="org.json.*"%>
<%@page import="java.util.ArrayList"%>
 <%@include file="../../module/view/common/Permission.jsp"%>
<%
String token="";
String token_secret="";
String sdate_to="";
String sdate_from="";
long ldate_from=0,ldate_to=0;
String action ="";
String list_data="";
String channel_detail_id="";
String type="twitter";
int paging=0;
DateFormat formatter = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
Date dt = new Date();
sdate_to = formatter.format(dt);
sdate_from = formatter.format(dt);
if(request.getParameter("channel_detail_id")!=null)
	channel_detail_id= request.getParameter("channel_detail_id");
if(request.getParameter("paging")!=null)
	paging= Integer.parseInt(request.getParameter("paging"));
if(request.getParameter("token")!=null)
	token=request.getParameter("token");
if(request.getParameter("token_secret")!=null)
	token_secret= request.getParameter("token_secret");
if(request.getParameter("DateFrom")!=null)
{
	ldate_from =Long.parseLong(request.getParameter("DateFrom"));
	}
	
if(request.getParameter("DateTo")!=null)
{
	ldate_to =Long.parseLong(request.getParameter("DateTo"));
	}
if(request.getParameter("Action")!=null){
	action= request.getParameter("Action");
}
if(request.getParameter("type")!=null){
	type= request.getParameter("type");
}

TwitterApi tw=new TwitterApi();
try{
	JSONArray jsonReturn = new JSONArray();
    ApplicationContext appContext =  ApplicationContextProvider.getGlobalContext(this.getServletContext());
    ChannelDetailDao channelDetailDAO=(ChannelDetailDao)appContext.getBean("channelDetailDAO");
	if(action.equals("gettweet"))
	 list_data =tw.getTopTwitter(token,token_secret,ldate_from*1000l,ldate_to*1000l);
	
	
	

}
catch(Exception e){
	System.out.println(e);
}

%>
<%=list_data%>