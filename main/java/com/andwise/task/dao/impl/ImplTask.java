package com.andwise.task.dao.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;

import javax.sql.DataSource;
import com.andwise.task.model.Task;
import com.andwise.task.dao.TaskDao;

public class ImplTask implements TaskDao {
private DataSource dataSource;
	
	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}
	public int saveTask(String task_id, String task_name,String profile_name,int user_id,long create_date,long create_at, String task_avatar,int type_social,int status,int priority,int tracker,String message_comment,String list_assign_user,String task_history){
		String sql = "{call sp_task_insert(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
		Connection conn = null;
		int return_id = 0;
		try {
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			stmt.setString(1, task_id);
			stmt.setString(2, task_name);
			stmt.setString(3, profile_name);
			stmt.setInt(4, user_id);
			stmt.setLong(5, create_date);
			stmt.setLong(6, create_at);
			stmt.setString(7, task_avatar);
			stmt.setInt(8, type_social);
			stmt.setInt(9, status);
			stmt.setInt(10, priority);
			stmt.setInt(11, tracker);
			stmt.setString(12, message_comment);
			stmt.setString(13, list_assign_user);
			stmt.setString(14, task_history);
			stmt.registerOutParameter(15, Types.INTEGER, return_id);
			stmt.executeUpdate();
			return_id = stmt.getInt(15);	
			stmt.close();
			return return_id;
			
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
	public ArrayList<Task> updateTask(String comment_content,long create_date,String task_id,int user_id,int status,int priority,int task_type,String list_assign_user, String list_remove_assign_user,String list_email_assign,String list_name_assign){
		String sql = "{call sp_comment_insert(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
		Connection conn = null;
		String  list_email ="";
		int return_comment_id=0;
		String list_user="";
		String list_user_id="";
		String task_history="";
		//JSONObject store = new JSONObject();
		ArrayList<Task> contentArr = new ArrayList<Task>(); 
		try {
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			stmt.setString(1, comment_content);
			stmt.setLong(2, create_date);
			stmt.setString(3, task_id);
			stmt.setInt(4, user_id);
			stmt.setInt(5, status);
			stmt.setInt(6, priority);
			stmt.setInt(7, task_type);
			stmt.setString(8, list_assign_user);
			stmt.setString(9, list_remove_assign_user);
			stmt.setString(10, list_email_assign);
			stmt.setString(11, list_name_assign);
			stmt.registerOutParameter(12, Types.INTEGER, return_comment_id);
			stmt.registerOutParameter(13, Types.VARCHAR, list_email);
			stmt.registerOutParameter(14, Types.VARCHAR, list_user);
			stmt.registerOutParameter(15, Types.VARCHAR, list_user_id);
			stmt.registerOutParameter(16, Types.VARCHAR, task_history);
			stmt.executeUpdate();
			return_comment_id = stmt.getInt(12);
			list_email = stmt.getString(13);
			list_user = stmt.getString(14);
			list_user_id = stmt.getString(15);
			task_history=stmt.getString(16);
			Task task = null;
			task = new Task(return_comment_id,list_email,list_user,list_user_id,task_history);
			contentArr.add(task);
			stmt.close();
			return  contentArr  ;
			
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
	public ArrayList<Task> selectTaskListType(int user_id,int tracker, int status, int type){
		String sql = "{call sp_task_select_general(?,?,?,?)}";
		Connection conn = null;
		
		try {
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			stmt.setInt(1, user_id);
			stmt.setInt(2, tracker);
			stmt.setInt(3, status);
			stmt.setInt(4, type);
			
			ArrayList<Task> taskArr = new ArrayList<Task>(); 	
			ResultSet rs = stmt.executeQuery();
			
			while (rs.next()) {
				Task task = null;
				task = new Task(	
						rs.getString("task_id"), 
						rs.getString("task_name"),
						rs.getString("profile_name"),
						rs.getInt("user_id"),
						rs.getLong("create_date"),
						rs.getLong("create_at"),
						rs.getString("task_avatar"),
					    rs.getInt("type_social"),
						rs.getInt("status"),
						rs.getInt("priority"),
						rs.getInt("tracker")
								
				);
				
				taskArr.add(task);
			}
			stmt.executeUpdate();
			rs.close();		
			stmt.close();
			return taskArr;
			
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
	public ArrayList<Task> selectTaskAssign(String task_id){
		String sql = "{call sp_member_assign_select_by_task(?)}";
		Connection conn = null;
		
		try {
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			stmt.setString(1, task_id);
			
			
			ArrayList<Task> taskAssignArr = new ArrayList<Task>(); 	
			ResultSet rs = stmt.executeQuery();
			
			while (rs.next()) {
				Task task = null;
				task = new Task(	
						rs.getString("task_id"), 
						rs.getInt("user_id"),
						rs.getString("email")
		
				);
				taskAssignArr.add(task);
			}
			stmt.executeUpdate();
			rs.close();		
			stmt.close();
			return taskAssignArr;
			
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
