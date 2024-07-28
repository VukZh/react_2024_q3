import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { charactersApi, useGetCharactersQuery } from './charactersApi';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
const createTestStore = () => {
  const store = configureStore({
    reducer: {
      [charactersApi.reducerPath]: charactersApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(charactersApi.middleware),
  });
  setupListeners(store.dispatch);
  return store;
};

describe('characterDetailsApi test', () => {
  let store;

  beforeEach(() => {
    store = createTestStore();
  });

  it('should fetch character details', async () => {
    const { result, waitForNextUpdate } = renderHook(
      () => useGetCharactersQuery(1),
      {
        wrapper: ({ children }) => (
          <Provider store={store}>{children}</Provider>
        ),
      },
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
  });
});
