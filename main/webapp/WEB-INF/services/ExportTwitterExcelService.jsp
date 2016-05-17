<%@ page language="java" contentType="charset=utf-8" pageEncoding="utf-8"%>
<%@page import="com.andwise.common.ExportExcel"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.*"%>
<%@ page import="java.io.FileNotFoundException"%>
<%@ page import="org.json.*"%>
<%@ page import="java.net.*"%>
<%@ page import="java.io.*"%>
<%@ page import="java.io.IOException" %>
<%@ page import="org.apache.commons.io.*" %>
<%@ page import="org.apache.poi.ss.usermodel.*" %>
<%@ page import="org.apache.poi.hssf.usermodel.HSSFCell" %>
<%@ page import="org.apache.poi.hssf.usermodel.HSSFCellStyle" %>
<%@ page import="org.apache.poi.hssf.usermodel.HSSFDataFormat" %>
<%@ page import="org.apache.poi.hssf.usermodel.HSSFRow" %>
<%@ page import="org.apache.poi.hssf.usermodel.HSSFSheet" %>
<%@ page import="org.apache.poi.hssf.usermodel.HSSFWorkbook" %>
<%@ page import="org.apache.poi.hssf.util.*" %>
<%@ page import="java.awt.image.BufferedImage" %> 
<%@ page import="javax.imageio.*" %> 
<%@ page import="com.andwise.common.*" %>
<%@ page import="org.apache.commons.codec.binary.Base64" %>
<%@page import="com.andwise.common.CommonUtil"%>
<%@page import="net.sf.jxls.transformer.XLSTransformer"%>
<%@include file="../../module/view/common/Permission.jsp"%>
<%
//response.setContentType("application/vnd.ms-excel");
response.setContentType("application/vnd.ms-excel;charset=utf-8");
request.setCharacterEncoding("UTF-8");
String filename="Report_Twitter";

