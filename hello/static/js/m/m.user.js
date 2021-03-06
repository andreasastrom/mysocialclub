function userModel()
{
	var self = this;
	var user = document.user;
	self.username = ko.observable(user.username);
	self.id = user.id;
	self.firstname = ko.observable(user.first_name);
	self.lastname = ko.observable(user.last_name);
	self.email = ko.observable(user.email);
	self.initials = user.first_name.substring(0,1) + user.last_name.substring(0,1);

	changePassword = function() {
		//alert("Hej");
	}

	update = function(user, callback){
		var user = {
			"id": self.id,
			"username" : self.username(),
			"firstname" : self.firstname(),
			"lastname" : self.lastname(),
			"email" : self.email()
		}
		$.ajax({
			type: "POST",
			url: "user/update/",
			contentType :   'application/json',
			data: JSON.stringify(user),
			success: function(response) {
				callback();
			},
			error: function(error) {
				console.log("error");
			}
		});
	}

	self.update = update;

}