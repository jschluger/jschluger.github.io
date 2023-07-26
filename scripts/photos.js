var visible = null;

var shuffle = function () {
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


var links = ["https://lh3.googleusercontent.com/pw/AIL4fc98nc-4mKTs8UCE4qfzwID8yXHkadttCLTV_tKoHwqIrxuFclcTTtNkesrw2m45A_z7Bgq1v3CypWDoD4ulzM3w4qB6H9iaFeliab-JE343_ZwG_GFCdcfZzrxavTFH63PxZ86hHwlqxuegxOnGejRo=w1102-h1378-s-no?authuser=0",
	     "https://lh3.googleusercontent.com/pw/AIL4fc9HSwM2CSQGSnw620af1HFNAKZIhun3TRZVEiYFLpg8i8XuRWVIgyb6uW4sFjDfbkZQtKka8xx--C07Zo9qqVNGntyqDhrIA47eEs3LmoqfYrWlwRl1nW4AEL_KfDpFJVLAugaktLVN0nZhdnLxLx1s=w2066-h1378-s-no?authuser=0"
	    ];

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

