package com.andwise.admin.model;

public class MemberOverview {
int no;
int user_id;
String channel_user;
int type;
String create_date;
String email ;
String name;
String division;

String token_user;
String channel_picture;
String channel_detail_id; 
String last_view;
int status_id;
String pchannel_id;
int number;
String cell_phone;
String industry;
String address_company;
String website;
String company;
long date_start;
long date_expired;
public int getNo() {
	return no;
}
public void setNo(int no) {
	this.no = no;
}
public String getChannel_user() {
	return channel_user;
}
public void setChannel_user(String channel_user) {
	this.channel_user = channel_user;
}

public int getType() {
	return type;
}
public void setType(int type) {
	this.type = type;
}

public int getUser_id() {
	return user_id;
}
public void setUser_id(int user_id) {
	this.user_id = user_id;
}
public String getCreate_date() {
	return create_date;
}
public void setCreate_date(String create_date) {
	this.create_date = create_date;
}
public String getEmail() {
	return email;
}
public void setEmail(String email) {
	this.email = email;
}

public String getName() {
	return name;
}
public void setName(String name) {
	this.name = name;
}
public String getDivision() {
	return division;
}
public void setDivision(String division) {
	this.division = division;
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

public String getChannel_detail_id() {
	return channel_detail_id;
}
public void setChannel_detail_id(String channel_detail_id) {
	this.channel_detail_id = channel_detail_id;
}

public String getLast_view() {
	return last_view;
}
public void setLast_view(String last_view) {
	this.last_view = last_view;
}

public int getStatus_id() {
	return status_id;
}
public void setStatus_id(int status_id) {
	this.status_id = status_id;
}

public int getNumber() {
	return number;
}
public void setNumber(int number) {
	this.number = number;
}

public String getPchannel_id() {
	return pchannel_id;
}
public void setPchannel_id(String pchannel_id) {
	this.pchannel_id = pchannel_id;
}

public String getCell_phone() {
	return cell_phone;
}
public void setCell_phone(String cell_phone) {
	this.cell_phone = cell_phone;
}
public String getIndustry() {
	return industry;
}
public void setIndustry(String industry) {
	this.industry = industry;
}
public String getAddress_company() {
	return address_company;
}
public void setAddress_company(String address_company) {
	this.address_company = address_company;
}
public String getWebsite() {
	return website;
}
public void setWebsite(String website) {
	this.website = website;
}
public String getCompany() {
	return company;
}
public void setCompany(String company) {
	this.company = company;
}

public long getDate_start() {
	return date_start;
}
public void setDate_start(long date_start) {
	this.date_start = date_start;
}
public long getDate_expired() {
	return date_expired;
}
public void setDate_expired(long date_expired) {
	this.date_expired = date_expired;
}
public MemberOverview( String create_date,String name,String cell_phone, String industry,String address_company,String email, String website, String company,long date_start, long date_expired){
	super();
	this.create_date=create_date;
	this.name=name;
	this.cell_phone= cell_phone;
	this.industry=industry;
	this.address_company=address_company;
	this.email=email;
	this.website= website;
	this.company=company;
	this.date_start=date_start;
	this.date_expired=date_expired;
	
}
public MemberOverview( int number,int status_id,String channel_user, int type,String channel_detail_id){
	super();
	this.number=number;
	this.status_id=status_id;
	this.channel_user= channel_user;
	this.type=type;
	this.channel_detail_id=channel_detail_id;
}
public MemberOverview( int type,String channel_user, String create_date){
	super();
	this.type=type;
	this.channel_user=channel_user;
	this.create_date= create_date;
}
public MemberOverview(int user_id, int type,String channel_user, String create_date,String token_user, String channel_detail_id,String last_view,String pchannel_id,String channel_picture){
	super();
	this.user_id=user_id;
	this.type=type;
	this.channel_user=channel_user;
	this.create_date= create_date;
	this.token_user= token_user;
	this.channel_detail_id=channel_detail_id;
	this.last_view=last_view;
	this.pchannel_id=pchannel_id;
	this.channel_picture=channel_picture;
}
public MemberOverview(int user_id,String division ,String name,String email, String create_date){
	super();
	this.user_id=user_id;
	this.division=division;
	this.name=name;
	this.email=email;
	this.create_date= create_date;
}
}
