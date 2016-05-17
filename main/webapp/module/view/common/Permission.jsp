<% 
String user_email="";
int user_id=0;
int team_id=0;
int administrator=0;
if(session.getAttribute("SessionUserId")!=null){
	user_id = Integer.parseInt((String)session.getAttribute("SessionUserId"));
}
if(session.getAttribute("SessionTeamId")!=null)
	team_id	= Integer.parseInt((String)session.getAttribute("SessionTeamId"));
if(session.getAttribute("SessionAdmin")!=null){
	administrator = Integer.parseInt((String)session.getAttribute("SessionAdmin"));
}
if(session.getAttribute("SessionEmail")!=null){
	user_email = (String)session.getAttribute("SessionEmail");//
}
else
{
	response.sendRedirect("login.jsp");
	}


%>