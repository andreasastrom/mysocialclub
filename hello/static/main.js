require.config({
	paths: {text: 'js/lib/text'}
})

$(document).ready(function() {
	var self = this;
	self.state = ko.observable("checklist")
	self.server = server();
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
				//vm.checklistVm = checklistVm();
			}
		});
	}
	else {
		vm.showLogon(true);
		login(self);
		//vm.checklistVm = checklistVm();
	}
});

function viewModel(){
	var self = this;
	self.loggedIn = ko.observable(false);
	self.showLogon = ko.observable(false);
	self.checklist = ko.observable(true);
	var loggedIn = ko.observable(false);
}
