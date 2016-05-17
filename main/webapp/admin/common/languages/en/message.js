/********************************************************
English Message
********************************************************/
var industry = {
	brand					:"Brand & Company",
	advertising			:"Advertising/Media/Publisher",
	architecture			:"Architecture",
	automotive			:"Automotive/Industrial", 
	corporate				:"Corporate group", 
	design				:"Design/Decor", 
	entertainment			:"Entertainment", 
	fashion				:"Fashion/Beauty", 
	food					:"Food/Beverage",
	health				:"Health/Medicine/Care",
	technology			:"IT/Technology/Electronics",
	kids					:"Kids/Baby", 
	money					:"Money/Finance", 
	retail				:"Retail", 
	services				:"Services", 
	travel				:"Travel/Leisure",
	other					:"Other",
					
	organization			:"Organization",
	academia				:"Academia", 
	colleges				:"Colleges/Universities", 
	education				:"Education", 
	government			:"Government", 
	media					:"Media", 
	nonprofits			:"Nonprofits", 
	places				:"Places",
	religion				:"Religion",
					
	people				:"People", 
	artists				:"Artists", 
	athletes				:"Athletes", 
	celebrities			:"Celebrities/Fan page", 
	journalist			:"Journalist/Critic", 
	politicians			:"Politicians",
					
	media					:"Media / Entertainment", 
	art					:"Art/Performance", 
	film					:"Film/Music/Books", 
	hobby					:"Hobby/Culture", 
	mobile				:"Mobile/App", 
	sports				:"Sports/Games", 
	networks				:"TV Shows/Networks",
					
	community				:"Community", 
	daily					:"Daily Life", 
	humor					:"Humor", 
	information			:"Information", 
	networking			:"Networking",
					
	global				:"Global", 
	brand					:"Brand / Company", 
	community				:"Community", 
	entertainment			:"Entertainment", 
	organization			:"Organization", 
	people				:"People" 
};

var mess = {
	add_channel: "Please add channel to post",
	image_invalid:"Upload invalid image",
	file_size:"File size limit 4mb",
	message_send:"Message has been send",
	message_save:"Message has been save",
	message_schedule:"Message has been schedule",
	message_delete:"Message has been deleted",
	message_like:"Message has been liked",
	message_unlike:"Message has been unliked",
	error_occured:"Error occured.",
	comment_delete:"Comment has been deleted.",
	comment_post:"Message has been commented on post.",
	message_favorite:"Message has been favorited",
	message_unfavorite:"Message has been unfavorited",
	comment_tweet:"Message has been commented on tweet.",
	choose_date_pass:"You cannot choose a date and time in the past",
	check_login_facebook:"You logined facebook.Do you want logout?",
	brand					:"Brand & Company",
	advertising			:"Advertising/Media/Publisher",
	architecture			:"Architecture",
	automotive			:"Automotive/Industrial", 
	corporate				:"Corporate group", 
	design				:"Design/Decor", 
	entertainment			:"Entertainment", 
	fashion				:"Fashion/Beauty", 
	food					:"Food/Beverage",
	health				:"Health/Medicine/Care",
	technology			:"IT/Technology/Electronics",
	kids					:"Kids/Baby", 
	money					:"Money/Finance", 
	retail				:"Retail", 
	services				:"Services", 
	travel				:"Travel/Leisure",
	other					:"Other",
					
	organization			:"Organization",
	academia				:"Academia", 
	colleges				:"Colleges/Universities", 
	education				:"Education", 
	government			:"Government", 
	media					:"Media", 
	nonprofits			:"Nonprofits", 
	places				:"Places",
	religion				:"Religion",
					
	people				:"People", 
	artists				:"Artists", 
	athletes				:"Athletes", 
	celebrities			:"Celebrities/Fan page", 
	journalist			:"Journalist/Critic", 
	politicians			:"Politicians",
					
	media					:"Media / Entertainment", 
	art					:"Art/Performance", 
	film					:"Film/Music/Books", 
	hobby					:"Hobby/Culture", 
	mobile				:"Mobile/App", 
	sports				:"Sports/Games", 
	networks				:"TV Shows/Networks",
					
	community				:"Community", 
	daily					:"Daily Life", 
	humor					:"Humor", 
	information			:"Information", 
	networking			:"Networking",
					
	global				:"Global", 
	brand					:"Brand / Company", 
	community				:"Community", 
	entertainment			:"Entertainment", 
	organization			:"Organization", 
	people				:"People" 
};

window.ParsleyConfig = window.ParsleyConfig || {};

(function ($) {
  window.ParsleyConfig = $.extend( true, {}, window.ParsleyConfig, {
    messages: {
      // parsley //////////////////////////////////////
        defaultMessage: "This value seems to be invalid."
        , type: {
            email: "This value should be a valid email."
          , url: "This value should be a valid url."
          , urlstrict: "This value should be a valid url."
          , number: "This value should be a valid number."
          , digits: "This value should be digits."
          , dateIso: "This value should be a valid date (YYYY-MM-DD)."
          , alphanum: "This value should be alphanumeric."
          , phone: "This value should be a valid phone number."
        }
      , notnull: "This value should not be null."
      , notblank: "This value should not be blank."
      , required: "This value is required."
      , regexp: "This value seems to be invalid."
      , min: "This value should be greater than or equal to %s."
      , max: "This value should be lower than or equal to %s."
      , range: "This value should be between %s and %s."
      , minlength: "This value is too short. It should have %s characters or more."
      , maxlength: "This value is too long. It should have %s characters or less."
      , rangelength: "This value length is invalid. It should be between %s and %s characters long."
      , mincheck: "You must select at least %s choices."
      , maxcheck: "You must select %s choices or less."
      , rangecheck: "You must select between %s and %s choices."
      , equalto: "This value should be the same."

      // parsley.extend ///////////////////////////////
      , minwords: "This value should have %s words at least."
      , maxwords: "This value should have %s words maximum."
      , rangewords: "This value should have between %s and %s words."
      , greaterthan: "This value should be greater than %s."
      , lessthan: "This value should be less than %s."
      , beforedate: "This date should be before %s."
      , afterdate: "This date should be after %s."
      , americandate:        "This value should be a valid date (MM/DD/YYYY)."
    }
  });
}(window.jQuery || window.Zepto));

