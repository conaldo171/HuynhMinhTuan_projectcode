<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@ page import="com.andwise.common.*" %>
 <%@include file="/admin/module/view/common/Permission.jsp"%>

<% 
ConfigTable cfTable = ConfigFactory.getInstance();
cfTable.getAllKey();
out.println("<H1>DONE</H1>");

%>