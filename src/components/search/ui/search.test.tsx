import { render, screen } from '@testing-library/react';
import { Context } from '../../../shared/context/contextProvider.tsx';
import Search from './Search';
import '@testing-library/jest-dom';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { Provider } from 'react-redux';
import search from '../../../shared/store/search.ts';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const { useRouter } = require('next/router');
useRouter.mockImplementation(() => ({
  route: '/',
  pathname: '/',
  query: {},
  asPath: '/',
  replace: jest.fn(),
  push: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  beforePopState: jest.fn(),
  isFallback: false,
}));

jest.mock('../../../shared/hooks/useCustomSearchParams.tsx', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const useCustomSearchParams =
  require('../../../shared/hooks/useCustomSearchParams.tsx').default;

useCustomSearchParams.mockImplementation(() => ({
  searchParams: {
    get: jest.fn().mockReturnValue(''),
  },
  handleNameChange: jest.fn(),
  handleDetailsChange: jest.fn(),
  handlePageChange: jest.fn(),
}));

const createTestStore = () => {
  const store = configureStore({
    reducer: {
      search,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
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
      <Context.Provider {...providerProps}>{ui}</Context.Provider>
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
    renderWithProviders(
      <Search characters={[]} page={{}} details={null} />,
      { providerProps },
      store,
    );

    expect(
      screen.getByPlaceholderText(/Enter search query/i),
    ).toBeInTheDocument();
    expect(screen.getByText('No results')).toBeInTheDocument();
    expect(screen.getByText('Dark')).toBeInTheDocument();
    expect(screen.getByText('Light')).toBeInTheDocument();
  });
});
