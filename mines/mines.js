/*
Generate minesweeper field

How work

Using parling noise for spread mines 
create an string array
["1","2","M"]

Numbers -> 123
Mines -> M

The multidimensional array are the mine field

After create return an string for the seed of the game and the state

ex:
{
    seed: "123912381290382903",
    state: [
        ["1","2","M"],
        ["1","2","M"],
        ["1","2","M"]
    ]
}

Generate an fore field for overlay
ex:
[
    ["-","-","-"],
    ["-","-","-"],
     
]

*/

function perlingRandom(seed){
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

function generateMines(seed, width, height, mines){
    var field = [];
    var mines = mines;
    var minesCount = 0;
    var mine = "M";
    var mineNumber = 0;

    for(var i = 0; i < height; i++){
        field[i] = [];
        for(var j = 0; j < width; j++){
            field[i][j] = 0;
        }
    }

    while(minesCount < mines){
        var x = Math.floor(perlingRandom(seed++) * width);
        var y = Math.floor(perlingRandom(seed++) * height);
        if(field[y][x] != mine){
            field[y][x] = mine;
            minesCount++;
        }
    }

    for(var i = 0; i < height; i++){
        for(var j = 0; j < width; j++){
            if(field[i][j] != mine){
                for(var k = -1; k <= 1; k++){
                    for(var l = -1; l <= 1; l++){
                        if(i + k >= 0 && i + k < height && j + l >= 0 && j + l < width){
                            if(field[i + k][j + l] == mine){
                                mineNumber++;
                            }
                        }
                    }
                }
                field[i][j] = mineNumber;
                mineNumber = 0;
            }
        }
    }

    // Generate fore field
    var foreField = [];
    for(var i = 0; i < height; i++){
        foreField[i] = [];
        for(var j = 0; j < width; j++){
            foreField[i][j] = "*";
        }
    }

    // Prevent null or undefined values in the field
    // Loop through the backfield and forefield replacing null values
    for(var i = 0; i < height; i++){
        for(var j = 0; j < width; j++){
            if(field[i][j] == null){
                field[i][j] = 0;
            }
            if(foreField[i][j] == null){
                foreField[i][j] = 0;
            }
        }
    }

    return {
        seed: seed,
        state: field,
        fore: foreField
    };
}


/*
The open field basicaly open one index in the array

In the start of the game the field are hidden

ex:

Back field
[
    ["1","2","M"],
    ["1","2","M"],
    ["1","2","M"]
]

Fore field
[
    ["-","-","-"],
    ["-","-","-"],
    ["-","-","-"]
]

Basicaly the open field open a random amount of indexes
if the selected index is not an mine if it is mine return the end


The mines field generate exemple:

{
  seed: 125,
  state: [ [ 0, 1, 'M' ], [ 0, 1, 1 ], [ 0, 0, 0 ] ],
  fore: [ [ '-', '-', '-' ], [ '-', '-', '-' ], [ '-', '-', '-' ] ]
}

if i select the y=0 and x=0
a certain amount of mine free spaces will be free around

y
⬇
➡x
*/


/*
    Cartesian starts on 0 for y and x
*/
function openField(field, fore, x, y){

    var y = y;
    var x = x;
    var field = field;
    var fore = fore;

    if(fore[y][x] == "*"){
        fore[y][x] = field[y][x];
    }

    // If open field
    if(field[y][x] == 0){
        for(var i = -1; i <= 1; i++){
            for(var j = -1; j <= 1; j++){
                if(y + i >= 0 && y + i < field.length && x + j >= 0 && x + j < field[0].length){
                    if(fore[y + i][x + j] == "*"){
                        fore[y + i][x + j] = field[y + i][x + j];
                        if(field[y + i][x + j] == 0){
                            openField(field, fore, x + j, y + i);
                        }
                    }
                }
            }
        }
    }

    // IF mine reveal map
    if(field[y][x] == "M"){
        for(var i = 0; i < field.length; i++){
            for(var j = 0; j < field[i].length; j++){
                if(field[i][j] == "M"){
                    fore[i][j] = "M";
                }
            }
        }

        return {
            state: field,
            fore: fore,
            end: true
        }
    }

    return {
        state: field,
        fore: fore,
        end: false
    }
}


// // Test

// var field = generateMines(125, 10, 10, 20);
// var open = openField(field.state, field.fore, 4, 2);

// console.log(open);
// // Render in string
// var render = "";
// for(var i = 0; i < open.fore.length; i++){
//     for(var j = 0; j < open.fore[i].length; j++){
//         render += open.fore[i][j] + " ";
//     }
//     render += "\n";
// }

// console.log(render);







/*
The save and load game basicaly save the current state of the game

ex:

backField
[
    ["1","2","M"],
    ["1","2","M"],
    ["1","2","M"]
]

foreField
[
    ["1","2","-"],
    ["1","2","-"],
    ["1","-","-"]
}

the save game function will return a string with the current state of the game
and the seed that generate the game

ex:

"1,2,M,1,2,M,1,2,M,1,2,-,1,2,-,1,-,-|seed"

the string before the | is the current state of the game
the string after the | is the seed of the game

the seed get the backField 
the current state return the current game of player in the game that seed generates
*/ 


// Create save string
function saveGame(currentFore, seed){
    var saveString = "";
    for(var i = 0; i < currentFore.length; i++){
        for(var j = 0; j < currentFore[0].length; j++){
            saveString += currentFore[i][j] + ",";
        }
    }
    saveString += "|" + seed;
    return saveString;    
}

// Test

// var field = generateMines(125, 10, 10, 20);
// var open = openField(field.state, field.fore, 0, 0)

// var save = saveGame(open.fore, field.seed);
// console.log(save);


// Load save string
function loadGame(saveString){
    var saveArray = saveString.split("|");
    var foreField = [];
    var seed = saveArray[1];
    var saveArray = saveArray[0].split(",");
    for(var i = 0; i < saveArray.length; i++){
        if(i % 10 == 0){
            foreField.push([]);
        }
        foreField[Math.floor(i / 10)].push(saveArray[i]);
    }
    // Prevent data loss
    // Loop through the forefield replacing null and undefined vaules with 0
    // Adding the same amount of x or y 
    /*
    Example:

    0 0 0 0 0 0 1 * * * <- Get count of indexes in the 1ºst row 
    1 1 1 1 2 3 3 * * *
    * * * * * * * * * *
    * * * * * * * * * *
    * * * * * * * * * *
    * * * * * * * * * *
    * * * * * * * * * *
    * * * * * * * * * *
    * * * * * * * * * *
    * * * * * * * * * * 
    0 0 0 0 0 0 0 0 0   <- Verify if the amount is the same if not and values contains null or undefined
    Cut off the row from the array
    */

    var count = 0;
    for(var i = 0; i < foreField[0].length; i++){
        if(foreField[0][i] == null || foreField[0][i] == undefined){
            count++;
        }
    }

    for(var i = 0; i < foreField.length; i++){
        if(foreField[i].length != foreField[0].length - count){
            foreField.splice(i, 1);
        }
    }

    for(var i = 0; i < foreField.length; i++){
        for(var j = 0; j < foreField[0].length; j++){
            if(foreField[i][j] == null || foreField[i][j] == undefined){
                foreField[i][j] = 0;
            }
        }
    }

    return {
        fore: foreField,
        seed: seed
    };

}

// Test

// Show in string format

// var field = generateMines(125, 10, 10, 20);
// var open = openField(field.state, field.fore, 0, 0)

// var save = saveGame(open.fore, field.seed);
// console.log(save);

// var load = loadGame(save);
// console.log(load);

// let loadString = "";

// for(var i = 0; i < load.fore.length; i++){
//     for(var j = 0; j < load.fore[0].length; j++){
//         loadString += load.fore[i][j] + " ";
//     }
//     loadString += "\n";
// }

// console.log(loadString);


// Calc score

function calcScore(currentFore, backField){
    var score = 0;
    for(var i = 0; i < currentFore.length; i++){
        for(var j = 0; j < currentFore[0].length; j++){
            if(currentFore[i][j] == backField[i][j]){
                score++;
            }
        }
    }
    return score;
}

// Test

var field = generateMines(125, 10, 10, 20);
var open = openField(field.state, field.fore, 0, 0)

var save = saveGame(open.fore, field.seed);
console.log(save);

var load = loadGame(save);
console.log(load);

var score = calcScore(load.fore, field.state);
console.log(score);




// Export

module.exports = {
    generateMines: generateMines,
    openField: openField,
    saveGame: saveGame,
    loadGame: loadGame,
    calcScore: calcScore
}