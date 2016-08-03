$( document ).ready(function() {
	ko.applyBindings(new myViewModel());
});


function myViewModel(){
	var self = this;
	self.loggedIn = ko.observable(false); 
	var loggedIn = ko.observable(false);

	var loginStatus = getCookie("loggin");
	
	if(loginStatus){
		self.loggedIn(true);
	}
	else {
		self.loggedIn(false);
		login(self);
	}

	checklistVm();
	countdownVm();
	weatherVm();
	
	return self; 	
}