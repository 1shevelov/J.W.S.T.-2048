export const USE_POINTY_HEXES = false;  // false === flat top

// Color themes naming prefixes
// c - color
// w - width
// a - alpha


export const THEME_PIXI_EXAMPLE = {

    "hexFill": 0xFF3300,
    "lineWidth": 4,
    "lineColor": 0xffd900,
    "lineAlpha": 1,
    "lineAlignment": 0.5,  // (0 = inner, 0.5 = middle(default), 1 = outer). WebGL only
}

export const THEME_LIGHT = {

    "cBackground": 0xffffff,
    "cHexFill": 0xff3300,
    "wLine": 4,
    "cLine": 0xffd900,
    "aLine": 1
}

export const THEME_DARK_WARM = {

    "cBackground": 0x01020a,
    "cHexFill": 0x801805,
    "wLine": 3,
    "cLine": 0xfea82f,
    "aLine": 1,
}

export const TEXT_ON_DARK_WARM = {
    fontFamily: 'Courier New',
    fontSize: 28,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fill: '#fffecb',
    //stroke: '#4a1850',
    //strokeThickness: 5,
    //dropShadow: true,
    //dropShadowColor: '#000000',
    //dropShadowBlur: 4,
    //dropShadowAngle: Math.PI / 6,
    //dropShadowDistance: 6,
    //wordWrap: true,
    //wordWrapWidth: 440,
    //lineJoin: 'round',
}

export const TEXT_DEBUG = {
    fontFamily: 'Courier New',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fill: '#fffecb',
}