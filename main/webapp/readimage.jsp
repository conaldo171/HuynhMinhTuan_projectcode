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
 <%@ page import="com.restfb.*"%>
<%@ page import="com.restfb.types.*"%>
 <%@include file="module/view/common/Permission.jsp"%>
<%
FileItem uploadItem = null;
InputStream fs=null;
JSONArray jsonarray= new JSONArray();
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
	TwitterApi tw=new TwitterApi();
	jsonarray=readFile.readExcelfile(fs, user_id);
	 ApplicationContext appContext =  ApplicationContextProvider.getGlobalContext(this.getServletContext());
	    ChannelDetailDao channelDetailDAO=(ChannelDetailDao)appContext.getBean("channelDetailDAO");
	ArrayList<ChannelDetail> channelDetailArr = channelDetailDAO.selectChannelDetail(user_id,administrator,"");
	
	//JSONArray jsonArrayChannel = new JSONArray();
	
	for (int i = 0; i < channelDetailArr.size() ; i++) {
		ChannelDetail channelDetail = channelDetailArr.get(i);
		//JSONObject json = new JSONObject();
		for(int j=0;  j<jsonarray.length();j++){
			JSONObject json = jsonarray.getJSONObject(j);
			if(channelDetail.getChannel_detail_id().equals(json.getString("PageId"))){
				if(channelDetail.getChannel_id()==1){
					 json.put("Success", "true");
					 tw.uploadFacebook(channelDetail.getChannel_detail_id(),channelDetail.getToken_user(),json.getString("Image"),json.getString("Contents"));	
				}
				else if(channelDetail.getChannel_id()==2){
				String token_page=tw.getFBTokenPageId(channelDetail.getChannel_detail_id(),channelDetail.getToken_user());
				tw.uploadFacebook(channelDetail.getChannel_detail_id(),token_page,"cc572fb7-d301-4758-a837-8027b95c26a8_1_63.jpg",json.getString("Contents"));
				}
				else if(channelDetail.getChannel_id()==3)
				{
					 json.put("Success", "true");
					 tw.uploadTwitter(channelDetail.getToken_user(),json.getString("Image"),json.getString("Contents"));
				}
				
				//json.put("Token_user",channelDetail.getToken_user());
				//json.put("Channel_type",channelDetail.getChannel_id());
			}
		}
		
	}
	out.println(jsonarray);
}
catch (Exception e){
e.printStackTrace();
}

}
%>