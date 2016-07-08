function ItemFactory(item, getItems){
		this.name = item.fields.name;
		this.done = item.fields.done;
		this.id = item.pk;
		this.showItem = ko.observable(true);
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
		  	getItems();
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
		  	getItems();
		  }
		});
	}

		return this; 
	}