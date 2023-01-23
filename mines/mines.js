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


function openField(field, fore, x, y){

    if(field[y][x] == "M"){
        // Reveal map
        for(var i = 0; i < field.length; i++){
            for(var j = 0; j < field[0].length; j++){
                fore[i][j] = field[i][j];
            }
        }
        return {
            end: true,
            fore: fore
        };
    }

    if(fore[y][x] != "*"){
        return {
            end: false,
            fore: fore
        };
    }

    fore[y][x] = field[y][x];

    if(field[y][x] == 0){
        for(var i = -1; i <= 1; i++){
            for(var j = -1; j <= 1; j++){
                if(y + i >= 0 && y + i < field.length && x + j >= 0 && x + j < field[0].length){
                    openField(field, fore, x + j, y + i);
                }
            }
        }
    }

    return {
        end: false,
        fore: fore
    };
}


// // Test

// var field = generateMines(125, 10, 10, 20);
// var open = openField(field.state, field.fore, 0, 0)

// // Show the field in string TEST

// var fieldString = "";
// for(var i = 0; i < field.state.length; i++){
//     for(var j = 0; j < field.state[0].length; j++){
//         fieldString += field.state[i][j] + " ";
//     }
//     fieldString += "\r \n";
// }

// // Show the fore field in string TEST

// var foreString = "";
// for(var i = 0; i < open.fore.length; i++){
//     for(var j = 0; j < open.fore[0].length; j++){
//         foreString += open.fore[i][j] + " ";
//     }
//     foreString += "\r \n";
// }



// console.log(fieldString);
// console.log(foreString);







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
    return {
        seed: seed,
        fore: foreField
    };
}

// Test

var field = generateMines(125, 10, 10, 1);
var open = openField(field.state, field.fore, 0, 0)

var save = saveGame(open.fore, field.seed);

var load = loadGame(save);

console.log(load);

// Show load in string TEST

var loadString = "";
for(var i = 0; i < load.fore.length; i++){
    for(var j = 0; j < load.fore[0].length; j++){
        loadString += load.fore[i][j] + " ";
    }
    loadString += "\r \n";
}

console.log(loadString);

