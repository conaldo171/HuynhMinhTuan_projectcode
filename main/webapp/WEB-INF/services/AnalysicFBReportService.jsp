<%@ page language="java" contentType="application/json; charset=utf-8" pageEncoding="utf-8"%>
 <%@page import="java.text.*"%>
<%@ page import="java.util.Date"%>
 <%@ page import="com.andwise.common.*" %>
<%@ page import="org.springframework.context.ApplicationContext" %>
<%@ page import="org.springframework.context.support.ClassPathXmlApplicationContext" %>
<%@ page import="com.andwise.analysis.dao.AnalysisReportDao" %>
<%@ page import="com.andwise.analysis.model.AnalysisReport" %>
 <%@ page import="org.springframework.web.context.support.*"%>
<%@ page import="com.andwise.common.*" %>
<%@page import="org.json.*"%>
<%@page import="java.util.ArrayList"%>
 <%@include file="../../module/view/common/Permission.jsp"%>
<%
String token="";
String token_secret="";

long last_day_from=0;
String action ="";
String list_data="";
String channel_detail_id="";
String type="twitter";
long start_date=0;
long end_date=0;
int paging=0;

if(request.getParameter("channel_detail_id")!=null)
	channel_detail_id= request.getParameter("channel_detail_id");
if(request.getParameter("paging")!=null)
	paging= Integer.parseInt(request.getParameter("paging"));
if(request.getParameter("token")!=null)
	token=request.getParameter("token");
if(request.getParameter("token_secret")!=null)
	token_secret= request.getParameter("token_secret");
if(request.getParameter("start_date")!=null)
{
	start_date = Long.parseLong(request.getParameter("start_date"));
	}
	
if(request.getParameter("end_date")!=null)
{
	end_date = Long.parseLong(request.getParameter("end_date"));
	}
if(request.getParameter("Action")!=null){
	action= request.getParameter("Action");
}

try{
	JSONArray jsonReturn = new JSONArray();
    ApplicationContext appContext =  ApplicationContextProvider.getGlobalContext(this.getServletContext());
   AnalysisReportDao analysisDAO=(AnalysisReportDao)appContext.getBean("analysisDAO");
 if(action.equals("fbstream"))
	{
		
		ArrayList<AnalysisReport> listArr = analysisDAO.selectFbStream(channel_detail_id,start_date,end_date);
		JSONArray jsonArray = new JSONArray();
		for (int i = 0; i < listArr.size() ; i++) {
			AnalysisReport analysisReport = listArr.get(i);
			JSONObject json = new JSONObject();
			JSONObject like_infor = new JSONObject();
			JSONObject comment_infor = new JSONObject();
			like_infor.put("like_count",analysisReport.getLike());
			comment_infor.put("comment_count",analysisReport.getComment());
			json.put("post_id", analysisReport.getPost_id());
			json.put("source_id", analysisReport.getChannel_detail_id());
		    json.put("message", analysisReport.getContent());
		    json.put("created_time", analysisReport.getCreate_date());
		    json.put("like_info", like_infor);
		    json.put("share_count", analysisReport.getShare());
		    json.put("comment_info",comment_infor );
		    json.put("like_of_comment", analysisReport.getComment_of_like());
		    json.put("permalink",analysisReport.getLink_to_post());
            jsonArray.put(json);
		}
		jsonReturn=jsonArray;
		out.println(jsonReturn);
	}
	else if(action.equals("twstream"))
	{
		ArrayList<AnalysisReport> listArr = analysisDAO.selectTwStream(channel_detail_id,start_date*1000,end_date*1000);
		JSONArray jsonArray = new JSONArray();
		for (int i = 0; i < listArr.size() ; i++) {
			AnalysisReport analysisReport = listArr.get(i);
			JSONObject json = new JSONObject();
			json.put("post_id", analysisReport.getPost_id());
			json.put("id", analysisReport.getChannel_detail_id());
		    json.put("text", analysisReport.getContent());
		    json.put("created_at", analysisReport.getCreate_date()/1000);
		    json.put("in_reply_to_status_id", analysisReport.getIn_reply_status_id());
		    json.put("favorite_count", analysisReport.getFavorite_count());
		    json.put("retweet_count",analysisReport.getRetweet_count());
		    json.put("user_mentions", analysisReport.getUser_mentions());
		    json.put("user_tweet_name",analysisReport.getScreen_name());
		    jsonArray.put(json);
		}
		jsonReturn=jsonArray;
		out.println(jsonReturn);
		
	}
	else if(action.equals("twreport"))
	{
		ArrayList<AnalysisReport> listArr = analysisDAO.selectTwReport(channel_detail_id,start_date,end_date);
		JSONArray jsonArray = new JSONArray();
		for (int i = 0; i < listArr.size() ; i++) {
			AnalysisReport analysisReport = listArr.get(i);
			JSONObject json = new JSONObject();
			json.put("create_date", analysisReport.getCreate_date());
			json.put("channel_detail_id", analysisReport.getChannel_detail_id());
		    json.put("followers", analysisReport.getFollowers());
		    json.put("following", analysisReport.getFollowing());
		    json.put("favourites", analysisReport.getFavourites());
		    jsonArray.put(json);
		}
		jsonReturn=jsonArray;
		out.println(jsonReturn);
		
	}
	else if(action.equals("fbreport"))
	{
		ArrayList<AnalysisReport> listArr = analysisDAO.selectFbReport(channel_detail_id,start_date,end_date);
		JSONArray jsonArray = new JSONArray();
		for (int i = 0; i < listArr.size() ; i++) {
			AnalysisReport analysisReport = listArr.get(i);
			JSONObject json = new JSONObject();
			json.put("create_date", analysisReport.getCreate_date());
			json.put("channel_detail_id", analysisReport.getChannel_detail_id());
		    json.put("friends", analysisReport.getFriends());
		    json.put("friendsoffan", analysisReport.getFriends_of_fan());
		    json.put("reach", analysisReport.getReach());
		    json.put("reach_week", analysisReport.getReach_week());
		    json.put("reach_month",analysisReport.getReach_month());
		    json.put("people_talking", analysisReport.getPeople_talking());
		    json.put("people_talking_week",analysisReport.getPeople_talking_week());
		    json.put("people_talking_month",analysisReport.getPeople_talking_month());
		    jsonArray.put(json);
		}
		jsonReturn=jsonArray;
		out.println(jsonReturn);
		
	}
}
catch(Exception e){
	
}

%>
