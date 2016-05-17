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
	JSONObject jsonTitle_Member = jsonObject.getJSONObject("title_member");
		JSONArray json_content_member = jsonObject.getJSONArray("content_member");
	
	
	String row = "";

	row +=  CommonUtil.CreateCSVField(jsonTitle_Member.getString("no"));
	//row += "," + CommonUtil.CreateCSVField(jsonTitle_Member.getString("no"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Member.getString("create_date"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Member.getString("industry"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Member.getString("company"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Member.getString("name"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Member.getString("email"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Member.getString("channel"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Member.getString("team_member"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Member.getString("total_content"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Member.getString("service"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Member.getString("service_start"));
	row += "," + CommonUtil.CreateCSVField(jsonTitle_Member.getString("service_end"))+ "\n";
	
	
	for (int i=0; i<json_content_member.length();i++){
		JSONObject jObj = json_content_member.getJSONObject(i);
		row +=  CommonUtil.CreateCSVField(jObj.getString("no"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("since"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("industry"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("company_name"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("name"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("email"));
		String list_Channel=CommonUtil.CreateCSVField(jObj.getString("channel"));
		String str[]=list_Channel.split(",");
		String channel="";
		for(int j=0; j<str.length;j++){
			if(str[j].equals("1")||str[j].equals("2")){
				channel ="F";
			}
			else{
				channel=channel+"/T";
			}
				
		}
		
		row += "," + channel;
		row += "," + CommonUtil.CreateCSVField(jObj.getString("member"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("totalcontent"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("type"));
		row += "," + CommonUtil.CreateCSVField(jObj.getString("date_start"))+ "\n";
		row += "," + CommonUtil.CreateCSVField(jObj.getString("date_expired"))+ "\n";
		
		
	}

	
	
	//System.out.println(csvContent);
%>
<%=row%>