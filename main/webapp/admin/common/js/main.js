/***************************************************************************
 Page Code:	main Frame
 First Author: HocNT
 Version : 0.1
 Created Date: 2013/08/20
 **************************************************************************/


var aoFrm = function()
{ 	 
	var search_url = window.location.search;
	var hash_url = window.location.hash;
	
	var _pageId;
	var _groupId;	
	
	function isNull(obj)
	{
		return (obj==null || typeof obj == 'undefined' || obj == "");
	}
	function getRandomInt(e, t) {
    	return Math.floor(Math.random() * (t - e + 1)) + e;
	}
	
	function getHistory()
	{
		
		try {
	        if (!isNull(config)) {           
	            if (typeof (Storage) !== "undefined") {
	                if (!isNull(localStorage.lang))
	                {
	                	config.main_lang = localStorage.lang; 
	                	return config.main_lang;
	                }else
	                {
	                	return config.main_lang;
	                }
	            }  	            
	            if (!isNull(config)) {               
	            	if (isNull(config.main_lang)) {
	                    alert("Please config Default Language & Themes ( file : config.js )");
	                    return "";
	                }
	            }
	        }
	    } catch (e) {
	        //alert('Config for MainFrame has failed . Please check "config.js" file.');
	    }	
	    return "";
	}
	
	function initLayout()
	{
		
		 /* Left pie Chart */
	/*	 $(".easy-pie-chart-percent").easyPieChart({
            animate: 1e3,
            trackColor: "#444",
            scaleColor: "#444",
            lineCap: "square",
            lineWidth: 15,
            size: 150,
            barColor: function (e) {
                return "rgb(" + Math.round(200 * e / 100) + ", " + Math.round(200 * (1 - e / 100)) + ", 0)"
            }
        }), setInterval(function () {
            return $(".easy-pie-chart, .easy-pie-chart-percent").each(function () {
                var e;
                return e = getRandomInt(0, 80), $(this).data("easyPieChart").update(e), $(this).find("span").text("" + e + "%")
            })
        }, 2500);
		*/
		/* Content Top Chart */
		$('.sparkline[data-color=blue]').sparkline('html', {type: 'bar',barColor: '#6e97aa',height:30,width:120} );
		$('.sparkline[data-color=green]').sparkline('html', {type: 'bar',barColor: '#8fae53',height:30,width:120} );
		$('.sparkline[data-color=red]').sparkline('html', {type: 'bar',barColor: '#c75d5d',height:30,width:120} );
		$('.sparkline[data-color=orange]').sparkline('html', {type: 'bar',barColor: '#ff9f01',height:30,width:120} );
		
		// Script child page content
		$("body").append('<div id="appScript" ></div>');
		 
	}
	
	var loadPage = function()
	{
		if(isNull(search_url))
		{
			if(!isNull(hash_url))
			{				
				search_url = "page=" + hash_url.replace("#","");				
			}else
			{
				search_url = "page=" + config.page_default;
				window.location.hash = config.page_default;
			}
		}					
		_page = search_url.split("page=");				
		if($(_page).size() >0)
		{			
			_pagePath = _page[1].split("/");			
			if($(_pagePath).size() > 0)
			{
				_pageId = _pagePath[1];
				_groupId = _pagePath[0];						 						     
			}						
			loadChildPage(_page[1]);
		}
	};	
	
	var topMenu = function()
	{
		if(config.ajaxLoad)
			{		
            	$("#aoFrm-Header-Right a").click(function (e) {
					
					var url = $(this).attr("href");						
					if(url.search("page=")<0) return;
					
					e.preventDefault();		
					
					$("#navLeft #tree-menu li.folder").removeClass("active");	
					$("#navLeft #tree-menu li.file").removeClass("active");	
					
					var text = $(this).find("span").html();
					var programIcon = $(this).find("i").attr("class");
					programIcon = programIcon.replace("icon-2x","");
					var description = $(this).find("span").html();
										
					$("#aoFrm-Header-Right li").removeClass("active");
					$(this).parent(this).addClass("active");
					
					$(".main-content .header h3 i").attr("class",programIcon);
					$(".main-content .header h3 span").html(text);	
					$(".main-content .header h5").html(description);					
					
					$("#breadcrumbs #lev1").show();
					$("#breadcrumbs #lev2").hide();
					$("#breadcrumbs #lev1 .breadcrumb-arrow").hide();
					$("#breadcrumbs #lev1 .name").html(text);					
					$("#breadcrumbs #lev1 i").attr("class",programIcon);
					$("title").html("Enpick | " + text );			
							
					var _page = url.split("page=");	
					
					window.location.hash = _page[1];	
						
					if($(_page).size() >0)
					{
						var _pagePath = _page[1].split("/");					 
						if($(_pagePath).size() > 0)
						{
							_pageId = _pagePath[1];
							_groupId = _pagePath[0];						 						     
						}						
						loadChildPage(_page[1]);
					} 			   			
            	});
			}				
	};
	
	var leftTree = function (view,path) {
        if (!view) // to load Language 
        {
            $("#navLeft #tree-menu").html("");
            $("#navLeft").addClass("loading");            
        }
        //showWaitingBar(true);
		if(isNull(path))
		{
			_jsPath = "common/languages/" + config.main_lang + "/menulist.js";	
		}else
		{
			_jsPath = path + "menulist.js";
		}
        $.ajax(_jsPath).done(function (data) {
            treeBuild(eval(data), view);
        }).fail(function () {
            alert(getInfoMessage("NO_MENULIST"));
        }).always(function () {
            //showWaitingBar(false);
        });
    };
    // Tree Step 02
    var treeBuild = function (data, view) {
        treeHTML = "";
        for (i = 0; i < data.length; i++) {
            var item = data[i];
            var id = item.id;
            var url = item.url;
            var text = item.text;           
            var expanded = item.expanded;
			var description = item.des;
            var programIcon = item.programIcon;
            var group = item.group;
			
            if (!isNull(group)) id = group + "-" + id;

            var node = item.nodes;

            if (isNull(node)) {
				
				_activeClass ="";				
				if(!isNull(_pageId)){
					
					if(_pageId==item.id)
					{
						_activeClass ="active";	
						$(".main-content .header h3 i").attr("class",programIcon);
						$(".main-content .header h3 span").html(text);	
						$(".main-content .header h5").html(description);					
						$("#breadcrumbs #lev1").show();
						$("#breadcrumbs #lev1 .name").html(text);						
						$("#breadcrumbs #lev1 i").attr("class",programIcon);
						$("title").html("Enpick | " + text );
						
					}
				}
				
                treeHTML += '<li title="' + text + '" class="file nav_' + id + ' ' + _activeClass + '" >\
							<span class="glow"></span><a class="file" href="./?page=' + url + '" title="'+ description + '"><i class="' + programIcon + ' icon-2x" ></i> <span url="' + url + '" class="file" id="' + id + '">' + text + '</span>\
							</a></li>';
                if (view) {
                    $("#navLeft #tree-menu #" + id).html(text);
                }

            } else {
				_activeClass ="";
				if(!isNull(_groupId))
				{
					if(_groupId==group)
					{
						_activeClass ="active";						
						$("#breadcrumbs #lev1").show();
						$("#breadcrumbs #lev1 .name").html(text);						
						$("#breadcrumbs #lev1 i").attr("class",programIcon);
					}
				}
				
				if(isNull(url))
				{
                	treeHTML += '<li class="folder group_' + group + ' clearfix dark-nav ' + _activeClass + " " + expanded + '" ><span class="glow"></span><a class="folder" ><i class="' + programIcon + ' icon-2x" ></i> <span class="folder" id="' + id + '">' + text + '</span><i class="icon-caret-down"></i></a><ul>';
				}else
				{
					treeHTML += '<li class="folder group_' + group + ' clearfix dark-nav ' + _activeClass + " " + expanded + '"><a class="accordion-toggle collapsed folder" href="' + url + '"><i class="' + programIcon + ' icon-2x" ></i> <span class="folder" id="' + id + '">' + text + '</span><i class="icon-caret-down"></i></a> <ul>';
				}
                if (view) // to load Language 
                {
                    $("#navLeft #tree-menu #" + id).html(text);                   
                }

                child = eval(node);

                for (j = 0; j < child.length; j++) {

                    var item1 = child[j];
                    var id1 = item1.id;
                    var url1 = item1.url;
                    var text1 = item1.text;
                    var img1 = item1.img;
					var description1 = item1.des;
                    var expanded1 = item1.expanded;
                    var programIcon1 = item1.programIcon;
                    var group1 = item1.group;

                    if (!isNull(group1)) id1 = group + "-" + id1;

                    var node1 = item1.nodes;

                    if (isNull(node1)) {
						
						_activeClass ="";
						if(!isNull(_pageId))
						{
							if(_pageId==item1.id && _groupId==group1)
							{
								_activeClass ="active";
								$(".main-content .header h3 i").attr("class",programIcon1);
								$(".main-content .header h3 span").html(text1);
								$(".main-content .header h5").html(description1);
								$("#breadcrumbs #lev2").show();
								$("#breadcrumbs #lev1 .breadcrumb-arrow").show();
								$("#breadcrumbs #lev2 .name").html(text1);
								$("#breadcrumbs #lev2 a").attr("href","./?page=" + url1 );
								$("#breadcrumbs #lev2 i").attr("class",programIcon1);
								$("title").html("Enpick | " + text + " - " + text1);
							}
						}
						
						
                        treeHTML += '<li title="' + text1 + '" class="file nav_' + id1 + ' ' + _activeClass +'" group="'+ group1 +'" >\
											<a href="./?page=' + url1 + '" class="file" title="'+ description1 + '"><i class="' + programIcon1 + '" ></i> <span url="' + url1 + '" class="file" id="' + id1 + '">' + text1 + '</span>\
											<span class="amount"></span></a></li>';
                        if (view) {
                            $("#navLeft #tree-menu #" + id1).html(text1);                           
                        }
                    } else {

                        treeHTML += '<li class="folder dark-nav ' + img1 + " " + expanded1 + '"><a class="file" group="' + group1 + '"><span class="folder" id="' + id1 + '">' + text1 + '</span></a><ul>';
                        if (view) // to load Language 
                        {
                            $("#navLeft #tree-menu #" + id1).html(text1);                           
                        }

                        child1 = eval(node);
                        for (k = 0; k < child1.length; k++) {
                            //-----------------------------------------
                            var item2 = child1[k];
                            var id2 = group + "-" + item2.id;
                            var url2 = item2.url;
                            var text2 = item2.text;
                            var img2 = item2.img;
                            var programIcon2 = item2.programIcon;

                            treeHTML += '<li title="' + text2 + '" class="file nav_' + id2 + '" group="'+ group2 +'">\
														 <a class="file" href="' + url2 + '" ><i class="' + programIcon2 + '" ></i><span url="' + url2 + '" class="file" id="' + id2 + '">' + text2 + '</span></i></li>';
                            if (view) // to load Language 
                            {
                                $("#navLeft #tree-menu #" + id2).html(text2);                              
                            }
                        }
                        treeHTML += '</ul></li>';
                    }

                    //-----------------------------------------
                }
                treeHTML += '</ul></li>';
            }
        }

        if (!view) // to load Language 
        { 
			$("#navLeft #tree-menu").append('<ul class="nav nav-collapse collapse nav-collapse-primary" ></ul>');
			$("#navLeft #tree-menu ul").html(treeHTML);			
            checkMenu();
			contentAmount();			
        }
    };
	
	function breadcrumb()
	{
		
	}
	
	/* Amount Content */
	function contentAmount()
	{
		$("#navLeft #tree-menu .group_contents ul li").each(function(index, element) {
            $(this).find(".amount").html('0');
        }); 	
	}

    // Tree Step 03
    var checkMenu = function () {
        if ($("#navLeft #tree-menu").html() != "") { 		
			$("#navLeft #tree-menu .folder a.folder").click(function(e) {
                $(this).parent(this).find("ul").toggle(300);
            });	
			
			//Ajax Loading		
			if(config.ajaxLoad)
			{		            	
				$("#navLeft #tree-menu li.file a").click(function (e) { 
				e.preventDefault();	              
				var url = $(this).attr("href");
				if(url.indexOf("http")>=0){
					url = url.replace("./?page=","");
					window.location = url;
					return;
				}
				group = $(this).parent(this).attr("group");
				
			 	$("#navLeft #tree-menu li.folder").removeClass("active");	
				$("#navLeft #tree-menu li.file").removeClass("active");	
				$("#aoFrm-Header-Right li").removeClass("active");
				
				$(this).parent(this).addClass("active"); 				
			  	$("#navLeft #tree-menu .group_" + group ).addClass("active"); 
				
				var text = $(this).find("span").html();
				var programIcon = $(this).find("i").attr("class");
				programIcon = programIcon.replace("icon-2x","");
				var description = $(this).attr("title");
								
				
				if(isNull(group))
				{
					$(".main-content .header h3 i").attr("class",programIcon);
					$(".main-content .header h3 span").html(text);	
					$(".main-content .header h5").html(description);
										
					$("#breadcrumbs #lev1").show();
					$("#breadcrumbs #lev1 .breadcrumb-arrow").hide();
					$("#breadcrumbs #lev2").hide();
					$("#breadcrumbs #lev1 .name").html(text);
					$("#breadcrumbs #lev1 a").attr("href","./?page=" + url );
					$("#breadcrumbs #lev1 i").attr("class",programIcon);
					$("title").html("Enpick | " + text );
					
					
				}else
				{
					var p_text = $("#navLeft #tree-menu .folder." + "group_" + group + " a.folder span").html();
					var p_programIcon = $("#navLeft #tree-menu .folder." + "group_" + group + " a.folder i").attr("class");
				
					$("#breadcrumbs #lev1").show();
					$("#breadcrumbs #lev1 .name").html(p_text);						
					//$("#breadcrumbs #lev1 i").attr("class",p_programIcon);
						
					$(".main-content .header h3 i").attr("class",programIcon);
					$(".main-content .header h3 span").html(text);
					$(".main-content .header h5").html(description);
					
					
					$("#breadcrumbs #lev2").show();
					$("#breadcrumbs #lev1 .breadcrumb-arrow").show();
					$("#breadcrumbs #lev2 .name").html(text);				
					$("#breadcrumbs #lev2 i").attr("class",programIcon);
					$("title").html("Enpick | " + p_text + " - " + text);
				}	
				
				var _page = url.split("page=");	
				window.location.hash = _page[1];	
				if($(_page).size() >0)
				{
					var _pagePath = _page[1].split("/");					 
					if($(_pagePath).size() > 0)
					{
						_pageId = _pagePath[1];
						_groupId = _pagePath[0];						 						     
					}						
					loadChildPage(_page[1]);
				} 			   			
            	});
			}						        
        } else {
            setTimeout(checkMenu, 100);
        }
    };	
	
    function menuTopReloadLang()
    {    	
    	setTimeout(function(){
			$("#aoFrm-Header-Right ." + _pageId).addClass("active");
			var text = $("#aoFrm-Header-Right ." + _pageId + " span").html();			
			var programIcon = $("#aoFrm-Header-Right ." + _pageId + " i").attr("class");
			var description = text;
			$(".main-content .header h3 i").attr("class",programIcon);
			$(".main-content .header h3 span").html(text);	
			$(".main-content .header h5").html(description);					
			
			$("#breadcrumbs #lev1").show();
			$("#breadcrumbs #lev1 .name").html(text);			
			$("#breadcrumbs #lev1 i").attr("class",programIcon);
			$("title").html("Enpick | " + text );				
		},100);
    }
	function loadChildPage(url)
	{
		var _url = "module/view/" + url + ".jsp";
		var js_link = '<script type="text/javascript" src="module/js/' + url + '.js" ></script>';
		
        var css_link = '<link href="module/css/' + url + '.css" rel="stylesheet" type="text/css" media="all" />';
		var lang_js = "module/languages/" + config.main_lang + "/" + url + ".js";
		$("#aoFrm-content").addClass("loading");
		$("#aoFrm-content").empty();
		$("#appScript").empty().append(css_link);
		$("body").attr("class",url.replace("/","_")+ "_page");
		if(_groupId=="topnavi")
		{
			menuTopReloadLang();			
		}		
		$.ajax({
			url: _url,
		  	cache: false
			}).done(function (data) {
            	$("#aoFrm-content").empty().append(data);
            	$("#aoFrm-content form").each(function(index, element) {                   
					validate_auto(element);
                });
				
				$("#aoFrm-content").removeClass("loading");
				/*
				if(!config.ajaxLoad)
				{	
					$("#appScript").append('<script src="common/javascripts/application.js" type="text/javascript"></script>'); 
				}
				*/
		
				$("#appScript").append(js_link);
				aoFrmUI();				
       			language_get("#aoFrm-content", lang_js);										
        	}).fail(function () {
        		var sUrl = document.URL;
        		//trick for anti refresh in login page
        		if (sUrl.search("login.jsp")<0 && sUrl.search("sign_up.jsp") <0 ){
        			
        			window.location = "login.jsp";
        		}
           		//alert("Page not found");
				//$("#aoFrm-content").html('<div class="page_not_found" >Page Not Found</div>');
        		
				$("#aoFrm-content").removeClass("loading");
				/*
				if(!config.ajaxLoad)
				{	
					$("#appScript").append('<script src="common/javascripts/application.js" type="text/javascript"></script>'); 
				}
				*/	
       	 	}).always(function () {
				$("#aoFrm-content").removeClass("loading");
            	//showWaitingBar(false);
        	});
	}
	
	// Check List
	var aoFrmUI = function(parent)
	{
		//alert(parent);
		var obj = "";
		if(!isNull(parent)){
			obj = parent + " ";
		}
			
		$(obj + ".box-list.check .pull-right").click(function(e) {
			if($(this).hasClass("checked"))
			{
				$(this).find("i").attr("class","icon-check-empty");
				$(this).removeClass("checked");
			}else
			{
				$(this).find("i").attr("class","icon-check");
				$(this).addClass("checked");
			}
    	});	
		
		$(obj + ".dTable").dataTable({
            bJQueryUI: !1,
            bAutoWidth: !1,
            sPaginationType: "full_numbers",
            sDom: '<"table-header"fl>t<"table-footer"ip>'
        });
		
	};
	
	var messageLoad = function()
	{		
		config.main_lang;
		var js_link = '<div id="messageLoad" ><script type="text/javascript" src="common/languages/' + config.main_lang + '/message.js" ></script></div>';
		$("#messageLoad").remove();
		$("body").append(js_link);	
	};
	
	    /* Language Load */
    var language_get = function (parent, file) {
        $.ajax(file).done(function (data) {
            var data = eval(data);
            if (isNull(data)) return;
            data = data[0];
            item_key = _.keys(data);
            item_val = _.values(data);
            $.each(item_key, function (i) {

                if (!isNull(item_val[i])) {
                    if (_.isArray(item_val[i])) {

                    } else {
                        if (!isNull(item_key)) {                           									
                            txt = item_key[i].replace("__", "");
                            if ($("html").hasClass("ie8")) {
                                $(parent + " p[text=" + txt + "]").html(item_val[i]);
                                $(parent + " b[text=" + txt + "]").html(item_val[i]);
                                $(parent + " li[text=" + txt + "]").html(item_val[i]);
                                $(parent + " div[text=" + txt + "]").html(item_val[i]);
                                $(parent + " label[text=" + txt + "]").html(item_val[i]);
                                $(parent + " span[text=" + txt + "]").html(item_val[i]);
                                $(parent + " input[text=" + txt + "]").attr("placeholder", item_val[i]);
                                $(parent + " input[text=" + txt + "]").html("");
                                return;
                            }
                            $(parent + " *[text=" + txt + "]").html(item_val[i]);
                            $(parent + " input[text=" + txt + "]").attr("placeholder", item_val[i]);
                            $(parent + " input[text=" + txt + "]").html("");
                        }
                    }
                }
            });            
        }).fail(function () {
            //alert("FILE NOT FOUND");
            //alert(getInfoMessage("NO_MENULIST"));
        }).always(function () {
            showWaitingBar(false);
        });
    };	
	
	var mfrLangguages = function () {
        lang_js = "common/languages/" + config.main_lang + "/mainframe.js";
        language_get("#aoFrm", lang_js);
    };
	 /* Language Load */
    var language_get = function (parent, file) {        
		$.ajax(file).done(function (data) {
            var data = eval(data);
            if (isNull(data)) return;
            data = data[0];
            item_key = _.keys(data);
            item_val = _.values(data);
            $.each(item_key, function (i) {

                if (!isNull(item_val[i])) {
                    if (_.isArray(item_val[i])) {

                    } else {
                        if (!isNull(item_key)) {
                            //alert(item_key[i]);
                            //alert(item_val[i]);									
                            txt = item_key[i].replace("__", "");
                            if ($("html").hasClass("ie8")) {
                                $(parent + " p[text=" + txt + "]").html(item_val[i]);
                                $(parent + " td[text=" + txt + "]").html(item_val[i]);
                                $(parent + " th[text=" + txt + "]").html(item_val[i]);
                                $(parent + " b[text=" + txt + "]").html(item_val[i]);
                                $(parent + " li[text=" + txt + "]").html(item_val[i]);
                                $(parent + " div[text=" + txt + "]").html(item_val[i]);
                                $(parent + " label[text=" + txt + "]").html(item_val[i]);
                                $(parent + " span[text=" + txt + "]").html(item_val[i]);
                                $(parent + " input[text=" + txt + "]").attr("placeholder", item_val[i]);
                                $(parent + " input[text=" + txt + "]").html("");
                                return;
                            }
                            $(parent + " *[text=" + txt + "]").html(item_val[i]);
                            $(parent + " input[text=" + txt + "]").attr("placeholder", item_val[i]);
                            $(parent + " input[text=" + txt + "]").html("");
                        }
                    }
                }
            });            
        }).fail(function () {
            //alert("FILE NOT FOUND");
            //alert(getInfoMessage("NO_MENULIST"));
        }).always(function () {
            //showWaitingBar(false);
        });
    };
	
	/*----------------------------------------------------
	 Validation handler
	 ----------------------------------------------------*/
    // Input Mask
    var validate_auto = function (parent) { 		    
	    $(parent).parsley();		
        $(parent).find("input[data-mask=date]").inputmask("d/m/y", {
            "placeholder": "dd/mm/yyyy"
        }); //multi-char placeholder
        $(parent).find("input[data-mask=number]").inputmask({
            "mask": "9",
            "repeat": 10,
            "greedy": false
        }); // ~ mask "9" or mask "99" or ... mask "9999999999"
        $(parent).find("input[data-mask=tax]").inputmask({
            "mask": "99-9999999"
        }, {
            "placeholder": "99-9999999"
        }); //specifying options only
        $(parent).find("input[data-mask=phone]").inputmask("mask", {
            "mask": "(999) 999-9999"
        }, {
            "placeholder": "(999)-999-9999"
        }); //specifying fn & options
        $(parent).find("input[data-mask=currency]").inputmask('$ 999.999.999,99', {
            numericInput: true
        }); //123456  =>  â‚¬ ___.__1.234,56
        $(parent).find("input[data-mask=ssn]").inputmask("999-99-9999", {
            placeholder: " ",
            clearMaskOnLostFocus: true
        }, {
            "placeholder": "999-99-9999"
        }); //default
        $(parent).find("input[data-mask=decimal]").inputmask('decimal', {
            rightAlignNumerics: false
        }); //disables the right alignment of the decimal input	
    };

    // Validation Parsley Check
    var validate_check = function (parent) {   
    	
		if(isNull(parent))
		{
			parent = "#aoFrm-content";
			
		}			
        $(parent + " form").parsley('validate');
				
        if($(parent + " form").parsley('isValid')) {
           $(parent + " .alert-error").addClass("hide");
           $(parent + " .alert-success").removeClass("hide");
           return true;
        }
        $(parent + " .alert-error").removeClass("hide");        
        return false;
    };
	
	var notification_center = function(mess,type)
	{
		$("#aoFrm-notification .btnClose").click(function(e) {
            $("#aoFrm-notification").fadeOut();
        });
		if(type=="alert")
		{
			$("#aoFrm-notification").fadeIn();
			$("#aoFrm-notification").css("background","rgba(204,0,0,0.7)");
			$("#aoFrm-notification .text").html(mess);
			$("#aoFrm-notification .btnClose").show();
		}		
		if(type=="mess")
		{
			$("#aoFrm-notification").fadeIn();
			$("#aoFrm-notification .text").html(mess);
			$("#aoFrm-notification").css("background","rgba(0,0,0,0.7)");
			$("#aoFrm-notification .btnClose").hide();
			setTimeout(function(){
				$("#aoFrm-notification").fadeOut();	
			},2000);
		}
		if(type=="close")
		{
			$("#aoFrm-notification").fadeOut();
		}
	};
	
	
	return {
        		init: function (){
        			getHistory();
        			initLayout();
					leftTree();
					loadPage();					
					mfrLangguages();
					topMenu();
					messageLoad();
				},
				getLang: function()
				{
					return getHistory();	
				},
				loadMessage: function()
				{
					messageLoad();
				},
				setLang: function(parent,file)
				{
					getHistory();					
					lang_js = "module/languages/" + config.main_lang + "/" + file + ".js";
					language_get(parent,lang_js);
				},
				reloadLang: function(parent,lang)
				{
					var hash_url = window.location.hash;
					if(!isNull(lang)){
						config.main_lang = lang;
						if (typeof (Storage) !== "undefined") {
							localStorage.lang = lang;              
			            }
						parent = "#aoFrm-content";
						leftTree(true);
						mfrLangguages();
						messageLoad();
					}
					//language for group member
					
					var jsLang = "module/languages/" + config.main_lang + "/" + hash_url.replace("#","") + ".js";					
					language_get(parent,jsLang);
					
					if(_groupId=="topnavi")
					{
						menuTopReloadLang();			
					}					
				},
				validation : function(parent)
				{
				return validate_check(parent);
				},
				gui : function(parent)
				{					
					aoFrmUI(parent);
				},
				page:function(url)
				{
					loadChildPage(url);
				},
				mess:function(text,type)
				{
					notification_center(type,text);
				}
        	};
	
}();

var count_all=0;
var count_schedule=0;
var count_draft=0;
var count_send=0;
$(document).ready(function(e) {
	
	/************change-languages********/
	$(".menu_languages li a").click(function(){		
		aoFrm.reloadLang("",$(this).attr("type"));
	});
	
    d_h = $(document).innerHeight() - $("#aoFrm-Header").innerHeight() - $("#aoFrm-copyright").innerHeight() - 20;
	$(".main-content").css("min-height",d_h);
	$("#aoFrm-copyright").show();
	
	$(window).resize(function(e) {		
		 $(".main-content").css("min-height","");
         setTimeout(function(){
		 	d_h =	$(document).innerHeight() - $("#aoFrm-Header").innerHeight()  - $("#aoFrm-copyright").innerHeight() - 20;
		 	$(".main-content").css("min-height",d_h);
		 	$("#aoFrm-copyright").show();
		 },50);
    });
	

	
});




