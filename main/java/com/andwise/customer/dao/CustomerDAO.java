package com.andwise.customer.dao;

import java.util.ArrayList;

import com.andwise.customer.model.Customer;

public interface CustomerDAO 
{
	public void insert(Customer customer);
	public Customer findByCustomerId(int custId);
	public int deleteByCustomerId(int custId);
	public ArrayList<Customer> getAll();
	
}




