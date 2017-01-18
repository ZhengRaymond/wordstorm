"use strict";

document.addEventListener("keydown", keyDownHandler, false);

//var currLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

var gameStarted = false;
var score;

var foundWords; // array of strings
var currWord; // array of chars
var currLetters; // array of chars

function init() {
    document.activeElement.blur();
	if (gameStarted) {
		endGame();
	}
	else {
        ctx.font = (BOX_DIM * 4 / 5) + 'px OCR';
        ctx.fillText(" ", 0, 0);
    }
    $("#instruct").css({
    	opacity: 0
	});
    drawBlank();

    score = 0;
    foundWords = [];
    currWord = [];
	currLetters = [];

    var consonants = 'BCDFGHJKLMNPRSTYQVWXZ';
    var difficult = 'QVWXZ';
    var vowels = 'AEIOU';
	for (var i = 0; i < 2; i++) {
        var letter = Math.floor((Math.random() * 5));
        if (currLetters.indexOf(vowels[letter]) == -1) {
            currLetters.push(vowels[letter]);
        }
        else {
            i--;
        }
	}
	for (var i = 0; i < 5; i++) {
		var letter = Math.floor((Math.random() * consonants.length));
		if (currLetters.indexOf(consonants[letter]) == -1) {
			currLetters.push(consonants[letter]);
        }
        else {
			i--;
		}
		if (difficult.indexOf(consonants[letter]) != -1) {
            consonants = consonants.substring(0, 17);
		}
	}
    findAnagrams(currLetters);
    if (anagrams.length < 70 && anagrams.length > 10) {
        anagrams.sort(function (a, b) {
            return b.length - a.length;
        });

        gameStarted = true;
        drawBlank();
        draw();
        drawAnagram();
        updateScoreboard();
        updateScore();
    }
    else {
    	init();
	}
}

var scores = []; // array of {int, string} pairs
function endGame() {
	if (gameStarted && score > 0) {
		var string;
		if (currWord.length == 0) {
			string = currLetters.sort().join('');
		}
		else if (currLetters.length == 0) {
			string = currWord.sort().join('');
		}
		else {
			string = currLetters.concat(currWord).split('').sort().join("");
        }
        var scoreItem = [score, string];
		if (scores.length == 0) {
			scores.push(scoreItem);
		}
		else {
            for (var i = 0; i < scores.length; i++) {
                if (scores[i][0] < score) {
                    scores.splice(i, 0, scoreItem);
					break;
                }
                if (i == scores.length - 1) {
                    scores.push(scoreItem);
                    break;
                }
            }
        }
	}
    updateScoreboard();
    gameStarted = false;
}

function updateScoreboard() {
    var tbody = document.getElementById("scoreBoardData");
    for (var i = 0; i < scores.length; i++) {
    	if (tbody.rows[i] != null) {
            tbody.rows[i].cells[0].innerHTML = scores[i][0];
            tbody.rows[i].cells[1].innerHTML = scores[i][1];
        }
        else {
    		var newRow = tbody.insertRow();
    		newRow.insertCell().innerHTML = scores[i][0];
    		newRow.insertCell().innerHTML = scores[i][1];
		}
    }
}

function updateScore() {
	document.getElementById('score').innerHTML = "Score: " + score;

}

function cheat() {
	document.activeElement.blur();
	if (gameStarted) {
		endGame();
		foundWords = anagrams;
		drawAnagram();
    }
}

function validWord(word) {
	return findWord(word);
}

function keyDownHandler(e) {
	if (!gameStarted) return;
	var kc = e.keyCode;
 	if ((kc >= 65 && kc <= 90) || (kc >= 97 && kc <= 122)) { // upper case letter
		if (kc >= 65 && kc <= 90) {
			kc -= 65;
        }
        else if (kc >= 97 && kc <= 122) { // lower case letter
			kc -= 97;
		}
		var ind = currLetters.indexOf(alphabet[kc]);
		if (ind != -1) {
			currWord.push(alphabet[kc]);

			var len = currLetters.length;
			if (ind != len - 1) {
				currLetters[ind] = currLetters[len - 1];
			}
			currLetters.pop();

			var top = currWord.length;
			var bot = currLetters.length + 1 + 7;
			animateLetter(top, bot);
        }
        draw();
	}
	else if (kc == 8) { // backspace
        var ind = currWord.length;
		if (ind > 0) {
			currLetters.push(currWord.pop());

            var top = currWord.length + 1;
            var bot = currLetters.length + 7;
            animateBackspace(top, bot);
        }
        draw();
 	}
 	else if (kc == 32 && currWord.length == 0) { // space
        for (var i = 0; i < 10; i++) {
			var ind1 = Math.floor(Math.random() * 7);
			var ind2 = Math.floor(Math.random() * 7);
			var temp = currLetters[ind1];
			currLetters[ind1] = currLetters[ind2];
			currLetters[ind2] = temp;
		}
        animateSpacebar();
    }
 	else if (kc == 13) { // enter
		e.preventDefault();
		var wrd = currWord.join("");
		if (wrd.length != 0) {
            if (validWord(wrd)) {
                if (foundWords.indexOf(wrd) != -1) {
                    $(".popupRed").stop();
                    $(".popupRed").fadeIn(50);
                    document.getElementById("fail").innerHTML = "Already Found";
                    $(".popupRed").fadeOut(2000);
                }
                else {
                    var txt;
                    switch (wrd.length) {
                        case 3:
                            score += 30;
                            txt = "+30!";
                            break;
                        case 4:
                            score += 40;
                            txt = "+40!";
                            break;
                        case 5:
                            score += 60; // 10 extra
                            txt = "+60! Good word!";
                            break;
                        case 6:
                            score += 85; // 25 extra
                            txt = "+85! Rare word!";
                            break;
                        case 7:
                            score += 120; // 50 extra
                            txt = "+120! Super word!";
                    }
                    foundWords.push(wrd);
                    updateScore();
                    $(".popupGreen").stop();
                    $(".popupGreen").fadeIn(50);
                    document.getElementById("success").innerHTML = txt;
                    $(".popupGreen").fadeOut(2000);
                }
            }
            else {
                $(".popupRed").stop();
                $(".popupRed").fadeIn(50);
                document.getElementById("fail").innerHTML = "Invalid Word";
                $(".popupRed").fadeOut(2000);
            }
        }
		var top = currWord.length;
		var bot = currLetters.length;
		while (currWord.length > 0) {
			currLetters.push(currWord.pop());
		}
        animateEnter(top, bot);
        drawAnagram();
        draw();
    }
}

drawHand(['A', 'B']);
setTimeout(function() {
    $(".popupGreen").fadeOut(1);
    $(".popupRed").fadeOut(1);
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.font = '25px OCR';
    ctx.fillText('Find words using the letters', 243, 250);
    ctx.fillText('in your hand (bottom row)!', 263, 280);

    ctx.fillText("List of possible words is on the", 207, 340);
    ctx.fillText("bottom -- blanks indicate number of", 181, 370);
    ctx.fillText("letters of a undiscovered word --", 198, 400);
    ctx.fillText("found words are shown below.", 243, 430);

    ctx.fillText("Press Enter to try a word.", 262, 490);
    ctx.fillText("Press Space to shuffle your hand.", 200, 520);
    ctx.fillText("Click New Game to restart with a new hand.", 117, 550);

    ctx.fillText("You're now ready to Word Storm!", 217, 610);

}, 2000);
