package com.andwise.channel.model;

public class ChannelDetail {
	String channel_detail_id; 
	int channel_id;
	int user_id;
	String channel_title;
	String channel_user;
	String token_user;
	String channel_picture;
	int fan_num;
	int engagement_num;
	String pchannel_id;
	int select_post;
	int message_id;
	long send_date;	
	int default_show;
	int category_id;
	String category_name;
	int follower;
	int following;
	long date_long;
	long last_view;
	int friendsoffan;
	int load_option;
	int default_comment;
	public long getSend_date() {
		return send_date;
	}
	public void setSend_date(long send_date) {
		this.send_date = send_date;
	}
	public int getMessage_id() {
		return message_id;
	}
	public void setMessage_id(int message_id) {
		this.message_id = message_id;
	}
	
	public int getDefault_show() {
		return default_show;
	}
	public void setDefault_show(int default_show) {
		this.default_show = default_show;
	}
	
	public int getDefault_comment() {
		return default_comment;
	}
	public void setDefault_comment(int default_comment) {
		this.default_comment = default_comment;
	}
	//
	public ChannelDetail(String channel_detail_id, int channel_id, int user_id,
			String channel_title, String channel_user, String token_user,
			String channel_picture, int fan_num, int engagement_num,
			String pchannel_id, int select_post,int default_show,long last_view,int load_option,int default_comment) {
		super();
		this.channel_detail_id = channel_detail_id;
		this.channel_id = channel_id;
		this.user_id = user_id;
		this.channel_title = channel_title;
		this.channel_user = channel_user;
		this.token_user = token_user;
		this.channel_picture = channel_picture;
		this.fan_num = fan_num;
		this.engagement_num = engagement_num;
		this.pchannel_id = pchannel_id;
		this.select_post = select_post;
		this.default_show=default_show;
		this.last_view=last_view;
		this.load_option=load_option;
		this.default_comment= default_comment;
	}
	public ChannelDetail(int message_id, String channel_detail_id,  
			 String channel_user, String token_user,String pchannel_id, int channel_id) {
		super();
		this.message_id=message_id;
		this.channel_detail_id = channel_detail_id;
		this.channel_user = channel_user;
		this.token_user = token_user;
		this.pchannel_id = pchannel_id;
		this.channel_id = channel_id;
	}
	public ChannelDetail(long send_date) {
		super();
		this.send_date=send_date;
		
	}
	public ChannelDetail(String channel_detail_id) {
		super();
		this.channel_detail_id=channel_detail_id;
		
	}
	public ChannelDetail(int category_id, String category_name) {
		super();
		this.category_id=category_id;
		this.category_name=category_name;
		
	}
	public String getChannel_detail_id() {
		return channel_detail_id;
	}
	public void setChannel_detail_id(String channel_detail_id) {
		this.channel_detail_id = channel_detail_id;
	}
	public ChannelDetail(int follower, int following, long date_long ,int friendsoffan) {
		super();
		this.follower=follower;
		this.following=following;
		this.date_long=date_long;
		this.friendsoffan=friendsoffan;
		
	}
	public int getChannel_id() {
		return channel_id;
	}
	public void setChannel_id(int channel_id) {
		this.channel_id = channel_id;
	}
	
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	
	public String getChannel_title() {
		return channel_title;
	}
	public void setChannel_title(String channel_title) {
		this.channel_title = channel_title;
	}
	
	public String getChannel_user() {
		return channel_user;
	}
	public void setChannel_user(String channel_user) {
		this.channel_user = channel_user;
	}
	
	public String getToken_user() {
		return token_user;
	}
	public void setToken_user(String token_user) {
		this.token_user = token_user;
	}
	
	public String getChannel_picture() {
		return channel_picture;
	}
	public void setChannel_picture(String channel_picture) {
		this.channel_picture = channel_picture;
	}
	
	public int getFan_num() {
		return fan_num;
	}
	public void setFan_num(int fan_num) {
		this.fan_num = fan_num;
	}
	
	public int getEngagement_num() {
		return engagement_num;
	}
	public void setEngagement_num(int engagement_num) {
		this.engagement_num = engagement_num;
	}
	
	public String getPchannel_id() {
		return pchannel_id;
	}
	public void setPchannel_id(String pchannel_id) {
		this.pchannel_id = pchannel_id;
	}
	
	public int getSelect_post() {
		return select_post;
	}
	public void setSelect_post(int select_post) {
		this.select_post = select_post;
	}


	public int getCategory_id() {
		return category_id;
	}
	public void setCategory_id(int category_id) {
		this.category_id = category_id;
	}
	public String getCategory_name() {
		return category_name;
	}
	public void setCategory_name(String category_name) {
		this.category_name = category_name;
	}
	
	public int getFollower() {
		return follower;
	}
	public void setFollower(int follower) {
		this.follower = follower;
	}
	public int getFollowing() {
		return following;
	}
	public void setFollowing(int follewing) {
		this.following = follewing;
	}
	public long getDate_long() {
		return date_long;
	}
	public void setDate_long(long date_long) {
		this.date_long = date_long;
	}
	
	public long getLast_view() {
		return last_view;
	}
	public void setLast_view(long last_view) {
		this.last_view = last_view;
	}
	
	public int getFriendsoffan() {
		return friendsoffan;
	}
	public void setFriendsoffan(int friendsoffan) {
		this.friendsoffan = friendsoffan;
	}
	
	public int getLoad_option() {
		return load_option;
	}
	public void setLoad_option(int load_option) {
		this.load_option = load_option;
	}
	@Override
	public String toString() {
		return "ChannelDetail [channel_detail_id=" + channel_detail_id
				+ ", channel_id=" + channel_id + ", user_id=" + user_id
				+ ", channel_title=" + channel_title + ", channel_user="
				+ channel_user + ", token_user=" + token_user
				+ ", channel_picture=" + channel_picture + ", fan_num="
				+ fan_num + ", engagement_num=" + engagement_num
				+ ", pchannel_id=" + pchannel_id + ", select_post="
				+ select_post + "]";
	}
	
	
	
}
