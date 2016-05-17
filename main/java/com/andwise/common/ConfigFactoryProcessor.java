package com.andwise.common;

import org.springframework.beans.factory.InitializingBean;

public class ConfigFactoryProcessor implements InitializingBean {
	 private ConfigTable cftable;

	    public void setCftable(ConfigTable cftable) {
	        this.cftable = cftable;
	    }

	    public void afterPropertiesSet() throws Exception {
	        ConfigFactory.setKey(cftable);
	    }
}
