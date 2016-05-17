package com.andwise.admin.dao;

import java.util.ArrayList;

import com.andwise.admin.model.Content;

public interface ContentDao {
	public ArrayList<Content> selectContentByChannel(String date_from, String date_to, int channel_id);
	public ArrayList<Content> selectContentByType (String date_from, String date_to);
}
