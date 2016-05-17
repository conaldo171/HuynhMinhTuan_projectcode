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
//var token_auth=getCookie("token");
//var token_secret_auth =getCookie("token_secret");
var token_auth=$("#tw_token_user").val();
var token_secret_auth =$("#tw_token_secret").val();
if (oauth_verifier!="undefined"){
	$("#dashboard_dashboard").addClass("itemLoading");
	create_token(oauth_verifier);
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
		 	      $.ajax({
				 type:'GET',
				  url : 'ConnectTwitter.do',
				  dataType: 'json',
				 // data: dataString,
				  success : function(source) {
					if(source.length>0){
						 window.location.replace(source[0].url_auth);
					}
			   				
				  }
		 	   });
			
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
						$(".image").attr("src",reply.profile_image_url);
				    }
				);
	 }
	function create_token(oauth_verifier){
		var dataString=[];
		 dataString.push({
             name: "oauth_verifier", 
             value: oauth_verifier
         });
		 dataString.push({
             name: "Action", 
             value: "gettoken"
         });
		  $.ajax({
				 type:'GET',
				  url : 'ConnectTwitter.do',
				  dataType: 'json',
				  data: dataString,
				  success : function(source) {
					if(source.length>0){
						// window.location.replace(source[0].url_auth);
						var access_token="";
						var screen_name="";
						var channel_detail_id="";
						for(var i=0; i<source.length;i++){
							access_token=source[i].access_token;
							screen_name = source[i].screen_name;
							channel_detail_id=source[i].user_id;
						}
						var token= access_token.split("_");
						  cb.setToken(token[0], token[1]);
				        	cb.__call(
								    "users_show","screen_name="+screen_name,
								    function (respone) {
								        image_url=respone.profile_image_url;
								        var dataString =[];
								         dataString.push({
								             name: "twitter_exchange_token", 
								             value: access_token
								         });
								         dataString.push({
								             name: "channel_user", 
								             value: screen_name
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
			   				
				  }
		 	   });

	}
	 
	 
	 