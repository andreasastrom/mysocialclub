$( document ).ready(function() {
	ko.applyBindings(new myViewModel());
});


function myViewModel(){
	var self = this;
	var loggedIn = ko.observable(false);
	var loginData = login().loggedIn();
	//loggedIn(loginData);
	checklistVm();
	countdownVm();
	weatherVm();

	//self.loggedIn = loggedIn;
	return self; 	
}