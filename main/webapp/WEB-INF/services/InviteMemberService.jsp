<%@ page language="java" contentType="application/json; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.*"%>
<%@ page import="java.util.Date"%>
<%@ page import="org.springframework.context.ApplicationContext" %>
<%@ page import="org.springframework.context.support.ClassPathXmlApplicationContext" %>
<%@ page import="com.andwise.common.*" %>
<%@ page import="com.andwise.signup.dao.SignUpDao" %>
<%@ page import="com.andwise.signup.model.SignUp" %>
<%@include file="../../module/view/common/Permission.jsp"%>
<% 
String first_name="";
String last_name="";
//String password="";
String email="";
int group_id=0;
int permission=0;
String action="";
int member_id=0;//contentemail,titleemail
String contentemail="";
String titleemail="";
String list_channel_detail="";
long l_start_date=0;
long l_date_exprired=0;
UUID uuid = UUID.randomUUID();
String sKey = uuid.toString();
if(administrator==1){
	String user_name="";
	if(request.getParameter("contentemail")!=null){
		contentemail =request.getParameter("contentemail");	
	}
	if(request.getParameter("titleemail")!=null){
		titleemail =request.getParameter("titleemail");	
	}
	if(session.getAttribute("SessionFirstName")!=null)
		user_name =(String)session.getAttribute("SessionFirstName") + " "+ (String)session.getAttribute("SessionLastName");
	if(request.getParameter("firstname")!=null)
		first_name =request.getParameter("firstname");
	if(request.getParameter("lastname")!=null)
		last_name =request.getParameter("lastname");
	if(request.getParameter("email")!=null)
		email =request.getParameter("email");
	if(request.getParameter("list_channel_detail")!=null){
		list_channel_detail=request.getParameter("list_channel_detail").replace("'","");
		list_channel_detail =list_channel_detail+",";
	}
	if(request.getParameter("Action")!=null)
		action =request.getParameter("Action");	
	if(request.getParameter("permission")!=null)
		permission =Integer.parseInt((String)request.getParameter("permission"));//permission
	if(session.getAttribute("SessionGroupId")!=null)
		group_id= Integer.parseInt((String)session.getAttribute("SessionGroupId"));
	Date start_date = new Date();
	
	DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	Date datetime=(Date)formatter.parse(formatter.format(start_date));
	l_start_date=datetime.getTime();
	l_date_exprired =l_start_date+(29*24*60*60*1000l);
	try{
		ApplicationContext appContext =  ApplicationContextProvider.getGlobalContext(this.getServletContext());
		 SignUpDao signupDAO=(SignUpDao)appContext.getBean("signupDAO");
		if(action.equals("update")){
			if(request.getParameter("member_id")!=null)
				member_id =Integer.parseInt(request.getParameter("member_id"));
			signupDAO.updateMember(member_id,team_id,permission,list_channel_detail,user_id);
			out.println(member_id);
		}
		else
		{
			 int id= signupDAO.inviteMember(first_name,last_name,email,team_id,permission,group_id,permission,list_channel_detail,user_id,l_start_date,l_date_exprired);
			 if(id!=0){
				String keyactive= sKey + "-"+ Integer.toString(id);
				signupDAO.insertKeyActive(id,keyactive);
				new Messages(this.getServletContext()).processSend(id, first_name,last_name,2, email, keyactive, request.getContextPath(),user_name,contentemail,titleemail);
			 }
			 out.println(id);
		}
		
	}
	catch(Exception e){
		out.println(e);
	}
	
}
else
{
	out.println("error");
	//response.sendRedirect("login.jsp");
	//
	
}

%>