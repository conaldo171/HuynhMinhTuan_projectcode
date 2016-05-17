package com.andwise.common;

public class ExportExcel {
int no;
int fan; 
int new_fan;
int friend_of_fan;
int reach;
int people_talking;
float engagement;
String engagement_rate;
float activity;
float brand_royalty;
int content;
int like;
int share;
int comment;
int like_of_comment;
String date;
String account;
String spread;
String title;
byte [] image_summary;
//using export chart
String engagement_title;
String engagement_rate_title;
String activity_title;
String brand_royalty_title;
String totals;
String new_sumary;
String growth;
int total_value;
int total_fan_value;
String growth_fan_value;
int new_fan_value;
int total_reach_value;
String growth_reach_value;
int new_reach_value;
int total_peopletalking_value;
String growth_peopletalking_value;
int new_peopletalking_value;
String total_peopletalking_fan_value;
String growth_peopletalking_fan_value;
String new_peopletalking_fan_value;
int total_content_value;
String growth_contents_value;
int new_content_value;
int total_like_value;
String growth_like_value;
int new_like_value;
int total_share_value;
String growth_share_value;
int new_share_value;
int total_comment_value;
String growth_comment_value;
int new_comment_value;
int total_comment_like_value;
String growth_comment_like_value;
int new_comment_like_value;
int new_value;
String growth_value;
String new_conten;
String engagement_value;
String engagement_rate_value;
float activity_value;
String brand_royalty_value;
int women_value;
int men_value;
int u20_value;
int u30_value;
int u40_value;
int u50_value;
int u60_value;
int u70_value;
int married_value;
int single_value;
int highschool_value;
int college_value;
String page_id;
String page_name;
String message="";
String post_id="";
public int getNo() {
	return no;
}
public void setNo(int no) {
	this.no = no;
}
public int getFan() {
	return fan;
}
public void setFan(int fan) {
	this.fan = fan;
}
public int getNew_fan() {
	return new_fan;
}
public void setNew_fan(int new_fan) {
	this.new_fan = new_fan;
}
public int getFriend_of_fan() {
	return friend_of_fan;
}
public void setFriend_of_fan(int friend_of_fan) {
	this.friend_of_fan = friend_of_fan;
}
public int getReach() {
	return reach;
}
public void setReach(int reach) {
	this.reach = reach;
}
public int getPeople_talking() {
	return people_talking;
}
public void setPeople_talking(int people_talking) {
	this.people_talking = people_talking;
}
public float getEngagement() {
	return engagement;
}
public void setEngagement(float engagement) {
	this.engagement = engagement;
}
public String getEngagement_rate() {
	return engagement_rate;
}
public void setEngagement_rate(String engagement_rate) {
	this.engagement_rate = engagement_rate;
}
public float getActivity() {
	return activity;
}
public void setActivity(float activity) {
	this.activity = activity;
}
public float getBrand_royalty() {
	return brand_royalty;
}
public void setBrand_royalty(float brand_royalty) {
	this.brand_royalty = brand_royalty;
}
public int getContent() {
	return content;
}
public void setContent(int content) {
	this.content = content;
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
public int getLike_of_comment() {
	return like_of_comment;
}
public void setLike_of_comment(int like_of_comment) {
	this.like_of_comment = like_of_comment;
}
public String getDate() {
	return date;
}
public void setDate(String date) {
	this.date = date;
}
public String getAccount() {
	return account;
}
public void setAccount(String account) {
	this.account = account;
}
public String getSpread() {
	return spread;
}
public void setSpread(String spread) {
	this.spread = spread;
}
public String getTitle() {
	return title;
}
public void setTitle(String title) {
	this.title = title;
}

public int getWomen_value() {
	return women_value;
}
public void setWomen_value(int women_value) {
	this.women_value = women_value;
}
public int getMen_value() {
	return men_value;
}
public void setMen_value(int men_value) {
	this.men_value = men_value;
}
public int getU20_value() {
	return u20_value;
}
public void setU20_value(int u20_value) {
	this.u20_value = u20_value;
}
public int getU30_value() {
	return u30_value;
}
public void setU30_value(int u30_value) {
	this.u30_value = u30_value;
}
public int getU40_value() {
	return u40_value;
}
public void setU40_value(int u40_value) {
	this.u40_value = u40_value;
}
public int getU50_value() {
	return u50_value;
}
public void setU50_value(int u50_value) {
	this.u50_value = u50_value;
}
public int getU60_value() {
	return u60_value;
}
public void setU60_value(int u60_value) {
	this.u60_value = u60_value;
}
public int getU70_value() {
	return u70_value;
}
public void setU70_value(int u70_value) {
	this.u70_value = u70_value;
}
public int getMarried_value() {
	return married_value;
}
public void setMarried_value(int married_value) {
	this.married_value = married_value;
}
public int getSingle_value() {
	return single_value;
}
public void setSingle_value(int single_value) {
	this.single_value = single_value;
}
public int getHighschool_value() {
	return highschool_value;
}
public void setHighschool_value(int highschool_value) {
	this.highschool_value = highschool_value;
}
public int getCollege_value() {
	return college_value;
}
public void setCollege_value(int college_value) {
	this.college_value = college_value;
}
public byte[] getImage_summary() {
	return image_summary;
}
public void setImage_summary(byte[] image_summary) {
	this.image_summary = image_summary;
}
// using export chart
public String getTotals() {
	return totals;
}
public void setTotals(String totals) {
	this.totals = totals;
}
public String getNew_sumary() {
	return new_sumary;
}
public void setNew_sumary(String new_sumary) {
	this.new_sumary = new_sumary;
}
public String getGrowth() {
	return growth;
}
public void setGrowth(String growth) {
	this.growth = growth;
}
public int getTotal_value() {
	return total_value;
}
public void setTotal_value(int total_value) {
	this.total_value = total_value;
}
public int getNew_value() {
	return new_value;
}
public void setNew_value(int new_value) {
	this.new_value = new_value;
}
public String getGrowth_value() {
	return growth_value;
}
public void setGrowth_value(String growth_value) {
	this.growth_value = growth_value;
}

public String getEngagement_title() {
	return engagement_title;
}
public void setEngagement_title(String engagement_title) {
	this.engagement_title = engagement_title;
}
public String getEngagement_rate_title() {
	return engagement_rate_title;
}
public void setEngagement_rate_title(String engagement_rate_title) {
	this.engagement_rate_title = engagement_rate_title;
}
public String getActivity_title() {
	return activity_title;
}
public void setActivity_title(String activity_title) {
	this.activity_title = activity_title;
}
public String getBrand_royalty_title() {
	return brand_royalty_title;
}
public void setBrand_royalty_title(String brand_royalty_title) {
	this.brand_royalty_title = brand_royalty_title;
}
public String getNew_conten() {
	return new_conten;
}
public void setNew_conten(String new_conten) {
	this.new_conten = new_conten;
}
public String getEngagement_value() {
	return engagement_value;
}
public void setEngagement_value(String engagement_value) {
	this.engagement_value = engagement_value;
}
public String getEngagement_rate_value() {
	return engagement_rate_value;
}
public void setEngagement_rate_value(String engagement_rate_value) {
	this.engagement_rate_value = engagement_rate_value;
}
public float getActivity_value() {
	return activity_value;
}
public void setActivity_value(float activity_value) {
	this.activity_value = activity_value;
}
public String getBrand_royalty_value() {
	return brand_royalty_value;
}
public void setBrand_royalty_value(String brand_royalty_value) {
	this.brand_royalty_value = brand_royalty_value;
}
/// export chart

public int getTotal_fan_value() {
	return total_fan_value;
}
public void setTotal_fan_value(int total_fan_value) {
	this.total_fan_value = total_fan_value;
}
public String getGrowth_fan_value() {
	return growth_fan_value;
}
public void setGrowth_fan_value(String growth_fan_value) {
	this.growth_fan_value = growth_fan_value;
}
public int getNew_fan_value() {
	return new_fan_value;
}
public void setNew_fan_value(int new_fan_value) {
	this.new_fan_value = new_fan_value;
}
public int getTotal_reach_value() {
	return total_reach_value;
}
public void setTotal_reach_value(int total_reach_value) {
	this.total_reach_value = total_reach_value;
}
public String getGrowth_reach_value() {
	return growth_reach_value;
}
public void setGrowth_reach_value(String growth_reach_value) {
	this.growth_reach_value = growth_reach_value;
}
public int getNew_reach_value() {
	return new_reach_value;
}
public void setNew_reach_value(int new_reach_value) {
	this.new_reach_value = new_reach_value;
}
public int getTotal_peopletalking_value() {
	return total_peopletalking_value;
}
public void setTotal_peopletalking_value(int total_peopletalking_value) {
	this.total_peopletalking_value = total_peopletalking_value;
}
public String getGrowth_peopletalking_value() {
	return growth_peopletalking_value;
}
public void setGrowth_peopletalking_value(String growth_peopletalking_value) {
	this.growth_peopletalking_value = growth_peopletalking_value;
}
public int getNew_peopletalking_value() {
	return new_peopletalking_value;
}
public void setNew_peopletalking_value(int new_peopletalking_value) {
	this.new_peopletalking_value = new_peopletalking_value;
}
public String getTotal_peopletalking_fan_value() {
	return total_peopletalking_fan_value;
}
public void setTotal_peopletalking_fan_value(
		String total_peopletalking_fan_value) {
	this.total_peopletalking_fan_value = total_peopletalking_fan_value;
}
public String getGrowth_peopletalking_fan_value() {
	return growth_peopletalking_fan_value;
}
public void setGrowth_peopletalking_fan_value(
		String growth_peopletalking_fan_value) {
	this.growth_peopletalking_fan_value = growth_peopletalking_fan_value;
}
public String getNew_peopletalking_fan_value() {
	return new_peopletalking_fan_value;
}
public void setNew_peopletalking_fan_value(String new_peopletalking_fan_value) {
	this.new_peopletalking_fan_value = new_peopletalking_fan_value;
}
public int getTotal_content_value() {
	return total_content_value;
}
public void setTotal_content_value(int total_content_value) {
	this.total_content_value = total_content_value;
}
public String getGrowth_contents_value() {
	return growth_contents_value;
}
public void setGrowth_contents_value(String growth_contents_value) {
	this.growth_contents_value = growth_contents_value;
}
public int getNew_content_value() {
	return new_content_value;
}
public void setNew_content_value(int new_content_value) {
	this.new_content_value = new_content_value;
}
public int getTotal_like_value() {
	return total_like_value;
}
public void setTotal_like_value(int total_like_value) {
	this.total_like_value = total_like_value;
}
public String getGrowth_like_value() {
	return growth_like_value;
}
public void setGrowth_like_value(String growth_like_value) {
	this.growth_like_value = growth_like_value;
}
public int getNew_like_value() {
	return new_like_value;
}
public void setNew_like_value(int new_like_value) {
	this.new_like_value = new_like_value;
}
public int getTotal_share_value() {
	return total_share_value;
}
public void setTotal_share_value(int total_share_value) {
	this.total_share_value = total_share_value;
}
public String getGrowth_share_value() {
	return growth_share_value;
}
public void setGrowth_share_value(String growth_share_value) {
	this.growth_share_value = growth_share_value;
}
public int getNew_share_value() {
	return new_share_value;
}
public void setNew_share_value(int new_share_value) {
	this.new_share_value = new_share_value;
}
public int getTotal_comment_value() {
	return total_comment_value;
}
public void setTotal_comment_value(int total_comment_value) {
	this.total_comment_value = total_comment_value;
}
public String getGrowth_comment_value() {
	return growth_comment_value;
}
public void setGrowth_comment_value(String growth_comment_value) {
	this.growth_comment_value = growth_comment_value;
}
public int getNew_comment_value() {
	return new_comment_value;
}
public void setNew_comment_value(int new_comment_value) {
	this.new_comment_value = new_comment_value;
}
public int getTotal_comment_like_value() {
	return total_comment_like_value;
}
public void setTotal_comment_like_value(int total_comment_like_value) {
	this.total_comment_like_value = total_comment_like_value;
}
public String getGrowth_comment_like_value() {
	return growth_comment_like_value;
}
public void setGrowth_comment_like_value(String growth_comment_like_value) {
	this.growth_comment_like_value = growth_comment_like_value;
}
public int getNew_comment_like_value() {
	return new_comment_like_value;
}
public void setNew_comment_like_value(int new_comment_like_value) {
	this.new_comment_like_value = new_comment_like_value;
}

public String getPage_id() {
	return page_id;
}
public void setPage_id(String page_id) {
	this.page_id = page_id;
}
public String getPage_name() {
	return page_name;
}
public void setPage_name(String page_name) {
	this.page_name = page_name;
}

public String getMessage() {
	return message;
}
public void setMessage(String message) {
	this.message = message;
}
public String getPost_id() {
	return post_id;
}
public void setPost_id(String post_id) {
	this.post_id = post_id;
}
public ExportExcel( int total_fan_value, String growth_fan_value,  int new_fan_value, int total_reach_value,String growth_reach_value, int new_reach_value,int total_peopletalking_value,String growth_peopletalking_value, int new_peopletalking_value,String total_peopletalking_fan_value,String growth_peopletalking_fan_value,String new_peopletalking_fan_value,int total_content_value,String growth_contents_value,int new_content_value,int total_like_value,String growth_like_value,int new_like_value,int total_share_value, String growth_share_value, int new_share_value, int total_comment_value, String growth_comment_value,int new_comment_value,int total_comment_like_value,String growth_comment_like_value,int new_comment_like_value){
	super();
 this.total_fan_value=total_fan_value;
 this.growth_fan_value=growth_fan_value;
 this.new_fan_value=new_fan_value;
 this.total_reach_value=total_reach_value;
 this.growth_reach_value=growth_reach_value;
 this.new_reach_value=new_reach_value;
 this.total_peopletalking_value=total_peopletalking_value;
 this.growth_peopletalking_value=growth_peopletalking_value;
 this.new_peopletalking_value=new_peopletalking_value;
 this.total_peopletalking_fan_value=total_peopletalking_fan_value;
 this.growth_peopletalking_fan_value=growth_peopletalking_fan_value;
 this.new_peopletalking_fan_value=new_peopletalking_fan_value;
 this.total_content_value=total_content_value;
 this.growth_contents_value=growth_contents_value;
 this.new_content_value=new_content_value;
 this.total_like_value=total_like_value;
 this.growth_like_value=growth_like_value;
 this.growth_like_value=growth_like_value;
 this.new_like_value=new_like_value;
 this.total_share_value=total_share_value;
 this.growth_share_value=growth_share_value;
 this.new_share_value=new_share_value;
 this.total_comment_like_value=total_comment_like_value;
 this.growth_peopletalking_fan_value=growth_peopletalking_fan_value;
 this.new_peopletalking_fan_value=new_peopletalking_fan_value;
  
	
}

public ExportExcel( String date, int no, int fan, int new_fan,int friend_of_fan,int reach,int people_talking,float engagement,String engagement_rate, float activity, float brand_royalty, int content, int like, int share,int comment,int like_of_comment){
	super();
	this.date=date;
	this.no=no; 
	this.fan=fan;
	this.new_fan=new_fan;
	this.friend_of_fan= friend_of_fan;
	this.reach=reach;
	this.people_talking=people_talking;
	this.engagement=engagement;
	this.engagement_rate=engagement_rate;
	this.activity=activity;
	this.brand_royalty=brand_royalty;
	this.content=content;
	this.like=like;
	this.share=share;
	this.comment=comment;
	this.like_of_comment=like_of_comment;
	
}

public ExportExcel( int no, String title,int reach,int like, int share,int comment,int like_of_comment){
	super();
	this.no=no; 
	this.title=title;
	this.reach=reach;
	this.like=like;
	this.share=share;
	this.comment=comment;
	this.like_of_comment=like_of_comment;
	
}
public ExportExcel( String totals, String  new_summary, String growth,int total_value,int new_value,String growth_value){
	super();
	this.totals=totals;
	this.new_sumary=new_summary; 
	this.growth=growth;
	this.total_value=total_value;
	this.new_value=new_value;
	this.growth_value=growth_value;
		
}

public ExportExcel( String engagement_title, String  engagement_rate_title, String activity_title,String brand_royalty_title,String engagement_value,String engagement_rate_value,float activity_value,String brand_royalty_value){
	super();
	this.engagement_title=engagement_title;
	this.engagement_rate_title=engagement_rate_title; 
	this.activity_title=activity_title;
	this.brand_royalty_title=brand_royalty_title;
	this.engagement_value=engagement_value;
	this.engagement_rate_value=engagement_rate_value;
	this.activity_value=activity_value;
	this.brand_royalty_value=brand_royalty_value;
		
}
public ExportExcel( String date, int no,String account,String spread,float brand_royalty){
	super();
	this.date=date;
	this.no=no; 
	this.account=account;
	this.spread=spread;
	this.brand_royalty=brand_royalty;
	
	
}
public ExportExcel( String date){
	super();
	this.date=date;

}
public ExportExcel( byte[] image_summary){
	super();
	this.image_summary=image_summary;

}
public ExportExcel( int women_value,int men_value, int u20_value, int u30_value, int u40_value, int u50_value, int u60_value, int u70_value){
	super();
	this.women_value=women_value;
	this.men_value=men_value;
	this.u20_value=u20_value;
	this.u30_value=u30_value;
	this.u40_value=u40_value;
	this.u50_value=u50_value;
	this.u60_value=u60_value;
	this.u70_value=u70_value;
}
public ExportExcel( int women_value,int men_value, int u20_value, int u30_value, int u40_value, int u50_value, int u60_value, int u70_value, int married_value, int single_value, int highschool_value, int college_value){
	super();
	this.women_value=women_value;
	this.men_value=men_value;
	this.u20_value=u20_value;
	this.u30_value=u30_value;
	this.u40_value=u40_value;
	this.u50_value=u50_value;
	this.u60_value=u60_value;
	this.u70_value=u70_value;
	this.married_value=married_value;
	this.single_value=single_value;
	this.highschool_value=highschool_value;
	this.college_value=college_value;
}
public ExportExcel(int no, String page_id, String page_name){
	super();
	this.no=no;
	this.page_id=page_id;
	this.page_name=page_name;
}
public ExportExcel(int no, String page_id, String page_name,String message, String post_id){
	super();
	this.no=no;
	this.page_id=page_id;
	this.page_name=page_name;
	this.message=message;
	this.post_id=post_id;
}
}
