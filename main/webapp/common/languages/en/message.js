/********************************************************
English Message
********************************************************/
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
	report_exceed:"Report exceeds 1.000 posts.",
	message_save_brand_keyword:"Brand Keyword has been save",
	message_delete_brand_keyword:"Brand Keyword has been delete",
	message_save_competitors:"Competitors has been save",
	message_delete_competitors:"Competitors has been delete",
	message_page_empty:"Please enter a page",
	message_nodata:"No Data",
	pleaseconnect:"Please connect a channel to use.",
	pleasewritter:"Please write a message.",
	pleasechoosechannel:"Please choose a channel.",
	nokeyword:"No Keyword",
	pleaseaddkeyword:"Please add a keyword to search.",
	nodatasearch:"No data from facebook",
	channelcompare:"No channel twitter. Please connect channel twitter to compare.",
	channelcomparefb:"No channel facebook. Please connect channel facebook to compare.",
	nopage:"You haven't yet any facebook page. Please create a page to use.",
	checkkeyword:"Please enter a keyword",
	choosesocial:"Please choose a social network to connect.",
	message_follwing:"You has been following",
	message_addfriend:"You has been add friend",
	user_update:"User has been updated.",
	invite_sent:"Your invitation has been sent",
	delete_profile:"Delete profile complete",
	delete_member:"Delete member complete",
	choosepage:"Choose Facebook pages to connect",
	delete_confirm_member:"Do you want delete member?",
	message_delete_message:"Do you want delete message?",
	confirm_delete_profile:"Deleting a profile will permanently remove the data.\n - Scheduled Messages \n - Users & Group data",
	message_save_task:"Task has been save",
	message_update_task:"Task has been update",
	message_exprire:"Your trial period has ended.",
	file_invalid:"File invalid",
	message_error_page:"Upload Error.\n Page Id not correct or content duplicate on twitter or facebook ",
	message_select_download:"Please choose a post to download sample file",
	message_select_post:"Please choose a post to comment",
	password_update:"Password has been updated",
	password_update_wrong:"Old Password not match"
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

