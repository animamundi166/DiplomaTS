import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface State {
  filteredPopulationRange: number[];
  minMaxPopulationValues: number[];
}

type Number = number[];

export const populationSlice = createSlice({
  name: 'populationData',
  initialState: {
    filteredPopulationRange: [0, 2e9],
    minMaxPopulationValues: [],
  } as State,
  reducers: {
    setFilteredPopul: (state: State, action: PayloadAction<Number>) => {
      state.filteredPopulationRange = action.payload;
    },
    setMinMaxPopulationValues: (state: State, action: PayloadAction<Number>) => {
      state.minMaxPopulationValues = action.payload;
    }
  },
});

export const { setFilteredPopul, setMinMaxPopulationValues } = populationSlice.actions;
export const filteredPopulationRange = (state: RootState) => state.populationData.filteredPopulationRange;
export const minMaxPopulationValues = (state: RootState) => state.populationData.minMaxPopulationValues;
export default populationSlice.reducer;