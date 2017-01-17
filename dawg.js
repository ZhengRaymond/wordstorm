/**
 * Creation of a Directed Acrylic Word Graph for fast and efficient word indexing and searching as required by
 * the WordStorm game.
 *
 * Author: Raymond Zheng
 *
 */

// letterNode object
var indexOf = function(matchLetter, passNextLetters) {
    var len = passNextLetters.length;
    for (var i = 0; i < len; i++) {
        if (passNextLetters[i].letter == matchLetter) {
            return i;
        }
    }
    return -1;
}
var root = {
    letter: ' ',
    nextLetters: [],
    wordLength: 0,
    isWord: false
}

function addWordRecursive(node, currLetter, word) {
    if (currLetter == '') {
        node.isWord = true;
        return;
    }

    var index = indexOf(currLetter, node.nextLetters);
    if (index == -1) {
        var newNode = {
            letter:currLetter,
            nextLetters: [],
            wordLength: node.wordLength + 1,
            isWord: false
        }
        addWordRecursive(newNode, word.charAt(0), word.substring(1));
        node.nextLetters.push(newNode);
    }
    else {
        var existingNode = node.nextLetters[index];
        addWordRecursive(existingNode, word.charAt(0), word.substring(1));
    }
}

function addWord(word) {
    addWordRecursive(root, word.charAt(0), word.substring(1));
}

function printWordRecursive(currNode, currWord) {
    currWord = currWord + currNode.letter;
    var len = currNode.nextLetters.length;
    for (var i = 0; i < len; i++) {
        printWordRecursive(currNode.nextLetters[i], currWord);
    }
    if(currNode.isWord == true) {
        console.log(currWord);
    }
}

function printWords() {
    printWordRecursive(root, "");
}

function findWordRecursive(currNode, letter, word) {
    if (letter == '') {
        return currNode.isWord;
    }

    var index = indexOf(letter, currNode.nextLetters);
    if (index == -1) {
        return false;
    }
    else {
        return findWordRecursive(currNode.nextLetters[index], word.charAt(0), word.substring(1));
    }
}

function findWord(word) {
    return findWordRecursive(root, word.charAt(0), word.substring(1));
}


function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var listWord = rawFile.responseText.split('\n');
                var length = listWord.length;
                for (var i = 0; i < length; i++) {
                    addWord(listWord[i]);
                }
            }
        }
    }
    rawFile.send(null);
}

for (var i = 1; i <= 268; i++) {
//for (var i = 1; i <= 5; i++) {
    readTextFile('dictionary/' + i);
}
root.isWord = false;

var anagrams = [];

function findAnagramsRecursive(letters, currWord) {
    if (findWord(currWord)) {
        anagrams.push(currWord);
    }
    if (letters.length == 0 ) {
        return;
    }
    else {
        // var currWordVariation;
        for (var j = 0; j < letters.length; j++) {
            var newLetter = letters[j];
            var newLetters = [];
            for (var k = 0; k < letters.length; k++) {
                if (k != j) {
                    newLetters.push(letters[k]);
                }
            }
            // for (var i = 0; i <= currWord.length; i++) {
            //     currWordVariation = currWord.substring(0, i) + newLetter + currWord.substring(i);
            //     findAnagramsRecursive(newLetters, currWordVariation);
            // }
            findAnagramsRecursive(newLetters, currWord + newLetter);
        }
    }
}

function findAnagrams(letters) {
    anagrams = [];
    findAnagramsRecursive(letters, "");
}

console.log(root);

//https://raw.githubusercontent.com/jonbcard/scrabble-bot/master/src/dictionary.txt