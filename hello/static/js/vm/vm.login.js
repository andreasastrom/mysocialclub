function loginVm(loggedInOk) {
	var self = this;

	self.loggedIn = ko.observable(false);
	self.fireAnimation = ko.observable(false);
	var loggedIn = ko.observable(false);

	self.username = ko.observable('');
	self.password = ko.observable('');
	self.logonFailed = ko.observable(false);
	self.resetPassword = ko.observable(false);

	function loginUser(username, password) {
		$.ajax({
			type: "POST",
			url: "/login/",
			data: { username: username, password: password },
			success: function (token) {
				if (!!token) {
					self.fireAnimation(true);
					setCookie("thesocialclub", token, 2)
					$.ajax({
						type: "POST",
						url: "/user/authenticate/",
						data: {token: token},
						success: function(response) {
							document.user = response
							console.log(response);
							self.loggedIn(true);
						}
					});
					setTimeout(function () {
						loggedInOk(true);//getItems();
					}, 1500);
				}
			},
			error: function (response) {
				loggedInOk(false);
				self.logonFailed(true);
			}
		});
	}

	function logOn() {
		self.logonFailed(false);
		var username = self.username();
		var password = self.password();
		self.username('');
		self.password('');
		loginUser(username, password);
	}

	function forgotPassword() {
		self.resetPassword(!self.resetPassword());
	}

	self.forgotPassword = forgotPassword;
	self.logOn = logOn;
	return self;
}