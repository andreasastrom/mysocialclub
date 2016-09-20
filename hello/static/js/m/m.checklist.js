function checklistModel(checklist)
{
	var self = this;
	self.listItem = ko.observableArray();
	self.name = checklist.fields.name;	
	self.removed = checklist.fields.removed;
	self.checklist_id = checklist.pk;
	self.shopplinglistInput = ko.observable('');

	function loaded(data) {		
		self.listItem.removeAll();
		$.each(data, function(i, item){		
			var myChecklists = new ItemFactory(item, load);									
			self.listItem.push(myChecklists);
		});
	}

	function load(checklist_id) { 			
		$.ajax({
			type: "GET",
			url: "/checklist/items/",
			data: {checklist_id: checklist_id},
			success: function(data){				  
				loaded(JSON.parse(data));
			}
		});
	}

	var create = function () {
		var inputvalue = self.shopplinglistInput();			
		if(self.shopplinglistInput().length > 0){
			$.ajax({
			  type: "POST",
			  url: "/items/create/",
			  data: {name: inputvalue, checklist: self.checklist_id},
			  success: function(){
			  	self.shopplinglistInput('');
			  	console.log("Allt funkade");
			  	load(self.checklist_id);				  	  				 			  	
			  }
			});
		}
	}

	load(self.checklist_id);
	//function som hämtar alla checklistepunkter med rätt id. 
	self.create = create;
	return self;		
}