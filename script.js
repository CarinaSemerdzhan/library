var obj = function (el) {
	var dtp    = DOMTokenList.prototype;

	this.el = document.querySelectorAll(el);
	//console.log(this.elements.length)

	this.loop = function (elObj, method, val) {
		for (i=0; i <= elObj.length-1; i++) {
			elObj[i].classList[method](val);
		}
	}
}

obj.prototype = {
	addClass: function (value) {
		this.loop(this.el, "add", value);
		return this;
	},
	removeClass: function (value) {
		this.loop(this.el, "remove", value);
		return this;
	},
	toggleClass: function (value) {
		this.loop(this.el, "toggle", value);
		return this;
	}
}

function $ (el) {
	return new obj(el);
}