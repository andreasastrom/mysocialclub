function checklistVm() {
	var self = this;
	self.checklists = ko.observableArray();
	self.checklistName = ko.observable('');
	self.addList = ko.observable(false);
	self.loader = ko.observable(false);

	//BORDE BRYTA UTT MYCKET HÄR OCH LÄGGA I m.checklist. Där ska alla checklistdata bo. Det som ska finnas här är bara själva listorna.

	function loaded(data) {
		var addChecklist = true;
		self.checklists.removeAll();
		$.each(data, function (index, checklist) {
			var checklist = new checklistModel(checklist);
			self.checklists.push(checklist);
		});
		self.loader(false);
	}

	function load() {
		self.loader(true);
		$.getJSON('/checklist/all_new', {"user_id" : document.user.id}, function (data) {
			loaded(data);
		});
	}

	self.createChecklist = function () {
		if (self.checklistName().length > 0) {
			var name = self.checklistName();
			$.ajax({
				type: "POST",
				url: "/checklist/create",
				data: {
					name: name,
					user_id: document.user.id
				},
				success: function () {
					self.checklistName('')
					self.addList(false);
					//load();
				}
			});
		}
	}

	self.addNewChecklist = function () {
		self.addList(!self.addList());
	}

	load();
	return self;
}