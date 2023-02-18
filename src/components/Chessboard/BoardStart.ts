//import { Team, Type} from "../types";
import { Bishop } from "../../models/Bishop";
import { King } from "../../models/King";
import { Knight } from "../../models/Knight";
import { Pawn } from "../../models/Pawn";
import { Piece } from "../../models/Piece";
import { Queen } from "../../models/Queen";
import { Rook } from "../../models/Rook";
import { Team } from "../../types";


export default function Setup () {

    const boardStart: Piece[] = [];
    


        boardStart.push(new Rook(Team.WHITE, {x:0, y:0}))
        boardStart.push(new Rook(Team.WHITE, {x:7, y:0}))
        
        boardStart.push(new Rook(Team.BLACK, {x:0, y:7}))
        boardStart.push(new Rook(Team.BLACK, {x:7, y:7}))

        boardStart.push(new Knight(Team.WHITE, {x:1, y:0}))
        boardStart.push(new Knight(Team.WHITE, {x:6, y:0}))

        boardStart.push(new Knight(Team.BLACK, {x:1, y:7}))
        boardStart.push(new Knight(Team.BLACK, {x:6, y:7}))

        boardStart.push(new Bishop(Team.WHITE, {x:2, y:0}))
        boardStart.push(new Bishop(Team.WHITE, {x:5, y:0}))

        boardStart.push(new Bishop(Team.BLACK, {x:2, y:7}))
        boardStart.push(new Bishop(Team.BLACK, {x:5, y:7}))

        boardStart.push(new Queen(Team.WHITE, {x:3, y:0}))
        boardStart.push(new Queen(Team.BLACK, {x:3, y:7}))

        boardStart.push(new King(Team.WHITE, {x:4, y:0}))
        boardStart.push(new King(Team.BLACK, {x:4, y:7})) 
        
    

    for (let i = 0; i < 8; i++) {
        boardStart.push(new Pawn(Team.BLACK, {x:i, y:6}))
        
    }

    for (let i = 0; i < 8; i++) {
        boardStart.push(new Pawn(Team.WHITE, {x:i, y:1}))
        
    }


    return boardStart;
}