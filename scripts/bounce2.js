const g=4;
const FLOOR=100000;
const MS_PER_FRAME=33.33333;
const START_SPEED=50;
const spinThresh=0.01;

let keep_going=false;
let destroy_mode=false;
let super_destroy_mode=false;
let gravity=false;


let basic_objects_jq = $('body').children()
let basic_objects = {};
basic_objects_jq.each(function() {
    basic_objects[this.id] = {
	id: this.id,
	speed:0,
	gravSpeed:0,
	angle:0,
	spinSpeed:0,
	spinDecay:0.99,
	rotationAngle:0,
	b:$(this),
	speedIncreasing:true,
	stopping:false,
	running_children: [],
	overlaping: [],
	x: $(this).get(0).getBoundingClientRect().left,
	y: $(this).get(0).getBoundingClientRect().top,
	dy: 0, dx: 0,
	next_speed: default_next_speed,
	acc:{}
    }
})
let objects = basic_objects;


let use_tags = ['P','A','SPAN','DIV','H1','H3','H4','EM','LI','TD','IMG']
let all_objects = false;
function crawl(collect,i=0,calls=1){
    collect.each(function(){
	i +=1;
	let name=$(this).prop('tagName');
	console.log(name);
	if ($(this).position && (this.id || use_tags.includes(name))) {
	    if (this.id && basic_objects[this.id]) {
		all_objects[this.id] = basic_objects[this.id]
		console.log('linking all_objects['+this.id+'] = basic_objects['+this.id+']');
	    }
	    else {
		if (!this.id){
		    this.id=name+i;
		}
		console.log('creating all_objects['+this.id+'] = {...}');
		all_objects[this.id] = {
		    id: this.id,
		    speed:0,
		    gravSpeed:0,
		    angle:0,
		    spinSpeed:0,
		    spinDecay:0.99,
		    rotationAngle:0,
		    b:$(this),
		    speedIncreasing:true,
		    stopping:false,
		    running_children: [],
		    overlaping: [],
		    x: $(this).get(0).getBoundingClientRect().left,
		    y: $(this).get(0).getBoundingClientRect().top,
		    dy: 0, dx: 0,
		    next_speed: default_next_speed,
		    acc:{}
		}
	    }
	    $('body').append(this.b);
	    if (!$(this).css('position')) {
		$(this).css('position','fixed')
	    }
	    $(this).css('top',o.y);
	    $(this).css('left',o.x);

	}
        kids = $(this).children()
        if (kids.length>0){
            crawl(kids,i*100*calls, calls+1);
        }
    })
    return 0;
}
let exclude_ids=['stopBouncing','destroy_mode','SUPER_destroy_mode'];
function detatch(o) {
    if (!exclude_ids.includes(o.b.id)) {
	o.b.insertBefore($('#index'));
	o.b.css('position','fixed')
	o.b.css('top',o.y);
	o.b.css('left',o.x);
	o.b.css('width',Math.min( window.innerWidth / 2, o.b.width()));
    }
}

function default_next_speed(speed,acceleration) {
    return speed
}

