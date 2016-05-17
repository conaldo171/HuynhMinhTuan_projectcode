<%@ page language="java" contentType="application/json; charset=utf-8" pageEncoding="utf-8"%>
<%@page import="java.util.ArrayList"%>
<%@page import="org.json.*"%>
<%@ page import="java.util.Date"%>
<%@page import="java.text.*"%>
<%@ page import="java.util.*"%>
<%@ page import="org.springframework.context.ApplicationContext" %>
<%@ page import="org.springframework.context.support.ClassPathXmlApplicationContext" %>
<%@ page import="com.andwise.admin.dao.MemberDao" %>
<%@ page import="com.andwise.admin.model.Member" %>
 <%@ page import="org.springframework.web.context.support.*"%>
  <%@ page import="com.andwise.common.*" %>
  <%@include file="/admin/module/view/common/Permission.jsp"%>
<%
JSONArray jsonReturn = new JSONArray();
ApplicationContext appContext =  ApplicationContextProvider.getGlobalContext(this.getServletContext());
MemberDao memberDAO=(MemberDao)appContext.getBean("memberDAO");
try{
		String date_from="";
		String date_to="";
		String industry="";
		String service="";
		String txtSearch="";
		String all="";
		int iCount=0;
	 	int iPage = 1;
	    String sWhere = "";
	    String sCountOnly = "";
	    String search="";
	    String sPage = "", sLimit = "", sIdx = "name", sOrd = "ASC";
	    int l_iTotalRows = 0;
	    //countonly
	    String gmt="";
	    if(session.getAttribute("SessionGmt")!=null){
	    	gmt=(String)session.getAttribute("SessionGmt");
	    }
	    DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
	    Date date = new Date();
	    formatter.setTimeZone(TimeZone.getTimeZone(gmt));
	    Date currentdate=(Date)formatter.parse(formatter.format(date));
	    long lCurentdate= currentdate.getTime();
	    long last_week = lCurentdate-(7*24*60*60*1000);
	    Date dateto=new Date(lCurentdate);
	    Date datefrom=new Date(last_week);
	    date_to = formatter.format(dateto);
	    date_from=formatter.format(datefrom);
	    if(request.getParameter("datefrom")!=null){
			date_from = request.getParameter("datefrom");
			//session.setAttribute("Sessiondatefrom",date_from);
			
		}
		if(request.getParameter("dateto")!=null){
			date_to = request.getParameter("dateto");
			//session.setAttribute("Sessiondateto",date_to);
			
		}
		//if(session.getAttribute("Sessiondateto")!=null)
			//date_to = (String)session.getAttribute("Sessiondateto");
		//if(session.getAttribute("Sessiondatefrom")!=null)
			//date_from = (String)session.getAttribute("Sessiondatefrom");
	    if (request.getParameter("page") != null) {
            sPage = request.getParameter("page");
        }
        if (request.getParameter("rows") != null) {
            sLimit = request.getParameter("rows");
        }
        if (request.getParameter("sidx") != null && !request.getParameter("sidx").equals("")) {
            sIdx = request.getParameter("sidx");
        }
        if (request.getParameter("sord") != null) {
            sOrd = request.getParameter("sord");
        }
        if(request.getParameter("industry")!=null){
        	industry =request.getParameter("industry");
        }
        if(request.getParameter("countonly")!=null){
        	sCountOnly = request.getParameter("countonly");
			
		}
        if(request.getParameter("service")!=null){
        	service =request.getParameter("service");
        }
        if(request.getParameter("all")!=null){
        	all =request.getParameter("all");
        }
        if(request.getParameter("txtsearch")!=null){
        	txtSearch =request.getParameter("txtsearch");
        }
        if(request.getParameter("search")!=null){
        	search =request.getParameter("search");
        }
        if(search.equals("OK")){
        	if(!industry.equals("")){
        		 sWhere += " and LOWER(industry) Like '%" + industry.toLowerCase() + "%'";
        	}
        	if(!service.equals("")){
        		 sWhere += " and LOWER(type) Like '%"+ service.toLowerCase() + "%'";
        	}
        	
       		 sWhere += " and a.create_date BETWEEN '"+date_from+"'  And '"+date_to+"'";
       
        	if(!txtSearch.equals("")){
        		if(all.equals("name")){
        			 sWhere += " and LOWER(name) Like '%"+ txtSearch.toLowerCase() + "%'";
        		}
        		else if(all.equals("email")){
       			 sWhere += " and LOWER(email) Like '%"+ txtSearch.toLowerCase() + "%'";
       			
       		}
        		 else
       				 sWhere += " and LOWER(email) Like '%"+ txtSearch.toLowerCase() + "%'" + " or LOWER(name) Like '%"+ txtSearch.toLowerCase() + "%'";
       		
       	}
        }
        
        
        JSONArray jsonArray = new JSONArray();
        l_iTotalRows = memberDAO.countDataMember(date_from,date_to,sWhere);
        if (!sCountOnly.equals("")) {
        	 if (l_iTotalRows == 0) {
        		 //jsonArray = []; //No data found
        		 jsonArray.put("{}");
             } else {
            	 //jsonArray = "[{\"totals\":\"1\"}]";
            	  jsonArray.put("{\"totals\":\"1\"}");
             }
        	 jsonReturn=jsonArray;
        }
        else
        {
        	
            int iLimit = Integer.valueOf(sLimit);
            iPage = Integer.valueOf(sPage);
            int iTotalPage = 0, iStart = 0;
            if (l_iTotalRows > 0) {
                iTotalPage = (l_iTotalRows - 1) / iLimit + 1;
            } else {
                iTotalPage = 0;
            }
            if (iPage > iTotalPage) {
                iPage = iTotalPage;
            }
            iStart = iLimit * iPage - iLimit;
            if (iStart < 0) {
                iStart = 0;
            }
            JSONObject store = new JSONObject();
            store.put("total", iTotalPage);
            store.put("page", iPage);
            store.put("records", iCount);
        	ArrayList<Member> listArr = memberDAO.selectMemberGeneral(date_from,date_to,sIdx,sOrd,String.valueOf(iStart),sLimit,sWhere);
        	int count=0;
        	for (int i = 0; i < listArr.size() ; i++) {
        		Member member = listArr.get(i);
        		count++;
        		JSONObject json = new JSONObject();
        		json.put("no",count);
        		json.put("user_id",member.getUser_id());
        		json.put("team_id",member.getTeam_id());
        		Date since = (Date)formatter.parse(member.getCreate_date());
        		json.put("since", formatter.format(since));
        		json.put("industry", member.getIndustry());
        		json.put("company_name", member.getCompany());
        		json.put("name", member.getName());
        		json.put("email", member.getEmail());
        		json.put("channel",member.getList_channel());
        		String url_image="";
        		String list_channel=  member.getList_channel();
        		String str[]= list_channel.split(",");
        		for(int j=0; j<str.length;j++){
        			if(str[j].equals("1")||str[j].equals("2")){
        				url_image = "<i class='icon-facebook-sign blue'></i>";
        			}
        			else if (str[j].equals("3"))
        			{
        				url_image =url_image+" " +"<i class='icon-twitter-sign blue'></i>";
        			}
        		}
        		 json.put("list_channel", url_image);
        		json.put("member", member.getTeam_member());
        		json.put("totalcontent", member.getTotal_content());
        		if(member.getService().equals("0"))
        		json.put("type","Free");
        		else
        		{
        			json.put("type","Paid");	
        		}
        		 long date_start= member.getService_start();
				    Date date_date_start=new Date(date_start);
				    String str_date_start = formatter.format(date_date_start);
				    long date_expired= member.getService_end();
				    Date date_date_expired=new Date(date_expired);
				    String str_date_expired = formatter.format(date_date_expired);
        		json.put("date_start",str_date_start);
        		json.put("date_expired",str_date_expired);
        		
        		//json.put("create_date", member.getCreate_date());
            jsonArray.put(i,json);
        	}
        	store.put("rows",jsonArray);
        	//jsonReturn=jsonArray;
        	out.println(store.toString());
        }
	
}
catch(Exception e){
	
}
%>
