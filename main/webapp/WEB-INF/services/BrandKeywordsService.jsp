<%@ page language="java" contentType="application/json; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.text.*"%>
<%@ page import="java.util.*"%>
<%@ page import="org.springframework.context.ApplicationContext" %>
<%@ page import="org.springframework.context.support.ClassPathXmlApplicationContext" %>
<%@ page import="com.andwise.brandkeywords.dao.BrandKeywordsDao" %>
<%@ page import="com.andwise.brandkeywords.model.BrandKeywords" %>
<%@ page import="com.andwise.common.*" %>
<%@include file="../../module/view/common/Permission.jsp"%>
<%
String brand_keyword="";
int type=0;
int message_id = 0;
long last_view=0;
long lcreate_date=0;
int keyword_id=0;
String action="";
DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
Date date = new Date();
String gmt="";

if(session.getAttribute("SessionGmt")!=null){
	gmt=(String)session.getAttribute("SessionGmt");
}
if(request.getParameter("brand_keyword")!=null){
	brand_keyword=  request.getParameter("brand_keyword");
}
if(request.getParameter("type")!=null){
	type= Integer.parseInt(request.getParameter("type"));
}
if(request.getParameter("Action")!=null){
	action=request.getParameter("Action");
}

formatter.setTimeZone(TimeZone.getTimeZone(gmt));

Date currentdate=(Date)formatter.parse(formatter.format(date));
lcreate_date= currentdate.getTime();
	try
	{
		 ApplicationContext appContext =  ApplicationContextProvider.getGlobalContext(this.getServletContext());
		 BrandKeywordsDao bandKeywordDAO=(BrandKeywordsDao)appContext.getBean("brandKeywordDAO");
		if(action.equals("save"))
		{
			keyword_id=bandKeywordDAO.saveBrandKeyword(brand_keyword,user_id,type,lcreate_date,lcreate_date );
		}
			
		else if(action.equals("update"))
		{
			int id=0;
			if(request.getParameter("keyword_id")!=null){
				id= Integer.parseInt(request.getParameter("keyword_id"));
			}
			bandKeywordDAO.updateBrandKeyword(id,brand_keyword,user_id,type,lcreate_date,lcreate_date );
			keyword_id=2;
			}
		else if(action.equals("delete"))
			
		{
			int id=0;
			if(request.getParameter("keyword_id")!=null){
				id= Integer.parseInt(request.getParameter("keyword_id"));
			}
			bandKeywordDAO.deleteBrandKeyword(id,user_id);
			keyword_id=2;
			}
		else if(action.equals("updatesearch"))
			
		{
			int id=0;
			int select_search=0;
			if(request.getParameter("keyword_id")!=null){
				id= Integer.parseInt(request.getParameter("keyword_id"));
			}
			if(request.getParameter("select_search")!=null){
				select_search= Integer.parseInt(request.getParameter("select_search"));
			}
			bandKeywordDAO.updateBrandKeywordSearch(id,select_search);
			keyword_id=2;
			}
	else if(action.equals("updatetime"))
			
		{
			int id=0;
			long time_view=0;
			if(request.getParameter("keyword_id")!=null){
				id= Integer.parseInt(request.getParameter("keyword_id"));
			}
			if(request.getParameter("time_view")!=null){
				time_view= Long.parseLong(request.getParameter("time_view"));
			}
			bandKeywordDAO.updateLastTimeBrandKeywordSearch(id,time_view);
			keyword_id=2;
			}
			
		
			
	}
	catch(Exception e)
	{
		out.println(e);
	}

%>
<%=keyword_id%>