import { Team, Type } from "../types";
import { Piece } from "./Piece";
import { Position } from "./Position";

export class King extends Piece{
    constructor( team: Team, position: Position ){
        super(
            Type.KING,
            team,
            position,
            1000,
            false
            
        );
    }
    validMove( startX: number, startY: number, endX: number, endY: number, state: Piece[], isAttacked?: boolean, isDefended?: boolean):boolean{
        
        const rookWRight = state.find(r => r.position.x === 7 && r.position.y === 0 && r.type === Type.ROOK && r.team === Team.WHITE && r.hasMoved=== false)
        const rookWLeft = state.find(r => r.position.x === 0 && r.position.y === 0 && r.type === Type.ROOK && r.team === Team.WHITE && r.hasMoved=== false)

        const rookBRight = state.find(r => r.position.x === 7 && r.position.y === 7 && r.type === Type.ROOK && r.team === Team.BLACK && r.hasMoved=== false)
        const rookBLeft = state.find(r => r.position.x === 0 && r.position.y === 7 && r.type === Type.ROOK && r.team === Team.BLACK && r.hasMoved=== false)
        
        if (this.team === Team.WHITE && (rookWRight || rookWLeft)) {

            if (this.hasMoved && rookWLeft?.hasMoved && rookWRight?.hasMoved) {
                return false;
            }

            if (!this.tileIsUsed(endX, endY, state) && !this.tileIsUsed(endX - 1, endY, state) && (endX - startX === 2 && endY === 0) && rookWRight && !rookWRight?.hasMoved && !this.hasMoved) {
                rookWRight.position.x = 5;
                if(this.position.x !== 0 || this.position.y !== 4){
                    
                }
                rookWRight.hasMoved = true;
                
                return true;
            }

            if (!this.tileIsUsed(endX, endY, state) && !this.tileIsUsed(endX - 1, endY, state) && (!this.tileIsUsed(endX + 1, endY, state)) && (startX - endX === 2 && endY === 0) && rookWLeft && !rookWLeft?.hasMoved && !this.hasMoved) {
                rookWLeft.position.x = 3;
                if(this.position.x !== 0 || this.position.y !== 4){
                    
                }
                rookWLeft.hasMoved = true;
                
                
                return true;
            }
        }
        if (this.team === Team.BLACK && (rookBRight || rookBLeft)) {

            if (this.hasMoved && rookBLeft?.hasMoved && rookBRight?.hasMoved) {
                return false;
            }

            if (!this.tileIsUsed(endX, endY, state) && !this.tileIsUsed(endX - 1, endY, state) && (endX - startX === 2 && endY === 7) && rookBRight && !rookBRight?.hasMoved && !this.hasMoved) {
                rookBRight.position.x = 5;
                if(this.position.x !== 7 || this.position.y !== 4){
                    
                }
                rookBRight.hasMoved = true;
                
                
                return true;
            }

            if (!this.tileIsUsed(endX, endY, state) && !this.tileIsUsed(endX - 1, endY, state) && (!this.tileIsUsed(endX + 1, endY, state)) && (startX - endX === 2 && endY === 7) && rookBLeft && !rookBLeft?.hasMoved && !this.hasMoved) {
                rookBLeft.position.x = 3;
                if(this.position.x !== 7 || this.position.y !== 4){
                    
                }
                rookBLeft.hasMoved = true;
                
                return true;
            }


        }
        
        if ((!this.tileIsUsed(endX, endY, state) && (endX - startX === 1 || endX - startX === -1 || endY - startY === 1 || endY - startY === -1))) {
            
            
            return true;
        }
        else if ((this.tileIsUsed(endX, endY, state) && (endX - startX === 1 || endX - startX === -1 || endY - startY === 1 || endY - startY === -1)) && (this.tileUsedByOpp(endX, endY, state, this.team))) {
            
            
               
            
            
                return true;
            
            
        }
        return false
    }
    allValidMoves(selected: Piece, state: Piece[]): Position[]{
        const validMoves: Position[] = [];

        const rookWRight = state.find(r => r.position.x === 7 && r.position.y === 0 && r.type === Type.ROOK && r.team === Team.WHITE && r.hasMoved=== false)
        const rookWLeft = state.find(r => r.position.x === 0 && r.position.y === 0 && r.type === Type.ROOK && r.team === Team.WHITE && r.hasMoved=== false)

        const rookBRight = state.find(r => r.position.x === 7 && r.position.y === 7 && r.type === Type.ROOK && r.team === Team.BLACK && r.hasMoved=== false)
        const rookBLeft = state.find(r => r.position.x === 0 && r.position.y === 7 && r.type === Type.ROOK && r.team === Team.BLACK && r.hasMoved=== false)

        for (let i = 1; i < 2; i++) {
            const endPosition: Position = { x: this.position.x, y: this.position.y + i };

            if(this.validMove(this.position.x, this.position.y, endPosition.x, endPosition.y, state)){
                if( endPosition.x >-1 && endPosition.y >-1 && endPosition.x<8 && endPosition.y<8){
                    validMoves.push(endPosition);  
                }  
            } else {
                break;
            }
        }
        for (let i = 1; i < 2; i++) {
            const endPosition: Position = { x: this.position.x, y: this.position.y - i };

            if(this.validMove(this.position.x, this.position.y, endPosition.x, endPosition.y, state)){
                if( endPosition.x >-1 && endPosition.y >-1 && endPosition.x<8 && endPosition.y<8){
                    validMoves.push(endPosition);  
                }  
            }  else {
                break;
            }
        }
        for (let i = 1; i < 2; i++) {
            const endPosition: Position = { x: this.position.x + i, y: this.position.y };

            if(this.validMove(this.position.x, this.position.y, endPosition.x, endPosition.y, state)){
                if( endPosition.x >-1 && endPosition.y >-1 && endPosition.x<8 && endPosition.y<8){
                    validMoves.push(endPosition);  
                }  
            } else {
                break;
            }
        }
        for (let i = 1; i < 2; i++) {
            const endPosition: Position = { x: this.position.x - i, y: this.position.y };

            if(this.validMove(this.position.x, this.position.y, endPosition.x, endPosition.y, state)){
                if( endPosition.x >-1 && endPosition.y >-1 && endPosition.x<8 && endPosition.y<8){
                    validMoves.push(endPosition);  
                }  
            }  else {
                break;
            }
        }
        for (let i = 1; i < 2; i++) {
            const endPosition: Position = { x: this.position.x + i, y: this.position.y + i };

            if(this.validMove(this.position.x, this.position.y, endPosition.x, endPosition.y, state)){
                if( endPosition.x >-1 && endPosition.y >-1 && endPosition.x<8 && endPosition.y<8){
                    validMoves.push(endPosition);  
                }  
            } else {
                break;
            }
        }
        for (let i = 1; i < 2; i++) {
            const endPosition: Position = { x: this.position.x - i, y: this.position.y + i };

            if(this.validMove(this.position.x, this.position.y, endPosition.x, endPosition.y, state)){
                if( endPosition.x >-1 && endPosition.y >-1 && endPosition.x<8 && endPosition.y<8){
                    validMoves.push(endPosition);  
                }  
            } else {
                break;
            }
        }
        for (let i = 1; i < 2; i++) {
            const endPosition: Position = { x: this.position.x + i, y: this.position.y - i };

            if(this.validMove(this.position.x, this.position.y, endPosition.x, endPosition.y, state)){
                if( endPosition.x >-1 && endPosition.y >-1 && endPosition.x<8 && endPosition.y<8){
                    validMoves.push(endPosition);  
                }  
            } else {
                break;
            }
        }
        for (let i = 1; i < 2; i++) {
            const endPosition: Position = { x: this.position.x - i, y: this.position.y - i };

            if(this.validMove(this.position.x, this.position.y, endPosition.x, endPosition.y, state)){
                if( endPosition.x >-1 && endPosition.y >-1 && endPosition.x<8 && endPosition.y<8){
                    validMoves.push(endPosition);  
                }  
            } else {
                break;
            }
        }

        switch (selected.team) {
            case Team.WHITE:

                const endPositionRightW: Position = { x: selected.position.x + 2, y: selected.position.y };
                const endPositionLeftW: Position = { x: selected.position.x - 2, y: selected.position.y };
                
                if (selected.hasMoved) {
                    break;
                }
                if (rookWRight && !rookWRight.hasMoved) {
                    if (!this.tileIsUsed(selected.position.x + 2, selected.position.y, state) && !this.tileIsUsed(selected.position.x + 1, selected.position.y, state)) {
                        validMoves.push(endPositionRightW);
                    }
                }

                if (rookWLeft && !rookWLeft.hasMoved) {
                    if (!this.tileIsUsed(selected.position.x - 2, selected.position.y, state) && !this.tileIsUsed(selected.position.x - 1, selected.position.y, state) && !this.tileIsUsed(selected.position.x - 3, selected.position.y, state)) {
                        validMoves.push(endPositionLeftW);
                    }
                }
                break;

            case "b":
                const endPositionRightB: Position = { x: selected.position.x + 2, y: selected.position.y };
                const endPositionLeftB: Position = { x: selected.position.x - 2, y: selected.position.y };
                if (selected.hasMoved) {
                    break;
                }
                if (rookBRight && !rookBRight.hasMoved) {
                    if (!this.tileIsUsed(selected.position.x + 2, selected.position.y, state) && !this.tileIsUsed(selected.position.x + 1, selected.position.y, state)) {
                        validMoves.push(endPositionRightB);
                    }
                }

                if (rookBLeft && !rookBLeft.hasMoved) {
                    if (!this.tileIsUsed(selected.position.x - 2, selected.position.y, state) && !this.tileIsUsed(selected.position.x - 1, selected.position.y, state) && !this.tileIsUsed(selected.position.x - 3, selected.position.y, state)) {
                        validMoves.push(endPositionLeftB);
                    }
                }
                break;

            default:
                break;
        }
        selected.moves = validMoves;
        return selected.moves;
    }
    
}