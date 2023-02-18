import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Piece } from "../models/Piece";

export interface CaptureState {
    capW: [Piece?];
    capB: [Piece?];
}

const initialState: CaptureState = {
    capW: [],
    capB: []
};

export const capSlice = createSlice({
    name: "captureCounter",
    initialState,
    reducers: {
        addCapPieceW: (state, action: PayloadAction<Piece>) => {
            state.capW.push(action.payload);
        },
        addCapPieceB: (state, action: PayloadAction<Piece>) => {
            state.capB.push(action.payload);
        },
        clearW: (state) => {
            
            state.capW.length=0;  
        },
        clearB: (state)=>{
            state.capB.length=0;
        }
    }
});

export const { addCapPieceW, addCapPieceB, clearW, clearB} = capSlice.actions;

export default capSlice.reducer;