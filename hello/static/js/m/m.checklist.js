function checklistModel(checklist) {
	var self = this;
	self.listItem = ko.observableArray();
	self.name = ko.observable(checklist.fields.name);
	self.removed = checklist.fields.removed;
	self.pk = checklist.pk;
	self.shopplinglistInput = ko.observable('');
	self.showChecklist = ko.observable(true);
	self.showList = ko.observable(false);
	self.checklistMenu = ko.observable(false);
	self.showRename = ko.observable(false);
	self.doneItem = ko.observableArray();
	self.itemsToDo = ko.observableArray();
	self.shared = ko.observable(checklist.fields.shared);

	//NEW stuff
	self.editChecklist = ko.observable(false);
	self.saveSuccess = ko.observable(false);

	function loaded(data) {
		self.listItem.removeAll();
		self.doneItem.removeAll();
		$.each(data, function (i, item) {
			var myChecklists = new ItemFactory(item, load);
			if (item.fields.done == 1) {
				self.doneItem.push(item);
			}
			self.listItem.push(myChecklists);
		});
	}

	function load(checklist_id) {
		$.ajax({
			type: "GET",
			url: "/checklist/items",
			data: { checklist_id: checklist_id },
			success: function (data) {
				loaded(JSON.parse(data));
			}
		});
	}

	var create = function () {
		var inputvalue = self.shopplinglistInput();
		if (self.shopplinglistInput().length > 0) {
			$.ajax({
				type: "POST",
				url: "/items/create",
				data: { name: inputvalue, checklist: self.pk },
				success: function () {
					self.shopplinglistInput('');
					console.log("Allt funkade");
					load(self.pk);
				}
			});
		}
	}

	var remove = function (checklist_id) {
		if (confirm('Är du säker på att du vill ta bort listan?')) {
			$.ajax({
				type: "POST",
				url: "/checklists/remove",
				data: { id: this.pk },
				success: function () {
					self.editChecklist(false);
					self.showChecklist(false);
				}
			});

		}
	}

	var toggleList = function () {
		self.showList(!self.showList());
	}

	var toggleChecklist = function () {
		self.checklistMenu(!self.checklistMenu());
	}

	var rename = function () {
		self.checklistMenu(false);
		self.showRename(true);
	}

	var update = function () {
		$.ajax({
			type: "POST",
			url: "checklist/update",
			data: { name: self.name(), shared: (self.shared() ? 1 : 0), id: self.pk },
			success: function () {
				self.showRename(false);
				self.saveSuccess(true);
				setTimeout(function () {
					self.saveSuccess(false);
				}, 4000);
			}
		});
	}

	//NEW STUFF 2017
	self.edit = function () {
		self.editChecklist(true);
	}

	self.close = function () {
		self.showList(true);
		self.editChecklist(false);
	}
	//NEW STUFF END

	load(self.pk);
	//function som hämtar alla checklistepunkter med rätt id.
	self.create = create;
	self.toggleList = toggleList;
	self.remove = remove;
	self.toggleChecklist = toggleChecklist;
	self.rename = rename;
	self.update = update;
	return self;
}