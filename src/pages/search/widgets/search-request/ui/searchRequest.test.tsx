import React from 'react';
import { render, screen } from '@testing-library/react';
import { Context } from '../../../../../shared/context/contextProvider.tsx';
import SearchRequest from './SearchRequest';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../../../api/helpers.ts', () => ({
  fetchData: jest.fn(),
}));

jest.mock('../../../../../shared/hooks/useLocalStorage.tsx', () => ({
  useLocalStorage: () => ['test', jest.fn()],
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
