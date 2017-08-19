require.config({
	paths: {text: 'js/lib/text'}
})

// require(['items'], 
// 	function(module, text){
// 		console.log("te")
// 	}
// 	,function(err){
// 		console.log(err);
// 	});

$( document ).ready(function() {
	ko.applyBindings(new myViewModel());
});


function myViewModel(){
	var self = this;
	self.loggedIn = ko.observable(false);
	var loggedIn = ko.observable(false);
	var loginStatus = getCookie("login");

	if(loginStatus){
		self.loggedIn(true);
	}
	else {
		self.loggedIn(false);
		login(self);
	}

	self.checklistVm = checklistVm();
	//self.countdownVm = countdownVm();
	// self.weatherVm = weatherVm();

	return self;
}