function checklistModel(checklist)
{
	var self = this;
	self.listItem = ko.observableArray();
	self.name = checklist.fields.name;	
	self.removed = checklist.fields.removed;	
	self.pk = checklist.pk;
	self.shopplinglistInput = ko.observable('');
	self.showChecklist = ko.observable(true);
	self.showList = ko.observable(false);

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
			url: "/checklist/items",
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
			  url: "/items/create",
			  data: {name: inputvalue, checklist: self.pk},
			  success: function(){
			  	self.shopplinglistInput('');
			  	console.log("Allt funkade");
			  	load(self.pk);				  	  				 			  	
			  }
			});
		}
	}

	var remove = function(checklist_id) {				
		if (confirm('Är du säker på att du vill ta bort listan?')) {    		
    		$.ajax({
				  type: "POST",
				  url: "/checklists/remove",
				  data: {id: this.pk},
				  success: function(){
		  		  	self.showChecklist(false)		  				  	  				 			  				
				  }
			});

    	}
	}

	var toggleList = function(){
		self.showList(!self.showList());
	}

	load(self.pk);
	//function som hämtar alla checklistepunkter med rätt id. 
	self.create = create;
	self.toggleList = toggleList;
	self.remove = remove;
	return self;		
}