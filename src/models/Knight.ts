import { Team, Type } from "../types";
import { Piece } from "./Piece";
import { Position } from "./Position";

export class Knight extends Piece {
    constructor(team: Team, position: Position) {
        super(
            Type.KNIGHT,
            team,
            position,
            3,
            false

        );
    }

    validMove(startX: number, startY: number, endX: number, endY: number, state: Piece[]): boolean {
        if ((endX === startX - 1 && (endY === startY + 2 || endY === startY - 2))
            || (endX === startX + 1 && (endY === startY + 2 || endY === startY - 2))) {
            if (!this.tileIsUsed(endX, endY, state)) {

                return true;
            }
            else if (this.tileIsUsed(endX, endY, state)) {
                
                if (this.tileUsedByOpp(endX, endY, state, this.team)) {
                    return true;
                }
                else if (this.tileIsUsed(endX, endY, state)) {
                    
                   return false
               }
            }
            ///Horizontal Move///
        } 
        else if ((endX === startX - 2 && endY === startY + 1) || (endX === startX + 2 && endY === startY + 1)) {
            if (!this.tileIsUsed(endX, endY, state)) {

                return true;
            }
            else if (this.tileIsUsed(endX, endY, state)) {
                if (this.tileUsedByOpp(endX, endY, state, this.team)) {
                    return true;
                }
                else if (this.tileIsUsed(endX, endY, state)) {
                    
                   return false
               }
            }
        } 
        else if ((endX === startX - 2 && endY === startY - 1) || (endX === startX + 2 && endY === startY - 1)) {
            if (!this.tileIsUsed(endX, endY, state)) {

                return true;
            }
            else if (this.tileIsUsed(endX, endY, state)) {
                if (this.tileUsedByOpp(endX, endY, state, this.team)) {
                    return true;
                }
                else if (this.tileIsUsed(endX, endY, state)) {
                    
                    
                   return false
               }
            }

        }

        return false;
    }

    allValidMoves(selected: Piece, state: Piece[]): Position[] {
        const validMoves: Position[] = [];
        let vertUpLeft: Position = { x: this.position.x - 1, y: this.position.y + 2 };
        let vertUpRight: Position = { x: this.position.x + 1, y: this.position.y + 2 };

        let vertDownLeft: Position = { x: this.position.x - 1, y: this.position.y - 2 };
        let vertDownRight: Position = { x: this.position.x + 1, y: this.position.y - 2 };

        let horzUpLeft: Position = { x: this.position.x - 2, y: this.position.y + 1 };
        let horzUpRight: Position = { x: this.position.x + 2, y: this.position.y + 1 };

        let horzDownLeft: Position = { x: this.position.x - 2, y: this.position.y - 1 };
        let horzDownRight: Position = { x: this.position.x + 2, y: this.position.y - 1 };

        ///Vertical Move///
        if(this.validMove(this.position.x, this.position.y, vertUpLeft.x, vertUpLeft.y, state)){
            if( vertUpLeft.x >-1 && vertUpLeft.y >-1 && vertUpLeft.x<8 && vertUpLeft.y<8){
                validMoves.push(vertUpLeft);  
            }
        }
        if(this.validMove(this.position.x, this.position.y, vertUpRight.x, vertUpRight.y, state)){
            if( vertUpRight.x >-1 && vertUpRight.y >-1 && vertUpRight.x<8 && vertUpRight.y<8){
                validMoves.push(vertUpRight);  
            }
        }

        if(this.validMove(this.position.x, this.position.y, vertDownLeft.x, vertDownLeft.y, state)){
            if( vertDownLeft.x >-1 && vertDownLeft.y >-1 && vertDownLeft.x<8 && vertDownLeft.y<8){
                validMoves.push(vertDownLeft);  
            }
        }

        if(this.validMove(this.position.x, this.position.y, vertDownRight.x, vertDownRight.y, state)){
            if( vertDownRight.x >-1 && vertDownRight.y >-1 && vertDownRight.x<8 && vertDownRight.y<8){
                validMoves.push(vertDownRight);  
            }
        }

        ///Horizontal Move///
        if(this.validMove(this.position.x, this.position.y, horzUpLeft.x, horzUpLeft.y, state)){
            if( horzUpLeft.x >-1 && horzUpLeft.y >-1 && horzUpLeft.x<8 && horzUpLeft.y<8){
                validMoves.push(horzUpLeft);  
            }
        }

        if(this.validMove(this.position.x, this.position.y, horzUpRight.x, horzUpRight.y, state)){
            if( horzUpRight.x >-1 && horzUpRight.y >-1 && horzUpRight.x<8 && horzUpRight.y<8){
                validMoves.push(horzUpRight);  
            }
        }

        if(this.validMove(this.position.x, this.position.y, horzDownLeft.x, horzDownLeft.y, state)){
            if( horzDownLeft.x >-1 && horzDownLeft.y >-1 && horzDownLeft.x<8 && horzDownLeft.y<8){
                validMoves.push(horzDownLeft);  
            }
        }

        if(this.validMove(this.position.x, this.position.y, horzDownRight.x, horzDownRight.y, state)){
            if( horzDownRight.x >-1 && horzDownRight.y >-1 && horzDownRight.x<8 && horzDownRight.y<8){
                validMoves.push(horzDownRight);  
            }
        }

        

        selected.moves = validMoves;
        return selected.moves
    }
}