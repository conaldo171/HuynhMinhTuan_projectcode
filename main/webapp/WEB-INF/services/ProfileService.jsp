<%@ page language="java" contentType="application/json; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.util.*"%>
<%@ page import="org.springframework.context.ApplicationContext" %>
<%@ page import="org.springframework.context.support.ClassPathXmlApplicationContext" %>
<%@ page import="com.andwise.common.*" %>
<%@page import="org.json.*"%>
<%@ page import="com.andwise.signup.dao.SignUpDao" %>
<%@ page import="com.andwise.signup.model.SignUp" %>
<%@include file="../../module/view/common/Permission.jsp"%>
<%
	String first_name= "";
	String last_name= "";
	String email= "";
	String cell_phone= "";
	String company_name= "";
	String company_website= "";
	String company_address= "";
	String action="";
	String newpassword="";
	String oldpassword="";
	int member_id=0;
	if(request.getParameter("first_name")!=null)
		first_name =request.getParameter("first_name");
	if(request.getParameter("last_name")!=null)
		last_name =request.getParameter("last_name");
	if(request.getParameter("email")!=null)
		email =request.getParameter("email");
	if(request.getParameter("cell_phone")!=null)
		cell_phone =request.getParameter("cell_phone");
	if(request.getParameter("company_name")!=null)
		company_name =request.getParameter("company_name");
	if(request.getParameter("company_website")!=null)
		company_website =request.getParameter("company_website");
	if(request.getParameter("company_address")!=null)
		company_address =request.getParameter("company_address");
	if(request.getParameter("Action")!=null)
		action =request.getParameter("Action");
	if(request.getParameter("user_id")!=null)
		member_id  =Integer.parseInt(request.getParameter("user_id"));
	
	try{
		ApplicationContext appContext =  ApplicationContextProvider.getGlobalContext(this.getServletContext());
		 SignUpDao signupDAO=(SignUpDao)appContext.getBean("signupDAO");
		 if(action.equals("getmember")){
			 ArrayList<SignUp> listArr= signupDAO.getTeamMembers(team_id);
			 JSONArray jsonArray = new JSONArray();
				for (int i = 0; i < listArr.size() ; i++) {
					SignUp listgroup = listArr.get(i);
					JSONObject json = new JSONObject();
					json.put("user_id",listgroup.getUser_id());
					json.put("first_name", listgroup.getFirst_name());
					json.put("last_name", listgroup.getLast_name());
					json.put("email", listgroup.getEmail());
					json.put("team_role",listgroup.getTeam_role());
				   
				    jsonArray.put(i,json);
				}
				//jsonReturn=jsonArray;
				out.println(jsonArray);
		 }
		 else if(action.equals("DeleteMember")){
			 signupDAO.deleteMember(member_id);
		 }
		 else if (action.equals("changepassword")){
			 if(request.getParameter("newpassword")!=null){
					newpassword=request.getParameter("newpassword");
				} 
			 if(request.getParameter("oldpassword")!=null){
					oldpassword=request.getParameter("oldpassword");
				}
			 
				int id=	 signupDAO.changePassword(oldpassword,newpassword,user_email);
				out.println(id);
		 }
		 else
		 {
			 int id= signupDAO.updatePerson(user_id,first_name,last_name,cell_phone,company_name,company_website,company_address);
				out.println(id);	 
		 }
		
	}
	catch(Exception e){
		out.println(e);
	}
%>
