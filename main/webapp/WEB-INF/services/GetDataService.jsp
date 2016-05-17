<%@ page language="java" contentType="application/json; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.util.*"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.text.*"%>
<%@ page import="org.springframework.context.ApplicationContext" %>
<%@ page import="org.springframework.context.support.ClassPathXmlApplicationContext" %>
<%@ page import="com.andwise.common.*" %>
<%@page import="org.json.*"%>
<%@ page import="com.andwise.signup.dao.SignUpDao" %>
<%@ page import="com.andwise.signup.model.SignUp" %>
<%@include file="../../module/view/common/Permission.jsp"%>
<% 
String first_name="";
String last_name="";
//String password="";

String action="";
int id=0;
if(request.getParameter("Action")!=null){
	action=request.getParameter("Action");
}
if(request.getParameter("user_id")!=null){
	id=Integer.parseInt(request.getParameter("user_id"));
}
else
{
	id=user_id;
	}
try{
	Date date = new Date();
	DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	Date currentdate=(Date)formatter.parse(formatter.format(date));
	long lCurentdate= currentdate.getTime();
	long date_exprired=0;
	 JSONArray jsonReturn = new JSONArray();
	ApplicationContext appContext =  ApplicationContextProvider.getGlobalContext(this.getServletContext());
	 SignUpDao signupDAO=(SignUpDao)appContext.getBean("signupDAO");
	 if(action.equals("profile")){
		 ArrayList<SignUp> listArr= signupDAO.getProfileInfor(user_email);
		 JSONArray jsonArray = new JSONArray();
			for (int i = 0; i < listArr.size() ; i++) {
				SignUp listgroup = listArr.get(i);
				JSONObject json = new JSONObject();
				json.put("user_id",listgroup.getUser_id());
				json.put("first_name", listgroup.getFirst_name());
				json.put("last_name", listgroup.getLast_name());
				json.put("email", listgroup.getEmail());
				json.put("cell_phone", listgroup.getCell_phone());
				json.put("company_name", listgroup.getCompany_name());
				json.put("company_website", listgroup.getCompany_website());
				json.put("company_address", listgroup.getCompany_address());
				json.put("company_website", listgroup.getCompany_website());
				json.put("team_role",listgroup.getTeam_role());
				date_exprired=listgroup.getDate_exprired();
				int iexprire=0;
				if(date_exprired<lCurentdate){
					iexprire=1;

				}
				long number_date=date_exprired-lCurentdate;
				json.put("exprire", iexprire);
				
				json.put("number_day", number_date/1000);
			   // session.setAttribute("SessionAdmin",Integer.toString(listgroup.getTeam_role()));
			    //session.setAttribute("SessionUserId",Integer.toString(listgroup.getUser_id()));
			    //session.setAttribute("SessionTeamId",Integer.toString(listgroup.getTeam_id()));
			    jsonArray.put(i,json);
			} 
			jsonReturn=jsonArray;
	 }
	 else if(action.equals("user_by_id")){
		 ArrayList<SignUp> listArr= signupDAO.getUserInfor(id); 
		 JSONArray jsonArray = new JSONArray();
			for (int i = 0; i < listArr.size() ; i++) {
				SignUp listgroup = listArr.get(i);
				JSONObject json = new JSONObject();
				json.put("user_id",listgroup.getUser_id());
				json.put("first_name", listgroup.getFirst_name());
				json.put("last_name", listgroup.getLast_name());
				json.put("email", listgroup.getEmail());
				json.put("cell_phone", listgroup.getCell_phone());
				json.put("company_name", listgroup.getCompany_name());
				json.put("company_website", listgroup.getCompany_website());
				json.put("company_address", listgroup.getCompany_address());
				json.put("company_website", listgroup.getCompany_website());
				date_exprired=listgroup.getDate_exprired();
				int iexprire=0;
				if(date_exprired<lCurentdate){
					iexprire=1;

				}
				long number_date=date_exprired-lCurentdate;
				json.put("exprire", number_date);
				json.put("number_day",number_date/1000);
				json.put("team_role",listgroup.getTeam_role());
			    session.setAttribute("SessionAdmin",Integer.toString(listgroup.getTeam_role()));
			   	session.setAttribute("SessionUserId",Integer.toString(listgroup.getUser_id()));
			    session.setAttribute("SessionTeamId",Integer.toString(listgroup.getTeam_id()));
			    session.setAttribute("SessionEmail",listgroup.getEmail());
			    //session.setAttribute("SessionUserName",listgroup.getFirst_name()+" "+listgroup.getFirst_name());
			    jsonArray.put(i,json);
			} 
			jsonReturn=jsonArray;
	 }
	 else
	 {
		 ArrayList<SignUp> listArr= signupDAO.getDataGroup(user_id);
		 JSONArray jsonArray = new JSONArray();
			for (int i = 0; i < listArr.size() ; i++) {
				SignUp listgroup = listArr.get(i);
				JSONObject json = new JSONObject();
				if(listgroup.getGroup_id()==1){
					session.setAttribute("SessionGroupId",Integer.toString(listgroup.getGroup_id()));
				}
				json.put("group_id", listgroup.getGroup_id());
				json.put("group_name", listgroup.getGroup_name());
				json.put("select_group", listgroup.getSelect_group());
			   
			    jsonArray.put(i,json);
			} 
			jsonReturn=jsonArray;
	 }
		out.println(jsonReturn);
}
catch(Exception e){
	out.println(e);
}
%>