<script type="text/javascript" src="module/js/member/member_children.js"></script>
<%@include file="/admin/module/view/common/Permission.jsp"%>
<%
String user_id="";
String team_id="";
if(request.getParameter("user_id")!=null){
	user_id=request.getParameter("user_id");
}
if(request.getParameter("team_id")!=null){
	team_id=request.getParameter("team_id");
}
%>
<div class="container-fluid" id="member_member">
 	<div class="tabbable">
	  <ul class="nav nav-tabs">
	    <li id="overview_tab" user_id="<%=user_id%>" team_id=<%=team_id%> class="active"><a href="#overview" data-toggle="tab" id="tab-overview" text="overview">OVERVIEW</a></li>
	    <li id="monitoring_tab" user_id="<%=user_id%>" team_id=<%=team_id%> ><a href="#monitoring" data-toggle="tab" id="tab-monitoring" text="monitoring">MONITORING</a></li>
	    <li id="analysis_tab" user_id="<%=user_id%>" team_id=<%=team_id%> ><a href="#analysis" data-toggle="tab" id="tab-analysis" text="analysis">ANALYSIS</a></li>
	  </ul>
	  <div class="tab-content">
	    <div id="overview" class="tab-pane active">
	      
	    </div>
	    <div id="monitoring" class="tab-pane">
	    
	    </div>
	    <div id="analysis" class="tab-pane">
	      
	    </div>
	  </div><!-- /.tab-content -->
	</div><!-- /.tabbable --> 	
</div>