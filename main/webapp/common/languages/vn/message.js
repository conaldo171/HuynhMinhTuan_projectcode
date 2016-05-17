/********************************************************
English Message
********************************************************/
var mess = {
	add_channel: "Vui lòng thêm mạng xã hội",
	image_invalid:"Tải hình ảnh không hợp lệ",
	file_size:"Giới hạn tập tin là 4mb",
	message_send:"Tin nhắn đã được gửi",
	message_save:"Tin nhắn đã được lưu",
	message_schedule:"Đã lập lịch tin nhắn",
	message_delete:"Tin nhắn đã được xóa",
	message_like:"Tin nhắn đã được like",
	message_unlike:"Tin nhắn đã được unlike",
	error_occured:"Xảy ra lỗi",
	comment_delete:"Bình luận đã được xóa",
	comment_post:"Tin nhắn đã được đưa lên",
	message_favorite:"Tin nhắn đã được ưa thích",
	message_unfavorite:"Đã bỏ chọn ưa thích tin nhắn",
	comment_tweet:"Tin nhắn đã được bình luận trên tweet",
	choose_date_pass:"Bạn không thể chọn ngày hoặc thời gian trong quá khứ",
	check_login_facebook:"Bạn đã login facebook. Bạn muốn Logout không?",
	report_exceed:"Báo cáo vượt 1.000 bài viết",
	message_save_brand_keyword:"Từ khóa đã được lưu",
	message_delete_brand_keyword:"Từ khóa đã được xóa",
	message_save_competitors:"So sánh đã được lưu",
	message_delete_competitors:"So sánh đã được xóa",
	message_page_empty:"Vui lòng nhập vào một trang",
	message_nodata:"Không dữ liệu",
	pleaseconnect:"Vui lòng kết nối một mạng xã hội",
	pleasewritter:"Vui lòng viết tin nhắn",
	pleasechoosechannel:"Vui lòng chọn một mạng xã hội",
	nokeyword:"Không từ khóa",
	pleaseaddkeyword:"Vui lòng thêm từ khóa để tìm kiếm",
	nodatasearch:"Không có dữ liệu từ facebook",
	channelcompare:"Không có kênh twitter. Vui lòng kết nối kênh twitter để so sánh",
	channelcomparefb:"Không có kênh facebook. Vui lòng kết nối kênh facebook để so sánh",
	nopage:"Bạn không có một facebook page nào. Vui lòng tạo 1 page để sử dụng.",
	checkkeyword:"Vui lòng nhập một keyword",
	choosesocial:"Vui lòng chọn một mạng xã hội để kết nối.",
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
	message_exprire:"Thời gian dùng thử của bạn đã hết.",
	file_invalid:"Không phải file excel",
	message_error_page:"Upload Error.\n Page Id not correct or content duplicate on twitter or facebook ",
	message_select_download:"Please choose a post to download sample file",
	message_select_post:"Please choose a post to comment",
	password_update:"Mật khẩu mới được cập nhật",
	password_update_wrong:"Mật khẩu cũ không đúng"
};

window.ParsleyConfig = window.ParsleyConfig || {};

(function ($) {
  window.ParsleyConfig = $.extend( true, {}, window.ParsleyConfig, {
    messages: {
      // parsley //////////////////////////////////////
        defaultMessage: "Giá trị này không hợp lệ."
        , type: {
            email: "Giá trị này phải là email hợp lệ."
          , url:"Giá trị này phải là url hợp lệ."
          , urlstrict:"Giá trị phải nên là url hợp lệ."
          , number:"Giá trị này phải là số hợp lệ."
          , digits:"Giá trị này phải là chữ số."
          , dateIso:"Giá trị này phải là ngày hợp lệ (YYYY-MM-DD)."
          , alphanum:"Giá trị này phải là chữ và số."
          , phone:"Giá trị này phải là số phone hợp lệ." 
        }
      , notnull:"Giá trị này không được rỗng."
      , notblank: "Giá trị này không được trống."
      , required: "Giá trị này đã được yêu cầu."
      , regexp:"Giá trị này không hợp lệ."
      , min: "Giá trị này phải lớn hơn hoặc bằng %s."
      , max:  "Giá trị này phải thấp hơn hoặc bằng %s."
      , range:"Giá trị này phải ở giữa %s và %s."
      , minlength: "Giá trị này quá ngắn. Nó phải có %s ký tự hoặc hơn."
      , maxlength:"Giá trị này quá dài. Nó phải có %s ký tự hoặc ít hơn."
      , rangelength: "Độ dài giá trị này không hợp lệ. Nó phải có độ dài ký tự ở giữa %s và %s."
      , mincheck: "Bạn phải chọn ít nhất %s giá trị."
      , maxcheck: "Bạn phải chọn %s giá trị hoặc ít hơn."
      , rangecheck: "Bạn phải chọn giữa %s và %s lựa chọn."
      , equalto: "Giá trị này phải cùng loại."

      // parsley.extend ///////////////////////////////
      , minwords: "Giá trị này phải có ít nhất từ %s."
      , maxwords: "Giá trị này phải có lớn nhất từ %s."
      , rangewords: "Giá trị này phải ở giữa từ %s và %s."
      , greaterthan: "Giá trị này phải lớn hơn %s."
      , lessthan: "Giá trị này phải ít hơn %s."
      , beforedate: "Ngày này phải trước %s."
      , afterdate:"Ngày này phải sau %s."
      , americandate: "Giá trị này phải là một ngày (MM/DD/YYYY)."
    }
  });
}(window.jQuery || window.Zepto));

