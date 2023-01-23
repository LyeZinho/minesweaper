/*

Mine field exemple:
{
  fore: [
    [
      '0', '0', '0', '0',
      '0', '0', '1', '*',
      '*', '*'
    ],
    [
      '1', '1', '1', '1',
      '2', '3', '3', '*',
      '*', '*'
    ],
    [
      '*', '*', '*', '*',
      '*', '*', '*', '*',
      '*', '*'
    ],
    [
      '*', '*', '*', '*',
      '*', '*', '*', '*',
      '*', '*'
    ],
    [
      '*', '*', '*', '*',
      '*', '*', '*', '*',
      '*', '*'
    ],
    [
      '*', '*', '*', '*',
      '*', '*', '*', '*',
      '*', '*'
    ],
    [
      '*', '*', '*', '*',
      '*', '*', '*', '*',
      '*', '*'
    ],
    [
      '*', '*', '*', '*',
      '*', '*', '*', '*',
      '*', '*'
    ],
    [
      '*', '*', '*', '*',
      '*', '*', '*', '*',
      '*', '*'
    ],
    [
      '*', '*', '*', '*',
      '*', '*', '*', '*',
      '*', '*'
    ]
  ],
  seed: '173'
}

render this to string format:

in exemple
 
0 0 0 0 0 0 1 * * *
1 1 1 1 2 3 3 * * *
* * * * * * * * * *
* * * * * * * * * *
* * * * * * * * * *
* * * * * * * * * *
* * * * * * * * * *
* * * * * * * * * *
* * * * * * * * * *
* * * * * * * * * *
*/

// Imports

/*
{
    generateMines: generateMines,
    openField: openField,
    saveGame: saveGame,
    loadGame: loadGame
}
*/
var { generateMines } = require('./mines')
var { openField } = require('./mines')
var { saveGame } = require('./mines')
var { loadGame } = require('./mines')



// Render mines function
function renderMines(field){
    var str = "";
    for(var i = 0; i < field.length; i++){
        for(var j = 0; j < field[i].length; j++){
            str += field[i][j] + " ";
        }
        str += "\r \n";
    }
    return str;
}

// Add pos information to field string
function addPos(fieldStr){
    /*
    For player can use add some x and y information
      ⁞ 0 1 2 3 4 5 6 7 8 9 ... x
    --------------------------
    0 ⁞ 0 0 0 0 0 0 1 * * *
    1 ⁞ 1 1 1 1 2 3 3 * * *
    2 ⁞ * * * * * * * * * *
    3 ⁞ * * * * * * * * * *
    4 ⁞ * * * * * * * * * *
    5 ⁞ * * * * * * * * * *
    6 ⁞ * * * * * * * * * *
    7 ⁞ * * * * * * * * * *
    8 ⁞ * * * * * * * * * *
    9 ⁞ * * * * * * * * * *
    ...
    x

    Algoritim:

    1. Get the amount of non whitepsaces in the first line
    2. Get the amount of lines
    3. Add two lines above one for - border and other for 1~... pos numbers the number start in 0 and end in ...
    4. Before each line add the ⁞ border and the 1~... pos numbers the start is in 0 and the end is in ...
    5. Return the string
    */

    // Get the amount of chars in first line ignoring the whitespaces
    var nonWhiteSpaces = 0;
    for(var i = 0; i < fieldStr.length; i++){
        if(fieldStr[i] != " " && fieldStr[i] != "\n"  && fieldStr[i] != "\r"  && fieldStr[i] != "\n \r"){
            nonWhiteSpaces++;
        }
        if(fieldStr[i] == "\r \n" || fieldStr[i] == "\r"){
            break;
        }
    }

    // Get the amount of lines
    var lines = 0;
    for(var i = 0; i < fieldStr.length; i++){
        if(fieldStr[i] == "\r \n" || fieldStr[i] == "\r"){
            lines++;
        }
    }
    
    // Add two lines above one for - border and other for 1~... pos numbers the number start in 0 and end in ...
    var str = " ";
    for(var i = 1; i < nonWhiteSpaces; i++){
        str += " "+i;
    }
    str += " \r \n";
    for(var i = 1; i < nonWhiteSpaces; i++){
        str += "--";
    }
    str += "xy\r \n";

    // Before each line add the ⁞ border and the 1~... pos numbers the start is in 0 and the end is in ...
    var line = 1;
    for(var i = 0; i < fieldStr.length; i++){
        if(fieldStr[i] == "\r \n" || fieldStr[i] == "\r"){
            str += " ⁞" + line;
            line++;
        }
        str += fieldStr[i];
    }

    // Return the string
    return str;
}

// Test
var field = generateMines(125, 10, 10, 20);
var open = openField(field.state, field.fore, 3, 7)

var fieldStr = renderMines(open.fore);

console.log(addPos(fieldStr));


