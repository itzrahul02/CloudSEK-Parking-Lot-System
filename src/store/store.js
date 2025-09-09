import { configureStore } from "@reduxjs/toolkit";
import parkingReducer from "./parkingSlice";
import { loadState, saveState } from "./localStorage";

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    parking: parkingReducer,
  },
  preloadedState: persistedState,
});


store.subscribe(() => {
  saveState({
    parking: store.getState().parking,
  });
});


