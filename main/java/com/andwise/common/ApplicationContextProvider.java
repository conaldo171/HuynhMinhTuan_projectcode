package com.andwise.common;

import javax.servlet.ServletContext;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
 

public class ApplicationContextProvider implements ApplicationContextAware{
 private static ApplicationContext ctx = null;
 public static ApplicationContext getApplicationContext() {
return ctx;
 }
 public  void setApplicationContext(ApplicationContext ctx) throws BeansException {
this.ctx = ctx;
 }
 public static ApplicationContext getGlobalContext( ServletContext servletContext)
 {
	 ApplicationContext appContext = (ClassPathXmlApplicationContext)WebApplicationContextUtils.getRequiredWebApplicationContext(servletContext).getBean("applicationContext");
	 return appContext;
	 
 }
 
}