ko.components.register('countdown', {
    viewModel: countdownVm,
    template: {require: 'text!templates/countdownTemplate.html'}
});

ko.components.register('topmenu', {
    viewModel: menuVm,
    template: {require: 'text!templates/menuTemplate.html'}
});

ko.components.register('add-more', {
    viewModel: function(params) {    	
    	addMoreVm(
    		params.title,
    		params.title2,
    		params.show,
    		params.inputValue, 
    		params.submitInput,
    		params.visible
		)
    },    
    template: {require: 'text!templates/addMoreTemplate.html'},     
});


ko.components.register('login-template', {
    viewModel: function(params) {
        loginVm(
            params.loggedInOk
        )
    },
    template: {require: 'text!templates/loginTemplate.html'}
});


ko.components.register('edit-user', {
    viewModel: editUserVm,
    template: {require: 'text!templates/editUserTemplate.html'}
});
ko.components.register('recipe', {
    viewModel: recipeVm,
    template: {require: 'text!templates/recipeTemplate.html'}
});