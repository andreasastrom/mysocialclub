function ItemFactory(item, reload){
	this.name = item.fields.name;
	this.done = item.fields.done;
	this.id = item.pk;	
	this.showItem = ko.observable(true);
	var checklist_id = item.fields.checklist;	
	
	this.markItemAsDone = function(){
		updateItem(this.id, this.done);
	}

	this.deleteItem = function(){
		this.showItem(false);
		removeItem(this.id)
	}

	function updateItem(id, done){
		var d = (done == 0? 1: 0);
		$.ajax({
		  type: "POST",
		  url: "/items/update/",
		  data: {id: id, done: d},
		  success: function(){
		  	console.log("Update");
		  	reload(checklist_id);
		  }
		});
	}

	function removeItem(id){
		$.ajax({
		  type: "POST",
		  url: "/items/remove/",
		  data: {id: id},
		  success: function(){
		  	console.log("Remove");
		  	reload(checklist_id);
		  }
		});
	}

		return this; 
	}