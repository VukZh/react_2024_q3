import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Context } from '../../../../../shared/context/contextProvider.tsx';

import Pagination from './Pagination';

describe('Pagination tests', () => {
  const setIsLoading = jest.fn();
  const setCharacters = jest.fn();
  const setPage = jest.fn();

  beforeEach(() => {
    localStorage.setItem('MY_SEARCH', 'test');
  });

  afterEach(() => {
    localStorage.removeItem('MY_SEARCH');
    jest.clearAllMocks();
  });

  it('renders pagination correctly when currPage is 1 and totalPages is 1', () => {
    const page = { currPage: 1, totalPages: 1 };

    render(
      <Context.Provider value={{ setIsLoading, setCharacters, page, setPage }}>
        <Pagination />
      </Context.Provider>,
    );

    expect(screen.queryByText(/(totally 1)/i)).toBeInTheDocument();
  });

  it('renders pagination correctly when currPage is 1 and totalPages is greater than 1', () => {
    const page = { currPage: 1, totalPages: 3 };

    render(
      <Context.Provider value={{ setIsLoading, setCharacters, page, setPage }}>
        <Pagination />
      </Context.Provider>,
    );

    expect(screen.queryByText('(totally 3)')).toBeInTheDocument();
  });

  it('renders pagination correctly when currPage is not equal to totalPages', () => {
    const page = { currPage: 2, totalPages: 3 };

    render(
      <Context.Provider value={{ setIsLoading, setCharacters, page, setPage }}>
        <Pagination />
      </Context.Provider>,
    );

    expect(screen.queryByText(/2/i)).toBeInTheDocument();
    expect(screen.queryByText('(totally 3)')).toBeInTheDocument();
  });

  it('calls setPage when next page is clicked', () => {
    const page = { currPage: 2, totalPages: 3 };

    render(
      <Context.Provider value={{ setIsLoading, setCharacters, page, setPage }}>
        <Pagination />
      </Context.Provider>,
    );

    fireEvent.click(screen.getByText('3'));

    expect(setPage).toHaveBeenCalledWith({ currPage: 3, totalPages: 3 });
  });
});
