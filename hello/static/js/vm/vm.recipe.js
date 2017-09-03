function recipeVm() {
	var self = this;
	var server = document.server;
	self.name = ko.observable('');
	self.link = ko.observable('');
	self.saveSuccess = ko.observable(false);

	function create() {
		if (!!self.name() && !!self.link()) {
			var data = {
				"user_id": document.user.id,
				"recipe": {
					"name": self.name(),
					"link": self.link()
				}
			};
			server.post(
				'/recipe/create/',
				data,
				function success() {
					self.name('');
					self.link('');
					self.saveSuccess(true);
					setTimeout(function () {
						self.saveSuccess(false);
					},4000);
				},
				null);
		}
		else {
			console.log("Saknar något");
		}
	}

	self.create = create;
}