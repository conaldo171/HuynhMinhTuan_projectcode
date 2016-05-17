package com.andwise.common;
import java.io.InputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import twitter4j.*;
import twitter4j.auth.AccessToken;
import com.andwise.common.*;
import com.restfb.BinaryAttachment;
import com.restfb.DefaultFacebookClient;
import com.restfb.FacebookClient;
import com.restfb.Parameter;
import com.restfb.types.FacebookType;
import com.restfb.types.Page;

public class TwitterApi {
   
 private JSONArray jsonArray;
int  count=1;
 public String getTopTwitter(String token,String token_secrect, long date_from, long date_to){
	
	 jsonArray=new JSONArray();
	 ConfigTable cfTable = ConfigFactory.getInstance();
	 String tw_consumer_key =cfTable.getValue("tw_consumer_key"); 
	 String tw_consumer_secret =cfTable.getValue("tw_consumer_secret");
	 TwitterFactory fac = new TwitterFactory();
	 AccessToken accessToken = new AccessToken(token,token_secrect);
	 Twitter twitter = fac.getInstance();
	 twitter.setOAuthConsumer(tw_consumer_key,tw_consumer_secret);
	 twitter.setOAuthAccessToken(accessToken);
	 Paging paging = new Paging(1,200);
		 List<Status> statuses;
	try {
		statuses = twitter.getUserTimeline(paging);
		Date create_date = new Date();
		 DateFormat formatter = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
		 long lcreate=0;
		 for (int i=0; i<statuses.size();i++){
			 JSONObject json = new JSONObject();
			 Status st= statuses.get(i);
			 create_date = st.getCreatedAt();
			 Date currentdate=(Date)formatter.parse(formatter.format(create_date));
            lcreate= currentdate.getTime();
			 if((date_from<=lcreate)&&(lcreate<=date_to)){
				 json.put("created_at",lcreate);
				 json.put("id",st.getId());
				 json.put("text",st.getText());
				 json.put("in_reply_to_status_id",st.getInReplyToStatusId());
				 json.put("favorite_count",st.getFavoriteCount());
				 json.put("retweet_count",st.getRetweetCount());
				 json.put("user_mentions",st.getUserMentionEntities());
				 json.put("user_tweet_name", st.getUser().getScreenName());
				 json.put("user_id", st.getUser().getId());
				 json.put("paging",count); 
				 jsonArray.put(i,json);
			 }
		 }
	
		 if((date_from<=lcreate)&&(lcreate<=date_to)){
			 count = count+1;
			 getTopTwitterMore(token, token_secrect,date_from, date_to);	 
		 }

		
	} catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	 return jsonArray.toString();
	
 }
 public String getTopTwitterMore(String token,String token_secrect, long date_from, long date_to){
	 ConfigTable cfTable = ConfigFactory.getInstance();
	 String tw_consumer_key =cfTable.getValue("tw_consumer_key"); 
	 String tw_consumer_secret =cfTable.getValue("tw_consumer_secret");
	 TwitterFactory fac = new TwitterFactory();
	 AccessToken accessToken = new AccessToken(token,token_secrect);
	 //Twitter twitter = fac.getInstance();

	 Twitter twitter = fac.getInstance();
	 twitter.setOAuthConsumer(tw_consumer_key,tw_consumer_secret);
	 twitter.setOAuthAccessToken(accessToken);
	 Paging paging = new Paging(count,200);
		 List<Status> statuses;
	try {
		statuses = twitter.getUserTimeline(paging);
		Date create_date = new Date( );
		long lcreate=0;
		 DateFormat formatter = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
		 for (int i=0; i<statuses.size();i++){
			 JSONObject json = new JSONObject();
			 Status st= statuses.get(i);
			 create_date = st.getCreatedAt();
			 Date currentdate=(Date)formatter.parse(formatter.format(create_date));
            lcreate= currentdate.getTime();
			 if((date_from<=lcreate)&&(lcreate<=date_to)){
			 json.put("created_at",lcreate);
			 json.put("id",st.getId());
			 json.put("text",st.getText());
			 json.put("in_reply_to_status_id",st.getInReplyToStatusId());
			 json.put("favorite_count",st.getFavoriteCount());
			 json.put("retweet_count",st.getRetweetCount());
			 json.put("user_mentions",st.getUserMentionEntities());
			 json.put("user_tweet_name", st.getUser().getScreenName());
			 json.put("user_id", st.getUser().getId());
			 json.put("paging",count);
		 	 //create_date = st.getCreatedAt();
		 	jsonArray.put(json);
		 }
		 }
		
		 if((date_from<=lcreate)&&(lcreate<=date_to)){
			 count = count+1;
			 getTopTwitterMore(token, token_secrect,date_from, date_to);	 
		 }

	} catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	 
	return jsonArray.toString();
 }
 public String getLastTwitterMore(String token,String token_secrect, long last_date_from, long last_date_to){
	 ConfigTable cfTable = ConfigFactory.getInstance();
	 String tw_consumer_key =cfTable.getValue("tw_consumer_key"); 
	 String tw_consumer_secret =cfTable.getValue("tw_consumer_secret");
	 TwitterFactory fac = new TwitterFactory();
	 AccessToken accessToken = new AccessToken(token,token_secrect);
	 //Twitter twitter = fac.getInstance();

	 Twitter twitter = fac.getInstance();
	 twitter.setOAuthConsumer(tw_consumer_key,tw_consumer_secret);
	 twitter.setOAuthAccessToken(accessToken);
	 Paging paging = new Paging(count,200);
		 List<Status> statuses;
	try {
		statuses = twitter.getUserTimeline(paging);
		Date create_date = new Date( );
		long lcreate=0;
		 DateFormat formatter = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
		 for (int i=0; i<statuses.size();i++){
			 JSONObject json = new JSONObject();
			 Status st= statuses.get(i);
			 create_date = st.getCreatedAt();
			 Date currentdate=(Date)formatter.parse(formatter.format(create_date));
             lcreate= currentdate.getTime();
			 if((last_date_from<=lcreate)&&(lcreate<=last_date_to)){
			 json.put("created_at",lcreate);
			 json.put("id",st.getId());
			 json.put("text",st.getText());
			 json.put("in_reply_to_status_id",st.getInReplyToStatusId());
			 json.put("favorite_count",st.getFavoriteCount());
			 json.put("retweet_count",st.getRetweetCount());
			 json.put("user_mentions",st.getUserMentionEntities());
			 json.put("user_tweet_name", st.getUser().getScreenName());
			 json.put("paging",count);
		 	// create_date = st.getCreatedAt();
		 	jsonArray.put(json);
		 }
		 }

		 if((last_date_from<=lcreate)&&(lcreate<=last_date_to)){
			 count = count+1;
			 getTopTwitterMore(token, token_secrect,last_date_from, last_date_to);	 
		 }

	} catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	 
	return jsonArray.toString();
 }
 public String getLastTwitter(String token,String token_secrect, long last_date_from, long last_date_to,int page){
	 jsonArray=new JSONArray();
	 ConfigTable cfTable = ConfigFactory.getInstance();
	 String tw_consumer_key =cfTable.getValue("tw_consumer_key"); 
	 String tw_consumer_secret =cfTable.getValue("tw_consumer_secret");
	 TwitterFactory fac = new TwitterFactory();
	 AccessToken accessToken = new AccessToken(token,token_secrect);
	 //Twitter twitter = fac.getInstance();

	 Twitter twitter = fac.getInstance();
	 twitter.setOAuthConsumer(tw_consumer_key,tw_consumer_secret);
	 twitter.setOAuthAccessToken(accessToken);
	 Paging paging = new Paging(page,200);
		 List<Status> statuses;
	try {
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
			 if((last_date_from<=lcreate)&&(lcreate<=last_date_to)){
			 json.put("created_at",lcreate);
			 json.put("id",st.getId());
			 json.put("text",st.getText());
			 json.put("in_reply_to_status_id",st.getInReplyToStatusId());
			 json.put("favorite_count",st.getFavoriteCount());
			 json.put("retweet_count",st.getRetweetCount());
			 json.put("user_mentions",st.getUserMentionEntities());
			 json.put("user_tweet_name", st.getUser().getScreenName());
			 json.put("paging",count);
		 	// create_date = st.getCreatedAt();
		 	jsonArray.put(json);
		 }
		 }
		
		 if((last_date_from<=lcreate)&&(lcreate<=last_date_to)){
			 count = page+1;
			 getLastTwitterMore(token, token_secrect,last_date_from, last_date_to);	 
		 }

	} catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	 
	return jsonArray.toString();
 }
 public String getUserSearch(String token,String token_secrect, String keyword){
		
	 JSONArray jsonArray=new JSONArray();
	 ConfigTable cfTable = ConfigFactory.getInstance();
	 String tw_consumer_key =cfTable.getValue("tw_consumer_key"); 
	 String tw_consumer_secret =cfTable.getValue("tw_consumer_secret");
	 TwitterFactory fac = new TwitterFactory();
	 AccessToken accessToken = new AccessToken(token,token_secrect);
	 Twitter twitter = fac.getInstance();
	 twitter.setOAuthConsumer(tw_consumer_key,tw_consumer_secret);
	 twitter.setOAuthAccessToken(accessToken);
	try {
		 int page = 1;
         ResponseList<User> users;
         do {
             users = twitter.searchUsers(keyword,page);
             for (User user : users) {
            	 JSONObject json = new JSONObject();
            	 json.put("id", user.getId());
            	 json.put("name", user.getScreenName());
            	 json.put("user_name", user.getName());
            	 json.put("avatar", user.getOriginalProfileImageURL());
            	 jsonArray.put(json);
             }
            page++;
         } while (users.size() != 0 && page < 5);
	} catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	 return jsonArray.toString();
	
 }
 public void  uploadTwitter(String token_user,String fileURL, String message) throws Exception  {
	    try{
	        
	    	ConfigTable cfTable = ConfigFactory.getInstance();
	   	    String tw_consumer_key =cfTable.getValue("tw_consumer_key"); 
	   	    String tw_consumer_secret =cfTable.getValue("tw_consumer_secret");
	   	 String server_address=cfTable.getValue("server_address");
		    String upload_image_url =cfTable.getValue("upload_image_url");
		    String url_image=server_address+upload_image_url+fileURL;	
	   	  String[] tokenArray =  token_user.split("_");
	   	  TwitterFactory fac = new TwitterFactory();
		  AccessToken accessToken = new AccessToken(tokenArray[0],tokenArray[1]);
		  Twitter twitter = fac.getInstance();
		 twitter.setOAuthConsumer(tw_consumer_key,tw_consumer_secret);
		 twitter.setOAuthAccessToken(accessToken);
	    	StatusUpdate statusUpdate = new StatusUpdate(message);
	    	if(fileURL!=null && !fileURL.equals(""))
	    	{
	    		//CommonUtils.writeToLogFile("Upload file: "+fileURL +" to Twitter"); 		
	    		java.net.URL url = new java.net.URL(url_image);    
	    		InputStream is = url.openStream();
	    		//statusUpdate.setMedia(file);
		        statusUpdate.media(is.toString(), is);
	    	}
	    	     
	        Status status = twitter.updateStatus(statusUpdate);
		    //CommonUtils.writeToLogFile("Response: "+status.toString());
	    }
	    catch(TwitterException e){
	    	throw e;   	
	    }
	}
 public void  uploadCommentTwitter(long post_id, String screenname, String token_user, String message) throws Exception  {
	    try{
	        
	    	ConfigTable cfTable = ConfigFactory.getInstance();
	   	    String tw_consumer_key =cfTable.getValue("tw_consumer_key"); 
	   	    String tw_consumer_secret =cfTable.getValue("tw_consumer_secret");
	   	
	   	  String[] tokenArray =  token_user.split("_");
	   	  TwitterFactory fac = new TwitterFactory();
		  AccessToken accessToken = new AccessToken(tokenArray[0],tokenArray[1]);
		  Twitter twitter = fac.getInstance();
		 twitter.setOAuthConsumer(tw_consumer_key,tw_consumer_secret);
		 twitter.setOAuthAccessToken(accessToken);
	    	StatusUpdate statusUpdate = new StatusUpdate("@"+screenname +" " +message);
	    	statusUpdate.inReplyToStatusId(post_id);
            Status status = twitter.updateStatus(statusUpdate);
	       // status.i
		    //CommonUtils.writeToLogFile("Response: "+status.toString());
	    }
	    catch(TwitterException e){
	    	throw e;   	
	    }
	}
 public  void  uploadFacebook (String channel_detail_Id,String tokenId, String fileURL, String message) throws Exception  {
		try{
			ConfigTable cfTable = ConfigFactory.getInstance();	 
			String server_address=cfTable.getValue("server_address");
		    String upload_image_url =cfTable.getValue("upload_image_url");
		    String url_image=server_address+upload_image_url+fileURL;			
			FacebookClient facebookClient = new DefaultFacebookClient(tokenId);
			FacebookType publishMessageResponse;
			if(fileURL!=null && !fileURL.equals(""))
	    	{
				//CommonUtils.writeToLogFile("Upload file: "+fileURL +" to Facebook");
				java.net.URL url = new java.net.URL(url_image);
				publishMessageResponse = facebookClient.publish(channel_detail_Id+ "/photos", FacebookType.class, 
								
								BinaryAttachment.with(url.toString() , url.openStream()),
								Parameter.with("message",message));
				
	    	}
			else
			{
								
				publishMessageResponse = facebookClient.publish(channel_detail_Id+ "/feed", FacebookType.class, 
								Parameter.with("message", message));
			}
				
	
			//CommonUtils.writeToLogFile("Response: "+publishMessageResponse);
		}catch(Exception e){
			throw e; 
		}
	}
 public  void  uploadCommentFacebook (String post_id,String tokenId, String message) throws Exception  {
		try{
					
			FacebookClient facebookClient = new DefaultFacebookClient(tokenId);
			FacebookType publishMessageResponse;
			publishMessageResponse = facebookClient.publish(post_id+"/comments", FacebookType.class, 
								Parameter.with("message", message));
			
		}catch(Exception e){
			throw e; 
		}
	}
 public  String getFBTokenPageId(String pageId,String tokenId)
	{
		FacebookClient facebookClient = new DefaultFacebookClient(tokenId);		
		Page page = facebookClient.fetchObject(pageId, Page.class, Parameter.with("fields","access_token"));
		String pageAccessToken = page.getAccessToken();
		
		//System.out.println(pageAccessToken);
		return pageAccessToken;	
	}
	
}
