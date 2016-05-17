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
<%@ page import="twitter4j.*"%>
<%@ page import="java.io.*"%>
<%@page import="org.json.*"%>
<%@ page import="com.restfb.*"%>
<%@ page import="com.restfb.types.*"%>
<%@ page import="com.restfb.json.*"%>

<% 
String token="1693512997-fPZYRLiuLNcldXqZy9G9XTwJ7cSpbNKkiadai7K";
String token_secret="uyyYJtgKXloM5tcPCmf25gNzedOcWim5cyMlwF4NbMs";
String access_token="CAAHbfBOW3NUBAJOpNefLWKBJGNDaH4o70lRrafaMtRBYZCGaNrtKnRkMMsZCrKcZAfaoRMMDhJ4cvQTz7vcPHvKBJiZAI6WvQ6GUTsCz2QRUHBZCMr09T9FOoXIfzW1fbYqZB7JIPjta06AEvr0KjSy2sBGu0b8vJS0F2gwYQuBjTMMuUpJwM0CNwWeZAuA5FMZD";
JSONArray jsonArray=new JSONArray();
ConfigTable cfTable = ConfigFactory.getInstance();
String tw_consumer_key =cfTable.getValue("tw_consumer_key"); 
String tw_consumer_secret =cfTable.getValue("tw_consumer_secret");
TwitterFactory fac = new TwitterFactory();
AccessToken accessToken = new AccessToken(token,token_secret);
//Twitter twitter = fac.getInstance();

Twitter twitter = fac.getInstance();
twitter.setOAuthConsumer(tw_consumer_key,tw_consumer_secret);
twitter.setOAuthAccessToken(accessToken);
Paging paging = new Paging(2,200);
	 List<Status> statuses;

	statuses = twitter.getUserTimeline(paging);
	Date create_date = new Date( );
	 DateFormat formatter = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
	long lcreate=0;
	 for (int i=0; i<statuses.size();i++){
		 JSONObject json = new JSONObject();
		 Status st= statuses.get(i);
		 create_date = st.getCreatedAt();
		 Date currentdate=(Date)formatter.parse(formatter.format(create_date));
        lcreate= currentdate.getTime();
		
		 json.put("created_at",st.getCreatedAt());
		 json.put("id",st.getId());
		 json.put("text",st.getText());
		 json.put("in_reply_to_status_id",st.getInReplyToStatusId());
		 json.put("favorite_count",st.getFavoriteCount());
		 json.put("retweet_count",st.getRetweetCount());
		 json.put("user_mentions",st.getUserMentionEntities());
		 json.put("user_tweet_name", st.getUser().getScreenName());
		 //json.put("paging",count);
	 	// create_date = st.getCreatedAt();
	 	jsonArray.put(json);
	 }
	out.print(jsonArray);

%>
