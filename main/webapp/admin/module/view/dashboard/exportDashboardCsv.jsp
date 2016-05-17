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
	JSONObject title_Industry = jsonObject.getJSONObject("title_industry");
	JSONObject title_Member = jsonObject.getJSONObject("title_member");
	//JSONObject title_Twitter = jsonObject.getJSONObject("title_Twitter");
	
	JSONArray json_member_industry = jsonObject.getJSONArray("array_member_industry");//array_conten_facebook_page
	JSONArray json_member = jsonObject.getJSONArray("array_member");
	JSONArray json_member_content = jsonObject.getJSONArray("array_member_content");
	
	//row += CommonUtil.CreateCSVField(title_Member.getString("facebook"))+ "\n";//array_conten_facebook_profile
	row +=  CommonUtil.CreateCSVField(title_Member.getString("date"));
	row += "," + CommonUtil.CreateCSVField(title_Member.getString("newmember"));
	row += "," + CommonUtil.CreateCSVField(title_Member.getString("paidmember"));
	row += "," + CommonUtil.CreateCSVField(title_Member.getString("freemember"))+ "\n";
	for (int i=0; i<json_member.length();i++){
		JSONObject jObj = json_member.getJSONObject(i);
		row +=  CommonUtil.CreateCSVField(jObj.getString("day"));
		row += "," +  CommonUtil.CreateCSVField(jObj.getString("paid")+jObj.getString("free"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("paid"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("free"))+ "\n";
		//row += "," + CommonUtil.CreateCSVField(jObj.getString("all"));
		
	}
	row += "\n";
	row += "\n";
	row += "\n";
	row +=  CommonUtil.CreateCSVField(jsonTitle_Content.getString("date"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Content.getString("draft"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Content.getString("scheduled"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Content.getString("sent"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Content.getString("all"))+ "\n";
	for (int i=0; i<json_member_content.length();i++){
		JSONObject jObj = json_member_content.getJSONObject(i);
		row +=  CommonUtil.CreateCSVField(jObj.getString("day"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("draft"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("schedule"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("sent"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("all"))+ "\n";
		
	}
	row += "\n";
	row += "\n";
	row += "\n";
	row +=  CommonUtil.CreateCSVField(title_Industry.getString("date"));
	row += "," + CommonUtil.CreateCSVField(title_Industry.getString("number"));
	row += "," + CommonUtil.CreateCSVField(title_Industry.getString("industry"))+"\n";
	for (int i=0; i<json_member_industry.length();i++){
		JSONObject jObj = json_member_industry.getJSONObject(i);
		row +=  CommonUtil.CreateCSVField(jObj.getString("create_date"));
				row += "," + CommonUtil.CreateCSVField(jObj.getString("number"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("industry"))+ "\n";
		
	}
	
	
	
	

}
catch(Exception e){
	
}
	
%>
<%=row%>