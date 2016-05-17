package com.andwise.common.dao.impl;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.sql.DataSource;

import com.andwise.common.dao.ConfigReaderDao;
import com.andwise.common.model.ConfigItem;

public class ImplConfigReader implements  ConfigReaderDao {
public  ArrayList<ConfigItem> configKey=null;
private DataSource dataSource;
	
	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}
	
	public  ArrayList<ConfigItem> getKeyValueConfig(String key){
		String sql = "{call sp_select_key_config()}";
		Connection conn = null;
		try {
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			//ArrayList<ConfigReader> cfArr = new ArrayList<ConfigReader>(); 	
			ResultSet rs = stmt.executeQuery();
			
			while (rs.next()) {
				ConfigItem config = null;
				config = new ConfigItem(	
						rs.getString("key"),
						rs.getString("value")
				);
				
				configKey.add(config);
			}
			rs.close();		
			stmt.close();
			return configKey;
			
		} catch (SQLException e) {
			throw new RuntimeException(e);
		} finally {
			if (conn != null) {
				try {
				conn.close();
				} catch (SQLException e) {}
			}
		}
	}
}
