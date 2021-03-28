var red_f = 1.5/12;
var blue_f = 5/12;

var RED = "#a05d68";
var BLUE = "#282d44";
var BLACK = "black";

var NAME = "Jack Schluger";
var COOKIE_NAME = "header";

function decorate_name(name, colors) {
    var out = "";
    for (var i = 0; i < name.length; i++) {
	out += '<span style="color:'+ colors[i] +'">'+name[i]+'</span>';
    }
    return out;
}

function pick_colors(name) {
    var colors = [];
    for (var i = 0; i < name.length; i++) {
	if (Math.random() < red_f) {
	    colors.push(RED);
	}
	else {
	    var r =  Math.random();
	    if (red_f < r && r < red_f + blue_f) {
		colors.push(BLUE);
	    }
	    else {
		colors.push(BLACK);
	    }
	}
    }
    return colors;
}

// https://coderrocketfuel.com/article/how-to-create-read-update-and-delete-cookies-in-javascript
function getCookieValue(name) {
    const nameString = name + "=";

  const value = document.cookie.split(";").filter(item => {
      return item.includes(nameString);
  })

  if (value.length) {
      return value[0].substring(nameString.length+1, value[0].length);
  } else {
      return "";
  }
}


function main() {
    var MAX_C = 2;
    console.log('unparsed cookie is');
    console.log(document.cookie);
    var val = getCookieValue(COOKIE_NAME);
    console.log('val: <'+val+'>');
    console.log(typeof(val));
    var data = {};
    if (val.length > 0) {
	try {
	    data = JSON.parse(val);
	    console.log('found data');

	}
	catch(err) {
	    console.log('caught err <'+err+'> parsing cookie; overwriting');
	    console.log('setting data');
	}
	
    } else { console.log('setting data'); }
    console.log(data);
    
    if ((!('c' in data && 'colors' in data)) || data.c >= MAX_C) {
	console.log(!('c' in data));
	console.log( data.c == MAX_C);
	console.log('case 1');
        data.c = 0;
        data.colors = pick_colors(NAME);
        $('#name').html(decorate_name(NAME, data.colors));
    }
    else {
	console.log('case 2');
        data.c += 1;
	
        $('#name').html(decorate_name(NAME, data.colors));
    }
    console.log('writing data');
    console.log(data);
    document.cookie = COOKIE_NAME+"="+JSON.stringify(data)
}

main();

function rot_right(lst) {
    lst.unshift(lst.pop());
}
function rot_left(lst) {
    lst.push(lst.shift());
}

function rotate_colors_right() {
    var val = getCookieValue(COOKIE_NAME);
    var data = JSON.parse(val);
    rot_right(data.colors);
    document.cookie = COOKIE_NAME+"="+JSON.stringify(data)
    $('#name').html(decorate_name(NAME, data.colors));
}

function rotate_colors_left() {
    var val = getCookieValue(COOKIE_NAME);
    var data = JSON.parse(val);
    rot_left(data.colors);
    document.cookie = COOKIE_NAME+"="+JSON.stringify(data)
    $('#name').html(decorate_name(NAME, data.colors));
}
