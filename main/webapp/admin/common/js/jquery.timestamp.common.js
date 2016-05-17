/* 
 * TeamKloud Common jquery function and object
 */

/*
 * Timestamp plugin
 */
(function($) {
    $.timestamp = $.timestamp || {};
    $.extend($.timestamp, {
        monthNames: [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ],
        AmPm : ["AM","PM"],
        toShortDateFormat:function(d){
            return $.timestamp.monthNames[d.getMonth()] + " " + d.getDate();
        },
        toLongDateFormat:function(d){
            return $.timestamp.monthNames[d.getMonth()] + " " + d.getDate() + "," + d.getFullYear();
        },
        toShortTimeFormat:function(d){
            var hour = d.getHours();
            var ap = hour >= 12 ? $.timestamp.AmPm[1] : $.timestamp.AmPm[0],
            hour = hour <= 12 ? hour : hour - 12;
            hour = hour == 0 ? 12 : hour;
            hour = ((hour < 10) ? '0' : '') + hour;
            var min = (d.getMinutes()<10?'0':'') + d.getMinutes();
            return hour + ":" + min + " " + ap;
        },        
        renderRelativeTime:function(nowt, ut){
            var diff = nowt.getTime() - ut.getTime();
            var seconds = diff / 1000;
            var days = Math.floor(seconds / 86400);
            var months = Math.floor(seconds / 2419200);
            if (nowt.getFullYear() == ut.getFullYear() && nowt.getMonth() == ut.getMonth() && nowt.getDate() == ut.getDate()) {
                return "Today at " + $.timestamp.toShortTimeFormat(ut);
            } else {
                if (days < 1) {
                    return "Yesterday";
                }
                if (months < 12) {
                    //.toLocaleFormat( "%A, %B %e, %Y" ) ); 
                    return $.timestamp.toShortDateFormat(ut);
                } else {
                    return $.timestamp.toLongDateFormat(ut);
                }

            }			
        },        
        setTimeStamp:function(e){
            var nowt = new Date();
            var utick= + $(e).attr('data-utime');
            var utime = new Date(utick);
            var st= $.timestamp.renderRelativeTime(nowt, utime);
            $(e).text(st);
            $(e).attr('title', utime.toLocaleString());
        }
    });
    
    $.fn.timestamp = function() {
        return $(this).find("abbr.sttime").each(function () {
            $.timestamp.setTimeStamp(this);
        });
    };
    $.fn.simpleParseDate=function(d,format){
        try{
            //just support yyyy,MM,dd
            var iY=format.indexOf('yyyy');
            var sY=d.substr(iY,4);
            var iM=format.indexOf('MM');
            var sM=d.substr(iM,2);
            var iD=format.indexOf('dd');
            var sD=d.substr(iD,2);
            return new Date(parseInt(sY,10), (parseInt(sM,10)-1), (parseInt(sD,10)));
        }catch(e){
            return new Date();
        }
    };
    $.fn.getDaysInMonth=function(d){
        var days=32 - new Date(d.getFullYear(), d.getMonth(), 32).getDate();
        return days;
    };
    //d: date, start: start of week(0:sun,mon:1,...)
    $.fn.getStartWeek=function(d,start){        
        var dw=d.getDay();//return 0 to 6
        var diff=start<=dw?(dw-start):(7+(dw-start));
        var d1=new Date(d);
        d1.setDate(d.getDate()-diff);
        return d1;
    };
    //d: date, start: start of week(0:sun,mon:1,...)
    $.fn.getEndWeek=function(d,start){ 
        var end=(start-1>=0)?start-1:6;
        var dw=d.getDay();//return 0 to 6
        var diff=end>=dw?(end-dw):(7+(end-dw));
        var d1=new Date(d);
        d1.setDate(d.getDate()+diff);
        return d1;
    };
    $.fn.formatDate=function(d,format){
        //just support: yyyy,yy,MM,MMM,MMMMM,dd,HH,mm,ss,a
        //format as java uniform http://docs.oracle.com/javase/1.4.2/docs/api/java/text/SimpleDateFormat.html
        var month=d.getMonth();//0-11
        var year=d.getFullYear();//4 digits
        var day=d.getDate();//1-31
        var hour=d.getHours();//0-23
        var minute=d.getMinutes();//0-59
        var second=d.getSeconds();//0-59
        //year
        var result=format;
        if(result.indexOf('yyyy')>=0)
            result=result.replace('yyyy',year+'');
        if(result.indexOf('yy')>=0)
            result=result.replace('yy', (year+'').substr(2,2));
        //am pm
        var a=(hour<12)?$.timestamp.AmPm[0] : $.timestamp.AmPm[1];
        var fa=false;
        if(result.indexOf('a')>=0){              
            result=result.replace('a', a);
            fa=true;
        }
        //month
        if(result.indexOf('MMMMM')>=0)
            result=result.replace('MMMMM', $.timestamp.monthNames[month]);
        if(result.indexOf('MMM')>=0)
            result=result.replace('MMM', $.timestamp.monthNames[month].substr(0, 3));
        if(result.indexOf('MM')>=0)
            result=result.replace('MM', ((month+1)>9?'':'0')+(month+1));
        //day
        if(result.indexOf('dd')>=0)              
            result=result.replace('dd',(day>9?'':'0')+ day);        
        //hours
        if(result.indexOf('HH')>=0){
            var hh=hour;
            if(fa){
                hh = hh < 12 ? hh : hh - 12;
                hh = hh == 0 ? 12 : hh;
            }
            hh=hh>9?(''+hh):('0'+hh);
            result=result.replace('HH', hh);
        }
        //minute
        if(result.indexOf('mm')>=0)              
            result=result.replace('mm', (minute>9?(''+minute):('0'+minute)));
        if(result.indexOf('ss')>=0)            
            result=result.replace('ss', (second>9?(''+second):('0'+second)));
        
        return result;
    };
}($));



(function ($) {
    $.fn.extend({
        inputWatermark: function () {
            return this.each(function (){
                // retrieve the value of the ‘placeholder’ attribute
                var watermarkText = $(this).attr('placeholder');
                $(this).css('background-color','#fff');
                var $this = $(this);
                if ($this.val() == '') {
                    $this.val(watermarkText);
                    // give the watermark a translucent look
                    $this.css({
                        'opacity': '0.7'
                    });                    
                }

                $this.blur(function () {
                    if ($this.val() == '') {
                        // If the text is empty put the watermark
                        // back
                        $this.val(watermarkText);
                        // give the watermark a translucent look
                        $this.css({
                            'opacity': '0.7'
                        });
                    }
                });

                $this.focus(function () {
                    if ($this.val() == watermarkText) {
                        $this.val('');
                        $this.css({
                            'opacity': '1.0'
                        });
                    }
                });                 
            });
        }
    });
})(jQuery);
