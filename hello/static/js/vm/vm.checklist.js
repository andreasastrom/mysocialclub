function checklistVm() {
	var self = this;			
	self.checklists = ko.observableArray();
	self.checklistName = ko.observable('');

	function loaded(data){
		self.checklists.removeAll();			
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

	self.createChecklist = function(){		
		if(self.checklistName().length > 0) {
			var name = self.checklistName();
			$.ajax({
				  type: "POST",
				  url: "/checklist/create",
				  data: {name: name},
				  success: function(){
				  	self.checklistName('')				  	
				  	load()				  				  	  				 			  
				  }
			});
		}
	}

	load();	
	return self; 
}