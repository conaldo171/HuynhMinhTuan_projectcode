package com.andwise.content.dao.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;

import javax.sql.DataSource;

import com.andwise.content.dao.DraftAndScheduleDao;
import com.andwise.content.model.DraftAndSchedule;
import com.andwise.signup.model.SignUp;


public class ImplDraftAndSchedule implements DraftAndScheduleDao {
	
	private DataSource dataSource;
		
		public void setDataSource(DataSource dataSource) {
			this.dataSource = dataSource;
		}
		
		
		public ArrayList<DraftAndSchedule> selectTokenUser(int user_id,int msg_id, int status_id,long send_date){
					
			//String sql = "SELECT ChannelDetail.channel_detail_id,ChannelDetail.token_user FROM ChannelDetail inner join Message on ChannelDetail.channel_detail_id =Message.channel_detail_id where user_id=? and message_id=?";
			String sql = "{call sp_delete_draft(?,?,?,?)}";
			Connection conn = null;
			
			try {
				CallableStatement stmt =null;
				conn = dataSource.getConnection();
				stmt = conn.prepareCall(sql);
				stmt.setInt(1, user_id);
				stmt.setInt(2, msg_id);
				stmt.setInt(3, status_id);
				stmt.setLong(4, send_date);
				
				
				ArrayList<DraftAndSchedule> drafArr = new ArrayList<DraftAndSchedule>(); 	
				ResultSet rs = stmt.executeQuery();
				
				while (rs.next()) {
					DraftAndSchedule draftAndSchedule = null;
					draftAndSchedule = new DraftAndSchedule(	
							rs.getString("channel_detail_id"), 
							rs.getString("token_user"),
							rs.getString("pchannel_id")
					);
					
					drafArr.add(draftAndSchedule);
				}
				stmt.executeUpdate();
				rs.close();		
				stmt.close();
				return drafArr;
				
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
		public ArrayList<DraftAndSchedule> selectDraftMessage(int user_id,int status_id,int administrator,int team_id){
			
			//String sql = "SELECT ChannelDetail.channel_detail_id,ChannelDetail.token_user FROM ChannelDetail inner join Message on ChannelDetail.channel_detail_id =Message.channel_detail_id where user_id=? and message_id=?";
			String sql = "{call sp_select_draft_message(?,?,?,?)}";
			Connection conn = null;
			
			try {
				CallableStatement stmt =null;
				conn = dataSource.getConnection();
				stmt = conn.prepareCall(sql);
				stmt.setInt(1, user_id);
				stmt.setInt(2, status_id);
				stmt.setInt(3, administrator);
				stmt.setInt(4, team_id);
				
				ArrayList<DraftAndSchedule> drafArr = new ArrayList<DraftAndSchedule>(); 	
				ResultSet rs = stmt.executeQuery();
				
				while (rs.next()) {
					DraftAndSchedule draftAndSchedule = null;
					draftAndSchedule = new DraftAndSchedule(	
							rs.getInt("message_id"), 
							rs.getString("content"),
							rs.getDate("create_date"),
							rs.getString("channel_user"),
							rs.getString("channel_picture"),
							rs.getString("user_name"),
							rs.getString("channel_detail_id"),
						    rs.getInt("channel_id"),
							rs.getLong("send_date"),
							rs.getInt("status_id"),
							rs.getString("file_name"),
							rs.getInt("file_id")
									
					);
					
					drafArr.add(draftAndSchedule);
				}
				stmt.executeUpdate();
				rs.close();		
				stmt.close();
				return drafArr;
				
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
		public ArrayList<DraftAndSchedule>selectDraftComment(int team_id,int status_id){
			String sql = "{call sp_post_of_comment_select_content(?,?)}";
			Connection conn = null;
			
			try {
				CallableStatement stmt =null;
				conn = dataSource.getConnection();
				stmt = conn.prepareCall(sql);
				stmt.setInt(1, team_id);
				stmt.setInt(2, status_id);
				
				
				ArrayList<DraftAndSchedule> drafArr = new ArrayList<DraftAndSchedule>(); 	
				ResultSet rs = stmt.executeQuery();
				
				while (rs.next()) {
					DraftAndSchedule draftAndSchedule = null;
					draftAndSchedule = new DraftAndSchedule(	
							rs.getString("post_id"), 
							rs.getString("content"),
							rs.getLong("create_date"),
							
							rs.getString("channel_detail_id"),
							rs.getString("channel_picture"),
							rs.getString("channel_user"),
							rs.getInt("channel_id"),
							rs.getInt("status_id")
									
					);
					
					drafArr.add(draftAndSchedule);
				}
				stmt.executeUpdate();
				rs.close();		
				stmt.close();
				return drafArr;
				
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
		public ArrayList<DraftAndSchedule> selectDraftCommentMore(int team_id,int status_id,long time_post){
			String sql = "{call sp_post_of_comment_select_content_more(?,?,?)}";
			Connection conn = null;
			
			try {
				CallableStatement stmt =null;
				conn = dataSource.getConnection();
				stmt = conn.prepareCall(sql);
				stmt.setInt(1, team_id);
				stmt.setInt(2, status_id);
				stmt.setLong(3, time_post);
				
				ArrayList<DraftAndSchedule> drafArr = new ArrayList<DraftAndSchedule>(); 	
				ResultSet rs = stmt.executeQuery();
				
				while (rs.next()) {
					DraftAndSchedule draftAndSchedule = null;
					draftAndSchedule = new DraftAndSchedule(	
							rs.getString("post_id"), 
							rs.getString("content"),
							rs.getLong("create_date"),
							rs.getString("channel_detail_id"),
							rs.getString("channel_picture"),
							rs.getString("channel_user"),
							rs.getInt("channel_id"),
							rs.getInt("status_id")
									
					);
					
					drafArr.add(draftAndSchedule);
				}
				stmt.executeUpdate();
				rs.close();		
				stmt.close();
				return drafArr;
				
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
		public ArrayList<DraftAndSchedule> selectCommentFilterProfile(int team_id, int status_id, String filter_list){
			String sql = "{call sp_comment_select_filter_profile(?,?,?)}";
			Connection conn = null;
			
			try {
				CallableStatement stmt =null;
				conn = dataSource.getConnection();
				stmt = conn.prepareCall(sql);
				stmt.setInt(1, team_id);
				stmt.setInt(2, status_id);
				stmt.setString(3, filter_list);
				
				ArrayList<DraftAndSchedule> drafArr = new ArrayList<DraftAndSchedule>(); 	
				ResultSet rs = stmt.executeQuery();
				
				while (rs.next()) {
					DraftAndSchedule draftAndSchedule = null;
					draftAndSchedule = new DraftAndSchedule(	
							rs.getString("post_id"), 
							rs.getString("content"),
							rs.getLong("create_date"),
							
							rs.getString("channel_detail_id"),
							rs.getString("channel_picture"),
							rs.getString("channel_user"),
							rs.getInt("channel_id"),
							rs.getInt("status_id")
									
					);
					
					drafArr.add(draftAndSchedule);
				}
				stmt.executeUpdate();
				rs.close();		
				stmt.close();
				return drafArr;
				
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
		public ArrayList<DraftAndSchedule> selectFilterMessageAllByDate(int user_id,int administrator,long start_date, long end_date, int team_id){
			String sql = "{call sp_select_filter_message_all_by_date(?,?,?,?,?)}";
			Connection conn = null;
			
			try {
				CallableStatement stmt =null;
				conn = dataSource.getConnection();
				stmt = conn.prepareCall(sql);
				stmt.setInt(1, user_id);
				stmt.setLong(2, start_date);
				stmt.setLong(3, end_date);
				stmt.setInt(4, administrator);
				stmt.setInt(5, team_id);
				
				ArrayList<DraftAndSchedule> drafArr = new ArrayList<DraftAndSchedule>(); 	
				ResultSet rs = stmt.executeQuery();
				
				while (rs.next()) {
					DraftAndSchedule draftAndSchedule = null;
					draftAndSchedule = new DraftAndSchedule(	
							rs.getInt("message_id"), 
							rs.getString("content"),
							rs.getDate("create_date"),
							rs.getString("channel_user"),
							rs.getString("channel_picture"),
							rs.getString("user_name"),
							rs.getString("channel_detail_id"),
						    rs.getInt("channel_id"),
							rs.getLong("send_date"),
							rs.getInt("status_id"),
							rs.getString("file_name"),
							rs.getInt("file_id")
									
					);
					
					drafArr.add(draftAndSchedule);
				}
				stmt.executeUpdate();
				rs.close();		
				stmt.close();
				return drafArr;
				
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
		public ArrayList<DraftAndSchedule> selectFilterScheduleByDate(int user_id,int status_id, int administrator,long start_date, long end_date, int team_id){
			String sql = "{call sp_select_filter_message_schedule_by_date(?,?,?,?,?,?)}";
			Connection conn = null;
			
			try {
				CallableStatement stmt =null;
				conn = dataSource.getConnection();
				stmt = conn.prepareCall(sql);
				stmt.setInt(1, user_id);
				stmt.setInt(2, status_id);
				stmt.setLong(3, start_date);
				stmt.setLong(4, end_date);
				stmt.setInt(5, administrator);
				stmt.setInt(6, team_id);
				
				ArrayList<DraftAndSchedule> drafArr = new ArrayList<DraftAndSchedule>(); 	
				ResultSet rs = stmt.executeQuery();
				
				while (rs.next()) {
					DraftAndSchedule draftAndSchedule = null;
					draftAndSchedule = new DraftAndSchedule(	
							rs.getInt("message_id"), 
							rs.getString("content"),
							rs.getDate("create_date"),
							rs.getString("channel_user"),
							rs.getString("channel_picture"),
							rs.getString("user_name"),
							rs.getString("channel_detail_id"),
						    rs.getInt("channel_id"),
							rs.getLong("send_date"),
							rs.getInt("status_id"),
							rs.getString("file_name"),
							rs.getInt("file_id")
									
					);
					
					drafArr.add(draftAndSchedule);
				}
				stmt.executeUpdate();
				rs.close();		
				stmt.close();
				return drafArr;
				
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
		public ArrayList<DraftAndSchedule> selectFilterCommentByDate(int team_id, int status_id,long start_date, long end_date){
			String sql = "{call sp_comment_select_filter_by_date(?,?,?,?)}";
			Connection conn = null;
			
			try {
				CallableStatement stmt =null;
				conn = dataSource.getConnection();
				stmt = conn.prepareCall(sql);
				stmt.setInt(1, team_id);
				stmt.setInt(2, status_id);
				stmt.setLong(3, start_date);
				stmt.setLong(4, end_date);
				ArrayList<DraftAndSchedule> drafArr = new ArrayList<DraftAndSchedule>(); 	
				ResultSet rs = stmt.executeQuery();
				
				while (rs.next()) {
					DraftAndSchedule draftAndSchedule = null;
					draftAndSchedule = new DraftAndSchedule(	
							rs.getString("post_id"), 
							rs.getString("content"),
							rs.getLong("create_date"),
							
							rs.getString("channel_detail_id"),
							rs.getString("channel_picture"),
							rs.getString("channel_user"),
							rs.getInt("channel_id"),
							rs.getInt("status_id")
									
					);
					
					drafArr.add(draftAndSchedule);
				}
				stmt.executeUpdate();
				rs.close();		
				stmt.close();
				return drafArr;
				
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
		public ArrayList<DraftAndSchedule> selectFilterMemberComment(int user_id,String user_id_list,int status_id,int administrator, int team_id){
			String sql = "{call sp_comment_select_by_member(?,?,?,?,?)}";
			Connection conn = null;
			
			try {
				CallableStatement stmt =null;
				conn = dataSource.getConnection();
				stmt = conn.prepareCall(sql);
				stmt.setInt(1, user_id);
				stmt.setInt(2, status_id);
				stmt.setString(3, user_id_list);
				stmt.setInt(4, administrator);
				stmt.setInt(5, team_id);
				ArrayList<DraftAndSchedule> drafArr = new ArrayList<DraftAndSchedule>(); 	
				ResultSet rs = stmt.executeQuery();
				
				while (rs.next()) {
					DraftAndSchedule draftAndSchedule = null;
					draftAndSchedule = new DraftAndSchedule(	
							rs.getString("post_id"), 
							rs.getString("content"),
							rs.getLong("create_date"),
							
							rs.getString("channel_detail_id"),
							rs.getString("channel_picture"),
							rs.getString("channel_user"),
							rs.getInt("channel_id"),
							rs.getInt("status_id")
									
					);
					
					drafArr.add(draftAndSchedule);
				}
				stmt.executeUpdate();
				rs.close();		
				stmt.close();
				return drafArr;
				
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
		public ArrayList<DraftAndSchedule> selectLoadMoreDraftMessage(int user_id,int status_id,int administrator, int msg_id,int team_id)
		{
			String sql = "{call sp_select_loadmore_draft_message(?,?,?,?,?)}";
			Connection conn = null;
			
			try {
				CallableStatement stmt =null;
				conn = dataSource.getConnection();
				stmt = conn.prepareCall(sql);
				stmt.setInt(1, user_id);
				stmt.setInt(2, status_id);
				stmt.setInt(3, administrator);
				stmt.setInt(4, msg_id);
				stmt.setInt(5, team_id);
				
				ArrayList<DraftAndSchedule> drafArr = new ArrayList<DraftAndSchedule>(); 	
				ResultSet rs = stmt.executeQuery();
				
				while (rs.next()) {
					DraftAndSchedule draftAndSchedule = null;
					draftAndSchedule = new DraftAndSchedule(	
							rs.getInt("message_id"), 
							rs.getString("content"),
							rs.getDate("create_date"),
							rs.getString("channel_user"),
							rs.getString("channel_picture"),
							rs.getString("user_name"),
							rs.getString("channel_detail_id"),
						    rs.getInt("channel_id"),
							rs.getLong("send_date"),
							rs.getInt("status_id"),
							rs.getString("file_name"),
							rs.getInt("file_id")
									
					);
					
					drafArr.add(draftAndSchedule);
				}
				stmt.executeUpdate();
				rs.close();		
				stmt.close();
				return drafArr;
				
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
		public ArrayList<DraftAndSchedule> selectFilterMessage(int user_id,String channel_detail_id,int status_id,int administrator, int team_id){
			
			//String sql = "SELECT ChannelDetail.channel_detail_id,ChannelDetail.token_user FROM ChannelDetail inner join Message on ChannelDetail.channel_detail_id =Message.channel_detail_id where user_id=? and message_id=?";
			String sql = "{call sp_select_filter_message(?,?,?,?,?)}";
			Connection conn = null;
			
			try {
				CallableStatement stmt =null;
				conn = dataSource.getConnection();
				stmt = conn.prepareCall(sql);
				stmt.setInt(1, user_id);
				stmt.setInt(2, status_id);
				stmt.setString(3,channel_detail_id);
				stmt.setInt(4, administrator);
				stmt.setInt(5, team_id);
				
				ArrayList<DraftAndSchedule> drafArr = new ArrayList<DraftAndSchedule>(); 	
				ResultSet rs = stmt.executeQuery();
				
				while (rs.next()) {
					DraftAndSchedule draftAndSchedule = null;
					draftAndSchedule = new DraftAndSchedule(	
							rs.getInt("message_id"), 
							rs.getString("content"),
							rs.getDate("create_date"),
							rs.getString("channel_user"),
							rs.getString("channel_picture"),
							rs.getString("user_name"),
							rs.getString("channel_detail_id"),
						    rs.getInt("channel_id"),
							rs.getLong("send_date"),
							rs.getInt("status_id"),
							rs.getString("file_name"),
							rs.getInt("file_id")
					);
					
					drafArr.add(draftAndSchedule);
				}
				stmt.executeUpdate();
				rs.close();		
				stmt.close();
				return drafArr;
				
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
		public ArrayList<DraftAndSchedule> selectFilterMemberMessage(int user_id,String user_id_list,int status_id,int administrator, int team_id){
			String sql = "{call sp_select_message_by_member(?,?,?,?,?)}";
			Connection conn = null;
			
			try {
				CallableStatement stmt =null;
				conn = dataSource.getConnection();
				stmt = conn.prepareCall(sql);
				stmt.setInt(1, user_id);
				stmt.setInt(2, status_id);
				stmt.setString(3,user_id_list);
				stmt.setInt(4, administrator);
				stmt.setInt(5, team_id);
				
				ArrayList<DraftAndSchedule> drafArr = new ArrayList<DraftAndSchedule>(); 	
				ResultSet rs = stmt.executeQuery();
				
				while (rs.next()) {
					DraftAndSchedule draftAndSchedule = null;
					draftAndSchedule = new DraftAndSchedule(	
							rs.getInt("message_id"), 
							rs.getString("content"),
							rs.getDate("create_date"),
							rs.getString("channel_user"),
							rs.getString("channel_picture"),
							rs.getString("user_name"),
							rs.getString("channel_detail_id"),
						    rs.getInt("channel_id"),
							rs.getLong("send_date"),
							rs.getInt("status_id"),
							rs.getString("file_name"),
							rs.getInt("file_id")
					);
					
					drafArr.add(draftAndSchedule);
				}
				stmt.executeUpdate();
				rs.close();		
				stmt.close();
				return drafArr;
				
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
		public ArrayList<DraftAndSchedule> selectLoadMoreFilterMessage(int user_id,String channel_detail_id,int status_id,int administrator,int msg_id)
		{
			//String sql = "SELECT ChannelDetail.channel_detail_id,ChannelDetail.token_user FROM ChannelDetail inner join Message on ChannelDetail.channel_detail_id =Message.channel_detail_id where user_id=? and message_id=?";
			String sql = "{call sp_select_filter_loadmore_message(?,?,?,?,?)}";
			Connection conn = null;
			
			try {
				CallableStatement stmt =null;
				conn = dataSource.getConnection();
				stmt = conn.prepareCall(sql);
				stmt.setInt(1, user_id);
				stmt.setInt(2, status_id);
				stmt.setString(3,channel_detail_id);
				stmt.setInt(4, administrator);
				stmt.setInt(5, msg_id);
				
				ArrayList<DraftAndSchedule> drafArr = new ArrayList<DraftAndSchedule>(); 	
				ResultSet rs = stmt.executeQuery();
				
				while (rs.next()) {
					DraftAndSchedule draftAndSchedule = null;
					draftAndSchedule = new DraftAndSchedule(	
							rs.getInt("message_id"), 
							rs.getString("content"),
							rs.getDate("create_date"),
							rs.getString("channel_user"),
							rs.getString("channel_picture"),
							rs.getString("user_name"),
							rs.getString("channel_detail_id"),
						    rs.getInt("channel_id"),
							rs.getLong("send_date"),
							rs.getInt("status_id"),
							rs.getString("file_name"),
							rs.getInt("file_id")
					);
					
					drafArr.add(draftAndSchedule);
				}
				stmt.executeUpdate();
				rs.close();		
				stmt.close();
				return drafArr;
				
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
	public ArrayList<DraftAndSchedule> selectAllMessage(int user_id,int administrator,int team_id){
			
			//String sql = "SELECT ChannelDetail.channel_detail_id,ChannelDetail.token_user FROM ChannelDetail inner join Message on ChannelDetail.channel_detail_id =Message.channel_detail_id where user_id=? and message_id=?";
			String sql = "{call sp_select_all_message(?,?,?)}";
			Connection conn = null;
			
			try {
				CallableStatement stmt =null;
				conn = dataSource.getConnection();
				stmt = conn.prepareCall(sql);
				stmt.setInt(1, user_id);
				stmt.setInt(2, administrator);
				stmt.setInt(3, team_id);

				ArrayList<DraftAndSchedule> allArr = new ArrayList<DraftAndSchedule>(); 	
				ResultSet rs = stmt.executeQuery();
				
				while (rs.next()) {
					DraftAndSchedule draftAndSchedule = null;
					draftAndSchedule = new DraftAndSchedule(	
							rs.getInt("message_id"), 
							rs.getString("content"),
							rs.getDate("create_date"),
							rs.getString("channel_user"),
							rs.getString("channel_picture"),
							rs.getString("user_name"),
							rs.getString("channel_detail_id"),
						    rs.getInt("channel_id"),
							rs.getLong("send_date"),
							rs.getInt("status_id"),
							rs.getString("file_name"),
							rs.getInt("file_id")
					);
					
					allArr.add(draftAndSchedule);
				}
				stmt.executeUpdate();
				rs.close();		
				stmt.close();
				return allArr;
				
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
	public  ArrayList<DraftAndSchedule> getCountMessage(int user_id,int administrator){
		String sql = "{call sp_count_message(?,?)}";
		Connection conn = null;
		
		try {
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			stmt.setInt(1, user_id);
			stmt.setInt(2, administrator);

			ArrayList<DraftAndSchedule> allArr = new ArrayList<DraftAndSchedule>(); 	
			ResultSet rs = stmt.executeQuery();
			
			while (rs.next()) {
				DraftAndSchedule draftAndSchedule = null;
				draftAndSchedule = new DraftAndSchedule(	
						rs.getInt("count_number") 
						
				);
				
				allArr.add(draftAndSchedule);
			}
			stmt.executeUpdate();
			rs.close();		
			stmt.close();
			return allArr;
			
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
	public ArrayList<DraftAndSchedule> selectLoadMoreAllMessage(int user_id,int administrator,int msg_id, int team_id){
		String sql = "{call sp_select_loadmore_all_message(?,?,?,?)}";
		Connection conn = null;
		
		try {
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			stmt.setInt(1, user_id);
			stmt.setInt(2, administrator);
			stmt.setInt(3, msg_id);
			stmt.setInt(4, team_id);

			ArrayList<DraftAndSchedule> allArr = new ArrayList<DraftAndSchedule>(); 	
			ResultSet rs = stmt.executeQuery();
			
			while (rs.next()) {
				DraftAndSchedule draftAndSchedule = null;
				draftAndSchedule = new DraftAndSchedule(	
						rs.getInt("message_id"), 
						rs.getString("content"),
						rs.getDate("create_date"),
						rs.getString("channel_user"),
						rs.getString("channel_picture"),
						rs.getString("user_name"),
						rs.getString("channel_detail_id"),
					    rs.getInt("channel_id"),
						rs.getLong("send_date"),
						rs.getInt("status_id"),
						rs.getString("file_name"),
						rs.getInt("file_id")
				);
				
				allArr.add(draftAndSchedule);
			}
			stmt.executeUpdate();
			rs.close();		
			stmt.close();
			return allArr;
			
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
		public void updateMessage(int msg_id,String content, String create_date, long send_date, int status_id,String list_send_date_schedule){
			
			//String sql = "SELECT ChannelDetail.channel_detail_id,ChannelDetail.token_user FROM ChannelDetail inner join Message on ChannelDetail.channel_detail_id =Message.channel_detail_id where user_id=? and message_id=?";
			String sql = "{call sp_update_message(?,?,?,?,?,?)}";
			Connection conn = null;
			
			try {
				CallableStatement stmt =null;
				conn = dataSource.getConnection();
				stmt = conn.prepareCall(sql);
				stmt.setInt(1, msg_id);
				stmt.setString(2, content);
				stmt.setString(3, create_date);
				stmt.setLong(4, send_date);
				stmt.setInt(5, status_id);
				stmt.setString(6, list_send_date_schedule);
				stmt.executeUpdate();
				//rs.close();		
				stmt.close();
				//return drafArr;
				
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
		public void deleteMessage(int msg_id){
			
			//String sql = "SELECT ChannelDetail.channel_detail_id,ChannelDetail.token_user FROM ChannelDetail inner join Message on ChannelDetail.channel_detail_id =Message.channel_detail_id where user_id=? and message_id=?";
			String sql = "{call sp_delete_message(?)}";
			Connection conn = null;
			
			try {
				CallableStatement stmt =null;
				conn = dataSource.getConnection();
				stmt = conn.prepareCall(sql);
				stmt.setInt(1, msg_id);
				stmt.executeUpdate();
				//rs.close();		
				stmt.close();
				//return drafArr;
				
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
		public void saveMessageDetail(int msg_id, String channel_detail_id,int user_id){
			String sql = "{call sp_insert_message_detail(?,?,?)}";
			Connection conn = null;
			
			try {
				CallableStatement stmt =null;
				conn = dataSource.getConnection();
				stmt = conn.prepareCall(sql);
				stmt.setInt(1, msg_id);
				stmt.setString(2, channel_detail_id);
				stmt.setInt(3, user_id);
				stmt.executeUpdate();
				//rs.close();		
				stmt.close();
				//return drafArr;
				
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
		public void savePhoto(int msg_id, String file_name){
			String sql = "{call sp_insert_attach_file(?,?)}";
			Connection conn = null;
			
			try {
				CallableStatement stmt =null;
				conn = dataSource.getConnection();
				stmt = conn.prepareCall(sql);
				stmt.setString(1, file_name);
				stmt.setInt(2, msg_id);
				stmt.executeUpdate();
				//rs.close();		
				stmt.close();
				//return drafArr;
				
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
		public void deleteMessageDetail(int msg_id, String channel_detail_id){
			String sql = "{call sp_delete_message_detail(?,?)}";
			Connection conn = null;
			
			try {
				CallableStatement stmt =null;
				conn = dataSource.getConnection();
				stmt = conn.prepareCall(sql);
				stmt.setInt(1, msg_id);
				stmt.setString(2, channel_detail_id);
				stmt.executeUpdate();
				//rs.close();		
				stmt.close();
				//return drafArr;
				
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
		public ArrayList<DraftAndSchedule> selectFileMessageById(int msg_id){
			String sql = "{call sp_select_file_by_msg_id(?)}";
			Connection conn = null;
			
			try {
				CallableStatement stmt =null;
				conn = dataSource.getConnection();
				stmt = conn.prepareCall(sql);
				stmt.setInt(1,msg_id);
				
				
				
				ArrayList<DraftAndSchedule> allArr = new ArrayList<DraftAndSchedule>(); 	
				ResultSet rs = stmt.executeQuery();
				
				while (rs.next()) {
					DraftAndSchedule draftAndSchedule = null;
					draftAndSchedule = new DraftAndSchedule(	
							rs.getString("file_name"),
							rs.getInt("message_id"),
							rs.getInt("file_id")							
					);
					
					allArr.add(draftAndSchedule);
				}

				rs.close();		
				stmt.close();
				return allArr;
				
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
		public void deletePhoto(int msg_id, String file_name){
			String sql = "{call sp_delete_attach_file(?,?)}";
			Connection conn = null;
			
			try {
				CallableStatement stmt =null;
				conn = dataSource.getConnection();
				stmt = conn.prepareCall(sql);
				stmt.setInt(1, msg_id);
				stmt.setString(2, file_name);
				stmt.executeUpdate();
				//rs.close();		
				stmt.close();
				//return drafArr;
				
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