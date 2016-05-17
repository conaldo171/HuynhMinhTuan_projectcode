<%@page import="org.apache.poi.hssf.usermodel.HSSFHeader"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ page import="java.util.*"%>
<%@ page import="java.text.*"%>
<%@ page import="java.io.FileNotFoundException"%>
<%@ page import="org.json.*"%>
<%@ page import="java.net.*"%>
<%@ page import="java.io.*"%>
<%@ page import="java.io.IOException" %>
<%@page import="org.apache.commons.fileupload.servlet.ServletFileUpload"%>
<%@page import="org.apache.commons.fileupload.disk.DiskFileItemFactory"%>
<%@page import="org.apache.commons.fileupload.*"%>
<%@ page import="org.apache.commons.io.*" %>
<%@ page import="org.apache.poi.ss.usermodel.*" %>
<%@ page import="org.apache.poi.hssf.usermodel.HSSFCell" %>
<%@ page import="org.apache.poi.hssf.usermodel.HSSFCellStyle" %>
<%@ page import="org.apache.poi.hssf.usermodel.HSSFDataFormat" %>
<%@ page import="org.apache.poi.hssf.usermodel.HSSFRow" %>
<%@ page import="org.apache.poi.hssf.usermodel.HSSFSheet" %>
<%@ page import="org.apache.poi.hssf.usermodel.HSSFWorkbook" %>
<%@ page import="org.apache.poi.hssf.util.HSSFColor" %>
<%@ page import="org.apache.poi.hssf.usermodel.HSSFPatriarch" %>
<%@ page import="org.apache.poi.hssf.usermodel.HSSFShape" %>
<%@ page import="org.apache.poi.hssf.usermodel.HSSFPicture" %>
<%@ page import="org.apache.poi.hssf.usermodel.HSSFClientAnchor" %>
<%@ page import="java.awt.image.BufferedImage" %> 
<%@ page import="javax.imageio.*" %> 
<%@ page import="org.apache.commons.codec.binary.Base64" %>
<%@page import="com.andwise.common.CommonUtil"%>
<%@page import="org.json.*"%>
<%@ page import="com.restfb.*"%>
<%@ page import="com.restfb.types.*"%>
<%@ page import="com.restfb.json.*"%>
<%

