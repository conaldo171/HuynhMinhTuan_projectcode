package com.andwise.task.model;

public class CommentTask {
int comment_id;
String comment_content;
String task_history;
long create_date;
String task_id;
int user_id;
String profile_name;
int comment_by;
String channel_user;
String channel_picture;
String channel_detail_id;
int channel_id;

public int getComment_id() {
	return comment_id;
}
public void setComment_id(int comment_id) {
	this.comment_id = comment_id;
}
public String getComment_content() {
	return comment_content;
}
public void setComment_content(String comment_content) {
	this.comment_content = comment_content;
}
public String getTask_history() {
	return task_history;
}
public void setTask_history(String task_history) {
	this.task_history = task_history;
}
public long getCreate_date() {
	return create_date;
}
public void setCreate_date(long create_date) {
	this.create_date = create_date;
}
public String getTask_id() {
	return task_id;
}
public void setTask_id(String task_id) {
	this.task_id = task_id;
}
public int getUser_id() {
	return user_id;
}
public void setUser_id(int user_id) {
	this.user_id = user_id;
}

public String getProfile_name() {
	return profile_name;
}
public void setProfile_name(String profile_name) {
	this.profile_name = profile_name;
}

public int getComment_by() {
	return comment_by;
}
public void setComment_by(int comment_by) {
	this.comment_by = comment_by;
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

public String getChannel_detail_id() {
	return channel_detail_id;
}
public void setChannel_detail_id(String channel_detail_id) {
	this.channel_detail_id = channel_detail_id;
}

public int getChannel_id() {
	return channel_id;
}
public void setChannel_id(int channel_id) {
	this.channel_id = channel_id;
}
public CommentTask(int comment_id, String comment_content, String task_history, long create_date, String task_id, int user_id,String profile_name){
	this.comment_id=comment_id;
	this.comment_content=comment_content;
	this.task_history=task_history;
	this.create_date=create_date;
	this.task_id=task_id;
	this.user_id=user_id;
	this.profile_name=profile_name;
	
}
public CommentTask(int comment_id, String comment_content, long create_date, String task_id, int user_id,String channel_user, String channel_picture,String channel_detail_id, int channel_id){
	this.comment_id=comment_id;
	this.comment_content=comment_content;
	this.create_date=create_date;
	this.task_id=task_id;
	this.user_id=user_id;
	this.channel_user=channel_user;
	this.channel_picture=channel_picture;
	this.channel_detail_id=channel_detail_id;
	this.channel_id=channel_id;
	
}
public CommentTask(int comment_id, String profile_name,int comment_by,int user_id){
	super();
	this.comment_id=comment_id;
	this.profile_name= profile_name;
	this.comment_by=comment_by;
	this.user_id=user_id;
}
public CommentTask(int comment_id, String task_history, String task_id,String profile_name){
	super();
	this.comment_id=comment_id;
	this.task_history=task_history;
	this.task_id=task_id;
	this.profile_name=profile_name;
}
}
