function menuVm() {
	var self = this;
	var signout = function(){
		removeCookie("thesocialclub");		
		location.reload();
	}
	self.userModel = new userModel();
	self.signout = signout;
}