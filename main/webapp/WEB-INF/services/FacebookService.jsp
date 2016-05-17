<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.*"%>
<%@ page import="com.andwise.common.*" %>
<%@ page import="java.io.*"%>
<%@page import="org.json.*"%>
<%@ page import="com.restfb.*"%>
<%@ page import="com.restfb.types.*"%>
<%@ page import="com.restfb.json.*"%>

<% 
String access_token="";
String key_word="";
String action="";
if(request.getParameter("key_word")!=null){
	key_word=request.getParameter("key_word");
}
if(request.getParameter("Action")!=null){
	action=request.getParameter("Action");
}
if(request.getParameter("access_token")!=null){
	access_token=request.getParameter("access_token");
}
DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
Date date = new Date();
long lCurentdate=0;
Date current_date=(Date)formatter.parse(formatter.format(date));
lCurentdate = current_date.getTime()/1000;
	JSONArray jsonReturn = new JSONArray();
   JSONArray jsonArray = new JSONArray();
   FacebookClient facebookClient = new DefaultFacebookClient(access_token);
   int paging=0;
   do {
	   paging++;
	   Connection<Post> publicSearch =
		   facebookClient.fetchConnection("search", Post.class,Parameter.with("q", key_word), Parameter.with("type", "post"),Parameter.with("limit",50),Parameter.with("until",lCurentdate-1));
	         long lcreate_date=0;
	         for(int i=0;i<publicSearch.getData().size();i++){
	        		JSONObject json = new JSONObject();
	        		Date create_date=(Date)formatter.parse(formatter.format(publicSearch.getData().get(i).getCreatedTime()));
	        		lcreate_date=create_date.getTime()/1000;
	        	 	json.put("user_id", publicSearch.getData().get(i).getFrom().getId());
	        	 	if(publicSearch.getData().get(i).getFrom().getCategory()!=null){
	        	 		json.put("category",1);
	        	 	}
	        	 	else{
	        	 		json.put("category",0);
	        	 	}
	        	 
	        	 	jsonArray.put(json);
	        	 	
	         } 
	         lCurentdate = lcreate_date;
   } while (lCurentdate!=0 && paging<10);
   jsonReturn=jsonArray;
   out.println(jsonReturn);  
	

%>
