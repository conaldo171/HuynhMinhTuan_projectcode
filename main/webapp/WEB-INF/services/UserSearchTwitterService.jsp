<%@ page language="java" contentType="application/json; charset=utf-8" pageEncoding="utf-8"%>
<%@page import="java.text.*"%>
<%@ page import="java.util.Date"%>
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
String list_data="";
String keyword="";
String type="twitter";
String token="";
String token_secret="";
if(request.getParameter("keyword")!=null)
	keyword= request.getParameter("keyword");
if(request.getParameter("token")!=null)
	token=request.getParameter("token");
if(request.getParameter("token_secret")!=null)
	token_secret= request.getParameter("token_secret");

TwitterApi tw=new TwitterApi();
try{
	JSONArray jsonReturn = new JSONArray();
	list_data =tw.getUserSearch(token,token_secret,keyword);

}
catch(Exception e){
	
}

%>
<%=list_data%>