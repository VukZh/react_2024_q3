import { configureStore } from '@reduxjs/toolkit';
import formRHFSlice from './formRHFSlice.ts';
import formUSlice from './formUSlice.ts';

export const store = configureStore({
  reducer: {
    formRHF: formRHFSlice,
    formU: formUSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
