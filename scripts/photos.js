var div = $("div#images");
console.log(div);
var visible = null;

var shuffle = function () {
	console.log(div);
	var n = div.children().length;
	if (visible != null) {
		visible.hide()
	}
	visible = div.children()[Math.floor(Math.random() * n)];
	visible.show();
};
shuffle();
$("#shuffle").click(shufle);
