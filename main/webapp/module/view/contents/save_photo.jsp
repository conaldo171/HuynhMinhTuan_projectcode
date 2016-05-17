<%@page import="java.util.UUID"%>
<%@page contentType="text/html" pageEncoding="utf-8"%>
<%@page import="java.io.*" %>
<%@page import="java.util.List" %>
<%@page import="java.util.Iterator" %>
<%@page import="org.apache.commons.fileupload.servlet.ServletFileUpload"%>
<%@page import="org.apache.commons.fileupload.disk.DiskFileItemFactory"%>
<%@page import="org.apache.commons.fileupload.*"%>
<%@page import="org.json.JSONObject"%>
<%@ page import="com.andwise.common.*" %>
<%@page import="java.awt.image.BufferedImage"%>
<%@page import="javax.imageio.*"%>
<%@ page import="twitter4j.*"%>
<%@ page import="twitter4j.auth.AccessToken"%>
<%@ page import="twitter4j.auth.RequestToken"%>
<%@ page import=" twitter4j.TwitterException"%>
<%@include file="../common/Permission.jsp"%>
<%
boolean isMultipart = ServletFileUpload.isMultipartContent(request);

String uploadUrl = "";
JSONObject obj = new JSONObject();
String result = "";
FileItem uploadItem = null;
String key="upload_image_path";
ConfigTable cfTable = ConfigFactory.getInstance();
String access_token="";
String fileURL="";
String message="";
String url_image_server="";
if(request.getParameter("token")!=null){
	access_token=request.getParameter("token");
}
if(request.getParameter("message")!=null){
	message=request.getParameter("message");
}
if(request.getParameter("url_image_server")!=null){
	url_image_server=request.getParameter("url_image_server");
}
String temp[]=access_token.split("_");

String token = temp[0];
String token_secrect=temp[1];
if(!url_image_server.equals("")){
	 String tw_consumer_key =cfTable.getValue("tw_consumer_key"); 
     String tw_consumer_secret =cfTable.getValue("tw_consumer_secret");
	 TwitterFactory fac = new TwitterFactory();
     AccessToken accessToken = new AccessToken(token,token_secrect);
     Twitter twitter = fac.getInstance();
     twitter.setOAuthConsumer(tw_consumer_key,tw_consumer_secret);
     twitter.setOAuthAccessToken(accessToken);
     StatusUpdate statusUpdate = new StatusUpdate(message);
 		java.net.URL url = new java.net.URL(url_image_server);    
 		InputStream is = url.openStream();
	     statusUpdate.media(is.toString(), is);
     	Status status = twitter.updateStatus(statusUpdate);
}
else
{
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
            	//UUID uuid = UUID.randomUUID();
               // String sKey = uuid.toString();
                String fileName = uploadItem.getName();
                
                int mid = fileName.lastIndexOf(".");
                String ext = fileName.substring(mid + 1, fileName.length()).toLowerCase();
                String path =cfTable.getValue(key);
                String tw_consumer_key =cfTable.getValue("tw_consumer_key"); 
                String tw_consumer_secret =cfTable.getValue("tw_consumer_secret"); 
                String server_address=cfTable.getValue("server_address");
                String upload_image_url =cfTable.getValue("upload_image_url");
              	path = path + fileName;
               savedFile = new File(path);
               uploadItem.write(savedFile);
               ////upload to twitter
               TwitterFactory fac = new TwitterFactory();
               AccessToken accessToken = new AccessToken(token,token_secrect);
               Twitter twitter = fac.getInstance();
               twitter.setOAuthConsumer(tw_consumer_key,tw_consumer_secret);
               twitter.setOAuthAccessToken(accessToken);
               StatusUpdate statusUpdate = new StatusUpdate(message);
               fileURL=server_address+ upload_image_url +fileName;
   	    		java.net.URL url = new java.net.URL(fileURL);    
   	    		InputStream is = url.openStream();
   		        statusUpdate.media(is.toString(), is);
   	        	Status status = twitter.updateStatus(statusUpdate);
   	        	savedFile.delete();
   	        	//System.out.println(status);
   	        	//System.out.println(fileURL);
            }
        } catch (Exception e) {
        	System.out.println(e);
          
          
           


        }
    } catch (Exception e) {
        //e.printStackTrace();
       
    }
}
	}

%>