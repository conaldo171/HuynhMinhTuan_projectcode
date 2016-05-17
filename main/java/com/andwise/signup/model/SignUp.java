package com.andwise.signup.model;

import java.util.Date;

public class SignUp {
int user_id;
int team_id;
String payment_id;
String first_name;
String last_name;
String password;
String email;
int team_role;
String cell_phone;
String company_name;
String company_website;
String company_address;
String address;
String create_date;
///team
String team_name;
String team_leader;
String group_name;
int select_group;
int group_id;
long start_date;
long date_exprired;

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
public String getPayment_id() {
	return payment_id;
}
public void setPayment_id(String payment_id) {
	this.payment_id = payment_id;
}
public String getFirst_name() {
	return first_name;
}
public void setFirst_name(String first_name) {
	this.first_name = first_name;
}
public String getLast_name() {
	return last_name;
}
public void setLast_name(String last_name) {
	this.last_name = last_name;
}
public String getPassword() {
	return password;
}
public void setPassword(String password) {
	this.password = password;
}
public String getEmail() {
	return email;
}
public void setEmail(String email) {
	this.email = email;
}
public int getTeam_role() {
	return team_role;
}
public void setTeam_role(int team_role) {
	this.team_role = team_role;
}
public String getCell_phone() {
	return cell_phone;
}
public void setCell_phone(String cell_phone) {
	this.cell_phone = cell_phone;
}
public String getCompany_name() {
	return company_name;
}
public void setCompany_name(String company_name) {
	this.company_name = company_name;
}
public String getCompany_website() {
	return company_website;
}
public void setCompany_website(String company_website) {
	this.company_website = company_website;
}
public String getCompany_address() {
	return company_address;
}
public void setCompany_address(String company_address) {
	this.company_address = company_address;
}
public String getAddress() {
	return address;
}
public void setAddress(String address) {
	this.address = address;
}
public String getTeam_name() {
	return team_name;
}
public void setTeam_name(String team_name) {
	this.team_name = team_name;
}
public String getTeam_leader() {
	return team_leader;
}
public void setTeam_leader(String team_leader) {
	this.team_leader = team_leader;
}
public String getCreate_date() {
	return create_date;
}
public void setCreate_date(String create_date) {
	this.create_date = create_date;
}

public String getGroup_name() {
	return group_name;
}
public void setGroup_name(String group_name) {
	this.group_name = group_name;
}
public int getSelect_group() {
	return select_group;
}
public void setSelect_group(int select_group) {
	this.select_group = select_group;
}

public int getGroup_id() {
	return group_id;
}
public void setGroup_id(int group_id) {
	this.group_id = group_id;
}

public long getStart_date() {
	return start_date;
}
public void setStart_date(long start_date) {
	this.start_date = start_date;
}
public long getDate_exprired() {
	return date_exprired;
}
public void setDate_exprired(long date_exprired) {
	this.date_exprired = date_exprired;
}
public SignUp(int user_id, String first_name, String last_name,
		int team_id,String payment_id, String email, int team_role,
		String  cell_phone, String company_name,String company_website,String company_address,long start_date, long date_exprired) {
	super();
	this.user_id=user_id;
	this.first_name = first_name;
	this.last_name = last_name;
	this.team_id = team_id;
	this.payment_id = payment_id;
	this.email = email;
	this.team_role = team_role;
	this.cell_phone = cell_phone;
	this.company_name=company_name;
	this.company_website =company_website;
	this.company_address =company_address;
	this.start_date=start_date;
	this.date_exprired=date_exprired;
	
}
public SignUp(int group_id, String group_name, int select_group) {
	super();
	this.group_id=group_id;
	this.group_name=group_name;
	this.select_group = select_group;
	
	
}


  
}
