<%@ page language="java" contentType="test/csv; charset=utf-8" pageEncoding="utf-8"%>
<%@page import="java.util.ArrayList, com.andwise.common.CommonUtil"%>
<%@page import="org.json.*"%>

<%@ page trimDirectiveWhitespaces="true" %>
<%@include file="/admin/module/view/common/Permission.jsp"%>
<%response.setHeader("Content-type", "test/csv"); %>
<%response.setHeader("Content-Disposition", "attachment; filename=\""+request.getParameter("exportName")+"\"");%>
<%response.setCharacterEncoding("utf-8"); %>
<%
	String csvContent = request.getParameter("exportContenttwitter");

	JSONObject jsonObject = new JSONObject(csvContent);
	JSONObject jsonTitle_Summary = jsonObject.getJSONObject("title_summary");
	//JSONObject jsonTop20 = jsonObject.getJSONObject("title_top20");
	JSONArray jsoncontent_summary = jsonObject.getJSONArray("content_summary");
	//JSONArray jsoncontent_top20 = jsonObject.getJSONArray("content_top20");
	
	String row = "";

	row +=  CommonUtil.CreateCSVField(jsonTitle_Summary.getString("date"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Summary.getString("followers"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Summary.getString("newfollowers"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Summary.getString("following"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Summary.getString("reach"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Summary.getString("engagement"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Summary.getString("brandroyalty"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Summary.getString("activity"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Summary.getString("spread"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Summary.getString("tweets"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Summary.getString("retweets"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Summary.getString("mentions"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Summary.getString("comment"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Summary.getString("favorite"))+ "\n";
	
	for (int i=0; i<jsoncontent_summary.length();i++){
		JSONObject jObj = jsoncontent_summary.getJSONObject(i);
		row +=  CommonUtil.CreateCSVField(jObj.getString("date"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("followers"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("newfollowers"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("following"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("reach"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("engagement"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("brandroyalty"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("activity"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("spread"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("tweets"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("retweets"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("mentions"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("comment"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("favorite"))+ "\n";
		
	}

	/*row += "\n";
	row += "\n";
	row += "\n";
	row += CommonUtil.CreateCSVField(jsonTop20.getString("date"));
	row += "," + CommonUtil.CreateCSVField(jsonTop20.getString("no"));
	row += "," + CommonUtil.CreateCSVField(jsonTop20.getString("title"));
	
	row += "," + CommonUtil.CreateCSVField(jsonTop20.getString("engagement"));
	row += "," + CommonUtil.CreateCSVField(jsonTop20.getString("mention"));
	row += "," + CommonUtil.CreateCSVField(jsonTop20.getString("retweet"));
	row += "," + CommonUtil.CreateCSVField(jsonTop20.getString("comment"));
	row += "," + CommonUtil.CreateCSVField(jsonTop20.getString("favorite")) + "\n";

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
%>
<%=row%>