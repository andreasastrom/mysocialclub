function server() {
	var self = this;
	function post(url, data, callback, error){
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
	self.post = post;
	return self;
}