import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  count: number;
}

const initialState: CounterState = {
  count: 1
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state): void => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    },
    clearTurns: (state) =>{
      state.count = 1;
    }
  }
});


export const { increment, decrement, incrementByAmount, clearTurns } = counterSlice.actions;

export default counterSlice.reducer;
