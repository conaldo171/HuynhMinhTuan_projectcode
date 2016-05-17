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
String action="";
int status=0;
String create_date="";
long lCreate_date=0;
FileItem uploadItem = null;
InputStream fs=null;
int msg_id=0;
int count_error=0;
String list_page_error="";
JSONArray jsonarray= new JSONArray();
JSONArray jsonresult= new JSONArray();
ReadExcelFile readFile= new ReadExcelFile();

boolean isMultipart = ServletFileUpload.isMultipartContent(request);
if (!isMultipart){
	   
}
else {
	
DiskFileItemFactory factory = new DiskFileItemFactory();
factory.setSizeThreshold(81920);
ServletFileUpload upload = new ServletFileUpload(factory);
upload.setSizeMax(4194304);// file size 4MB
File savedFile = null;
File savedFileLarge = null;
Iterator itr = null;
try {
    List items = null;
    items = upload.parseRequest(request);
    itr = items.iterator();
    try {
        while (itr.hasNext()) {
            FileItem item = (FileItem) itr.next();
            if (item.isFormField()) {
                String name = item.getFieldName();
                String value = item.getString();
                } else {
                try {
                    uploadItem = item;
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
        if (uploadItem != null ) {
        	 fs = uploadItem.getInputStream();

        }
    } catch (Exception e) {
    	System.out.println(e);
    }
} catch (Exception e) {
    //e.printStackTrace();
   
}
}

if (fs != null) {
try{
	if(request.getParameter("Action")!=null){
		action= request.getParameter("Action");
	} 
	TwitterApi tw=new TwitterApi();
	jsonarray=readFile.readCommentExcelfile(fs, user_id);
	 ApplicationContext appContext =  ApplicationContextProvider.getGlobalContext(this.getServletContext());
	    ChannelDetailDao channelDetailDAO=(ChannelDetailDao)appContext.getBean("channelDetailDAO");
	ArrayList<ChannelDetail> channelDetailArr = channelDetailDAO.selectChannelDetail(user_id,administrator,"");
	
	//JSONArray jsonArrayChannel = new JSONArray();
	String list_contents_public="";
	String list_comments_public="";
	String list_post_id="";
	String list_channel_detail="";

	for (int i = 0; i < channelDetailArr.size() ; i++) {
		ChannelDetail channelDetail = channelDetailArr.get(i);
		//JSONObject json = new JSONObject();
		for(int j=0;  j<jsonarray.length();j++){
			JSONObject json = jsonarray.getJSONObject(j);
			if(channelDetail.getChannel_detail_id().equals(json.getString("PageId"))){
				
				 if(channelDetail.getChannel_id()==2){
					if(!json.getString("Comment").equals("")){
						json.put("Success", "true");
						list_contents_public =list_contents_public+json.getString("Contents")+"*,*,*,";	
						list_channel_detail = list_channel_detail+channelDetail.getChannel_detail_id()+",";
						list_comments_public =list_comments_public+json.getString("Comment")+"*,*,*,";
						list_post_id=list_post_id+json.getString("PostId")+",";
							if(action.equals("sent")){
								try{
									tw.uploadCommentFacebook(json.getString("PostId"),channelDetail.getToken_user(),json.getString("Comment"));
									
									
								}
								catch(Exception e){
									list_page_error=list_page_error+","+json.getString("PageName");
								}
								
							}	
					}
					
						
						
					
				}
				else if(channelDetail.getChannel_id()==3)
				{
					if(!json.getString("Comment").equals("")){
						json.put("Success", "true");
						//post twitter
						        list_contents_public =list_contents_public+json.getString("Contents")+"*,*,*,";	
								list_channel_detail = list_channel_detail+channelDetail.getChannel_detail_id()+",";
								list_comments_public =list_comments_public+json.getString("Comment")+"*,*,*,";
								list_post_id=list_post_id+json.getString("PostId")+",";
						if(action.equals("sent")){
							try{
								tw.uploadCommentTwitter( Long.parseLong(json.getString("PostId")),json.getString("PageName"),channelDetail.getToken_user(),json.getString("Comment"));	
								
							}
							catch(Exception e){
								list_page_error=list_page_error+","+json.getString("PageName");
							}
							
						}	
					}
					
					
					
				}
			}
			
			
		}
		
	}
	for(int n=1;  n<jsonarray.length();n++){
		JSONObject json = jsonarray.getJSONObject(n);
		if(json.getString("Success").equals("false")){
			list_page_error=list_page_error+","+json.getString("PageName");
			
		}
		}
	try{
	
		String gmt="";
		
		if(session.getAttribute("SessionGmt")!=null){
			gmt=(String)session.getAttribute("SessionGmt");
		}
		
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
	out.println(list_page_error);
	}
catch (Exception e){
e.printStackTrace();
}

}
%>
