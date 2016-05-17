package com.andwise.common.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;


public class ServiceController extends AbstractController {

	@Override
	protected ModelAndView handleRequestInternal(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String requestURI = request.getRequestURI();
	 	String contextPath = request.getContextPath(); 	
	 	String servletName = requestURI.substring(contextPath.length()+1,requestURI.length()-3); 	 	
	 	String serviceName =  servletName + "Service"; 
		ModelAndView model = new ModelAndView(serviceName);
		
		return model;
	}
}