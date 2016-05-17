package com.andwise.analysis.dao;

import java.util.ArrayList;

import com.andwise.analysis.model.AnalysisReport;

public interface AnalysisReportDao {
	public ArrayList<AnalysisReport> selectFbStream(String channel_detail_id, long start_date, long end_date);
	public ArrayList<AnalysisReport> selectTwStream(String channel_detail_id, long start_date, long end_date);
	public ArrayList<AnalysisReport> selectTwReport(String channel_detail_id, long start_date, long end_date);
	public ArrayList<AnalysisReport> selectFbReport(String channel_detail_id, long start_date, long end_date);
}
