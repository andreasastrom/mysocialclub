
function login(main) {
	var self = this; 
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
		username = self.username(); 
		password = self.password();
		self.username('');
		self.password('');
		updateItem(username, password);
	}

	$(document).keypress(function(e) {
	    if(e.which == 13) {
	    	debugger;
	    	if(!main.loggedIn()){
	    		logOn();
	    	}
	    	else {
	    		shopplinglistAdd();
	    	}
	    }
	});

	//updateItem('');
	self.logOn = logOn;
	return self; 
}