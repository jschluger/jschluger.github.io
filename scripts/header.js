var red_f = 1.5/12;
var blue_f = 3/12;

var RED = "#a05d68";
var BLUE = "#282d44";



var decorate_name = function(name) {
    var name = $('#name').text();
    var out = "";
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
    return out;
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
    var cookie_name = "header"
    var MAX_C = 2;
    console.log('unparsed cookie is');
    console.log(document.cookie);
    var val = getCookieValue(cookie_name);
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
    
    if ((!('c' in data)) || data.c >= MAX_C) {
	console.log(!('c' in data));
	console.log( data.c == MAX_C);
	console.log('case 1');
        data.c = 0;
        data.html = decorate_name("Jack Schluger");
        $('#name').html(data.html);
    }
    else {
	console.log('case 2');
        data.c += 1;
        $('#name').html(data.html);
    }
    console.log('writing data');
    console.log(data);
    document.cookie = cookie_name+"="+JSON.stringify(data)
}

main();
