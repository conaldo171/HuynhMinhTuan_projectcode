package com.andwise.common;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

public class MailOperator {
	 private final ScheduledExecutorService scheduledExecutor = Executors.newScheduledThreadPool(5);
	  //  private final ScheduledExecutorService scheduledpushExecutor = Executors.newScheduledThreadPool(5);
	 private MailExecutor mailExecutor;
	 
	 public MailOperator() {
			super();
			configure();
	}
	 
	
	 public void sendMail(String subject, String message, String toAddresses) {
	        String[] addrs = toAddresses.split(",");
	        this.sendMail(subject, message, addrs);
	    }

	    /**
	     * Notify users by email of something.
	     *
	     * @param subject
	     * @param message
	     * @param toAddresses
	     */
	    public void sendMail(String subject, String message, String... toAddresses) {
	        try {
	        	MimeMessage mail = (MimeMessage)mailExecutor.createMessage(toAddresses);//createMimeMessage
	        	//MimeMessage mail = mailExecutor.createMimeMessage(toAddresses);
	            if (mail != null) {
	                mail.setSubject(subject,"UTF-8");
	                mail.setContent(message, "text/html; charset=utf-8");
	               // mail.setHeader("Content-Type", "text/plain; charset=UTF-8");
	                mailExecutor.queue(mail);
	            }
	        } catch (MessagingException e) {
	            System.out.println(e);
	        }
	    }
	   
	    
	    public void configure() {
	        mailExecutor = new MailExecutor();
	        if (mailExecutor.isReady()) {
	            //logger.info("Mail executor is scheduled to process the message queue every 2 minutes.");
	            scheduledExecutor.scheduleAtFixedRate(mailExecutor, 1, 2, TimeUnit.MINUTES);
	        	
	        } else {
	            //logger.warn("Mail server is not properly configured.  Mail services disabled.");
	        }
	       // notificationExecutor = new NotificationExecutor();
	        //scheduledpushExecutor.scheduleAtFixedRate(notificationExecutor, 1, 10, TimeUnit.SECONDS);
	    }

		
}
