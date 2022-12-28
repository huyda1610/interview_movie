import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./movieSlice";

const store = configureStore({
  reducer: {
    movieSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;