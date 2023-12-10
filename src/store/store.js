import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "./homeSlice";
homeSlice;
export const store = configureStore({
  reducer: { home: homeSlice },
});
