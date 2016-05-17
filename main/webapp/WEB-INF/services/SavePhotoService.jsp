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
<%@ page import="org.springframework.context.ApplicationContext" %>
<%@ page import="org.springframework.context.support.ClassPathXmlApplicationContext" %>
<%@ page import="com.andwise.content.dao.DraftAndScheduleDao" %>
<%@ page import="com.andwise.content.model.DraftAndSchedule" %>
<%@include file="../../module/view/common/Permission.jsp"%>
<%
boolean isMultipart = ServletFileUpload.isMultipartContent(request);
String file_name = "";
JSONObject obj = new JSONObject();
String result = "";
FileItem uploadItem = null;
String key="upload_image_path";
ConfigTable cfTable = ConfigFactory.getInstance();
int msg_id=0;
String list_post="";
String list_post_arr[]=null;
String action="";
String file_image="";
if(request.getParameter("Action")!=null){
	action=request.getParameter("Action");
}
if(request.getParameter("file_name")!=null){
	file_image=request.getParameter("file_name");
}
if(request.getParameter("message_id")!=null){
	msg_id=Integer.parseInt(request.getParameter("message_id"));
}

if(request.getParameter("list_post")!=null){
	list_post=request.getParameter("list_post");
	String strtemp=list_post.replace("'","");
	list_post_arr = strtemp.split(",");
}
ApplicationContext appContext =  ApplicationContextProvider.getGlobalContext(this.getServletContext());
DraftAndScheduleDao savePhotoDAO=(DraftAndScheduleDao)appContext.getBean("draftAndScheduleDAO");
if(action.equals("delete")){
	  File savedFile = null;
	  String server_address=cfTable.getValue("server_address");
      String upload_image_url =cfTable.getValue("upload_image_url");
     String fileURL=server_address+ upload_image_url +file_image;
    //pathdel = pathdel + file_image;
     savedFile = new File(fileURL);
	savePhotoDAO.deletePhoto(msg_id,file_image);
	savedFile.delete();
	out.println("ok");
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
            	UUID uuid = UUID.randomUUID();
                String sKey = uuid.toString();
                String fileName = uploadItem.getName();
                int mid = fileName.lastIndexOf(".");
                String ext = fileName.substring(mid + 1, fileName.length()).toLowerCase();
               	String path =cfTable.getValue(key);
              	path = path + user_id +"_"+sKey+"." + ext;
                savedFile = new File(path);
                uploadItem.write(savedFile);
                file_name = savedFile.getName();
                if(action.equals("draft")){
                	 for(int i=0;i<list_post_arr.length;i++){
                   	  savePhotoDAO.savePhoto(msg_id-i,file_name);
                   }
                }
                else
                {
                	//for(int i=0;i<list_post_arr.length;i++){
                     	  savePhotoDAO.savePhoto(msg_id,file_name);
                    // }
                }
                out.println("ok");
              
            }
        } catch (Exception e) {
           out.println("error");
        }
    } catch (Exception e) {
        //e.printStackTrace();
       
    }
}
	}

%>
