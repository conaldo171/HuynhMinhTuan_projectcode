package com.andwise.task.dao;

import java.util.ArrayList;

import com.andwise.task.model.Task;

public interface TaskDao {
public int saveTask(String task_id, String task_name,String profile_name,int user_id,long create_date,long create_at, String task_avatar,int type_social,int status,int priority,int tracker,String message_comment,String list_assign_user,String task_history);
public ArrayList<Task> selectTaskListType(int user_id,int tracker, int status, int type);
public ArrayList<Task> selectTaskAssign(String task_id);
public ArrayList<Task> updateTask(String comment_content,long create_date,String task_id,int user_id,int status,int priority,int task_type,String list_assign_user, String list_remove_assign_user,String list_email_assign,String list_name_assign);

}
