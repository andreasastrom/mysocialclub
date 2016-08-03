function checklistVm() {
	var self = this;
	self.name = ko.observable("hej");
	self.itemList = ko.observableArray();
	self.shopplinglistInput = ko.observable('');	
	self.loadSorting = ko.observable(true);
	self.doneTask = ko.observable(0);
	self.totalCount = ko.observable(0);
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

	function processItems(items){
		self.itemList.removeAll();
		done = 0;
		self.totalCount(items.length);
		$.each(items, function(i, item){
			var myItem = new ItemFactory(item, getItems);
			console.log(myItem.done);
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
			  	getItems();
			  }
			});
		}
	}

	$(document).keypress(function(e) {
	    if(e.which == 13) {
	        shopplinglistAdd();
	    }
	});

	getItems();
	self.shopplinglistAdd = shopplinglistAdd;
	self.httpGet = getItems;

	return self; 
}