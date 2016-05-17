package com.andwise.channel.dao.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.sql.DataSource;
import java.util.ArrayList;

import com.andwise.channel.model.ChannelDetail;
import com.andwise.channel.dao.ChannelDetailDao;



public class ImplChannelDetailDao implements ChannelDetailDao{
	
private DataSource dataSource;
	
	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}

	public ArrayList<ChannelDetail> selectChannelDetail(int user_id,int administrator,String channel_id){
				
			String sql = "{call sp_select_channel_user(?,?,?)}";
			Connection conn = null;
			try {
				CallableStatement stmt =null;
				conn = dataSource.getConnection();
				stmt = conn.prepareCall(sql);
				stmt.setInt(1, user_id);
				stmt.setInt(2, administrator);
				stmt.setString(3, channel_id);
				ArrayList<ChannelDetail> channelDetailArr = new ArrayList<ChannelDetail>();
				ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				ChannelDetail channelDetail = null;
				channelDetail = new ChannelDetail(					
						rs.getString("channel_detail_id"), 
						rs.getInt("channel_id"),
						rs.getInt("user_id"),
						rs.getString("channel_title"),
						rs.getString("channel_user"),
						rs.getString("token_user"),
						rs.getString("channel_picture"),
						rs.getInt("fan_num"),
						rs.getInt("engagement_num"),
						rs.getString("pchannel_id"),
						rs.getInt("select_post"),
						rs.getInt("default"),
						rs.getLong("last_view"),
						rs.getInt("load_option"),
						rs.getInt("default_comment")
				);
				
				channelDetailArr.add(channelDetail);
			}
			
			rs.close();		
			stmt.close();
			return channelDetailArr;
			
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
	
	public ArrayList<ChannelDetail> selectChannelPageTw(int user_id,int administrator,String channel_id){
		channel_id = channel_id.replaceAll("'", "");
		String sql = "{call sp_select_channel_page_twitter(?,?,?)}";
		Connection conn = null;
		try {
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			stmt.setInt(1, user_id);
			
			stmt.setString(2, channel_id);
			stmt.setInt(3, administrator);
			ArrayList<ChannelDetail> channelDetailArr = new ArrayList<ChannelDetail>();
			ResultSet rs = stmt.executeQuery();
		while (rs.next()) {
			ChannelDetail channelDetail = null;
			channelDetail = new ChannelDetail(					
					rs.getString("channel_detail_id"), 
					rs.getInt("channel_id"),
					rs.getInt("user_id"),
					rs.getString("channel_title"),
					rs.getString("channel_user"),
					rs.getString("token_user"),
					rs.getString("channel_picture"),
					rs.getInt("fan_num"),
					rs.getInt("engagement_num"),
					rs.getString("pchannel_id"),
					rs.getInt("select_post"),
					rs.getInt("default"),
					rs.getLong("last_view"),
					rs.getInt("load_option"),
					rs.getInt("default_comment")
			);
			
			channelDetailArr.add(channelDetail);
		}
		
		rs.close();		
		stmt.close();
		return channelDetailArr;
		
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
	public ArrayList<ChannelDetail> selectChannelDetailSelectPost(int user_id,int administrator){
		String sql = "{call sp_select_channel_choose_post(?,?)}";
		Connection conn = null;
		try {
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			stmt.setInt(1, user_id);
			stmt.setInt(2, administrator);
			ArrayList<ChannelDetail> channelDetailArr = new ArrayList<ChannelDetail>();
			ResultSet rs = stmt.executeQuery();
		while (rs.next()) {
			ChannelDetail channelDetail = null;
			channelDetail = new ChannelDetail(					
					rs.getString("channel_detail_id"), 
					rs.getInt("channel_id"),
					rs.getInt("user_id"),
					rs.getString("channel_title"),
					rs.getString("channel_user"),
					rs.getString("token_user"),
					rs.getString("channel_picture"),
					rs.getInt("fan_num"),
					rs.getInt("engagement_num"),
					rs.getString("pchannel_id"),
					rs.getInt("select_post"),
					rs.getInt("default"),
					rs.getLong("last_view"),
					rs.getInt("load_option"),
					rs.getInt("default_comment")
			);
			
			channelDetailArr.add(channelDetail);
		}
		
		rs.close();		
		stmt.close();
		return channelDetailArr;
		
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
	public ArrayList<ChannelDetail> selectChannelAssign(int user_id,int team_id){
		String sql = "{call sp_select_channel_detail_byid(?,?)}";
		Connection conn = null;
		try {
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			stmt.setInt(1, user_id);
			stmt.setInt(2, team_id);
			ArrayList<ChannelDetail> channelDetailArr = new ArrayList<ChannelDetail>();
			ResultSet rs = stmt.executeQuery();
		while (rs.next()) {
			ChannelDetail channelDetail = null;
			channelDetail = new ChannelDetail(					
					rs.getString("channel_detail_id")
					
			);
			
			channelDetailArr.add(channelDetail);
		}
		
		rs.close();		
		stmt.close();
		return channelDetailArr;
		
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
	public ArrayList<ChannelDetail> selectListDate(int msg_id, int type){
		
		String sql = "{call sp_select_list_date_schedule(?,?)}";
		Connection conn = null;
		
		try {
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
			stmt = conn.prepareCall(sql);
			stmt.setInt(1, msg_id);
			stmt.setInt(2, type);
			ArrayList<ChannelDetail> drafArr = new ArrayList<ChannelDetail>(); 	
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				ChannelDetail listDate = null;
				listDate = new ChannelDetail(	
						rs.getLong("send_date"));
				drafArr.add(listDate);
			}
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
	public ArrayList<ChannelDetail> selectPostSchedule(int user_id,int msg_id, int administrator){
		
		String sql = "{call sp_select_post_schedule(?,?,?)}";
		Connection conn = null;
		
		try {
			conn = dataSource.getConnection();
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setInt(1, user_id);
			ps.setInt(2, msg_id);
			ps.setInt(3, administrator);
			
			
			ArrayList<ChannelDetail> channelDetailArr = new ArrayList<ChannelDetail>(); 	
			ResultSet rs = ps.executeQuery();
			
			while (rs.next()) {
				ChannelDetail channelDetail = null;
				channelDetail = new ChannelDetail(		
						rs.getInt("message_id"), 
						rs.getString("channel_detail_id"), 
						rs.getString("channel_user"),
						rs.getString("token_user"),
						rs.getString("pchannel_id"),
						rs.getInt("channel_id")
				);
				
				channelDetailArr.add(channelDetail);
			}
			
			rs.close();		
			ps.close();
			return channelDetailArr;
			
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
	public void saveChannelDetail(String channel_detail_id,int channel_id,int user_id, String channel_user,String token_live,String channel_picture,String pchannel_detail_id,long last_view,String create_date){
		String sql = "{call sp_insert_channel_detail(?,?,?,?,?,?,?,?,?)}";
		Connection conn = null;
		try{
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
		stmt = conn.prepareCall(sql);
		stmt.setString(1,channel_detail_id);
		stmt.setInt(2,channel_id);
		stmt.setInt(3,user_id);
		stmt.setString(4,channel_user);
		stmt.setString(5,token_live);
		stmt.setString(6,channel_picture);
		stmt.setString(7,pchannel_detail_id);
		stmt.setLong(8,last_view);
		stmt.setString(9,create_date);
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
	public void saveChannelPageDetail(String channel_detail_id,int channel_id,int user_id, String channel_user,String token_live,String channel_picture,String pchannel_detail_id,long last_view,String create_date){
		String sql = "{call sp_insert_channel_page_detail(?,?,?,?,?,?,?,?,?)}";
		Connection conn = null;
		try{
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
		stmt = conn.prepareCall(sql);
		stmt.setString(1,channel_detail_id);
		stmt.setInt(2,channel_id);
		stmt.setInt(3,user_id);
		stmt.setString(4,channel_user);
		stmt.setString(5,token_live);
		stmt.setString(6,channel_picture);
		stmt.setString(7,pchannel_detail_id);
		stmt.setLong(8,last_view);
		stmt.setString(9,create_date);
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
	public void updateLastview(String channel_detail_id,int user_id,long last_view){
		String sql = "{call sp_update_channel_detail_last_view(?,?,?)}";
		Connection conn = null;
		try{
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
		stmt = conn.prepareCall(sql);
		stmt.setInt(1,user_id);
		stmt.setString(2,channel_detail_id);
		stmt.setLong(3,last_view);
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
	public void deleteChannelDetail(int user_id,String channel_detail_id){
		String sql = "{call sp_delete_channel_detail(?,?)}";
		Connection conn = null;
		try{
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
		stmt = conn.prepareCall(sql);
		stmt.setInt(1,user_id);
		stmt.setString(2,channel_detail_id);
		
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
	public ArrayList<ChannelDetail> selectCategory(){
		String sql = "{call sp_select_category()}";
		Connection conn = null;
		
		try {
			conn = dataSource.getConnection();
			PreparedStatement ps = conn.prepareStatement(sql);
			ArrayList<ChannelDetail> channelDetailArr = new ArrayList<ChannelDetail>(); 	
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				ChannelDetail channelDetail = null;
				channelDetail = new ChannelDetail(		
						rs.getInt("category_id"), 
						rs.getString("name")
						
				);
				
				channelDetailArr.add(channelDetail);
			}
			
			rs.close();		
			ps.close();
			return channelDetailArr;
			
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
	public ArrayList<ChannelDetail> selectFollower(String channel_detail_id,int user_id,long start_date, long end_date,String type){
		String sql = "{call sp_select_follower_following(?,?,?,?,?)}";
		Connection conn = null;
		
		try {
			conn = dataSource.getConnection();
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, channel_detail_id);
			ps.setInt(2, user_id);
			ps.setLong(3, start_date);
			ps.setLong(4, end_date);
			ps.setString(5, type);
			
			
			ArrayList<ChannelDetail> channelDetailArr = new ArrayList<ChannelDetail>(); 	
			ResultSet rs = ps.executeQuery();
			
			while (rs.next()) {
				ChannelDetail channelDetail = null;
				channelDetail = new ChannelDetail(		
						rs.getInt("follower"),
						rs.getInt("friends"),
						rs.getLong("date"),
						rs.getInt("friendsoffan")
				);
				
				channelDetailArr.add(channelDetail);
			}
			
			rs.close();		
			ps.close();
			return channelDetailArr;
			
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
	public void updateLoadOption(String channel_detail_id,int user_id,int load_option){
		String sql = "{call sp_update_load_option_channel_detail(?,?,?)}";
		Connection conn = null;
		try{
			CallableStatement stmt =null;
			conn = dataSource.getConnection();
		stmt = conn.prepareCall(sql);
		stmt.setInt(1,user_id);
		stmt.setString(2,channel_detail_id);
		stmt.setInt(3,load_option);
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
	public String selectTokenUser(String pchannel_detail_id){
		String sql = "{call sp_select_token_user_fb(?)}";
		Connection conn = null;
		String token="";
		try {
			conn = dataSource.getConnection();
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, pchannel_detail_id);
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
	
}
