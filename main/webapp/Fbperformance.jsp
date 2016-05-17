<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
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
<%@ page import="org.apache.poi.hssf.util.HSSFColor" %>
<%@ page import="java.awt.image.BufferedImage" %> 
<%@ page import="javax.imageio.*" %> 
<%@ page import="org.apache.commons.codec.binary.Base64" %>
<%@page import="com.andwise.common.CommonUtil"%>

<%
response.setContentType("application/vnd.ms-excel");
String filename="Report";
response.setHeader("Content-Disposition", "attachment; filename=picture.xlsx");
	 //create a new workbook
	String csvContent =request.getParameter("image_summary");
	
	//byte[] rgb = csvContent.getBytes();
	String str[]=csvContent.split(",");
	System.out.println(str[1]);
//	byte[] data = CommonUtil.decodeImage(str[1]);
	//BufferedImage image = null;
	 BufferedImage newImg;
    //String imgstr;
    // imgstr = encodeToString(img, "png");
    // System.out.println(imgstr);
    newImg =  CommonUtil.decodeToImage(str[1]);
       // ImageIO.write(newImg, "png", new File("D:/images/abc.png"));
    // newImg = CommonUtil.decodeToImage(str[1]);
     ByteArrayOutputStream baos = new ByteArrayOutputStream();
     ImageIO.write( newImg, "png", baos );
     baos.flush();
     byte[] imageInByte = baos.toByteArray();
     baos.close();
                    

   // InputStream input = new ByteArrayInputStream(rgb);
//OutputStream output = new FileOutputStream("D:/images/abc.png");
///IOUtils.copy(input, output);
//System.out.println(output.);
//output.write(11479);
//output.flush();
//output.close();
     //System.out.println(rgb);
   //  return;
   //or new HSSFWorkbook();
   /* URL oracle = new URL("http://54.238.231.204/cron/images/63_b107b837-210c-462e-b656-c441d3813d26.png");
   URL u = new URL("http://54.238.231.204/cron/images/63_b107b837-210c-462e-b656-c441d3813d26.png");
    URLConnection uc = u.openConnection();
    String contentType = uc.getContentType();
    int contentLength = uc.getContentLength();
    if (contentType.startsWith("text/") || contentLength == -1) {
      throw new IOException("This is not a binary file.");
    }
    InputStream raw = uc.getInputStream();
    InputStream in = new BufferedInputStream(raw);
    byte[] data = new byte[contentLength];
    int bytesRead = 0;
    int offset = 0;
    while (offset < contentLength) {
     bytesRead = in.read(data, offset, data.length - offset);
      if (bytesRead == -1)
        break;
      offset += bytesRead;
    }*/
   // System.out.println(data);
    Workbook wb = new HSSFWorkbook();
   int pictureIdx = wb.addPicture(imageInByte, Workbook.PICTURE_TYPE_PNG);
   CreationHelper helper = wb.getCreationHelper();

   //create sheet
  Sheet sheet = wb.createSheet();
   // Create the drawing patriarch.  This is the top level container for all shapes. 
  Drawing drawing = sheet.createDrawingPatriarch();

   //add a picture shape
   ClientAnchor anchor = helper.createClientAnchor();
   anchor.setCol1(3);
   anchor.setRow1(2);
   Picture pict = drawing.createPicture(anchor, pictureIdx);
   pict.resize();

    //if (offset != contentLength) {
     // throw new IOException("Only read " + offset + " bytes; Expected " + contentLength + " bytes");
   // }
    //String filename = u.toString();//.replace("/","//");
   // filename=filename.substring(filename.lastIndexOf('/') + 1);
    //add picture data to this workbook.
    //String image =filename;//"D:\\images\\1_5d25661d-d07a-455a-8598-a6699abfbc0b.png";
    //InputStream is = new FileInputStream(image);
   // byte[] bytes = IOUtils.toByteArray(in);
    
   // in.close();

 
    //set top-left corner of the picture,
    //subsequent call of Picture#resize() will operate relative to it
    

    //auto-size picture relative to its top-left corner
  

    //save workbook
  String file = "D:/picture.xlsx";
   // if(wb instanceof HSSFWorkbook) file += "x";
   FileOutputStream fileOut = new FileOutputStream(file);
   wb.write(fileOut);
    fileOut.close();
    System.out.println("Excel written successfully..");
//} catch (FileNotFoundException e) {
	//e.printStackTrace();
//} catch (IOException e) {
//	e.printStackTrace();
//}



%>
