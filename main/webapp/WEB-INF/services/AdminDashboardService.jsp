<%@ page language="java" contentType="application/json; charset=utf-8" pageEncoding="utf-8"%>
<%@page import="java.util.ArrayList"%>
<%@page import="org.json.*"%>
<%@page import="java.text.*"%>
<%@ page import="org.springframework.context.ApplicationContext" %>
<%@ page import="org.springframework.context.support.ClassPathXmlApplicationContext" %>
<%@ page import="com.andwise.admin.dao.DashboardDao" %>
<%@ page import="com.andwise.admin.model.Dashboard" %>
 <%@ page import="org.springframework.web.context.support.*"%>
  <%@ page import="com.andwise.common.*" %>
<%@include file="/admin/module/view/common/Permission.jsp"%>
<%
JSONArray jsonReturn = new JSONArray();
ApplicationContext appContext =  ApplicationContextProvider.getGlobalContext(this.getServletContext());
DashboardDao dashboardDAO=(DashboardDao)appContext.getBean("dashboardDAO");
try{
	String action="";
	String date_from="";
	String date_to="";
	DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	if(request.getParameter("datefrom")!=null){
		date_from = request.getParameter("datefrom");
		//date_from=date_from+" 00:00:00";
		//date_from=formatter.format(date_from);
	}
	if(request.getParameter("dateto")!=null){
		date_to = request.getParameter("dateto");
		//date_to= date_to+" 23:00:00";
		//date_to=formatter.format(date_to);
	}
	if(request.getParameter("Action")!=null){
		action = request.getParameter("Action");
	}
	if(action.equals("memberpaid")){
		ArrayList<Dashboard> listArr = dashboardDAO.selectMemberType(date_from,date_to);
		JSONArray jsonArray = new JSONArray();
		for (int i = 0; i < listArr.size() ; i++) {
			Dashboard db = listArr.get(i);
			JSONObject json = new JSONObject();
			json.put("number", db.getNumber());
			json.put("type", db.getType());
			json.put("create_date", db.getCreate_date());
		    jsonArray.put(i,json);
		}
		jsonReturn=jsonArray;
	}
	else if(action.equals("industry"))
	{
		ArrayList<Dashboard> listArr = dashboardDAO.selectMemberIndustry(date_from,date_to);
		JSONArray jsonArray = new JSONArray();
		for (int i = 0; i < listArr.size() ; i++) {
			Dashboard db = listArr.get(i);
			JSONObject json = new JSONObject();
			json.put("number", db.getNumber());
			json.put("industry", db.getIndustry());
			json.put("create_date", db.getCreate_date());
		    jsonArray.put(i,json);
		}
		jsonReturn=jsonArray;
	}
	out.println(jsonReturn);
	
}
catch(Exception e){
	
}
%>