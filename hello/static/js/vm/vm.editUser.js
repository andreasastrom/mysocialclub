function editUserVm() {
	var self = this;
	self.user = new userModel();
	self.status = ko.observable(false);
	self.statusText = ko.observable('');

	function save() {
		self.user.update(this.user, self.response);
	}

	self.response = function(data) {
		self.status(true);
		self.statusText('Uppdatering klar');
		setTimeout(function () {
			self.status(false);
		},2500);
	}

	self.save = save;
}