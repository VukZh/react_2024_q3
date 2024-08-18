import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HistoryFormDataType } from '../types/types.ts';

type HistorySliceType = {
  history: HistoryFormDataType[];
};

const initialState: HistorySliceType = {
  history: [],
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addHistory: (state, action: PayloadAction<HistoryFormDataType>) => {
      state.history.push(action.payload);
    },
    resetHistory: (state) => {
      state.history = [];
    },
  },
});

export const { addHistory, resetHistory } = historySlice.actions;

export default historySlice.reducer;
