function countdownVm() {
	var self = this;
	self.countdownactivity = ko.observable('');
	self.countdowndate = ko.observable('');
	self.activityList = ko.observableArray();
	self.countdownSettings = ko.observable(false);
	self.style = ko.observable('')
	self.showTheWorld = ko.observable(false);
	self.showLoader = ko.observable(false);
	self.styleText = ko.observable('Välj stil');	

	function createCountdown(){
		var date = $('#myDateTime').val();
		createCountDownActivity(self.countdownactivity(), date, self.style());
		self.countdownactivity('');
		// self.countdowndate('');
		self.style('');
	}


	$('#datetimepicker1').datetimepicker({		
		locale: 'sv'

	});

	function createCountDownActivity(title, date, style){	
		self.showLoader(true);	
		$.ajax({
		  type: "POST",
		  url: "/activity/create",
		  data: {title: title, date: date, style:style},
		  success: function(){
		  	console.log("Created");		  	
		  	getActivities();
		  }
		});
	}

	function processActivities(activities){
		self.activityList.removeAll();
		$.each(activities, function(i, activity){
			var myActivity = new activityFactory(activity);
			self.activityList.push(myActivity);
		})		
		self.showLoader(false);	
		self.showTheWorld(true);		
	}


	function getActivities()
	{ 
		$.getJSON('/activity/all', function (data) {
			processActivities(data);
		});   
	}

	function activityFactory(acitivty){
		this.title = acitivty.fields.title; 
		this.date = moment(acitivty.fields.starttime).format('YYYY-MM-DD hh:mm');
		this.daysLeft = (moment(acitivty.fields.starttime).diff(moment(), 'days') > 0 ? moment(acitivty.fields.starttime).diff(moment(), 'days') : moment(acitivty.fields.starttime).diff(moment(), 'hours') + 'h'); 
		this.id = acitivty.pk;
		this.showActivity = ko.observable(true);
		this.style = acitivty.fields.style;
		this.isSelected = ko.observable(false);

		this.setIsSelected = function(){
			this.isSelected(!this.isSelected());
		}

		this.removeThisActicity = function(){
			this.showActivity(false);
			removeActicity(this.id);
		}

		return this; 
	}

	function showCountdownSettings(){
		self.countdownSettings(!self.countdownSettings());
	}

	function removeActicity(id){		
		$.ajax({
		  type: "POST",
		  url: "/activity/remove",
		  data: {id: id},
		  success: function(){		  	
		  	getActivities();
		  }
		});
	}

	getActivities();
	self.showCountdownSettings = showCountdownSettings;
	self.createCountdown = createCountdown;
	return self; 
}