[ 	
	{ id: 'dashboard', url:'',expanded: false, text: 'ダッシュボード',group: 'dashboard',  des:'Enpickメディア管理ソフトウェア', programIcon: 'icon-dashboard',nodes:
		[
			 { id: 'facebook-page', url:'dashboard/facebook-page', group: 'dashboard', text: 'フェイスブック  ページ',  des:'Facebookのページのダッシュボード', programIcon: 'icon-facebook-sign'},
			 { id: 'facebook-profile', url:'dashboard/facebook-profile', group: 'dashboard', text: 'フェイスブック',  des:'Facebookのプロフィールダッシュ', programIcon: 'icon-facebook-sign'},
			 { id: 'twitter', url:'dashboard/twitter', group: 'dashboard', text: 'ツイッター',  des:'Twitterのダッシュボード', programIcon: 'icon-twitter'}	
		]
	},
	{ id: 'contents', text: 'パブリッシング', url:'', expanded: false, group: 'contents', programIcon: 'icon-list-alt', nodes: 
	[ 
			{ id: 'create', url:'contents/create', group: 'contents', text: 'コンテンツ作成',  des:'コンテンツを作成', programIcon: 'icon-file-alt'},
			{ id: 'all', url:'contents/all', group: 'contents', text: '全体', img: 'i-page', des:'すべてのコンテンツ', programIcon: 'icon-list-alt'},
			{ id: 'draft', url:'contents/draft', group: 'contents', text: '一時保存', img: 'i-page', des:'草案の内容' , programIcon: 'icon-remove-sign'},
			{ id: 'scheduled', url:'contents/scheduled', group: 'contents', text: '予約発行',  des:'予定されたコンテンツ' , programIcon: 'icon-calendar'},
			{ id: 'sent', url:'contents/sent', group: 'contents', text: '発行完了',  des:'送信されたコンテンツ', programIcon: 'icon-ok'}
	]},
	{ id: 'monitoring', text: 'モニタリング',expanded: false, group: 'monitoring', programIcon: 'icon-laptop', nodes: 
	[ 
			{ id: 'facebook-page', url:'monitoring/facebook-page', group: 'monitoring', text: 'フェイスブック  のページ',  des:'フェイスブック の監視', programIcon: 'icon-facebook-sign'},
			{ id: 'facebook-profile', url:'monitoring/facebook-profile', group: 'monitoring', text: 'フェイスブック',  des:'フェイスブック プロフィール', programIcon: 'icon-facebook-sign'},
			{ id: 'twitter', url:'monitoring/twitter', group: 'monitoring', text: 'ツイッター', img: 'i-page', des:'Twitterのモニタリング' , programIcon: 'icon-twitter'}
	]
	},
	{ id: 'analysis', text: 'Analysis & Report', expanded: false, group: 'analysis', programIcon: 'icon-bar-chart', nodes: 
	[ 		
	 	{ id: 'facebook-page', url:'analysis/facebook-page', group: 'analysis', text: 'フェイスブック  ページ',  des:'フェイスブック のページ解析', programIcon: 'icon-facebook-sign'},
		{ id: 'facebook', url:'analysis/facebook', group: 'analysis', text: 'フェイスブック',  des:'フェイスブック の分析', programIcon: 'icon-facebook-sign'},
		{ id: 'twitter', url:'analysis/twitter', group: 'analysis', text: 'ツイッター',  des:'Twitterの分析', programIcon: 'icon-twitter'}
		//{ id: 'brand-keyword', url:'analysis/brand-keyword', group: 'analysis', text: 'Brand Keyword',  des:'Brand Keyword', programIcon: 'icon-key'},
		//{ id: 'competitors', url:'analysis/competitors', group: 'analysis', text: 'Competitors',  des:'Competitors', programIcon: 'icon-exchange'}
	]
	},
	{ id: 'brand-keyword', text: 'Brand Keyword', url:'brandkeyword/brand-keyword', expanded: false, group: 'brandkeyword',des:'Brand Keyword', programIcon: 'icon-key'},
	{ id: 'competitors', text: 'Competitors', expanded: false, group: 'competitors',des:'Competitors', programIcon: 'icon-exchange',nodes:
		[
		 	{ id: 'facebook-page', url:'competitors/facebook-page', group: 'competitors', text: 'Facebook Page',  des:'Facebook Page competitors', programIcon: 'icon-facebook-sign'},
		 	{ id: 'twitter', url:'competitors/twitter', group: 'competitors', text: 'Twitter',  des:'Twitter competitors', programIcon: 'icon-twitter'}
		 ]	
	}/*,{ id: 'task', text: 'Task', expanded: false, group: 'task', programIcon: 'icon-tasks', nodes: 
		[ 		
			
			{ id: 'task-open', url:'task/task-open', group: 'task', text: 'Open Task',  des:'Open Task', programIcon: 'icon-tasks'},
			{ id: 'task-close', url:'task/task-close', group: 'task', text: 'Closed task',  des:'Closed task',programIcon:'icon-tasks'},
			{ id: 'task-all', url:'task/task-all', group: 'task', text: 'All Task',  des:'All Task', programIcon: 'icon-tasks'}
			
		]
		}*/
];