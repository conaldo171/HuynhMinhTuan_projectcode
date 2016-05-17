package com.andwise.content.dao.impl;

import com.andwise.common.ConfigFactory;
import com.andwise.common.ConfigTable;
import com.andwise.content.dao.CreateDao;

import java.sql.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

import javax.sql.DataSource;

import twitter4j.Twitter;
import twitter4j.TwitterException;
import twitter4j.TwitterFactory;
import twitter4j.User;
import twitter4j.auth.AccessToken;
public class ImplCreate implements CreateDao {
	private DataSource dataSource;
	
	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}
	public int saveDraftMessage(String create_date,String content,int status_id,long send_date,int user_id,int team_role)
	{
		String sql = "{call sp_insert_draft_message(?,?,?,?,?,?,?)}";
		Connection conn = null;
		int message_id = 0;
		try {
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			stmt.setString(1, create_date);
			stmt.setString(2, content);
			stmt.setInt(3, status_id);
			stmt.setLong(4, send_date);
			stmt.setInt(5, user_id);
			stmt.setInt(6, team_role);
			 stmt.registerOutParameter(7, Types.INTEGER, message_id);
			stmt.executeUpdate();
			int	msg_id = stmt.getInt(7);	
			stmt.close();
			return msg_id;
			
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
	public int insertContentFromExcel(int user_id, String create_date,int status,long send_date, String list_content_public,String list_channel_detail, String list_image, int team_role ){
		String sql = "{call sp_public_excel_insert(?,?,?,?,?,?,?,?,?)}";
		Connection conn = null;
		int message_id = 0;
		try {
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			stmt.setInt(1, user_id);
			stmt.setString(2, create_date);
			stmt.setInt(3, status);
			stmt.setLong(4, send_date);
			stmt.setString(5, list_content_public);
			stmt.setString(6, list_channel_detail);
			stmt.setString(7, list_image);
			
			stmt.setInt(8, team_role);
			 stmt.registerOutParameter(9, Types.INTEGER, message_id);
			stmt.executeUpdate();
			message_id = stmt.getInt(9);	
			stmt.close();
			return message_id;
			
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
	public int inserContentFromExcelToSchedule(int user_id, String create_date, int status, long send_date,String list_content_public,String list_channel_detail, String list_image,String list_date_schedule, int team_role ){
		String sql = "{call sp_public_excel_insert_schedule(?,?,?,?,?,?,?,?,?,?)}";
		Connection conn = null;
		int message_id = 0;
		try {
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			stmt.setInt(1, user_id);
			stmt.setString(2, create_date);
			stmt.setInt(3, status);
			stmt.setLong(4, send_date);
			stmt.setString(5, list_content_public);
			stmt.setString(6, list_channel_detail);
			stmt.setString(7, list_image);
			stmt.setString(8, list_date_schedule);
			stmt.setInt(9, team_role);
			 stmt.registerOutParameter(10, Types.INTEGER, message_id);
			stmt.executeUpdate();
			message_id = stmt.getInt(10);	
			stmt.close();
			return message_id;
			
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
	public String inserPostOfComment(String list_post_id,String list_content_public, long create_date, int user_id, String list_channel_detail_id,String list_comment_public,int status_id){
		String sql = "{call sp_post_of_comment_insert(?,?,?,?,?,?,?,?)}";
		Connection conn = null;
		String message_id = "";
		try {
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			stmt.setString(1, list_post_id);
			stmt.setString(2, list_content_public);
			stmt.setLong(3, create_date);
			stmt.setInt(4, user_id);
			stmt.setString(5, list_channel_detail_id);
			stmt.setString(6, list_comment_public);
			stmt.setInt(7, status_id);
			stmt.registerOutParameter(8, Types.VARCHAR, message_id);
			stmt.executeUpdate();
			message_id = stmt.getString(8);	
			stmt.close();
			return message_id;
			
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
	public String inserCommentFromExcelToSchedule(String list_post_id,String list_content_public, long create_date, int user_id, String list_channel_detail_id,String list_comment_public,String list_send_date,int status_id){
		String sql = "{call sp_comment_schedule_insert(?,?,?,?,?,?,?,?,?)}";
		Connection conn = null;
		String message_id = "";
		try {
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			stmt.setString(1, list_post_id);
			stmt.setString(2, list_content_public);
			stmt.setLong(3, create_date);
			stmt.setInt(4, user_id);
			stmt.setString(5, list_channel_detail_id);
			stmt.setString(6, list_comment_public);
			stmt.setString(7, list_send_date);
			stmt.setInt(8, status_id);
			stmt.registerOutParameter(9, Types.VARCHAR, message_id);
			stmt.executeUpdate();
			message_id = stmt.getString(9);	
			stmt.close();
			return message_id;
			
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
	public int saveDraftFromSchedule(String create_date,String content,int status_id,long send_date,int user_id,int team_role,String list_channel_detail_id)
	{
		String sql = "{call sp_insert_draft_from_schedule(?,?,?,?,?,?,?,?)}";
		Connection conn = null;
		int message_id = 0;
		try {
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			stmt.setString(1, create_date);
			stmt.setString(2, content);
			stmt.setInt(3, status_id);
			stmt.setLong(4, send_date);
			stmt.setInt(5, user_id);
			stmt.setInt(6, team_role);
			stmt.setString(7, list_channel_detail_id);
			 stmt.registerOutParameter(8, Types.INTEGER, message_id);
			stmt.executeUpdate();
			int	msg_id = stmt.getInt(8);	
			stmt.close();
			return msg_id;
			
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
	public int saveMessage(String create_date,String content,int status_id,long send_date,int user_id,String list_send_date_schedule,int administrator){
		String sql = "{call sp_insert_message(?,?,?,?,?,?,?,?)}";
		Connection conn = null;
		int message_id = 0;
		try {
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			stmt.setString(1, create_date);
			stmt.setString(2, content);
			stmt.setInt(3, status_id);
			stmt.setLong(4, send_date);
			stmt.setInt(5, user_id);
			stmt.setString(6, list_send_date_schedule);
			stmt.setInt(7, administrator);
			stmt.registerOutParameter(8, Types.INTEGER, message_id);
			stmt.executeUpdate();
			int	msg_id = stmt.getInt(8);	
			stmt.close();
			return msg_id;
			
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
	public int saveSchedule(int msg_id, long send_date){
		String sql = "{call sp_insert_schedule(?,?)}";
		Connection conn = null;
		try{
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
		stmt = conn.prepareCall(sql);
		stmt.setInt(1, msg_id);
		stmt.setLong(2, send_date);
		stmt.executeUpdate();
		stmt.close();
		return msg_id;
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
	public void  updateChannel(int select_post, String channel_detail_id, int user_id, int administrator){
		String sql = "{call sp_update_channel_detail(?,?,?,?)}";
		Connection conn = null;
		try{
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
		stmt = conn.prepareCall(sql);
		stmt.setInt(1, select_post);
		stmt.setString(2, channel_detail_id);
		stmt.setInt(3, user_id);
		stmt.setInt(4, administrator);
		stmt.executeUpdate();
		stmt.close();
		//return msg_id;
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
	public void  updateChannelDefault(int default_show, String channel_detail_id, int user_id, int administrator){
		String sql = "{call sp_update_channel_default(?,?,?,?)}";
		Connection conn = null;
		try{
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
		stmt = conn.prepareCall(sql);
		stmt.setInt(1, default_show);
		stmt.setString(2, channel_detail_id);
		stmt.setInt(3, user_id);
		stmt.setInt(4, administrator);
		stmt.executeUpdate();
		stmt.close();
		//return msg_id;
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
	public void  updateChannelDefaultComment(int default_comment, String channel_detail_id, int user_id, int administrator,int channel_id){
		String sql = "{call sp_update_channel_default_comment(?,?,?,?,?)}";
		Connection conn = null;
		try{
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
		stmt = conn.prepareCall(sql);
		stmt.setInt(1, default_comment);
		stmt.setString(2, channel_detail_id);
		stmt.setInt(3, user_id);
		stmt.setInt(4, administrator);
		stmt.setInt(5, channel_id);
		stmt.executeUpdate();
		stmt.close();
		//return msg_id;
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
	public int saveMessageSendFromSchedule(String create_date,String content,int status_id,long send_date,int user_id,String list_channel_detail){
		String sql = "{call sp_insert_send_from_schedule(?,?,?,?,?,?,?)}";
		Connection conn = null;
		int message_id = 0;
		try {
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			stmt.setString(1, create_date);
			stmt.setString(2, content);
			stmt.setInt(3, status_id);
			stmt.setLong(4, send_date);
			stmt.setInt(5, user_id);
			stmt.setString(6, list_channel_detail);
			 stmt.registerOutParameter(7, Types.INTEGER, message_id);
			stmt.executeUpdate();
			int	msg_id = stmt.getInt(7);	
			stmt.close();
			return msg_id;
			
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
	public void insertFollow(String channel_detail_id,String token_access,int user_id,long create_date,String type) {
		 ConfigTable cfTable = ConfigFactory.getInstance();
		 String temp[] = token_access.split("_");
		 String tw_consumer_key =cfTable.getValue("tw_consumer_key"); 
		 String tw_consumer_secret =cfTable.getValue("tw_consumer_secret");
		 TwitterFactory fac = new TwitterFactory();
		 AccessToken accessToken = new AccessToken(temp[0],temp[1] );
		 
	  long lchannel_detail_id=0; 
	  lchannel_detail_id  =Long.parseLong(channel_detail_id);
		 //Twitter twitter = fac.getInstance();
		 User user=null;
		 Twitter twitter = fac.getInstance();
		 twitter.setOAuthConsumer(tw_consumer_key,tw_consumer_secret);
		 twitter.setOAuthAccessToken(accessToken);
		 try {
			user =  twitter.showUser(lchannel_detail_id);
		} catch (TwitterException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		 int follower = user.getFollowersCount();
		 int friends = user.getFriendsCount();
		 String sql = "{call sp_insert_analysis_report(?,?,?,?,?,?,?,?)}";
			Connection conn = null;
			 try {
			
				CallableStatement stmt =null;
				conn = dataSource.getConnection();
				stmt = conn.prepareCall(sql);
				stmt.setString(1, channel_detail_id);
				stmt.setInt(2, user_id);
				stmt.setLong(3, create_date);
				stmt.setInt(4, follower);
				stmt.setInt(5, friends);
				stmt.setInt(6, 0);
				stmt.setString(7, type);
				
				stmt.setInt(8, 0);
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
	public void insertFriendsFacebook(String channel_detail_id,int friends_number,int friendoffan,int user_id,long create_date,String type){
			 String sql = "{call sp_insert_analysis_report(?,?,?,?,?,?,?,?)}";
			Connection conn = null;
			 try {
			
				CallableStatement stmt =null;
				conn = dataSource.getConnection();
				stmt = conn.prepareCall(sql);
				stmt.setString(1, channel_detail_id);
				stmt.setInt(2, user_id);
				stmt.setLong(3, create_date);
				stmt.setInt(4, 0);
				stmt.setInt(5, friends_number);
				stmt.setInt(6, friendoffan);
				stmt.setString(7, type);
				stmt.setInt(8, 0);
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
	public String updateCommentSent(int comment_id, int user_id, String channel_detail_id, long create_date, int status, int channel_id){
		String sql = "{call sp_comment_update_sent(?,?,?,?,?,?)}";
		Connection conn = null;
		String token="";
		try {
			conn = dataSource.getConnection();
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setInt(1, comment_id);
			ps.setInt(2, user_id);
			ps.setString(3,channel_detail_id);
			ps.setLong(4, create_date);
			ps.setInt(5, status);
			ps.setInt(6, channel_id);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				token= rs.getString("token_user");	
			}
			rs.close();		
			ps.close();
			return token;
			
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
	public String insertCommentFromsch(String comment_content,String task_id, int user_id, String channel_detail_id, long create_date, int status, int channel_id){
		String sql = "{call sp_comment_insert_from_schedule(?,?,?,?,?,?,?)}";
		Connection conn = null;
		String token="";
		try {
			conn = dataSource.getConnection();
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, comment_content);
			ps.setLong(2, create_date);
			ps.setString(3,task_id);
			ps.setInt(4, user_id);
			ps.setInt(5, status);
			ps.setString(6,channel_detail_id);
			ps.setInt(7, channel_id);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				token= rs.getString("token_user");	
			}
			rs.close();		
			ps.close();
			return token;
			
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
	public void deleteComment(int comment_id){
		String sql = "{call sp_comment_delete(?)}";
		Connection conn = null;
		try{
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
		stmt = conn.prepareCall(sql);
		stmt.setInt(1, comment_id);
		stmt.executeUpdate();
		stmt.close();
		//return msg_id;
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
	public void updateCommentDraft(int comment_id, String message, int user_id)
	{
		String sql = "{call sp_comment_update_draft(?,?,?)}";
		Connection conn = null;
		try{
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
		stmt = conn.prepareCall(sql);
		stmt.setInt(1, comment_id);
		stmt.setString(2, message);
		stmt.setInt(3, user_id);
		stmt.executeUpdate();
		stmt.close();
		//return msg_id;
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
	public void updateCommentSchedule(int comment_id, String message,String list_send_date, int user_id){
		String sql = "{call sp_comment_update_schedule(?,?,?,?)}";
		Connection conn = null;
		try{
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
		stmt = conn.prepareCall(sql);
		stmt.setInt(1, comment_id);
		stmt.setString(2, message);
		stmt.setString(3, list_send_date);
		stmt.setInt(4, user_id);
		stmt.executeUpdate();
		stmt.close();
		//return msg_id;
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
}
