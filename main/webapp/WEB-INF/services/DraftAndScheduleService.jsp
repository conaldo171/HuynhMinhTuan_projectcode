<%@ page language="java" contentType="application/json; charset=utf-8" pageEncoding="utf-8"%>
<%@page import="java.util.ArrayList"%>
<%@page import="org.json.*"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.text.*"%>
<%@ page import="java.util.*"%>
<%@ page import="org.springframework.context.ApplicationContext" %>
<%@ page import="org.springframework.context.support.ClassPathXmlApplicationContext" %>
<%@ page import="com.andwise.content.dao.DraftAndScheduleDao" %>
<%@ page import="com.andwise.content.model.DraftAndSchedule" %>
<%@ page import="com.andwise.common.*" %>
<%@include file="../../module/view/common/Permission.jsp"%>
<%
	
	int msg_id=0;
	String sAction="";
	String sContent="";
	long lsend_date=0;
	int iStatus_id=0;
	long lcreate_date=0;
	String list_send_date_schedule="";
	long send_date_message=0;
	String gmt="";
	if(session.getAttribute("SessionGmt")!=null){
		gmt=(String)session.getAttribute("SessionGmt");
	}
	JSONArray jsonReturn = new JSONArray();
	DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	Date date = new Date();
	String sCreate_date=formatter.format(date);
	String sSend_date=formatter.format(date);
	if(request.getParameter("msg_id")!=null)
		msg_id= Integer.parseInt(request.getParameter("msg_id"));
	if(request.getParameter("status_id")!=null)
		iStatus_id= Integer.parseInt(request.getParameter("status_id"));
	if(request.getParameter("content")!=null)
		sContent= request.getParameter("content");
	if(request.getParameter("create_date")!=null)
		sCreate_date= request.getParameter("create_date");
	if(request.getParameter("send_date")!=null){
		sSend_date= request.getParameter("send_date");
	}
	if(request.getParameter("Action")!=null)
		sAction= request.getParameter("Action");
	long dateadd= 2*60*1000;
	Date currentdate=(Date)formatter.parse(formatter.format(date));
	long lCurentdate= currentdate.getTime();
	String strdate[]= sSend_date.replace("'","").split(",");
	Date date_time_msg = new Date();
	date_time_msg = (Date)formatter.parse(strdate[0]);
	send_date_message = date_time_msg.getTime();
	if(send_date_message>=lCurentdate){
		if((lCurentdate+dateadd)>=send_date_message){
			send_date_message=send_date_message+dateadd;
		}
		for(int i=0; i<strdate.length;i++){
			formatter.setTimeZone(TimeZone.getTimeZone(gmt));
			Date datetime = (Date)formatter.parse(strdate[i]);
			
			//datetime = (Date)formatter.parse(strdate[i]);
			lsend_date = datetime.getTime();
			if((lCurentdate+dateadd)>=lsend_date){
				lsend_date=lsend_date+dateadd;
			}
			list_send_date_schedule+=lsend_date+",";
		}
		try
		{
			
			//ApplicationContext context = new ClassPathXmlApplicationContext("Spring-Module.xml");   	 
			//DraftAndScheduleDao drafAndScheduleDAO = (DraftAndScheduleDao) context.getBean("draftAndScheduleDAO");
			 ApplicationContext appContext =  ApplicationContextProvider.getGlobalContext(this.getServletContext());
			 DraftAndScheduleDao drafAndScheduleDAO=(DraftAndScheduleDao)appContext.getBean("draftAndScheduleDAO");
			if(sAction.equals("send")){
				ArrayList<DraftAndSchedule> draftAndScheduleArr = drafAndScheduleDAO.selectTokenUser(user_id,msg_id,iStatus_id,lCurentdate);
				
				JSONArray jsonArray = new JSONArray();
				
				for (int i = 0; i < draftAndScheduleArr.size() ; i++) {
					DraftAndSchedule draftAndSchedule = draftAndScheduleArr.get(i);
					JSONObject json = new JSONObject();
					json.put("channel_detail_id", draftAndSchedule.getChannel_detail_id() );
					json.put("token_user", draftAndSchedule.getToken_user());
					json.put("pchannel_id", draftAndSchedule.getPchannel_id());
				    jsonArray.put(i,json);
				}
				jsonReturn =jsonArray;	
					 
				
			}
			else if (sAction.equals("draft")){
				drafAndScheduleDAO.updateMessage(msg_id,sContent,sCreate_date,lCurentdate,iStatus_id,list_send_date_schedule);
			}
			else if(sAction.equals("schedule")){
				drafAndScheduleDAO.updateMessage(msg_id,sContent,sCreate_date,lsend_date,iStatus_id,list_send_date_schedule);
				JSONObject json = new JSONObject();
				json.put("error","ok");	
				jsonReturn.put(json);	
			}
			
			
			else
			{
				drafAndScheduleDAO.deleteMessage(msg_id);
				//deletedraft deleteMessage
			}
			
			out.println(jsonReturn);
		}
		catch(Exception e)
		{
			
		}
	}
	else
	{
		JSONObject json = new JSONObject();
		json.put("error","error");	
		out.println(jsonReturn.put(json));	
	}
	
%>

