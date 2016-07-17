
function login() {
	var self = this; 
	self.loggedIn = ko.observable(false); 
	self.username = ko.observable('');
	self.password = ko.observable('');
	self.logonFailed = ko.observable(false);
	var password;
	var username;
	
	function updateItem(username, password){
		$.ajax({
		  type: "POST",
		  url: "/login/",
		  // cache: true,
		  // async: false,
		  data: {username: username, password: password},
		  success: function(response){
		  	self.loggedIn(true);//getItems();
		  }, 
		  error: function(response){	
		  	self.loggedIn(false);
		  	self.logonFailed(true);
		  }
		});
	}

	function logOn(){
		self.logonFailed(false);
		username = self.username(); 
		password = self.password();
		self.username('');
		self.password('');
		updateItem(username, password);
	}

	//updateItem('');
	self.logOn = logOn;
	return self; 
}