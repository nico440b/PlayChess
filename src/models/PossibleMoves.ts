import { Team, Type} from "../types";
import { Position } from "./Position";

export class PossibleMoves{
    
    type: Type;
    team: Team;
    moves: Position[];
    
    

    constructor( type: Type, team: Team, moves: Position[]){
        this.type = type;
        
        this.team = team;
        
        this.moves = moves;
        
        
    }

    

    
}