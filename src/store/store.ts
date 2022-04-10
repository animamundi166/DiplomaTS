import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import countriesReducer from "./countriesData";
import chartReducer from "./showChart";
import tabReducer from "./tabState";
import filterSlice from './filterSlice';
import populationSlice from "./populationSlice";
import descriptionSlice from "./descriptionSlice";

export const store = configureStore({
  reducer: {
    showChart: chartReducer,
    tabState: tabReducer,
    countriesData: countriesReducer,
    inputData: filterSlice,
    populationData: populationSlice,
    description: descriptionSlice,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();