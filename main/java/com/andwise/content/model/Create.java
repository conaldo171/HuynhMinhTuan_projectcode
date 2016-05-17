package com.andwise.content.model;

import java.util.Date;

public class Create {
	int message_id; 
	Date  create_date;
	long send_date;
	String content;
	int like_num;
	int reply_num;
	int status_id;
	public int getMessage_id() {
		return message_id;
	}
	public void setMessage_id(int message_id) {
		this.message_id = message_id;
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
	public Create(int message_id, Date create_date,
			long send_date, String content, int like_num,
			int reply_num, int status_id) {
		super();
		this.message_id=message_id;
		this.create_date = create_date;
		this.send_date = send_date;
		this.content = content;
		this.like_num = like_num;
		this.reply_num = reply_num;
		this.status_id = status_id;
		
		
	}
	
}
