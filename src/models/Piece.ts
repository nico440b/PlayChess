import { Team, Type} from "../types";
import { Position } from "./Position";


export class Piece{
    image: string;
    type: Type;
    team: Team;
    position: Position;
    moves: Position[];
    points: number;
    threatMap: Position[];
    hasMoved?: boolean;
    isChecked?: boolean;
    checkedBy?: Piece;
    isAttacked?: boolean;
    isDefended?: boolean;
    

    constructor( type: Type, team: Team, pos: Position, points: number, hasMoved: boolean ){
        this.type = type;
        this.image = `assets/images/${type}_alt_${team}.png`;
        this.team = team;
        this.position = pos;
        this.moves = [];
        this.threatMap =[];
        this.points = points;
        this.hasMoved = hasMoved;
        
        
        
    }

    

    tileIsUsed(xPos: number, yPos: number, state: Piece[]): boolean {

        const c = state.find(s => s.position.x === xPos && s.position.y === yPos);

        if (c) {
            return true;

        }
        return false;
    }


    tileUsedByOpp(xPos: number, yPos: number, state: Piece[], atkTeam: Team): boolean {
        const c = state.find(s => s.position.x === xPos && s.position.y === yPos && s.team !== atkTeam);

        if (c) {
            return true;
        }
        return false;

    }

    posCheck(p1: Position, p2: Position) {
        return p1.x === p2.x && p1.y === p2.y;
    }

    validMove(startX: number, startY: number, endX: number, endY: number, state: Piece[], isAttacked?: boolean, isDefended?: boolean):boolean{
        return false;
    }

    allValidMoves(selected: Piece, state: Piece[]): Position[]{

        return [];
    }

    findThreatMap(selected: Piece, state: Piece[]): Position[]{

        return [];
    }
}