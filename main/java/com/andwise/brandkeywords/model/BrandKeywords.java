package com.andwise.brandkeywords.model;

public class BrandKeywords {
int keyword_id;
String brand_keyword;
int type;
long last_view;
long create_date;
int  user_id;
int select_search;
public int getKeyword_id() {
	return keyword_id;
}
public void setKeyword_id(int keyword_id) {
	this.keyword_id = keyword_id;
}
public String getBrand_keyword() {
	return brand_keyword;
}
public void setBrand_keyword(String brand_keyword) {
	this.brand_keyword = brand_keyword;
}
public int getType() {
	return type;
}
public void setType(int type) {
	this.type = type;
}
public long getLast_view() {
	return last_view;
}
public void setLast_view(long last_view) {
	this.last_view = last_view;
}
public long getCreate_date() {
	return create_date;
}
public void setCreate_date(long create_date) {
	this.create_date = create_date;
}
public int getUser_id() {
	return user_id;
}
public void setUser_id(int user_id) {
	this.user_id = user_id;
}

public int getSelect_search() {
	return select_search;
}
public void setSelect_search(int select_search) {
	this.select_search = select_search;
}
public  BrandKeywords(int keyword_id, String brand_keyword,int user_id, int type, long last_view,long create_date,int select_search ){
	super();
	this.keyword_id=keyword_id;
	this.brand_keyword=brand_keyword;
	this.user_id=user_id;
	this.type=type;
	this.last_view=last_view;
	this.create_date=create_date;
	this.select_search=select_search;
}

}
