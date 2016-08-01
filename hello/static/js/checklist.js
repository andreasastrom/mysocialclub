function checklistVm() {
	var self = this;
	self.name = ko.observable("hej");
	self.itemList = ko.observableArray();
	self.shopplinglistInput = ko.observable('');	
	self.loadSorting = ko.observable(true);

	if(self.loadSorting){
		var el = document.getElementById('myShoppingList');
		var sortable = new Sortable(el, {
			ghostClass: 'ghost',
			onEnd: function (/**Event*/evt) {
	        	var id = evt.item.id;  // element's old index within parent
	        	var newvalue = evt.newIndex + 1;  // element's new index within parent        	
	        	console.log(evt.item.id)
	        	updateItemOrder(newvalue,id);
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

	function updateItemOrder(newvalue, id){
		$.ajax({
		  type: "POST",
		  url: "/items/update-order/",
		  data: {newvalue: newvalue, id: id},
		  success: function(){
		  	self.shopplinglistInput('');
		  	console.log("Allt funkade");				  	  				 		  	
		  }
		});		
	}

	function processItems(items){
		self.itemList.removeAll();
		$.each(items, function(i, item){
			var myItem = new ItemFactory(item, getItems);
			self.itemList.push(myItem);
		})
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