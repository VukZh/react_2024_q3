import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Context } from '../../../shared/context/contextProvider.tsx';
import Search from './Search';
import '@testing-library/jest-dom';
import { configureStore } from '@reduxjs/toolkit';
import { characterDetailsApi } from '../../../shared/store/characterDetailsApi.ts';
import { setupListeners } from '@reduxjs/toolkit/query';
import { Provider } from 'react-redux';
import { charactersApi } from '../../../shared/store/charactersApi.ts';
import search from '../../../shared/store/search.ts';

const createTestStore = () => {
  const store = configureStore({
    reducer: {
      [characterDetailsApi.reducerPath]: characterDetailsApi.reducer,
      [charactersApi.reducerPath]: charactersApi.reducer,
      search,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false })
        .concat(characterDetailsApi.middleware)
        .concat(charactersApi.middleware),
  });

  setupListeners(store.dispatch);
  return store;
};
const renderWithProviders = (
  ui,
  { providerProps, ...renderOptions },
  store,
) => {
  return render(
    <Provider store={store}>
      <Context.Provider {...providerProps}>
        <MemoryRouter>{ui}</MemoryRouter>
      </Context.Provider>
    </Provider>,
    renderOptions,
  );
};

describe('Search Component test', () => {
  let store;

  beforeEach(() => {
    store = createTestStore();
  });

  const providerProps = {
    value: {
      themeIsDark: true,
      setThemeIsDark: jest.fn(),
    },
  };

  test('renders Search component', () => {
    renderWithProviders(<Search />, { providerProps }, store);

    expect(
      screen.getByPlaceholderText(/Enter search query/i),
    ).toBeInTheDocument();
    expect(screen.getByText('No results')).toBeInTheDocument();
    expect(screen.getByText('Dark')).toBeInTheDocument();
    expect(screen.getByText('Light')).toBeInTheDocument();
  });
});
