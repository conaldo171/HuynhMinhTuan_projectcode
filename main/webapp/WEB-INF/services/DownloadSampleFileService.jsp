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
String filename="Sample_content_public";
response.setHeader("Content-Disposition", "attachment; filename=" + filename+ ".xls");
int no;
String page_id="", page_name="";
try{
	ConfigTable cfTable = ConfigFactory.getInstance();
	
	XLSTransformer transformer = new XLSTransformer();  
	//String server_address= cfTable.getValue("server_address");
	String templateFileName = cfTable.getValue("export_template_path")+"Template_content.xls"; //"d:\\export\\Teamplate_facebook.xls";
    // String templateFileName = "d:\\export\\Template_content.xls"; 
	String destFileName =cfTable.getValue("export_result_path")+  filename+"_"+user_id +".xls";
     // String destFileName ="d:\\export\\"+ filename+"_"+user_id+".xls"; // "d:\\export\\"+ filename+"_"+user_id+".xls";
	//String image_summary =request.getParameter("image_summary");
	
	
	String exportExcelContent = request.getParameter("exportContent_public");
	JSONObject jsonObject = new JSONObject(exportExcelContent);
	JSONArray json_content_public = jsonObject.getJSONArray("content_public");
	 List list_content_public = new ArrayList();
	 for (int j=0; j<json_content_public.length();j++){
			JSONObject jObj = json_content_public.getJSONObject(j);
			no = jObj.getInt("no");
			page_id= jObj.getString("pageid");
			page_name= jObj.getString("pagename");
			list_content_public.add(new ExportExcel(no,page_id,page_name));
			
		}
	 	Map beans = new HashMap();
		beans.put("content_public", list_content_public);
		transformer.transformXLS(templateFileName, beans, destFileName);
		FileInputStream fileIn = new FileInputStream(new File(destFileName));
        
		//Get the workbook instance for XLS file 
		   HSSFWorkbook wb = new HSSFWorkbook(fileIn);
		OutputStream fileOut  = response.getOutputStream();
		 wb.write(fileOut);
		 fileOut.close();
		 File deletefile= new File(destFileName);
		 deletefile.delete();

	 
} catch (IOException e) {
    e.printStackTrace();
}

catch(Exception e){
	e.printStackTrace();
}
  

%>