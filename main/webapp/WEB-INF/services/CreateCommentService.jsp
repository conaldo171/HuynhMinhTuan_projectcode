<%@page import="org.apache.poi.hssf.usermodel.HSSFHeader"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.*"%>
<%@ page import="java.io.FileNotFoundException"%>
<%@ page import="org.json.*"%>
<%@ page import="java.net.*"%>
<%@ page import="java.io.*"%>
<%@ page import="java.io.IOException" %>
<%@page import="org.apache.commons.fileupload.servlet.ServletFileUpload"%>
<%@page import="org.apache.commons.fileupload.disk.DiskFileItemFactory"%>
<%@page import="org.apache.commons.fileupload.*"%>
<%@ page import="org.apache.commons.io.*" %>
 
<%@ page import="javax.imageio.*" %> 
<%@ page import="org.apache.commons.codec.binary.Base64" %>
<%@page import="com.andwise.common.*"%>
<%@page import="org.json.*"%>
<%@ page import="com.restfb.*"%>
<%@ page import="com.restfb.types.*"%>
<%@ page import="com.restfb.json.*"%>
<%@ page import="org.springframework.context.ApplicationContext" %>
<%@ page import="org.springframework.context.support.ClassPathXmlApplicationContext" %>
<%@ page import="com.andwise.channel.dao.ChannelDetailDao" %>
<%@ page import="com.andwise.channel.model.ChannelDetail" %>
 <%@ page import="org.springframework.web.context.support.*"%>
 <%@ page import="com.andwise.content.dao.CreateDao" %>
 <%@include file="../../module/view/common/Permission.jsp"%>
<%
String message="";
int status=0;
int msg_id=0;
String action="";
String create_date="";
String gmt="";
String object_json="";
int channel_id=0;
JSONArray json_content_public=null;
if(session.getAttribute("SessionGmt")!=null){
	gmt=(String)session.getAttribute("SessionGmt");
}
if(request.getParameter("object_json")!=null){
	object_json= request.getParameter("object_json");
	JSONObject jsonObject = new JSONObject(object_json);
	 json_content_public = jsonObject.getJSONArray("object_comment_public");
}

if(request.getParameter("message")!=null){
	message= request.getParameter("message");
}

if(request.getParameter("Action")!=null){
	action=request.getParameter("Action");
}


	try
	{
		TwitterApi tw=new TwitterApi();
		 ApplicationContext appContext =  ApplicationContextProvider.getGlobalContext(this.getServletContext());
		    ChannelDetailDao channelDetailDAO=(ChannelDetailDao)appContext.getBean("channelDetailDAO");
		ArrayList<ChannelDetail> channelDetailArr = channelDetailDAO.selectChannelDetail(user_id,administrator,"");
		String list_contents_public="";
		String list_comments_public="";
		String list_post_id="";
		String list_channel_detail="";
		for (int i = 0; i < channelDetailArr.size() ; i++) {
			ChannelDetail channelDetail = channelDetailArr.get(i);
		for (int j=0; j<json_content_public.length();j++){
			JSONObject json = json_content_public.getJSONObject(j);
			if(channelDetail.getChannel_detail_id().equals(json.getString("page_id"))){
				 if(channelDetail.getChannel_id()==2){
					    list_contents_public =list_contents_public+json.getString("content")+"*,*,*,";	
						list_channel_detail = list_channel_detail+channelDetail.getChannel_detail_id()+",";
						list_comments_public =list_comments_public+message+"*,*,*,";
						list_post_id=list_post_id+json.getString("post_id")+",";
						if(action.equals("sent")){
							try{
								tw.uploadCommentFacebook(json.getString("post_id"),channelDetail.getToken_user(),message);

							}
							catch(Exception e){
								//list_page_error=list_page_error+","+json.getString("PageName");
							}
							
						}
				 }
				 else if(channelDetail.getChannel_id()==3)
					{
					 list_contents_public =list_contents_public+json.getString("content")+"*,*,*,";	
						list_channel_detail = list_channel_detail+channelDetail.getChannel_detail_id()+",";
						list_comments_public =list_comments_public+message+"*,*,*,";
						list_post_id=list_post_id+json.getString("post_id")+",";
						if(action.equals("sent")){
							try{
								tw.uploadCommentTwitter( Long.parseLong(json.getString("post_id")),channelDetail.getChannel_user(),channelDetail.getToken_user(),message);	
								
							}
							catch(Exception e){
								//list_page_error=list_page_error+","+json.getString("PageName");
							}
							
						}
						
						
					}
				
		}	
		}
	}
		try{
			
			long lCreate_date=0;
			if(request.getParameter("status")!=null){
				status= Integer.parseInt(request.getParameter("status"));
			} 
			if(request.getParameter("create_date")!=null){
				create_date= request.getParameter("create_date");
			}
			DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date date_time_msg = new Date();
			formatter.setTimeZone(TimeZone.getTimeZone(gmt));
			CreateDao createDAO=(CreateDao)appContext.getBean("createDAO");
			if(action.equals("sent")){
				date_time_msg = (Date)formatter.parse(create_date);
				lCreate_date = date_time_msg.getTime();
				
				 createDAO.inserPostOfComment(list_post_id,list_contents_public, lCreate_date,user_id,list_channel_detail,list_comments_public,status);	
			}
			else if(action.equals("draft")){
				date_time_msg = (Date)formatter.parse(create_date);
				lCreate_date = date_time_msg.getTime();
				
				 createDAO.inserPostOfComment(list_post_id,list_contents_public, lCreate_date,user_id,list_channel_detail,list_comments_public,status );	
			}
			else if(action.equals("schedule")){
				long dateadd= 2*60*1000;
				Date currentdate=(Date)formatter.parse(formatter.format(date_time_msg));
				long lCurentdate= currentdate.getTime();
				long lsend_date=0;
				String list_send_date_schedule="";
				String strdate[]= create_date.replace("'","").split(",");
				date_time_msg = (Date)formatter.parse(strdate[0]);
				long send_date_message = date_time_msg.getTime();
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
				if(send_date_message>=lCurentdate){
					createDAO.inserCommentFromExcelToSchedule(list_post_id,list_contents_public, send_date_message,user_id,list_channel_detail,list_comments_public,list_send_date_schedule,status);
				}
				else{
					msg_id=0;
				}
					
			}
			
		}
		catch(Exception e){
			
		}
	}
	catch(Exception e)
	{
		out.println(e);
	}

%>
