import { configureStore } from '@reduxjs/toolkit';
import search from './search.ts';

export const store = configureStore({
  reducer: {
    search,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
