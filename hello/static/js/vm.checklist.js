function checklistVm() {
	var self = this;		
	self.testar123 = "12321232";
	self.checklists = ko.observableArray();


	function loaded(data){			
		$.each(data, function (index, checklist){
			var checklistModel = new checklistModel(checklist);
			self.checklists.push(checklistModel);
		});
	}

	function load()
	{ 
		$.getJSON('/checklists/all', function (data) {
			loaded(data);
		});   
	}

	self.createChecklist = function(){
		var name = "andreas";
		$.ajax({
			  type: "POST",
			  url: "/checklist/create",
			  data: {name: name},
			  success: function(){
			  	//self.shopplinglistInput('');
			  	console.log("Allt funkade");
			  	// load(self.checklist_id);				  	  				 			  	
			  }
		});
	}

	load();	
	//self.createShoppingList = createShoppingList;
	return self; 
}