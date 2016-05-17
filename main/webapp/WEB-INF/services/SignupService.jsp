<%@ page language="java" contentType="application/json; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.*"%>
<%@ page import="java.util.Date"%>
<%@ page import="org.springframework.context.ApplicationContext" %>
<%@ page import="org.springframework.context.support.ClassPathXmlApplicationContext" %>
<%@ page import="com.andwise.common.*" %>
<%@ page import="com.andwise.signup.dao.SignUpDao" %>
<%@ page import="com.andwise.signup.model.SignUp" %>
<%
String first_name="";
String last_name="";
String password="";
String email="";
int team_role =1;
String cell_phone="";
String company_website="";
String company_address="";
String company_name="";
String industry="";
String contentemail="";
String titleemail="";
String promote="";
int user_id=0;
long l_start_date=0;
long l_date_exprired=0;
int i_promotion=0;
//String start_date="";
String gmt="";
UUID uuid = UUID.randomUUID();
String sKey = uuid.toString();
if(session.getAttribute("domain")==null){
	response.sendRedirect("./");
}
if(request.getParameter("promotion")!=null){
	promote =request.getParameter("promotion");	
}
if(request.getParameter("contentemail")!=null){
	contentemail =request.getParameter("contentemail");	
}
if(request.getParameter("titleemail")!=null){
	titleemail =request.getParameter("titleemail");	
}
if(request.getParameter("firstname")!=null)
	first_name =request.getParameter("firstname");
if(request.getParameter("lastname")!=null)
	last_name =request.getParameter("lastname");
if(request.getParameter("email")!=null)
	email =request.getParameter("email");
if(request.getParameter("password")!=null)
	password =request.getParameter("password");
if(request.getParameter("cell_phone")!=null)
	cell_phone =request.getParameter("cell_phone");
if(request.getParameter("company_name")!=null)
	company_name =request.getParameter("company_name");
if(request.getParameter("industry")!=null)
	industry =request.getParameter("industry");
//if(request.getParameter("start_date")!=null)
	//start_date =request.getParameter("start_date");

DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
if(request.getParameter("gmt")!=null){
	gmt =request.getParameter("gmt");
	
}
Date start_date = new Date();
//formatter.setTimeZone(TimeZone.getTimeZone(gmt));
//Date datetime = (Date)formatter.parse(start_date);
Date datetime=(Date)formatter.parse(formatter.format(start_date));
l_start_date=datetime.getTime();
if(promote.equals("1")){
	l_date_exprired =l_start_date+(59*24*60*60*1000l);
	i_promotion=1;
}
else
{
	l_date_exprired =l_start_date+(29*24*60*60*1000l);
	i_promotion=0;
	}

try{
	ApplicationContext appContext =  ApplicationContextProvider.getGlobalContext(this.getServletContext());
	 SignUpDao signupDAO=(SignUpDao)appContext.getBean("signupDAO");
	 user_id= signupDAO.insertPerson(first_name,last_name,password,email,team_role,cell_phone,company_name,company_website,company_address,industry,l_start_date,l_date_exprired,i_promotion);
	 if(user_id!=0){
		String keyactive= sKey + "-"+ Integer.toString(user_id);
		signupDAO.insertKeyActive(user_id,keyactive);
		new Messages(this.getServletContext()).processSend(user_id, first_name,last_name,1, email, keyactive, request.getContextPath(), first_name+" "+last_name,contentemail,titleemail);
	 }
	 out.println(user_id);
}
catch(Exception e){
	out.println(e);
}

%>
