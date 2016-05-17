/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.andwise.common;

import javax.servlet.ServletContext;
import com.andwise.common.MailOperator;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.*;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;



public class Messages {
	
    private ServletContext  servletContext ;
	
	
	public Messages(ServletContext servletContext) {
		super();
		this.servletContext = servletContext;
	}
	public void processSend(int user_id, String firstname, String lastname, int iType, String email, String sKey, String contextpath,String user_name,String contentemail,String titleemail) {
    	ConfigTable cfTable = ConfigFactory.getInstance();
        try {
            int actionType = iType;
            String content = "";
            String server_address=cfTable.getValue("server_address");
            String path =server_address+"enpick/ActiveUser.do?id=";
            switch (actionType) {
                case 1:
                	path = path + user_id + "&token=" + sKey+ "&email=" + email;
                    content = contentemail.replace("key_email", email);
                    content=content.replace("contentemailsignup", path);
                   // content += "<p>Account Information";
                   // content += "<br>Email: "+email;
                   // content += "<p>Click link below to complete your registration on Enpick.com.</p>";
                   // content += "<p><a href="+path+">"+path+"</a></p>";
                   // content += "<p>Regards<br>Enpick.com</p>";
                    sendEmail(email, titleemail, content);
                    break;
                case 2:
                 path = path + user_id + "&token=" + sKey+ "&email=" + email+"&action=invite";
               // content += "<p>Hi "+firstname+ " "+ lastname;
               // content += "<p>Congratulations! "+user_name+" has added you to your company's Enpick Social account";
               // content += "<p>Enpick is a leading social media management and engagement platform built specifically for team collaboration and businesses like yours.";
               // content += "<p>Click link below to start using your new account on Enpick.com.</p>";
               //content += "<p><a href="+path+">"+path+"</a></p>";
               // content += "<p>Regards<br>Enpick.com</p>";
                 content = contentemail.replace("firstname", firstname);
                 content = content.replace("lastname", lastname);
                 content = content.replace("user_name", user_name);
                 content = content.replace("contentemailinvite", path);
                sendEmail(email, user_name+" "+titleemail, content);
                    break;
                case 3://send one comments
                	 path = path + user_id + "&token=" + sKey+ "&email=" + email+"&action=reset";
                    // content += "<p text='contentfogotpass'>Forgot your Enpick Social password? No worries! Just visit the link below and we'll get you running in no time.</p> ";
                     //content += "<p><a href="+path+">Reset Password</a></p>";
                     //content += "<p>Regards<br>Enpick.com</p>";
                	 content = contentemail.replace("contentemailresetpass",path);
                     sendEmail(email, titleemail, content);

                    break;
                case 4:
                    
                    //sendEmail(email, "The Place Order In Progress", contentnotconfirm);
                default:
                    break;
            }
        } catch (Exception ex) {
            Logger.getLogger(Messages.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
	
	public void processSendTask(int user_id,String objSend){
		try{
			JSONObject obj=null;
			obj = new JSONObject(objSend);
			//ImplTask task= new ImplTask();
			String task_id=obj.getString("task_id");
			String title_email=obj.getString("title_content_email");
			String email=obj.getString("list_email_assign");
			String task_name=obj.getString("task_name");
			String creator= obj.getString("creator");
			String list_name = obj.getString("list_name_assign");
			String list_user_id= obj.getString("list_assign_user_id");
			String list_email_send=obj.getString("list_email_send");
			String str_emai[]=email.replace("'","").split(",");
			String str_name[]=list_name.replace("'","").split(",");
			String str_user_id[]=list_user_id.replace("'","").split(",");
			String str_emai_send[]=list_email_send.replace("'","").split(",");
			if(!email.equals("")){
				for(int i=0;i<str_emai.length;i++){
					String content = "";
					if(Integer.parseInt(str_user_id[i])!=user_id){
						content+= "<p>"+creator+" has assigned "+str_name[i]+" the following task</p>";
						content+="<br>Task: "+task_name;
						sendEmail(str_emai[i],title_email, content);
					}
					
				}	
			}
			else{
				String task_history =obj.getString("task_history");
					for (int i = 0; i < str_emai_send.length ; i++) {
						String content = "";
						content+= "<p><strong>"+creator+" has update task: "+task_name+"</strong></p>";
						content+="<strong><br>"+task_history+"</strong>";
						sendEmail(str_emai_send[i],title_email, content);
						}
			}
 
		}
		catch(Exception e){
			
		}
		
	}
    public void sendEmail(String sTo, String sSubject, String sContent) {
        //String Subject = sSubject;
        //TMEClass.MyEmail.SendMail sm = new SendMail();
        //sm.SendEmailInfor(sTo, Subject, sContent);
    	//ApplicationContext appContext =  ApplicationContextProvider.getGlobalContext(this.getServletContext());
    	 //ApplicationContext appContext = (MailOperator)WebApplicationContextUtils.getRequiredWebApplicationContext(servletContext).getBean("mailService");
    	
    	 MailOperator mailService=(MailOperator)WebApplicationContextUtils.getWebApplicationContext(servletContext).getBean("mailService");
        String subject = sSubject.replaceAll("<b>", "");
        subject = subject.replaceAll("</b>", "");
        mailService.sendMail(subject, sContent, sTo);
    }

   

   

    

    

    

    

  

    
   
}
