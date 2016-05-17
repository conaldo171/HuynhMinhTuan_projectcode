
package com.andwise.email;
import java.util.*;
import java.io.*;
import javax.mail.*;
import javax.mail.internet.*;

public class FetchMailUsage {
     public static void main(String args[])
  {
    try
    {
      String popServer="pop.gmail.com";
      //String popUser="duyenstar@gmail.com";
      String popUser="no-reply@teamkloud.com";
      String popPassword="ndbduyen";
      receive(popServer, popUser, popPassword);
    }
    catch (Exception ex)
    {
      System.out.println("Usage: java com.lotontech.mail.SimpleReceiver"
       +" popServer popUser popPassword");
    }
    System.exit(0);
  }

    public static void receive(String popServer, String popUser
   , String popPassword)
  {
    Store store=null;
    Folder folder=null;
    try
    {
      // -- Get hold of the default session --
      Properties props = System.getProperties();
      Authenticator auth = new SMTPAuthenticator(popUser,popPassword);
    //  props.setProperty( "mail.pop3.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
      props.setProperty( "mail.pop3.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
      props.setProperty( "mail.pop3.socketFactory.fallback", "false");
      props.setProperty("mail.pop3.port", "995");//pop3 :995;imap:993
      props.setProperty("mail.pop3.socketFactory.port", "995");
      Session session = Session.getDefaultInstance(props, auth);
      // -- Get hold of a POP3 message store, and connect to it --
      store = session.getStore("pop3");
      store.connect(popServer, popUser, popPassword);
      
      // -- Try to get hold of the default folder --
      folder = store.getDefaultFolder();
      if (folder == null) throw new Exception("No default folder");
      // -- ...and its INBOX --
      folder = folder.getFolder("INBOX");
      if (folder == null) throw new Exception("No POP3 INBOX");
      // -- Open the folder for read only --
      folder.open(Folder.READ_ONLY);
      // -- Get the message wrappers and process them --
      Message[] msgs = folder.getMessages();
      int k=folder.getNewMessageCount();
      System.out.println("New Message "+k);
      System.out.println("total message "+folder.getMessageCount());
      System.out.println("Unread "+folder.getUnreadMessageCount());
      String uid="";
      printAllMessageEnvelopes(folder);
    for (int msgNum = 0; msgNum < msgs.length; msgNum++)
      {
          // printMessage(msgs[msgNum]);
          // Display from (only first) and subject of messages
          /*FetchProfile fp=new FetchProfile();
          fp.add("Subject");
          folder.fetch(msgs,fp);*/
          FetchProfile fp = new FetchProfile();
          if (folder instanceof com.sun.mail.pop3.POP3Folder)
          {
            com.sun.mail.pop3.POP3Folder pf =(com.sun.mail.pop3.POP3Folder)folder;
            uid = pf.getUID(msgs[msgNum]); 
          }
          if(uid!=null)
              System.out.println("-----------------------------");
          fp.add(UIDFolder.FetchProfileItem.UID);
          folder.fetch(folder.getMessages(), fp);
          
      }
      
    }
    catch (Exception ex)
    {
      ex.printStackTrace();
    }
    finally
    {
      // -- Close down nicely --
      try
      {
        if (folder!=null) folder.close(false);
        if (store!=null) store.close();
      }
      catch (Exception ex2) {ex2.printStackTrace();}
    }
  }
  public static void printAllMessageEnvelopes(Folder folder) throws Exception {
        
        // Attributes & Flags for all messages ..
        Message[] msgs = folder.getMessages();
        
        // Use a suitable FetchProfile
        FetchProfile fp = new FetchProfile();
        fp.add(FetchProfile.Item.ENVELOPE);        
        folder.fetch(msgs, fp);
        
        for (int i = 0; i < msgs.length; i++) {
            System.out.println("--------------------------");
            System.out.println("MESSAGE #" + (i + 1) + ":");
            dumpEnvelope(msgs[i]);
            
        }
        
    }
   public static void dumpEnvelope(Message m) throws Exception {        
        pr(" ");
        Address[] a;
        // FROM
        if ((a = m.getFrom()) != null) {
            for (int j = 0; j < a.length; j++)
                pr("FROM: " + a[j].toString());
        }
        
        // TO
        if ((a = m.getRecipients(Message.RecipientType.TO)) != null) {
            for (int j = 0; j < a.length; j++) {
                pr("TO: " + a[j].toString());                
            }
        }
        
        // SUBJECT
        pr("SUBJECT: " + m.getSubject());
        
        // DATE
        Date d = m.getSentDate();
        pr("SendDate: " +
                (d != null ? d.toString() : "UNKNOWN"));
        

    }
    public static void pr(String s) {
        
        System.out.println(s);
    }
   public static void printMessage(Message message)
  {
    try
    {
      // Get the header information
      message.getReceivedDate();
      String from=((InternetAddress)message.getFrom()[0]).getPersonal();
      if (from==null) from=((InternetAddress)message.getFrom()[0])
       .getAddress();
      System.out.println("FROM: "+from);
      String subject=message.getSubject();
      System.out.println("SUBJECT: "+subject);
      // -- Get the message part (i.e. the message itself) --
      Part messagePart=message;
      Object content=messagePart.getContent();
      // -- or its first body part if it is a multipart message --
      if (content instanceof Multipart)
      {
        messagePart=((Multipart)content).getBodyPart(0);
        System.out.println("[ Multipart Message ]");
      }
      // -- Get the content type --
      String contentType=messagePart.getContentType();
      // -- If the content is plain text, we can print it --
      System.out.println("CONTENT:"+contentType);
      if (contentType.startsWith("text/plain")
       || contentType.startsWith("text/html"))
      {
        InputStream is = messagePart.getInputStream();
        BufferedReader reader
         =new BufferedReader(new InputStreamReader(is));
        String thisLine=reader.readLine();
        while (thisLine!=null)
        {
          System.out.println(thisLine);
          thisLine=reader.readLine();
        }
      }
      System.out.println("-----------------------------");
    }
    catch (Exception ex)
    {
      ex.printStackTrace();
    }
  }
    
} //End of class