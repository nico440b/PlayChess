



import { Team, Type,} from "../types";
import { Position } from "../models/Position";
import { Piece } from "../models/Piece";
import { PossibleMoves } from "../models/PossibleMoves";

function posCheck(p1: Position, p2: Position) {
    return p1.x === p2.x && p1.y === p2.y;
}

export default class Validator   {

    

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

    
    
    

    

    

    

    


    

    allValidMoves(selected: Piece, state: Piece[]): Position[] {

        const moves: Position[] = [];
        switch (selected.type) {
            case Type.PAWN:
                switch (selected.team) {
                    case Team.WHITE:
                        if (!this.tileIsUsed(selected.position.x, selected.position.y +1,state)){
                            moves.push({x:selected.position.x,y: selected.position.y+1});
                            if (selected.position.y === 1 && (!this.tileIsUsed(selected.position.x, selected.position.y+2,state))) {
                                moves.push({x:selected.position.x,y: selected.position.y+2});
                            }
                        }
        
                        if(this.tileUsedByOpp(selected.position.x+1, selected.position.y+1,state,selected.team)){
                            moves.push({x:selected.position.x +1, y: selected.position.y+1})
                        }
        
                        if(this.tileUsedByOpp(selected.position.x-1, selected.position.y+1,state,selected.team)){
                            moves.push({x:selected.position.x -1, y: selected.position.y+1})
                        }
                        break;


                        
                    case Team.BLACK:
                        if (!this.tileIsUsed(selected.position.x, selected.position.y -1,state)){
                            moves.push({x:selected.position.x,y: selected.position.y-1});
                            if (selected.position.y === 6 && (!this.tileIsUsed(selected.position.x, selected.position.y-2,state))) {
                                moves.push({x:selected.position.x,y: selected.position.y-2});
                            }
                        }
        
                        if(this.tileUsedByOpp(selected.position.x+1, selected.position.y-1,state,selected.team)){
                            moves.push({x:selected.position.x +1, y: selected.position.y-1})
                        }
        
                        if(this.tileUsedByOpp(selected.position.x-1, selected.position.y-1,state,selected.team)){
                            moves.push({x:selected.position.x -1, y: selected.position.y-1})
                        }
                        break;
                    default:
                        break;
                }

                break;
            case Type.KNIGHT:
                let vertUpLeft: Position = { x: selected.position.x - 1, y: selected.position.y + 2 };
                let vertUpRight: Position = { x: selected.position.x + 1, y: selected.position.y + 2 };

                let vertDownLeft: Position = { x: selected.position.x - 1, y: selected.position.y - 2 };
                let vertDownRight: Position = { x: selected.position.x + 1, y: selected.position.y - 2 };

                let horzUpLeft: Position = { x: selected.position.x - 2, y: selected.position.y + 1 };
                let horzUpRight: Position = { x: selected.position.x + 2, y: selected.position.y + 1 };

                let horzDownLeft: Position = { x: selected.position.x - 2, y: selected.position.y - 1 };
                let horzDownRight: Position = { x: selected.position.x + 2, y: selected.position.y - 1 };

                ///Vertical Move///
                if (!this.tileIsUsed(vertUpLeft.x, vertUpLeft.y, state)) {
                    moves.push({ x: vertUpLeft.x, y: vertUpLeft.y });
                } else if (this.tileUsedByOpp(vertUpLeft.x, vertUpLeft.y, state, selected.team)) {
                    moves.push({ x: vertUpLeft.x, y: vertUpLeft.y });
                }

                if (!this.tileIsUsed(vertUpRight.x, vertUpRight.y, state)) {
                    moves.push({ x: vertUpRight.x, y: vertUpRight.y });
                } else if (this.tileUsedByOpp(vertUpRight.x, vertUpRight.y, state, selected.team)) {
                    moves.push({ x: vertUpRight.x, y: vertUpRight.y });
                }

                if (!this.tileIsUsed(vertDownLeft.x, vertDownLeft.y, state)) {
                    moves.push({ x: vertDownLeft.x, y: vertDownLeft.y });
                } else if (this.tileUsedByOpp(vertDownLeft.x, vertDownLeft.y, state, selected.team)) {
                    moves.push({ x: vertDownLeft.x, y: vertDownLeft.y });
                }

                if (!this.tileIsUsed(vertDownRight.x, vertDownRight.y, state)) {
                    moves.push({ x: vertDownRight.x, y: vertDownRight.y });
                } else if (this.tileUsedByOpp(vertDownRight.x, vertDownRight.y, state, selected.team)) {
                    moves.push({ x: vertDownRight.x, y: vertDownRight.y });
                }

                ///Horizontal Move///
                if (!this.tileIsUsed(horzUpLeft.x, horzUpLeft.y, state)) {
                    moves.push({ x: horzUpLeft.x, y: horzUpLeft.y });
                } else if (this.tileUsedByOpp(horzUpLeft.x, horzUpLeft.y, state, selected.team)) {
                    moves.push({ x: horzUpLeft.x, y: horzUpLeft.y });
                }

                if (!this.tileIsUsed(horzUpRight.x, horzUpRight.y, state)) {
                    moves.push({ x: horzUpRight.x, y: horzUpRight.y });
                } else if (this.tileUsedByOpp(horzUpRight.x, horzUpRight.y, state, selected.team)) {
                    moves.push({ x: horzUpRight.x, y: horzUpRight.y });
                }

                if (!this.tileIsUsed(horzDownLeft.x, horzDownLeft.y, state)) {
                    moves.push({ x: horzDownLeft.x, y: horzDownLeft.y });
                } else if (this.tileUsedByOpp(horzDownLeft.x, horzDownLeft.y, state, selected.team)) {
                    moves.push({ x: horzDownLeft.x, y: horzDownLeft.y });
                }

                if (!this.tileIsUsed(horzDownRight.x, horzDownRight.y, state)) {
                    moves.push({ x: horzDownRight.x, y: horzDownRight.y });
                } else if (this.tileUsedByOpp(horzDownRight.x, horzDownRight.y, state, selected.team)) {
                    moves.push({ x: horzDownRight.x, y: horzDownRight.y });
                }

                break;
            case Type.BISHOP:
                for (let i = 1; i < 8; i++) {
                    const endPosition: Position = { x: selected.position.x + i, y: selected.position.y + i };

                    if (this.tileUsedByOpp(endPosition.x, endPosition.y, state, selected.team)) {
                        moves.push(endPosition);
                        

                        break;

                    } else if (!this.tileIsUsed(endPosition.x, endPosition.y, state)) {
                        moves.push(endPosition)

                    } else {
                        break;
                    }
                }
                for (let i = 1; i < 8; i++) {
                    const endPosition: Position = { x: selected.position.x - i, y: selected.position.y + i };

                    if (this.tileUsedByOpp(endPosition.x, endPosition.y, state, selected.team)) {
                        moves.push(endPosition);
                        break;

                    } else if (!this.tileIsUsed(endPosition.x, endPosition.y, state)) {
                        moves.push(endPosition)

                    } else {
                        break;
                    }
                }
                for (let i = 1; i < 8; i++) {
                    const endPosition: Position = { x: selected.position.x + i, y: selected.position.y - i };

                    if (this.tileUsedByOpp(endPosition.x, endPosition.y, state, selected.team)) {
                        moves.push(endPosition);
                        break;

                    } else if (!this.tileIsUsed(endPosition.x, endPosition.y, state)) {
                        moves.push(endPosition)

                    } else {
                        break;
                    }
                }
                for (let i = 1; i < 8; i++) {
                    const endPosition: Position = { x: selected.position.x - i, y: selected.position.y - i };

                    if (this.tileUsedByOpp(endPosition.x, endPosition.y, state, selected.team)) {
                        moves.push(endPosition);
                        break;

                    } else if (!this.tileIsUsed(endPosition.x, endPosition.y, state)) {
                        moves.push(endPosition)

                    } else {
                        break;
                    }
                }
                break;
            case Type.ROOK:
                for (let i = 1; i < 8; i++) {
                    const endPosition: Position = { x: selected.position.x, y: selected.position.y + i };

                    if (this.tileUsedByOpp(endPosition.x, endPosition.y, state, selected.team)) {
                        moves.push(endPosition);
                        break;

                    } else if (!this.tileIsUsed(endPosition.x, endPosition.y, state)) {
                        moves.push(endPosition)

                    } else {
                        break;
                    }
                }
                for (let i = 1; i < 8; i++) {
                    const endPosition: Position = { x: selected.position.x, y: selected.position.y - i };

                    if (this.tileUsedByOpp(endPosition.x, endPosition.y, state, selected.team)) {
                        moves.push(endPosition);
                        break;

                    } else if (!this.tileIsUsed(endPosition.x, endPosition.y, state)) {
                        moves.push(endPosition)

                    } else {
                        break;
                    }
                }
                for (let i = 1; i < 8; i++) {
                    const endPosition: Position = { x: selected.position.x + i, y: selected.position.y };

                    if (this.tileUsedByOpp(endPosition.x, endPosition.y, state, selected.team)) {
                        moves.push(endPosition);
                        break;

                    } else if (!this.tileIsUsed(endPosition.x, endPosition.y, state)) {
                        moves.push(endPosition)

                    } else {
                        break;
                    }
                }
                for (let i = 1; i < 8; i++) {
                    const endPosition: Position = { x: selected.position.x - i, y: selected.position.y };

                    if (this.tileUsedByOpp(endPosition.x, endPosition.y, state, selected.team)) {
                        moves.push(endPosition);
                        break;

                    } else if (!this.tileIsUsed(endPosition.x, endPosition.y, state)) {
                        moves.push(endPosition)

                    } else {
                        break;
                    }
                }
                break;
            case Type.QUEEN:
                for (let i = 1; i < 8; i++) {
                    const endPosition: Position = { x: selected.position.x, y: selected.position.y + i };

                    if (this.tileUsedByOpp(endPosition.x, endPosition.y, state, selected.team)) {
                        moves.push(endPosition);
                        break;

                    } else if (!this.tileIsUsed(endPosition.x, endPosition.y, state)) {
                        moves.push(endPosition)

                    } else {
                        break;
                    }
                }
                for (let i = 1; i < 8; i++) {
                    const endPosition: Position = { x: selected.position.x, y: selected.position.y - i };

                    if (this.tileUsedByOpp(endPosition.x, endPosition.y, state, selected.team)) {
                        moves.push(endPosition);
                        break;

                    } else if (!this.tileIsUsed(endPosition.x, endPosition.y, state)) {
                        moves.push(endPosition)

                    } else {
                        break;
                    }
                }
                for (let i = 1; i < 8; i++) {
                    const endPosition: Position = { x: selected.position.x + i, y: selected.position.y };

                    if (this.tileUsedByOpp(endPosition.x, endPosition.y, state, selected.team)) {
                        moves.push(endPosition);
                        break;

                    } else if (!this.tileIsUsed(endPosition.x, endPosition.y, state)) {
                        moves.push(endPosition)

                    } else {
                        break;
                    }
                }
                for (let i = 1; i < 8; i++) {
                    const endPosition: Position = { x: selected.position.x - i, y: selected.position.y };

                    if (this.tileUsedByOpp(endPosition.x, endPosition.y, state, selected.team)) {
                        moves.push(endPosition);
                        break;

                    } else if (!this.tileIsUsed(endPosition.x, endPosition.y, state)) {
                        moves.push(endPosition)

                    } else {
                        break;
                    }
                }
                for (let i = 1; i < 8; i++) {
                    const endPosition: Position = { x: selected.position.x + i, y: selected.position.y + i };

                    if (this.tileUsedByOpp(endPosition.x, endPosition.y, state, selected.team)) {
                        moves.push(endPosition);
                        

                        break;

                    } else if (!this.tileIsUsed(endPosition.x, endPosition.y, state)) {
                        moves.push(endPosition)

                    } else {
                        break;
                    }
                }
                for (let i = 1; i < 8; i++) {
                    const endPosition: Position = { x: selected.position.x - i, y: selected.position.y + i };

                    if (this.tileUsedByOpp(endPosition.x, endPosition.y, state, selected.team)) {
                        moves.push(endPosition);
                        break;

                    } else if (!this.tileIsUsed(endPosition.x, endPosition.y, state)) {
                        moves.push(endPosition)

                    } else {
                        break;
                    }
                }
                for (let i = 1; i < 8; i++) {
                    const endPosition: Position = { x: selected.position.x + i, y: selected.position.y - i };

                    if (this.tileUsedByOpp(endPosition.x, endPosition.y, state, selected.team)) {
                        moves.push(endPosition);
                        break;

                    } else if (!this.tileIsUsed(endPosition.x, endPosition.y, state)) {
                        moves.push(endPosition)

                    } else {
                        break;
                    }
                }
                for (let i = 1; i < 8; i++) {
                    const endPosition: Position = { x: selected.position.x - i, y: selected.position.y - i };

                    if (this.tileUsedByOpp(endPosition.x, endPosition.y, state, selected.team)) {
                        moves.push(endPosition);
                        break;

                    } else if (!this.tileIsUsed(endPosition.x, endPosition.y, state)) {
                        moves.push(endPosition)

                    } else {
                        break;
                    }
                }

                break;
            case Type.KING:
                
                const kingWhite = state.find(k => k.type === Type.KING && k.team === Team.WHITE)
                const rookWRight = state.find(r => r.position.x === 7  && r.type === Type.ROOK && r.team === Team.WHITE)
                const rookWLeft = state.find(r => r.position.x === 0  && r.type === Type.ROOK && r.team === Team.WHITE)
                const kingBlack = state.find(k => k.type === Type.KING && k.team === Team.WHITE)
                const rookBRight = state.find(r => r.position.x === 7  && r.type === Type.ROOK && r.team === Team.BLACK)
                const rookBLeft = state.find(r => r.position.x === 0 && r.type === Type.ROOK && r.team === Team.BLACK)

                for (let i = 1; i < 2; i++) {
                    const endPosition: Position = { x: selected.position.x, y: selected.position.y + i };

                    if (this.tileUsedByOpp(endPosition.x, endPosition.y, state, selected.team)) {
                        moves.push(endPosition);
                        break;

                    } else if (!this.tileIsUsed(endPosition.x, endPosition.y, state)) {
                        moves.push(endPosition)

                    } else {
                        break;
                    }
                }
                for (let i = 1; i < 2; i++) {
                    const endPosition: Position = { x: selected.position.x, y: selected.position.y - i };

                    if (this.tileUsedByOpp(endPosition.x, endPosition.y, state, selected.team)) {
                        moves.push(endPosition);
                        break;

                    } else if (!this.tileIsUsed(endPosition.x, endPosition.y, state)) {
                        moves.push(endPosition)

                    } else {
                        break;
                    }
                }
                for (let i = 1; i < 2; i++) {
                    const endPosition: Position = { x: selected.position.x + i, y: selected.position.y };

                    if (this.tileUsedByOpp(endPosition.x, endPosition.y, state, selected.team)) {
                        moves.push(endPosition);
                        break;

                    } else if (!this.tileIsUsed(endPosition.x, endPosition.y, state)) {
                        moves.push(endPosition)

                    } else {
                        break;
                    }
                }
                for (let i = 1; i < 2; i++) {
                    const endPosition: Position = { x: selected.position.x - i, y: selected.position.y };

                    if (this.tileUsedByOpp(endPosition.x, endPosition.y, state, selected.team)) {
                        moves.push(endPosition);
                        break;

                    } else if (!this.tileIsUsed(endPosition.x, endPosition.y, state)) {
                        moves.push(endPosition)

                    } else {
                        break;
                    }
                }
                for (let i = 1; i < 2; i++) {
                    const endPosition: Position = { x: selected.position.x + i, y: selected.position.y + i };

                    if (this.tileUsedByOpp(endPosition.x, endPosition.y, state, selected.team)) {
                        moves.push(endPosition);
                        break;

                    } else if (!this.tileIsUsed(endPosition.x, endPosition.y, state)) {
                        moves.push(endPosition)

                    } else {
                        break;
                    }
                }
                for (let i = 1; i < 2; i++) {
                    const endPosition: Position = { x: selected.position.x - i, y: selected.position.y + i };

                    if (this.tileUsedByOpp(endPosition.x, endPosition.y, state, selected.team)) {
                        moves.push(endPosition);
                        break;

                    } else if (!this.tileIsUsed(endPosition.x, endPosition.y, state)) {
                        moves.push(endPosition)

                    } else {
                        break;
                    }
                }
                for (let i = 1; i < 2; i++) {
                    const endPosition: Position = { x: selected.position.x + i, y: selected.position.y - i };

                    if (this.tileUsedByOpp(endPosition.x, endPosition.y, state, selected.team)) {
                        moves.push(endPosition);
                        break;

                    } else if (!this.tileIsUsed(endPosition.x, endPosition.y, state)) {
                        moves.push(endPosition)

                    } else {
                        break;
                    }
                }
                for (let i = 1; i < 2; i++) {
                    const endPosition: Position = { x: selected.position.x - i, y: selected.position.y - i };

                    if (this.tileUsedByOpp(endPosition.x, endPosition.y, state, selected.team)) {
                        moves.push(endPosition);
                        break;

                    } else if (!this.tileIsUsed(endPosition.x, endPosition.y, state)) {
                        moves.push(endPosition)

                    } else {
                        break;
                    }
                }

                switch (selected.team) {
                    case Team.WHITE:
                        const endPositionRightW: Position = { x: selected.position.x + 2, y: selected.position.y };
                        const endPositionLeftW: Position = { x: selected.position.x - 2, y: selected.position.y };
                        if (kingWhite?.hasMoved) {
                            break;
                        }
                        if (rookWRight && !rookWRight.hasMoved) {
                            if (!this.tileIsUsed(selected.position.x + 2, selected.position.y, state) && !this.tileIsUsed(selected.position.x + 1, selected.position.y, state)) {
                                moves.push(endPositionRightW);
                            }
                        }

                        if (rookWLeft && !rookWLeft.hasMoved) {
                            if (!this.tileIsUsed(selected.position.x - 2, selected.position.y, state) && !this.tileIsUsed(selected.position.x - 1, selected.position.y, state) && !this.tileIsUsed(selected.position.x - 3, selected.position.y, state)) {
                                moves.push(endPositionLeftW);
                            }
                        }
                        break;

                    case Team.BLACK:
                        const endPositionRightB: Position = { x: selected.position.x + 2, y: selected.position.y };
                        const endPositionLeftB: Position = { x: selected.position.x - 2, y: selected.position.y };
                        if (kingBlack?.hasMoved) {
                            break;
                        }
                        if (rookBRight && !rookBRight.hasMoved) {
                            if (!this.tileIsUsed(selected.position.x + 2, selected.position.y, state) && !this.tileIsUsed(selected.position.x + 1, selected.position.y, state)) {
                                moves.push(endPositionRightB);
                            }
                        }

                        if (rookBLeft && !rookBLeft.hasMoved) {
                            if (!this.tileIsUsed(selected.position.x - 2, selected.position.y, state) && !this.tileIsUsed(selected.position.x - 1, selected.position.y, state) && !this.tileIsUsed(selected.position.x - 3, selected.position.y, state)) {
                                moves.push(endPositionLeftB);
                            }
                        }
                        break;

                    default:
                        break;
                }


                break;
            default:
                break;
        }



        return moves;
    }


}