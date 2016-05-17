$.get('module/view/member/member_overview.jsp',
		    function(result){
		      $("#overview").html(result) ;
		    });
$("#member_member .tabbable a#tab-overview").click(function(){
	$.get('module/view/member/member_overview.jsp',
		    function(result){
		      $("#overview").html(result) ;
		    });
});

$("#member_member .tabbable a#tab-monitoring").click(function(){
	$.get('module/view/member/member_monitoring.jsp',
		    function(result){
		      $("#monitoring").html(result) ;
		    });
});

$("#member_member .tabbable a#tab-analysis").click(function(){
	$.get('module/view/member/member_analysis.jsp',
		    function(result){
		      $("#analysis").html(result) ;
		    });
});