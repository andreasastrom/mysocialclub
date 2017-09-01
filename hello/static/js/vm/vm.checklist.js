function checklistVm() {
	var self = this;			
	self.checklists = ko.observableArray();
	self.checklistName = ko.observable('');
	self.addList = ko.observable(false);

	function loaded(data){
		var addChecklist = true;	
		self.checklists.removeAll();
		$.each(data, function (index, checklist){
			var checklist = new checklistModel(checklist);						
			self.checklists.push(checklist);			
		});
	}

	function load()
	{ 
		$.getJSON('/checklists/all', function (data) {
			loaded(data);
		});   
	}

	self.createChecklist = function(){
		if(self.checklistName().length > 0) {
			var name = self.checklistName();
			$.ajax({
				  type: "POST",
				  url: "/checklist/create",
				  data: {name: name},
				  success: function(){
				  	self.checklistName('')
				  	self.addList(false);
				  	load()
				  }
			});
		}
	}

	self.addNewChecklist = function() {
		self.addList(!self.addList());
	}

	load();	
	return self; 
}