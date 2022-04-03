import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import countriesReducer from "./countriesData";
import chartReducer from "./dataChart";
import tabReducer from "./tabState";

export const store = configureStore({
  reducer: {
    dataChart: chartReducer,
    tabState: tabReducer,
    countriesData: countriesReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();