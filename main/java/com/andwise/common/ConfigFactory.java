package com.andwise.common;

public class ConfigFactory {
	private static ConfigTable cftable;

    public static ConfigTable getInstance() {
        if (cftable == null) throw new IllegalStateException();
        return cftable;
    }
    public static void setKey(ConfigTable cftable){
    	ConfigFactory.cftable=cftable;
    	
    }
}
