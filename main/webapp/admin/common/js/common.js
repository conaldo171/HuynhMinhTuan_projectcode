/*******************************************************************************
 * Page Code: First Author: Created Date:
 ******************************************************************************/

/* Erro Handler */
function _log(source, e) {
	console.log(source);
}

/*******************************************************************************
 * public:formatDateInGrid
 ******************************************************************************/
var defaultCal = "KO";

function formatDate(inputDate, nation) {
	try {
		var date;
		if (checkEmptyValue(inputDate))
			date = new Date();
		else
			date = new Date(inputDate);

		if (checkEmptyValue(nation))
			nation = defaultCal;

		var sMonth = "0" + (date.getMonth() + 1);
		sMonth = sMonth.substr(sMonth.length - 2);
		var sDay = "0" + date.getDate();
		sDay = sDay.substr(sDay.length - 2);

		var sDate = inputDate;
		if (nation.toUpperCase() == "KO")
			sDate = date.getFullYear() + "-" + sMonth + "-" + sDay;
		else if (nation.toUpperCase() == "KO2")
			sDate = date.getFullYear() + "/" + sMonth + "/" + sDay;
		else if (nation.toUpperCase() == "EN")
			sDate = sMonth + "-" + sDay + "-" + date.getFullYear();
		else if (nation.toUpperCase() == "VN")
			sDate = sDay + "-" + sMonth + "-" + date.getFullYear();
		else if (nation.toUpperCase() == "PURE")
			sDate = date.getFullYear() + sMonth + sDay;

		return sDate;
	} catch (e) {
		if (debugMode)
			throw e;
		else {
			_log("getInfoMessage", e);
		}
	}
}

/*******************************************************************************
 * enumerateObject
 ******************************************************************************/
function enumerateObject(obj) {
	try {
		var property, propCollection = "";

		for (property in obj) {
			propCollection += (property + "==>" + obj[property] + "\n");
		}

		return propCollection;
	} catch (e) {
		if (debugMode)
			throw e;
		else {
			_log("getInfoMessage", e);
		}
	}
}

/*******************************************************************************
 * convert Object to Array
 ******************************************************************************/
function converObjectToArray(obj){
	var arrObj = new Array();
	var property, propCollection = "";
	for (property in obj) {
		var childObj = {"key":property,"value":obj[property]};
		arrObj.push(childObj);
	}

	return arrObj;
}

/*******************************************************************************
 * convert value of Object to Array
 ******************************************************************************/
function converValueObjectToArray(obj){
	var arrObj = new Array();
	var property, propCollection = "";
	for (property in obj) {
		arrObj.push(obj[property]);
	}
	return arrObj;
}

/*******************************************************************************
 * enumerateObject
 ******************************************************************************/
function enumerateArray(arr) {
	try {
		var sReturn = "";
		for ( var i = 0; i < arr.length; i++) {
			sReturn += "[" + i + "]\n";
			sReturn += enumerateObject(arr[i]);
		}

		return sReturn;
	} catch (e) {
		if (debugMode)
			throw e;
		else {
			_log("getInfoMessage", e);
		}
	}
}

/*******************************************************************************
 * enumerateObject
 ******************************************************************************/
function isNull(obj) {
	return (obj == null || typeof obj == 'undefined' || obj == "");
}

/*******************************************************************************
 * parseXMLItemAttr
 ******************************************************************************/
function parseXMLItemAttr(node) {
	try {
		var obj = new Object();

		$.each(node.attributes, function(i, attrib) {
			obj[attrib.name] = attrib.value;
		});

		return obj;
	} catch (e) {
		if (debugMode)
			throw e;
		else {
			_log("getInfoMessage", e);
		}
	}
}

/*******************************************************************************
 * multi-language
 ******************************************************************************/

var defaultLang = "EN";

/*******************************************************************************
 * getInfoMessage
 ******************************************************************************/
function getInfoMessage(messageID, lang) {
	try {
		var langMessages;
		if (lang == null)
			lang = defaultLang;

		lang = lang.toUpperCase();

		langMessages = this[config.main_lang + "_Messages"];

		if (isNull(langMessages[messageID]))
			return messageID;

		return langMessages[messageID];
	} catch (e) {
		if (debugMode)
			throw e;
		else {
			_log("getInfoMessage", e);
		}
	}
}

/*******************************************************************************
 * IsEmail
 ******************************************************************************/
function IsEmail(email) {
	try {
		var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return regex.test(email);
	} catch (e) {
		if (debugMode)
			throw e;
		else {
			_log("IsEmail", e);
		}
	}

}
/*******************************************************************************
 * formatDateInputGridone
 ******************************************************************************/
function formatDateInputGridone(date) {
	try {
		var year = date.substring(0, 4);
		var month = date.substring(4, 6);
		var date = date.substring(6, 8);
		var datetimeFull = year + "-" + month + "-" + date;
		return datetimeFull;
	} catch (e) {
		if (debugMode)
			throw e;
		else {
			_log("formatDateInputGridone", e);
		}
	}
}
/*******************************************************************************
 * formatDateOutputGridone
 ******************************************************************************/
function formatDateOutputGridone(date) {
	try {
		var str = date.split("-");
		var date = str[0] + str[1] + str[2];
		return date;
	} catch (e) {
		if (debugMode)
			throw e;
		else {
			_log("formatDateOutputGridone", e);
		}
	}

}
/*******************************************************************************
 * formatTimeStamp
 ******************************************************************************/
