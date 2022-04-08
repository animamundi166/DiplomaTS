import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface State {
  populationData: number[];
  filteredPopulationData: number[];
}

type Number = number[];

export const populationSlice = createSlice({
  name: 'populationData',
  initialState: {
    populationData: [],
    filteredPopulationData: [],
  } as State,
  reducers: {
    setPopul: (state: State, action: PayloadAction<Number>) => {
      state.populationData = action.payload;
    },
    setFilteredPopul: (state: State, action: PayloadAction<Number>) => {
      state.filteredPopulationData = action.payload;
    }
  },
});

export const { setPopul, setFilteredPopul } = populationSlice.actions;
export const populationData = (state: RootState) => state.populationData.populationData;
export const filteredPopulationData = (state: RootState) => state.populationData.filteredPopulationData;
export default populationSlice.reducer;