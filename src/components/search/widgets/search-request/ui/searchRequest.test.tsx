import React from 'react';
import { render, screen } from '@testing-library/react';
import { Context } from '../../../../../shared/context/contextProvider.tsx';
import SearchRequest from './SearchRequest';
import '@testing-library/jest-dom';

jest.mock('../../../../../shared/hooks/useCustomSearchParams.tsx', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    searchParams: new URLSearchParams(),
    handleNameChange: jest.fn(),
    handleDetailsChange: jest.fn(),
    handlePageChange: jest.fn(),
  })),
}));

jest.mock('../../../../../shared/hooks/useSearch.tsx', () => ({
  useSearch: jest.fn(() => ({
    searchText: '',
    handleSetSearchTextCallback: jest.fn(),
    handleSetCharactersCallback: jest.fn(),
    handleSetPageCallback: jest.fn(),
    handleSetSelectedIdCallback: jest.fn(),
    handleSetIsShowingDetailsCallback: jest.fn(),
    handleSetIsLoadingCallback: jest.fn(),
    handleSetCharacterDetailsCallback: jest.fn(),
    handleSetIsDetailsLoadingCallback: jest.fn(),
    page: {
      totalPages: 1,
      currPage: 1,
    },
  })),
}));

describe('SearchRequest test', () => {
  const setSearchText = jest.fn();
  const setIsLoading = jest.fn();
  const setCharacters = jest.fn();
  const setPage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders search input and button', () => {
    render(
      <Context.Provider
        value={{
          themeIsDark: true,
          searchText: '',
          setSearchText,
          isLoading: false,
          setIsLoading,
          setCharacters,
          setPage,
        }}>
        <SearchRequest />
      </Context.Provider>,
    );

    expect(
      screen.getByPlaceholderText('Enter search query'),
    ).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });
});