Date datetime = new Date();
String current_date = datetime.getYear()+1900+""+(datetime.getMonth()+1)+""+datetime.getDate()+""+datetime.getHours()+""+datetime.getMinutes()+""+datetime.getSeconds();
response.setHeader("Content-Disposition", "attachment; filename=" + filename+"_"+current_date+ ".xls");
try{
	ConfigTable cfTable = ConfigFactory.getInstance();
	String date="",engagement="",activity="",brand_royalty="",title="",spread="";
	int no=0,followers=0,new_followers=0,following=0,reach=0,content=0,retweets=0,comment=0,tweets=0,mentions=0,favorite=0;
	XLSTransformer transformer = new XLSTransformer();  
	String server_address= cfTable.getValue("server_address");
	String templateFileName = cfTable.getValue("export_template_path")+"Teamplate_twitter.xls"; //"d:\\export\\Teamplate_facebook.xls";
 //String templateFileName = "d:\\export\\Teamplate_twitter.xls"; 
	String destFileName =cfTable.getValue("export_result_path")+  filename+"_"+current_date +".xls";
//String destFileName ="d:\\export\\"+ filename+"_"+user_id+".xls"; // "d:\\export\\"+ filename+"_"+user_id+".xls";
String date_range =request.getParameter("daterange");	
String image_follower =request.getParameter("image_follower");
	String image_following =request.getParameter("image_following");
	String image_reach =request.getParameter("image_reach");
	String image_tweet =request.getParameter("image_tweet");
	String image_retweet =request.getParameter("image_retweet");
	String image_comment =request.getParameter("image_comment");
	String image_mention =request.getParameter("image_mention");
	String image_favorite =request.getParameter("image_favorite");
	String image_engagement =request.getParameter("image_engagement");
	String image_engagement_rate =request.getParameter("image_engagement_rate");
	String image_activity =request.getParameter("image_activity");
	String image_brandroyalty =request.getParameter("image_brandroyalty");
	//String image_activity_spread =request.getParameter("image_activity_spread");
	
	String exportExcelContent = request.getParameter("exportExcelContent");
	JSONObject jsonObject = new JSONObject(exportExcelContent);
	//JSONArray json_content_summary = jsonObject.getJSONArray("content_summary");
	JSONArray json_content_top20 = jsonObject.getJSONArray("content_top20");
	JSONObject engagement_chart = jsonObject.getJSONObject("content_engagement");
	JSONObject summary_chart = jsonObject.getJSONObject("summary_chart");//content_chart
	JSONObject content_chart = jsonObject.getJSONObject("content_chart");//content_engagement
	//JSONObject content_engagement = jsonObject.getJSONObject("content_engagement");
		List list_date = new ArrayList();
	List list_content = new ArrayList();
	 List list_content_top20 = new ArrayList();
	// List list_content_influence = new ArrayList();
	 List list_summary_chart = new ArrayList();
	 //List list_content_chart = new ArrayList();
	// List list_content_engagement = new ArrayList();
	 list_summary_chart.add(new ExportExcelTwitter(
			 summary_chart.getInt("total_follower_value"),
			 summary_chart.getInt("new_follower_value"),
			 summary_chart.getInt("total_following_value"),
			 summary_chart.getInt("new_following_value"),
			 engagement_chart.getInt("total_engagement_value"),
			 engagement_chart.getInt("total_engagement_rate_value"),
			 engagement_chart.getInt("total_activity_value"),
			 engagement_chart.getInt("total_brand_royalty_value"),
			 content_chart.getInt("total_tweet_value"),
			 content_chart.getInt("new_tweet_value"),
			 content_chart.getInt("total_retweet_value"),
			 content_chart.getInt("new_retweet_value"),
			 content_chart.getInt("total_mention_value"),
			 content_chart.getInt("new_mention_value"),
			 content_chart.getInt("total_comment_value"),
			 content_chart.getInt("new_comment_value"),
			 content_chart.getInt("total_favorite_value"),
			 content_chart.getInt("new_favorite_value"),
			 summary_chart.getInt("total_reach_value"),
			 summary_chart.getInt("new_reach_value")));
	/// list_content_chart.add(new ExportExcel(content_chart.getString("total"),content_chart.getString("new_content"),content_chart.getString("growth"),content_chart.getInt("total_value"),content_summary_chart.getInt("new_value"),content_chart.getString("growth_value")));
	// list_content_engagement.add(new ExportExcel(content_engagement.getString("engagement"),content_engagement.getString("engagement_rate"),content_engagement.getString("activity"),content_engagement.getString("brand_royalty"),content_engagement.getString("engagement_value"),content_engagement.getString("engagement_rate_value"),content_engagement.getString("activity_value"),content_engagement.getString("brand_royalty_value")));
	 list_date.add(new ExportExcelTwitter(date_range));
	int count=0;

		for (int j=0; j<json_content_top20.length();j++){
			JSONObject jObj = json_content_top20.getJSONObject(j);
			date = jObj.getString("date");
			no = jObj.getInt("no");
			title= jObj.getString("title");
			engagement = jObj.getString("engagement");
			mentions= jObj.getInt("mention");
			retweets= jObj.getInt("retweet");
			comment= jObj.getInt("comment");
			favorite= jObj.getInt("favorite");
			list_content_top20.add(new ExportExcelTwitter(date,no,title,Float.parseFloat(engagement),mentions,retweets,comment,favorite));
			
		}
		
		//content_influence
		Map beans = new HashMap(); 
		beans.put("date_range", list_date);
		beans.put("content_summary_chart", list_summary_chart);
		beans.put("contenttop20", list_content_top20);
	//	beans.put("content_influence", list_content_influence);
		//beans.put("summary", list_content_summary_chart);
		//beans.put("content", list_content_chart);
		//beans.put("engagement", list_content_engagement);
		transformer.transformXLS(templateFileName, beans, destFileName);
		 //conver image to byte
		String str_image_follower[]=image_follower.split(",");
		String str_image_following[]=image_following.split(",");
		String str_image_reach[]=image_reach.split(",");
		String str_image_tweet[]=image_tweet.split(",");
		String str_image_retweet[]=image_retweet.split(",");
		String str_image_comment[]=image_comment.split(",");
		String str_image_mention[]=image_mention.split(",");
		String str_image_favorite[]=image_favorite.split(",");
		
		String str_image_engagement[]=image_engagement.split(",");
		String str_image_engagement_rate[]=image_engagement_rate.split(",");
		String str_image_activity[]=image_activity.split(",");
		String str_image_brandroyalty[]=image_brandroyalty.split(",");
		//String str_image_activity_spread[]=image_activity_spread.split(",");
		
	BufferedImage newImg_follower;
	BufferedImage newImg_following;
	BufferedImage newImg_reach;
	BufferedImage newImg_tweet;
	BufferedImage newImg_retweet;
	BufferedImage newImg_comment;
	BufferedImage newImg_mention;
	BufferedImage newImg_favorite;
	
	BufferedImage newImg_engagement;
	BufferedImage newImg_engagement_rate;
	BufferedImage newImg_activity;
	BufferedImage newImg_brandroyalty;
	//BufferedImage newImg_activity_spread;
	
	newImg_follower =  CommonUtil.decodeToImage(str_image_follower[1]);
	newImg_following =  CommonUtil.decodeToImage(str_image_following[1]);
	 newImg_reach =  CommonUtil.decodeToImage(str_image_reach[1]);
	 newImg_tweet =  CommonUtil.decodeToImage(str_image_tweet[1]);
	 newImg_retweet =  CommonUtil.decodeToImage(str_image_retweet[1]);
	 newImg_comment =  CommonUtil.decodeToImage(str_image_comment[1]);
	 newImg_mention =  CommonUtil.decodeToImage(str_image_mention[1]);
	 newImg_favorite =  CommonUtil.decodeToImage(str_image_favorite[1]);
	 
	 newImg_engagement =  CommonUtil.decodeToImage(str_image_engagement[1]);
	 newImg_engagement_rate =  CommonUtil.decodeToImage(str_image_engagement_rate[1]);
	 newImg_activity =  CommonUtil.decodeToImage(str_image_activity[1]);
	 newImg_brandroyalty =  CommonUtil.decodeToImage(str_image_brandroyalty[1]);
	// newImg_activity_spread =  CommonUtil.decodeToImage(str_image_activity_spread[1]);
	
	 ByteArrayOutputStream baos_follower = new ByteArrayOutputStream();
	 ByteArrayOutputStream baos_following = new ByteArrayOutputStream();
	 ByteArrayOutputStream baos_reach = new ByteArrayOutputStream();
	 ByteArrayOutputStream baos_tweet = new ByteArrayOutputStream();
	 ByteArrayOutputStream baos_retweet = new ByteArrayOutputStream();
	 ByteArrayOutputStream baos_comment = new ByteArrayOutputStream();
	 ByteArrayOutputStream baos_mention = new ByteArrayOutputStream();
	 ByteArrayOutputStream baos_favorite = new ByteArrayOutputStream();
	 ByteArrayOutputStream baos_engagement = new ByteArrayOutputStream();
	 ByteArrayOutputStream baos_engagement_rate = new ByteArrayOutputStream();
	 ByteArrayOutputStream baos_activity = new ByteArrayOutputStream();
	 ByteArrayOutputStream baos_brandroyalty = new ByteArrayOutputStream();
	// ByteArrayOutputStream baos_activity_spread = new ByteArrayOutputStream();
	
	 ImageIO.write( newImg_follower, "png", baos_follower );
	 ImageIO.write( newImg_following, "png", baos_following );
	 ImageIO.write( newImg_reach, "png", baos_reach );
	 ImageIO.write( newImg_tweet, "png", baos_tweet );
	 ImageIO.write( newImg_retweet, "png", baos_retweet );
	 ImageIO.write( newImg_comment, "png", baos_comment );
	 ImageIO.write( newImg_mention, "png", baos_mention );
	 ImageIO.write( newImg_favorite, "png", baos_favorite );
	 
	 ImageIO.write( newImg_engagement, "png", baos_engagement );
	 ImageIO.write( newImg_engagement_rate, "png", baos_engagement_rate );
	 ImageIO.write( newImg_activity, "png", baos_activity );
	 ImageIO.write( newImg_brandroyalty, "png", baos_brandroyalty );
	// ImageIO.write( newImg_activity_spread, "png", baos_activity_spread );
	
	 baos_following.flush();
	 baos_follower.flush();
	 baos_reach.flush();
	 baos_tweet.flush();
	 baos_retweet.flush();
	 baos_comment.flush();
	 baos_mention.flush();
	 baos_favorite.flush();
	 
	 baos_engagement.flush();
	 baos_engagement_rate.flush();
	 baos_activity.flush();
	 baos_brandroyalty.flush();
	// baos_activity_spread.flush();
	 byte[] imageInByte_follower = baos_follower.toByteArray();
	 byte[] imageInByte_following = baos_following.toByteArray();
	 byte[] imageInByte_reach = baos_reach.toByteArray();
	 byte[] imageInByte_tweet = baos_tweet.toByteArray();
	 byte[] imageInByte_retweet = baos_retweet.toByteArray();
	 byte[] imageInByte_comment = baos_comment.toByteArray();
	 byte[] imageInByte_mention = baos_mention.toByteArray();
	 byte[] imageInByte_favorite = baos_favorite.toByteArray();
	 
	 byte[] imageInByte_engagement = baos_engagement.toByteArray();
	 byte[] imageInByte_engagement_rate = baos_engagement_rate.toByteArray();
	 byte[] imageInByte_activity = baos_activity.toByteArray();
	 byte[] imageInByte_brandroyalty = baos_brandroyalty.toByteArray();
	// byte[] imageInByte_activity_spread = baos_activity_spread.toByteArray();
	
	 baos_follower.close();
	 baos_following.close();
	 baos_reach.close();
	 baos_tweet.close();
	 baos_retweet.close();
	 baos_comment.close();
	 baos_mention.close();
	 baos_favorite.close();
	 
	 baos_engagement.close();
	 baos_engagement_rate.close();
	 baos_activity.close();
	 baos_brandroyalty.close();
	// baos_activity_spread.close();

	// beans.put("image_summary", new ExportExcel(imageInByte));
	FileInputStream fileIn = new FileInputStream(new File(destFileName));
             
	//Get the workbook instance for XLS file 
	   HSSFWorkbook wb = new HSSFWorkbook(fileIn);
	//Get first sheet from the workbook
		HSSFSheet sheet = wb.getSheetAt(0);
	    int pictureIdx_follower = wb.addPicture(imageInByte_follower, Workbook.PICTURE_TYPE_PNG);
	    int pictureIdx_following = wb.addPicture(imageInByte_following, Workbook.PICTURE_TYPE_PNG);
	    int pictureIdx_reach = wb.addPicture(imageInByte_reach, Workbook.PICTURE_TYPE_PNG);
	    int pictureIdx_tweet = wb.addPicture(imageInByte_tweet, Workbook.PICTURE_TYPE_PNG);
	    int pictureIdx_retweet = wb.addPicture(imageInByte_retweet, Workbook.PICTURE_TYPE_PNG);
	    int pictureIdx_comment = wb.addPicture(imageInByte_comment, Workbook.PICTURE_TYPE_PNG);
	    int pictureIdx_mention = wb.addPicture(imageInByte_mention, Workbook.PICTURE_TYPE_PNG);
	    int pictureIdx_favorite = wb.addPicture(imageInByte_favorite, Workbook.PICTURE_TYPE_PNG);
	    
	    int pictureIdx_engagement = wb.addPicture(imageInByte_engagement, Workbook.PICTURE_TYPE_PNG);
	    int pictureIdx_engagement_rate = wb.addPicture(imageInByte_engagement_rate, Workbook.PICTURE_TYPE_PNG);
	    int pictureIdx_activity = wb.addPicture(imageInByte_activity, Workbook.PICTURE_TYPE_PNG);
	    int pictureIdx_brandroyalty = wb.addPicture(imageInByte_brandroyalty, Workbook.PICTURE_TYPE_PNG);
	   // int pictureIdx_activity_spread = wb.addPicture(imageInByte_activity_spread, Workbook.PICTURE_TYPE_PNG);
	    
	    CreationHelper helper = wb.getCreationHelper();
	    // Create the drawing patriarch.  This is the top level container for all shapes. 
	    // sheet.addMergedRegion(CellRangeAddress.valueOf("D2:H11"));
	     //sheet.addMergedRegion(CellRangeAddress.valueOf("D15:M29"));
	     //sheet.addMergedRegion(CellRangeAddress.valueOf("D33:M42"));
	     //sheet.addMergedRegion(CellRangeAddress.valueOf("D46:G55"));
	     //sheet.addMergedRegion(CellRangeAddress.valueOf("G46:M55"));
	    Drawing drawing = sheet.createDrawingPatriarch();

	    //add a picture shape of follower
	    ClientAnchor anchor_follower = helper.createClientAnchor();
	    anchor_follower.setCol1(3);
	    anchor_follower.setRow1(27);
	    Picture pict_follower = drawing.createPicture(anchor_follower, pictureIdx_follower);
	    pict_follower.resize();
	    //add a picture shape of following
	    ClientAnchor anchor_following = helper.createClientAnchor();
	    anchor_following.setCol1(3);
	    anchor_following.setRow1(43);
		    Picture pict_following = drawing.createPicture(anchor_following, pictureIdx_following);
		    pict_following.resize();
		  //add a picture shape of reach
		    ClientAnchor anchor_reach = helper.createClientAnchor();
		    anchor_reach.setCol1(12);
		    anchor_reach.setRow1(27);
			Picture pict_reach = drawing.createPicture(anchor_reach, pictureIdx_reach);
			pict_reach.resize();
			//add a picture shape of tweet
		    ClientAnchor anchor_tweet = helper.createClientAnchor();
		    anchor_tweet.setCol1(12);
		    anchor_tweet.setRow1(72);
			Picture pict_tweet = drawing.createPicture(anchor_tweet, pictureIdx_tweet);
			pict_tweet.resize();
			//add a picture shape of retweet
		    ClientAnchor anchor_retweet = helper.createClientAnchor();
		    anchor_retweet.setCol1(3);
		    anchor_retweet.setRow1(87);
			Picture pict_retweet = drawing.createPicture(anchor_retweet, pictureIdx_retweet);
			pict_retweet.resize();
			//add a picture shape of comment
		    ClientAnchor anchor_comment = helper.createClientAnchor();
		    anchor_comment.setCol1(12);
		    anchor_comment.setRow1(87);
			Picture pict_comment = drawing.createPicture(anchor_comment, pictureIdx_comment);
			pict_comment.resize();
			//add a picture shape of mention
		    ClientAnchor anchor_mention = helper.createClientAnchor();
		    anchor_mention.setCol1(3);
		    anchor_mention.setRow1(102);
			Picture pict_mention = drawing.createPicture(anchor_mention, pictureIdx_mention);
			pict_mention.resize();
			//add a picture shape of favorite
		    ClientAnchor anchor_favorite = helper.createClientAnchor();
		    anchor_favorite.setCol1(12);
		    anchor_favorite.setRow1(102);
			Picture pict_favorite = drawing.createPicture(anchor_favorite, pictureIdx_favorite);
			pict_favorite.resize();
			
			//add a picture shape of engagement
		    ClientAnchor anchor_engagement = helper.createClientAnchor();
		    anchor_engagement.setCol1(3);
		    anchor_engagement.setRow1(57);
			Picture pict_engagement = drawing.createPicture(anchor_engagement, pictureIdx_engagement);
			pict_engagement.resize();
			//add a picture shape of engagement rate
		    ClientAnchor anchor_engagement_rate = helper.createClientAnchor();
		    anchor_engagement_rate.setCol1(12);
		    anchor_engagement_rate.setRow1(57);
			Picture pict_engagement_rate = drawing.createPicture(anchor_engagement_rate, pictureIdx_engagement_rate);
			pict_engagement_rate.resize();
			//add a picture shape of activity
		    ClientAnchor anchor_activity = helper.createClientAnchor();
		    anchor_activity.setCol1(3);
		    anchor_activity.setRow1(72);
			Picture pict_activity = drawing.createPicture(anchor_activity, pictureIdx_activity);
			pict_activity.resize();
			//add a picture shape of brand royalty
		    ClientAnchor anchor_brandroyalty = helper.createClientAnchor();
		    anchor_brandroyalty.setCol1(12);
		    anchor_brandroyalty.setRow1(42);
			Picture pict_brandroyalty = drawing.createPicture(anchor_brandroyalty, pictureIdx_brandroyalty);
			pict_brandroyalty.resize();
			
			OutputStream fileOut  = response.getOutputStream();
			 wb.write(fileOut);
			 fileOut.close();
             fileIn.close();
			 File deletefile= new File(destFileName);
			 deletefile.delete();
	   
	  
	 
} catch (IOException e) {
    e.printStackTrace();
}

catch(Exception e){
	e.printStackTrace();
}
  

%>