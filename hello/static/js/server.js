function server() {
	var self = this;
	function post(url, data, callback, error) {
		$.ajax({
			type: "POST",
			url: url,
			contentType : 'application/json',
			data: JSON.stringify(data),
			success: function(response) {
				if(!!callback){
					callback();
				}
			},
			error: function(error) {
				console.log("error");
			}
		});
	}

	function get(url, data, callback, error) {
		$.ajax({
			type: "GET",
			url: url,
			contentType : 'application/json',
			data: (!!data? JSON.stringify(data) : null),
			success: function(response) {
				if(!!callback){
					callback(response);
				}
			},
			error: function(error) {
				console.log("error");
			}
		});
	}
	self.get = get;
	self.post = post;
	return self;
}