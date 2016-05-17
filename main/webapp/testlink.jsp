<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.*"%>
<%@ page import="java.net.*"%>
<%@ page import="java.io.FileNotFoundException"%>
<%@ page import="org.json.*"%>
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
<%
try {
	 //create a new workbook
	  URL oracle = new URL("http://54.238.231.204/cron/images/63_b107b837-210c-462e-b656-c441d3813d26.png");
        BufferedReader in = new BufferedReader(
        new InputStreamReader(oracle.openStream()));

        String inputLine;
        while ((inputLine = in.readLine()) != null)
            System.out.println(inputLine);
    Workbook wb = new HSSFWorkbook(); //or new HSSFWorkbook();

      CreationHelper createHelper = wb.getCreationHelper();

    //cell style for hyperlinks
    //by default hyperlinks are blue and underlined
    CellStyle hlink_style = wb.createCellStyle();
    Font hlink_font = wb.createFont();
    hlink_font.setUnderline(Font.U_SINGLE);
    hlink_font.setColor(IndexedColors.BLUE.getIndex());
    hlink_style.setFont(hlink_font);

    Cell cell;
    Sheet sheet = wb.createSheet("Hyperlinks");
    //URL
    cell = sheet.createRow(0).createCell((short)0);
    cell.setCellValue("URL Link");

    Hyperlink link = createHelper.createHyperlink(Hyperlink.LINK_URL);
    link.setAddress("http://54.238.231.204/cron/images/63_b107b837-210c-462e-b656-c441d3813d26.png");
    cell.setHyperlink(link);
    cell.setCellStyle(hlink_style);

    //link to a file in the current directory
    cell = sheet.createRow(1).createCell((short)0);
    cell.setCellValue("File Link");
    link = createHelper.createHyperlink(Hyperlink.LINK_FILE);
    link.setAddress("link1.xls");
    cell.setHyperlink(link);
    cell.setCellStyle(hlink_style);

    
    String file = "D:\\picture.xls";
    // if(wb instanceof HSSFWorkbook) file += "x";
     FileOutputStream fileOut = new FileOutputStream(file);
//http://54.238.231.204/cron/images/63_b107b837-210c-462e-b656-c441d3813d26.png
    //FileOutputStream out = new FileOutputStream("hyperinks.xlsx");
    wb.write(fileOut);
    out.close();
    System.out.println("Excel written successfully..");
} catch (FileNotFoundException e) {
	e.printStackTrace();
} catch (IOException e) {
	e.printStackTrace();
}



%>
