package com.andwise.email;
import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;

public class SMTPAuthenticator extends Authenticator {

    private String user;
    private String password;

    public SMTPAuthenticator(String user, String password) {
        this.user = user;
        this.password = password;
    }
    
    public PasswordAuthentication getPasswordAuthentication() {
        return new PasswordAuthentication(this.user, this.password);
    }
}