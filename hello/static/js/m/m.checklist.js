function checklistModel(checklist)
{
	var self = this;
	self.itemList = ko.observableArray();
	self.name = checklist.fields.name;	
	self.removed = checklist.fields.removed;
	self.checklist_id = checklist.pk;
	
	

	function loaded(data) {
		$.each(data, function(i, item){
			var myChecklists = new ItemFactory(item);
			console.log(myChecklists);						
			self.itemList.push(myItem);
		});
	}

	function load() { 
		$.getJSON('/checklist/items/', function (data) {
			loaded(data);
		}); 
	}

	load();
	//function som hämtar alla checklistepunkter med rätt id. 

	return self;		
}