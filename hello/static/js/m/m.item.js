function itemModel(item) {
	var self = this;
	self.name = item.name;
	var server = document.server;
	self.id = item.id;
	self.showItem = ko.observable(true);
	self.done = ko.observable(item.done);
	self.markItemAsDone = function(){};

	self.deleteItem = function(){
		if (confirm("Do you wan't to remove this item?")) {
			self.showItem(false);
			server.post(
				"/items/remove",
				{"id": self.id},
				function() {},
				null
			);
		}
	};
	return self;
}