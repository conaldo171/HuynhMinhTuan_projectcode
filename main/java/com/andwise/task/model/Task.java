package com.andwise.task.model;

public class Task {
String task_id;
String task_name;
String profile_name;
int user_id;
long create_date;
long create_at;
String task_avatar;
int type_social;
int status;
int priority;
int tracker;
String list_email;
String list_user;
int comment_id;
String list_user_id;
String email;
String task_history;
public String getTask_id() {
	return task_id;
}
public void setTask_id(String task_id) {
	this.task_id = task_id;
}
public String getTask_name() {
	return task_name;
}
public void setTask_name(String task_name) {
	this.task_name = task_name;
}

public String getProfile_name() {
	return profile_name;
}
public void setProfile_name(String profile_name) {
	this.profile_name = profile_name;
}
public int getUser_id() {
	return user_id;
}
public void setUser_id(int user_id) {
	this.user_id = user_id;
}
public long getCreate_date() {
	return create_date;
}
public void setCreate_date(long create_date) {
	this.create_date = create_date;
}
public long getCreate_at() {
	return create_at;
}
public void setCreate_at(long create_at) {
	this.create_at = create_at;
}
public String getTask_avatar() {
	return task_avatar;
}
public void setTask_avatar(String task_avatar) {
	this.task_avatar = task_avatar;
}
public int getType_social() {
	return type_social;
}
public void setType_social(int type_social) {
	this.type_social = type_social;
}
public int getStatus() {
	return status;
}
public void setStatus(int status) {
	this.status = status;
}
public int getPriority() {
	return priority;
}
public void setPriority(int priority) {
	this.priority = priority;
}
public int getTracker() {
	return tracker;
}
public void setTracker(int tracker) {
	this.tracker = tracker;
}

public String getList_email() {
	return list_email;
}
public void setList_email(String list_email) {
	this.list_email = list_email;
}
public String getList_user() {
	return list_user;
}
public void setList_user(String list_user) {
	this.list_user = list_user;
}
public int getComment_id() {
	return comment_id;
}
public void setComment_id(int comment_id) {
	this.comment_id = comment_id;
}

public String getList_user_id() {
	return list_user_id;
}
public void setList_user_id(String list_user_id) {
	this.list_user_id = list_user_id;
}

public String getEmail() {
	return email;
}
public void setEmail(String email) {
	this.email = email;
}

public String getTask_history() {
	return task_history;
}
public void setTask_history(String task_history) {
	this.task_history = task_history;
}
public Task(String task_id, String task_name,String profile_name,int user_id,long create_date,long create_at, String task_avatar,int type_social,int status,int priority,int tracker){
	super();
	this.task_id=task_id;
	this.task_name=task_name;
	this.profile_name=profile_name;
	this.user_id=user_id;
	this.create_date=create_date;
	this.create_at=create_at;
	this.task_avatar= task_avatar;
	this.type_social= type_social;
	this.status=status;
	this.priority=priority;
	this.tracker=tracker;
}
public Task(String task_id, int user_id,String email){
	super();
	this.task_id=task_id;
	this.user_id=user_id;
	this.email=email;
}
public Task(int comment_id,String list_email,String list_user,String list_user_id,String task_history){
	super();
	this.comment_id=comment_id;
	this.list_email=list_email;
	this.list_user=list_user;
	this.list_user_id=list_user_id;
	this.task_history=task_history;
	
}
}
