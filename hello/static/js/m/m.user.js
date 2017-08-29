function userModel()
{
	var self = this;
	var user = document.user;
	self.username = user.username;
	self.initials = user.first_name.substring(0,1) + user.last_name.substring(0,1);
	changePassword = function() {
		alert("Hej");
	}


}