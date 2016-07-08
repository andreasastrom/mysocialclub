$( document ).ready(function() {
	ko.applyBindings(new myViewModel());
});


function myViewModel(){
	var self = this;
	
	checklistVm();
	countdownVm();
	weatherVm();

	return self; 
}