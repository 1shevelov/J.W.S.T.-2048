import * as constant from "./constants.mjs";

export default class EventHandler {

    constructor(document) {

        this.keyCode = "";
        
        document.addEventListener('keydown', (event) => {this.keyboardHandler(event);});
    }


    keyboardHandler(event) {

        this.keyCode = event.code;

        if(constant.KEYS_MOVE.find(keyCode => keyCode === this.keyCode))
        
            this.generateMoveEvent();
    }


    generateMoveEvent() {

        console.log("Pressed key code: ", this.keyCode);
    }


    getPressedKeyCode() {

        return this.keyCode;
    }
}