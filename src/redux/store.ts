import { configureStore } from "@reduxjs/toolkit";

import capReducer from "./capturedReducer";
import gameReducer from "./gameReducer";
import moveLogReducer from "./moveLogReducer";
import piecesReducer from "./piecesReducer";
import counterReducer from "./reducer";
import timerReducer from "./timerReducer";


const store = configureStore({
  reducer: {
    counter1: counterReducer, 
    counter2: piecesReducer,
    counter3: piecesReducer,
    counter4: capReducer,
    counter6: timerReducer,
    counter7: moveLogReducer,
    counter8: gameReducer
    
  }
});

export default store;


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
