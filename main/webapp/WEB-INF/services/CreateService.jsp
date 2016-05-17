<%@ page language="java" contentType="application/json; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.text.*"%>
<%@ page import="java.util.*"%>
<%@ page import="org.springframework.context.ApplicationContext" %>
<%@ page import="org.springframework.context.support.ClassPathXmlApplicationContext" %>
<%@ page import="com.andwise.content.dao.CreateDao" %>
<%@ page import="com.andwise.content.model.Create" %>
<%@ page import="com.andwise.common.*" %>
<%@include file="../../module/view/common/Permission.jsp"%>
<%
String channel_detail_id="";
String content="";
int status_id=0;
int message_id = 0;
long lsend_date=0;
int default_comment=0;
String action="";
String create_date="";
long send_date_message=0;
String list_send_date_schedule="";
DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
Date date = new Date();
create_date=formatter.format(date);
String send_date=formatter.format(date);
String gmt="";
int channel_id=0;
if(session.getAttribute("SessionGmt")!=null){
	gmt=(String)session.getAttribute("SessionGmt");
}
if(request.getParameter("channel_detail_id")!=null){
	channel_detail_id=  request.getParameter("channel_detail_id");
}

if(request.getParameter("send_date")!=null){
	send_date = request.getParameter("send_date");
}
if(request.getParameter("content")!=null){
	content= request.getParameter("content");
}
if(request.getParameter("status_id")!=null){
	status_id= Integer.parseInt(request.getParameter("status_id"));
}
if(request.getParameter("channel_id")!=null){
	channel_id= Integer.parseInt(request.getParameter("channel_id"));
}
if(request.getParameter("Action")!=null){
	action=request.getParameter("Action");
}

formatter.setTimeZone(TimeZone.getTimeZone(gmt));
long dateadd= 2*60*1000;
Date currentdate=(Date)formatter.parse(formatter.format(date));
long lCurentdate= currentdate.getTime();

String strdate[]= send_date.replace("'","").split(",");
Date date_time_msg = new Date();//(Date)formatter.parse(strdate[0]);
date_time_msg = (Date)formatter.parse(strdate[0]);
send_date_message = date_time_msg.getTime();

	if((lCurentdate+dateadd)>=send_date_message){
		send_date_message=send_date_message+dateadd;
	}
	for(int i=0; i<strdate.length;i++){
		Date datetime = (Date)formatter.parse(strdate[i]);
		lsend_date = datetime.getTime();
		if((lCurentdate+dateadd)>=lsend_date){
			lsend_date=lsend_date+dateadd;
		}
		list_send_date_schedule+=lsend_date+",";
	}
	try
	{
		//ApplicationContext appContext = WebApplicationContextUtils.getRequiredWebApplicationContext(servletContext);
		//CreateDao createDAO = (CreateDao) appContext.getBean("createDAO");
		 ApplicationContext appContext =  ApplicationContextProvider.getGlobalContext(this.getServletContext());
		 CreateDao createDAO=(CreateDao)appContext.getBean("createDAO");
		if(action.equals("savedraft"))
		message_id = createDAO.saveDraftMessage(create_date,content,status_id,lsend_date,user_id,administrator);
		else if(action.equals("savedraftschedule")){
			String list_channel_detail_id="";
			if(request.getParameter("list_channel_detail_id")!=null){
				list_channel_detail_id=  request.getParameter("list_channel_detail_id");
				list_channel_detail_id=list_channel_detail_id.replace("'","")+",";
			}
			message_id = createDAO.saveDraftFromSchedule(create_date,content,status_id,lsend_date,user_id,administrator,list_channel_detail_id);
		}
			
		else if(action.equals("saveschedule"))
			//message_id=0;
		{
			if(send_date_message>=lCurentdate){
				message_id= createDAO.saveMessage(create_date,content,status_id,send_date_message,user_id,list_send_date_schedule,administrator);
			}
			else
			{
				
				message_id=0;
				}

			}
			
		else if(action.equals("updatechannel")){
			int select_post=0;
			if(request.getParameter("select_post")!=null){
				select_post= Integer.parseInt(request.getParameter("select_post"));
			}
			createDAO.updateChannel(select_post,channel_detail_id,user_id,administrator);
		}
		else if(action.equals("defaultcomment")){
			int select_post=0;
			if(request.getParameter("default_comment")!=null){
				default_comment= Integer.parseInt(request.getParameter("default_comment"));
			}
			createDAO.updateChannelDefaultComment(default_comment,channel_detail_id,user_id,administrator,channel_id);
		}
		else if(action.equals("updatedefault")){
			int default_show=0;
			if(request.getParameter("default_show")!=null){
				default_show= Integer.parseInt(request.getParameter("default_show"));
			}
			createDAO.updateChannelDefault(default_show,channel_detail_id,user_id,administrator);
		}
		else if(action.equals("sendschedule")){
			String list_channel_detail="";
			if(request.getParameter("list_detail_id")!=null){
				list_channel_detail=request.getParameter("list_detail_id");
				list_channel_detail= list_channel_detail.replace("'","")+",";
			}
			message_id=	createDAO.saveMessageSendFromSchedule(create_date,content,status_id,lsend_date,user_id,list_channel_detail);
		}
		
		else{
			int msg_id=0;
			if(request.getParameter("message_id")!=null)
			msg_id= Integer.parseInt(request.getParameter("message_id"));
			message_id=createDAO.saveSchedule(msg_id,lsend_date);
		}
			
	}
	catch(Exception e)
	{
		out.println(e);
	}

%>
<%=message_id%>