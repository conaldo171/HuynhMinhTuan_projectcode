/********************************************************
English Message
********************************************************/
var mess = {
	add_channel: "게시하도록 채널을 추가하십시오",
	image_invalid:"업로드할 이미지를 선택해 주십시오.",
	file_size:"업로드할 파일 사이즈는 4MB 이하입니다.",
	message_send:"컨텐츠가 발행되었습니다.",
	message_save:"컨텐츠가 저장되었습니다.",
	message_schedule:"컨텐츠 발행이 예약되었습니다.",
	message_delete:"컨텐츠가 삭제되었습니다.",
	message_like:"컨텐츠가 링크되었습니다.",
	message_unlike:"컨텐츠 링크가 취소되었습니다.",
	error_occured:"오류가 있습니다.",
	comment_delete:"코멘트가 삭제되었습니다.",
	comment_post:"코멘트가 등록되었습니다.",
	message_favorite:"favorite 되었습니다.",
	message_unfavorite:"favorite가 취소되었습니다.",
	comment_tweet:"코멘트가 등록되었습니다.",
	choose_date_pass:"이미 지난 시간은 등록하실 수 없습니다.",
	check_login_facebook:"페이스북으로 로그인하셨습니다. 로그 아웃하시기를 원합니까?",
	report_exceed:"보고서는 1.000 포스트를 초과합니다.",
	message_save_brand_keyword:"입력하신 키워드가 저장되었습니다.",
	message_delete_brand_keyword:"입력하신 키워드가 삭제되었습니다.",
	message_save_competitors:"경쟁사가 저장되었습니다.",
	message_delete_competitors:"경쟁사가 삭제되었습니다.",
	message_page_empty:"페이지를 등록해 주십시오.",
	message_nodata:"조회할 데이터가 없습니다.",
	pleaseconnect:"ENPICK에서 관리하실 소셜미디어를 등록해 주십시오.",
	pleasewritter:"컨텐츠를 입력해 주십시오.",
	pleasechoosechannel:"발행할 소셜미디어를 선택해 주십시오.",
	nokeyword:"키워드가 없습니다.",
	pleaseaddkeyword:"키워드를 등록해 주십시오.",
	nodatasearch:"조회할 데이터가 없습니다.",
	channelcompare:"비교를 원하시는 트위터를 선택해 주십시오.",
	channelcomparefb:"비교를 원하시는 트위터를 선택해 주십시오.",
	nopage:"You don't have a page. Please create a page to use.",
	checkkeyword:"키워드를 등록해 주십시오",
	choosesocial:"등록할 소셜미디어를 선택해 주십시오.",
	message_follwing:"팔로윙되었습니다.",
	message_addfriend:"친구로 추가 되었습니다.",
	user_update:"정보가 수정되었습니다.",
	invite_sent:"그룹 초대 메일이 발송되었습니다.",
	delete_profile:"프로필 정보가 삭제되었습니다.",
	delete_member:"팀원 정보가 삭제되었습니다.",
	choosepage:"등록할 페이스북 페이지를 선택해 주십시오.",
	delete_confirm_member:"해당 팀원을 정말로 삭제하시겠습니까?",
	message_delete_message:"해당 컨텐츠를 정말로 삭제하시겠습니까?",
	confirm_delete_profile:"프로필을 삭제하는 경우, 모든 데이터도 동시에 삭제됩니다.\n - 예약 퍼블리싱 데이터 \n - 유저 및 그룹 데이터",
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

/**
* /!\ This file is just an example template to create/update your own language file /!\
*/

window.ParsleyConfig = window.ParsleyConfig || {};

(function ($) {
  window.ParsleyConfig = $.extend( true, {}, window.ParsleyConfig, {
    messages: {
      // parsley //////////////////////////////////////
        defaultMessage: "유효하지 않은 항목입니다."
        , type: {
            email: "이메일 형식에 맞게 입력해 주십시오."
          , url: "URL 형식에 맞게 입력해 주십시오."
          , urlstrict: "URL 형식에 맞게 입력해 주십시오."
          , number: "핸드폰 형식에 맞게 입력해 주십시오."
          , digits: "숫자 형식으로 입력해 주십시오."
          , dateIso: "날짜 형식으로 입력해 주십시오.(YYYY-MM-DD)."
          , alphanum: "숫자로 입력해 주십시오."
          , phone: "전화번호 형식에 맞게 입력해 주십시오."
        }
      , notnull: "필수 입력 항목입니다."
      , notblank: "필수 입력 항목입니다."
      , required: "이 값이 틀립니다"
      , regexp: "유효하지 않은 항목입니다."
      , min: "입력 항목은  %s 보다 크거가 같아야 합니다."
      , max: "입력 항목은  %s 보다 작거나 같아야 합니다."
      , range: "입력 항목은  %s 과  %s 이내로 입력해 주십시오."
      , minlength: "입력항목이 짧습니다. 입력항목은  %s 이상이어야 합니다."
      , maxlength: "입력 항목이 초과되었습니다. 입력항목은 %s 이하이여야 합니다."
      , rangelength: "입력 항목 길이가 유효하지 않습니다. 입력 항목은  %s 과 %s 이내로 입력해 주십시오."
      , mincheck: "%s 중 한가지 항목은 반드시 선택해 주십시오."
      , maxcheck: "%s 중 한가지 이상 항목은 선택해 주십시오."
      , rangecheck: "%s과 %s 중 한가지는 선택해 주십시오."
      , equalto: "입력항목은 일치해야 합니다."

      // parsley.extend ///////////////////////////////
      , minwords: "입력 항목은  %s 이상이어야 합니다."
      , maxwords: "입력 항목은 %s 이하이어야 합니다."
      , rangewords: "입력항목은  %s과 %s 이어야 합니다."
      , greaterthan: "입력 항목은 %s 이상이어야 합니다."
      , lessthan: "입력 항목은 %s 이하이어야 합니다."
      , beforedate: "입력 날짜는  %s 이전이어야 합니다."
      , afterdate: "입력 날짜는 %s 이후여야 합니다."
      , americandate:        "입력 항목은 월/날짜/년도 형식과 일치애햐 합니다.(MM/DD/YYYY)."
    }
  });
}(window.jQuery || window.Zepto));
