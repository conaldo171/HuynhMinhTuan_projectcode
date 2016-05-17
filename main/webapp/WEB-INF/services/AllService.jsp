<%@ page language="java" contentType="application/json; charset=utf-8" pageEncoding="utf-8"%>
<%@page import="java.util.ArrayList"%>
<%@page import="org.json.*"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.text.*"%>
<%@ page import="java.util.*"%>
<%@ page import="com.andwise.common.*" %>
<%@ page import="org.springframework.context.ApplicationContext" %>
<%@ page import="org.springframework.context.support.ClassPathXmlApplicationContext" %>
<%@ page import="com.andwise.content.dao.DraftAndScheduleDao" %>
<%@ page import="com.andwise.content.model.DraftAndSchedule" %>
<%@include file="../../module/view/common/Permission.jsp"%>
<%

int status_id=0;
String action="";
String gmt="";
ConfigTable cfTable = ConfigFactory.getInstance();
if(request.getParameter("Action")!=null){
	action= request.getParameter("Action");
}
if(session.getAttribute("SessionGmt")!=null){
	gmt=(String)session.getAttribute("SessionGmt");
}
try
{
	String server_address=cfTable.getValue("server_address");
    String upload_image_url =cfTable.getValue("upload_image_url");
    String url_image=server_address+upload_image_url;
	JSONArray jsonReturn = new JSONArray();
	ApplicationContext appContext =  ApplicationContextProvider.getGlobalContext(this.getServletContext());
    DraftAndScheduleDao allDAO=(DraftAndScheduleDao)appContext.getBean("draftAndScheduleDAO");
	if(action.equals("all"))
    {
    	ArrayList<DraftAndSchedule> allArr = allDAO.selectAllMessage(user_id,administrator,team_id);
    	 DateFormat formatter = new SimpleDateFormat("E  MMM dd, yyyy 'at' HH:mm a");
    	 formatter.setTimeZone(TimeZone.getTimeZone(gmt));
		JSONArray jsonArray = new JSONArray();
		for (int i = 0; i < allArr.size() ; i++) {
			DraftAndSchedule all = allArr.get(i);
			JSONObject json = new JSONObject();
			 long send_date=all.getSend_date();
			    Date date=new Date(send_date);
			    String sendate = formatter.format(date);
			json.put("message_id",all.getMessage_id());
			json.put("content",all.getContent());
			json.put("create_date",all.getCreate_date());
			json.put("channel_user",all.getChannel_user());
			json.put("channel_picture",all.getChannel_picture());
			json.put("user_name",all.getUser_name());
			json.put("channel_id",all.getChannel_id());
			json.put("channel_detail_id", all.getChannel_detail_id() );
			json.put("send_date", sendate);
			json.put("status_id", all.getStatus_id());
			json.put("file_name",all.getFile_name());
			json.put("url_image",url_image);
			json.put("file_id",all.getFile_id());
		    jsonArray.put(i,json);
		   
		}
		jsonReturn =jsonArray;	
    }
	else if(action.equals("filterbydate"))
    {
		String filterDate="";
		if(request.getParameter("filterDate")!=null){
			filterDate= request.getParameter("filterDate");	
		}
		String start_date=filterDate+" 00:00:00";
		String end_date=filterDate+" 24:00:00";
		DateFormat formatterLong = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date start_d = (Date)formatterLong.parse(start_date);
		Date end_d = (Date)formatterLong.parse(end_date);
		start_d = (Date)formatterLong.parse(formatterLong.format(start_d));
		end_d = (Date)formatterLong.parse(formatterLong.format(end_d));
	 	long lStart_Date = start_d.getTime();
	  	long lEnd_Date= end_d.getTime();
		 
    	ArrayList<DraftAndSchedule> draftArr = allDAO.selectFilterMessageAllByDate(user_id,administrator,lStart_Date,lEnd_Date,team_id);
    	DateFormat formatter = new SimpleDateFormat("E  MMM dd, yyyy 'at' HH:mm a");
    	 formatter.setTimeZone(TimeZone.getTimeZone(gmt));
    	JSONArray jsonArray = new JSONArray();
		for (int i = 0; i < draftArr.size() ; i++) {
			DraftAndSchedule draft = draftArr.get(i);
			JSONObject json = new JSONObject();
			 long send_date=draft.getSend_date();
			    Date date=new Date(send_date);
			    String sendate = formatter.format(date);
			json.put("message_id",draft.getMessage_id());
			json.put("content",draft.getContent());
			json.put("create_date",draft.getCreate_date());
			json.put("channel_user",draft.getChannel_user());
			json.put("channel_picture",draft.getChannel_picture());
			json.put("user_name",draft.getUser_name());
			json.put("channel_id",draft.getChannel_id());
			json.put("channel_detail_id", draft.getChannel_detail_id() );
			json.put("status_id", draft.getStatus_id());
			json.put("send_date", sendate);
			json.put("file_name",draft.getFile_name());
			json.put("url_image",url_image);
			json.put("file_id",draft.getFile_id());
		    jsonArray.put(i,json);
		   
		}
		jsonReturn =jsonArray;	
    }
	else if(action.equals("loadMoreAll"))
    {
		int msg_id=0;
		if(request.getParameter("message_id")!=null)
    		msg_id = Integer.parseInt(request.getParameter("message_id"));
    	ArrayList<DraftAndSchedule> allArr = allDAO.selectLoadMoreAllMessage(user_id,administrator,msg_id, team_id);
    	 DateFormat formatter = new SimpleDateFormat("E  MMM dd, yyyy 'at' HH:mm a");
    	 formatter.setTimeZone(TimeZone.getTimeZone(gmt));
    	 JSONArray jsonArray = new JSONArray();
		for (int i = 0; i < allArr.size() ; i++) {
			DraftAndSchedule all = allArr.get(i);
			JSONObject json = new JSONObject();
			 long send_date=all.getSend_date();
			    Date date=new Date(send_date);
			    String sendate = formatter.format(date);
			json.put("message_id",all.getMessage_id());
			json.put("content",all.getContent());
			json.put("create_date",all.getCreate_date());
			json.put("channel_user",all.getChannel_user());
			json.put("channel_picture",all.getChannel_picture());
			json.put("user_name",all.getUser_name());
			json.put("channel_id",all.getChannel_id());
			json.put("channel_detail_id", all.getChannel_detail_id() );
			json.put("send_date", sendate);
			json.put("status_id", all.getStatus_id());
			json.put("file_name",all.getFile_name());
			json.put("url_image",url_image);
			json.put("file_id",all.getFile_id());
		    jsonArray.put(i,json);
		   
		}
		jsonReturn =jsonArray;	
    }
    else if(action.equals("deleteMessageDetail")){
    	int msg_id=0;
    	String channel_detail_id="";
    	if(request.getParameter("message_id")!=null)
    		msg_id = Integer.parseInt(request.getParameter("message_id"));
    	if(request.getParameter("channel_detail_id")!=null)
    		channel_detail_id=request.getParameter("channel_detail_id");
    	allDAO.deleteMessageDetail(msg_id,channel_detail_id);	
    }
   

    out.println(jsonReturn);
}
catch(Exception e)
{
	
}
%>