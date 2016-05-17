<%@ page language="java" contentType="application/json; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.text.*"%>
<%@ page import="java.io.*"%>
<%@ page import="java.util.*"%>
<%@ page import="java.net.*"%>
<%@ page import="org.springframework.context.ApplicationContext" %>
<%@ page import="org.springframework.context.support.ClassPathXmlApplicationContext" %>
<%@ page import="com.andwise.channel.dao.ChannelDetailDao" %>
<%@ page import="com.andwise.channel.model.ChannelDetail" %>
<%@ page import="com.andwise.common.*" %>
<%@ page import="java.net.HttpURLConnection"%>
<%@include file="../../module/view/common/Permission.jsp"%>
<% 
String token="";
int channe_id=0;
String channel_user="";
String decodedString="";
String token_live="";
String channel_picture="";
String channel_detail_id="";
String pchannel_detail_id="";
String action="";
long last_view=0;
String create_date="";
String channel_user_new="";
int load_option=0;
try
{
if(request.getParameter("Action")!=null)
	action=request.getParameter("Action");
if(request.getParameter("channel_detail_id")!=null)
	channel_detail_id=request.getParameter("channel_detail_id");
if(request.getParameter("channel_id")!=null)
	channe_id = Integer.parseInt(request.getParameter("channel_id"));
if(request.getParameter("channel_user")!=null)
	channel_user = request.getParameter("channel_user");
if(request.getParameter("pchannel_detail_id")!=null)
	pchannel_detail_id = request.getParameter("pchannel_detail_id");
if(request.getParameter("channel_picture")!=null)
	channel_picture = request.getParameter("channel_picture");
String gmt="";
if(session.getAttribute("SessionGmt")!=null){
	gmt=(String)session.getAttribute("SessionGmt");
}
DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
Date date = new Date();
formatter.setTimeZone(TimeZone.getTimeZone(gmt));
create_date=formatter.format(date);
Date currentdate=(Date)formatter.parse(formatter.format(date));
last_view= currentdate.getTime();
ApplicationContext appContext =  ApplicationContextProvider.getGlobalContext(this.getServletContext());
ChannelDetailDao channelDetailDAO=(ChannelDetailDao)appContext.getBean("channelDetailDAO");
if(action.equals("twitter")){
	if(request.getParameter("twitter_exchange_token")!=null)
		token_live=request.getParameter("twitter_exchange_token");
	channelDetailDAO.saveChannelDetail(channel_detail_id,channe_id,user_id,channel_user,token_live,channel_picture,pchannel_detail_id,last_view,create_date);
	out.println("ok");
}
else if(action.equals("update")){
	channelDetailDAO.updateLastview(channel_detail_id,user_id,last_view);
	out.println("ok");
}
else if(action.equals("updateload")){
	if(request.getParameter("load_option")!=null){
		load_option	=Integer.parseInt(request.getParameter("load_option"));
	}
	channelDetailDAO.updateLoadOption(channel_detail_id,user_id,load_option);
	out.println("ok");
}
else if(action.equals("checktoken")){
	String token_user = channelDetailDAO.selectTokenUser(pchannel_detail_id);
	out.println(token_user);
}
else 
{
	ConfigTable cfTable = ConfigFactory.getInstance();
	if(action.equals("facebookprofile")){
		if(request.getParameter("fb_exchange_token")!=null)
		token=request.getParameter("fb_exchange_token");
		String api=cfTable.getValue("fb_consumer_key");
		String token_secret =cfTable.getValue("fb_consumer_secret");
		String url_api="https://graph.facebook.com/oauth/access_token?client_id="+api+"&client_secret="+token_secret+"&grant_type=fb_exchange_token"+"&fb_exchange_token="+token;
		URL long_token = new URL(url_api);
		StringBuffer text = new StringBuffer();
		HttpURLConnection connection = (HttpURLConnection)long_token.openConnection();
		connection.setRequestMethod("GET");

		BufferedReader in = new BufferedReader(
		        new InputStreamReader(
		        connection.getInputStream()));

		if ((decodedString=in.readLine()) != null) {
			String temp[]= decodedString.split("&");
			String tk[]= temp[0].split("=");
			token_live= tk[1];
			session.setAttribute("SessionToken",token_live);
		}
		in.close();
		channelDetailDAO.saveChannelDetail(channel_detail_id,channe_id,user_id,channel_user,token_live,channel_picture,pchannel_detail_id,last_view,create_date);
		out.println("ok");
		}
	else
	{
		String token_user = channelDetailDAO.selectTokenUser(pchannel_detail_id);
		if(token_user.equals("")){
				if(request.getParameter("fb_exchange_token")!=null)
				token=request.getParameter("fb_exchange_token");
				String api=cfTable.getValue("fb_consumer_key");
				String token_secret =cfTable.getValue("fb_consumer_secret");
				String url_api="https://graph.facebook.com/oauth/access_token?client_id="+api+"&client_secret="+token_secret+"&grant_type=fb_exchange_token"+"&fb_exchange_token="+token;
				URL long_token = new URL(url_api);
				StringBuffer text = new StringBuffer();
				HttpURLConnection connection = (HttpURLConnection)long_token.openConnection();
				connection.setRequestMethod("GET");

				BufferedReader in = new BufferedReader(
				        new InputStreamReader(
				        connection.getInputStream()));

				if ((decodedString=in.readLine()) != null) {
					String temp[]= decodedString.split("&");
					String tk[]= temp[0].split("=");
					token_live= tk[1];
					session.setAttribute("SessionToken",token_live);
				}
				in.close();
				channelDetailDAO.saveChannelDetail(channel_detail_id,channe_id,user_id,channel_user,token_live,channel_picture,pchannel_detail_id,last_view,create_date);
				out.println("ok");
		}
		else
		{
			channelDetailDAO.saveChannelPageDetail(channel_detail_id,channe_id,user_id,channel_user,token_user,channel_picture,pchannel_detail_id,last_view,create_date);
			out.println("ok");
		}
	}
	}


	
	

}
catch(Exception e)
{
	out.println("error");
}
	
%>