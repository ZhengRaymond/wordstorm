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
        console.log("Word added.");
        return;
    }

    var index = node.nextLetters.indexOf(currLetter);
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
                var allText = rawFile.responseText;
                var len = allText.length;
                var i = 0;
                var j = 0;
                while (i < len) {
                    j = allText.indexOf('\n', i);
                    addWord(allText.substring(i, j));
                    i = j;
                }
                console.log(rawFile.responseText);
            }
        }
    }
    rawFile.send(null);
}

readTextFile("dictionary.txt");
console.log(root);

//https://raw.githubusercontent.com/jonbcard/scrabble-bot/master/src/dictionary.txt