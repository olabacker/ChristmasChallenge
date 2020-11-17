
$(function () {

    //setTimeout(snow("asdasd"), 1000);

    snow("asdasd");
});

function snow(cmd) {


    // $(".container").remove();

    // var canvas = document.createElement('canvas');

    // canvas.id = "snow";
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;

    // var body = document.getElementsByTagName("body")[0];

    //while (document.getElementById('snow') === null) {
    //    setTimeout(snow("asasd"), 1000);
    //    return;
    //}

   
    //document.getElementById('snow').height = window.innerHeight;
    // body.appendChild(canvas);

    //if (!isNaN(cmd) && cmd != "") {
    //    console.log("orfoflf");
    //    createSnow(cmd);
    //} else {
    //    console.log("wtf");
        
    //}
    createSnow(150);

    loop();

    return "Starting snowstorm...";


}



var animFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame,
    snowflakes = [];
/*
window.onresize = function () {
    var canvas = document.getElementById('snow');
    var ctx = document.getElementById('snow').getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    for (var i = 0; i < snowflakes.length; i++) {
        snowflakes[i].resized();
    }
}*/

function update() {
    for (var i = 0; i < snowflakes.length; i++) {
        snowflakes[i].update();
    }
}

function Snow() {
    this.x = random(0, 2000);
    this.y = random(-650, 0);
    this.radius = random(0.1, 2.0);
    this.speed = random(0.5, 2);
    this.wind = random(-0.5, 3.0);
    this.isResized = false;

    this.updateData = function () {
        this.x = random(0, 2000);
        this.y = random(-650, 0);
    };

    this.resized = function () {
        this.isResized = true;
    };
}

Snow.prototype.draw = function () {
    if (document.getElementById('snow') === null) {
        console.log("canvas is null!");
        return;
    }

    var ctx = document.getElementById('snow').getContext('2d');
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFF';
    ctx.fill();
    ctx.closePath();
};

Snow.prototype.update = function () {
    if (document.getElementById('snow') === null) {
        console.log("canvas is null!");
        return;
    }


    var ctx = document.getElementById('snow').getContext('2d');
    this.y += this.speed;
    this.x += this.wind;

    if (this.y > ctx.canvas.height) {
        if (this.isResized) {
            this.updateData();
            this.isResized = false;
        } else {
            this.y = 0;
            this.x = random(0, 2000);
        }
    }
};

function createSnow(count) {
    for (var i = 0; i < count; i++) {
        snowflakes[i] = new Snow();
    }
}

function draw() {
    if (document.getElementById('snow') === null) {
        console.log("canvas is null!");
        return;
    }



    var ctx = document.getElementById('snow').getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (var i = 0; i < snowflakes.length; i++) {
        snowflakes[i].draw();
    }
}

function loop() {
    try {
        draw();
        update();
        animFrame(loop);

        if (document.getElementById('snow').width !== window.innerWidth) {
            //console.log(window.innerWidth);
            //document.getElementById('snow').width = window.innerWidth;
        }
    } catch (e) {
        console.log(e);
    }

}

function random(min, max) {
    var rand = (min + Math.random() * (max - min)).toFixed(1);
    rand = Math.round(rand);
    return rand;
}