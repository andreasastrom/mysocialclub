function loginVm(loggedInOk) {
	var self = this; 

	self.loggedIn = ko.observable(false); 
	self.fireAnimation = ko.observable(false);
	var loggedIn = ko.observable(false);	

	self.username = ko.observable('');
	self.password = ko.observable('');
	self.logonFailed = ko.observable(false);
	self.resetPassword = ko.observable(false);
	
	function loginUser(username, password){
		$.ajax({
		  type: "POST",
		  url: "/login/",
		  data: {username: username, password: password},
		  success: function(response){
		  	self.fireAnimation(true);
		  	setCookie("login",true,2)
		  	setTimeout(function(){
			    loggedInOk(true);//getItems();
			}, 1500);

		  },
		  error: function(response){
		  	loggedInOk(false);
		  	self.logonFailed(true);
		  }
		});
	}

	function logOn(){
		self.logonFailed(false);
		var username = self.username();
		var password = self.password();
		self.username('');
		self.password('');
		loginUser(username, password);
	}

	function forgotPassword(){
		self.resetPassword(!self.resetPassword());
	}

	self.forgotPassword = forgotPassword;
	self.logOn = logOn;
	return self; 
}