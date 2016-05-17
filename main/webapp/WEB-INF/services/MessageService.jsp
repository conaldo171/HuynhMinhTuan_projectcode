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
if(request.getParameter("status_id")!=null)
	status_id=Integer.parseInt(request.getParameter("status_id"));
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
	//ApplicationContext context = new ClassPathXmlApplicationContext("Spring-Module.xml");   	 
	//DraftAndScheduleDao drafDAO = (DraftAndScheduleDao) context.getBean("draftAndScheduleDAO");
    ApplicationContext appContext =  ApplicationContextProvider.getGlobalContext(this.getServletContext());
    DraftAndScheduleDao drafDAO=(DraftAndScheduleDao)appContext.getBean("draftAndScheduleDAO");
	
	if(action.equals("draft"))
    {
    	ArrayList<DraftAndSchedule> draftArr = drafDAO.selectDraftMessage(user_id,status_id,administrator,team_id);
    	 DateFormat formatter = new SimpleDateFormat("E  MMM dd, yyyy 'at' hh:mm a");
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
			json.put("send_date", sendate);
			json.put("file_name",draft.getFile_name());
			json.put("url_image",url_image);
			json.put("file_id",draft.getFile_id());
		    jsonArray.put(i,json);
		   
		}
		jsonReturn =jsonArray;	
    }
	else if(action.equals("loadMoreDraft"))
    { 
		int msg_id=0;
		if(request.getParameter("message_id")!=null)
    		msg_id = Integer.parseInt(request.getParameter("message_id"));
    	ArrayList<DraftAndSchedule> draftArr = drafDAO.selectLoadMoreDraftMessage(user_id,status_id,administrator,msg_id,team_id);
    	 DateFormat formatter = new SimpleDateFormat("E  MMM dd, yyyy 'at' hh:mm a");
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
			json.put("channel_detail_id", draft.getChannel_detail_id());
			json.put("send_date", sendate);
			json.put("file_name",draft.getFile_name());
			json.put("url_image",url_image);
			json.put("file_id",draft.getFile_id());
		    jsonArray.put(i,json);
		   
		}
		jsonReturn =jsonArray;	
    }
	 else if(action.equals("count")){
		 ArrayList<DraftAndSchedule> listArr= drafDAO.getCountMessage(user_id,administrator);
		 JSONArray jsonArray = new JSONArray();
			for (int i = 0; i < listArr.size() ; i++) {
				DraftAndSchedule list = listArr.get(i);
				JSONObject json = new JSONObject();
				json.put("count_number", list.getCount_number());
			    jsonArray.put(i,json);
			} 
			jsonReturn=jsonArray;
	 }
    else if(action.equals("saveMessageDetail")){
    	int msg_id=0;
    	String channel_detail_id="";
    	if(request.getParameter("message_id")!=null)
    		msg_id = Integer.parseInt(request.getParameter("message_id"));
    	if(request.getParameter("channel_detail_id")!=null)
    		channel_detail_id=request.getParameter("channel_detail_id");
    	drafDAO.saveMessageDetail(msg_id,channel_detail_id,user_id);
    }
    else if(action.equals("deleteMessageDetail")){
    	int msg_id=0;
    	String channel_detail_id="";
    	if(request.getParameter("message_id")!=null)
    		msg_id = Integer.parseInt(request.getParameter("message_id"));
    	if(request.getParameter("channel_detail_id")!=null)
    		channel_detail_id=request.getParameter("channel_detail_id");
    	drafDAO.deleteMessageDetail(msg_id,channel_detail_id);	
    }
    else if(action.equals("filter")){
    	String channel_detail_id="";
    	if(request.getParameter("channel_detail_id")!=null && request.getParameter("channel_detail_id")!="")
    	channel_detail_id=request.getParameter("channel_detail_id");
    	channel_detail_id=channel_detail_id.replace("'","");
    	if(channel_detail_id.equals(""))
    		channel_detail_id="0";
    	session.setAttribute("SessionFilterDraft",channel_detail_id);
    	if(request.getParameter("status_id")!=null)
    		status_id =Integer.parseInt(request.getParameter("status_id"));
    	ArrayList<DraftAndSchedule> draftArr = drafDAO.selectFilterMessage(user_id,channel_detail_id,status_id,administrator,team_id);
   	 DateFormat formatter = new SimpleDateFormat("E  MMM dd, yyyy 'at' hh:mm a");
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
			json.put("status_id", draft.getStatus_id() );
			json.put("send_date", sendate);
			json.put("file_name",draft.getFile_name());
			json.put("url_image",url_image);
			json.put("file_id",draft.getFile_id());
		    jsonArray.put(i,json);
    }
		jsonReturn =jsonArray;	
    }
    else if(action.equals("filtermember")){
    	String user_list_id="";
    	if(request.getParameter("user_id_list")!=null && request.getParameter("user_id_list")!="")
    		user_list_id=request.getParameter("user_id_list");
    	user_list_id=user_list_id.replace("'","");
    	if(user_list_id.equals(""))
    		user_list_id="0";
    	session.setAttribute("SessionFilterMember",user_list_id);
    	if(request.getParameter("status_id")!=null)
    		status_id =Integer.parseInt(request.getParameter("status_id"));
    	ArrayList<DraftAndSchedule> draftArr = drafDAO.selectFilterMemberMessage(user_id,user_list_id,status_id,administrator,team_id);
   	 DateFormat formatter = new SimpleDateFormat("E  MMM dd, yyyy 'at' hh:mm a");
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
			json.put("status_id", draft.getStatus_id() );
			json.put("send_date", sendate);
			json.put("file_name",draft.getFile_name());
			json.put("url_image",url_image);
			json.put("file_id",draft.getFile_id());
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
		formatterLong.setTimeZone(TimeZone.getTimeZone(gmt));
		Date start_d = (Date)formatterLong.parse(start_date);
		Date end_d = (Date)formatterLong.parse(end_date);
		start_d = (Date)formatterLong.parse(formatterLong.format(start_d));
		end_d = (Date)formatterLong.parse(formatterLong.format(end_d));
	 	long lStart_Date = start_d.getTime();
	  	long lEnd_Date= end_d.getTime();
		 
    	ArrayList<DraftAndSchedule> draftArr = drafDAO.selectFilterScheduleByDate(user_id,status_id, administrator,lStart_Date,lEnd_Date,team_id);
    	DateFormat formatter = new SimpleDateFormat("E  MMM dd, yyyy 'at' hh:mm a");
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
    else if(action.equals("filterLoadMore")){
    	String channel_detail_id="";
    	int msg_id=0;
		if(request.getParameter("message_id")!=null)
    		msg_id = Integer.parseInt(request.getParameter("message_id"));
    	if(request.getParameter("channel_detail_id")!=null && request.getParameter("channel_detail_id")!="")
    	channel_detail_id=request.getParameter("channel_detail_id");
    	channel_detail_id=channel_detail_id.replace("'","");
    	if(channel_detail_id.equals(""))
    		channel_detail_id="0";
    	session.setAttribute("SessionFilterDraft",channel_detail_id);
    	if(request.getParameter("status_id")!=null)
    		status_id =Integer.parseInt(request.getParameter("status_id"));
    	ArrayList<DraftAndSchedule> draftArr = drafDAO.selectLoadMoreFilterMessage(user_id,channel_detail_id,status_id,administrator,msg_id);
   	 DateFormat formatter = new SimpleDateFormat("E  MMM dd, yyyy 'at' hh:mm a");
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
			json.put("status_id", draft.getStatus_id() );
			json.put("send_date", sendate);
			json.put("file_name",draft.getFile_name());
			json.put("url_image",url_image);
			json.put("file_id",draft.getFile_id());
		    jsonArray.put(i,json);
    }
		jsonReturn =jsonArray;	
    }
    else if(action.equals("draft_comment"))
    {
    	ArrayList<DraftAndSchedule> draftArr = drafDAO.selectDraftComment(team_id,status_id);
    	 DateFormat formatter = new SimpleDateFormat("E  MMM dd, yyyy 'at' hh:mm a");
    	formatter.setTimeZone(TimeZone.getTimeZone(gmt));
		JSONArray jsonArray = new JSONArray();
		for (int i = 0; i < draftArr.size() ; i++) {
			DraftAndSchedule draft = draftArr.get(i);
			JSONObject json = new JSONObject();
			 long send_date=draft.getSend_date();
			    Date date=new Date(send_date);
			    String sendate = formatter.format(date);
			json.put("message_id",draft.getPost_id());
			json.put("content",draft.getContent());
			json.put("create_date",sendate);
			json.put("channel_user",draft.getChannel_user());
			json.put("channel_picture",draft.getChannel_picture());
			json.put("user_name",draft.getUser_name());
			json.put("channel_id",draft.getChannel_id());
			json.put("channel_detail_id", draft.getChannel_detail_id() );
			json.put("status_id", draft.getStatus_id());
			json.put("time_post", draft.getSend_date());
			//json.put("file_name",draft.getFile_name());
			//json.put("url_image",url_image);
			//json.put("file_id",draft.getFile_id());
		    jsonArray.put(i,json);
		   
		}
		jsonReturn =jsonArray;	
    }
    else if(action.equals("draft_comment_more"))
    {
    	long time_post=0;
    	if(request.getParameter("time_post")!=null){
    		time_post=Long.parseLong(request.getParameter("time_post"));
    	}
    	ArrayList<DraftAndSchedule> draftArr = drafDAO.selectDraftCommentMore(team_id,status_id,time_post);
    	 DateFormat formatter = new SimpleDateFormat("E  MMM dd, yyyy 'at' hh:mm a");
    	formatter.setTimeZone(TimeZone.getTimeZone(gmt));
		JSONArray jsonArray = new JSONArray();
		for (int i = 0; i < draftArr.size() ; i++) {
			DraftAndSchedule draft = draftArr.get(i);
			JSONObject json = new JSONObject();
			long send_date=draft.getSend_date();
		    Date date=new Date(send_date);
		    String sendate = formatter.format(date);
			json.put("message_id",draft.getPost_id());
			json.put("content",draft.getContent());
			json.put("create_date",sendate);
			json.put("channel_user",draft.getChannel_user());
			json.put("channel_picture",draft.getChannel_picture());
			json.put("user_name",draft.getUser_name());
			json.put("channel_id",draft.getChannel_id());
			json.put("channel_detail_id", draft.getChannel_detail_id() );
			json.put("status_id", draft.getStatus_id());
			json.put("time_post", draft.getSend_date());
			//json.put("file_name",draft.getFile_name());
			//json.put("url_image",url_image);
			//json.put("file_id",draft.getFile_id());
		    jsonArray.put(i,json);
		   
		}
		jsonReturn =jsonArray;	
    }
    else if(action.equals("filter_comment")){
    	String channel_detail_id="";
    	if(request.getParameter("channel_detail_id")!=null && request.getParameter("channel_detail_id")!="")
    	channel_detail_id=request.getParameter("channel_detail_id");
    	channel_detail_id=channel_detail_id.replace("'","");
    	if(channel_detail_id.equals(""))
    		channel_detail_id="0";
    	//session.setAttribute("SessionFilterDraft",channel_detail_id);
    	if(request.getParameter("status_id")!=null)
    		status_id =Integer.parseInt(request.getParameter("status_id"));
    	ArrayList<DraftAndSchedule> draftArr = drafDAO.selectCommentFilterProfile(team_id,status_id,channel_detail_id);
   	 DateFormat formatter = new SimpleDateFormat("E  MMM dd, yyyy 'at' hh:mm a");
   	 formatter.setTimeZone(TimeZone.getTimeZone(gmt));
		JSONArray jsonArray = new JSONArray();
		for (int i = 0; i < draftArr.size() ; i++) {
			DraftAndSchedule draft = draftArr.get(i);
			JSONObject json = new JSONObject();
			long send_date=draft.getSend_date();
		    Date date=new Date(send_date);
		    String sendate = formatter.format(date);
			json.put("message_id",draft.getPost_id());
			json.put("content",draft.getContent());
			json.put("create_date",sendate);
			json.put("channel_user",draft.getChannel_user());
			json.put("channel_picture",draft.getChannel_picture());
			json.put("user_name",draft.getUser_name());
			json.put("channel_id",draft.getChannel_id());
			json.put("channel_detail_id", draft.getChannel_detail_id() );
			json.put("status_id", draft.getStatus_id());
			json.put("time_post", draft.getSend_date());
		    jsonArray.put(i,json);
    }
		jsonReturn =jsonArray;	
    }
    else if(action.equals("filterbydatecomment")){
    	String filterDate="";
		if(request.getParameter("filterDate")!=null){
			filterDate= request.getParameter("filterDate");	
		}
		String start_date=filterDate+" 00:00:00";
		String end_date=filterDate+" 24:00:00";
		DateFormat formatterLong = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		formatterLong.setTimeZone(TimeZone.getTimeZone(gmt));
		Date start_d = (Date)formatterLong.parse(start_date);
		Date end_d = (Date)formatterLong.parse(end_date);
		start_d = (Date)formatterLong.parse(formatterLong.format(start_d));
		end_d = (Date)formatterLong.parse(formatterLong.format(end_d));
	 	long lStart_Date = start_d.getTime();
	  	long lEnd_Date= end_d.getTime();
		 
    	ArrayList<DraftAndSchedule> draftArr = drafDAO.selectFilterCommentByDate(team_id,status_id,lStart_Date,lEnd_Date);
    	DateFormat formatter = new SimpleDateFormat("E  MMM dd, yyyy 'at' hh:mm a");
    	 formatter.setTimeZone(TimeZone.getTimeZone(gmt));
		JSONArray jsonArray = new JSONArray();
		for (int i = 0; i < draftArr.size() ; i++) {
			DraftAndSchedule draft = draftArr.get(i);
			JSONObject json = new JSONObject();
			long send_date=draft.getSend_date();
		    Date date=new Date(send_date);
		    String sendate = formatter.format(date);
			json.put("message_id",draft.getPost_id());
			json.put("content",draft.getContent());
			json.put("create_date",sendate);
			json.put("channel_user",draft.getChannel_user());
			json.put("channel_picture",draft.getChannel_picture());
			json.put("user_name",draft.getUser_name());
			json.put("channel_id",draft.getChannel_id());
			json.put("channel_detail_id", draft.getChannel_detail_id() );
			json.put("status_id", draft.getStatus_id());
			json.put("time_post", draft.getSend_date());
		    jsonArray.put(i,json);
		   
		}
		jsonReturn =jsonArray;	
    }
    else if(action.equals("filtermembercomment")){
    	String user_list_id="";
    	if(request.getParameter("user_id_list")!=null && request.getParameter("user_id_list")!="")
    		user_list_id=request.getParameter("user_id_list");
    	user_list_id=user_list_id.replace("'","");
    	if(user_list_id.equals(""))
    		user_list_id="0";
    	session.setAttribute("SessionFilterMember",user_list_id);
    	if(request.getParameter("status_id")!=null)
    		status_id =Integer.parseInt(request.getParameter("status_id"));
    	ArrayList<DraftAndSchedule> draftArr = drafDAO.selectFilterMemberComment(user_id,user_list_id,status_id,administrator,team_id);
   	 DateFormat formatter = new SimpleDateFormat("E  MMM dd, yyyy 'at' hh:mm a");
   	 formatter.setTimeZone(TimeZone.getTimeZone(gmt));
		JSONArray jsonArray = new JSONArray();
		for (int i = 0; i < draftArr.size() ; i++) {
			DraftAndSchedule draft = draftArr.get(i);
			JSONObject json = new JSONObject();
			long send_date=draft.getSend_date();
		    Date date=new Date(send_date);
		    String sendate = formatter.format(date);
			json.put("message_id",draft.getPost_id());
			json.put("content",draft.getContent());
			json.put("create_date",sendate);
			json.put("channel_user",draft.getChannel_user());
			json.put("channel_picture",draft.getChannel_picture());
			json.put("user_name",draft.getUser_name());
			json.put("channel_id",draft.getChannel_id());
			json.put("channel_detail_id", draft.getChannel_detail_id() );
			json.put("status_id", draft.getStatus_id());
			json.put("time_post", draft.getSend_date());
		    jsonArray.put(i,json);
    }
		jsonReturn =jsonArray;	
    }
    	
    out.println(jsonReturn);
}

catch(Exception e)
{
	
}
%>