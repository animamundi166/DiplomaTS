import { createAction, createReducer } from "@reduxjs/toolkit";

export const isChartTrue = createAction('isChartTrue');
export const isChartFalse = createAction('isChartFalse');

interface IIsChartState {
  isChart: boolean
}

const initialState: IIsChartState = {
  isChart: false,
};

const chartReducer = createReducer(initialState, (builder) => {

  builder.addCase(isChartTrue, (state) => {
    state.isChart = true;
  });
  builder.addCase(isChartFalse, (state) => {
    state.isChart = false;
  });
});

export default chartReducer;
