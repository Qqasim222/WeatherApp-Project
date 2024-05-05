import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../reducers/weatherSlice";

// Create Redux store with weatherReducer
export const store = configureStore({
  reducer: {
    weather: weatherReducer, // Use weatherReducer to manage weather state
  },
});