function formatTimeStamp(date) {

	try {
		var date_Obj = new Date(date);
		var dateformat;
		var PM = "AM";
		var hour = date_Obj.getHours();
		var date = date_Obj.getDate();
		var month = date_Obj.getMonth();
		var minute = date_Obj.getMinutes();
		if (minute < 10)
			minute = "0" + minute;
		if (month < 10)
			month = "0" + month;
		if (date < 10)
			date = "0" + date;
		if (hour > 12) {
			hour = hour - 12;
			PM = "PM";
		}
		dateformat = date_Obj.getFullYear() + "-" + month + "-" + date + "-"
				+ PM + "-" + hour + ":" + minute;
		return dateformat;
	} catch (e) {
		if (debugMode)
			throw e;
		else {
			_log("formatDateOutputGridone", e);
		}
	}
}
function formatDate(date) {

	try {
		var date_Obj = new Date(date);
		var dateformat;
		var PM = "AM";
		var date = date_Obj.getDate();
		var month = date_Obj.getMonth()+1;
		if (month < 10)
			month = "0" + month;
		if (date < 10)
			date = "0" + date;
		
	
		dateformat = date_Obj.getFullYear() + "-" + month + "-" + date ;
		return dateformat;
	} catch (e) {
		if (debugMode)
			throw e;
		else {
			_log("formatDateOutputGridone", e);
		}
	}
}
function formatDateCurrent(){
	try {
		var date_Obj = new Date();
		var dateformat;
		var PM = "AM";
		var hour = date_Obj.getHours();
		var date = date_Obj.getDate();
		var month = date_Obj.getMonth()+1;
		var minute = date_Obj.getMinutes();
		var second=date_Obj.getSeconds();
        
		if (minute < 10)
			minute = "0" + minute;
		if (month < 10)
			month = "0" + month;
		if (date < 10)
			date = "0" + date;
		if (second < 10)
			second = "0" + second;
		if (hour > 12) {
			hour = hour - 12;
			PM = "PM";
		}
		dateformat = date_Obj.getFullYear() + "-" + month + "-" + date;
		return dateformat;
	} catch (e) {
		if (debugMode)
			throw e;
		else {
			_log("formatDateCurrent", e);
		}
	}
}


function formatDateGMT(date){
	try {
		var datetime="";
		if($.browser.msie){
			datetime =date.replace("+0000","");	
		}
		else
			datetime=date;
		var date_Obj = new Date(datetime);

		var dateformat;
		var PM = "AM";
		var date = date_Obj.getDate();
		var month = date_Obj.getMonth()+1;
		var hour = date_Obj.getHours();
		var minute = date_Obj.getMinutes();
		var second=date_Obj.getSeconds();
		if (month < 10)
			month = "0" + month;
		if (date < 10)
			date = "0" + date;
		if (hour > 12) {
			hour = hour - 12;
			PM = "PM";
		}
		if(minute<10)
			minute="0"+minute;
		if(second<10)
			second="0"+second;
		dateformat = date_Obj.getFullYear() + "-" + month + "-" + date + " at " +hour +":"+ minute+":"+second +" "+PM;

		return dateformat;
	} catch (e) {
		if (debugMode)
			throw e;
		else {
			_log("formatDateOutputGridone", e);
		}
	}
}
/*******************************************************************************
 * setCookie
 ******************************************************************************/
function setCookie(c_name, value, exdays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value = escape(value)
			+ ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
	document.cookie = c_name + "=" + c_value;
}
/*******************************************************************************
 * getCookie
 ******************************************************************************/
function getCookie(c_name) {
	var c_value = document.cookie;
	var c_start = c_value.indexOf(" " + c_name + "=");
	if (c_start == -1) {
		c_start = c_value.indexOf(c_name + "=");
	}
	if (c_start == -1) {
		c_value = null;
	} else {
		c_start = c_value.indexOf("=", c_start) + 1;
		var c_end = c_value.indexOf(";", c_start);
		if (c_end == -1) {
			c_end = c_value.length;
		}
		c_value = unescape(c_value.substring(c_start, c_end));
	}

	return c_value;

}



function replaceURLWithHTMLLinks(text) {
    var exp = /(\b(https?|ftp|file):\/\/([-A-Z0-9+&@#%?=~_|!:,.;]*)([-A-Z0-9+&@#%?\/=~_|!:,.;]*)[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(exp, "<a style='color: #0088CC' href='$1' target='_blank'>$1</a>");
}
function toTimestamp(strDate){
	var datetime=strDate.toString();
	 if($.browser.msie){
			datetime =datetime.replace("+0000","");	
			
		}
		else
			datetime=strDate;
	 var date_Obj = new Date(datetime);
	 var datum = Date.parse(date_Obj);
	 return datum/1000;
}


	function htmlEscape(str) {
	    return String(str)
	            .replace(/&/g, '&amp;')
	            .replace(/"/g, '&quot;')
	            .replace(/'/g, '&#39;')
	            .replace(/</g, '&lt;')
	            .replace(/>/g, '&gt;');
	}

	function htmlUnescape(value){
	    return String(value)
	        .replace(/&quot;/g, '"')
	        .replace(/&#39;/g, "'")
	        .replace(/&lt;/g, '<')
	        .replace(/&gt;/g, '>')
	        .replace(/&amp;/g, '&');
	}
	function connectFberror()
	{
		aoFrm.mess("alert","Could not connect facebook, please try again");
		$("#dashboard_dashboard .content_right .block_content").css("opacity","1");
		$("#dashboard_dashboard .itemLoading").hide();
		return false;	
	}
	
	









 
