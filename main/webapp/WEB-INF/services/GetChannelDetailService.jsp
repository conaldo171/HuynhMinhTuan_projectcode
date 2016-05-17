<%@ page language="java" contentType="application/json; charset=utf-8" pageEncoding="utf-8"%>
<%@page import="java.util.ArrayList"%>
<%@page import="org.json.*"%>
<%@page import="java.text.*"%>
<%@ page import="java.util.Date"%>
<%@ page import="org.springframework.context.ApplicationContext" %>
<%@ page import="org.springframework.context.support.ClassPathXmlApplicationContext" %>
<%@ page import="com.andwise.channel.dao.ChannelDetailDao" %>
<%@ page import="com.andwise.channel.model.ChannelDetail" %>
 <%@ page import="org.springframework.web.context.support.*"%>
 <%@ page import="com.andwise.common.*" %>
 <%@include file="../../module/view/common/Permission.jsp"%>
   
<%
	
 	int msg_id=0;  
	String action="";
  String channel_id="";
   int type=0;
	//if(request.getParameter("user_id")!=null)
		//user_id= Integer.parseInt(request.getParameter("user_id"));
	if(request.getParameter("message_id")!=null)
		msg_id=Integer.parseInt(request.getParameter("message_id"));
	if(request.getParameter("Action")!=null)
		action= request.getParameter("Action");
	if(request.getParameter("channel_id")!=null)
		channel_id= request.getParameter("channel_id");
	if(request.getParameter("type")!=null)
		type=Integer.parseInt(request.getParameter("type"));
	try
	{
		JSONArray jsonReturn = new JSONArray();
	    ApplicationContext appContext =  ApplicationContextProvider.getGlobalContext(this.getServletContext());
	    ChannelDetailDao channelDetailDAO=(ChannelDetailDao)appContext.getBean("channelDetailDAO");
		if(action.equals("listschedule")){
			ArrayList<ChannelDetail> listArr = channelDetailDAO.selectPostSchedule(user_id,msg_id,administrator);
			JSONArray jsonArray = new JSONArray();
			for (int i = 0; i < listArr.size() ; i++) {
				ChannelDetail channelDetail = listArr.get(i);
				JSONObject json = new JSONObject();
				json.put("message_id", channelDetail.getMessage_id());
				json.put("channel_detail_id", channelDetail.getChannel_detail_id());
			    json.put("channel_user", channelDetail.getChannel_user());
			    json.put("token_user", channelDetail.getToken_user());
			    json.put("pchannel_id", channelDetail.getPchannel_id());
			    json.put("channel_id", channelDetail.getChannel_id() );
			    jsonArray.put(i,json);
			}
			jsonReturn=jsonArray;
		}
		else if(action.equals("listdate")){
			ArrayList<ChannelDetail> listArr = channelDetailDAO.selectListDate(msg_id,type);
			JSONArray jsonArray = new JSONArray();
			DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			for (int i = 0; i < listArr.size() ; i++) {
				ChannelDetail listdate = listArr.get(i);
				JSONObject json = new JSONObject();
				 Date date_schedule=new Date(listdate.getSend_date());
				    String sendate = formatter.format(date_schedule);
				json.put("send_date", sendate);
			    jsonArray.put(i,json);
			}
			jsonReturn =jsonArray;	
		}
		else if(action.equals("listassign")){
			String user_assign= "";
			if(request.getParameter("user_assign")!=null){
				user_assign =request.getParameter("user_assign");
			}
		  ArrayList<ChannelDetail> channelDetailArr = channelDetailDAO.selectChannelAssign(Integer.parseInt(user_assign),team_id);
			JSONArray jsonArray = new JSONArray();
			
			for (int i = 0; i < channelDetailArr.size() ; i++) {
				ChannelDetail channelDetail = channelDetailArr.get(i);
				JSONObject json = new JSONObject();
				json.put("channel_detail_id", channelDetail.getChannel_detail_id());
			    jsonArray.put(i,json);
			}
			jsonReturn=jsonArray;
		}
		else if(action.equals("category")){
		  ArrayList<ChannelDetail> categorylist = channelDetailDAO.selectCategory();
			JSONArray jsonArray = new JSONArray();
			for (int i = 0; i < categorylist.size() ; i++) {
				ChannelDetail channelDetail = categorylist.get(i);
				JSONObject json = new JSONObject();
				json.put("category_id", channelDetail.getCategory_id());
				json.put("category_name", channelDetail.getCategory_name());
			    jsonArray.put(i,json);
			}
			jsonReturn=jsonArray;
		}
		else if(action.equals("selectpost")){
			ArrayList<ChannelDetail> channelDetailArr = channelDetailDAO.selectChannelDetailSelectPost(user_id,administrator);
			
			JSONArray jsonArray = new JSONArray();
			
			for (int i = 0; i < channelDetailArr.size() ; i++) {
				ChannelDetail channelDetail = channelDetailArr.get(i);
				JSONObject json = new JSONObject();
				json.put("channel_id", channelDetail.getChannel_id() );
				json.put("channel_detail_id", channelDetail.getChannel_detail_id());
			    json.put("channel_user", channelDetail.getChannel_user());
			    json.put("select_post", channelDetail.getSelect_post());
			    json.put("channel_picture", channelDetail.getChannel_picture());
			    json.put("token_user", channelDetail.getToken_user());
			    json.put("pchannel_id", channelDetail.getPchannel_id());
			    json.put("user_id", channelDetail.getUser_id());
			    json.put("default_show", channelDetail.getDefault_show());
			    json.put("last_view", channelDetail.getLast_view());
			    json.put("load_option", channelDetail.getLoad_option());
			    json.put("default_channel_comment",channelDetail.getDefault_comment());
			    
			    jsonArray.put(i,json);
			}
			jsonReturn=jsonArray;
		}
		else if(action.equals("channel_comment")){
		ArrayList<ChannelDetail> channelDetailArr = channelDetailDAO.selectChannelPageTw(user_id,administrator,channel_id);
			
			JSONArray jsonArray = new JSONArray();
			
			for (int i = 0; i < channelDetailArr.size() ; i++) {
				ChannelDetail channelDetail = channelDetailArr.get(i);
				JSONObject json = new JSONObject();
				json.put("channel_id", channelDetail.getChannel_id() );
				json.put("channel_detail_id", channelDetail.getChannel_detail_id());
			    json.put("channel_user", channelDetail.getChannel_user());
			    json.put("channel_picture", channelDetail.getChannel_picture());
			    json.put("token_user", channelDetail.getToken_user());
			    json.put("pchannel_id", channelDetail.getPchannel_id());
			    jsonArray.put(i,json);
			}
			jsonReturn=jsonArray;
		}
		else
		{
			ArrayList<ChannelDetail> channelDetailArr = channelDetailDAO.selectChannelDetail(user_id,administrator,channel_id);
			
			JSONArray jsonArray = new JSONArray();
			
			for (int i = 0; i < channelDetailArr.size() ; i++) {
				ChannelDetail channelDetail = channelDetailArr.get(i);
				JSONObject json = new JSONObject();
				json.put("channel_id", channelDetail.getChannel_id() );
				json.put("channel_detail_id", channelDetail.getChannel_detail_id());
			    json.put("channel_user", channelDetail.getChannel_user());
			    json.put("select_post", channelDetail.getSelect_post());
			    json.put("channel_picture", channelDetail.getChannel_picture());
			    json.put("token_user", channelDetail.getToken_user());
			    json.put("pchannel_id", channelDetail.getPchannel_id());
			    json.put("user_id", channelDetail.getUser_id());
			    json.put("default_show", channelDetail.getDefault_show());
			    json.put("last_view", channelDetail.getLast_view());
			    json.put("load_option", channelDetail.getLoad_option());
			    json.put("default_channel_comment",channelDetail.getDefault_comment());
			    
			    jsonArray.put(i,json);
			}
			jsonReturn=jsonArray;
		}
		
				
			 
		out.println(jsonReturn);
		
	}
	catch(Exception e)
	{
		System.out.println(e);
	}
%>

