var state = 1;
var swap = function() {
    console.log("state=",state);
    if (state == 0) {
	$("#academic-intro").hide();
	$("#personal-intro").show();

	state = 1;
    }
    else {
	$("#academic-intro").show();
	$("#personal-intro").hide();

	state = 0;
    } 
};

swap();
$("#rotate").click(swap);
