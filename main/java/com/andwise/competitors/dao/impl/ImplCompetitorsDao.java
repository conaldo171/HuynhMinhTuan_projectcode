package com.andwise.competitors.dao.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;

import javax.sql.DataSource;

import com.andwise.brandkeywords.model.BrandKeywords;
import com.andwise.competitors.dao.CompetitorsDao;
import com.andwise.competitors.model.Competitors;

public class ImplCompetitorsDao implements CompetitorsDao {
private DataSource dataSource;
	
	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}
	public int saveCompetitor(String page_name1, String page_name2,String channel_detail_id1,String channel_detail_id2, long create_date, int user_id, int type,String avatar_tw1, String avatar_tw2){
		int competitors_id=0;
		String sql = "{call sp_insert_competitors(?,?,?,?,?,?,?,?,?,?)}";
		Connection conn = null;
		
		try {
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			stmt.setString(1, page_name1);
			stmt.setString(2, page_name2);
			stmt.setString(3, channel_detail_id1);
			stmt.setString(4, channel_detail_id2);
			stmt.setLong(5, create_date);
			stmt.setInt(6, user_id);
			stmt.setInt(7, type);
			stmt.setString(8, avatar_tw1);
			stmt.setString(9, avatar_tw2);
			stmt.registerOutParameter(10, Types.INTEGER, competitors_id);
			stmt.executeUpdate();
			int	id = stmt.getInt(10);	
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
	public void deleteCompetitors(int competitors_id, int user_id){
		String sql = "{call sp_delete_competitors(?,?)}";
		Connection conn = null;
		try{
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
		stmt = conn.prepareCall(sql);
		stmt.setInt(1,competitors_id);
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
	public ArrayList<Competitors> selectCompetitors(int user_id, int type){
		String sql = "{call sp_select_competitors_by_user(?,?)}";
		Connection conn = null;
		try {
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			stmt.setInt(1, user_id);
			stmt.setInt(2, type);
			ArrayList<Competitors> competitorsArr = new ArrayList<Competitors>();
			ResultSet rs = stmt.executeQuery();
		while (rs.next()) {
			Competitors competitors = null;
			competitors = new Competitors(					
					rs.getInt("competitors_id"),
					rs.getString("page_name1"),
					rs.getString("page_name2"),
					rs.getString("channel_id1"),
					rs.getString("channel_id2"),
					rs.getLong("create_date"),
					rs.getInt("user_id"),
					rs.getInt("type"),
					rs.getString("avatar_tw1"),
					rs.getString("avatar_tw2")
					
			);
			
			competitorsArr.add(competitors);
		}
		
		rs.close();		
		stmt.close();
		return competitorsArr;
		
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
	public ArrayList<Competitors> selectFbTwCompetitors(String channel_id, long start_date,long end_date, int type){
		String sql = "{call sp_select_page_public_detail(?,?,?,?)}";
		Connection conn = null;
		try {
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			stmt.setString(1, channel_id);
			stmt.setLong(2, start_date);
			stmt.setLong(3, end_date);
			stmt.setInt(4, type);
			ArrayList<Competitors> competitorsArr = new ArrayList<Competitors>();
			ResultSet rs = stmt.executeQuery();
		while (rs.next()) {
			Competitors competitors = null;
			competitors = new Competitors(					
					rs.getString("channel_id"),
					rs.getInt("fan"),
					rs.getInt("people_talking"),
					rs.getInt("followers"),
					rs.getInt("following"),
					rs.getInt("create_date")
	
			);
			
			competitorsArr.add(competitors);
		}
		
		rs.close();		
		stmt.close();
		return competitorsArr;
		
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
