// game field sizes
// where the elements are number of hex circles including central hex (first circle)
export const GAME_SIZES = [2, 3, 4];

// new tiles generation patterns
// each turn a one of the elements is chosen and spawned
export const GAME_SIZES_NEW_TILES = [
    [2, 2, 2, 2, 4],
    [2, 2, 2, 2, 4, 4],
    [2, 2, 2, 2, 2, 4, 4, 4, 8]
];

// to win a game achieve this goal number 
export const GAME_GOALS = [128, 1024, 8096];

// field cells coordinates stored in a "packed" way
// each row is a ring of cells around cell zero {0, 0, 0}
// coordinates Xs and Ys alternate
export const FIELD_RING = [
    //[0,0],  // center cell, created in GameLogic.createCircularField()
    [0,1, 1,0, 1,-1, 0,-1, -1,0, -1,1],  // ring 2 (+6 cells)
    [0,2, 1,1, 2,0, 2,-1, 2,-2, 1,-2, 0,-2, -1,-1, -2,0, -2,1, -2,2, -1,2],  //ring 3 (+12 cells)
    [0,3, 1,2, 2,1, 3,0, 3,-1, 3,-2, 3,-3, 2,-3, 1,-3, 0,-3, -1,-2, -2,-1,
        -3,0, -3,1, -3,2, -3,3, -2,3, -1,3]  // ring 4 (+18 cells)
];

export const CELL_EMPTY = 0;
export const CELL_DISABLED = -1; // for field configurations with gaps or just out of borders

export const MOVE_KEYPRESS_DELAY = 200; // ms

export const STATUS_DOM_PLAYING = "playing";
export const STATUS_UI_PLAYING = "Game in progress";
export const STATUS_DOM_GAME_OVER = "game-over";
export const STATUS_UI_GAME_OVER = "Game is finished";

export const GAME_STATE_PAUSE = 0;
export const GAME_STATE_PLAYING = 1;
//export const GAME_STATES[];

// const DEV_SERVER = "";
// const PROD_SERVER = "hex2048szb9jquj-hex15.functions.fnc.fr-par.scw.cloud";

// export const RNG_SERVER = PROD_SERVER;

export const KEY_UNASSIGNED = 0;
export const KEY_MOVE = 1;
export const KEY_UI = 2;

// key codes that make move
export const KEYS_MOVE = [
    "KeyQ", "Numpad7",
    "KeyW", "Numpad8",
    "KeyE", "Numpad9",
    "KeyA", "Numpad4",
    "KeyS", "Numpad5",
    "KeyD", "Numpad6"
];

// direction vectors
export const SHIFT_Q = [-1, 1];
export const SHIFT_W = [0, 1];
export const SHIFT_E = [1, 0];
export const SHIFT_A = [-1, 0];
export const SHIFT_S = [0, -1];
export const SHIFT_D = [1, -1];

