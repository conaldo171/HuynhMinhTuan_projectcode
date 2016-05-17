package com.andwise.admin.dao.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.sql.DataSource;

import com.andwise.admin.dao.ContentDao;
import com.andwise.admin.model.Content;
public class ImplContentDao implements ContentDao {
	private DataSource dataSource;
	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}
	public ArrayList<Content> selectContentByChannel(String date_from, String date_to, int channel_id){
		
		String sql = "{call sp_admin_count_content_by_channel(?,?,?)}";
		Connection conn = null;
		try {
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			stmt.setString(1, date_from);
			stmt.setString(2, date_to);
			stmt.setInt(3, channel_id);
			ArrayList<Content> contentArr = new ArrayList<Content>();
			ResultSet rs = stmt.executeQuery();
		while (rs.next()) {
			Content content = null;
			content = new Content(					
					rs.getInt("number"), 
					rs.getInt("status_id"),
					rs.getString("fdate")
					
			);
			
			contentArr.add(content);
		}
		
		rs.close();		
		stmt.close();
		return contentArr;
		
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
public ArrayList<Content> selectContentByType (String date_from, String date_to){
		
		String sql = "{call sp_admin_select_content(?,?)}";
		Connection conn = null;
		try {
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			stmt.setString(1, date_from);
			stmt.setString(2, date_to);
			ArrayList<Content> contentArr = new ArrayList<Content>();
			ResultSet rs = stmt.executeQuery();
		while (rs.next()) {
			Content content = null;
			content = new Content(					
					rs.getInt("number"), 
					rs.getInt("status_id"),
					rs.getString("fdate")
					
			);
			
			contentArr.add(content);
		}
		
		rs.close();		
		stmt.close();
		return contentArr;
		
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
