var visible = null;

var shuffle = function () {
	console.log(div);
	var n = $('img.shuffle-image').length;
	if (visible != null) {
		visible.style.display = 'none'
	}
	var next = visible;
	while (next == visible) next = $('img.shuffle-image')[Math.floor(Math.random() * n)];
	visible = next;
	visible.style.display = 'inline';
};
shuffle();
$("#shuffle").click(shuffle);
