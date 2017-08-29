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

$(document).ready(function() {
	var self = this;
	var vm = new viewModel();
	ko.applyBindings(vm);
	$('#main').removeClass('hidden');
	var token = getCookie("thesocialclub");
	if(token) {	
		$.ajax({
			type: "POST",
			url: "/user/authenticate/",
			data: {token: token},
			success: function(response) {
				self.user = response;
				vm.loggedIn(true);
			}
		});
		//http://localhost:5000/user/authenticate/
	}
	else {
		vm.showLogon(true);
		login(self);
	}
	
});


function viewModel(){
	var self = this;
	self.loggedIn = ko.observable(false);
	self.showLogon = ko.observable(false);
	var loggedIn = ko.observable(false);
	var token = getCookie("thesocialclub");
	/* if(token) {	
		$.ajax({
			type: "POST",
			url: "/user/authenticate/",
			data: {token: token},
			success: function(response) {
				self.user = response;
				self.loggedIn(true);
			}
		});
		//http://localhost:5000/user/authenticate/
	}
	else {
		self.loggedIn(false);
		login(self);
	} */

	self.checklistVm = checklistVm();
	//self.countdownVm = countdownVm();
	// self.weatherVm = weatherVm();

	//return self;
}