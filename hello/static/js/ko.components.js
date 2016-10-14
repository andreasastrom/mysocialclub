ko.components.register('countdown', {
    viewModel: countdownVm,
    template: {require: 'text!templates/countdownTemplate.html'}
});

ko.components.register('topmenu', {
    viewModel: menuVm,
    template: {require: 'text!templates/menuTemplate.html'}
});