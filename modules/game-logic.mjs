// CELL: one hex of the field
// EMPTY CELL: CELL has value !== CELL_EMPTY
// DISABLED CELL: CELL that has value === CELL_DISABLED and can't be changed
// TILE: any not EMPTY or DISABLED CELL

import * as constant from "./constants.mjs";


export default class GameLogic {

    constructor(gameSize) {

        this.gameSize = gameSize;

        this.field = [];

        // remove and call this method separately when other field geometries will be implemented
        this.createCircularField();
    }


    // create circular field of size <gameSize> without gaps
    createCircularField() {

        if(!constant.GAME_SIZES.includes(this.gameSize)) {

            console.log("ERROR: wrong gameSize = ", this.gameSize);
            return false;
        }

        this.field[0] = {
            "x": 0,
            "y": 0,
            "z": 0,
            "value": constant.CELL_EMPTY,
            "merged": false  // become true if tile was merged this turn
        };

        createCellsRing(this.field, constant.GAME_SIZES[0]);

        if(this.gameSize > constant.GAME_SIZES[0]) createCellsRing(this.field, constant.GAME_SIZES[1]);

        // TODO: should make 3rd row in constant.FIELD_RING first
        //if(gameSize === constant.GAME_SIZES[2]) createCellsRing(this.field, constant.GAME_SIZES[2]);


        function createCellsRing(field, ringNum) {

            let x,y;
            
            for(let i = 0; i < constant.FIELD_RING[ringNum - 2].length; i++) {

                x = constant.FIELD_RING[ringNum - 2][i];
                y = constant.FIELD_RING[ringNum - 2][++i];

                field.push({
                    "x": x,
                    "y": y,
                    "z": 0 - x - y,
                    "value": constant.CELL_EMPTY,
                    "merged": false
                });
            }
        }
    }


    getField() {

        return this.field;
    }


    // Adds new tiles to the field,
    // in case RNG server is unavailable or another generation algorythm is needed.
    //
    // tilesNum - number of cells to add values to (create new "tiles")
    // newValues - array of values to randomly choose from, ex. [2], or [2, 4],
    // or [2, 2, 2, 4] - where 4 will be created with 25% chance
    newTiles(tilesNum, newValues) {

        let maxTilesToAdd = this.getEmptyTilesNum();

        if(tilesNum > maxTilesToAdd) {

            console.log("ERROR: can't add ", tilesNum, " tiles. Adding maximum of ", maxTilesToAdd);
            tilesNum = maxTilesToAdd;
        }

        let emptyCells = this.field.filter(cell => cell.value === constant.CELL_EMPTY);
        
        for(let i = 0; i < tilesNum; i++) {

            let rand = this.getRandomVal(emptyCells.length);

            let cellForNewVal = this.field.find(cell =>
                cell.x === emptyCells[rand].x && cell.y === emptyCells[rand].y);

            emptyCells.splice(rand, 1);

            cellForNewVal.value = newValues[this.getRandomVal(newValues.length)];
        }
    }


    // returns random integer, where 0 <= return < max
    getRandomVal(max) {
        
        return Math.floor(Math.random() * max);
    }


    // returns the number of empty tiles
    getEmptyTilesNum() {

        let num = 0;

        this.field.forEach(cell => {
            
            if(cell.value === constant.CELL_EMPTY) {

                num++;
            }
        });

        return num;
    }


    // Shifting tiles in a given direction by one cell
    // dirVector = [x, y]
    shift(dirVector) {

        let changedTiles = false;
        let neighbour;
        
        this.field.forEach(cell => {

            neighbour = this.getNeighbour(cell, dirVector);
            
            if(cell.value !== constant.CELL_EMPTY && cell.value !== constant.CELL_DISABLED
                && neighbour.hasOwnProperty('value') && neighbour.value === constant.CELL_EMPTY) {

                neighbour.value = cell.value;
                cell.value = constant.CELL_EMPTY;

                changedTiles = true;
            }
        });

        return changedTiles;
    }


    merge(dirVector) {

        let changedTiles = false;
        let neighbour;

        this.field.forEach(cell => {
            
            neighbour = this.getNeighbour(cell, dirVector);

            if(neighbour.value === cell.value && !neighbour.merged) {

                neighbour.value += cell.value;
                neighbour.merged = true;
                cell.value = constant.CELL_EMPTY;
                changedTiles = true;
            }
        });

        return changedTiles;
    }


    makeMove(dirVector) {

        while(true) {

            if(!this.shift(dirVector)) break; // not a single tile moved
            
            console.log("tiles shifted");
        }

        if(this.merge(dirVector))
            
            // start sahifting tiles again
            this.makeMove(dirVector); // recoursive call
        
        else
            {
                console.log("move finished");

                this.field.forEach(cell => {

                    cell.merged = false;
                });
                // wait for next user input
            }
    }


    // returns cell next to current in the given direction
    getNeighbour(cell, dirVector) {

        for(let i = 0; i < this.field.length; i++) {

            if(this.field[i].x === cell.x + dirVector[0] &&
                this.field[i].y === cell.y + dirVector[1] &&
                this.field[i].z === cell.z - dirVector[0] - dirVector[1])
                    return this.field[i];
        }

        return {};
    }


    // Check if the goal has been met
    checkGoal(goalValue) {
        
        this.field.forEach(cell => {
            
            if(cell.value >= goalValue) return true;
        });

        return false;
    }
}