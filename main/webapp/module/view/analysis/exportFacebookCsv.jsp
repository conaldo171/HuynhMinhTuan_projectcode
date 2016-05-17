<%@ page language="java" contentType="test/csv; charset=utf-8" pageEncoding="utf-8"%>
<%@page import="java.util.ArrayList, com.andwise.common.CommonUtil"%>
<%@page import="org.json.*"%>

<%@ page trimDirectiveWhitespaces="true" %>
<%@include file="../common/Permission.jsp"%>
<%response.setHeader("Content-type", "test/csv"); %>
<%response.setHeader("Content-Disposition", "attachment; filename=\""+request.getParameter("exportName")+"\"");%>
<%response.setCharacterEncoding("utf-8"); %>
<%
	String csvContent = request.getParameter("exportContent");

	JSONObject jsonObject = new JSONObject(csvContent);
	JSONObject jsonTitle_Summary = jsonObject.getJSONObject("title_summary");
	JSONObject jsonTop20 = jsonObject.getJSONObject("title_top20");
	JSONObject jsoninfluence = jsonObject.getJSONObject("title_influence");//content_summary
	JSONArray json_content_summary = jsonObject.getJSONArray("content_summary");
	JSONArray json_content_top20 = jsonObject.getJSONArray("content_top20");
	JSONArray json_content_influence = jsonObject.getJSONArray("content_influence");
	
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

	row += "\n";
	row += "\n";
	row += "\n";
	row += CommonUtil.CreateCSVField(jsonTop20.getString("date"));
	row += "," + CommonUtil.CreateCSVField(jsonTop20.getString("no"));
	row += "," + CommonUtil.CreateCSVField(jsonTop20.getString("title"));
	
	row += "," + CommonUtil.CreateCSVField(jsonTop20.getString("engagement"));
	row += "," + CommonUtil.CreateCSVField(jsonTop20.getString("peopletalking"));
	row += "," + CommonUtil.CreateCSVField(jsonTop20.getString("reach"));
	row += "," + CommonUtil.CreateCSVField(jsonTop20.getString("like"));
	row += "," + CommonUtil.CreateCSVField(jsonTop20.getString("share"));
	row += "," + CommonUtil.CreateCSVField(jsonTop20.getString("comment"));
	row += "," + CommonUtil.CreateCSVField(jsonTop20.getString("commentoflike")) + "\n";

	for (int i=0; i<json_content_top20.length();i++){
		JSONObject jObj = json_content_top20.getJSONObject(i);
		row += CommonUtil.CreateCSVField(jObj.getString("date"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("no"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("title"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("engagement"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("peopletalking"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("reach"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("like"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("share"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("comment"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("commentoflike")) + "\n";
			
	}

	row += "\n";
	row += "\n";
	row += "\n";
	row += CommonUtil.CreateCSVField(jsoninfluence.getString("date"));
	row += "," + CommonUtil.CreateCSVField(jsoninfluence.getString("no"));
	row += "," + CommonUtil.CreateCSVField(jsoninfluence.getString("account"));
	row += "," + CommonUtil.CreateCSVField(jsoninfluence.getString("spread"));
	row += "," + CommonUtil.CreateCSVField(jsoninfluence.getString("brandroyalty")) + "\n";

	for(int k=0;k<json_content_influence.length();k++){
		JSONObject jObj = json_content_influence.getJSONObject(k);
		row += CommonUtil.CreateCSVField(jObj.getString("date"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("no"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("account"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("spread"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("brandroyalty"))+ "\n";
	}
	
	//System.out.println(csvContent);
%>
<%=row%>