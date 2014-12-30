var obj = function (el) {
	this.el = document.querySelectorAll(el);
	//console.log(this.elements.length)

	// for (i=0; i <= this.elements.length; i++) {
	// 	console.log(this.elements[i]);
	// }
}

obj.prototype.addClass = function (value){
	//console.log(this.el);
	this.el[0].classList.add(value);
	return this;
}

function $ (el) {
	return new obj(el);
}