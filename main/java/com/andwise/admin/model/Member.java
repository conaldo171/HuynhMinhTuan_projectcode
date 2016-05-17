package com.andwise.admin.model;

public class Member {
 int no;
 int user_id;
 int team_id;
 String create_date;
 String industry ;
 String company;
 String name;
 String email;
 String channel_user;
 int team_member;
 int total_content;
 String service;
 long service_start;
 long service_end;
 String list_channel;
public int getNo() {
	return no;
}
public void setNo(int no) {
	this.no = no;
}

public int getUser_id() {
	return user_id;
}
public void setUser_id(int user_id) {
	this.user_id = user_id;
}

public int getTeam_id() {
	return team_id;
}
public void setTeam_id(int team_id) {
	this.team_id = team_id;
}
public String getCreate_date() {
	return create_date;
}
public void setCreate_date(String create_date) {
	this.create_date = create_date;
}
public String getIndustry() {
	return industry;
}
public void setIndustry(String industry) {
	this.industry = industry;
}
public String getCompany() {
	return company;
}
public void setCompany(String company) {
	this.company = company;
}
public String getName() {
	return name;
}
public void setName(String name) {
	this.name = name;
}
public String getEmail() {
	return email;
}
public void setEmail(String email) {
	this.email = email;
}
public String getChannel_user() {
	return channel_user;
}
public void setChannel_user(String channel_user) {
	this.channel_user = channel_user;
}
public int getTeam_member() {
	return team_member;
}
public void setTeam_member(int team_member) {
	this.team_member = team_member;
}

public int getTotal_content() {
	return total_content;
}
public void setTotal_content(int total_content) {
	this.total_content = total_content;
}
public String getService() {
	return service;
}
public void setService(String service) {
	this.service = service;
}
public long getService_start() {
	return service_start;
}
public void setService_start(long service_start) {
	this.service_start = service_start;
}
public long getService_end() {
	return service_end;
}
public void setService_end(long service_end) {
	this.service_end = service_end;
}

public String getList_channel() {
	return list_channel;
}
public void setList_channel(String list_channel) {
	this.list_channel = list_channel;
}
public Member (int user_id,int team_id, String create_date, String industry, String company, String name, String email, int team_member, int total_content, String service, long service_start, long service_end,String list_channel){
	super();
	this.user_id= user_id;
	this.team_id= team_id;
	this.create_date= create_date;
	this.industry= industry;
	this.company= company;
	this.name=name;
	this.email=email;
	this.team_member=team_member;
	this.total_content= total_content;
	this.service= service;
	this.service_start= service_start;
	this.service_end= service_end;
	this.list_channel= list_channel;
	
	
	
}
 
}
