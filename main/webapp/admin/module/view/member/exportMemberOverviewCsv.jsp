<%@ page language="java" contentType="test/csv; charset=utf-8" pageEncoding="utf-8"%>
<%@page import="java.util.ArrayList, com.andwise.common.CommonUtil"%>
<%@page import="org.json.*"%>

<%@ page trimDirectiveWhitespaces="true" %>
<%response.setHeader("Content-type", "test/csv"); %>
<%response.setHeader("Content-Disposition", "attachment; filename=\""+request.getParameter("exportName")+"\"");%>
<%response.setCharacterEncoding("utf-8"); %>
<%@include file="/admin/module/view/common/Permission.jsp"%>
<%
	String csvContent = request.getParameter("exportContent");

	JSONObject jsonObject = new JSONObject(csvContent);
	JSONObject json_title_content_all = jsonObject.getJSONObject("title_content_all");
	JSONObject jsonTitle_content = jsonObject.getJSONObject("title_content");
	JSONObject json_title_connect_channel = jsonObject.getJSONObject("title_connect_channel");
	JSONObject json_title_user_group = jsonObject.getJSONObject("title_user_group");//content_summary
	JSONArray json_content_summary = jsonObject.getJSONArray("content_summary");
	JSONArray json_content_connect_channel = jsonObject.getJSONArray("content_connect_channel");
	JSONArray json_content_user_group = jsonObject.getJSONArray("content_user_group");
	
	String row = "";
	row +=  CommonUtil.CreateCSVField(json_title_content_all.getString("all"));
	row += "," + CommonUtil.CreateCSVField(json_title_content_all.getString("all_value"));
	row += "," + CommonUtil.CreateCSVField(json_title_content_all.getString("draft"));
	row += "," + CommonUtil.CreateCSVField(json_title_content_all.getString("draft_value"));
	row += "," + CommonUtil.CreateCSVField(json_title_content_all.getString("scheduled"));
	row += "," + CommonUtil.CreateCSVField(json_title_content_all.getString("scheduled_value"));
	row += "," + CommonUtil.CreateCSVField(json_title_content_all.getString("sent"));
	row += "," + CommonUtil.CreateCSVField(json_title_content_all.getString("sent_value"))+ "\n";
	
	row += "\n";
	row += "\n";
	row += "\n";
	row +=  CommonUtil.CreateCSVField(jsonTitle_content.getString("channel"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_content.getString("name"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_content.getString("draft"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_content.getString("scheduled"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_content.getString("sent"));
	
	row += "," + CommonUtil.CreateCSVField(jsonTitle_content.getString("all"))+ "\n";
	
	for (int i=0; i<json_content_summary.length();i++){
		JSONObject jObj = json_content_summary.getJSONObject(i);
		row +=  CommonUtil.CreateCSVField(jObj.getString("channel"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("name"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("draft"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("scheduled"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("sent"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("all"))+ "\n";
		
	}

	row += "\n";
	row += "\n";
	row += "\n";
	row += CommonUtil.CreateCSVField(json_title_connect_channel.getString("no"));
	row += "," + CommonUtil.CreateCSVField(json_title_connect_channel.getString("channel"));
	row += "," + CommonUtil.CreateCSVField(json_title_connect_channel.getString("name"));
	
	
	row += "," + CommonUtil.CreateCSVField(json_title_connect_channel.getString("create_date")) + "\n";

	for (int i=0; i<json_content_connect_channel.length();i++){
		JSONObject jObj = json_content_connect_channel.getJSONObject(i);
		row += CommonUtil.CreateCSVField(jObj.getString("no"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("channel"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("channel_user"));
		
		row += "," + CommonUtil.CreateCSVField(jObj.getString("create_date")) + "\n";
			
	}

	row += "\n";
	row += "\n";
	row += "\n";
	row += CommonUtil.CreateCSVField(json_title_user_group.getString("no"));
	row += "," + CommonUtil.CreateCSVField(json_title_user_group.getString("division"));
	row += "," + CommonUtil.CreateCSVField(json_title_user_group.getString("name"));
	row += "," + CommonUtil.CreateCSVField(json_title_user_group.getString("email"));
	row += "," + CommonUtil.CreateCSVField(json_title_user_group.getString("create_date")) + "\n";

	for(int k=0;k<json_content_user_group.length();k++){
		JSONObject jObj = json_content_user_group.getJSONObject(k);
		row += CommonUtil.CreateCSVField(jObj.getString("no"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("division"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("name"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("email"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("create_date"))+ "\n";
	}
	
	//System.out.println(csvContent);
%>
<%=row%>