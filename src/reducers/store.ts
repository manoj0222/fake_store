import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./rootreducer.ts";

const store = configureStore({
  reducer: rootReducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
