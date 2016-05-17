<%@ page language="java" contentType="application/json; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.util.*"%>
<%@page import="org.json.*"%>
<%@ page import="java.util.*"%>
<%@ page import="org.springframework.context.ApplicationContext" %>
<%@ page import="org.springframework.context.support.ClassPathXmlApplicationContext" %>
<%@ page import="com.andwise.common.*" %>
<%@include file="/admin/module/view/common/Permission.jsp"%>
<%
String email= "";
String password= "";
String gmt="";
if(request.getParameter("email")!=null)
	email =request.getParameter("email");
if(request.getParameter("gmt")!=null){
	gmt =request.getParameter("gmt");
	session.setAttribute("SessionGmt",gmt);
}
	
if(request.getParameter("password")!=null)
   password=request.getParameter("password");
	
	try{
		String afterEncryptPassword="";
		MD5 Encrypt = new MD5();
        if (!password.equals("")){
       	 afterEncryptPassword = Encrypt.callHash(password);
        }    
        ConfigTable cfTable = ConfigFactory.getInstance();
        String admin_username =cfTable.getValue("admin_username"); 
        String admin_password =cfTable.getValue("admin_password");
		 if(email.equals(admin_username)&&afterEncryptPassword.equals(admin_password)){
			 session.setAttribute("SessionEmailAdmin",admin_username);
			    //session.setAttribute("SessionLastName",signup.getLast_name());
			 out.println("ok"); 
		 }
		 else
		 {
			 out.println("notok");  
		 }
	}
	catch(Exception e){
		out.println(e);
	}
%>
