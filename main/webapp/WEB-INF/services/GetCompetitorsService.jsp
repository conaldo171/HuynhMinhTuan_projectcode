<%@ page language="java" contentType="application/json; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.text.*"%>
<%@ page import="java.util.*"%>
<%@page import="java.util.ArrayList"%>
<%@page import="org.json.*"%>
<%@ page import="org.springframework.context.ApplicationContext" %>
<%@ page import="org.springframework.context.support.ClassPathXmlApplicationContext" %>
<%@ page import="com.andwise.competitors.dao.CompetitorsDao" %>
<%@ page import="com.andwise.competitors.model.Competitors" %>
<%@ page import="com.andwise.common.*" %>
<%@include file="../../module/view/common/Permission.jsp"%>
<%
long last_view=0;
long lcreate_date=0;
int type=0;
String action="";
long start_date=0;
long end_date=0;
String channel_id="";
if(request.getParameter("type")!=null){
	type= Integer.parseInt(request.getParameter("type"));
}
if(request.getParameter("start_date")!=null){
	start_date= Long.parseLong(request.getParameter("start_date"));
}
if(request.getParameter("end_date")!=null){
	end_date= Long.parseLong(request.getParameter("end_date"));
}
if(request.getParameter("channel_id")!=null){
	channel_id=request.getParameter("channel_id");
}
if(request.getParameter("Action")!=null){
	action=request.getParameter("Action");
}
try
	{
		ConfigTable cfTable = ConfigFactory.getInstance();
		JSONArray jsonReturn = new JSONArray();
		 ApplicationContext appContext =  ApplicationContextProvider.getGlobalContext(this.getServletContext());
		 CompetitorsDao competitorsDAO=(CompetitorsDao)appContext.getBean("competitorsDAO");
		 if(action.equals("fbtw")){
			 ArrayList<Competitors> competitorsArr = competitorsDAO.selectFbTwCompetitors(channel_id,start_date, end_date,type);
				JSONArray jsonArray = new JSONArray();
				for (int i = 0; i < competitorsArr.size() ; i++) {
					Competitors competitors = competitorsArr.get(i);
					JSONObject json = new JSONObject();
					long create_date=competitors.getCreate_date();
				    Date date=new Date(create_date);
				    //String sendate = fhannormatter.format(date);
					json.put("channel_id", competitors.getChannel_id() );
					json.put("fan",competitors.getFan());
					json.put("people_talking",competitors.getPeople_talking());
					json.put("follower", competitors.getFollower());
				    json.put("following", competitors.getFollowing());
				    json.put("create_date", competitors.getCreate_date());
 
	     		    jsonArray.put(json);
				}
				jsonReturn=jsonArray;
				
			
				out.println(jsonReturn);
		 }
		 else
		 {
			 ArrayList<Competitors> competitorsArr = competitorsDAO.selectCompetitors(user_id,type);
				JSONArray jsonArray = new JSONArray();
				DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
				for (int i = 0; i < competitorsArr.size() ; i++) {
					Competitors competitors = competitorsArr.get(i);
					JSONObject json = new JSONObject();
					long create_date=competitors.getCreate_date();
				    Date date=new Date(create_date);
				    //String sendate = formatter.format(date);
					json.put("competitors_id", competitors.getCompetitors_id() );
					json.put("page_name1",competitors.getPage_name1());
					json.put("page_name2",competitors.getPage_name2());
					json.put("page_name", competitors.getPage_name1()+" vs "+competitors.getPage_name2());
				    json.put("type", competitors.getType());
				    json.put("page_id1",competitors.getChannel_detail_id1());
				    json.put("page_id2",competitors.getChannel_detail_id2());
				    json.put("create_date", formatter.format(date));
				    json.put("avatar_tw1",competitors.getAvatar_tw1());
				    json.put("avatar_tw2",competitors.getAvatar_tw2());
				    json.put("compare", "<a href='javascript:void(0)' onclick='comparePage("+'"'+competitors.getChannel_detail_id1()+'"'+","+'"'+competitors.getChannel_detail_id2()+'"'+","+'"'+competitors.getPage_name1()+'"'+","+'"'+competitors.getPage_name2()+'"'+","+'"'+competitors.getAvatar_tw1()+'"'+","+'"'+competitors.getAvatar_tw2()+'"'+")'>Compare</a>");
				    json.put("delete", "<a href='javascript:void(0)' onclick='deleteCompetitors("+'"'+competitors.getCompetitors_id()+'"'+")'>Delete</a>");
				   
	     		    jsonArray.put(i,json);
				}
				jsonReturn=jsonArray;
				
			
				out.println(jsonReturn);
		 }
		 
		
			
	}
	catch(Exception e)
	{
		out.println(e);
	}

%>
