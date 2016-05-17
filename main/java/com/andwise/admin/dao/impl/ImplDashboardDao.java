package com.andwise.admin.dao.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.sql.DataSource;

import com.andwise.admin.dao.DashboardDao;
import com.andwise.admin.model.Dashboard;

public class ImplDashboardDao implements DashboardDao  {
	private DataSource dataSource;
	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}
	public ArrayList<Dashboard> selectMemberType(String date_from, String date_to){
		
		String sql = "{call sp_admin_select_member_paid(?,?)}";
		Connection conn = null;
		try {
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			stmt.setString(1, date_from);
			stmt.setString(2, date_to);
			ArrayList<Dashboard> dashboarArr = new ArrayList<Dashboard>();
			ResultSet rs = stmt.executeQuery();
		while (rs.next()) {
			Dashboard dh = null;
			dh = new Dashboard(					
					rs.getInt("number"), 
					rs.getInt("type"),
					rs.getString("fdate")
					
			);
			
			dashboarArr.add(dh);
		}
		
		rs.close();		
		stmt.close();
		return dashboarArr;
		
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
public ArrayList<Dashboard> selectMemberIndustry(String date_from, String date_to){
		
		String sql = "{call sp_admin_select_member_industry(?,?)}";
		Connection conn = null;
		try {
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			stmt.setString(1, date_from);
			stmt.setString(2, date_to);
			ArrayList<Dashboard> dashboarArr = new ArrayList<Dashboard>();
			ResultSet rs = stmt.executeQuery();
		while (rs.next()) {
			Dashboard dh = null;
			dh = new Dashboard(					
					rs.getInt("number"), 
					rs.getString("industry"),
					rs.getString("fdate")
					
			);
			
			dashboarArr.add(dh);
		}
		
		rs.close();		
		stmt.close();
		return dashboarArr;
		
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
