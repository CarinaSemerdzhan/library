//document.addEventListener("DOMContentLoaded", function(event) {
    //console.log("DOM fully loaded and parsed");
	    $ = function (elements) {
		this.elements = document.querySelectorAll(elements);
		//return document.querySelector(elemtns);
		//this.elements[0].className += " anotherClass";
		console.log(this.elements[0].classList.add("myclass"));
	}
 // });