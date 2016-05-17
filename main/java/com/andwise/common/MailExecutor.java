/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.andwise.common;

import com.andwise.email.SMTPAuthenticator;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Properties;
import java.util.Queue;
import java.util.Set;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.regex.Pattern;
import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;


public class MailExecutor implements Runnable {

    private final Queue<Message> queue = new ConcurrentLinkedQueue<Message>();
    private final Set<Message> failures = Collections.synchronizedSet(new HashSet<Message>());
    private final Session session;

    public MailExecutor() {
    	ConfigTable cfTable = ConfigFactory.getInstance();
        final String mailUser=cfTable.getValue("username_email");
        final String mailPassword= cfTable.getValue("password_email");
        boolean authenticate = !isEmpty(mailUser) && !isEmpty(mailPassword);
        String server =  cfTable.getValue("server_email");
        String smtps_email=cfTable.getValue("smtps_email");
        //String auth_email= cfTable.getValue("auth_email");
       // String server = "email-smtp.us-east-1.amazonaws.com";
        if (isEmpty(server)) {
            session = null;
            return;
        }
        int port = Integer.parseInt(cfTable.getValue("port_email"));
        boolean isGMail = false;
        if (server.equals("smtp.gmail.com")) {
            port = 465;
            isGMail = true;
        }
        else
        {
        	isGMail = true;	
        }
        Properties props = new Properties();
        props.setProperty("mail.smtp.host", server);
        props.setProperty("mail.smtp.port", String.valueOf(port));
        props.setProperty("mail.smtp.auth", String.valueOf(authenticate));

        if (isGMail) {
            props.setProperty("mail.smtp.auths", String.valueOf(authenticate));
            props.setProperty("mail.smtp.starttls.enable", "true");
            if(smtps_email.equals("true")){
            	props.put("mail.smtp.socketFactory.port", String.valueOf(port));
                props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
                props.put("mail.smtp.socketFactory.fallback", "false");
            }
            
        }

        if (!isEmpty(mailUser) && !isEmpty(mailPassword)) {
            SMTPAuthenticator auth = new SMTPAuthenticator(mailUser, mailPassword);// add by NT
            // SMTP requires authentication
            session = Session.getInstance(props, auth);
        } else {
            // SMTP does not require authentication
            session = Session.getInstance(props);
        }
    }

    /**
     * Indicates if the mail executor can send emails.
     *
     * @return true if the mail executor is ready to send emails
     */
    public boolean isReady() {
        return session != null;
    }

    /**
     * Create a message.
     *
     * @param toAddresses
     * @return a message
     */
    public Message createMessage(String... toAddresses) {
        return createMessage(Arrays.asList(toAddresses));
    }
    
   

    /**
     * Create a message.
     *
     * @param toAddresses
     * @return a message
     */
    public Message createMessage(List<String> toAddresses) {
        MimeMessage message = new MimeMessage(session);
        try {
        	ConfigTable cfTable = ConfigFactory.getInstance();
        	String from_email=cfTable.getValue("from_email");
            InternetAddress from = new InternetAddress(from_email, "Enpick.com");
            message.setFrom(from);
            //message.setSubject(subject,"text/html; charset=utf-8");

            // determine unique set of addresses
            Set<String> uniques = new HashSet<String>();
            for (String address : toAddresses) {
                uniques.add(address.toLowerCase());
            }

            Pattern validEmail = Pattern.compile("^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$");
            List<InternetAddress> tos = new ArrayList<InternetAddress>();
            for (String address : uniques) {
                if (isEmpty(address)) {
                    continue;
                }
                if (validEmail.matcher(address).find()) {
                    try {
                        tos.add(new InternetAddress(address));
                    } catch (Throwable t) {
                    }
                }
            }
            message.setRecipients(Message.RecipientType.TO, tos.toArray(new InternetAddress[tos.size()]));
            message.setSentDate(new Date());
            
        } catch (Exception e) {
            //logger.error("Failed to properly create message", e);
        }
        return message;
    }

    /**
     * Returns the status of the mail queue.
     *
     * @return true, if the queue is empty
     */
    public boolean hasEmptyQueue() {
        return queue.isEmpty();
    }

    /**
     * Queue's an email message to be sent.
     *
     * @param message
     * @return true if the message was queued
     */
    public boolean queue(Message message) {
        if (!isReady()) {
            return false;
        }
        try {
            message.saveChanges();
        } catch (Throwable t) {
            //logger.error("Failed to save changes to message!", t);
        }
        queue.add(message);
        return true;
    }

    @Override
    public void run() {
        if (!queue.isEmpty()) {
            if (session != null) {
                // send message via mail server
                Message message = null;
                while ((message = queue.peek()) != null) {
                    try {
                        Transport.send(message);
                        queue.remove();
                        //if (failures.contains(message)) {
                        failures.remove(message);
                        //}
                    } catch (Exception e) {
                        //Logger.getLogger(Messages.class.getName()).log(Level.SEVERE, null, e);
                        //e.printStackTrace();
                        //Remove And Add message to bottom.
                        queue.remove();
                        //queue.add(message);
                        if (!failures.contains(message)) {
                            //logger.error("Failed to send message", e);
                            failures.add(message);
                        } else {
                            //remove of queue because this is second time.
                            failures.remove(message);
                        }
                    }
                }
                for (Message mess : failures) {
                    queue.add(mess);
                }
            }
        }
    }

    public static boolean isEmpty(String value) {
        return value == null || value.trim().length() == 0;
    }
}
