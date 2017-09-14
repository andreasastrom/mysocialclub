function recipeModel(recipe)
{
	var self = this;
	var server = document.server;
	self.name = recipe.name;
	self.link = recipe.link;
	self.id = recipe.id;
	self.vegetarian = recipe.vegetarian;
	self.editRecipie = ko.observable(false);
	self.show = ko.observable(true);
	self.favorite = ko.observable(recipe.favorite);

	function toggleEditRecipe() {
		self.editRecipie(!self.editRecipie());
	}

	function remove() {
		if (confirm('Är du säker på att du vill ta bort receptet?')) {
			server.post(
				'/recipe/remove',
				{'id': self.id},
				function(response){
					self.show(false);
					self.editRecipie(false);
				},
				null
			);
		}
	}

	function toggleFavorite() {
		self.favorite(!self.favorite());
	}

	function update() {
		var data = {
			    "id": self.id,
				"name": self.name,
				"link": self.link,
				"vegetarian": self.vegetarian,
				"favorite": self.favorite()
			};

		server.post(
			'/recipe/update',
			data,
			function(response) {
				//lägg in feedback
				//debugger;
			},
			null
		);
	}

	self.toggleFavorite = toggleFavorite;
	self.remove = remove;
	self.toggleEditRecipe = toggleEditRecipe;
	self.update = update;

}