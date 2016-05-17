  <%@ page language="java" import="java.sql.*,javax.naming.*,javax.sql.*" %>
  <%@ page import="com.mysql.jdbc.Driver" %>
<% 
//mysql driver
String driver = "com.mysql.jdbc.Driver";
Statement stat=null;
Connection con=null;
// the "url" to our DB, the last part is the name of the DB
String url = "jdbc:mysql://116.193.67.42:3306/enpickdev?useUnicode=true&characterEncoding=utf8";

// the default DB username and password may be the same as your control panel login

String name = "admin";
String pass = "mysql!vn!2013";
try
{
// Test the DB connection by making an empty table
Class.forName(driver );
// initialize the Connection, with our DB info ...
 con = DriverManager.getConnection( url, name, pass );
stat= con.createStatement();

}
catch(SQLException  e){
	stat.close();
	con.close();
}
%>