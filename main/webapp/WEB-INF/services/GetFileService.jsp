<%@ page language="java" contentType="application/json; charset=utf-8" pageEncoding="utf-8"%>
<%@page import="java.util.ArrayList"%>
<%@page import="org.json.*"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.text.*"%>
<%@ page import="com.andwise.common.*" %>
<%@ page import="org.springframework.context.ApplicationContext" %>
<%@ page import="org.springframework.context.support.ClassPathXmlApplicationContext" %>
<%@ page import="com.andwise.content.dao.DraftAndScheduleDao" %>
<%@ page import="com.andwise.content.model.DraftAndSchedule" %>
<%@include file="../../module/view/common/Permission.jsp"%>
<%

int msg_id=0;
String action="";
ConfigTable cfTable = ConfigFactory.getInstance();
if(request.getParameter("msg_id")!=null)
	msg_id=Integer.parseInt(request.getParameter("msg_id"));
if(request.getParameter("Action")!=null){
	action= request.getParameter("Action");
}
try
{
	JSONArray jsonReturn = new JSONArray();
    ApplicationContext appContext =  ApplicationContextProvider.getGlobalContext(this.getServletContext());
    DraftAndScheduleDao drafDAO=(DraftAndScheduleDao)appContext.getBean("draftAndScheduleDAO");
	//if(action.equals("draft"))
   // {
    	ArrayList<DraftAndSchedule> fileArr = drafDAO.selectFileMessageById(msg_id);
		JSONArray jsonArray = new JSONArray();
		String server_address=cfTable.getValue("server_address");
	    String upload_image_url =cfTable.getValue("upload_image_url");
	    String url_image=server_address+upload_image_url;
		for (int i = 0; i < fileArr.size() ; i++) {
			DraftAndSchedule file = fileArr.get(i);
			JSONObject json = new JSONObject();
      
			json.put("message_id",file.getMessage_id());
			json.put("file_id",file.getFile_id());
			json.put("file_name",file.getFile_name());
			json.put("url_image",url_image+file.getFile_name());
		    jsonArray.put(i,json);
		   
		}
		jsonReturn =jsonArray;	
   // }
    
    
   
    out.println(jsonReturn);
}
catch(Exception e)
{
	
}
%>