package com.andwise.content.dao;

import java.util.ArrayList;

import com.andwise.content.model.DraftAndSchedule;



public interface DraftAndScheduleDao 
{
	public ArrayList<DraftAndSchedule> selectTokenUser(int user_id,int msg_id,int status_id,long send_date);
	public void updateMessage(int msg_id,String content,String create_date,long send_date,int status_id,String list_send_date_schedule);
	public void deleteMessage(int msg_id);
	public ArrayList<DraftAndSchedule> selectDraftMessage(int user_id,int status_id,int administrator,int team_id);
	public ArrayList<DraftAndSchedule> selectFilterScheduleByDate(int user_id,int status_id, int administrator,long start_date, long end_date,int team_id);
	public ArrayList<DraftAndSchedule> selectFilterMessageAllByDate(int user_id,int administrator,long start_date, long end_date, int team_id);
	public ArrayList<DraftAndSchedule> selectLoadMoreDraftMessage(int user_id,int status_id,int administrator, int msg_id,int team_id);
	public void saveMessageDetail(int msg_id, String channel_detail_id,int user_id);
	public void deleteMessageDetail(int msg_id, String channel_detail_id);
	public ArrayList<DraftAndSchedule> selectFilterMessage(int user_id,String channel_detail_id,int status_id,int administrator, int team_id);
	public ArrayList<DraftAndSchedule> selectFilterMemberMessage(int user_id,String user_id_list,int status_id,int administrator, int team_id);
	public ArrayList<DraftAndSchedule> selectLoadMoreFilterMessage(int user_id,String channel_detail_id,int status_id,int administrator,int msg_id);
	public void savePhoto(int msg_id, String file_name);
	public ArrayList<DraftAndSchedule> selectAllMessage(int user_id,int administrator,int team_id);
	public ArrayList<DraftAndSchedule> selectLoadMoreAllMessage(int user_id,int administrator,int msg_id, int team_id);
	public ArrayList<DraftAndSchedule> selectFileMessageById(int msg_id);
	public void deletePhoto(int msg_id, String file_name);
	
	public  ArrayList<DraftAndSchedule> getCountMessage(int user_id,int administrator);
	public ArrayList<DraftAndSchedule> selectDraftComment(int team_id,int status_id);
	public ArrayList<DraftAndSchedule> selectDraftCommentMore(int team_id,int status_id,long time_post);
	public ArrayList<DraftAndSchedule> selectCommentFilterProfile(int team_id, int status_id, String filter_list);
	public ArrayList<DraftAndSchedule> selectFilterCommentByDate(int team_id, int status_id,long start_date, long end_date);
	public ArrayList<DraftAndSchedule> selectFilterMemberComment(int user_id,String user_id_list,int status_id,int administrator, int team_id);
	//selectFilterMemberComment
}