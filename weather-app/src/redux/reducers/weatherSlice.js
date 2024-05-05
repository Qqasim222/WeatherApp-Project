import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  async (place, { rejectWithValue }) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${place.lat}&lon=${place.lng}&appid=${apiKey}`;

    try {
      const response = await fetch(currentWeatherUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log("data === ", data)
      return data;
    } catch (error) {
      // Instead of returning just the error message, return the entire error object
      return rejectWithValue(error);
    }
  }
);

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: JSON.parse(localStorage.getItem("weatherData")) || {}, // Load data from localStorage
    place: "lahore",
    loading: false,
    error: null,
  },
  reducers: {
    setPlace: (state, action) => {
      state.place = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
        localStorage.setItem("weatherData", JSON.stringify(action.payload)); // Save data to localStorage
      })
      .addCase(fetchWeatherData.rejected, (state) => {
        state.loading = false;
        state.error = true; // Set error to true
      
        // Reset other states
        state.data =  JSON.parse(localStorage.getItem("weatherData")) || {}
        state.place = "lahore"; // Assuming "lahore" is the default place
      })
      
      
  },
});

export const { setPlace, setData } = weatherSlice.actions;

export default weatherSlice.reducer;
