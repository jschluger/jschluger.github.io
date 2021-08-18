var div = $("div#images");
console.log(div);
var visible = null;

var shuffle = function () {
	console.log(div);
	var n = div.children().length;
	if (visible != null) {
		visible.style.display = 'none'
	}
	var next = visible;
	while (next == visible) next = div.children()[Math.floor(Math.random() * n)];
	visible = next;
	visible.style.display = 'inline';
};
shuffle();
$("#shuffle").click(shuffle);
