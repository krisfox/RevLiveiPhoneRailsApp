Ext.regModel("Menu", {
	fields: [
		{ name: 'title', 		type: 'string' },
		{ name: 'action',	 	type: 'string'}
	]
});

TeacherApp.menuStore = new Ext.data.Store({
	model: "Menu",
	data: [
		{ title: "Courses & Events",		action: 'events' },
		{ title: "Tutoring", 				action: 'tutoring' },
		{ title: "Students", 				action: 'students' }
	]
})

Ext.regModel("Event", {
	fields: [
		{ name: 'id',				type: 'integer' },
		{ name: 'type', 			type: 'string' },
		{ name: 'title',	 		type: 'string' },
		{ name: 'subtitle',	 		type: 'string' },
		{ name: 'start_at', 		type: 'datetime' },
		{ name: 'duration',	 		type: 'integer' }
	],
});

Ext.regModel("Attendance", {
	fields: [
		{ name: 'id',				type: 'integer' },
		{ name: 'student_name', 	type: 'string' },
		{ name: 'avatar',	 		type: 'string' },
		{ name: 'attended',	 		type: 'boolean' },
	],
});

TeacherApp.attendanceStore = new Ext.data.Store({
	model: "Attendance",
	data: [
		{ id: 1, student_name: "Keith Lawler", avatar: "/images/mobile/icon.png", attended: false },
		{ id: 2, student_name: "Charlie Horse", avatar: "/images/mobile/icon.png", attended: true },
		{ id: 3, student_name: "Zingbat Zelphid", avatar: "/images/mobile/icon.png", attended: false }
	]
})

TeacherApp.eventsStore = new Ext.data.Store({
	model: "Event",
	// sorters: 'title',
	// getGroupString: function(record) {
	// 	return record.get('title')[0]
	// },
	data: [
		{ id: 1, type: 'section', title: 'Class 2', subtitle: "Group Course - Santa Monica HS", starts_at: "2011-11-01 15:00:00", duration: 60 },
		{ id: 2, type: 'section', title: 'Class 3', subtitle: "Group Course - Santa Monica HS", starts_at: "2011-11-08 15:00:00", duration: 60 },
		{ id: 3, type: 'section', title: 'Class 4', subtitle: "Group Course - Santa Monica HS", starts_at: "2011-11-08 15:00:00", duration: 60 }
	]
	// autoLoad : true,
	// proxy: {
	// 	type: 'ajax',
	// 	url : '/courses_and_proctorings.json',
	// 	reader: {
	// 		type: 'json',
	// 		root: 'courses'
	// 	}
	// }
})
