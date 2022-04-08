import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface State {
  inputData: string;
}

type Text = string;

export const filterSlice = createSlice({
  name: 'inputData',
  initialState: {
    inputData: '',
  } as State,
  reducers: {
    setFilter: (state: State, action: PayloadAction<Text>) => {
      state.inputData = action.payload;
    }
  },
});

export const { setFilter } = filterSlice.actions;
export const inputData = (state: RootState) => state.inputData.inputData;
export default filterSlice.reducer;