TeacherApp = new Ext.Application({
	icon: '/mobile/icon.png',
	tabletStartupScreen: '/mobile/tablet_startup.png',
	phoneStartupScreen: '/mobile/phone_startup.png',
	glossOnIcon: false,
	name: "Teacher",

	launch: function() {
		var tapHandler = function(button, event) {
	        var txt = "User tapped the '" + button.text + "' button.";
	        Ext.getCmp('toolbartxt').body.dom.innerHTML = txt;
	    };
		////////////////////////////////////////////
		// Toolbar
		////////////////////////////////////////////
		TeacherApp.toolbar = new Ext.Toolbar({
			dock: 'top',
			title: "Revolution"
		})
		
		TeacherApp.detailPanel = new Ext.Panel({
			id: 'detailPanel',
			tpl: 'Hello {title}!'
		})
		
		////////////////////////////////////////////
		// Login
		////////////////////////////////////////////
		TeacherApp.loginPanel = new Ext.Panel({
			id: "loginPanel",
			items: [{
				xtype: 'form',
				id: 'loginForm',
				scroll: 'vertical',
				items: [{
					xtype: 'fieldset',
					instructions: 'Please enter the information above.',
					defaults: {
						labelWidth: '45%'
					},
					items: [{
						xtype: 'textfield',
						name: 'uuid',
						label: 'Revolution ID',
						autoCapitalize : true,
						useClearIcon: true
					}, {
						xtype: 'passwordfield',
						name: 'password',
						label: 'Password',
						useClearIcon: true
					}]
				}, {
					layout: 'vbox',
					defaults: {xtype: 'button', flex: 1, style: 'margin: .5em;'},
					items: [{
						text: 'Submit',
						scope: this,
						handler: function(btn){
							TeacherApp.Viewport.setActiveItem('mainMenu');
							console.log("Do something")
						}
					}]
				}]
			}],
			dockedItems: [{
				xtype: 'toolbar',
				dock: 'top',
				title: "Revolution"
			}]
		})


		////////////////////////////////////////////
		// Main menu
		////////////////////////////////////////////
		TeacherApp.mainMenuList = new Ext.List({
			id: 'menuList',
			store: TeacherApp.menuStore,
			itemTpl: '<div class="activity">{title}</div>',
			grouped: false,
			onItemDisclosure: function(record) {
				if (record.data.action == 'events') {
				//	TeacherApp.eventsListPanel.update(record.data);
					TeacherApp.Viewport.setActiveItem('eventsListPanel');
				} else {
					TeacherApp.detailPanel.update(record.data);
					TeacherApp.Viewport.setActiveItem('eventDetailPanel');
				}
				TeacherApp.toolbar.setTitle(record.data.title);
			}
		});
		TeacherApp.mainMenu = new Ext.Panel({
			id: 'mainMenu',
			layout: 'fit',
			items: [TeacherApp.mainMenuList],
			dockedItems: [{
				xtype: 'toolbar',
				dock: 'top',
				title: "Revolution",
				items: [{
					xtype: 'button',
					ui: 'back',
					text: "Back",
					handler: function() {
						TeacherApp.Viewport.setActiveItem('loginPanel', {type: 'slide', direction: 'right'});
					}
				}]
			}]
		})


		////////////////////////////////////////////
		// Events (Classes, Proctoring & Events) List
		////////////////////////////////////////////
		TeacherApp.eventsList = new Ext.List({
			id: 'eventsList',
			store: TeacherApp.eventsStore,
			itemTpl: '<div class="subtitle"><h4>{title}</h4><h6>{subtitle}</h6></div>',
			grouped: false,
			onItemDisclosure: function(record) {
				TeacherApp.eventDetailPanel.update(record.data);
				TeacherApp.Viewport.setActiveItem('eventDetailPanel');
			}
		});
		TeacherApp.eventsListPanel = new Ext.Panel({
			id: 'eventsListPanel',
			layout: 'fit',
			items: [TeacherApp.eventsList],
			dockedItems: [{
				xtype: 'toolbar',
				dock: 'top',
				title: "Revolution",
				items: [{
					xtype: 'button',
					ui: 'back',
					text: "Back",
					handler: function() {
						TeacherApp.Viewport.setActiveItem('mainMenu', {type: 'slide', direction: 'right'});
					}
				}]
			}]
		})
		
		////////////////////////////////////////////
		// Event Detail
		////////////////////////////////////////////
		

		/********************************************
		// Attendance */
		TeacherApp.attendancePanel = new Ext.Panel({
			id: "attendancePanel",
			title: "Attendance",
			items: [{
				xtype: 'form',
				id: 'attendanceForm',
				scroll: 'vertical',
				defaults: {
	                labelWidth: '80%'
	            },
			}],
			listeners: {
				activate: function() {
					var form = Ext.getCmp('attendanceForm');
					if (form.items.length > 0) return;
					TeacherApp.attendanceStore.each(function(rec){
						form.add({
							xtype: 'checkboxfield',
							label: rec.get('student_name'),
							name: rec.get('student_name'),
							checked: rec.get('attended'),
							value: 'true',
							listeners:{
								check: function() { 
									console.log("checked "+this.label);
									TeacherApp.attendanceStore.findRecord("student_name",this.label).data.value = true;
								}
							}
						});
					});
					form.doLayout();
				}
			}
		});
		/********************************************
		// Discussion */
		TeacherApp.discussion = new Ext.Component({
			title: "Discussion",
			scroll: "vertical",
			tpl: [
				'<tpl for=".">',
				'	<div class="info_block">',
				'		<div class="icon"><img src="{profile_image_url}"></div>',
				'		<div class="copy action">',
				'			<h3>{from_user}</h3>',
				'			<p>{text}</p>',
				'		</div>',
				'	</div>',
				'</tpl>'
			]
		});

		refreshComments = function() {
			var coords = TeacherApp.mapPanel.geo.coords;
			Ext.util.JSONP.request({
				url: "http://search.twitter.com/search.json",
				callbackKey: 'callback',
				params: {
					geocode: coords.latitude + "," + coords.longitude + ",5mi",
					//q: "lady gaga",
					rpp: 30,
					uniqueify: Math.random()
				},
				callback: function(data) {
					var comments = data.results;
					TeacherApp.discussion.update(comments)
					
					clearMarkers();
					for (var i = 0, ln = comments.length; i < ln; i++) {
						var comment = comments[i];
						if (comment.geo && comment.geo.coordinates) {
							addMarker(comment);
						}
					}
				}
			});
		}
		

		/********************************************
		// Map */
		TeacherApp.mapPanel = new Ext.Map({
			title: "Map",
			useCurrentLocation: true
		});

		addMarker = function(comment) {
			console.log('found-comment', comment);
			var latLng = new google.maps.LatLng(comment.geo.coordinates.latitude, comment.geo.coordinates.longitude);
			var marker = new google.maps.Marker({
				map: TeacherApp.mapPanel.map,
				position: latLng
			})
			console.log(marker);
			markers.push(marker);
			
			google.maps.event.addListener(marker, "click", function() {
				tweetBubble.setContent(comment.text);
				tweetBubble.open(TeacherApp.mapPanel.map, marker);
			})
		};
		
		clearMarkers = function() {
			for (var i=0; i < markers.length; i++) {
				markers[i].setMap(null)
			}
			markers = [];
		};
		markers = [];
		tweetBubble = new google.maps.InfoWindow();
		TeacherApp.mapPanel.geo.on('update', refreshComments);
		
		/********************************************
		// Event Detail Wrapper */
		TeacherApp.eventDetailPanel = new Ext.TabPanel({
			id: 'eventDetailPanel',
			region:'center', 
			cardSwitchAnimation: 'slide',
			ui: 'light',
			items: [TeacherApp.mapPanel, TeacherApp.discussion, TeacherApp.attendancePanel],
			dockedItems: [{
				xtype: 'toolbar',
				dock: 'top',
				title: "Revolution",
				items: [{
					xtype: 'button',
					ui: 'back',
					text: "Back",
					handler: function() {
						TeacherApp.Viewport.setActiveItem('eventsListPanel', {type: 'slide', direction: 'right'});
					}
				}]
			}],
			listeners:{
				activate: function() { refreshComments() }
			}
		});

		TeacherApp.eventDetailPanel.getTabBar().add({xtype: "spacer"},{
			xtype: 'button',
			iconMask: true,
			iconCls: 'refresh',
			ui: 'plain',
			style: 'margin:0;',
			handler: refreshComments
		});
		TeacherApp.eventDetailPanel.getTabBar().doLayout();

		////////////////////////////////////////////
		// Viewport
		////////////////////////////////////////////
		TeacherApp.Viewport = new Ext.Panel({
			fullscreen: true,
			layout: 'card',
			cardSwitchAnimation: 'slide',
			items: [TeacherApp.loginPanel, TeacherApp.mainMenu, TeacherApp.eventsListPanel, TeacherApp.detailPanel, TeacherApp.eventDetailPanel]
		})


		
	}
})