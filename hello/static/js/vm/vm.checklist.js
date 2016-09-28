function checklistVm() {
	var self = this;			
	self.checklists = ko.observableArray();
	self.checklistName = ko.observable('');
	self.addList = ko.observable(false);

	function loaded(data){
		var addChecklist = true;	
		self.checklists.removeAll();
		$.each(data, function (index, checklist){
			var d = new checklistModel(checklist);						
			// if(self.checklists().length > 0 ) {
			// 	addChecklist = _.some(self.checklists(), function(list){
			// 		return list.checklist_id = d.checklist_id;
			// 	});	
			// }			
			// if(addChecklist) {
				self.checklists.push(d);
			// }
			// else {
			// 	console.log(d);	
			// }
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
		self.addList(true);
	}

	load();	
	return self; 
}