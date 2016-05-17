<%@ page language="java" contentType="application/json; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.util.*"%>
<%@ page import="org.springframework.context.ApplicationContext" %>
<%@ page import="org.springframework.context.support.ClassPathXmlApplicationContext" %>
<%@ page import="com.andwise.common.*" %>
<%@ page import="com.andwise.signup.dao.SignUpDao" %>
<%@ page import="com.andwise.signup.model.SignUp" %>
<%
String email="";
int user_id=0;
String contentemail="";
String titleemail="";
UUID uuid = UUID.randomUUID();
String sKey = uuid.toString();
if(request.getParameter("email")!=null){
	email =request.getParameter("email");	
}
if(request.getParameter("contentemail")!=null){
	contentemail =request.getParameter("contentemail");	
}
if(request.getParameter("titleemail")!=null){
	titleemail =request.getParameter("titleemail");	
}
if(session.getAttribute("domain")==null){
	//String domain=(String)session.getAttribute("domain");
	response.sendRedirect("./");
}


try{
	ApplicationContext appContext =  ApplicationContextProvider.getGlobalContext(this.getServletContext());
	 SignUpDao signupDAO=(SignUpDao)appContext.getBean("signupDAO");
	 user_id= signupDAO.getUserId(email);
	 String keyactive="";
	 if(user_id!=0){
		 keyactive= signupDAO.getkey(user_id);
		 if(!keyactive.equals("")){
			 new Messages(this.getServletContext()).processSend(user_id, "","",3, email,keyactive, request.getContextPath(), "",contentemail,titleemail);
		 }
		 else
		 {
			 keyactive= sKey + "-"+ Integer.toString(user_id);
				signupDAO.insertKeyActive(user_id,keyactive); 
				new Messages(this.getServletContext()).processSend(user_id, "","",3, email,keyactive, request.getContextPath(), "",contentemail,titleemail);
		 }
		 
		
	 }
	 out.println(user_id);
}
catch(Exception e){
	out.println(e);
}

%>
