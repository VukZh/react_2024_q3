import { configureStore } from '@reduxjs/toolkit';
import formRHFSlice from './formRHFSlice.ts';
import formUSlice from './formUSlice.ts';
import historySlice from './historySlice.ts';

export const store = configureStore({
  reducer: {
    formRHF: formRHFSlice,
    formU: formUSlice,
    history: historySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