InputStream myxls = new FileInputStream("d:/export/sample_contents.xls");
HSSFWorkbook wb = new HSSFWorkbook(myxls);
JSONArray jsonArray = new JSONArray();
for (int k = 0; k < wb.getNumberOfSheets(); k++){
HSSFSheet sheet = wb.getSheetAt(k);
HSSFPatriarch patriarch = sheet.getDrawingPatriarch();
int rows = sheet.getPhysicalNumberOfRows();
List<HSSFShape> shapes =patriarch.getChildren();
if (patriarch != null) {
	for (int r = 0; r < rows; r++){
		HSSFRow row = sheet.getRow(r);
		if (row != null){
			int cells = row.getPhysicalNumberOfCells();	
			 JSONObject json = new JSONObject();
			  HSSFRow rowHeader = sheet.getRow(0);
			 for(int c=0;c<cells;c++){
				 HSSFCell cell = row.getCell(c);
              	 HSSFCell cellHeader = rowHeader.getCell(c);
              	
              	if (cell != null) {
              		 String value = "";
              		 switch (cell.getCellType()){
              		 case HSSFCell.CELL_TYPE_FORMULA :
              		 value = "FORMULA ";
              		 break;

              		 case HSSFCell.CELL_TYPE_NUMERIC :
              		 value = ""+(int)cell.getNumericCellValue();
              		 break;

              		 case HSSFCell.CELL_TYPE_STRING :
              		 value = cell.getStringCellValue();
              		 break;
              		 }
              		 if(!value.equals(""))
              			json.put(cellHeader.getStringCellValue(),value);
               		 } 	 
			 }
			 json.put("Image","");
			 jsonArray.put(json);
			
		}
	} 
	// out.print(jsonArray);
	// Loop through the objects
  for (int l=1; l<jsonArray.length();l++){
	  JSONObject json_obj = new JSONObject();
	  json_obj=jsonArray.getJSONObject(l);
	  for (int i = 0; i < shapes.size(); i++) {
          if (shapes.get(i) instanceof HSSFPicture) {
          	      
                  HSSFPicture picture = (HSSFPicture)shapes.get(i);
                  HSSFClientAnchor anchor= picture.getPreferredSize();
                  int number=Integer.parseInt(json_obj.getString("No"));
                 if(number==anchor.getRow1()){
                	 try { 
                      	 byte[] data = picture.getPictureData().getData();
                      	 String ext=picture.getPictureData().suggestFileExtension();
                          if (ext.equals("png")){
                        	  json_obj.put("Image","pict_"+anchor.getRow1()+".jpg") ;
                            // FileOutputStream output = new FileOutputStream("d:/export/pict_"+anchor.getRow1()+".jpg");
                           // output.write(data);
                            //output.close();
                          }
                      	}
                      catch(Exception e){
                      	
                      }
                	 
                 }
              
                  }
         
         
  }
  }
    
  out.print(jsonArray); 
     
}
}
/*
FileItem uploadItem = null;
String filename ="";
InputStream fs=null;
InputStream myxls = new FileInputStream("d:/export/sample_contents.xls");
HSSFWorkbook wb   = new HSSFWorkbook(myxls);
List lst = wb.getAllPictures(); 
int count=0;
for (Iterator it = lst.iterator(); it.hasNext(); ) {
    PictureData pict = (PictureData)it.next();
    String ext = pict.suggestFileExtension();
    byte[] data = pict.getData();
    count++;
    if (ext.equals("png")){
    	
      FileOutputStream output = new FileOutputStream("d:/export/pict_"+count+".jpg");
      output.write(data);
      output.close();
    }
}


FileItem uploadItem = null;
InputStream fs=null;
String tokenId="CAAHbfBOW3NUBAJOpNefLWKBJGNDaH4o70lRrafaMtRBYZCGaNrtKnRkMMsZCrKcZAfaoRMMDhJ4cvQTz7vcPHvKBJiZAI6WvQ6GUTsCz2QRUHBZCMr09T9FOoXIfzW1fbYqZB7JIPjta06AEvr0KjSy2sBGu0b8vJS0F2gwYQuBjTMMuUpJwM0CNwWeZAuA5FMZD";
FacebookClient facebookClient = new DefaultFacebookClient(tokenId);
FacebookType publishMessageResponse;

boolean isMultipart = ServletFileUpload.isMultipartContent(request);
if (!isMultipart){
	   
}
else {

DiskFileItemFactory factory = new DiskFileItemFactory();
factory.setSizeThreshold(81920);
ServletFileUpload upload = new ServletFileUpload(factory);
upload.setSizeMax(4194304);// file size 4MB
File savedFile = null;
File savedFileLarge = null;
Iterator itr = null;
try {
    List items = null;
    items = upload.parseRequest(request);
    itr = items.iterator();
    try {
        while (itr.hasNext()) {
            FileItem item = (FileItem) itr.next();
            if (item.isFormField()) {
                String name = item.getFieldName();
                String value = item.getString();
                } else {
                try {
                    uploadItem = item;
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
        if (uploadItem != null ) {
        	
        	 fs = uploadItem.getInputStream();
            
           
        }
    } catch (Exception e) {
    	System.out.println(e);
      
      
       


    }
} catch (Exception e) {
    //e.printStackTrace();
   
}
}

if (fs != null) {
try{
//InputStream fs =new InputStream();
HSSFWorkbook wb = new HSSFWorkbook(fs);
JSONArray jsonArray = new JSONArray();
for (int k = 0; k < wb.getNumberOfSheets(); k++){
HSSFSheet sheet = wb.getSheetAt(k);
//Header header = sheet.getHeader();

int rows = sheet.getPhysicalNumberOfRows();
//out.print(rows);

for (int r = 0; r < rows; r++){
HSSFRow row = sheet.getRow(r);
//HSSFHeader rowfirst = sheet.getHeader();
//rowfirst.
if (row != null) {
	JSONObject json = new JSONObject();
int cells = row.getPhysicalNumberOfCells();
JSONArray cellRow = new JSONArray();
 for(int c=0;c<cells;c++){
	
	 HSSFCell cell = row.getCell(c);
	
	 //HSSFCell celltop = row.getCell(1);
	 if (cell != null) {
	 String value = null;
	 switch (cell.getCellType()){
	 case HSSFCell.CELL_TYPE_FORMULA :
	 value = "FORMULA ";
	 break;

	 case HSSFCell.CELL_TYPE_NUMERIC :
	 value = ""+cell.getNumericCellValue();
	 break;

	 case HSSFCell.CELL_TYPE_STRING :
	 value = cell.getStringCellValue();
	 break;
	 case HSSFCell.CELL_TYPE_BLANK :
		 value = "noimage";
		 break;
	 default :
	 }
	 cellRow.put(value);
	 
	 } 
 }
// json.put( "cell", cellRow );
 jsonArray.put(cellRow);
}
}
JSONObject jsonResult = new JSONObject();
for(int i=0; i<jsonArray.length();i++){
	JSONArray jsonresult = new JSONArray();
	if(i>0){
		
		jsonresult=jsonArray.getJSONArray(i);
		//for(int j=0; j<jsonresult.length();j++){
			//publishMessageResponse = facebookClient.publish(jsonresult.get(0)+ "/feed", FacebookType.class, Parameter.with("message", jsonresult.get(2)));
		//}
	}
	//
}
out.print(jsonArray);
}
}
catch (Exception e){
e.printStackTrace();
}

} */


%>
