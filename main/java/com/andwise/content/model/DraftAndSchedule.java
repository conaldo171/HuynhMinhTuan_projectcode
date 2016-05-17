package com.andwise.content.model;
import java.util.*;

public class DraftAndSchedule {
	int message_id; 
	String channel_detail_id;
	Date  create_date;
	long send_date;
	String content;
	int like_num;
	int reply_num;
	int status_id;
	String token_user;
	String pchannel_id;
	String channel_user;
	String channel_picture;
	int channel_id;
	String user_name;
	String file_name;
	int file_id;
	int count_number;
	String post_id;
	public int getMessage_id() {
		return message_id;
	}
	public void setMessage_id(int message_id) {
		this.message_id = message_id;
	}
	public String getChannel_detail_id() {
		return channel_detail_id;
	}
	public void setChannel_detail_id(String channel_detail_id) {
		this.channel_detail_id = channel_detail_id;
	}
	public Date getCreate_date() {
		return create_date;
	}
	public void setCreate_date(Date create_date) {
		this.create_date = create_date;
	}
	public long getSend_date() {
		return send_date;
	}
	public void setSend_date(long send_date) {
		this.send_date = send_date;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public int getLike_num() {
		return like_num;
	}
	public void setLike_num(int like_num) {
		this.like_num = like_num;
	}
	public int getReply_num() {
		return reply_num;
	}
	public void setReply_num(int reply_num) {
		this.reply_num = reply_num;
	}
	public int getStatus_id() {
		return status_id;
	}
	public void setStatus_id(int status_id) {
		this.status_id = status_id;
	}
	
	public String getToken_user() {
		return token_user;
	}
	public void setToken_user(String token_user) {
		this.token_user = token_user;
	}
	
	public String getPchannel_id() {
		return pchannel_id;
	}
	public void setPchannel_id(String pchannel_id) {
		this.pchannel_id = pchannel_id;
	}
	
	public String getChannel_user() {
		return channel_user;
	}
	public void setChannel_user(String channel_user) {
		this.channel_user = channel_user;
	}
	public String getChannel_picture() {
		return channel_picture;
	}
	public void setChannel_picture(String channel_picture) {
		this.channel_picture = channel_picture;
	}
	
	public int getChannel_id() {
		return channel_id;
	}
	public void setChannel_id(int channel_id) {
		this.channel_id = channel_id;
	}
	
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	
	public String getFile_name() {
		return file_name;
	}
	public void setFile_name(String file_name) {
		this.file_name = file_name;
	}
	public int getFile_id() {
		return file_id;
	}
	public void setFile_id(int file_id) {
		this.file_id = file_id;
	}
	
	public int getCount_number() {
		return count_number;
	}
	public void setCount_number(int count_number) {
		this.count_number = count_number;
	}
	
	public String getPost_id() {
		return post_id;
	}
	public void setPost_id(String post_id) {
		this.post_id = post_id;
	}
	public DraftAndSchedule(int message_id, String channel_detail_id, Date create_date,
			long send_date, String content, int like_num,
			int reply_num, int status_id,String token_user,String pchannel_id) {
		super();
		this.message_id=message_id;
		this.channel_detail_id = channel_detail_id;
		this.create_date = create_date;
		this.send_date = send_date;
		this.content = content;
		this.like_num = like_num;
		this.reply_num = reply_num;
		this.status_id = status_id;
		this.token_user=token_user;
		this.pchannel_id =pchannel_id;
		
	}
	
	public DraftAndSchedule(int message_id,String content,Date create_date,String channel_user,String channel_picture,String user_name,String channel_detail_id, int channel_id,long send_date,int status_id,String file_name, int file_id) {
		super();
		this.message_id =message_id;
		this.content=content;
		this.create_date =create_date;
		this.channel_user=channel_user;
		this.channel_picture= channel_picture;
		this.user_name = user_name;
		this.channel_detail_id= channel_detail_id;
		this.channel_id= channel_id;
		this.send_date= send_date;
		this.status_id= status_id;
		this.file_name=file_name;
		this.file_id= file_id;
		
	}
	public DraftAndSchedule(String channel_detail_id, String token_user,String pchannel_id) {
		super();
		this.channel_detail_id=channel_detail_id;
		this.token_user=token_user;
		this.pchannel_id =pchannel_id;
		
	}
	public DraftAndSchedule(String file_name,int msg_id,int file_id) {
		super();
		this.file_name=file_name;
		this.message_id=msg_id;
		this.file_id =file_id;
		
	}
	public DraftAndSchedule(long send_date) {
		super();
		this.send_date=send_date;
		
		
	}
	public DraftAndSchedule(int count_number) {
		super();
		this.count_number=count_number;
		
		
	}
	public DraftAndSchedule(String post_id, String content, long send_date, String channel_detail_id, String channel_picture, String channel_user, int channel_id, int status_id) {
		super();
		this.post_id=post_id;
		this.content=content;
		this.send_date=send_date;
		this.channel_detail_id=channel_detail_id;
		this.channel_picture=channel_picture;
		this.channel_user=channel_user;
		this.channel_id=channel_id;
		this.status_id=status_id;
		
		
	}
}
