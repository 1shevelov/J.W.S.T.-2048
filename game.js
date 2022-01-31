import * as PIXI from './node_modules/pixi.js/dist/browser/pixi.mjs';
import * as constant from "./modules/constants.mjs";
import * as vis from "./modules/visuals.mjs";

import GameLogic from "./modules/game-logic.mjs";
import Draw from "./modules/draw.mjs";

const CURRENT_GAME_SIZE = constant.GAME_SIZES[2];

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

//DRAW.hex([200, 200], 100);

DRAW.circularField(CURRENT_GAME_SIZE, [300, 300], 200);

app.stage.addChild(GR);


let logic = new GameLogic(CURRENT_GAME_SIZE);

const logicHexes = logic.getField();

const logicLabels = [];
logicHexes.forEach(hex => logicLabels.push(hex.x + "," + hex.y));

const CURRENT_TEXT_STYLE = vis.TEXT_DEBUG;//TEXT_ON_DARK_WARM;
const TEXT_STYLE = new PIXI.TextStyle(CURRENT_TEXT_STYLE);

const LABELS = DRAW.indexLabels(PIXI.Text, TEXT_STYLE, logicLabels);

LABELS.forEach(label => app.stage.addChild(label));


// logic.newTiles(1, [2]);
// let field = logic.getField();
// console.log(field);
//logic.newTiles(2, [4]);
//console.log("Neighbour: ", logic.getNeighbour(cell, constant.SHIFT_A));
// console.log("Shifted tiles: ", logic.shift(constant.SHIFT_W));
// console.log(field);
// console.log("Shifted tiles 2: ", logic.shift(constant.SHIFT_S));
// console.log(field);