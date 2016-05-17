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
<%@ page import="twitter4j.Status"%>
<%@ page import="twitter4j.*"%>
<%@ page import="twitter4j.User"%>
<%@ page import="java.io.*"%>
<%@page import="org.json.*"%>

<% 
String action="";
String oauth_verifier="";
String token="";
String token_secret="";
String post_id="";
String screen_name="";
if(request.getParameter("Action")!=null){
	action=request.getParameter("Action");
}
if(request.getParameter("token")!=null){
	token=request.getParameter("token");
}
if(request.getParameter("token_secret")!=null){
	token_secret=request.getParameter("token_secret");
}
if(request.getParameter("post_id")!=null){
	post_id=request.getParameter("post_id");
}
if(request.getParameter("screen_name")!=null){
	screen_name=request.getParameter("screen_name");
}
ConfigTable cfTable = ConfigFactory.getInstance();
String tw_consumer_key =cfTable.getValue("tw_consumer_key"); 
String tw_consumer_secret =cfTable.getValue("tw_consumer_secret");
Twitter twitter = new TwitterFactory().getInstance();
twitter.setOAuthConsumer(tw_consumer_key,tw_consumer_secret);
AccessToken accessToken = new AccessToken(token,token_secret);
twitter.setOAuthAccessToken(accessToken);

try {
	JSONArray jsonReturn = new JSONArray();
	if(action.equals("favorite")){
		JSONArray jsonArray = new JSONArray();
		JSONObject json = new JSONObject();
		Status status = twitter.createFavorite(Long.parseLong(post_id));
		 json.put("status",status);
		 jsonArray.put(json);
		 jsonReturn=jsonArray;
	}
	else if(action.equals("delfavorite"))
	{
		JSONArray jsonArray = new JSONArray();
		JSONObject json = new JSONObject();
		
		Status status = twitter.destroyFavorite(Long.parseLong(post_id));
		 json.put("status",status);
		 jsonArray.put(json);
		 jsonReturn=jsonArray;
		 jsonArray.put(json);
         jsonReturn=jsonArray;
	}
	else if(action.equals("deltweet")){
		JSONArray jsonArray = new JSONArray();
		JSONObject json = new JSONObject();
		Status status = twitter.destroyStatus(Long.parseLong(post_id));
		 json.put("status",status);
		 jsonArray.put(json);
		 jsonReturn=jsonArray;
		 jsonArray.put(json);
        jsonReturn=jsonArray;
	}
	else if(action.equals("addfriends")){
		JSONArray jsonArray = new JSONArray();
		JSONObject json = new JSONObject();
		User user = twitter.createFriendship(screen_name);
		 json.put("user",user);
		 jsonArray.put(json);
		 jsonReturn=jsonArray;
		 jsonArray.put(json);
        jsonReturn=jsonArray;
	}
	else if(action.equals("posttw")){
		String message="";
		if(request.getParameter("message")!=null){
			message=request.getParameter("message");
		}
		JSONArray jsonArray = new JSONArray();
		JSONObject json = new JSONObject();
		 StatusUpdate statusUpdate = new StatusUpdate(message);
		 Status status = twitter.updateStatus(statusUpdate);
		 json.put("status",status);
		 jsonArray.put(json);
		 jsonReturn=jsonArray;
	}
	else if(action.equals("searchtw")){
		String keyword="";
		if(request.getParameter("key_word")!=null){
			keyword=request.getParameter("key_word");
		}
		JSONArray jsonArray = new JSONArray();
		
		 try {
	            Query query = new Query(keyword);
	            QueryResult result;
	            do {
	            result = twitter.search(query);
	            List<Status> tweets = result.getTweets();
	            for (Status tweet : tweets) {
	            	JSONObject json = new JSONObject();
	            	json.put("post_id",tweet.getId());
	            	json.put("screen_name",tweet.getUser().getScreenName());
	            	json.put("friends",tweet.getUser().getFriendsCount());
	            	json.put("user_id",tweet.getUser().getId());
	            	 jsonArray.put(json);
	                
	               // System.out.println("@" + tweet.getUser().getScreenName() + " - " + tweet.getText());
	            }
	            } while ((query = result.nextQuery()) != null);
	          //  System.exit(0);
	            jsonReturn=jsonArray;
	           // System.exit(0);
	        } catch (TwitterException te) {
	            te.printStackTrace();
	            //System.out.println("Failed to search tweets: " + te.getMessage());
	           
	        }
	}
	out.println(jsonReturn);
} catch (Exception e) {
	System.out.println("Failed to search tweets:"+e);
    //throw new ServletException(e);
}
%>
