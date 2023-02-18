import Validator from "../rules/Validator";
import { Piece } from "./Piece";

export class Board{
    pieces: Piece[];

    constructor(pieces: Piece[]){
        this.pieces = pieces
    }
    
    showMovesValidator() {
        const validator = new Validator();
        for (const p of this.pieces) {
            p.moves = validator.allValidMoves(p,this.pieces)
            
        } 
    }

    
    
}