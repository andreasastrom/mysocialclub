function checklistVm() {
	var self = this;		
	self.checklists = ko.observableArray();

	function loaded(data){			
		$.each(data, function (index, checklist){
			var d = new checklistModel(checklist);
			self.checklists.push(d);
		});
	}

	function load()
	{ 
		$.getJSON('/checklists/all', function (data) {
			loaded(data);
		});   
	}

	load();	
	return self; 
}