package com.andwise.channel.dao;

import java.util.ArrayList;
import com.andwise.channel.model.ChannelDetail;
public interface ChannelDetailDao 
{
	public ArrayList<ChannelDetail> selectChannelDetail(int user_id,int administrator,String channel_id);
	public ArrayList<ChannelDetail> selectPostSchedule(int user_id,int msg_id,int adminstrator);	
	public ArrayList<ChannelDetail> selectListDate(int msg_id, int type);
	public void saveChannelDetail(String channel_detail_id,int channel_id,int user_id, String channel_user,String token_live,String channel_picture,String pchannel_detail_id,long last_view,String create_date);
	public void updateLastview(String channel_detail_id,int user_id,long last_view);
	public void deleteChannelDetail(int user_id,String channel_detail_id);
	public ArrayList<ChannelDetail> selectChannelAssign(int user_id,int team_id);
	public ArrayList<ChannelDetail> selectCategory();
	public ArrayList<ChannelDetail> selectFollower(String channel_detail_id,int user_id,long start_date, long end_date,String type);
	public void updateLoadOption(String channel_detail_id,int user_id,int load_option);
	public String selectTokenUser(String pchannel_detail_id);
	public void saveChannelPageDetail(String channel_detail_id,int channel_id,int user_id, String channel_user,String token_live,String channel_picture,String pchannel_detail_id,long last_view,String create_date);
	public ArrayList<ChannelDetail> selectChannelDetailSelectPost(int user_id,int administrator);	
	public ArrayList<ChannelDetail> selectChannelPageTw(int user_id,int administrator,String channel_id);
	
}
