import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface PiecesState {
    pCountW: number;
    pCountB: number;
}

const initialState: PiecesState = {
    pCountW: 0,
    pCountB: 0,
    
};

export const piecesSlice = createSlice({
    name: "piecesCounter",
    initialState,
    reducers: {

        incrementByAmountW: (state, action: PayloadAction<number>) => {
            state.pCountW += action.payload;
        },
        decrementByAmountW: (state, action: PayloadAction<number>) => {
            state.pCountW += action.payload;
        },

        incrementByAmountB: (state, action: PayloadAction<number>) => {
            state.pCountB += action.payload;
        },
        decrementByAmountB: (state, action: PayloadAction<number>) => {
            state.pCountB += action.payload;
        },
        clearPoints: (state)=>{
            state.pCountB = 0;
            state.pCountW = 0;
        }
    }
});


export const { decrementByAmountW, incrementByAmountW, decrementByAmountB, incrementByAmountB, clearPoints } = piecesSlice.actions;

export default piecesSlice.reducer;
