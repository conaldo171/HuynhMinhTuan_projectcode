package com.andwise.common;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.util.ArrayList;
import javax.sql.DataSource;

import com.andwise.common.model.ConfigItem;

public class ConfigTable {
	
private ArrayList<ConfigItem> configArray=null;
private DataSource dataSource;
	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
		try{
			getAllKey();
		}
		catch(Exception e){
			
		}
	}
	public ArrayList<ConfigItem> getAllKey() throws Exception{
		if(configArray!=null){
			configArray.clear();
		}
		String sql = "{call sp_select_key_config()}";
		Connection conn = null;
		try {
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			//ArrayList<ConfigReader> cfArr = new ArrayList<ConfigReader>(); 
			 ArrayList<ConfigItem> dataObj = new ArrayList<ConfigItem>();
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				ConfigItem items=new ConfigItem(rs.getString("key"), rs.getString("value"));
				dataObj.add(items);   
	                
			}
			//jsonArray.put(rows);
			configArray =dataObj;
			rs.close();		
			stmt.close();
			//return configKey;
			
		} catch (Exception e) {
			System.out.println(e);
		} finally {
			if (conn != null) {
				try {
				conn.close();
				} catch (Exception e) {}
			}
		}
		return configArray;
	}
		
	public String getValue( String key){
		for (int i = 0; i < configArray.size() ; i++) {
		  ConfigItem item = configArray.get(i);
		  if(item.getKey().equals(key))
			  return item.getValue();
	}
		return null;
	}
}
