$.get('module/view/member/member_monitoring_facebook.jsp',
		    function(result){
		      $("#member-monitoring").html(result) ;
		    });
$(".block-channel a#monitoring-facebook").click(function(){
	$.get('module/view/member/member_monitoring_facebook.jsp',
		    function(result){
		      $("#member-monitoring").html(result) ;
		    });
});

$(".block-channel a#monitoring-twitter").click(function(){
	$.get('module/view/member/member_monitoring_twitter.jsp',
		    function(result){
		      $("#member-monitoring").html(result) ;
		    });
});