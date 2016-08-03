
function login(main) {
	var self = this; 
	self.username = ko.observable('');
	self.password = ko.observable('');
	self.logonFailed = ko.observable(false);
	
	function logginUser(username, password){
		$.ajax({
		  type: "POST",
		  url: "/login/",
		  data: {username: username, password: password},
		  success: function(response){
		  	setCookie("loggin",true,2)
		  	main.loggedIn(true);//getItems();
		  }, 
		  error: function(response){	
		  	main.loggedIn(false);
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
		logginUser(username, password);
	}

	self.logOn = logOn;
	return self; 
}