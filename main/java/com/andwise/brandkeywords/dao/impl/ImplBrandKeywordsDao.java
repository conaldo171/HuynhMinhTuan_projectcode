package com.andwise.brandkeywords.dao.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;

import javax.sql.DataSource;

import com.andwise.brandkeywords.dao.BrandKeywordsDao;
import com.andwise.brandkeywords.model.BrandKeywords;
import com.andwise.channel.model.ChannelDetail;

public class ImplBrandKeywordsDao implements BrandKeywordsDao {
private DataSource dataSource;
	
	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}
	public int saveBrandKeyword(String brand_keyword,int user_id, int type, long last_view, long create_date ){
		int keyword_id=0;
		
		String sql = "{call sp_insert_brand_keywords(?,?,?,?,?,?)}";
		Connection conn = null;
		
		try {
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			stmt.setString(1, brand_keyword);
			stmt.setInt(2, user_id);
			stmt.setInt(3, type);
			stmt.setLong(4, last_view);
			stmt.setLong(5, create_date);
			
			 stmt.registerOutParameter(6, Types.INTEGER, keyword_id);
			stmt.executeUpdate();
			int	id = stmt.getInt(6);	
			stmt.close();
			return id;
			
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
	public void updateBrandKeyword(int keyword_id, String brand_keyword, int user_id, int type, long last_view, long create_date){
		String sql = "{call sp_update_brand_keyword(?,?,?,?,?,?)}";
		Connection conn = null;
		
		try {
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			stmt.setInt(1, keyword_id);
			stmt.setString(2, brand_keyword);
			stmt.setInt(3, user_id);
			
			stmt.setInt(4, type);
			stmt.setLong(5, last_view);
			stmt.setLong(6, create_date);
			stmt.executeUpdate();
			stmt.close();
			
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
	public void updateBrandKeywordSearch(int keyword_id, int select_search){
		String sql = "{call sp_update_select_search_brand_keyword(?,?)}";
		Connection conn = null;
		
		try {
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			stmt.setInt(1, keyword_id);
			stmt.setInt(2, select_search);
			
			stmt.executeUpdate();
			stmt.close();
			
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
	public void updateLastTimeBrandKeywordSearch(int keyword_id, long time_view){
		String sql = "{call sp_update_last_view_brand_keyword(?,?)}";
		Connection conn = null;
		
		try {
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			stmt.setInt(1, keyword_id);
			stmt.setLong(2, time_view);
			
			stmt.executeUpdate();
			stmt.close();
			
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
	 public void deleteBrandKeyword(int keyword_id, int user_id){
		 String sql = "{call sp_delete_brand_keyword(?,?)}";
			Connection conn = null;
			try{
				CallableStatement stmt =null;
				conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			stmt.setInt(1,keyword_id);
			stmt.setInt(2,user_id);
			stmt.executeUpdate();
			stmt.close();
		}
		
		catch(SQLException e){
			throw new RuntimeException(e);
		}
		finally {
			if (conn != null) {
				try {
				conn.close();
				} catch (SQLException e) {}
			}
		}
	 }
	 public ArrayList<BrandKeywords> selectBrandKeyword(int user_id){
		
				
				String sql = "{call sp_select_brand_keyword_by_user(?)}";
				Connection conn = null;
				try {
					CallableStatement stmt =null;
					conn = dataSource.getConnection();
					stmt = conn.prepareCall(sql);
					stmt.setInt(1, user_id);
					ArrayList<BrandKeywords> brandKeywordsArr = new ArrayList<BrandKeywords>();
					ResultSet rs = stmt.executeQuery();
				while (rs.next()) {
					BrandKeywords brandKeywords = null;
					brandKeywords = new BrandKeywords(					
							rs.getInt("keyword_id"),
							rs.getString("brand_keyword"),
							rs.getInt("user_id"),
							rs.getInt("type"),
							rs.getLong("last_view"),
							rs.getLong("create_date"),
							rs.getInt("select_search")
							
					);
					
					brandKeywordsArr.add(brandKeywords);
				}
				
				rs.close();		
				stmt.close();
				return brandKeywordsArr;
				
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

