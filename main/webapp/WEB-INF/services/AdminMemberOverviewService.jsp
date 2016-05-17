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
		String date_from="";
		String date_to="";
		int user_id=0;
		int team_id=0;
		String action="";
		 String gmt="";
		    if(session.getAttribute("SessionGmt")!=null){
		    	gmt=(String)session.getAttribute("SessionGmt");
		    }
		DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
	    Date date = new Date();
	    formatter.setTimeZone(TimeZone.getTimeZone(gmt));
	    Date currentdate=(Date)formatter.parse(formatter.format(date));
	    long lCurentdate= currentdate.getTime();
	    long last_week = lCurentdate-(7*24*60*60*1000);
	    Date dateto=new Date(lCurentdate);
	    Date datefrom=new Date(last_week);
	    date_to = formatter.format(dateto);
	    date_from=formatter.format(datefrom);
	    if(request.getParameter("datefrom")!=null){
			date_from = request.getParameter("datefrom");
			
		}
		if(request.getParameter("dateto")!=null){
			date_to = request.getParameter("dateto");
			
		}
		if(request.getParameter("Action")!=null){
			action=request.getParameter("Action");
		}
		if(request.getParameter("user_id")!=null){
			user_id=Integer.parseInt(request.getParameter("user_id"));
		}
		if(request.getParameter("team_id")!=null){
			team_id=Integer.parseInt(request.getParameter("team_id"));
		}
		if(action.equals("channel")){
			 JSONArray jsonArray = new JSONArray();
	        	ArrayList<MemberOverview> listArr = memberDAO.selectChannelUser(user_id);
	        	int count=0;
	        	for (int i = 0; i < listArr.size() ; i++) {
	        		MemberOverview member = listArr.get(i);
	        		count++;
	        		JSONObject json = new JSONObject();
	        		json.put("id",member.getChannel_detail_id());
	        		json.put("no",count);
	        		String channel="";
	        		int channel_id=member.getType();
	        		if(channel_id==1){
	        			channel="Facebook Profile";

	        		}
 	        		else if(channel_id==2){
	        			channel="Facebook Page";
	        		}
	        		else
	        		channel="Twitter Profile";
	        		json.put("channel",channel);
	        		json.put("channel_user", member.getChannel_user());
	        		Date create_date = (Date)formatter.parse(member.getCreate_date());
	        		json.put("create_date", formatter.format(create_date));
	        		//json.put("create_date", member.getCreate_date());
	        		json.put("analysis", "<a href='javascript:void(0)' onclick='analysisOverview("+'"'+member.getChannel_detail_id()+'"'+","+'"'+member.getPchannel_id()+'"'+","+'"'+channel_id+'"'+")'>Analysis</a>");
	        		json.put("delete", "<a href='javascript:void(0)' onclick='deleteChannel("+'"'+member.getUser_id()+'"'+","+'"'+member.getChannel_detail_id()+'"'+")'>Delete</a>");

	            jsonArray.put(i,json);
	        	}
	        	jsonReturn=jsonArray;
		}
		else  if(action.equals("group")){
			 JSONArray jsonArray = new JSONArray();
	        	ArrayList<MemberOverview> listArr = memberDAO.selectUserTeammember(team_id);
	        	int count=0;
	        	for (int i = 0; i < listArr.size() ; i++) {
	        		MemberOverview member = listArr.get(i);
	        		count++;
	        		JSONObject json = new JSONObject();
	        		json.put("id",member.getUser_id());
	        		json.put("no",count);
	        		String role=member.getDivision();
	        		String division ="";
	        		if(role.equals("0"))
	        		{
	        			division="Team Members";
	        		}
	        		else if(role.equals("1")){
	        			division="Owner";
	        		}
	        		else if(role.equals("2")){
	        			division="Administrator";
	        		}
	        		else
	        		{
	        			division="Client";
	        		}
	        		json.put("division",division);
	        		json.put("name",member.getName());
	        		json.put("email", member.getEmail());
	        		Date create_date = (Date)formatter.parse(member.getCreate_date());
	        		json.put("create_date", formatter.format(create_date));
	        		json.put("edit", "<a href='#' onclick='editUserOverview("+'"'+ member.getUser_id()+'"'+")' data-target='#popup-edit-member' data-toggle='modal'>Edit</a>");
	        		json.put("delete", "<a href='javascript:void(0)' onclick='deleteUser("+'"'+ member.getUser_id()+'"'+")'>Delete</a>");//"delete_choise('+"'"+source[i].channel_detail_id+"'"+')"
	        		
	    
	            jsonArray.put(i,json);
	        	}
	        	jsonReturn=jsonArray;
		}
		else if(action.equals("content"))
		{
			JSONArray jsonArray = new JSONArray();
        	ArrayList<MemberOverview> listArr = memberDAO.selectNumberContent(date_from,date_to,user_id);
        	int count=0;
        	for (int i = 0; i < listArr.size() ; i++) {
        		MemberOverview member = listArr.get(i);
        		count++;
        		JSONObject json = new JSONObject();
        		json.put("no",count);
        		String channel="";
        		String type_content="";
        		int status_id=member.getStatus_id();
        		int channel_id=member.getType();
        		if(channel_id==1){
        			channel="Facebook Profile";

        		}
	        		else if(channel_id==2){
        			channel="Facebook Page";
        		}
        		else
        			channel="Twitter Profile";
        		json.put("channel",channel);
        		
        		json.put("name",member.getChannel_user());
        		if(status_id==1){
        			type_content="Draft";
        		}
        		else if(status_id==2){
        			type_content="Scheduled";
        		}
        		if(status_id==3){
        			type_content="Sent";
        		}
        		json.put("type", type_content);
        		json.put("number", member.getNumber());
        		json.put("channel_detail_id", member.getChannel_detail_id());
            jsonArray.put(i,json);
        	}
        	jsonReturn=jsonArray;
		}
		else if(action.equals("contentall"))
		{
			JSONArray jsonArray = new JSONArray();
        	ArrayList<MemberOverview> listArr = memberDAO.selectNumberContentAll(user_id);
        	int count=0;
        	for (int i = 0; i < listArr.size() ; i++) {
        		MemberOverview member = listArr.get(i);
        		count++;
        		JSONObject json = new JSONObject();
        		json.put("no",count);
        		String channel="";
        		String type_content="";
        		int status_id=member.getStatus_id();
        		int channel_id=member.getType();
        		if(channel_id==1){
        			channel="Facebook Profile";

        		}
	        		else if(channel_id==2){
        			channel="Facebook Page";
        		}
        		else
        			channel="Twitter Profile";
        		json.put("channel",channel);
        		
        		json.put("name",member.getChannel_user());
        		if(status_id==1){
        			type_content="Draft";
        		}
        		else if(status_id==2){
        			type_content="Scheduled";
        		}
        		if(status_id==3){
        			type_content="Sent";
        		}
        		json.put("type", type_content);
        		json.put("number", member.getNumber());
        		json.put("channel_detail_id", member.getChannel_detail_id());
            jsonArray.put(i,json);
        	}
        	jsonReturn=jsonArray;
		}
		else
		{
			 ArrayList<MemberOverview> listArr= memberDAO.getUserInfor(user_id);
			 JSONArray jsonArray = new JSONArray();
				for (int i = 0; i < listArr.size() ; i++) {
					MemberOverview listgroup = listArr.get(i);
					JSONObject json = new JSONObject();
					 long date_start=listgroup.getDate_start();
					    Date date_date_start=new Date(date_start);
					    String str_date_start = formatter.format(date_date_start);
					    long date_expired=listgroup.getDate_expired();
					    Date date_date_expired=new Date(date_expired);
					    String str_date_expired = formatter.format(date_date_expired);
					//json.put("user_id",listgroup.getUser_id());
					json.put("name", listgroup.getName());
					Date create_date = (Date)formatter.parse(listgroup.getCreate_date());
	        		json.put("create_date", formatter.format(create_date));
					//json.put("create_date", listgroup.getCreate_date());
					json.put("email", listgroup.getEmail());
					json.put("cell_phone", listgroup.getCell_phone());
					json.put("industry", listgroup.getIndustry());
					json.put("company_website", listgroup.getWebsite());
					json.put("company_address", listgroup.getAddress_company());
					json.put("company_name", listgroup.getCompany());
					json.put("date_start", str_date_start);
					json.put("date_expired", str_date_expired);
					
				    jsonArray.put(i,json);
				} 
				jsonReturn=jsonArray;
		}
		  
      
	
}
catch(Exception e){
	
}
%>
<%=jsonReturn%>