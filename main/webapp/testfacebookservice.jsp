<%@ page import="java.util.*"%>
<%@ page import="java.text.*"%>
<% 


try{
	 
            SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss Z");
            Date datetime = new Date();
            System.out.println("date curent "+datetime);
            System.out.println("date "+sdf.format(datetime));
          //  sdf.setTimeZone(TimeZone.getTimeZone("GMT"));
           // datetime = (Date)sdf.parse(sdf.format(datetime)); 
          //  System.out.println("GMT "+ sdf.format(datetime)+"_"+datetime.getTime());
          //  System.out.println("GMT "+ sdf.format(datetime));
          //  sdf.setTimeZone(TimeZone.getTimeZone("GMT+07"));
          //  datetime = (Date)sdf.parse(sdf.format(datetime)); 
          //  System.out.println("GMT+07 "+ sdf.format(datetime)+"_"+datetime.getTime());
        
           // sdf.setTimeZone(TimeZone.getTimeZone("GMT+09"));
          //  datetime = (Date)sdf.parse(sdf.format(datetime)); 
         //  System.out.println("GMT+09 "+ sdf.format(datetime)+"_"+datetime.getTime());

          //  sdf.setTimeZone(TimeZone.getTimeZone("UTC"));

          //  System.out.println("utc "+sdf.format(datetime));

          Calendar calendar = new GregorianCalendar(TimeZone.getTimeZone("GMT"));

          DateFormat formatter = new SimpleDateFormat("dd MMM yyyy HH:mm:ss z");    
          //  formatter.setTimeZone(TimeZone.getTimeZone("GMT+13"));  
           //DateFormat formatter = new SimpleDateFormat("dd MMM yyyy HH:mm:ss z");    
          formatter.setTimeZone(TimeZone.getTimeZone("GMT+13"));  

           // String newZealandTime = formatter.format(calendar.getTime());

           // System.out.println("using calendar "+newZealandTime);
		DateFormat test = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
           // long mili = 1381993200000l;
            //Date date=new Date(mili);
            test.setTimeZone(TimeZone.getTimeZone("GMT+0700"));
            //SimpleDateFormat df2 = new SimpleDateFormat("dd/MM/yy");
            //String dateText = test.format(date);
            String start_dt = "2013-10-17 16:00:00"; 
          System.out.println("GMT+07 "+start_dt);
          datetime = (Date)test.parse(start_dt); 
           // sdf.setTimeZone(TimeZone.getTimeZone("GMT+09"));
          System.out.println("GMT+07 "+ datetime.getTime());
          // System.out.println("vn:"+dateText);
          
           //// DateFormat formatter1 = new SimpleDateFormat("yyyy-MM-dd"); 
            //Date date1 = (Date)formatter1.parse(start_dt);
           // System.out.println("adsasd"+date1.toString());
        }catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
%>
