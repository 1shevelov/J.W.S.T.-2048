import * as PIXI from './node_modules/pixi.js/dist/browser/pixi.mjs';
import * as constant from "./modules/constants.mjs";
import * as vis from "./modules/visuals.mjs";

import GameLogic from "./modules/game-logic.mjs";
import Draw from "./modules/draw.mjs";
import InputHandler from "./modules/input-handler.mjs";

let activeGameSizeIndex = constant.DEFAULT_GAME_SIZE_INDEX;

let gameState = constant.GAME_STATE_PAUSE;

const gameEl = document.getElementById("game");
const gameUIEl = document.getElementById("game-ui");

const app = new PIXI.Application(
    {
        antialias: true,
    //     width: screen.landCanvasWidth,
    //     height: screen.landCanvasHeight,
    //     backgroundColor: screen.baseColorHex/*, resolution: window.devicePixelRatio || 1,*/
    }
);

// app.renderer.backgroundColor = screen.baseColorHex;

gameEl.appendChild(app.view);
// //TODO: Fix canvas white blinking on page reload - check if needed
// window.onbeforeunload = () => {
//     gameWrapperEl.removeChild(gameContainer);
// }


const GR = new PIXI.Graphics();

const CURRENT_THEME = vis.THEME_DARK_WARM;

let DRAW;

const CURRENT_TEXT_STYLE = vis.LABEL_ON_DARK_WARM;
const LABEL_STYLE = new PIXI.TextStyle(CURRENT_TEXT_STYLE);

let moveCounter;

let logic;

let field;

makeNewGame(activeGameSizeIndex);

function makeNewGame(gameSize) {

    console.log("\nMaking new game with the size: ", constant.GAME_SIZES[gameSize]);

    moveCounter = 0;

    activeGameSizeIndex = gameSize;

    if(DRAW !== undefined) {

        DRAW.clearLabels();
    }
    
    GR.clear();

    gameState = constant.GAME_STATE_PLAYING;

    DRAW = new Draw(GR, CURRENT_THEME, vis.USE_POINTY_HEXES);

    startGame();
}


// called in makeNewGame()
function startGame() {

    DRAW.circularField(constant.GAME_SIZES[activeGameSizeIndex], [300, 300], 200);

    app.stage.addChild(GR);

    logic = new GameLogic(constant.GAME_SIZES[activeGameSizeIndex]);

    logic.newTiles(1, constant.GAME_SIZES_NEW_TILES[activeGameSizeIndex]);

    field = logic.getField();

    DRAW.createEmptyLabels(PIXI.Text, LABEL_STYLE, app.stage);
    DRAW.updateLabels(field);

}

//debugShowHexLabels();

const inputHandler = new InputHandler();

document.addEventListener('keyup', (event) => {

    let action = inputHandler.keyboardHandler(event);

    switch(action[0]) {

        case constant.KEY_UNASSIGNED:

            //show keys help popup
            break;

        case constant.KEY_MOVE:

            
            if(gameState === constant.GAME_STATE_PLAYING) {
            
                //check if move changed field's state and skip if not
                //console.log(field);
                logic.makeMove(action[1]);

                moveCounter++;

                if(canContinueGame()) {

                    logic.newTiles(1, [2, 2, 2, 2, 4]);

                    DRAW.updateLabels(field);
                
                } else {

                    gameState = constant.GAME_STATE_PAUSE;
                    
                    finishGame();
                }
            
            } else {

                console.log(" START A NEW GAME");
            }
            
            break;

        case constant.KEY_UI:

            // UI action
            break;
    }
});


function canContinueGame() {

    if(logic.checkGoal(constant.GAME_GOALS[activeGameSizeIndex])
        || logic.getEmptyTilesNum() === 0) {

        return false;
    }

    return true;
}


function finishGame() {

    console.log("  ***  GAME FINISHED!  ***  ");

    console.log(" ", moveCounter, " moves made.");

    if(logic.checkGoal(constant.GAME_GOALS[activeGameSizeIndex])) {

        console.log(" Game is WON: The goal has been achieved.");

        return;
    }

    console.log(" Game is lost: no empty tiles left (", logic.getEmptyTilesNum(),").");

    const promptTitle = "New game?\ninput field size: " + String(constant.GAME_SIZES);
    
    let userPrompt = prompt(promptTitle, constant.GAME_SIZES[activeGameSizeIndex]);

    //console.log("prompt = ", userPrompt);
    
    if(userPrompt !== null) {

        let newGameSizeIndex;

        userPrompt = parseInt(userPrompt);

        if(userPrompt === NaN || constant.GAME_SIZES.find(x => x === userPrompt) === undefined) {

            newGameSizeIndex = activeGameSizeIndex;
        
        } else {

            newGameSizeIndex = constant.GAME_SIZES.indexOf(userPrompt);
        }

        makeNewGame(newGameSizeIndex);
    }
}


function debugShowHexLabels() {
    
    const logicHexes = logic.getField();

    const debugLabels = [];
    logicHexes.forEach(hex => debugLabels.push(hex.x + "," + hex.y));

    const CURRENT_TEXT_STYLE = vis.TEXT_DEBUG;//TEXT_ON_DARK_WARM;
    const TEXT_STYLE = new PIXI.TextStyle(CURRENT_TEXT_STYLE);

    const LABELS = DRAW.indexLabels(PIXI.Text, TEXT_STYLE, debugLabels);

    LABELS.forEach(label => app.stage.addChild(label));
}