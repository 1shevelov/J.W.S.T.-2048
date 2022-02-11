export const GAME_SIZES = [2, 3, 4];

//export const CURRENT_GAME_SIZE = GAME_SIZES[0];

export const GAME_GOALS = [256, 1024, 8096];

// field cells coordinates stored in a "packed" way
// each row is a ring of cells around cell zero {0, 0, 0}
// coordinates Xs and Ys alternate
export const FIELD_RING = [
    //[0,0],  // center cell, created in GameLogic.createCircularField()
    [0,1, 1,0, 1,-1, 0,-1, -1,0, -1,1],  // ring 2 (+6 cells)
    [0,2, 1,1, 2,0, 2,-1, 2,-2, 1,-2, 0,-2, -1,-1, -2,0, -2,1, -2,2, -1,2],  //ring 3 (+12 cells)
    [0,3, 1,2, 2,1, 3,0, 3,-1, 3,-2, 3,-3, 2,-3, 1,-3, 0,-3, -1,-2, -2,-1, -3,0, -3,1, -3,2, -3,3, -2,3, -1,3]  // ring 4 (+18 cells)
];

export const CELL_EMPTY = 0;
export const CELL_DISABLED = -1; // for field configurations with gaps or just out of borders


export const STATUS_DOM_PLAYING = "playing";
export const STATUS_UI_PLAYING = "Game in progress";
export const STATUS_DOM_GAME_OVER = "game-over";
export const STATUS_UI_GAME_OVER = "Game is finished";


// const DEV_SERVER = "";
// const PROD_SERVER = "hex2048szb9jquj-hex15.functions.fnc.fr-par.scw.cloud";

// export const RNG_SERVER = PROD_SERVER;

// key codes that make move
export const KEYS_MOVE = ["KeyQ", "KeyW", "KeyE", "KeyA", "KeyS", "KeyD",
    "Numpad7", "Numpad8", "Numpad9", "Numpad4", "Numpad5", "Numpad6"];

// direction keys & corresponding vectors
export const KEY_Q = "q";
export const SHIFT_Q = [-1, 1];
export const KEY_A = "a";
export const SHIFT_A = [-1, 0];
export const KEY_W = "w";
export const SHIFT_W = [0, 1];
export const KEY_S = "s";
export const SHIFT_S = [0, -1];
export const KEY_E = "e";
export const SHIFT_E = [1, 0];
export const KEY_D = "d";
export const SHIFT_D = [1, -1];