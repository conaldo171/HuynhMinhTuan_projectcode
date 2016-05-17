<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.*"%>
<%@ page import="com.andwise.common.*" %>
<%@ page import="twitter4j.Twitter"%>
<%@ page import="twitter4j.TwitterException"%>
<%@ page import="twitter4j.TwitterFactory"%>
<%@ page import="twitter4j.auth.RequestToken"%>
<%@ page import="twitter4j.auth.*"%>
<%@ page import="twitter4j.conf.*"%>
<%@ page import="java.io.*"%>
<%@page import="org.json.*"%>

<% 
String action="";
String oauth_verifier="";
if(request.getParameter("Action")!=null){
	action=request.getParameter("Action");
}

ConfigTable cfTable = ConfigFactory.getInstance();
String tw_consumer_key =cfTable.getValue("tw_consumer_key"); 
String tw_consumer_secret =cfTable.getValue("tw_consumer_secret");
Twitter twitter = new TwitterFactory().getInstance();
twitter.setOAuthConsumer(tw_consumer_key,tw_consumer_secret);

try {
	JSONArray jsonReturn = new JSONArray();
	if(action.equals("")){
		JSONArray jsonArray = new JSONArray();
		JSONObject json = new JSONObject();
		StringBuffer callbackURL = request.getRequestURL();
		RequestToken requestToken = twitter.getOAuthRequestToken();
		   session.setAttribute("Sessiontoken_user",requestToken.getToken());
		   session.setAttribute("Sessiontoken_secret",requestToken.getTokenSecret());
		   session.setAttribute("Sessiontoken_requestToken",requestToken);
		   json.put("url_auth",requestToken.getAuthorizationURL());
		   jsonArray.put(json);
		   jsonReturn=jsonArray;
	}
	else
	{
		JSONArray jsonArray = new JSONArray();
		JSONObject json = new JSONObject();
		RequestToken token_request=null;
		if(request.getParameter("oauth_verifier")!=null){
			oauth_verifier=request.getParameter("oauth_verifier");
		}
		
		//AccessToken access_token1=null;
		 if(session.getAttribute("Sessiontoken_requestToken")!=null){
			 token_request=(RequestToken)session.getAttribute("Sessiontoken_requestToken");
		    }
		
		
		 AccessToken access_token =twitter.getOAuthAccessToken(token_request,oauth_verifier);
		 json.put("access_token",access_token.getToken()+"_"+access_token.getTokenSecret());
		 json.put("screen_name",access_token.getScreenName());
		 json.put("user_id",access_token.getUserId());
		 jsonArray.put(json);
         jsonReturn=jsonArray;
	}
   
	out.println(jsonReturn);
} catch (TwitterException e) {
    throw new ServletException(e);
}
%>
