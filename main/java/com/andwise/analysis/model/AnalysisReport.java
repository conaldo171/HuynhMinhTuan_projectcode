package com.andwise.analysis.model;

public class AnalysisReport {
String post_id;
String channel_detail_id;
int user_id;
String content;
long create_date;
int like;
int share;
int comment;
int comment_of_like;
String link_to_post;
int friends;
int friends_of_fan;
int reach;
int reach_week;
int reach_month;
int people_talking;
int people_talking_week;
int people_talking_month;
//twitter
String in_reply_status_id;
int retweet_count;
int favorite_count;
int user_mentions;
String screen_name;
int followers;
int following;
int favourites;
public String getPost_id() {
	return post_id;
}
public void setPost_id(String post_id) {
	this.post_id = post_id;
}
public String getChannel_detail_id() {
	return channel_detail_id;
}
public void setChannel_detail_id(String channel_detail_id) {
	this.channel_detail_id = channel_detail_id;
}
public int getUser_id() {
	return user_id;
}
public void setUser_id(int user_id) {
	this.user_id = user_id;
}
public String getContent() {
	return content;
}
public void setContent(String content) {
	this.content = content;
}
public long getCreate_date() {
	return create_date;
}
public void setCreate_date(long create_date) {
	this.create_date = create_date;
}
public int getLike() {
	return like;
}
public void setLike(int like) {
	this.like = like;
}
public int getShare() {
	return share;
}
public void setShare(int share) {
	this.share = share;
}
public int getComment() {
	return comment;
}
public void setComment(int comment) {
	this.comment = comment;
}
public int getComment_of_like() {
	return comment_of_like;
}
public void setComment_of_like(int comment_of_like) {
	this.comment_of_like = comment_of_like;
}
public String getIn_reply_status_id() {
	return in_reply_status_id;
}
public void setIn_reply_status_id(String in_reply_status_id) {
	this.in_reply_status_id = in_reply_status_id;
}
public int getRetweet_count() {
	return retweet_count;
}
public void setRetweet_count(int retweet_count) {
	this.retweet_count = retweet_count;
}
public int getFavorite_count() {
	return favorite_count;
}
public void setFavorite_count(int favorite_count) {
	this.favorite_count = favorite_count;
}
public int getUser_mentions() {
	return user_mentions;
}
public void setUser_mentions(int user_mentions) {
	this.user_mentions = user_mentions;
}

public String getLink_to_post() {
	return link_to_post;
}
public void setLink_to_post(String link_to_post) {
	this.link_to_post = link_to_post;
}

public String getScreen_name() {
	return screen_name;
}
public void setScreen_name(String screen_name) {
	this.screen_name = screen_name;
}

public int getFriends() {
	return friends;
}
public void setFriends(int friends) {
	this.friends = friends;
}
public int getFriends_of_fan() {
	return friends_of_fan;
}
public void setFriends_of_fan(int friends_of_fan) {
	this.friends_of_fan = friends_of_fan;
}
public int getReach() {
	return reach;
}
public void setReach(int reach) {
	this.reach = reach;
}
public int getReach_week() {
	return reach_week;
}
public void setReach_week(int reach_week) {
	this.reach_week = reach_week;
}
public int getReach_month() {
	return reach_month;
}
public void setReach_month(int reach_month) {
	this.reach_month = reach_month;
}
public int getPeople_talking() {
	return people_talking;
}
public void setPeople_talking(int people_talking) {
	this.people_talking = people_talking;
}
public int getPeople_talking_week() {
	return people_talking_week;
}
public void setPeople_talking_week(int people_talking_week) {
	this.people_talking_week = people_talking_week;
}
public int getPeople_talking_month() {
	return people_talking_month;
}
public void setPeople_talking_month(int people_talking_month) {
	this.people_talking_month = people_talking_month;
}
public int getFollowers() {
	return followers;
}
public void setFollowers(int followers) {
	this.followers = followers;
}
public int getFollowing() {
	return following;
}
public void setFollowing(int following) {
	this.following = following;
}
public int getFavourites() {
	return favourites;
}
public void setFavourites(int favourites) {
	this.favourites = favourites;
}
//using get fbstream
public AnalysisReport(String post_id, String channel_detail_id,String content,long create_date,int like,int share, int comment, int like_of_comment,String link_to_post){
	super();
	this.post_id=post_id;
	this.channel_detail_id=channel_detail_id;
	this.content=content;
	this.create_date=create_date;
	this.like=like;
	this.share=share;
	this.comment=comment;
	this.comment_of_like=like_of_comment;
	this.link_to_post=link_to_post;
}
//using get fb sumarry
public AnalysisReport(String channel_detail_id,long create_date,int friends, int friends_of_fan, int reach, int reach_week, int reach_month, int people_talking, int people_talking_week, int people_talking_month){
	super();
	this.channel_detail_id=channel_detail_id;
	this.create_date=create_date;
	this.friends=friends;
	this.friends_of_fan=friends_of_fan;
	this.reach=reach;
	this.reach_week=reach_week;
	this.reach_month=reach_month;
	this.people_talking=people_talking;
	this.people_talking_week=people_talking_week;
	this.people_talking_month=people_talking_month;
}
//using get tw summary
public AnalysisReport(String channel_detail_id, long create_date,int followers, int following, int favourites){
	super();
	this.channel_detail_id=channel_detail_id;
	this.create_date=create_date;
	this.followers=followers;
	this.following=following;
	this.favourites=favourites;
}
// using get twstream
public AnalysisReport(String post_id, String channel_detail_id,String content, long create_date, String in_reply_status_id, int retweet_count, int favorite_count, int user_mentions,String screen_name){
	super();
	this.post_id=post_id;
	this.channel_detail_id=channel_detail_id;
	this.content=content;
	this.create_date=create_date;
	this.in_reply_status_id=in_reply_status_id;
	this.retweet_count=retweet_count;
	this.favorite_count=favorite_count;
	this.user_mentions=user_mentions;
	this.screen_name=screen_name;
	
}
}