function animate() {
    let all_stopped=true;
    for (i in objects) {
	if (exclude_ids.includes(i)) continue;
	o = objects[i]

	// Check for hitting the walls to reflect direction and spin object
	let spinFactor=0;
	let reflected=false;

	if (o.b.position().top + o.b.height() > window.innerHeight && o.dy > 0) {
	    o.angle=-1*o.angle;
	    spinFactor=Math.cos(o.angle);
	    reflected=true;
	}
	if (o.b.position().top < 0 && o.dy < 0) {
	    o.angle=-1*o.angle;
	    spinFactor=Math.cos(o.angle) * -1;
	    reflected=true;
	}
	if (o.b.position().left < 0 && o.dx < 0) {
	    o.angle=Math.PI-o.angle;
	    spinFactor=Math.sin(o.angle);
	    reflected=true;
	}
	if (o.b.position().left + o.b.width() >  window.innerWidth && o.dx > 0) { // $('body').width()
	    o.angle=Math.PI-o.angle;
	    spinFactor=Math.sin(o.angle) * -1;
	    reflected=true;
	}
	o.spinSpeed+=Math.sqrt(o.speed) * spinFactor

	if (Math.abs(o.spinSpeed) > spinThresh) {
	    o.rotationAngle = (o.rotationAngle + o.spinSpeed*0.5) % 360;
	    o.b.css("transform", "rotate(" + o.rotationAngle + "deg)");
	    o.spinSpeed = o.spinSpeed * o.spinDecay;
	}
	
	// controll speed
	o.speed = o.next_speed(o.speed,o.acc)
	o.speed = Math.min(Math.sqrt(window.innerWidth**2 + window.innerHeight**2) / 3,
			   o.speed)
	
	all_stopped = all_stopped && Math.abs(o.speed) < 0.1
	
	// calculate direction
	o.dy=Math.sin(o.angle)*Math.sqrt(2);
	o.dx=Math.cos(o.angle)*Math.sqrt(2);
	
	let old_y=o.y;
	o.y = o.y + o.dy*(MS_PER_FRAME/100*o.speed);
	o.x = o.x + o.dx*(MS_PER_FRAME/100*o.speed);

	if (gravity && o.b.css('position')!='fixed') {
	    if (o.y < FLOOR) {
		o.gravSpeed += Math.max(1,Math.abs(o.y - old_y));
		o.y = o.y + (MS_PER_FRAME/100 * o.gravSpeed);
		o.spinSpeed += Math.log(o.gravSpeed)/50
	    }
	    else {
		o.gravSpeed =0
	    }
	}
	
	o.b.css('top',o.y);
	o.b.css('left',o.x);

	
	// Colisions
	i2="bouncer"
	o2=objects[i2];
	if (destroy_mode && !reflected && i != i2) {
	    if (!o2.overlaping.includes(o.id)) {
		if (checkColiding(o2.b,o.b)) {
		    if (o.speed == 0 && super_destroy_mode) {
			detatch(o);
		    }
		    mass_ratio =  (o.b.height() * o.b.width()) /  (o2.b.height() * o2.b.width())
		    console.log('collision! '+this.id+"MR"+mass_ratio)

		    //region
		    o.speed+=o2.speed/mass_ratio * (o.b.prop('tagName')=='DIV' && !super_destroy_mode?5:1)
		    o.angle += Math.sin(o2.angle)*Math.cos(o2.angle)
		    o.spinSpeed+=Math.sqrt(o.speed) * Math.sin(o.angle) * Math.cos(o.angle);
		    o.next_speed = function(speed, acc) {return Math.max(0,speed - 0.01);}

		    //ball
		    if (!super_destroy_mode) {
			o2.angle = (o2.angle + Math.PI+randomTurn(Math.PI/4))%360
			
			o2.overlaping = o2.overlaping.concat(o.id);
		    }
		}
	    }
	    else {
		if (! checkColiding(o2.b,o.b)) {
		    o2.overlaping.splice(o2.overlaping.indexOf(o.id),1)
		}   
	    }
	}
    }
    
    if (keep_going && !all_stopped) {
	setTimeout(animate, MS_PER_FRAME)}
    else {
	keep_going = false
	
	$('#stopBouncing').hide()
	$('#destroy_mode').hide()
	$('#speed_up').hide()
	$('#slow_dow').hide()
    }
}


// Collisions
function checkColiding(ball,region) {
    if (ball.css('display') == 'none' || region.css('display') == 'none') return false;
    
    var polygon = [ [ region.offset().left, region.offset().top ], 
		    [ region.offset().left+region.width(),region.offset().top ], 
		    [ region.offset().left+region.width(),region.offset().top+region.height() ], 
		    [ region.offset().left,               region.offset().top+region.height() ] ];
    var test=[ ball.offset().left, ball.offset().top ];
    return inside(test, polygon);
}

//https://stackoverflow.com/a/29915728
function inside(point, vs) {
    // ray-casting algorithm based on
    // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html
    
    var x = point[0], y = point[1];
    
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];
        
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    
    return inside;
};

//
function start_bouncing(by_id) {
    if (!keep_going) {
	console.log("comence bouncing");
	$('#'+by_id).show()
	//$('#'+by_id).css('top','20px')
	//$('#'+by_id).css('left','20px')
	//objects[by_id].x=20
	//objects[by_id].y=20
	keep_going=true;
	objects[by_id].next_speed = function(speed,acc) {return speed+0.01};
	objects[by_id].speed=START_SPEED;
	objects[by_id].angle = Math.random() * 2 * Math.PI;
	animate();
    }
}
    
