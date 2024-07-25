import { configureStore } from '@reduxjs/toolkit';
import { characterDetailsApi } from './characterDetailsApi.ts';
import { charactersApi } from './charactersApi.ts';
import search from "./search.ts";

export const store = configureStore({
  reducer: {
    [characterDetailsApi.reducerPath]: characterDetailsApi.reducer,
    [charactersApi.reducerPath]: charactersApi.reducer,
    search
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(characterDetailsApi.middleware)
      .concat(charactersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
