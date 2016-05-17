<%@ page language="java" contentType="application/json; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.util.*"%>
<%@page import="org.json.*"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.text.*"%>
<%@ page import="org.springframework.context.ApplicationContext" %>
<%@ page import="org.springframework.context.support.ClassPathXmlApplicationContext" %>
<%@ page import="com.andwise.common.*" %>
<%@ page import="com.andwise.signup.dao.SignUpDao" %>
<%@ page import="com.andwise.signup.model.SignUp" %>
<%
String email= "";
String password= "";
String gmt="";
int iexprire=0;
if(request.getParameter("email")!=null)
	email =request.getParameter("email");
if(request.getParameter("gmt")!=null){
	gmt =request.getParameter("gmt");
	session.setAttribute("SessionGmt",gmt);
}
	
if(request.getParameter("password")!=null)
   password=request.getParameter("password");
Date date = new Date();
DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
Date currentdate=(Date)formatter.parse(formatter.format(date));
long lCurentdate= currentdate.getTime();
long date_exprired=0;

	try{
		String afterEncryptPassword="";
		MD5 Encrypt = new MD5();
        if (!password.equals("")){
       	 afterEncryptPassword = Encrypt.callHash(password);
        }    
		ApplicationContext appContext =  ApplicationContextProvider.getGlobalContext(this.getServletContext());
		 SignUpDao signupDAO=(SignUpDao)appContext.getBean("signupDAO");
		 ArrayList<SignUp> signupArr=signupDAO.checkLogin(email,afterEncryptPassword);
		 JSONArray jsonArray = new JSONArray();	
		 for (int i = 0; i < signupArr.size() ; i++) {
				SignUp signup = signupArr.get(i);
				JSONObject json = new JSONObject();
				json.put("user_id", signup.getUser_id() );
				json.put("email", signup.getEmail());
				
				date_exprired=signup.getDate_exprired();
				session.setAttribute("SessionFirstName",signup.getFirst_name());
			    session.setAttribute("SessionLastName",signup.getLast_name());
			   	session.setAttribute("SessionCellPhone",signup.getCell_phone());
			   	session.setAttribute("SessionCompanyName",signup.getCompany_name());
			   	session.setAttribute("SessionCompanyWebsite",signup.getCompany_website());
			   	session.setAttribute("SessionCompanyAddress",signup.getCompany_address());
				if(date_exprired<lCurentdate){
					iexprire=1;

				}
				json.put("exprire", iexprire);
				session.setAttribute("SessionExprired", Integer.toString(iexprire));
			   
			   	if(signup.getTeam_role()==1){
			   		session.setAttribute("SessionUserId", Integer.toString(signup.getUser_id()));
			   		session.setAttribute("SessionEmail",signup.getEmail());
				   	session.setAttribute("SessionTeamId",Integer.toString(signup.getTeam_id()));
				   	session.setAttribute("SessionAdmin",Integer.toString(signup.getTeam_role()));	
			   	}
			    jsonArray.put(i,json);
			}
		 out.println(jsonArray);
	}
	catch(Exception e){
		out.println(e);
	}
%>
