<%@ page language="java" contentType="application/json; charset=utf-8" pageEncoding="utf-8"%>
 <%@page import="java.text.*"%>
<%@ page import="java.util.Date"%>
 <%@ page import="com.andwise.common.*" %>
<%@ page import="org.springframework.context.ApplicationContext" %>
<%@ page import="org.springframework.context.support.ClassPathXmlApplicationContext" %>
<%@ page import="com.andwise.channel.dao.ChannelDetailDao" %>
<%@ page import="com.andwise.channel.model.ChannelDetail" %>
 <%@ page import="org.springframework.web.context.support.*"%>
<%@ page import="com.andwise.common.*" %>
<%@page import="org.json.*"%>
<%@page import="java.util.ArrayList"%>
 <%@include file="../../module/view/common/Permission.jsp"%>
<%
String token="";
String token_secret="";
String sdate_to="";
String sdate_from="";
long last_day_from=0;
String action ="";
String list_data="";
String channel_detail_id="";
String type="twitter";
int paging=0;
DateFormat formatter = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
Date dt = new Date();
sdate_to = formatter.format(dt);
sdate_from = formatter.format(dt);
if(request.getParameter("channel_detail_id")!=null)
	channel_detail_id= request.getParameter("channel_detail_id");
if(request.getParameter("paging")!=null)
	paging= Integer.parseInt(request.getParameter("paging"));
if(request.getParameter("token")!=null)
	token=request.getParameter("token");
if(request.getParameter("token_secret")!=null)
	token_secret= request.getParameter("token_secret");
if(request.getParameter("DateFrom")!=null)
{
	sdate_from= request.getParameter("DateFrom");
	sdate_from =sdate_from+" 00:00:00";
	}
	
if(request.getParameter("DateTo")!=null)
{
	sdate_to=request.getParameter("DateTo");
	sdate_to =sdate_to+" 00:00:00";
	}
if(request.getParameter("Action")!=null){
	action= request.getParameter("Action");
}
if(request.getParameter("type")!=null){
	type= request.getParameter("type");
}
Date date_from = new Date();
date_from = (Date)formatter.parse(sdate_from);
long ldate_from = date_from.getTime();

Date date_to = new Date();//(Date)formatter.parse(strdate[0]);
date_to = (Date)formatter.parse(sdate_to);
long ldate_to = date_to.getTime()+(25*60*60*1000);

 last_day_from =ldate_from - (ldate_to - ldate_from);
 long last_date_to=ldate_from-(60*1000);
TwitterApi tw=new TwitterApi();
try{
	JSONArray jsonReturn = new JSONArray();
    ApplicationContext appContext =  ApplicationContextProvider.getGlobalContext(this.getServletContext());
    ChannelDetailDao channelDetailDAO=(ChannelDetailDao)appContext.getBean("channelDetailDAO");
	if(action.equals("top"))
	 list_data =tw.getTopTwitter(token,token_secret,ldate_from,ldate_to);
	else if(action.equals("getfollower"))
	{
		
		ArrayList<ChannelDetail> listArr = channelDetailDAO.selectFollower(channel_detail_id,user_id,ldate_from,ldate_to,type);
		JSONArray jsonArray = new JSONArray();
		//DateFormat formatter_folower = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
	
		for (int i = 0; i < listArr.size() ; i++) {
			ChannelDetail channelDetail = listArr.get(i);
			JSONObject json = new JSONObject();
			  Date date=new Date(channelDetail.getDate_long());
			    String date_follower = formatter.format(date);
			json.put("day", date_follower);
			json.put("follower", channelDetail.getFollower());
		    json.put("following", channelDetail.getFollowing());
            jsonArray.put(i,json);
		}
		list_data= jsonArray.toString();
	}
	else if(action.equals("getfb"))
	{
		
		ArrayList<ChannelDetail> listArr = channelDetailDAO.selectFollower(channel_detail_id,user_id,last_day_from,ldate_to,type);
		JSONArray jsonArray = new JSONArray();
		//DateFormat formatter_folower = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
		for (int i = 0; i < listArr.size() ; i++) {
			ChannelDetail channelDetail = listArr.get(i);
			JSONObject json = new JSONObject();
			 // Date date=new Date(channelDetail.getDate_long());
			   // String date_follower = formatter.format(date);
			json.put("day", channelDetail.getDate_long());
			json.put("follower", channelDetail.getFollower());
		    json.put("following", channelDetail.getFollowing());
		    json.put("friendsoffan", channelDetail.getFriendsoffan());
            jsonArray.put(i,json);
		}
		list_data= jsonArray.toString();
	}
	else 
		list_data =tw.getLastTwitter(token,token_secret,last_day_from,last_date_to,paging);

}
catch(Exception e){
	
}

%>
<%=list_data%>