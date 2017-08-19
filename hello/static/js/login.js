
function login(main) {
	var self = this;

	self.loggedIn = ko.observable(false);
	self.fireAnimation = ko.observable(false);
	var loggedIn = ko.observable(false);

	self.username = ko.observable('');
	self.password = ko.observable('');
	self.logonFailed = ko.observable(false);

	function loginUser(username, password){
		$.ajax({
		  type: "POST",
		  url: "/login/",
		  data: {username: username, password: password},
		  success: function(response){
			debugger;
		  	self.fireAnimation(true);
		  	setCookie("login",true,2)
		  	setTimeout(function(){
			    main.loggedIn(true);//getItems();
			}, 1500);
		  	
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
		loginUser(username, password);
	}

	self.logOn = logOn;
	return self; 
}