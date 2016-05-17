package com.andwise.signup.dao.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import javax.sql.DataSource;

import com.andwise.common.MD5;
import com.andwise.signup.dao.SignUpDao;
import com.andwise.signup.model.SignUp;
public class ImplSignUp implements SignUpDao {
  private DataSource dataSource;
	
	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}
	public int insertPerson(String first_name,String last_name,String password,String email,int team_role,String cell_phone,String company_name,String company_website, String company_address,String industry,long start_date, long date_exprired, int i_promotion){
		int team_id=0;
		int user_id=0;
		String afterEncryptPassword = "";
		String sql = "{call sp_insert_user(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
		Connection conn = null;
		DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date date = new Date();
		
		 MD5 Encrypt = new MD5();
         if (!password.equals("")){
        	 afterEncryptPassword = Encrypt.callHash(password);
         }    
		try {
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			stmt.setString(1, first_name);
			stmt.setString(2, last_name);
			stmt.setString(3, afterEncryptPassword);
			stmt.setString(4, email);
			stmt.setInt(5, team_role);
			stmt.setString(6, cell_phone);
			stmt.setString(7, company_name);
			stmt.setString(8, company_website);//company_address
			stmt.setString(9, company_address);
			stmt.setString(10,formatter.format(date));
			stmt.setString(11,industry);
			stmt.setLong(12, start_date);
			stmt.setLong(13, date_exprired);
			stmt.setInt(14,i_promotion);
			stmt.registerOutParameter(15, Types.INTEGER, team_id);
			stmt.registerOutParameter(16, Types.INTEGER,user_id);
			stmt.executeUpdate();
			team_id = stmt.getInt(15);	
			user_id = stmt.getInt(16);	
			stmt.close();
			return user_id;
			
		} catch (SQLException e) {
			throw new RuntimeException(e);
		} finally {
			if (conn != null) {
				try {
				conn.close();
				} catch (SQLException e) {}
			}
		}
		//return team_id;
	}
	 public ArrayList<SignUp> checkLogin(String email, String password){
		 String sql = "{call sp_select_user_infor(?,?)}";
			Connection conn = null;
			
			try {
				CallableStatement stmt =null;
				conn = dataSource.getConnection();
				stmt = conn.prepareCall(sql);
				stmt.setString(1, email);
				stmt.setString(2, password);
				ArrayList<SignUp> signupArr = new ArrayList<SignUp>(); 	
				ResultSet rs = stmt.executeQuery();
				
				while (rs.next()) {
					SignUp signup = null;
					signup = new SignUp(	
							rs.getInt("user_id"), 
							rs.getString("first_name"),
							rs.getString("last_name"),
							rs.getInt("team_id"),
							rs.getString("payment_id"),
							rs.getString("email"),
							rs.getInt("team_role"),
						    rs.getString("cell_phone"),
							rs.getString("company_name"),
							rs.getString("company_website"),
							rs.getString("company_address"),
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
	 public  ArrayList<SignUp> getTeamMembers(int team_id){
		 String sql = "{call sp_select_team_members(?)}";
			Connection conn = null;
			
			try {
				CallableStatement stmt =null;
				conn = dataSource.getConnection();
				stmt = conn.prepareCall(sql);
				stmt.setInt(1, team_id);
				ArrayList<SignUp> signupArr = new ArrayList<SignUp>(); 	
				ResultSet rs = stmt.executeQuery();
				while (rs.next()) {
					SignUp signup = null;
					signup = new SignUp(	
							rs.getInt("user_id"), 
							rs.getString("first_name"),
							rs.getString("last_name"),
							rs.getInt("team_id"),
							rs.getString("payment_id"),
							rs.getString("email"),
							rs.getInt("team_role"),
						    rs.getString("cell_phone"),
							rs.getString("company_name"),
							rs.getString("company_website"),
							rs.getString("company_address"),
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
	 public ArrayList<SignUp> getDataGroup(int user_id){
		 String sql = "{call sp_select_user_group_infor(?)}";
			Connection conn = null;
			
			try {
				CallableStatement stmt =null;
				conn = dataSource.getConnection();
				stmt = conn.prepareCall(sql);
				stmt.setInt(1, user_id);
				
				
				
				ArrayList<SignUp> signupArr = new ArrayList<SignUp>(); 	
				ResultSet rs = stmt.executeQuery();
				
				while (rs.next()) {
					SignUp signup = null;
					signup = new SignUp(
							rs.getInt("group_id"),
							rs.getString("group_name"),
							rs.getInt("select_group")
							
							
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
	 public int updatePerson(int user_id,String first_name,String last_name,String cell_phone,String company_name,String company_website, String company_address){
			String sql = "{call sp_update_user_profile(?,?,?,?,?,?,?,?)}";
			Connection conn = null;
			DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date date = new Date();
			   
			try {
				CallableStatement stmt =null;
				conn = dataSource.getConnection();
				stmt = conn.prepareCall(sql);
				stmt.setInt(1, user_id);
				stmt.setString(2, first_name);
				stmt.setString(3, last_name);
				stmt.setString(4, cell_phone);
				stmt.setString(5, company_name);
				stmt.setString(6, company_website);//company_address
				stmt.setString(7, company_address);
				stmt.setString(8,formatter.format(date));
				
				stmt.executeUpdate();
					
				stmt.close();
				return user_id;
				
			} catch (SQLException e) {
				throw new RuntimeException(e);
			} finally {
				if (conn != null) {
					try {
					conn.close();
					} catch (SQLException e) {}
				}
			}
			//return team_id;
		}
	 public void insertKeyActive(int user_id, String keyactive){
		 String sql = "{call sp_insert_user_activity(?,?)}";
			Connection conn = null;
			try {
				CallableStatement stmt =null;
				conn = dataSource.getConnection();
				stmt = conn.prepareCall(sql);
				stmt.setInt(1, user_id);
				stmt.setString(2, keyactive);
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
	 public int updateUserActive(int user_id, String keyactive){
		 String sql = "{call sp_update_user_active(?,?,?)}";
			Connection conn = null;
			int active_id =0;			   
			try {
				CallableStatement stmt =null;
				conn = dataSource.getConnection();
				stmt = conn.prepareCall(sql);
				stmt.setInt(1, user_id);
				stmt.setString(2, keyactive);
				stmt.registerOutParameter(3, Types.INTEGER, active_id);
				stmt.executeUpdate();
				active_id = stmt.getInt(3);	
				stmt.close();
				return active_id;
				
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
	 public int inviteMember(String first_name,String last_name,String email,int team_id,int team_role,int group_id,int admin,String list_channel_detail,int user_id,long start_date, long date_exprire)
	 {
			int id=0;
			
			String sql = "{call sp_insert_invite_member(?,?,?,?,?,?,?,?,?,?,?,?,?)}";
			Connection conn = null;
			DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date date = new Date();
			
			
			try {
				CallableStatement stmt =null;
				conn = dataSource.getConnection();
				stmt = conn.prepareCall(sql);
				stmt.setString(1, first_name);
				stmt.setString(2, last_name);
				stmt.setString(3, email);
				stmt.setInt(4, team_id);
				stmt.setInt(5, team_role);
				stmt.setInt(6, group_id);
				stmt.setInt(7, admin);
				stmt.setString(8, formatter.format(date));
				stmt.setString(9, list_channel_detail);
				stmt.setInt(10, user_id);
				stmt.setLong(11,start_date);
				stmt.setLong(12,date_exprire);
				stmt.registerOutParameter(13, Types.INTEGER,id);
				stmt.executeUpdate();
				id = stmt.getInt(13);	
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
	 public int updatePassword(String pass, String email){
		 String sql = "{call sp_update_password(?,?,?)}";
			Connection conn = null;
			int user_id =0;	
			String afterEncryptPassword="";
			 MD5 Encrypt = new MD5();
	         if (!pass.equals("")){
	        	 afterEncryptPassword = Encrypt.callHash(pass);
	         }    
			try {
				CallableStatement stmt =null;
				conn = dataSource.getConnection();
				stmt = conn.prepareCall(sql);
				stmt.setString(1, email);
				stmt.setString(2, afterEncryptPassword);
				stmt.registerOutParameter(3, Types.INTEGER, user_id);
				stmt.executeUpdate();
				user_id = stmt.getInt(3);	
				stmt.close();
				return user_id;
				
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
	 public void deleteMember(int user_id){
		 String sql = "{call sp_delete_team_member(?)}";
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
	    public  ArrayList<SignUp> getProfileInfor(String email){
	    	String sql = "{call sp_select_user_profile(?)}";
			Connection conn = null;
			
			try {
				CallableStatement stmt =null;
				conn = dataSource.getConnection();
				stmt = conn.prepareCall(sql);
				stmt.setString(1, email);
				ArrayList<SignUp> signupArr = new ArrayList<SignUp>(); 	
				ResultSet rs = stmt.executeQuery();
				
				while (rs.next()) {
					SignUp signup = null;
					signup = new SignUp(
							rs.getInt("user_id"), 
							rs.getString("first_name"),
							rs.getString("last_name"),
							rs.getInt("team_id"),
							rs.getString("payment_id"),
							rs.getString("email"),
							rs.getInt("team_role"),
						    rs.getString("cell_phone"),
							rs.getString("company_name"),
							rs.getString("company_website"),
							rs.getString("company_address"),
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
	    public  ArrayList<SignUp> getUserInfor(int user_id){
	    	String sql = "{call sp_select_user_by_id(?)}";
			Connection conn = null;
			
			try {
				CallableStatement stmt =null;
				conn = dataSource.getConnection();
				stmt = conn.prepareCall(sql);
				stmt.setInt(1, user_id);
				ArrayList<SignUp> signupArr = new ArrayList<SignUp>(); 	
				ResultSet rs = stmt.executeQuery();
				
				while (rs.next()) {
					SignUp signup = null;
					signup = new SignUp(
							rs.getInt("user_id"), 
							rs.getString("first_name"),
							rs.getString("last_name"),
							rs.getInt("team_id"),
							rs.getString("payment_id"),
							rs.getString("email"),
							rs.getInt("team_role"),
						    rs.getString("cell_phone"),
							rs.getString("company_name"),
							rs.getString("company_website"),
							rs.getString("company_address"),
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
	    public void updateMember(int member_id,int team_id,int team_role,String list_channel_detail,int user_id){
			String sql = "{call sp_update_team_member(?,?,?,?,?)}";
			Connection conn = null;
			DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date date = new Date();

			try {
				CallableStatement stmt =null;
				conn = dataSource.getConnection();
				stmt = conn.prepareCall(sql);
				stmt.setInt(1, member_id);
				stmt.setInt(2, team_id);
				stmt.setInt(3, team_role);
				stmt.setInt(4, user_id);
				stmt.setString(5, list_channel_detail);
				
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
	    public int getUserId(String email){
	    	 String sql = "{call sp_select_email_user(?)}";
				Connection conn = null;
				int user_id =0;	
				
				
				try {
					CallableStatement stmt =null;
					conn = dataSource.getConnection();
					stmt = conn.prepareCall(sql);
					stmt.setString(1, email);
					ResultSet rs = stmt.executeQuery();
					while (rs.next()) {
						user_id= Integer.parseInt(rs.getString("user_id"));
					}
					stmt.close();
					return user_id;
					
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
	    
	    public int checkKey(String key_active){
	    	String sql = "{call sp_select_key_user(?)}";
			Connection conn = null;
			int team_role =-1;	
			
			
			try {
				CallableStatement stmt =null;
				conn = dataSource.getConnection();
				stmt = conn.prepareCall(sql);
				stmt.setString(1, key_active);
				ResultSet rs = stmt.executeQuery();
				while (rs.next()) {
					team_role= Integer.parseInt(rs.getString("team_role"));
				}
				stmt.close();
				return team_role;
				
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
	    public int changePassword(String oldpassword,String newpassword,String user_email){
			 int user_id=0;
			 String sql = "{call sp_password_change(?,?,?,?)}";
			   Connection conn = null;
			   try{
			    CallableStatement stmt =null;
			    conn = dataSource.getConnection();
			   stmt = conn.prepareCall(sql);
				String afterEncryptPassword="";
				MD5 Encrypt = new MD5();
		        if (!oldpassword.equals("")){
		        	oldpassword = Encrypt.callHash(oldpassword);
		        	//newpassword = Encrypt.callHash(newpassword);
		        }   
		        if (!newpassword.equals("")){
		        	newpassword = Encrypt.callHash(newpassword);
		        	//newpassword = Encrypt.callHash(newpassword);
		        }  
			   stmt.setString(1,user_email);
			   stmt.setString(2,oldpassword);
			   stmt.setString(3,newpassword);
			   stmt.registerOutParameter(4, Types.INTEGER, user_id);
				stmt.executeUpdate();
				user_id = stmt.getInt(4);	
				stmt.close();
				return user_id;
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
	    public String getkey(int user_id){
	     String key_Active="";
	     String sql = "{call sp_select_user_useractive(?)}";
			Connection conn = null;
			
			
			
			try {
				CallableStatement stmt =null;
				conn = dataSource.getConnection();
				stmt = conn.prepareCall(sql);
				stmt.setInt(1, user_id);
				ResultSet rs = stmt.executeQuery();
				while (rs.next()) {
					key_Active= rs.getString("key_active");
				}
				stmt.close();
				 return key_Active;
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

