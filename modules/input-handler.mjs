import * as constant from "./constants.mjs";

export default class InputHandler {

    constructor(document) {

        this.keyCode = "";

        this.prevKeypressTimestamp = 0;
    }


    keyboardHandler(event) {

        let currentTimestamp = Date.now();

        if(currentTimestamp - this.prevKeypressTimestamp < constant.MOVE_KEYPRESS_DELAY)

            return [constant.KEY_UNASSIGNED];

        //console.log(currentTimestamp - this.prevKeypressTimestamp);
        
        this.prevKeypressTimestamp = currentTimestamp;
        
        this.keyCode = event.code;

        switch(this.keyCode) {

            case constant.KEYS_MOVE[0]:
            case constant.KEYS_MOVE[1]:

                return [constant.KEY_MOVE, constant.SHIFT_Q];

            case constant.KEYS_MOVE[2]:
            case constant.KEYS_MOVE[3]:
    
                return [constant.KEY_MOVE, constant.SHIFT_W];
                
            case constant.KEYS_MOVE[4]:
            case constant.KEYS_MOVE[5]:
            
                return [constant.KEY_MOVE, constant.SHIFT_E];

            case constant.KEYS_MOVE[6]:
            case constant.KEYS_MOVE[7]:
                    
                return [constant.KEY_MOVE, constant.SHIFT_A];

            case constant.KEYS_MOVE[8]:
            case constant.KEYS_MOVE[9]:
                    
                return [constant.KEY_MOVE, constant.SHIFT_S];

            case constant.KEYS_MOVE[10]:
            case constant.KEYS_MOVE[11]:
                    
                return [constant.KEY_MOVE, constant.SHIFT_D];

            default:
                
                console.log("Unhandled key pressed: ", this.keyCode);
                return [constant.KEY_UNASSIGNED];
        }
    }


    generateMoveEvent() {

        console.log("Pressed key code: ", this.keyCode);
    }


    getPressedKeyCode() {

        return this.keyCode;
    }
}