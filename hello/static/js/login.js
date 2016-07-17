
function login() {
	var self = this; 
	self.loggedIn = ko.observable(false); 
	self.username = ko.observable('');
	self.password = ko.observable('');
	
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
		  }
		});
	}

	function logOn(){
		var username = self.username; 
		var password = self.password;
		updateItem(username, password);
	}

	//updateItem('');
	self.logOn = logOn;
	return self; 
}