package com.andwise.task.dao.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.sql.DataSource;
import com.andwise.task.dao.CommentTaskDao;
import com.andwise.task.model.CommentTask;


public class ImplCommentTask implements CommentTaskDao {
private DataSource dataSource;
	
	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}
	public ArrayList<CommentTask> selectCommentByTask(String task_id,int comment_from, int user_id){
		String sql = "{call sp_comment_select_by_task(?,?,?)}";
		Connection conn = null;
		
		try {
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			stmt.setString(1, task_id);
			stmt.setInt(2,comment_from);
			stmt.setInt(3,user_id);
			ArrayList<CommentTask> commentArr = new ArrayList<CommentTask>(); 	
			ResultSet rs = stmt.executeQuery();
			
			while (rs.next()) {
				CommentTask cmtask = null;
				cmtask = new CommentTask(	
						rs.getInt("comment_id"), 
						rs.getString("comment_content"),
						rs.getString("task_history"),
						rs.getLong("create_date"),
						rs.getString("task_id"),
					    rs.getInt("user_id"),
					    rs.getString("profile_name")
								
				);
				
				commentArr.add(cmtask);
			}
			stmt.executeUpdate();
			rs.close();		
			stmt.close();
			return commentArr;
			
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
	public ArrayList<CommentTask> selectCommentOfPost(int user_id, int comment_from, int status){
		String sql = "{call sp_comment_from_excel_select(?,?,?)}";
		Connection conn = null;
		
		try {
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			stmt.setInt(1, user_id);
			stmt.setInt(2, comment_from);
			stmt.setInt(3, status);
			ArrayList<CommentTask> commentArr = new ArrayList<CommentTask>(); 	
			ResultSet rs = stmt.executeQuery();
			
			while (rs.next()) {
				CommentTask cmtask = null;
				cmtask = new CommentTask(	
						rs.getInt("comment_id"), 
						rs.getString("comment_content"),
						rs.getLong("create_date"),
						rs.getString("task_id"),
					    rs.getInt("user_id"),
					    rs.getString("channel_user"),
					    rs.getString("channel_picture"),
					    rs.getString("channel_detail_id"),
					    rs.getInt("channel_id")
								
				);
				
				commentArr.add(cmtask);
			}
			stmt.executeUpdate();
			rs.close();		
			stmt.close();
			return commentArr;
			
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
	public ArrayList<CommentTask> selectNodeComment(String task_id){
		String sql = "{call sp_nodecomment_select_by_comment(?)}";
		Connection conn = null;
		
		try {
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			stmt.setString(1, task_id);
			ArrayList<CommentTask> commentArr = new ArrayList<CommentTask>(); 	
			ResultSet rs = stmt.executeQuery();
			
			while (rs.next()) {
				CommentTask cmtask = null;
				cmtask = new CommentTask(	
						rs.getInt("comment_id"), 
					    rs.getString("profile_name"),
					    rs.getInt("comment_by"),
					    rs.getInt("user_id")
								
				);
				
				commentArr.add(cmtask);
			}
			stmt.executeUpdate();
			rs.close();		
			stmt.close();
			return commentArr;
			
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
	public ArrayList<CommentTask> selectNodeCommentLimit1(String list_comment_id){
		String sql = "{call sp_nodecomment_select_limit(?)}";
		Connection conn = null;
		
		try {
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			stmt.setString(1, list_comment_id);
			ArrayList<CommentTask> commentArr = new ArrayList<CommentTask>(); 	
			ResultSet rs = stmt.executeQuery();
			
			while (rs.next()) {
				CommentTask cmtask = null;
				cmtask = new CommentTask(	
						rs.getInt("comment_id"), 
					    rs.getString("profile_name"),
					    rs.getInt("comment_by"),
					    rs.getInt("user_id")
								
				);
				
				commentArr.add(cmtask);
			}
			stmt.executeUpdate();
			rs.close();		
			stmt.close();
			return commentArr;
			
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
	public ArrayList<CommentTask> selectComentLimit1(String list_task_id){
		String sql = "{call sp_comment_select_limit(?)}";
		Connection conn = null;
		
		try {
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			stmt.setString(1, list_task_id);
			ArrayList<CommentTask> commentArr = new ArrayList<CommentTask>(); 	
			ResultSet rs = stmt.executeQuery();
			
			while (rs.next()) {
				CommentTask cmtask = null;
				cmtask = new CommentTask(	
						rs.getInt("comment_id"), 
					    rs.getString("task_history"),
					    rs.getString("task_id"),
					    rs.getString("name")
			);

				commentArr.add(cmtask);
			}
			stmt.executeUpdate();
			rs.close();		
			stmt.close();
			return commentArr;
			
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
