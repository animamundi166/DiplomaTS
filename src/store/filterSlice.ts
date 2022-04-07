import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'inputData',
  initialState: {
    inputData: '',
  },
  reducers: {
    setFilter: (state, action) => {
      state.inputData = action.payload;
    }
  },
});

export const { setFilter } = filterSlice.actions;
export const inputData = (state: any) => state.inputData.inputData;
export default filterSlice.reducer;