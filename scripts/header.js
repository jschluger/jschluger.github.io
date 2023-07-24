var NAME = "Charlotte Schluger";
var COOKIE_NAME = "header";

function decorate_name(name, colors) {
    var out = "";
    var offset = 0;
    for (var i = 0; i < name.length; i++) {
        if (name[i] == " ") {
            out += "<span> </span> ";
            offset += 1;
        }
        else out += '<span style="color:' + colors[i - offset] + '">' + name[i] + '</span>';

    }
    return out;
}


var PURPLE_1 = "#8a28b8";
var PURPLE_2 = "#c71cbb";
var RED_1 = "#c71c2a";
var BLACK = "black";
var choices = [PURPLE_1, PURPLE_1, PURPLE_1, PURPLE_2, RED_1, BLACK, BLACK, BLACK];

function pick_colors(name) {
    var colors = [];
    for (var i = 0; i < name.length - 1; i++) {
	colors.push( choices[Math.floor(Math.random()* choices.length) ] );
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
        return value[0].substring(nameString.length, value[0].length);
    } else {
        return "";
    }
}


function main() {
    var MAX_C = 2;
    console.log('unparsed cookie is');
    console.log(document.cookie);
    var val = getCookieValue(COOKIE_NAME);
    console.log('val: <' + val + '>');
    console.log(typeof (val));
    var data = {};
    if (val.length > 0) {
        try {
            data = JSON.parse(val);
            console.log('found data');

        }
        catch (err) {
            console.log('caught err <' + err + '> parsing cookie; overwriting');
            console.log('setting data');
        }

    } else { console.log('setting data'); }
    console.log(data);

    if ((!('c' in data && 'colors' in data)) || data.c >= MAX_C) {
        console.log(!('c' in data));
        console.log(data.c == MAX_C);
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
    document.cookie = COOKIE_NAME + "=" + JSON.stringify(data)
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
    document.cookie = COOKIE_NAME + "=" + JSON.stringify(data)
    $('#name').html(decorate_name(NAME, data.colors));
}

function rotate_colors_left() {
    var val = getCookieValue(COOKIE_NAME);
    var data = JSON.parse(val);
    rot_left(data.colors);
    document.cookie = COOKIE_NAME + "=" + JSON.stringify(data)
    $('#name').html(decorate_name(NAME, data.colors));
}

$('#name-arrow-left').click(rotate_colors_left);
$('#name-arrow-right').click(rotate_colors_right);
