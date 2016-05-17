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
		String date_expired="";
		String company_name="";
		long ldate_expired=0;
		DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		if(request.getParameter("user_id")!=null){
			user_id=Integer.parseInt(request.getParameter("user_id"));
		}
		if(request.getParameter("date_expired")!=null){
			date_expired=request.getParameter("date_expired");
			date_expired=date_expired + " 00:00:00";
		}
		if(request.getParameter("company_name")!=null){
			company_name=request.getParameter("company_name");
		}
		if(request.getParameter("Action")!=null){
			action=request.getParameter("Action");
		}
		if(action.equals("updateperson")){
			Date date_time = new Date();
			date_time = (Date)formatter.parse(date_expired);
		ldate_expired = date_time.getTime();
			memberDAO.updatePerson(user_id, company_name,ldate_expired);
			out.println("1");
		}
		
		
		  
      
	
}
catch(Exception e){
	out.println("error");	
}
%>
