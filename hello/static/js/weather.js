function weatherVm(){
	var self = this;

	self.temperature = ko.observable('');
	self.minTemp = ko.observable('');
	self.maxTemp = ko.observable('');
	self.wind = ko.observable('');
	self.destionationName = ko.observable('');
	self.drawChart = false; 
	// var localhost = false; 

	var weather; 
	function loadData()
	{ 
		if (document.location.hostname == "localhost"){
			weather = {"coord":{"lon":13.19,"lat":55.71},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"base":"cmc stations","main":{"temp":16.67,"pressure":1011,"humidity":82,"temp_min":16,"temp_max":17},"wind":{"speed":3.6,"deg":190},"clouds":{"all":0},"dt":1467314410,"sys":{"type":1,"id":5397,"message":0.0051,"country":"SE","sunrise":1467253674,"sunset":1467316435},"id":2693678,"name":"Lund","cod":200};
			readData(weather);
		}  
		else{
			$.getJSON('/weather/get/', function (data) {
				weather = data;
				readData(data);
			}); 
		}
	}

	loadData();

	function readData(weather){
		self.temperature(Math.round(weather.main.temp));
		self.minTemp(Math.round(weather.main.temp_min));
		self.maxTemp(Math.round(weather.main.temp_max));
		self.wind(weather.wind.speed); 
		self.destionationName(weather.name); 
	}	

	function drawChart(){
		self.drawChart = true;
		var ctx = document.getElementById("myChart");
		var data = [18, 19, 16];

		var scatterChart = new Chart(ctx, {
		    type: 'line',
		    backgroundColor: '#fff',
		    data: {
		        datasets: [{
		            label: null,
		            data: [{
		                x: 0,
		                y: 20
		            }, {
		                x: 2,
		                y: 28
		            }, {
		                x: 4,
		                y: 30
		            },
		             {
		                x: 6,
		                y: 28
		            },
		            {
		                x: 8,
		                y: 20
		            }]
		        }]
		    },
		    options: {
		        scales: {
		            xAxes: [{
		                type: 'linear',
		                position: 'bottom', 
		                display: false

		            }]
		            , yAxes: [{
		            	display: false
		            }]
		        }
		    }
		});
	}

	//loadData();

	//drawChart();

	// self.temperature = temperature;
	// self.minTemp = minTemp;
	// self.maxTemp = maxTemp; 
	// self.wind = wind; 
	// self.drawChart = false;
	// self.name = name; 
}