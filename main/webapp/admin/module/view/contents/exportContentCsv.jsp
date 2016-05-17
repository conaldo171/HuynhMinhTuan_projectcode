<%@ page language="java" contentType="test/csv; charset=utf-8" pageEncoding="utf-8"%>
<%@page import="java.util.ArrayList, com.andwise.common.CommonUtil"%>
<%@page import="org.json.*"%>

<%@ page trimDirectiveWhitespaces="true" %>
<%response.setHeader("Content-type", "test/csv"); %>
<%response.setHeader("Content-Disposition", "attachment; filename=\""+request.getParameter("exportName")+"\"");%>
<%response.setCharacterEncoding("utf-8"); %>
<%@include file="/admin/module/view/common/Permission.jsp"%>
<%
String row = "";
try{
	String csvContent = request.getParameter("exportContent");

	JSONObject jsonObject = new JSONObject(csvContent);
	JSONObject jsonTitle_Content = jsonObject.getJSONObject("title_content");
	JSONObject title_Facebook_profile = jsonObject.getJSONObject("title_Facebook_profile");
	JSONObject title_Facebook_page = jsonObject.getJSONObject("title_Facebook_page");
	JSONObject title_Twitter = jsonObject.getJSONObject("title_Twitter");
	JSONArray json_content = jsonObject.getJSONArray("array_content");
	JSONArray json_content_facebook = jsonObject.getJSONArray("array_conten_facebook_profile");//array_conten_facebook_page
	JSONArray json_content_facebook_page = jsonObject.getJSONArray("array_conten_facebook_page");
	JSONArray json_content_twitter = jsonObject.getJSONArray("array_conten_twitter");
	

	row +=  CommonUtil.CreateCSVField(jsonTitle_Content.getString("date"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Content.getString("draft"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Content.getString("scheduled"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Content.getString("sent"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Content.getString("all"))+ "\n";

	for (int i=0; i<json_content.length();i++){
		JSONObject jObj = json_content.getJSONObject(i);
		row +=  CommonUtil.CreateCSVField(jObj.getString("day"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("draft"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("schedule"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("sent"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("all"))+ "\n";
		
	}

	row += "\n";
	row += "\n";
	row += "\n";
	// facebook
	row += CommonUtil.CreateCSVField(title_Facebook_profile.getString("facebook"))+ "\n";//array_conten_facebook_profile
	row +=  CommonUtil.CreateCSVField(jsonTitle_Content.getString("date"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Content.getString("draft"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Content.getString("scheduled"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Content.getString("sent"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Content.getString("all"))+ "\n";
	for (int i=0; i<json_content_facebook.length();i++){
		JSONObject jObj = json_content_facebook.getJSONObject(i);
		row +=  CommonUtil.CreateCSVField(jObj.getString("day"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("draft"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("schedule"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("sent"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("all"))+ "\n";
		
	}
	row += "\n";
	row += "\n";
	row += "\n";
	//facebook page
	row += CommonUtil.CreateCSVField(title_Facebook_page.getString("facebookpage"))+ "\n";
	row +=  CommonUtil.CreateCSVField(jsonTitle_Content.getString("date"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Content.getString("draft"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Content.getString("scheduled"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Content.getString("sent"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Content.getString("all"))+ "\n";
	
	for (int i=0; i<json_content_facebook_page.length();i++){
		JSONObject jObj = json_content_facebook_page.getJSONObject(i);
		row +=  CommonUtil.CreateCSVField(jObj.getString("day"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("draft"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("schedule"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("sent"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("all"))+ "\n";
		
	}
	row += "\n";
	row += "\n";
	row += "\n";
	// twitter
	row += CommonUtil.CreateCSVField(title_Twitter.getString("twitter"))+ "\n";
	row +=  CommonUtil.CreateCSVField(jsonTitle_Content.getString("date"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Content.getString("draft"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Content.getString("scheduled"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Content.getString("sent"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Content.getString("all"))+ "\n";
	
	for (int i=0; i<json_content_twitter.length();i++){
		JSONObject jObj = json_content_twitter.getJSONObject(i);
		row +=  CommonUtil.CreateCSVField(jObj.getString("day"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("draft"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("schedule"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("sent"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("all"))+ "\n";
		
	}
/*
	for (int i=0; i<jsoncontent_top20.length();i++){
		JSONObject jObj = jsoncontent_top20.getJSONObject(i);
		row += CommonUtil.CreateCSVField(jObj.getString("date"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("no"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("title"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("engagement"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("mention"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("retweet"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("comment"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("favorite")) + "\n";
			
	}
	*/

	
	
	//System.out.println(csvContent);
}
catch(Exception e){
	
}
	
%>
<%=row%>