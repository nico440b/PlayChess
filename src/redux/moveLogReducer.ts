import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface MoveState {
    moveLog: [string];
    
}

const initialState: MoveState = {
    moveLog: [""]
};

export const capSlice = createSlice({
    name: "moveLogCounter",
    initialState,
    reducers: {
        addMove: (state, action: PayloadAction<string>) => {
            state.moveLog.push(action.payload+",");
        },
        clearLog: (state) => {
            state.moveLog = [""];
        }
        
    }
});

export const { addMove, clearLog} = capSlice.actions;

export default capSlice.reducer;