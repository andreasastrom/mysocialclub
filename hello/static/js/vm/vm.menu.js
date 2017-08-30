function menuVm() {
	var self = this;
	self.showSubMenu = ko.observable(false);
	self.userModel = new userModel();

	var signout = function(){
		removeCookie("thesocialclub");
		location.reload();
	}
	var toggleSubMenu = function() {
		self.showSubMenu(!self.showSubMenu());
	}

	self.settings = function() {
		document.state("edituser");
		self.showSubMenu(!self.showSubMenu());
	}
	self.toggleSubMenu = toggleSubMenu;
	self.signout = signout;
}