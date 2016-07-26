$( document ).ready(function() {
	ko.applyBindings(new myViewModel());
});


function myViewModel(){
	var self = this;
	self.loggedIn = ko.observable(false); 
	var loggedIn = ko.observable(false);

	var loginStatus = getCookie("loggin");
	
	if(loginStatus){
		console.log("ok")
		self.loggedIn(true);
	}
	else {
		self.loggedIn(false);
		login(self);
		//var loginData = login().loggedIn();
	}

	
	
	//loggedIn(loginData);
	checklistVm();
	countdownVm();
	weatherVm();

	//self.loggedIn = loggedIn;
	return self; 	
}