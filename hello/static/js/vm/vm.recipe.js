function recipeVm() {
	var self = this;
	var server = document.server;
	self.name = ko.observable('');
	self.link = ko.observable('');
	self.saveSuccess = ko.observable(false);
	self.currentState = ko.observable('add');
	self.recipeList = ko.observableArray();

	function create() {
		if (!!self.name() && !!self.link()) {
			var data = {
				"user_id": document.user.id,
				"recipe": {
					"name": self.name(),
					"link": self.link()
				}
			};
			server.post(
				'/recipe/create',
				data,
				function success() {
					self.name('');
					self.link('');
					self.saveSuccess(true);
					setTimeout(function () {
						self.saveSuccess(false);
					},4000);
				},
				null);
		}
		else {
			console.log("Saknar något");
		}
	}

	function get() {
		server.get(
			'/recipe/get',
			null,
			function success(response) {
				mapRecipes(response);
			},
			null);
	}

	function toggleSubMenu(state) {
		if(state === 'favorit'){
			self.get();
			self.currentState(state);
		}
		else {
			self.currentState(state);
		}
	}

	function mapRecipes(recipes) {
		_.each(recipes, function(recipe) {
			var mappedRecipe = new recipeModel(recipe);
			self.recipeList.push(mappedRecipe);
		});
	}

	self.get = get;
	self.create = create;
	self.toggleSubMenu = toggleSubMenu;
}