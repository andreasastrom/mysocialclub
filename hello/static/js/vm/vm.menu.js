function menuVm() {
	var self = this;
	var signout = function(){
		removeCookie("loggin");		
		location.reload();
	}
	self.signout = signout;
}