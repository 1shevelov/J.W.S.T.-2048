import * as PIXI from './node_modules/pixi.js/dist/browser/pixi.mjs';
import * as constant from "./modules/constants.mjs";
import * as vis from "./modules/visuals.mjs";

import GameLogic from "./modules/game-logic.mjs";
import Draw from "./modules/draw.mjs";
import InputHandler from "./modules/input-handler.mjs";

let current_game_size = 0; // an index in GAME_SIZES array

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

const DRAW = new Draw(GR, CURRENT_THEME, vis.USE_POINTY_HEXES);

const CURRENT_TEXT_STYLE = vis.LABEL_ON_DARK_WARM;
const LABEL_STYLE = new PIXI.TextStyle(CURRENT_TEXT_STYLE);

let logic;

let field;

startGame();

function startGame() {

    DRAW.circularField(constant.GAME_SIZES[current_game_size], [300, 300], 200);

    app.stage.addChild(GR);

    logic = new GameLogic(constant.GAME_SIZES[current_game_size]);

    logic.newTiles(1, constant.GAME_SIZES_NEW_TILES[current_game_size]);

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

            //check if move changed field's state and skip if not
            //console.log(field);
            logic.makeMove(action[1]);
            //console.log(field);
            logic.newTiles(1, [2, 2, 2, 2, 4]);
            DRAW.updateLabels(field);
            break;

        case constant.KEY_UI:

            // UI action
            break;
    }
});


//logic.newTiles(2, [4]);
//console.log("Neighbour: ", logic.getNeighbour(cell, constant.SHIFT_A));
// console.log("Shifted tiles: ", logic.shift(constant.SHIFT_W));
// console.log(field);
// console.log("Shifted tiles 2: ", logic.shift(constant.SHIFT_S));
// console.log(field);


function debugShowHexLabels() {
    
    const logicHexes = logic.getField();

    const debugLabels = [];
    logicHexes.forEach(hex => debugLabels.push(hex.x + "," + hex.y));

    const CURRENT_TEXT_STYLE = vis.TEXT_DEBUG;//TEXT_ON_DARK_WARM;
    const TEXT_STYLE = new PIXI.TextStyle(CURRENT_TEXT_STYLE);

    const LABELS = DRAW.indexLabels(PIXI.Text, TEXT_STYLE, debugLabels);

    LABELS.forEach(label => app.stage.addChild(label));
}