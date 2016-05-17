package com.andwise.signup.dao;

import java.util.ArrayList;
import com.andwise.signup.model.SignUp;

public interface SignUpDao {
	public int insertPerson(String first_name,String last_name,String password,String email,int team_role,String cell_phone,String company_name,String company_website, String company_address,String industry,long start_date, long date_exprired,int promote);
	public int updatePerson(int user_id,String first_name,String last_name,String cell_phone,String company_name,String company_website, String company_address);
    public ArrayList<SignUp> checkLogin(String email, String password);
    public void insertKeyActive(int user_id, String keyactive);
    public int updateUserActive(int user_id, String keyactive);
    public int inviteMember(String first_name,String last_name,String email,int team_id,int team_role,int group_id,int admin,String list_channel_detail,int user_id,long start_date, long date_exprire);
    public ArrayList<SignUp> getDataGroup(int user_id);
    public int updatePassword(String pass, String email);
    public  ArrayList<SignUp> getTeamMembers(int team_id);
    public void deleteMember(int user_id);
    public  ArrayList<SignUp> getProfileInfor(String email);
    public  ArrayList<SignUp> getUserInfor(int user_id);
    public int getUserId(String email);
    public int checkKey(String key_active);
    public String getkey(int user_id);
    public void updateMember(int member_id,int team_id,int team_role,String list_channel_detail,int user_id);
    
    public int changePassword(String oldpassword,String newpassword,String user_email);
}
