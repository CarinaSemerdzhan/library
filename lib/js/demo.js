document.addEventListener("DOMContentLoaded", function(event) {
    var button = document.getElementById("get");

	button.addEventListener('click', function(e) {

		var tag = document.getElementById("tag").value,
			selector = document.getElementById("selector").value,
			method = document.getElementById("method").value;

		$(tag)[method](selector);

		document.getElementById("result").innerHTML = '<p>$("'+tag+'").'+method+'("'+selector+'");</p>'


	}, false);
 });