package com.andwise.admin.model;

public class Dashboard {
	int type;
	int number;
	String industry;
	int status_id;
	String create_date;
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public int getNumber() {
		return number;
	}
	public void setNumber(int number) {
		this.number = number;
	}
	public String getIndustry() {
		return industry;
	}
	public void setIndustry(String industry) {
		this.industry = industry;
	}
	public int getStatus_id() {
		return status_id;
	}
	public void setStatus_id(int status_id) {
		this.status_id = status_id;
	}
	
	public String getCreate_date() {
		return create_date;
	}
	public void setCreate_date(String create_date) {
		this.create_date = create_date;
	}
	public Dashboard(int number, int type,String create_date)
			 {
		super();
		this.number=number;
		this.type = type;
		this.create_date = create_date;
		
	}
	public Dashboard(int number,String industry,String create_date )
	 {
		super();
		this.number=number;
		this.industry = industry;
		this.create_date = create_date;

}

}
