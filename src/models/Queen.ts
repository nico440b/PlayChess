import { Team, Type } from "../types";
import { Piece } from "./Piece";
import { Position } from "./Position";

export class Queen extends Piece{
    constructor( team: Team, position: Position ){
        super(
            Type.QUEEN,
            team,
            position,
            9,
            false
            
        );
    }

    validMove(startX: number, startY: number, endX: number, endY: number, state: Piece[]):boolean{
        if (!this.tileUsedByOpp(endX, endY, state, this.team)) {
            for (let i = 1; i < 8; i++) {

                if (endX > startX && endY > startY) {
                    let squaresPassed: Position = { x: startX + i, y: startY + i };
                    let endPos: Position = { x: endX, y: endY };


                    if (this.posCheck(squaresPassed, endPos)) {

                        if (!this.tileIsUsed(endPos.x, endPos.y, state)) {
                            return true
                        }
                        else if (this.tileIsUsed(endPos.x, endPos.y, state)) {
                            
                            return false
                        }

                    } else {
                        if (this.tileIsUsed(squaresPassed.x, squaresPassed.y, state)) {
                            break;
                        }
                    }
                }

                if (endX > startX && endY < startY) {
                    let squaresPassed: Position = { x: startX + i, y: startY - i };
                    let endPos: Position = { x: endX, y: endY };


                    if (this.posCheck(squaresPassed, endPos)) {

                        if (!this.tileIsUsed(endPos.x, endPos.y, state)) {
                            return true
                        }
                        else if (this.tileIsUsed(endPos.x, endPos.y, state)) {
                            
                            return false
                        }

                    } else {
                        if (this.tileIsUsed(squaresPassed.x, squaresPassed.y, state)) {
                            break;
                        }
                    }
                }

                if (endX < startX && endY < startY) {
                    let squaresPassed: Position = { x: startX - i, y: startY - i };
                    let endPos: Position = { x: endX, y: endY };


                    if (this.posCheck(squaresPassed, endPos)) {

                        if (!this.tileIsUsed(endPos.x, endPos.y, state)) {
                            return true
                        }
                        else if (this.tileIsUsed(endPos.x, endPos.y, state)) {
                            const pieceDefended = state.find(p=> p.position.x === endX && p.position.y === endY)
                             
                            return false
                        }

                    } else {
                        if (this.tileIsUsed(squaresPassed.x, squaresPassed.y, state)) {
                            break;
                        }
                    }
                }

                if (endX < startX && endY > startY) {
                    let squaresPassed: Position = { x: startX - i, y: startY + i };
                    let endPos: Position = { x: endX, y: endY };


                    if (this.posCheck(squaresPassed, endPos)) {

                        if (!this.tileIsUsed(endPos.x, endPos.y, state)) {
                            return true
                        }
                        else if (this.tileIsUsed(endPos.x, endPos.y, state)) {
                            
                            return false
                        }

                    } else {
                        if (this.tileIsUsed(squaresPassed.x, squaresPassed.y, state)) {
                            break;
                        }
                    }
                }

                if (endX > startX && endY === startY) {
                    let squaresPassed: Position = { x: startX + i, y: startY };
                    let endPos: Position = { x: endX, y: endY };


                    if (this.posCheck(squaresPassed, endPos)) {

                        if (!this.tileIsUsed(endPos.x, endPos.y, state)) {
                            return true
                        }
                        else if (this.tileIsUsed(endPos.x, endPos.y, state)) {
                            
                            return false
                        }

                    } else {
                        if (this.tileIsUsed(squaresPassed.x, squaresPassed.y, state)) {
                            break;
                        }
                    }
                }

                if (endX < startX && endY === startY) {
                    let squaresPassed: Position = { x: startX - i, y: startY };
                    let endPos: Position = { x: endX, y: endY };


                    if (this.posCheck(squaresPassed, endPos)) {

                        if (!this.tileIsUsed(endPos.x, endPos.y, state)) {
                            return true
                        }
                        else if (this.tileIsUsed(endPos.x, endPos.y, state)) {
                            
                            return false
                        }

                    } else {
                        if (this.tileIsUsed(squaresPassed.x, squaresPassed.y, state)) {
                            break;
                        }
                    }
                }

                if (endX === startX && endY < startY) {
                    let squaresPassed: Position = { x: startX, y: startY - i };
                    let endPos: Position = { x: endX, y: endY };


                    if (this.posCheck(squaresPassed, endPos)) {

                        if (!this.tileIsUsed(endPos.x, endPos.y, state)) {
                            return true
                        }
                        else if (this.tileIsUsed(endPos.x, endPos.y, state)) {
                            
                            return false
                        }

                    } else {
                        if (this.tileIsUsed(squaresPassed.x, squaresPassed.y, state)) {
                            break;
                        }
                    }
                }

                if (endX === startX && endY > startY) {
                    let squaresPassed: Position = { x: startX, y: startY + i };
                    let endPos: Position = { x: endX, y: endY };


                    if (this.posCheck(squaresPassed, endPos)) {

                        if (!this.tileIsUsed(endPos.x, endPos.y, state)) {
                            return true
                        }
                        else if (this.tileIsUsed(endPos.x, endPos.y, state)) {
                            
                            return false
                        }

                    } else {
                        if (this.tileIsUsed(squaresPassed.x, squaresPassed.y, state)) {
                            break;
                        }
                    }
                }


            }
        }
        else if (this.tileUsedByOpp(endX, endY, state, this.team)) {
            for (let i = 1; i < 8; i++) {

                if (endX > startX && endY > startY) {
                    let squaresPassed: Position = { x: startX + i, y: startY + i };
                    let endPos: Position = { x: endX, y: endY };


                    if (this.posCheck(squaresPassed, endPos)) {

                        if (this.tileIsUsed(endPos.x, endPos.y, state)) {
                            return true
                        }


                    } else {
                        if (this.tileIsUsed(squaresPassed.x, squaresPassed.y, state)) {
                            break;
                        }
                    }
                }

                else if (endX > startX && endY < startY) {
                    let squaresPassed: Position = { x: startX + i, y: startY - i };
                    let endPos: Position = { x: endX, y: endY };


                    if (this.posCheck(squaresPassed, endPos)) {

                        if (this.tileIsUsed(endPos.x, endPos.y, state)) {
                            return true
                        }


                    } else {
                        if (this.tileIsUsed(squaresPassed.x, squaresPassed.y, state)) {
                            break;
                        }
                    }
                }

                else if (endX < startX && endY < startY) {
                    let squaresPassed: Position = { x: startX - i, y: startY - i };
                    let endPos: Position = { x: endX, y: endY };


                    if (this.posCheck(squaresPassed, endPos)) {

                        if (this.tileIsUsed(endPos.x, endPos.y, state)) {
                            return true
                        }


                    } else {
                        if (this.tileIsUsed(squaresPassed.x, squaresPassed.y, state)) {
                            break;
                        }
                    }
                }

                else if (endX < startX && endY > startY) {
                    let squaresPassed: Position = { x: startX - i, y: startY + i };
                    let endPos: Position = { x: endX, y: endY };


                    if (this.posCheck(squaresPassed, endPos)) {

                        if (this.tileIsUsed(endPos.x, endPos.y, state)) {
                            return true
                        }

                    } else {
                        if (this.tileIsUsed(squaresPassed.x, squaresPassed.y, state)) {
                            break;
                        }
                    }
                }

                else if (endX > startX && endY === startY) {
                    let squaresPassed: Position = { x: startX + i, y: startY };
                    let endPos: Position = { x: endX, y: endY };


                    if (this.posCheck(squaresPassed, endPos)) {

                        if (this.tileIsUsed(endPos.x, endPos.y, state)) {
                            return true
                        }


                    } else {
                        if (this.tileIsUsed(squaresPassed.x, squaresPassed.y, state)) {
                            break;
                        }
                    }
                }

                else if (endX < startX && endY === startY) {
                    let squaresPassed: Position = { x: startX - i, y: startY };
                    let endPos: Position = { x: endX, y: endY };


                    if (this.posCheck(squaresPassed, endPos)) {

                        if (this.tileIsUsed(endPos.x, endPos.y, state)) {
                            return true
                        }


                    } else {
                        if (this.tileIsUsed(squaresPassed.x, squaresPassed.y, state)) {
                            break;
                        }
                    }
                }

                else if (endX === startX && endY < startY) {
                    let squaresPassed: Position = { x: startX, y: startY - i };
                    let endPos: Position = { x: endX, y: endY };


                    if (this.posCheck(squaresPassed, endPos)) {

                        if (this.tileIsUsed(endPos.x, endPos.y, state)) {
                            return true
                        }


                    } else {
                        if (this.tileIsUsed(squaresPassed.x, squaresPassed.y, state)) {
                            break;
                        }
                    }
                }

                else if (endX === startX && endY > startY) {
                    let squaresPassed: Position = { x: startX, y: startY + i };
                    let endPos: Position = { x: endX, y: endY };


                    if (this.posCheck(squaresPassed, endPos)) {

                        if (this.tileIsUsed(endPos.x, endPos.y, state)) {
                            const king = state.find(k=> k.position.x === endPos.x && k.position.y === endPos.y && k.type === Type.KING && k.team !== this.team)
                            
                            return true
                        }


                    } else {
                        if (this.tileIsUsed(squaresPassed.x, squaresPassed.y, state)) {
                            break;
                        }
                    }
                }

            }
        }
        return false;
    }

