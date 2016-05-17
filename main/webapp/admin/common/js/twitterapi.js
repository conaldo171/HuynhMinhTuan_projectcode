
try{
var oauth_verifier='';
var cb = new Codebird;
var mykey=$("#tw_consumer_key").val();
var mysecret=$("#tw_consumer_secret").val();
cb.setConsumerKey(mykey, mysecret);
var current_url = location.toString();
var query = current_url.split("oauth_verifier");
var oauth_verifier=query[1].replace("=","").trim();
var username;
var image_url;
var token_auth=getCookie("token");
var token_secret_auth =getCookie("token_secret");

if (oauth_verifier !== "undefined") {
	$("#dashboard_dashboard").addClass("itemLoading");
   cb.setToken(token_auth,token_secret_auth);
    cb.__call(
        "oauth_accessToken",
        {
            oauth_verifier: oauth_verifier
        },
        function (reply) {
        	
			username = reply.screen_name;
			var channel_detail_id=reply.user_id;
			 var access_token=reply.oauth_token+"_"+reply.oauth_token_secret;
            cb.setToken(reply.oauth_token, reply.oauth_token_secret);
        	cb.__call(
				    "users_show","screen_name="+username,
				    function (respone) {
				    	
				        image_url=respone.profile_image_url;
				       // var paras={twitter_exchange_token:access_token,channel_user:username,channel_picture:image_url,channel_id:3,channel_detail_id:channel_detail_id,pchannel_detail_id:channel_detail_id,Action:"twitter"};
				        var dataString =[];
				         dataString.push({
				             name: "twitter_exchange_token", 
				             value: access_token
				         });
				         dataString.push({
				             name: "channel_user", 
				             value: username
				         });
				         dataString.push({
				             name: "channel_picture", 
				             value: image_url
				         });
				         dataString.push({
				             name: "channel_id", 
				             value: 3
				         });
				         dataString.push({
				             name: "channel_detail_id", 
				             value: channel_detail_id
				         });
				         dataString.push({
				             name: "pchannel_detail_id", 
				             value: channel_detail_id
				         });
				         dataString.push({
				             name: "Action", 
				             value: "twitter"
				         }); 
		  		 	      $.ajax({
							 type:'POST',
							  url : 'ConnectChannel.do',
							  dataType: 'text',
							  data: dataString,
							  success : function(source) {
								 if(source.trim()!="error")
									 $("#dashboard_dashboard").removeClass("itemLoading");
						   		location.replace("index.jsp#topnavi/connect_a_channel");
						   				
							  }
		  		 	   });
				       
				    }
				);
        	
          
         
   		    
        }
    );

}
}
catch (ex) {
	
	 //aoFrm.mess("alert","Somtime connect facebook error. Please Try again");
		//return false;			
}

	//cb.setProxy("https://api.supertweet.net/");
	function loginTwitter(){
			$("#processtwitterbtn").addClass('btn-disabled');
			$("#processtwitterbtn").prop('disabled', true);
		  setCookie("token_secret","",2);
		  setCookie("token","",2);
		cb.__call(
			    "oauth_requestToken",
			    {},
			    function (reply) {
			        // stores it
			      var  token = reply.oauth_token;
			     var   token_secret=reply.oauth_token_secret;
			        cb.setToken(token,token_secret);
			         setCookie("token_secret",token_secret,2);
			         setCookie("token",token,2);
			        //alert(token_secret);
			        // gets the authorize screen URL
			        cb.__call(
			            "oauth_authorize",
			            {},
			            function (auth_url) {
			            	window.codebird_auth = window.location.replace(auth_url);
			            }
			        );
			        
	}
			    );
	}
	
	function setCookie(c_name,value,exdays)
	 {
	 var exdate=new Date();
	 exdate.setDate(exdate.getDate() + exdays);
	 var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	 document.cookie=c_name + "=" + c_value;
	 }
	 
	 function getCookie(c_name)
	 {
	 var c_value = document.cookie;
	 var c_start = c_value.indexOf(" " + c_name + "=");
	 if (c_start == -1)
	   {
	   c_start = c_value.indexOf(c_name + "=");
	   }
	 if (c_start == -1)
	   {
	   c_value = null;
	   }
	 else
	   {
	   c_start = c_value.indexOf("=", c_start) + 1;
	   var c_end = c_value.indexOf(";", c_start);
	   if (c_end == -1)
	   {
	 c_end = c_value.length;
	 }
	 c_value = unescape(c_value.substring(c_start,c_end));
	 }
	 return c_value;
	 }
	 function showUser()
	 {
		 var params = {
				    screen_name: username
				};
				cb.__call(
				    "users_show",
				    params,
				    function (reply) {
				        alert(enumerateObject(reply));
						alert(reply.profile_image_url);
						$(".image").attr("src",reply.profile_image_url);
				    }
				);
	 }
	 
	 
	 
	 