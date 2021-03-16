var name = $('#name').text();
var out = "";

var red_f = 2/12;
var blue_f = 1/12;

var RED = "#a05d68";
var BLUE = "#282d44";

for (var i = 0; i < name.length; i++) {
    var letter = name[i];
    if (Math.random() < red_f) {
	out += '<span style="color:'+ RED +'">'+letter+'</span>';
    }
    else {
	var r =  Math.random();
	if (red_f < r && r < red_f + blue_f) {
	    out += '<span style="color:'+ BLUE +'">'+letter+'</span>';
	}
	else {
	    out += letter;
	}
    }
}

$('#name').html(out)
