package com.andwise.common;
import java.io.*;
import java.lang.*;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class MD5 {
    
    /** Creates a new instance of MD */
    public MD5() {
    }
    
   
    
    public static String callHash(String plaintext)
    {
        MessageDigest md = null;
        try
        {
            md = MessageDigest.getInstance("MD5");
        }
        catch(NoSuchAlgorithmException nosuchalgorithmexception) { }
        byte b[] = md.digest(plaintext.getBytes());
        int size = b.length;
        StringBuffer h = new StringBuffer(size);
        for(int i = 0; i < size; i++)
        {
            int u = b[i] & 0xff;
            if(u < 16)
                h.append((new StringBuilder("0")).append(Integer.toHexString(u)).toString());
            else
                h.append(Integer.toHexString(u));
        }
        return h.toString();
    }
}