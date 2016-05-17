/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.andwise.email;

import java.io.InputStream;

/**
 *
 * @author XuanNguyen
 */
public class AttachFileItem {
        public InputStream insFile;
        public String fileName;
        public String contentType="";
        public long fileSize=0;
}
