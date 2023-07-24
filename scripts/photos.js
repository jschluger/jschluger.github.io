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



var links = ["https://lh3.googleusercontent.com/pw/AIL4fc95b7e-Tcy-n60RFZ3ErgtiODrz38EwZ1T7-iqujTAyK3R4I07TNNR7MldaA3ebTL1rV5LZrBBKkPSVLcTbIYnoaQ9KohxnrZT-Ne7cpU14uP20UAU=w600-h315-p-k",
	     "https://lh3.googleusercontent.com/pw/AIL4fc8FdsvPTk2iIZCXCAUVK33VdVCnow9BNZYLm2Xb1a8rnesLQITiHUjzUl75rPPQf6OmEEab8rf3YfhESBRAySMo4CmN7XCaO-qETD0_a8zKFPneo2tLS3MMNqOfVoHw_tcKY9NlxMznwyqH_jfopYAM=w1722-h1378-s-no?authuser=0",
	     "https://lh3.googleusercontent.com/pw/AIL4fc98nc-4mKTs8UCE4qfzwID8yXHkadttCLTV_tKoHwqIrxuFclcTTtNkesrw2m45A_z7Bgq1v3CypWDoD4ulzM3w4qB6H9iaFeliab-JE343_ZwG_GFCdcfZzrxavTFH63PxZ86hHwlqxuegxOnGejRo=w1102-h1378-s-no?authuser=0"
	    ];

// Load Images
var to_load_indexes = []
for (j in document.images) {
    var image = document.images[j];
    if (image.className == 'loadImage') {
	to_load_indexes.push(j);
    }
}


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
load0.src = links[0];
load1.src = links[1];
load2.src = links[2];

