var canvas = document.getElementById("my_canvas");
var ctx = canvas.getContext("2d");

// static variables
var PAD = 30;
var DIM = (canvas.width - 2*PAD - 6*PAD) / 7;
var MARGIN = 15;

// drawing background
ctx.fillStyle = "rgba(161,117,13,0.2)"
ctx.beginPath();
ctx.rect(0, 0, canvas.width, DIM + PAD * 2 );
ctx.fill();
ctx.closePath();

// drawing tiles
ctx.fillStyle = "rgba(190,245,255,1.0)";
ctx.font = "48px serif"
function init() {
    for (i = 0; i < 7; i++) {
        eraseLetter(i);
    }
}

//form dictionary
//http://ejohn.org/blog/dictionary-lookups-in-javascript/
//https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-usa-no-swears-long.txt
var dict = {};
var fs = require("fs");
document.getElementById('log').innerHTML="Hello";
var txt = fs.readFileSync("https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-usa-no-swears-long.txt");
var words = txt.split("\n");
var w_len = words.length;
for (i = 0; i < w_len; i++) {
    dict[words[i]] = true;
}

document.getElementById('log').innerHTML=dict[2];

//begin game!
init();

// game variables
GAME_TIME = 30;
HAND_SIZE = 7;
Math.random() * 25;
words = [];
document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(e) {
    kc = e.keyCode;
    if (kc >= 65 && kc <= 90) {
        ind = words.push(String.fromCharCode(kc)) - 1;
        drawLetter(ind, words[ind]);
        if (ind >= 6) { //reached max word length, reset tiles.
            validateWord(words);
            words = [];
            init();
        }
    }
    else if (kc == 8) { //kc = backspace
        words.pop();
        eraseLetter(ind);
        ind--;
    }
    else if (kc == 13) { //kc = enter key
        validateWord(words);
        words = [];
        init();
    }
}

function drawLetter(n, ch) {
    ctx.strokeText(ch, PAD + n * (PAD + DIM) + MARGIN, PAD + DIM - MARGIN);
}

function eraseLetter(n) {
    ctx.beginPath();
    ctx.rect(PAD + n * (PAD + DIM), PAD, DIM, DIM);
    ctx.fill();
    ctx.closePath();
}

function validateWord() {
    // check if it is a word
    // if yes: 1) print word below. 2) calculate score, add score. 3) success.
    //         4) words.
    // if no: erase word, notify player.
}

/**
 var draw_anim;
 var draw_id;
 var id_two;
 var draw_size;
 var draw_x;
 var draw_y;
 function drawLetter(n, ch) {
	draw_anim = 0;
  draw_x = n * PAD + (n - 1) * DIM;
  draw_y = PAD;
  draw_size = DIM;
	draw_id = setInterval(function() { drawLetterFrame(n, ch) }, 5);
}
 function drawLetterFrame(n, ch) {
	if (draw_anim >= 5) {
  	clearInterval(draw_id);
	}
  else {
  	draw_x--;
    draw_y--;
    draw_size += 2;
  	ctx.fillRect(draw_x, draw_y, draw_size, draw_size);
  	draw_anim++;
  }
	ctx.strokeText(ch, n * PAD + (n - 1) * DIM + MARGIN, PAD + DIM - MARGIN);

}

 function unbumpRect(n) {
	id_two = setInterval(unbumpRectFrame,5);
}

 */