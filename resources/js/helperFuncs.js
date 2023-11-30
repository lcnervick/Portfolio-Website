function setCookie(cname, cvalue, revert=0) {
	const exdays = 0;
	const d = new Date();
	d.setTime(d.getTime() + (revert));
	let expires = "expires="+(revert ? d.toUTCString() : '');
	document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/; SameSite=Strict; Secure";
	if(revert) {
		setTimeout(function() {
			deleteCookie(cname);
		}, revert);
	}
}
function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i <ca.length; i++) {
	  let c = ca[i];
	  while (c.charAt(0) == ' ') {
		c = c.substring(1);
	  }
	  if (c.indexOf(name) == 0) {
		return c.substring(name.length, c.length);
	  }
	}
	return null;
}
function getCookies() {
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(/\s*;\s*/);
	let returnObj = {};
	ca.forEach((value,i) => {
		let cookie = value.split(/\s*=\s*/);
		returnObj[cookie[0]] = cookie[1];
	});
	return returnObj;
}
function deleteCookie(cname) {
	document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict; Secure";
}

String.prototype.nl2br = function () {
	//if(typeof this != 'string') return false;
	return this.replace(/\n/g, "<br>");
}
String.prototype.br2nl = function () {
	//if(typeof this != 'string') return false;
	return this.replace(/<br \/>|<br>/ig, "\n");
}

String.prototype.ucfirst = function () {
	//    return this.charAt(0).toUpperCase() + this.slice(1);
	return this.replace(/^\w\S/, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1);
	});
}
String.prototype.ucwords = function () {
	//    return this.charAt(0).toUpperCase() + this.slice(1);
	return this.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1);
	});
}
String.prototype.insertAt=function(index, replacement) {
    return this.substring(0, index) + replacement+ this.substring(index);
}
Number.prototype.formatMoney = function (c) {
	var c = isNaN(c = Math.abs(c)) ? 2 : c,
		n = this,
		s = n < 0 ? "-" : "",
		i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
		j = (j = i.length) > 3 ? j % 3 : 0;

	return s + (j ? i.substr(0, j) + "," : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + ",") + (c ? "." + Math.abs(n - i).toFixed(c).slice(2) : "");
};
String.prototype.formatMoney = function(c) {
	var c = isNaN(c = Math.abs(c)) ? 2 : c;
	return parseFloat(this).formatMoney(c);
}

Date.prototype.formatDate = function () {
	var d = this;
	if(d == "Invalid Date") return '';
	month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [year, month, day].join('-');
}

String.prototype.prettyDate = function() {
	var d = this.split(/\-|\//); //new Date(Date.parse(this));//new Date(date),
	d = new Date(d[0],d[1]-1,d[2]);
	var month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [month, day, year].join('/');
}
Date.prototype.prettyDate = function() {
	var d = new Date(Date.parse(this));//new Date(date),
	month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [month, day, year].join('/');
}

Date.prototype.formatTime = function(includeAmPm = false, includeSeconds = true) {
	if(this == "Invalid Date") return '';
	let hours = this.getHours();
	let minutes = this.getMinutes();
	let seconds = this.getSeconds();

	let ampm = hours > 12 ? "pm" : "am";
	if(includeAmPm) hours = hours > 12 ? hours - 12 : hours;

	if(hours < 10) hours = "0"+hours;
	if(minutes < 10) minutes = "0"+minutes;
	if(seconds < 10) seconds = "0"+seconds;

	return hours + ":" + minutes + (includeSeconds ? (":" + seconds) : '') + (includeAmPm ? ampm : '');
}

String.prototype.formatTime = function () {
	if (!this.match(/^[0-2]\d:[0-5]\d:[0-5]\d$/)) {
		// throw "Incorrect Time Format. Must be HH:MM:SS";
		return "TBD";
	} else {
		var time = this.split(":");
		var hours = parseInt(time[0]);
		var minutes = time[1];
		var ampm = hours > 12 ? " pm" : " am";
		hours = hours > 12 ? hours - 12 : hours;
		return hours + ":" + minutes + ampm;
	}
}
String.prototype.formatPhone = function() {
	let number = this.replace(/[^\dx]/g,"").match(/^(\d{3})(\d{3})(\d{4})(x\d+)?/);
	let phone = number ? "("+number[1]+") "+number[2]+"-"+number[3]+(number[4]?" "+number[4]:"") : this;
	return phone;
}
