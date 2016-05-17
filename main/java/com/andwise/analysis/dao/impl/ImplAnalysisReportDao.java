package com.andwise.analysis.dao.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.sql.DataSource;

import com.andwise.analysis.dao.AnalysisReportDao;
import com.andwise.analysis.model.AnalysisReport;
public class ImplAnalysisReportDao implements AnalysisReportDao {
private DataSource dataSource;
	
	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}
	public ArrayList<AnalysisReport> selectFbStream(String channel_detail_id, long start_date, long end_date){
		
		String sql = "{call sp_select_fbstream(?,?,?)}";
		Connection conn = null;
		try {
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			stmt.setString(1, channel_detail_id);
			stmt.setLong(2,start_date);
			stmt.setLong(3,end_date);
			ArrayList<AnalysisReport> analysisArr = new ArrayList<AnalysisReport>();
			ResultSet rs = stmt.executeQuery();
		while (rs.next()) {
			AnalysisReport analysis = null;
			analysis = new AnalysisReport(					
					rs.getString("post_id"),
					rs.getString("channel_detail_id"),
					rs.getString("content"),
					rs.getLong("create_date"),
					rs.getInt("like"),
					rs.getInt("share"),
					rs.getInt("comment"),
					rs.getInt("like_of_comment"),
					rs.getString("link_to_post")
					
			);
			
			analysisArr.add(analysis);
		}
		
		rs.close();		
		stmt.close();
		return analysisArr;
		
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
public ArrayList<AnalysisReport> selectTwStream(String channel_detail_id, long start_date, long end_date){
	String sql = "{call sp_select_twstream(?,?,?)}";
	Connection conn = null;
	try {
		CallableStatement stmt =null;
		conn = dataSource.getConnection();
		stmt = conn.prepareCall(sql);
		stmt.setString(1, channel_detail_id);
		stmt.setLong(2,start_date);
		stmt.setLong(3,end_date);
		ArrayList<AnalysisReport> analysisArr = new ArrayList<AnalysisReport>();
		ResultSet rs = stmt.executeQuery();
	while (rs.next()) {
		AnalysisReport analysis = null;
		analysis = new AnalysisReport(					
				rs.getString("post_id"),
				rs.getString("channel_detail_id"),
				rs.getString("content"),
				rs.getLong("create_date"),
				rs.getString("in_reply_to_status_id"),
				rs.getInt("retweet_count"),
				rs.getInt("favorite_count"),
				rs.getInt("user_mentions"),
				rs.getString("screen_name")
				
		);
		
		analysisArr.add(analysis);
	}
	
	rs.close();		
	stmt.close();
	return analysisArr;
	
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
public ArrayList<AnalysisReport> selectFbReport(String channel_detail_id, long start_date, long end_date){
	String sql = "{call sp_select_fbreport(?,?,?)}";
	Connection conn = null;
	try {
		CallableStatement stmt =null;
		conn = dataSource.getConnection();
		stmt = conn.prepareCall(sql);
		stmt.setString(1, channel_detail_id);
		stmt.setLong(2,start_date);
		stmt.setLong(3,end_date);
		ArrayList<AnalysisReport> analysisArr = new ArrayList<AnalysisReport>();
		ResultSet rs = stmt.executeQuery();
	while (rs.next()) {
		AnalysisReport analysis = null;
		analysis = new AnalysisReport(					
				
				rs.getString("channel_detail_id"),
				rs.getLong("date"),
				rs.getInt("friends"),
				rs.getInt("friendsoffan"),
				rs.getInt("reach"),
				rs.getInt("reach_week"),
				rs.getInt("reach_month"),
				rs.getInt("people_talking"),
				rs.getInt("people_talking_week"),
				rs.getInt("people_talking_month")
				
				
		);
		
		analysisArr.add(analysis);
	}
	
	rs.close();		
	stmt.close();
	return analysisArr;
	
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
public ArrayList<AnalysisReport> selectTwReport(String channel_detail_id, long start_date, long end_date){
	String sql = "{call sp_select_twreport(?,?,?)}";
	Connection conn = null;
	try {
		CallableStatement stmt =null;
		conn = dataSource.getConnection();
		stmt = conn.prepareCall(sql);
		stmt.setString(1, channel_detail_id);
		stmt.setLong(2,start_date);
		stmt.setLong(3,end_date);
		ArrayList<AnalysisReport> analysisArr = new ArrayList<AnalysisReport>();
		ResultSet rs = stmt.executeQuery();
	while (rs.next()) {
		AnalysisReport analysis = null;
		analysis = new AnalysisReport(					
				rs.getString("channel_detail_id"),
				rs.getLong("date"),
				rs.getInt("followers"),
				rs.getInt("following"),
				rs.getInt("favourites")
				
				
		);
		
		analysisArr.add(analysis);
	}
	
	rs.close();		
	stmt.close();
	return analysisArr;
	
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
