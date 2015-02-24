// VARIABLES ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var canvas;
var stage;
var tiles = [];
var reelContainers = [];

// GAME CONSTANTS
var NUM_REELS = 3;

// GAME VARIABLES
var playerMoney = 1000;
var winnings = 0;
var jackpot = 1000;
var turn = 0;
var playerBet = 10;
var winNumber = 0;
var lossNumber = 0;
var spinResult;
var fruits = "";

/* Tally Variables */
var grapes = 0;
var bananas = 0;
var lemons = 0;
var cherries = 0;
var melons = 0;
var bells = 0;
var eagles = 0;
var blanks = 0;

// GAME OBJECTS
var game;
var background;
var spinButton;
var betMaxButton;
var betTenButton;
var betTwentyButton;
var minusTenButton;
var resetButton;
var powerButton;
var jackpotText;
var playerMoneyText;
var playerBetText;
var payoutText;

// FUNCTIONS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas); // Parent Object
    stage.enableMouseOver(20); // Turn on Mouse Over events

    createjs.Ticker.setFPS(60); // Set the frame rate to 60 fps
    createjs.Ticker.addEventListener("tick", gameLoop);

    main();
}

// GAMELOOP
function gameLoop() {
    stage.update();
}

/* Utility function to reset all fruit tallies */
function resetFruitTally() {
    grapes = 0;
    bananas = 0;
    lemons = 0;
    cherries = 0;
    melons = 0;
    bells = 0;
    eagles = 0;
    blanks = 0;
}

/* Utility function to reset the player stats */
function resetAll() {
    playerMoney = 1000;
    winnings = 0;
    jackpot = 1000;
    turn = 0;
    playerBet = 10;
    winNumber = 0;
    lossNumber = 0;
    jackpotText.text = "" + jackpot;
    playerMoneyText.text = "" + playerMoney;
    payoutText.text = "" + winnings;
    playerBetText.text = "" + playerBet;
    for (var index = 0; index < NUM_REELS; index++) {
        spinResult[index] = "blank";
        reelContainers[index].removeAllChildren();
        tiles[index] = new createjs.Bitmap("assets/images/" + spinResult[index] + ".png");
        reelContainers[index].addChild(tiles[index]);
        console.log("Resetting Slots");
    }
}

/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds) {
        return value;
    } else {
        return !value;
    }
}

/* When this function is called it determines the betLine results.*/
function Reels() {
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];

    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):
                betLine[spin] = "blank";
                blanks++;
                break;
            case checkRange(outCome[spin], 28, 37):
                betLine[spin] = "grape";
                grapes++;
                break;
            case checkRange(outCome[spin], 38, 46):
                betLine[spin] = "banana";
                bananas++;
                break;
            case checkRange(outCome[spin], 47, 54):
                betLine[spin] = "lemon";
                lemons++;
                break;
            case checkRange(outCome[spin], 55, 59):
                betLine[spin] = "cherry";
                cherries++;
                break;
            case checkRange(outCome[spin], 60, 62):
                betLine[spin] = "melon";
                melons++;
                break;
            case checkRange(outCome[spin], 63, 64):
                betLine[spin] = "bell";
                bells++;
                break;
            case checkRange(outCome[spin], 65, 65):
                betLine[spin] = "eagle";
                eagles++;
                break;
        }
    }
    return betLine;
}

