package com.andwise.common;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.UUID;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFClientAnchor;
import org.apache.poi.hssf.usermodel.HSSFPatriarch;
import org.apache.poi.hssf.usermodel.HSSFPicture;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFShape;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.usermodel.HSSFSheet;

import org.json.*;

public class ReadExcelFile {
	
	 public JSONArray readExcelfile(InputStream input, int user_id) throws IOException{
		 JSONArray jsonArray= new JSONArray();
		// String key="upload_image_path";
		 ConfigTable cfTable = ConfigFactory.getInstance();
		 try{
		
		 HSSFWorkbook wb = new HSSFWorkbook(input);
		 //JSONArray jsonArray = new JSONArray();
		 for (int k = 0; k < wb.getNumberOfSheets(); k++){
		 HSSFSheet sheet = wb.getSheetAt(k);
		 HSSFPatriarch patriarch = sheet.getDrawingPatriarch();
		 int rows = sheet.getPhysicalNumberOfRows();
		 for (int r = 0; r < rows; r++){
		 		HSSFRow row = sheet.getRow(r);
		 		if (row != null){
		 			int cells = row.getPhysicalNumberOfCells();	
		 			 JSONObject json = new JSONObject();
		 			  HSSFRow rowHeader = sheet.getRow(0);
		 			 json.put("Contents","");
		               	json.put("PageId","");
		            	json.put("PageName","");
		 			 for(int c=0;c<cells;c++){
		 				 HSSFCell cell = row.getCell(c);
		               	 HSSFCell cellHeader = rowHeader.getCell(c);
		               	
		               	if (cell != null) {
		               		 String value = "";
		               		// json.put(cellHeader.getStringCellValue(),"");
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
		 			 json.put("Success", "false");
		 			// json.put("Channel_type", "");
		 			 jsonArray.put(json);
		 			
		 		}
		 	} 
		 if (patriarch != null) {
			 List<HSSFShape> shapes =patriarch.getChildren();
		 	
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
		                           if (ext.equals("png")||ext.equals("jpg")||ext.equals("jpeg")){
		                        	   UUID uuid = UUID.randomUUID();
		                        	    String sKey = uuid.toString();
		                         	  json_obj.put("Image",sKey+"_"+anchor.getRow1()+"_"+user_id+".jpg") ;
		                         	 String path =cfTable.getValue("upload_image_path");
		                           	path = path + sKey+"_"+anchor.getRow1()+"_"+user_id+".jpg";
		                            FileOutputStream output = new FileOutputStream(path);
		                            output.write(data);
		                            output.close();
		                           }
		                       	}
		                       catch(Exception e){
		                       	
		                       }
		                 	 
		                  }
		               
		                   }
		          
		          
		   }
		   }
		     
		  // out.print(jsonArray); 
		      
		 }
		 }
		 
	 } catch (JSONException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
	// System.out.println(jsonArray);
	 return jsonArray;
	
	 }
	 public JSONArray readCommentExcelfile(InputStream input, int user_id) throws IOException{
		 JSONArray jsonArray= new JSONArray();
		// String key="upload_image_path";
		 ConfigTable cfTable = ConfigFactory.getInstance();
		 try{
		
		 HSSFWorkbook wb = new HSSFWorkbook(input);
		 //JSONArray jsonArray = new JSONArray();
		 for (int k = 0; k < wb.getNumberOfSheets(); k++){
		 HSSFSheet sheet = wb.getSheetAt(k);
		// HSSFPatriarch patriarch = sheet.getDrawingPatriarch();
		 int rows = sheet.getPhysicalNumberOfRows();
		 for (int r = 0; r < rows; r++){
		 		HSSFRow row = sheet.getRow(r);
		 		if (row != null){
		 			int cells = row.getPhysicalNumberOfCells();	
		 			 JSONObject json = new JSONObject();
		 			  HSSFRow rowHeader = sheet.getRow(0);
		 			    json.put("Contents","");
		               	json.put("PageId","");
		            	json.put("PageName","");
		            	json.put("PostId","");
		            	json.put("Comment","");
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
		 			 json.put("Success", "false");
		 			// json.put("Channel_type", "");
		 			 jsonArray.put(json);
		 			
		 		}
		 	} 
		
		 }
		 
	 } catch (JSONException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
	 return jsonArray;
	
	 }
}