    allValidMoves(selected: Piece, state: Piece[]): Position[]{
        const validMoves: Position[] = [];
        for (let i = 1; i < 8; i++) {
            const endPosition: Position = { x: this.position.x, y: this.position.y + i };

            if(this.validMove(this.position.x, this.position.y, endPosition.x, endPosition.y, state)){
                if( endPosition.x >-1 && endPosition.y >-1 && endPosition.x<8 && endPosition.y<8){
                    validMoves.push(endPosition);  
                }
                 
            } else {
                break;
            }
            
            
        }
        for (let i = 1; i < 8; i++) {
            const endPosition: Position = { x: this.position.x, y: this.position.y - i };

            if(this.validMove(this.position.x, this.position.y, endPosition.x, endPosition.y, state)){
                if( endPosition.x >-1 && endPosition.y >-1 && endPosition.x<8 && endPosition.y<8){
                    validMoves.push(endPosition);  
                }  
            } else {
                break;
            }
        }
        for (let i = 1; i < 8; i++) {
            const endPosition: Position = { x: this.position.x + i, y: this.position.y };

            if(this.validMove(this.position.x, this.position.y, endPosition.x, endPosition.y, state)){
                if( endPosition.x >-1 && endPosition.y >-1 && endPosition.x<8 && endPosition.y<8){
                    validMoves.push(endPosition);  
                }
            } else {
                break;
            }
        }
        for (let i = 1; i < 8; i++) {
            const endPosition: Position = { x: this.position.x - i, y: this.position.y };

            if(this.validMove(this.position.x, this.position.y, endPosition.x, endPosition.y, state)){
                if( endPosition.x >-1 && endPosition.y >-1 && endPosition.x<8 && endPosition.y<8){
                    validMoves.push(endPosition);  
                }
            } else {
                break;
            }
        }
        for (let i = 1; i < 8; i++) {
            const endPosition: Position = { x: this.position.x + i, y: this.position.y + i };

            if(this.validMove(this.position.x, this.position.y, endPosition.x, endPosition.y, state)){
                if( endPosition.x >-1 && endPosition.y >-1 && endPosition.x<8 && endPosition.y<8){
                    validMoves.push(endPosition);  
                }
                 
            } else {
                break;
            }
        }
        for (let i = 1; i < 8; i++) {
            const endPosition: Position = { x: this.position.x - i, y: this.position.y + i };

            if(this.validMove(this.position.x, this.position.y, endPosition.x, endPosition.y, state)){
                if( endPosition.x >-1 && endPosition.y >-1 && endPosition.x<8 && endPosition.y<8){
                    validMoves.push(endPosition);  
                }  
            } else {
                break;
            }
        }
        for (let i = 1; i < 8; i++) {
            const endPosition: Position = { x: this.position.x + i, y: this.position.y - i };

            if(this.validMove(this.position.x, this.position.y, endPosition.x, endPosition.y, state)){
                if( endPosition.x >-1 && endPosition.y >-1 && endPosition.x<8 && endPosition.y<8){
                    validMoves.push(endPosition);  
                }   
            } else {
                break;
            }
        }
        for (let i = 1; i < 8; i++) {
            const endPosition: Position = { x: this.position.x - i, y: this.position.y - i };

            if(this.validMove(this.position.x, this.position.y, endPosition.x, endPosition.y, state)){
                if( endPosition.x >-1 && endPosition.y >-1 && endPosition.x<8 && endPosition.y<8){
                    validMoves.push(endPosition);  
                }  
            } else {
                break;
            }
        }
        selected.moves = validMoves;
        return selected.moves;
    }
}