function editUserVm() {
	var self = this;
	self.user = new userModel();

	function save() {
		self.user.update(this.user);
	}

	self.save = save;
	/* alert("Hej"); */
}