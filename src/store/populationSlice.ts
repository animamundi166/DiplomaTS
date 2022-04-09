import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface State {
  filteredPopulationData: number[];
}

type Number = number[];

export const populationSlice = createSlice({
  name: 'populationData',
  initialState: {
    filteredPopulationData: [1, 2e9],
  } as State,
  reducers: {
    setFilteredPopul: (state: State, action: PayloadAction<Number>) => {
      state.filteredPopulationData = action.payload;
    }
  },
});

export const { setFilteredPopul } = populationSlice.actions;
export const filteredPopulationData = (state: RootState) => state.populationData.filteredPopulationData;
export default populationSlice.reducer;