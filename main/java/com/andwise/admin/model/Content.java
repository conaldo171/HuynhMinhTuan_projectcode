package com.andwise.admin.model;

public class Content {
	int type;
	int number;
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
	
	public String getCreate_date() {
		return create_date;
	}
	public void setCreate_date(String create_date) {
		this.create_date = create_date;
	}
	public Content(int number, int type,String create_date)
	 {
		super();
		this.number=number;
		this.type = type;
		this.create_date = create_date;

}
}
