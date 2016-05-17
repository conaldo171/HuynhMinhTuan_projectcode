package com.andwise.competitors.dao;

import java.util.ArrayList;

import com.andwise.competitors.model.Competitors;



public interface CompetitorsDao {
public int saveCompetitor(String page_name1, String page_name2,String channel_detail_id1,String channel_detail_id2, long create_date, int user_id, int type, String avatar_tw1,String avatar_tw2);
public void deleteCompetitors(int competitors_id, int user_id);
public ArrayList<Competitors> selectCompetitors(int user_id, int type);
public ArrayList<Competitors> selectFbTwCompetitors(String channel_id, long start_date,long end_date, int type);

}
