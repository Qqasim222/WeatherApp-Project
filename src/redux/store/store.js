import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../reducers/weatherSlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});
