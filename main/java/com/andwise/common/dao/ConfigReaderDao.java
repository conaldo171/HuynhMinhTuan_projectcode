package com.andwise.common.dao;

import java.util.ArrayList;

import com.andwise.common.model.ConfigItem;

public interface ConfigReaderDao {
	
	public ArrayList<ConfigItem> getKeyValueConfig(String key);

}
