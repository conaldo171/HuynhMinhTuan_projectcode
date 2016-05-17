[ 	
	{ id: 'dashboard', url:'',expanded: false, text: 'Tổng quan',group: 'dashboard',  des:'Phần mềm quản lý phương tiện truyền thông xã hội Enpick', programIcon: 'icon-dashboard', nodes:
		[
			 { id: 'facebook-page', url:'dashboard/facebook-page', group: 'dashboard', text: 'Trang Facebook',  des:'Trang Facebook tổng hợp', programIcon: 'icon-facebook-sign'},
			 { id: 'facebook-profile', url:'dashboard/facebook-profile', group: 'dashboard', text: 'Facebook cá nhân',  des:'Facebook cá nhân tổng hợp', programIcon: 'icon-facebook-sign'},
			 { id: 'twitter', url:'dashboard/twitter', group: 'dashboard', text: 'Twitter',  des:'Twitter tổng hợp', programIcon: 'icon-twitter'}	
		]
	},
	{ id: 'contents', text: 'Phát hành', url:'', expanded: false, group: 'contents', programIcon: 'icon-list-alt', nodes: 
	[ 
			{ id: 'create', url:'contents/create', group: 'contents', text: 'Tạo mới',  des:'Tạo mới nội dung', programIcon: 'icon-file-alt'},
			{ id: 'all', url:'contents/all', group: 'contents', text: 'Tất cả', img: 'i-page', des:'Tất cả nội dung', programIcon: 'icon-list-alt'},
			{ id: 'draft', url:'contents/draft', group: 'contents', text: 'Dự thảo', img: 'i-page', des:'Nội dung dự thảo' , programIcon: 'icon-remove-sign'},
			{ id: 'scheduled', url:'contents/scheduled', group: 'contents', text: 'Đặt lịch',  des:'Nội dung đã lên kế hoạch' , programIcon: 'icon-calendar'},
			{ id: 'sent', url:'contents/sent', group: 'contents', text: 'Đã gửi',  des:'Nội dung đã gửi', programIcon: 'icon-ok'}
	]},
	{ id: 'monitoring', text: 'Giám sát',expanded: false, group: 'monitoring', programIcon: 'icon-laptop', nodes: 
	[ 
			{ id: 'facebook-page', url:'monitoring/facebook-page', group: 'monitoring', text: 'Trang Facebook',  des:'Giám sát trang Facebook', programIcon: 'icon-facebook-sign'},
			{ id: 'facebook-profile', url:'monitoring/facebook-profile', group: 'monitoring', text: 'Facebook cá nhân',  des:'Giám sát Facebook cá nhân', programIcon: 'icon-facebook-sign'},
			{ id: 'twitter', url:'monitoring/twitter', group: 'monitoring', text: 'Twitter', img: 'i-page', des:'Giám sát trang Twitter' , programIcon: 'icon-twitter'}
	]
	},
	{ id: 'analysis', text: 'Phân tích , báo cáo', expanded: false, group: 'analysis', programIcon: 'icon-bar-chart', nodes: 
	[ 		
		
		{ id: 'facebook-page', url:'analysis/facebook-page', group: 'analysis', text: 'Trang Facebook',  des:'Phân tích trang Facebook', programIcon: 'icon-facebook-sign'},
		{ id: 'facebook', url:'analysis/facebook', group: 'analysis', text: 'Facebook cá nhân',  des:'Phân tích thông tin cá nhân trang Facebook', programIcon: 'icon-facebook-sign'},
		{ id: 'twitter', url:'analysis/twitter', group: 'analysis', text: 'Twitter',  des:'Phân tích trang Twitter', programIcon: 'icon-twitter'}
		//{ id: 'brand-keyword', url:'analysis/brand-keyword', group: 'analysis', text: 'Brand Keyword',  des:'Brand Keyword', programIcon: 'icon-key'},
		//{ id: 'competitors', url:'analysis/competitors', group: 'analysis', text: 'Competitors',  des:'Competitors', programIcon: 'icon-exchange'}
	]
	},
	{ id: 'brand-keyword', text: 'Từ khoá', url:'brandkeyword/brand-keyword', expanded: false, group: 'brandkeyword',des:'Từ khoá', programIcon: 'icon-key'},
	{ id: 'competitors', text: 'So sánh', expanded: false, group: 'competitors',des:'So sánh', programIcon: 'icon-exchange',nodes:
		[
		 	{ id: 'facebook-page', url:'competitors/facebook-page', group: 'competitors', text: 'Trang facebook',  des:'So sánh trang facebook', programIcon: 'icon-facebook-sign'},
		 	{ id: 'twitter', url:'competitors/twitter', group: 'competitors', text: 'Twitter',  des:'So sánh Twitter', programIcon: 'icon-twitter'}
		 ]	
	}/*,
	{ id: 'task', text: 'Nhiệm vụ', expanded: false, group: 'task', programIcon: 'icon-tasks', nodes: 
		[ 		
			
			{ id: 'task-open', url:'task/task-open', group: 'task', text: 'Nhiệm vụ mở',  des:'Nhiệm vụ mở', programIcon: 'icon-tasks'},
			{ id: 'task-close', url:'task/task-close', group: 'task', text: 'Nhiệm vụ đã đóng',  des:'Nhiệm vụ đã đóng',programIcon:'icon-tasks'},
			{ id: 'task-all', url:'task/task-all', group: 'task', text: 'Tất cả nhiệm vụ ',  des:'Tất cả nhiệm vụ ', programIcon: 'icon-tasks'}
			
		]
		}*/
];