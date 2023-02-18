import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TimerState {
  timer: number;
  gameOn: boolean;
}

const initialState: TimerState = {
  timer: 0,
  gameOn: false
};

export const timerSlice = createSlice({
  name: "timerReducer",
  initialState,
  reducers: {
    
    setTimer: (state, action: PayloadAction<number>) => {
      state.timer += action.payload;
    },
    startGame: (state, action: PayloadAction<boolean>) => {
        state.gameOn = action.payload;
    },
    resetTimer: (state) => {
        state.timer = 0;
    }
  }
});


export const { setTimer, startGame, resetTimer } = timerSlice.actions;

export default timerSlice.reducer;
