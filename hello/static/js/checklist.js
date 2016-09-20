function checklistVm() {
	var self = this;	
	self.itemList = ko.observableArray();
	self.checkList = ko.observableArray();
	self.shopplinglistInput = ko.observable('');	
	self.loadSorting = ko.observable(true);
	self.doneTask = ko.observable(0);
	self.totalCount = ko.observable(0);
	self.checklists = ko.observableArray();
	var done = 0;

	if(self.loadSorting){
		var el = document.getElementById('myShoppingList');
		var sortable = new Sortable(el, {
			ghostClass: 'ghost',
			onEnd: function (/**Event*/evt) {
	        	evt.oldIndex;  // element's old index within parent
	        	evt.newIndex;  // element's new index within parent        	
	    	}

		});	
		self.loadSorting(false);
	}

	function getItems()
	{ 
		$.getJSON('/items/all', function (data) {
			processItems(data);
		});   
	}


	function loaded(data){			
		$.each(data, function (index, checklist){
			var d = new checklistModel(checklist);
			self.checklists.push(d);
		});
	}

	function getAllChecklistsItems()
	{ 
		$.getJSON('/checklists/all', function (data) {
			loaded(data);
		});   
	}

	function processItems(checklists){
		$.each(checklists, function(i, item){
			var myChecklists = new ItemFactory(item);						
			self.checkList.push(myItem);
		})
	}
	
	function processItems(items){
		self.itemList.removeAll();
		done = 0;
		self.totalCount(items.length);
		$.each(items, function(i, item){
			var myItem = new ItemFactory(item, getItems);			
			if(myItem.done === 1){
				done++;
			}
			self.itemList.push(myItem);
		})
		self.doneTask(done);
	}

	function shopplinglistAdd(){
		var inputvalue = self.shopplinglistInput();			
		if(self.shopplinglistInput().length > 0){
			$.ajax({
			  type: "POST",
			  url: "/items/create/",
			  data: {name: inputvalue},
			  success: function(){
			  	self.shopplinglistInput('');
			  	console.log("Allt funkade");				  	  				 			  	
			  }
			});
		}
	}

	$(document).keypress(function(e) {
	    if(e.which == 13) {
	        shopplinglistAdd();
	    }
	});

	getAllChecklistsItems();
	getItems();
	self.shopplinglistAdd = shopplinglistAdd;
	self.httpGet = getItems;

	return self; 
}