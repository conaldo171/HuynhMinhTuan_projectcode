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
response.setContentType("application/vnd.ms-excel");
request.setCharacterEncoding("UTF-8");
String filename="Report_Facebook";
Date datetime = new Date();
String current_date = datetime.getYear()+1900+""+(datetime.getMonth()+1)+""+datetime.getDate()+""+datetime.getHours()+""+datetime.getMinutes()+""+datetime.getSeconds();
response.setHeader("Content-Disposition", "attachment; filename=" + filename+"_"+current_date+ ".xls");
try{
	ConfigTable cfTable = ConfigFactory.getInstance();
	String date="",engagement="",engagement_rate="",activity="",brand_royalty="",title="",account="",spread="";
	int no=0,fan=0,new_fan=0,friend_of_fan=0,reach=0,people_talking=0,content=0,like=0,share=0,comment=0,like_of_comment=0;
	XLSTransformer transformer = new XLSTransformer();  
	String server_address= cfTable.getValue("server_address");
	String templateFileName = cfTable.getValue("export_template_path")+"Teamplate_facebook.xls"; //"d:\\export\\Teamplate_facebook.xls";
	 //String templateFileName = "d:\\export\\Teamplate_facebook.xls"; 
	String destFileName =cfTable.getValue("export_result_path")+  filename+"_"+user_id +".xls";
	//String destFileName ="d:\\export\\"+ filename+"_"+user_id+".xls"; // "d:\\export\\"+ filename+"_"+user_id+".xls";
	 String date_range =request.getParameter("daterange");
		String image_engagement =request.getParameter("image_engagement");
		String image_content =request.getParameter("image_content");
		String image_gender =request.getParameter("image_gender");
		String image_age =request.getParameter("image_age");
		String image_chart_fan =request.getParameter("image_chart_fan");
		String image_chart_reach =request.getParameter("image_chart_reach");
		String image_chart_peopletalking =request.getParameter("image_chart_peopletalking");
		String image_chart_peopletalking_fan =request.getParameter("image_chart_peopletalking_fan");
		String image_chart_like =request.getParameter("image_chart_like");
		String image_chart_engagement_growth =request.getParameter("image_chart_engagement_growth");
		String image_chart_activity =request.getParameter("image_chart_activity");//image_chart_brandroyalty
		String image_chart_brandroyalty =request.getParameter("image_chart_brandroyalty");
		String image_chart_share =request.getParameter("image_chart_share");
		String image_chart_comment =request.getParameter("image_chart_comment");
		String image_chart_comment_like =request.getParameter("image_chart_comment_like");
	String image_status =request.getParameter("image_status");
	String image_education =request.getParameter("image_education");
	String exportExcelContent = request.getParameter("exportExcelContent");
	JSONObject jsonObject = new JSONObject(exportExcelContent);
	JSONArray json_content_summary = jsonObject.getJSONArray("content_summary");
	JSONArray json_content_top20 = jsonObject.getJSONArray("content_top20");
	JSONArray json_content_influence = jsonObject.getJSONArray("content_influence");
	JSONObject content_summary_chart = jsonObject.getJSONObject("content_summary_chart");//content_chart
	JSONObject content_chart = jsonObject.getJSONObject("content_chart");//content_engagement
	JSONObject content_engagement = jsonObject.getJSONObject("content_engagement");
	JSONObject gender_chart = jsonObject.getJSONObject("gender_chart");
	JSONObject age_chart = jsonObject.getJSONObject("age_chart");
	JSONObject education_chart = jsonObject.getJSONObject("education_chart");
	JSONObject status_chart = jsonObject.getJSONObject("status_chart");
	 List list_demo_graphic = new ArrayList();
	List list_date = new ArrayList();
	List list_content = new ArrayList();
	 List list_content_top20 = new ArrayList();
	 List list_content_influence = new ArrayList();
	 List list_content_summary_chart = new ArrayList();
	 List list_content_chart = new ArrayList();
	 List list_content_engagement = new ArrayList();
	 list_demo_graphic.add(new ExportExcel(gender_chart.getInt("women_value"),gender_chart.getInt("men_value"),age_chart.getInt("u20data"),age_chart.getInt("u30data"),age_chart.getInt("u40data"),age_chart.getInt("u50data"),age_chart.getInt("u60data"),age_chart.getInt("u70data"),status_chart.getInt("married_value"),status_chart.getInt("single_value"),education_chart.getInt("highschool_value"),education_chart.getInt("college_value")));
	 list_date.add(new ExportExcel(date_range));
	 list_content_summary_chart.add(new ExportExcel(
			 content_summary_chart.getInt("total_fan_value"),
			 content_summary_chart.getString("growth_fan_value"),
			 content_summary_chart.getInt("new_fan_value"),
			 content_summary_chart.getInt("total_reach_value"),
			 content_summary_chart.getString("growth_reach_value"),
			 content_summary_chart.getInt("new_reach_value"),
			 content_summary_chart.getInt("total_peopletalking_value"),
			 content_summary_chart.getString("growth_peopletalking_value"),
			 content_summary_chart.getInt("new_peopletalking_value"),
			 content_summary_chart.getString("total_peopletalking_fan_value"),
			 content_summary_chart.getString("growth_peopletalking_fan_value"),
			 content_summary_chart.getString("new_peopletalking_fan_value"),
			 
			 content_chart.getInt("total_content_value"),
			 content_chart.getString("growth_contents_value"),
			 content_chart.getInt("new_content_value"),
			 content_chart.getInt("total_like_value"),
			 content_chart.getString("growth_like_value"),
			 content_chart.getInt("new_like_value"),
			 content_chart.getInt("total_share_value"),
			 content_chart.getString("growth_share_value"),
			 content_chart.getInt("new_share_value"),
			 content_chart.getInt("total_comment_value"),
			 content_chart.getString("growth_comment_value"),
			 content_chart.getInt("new_comment_value"),
			 content_chart.getInt("total_comment_like_value"),
			 content_chart.getString("growth_comment_like_value"),
			 content_chart.getInt("new_comment_like_value")));
	// list_content_chart.add(new ExportExcel(content_chart.getString("total"),content_chart.getString("new_content"),content_chart.getString("growth"),content_chart.getInt("total_value"),content_summary_chart.getInt("new_value"),content_chart.getString("growth_value")));
	 list_content_engagement.add(new ExportExcel(content_engagement.getString("engagement"),content_engagement.getString("engagement_rate"),content_engagement.getString("activity"),content_engagement.getString("brand_royalty"),content_engagement.getString("engagement_value"),content_engagement.getString("engagement_rate_value"),Float.parseFloat(content_engagement.getString("activity_value")),content_engagement.getString("brand_royalty_value")));
	 int count=0;
	 for (int i=0; i<json_content_summary.length();i++){
		 count++;
			JSONObject jObj = json_content_summary.getJSONObject(i);
			date = jObj.getString("date");
			no = count;
			fan= jObj.getInt("fan");
			new_fan= jObj.getInt("newfan");
			friend_of_fan= jObj.getInt("friendsoffan");
			reach= jObj.getInt("reach");
			people_talking= jObj.getInt("peopletalking");
			engagement = jObj.getString("engagement");
			engagement_rate = jObj.getString("engagementRate");
			activity = jObj.getString("activity");
			brand_royalty = jObj.getString("brandroyalty");
			content= jObj.getInt("content");
			like= jObj.getInt("like");
			share= jObj.getInt("share");
			comment= jObj.getInt("comment");
			like_of_comment= jObj.getInt("likeofcomment");
			list_content.add(new ExportExcel(date,no,fan,new_fan,friend_of_fan,reach,people_talking,Float.parseFloat(engagement),engagement_rate,Float.parseFloat(activity),Float.parseFloat(brand_royalty),content,like,share,comment,like_of_comment));
	 }
		
		for (int j=0; j<json_content_top20.length();j++){
			JSONObject jObj = json_content_top20.getJSONObject(j);
			//date = jObj.getString("date");
			no = jObj.getInt("no");
			//fan= jObj.getInt("fan");
			title= jObj.getString("title");
			engagement = jObj.getString("engagement");
			people_talking= jObj.getInt("peopletalking");
			reach= jObj.getInt("reach");
			like=jObj.getInt("like");
			share= jObj.getInt("share");
			comment= jObj.getInt("comment");
			like_of_comment= jObj.getInt("commentoflike");
			list_content_top20.add(new ExportExcel(no,title,reach,like,share,comment,like_of_comment));
			
		}
		for (int k=0; k<json_content_influence.length();k++){
			JSONObject jObj = json_content_influence.getJSONObject(k);
			date = jObj.getString("date");
			no = jObj.getInt("no");
			account= jObj.getString("account");
			spread = jObj.getString("spread");
			brand_royalty= jObj.getString("brandroyalty");
			list_content_influence.add(new ExportExcel(date,no,account,spread,Float.parseFloat(brand_royalty)));
			
		}
		//content_influence
		Map beans = new HashMap();  
		beans.put("date_range", list_date);
		beans.put("content_summary", list_content);
		beans.put("contenttop20", list_content_top20);
		beans.put("content_influence", list_content_influence);
		beans.put("content_summary_chart", list_content_summary_chart);
		//beans.put("content", list_content_chart);
		beans.put("engagement_chart", list_content_engagement);
		beans.put("demogrphic_chart", list_demo_graphic);
		transformer.transformXLS(templateFileName, beans, destFileName);
		 //conver image to byte
		String str_image_engagement[]=image_engagement.split(",");
		String str_image_content[]=image_content.split(",");
		String str_image_gender[]=image_gender.split(",");
		String str_image_age[]=image_age.split(",");
		String str_image_chart_fan[]=image_chart_fan.split(",");
		String str_image_chart_reach[]=image_chart_reach.split(",");
		String str_image_chart_peopletalking[]=image_chart_peopletalking.split(",");
		String str_image_chart_peopletalking_fan[]=image_chart_peopletalking_fan.split(",");
		String str_image_chart_like[]=image_chart_like.split(",");
		String str_image_chart_engagement_growth[]=image_chart_engagement_growth.split(",");
		String str_image_chart_activity[]=image_chart_activity.split(",");
		String str_image_chart_brandroyalty[]=image_chart_brandroyalty.split(",");
		String str_image_chart_share[]=image_chart_share.split(",");
		String str_image_chart_comment[]=image_chart_comment.split(",");
		String str_image_chart_comment_like[]=image_chart_comment_like.split(",");
		String str_image_status[]=image_status.split(",");
		String str_image_education[]=image_education.split(",");
		BufferedImage newImg_engagement;
		BufferedImage newImg_content;
		BufferedImage newImg_gender;
		BufferedImage newImg_age;
		BufferedImage newImg_fan;
		BufferedImage newImg_reach;
		BufferedImage newImg_peopletalking;
		BufferedImage newImg_peopletalking_fan;
		BufferedImage newImg_like;
		BufferedImage newImg_engagement_growth;
		BufferedImage newImg_activity;
		BufferedImage newImg_brandroyalty;
		BufferedImage newImg_share;
		BufferedImage newImg_comment;
		BufferedImage newImg_comment_like;
	BufferedImage newImg_status;
	BufferedImage newImg_education;
	 //newImg =  CommonUtil.decodeToImage(str_image_summary[1]);
	 newImg_engagement =  CommonUtil.decodeToImage(str_image_engagement[1]);
	 newImg_content =  CommonUtil.decodeToImage(str_image_content[1]);
	 newImg_gender =  CommonUtil.decodeToImage(str_image_gender[1]);
	 newImg_age =  CommonUtil.decodeToImage(str_image_age[1]);
	 newImg_fan =  CommonUtil.decodeToImage(str_image_chart_fan[1]);
	 newImg_reach =  CommonUtil.decodeToImage(str_image_chart_reach[1]);
	 newImg_peopletalking =  CommonUtil.decodeToImage(str_image_chart_peopletalking[1]);
	 newImg_peopletalking_fan =  CommonUtil.decodeToImage(str_image_chart_peopletalking_fan[1]);
	 newImg_like =  CommonUtil.decodeToImage(str_image_chart_like[1]);
	 newImg_engagement_growth =  CommonUtil.decodeToImage(str_image_chart_engagement_growth[1]);
	 newImg_activity =  CommonUtil.decodeToImage(str_image_chart_activity[1]);
	 newImg_brandroyalty =  CommonUtil.decodeToImage(str_image_chart_brandroyalty[1]);
	 newImg_share =  CommonUtil.decodeToImage(str_image_chart_share[1]);
	 newImg_comment =  CommonUtil.decodeToImage(str_image_chart_comment[1]);
	 newImg_comment_like =  CommonUtil.decodeToImage(str_image_chart_comment_like[1]);
	 newImg_status =  CommonUtil.decodeToImage(str_image_status[1]);
	 newImg_education =  CommonUtil.decodeToImage(str_image_education[1]);
	 ByteArrayOutputStream baos = new ByteArrayOutputStream();
	 ByteArrayOutputStream baos_engagement = new ByteArrayOutputStream();
	 ByteArrayOutputStream baos_content = new ByteArrayOutputStream();
	 ByteArrayOutputStream baos_gender = new ByteArrayOutputStream();
	 ByteArrayOutputStream baos_age = new ByteArrayOutputStream();
	 ByteArrayOutputStream baos_fan = new ByteArrayOutputStream();
	 ByteArrayOutputStream baos_reach = new ByteArrayOutputStream();
	 ByteArrayOutputStream baos_peopletalking = new ByteArrayOutputStream();
	 ByteArrayOutputStream baos_peopletalking_fan = new ByteArrayOutputStream();
	 ByteArrayOutputStream baos_like = new ByteArrayOutputStream();
	 ByteArrayOutputStream baos_engagement_growth = new ByteArrayOutputStream();
	 ByteArrayOutputStream baos_activity = new ByteArrayOutputStream();
	 ByteArrayOutputStream baos_brandroyalty = new ByteArrayOutputStream();
	 ByteArrayOutputStream baos_share = new ByteArrayOutputStream();
	 ByteArrayOutputStream baos_comment = new ByteArrayOutputStream();
	 ByteArrayOutputStream baos_comment_like = new ByteArrayOutputStream();
	 ByteArrayOutputStream baos_status = new ByteArrayOutputStream();
	 ByteArrayOutputStream baos_education = new ByteArrayOutputStream();
	// ImageIO.write( newImg, "png", baos );
	 ImageIO.write( newImg_engagement, "png", baos_engagement );
	 ImageIO.write( newImg_content, "png", baos_content );
	 ImageIO.write( newImg_gender, "png", baos_gender );
	 ImageIO.write( newImg_age, "png", baos_age );
	 ImageIO.write( newImg_fan, "png", baos_fan );
	 ImageIO.write( newImg_reach, "png", baos_reach );
	 ImageIO.write( newImg_peopletalking, "png", baos_peopletalking );
	 ImageIO.write( newImg_peopletalking_fan, "png", baos_peopletalking_fan );
	 ImageIO.write( newImg_like, "png", baos_like );
	 ImageIO.write( newImg_engagement_growth, "png", baos_engagement_growth );
	 ImageIO.write( newImg_activity, "png", baos_activity );
	 ImageIO.write( newImg_brandroyalty, "png", baos_brandroyalty );
	 ImageIO.write( newImg_share, "png", baos_share );
	 ImageIO.write( newImg_comment, "png", baos_comment );
	 ImageIO.write( newImg_comment_like, "png", baos_comment_like );
	 ImageIO.write( newImg_status, "png", baos_status );
	 ImageIO.write( newImg_education, "png", baos_education );
	 baos_engagement.flush();
	 baos.flush();
	 baos_content.flush();
	 baos_gender.flush();
	 baos_age.flush();
	 baos_fan.flush();
	 baos_reach.flush();
	 baos_peopletalking.flush();
	 baos_peopletalking_fan.flush();
	 baos_like.flush();
	 baos_engagement_growth.flush();
	 baos_activity.flush();
	 baos_brandroyalty.flush();
	 baos_share.flush();
	 baos_comment.flush();
	 baos_comment_like.flush();
	 baos_status.flush();
	 baos_education.flush();
	// byte[] imageInByte = baos.toByteArray();
	 byte[] imageInByte_engagement = baos_engagement.toByteArray();
	 byte[] imageInByte_content = baos_content.toByteArray();
	 byte[] imageInByte_gender = baos_gender.toByteArray();
	 byte[] imageInByte_age = baos_age.toByteArray();
	 byte[] imageInByte_fan = baos_fan.toByteArray();
	 byte[] imageInByte_reach = baos_reach.toByteArray();
	 byte[] imageInByte_peopletalking = baos_peopletalking.toByteArray();
	 byte[] imageInByte_peopletalking_fan = baos_peopletalking_fan.toByteArray();
	 byte[] imageInByte_like = baos_like.toByteArray();
	 byte[] imageInByte_engagement_growth = baos_engagement_growth.toByteArray();
	 byte[] imageInByte_activity = baos_activity.toByteArray();
	 byte[] imageInByte_brandroyalty = baos_brandroyalty.toByteArray();
	 byte[] imageInByte_share = baos_share.toByteArray();
	 byte[] imageInByte_comment = baos_comment.toByteArray();
	 byte[] imageInByte_comment_like = baos_comment_like.toByteArray();
	 byte[] imageInByte_status = baos_status.toByteArray();
	 byte[] imageInByte_education = baos_education.toByteArray();
	// baos.close();
	 baos_engagement.close();
	 baos_content.close();
	 baos_gender.close();
	 baos_age.close();
	 baos_fan.close();
	 baos_reach.close();
	 baos_peopletalking.close();
	 baos_peopletalking_fan.close();
	 baos_like.close();
	 baos_engagement_growth.close();
	 baos_activity.close();
	 baos_brandroyalty.close();
	 baos_share.close();
	 baos_comment.close();
	 baos_comment_like.close();
	 baos_status.close();
	 baos_education.close();
	// beans.put("image_summary", new ExportExcel(imageInByte));
	FileInputStream fileIn = new FileInputStream(new File(destFileName));
             
	//Get the workbook instance for XLS file 
	   HSSFWorkbook wb = new HSSFWorkbook(fileIn);
	//Get first sheet from the workbook
		HSSFSheet sheet = wb.getSheetAt(0);
		  //  int pictureIdx = wb.addPicture(imageInByte, Workbook.PICTURE_TYPE_PNG);
	    int pictureIdx_engagement = wb.addPicture(imageInByte_engagement, Workbook.PICTURE_TYPE_PNG);
	    int pictureIdx_content = wb.addPicture(imageInByte_content, Workbook.PICTURE_TYPE_PNG);
	    int pictureIdx_gender = wb.addPicture(imageInByte_gender, Workbook.PICTURE_TYPE_PNG);
	    int pictureIdx_age = wb.addPicture(imageInByte_age, Workbook.PICTURE_TYPE_PNG);
	    int pictureIdx_fan = wb.addPicture(imageInByte_fan, Workbook.PICTURE_TYPE_PNG);
	    int pictureIdx_reach = wb.addPicture(imageInByte_reach, Workbook.PICTURE_TYPE_PNG);
	    int pictureIdx_peopletalking = wb.addPicture(imageInByte_peopletalking, Workbook.PICTURE_TYPE_PNG);
	    int pictureIdx_peopletalking_fan = wb.addPicture(imageInByte_peopletalking_fan, Workbook.PICTURE_TYPE_PNG);
	    int pictureIdx_like = wb.addPicture(imageInByte_like, Workbook.PICTURE_TYPE_PNG);
	    int pictureIdx_engagement_growth = wb.addPicture(imageInByte_engagement_growth, Workbook.PICTURE_TYPE_PNG);
	    int pictureIdx_activity = wb.addPicture(imageInByte_activity, Workbook.PICTURE_TYPE_PNG);
	    int pictureIdx_brandroyalty = wb.addPicture(imageInByte_brandroyalty, Workbook.PICTURE_TYPE_PNG);
	    int pictureIdx_share = wb.addPicture(imageInByte_share, Workbook.PICTURE_TYPE_PNG);
	    int pictureIdx_comment = wb.addPicture(imageInByte_comment, Workbook.PICTURE_TYPE_PNG);
	    int pictureIdx_comment_like = wb.addPicture(imageInByte_comment_like, Workbook.PICTURE_TYPE_PNG);
	    int pictureIdx_status = wb.addPicture(imageInByte_status, Workbook.PICTURE_TYPE_PNG);
	    int pictureIdx_education = wb.addPicture(imageInByte_education, Workbook.PICTURE_TYPE_PNG);
	    CreationHelper helper = wb.getCreationHelper();
	    // Create the drawing patriarch.  This is the top level container for all shapes. 
	     int row1=145+json_content_top20.length()+json_content_influence.length();
	    int row2=164+json_content_top20.length()+json_content_influence.length();
	    String merge_col1= "C"+row1;
	    String merge_col2= "Q"+row2;
	    sheet.addMergedRegion(CellRangeAddress.valueOf(""+merge_col1+":"+merge_col2+""));
	    // sheet.addMergedRegion(CellRangeAddress.valueOf("C154:Q177"));
	     //sheet.addMergedRegion(CellRangeAddress.valueOf("D15:M29"));
	    // sheet.addMergedRegion(CellRangeAddress.valueOf("D33:M42"));
	     //sheet.addMergedRegion(CellRangeAddress.valueOf("D46:G55"));
	     //sheet.addMergedRegion(CellRangeAddress.valueOf("G46:M55"));
	    
	    Drawing drawing = sheet.createDrawingPatriarch();

	    //add a picture shape of fan
	    ClientAnchor anchor_fan = helper.createClientAnchor();
	    anchor_fan.setCol1(3);
	    anchor_fan.setRow1(26);
		Picture pict_fan = drawing.createPicture(anchor_fan, pictureIdx_fan);
		pict_fan.resize();
	    //add a picture shape of engagement
	    ClientAnchor anchor_engagement = helper.createClientAnchor();
	    anchor_engagement.setCol1(3);
	    anchor_engagement.setRow1(57);
		    Picture pict_engagement = drawing.createPicture(anchor_engagement, pictureIdx_engagement);
		    pict_engagement.resize();
		  //add a picture shape of content
		    ClientAnchor anchor_content = helper.createClientAnchor();
		    anchor_content.setCol1(3);
		    anchor_content.setRow1(87);
			Picture pict_content = drawing.createPicture(anchor_content, pictureIdx_content);
			pict_content.resize();
			//add a picture shape of gender
		    ClientAnchor anchor_gender = helper.createClientAnchor();
		    anchor_gender.setCol1(3);
		    anchor_gender.setRow1(145+json_content_top20.length()+json_content_influence.length());
			Picture pict_gender= drawing.createPicture(anchor_gender, pictureIdx_gender);
			pict_gender.resize();
			//add a picture shape of age
		    ClientAnchor anchor_age = helper.createClientAnchor();
		    anchor_age.setCol1(5);
		    anchor_age.setRow1(145+json_content_top20.length()+json_content_influence.length());
			Picture pict_age = drawing.createPicture(anchor_age, pictureIdx_age);
			pict_age.resize();
			//add a picture shape of reach
		    ClientAnchor anchor_reach = helper.createClientAnchor();
		    anchor_reach.setCol1(12);
		    anchor_reach.setRow1(26);
			Picture pict_reach = drawing.createPicture(anchor_reach, pictureIdx_reach);
			pict_reach.resize();
			//add a picture shape of peopletalking
		    ClientAnchor anchor_peopletalking = helper.createClientAnchor();
		    anchor_peopletalking.setCol1(3);
		    anchor_peopletalking.setRow1(42);
			Picture pict_peopletalking = drawing.createPicture(anchor_peopletalking, pictureIdx_peopletalking);
			pict_peopletalking.resize();
			//add a picture shape of peopletalking fan
		    ClientAnchor anchor_peopletalking_fan = helper.createClientAnchor();
		    anchor_peopletalking_fan.setCol1(12);
		    anchor_peopletalking_fan.setRow1(42);
			Picture pict_peopletalking_fan = drawing.createPicture(anchor_peopletalking_fan, pictureIdx_peopletalking_fan);
			pict_peopletalking_fan.resize();
			
			//add a picture shape of like
		    ClientAnchor anchor_like = helper.createClientAnchor();
		    anchor_like.setCol1(12);
		    anchor_like.setRow1(86);
			Picture pict_like = drawing.createPicture(anchor_like, pictureIdx_like);
			pict_like.resize();
			//add a picture shape of engagemament growth
		    ClientAnchor anchor_engagement_growth = helper.createClientAnchor();
		    anchor_engagement_growth.setCol1(12);
		    anchor_engagement_growth.setRow1(57);
			Picture pict_engagement_growth = drawing.createPicture(anchor_engagement_growth, pictureIdx_engagement_growth);
			pict_engagement_growth.resize();
			//add a picture shape of activity
		    ClientAnchor anchor_activity = helper.createClientAnchor();
		    anchor_activity.setCol1(3);
		    anchor_activity.setRow1(72);
			Picture pict_activity = drawing.createPicture(anchor_activity, pictureIdx_activity);
			pict_activity.resize();
			//add a picture shape of brand royalty
		    ClientAnchor anchor_brandroyalty = helper.createClientAnchor();
		    anchor_brandroyalty.setCol1(12);
		    anchor_brandroyalty.setRow1(72);
			Picture pict_brandroyalty = drawing.createPicture(anchor_brandroyalty, pictureIdx_brandroyalty);
			pict_brandroyalty.resize();
			//add a picture shape of share
		    ClientAnchor anchor_share = helper.createClientAnchor();
		    anchor_share.setCol1(3);
		    anchor_share.setRow1(101);
			Picture pict_share = drawing.createPicture(anchor_share, pictureIdx_share);
			pict_share.resize();
			//add a picture shape of comment
		    ClientAnchor anchor_comment = helper.createClientAnchor();
		    anchor_comment.setCol1(12);
		    anchor_comment.setRow1(101);
			Picture pict_comment = drawing.createPicture(anchor_comment, pictureIdx_comment);
			pict_comment.resize();
			//add a picture shape of comment like
		    ClientAnchor anchor_comment_like = helper.createClientAnchor();
		    anchor_comment_like.setCol1(3);
		    anchor_comment_like.setRow1(116);
			Picture pict_comment_like = drawing.createPicture(anchor_comment_like, pictureIdx_comment_like);
			pict_comment_like.resize();
			//add a picture shape of status
		    ClientAnchor anchor_status = helper.createClientAnchor();
		    anchor_status.setCol1(8);
		    anchor_status.setRow1(145+json_content_top20.length()+json_content_influence.length());
			Picture pict_status= drawing.createPicture(anchor_status, pictureIdx_status);
			pict_status.resize();
			//add a picture shape of education
		    ClientAnchor anchor_education = helper.createClientAnchor();
		    anchor_education.setCol1(13);
		    anchor_education.setRow1(145+json_content_top20.length()+json_content_influence.length());
			Picture pict_education = drawing.createPicture(anchor_education, pictureIdx_education);
			pict_education.resize();
			OutputStream fileOut  = response.getOutputStream();
			 wb.write(fileOut);
			 fileOut.close();
             fileIn.close();
			 File deletefile= new File(destFileName);
			 deletefile.delete();
			// return;
	  
	 
} catch (IOException e) {
    e.printStackTrace();
}

catch(Exception e){
	e.printStackTrace();
}
  

%>