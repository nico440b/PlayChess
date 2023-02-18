import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ending } from "../types";


export interface GameState {
    gameOver: boolean;
    gameEnd?: Ending;
    gameReset: boolean;
    gameStats?: [

    winner?: string,
    userName?: string,
    eloGain?: number,
    points?: number,
    moves?: [string],
    moveCount?: number,
    time?: number
    ];
    matchID: number;
    
}

const initialState: GameState = {
   gameOver: false, 
   gameEnd: undefined,
   gameReset: false,
   gameStats: ["",
            "",
            0,
            0,
            [""],
            0,
            0],
    matchID: 0
};

export const capSlice = createSlice({
    name: "gameCounter",
    initialState,
    reducers: {
        setGameStats: (state, action: PayloadAction<[string,string,number,number,[string],number,number]>) => {
            state.gameStats = action.payload;
        },
        setMatchID: (state, action: PayloadAction<number>) => {
            state.matchID = action.payload;
        },
        setGameOver: (state, action: PayloadAction<boolean>) =>{
            state.gameOver = action.payload;
        },
        setGameEnd: (state, action: PayloadAction<Ending>) =>{
            state.gameEnd = action.payload;
        },
        resetGame: (state, action: PayloadAction<boolean>) =>{
            state.gameReset = action.payload;
        }

    }
});

export const { setGameStats, setMatchID, setGameOver, setGameEnd, resetGame } = capSlice.actions;

export default capSlice.reducer;