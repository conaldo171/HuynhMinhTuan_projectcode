package com.andwise.content.dao;
public interface CreateDao {
	public int saveDraftMessage(String create_date,String content,int status_id,long send_date,int user_id,int team_role);
	public int saveMessage(String create_date,String content,int status_id,long send_date,int user_id,String list_send_schedule,int administrator);
	public int saveSchedule(int msg_id,long send_date);
	public void updateChannel(int select_post,String channel_detail_id,int user_id, int administrator);
	public void updateChannelDefault(int default_show,String channel_detail_id,int user_id, int administrator);
	public int saveDraftFromSchedule(String create_date,String content,int status_id,long send_date,int user_id,int team_role,String list_channel_detail_id);
	public int saveMessageSendFromSchedule(String create_date,String content,int status_id,long send_date,int user_id,String list_channel_detail);
	public void insertFollow(String channel_detail_id,String token_access,int user_id,long create_date,String type);
	public void insertFriendsFacebook(String channel_detail_id,int friends_number,int frienfoffan, int user_id,long create_date,String type);
	public void updateChannelDefaultComment(int default_comment,String channel_detail_id,int user_id, int administrator,int channel_id);
    public int insertContentFromExcel(int user_id, String create_date,int status,long send_date, String list_content_public,String list_channel_detail, String list_image, int team_role );
    public int inserContentFromExcelToSchedule(int user_id, String create_date, int status, long send_date,String list_content_public,String list_channel_detail, String list_image,String list_date_schedule, int team_role );
    public String inserPostOfComment(String list_post_id,String list_content_public, long create_date, int user_id, String list_channel_detail,String list_comment_public,int status_id);
    public String inserCommentFromExcelToSchedule(String list_post_id,String list_content_public, long create_date, int user_id, String list_channel_detail,String list_comment_public,String list_send_date,int status_id);
    public String updateCommentSent(int comment_id, int user_id, String channel_detail_id, long create_date, int status, int channel_id);
    public String insertCommentFromsch(String comment_content,String task_id, int user_id, String channel_detail_id, long create_date, int status, int channel_id);
    public void deleteComment(int comment_id);
   public void updateCommentDraft(int comment_id, String message, int user_id);
   public void updateCommentSchedule(int comment_id, String message,String list_send_date, int user_id);
}
