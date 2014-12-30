document.addEventListener("DOMContentLoaded", function() {
    var button = document.getElementById("get");

	button.addEventListener('click', function(e) {
		var tag = document.getElementById("tag").value,
			selector = document.getElementById("selector").value,
			method = document.getElementById("method").value;
			$(tag)[method](selector);
	}, false);
 });