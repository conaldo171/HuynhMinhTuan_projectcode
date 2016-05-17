<%@ page language="java" contentType="application/json; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.*"%>
<%@ page import="com.restfb.*"%>
<%@ page import="com.restfb.util.*"%>
<%@ page import="com.restfb.json.*"%>
<%@ page import="com.restfb.batch.*"%>
<%@ page import="org.json.*"%>
<%@ page import="com.restfb.types.*"%>
<%@ page import="com.andwise.common.*" %>
<%@include file="../../module/view/common/Permission.jsp"%>
<%
String channel_detail_id="";
JSONArray jsonArray =new JSONArray();
String access_token="";
long date_to=0;
long date_from=0;
int spread=0;
float brand_royalty=0;
int share=0;
int comment=0;
if(request.getParameter("channel_detail_id")!=null){
	channel_detail_id =request.getParameter("channel_detail_id");
}
if(request.getParameter("access_token")!=null){
	access_token =request.getParameter("access_token");
}
if(request.getParameter("datefrom")!=null){
	date_from =Long.parseLong(request.getParameter("datefrom"));
}
if(request.getParameter("dateto")!=null){
	date_to =Long.parseLong(request.getParameter("dateto"));
}
FacebookClient facebookClient = new DefaultFacebookClient(access_token);
//Connection<Post> myFeed = facebookClient.fetchConnection("me/feed", Post.class);
String query = "SELECT post_id ,created_time,message,description,share_count,like_info,comment_info FROM stream WHERE source_id = "+channel_detail_id+" limit 0,200";
List<JsonObject> queryResults = facebookClient.executeFqlQuery(query, JsonObject.class);
 for(int i=0;i<queryResults.size();i++){
	 comment=comment+ queryResults.get(i).getJsonObject("comment_info").getInt("comment_count");
	 share =share+ queryResults.get(i).getInt("share_count");
	 spread=spread+comment+share;
 }
 float post_total=queryResults.size();
 float c_h= comment+share;
 brand_royalty=(int)((c_h/post_total)*100);
 JSONObject json = new JSONObject();
 json.put("channel_detail_id",channel_detail_id);
 json.put("spread",spread);
 json.put("brand_royalty",brand_royalty);
 jsonArray.put(json);
 //System.out.println(post_total+"_"+brand_royalty+"_");
%>
<%=jsonArray%>
