import React from 'react';
import { render, screen } from '@testing-library/react';
import { Context } from '../../../../../shared/context/contextProvider.tsx';
import SearchRequest from './SearchRequest';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../../../../../shared/hooks/useLocalStorage.tsx', () => ({
  useLocalStorage: () => ['test', jest.fn()],
}));

jest.mock('../../../../../shared/hooks/useCustomSearchParams.tsx', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    searchParams: new URLSearchParams(),
    handleNameChange: jest.fn(),
  })),
}));

jest.mock('../../../../../shared/hooks/useSearch.tsx', () => ({
  useSearch: jest.fn(() => ({
    searchText: '',
    handleSetSearchTextCallback: jest.fn(),
    handleSetCharactersCallback: jest.fn(),
    handleSetPageCallback: jest.fn(),
    handleSetSelectedIdCallback: jest.fn(),
    page: {
      totalPages: 1,
      currPage: 1,
    },
  })),
}));

jest.mock('../../../../../shared/store/charactersApi.ts', () => ({
  useGetCharactersQuery: jest.fn(() => ({
    data: null,
    isFetching: false,
    error: null,
  })),
}));

describe('SearchRequest', () => {
  const setSearchText = jest.fn();
  const setIsLoading = jest.fn();
  const setCharacters = jest.fn();
  const setPage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders search input and button', () => {
    render(
      <Router>
        <Context.Provider
          value={{
            searchText: '',
            setSearchText,
            isLoading: false,
            setIsLoading,
            setCharacters,
            setPage,
          }}>
          <SearchRequest />
        </Context.Provider>
      </Router>,
    );

    expect(
      screen.getByPlaceholderText('Enter search query'),
    ).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });
});
