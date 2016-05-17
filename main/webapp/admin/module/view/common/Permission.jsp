<% 
String user_email="";
String user_admin_email="";
if(session.getAttribute("SessionEmailAdmin")!=null){
	user_admin_email = (String)session.getAttribute("SessionEmailAdmin");
}
else
{
	response.sendRedirect("login.jsp");
	}
%>