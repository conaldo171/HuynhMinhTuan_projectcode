<%@ page language="java" contentType="application/json; charset=utf-8" pageEncoding="utf-8"%>
<%@page import="java.util.ArrayList"%>
<%@page import="org.json.*"%>
<%@page import="java.text.*"%>
<%@ page import="org.springframework.context.ApplicationContext" %>
<%@ page import="org.springframework.context.support.ClassPathXmlApplicationContext" %>
<%@ page import="com.andwise.admin.dao.ContentDao" %>
<%@ page import="com.andwise.admin.model.Content" %>
 <%@ page import="org.springframework.web.context.support.*"%>
  <%@ page import="com.andwise.common.*" %>
<%@include file="/admin/module/view/common/Permission.jsp"%>
<%
JSONArray jsonReturn = new JSONArray();
ApplicationContext appContext =  ApplicationContextProvider.getGlobalContext(this.getServletContext());
ContentDao contentDAO=(ContentDao)appContext.getBean("contentDAO");
try{
	String action="";
	String date_from="";
	String date_to="";
	int channel_id=0;
	
	
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
	if(request.getParameter("channel_id")!=null){
		channel_id = Integer.parseInt(request.getParameter("channel_id"));
		
	}
	if(request.getParameter("Action")!=null){
		action = request.getParameter("Action");
	}
	if(action.equals("contenttype")){
		ArrayList<Content> listArr = contentDAO.selectContentByType(date_from,date_to);
		JSONArray jsonArray = new JSONArray();
		for (int i = 0; i < listArr.size() ; i++) {
			Content content = listArr.get(i);
			JSONObject json = new JSONObject();
			json.put("number", content.getNumber());
			json.put("type", content.getType());
			json.put("create_date", content.getCreate_date());
		    jsonArray.put(i,json);
		}
		jsonReturn=jsonArray;
	}
	else if(action.equals("contentchannelall"))
	{
		String list_id="";
		if(request.getParameter("list_channel_id")!=null){
         list_id = request.getParameter("list_channel_id");
			
			
		}
		String list_channel_id[] = list_id.split(",");
		JSONArray jsonArray = new JSONArray();
		for(int j=0;j<list_channel_id.length;j++){
			ArrayList<Content> listArr = contentDAO.selectContentByChannel(date_from,date_to,Integer.parseInt(list_channel_id[j]));
			
			for (int i = 0; i < listArr.size() ; i++) {
				Content content = listArr.get(i);
				JSONObject json = new JSONObject();
				json.put("channel_id", list_channel_id[j]);
				json.put("number", content.getNumber());
				json.put("type", content.getType());
				json.put("create_date", content.getCreate_date());
			    jsonArray.put(json);
			}
			
		}
		jsonReturn=jsonArray;
		
	}
	else
	{
		ArrayList<Content> listArr = contentDAO.selectContentByChannel(date_from,date_to,channel_id);
		JSONArray jsonArray = new JSONArray();
		for (int i = 0; i < listArr.size() ; i++) {
			Content content = listArr.get(i);
			JSONObject json = new JSONObject();
			json.put("number", content.getNumber());
			json.put("type", content.getType());
			json.put("create_date", content.getCreate_date());
		    jsonArray.put(i,json);
		}
		jsonReturn=jsonArray;
	}
	out.println(jsonReturn);
	
}
catch(Exception e){
	
}
%>