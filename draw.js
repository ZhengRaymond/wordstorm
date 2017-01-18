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
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    for (var i = 0; i < HAND_SIZE; i++) {
        ctx.fillRect(EDGE_MARGIN + (BOX_MARGIN + BOX_DIM) * i - BASE_WIDTH, BOX_MARGIN + BASE_HEIGHT, BOX_DIM, BOX_DIM);
    }
    ctx.font= (BOX_DIM * 4 / 5) + 'px OCR';
    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    for (var i = 0; i < word.length; i++) {
        ctx.fillText(word[i], EDGE_MARGIN + (BOX_MARGIN + BOX_DIM) * i + BOX_PAD - BASE_WIDTH + 5, BOX_DIM + BOX_MARGIN - BOX_PAD + BASE_HEIGHT - 5);
    }
}

// drawing Hand
function drawHand(hand) {
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    for (var i = 0; i < HAND_SIZE; i++) {
        ctx.fillRect(EDGE_MARGIN + (BOX_MARGIN + BOX_DIM) * i - BASE_WIDTH, BOX_DIM + 4 * BOX_MARGIN + BASE_HEIGHT, BOX_DIM, BOX_DIM);
    }
    ctx.font = (BOX_DIM * 4 / 5) + 'px OCR';
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

function animateLetter(top, bot) {
    console.log("top: " + top + "; bot: " + bot + ".");
    var tileTop = $("#tile" + top);
    tileTop.css({ opacity: 1 });
    tileTop.animate({
        opacity: 0
    });
    var tileBot = $("#tile" + bot);
    tileBot.css({ opacity: 0 });
    tileBot.animate({
        opacity: 1
    });
}

function animateBackspace(top, bot) {
    console.log("top: " + top + "; bot: " + bot + ".");
    $("#tile" + top).css({ opacity: 0.01 });
    $("#tile" + top).animate({
        opacity: 0.5
    });
    $("#tile" + bot).css({ opacity: 1 });
    $("#tile" + bot).animate({
        opacity: 0
    });
}

function animateSpacebar() {
    for (var i = 8; i <= 14; i++) {
        $("#tile" + i).css({opacity: 0});
        $("#tile" + i).animate({
            opacity: 1
        });
    }
    setTimeout(function() {
        console.log("Test");
        draw();
    }, 500);
    for (var i = 8; i <= 14; i++) {
        $("#tile" + i).animate({
            opacity: 0
        });
    }
}

function animateEnter(top, bot) {
    for (var i = 1; i <= top; i++) {
        $("#tile" + i).css({ opacity: 0 });
        $("#tile" + i).animate({
           opacity: 1
        });
    }
    for (var i = bot + 1 + 7; i <= 14; i++) {
        $("#tile" + i).css({ opacity: 1 });
        $("#tile" + i).animate({
            opacity: 0
        });
    }
}
