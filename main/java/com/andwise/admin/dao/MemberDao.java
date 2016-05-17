package com.andwise.admin.dao;

import java.util.ArrayList;

import com.andwise.admin.model.Member;

public interface MemberDao {
	public ArrayList<Member> selectMemberGeneral(String date_from, String date_to,String sIdx, String sOrder,String sStart, String sLimit, String where);
	public int countDataMember(String date_from, String date_to,String sWhere);
}
