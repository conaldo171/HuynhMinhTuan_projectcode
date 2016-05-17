[ 	
	{ id: 'dashboard', url:'',expanded: false,group: 'dashboard', text: 'Dashboard',  des:'Enpick 소셜 미디어 관리 소프트웨어', programIcon: 'icon-dashboard',nodes :
		[
			 { id: 'facebook-page', url:'dashboard/facebook-page', group: 'dashboard', text: '페이스북페이지',  des:'페이스북페이지', programIcon: 'icon-facebook-sign'},
			 { id: 'facebook-profile', url:'dashboard/facebook-profile', group: 'dashboard', text: '페이스북프로필',  des:'페이스북프로필', programIcon: 'icon-facebook-sign'},
			 { id: 'twitter', url:'dashboard/twitter', group: 'dashboard', text: '트위터',  des:'트위터', programIcon: 'icon-twitter'}	
		]
	},
	{ id: 'contents', text: '퍼블리싱', url:'', expanded: false, group: 'contents', programIcon: 'icon-list-alt', nodes: 
	[ 
			{ id: 'create', url:'contents/create', group: 'contents', text: '컨텐츠만들기',  des:'컨텐츠만들기', programIcon: 'icon-file-alt'},
			{ id: 'all', url:'contents/all', group: 'contents', text: '전체', img: 'i-page', des:'전체', programIcon: 'icon-list-alt'},
			{ id: 'draft', url:'contents/draft', group: 'contents', text: '임시저장', img: 'i-page', des:'임시저장' , programIcon: 'icon-remove-sign'},
			{ id: 'scheduled', url:'contents/scheduled', group: 'contents', text: '예약발행',  des:'예약발행' , programIcon: 'icon-calendar'},
			{ id: 'sent', url:'contents/sent', group: 'contents', text: '발행완료',  des:'발행완료', programIcon: 'icon-ok'}
	]},
	{ id: 'monitoring', text: '모니터링',expanded: false, group: 'monitoring', programIcon: 'icon-laptop', nodes: 
	[ 
			{ id: 'facebook-page', url:'monitoring/facebook-page', group: 'monitoring', text: '페이스북페이지',  des:'페이스북페이지', programIcon: 'icon-facebook-sign'},
			{ id: 'facebook-profile', url:'monitoring/facebook-profile', group: 'monitoring', text: '페이스북프로필',  des:'페이스북프로필', programIcon: 'icon-facebook-sign'},
			{ id: 'twitter', url:'monitoring/twitter', group: 'monitoring', text: '트위터', img: 'i-page', des:'트위터' , programIcon: 'icon-twitter'}
	]
	},
	{ id: 'analysis', text: '분석및보고서', expanded: false, group: 'analysis', programIcon: 'icon-bar-chart', nodes: 
	[ 	
	 	{ id: 'facebook-page', url:'analysis/facebook-page', group: 'analysis', text: '페이스북페이지',  des:'페이스북페이지', programIcon: 'icon-facebook-sign'},
		{ id: 'facebook', url:'analysis/facebook', group: 'analysis', text: '페이스북프로필',  des:'페이스북프로필', programIcon: 'icon-facebook-sign'},
		{ id: 'twitter', url:'analysis/twitter', group: 'analysis', text: '트위터',  des:'트위터', programIcon: 'icon-twitter'}		
	]
	},
	{ id: 'brand-keyword', text: '브랜드 키워드', url:'brandkeyword/brand-keyword', expanded: false, group: 'brandkeyword',des:'브랜드 키워드', programIcon: 'icon-key'},
	{ id: 'competitors', text: '경쟁사 분석', expanded: false, group: 'competitors',des:'경쟁사 분석', programIcon: 'icon-exchange',nodes:
		[
		 	{ id: 'facebook-page', url:'competitors/facebook-page', group: 'competitors', text: 'Facebook Page',  des:'Facebook Page competitors', programIcon: 'icon-facebook-sign'},
		 	{ id: 'twitter', url:'competitors/twitter', group: 'competitors', text: 'Twitter',  des:'Twitter competitors', programIcon: 'icon-twitter'}
		 ]	
	}/*,
	{ id: 'task', text: 'Task', expanded: false, group: 'task', programIcon: 'icon-tasks', nodes: 
		[ 		
			
			{ id: 'task-open', url:'task/task-open', group: 'task', text: 'Open Task',  des:'Open Task', programIcon: 'icon-tasks'},
			{ id: 'task-close', url:'task/task-close', group: 'task', text: 'Closed task',  des:'Closed task',programIcon:'icon-tasks'},
			{ id: 'task-all', url:'task/task-all', group: 'task', text: 'All Task',  des:'All Task', programIcon: 'icon-tasks'}
			
		]
		}*/
];