/*
Player contains:

    - Uid
    - Score
    - Time

*/


// Save data in ./data/

// Imports
var fs = require("fs");
var path = require("path");


// Player class
class Player{
    constructor(uid, score, time){
        this.uid = uid;
        this.score = score;
    }

    // Create player
    createPlayer(){
        var player = {
            uid: this.uid,
            score: this.score,
            time: this.time
        }
        return player;
    }

    // Save player
    savePlayer(){
        var player = this.createPlayer();
        var data = JSON.stringify(player);
        // Create new json file
        fs.writeFile(path.join(__dirname, "data", this.uid + ".json"), data, function(err){
            if(err){
                console.log(err);
            }
        });
    }

    // Load player
    loadPlayer(){
        var player = JSON.parse(fs.readFileSync(path.join(__dirname, "data", this.uid + ".json")));
        this.uid = player.uid;
        this.score = player.score;
        this.time = player.time;
    }

    // Delete player
    deletePlayer(){
        fs.unlink(path.join(__dirname, "data", this.uid + ".json"), function(err){
            if(err){
                console.log(err);
            }
        });
    }

    // Update player
    updatePlayer(){
        this.deletePlayer();
        this.savePlayer();
    }

    // Increase score
    increaseScore(score){
        this.score += score;
        this.updatePlayer();
    }

    // Decrease score
    decreaseScore(score){
        this.score -= score;
        this.updatePlayer();
    }

}


// Tests

// var player = new Player("123456789", 10, 0);
// player.savePlayer();


// var player = new Player("123456789", 0, 0);
// player.loadPlayer();
// console.log(player);


// var player = new Player("123456789", 0, 0);
// player.deletePlayer();




