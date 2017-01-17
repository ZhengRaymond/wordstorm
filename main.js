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
	if (gameStarted) {
		endGame();
	}

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
		}
	}
	else if (kc == 8) { // backspace
		if (currWord.length > 0) {
			currLetters.push(currWord.pop());
		}
 	}
 	else if (kc == 32 && currWord.length == 0) { // space
		for (var i = 0; i < 10; i++) {
			var ind1 = Math.floor(Math.random() * 7);
			var ind2 = Math.floor(Math.random() * 7);
			var temp = currLetters[ind1];
			currLetters[ind1] = currLetters[ind2];
			currLetters[ind2] = temp;
		}
	}
 	else if (kc == 13) { // enter
		e.preventDefault();
		var wrd = currWord.join("");
		if (validWord(wrd) && foundWords.indexOf(wrd) == -1) {
			switch(wrd.length) {
				case 3:
					score += 30;
					break;
				case 4:
					score += 40;
					break;
				case 5:
					score += 60; // 10 extra
					break;
				case 6:
					score += 85; // 25 extra
					break;
				case 7:
					score += 120; // 50 extra
			}
			foundWords.push(wrd);
			updateScore();
		}

		while (currWord.length > 0) {
			currLetters.push(currWord.pop());
		}
        drawAnagram();
    }
	else if (kc == 25) {

	}
	draw();
}