/* This function calculates the player's winnings, if any */
function determineWinnings() {
    logFruitTally();
    if (blanks == 0) {
        if (grapes == 3) {
            winnings = playerBet * 10;
        } else if (bananas == 3) {
            winnings = playerBet * 20;
        } else if (lemons == 3) {
            winnings = playerBet * 30;
        } else if (cherries == 3) {
            winnings = playerBet * 40;
        } else if (melons == 3) {
            winnings = playerBet * 50;
        } else if (bells == 3) {
            winnings = playerBet * 75;
        } else if (eagles == 3) {
            winnings = jackpot;
            jackpot = 1000;
        } else if (bells == 2) {
            winnings = playerBet * 10;
        } else if (grapes = 2) {
            winnings = playerBet * 2;
        } else if (lemons = 2) {
            winnings = playerBet * 2;
        } else if (bananas = 2) {
            winnings = playerBet * 2;
        } else if (cherries = 2) {
            winnings = playerBet * 2;
        } else if (melons = 2) {
            winnings = playerBet * 2;
        } else if (eagles == 2) {
            winnings = playerBet * 20;
        } else if (eagles == 1) {
            winnings = playerBet * 5;
        }
        playerMoney += winnings + playerBet;
        console.log("Player Money: " + playerMoney);
        console.log("Payout: " + winnings);
        payoutText.text = "" + winnings;
        playerMoneyText.text = "" + playerMoney;
        winnings = 0;
    }
}

function buttonOut(event) {
    event.currentTarget.alpha = 1;
}

function buttonOver(event) {
    event.currentTarget.alpha = 0.7;
}

function logFruitTally() {
    console.log("Blanks: " + blanks);
    console.log("Grapes: " + grapes);
    console.log("Lemons: " + lemons);
    console.log("Cherries " + cherries);
    console.log("Melons " + melons);
    console.log("Bananas " + bananas);
    console.log("Eagles " + eagles);
    console.log("Bells " + bells);
}

// Spin Button Functions
// MAIN MEAT of my code goes here
function spinButtonClicked(event) {
    if (playerMoney > 0) {
        playerMoney -= playerBet;
        spinResult = Reels();
        fruits = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];
        jackpot += playerBet;
        console.log("Jackpot: " + jackpot);
        jackpotText.text = "" + jackpot;
        playerMoneyText.text = "" + playerMoney;
        payoutText.text = "" + winnings;

        for (var index = 0; index < NUM_REELS; index++) {
            reelContainers[index].removeAllChildren();
            tiles[index] = new createjs.Bitmap("assets/images/" + spinResult[index] + ".png");
            reelContainers[index].addChild(tiles[index]);
            console.log("Spin Result index: " + index + " is " + spinResult[index]);
        }
        determineWinnings();
        resetFruitTally();
    }
}

// Reset Button Functions
function resetButtonClicked(event) {
    resetAll();
}

function canBet(betallowance) {
    if (betallowance > playerMoney || betallowance < 10) {
        return false;
    } else {
        return true;
    }
}

function betTenButtonClicked(event) {
    if (canBet(playerBet + 10)) {
        playerBet += 10;
        playerBetText.text = "" + playerBet;
    }
}

function betTwentyButtonClicked(event) {
    if (canBet(playerBet + 20)) {
        playerBet += 20;
        playerBetText.text = "" + playerBet;
    }
}

function minusTenButtonClicked(event) {
    if (canBet(playerBet - 10)) {
        playerBet -= 10;
        playerBetText.text = "" + playerBet;
    }
}

function betMaxButtonClicked(event) {
    if (canBet(playerMoney)) {
        playerBet = playerMoney;
        playerBetText.text = "" + playerBet;
    }
}

function powerButtonClicked(event) {
    close();
}

