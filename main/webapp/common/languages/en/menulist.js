[ 	
	{ id: 'dashboard', url:'',expanded: false, text: 'Dashboard',group: 'dashboard',  des:'Enpick Social Media Management software', programIcon: 'icon-dashboard', nodes:
		[
			 { id: 'facebook-page', url:'dashboard/facebook-page', group: 'dashboard', text: 'Facebook Page',  des:'Facebook Page dashboard', programIcon: 'icon-facebook-sign'},
			 { id: 'facebook-profile', url:'dashboard/facebook-profile', group: 'dashboard', text: 'Facebook Profile',  des:'Facebook Profile dashboard', programIcon: 'icon-facebook-sign'},
			 { id: 'twitter', url:'dashboard/twitter', group: 'dashboard', text: 'Twitter',  des:'Twitter dashboard', programIcon: 'icon-twitter'}	
		]
	},
	{ id: 'contents', text: 'Contents Publishing', url:'', expanded: false, group: 'contents', programIcon: 'icon-list-alt', nodes: 
	[ 
			{ id: 'create', url:'contents/create', group: 'contents', text: 'Create',  des:'Create Content', programIcon: 'icon-file-alt'},
			{ id: 'all', url:'contents/all', group: 'contents', text: 'ALL', img: 'i-page', des:'All Content', programIcon: 'icon-list-alt'},
			{ id: 'draft', url:'contents/draft', group: 'contents', text: 'Draft', img: 'i-page', des:'Draft Content' , programIcon: 'icon-remove-sign'},
			{ id: 'scheduled', url:'contents/scheduled', group: 'contents', text: 'Scheduled',  des:'Scheduled Content' , programIcon: 'icon-calendar'},
			{ id: 'sent', url:'contents/sent', group: 'contents', text: 'Sent',  des:'Sent Content', programIcon: 'icon-ok'}
	]},
	{ id: 'monitoring', text: 'Monitoring',expanded: false, group: 'monitoring', programIcon: 'icon-laptop', nodes: 
	[ 
			{ id: 'facebook-page', url:'monitoring/facebook-page', group: 'monitoring', text: 'Facebook Page',  des:'Facebook Page Monitoring', programIcon: 'icon-facebook-sign'},
			{ id: 'facebook-profile', url:'monitoring/facebook-profile', group: 'monitoring', text: 'Facebook profile',  des:'Facebook Profile Monitoring', programIcon: 'icon-facebook-sign'},
			{ id: 'twitter', url:'monitoring/twitter', group: 'monitoring', text: 'Twitter', img: 'i-page', des:'Twitter Monitoring' , programIcon: 'icon-twitter'}
	]
	},
	{ id: 'analysis', text: 'Analysis & Report', expanded: false, group: 'analysis', programIcon: 'icon-bar-chart', nodes: 
	[ 		
		
		{ id: 'facebook-page', url:'analysis/facebook-page', group: 'analysis', text: 'Facebook Page',  des:'Facebook Page analysis', programIcon: 'icon-facebook-sign'},
		{ id: 'facebook', url:'analysis/facebook', group: 'analysis', text: 'Facebook Profile',  des:'Facebook Profile analysis', programIcon: 'icon-facebook-sign'},
		{ id: 'twitter', url:'analysis/twitter', group: 'analysis', text: 'Twitter',  des:'Twitter analysis', programIcon: 'icon-twitter'}
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
	}/*,
	{ id: 'task', text: 'Task', expanded: false, group: 'task',des:'Task', programIcon: 'icon-tasks', nodes: 
	[ 		
		
		{ id: 'task-open', url:'task/task-open', group: 'task', text: 'Open Task',  des:'Open Task', programIcon: 'icon-tasks'},
		{ id: 'task-close', url:'task/task-close', group: 'task', text: 'Closed task',  des:'Closed task',programIcon:'icon-tasks'},
		{ id: 'task-all', url:'task/task-all', group: 'task', text: 'All Task',  des:'All Task', programIcon: 'icon-tasks'}
		
	]
	}*/
];