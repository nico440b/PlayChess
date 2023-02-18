export enum Type{
    PAWN = "pawn",
    KNIGHT = "knight",
    BISHOP = "bishop",
    ROOK = "rook",
    QUEEN = "queen",
    KING = "king"
    
  }
  
  export enum Team{
    BLACK = "b", 
    WHITE = "w"
  }

  export enum Ending{
    ONGOING = "Not Ended",
    CHECKMATE ="Checkmate",
    STALEMATE ="Stalemate",
    INSUFFICENTPIECESDRAW ="Draw - Insufficent pieces",
    DRAW ="Draw",
    FORFEIT ="Forfeit",
  }
