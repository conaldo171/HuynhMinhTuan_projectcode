package com.andwise.admin.dao;

import java.util.ArrayList;

import com.andwise.admin.model.MemberOverview;

public interface MemberOverviewDao {
	
	public ArrayList<MemberOverview> selectUserTeammember(int team_id);
	public ArrayList<MemberOverview> selectChannelUser(int user_id);
	public ArrayList<MemberOverview> getUserInfor(int user_id);
	public void deleteChannelDetail(int user_id,String channel_detail_id);
    public void deleteMemberOverview(int user_id);//selectNumberContentAll
    public ArrayList<MemberOverview> selectNumberContentAll(int user_id);
	public ArrayList<MemberOverview> selectNumberContent(String date_from, String date_to, int user_id);
	public void updatePerson(int user_id, String company_name, long date_exprired);
}
