<%@ page language="java" contentType="application/json; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.text.*"%>
<%@ page import="java.io.*"%>
<%@ page import="java.net.*"%>
<%@ page import="org.springframework.context.ApplicationContext" %>
<%@ page import="org.springframework.context.support.ClassPathXmlApplicationContext" %>
<%@ page import="com.andwise.channel.dao.ChannelDetailDao" %>
<%@ page import="com.andwise.channel.model.ChannelDetail" %>
<%@ page import="com.andwise.common.*" %>
<%@include file="../../module/view/common/Permission.jsp"%>
<% 
String channel_detail_id="";
int id=0;
if(request.getParameter("channel_detail_id")!=null)
	channel_detail_id=request.getParameter("channel_detail_id");
if(request.getParameter("user_id")!=null)
	id= Integer.parseInt(request.getParameter("user_id"));
try
{
ApplicationContext appContext =  ApplicationContextProvider.getGlobalContext(this.getServletContext());
ChannelDetailDao channelDetailDAO=(ChannelDetailDao)appContext.getBean("channelDetailDAO");
channelDetailDAO.deleteChannelDetail(id,channel_detail_id);
out.println("ok");
}
catch(Exception e)
{
	out.println("error");
}
	
%>