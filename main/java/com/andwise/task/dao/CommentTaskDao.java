package com.andwise.task.dao;

import java.util.ArrayList;

import com.andwise.task.model.CommentTask;


public interface CommentTaskDao {
public ArrayList<CommentTask> selectCommentByTask(String task_id,int comment_from, int user_id);
public ArrayList<CommentTask> selectNodeComment(String task_id);
public ArrayList<CommentTask> selectComentLimit1(String list_task_id);
public ArrayList<CommentTask> selectNodeCommentLimit1(String list_comment_id);
public ArrayList<CommentTask> selectCommentOfPost(int user_id, int comment_from, int status);
}
