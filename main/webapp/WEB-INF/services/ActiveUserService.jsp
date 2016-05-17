<%@ page language="java" contentType="application/json; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.util.*"%>
<%@ page import="org.springframework.context.ApplicationContext" %>
<%@ page import="org.springframework.context.support.ClassPathXmlApplicationContext" %>
<%@ page import="com.andwise.common.*" %>
<%@ page import="com.andwise.signup.dao.SignUpDao" %>
<%@ page import="com.andwise.signup.model.SignUp" %>
<%@page import="org.json.*"%>
<%
int user_id=0;
String key_active="";
String email="";
String action="";
String password="";
if(request.getParameter("id")!=null)
	user_id=Integer.parseInt(request.getParameter("id"));
if(request.getParameter("token")!=null){
	key_active =request.getParameter("token");
}
if(request.getParameter("email")!=null){
	email =request.getParameter("email");
}
if(request.getParameter("password")!=null){
	password =request.getParameter("password");
}
if(request.getParameter("action")!=null)
	action= request.getParameter("action");

try{
	ApplicationContext appContext =  ApplicationContextProvider.getGlobalContext(this.getServletContext());
	 SignUpDao signupDAO=(SignUpDao)appContext.getBean("signupDAO");
	if(action.equals("invite")){
		 ArrayList<SignUp> listArr= signupDAO.getProfileInfor(email);
		 JSONArray jsonArray = new JSONArray();
		 int team_role=0;
			for (int i = 0; i < listArr.size() ; i++) {
				SignUp listgroup = listArr.get(i);
				if(listgroup.getTeam_role()==1){
					team_role = listgroup.getTeam_role();
					break;
				}
				
			}
			if(team_role==1){
				 int id=signupDAO.updateUserActive(user_id,key_active);
				 if(id!=-1){
				 session.setAttribute("SessionEmail",email);
				 response.sendRedirect("/enpick");
				 }
				 else
				 {
					 response.sendRedirect("RegisterSuccess.jsp?active=error");  
				 }
			}
			else
			{
				response.sendRedirect("RegisterSuccess.jsp?active=invite"+"&email="+email+"&key="+key_active+"&id="+user_id);		
			}
		
	}
	else if(action.equals("setpass")){
		int id=signupDAO.updateUserActive(user_id,key_active);
		if(id!=-1){
			 int id_user=signupDAO.updatePassword(password, email);
			 session.setAttribute("SessionEmail",email);
			 out.println(id);
		 }
		else
		{
			out.println("-1");
		}
	}
	else if(action.equals("reset")){
		int team_role=signupDAO.checkKey(key_active);
		if(team_role!=-1){
			session.setAttribute("SessionAdmin",Integer.toString(team_role));
			response.sendRedirect("ResetPassword.jsp?active=reset"+"&email="+email+"&key="+key_active+"&id="+user_id);	
		}
		else
		{
			response.sendRedirect("ResetPassword.jsp?active=error");
		}
		
	}
	else
	{
		int id=signupDAO.updateUserActive(user_id,key_active);
		if(id!=-1){
			 session.setAttribute("SessionEmail",email);
			 session.setAttribute("SessionAdmin","1");
			 session.setAttribute("SessionUserId",Integer.toString(user_id));
			 response.sendRedirect("/enpick");
		 }
		 else
		 {
			 response.sendRedirect("RegisterSuccess.jsp?active=error"); 
		 }
	}
	 
}
catch(Exception e){
	out.println(e);
	response.sendRedirect("RegisterSuccess.jsp?active=error"); 
}
%>