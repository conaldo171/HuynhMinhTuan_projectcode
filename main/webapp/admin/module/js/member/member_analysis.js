
$(document).ready(function() {
	$.get('module/view/member/member_analysis_facebook.jsp',
		    function(result){
		      $("#content-analysis").html(result) ;
		    });
		$(".block-channel a#analysis-facebook").click(function(){
			$(".block-channel a").removeClass("active");
			$(this).addClass("active");
			$.get('module/view/member/member_analysis_facebook.jsp',
				    function(result){
				      $("#content-analysis").html(result) ;
				    });
			
		});
		
		$(".block-channel a#analysis-twitter").click(function(){
			$(".block-channel a").removeClass("active");
			$(this).addClass("active");
			
			$.get('module/view/member/member_analysis_twitter.jsp',
				    function(result){
				      $("#content-analysis").html(result) ;
				    });
		});
	
});
