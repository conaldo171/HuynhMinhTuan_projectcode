package com.andwise.admin.dao.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.sql.DataSource;

import com.andwise.admin.dao.MemberOverviewDao;
import com.andwise.admin.model.MemberOverview;
import com.andwise.signup.model.SignUp;

public class ImplMemberOverviewDao implements MemberOverviewDao {
	private DataSource dataSource;
	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}
	public ArrayList<MemberOverview> selectUserTeammember(int team_id){
		String sql = "{call sp_admin_select_team_member(?)}";
		Connection conn = null;
		try {
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			stmt.setInt(1, team_id);
			ArrayList<MemberOverview> memberArr = new ArrayList<MemberOverview>();
			ResultSet rs = stmt.executeQuery();
		while (rs.next()) {
			MemberOverview member = null;
			member = new MemberOverview(	
					rs.getInt("user_id"),
					rs.getString("team_role"),
					rs.getString("name"),
					rs.getString("email"), 
					rs.getString("create_date")
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
	
	public ArrayList<MemberOverview> selectChannelUser(int user_id){
		String sql = "{call sp_admin_select_channel_user(?)}";
		Connection conn = null;
		try {
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			stmt.setInt(1,user_id);
			ArrayList<MemberOverview> memberArr = new ArrayList<MemberOverview>();
			ResultSet rs = stmt.executeQuery();
		while (rs.next()) {
			MemberOverview member = null;
			member = new MemberOverview(
					rs.getInt("user_id"),
					rs.getInt("channel_id"),
					rs.getString("channel_user"),
					rs.getString("create_date"),
					rs.getString("token_user"),
					rs.getString("channel_detail_id"),
					rs.getString("last_view"),
					rs.getString("pchannel_id"),
					rs.getString("channel_picture")
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
	 public ArrayList<MemberOverview> selectNumberContentAll(int user_id){
		 String sql = "{call sp_admin_select_content_all(?)}";
			Connection conn = null;
			try {
				CallableStatement stmt =null;
				conn = dataSource.getConnection();
				stmt = conn.prepareCall(sql);
				
				stmt.setInt(1,user_id);
				ArrayList<MemberOverview> memberArr = new ArrayList<MemberOverview>();
				ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				MemberOverview member = null;
				member = new MemberOverview(	
						rs.getInt("number"),
						rs.getInt("status_id"),
						rs.getString("channel_user"),
						rs.getInt("channel_id"),
						rs.getString("channel_detail_id")
						
						
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
	public ArrayList<MemberOverview> selectNumberContent(String date_from, String date_to, int user_id){
		String sql = "{call sp_admin_select_channel_user_by_user(?,?,?)}";
		Connection conn = null;
		try {
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			stmt.setString(1,date_from);
			stmt.setString(2,date_to);
			stmt.setInt(3,user_id);
			ArrayList<MemberOverview> memberArr = new ArrayList<MemberOverview>();
			ResultSet rs = stmt.executeQuery();
		while (rs.next()) {
			MemberOverview member = null;
			member = new MemberOverview(	
					rs.getInt("number"),
					rs.getInt("status_id"),
					rs.getString("channel_user"),
					rs.getInt("channel_id"),
					rs.getString("channel_detail_id")
					
					
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
	 public void updatePerson(int user_id,String company_name,long date_expired){
		   String sql = "{call sp_admin_update_person(?,?,?)}";
		   Connection conn = null;
		   try{
		    CallableStatement stmt =null;
		    conn = dataSource.getConnection();
		   stmt = conn.prepareCall(sql);
		   stmt.setInt(1,user_id);
		   stmt.setString(2,company_name);
		   stmt.setLong(3,date_expired);
		   
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
	  public  ArrayList<MemberOverview> getUserInfor(int user_id){
	    	String sql = "{call sp_admin_select_user_infor(?)}";
			Connection conn = null;
			
			try {
				CallableStatement stmt =null;
				conn = dataSource.getConnection();
				stmt = conn.prepareCall(sql);
				stmt.setInt(1, user_id);
				ArrayList<MemberOverview> signupArr = new ArrayList<MemberOverview>(); 	
				ResultSet rs = stmt.executeQuery();
				
				while (rs.next()) {
					MemberOverview signup = null;
					signup = new MemberOverview(
							rs.getString("create_date"),
							rs.getString("name"),
							rs.getString("cell_phone"),
							rs.getString("industry"),
							rs.getString("company_address"),
						    rs.getString("email"),
							rs.getString("company_website"),
							rs.getString("company_name"),
							rs.getLong("date_start"),
							rs.getLong("date_expired")
	
					);
					
					signupArr.add(signup);
				}
				rs.close();		
				stmt.close();
				return signupArr;
				
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
	  public void deleteChannelDetail(int user_id,String channel_detail_id){
			String sql = "{call sp_admin_delete_channel_detail(?,?)}";
			Connection conn = null;
			try{
				CallableStatement stmt =null;
				conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			stmt.setInt(1,user_id);
			stmt.setString(2,channel_detail_id);
			
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
	  public void deleteMemberOverview(int user_id){
		  String sql = "{call sp_admin_delete_user(?)}";
			Connection conn = null;
			try {
				CallableStatement stmt =null;
				conn = dataSource.getConnection();
				stmt = conn.prepareCall(sql);
				stmt.setInt(1, user_id);
				
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
	
}
