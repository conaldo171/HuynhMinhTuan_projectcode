package com.andwise.competitors.model;

public class Competitors {
int competitors_id;
String page_name1;
String page_name2;
long create_date;
int user_id;
int type;
String channel_detail_id1;
String channel_detail_id2;
String avatar_tw1;
String avatar_tw2;

String channel_id;
int fan;
int people_talking;
int follower;
int following;


public int getCompetitors_id() {
	return competitors_id;
}
public void setCompetitors_id(int competitors_id) {
	this.competitors_id = competitors_id;
}
public String getPage_name1() {
	return page_name1;
}
public void setPage_name1(String page_name1) {
	this.page_name1 = page_name1;
}
public String getPage_name2() {
	return page_name2;
}
public void setPage_name2(String page_name2) {
	this.page_name2 = page_name2;
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
public int getType() {
	return type;
}
public void setType(int type) {
	this.type = type;
}

public String getChannel_detail_id1() {
	return channel_detail_id1;
}
public void setChannel_detail_id1(String channel_detail_id1) {
	this.channel_detail_id1 = channel_detail_id1;
}
public String getChannel_detail_id2() {
	return channel_detail_id2;
}
public void setChannel_detail_id2(String channel_detail_id2) {
	this.channel_detail_id2 = channel_detail_id2;
}

public String getAvatar_tw1() {
	return avatar_tw1;
}
public void setAvatar_tw1(String avatar_tw1) {
	this.avatar_tw1 = avatar_tw1;
}
public String getAvatar_tw2() {
	return avatar_tw2;
}
public void setAvatar_tw2(String avatar_tw2) {
	this.avatar_tw2 = avatar_tw2;
}

public String getChannel_id() {
	return channel_id;
}
public void setChannel_id(String channel_id) {
	this.channel_id = channel_id;
}
public int getFan() {
	return fan;
}
public void setFan(int fan) {
	this.fan = fan;
}
public int getPeople_talking() {
	return people_talking;
}
public void setPeople_talking(int people_talking) {
	this.people_talking = people_talking;
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
public void setFollowing(int following) {
	this.following = following;
}
public Competitors(int competitors_id, String page_name1, String page_name2,String channel_detail_id1,String channel_detail_id2, long create_date, int user_id, int type,String avatar_tw1,String avatar_tw2){
	super();
	this.competitors_id=competitors_id;
	this.page_name1=page_name1;
	this.page_name2=page_name2;
	this.channel_detail_id1=channel_detail_id1;
	this.channel_detail_id2=channel_detail_id2;
	this.create_date=create_date;
	this.user_id=user_id;
	this.type=type;
	this.avatar_tw1=avatar_tw1;
	this.avatar_tw2=avatar_tw2;
}
// using fb competitors
public Competitors(String channel_id,int fan, int people_talking,int follower,int following,long create_date){
	super();
	this.channel_id=channel_id;
	this.fan=fan;
	this.people_talking=people_talking;
	this.follower=follower;
	this.following=following;
	this.create_date=create_date;
}

}

