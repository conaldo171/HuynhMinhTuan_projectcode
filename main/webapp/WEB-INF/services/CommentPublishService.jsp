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
 String message="",action="",post_id="", channel_detail_id="", channel_user="",create_date="",gmt="", result="";
 int comment_id=0, channel_id=0;
 long lCreate_date=0;
 String token_user="";
 
 if(request.getParameter("message")!=null){
	 message =request.getParameter("message");
 }
 if(request.getParameter("post_id")!=null){
	 post_id =request.getParameter("post_id");
 }
 if(request.getParameter("channel_user")!=null){
	 channel_user =request.getParameter("channel_user");
 }
 if(request.getParameter("Action")!=null){
	 action =request.getParameter("Action");
 }
 if(request.getParameter("channel_detail_id")!=null){
	 channel_detail_id =request.getParameter("channel_detail_id");
 }
 if(request.getParameter("comment_id")!=null){
	 comment_id =Integer.parseInt(request.getParameter("comment_id"));
 }
 if(request.getParameter("channel_id")!=null){
	 channel_id =Integer.parseInt(request.getParameter("channel_id"));
 }
 if(request.getParameter("create_date")!=null){
	 create_date =request.getParameter("create_date");
 }
 if(session.getAttribute("SessionGmt")!=null){
		gmt=(String)session.getAttribute("SessionGmt");
	}
 try
	{
	 DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date date_time_msg = new Date();
		formatter.setTimeZone(TimeZone.getTimeZone(gmt));
		TwitterApi tw=new TwitterApi();
		 ApplicationContext appContext =  ApplicationContextProvider.getGlobalContext(this.getServletContext());
		    //ChannelDetailDao channelDetailDAO=(ChannelDetailDao)appContext.getBean("channelDetailDAO");
		//ArrayList<ChannelDetail> channelDetailArr = channelDetailDAO.selectChannelDetail(user_id,administrator,"");
		CreateDao createDAO=(CreateDao)appContext.getBean("createDAO");
		if(action.equals("sent")){
			date_time_msg = (Date)formatter.parse(create_date);
			lCreate_date = date_time_msg.getTime();
			token_user =createDAO.updateCommentSent(comment_id, user_id, channel_detail_id,lCreate_date,3,channel_id);	
			if(!token_user.equals("")){
				if(channel_id==2){
					tw.uploadCommentFacebook(post_id,token_user,message);
					out.println("1");
				}
				else if(channel_id==3){
					tw.uploadCommentTwitter(Long.parseLong(post_id),channel_user,token_user,message);
					out.println("1");
				}
			} 
			//createDAO.inserPostOfComment(list_post_id,list_contents_public, lCreate_date,user_id,list_channel_detail,list_comments_public,status);	
		}
		else if(action.equals("delete_comment")){
			createDAO.deleteComment(comment_id);
			out.println("1");
		}
		else if(action.equals("draft")){
			createDAO.updateCommentDraft(comment_id, message, user_id);
			out.println("1");
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
			createDAO.updateCommentSchedule(comment_id, message,list_send_date_schedule, user_id);
			out.println("1");
		}
		else if(action.equals("sentfromsch")){
			date_time_msg = (Date)formatter.parse(create_date);
			lCreate_date = date_time_msg.getTime();
			token_user =createDAO.insertCommentFromsch(message,post_id, user_id, channel_detail_id,lCreate_date,3,channel_id);	
			if(!token_user.equals("")){
				if(channel_id==2){
					tw.uploadCommentFacebook(post_id,token_user,message);
					out.println("1");
				}
				else if(channel_id==3){
					tw.uploadCommentTwitter(Long.parseLong(post_id),channel_user,token_user,message);
					out.println("1");
				}
			} 
		}	
		else if(action.equals("savedraftfromsch")){
			date_time_msg = (Date)formatter.parse(create_date);
			lCreate_date = date_time_msg.getTime();
			createDAO.insertCommentFromsch(message,post_id, user_id, channel_detail_id,lCreate_date,1,channel_id);	
			out.println("1");
		}	
	}
 catch(Exception e){
	 
 }
 %>