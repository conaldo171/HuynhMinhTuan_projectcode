package com.andwise.brandkeywords.dao;

import java.util.ArrayList;

import com.andwise.brandkeywords.model.BrandKeywords;



public interface BrandKeywordsDao {
 public int saveBrandKeyword( String brand_keyword,int user_id,int type, long last_view, long create_date );
 public void updateBrandKeyword(int keyword_id, String brand_keyword, int user_id, int type, long last_view, long create_date);
 public void updateBrandKeywordSearch(int keyword_id, int select_search);
 public void updateLastTimeBrandKeywordSearch(int keyword_id, long time_view);
 public void deleteBrandKeyword(int keyword_id, int user_id);
 public ArrayList<BrandKeywords> selectBrandKeyword(int user_id);
}
