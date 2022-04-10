import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface State {
  description: string;
}

type String = string;

export const descriptionSlice = createSlice({
  name: 'descriptionData',
  initialState: {
    description: '',
  } as State,
  reducers: {
    setDescription: (state: State, action: PayloadAction<String>) => {
      state.description = action.payload;
    }
  },
});

export const { setDescription } = descriptionSlice.actions;
export const description = (state: RootState) => state.description.description;
export default descriptionSlice.reducer;