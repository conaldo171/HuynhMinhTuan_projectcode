<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<script src="common/js/plugin.js?v=130916" type="text/javascript"></script>
<script src="http://api.klout.com/v2/assets/js/klout.js"></script>
<script>
                       kloutConnect.init({
                         apiKey:"3ek3fw5cm4hsw42fyk3qhyc3",
                         success:function (data) {
                          alert(JSON.stringify(data));
                         },
                         scope:"KloutRead,KloutPlusK"
                       });
                    </script>
</head>
<body>
<script>
                     
                       function login(){
                    	   $.ajax({
                 			  url : 'https://api.klout.com/v2/oauth/?apiKey=3ek3fw5cm4hsw42fyk3qhyc3&redirect=http://localhost:8080/enpick/index.jsp',
                 			  dataType: 'json',
                 			  success : function(source) {
                 				  alert(JSON.stringify(source))
                 			  }
                 				  });   
                 			 
                       }
                    </script>
                    <span name="klout-connect" onclick="login()">Use Your Klout</span>
</body>
</html>