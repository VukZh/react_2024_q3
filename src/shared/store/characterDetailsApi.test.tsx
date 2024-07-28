import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  characterDetailsApi,
  useGetCharacterDetailsQuery,
} from './characterDetailsApi';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
const createTestStore = () => {
  const store = configureStore({
    reducer: {
      [characterDetailsApi.reducerPath]: characterDetailsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(characterDetailsApi.middleware),
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
      () => useGetCharacterDetailsQuery(1),
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
