package com.andwise.email;
import java.util.*;
import java.io.*;
import javax.mail.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import javax.mail.MessagingException;
import javax.mail.internet.*;
import javax.naming.Context;
import javax.naming.InitialContext;

public class SendMail {

    public static void sendMail(String smtpHost, final String username, final String password, String sender, String[] recipients, String subject, String body) {
        try {

            SMTPAuthenticator auth = new SMTPAuthenticator(username, password);
            Properties properties = new Properties();
            properties.put("mail.smtp.host", smtpHost);
            properties.put("mail.smtp.auth", "true");
            properties.put("mail.smtp.port", "587");
            properties.put("mail.smtp.starttls.enable", "false");
            properties.put("mail.smtp.socketFactory.port", "587");
            //properties.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
            properties.put("mail.smtp.socketFactory.fallback", "false");
            //Replace by Thong Nguyen 2010-06-07
            //Session session = Session.getDefaultInstance(properties,auth);
            Session session = Session.getInstance(properties, auth);
            //End Replace

            Message msg = new MimeMessage(session);
            msg.setFrom(new InternetAddress(sender));

            //msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipients, false));
            InternetAddress[] receivers = new InternetAddress[recipients.length];
            for (int i = 0; i < recipients.length; i++) {
                receivers[i] = new InternetAddress(recipients[i]);
            }
            msg.setRecipients(Message.RecipientType.TO, receivers);

            msg.setSubject(subject);
            msg.setText(body);
            msg.setHeader("Test", "Test");
            Transport.send(msg);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public boolean sendMailCheck(String smtpHost, final String username, final String password, String sender, String[] recipients, String subject, String body) {
        boolean Check = false;
        try {

            SMTPAuthenticator auth = new SMTPAuthenticator(username, password);
            Properties properties = new Properties();
            properties.put("mail.smtp.host", smtpHost);
            properties.put("mail.smtp.auth", "true");
            properties.put("mail.smtp.port", "587");
            properties.put("mail.smtp.starttls.enable", "false");
            properties.put("mail.smtp.socketFactory.port", "587");
            //properties.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
            properties.put("mail.smtp.socketFactory.fallback", "false");
            //Replace by Thong Nguyen 2010-06-07
            //Session session = Session.getDefaultInstance(properties,auth);
            Session session = Session.getInstance(properties, auth);
            //End Replace
            Message msg = new MimeMessage(session);
            msg.setFrom(new InternetAddress(sender));

            //msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipients, false));
            InternetAddress[] receivers = new InternetAddress[recipients.length];
            for (int i = 0; i < recipients.length; i++) {
                receivers[i] = new InternetAddress(recipients[i]);
            }
            msg.setRecipients(Message.RecipientType.TO, receivers);

            msg.setSubject(subject);
            msg.setText(body);
            msg.setHeader("Test", "Test");
            Transport.send(msg);
            Check = true;//add by NT

        } catch (AddressException e) {
            String Err = e.getMessage();
            Check = false;
        } catch (MessagingException e) {
            String Err = e.getMessage();
            if (Err == "Invalid Addresses") {
                Check = false;
            }
        } catch (Exception ex) {
            Check = false;
            Calendar currentDate = Calendar.getInstance();
            StringWriter stringWriter = new StringWriter();
            PrintWriter printWriter = new PrintWriter(stringWriter);
            ex.printStackTrace(printWriter);
            //Send_Email_WriteLog_NoGroupId(stringWriter.toString(),"Sendmail",currentDate.getTime().toString(),"SendMail.java","Send mail Active");
        }
        return Check;
    }

    public void SendEmailReminder(String[] Adress, String Header, String mes) {
        String smtpHost = "smtp.etimemachine.com";
        String username = "etmondemand@etimemachine.com";
        String password = "viva69";
        String sender = "etmondemand@etimemachine.com";
        SendMail.sendMail(smtpHost, username, password, sender, Adress, Header, mes);
    }
/*
    public void Send_Email_Active(String GroupId, String ServerName) throws Exception {
        //take email of personID, encrype PersonId
        String sql = "select FirstName,LastName,UserName,Password,Email from registration where GroupId=" + GroupId;
        TMEClass.MyTimesheet.Common_Timesheet ct = new TMEClass.MyTimesheet.Common_Timesheet();
        java.sql.ResultSet rs = ct.GetDataSqlCommon(sql);
        if (rs.next()) {
            String email = rs.getString("Email");
            String smtpHost = "smtp.etimemachine.com";
            String username = "etmondemand@etimemachine.com";
            String password = "viva69";
            String sender = "etmondemand@etimemachine.com";
            String[] recipients = {email};
            String subject = "Welcome to eTimeMachine On Demand!";
            /*
             * Replace by Luong 2010-08-06 String text = "Dear
             * "+rs.getString("FirstName")+" "+rs.getString("LastName")+"\n\n";
             
            String text = "Dear " + rs.getString("FirstName") + " " + rs.getString("LastName") + "," + "\n\n";
            // End Replace
            text = text + "Please click the following link to activate your eTimeMachine account.\n\n";
            TMEClass.Utils.ETMEncrypt en = new TMEClass.Utils.ETMEncrypt();
            String a = en.encode(GroupId);
            text = text + ServerName + a + "\n\n";
            text = text + "Please note: Some email clients block links inside emails. If you cannot click on the link above, please copy and paste it in your browser.\n\n";
            text = text + "Here is your account info:\n";
            /*
             * Replace by Luong 2010-08-06 text=text+"User
             * Name:"+rs.getString("UserName")+"\n";
             * text=text+"Password:"+rs.getString("Password")+"\n\n";
             
            text = text + "User Name:  " + rs.getString("UserName") + "\n";
            text = text + "Password:  " + rs.getString("Password") + "\n\n";
            // End Replace
             /*
             * Replace by Luong 2010-08-06 text=text+"Regards\n";
             
            text = text + "Regards,\n";
            // End Replace
            text = text + "eTimeMachine Team";
            Calendar currentDate = Calendar.getInstance();
            try {//add by NT
                sendMailCheck(smtpHost, username, password, sender, recipients, subject, text);
                //SendMail.sendMail(smtpHost, username, password, sender, recipients, subject, text);
            } catch (Exception ex) {
                StringWriter stringWriter = new StringWriter();
                PrintWriter printWriter = new PrintWriter(stringWriter);
                ex.printStackTrace(printWriter);
                Send_Email_WriteLog_NoGroupId(stringWriter.toString(), "Sendmail", currentDate.getTime().toString(), "SendMail.java", "Send mail Active");

            }
        }
        if (rs != null)//add by NT
        {
            rs.close();
        }

    }
    */
    

    public boolean Send_Email_Active_Check(String email) throws Exception {
        boolean Check = false;
        String smtpHost = "smtp.etimemachine.com";
        String username = "etmondemand@etimemachine.com";
        String password = "viva69";
        String sender = "etmondemand@etimemachine.com";
        String[] recipients = {email};
        String subject = "Welcome to eTimeMachine On Demand!";
        String text = "Thanh you to register On Demand ";
        //text=text+"Please note: Some email clients block links inside emails. If you cannot click on the link above, please copy and paste it in your browser.\n\n";
        //text=text+"Here is your account info:\n";
        //text=text+"eTimeMachine Team";
        Calendar currentDate = Calendar.getInstance();
        try {//add by NT

            Check = sendMailCheck(smtpHost, username, password, sender, recipients, subject, text);
            //SendMail.sendMail(smtpHost, username, password, sender, recipients, subject, text);
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return Check;
    }

    public boolean Send_Email_Notification(String[] recipients, String sub, String body) throws Exception {
        boolean Check = false;
        String smtpHost = "smtp.etimemachine.com";
        String username = "etmondemand@etimemachine.com";
        String password = "viva69";
        String sender = "etmondemand@etimemachine.com";
        //String[] recipients = {email}; 
        String subject = sub;
        String text = body;
        //text=text+"Please note: Some email clients block links inside emails. If you cannot click on the link above, please copy and paste it in your browser.\n\n";
        //text=text+"Here is your account info:\n";
        //text=text+"eTimeMachine Team";
        Calendar currentDate = Calendar.getInstance();
        try {//add by NT

            Check = sendMailCheck(smtpHost, username, password, sender, recipients, subject, text);
            //SendMail.sendMail(smtpHost, username, password, sender, recipients, subject, text);
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return Check;
    }

    public static String HTMLText() {
        DateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
        DateFormat timeFormat = new SimpleDateFormat("HHmmss");
        Date date = new Date();


        String organizerName = "Organizer Name";

        String organizerEmail = "Organizer_Name@gmail.com";

        String subject = "Event subject goes here";

        String location = "Event location goes here";

        String description = "Event description goes here\n------------------\nProvide the complete event details\n\nUse backslash+n sequences for newlines.";
        String StartTime = "20051206T120102Z";
        String EndTime = "20051206T120102Z";
        String HTML_Text = "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 3.2//EN\">" + "\n"
                + "<HTML>" + "\n"
                + "<HEAD>" + "\n"
                + "<META HTTP-EQUIV=\"Content-Type\" "
                + "CONTENT=\"text/html; charset=utf-8\">" + "\n"
                + "<META NAME=\"Generator\" CONTENT=\"MS Exchange Server version "
                + "6.5.7652.24\">" + "\n"
                + "<TITLE>{0}</TITLE>" + "\n"
                + "</HEAD>" + "\n"
                + "<BODY>" + "\n"
                + "<!-- Converted from text/plain format -->" + "\n"
                + "<P><FONT SIZE=2>Type:Single Meeting<BR>" + "\n"
                + "Organizer:" + organizerName + "<BR>" + "\n"
                + "Start Time:" + StartTime + "<BR>" + "\n"
                + "End Time:" + EndTime + "<BR>" + "\n"
                + "Time Zone:GD<BR>" + "\n"
                + "Location:" + location + "<BR>" + "\n"
                + "<BR>" + "\n"
                + "*~*~*~*~*~*~*~*~*~*<BR>" + "\n"
                + "<BR>" + "\n"
                + "no event<BR>" + "\n"
                + "</FONT>" + "\n"
                + "</P>" + "\n"
                + "</BODY>" + "\n"
                + "</HTML>";
        return HTML_Text;
    }

    public String OutputICS(String vCal) {
        File fD = new File("D:/");
        File temp = null;
        String filename = "";
        try {
            // Create temp file.
            temp = File.createTempFile("newICS", ".ics", fD);
            filename = temp.getAbsolutePath();
            BufferedWriter out = new BufferedWriter(new FileWriter(temp));
            out.write(vCal);
            out.close();

        } catch (IOException e) {
        }
        return filename;
    }

    public void Send_Email_WriteLog(String Content, String sUser, String com, String From, String Module, String DateSend, String Page, String Function) throws Exception {
        //replace by NT
        String email = "pntrang@etimemachine.com";
        String smtpHost = "smtp.etimemachine.com";
        String username = "etmondemand@etimemachine.com";
        String password = "viva69";
        String sender = "etmondemand@etimemachine.com";
        String[] recipients = {email};
        //Regis reg;
        //Collection items = reg.getItems();
        //for (Iterator i = items.iterator(); i.hasNext();) {
        // com = (String)items[0];

        String subject = "OnDeman Error Report from Customer";
        String text = "<font color=#333399 face=Times New Roman size=4><strong>OnDemand Error Report from Customer</strong></font></br>";
        text = text + "<u>From:</u> <font color=#FF0000>" + From + "</font></br>";
        text = text + "<u>Company:</u> <font color=#FF0000>" + com + "</font></br>";
        text = text + "<u>Product:</u> OnDemand </br>";
        text = text + "<u>Module:</u> " + Module + "</br>";
        text = text + "<u>Date Time:</u> " + DateSend + "</br>";
        text = text + "<u>Page :</u> <font color=#FF0000>" + Page + "</font></br>";
        text = text + "<u>Function :</u> <font color=#FF0000>" + Function + "</font></br>";
        text = text + "<u>User Name:</u>" + sUser + " </br></br>";
        text = text + "<u>Error:</u> " + Content;
        SendMail.sendMailHTML(smtpHost, username, password, sender, recipients, subject, text);

    }

    public void Send_Email_WriteLog_NoGroupId(String Content, String Module, String DateSend, String Page, String Function) {
        //by NT
        String email = "pntrang@etimemachine.com";
        String smtpHost = "smtp.etimemachine.com";
        String username = "etmondemand@etimemachine.com";
        String password = "viva69";
        String sender = "etmondemand@etimemachine.com";
        String[] recipients = {email};
        String subject = "SPAM-LOW: OnDemand Error Report from Customer";
        String text = "<font color=#333399 face=Times New Roman size=4><strong>OnDemand Error Report from Customer</strong></font></br>";
        text = text + "<u>Product:</u> OnDemand </br>";
        text = text + "<u>Module:</u> " + Module + "</br>";
        text = text + "<u>Date Time:</u> " + DateSend + "</br>";
        text = text + "<u>Page :</u> <font color=#FF0000>" + Page + "</font></br>";
        text = text + "<u>Function :</u> <font color=#FF0000>" + Function + "</font></br>";
        text = text + "<u>Error:</u> " + Content;
        try {
            SendMail.sendMailHTML(smtpHost, username, password, sender, recipients, subject, text);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
    
    

    public static void sendMailHTML(String smtpHost, final String username, final String password, String sender, String[] recipients, String subject, String body) {
        try {

            SMTPAuthenticator auth = new SMTPAuthenticator(username, password);
            Properties properties = new Properties();
            properties.put("mail.smtp.host", smtpHost);
            properties.put("mail.smtp.auth", "true");
            properties.put("mail.smtp.port", "587");
            properties.put("mail.smtp.starttls.enable", "false");
            properties.put("mail.smtp.socketFactory.port", "587");
            //properties.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
            properties.put("mail.smtp.socketFactory.fallback", "false");
            //Replace by Thong Nguyen 2010-06-07
            //Session session = Session.getDefaultInstance(properties,auth);
            Session session = Session.getInstance(properties, auth);
            //End Replace

            Message msg = new MimeMessage(session);
            msg.setFrom(new InternetAddress(sender));

            //msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipients, false));
            InternetAddress[] receivers = new InternetAddress[recipients.length];
            for (int i = 0; i < recipients.length; i++) {
                receivers[i] = new InternetAddress(recipients[i]);
            }
            msg.setRecipients(Message.RecipientType.TO, receivers);

            msg.setSubject(subject);
            //msg.setText(body); hidden by NT
            msg.setContent(body, "text/html");//add NT
            msg.setHeader("Send mail write log", "Send mail write log");
            Transport.send(msg);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
// Adress : sTo someone
// Subject: sSubject
// Content: sContent mail
    public static void SendEmailInfor(String Adress, String Subject, String Content)// add by NT
    {
    	//AndwiseContextListener.self().sendMail(Subject, Content, Adress);
    }
   // public static void sendEmailWithAttachment(String Adress, String Subject, List<AttachFileItem> attachedFiles, String Content){
    	//AndwiseContextListener.self().sendMailAttach(Subject, Content, attachedFiles, Adress);       
  //  }
    public boolean sendMailInvite(String company, String boss, String emailAddress, String keycode){
        String mail="<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" style=\"width: 600px; font-family: 'Helvetica Neue', Arial, sans-serif; \"><tr><td style=\"width: 470px; padding: 15px 20px; padding-bottom: 0px;\"><h1 style=\" padding: 0; margin: 0; color: #6e7e91; font-size: 30px; font-weight: bold; \"><strong style=\"color: #212F40;\">"+company+"</strong>  is getting organized on TeamKloud</h1></td><td width=\"130\"></td></tr><tr><td height=\"20\">&nbsp;</td><td></td></tr><tr><td style=\"padding: 0px 20px;\"><h3 style=\" padding: 0; margin: 0; color: #6e7e91; font-size: 18px; font-weight: normal; \">Join "+boss+" and the rest of your team by clicking below.</h3>";
        mail+="</td><td width=\"130\"></td></tr><tr><td height=\"25\">&nbsp;</td><td></td></tr><tr><td style=\"padding: 0px 20px;\"><table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" style=\" font-family: 'Helvetica Neue', Arial, sans-serif; \"><tr><td style=\" padding: 10px 15px; border: 1px solid #114D97; background-color: #1F8DD6; \"><a style=\" font-size: 18px; font-weight: bold; color: white; text-align: center; text-decoration: none; text-shadow: 0px -1px #114d97; \" href=\"http://www.teamkloud.com/Register?invite="+keycode+"\">Join "+company+" Now</a></td></tr></table></td><td width=\"130\"></td></tr><tr><td height=\"35\">&nbsp;</td><td></td></tr>";
        mail+="<tr><td colspan=\"2\" style=\"padding: 0px 20px 10px 20px;\"><div style=\"font-size: 11px;\">Trouble with the link above? Copy and paste the following link into your browser:<br><a style=\"color: #1F8DD6;\" href=\"http://www.teamkloud.com/Register?invite="+keycode+"\">http://www.teamkloud.com/Register?invite="+keycode+"</a></div></td></tr><tr><td colspan=\"2\" style=\"padding: 0px 20px 60px 20px;\"><div style=\"font-size: 11px; color: #999999;\">You're getting this email because a teammate of yours invited this email address to join their team on TeamKloud. If this was an error, talk to your teammate or email <a style=\"color: #1F8DD6;\" href=\"mailto:support@teamkloud.com\">support@teamkloud.com</a>.";
        mail+="</div></td></tr></table>";
        String subject=boss+" invited you to "+company+" on TeamKloud";
        SendEmailInfor(emailAddress,subject, mail);
        return false;
    }
    public boolean sendMailResetPassword(String emailAddress, String keycode, String name){
        String mail="<table width='100%' border='0' cellspacing='6' cellpadding='6' style='font-family:Arial,Helvetica,sans-serif;'><tr><td  align='left'><table width='100%' border='0' cellspacing='0' cellpadding='5' style='border: solid 1px #cfd5e0;'><tr><td style='background-color: #39567d;border-bottom: solid 1px #cfd5e0;font-weight: bold;color:#FFFFFF'>&nbsp;&nbsp;TeamKloud</td>";
        mail += "</tr><tr><td width='100%'>&nbsp;&nbsp;Hi " + name + ",</td></tr><tr><td width='100%'>&nbsp;&nbsp;Click the link below to reset your password</td></tr>";
        mail += "<tr><td height='40px'>&nbsp;</td></tr><tr><td style='padding: 0px 15px;'><table cellspacing='0' cellpadding='0' border='0' style=' font-family: ''Helvetica Neue'', Arial, sans-serif;'>";
        mail += "<tr><td style=' padding: 10px 15px; border: 1px solid #114D97; background-color: #1F8DD6; '><a style=' font-size: 18px; font-weight: bold; color: white; text-align: center; text-decoration: none; text-shadow: 0px -1px #114d97;' ";
        mail += "href='http://www.teamkloud.com/ForgetPassword?reset=" + keycode + "'> Reset Password </a>";
        mail += "</td></tr></table></td></tr><tr><td height='20px'>&nbsp;</td></tr><tr><td style='padding: 0px 15px'><div style='font-size: 11px;'>Trouble with the link above? Copy and paste the following link into your browser:<br/>";
        mail += "<a style='color: #1F8DD6;' href='http://www.teamkloud.com/ForgetPassword?reset=" + keycode + "'>";
        mail += "http://www.teamkloud.com/ForgetPassword?reset=" + keycode + "</a>";
        mail += "</div></td></tr><tr><td style='padding: 0px 15px'><div style='font-size: 11px; color: #999999;'>";
        mail += "</div></td></tr><tr><td height='10px'>&nbsp;</td></tr><tr><td width='100%'>&nbsp;&nbsp;Regards</td></tr><tr><td width='100%' height='15px'>&nbsp;&nbsp;The TeamKloud Team</td></tr></table></td></tr></table>";
        String subject="Reset password instructions from TeamKloud";
        SendEmailInfor(emailAddress,subject, mail);
        return false;
    }    
    /*
    public static void sendMailHTMLBody(String smtpHost, final String username, final String password, String sender, String recipients, String subject, String body) {
        //try {
            SMTPAuthenticator auth = new SMTPAuthenticator(username, password);// add by NT
            Properties properties = new Properties();
            properties.put("mail.smtp.host", smtpHost);
            properties.put("mail.smtp.auth", "true");
            properties.put("mail.smtp.port", "587");
            properties.put("mail.smtp.starttls.enable", "false");
            properties.put("mail.smtp.socketFactory.port", "587");
            properties.put("mail.smtp.socketFactory.fallback", "false");
            Session session = Session.getInstance(properties, auth);
        MimeMessage msg = new MimeMessage(session);
        try {            
            msg.setFrom(new InternetAddress("no-reply@teamkloud.com"));
            msg.setRecipients(Message.RecipientType.TO, recipients);
            msg.setSubject(subject);
            msg.setSentDate(new Date());
            msg.setHeader("TeamKloud", subject);
            msg.setContent(body, "text/html; charset=utf-8");
            Transport transport = session.getTransport("smtp");
            transport.connect();
            transport.sendMessage(msg, msg.getAllRecipients());
            transport.close();
            //Transport.send(msg);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }     
     */
}
