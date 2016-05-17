<%@ page language="java" contentType="application/json; charset=utf-8" pageEncoding="utf-8"%>
<%@page import="java.util.ArrayList"%>
<%@page import="org.json.*"%>

<%@ page import="org.springframework.context.ApplicationContext" %>
<%@ page import="org.springframework.context.support.ClassPathXmlApplicationContext" %>
<%@ page import="com.andwise.customer.dao.CustomerDAO" %>
<%@ page import="com.andwise.customer.model.Customer" %>
<%@include file="../../module/view/common/Permission.jsp"%>
<%
response.setContentType("application/json");

try
{
	
	ApplicationContext context = new ClassPathXmlApplicationContext("Spring-Module.xml");   	 	
	
	//insert						
	CustomerDAO customerDAO = (CustomerDAO) context.getBean("customerDAO");
	int custId = Integer.parseInt(request.getParameter("custId"));
	String custName =  request.getParameter("name");
	int custAge = Integer.parseInt(request.getParameter("age"));
	
	Customer customer = new Customer(custId, custName,custAge);
	customerDAO.insert(customer);
		
	//get all
	ArrayList<Customer> custArr = customerDAO.getAll();			
	JSONArray jsonArray = new JSONArray(custArr);	
	out.println(jsonArray);
	//out.flush();
	
}
catch(Exception e)
{
	
}
%>