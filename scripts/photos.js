$('body').css("background", "black");
$('#content').css("background", "black");
$('body').css("color", "white");

// var visible = null;

// var shuffle = function () {
// 	var n = $('img.shuffle-image').length;
// 	if (visible != null) {
// 		visible.style.display = 'none'
// 	}
// 	var next = visible;
// 	while (next == visible) next = $('img.shuffle-image')[Math.floor(Math.random() * n)];
// 	visible = next;
// 	visible.style.display = 'inline';
// };
// shuffle();
// $("#shuffle").click(shuffle);

// Load Images
var to_load_indexes = []
for (j in document.images) {
    var image = document.images[j];
    if (image.className == 'loadImage') {
	to_load_indexes.push(j);
    }
}

console.log('to_load_indexes');
console.log(to_load_indexes);

var load0 = new Image();
load0.onload = function(){
    document.images[to_load_indexes[0]].src = this.src;   
};
var load1 = new Image();
load1.onload = function(){
    document.images[to_load_indexes[1]].src = this.src;   
};
var load2 = new Image();
load2.onload = function(){
    document.images[to_load_indexes[2]].src = this.src;   
};

load0.src = document.images[to_load_indexes[0]].id
load1.src = document.images[to_load_indexes[1]].id
load2.src = document.images[to_load_indexes[2]].id

