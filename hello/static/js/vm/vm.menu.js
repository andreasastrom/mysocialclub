function menuVm() {
	var self = this;
	var signout = function(){
		removeCookie("login");		
		location.reload();
	}
	self.signout = signout;
}