function randomTurn(w) {
    r = Math.random()
    turn = r*w - w/2;
    return turn
}


function color_background(){
    let x=document.documentElement.scrollTop || document.body.scrollTop;
    x = x/1000;
    let r=231+x;
    let g=195+x/2;
    let b=150 + ( (x-200)**2/412.4) ;
    $('body').css('background', "rgb("+r+", "+g+", "+b+")");
}
///



$('#bouncer').click(function() {
    if (!keep_going) {
	start_bouncing('bouncer');
	$('#stopBouncing').show()
	$('#destroy_mode').show()
	$('#speed_up').show()
	$('#slow_down').show()
    }
})
$('#stopBouncing').click(function() {
    if (keep_going) {
	for (i in objects) {
	    o = objects[i]
	    o.stopping=true;
	    o.next_speed = function(speed,acc){return Math.max(0,speed*(Math.max(0.5,0.97-(speed/350))))}
	}
    }
})
let temp_acc = {}
$('#speed_up').click(function() {
    temp_acc['start']=objects['bouncer'].speed
    objects['bouncer'].angle += randomTurn(Math.PI/3.5)
    objects['bouncer'].next_speed  = function(speed, acc) {return speed*1.5}
    setTimeout(function() {
	objects['bouncer'].next_speed = function(speed, acc) {
	    if (objects['bouncer'].speed < temp_acc['start']*1.2)
		objects['bouncer'].next_speed  = function(speed, acc) {return speed+0.01}
	    
	    return speed*.9}
    }, 333)
})
$('#speed_up').mousedown(function(){$(this).css('background','darkseagreen')})
$('#speed_up').mouseup(function(){$(this).css('background','none')})

$('#slow_down').click(function() {
    objects['bouncer'].angle += Math.PI;
    objects['bouncer'].angle += randomTurn(Math.PI*.75);
    for (i in objects) {
	o = objects[i];
	if (o.speed > 5) {
	    temp_acc['start']=objects['bouncer'].speed
	    objects['bouncer'].next_speed  = function(speed, acc) {return speed*.9}
	    setTimeout(function() {
		objects['bouncer'].next_speed  = function(speed, acc) {return speed+0.01}
	    }, 500)
	    o.spinSpeed = objects[i].spinSpeed * 0.5;
	}
    }
})

$('#slow_down').mousedown(function(){$(this).css('background','lightcoral')})
$('#slow_down').mouseup(function(){$(this).css('background','none')})



$('#destroy_mode').click(function() {
    if (keep_going || destroy_mode) {
	destroy_mode = !destroy_mode
	if (destroy_mode) $(this).css('background','red')
	else $(this).css('background','none')
    }
    else {
	$('#destroyLabel').text('Turn on Bounce before Destroy Mode')
	setTimeout(function() {
	    $('#destroyLabel').text('')
	}, 5000);
    }
});

// None of the rest of these do anything because none of these ids are defined on this site.
// leaving for refrence
//

$('#gravity').click(function() {
    if (destroy_mode || gravity) {
	gravity=!gravity
	if (gravity) {
	    $(this).css('background','mediumaquamarine')
	    $('#goBottom').show()
	}
	else {
	    $(this).css('background','none')
	    $('#goBottom').hide()
	}
    }
    else {
	$('#gravityLabel').text('Turn on Destroy Mode before Gravity')
	setTimeout(function() {
	    $('#gravityLabel').text('')
	}, 5000);
    }
});

$('#goBottom').click(function() {
    window.scroll(0,FLOOR-300);
});

$('#SUPER_destroy_mode').click(function() {
    if (!all_objects) {
	all_objects={};
	crawl($('body').children());
    }
    
    if (destroy_mode || super_destroy_mode) {
	super_destroy_mode = !super_destroy_mode
	if (super_destroy_mode) {
	    $(this).css('background','red');
	    objects=all_objects;
	}
	else {
	    $(this).css('background','none');
	    objects=basic_objects;
	}
    }
    else {
	$('#SUPERdestroyLabel').text('Turn on Destroy Mode before Super Destroy Mode')
	setTimeout(function() {
	    $('#SUPERdestroyLabel').text('')
	}, 5000);
    }
});
