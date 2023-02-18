import { Team, Type } from "../types";
import { Piece } from "./Piece";
import { Position } from "./Position";


export class Pawn extends Piece{
    constructor( team: Team, position: Position ){
        super(
            Type.PAWN,
            team,
            position,
            1,
            false
            

            
        );
    }
    


    validMove(startX: number, startY: number, endX: number, endY: number, state: Piece[]):boolean{
        const startMovePawn = this.team === Team.WHITE ? 1 : 6;
        switch (this.team) {
            case Team.WHITE:
                ///Starting and Alt Move///
                if (startX === endX && startY === startMovePawn && endY - startY === 2 * 1) {
                    if (!this.tileIsUsed(endX, endY, state) && !this.tileUsedByOpp(endX, endY, state, this.team) && !this.tileIsUsed(endX, endY - 1, state)) {

                        return true;
                    }

                }

                ///Normal Move///
                else if (startX === endX && (endY - startY === 1)) {
                    if (!this.tileIsUsed(endX, endY, state)) {

                        return true;
                    }

                }

                ///Attack Move///
                else if ((startX - endX === -1 && endY - startY === 1) || (startX - endX === 1 && endY - startY === 1)) {
                    if (this.tileIsUsed(endX, endY, state)) {
                        if (this.tileUsedByOpp(endX, endY, state, this.team)) {

                            return true;
                        }
                    }
                }
                else {

                    return false;
                }
                break;

            case Team.BLACK:
                ///Starting Move///
                if (startX === endX && startY === startMovePawn && endY - startY === 2 * -1) {
                    if (!this.tileIsUsed(endX, endY, state) && !this.tileUsedByOpp(endX, endY, state, this.team) && !this.tileIsUsed(endX, endY + 1, state)) {
                        return true;
                    }

                }

                ///Normal Move///
                else if (startX === endX && (startY - endY === 1)) {
                    if (!this.tileIsUsed(endX, endY, state)) {
                        return true;
                    }
                }

                ///Attack Move///
                else if ((startX - endX === -1 && startY - endY === 1) || (startX - endX === 1 && startY - endY === 1)) {
                    if (this.tileIsUsed(endX, endY, state)) {
                        if (this.tileUsedByOpp(endX, endY, state, this.team)) {

                            return true;
                        }
                    }
                }
                else {

                    return false;
                }
                break;

            default:
                break;
        }
        return false;
    }


    allValidMoves(selected: Piece, state: Piece[]): Position[]{
        const validMoves: Position[] = [];
        switch (selected.team) {
            case Team.WHITE:
                if (!this.tileIsUsed(this.position.x, this.position.y +1,state)){
                    validMoves.push({x:this.position.x,y: this.position.y+1});
                    if (this.position.y === 1 && (!this.tileIsUsed(this.position.x, this.position.y+2,state))) {
                        validMoves.push({x:this.position.x,y: this.position.y+2});
                    }
                }

                if(this.tileUsedByOpp(this.position.x+1, this.position.y+1,state,selected.team)){
                    validMoves.push({x:this.position.x +1, y: this.position.y+1})
                }

                if(this.tileUsedByOpp(this.position.x-1, this.position.y+1,state,selected.team)){
                    validMoves.push({x:this.position.x -1, y: this.position.y+1})
                }
                break;


            
            case Team.BLACK:
                if (!this.tileIsUsed(this.position.x, this.position.y -1,state)){
                    validMoves.push({x:this.position.x,y: this.position.y-1});
                    if (this.position.y === 6 && (!this.tileIsUsed(this.position.x, this.position.y-2,state))) {
                        validMoves.push({x:this.position.x,y: this.position.y-2});
                    }
                }

                if(this.tileUsedByOpp(this.position.x+1, this.position.y-1,state,selected.team)){
                    validMoves.push({x:this.position.x +1, y: this.position.y-1})
                }

                if(this.tileUsedByOpp(this.position.x-1, this.position.y-1,state,selected.team)){
                    validMoves.push({x:this.position.x -1, y: this.position.y-1})
                }
                break;
            default:
                break;
        }
        this.moves = validMoves
        return this.moves;
    }
}