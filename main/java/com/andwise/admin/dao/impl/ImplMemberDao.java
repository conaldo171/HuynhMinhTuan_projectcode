package com.andwise.admin.dao.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.sql.DataSource;


import com.andwise.admin.dao.MemberDao;
import com.andwise.admin.model.Member;

public class ImplMemberDao implements MemberDao {
	private DataSource dataSource;
	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}
	public ArrayList<Member> selectMemberGeneral(String date_from, String date_to,String sIdx, String sOrder,String sStart, String sLimit, String where){
		String sql = "{call sp_admin_select_member(?,?,?,?,?,?,?)}";
		Connection conn = null;
		try {
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			stmt.setString(1, date_from);
			stmt.setString(2, date_to);
			stmt.setString(3, sIdx);
			stmt.setString(4, sOrder);
			stmt.setString(5, sStart);
			stmt.setString(6, sLimit);
			stmt.setString(7, where);
			ArrayList<Member> memberArr = new ArrayList<Member>();
			ResultSet rs = stmt.executeQuery();
		while (rs.next()) {
			Member member = null;
			int total =0;
			
			String list_channel="";
			String total_content= rs.getString("totalcontent");
			if(rs.getString("list_channel")==null){
				list_channel="";
			}
			else
			{
				list_channel =rs.getString("list_channel");	
			}
			
			if(total_content==null){
				total=0;
			}
			else
			{
				total=Integer.parseInt(total_content);
			}
			member = new Member(	
					rs.getInt("user_id"),
					rs.getInt("team_id"),
					rs.getString("create_date"), 
					rs.getString("industry"),
					rs.getString("company_name"),
					rs.getString("name"), 
					rs.getString("email"),
					rs.getInt("team_size"),
					total,
					rs.getString("type"), 
					rs.getLong("date_start"),
					rs.getLong("date_expired"),
					list_channel
					
			);
			
			memberArr.add(member);
		}
		
		rs.close();		
		stmt.close();
		return memberArr;
		
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
	public int countDataMember(String date_from, String date_to,String sWhere){
		String sql = "{call sp_admin_count_member(?,?,?)}";
		Connection conn = null;
		 int count = 0;
		try {
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			stmt.setString(1, date_from);
			stmt.setString(2, date_to);
			stmt.setString(3, sWhere);
			ResultSet rs = stmt.executeQuery();
		while (rs.next()) {
			 count = Integer.parseInt(rs.getString("TotalRows"));
		}
		
		rs.close();		
		stmt.close();
		return count;
		
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
