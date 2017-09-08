function recipeVm() {
	var self = this;
	var server = document.server;
	self.name = ko.observable('');
	self.link = ko.observable('');
	self.vegetarian = ko.observable(false);
	self.saveSuccess = ko.observable(false);
	self.currentState = ko.observable('add');
	self.recipeList = ko.observableArray();
	self.loader = ko.observable(false);

	function create() {
		if (!!self.name() && !!self.link()) {
			debugger;
			var data = {
				"user_id": document.user.id,
				"recipe": {
					"name": self.name(),
					"link": self.link(),
					"vegetarian": self.vegetarian() ? 1 : 0
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
		self.loader(true);
		server.get(
			'/recipe/get',
			null,
			function success(response) {
				mapRecipes(response);
				self.loader(false);
			},
			null);
	}

	function toggleSubMenu(state) {
		if(state === 'favorit') {
			if(self.recipeList().length == 0) {
				self.get();
			}
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