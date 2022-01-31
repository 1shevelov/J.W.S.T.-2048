// Drawing with PIXI

//import * as vis from "./visuals.mjs";
//import * as constant from "./constants.mjs";


export default class Draw {

    constructor(pixiGraphics, theme, usePointyHexes) {

        this.pixiGraph = pixiGraphics;
        
        this.theme = theme;

        //this.textStyle = textStyle;

        this.usePointyHexes = usePointyHexes;

        // array of all hexes
        // the sequence of array's members corresponds to that of a GameLogic.field
        this.fieldHexes = [];
    }


    getHexes() {

        return this.fieldHexes;
    }

    // draws a hex
    // pointy = true - pointy hex
    // pointy = false - flat top
    hex(center, radius) {

        this.pixiGraph.beginFill(this.theme.cHexFill);
        
        this.pixiGraph.lineStyle(
            this.theme.wLine,
            this.theme.cLine,
            this.theme.aLine);
        
        const vertices = this.getHexVertices(center, radius, this.usePointyHexes);

        this.pixiGraph.moveTo(vertices[0][0], vertices[0][1]);

        for(let i = 1; i < vertices.length; i++) {

            this.pixiGraph.lineTo(vertices[i][0], vertices[i][1]);
        }

        this.pixiGraph.closePath();
        this.pixiGraph.endFill();
    }


    // draws circular field of hexes
    circularField(gameSize, center, radius) {

        const hexRadius = radius / (gameSize + 0.5);

        let newHexesCenters = [];
        
        // first hex is a center hex
        this.fieldHexes.push(center);

        // distance to centers of the corner ring hexes
        let distance2Ring = hexRadius * Math.sqrt(3);

        // first circle (gameSize == 2, 6 hexes)
        // !(not use pointy hexes) here to get centers at the right position
        newHexesCenters = this.getHexVertices(center, distance2Ring, !this.usePointyHexes);

        this.fieldHexes.push(...newHexesCenters);

        // array of not corner hexes
        let interimHexesCenters = [];
        
        for(let s = 2; s < gameSize; s++) {

            distance2Ring += hexRadius * Math.sqrt(3);

            newHexesCenters = this.getHexVertices(center, distance2Ring, !this.usePointyHexes);

            interimHexesCenters = this.getInterimHexCenters(newHexesCenters, s);

            //starting to insert interim hexes from the second position
            let i = 1;

            while(interimHexesCenters.length > 0) {

                for(let j = 0; j < s - 1; j++) {

                    newHexesCenters.splice(i, 0, interimHexesCenters.shift());
                    i++;
                }

                i++; //skipping next corner hex
            }
        
            this.fieldHexes.push(...newHexesCenters);
        }

        // draw all the hexes
        this.fieldHexes.forEach(hexCenter => {

            this.hex(hexCenter, hexRadius);
        });
    }
    

    // returns interim' hexes centers
    getInterimHexCenters(cornerHexesCenters, circleNum) {
    
        let interimHexesCenters = [];

        let nextCornerHexCenter;

        let shift = []; // shift between interim hexes' centers

        for(let i = 0; i < cornerHexesCenters.length; i++) {

            if(cornerHexesCenters[i + 1] !== undefined)
                nextCornerHexCenter = cornerHexesCenters[i + 1];
            
            else
                nextCornerHexCenter = cornerHexesCenters[0];

            shift[0] = nextCornerHexCenter[0] - cornerHexesCenters[i][0];
            shift[0] /= circleNum;

            shift[1] = nextCornerHexCenter[1] - cornerHexesCenters[i][1];
            shift[1] /= circleNum;
            
            for(let j = 1; j < circleNum; j++) {

                interimHexesCenters.push([cornerHexesCenters[i][0] + shift[0] * j,
                    cornerHexesCenters[i][1] + shift[1] * j]);
            }
            
            //interimHexesCenters.push(...currentHexesCenters);
        }
        
        return interimHexesCenters;
    }


    // returns hex vertices
    // also used to get corner's hexes centers
    getHexVertices(center, radius, pointyHexes) {
    
        let vertices = [];

        let angle;

        if(pointyHexes) angle = 180 + 30;  // degrees
        else angle = 180;

        for(let i = 0; i < 6; i++) {

            angle += 60;

            vertices.push([center[0] + radius * Math.cos(angle * Math.PI / 180),
                center[1] + radius * Math.sin(angle * Math.PI / 180)]);
        }
        
        return vertices;
    }


    // draws text labels over all hexes
    // returns array of labels for output
    // if addInfo(array) present, show it next to cell's index
    indexLabels(pixiText, textStyle, addInfo) {

        let labels = [];

        let label;
        let labelText = "";

        this.fieldHexes.forEach((hexCenter, index) => {

            labelText = String(index + 1);

            if(addInfo !== undefined) labelText += "\n" + addInfo[index];
            
            label = new pixiText(labelText, textStyle);

            label.x = hexCenter[0];
            label.y = hexCenter[1];
            label.anchor.set(0.5);

            labels.push(label);
        });

        return labels;
    }
}