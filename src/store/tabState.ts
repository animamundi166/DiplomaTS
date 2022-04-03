import { createAction, createReducer } from "@reduxjs/toolkit";

export const activeClass1 = createAction('activeClass1');
export const activeClass2 = createAction('activeClass2');

interface IActiveClassState {
  activeClass: number
}

const initialState: IActiveClassState = {
  activeClass: 1,
};

const tabReducer = createReducer(initialState, (builder) => {

  builder.addCase(activeClass1, (state) => {
    state.activeClass = 1;
  });
  builder.addCase(activeClass2, (state) => {
    state.activeClass = 2;
  });
});

export default tabReducer;
