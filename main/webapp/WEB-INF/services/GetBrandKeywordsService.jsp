<%@ page language="java" contentType="application/json; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.text.*"%>
<%@ page import="java.util.*"%>
<%@page import="java.util.ArrayList"%>
<%@page import="org.json.*"%>
<%@ page import="org.springframework.context.ApplicationContext" %>
<%@ page import="org.springframework.context.support.ClassPathXmlApplicationContext" %>
<%@ page import="com.andwise.brandkeywords.dao.BrandKeywordsDao" %>
<%@ page import="com.andwise.brandkeywords.model.BrandKeywords" %>
<%@ page import="com.andwise.common.*" %>
<%@include file="../../module/view/common/Permission.jsp"%>
<%
long last_view=0;
long lcreate_date=0;
int keyword_id=0;
String action="";
if(request.getParameter("keyword_id")!=null){
	keyword_id= Integer.parseInt(request.getParameter("keyword_id"));
}
if(request.getParameter("Action")!=null){
	action=request.getParameter("Action");
}
try
	{
		ConfigTable cfTable = ConfigFactory.getInstance();
		JSONArray jsonReturn = new JSONArray();
		 ApplicationContext appContext =  ApplicationContextProvider.getGlobalContext(this.getServletContext());
		 BrandKeywordsDao bandKeywordDAO=(BrandKeywordsDao)appContext.getBean("brandKeywordDAO");
		 ArrayList<BrandKeywords> brandKeywordsArr = bandKeywordDAO.selectBrandKeyword(user_id);
		// String time_brand_keyword=	cfTable.getValue("time_brand_keyword");
		 String limit_load_search_keyword_fb=cfTable.getValue("limit_load_search_keyword_fb");
		 String limit_load_search_keyword_tw = cfTable.getValue("limit_load_search_keyword_tw");
			JSONArray jsonArray = new JSONArray();
			
			for (int i = 0; i < brandKeywordsArr.size() ; i++) {
				BrandKeywords brandKeywords = brandKeywordsArr.get(i);
				JSONObject json = new JSONObject();
				json.put("keyword_id", brandKeywords.getKeyword_id() );
				json.put("brand_keyword", brandKeywords.getBrand_keyword());
			    json.put("type", brandKeywords.getType());
			    json.put("last_view", brandKeywords.getLast_view());
			    json.put("select_search", brandKeywords.getSelect_search());
			    //json.put("time_brand_keyword", Integer.parseInt(time_brand_keyword));
			    json.put("limit_load_search_keyword_fb",Integer.parseInt(limit_load_search_keyword_fb));
			    json.put("limit_load_search_keyword_tw", Integer.parseInt(limit_load_search_keyword_tw));
     		    jsonArray.put(i,json);
			}
			jsonReturn=jsonArray;
			
		
			out.println(jsonReturn);
		
			
	}
	catch(Exception e)
	{
		out.println(e);
	}

%>
