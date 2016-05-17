<%@ page language="java" contentType="test/csv; charset=utf-8" pageEncoding="utf-8"%>
<%@page import="java.util.ArrayList, com.andwise.common.CommonUtil"%>
<%@page import="org.json.*"%>

<%@ page trimDirectiveWhitespaces="true" %>
<%@include file="/admin/module/view/common/Permission.jsp"%>
<%response.setHeader("Content-type", "test/csv"); %>
<%response.setHeader("Content-Disposition", "attachment; filename=\""+request.getParameter("exportName")+"\"");%>
<%response.setCharacterEncoding("utf-8"); %>
<%
	String csvContent = request.getParameter("exportContent_Analysis");

	JSONObject jsonObject = new JSONObject(csvContent);
	JSONObject jsonTitle_Summary = jsonObject.getJSONObject("title_summary");
	JSONArray json_content_summary = jsonObject.getJSONArray("content_summary");
	
	String row = "";

	row +=  CommonUtil.CreateCSVField(jsonTitle_Summary.getString("date"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Summary.getString("fan"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Summary.getString("newfan"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Summary.getString("friendsoffan"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Summary.getString("reach"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Summary.getString("peopletalking"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Summary.getString("engagement"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Summary.getString("engagementRate"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Summary.getString("activity"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Summary.getString("brandroyalty"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Summary.getString("content"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Summary.getString("like"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Summary.getString("share"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Summary.getString("comment"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Summary.getString("likeofcomment"))+ "\n";
	
	for (int i=0; i<json_content_summary.length();i++){
		JSONObject jObj = json_content_summary.getJSONObject(i);
		row +=  CommonUtil.CreateCSVField(jObj.getString("date"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("fan"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("newfan"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("friendsoffan"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("reach"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("peopletalking"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("engagement"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("engagementRate"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("activity"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("brandroyalty"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("content"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("like"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("share"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("comment"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("likeofcomment"))+ "\n";
		
	}

	
	
	//System.out.println(csvContent);
%>
<%=row%>