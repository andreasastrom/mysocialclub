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

	function toggleEditRecipe() {
		self.editRecipie(!self.editRecipie());
	}

	function remove() {
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

	self.remove = remove;
	self.toggleEditRecipe = toggleEditRecipe;

}