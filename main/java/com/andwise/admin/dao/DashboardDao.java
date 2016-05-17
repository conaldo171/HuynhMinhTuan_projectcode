package com.andwise.admin.dao;

import java.util.ArrayList;

import com.andwise.admin.model.Dashboard;


public interface DashboardDao {
	public ArrayList<Dashboard> selectMemberType(String date_from, String date_to);
	public ArrayList<Dashboard> selectMemberIndustry(String date_from, String date_to);
	
	
}
