var div = $("div#images");
console.log(div);
var visible = null;

var shuffle = function () {
	console.log(div);
	var n = div.children().length;
	if (visible != null) {
		visible.hidden = true;
	}
	var next = visible;
	while (next == visible) next = div.children()[Math.floor(Math.random() * n)];
	visible = next;
	visible.hidden = false;
};
shuffle();
$("#shuffle").click(shuffle);
