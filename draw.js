"use strict";

// static variables
var WIDTH = 1011;
var HEIGHT = 750;
var HAND_SIZE = 7; // number of alphabet
var EDGE_MARGIN = 250;
var BOX_MARGIN = 10; //  space between boxes
var BOX_PAD = 15; // padding around text
var BOX_DIM = (WIDTH - EDGE_MARGIN) / HAND_SIZE - BOX_MARGIN + BOX_MARGIN / HAND_SIZE;
var BASE_WIDTH = EDGE_MARGIN / 2;
var BASE_HEIGHT = 170;
//var GAME_TIME = 30;

// Create canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.canvas.width = 986;
ctx.canvas.height = HEIGHT;
document.body.appendChild(canvas);

// loading images
// var tileImageLoaded = false;
// var tileImage = new Image();
// tileImage.onload = function() {
//     tileImageLoaded = true;
// }
// tileImage.src = './images/tile.png';

var backgroundImageLoaded = false;
var backgroundImage = new Image();
backgroundImage.onload = function () {
    ctx.drawImage(backgroundImage, 0, 0);
}
backgroundImage.src = 'images/bg.jpg';

function drawBlank() {
    ctx.drawImage(backgroundImage, 0, 0);
}

// drawing tiles
function drawTiles(word) {
    // if (tileImageLoaded) {
    //     ctx.drawImage(tileImage, EDGE_MARGIN + (BOX_MARGIN + BOX_DIM) * tileNum, BOX_MARGIN);
    // }
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    for (var i = 0; i < HAND_SIZE; i++) {
        ctx.fillRect(EDGE_MARGIN + (BOX_MARGIN + BOX_DIM) * i - BASE_WIDTH, BOX_MARGIN + BASE_HEIGHT, BOX_DIM, BOX_DIM);
    }
    ctx.font= (BOX_DIM * 4 / 5) + 'px Calibri lighter';
    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    for (var i = 0; i < word.length; i++) {
        ctx.fillText(word[i], EDGE_MARGIN + (BOX_MARGIN + BOX_DIM) * i + BOX_PAD - BASE_WIDTH + 5, BOX_DIM + BOX_MARGIN - BOX_PAD + BASE_HEIGHT - 5);
    }
}

// drawing Hand
function drawHand(hand) {
    // if (tileImageLoaded) {
    //     ctx.drawImage(tileImage, EDGE_MARGIN + (BOX_MARGIN + BOX_DIM) * tileNum, BOX_MARGIN);
    // }
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    for (var i = 0; i < HAND_SIZE; i++) {
        ctx.fillRect(EDGE_MARGIN + (BOX_MARGIN + BOX_DIM) * i - BASE_WIDTH, BOX_DIM + 4 * BOX_MARGIN + BASE_HEIGHT, BOX_DIM, BOX_DIM);
    }
    ctx.font= (BOX_DIM * 4 / 5) + 'px Calibri lighter';
    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    for (var i = 0; i < hand.length; i++) {
        ctx.fillText(hand[i], EDGE_MARGIN + (BOX_MARGIN + BOX_DIM) * i + BOX_PAD - BASE_WIDTH + 5, 2 * BOX_DIM + 4 * BOX_MARGIN - BOX_PAD + BASE_HEIGHT - 5);
    }
}

var anagramHeight = 15;
var anagramPadding = 3;
var anagramMargin = 4;
var baseY = 2 * BOX_DIM + 10 * BOX_MARGIN + BASE_HEIGHT ;
var baseX = EDGE_MARGIN / 2 + anagramPadding;
var numRows = 9;
function drawAnagram() {
    ctx.font = anagramHeight + 'px Calibri lighter';
    var text;
    for (var i = 0; i < anagrams.length; i++) {
        var extraOffset = 2;
        text = anagrams[i];
        var textLen = text.length;
        if (foundWords.indexOf(text) == -1) {
            text = "";
            for (var m = 0; m < textLen; m++) {
                text = text + "_ ";
            }
        }
        else {
            text = "  " + text;
            for (var m = 2; m < textLen; m++) {
                text = text + " ";
            }
            extraOffset = 0;
        }
        if (textLen > 5) {
            text = text + "  ";
        }
        baseX = EDGE_MARGIN / 2 + Math.floor(i / numRows) * (6 * anagramHeight + anagramPadding + anagramMargin) + anagramPadding;
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.fillRect(
            baseX - anagramPadding,
            baseY + i * (anagramHeight + anagramPadding * 2 + anagramMargin * 2) - anagramHeight - Math.floor(i / numRows) * (numRows * (anagramHeight + anagramPadding * 2 + anagramMargin * 2)),
            anagramHeight * text.length / 4 + anagramPadding * 10,
            anagramHeight + anagramPadding * 2);
        ctx.fillStyle = "rgba(255, 255, 255,1)";
        ctx.fillText(text, baseX + extraOffset * 2, baseY + i * (anagramHeight + anagramPadding * 2 + anagramMargin * 2) - Math.floor(i / numRows) * (numRows * (anagramHeight + anagramPadding * 2 + anagramMargin * 2)) - extraOffset);
    }
}


function draw() {
    drawTiles(currWord);
    drawHand(currLetters);
}