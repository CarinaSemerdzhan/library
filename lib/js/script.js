var obj = function (el) {
	this.el = document.querySelectorAll(el);
	//console.log(this.elements.length)

	this.loop = function (elObj, method, val) {
		for (i=0; i <= elObj.length-1; i++) {
			var exp = /([a-zA-Z],)+/.test(val);
			if (exp) {
				arrSel = val.split(",");
				for (var j = 0; j <= arrSel.length-1; j++) {
					arrSel[j] = arrSel[j].replace(/\s+/g, '');
			    	elObj[i].classList[method](arrSel[j]);
			    }
			} else {
				elObj[i].classList[method](val);
			}
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
	},
}	

function $ (el) {
	return new obj(el);
}