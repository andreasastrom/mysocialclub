require.config({
	paths: {text: 'js/lib/text'}
})

$(document).ready(function() {
	var self = this;
	var vm = new viewModel();
	self.state = ko.observable("checklist")
	self.server = server();
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
	self.checklist = ko.observable(true);
	var loggedIn = ko.observable(false);
	self.checklistVm = checklistVm();
}