function createUI() {
    background = new createjs.Bitmap("assets/images/slotmachinebase.png");
    game.addChild(background); // Add the background to the game container

    jackpotText = new createjs.Text("" + jackpot, "32px Arial", "#FFFF00");
    game.addChild(jackpotText);
    jackpotText.x = 13;
    jackpotText.y = 154;

    playerMoneyText = new createjs.Text("" + playerMoney, "26px Arial", "#FFFF00");
    game.addChild(playerMoneyText);
    playerMoneyText.x = 13;
    playerMoneyText.y = 253;

    playerBetText = new createjs.Text("" + playerBet, "26px Arial", "#FFFF00");
    game.addChild(playerBetText);
    playerBetText.x = 274;
    playerBetText.y = 432;

    payoutText = new createjs.Text("" + winnings, "26px Arial", "#FFFF00");
    game.addChild(payoutText);
    payoutText.x = 92;
    payoutText.y = 432;

    for (var index = 0; index < NUM_REELS; index++) {
        reelContainers[index] = new createjs.Container();
        game.addChild(reelContainers[index]);
    }
    reelContainers[0].x = 101;
    reelContainers[0].y = 347;
    reelContainers[1].x = 182;
    reelContainers[1].y = 347;
    reelContainers[2].x = 260;
    reelContainers[2].y = 347;

    // Spin Button
    spinButton = new createjs.Bitmap("assets/images/spinbtn.png");
    game.addChild(spinButton);
    spinButton.x = 31;
    spinButton.y = 512;

    // Spin Button Event Listeners
    spinButton.addEventListener("click", spinButtonClicked);
    spinButton.addEventListener("mouseover", buttonOver);
    spinButton.addEventListener("mouseout", buttonOut);

    // Bet Max Button
    betMaxButton = new createjs.Bitmap("assets/images/betmaxbtn.png");
    game.addChild(betMaxButton);
    betMaxButton.x = 34;
    betMaxButton.y = 644;

    // Bet Max Button Event Listeners
    betMaxButton.addEventListener("click", betMaxButtonClicked);
    betMaxButton.addEventListener("mouseover", buttonOver);
    betMaxButton.addEventListener("mouseout", buttonOut);

    // Bet Ten Button
    betTenButton = new createjs.Bitmap("assets/images/bettenbtn.png");
    game.addChild(betTenButton);
    betTenButton.x = 342;
    betTenButton.y = 255;

    // Bet Ten Button Event Listeners
    betTenButton.addEventListener("click", betTenButtonClicked);
    betTenButton.addEventListener("mouseover", buttonOver);
    betTenButton.addEventListener("mouseout", buttonOut);

    // Bet Twenty Button
    betTwentyButton = new createjs.Bitmap("assets/images/bettwentybtn.png");
    game.addChild(betTwentyButton);
    betTwentyButton.x = 342;
    betTwentyButton.y = 330;

    // Bet Twenty Button Event Listeners
    betTwentyButton.addEventListener("click", betTwentyButtonClicked);
    betTwentyButton.addEventListener("mouseover", buttonOver);
    betTwentyButton.addEventListener("mouseout", buttonOut);

    // Minus Ten Button
    minusTenButton = new createjs.Bitmap("assets/images/minustenbtn.png");
    game.addChild(minusTenButton);
    minusTenButton.x = 187;
    minusTenButton.y = 581;

    // Minus Ten Button Event Listeners
    minusTenButton.addEventListener("click", minusTenButtonClicked);
    minusTenButton.addEventListener("mouseover", buttonOver);
    minusTenButton.addEventListener("mouseout", buttonOut);

    // Reset Button
    resetButton = new createjs.Bitmap("assets/images/resetbtn.png");
    game.addChild(resetButton);
    resetButton.x = 328;
    resetButton.y = 512;

    // Reset Button Event Listeners
    resetButton.addEventListener("click", resetButtonClicked);
    resetButton.addEventListener("mouseover", buttonOver);
    resetButton.addEventListener("mouseout", buttonOut);

    // Power Button
    powerButton = new createjs.Bitmap("assets/images/powerbtn.png");
    game.addChild(powerButton);
    powerButton.x = 372;
    powerButton.y = 738;

    // Power Button Event Listeners
    powerButton.addEventListener("click", powerButtonClicked);
    powerButton.addEventListener("mouseover", buttonOver);
    powerButton.addEventListener("mouseout", buttonOut);
}

function main() {
    game = new createjs.Container(); // Instantiates the Game Container

    createUI();

    stage.addChild(game); // Adds the Game Container to the Stage
}
//# sourceMappingURL=game.js.map
