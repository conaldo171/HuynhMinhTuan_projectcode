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
	
	int rows = 0;
	try
	{
		ApplicationContext context = new ClassPathXmlApplicationContext("Spring-Module.xml");   	 
		CustomerDAO customerDAO = (CustomerDAO) context.getBean("customerDAO");
		ArrayList<Customer> custArr = customerDAO.getAll();
		rows = custArr.size();
				
		JSONArray jsonArray = new JSONArray(custArr);	
		
		/*
		for (int i = 0; i < rows; i++) {
			Customer customer = custArr.get(i);
			
			JSONObject json = new JSONObject();
			json.put("custId", customer.getCustId());
		    json.put("name", customer.getName());
		    json.put("age", customer.getAge());
		    jsonArray.put(i,json);
		}
	 	*/	 	
	    //System.out.print(jsonArray);
	    //System.out.flush();
	    
		out.println(jsonArray);
	}
	catch(Exception e)
	{
		
	}

%>