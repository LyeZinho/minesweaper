/*
Mine contains:

- Save string 
- Seed
- Current score

*/


// Imports
var fs = require("fs");
var path = require("path");

// Mine class
class Mine{
    constructor(saveString, seed, currScore){
        this.saveString = saveString;
        this.seed = seed;
        this.currScore = currScore;
    }

    // Create mine
    createMine(){
        var mine = {
            saveString: this.saveString,
            seed: this.seed,
            currScore: this.currScore
        }
        return mine;
    }

    // Save mine

}