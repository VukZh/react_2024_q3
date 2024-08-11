import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Pagination from './Pagination';
import { useSearch } from '../../../../../shared/hooks/useSearch.tsx';

jest.mock('../../../../../shared/hooks/useSearch.tsx', () => {
  return {
    useSearch: jest.fn(),
  };
});
describe('Pagination tests', () => {
  const handleSetPageCallback = jest.fn();
  const handleSetIsLoadingCallback = jest.fn();

  beforeEach(() => {
    (useSearch as jest.Mock).mockReturnValue({
      page: {
        currPage: 2,
        totalPages: 5,
      },
      handleSetPageCallback,
      handleSetIsLoadingCallback,
    });
    render(<Pagination />);
  });

  it('should render the current page and total pages', () => {
    const currPageElement = screen.getByText('2');
    const totalPagesElement = screen.getByText('(totally 5)');
    expect(currPageElement).toBeInTheDocument();
    expect(totalPagesElement).toBeInTheDocument();
  });

  it('calls setPage and setLoading when next page is clicked', () => {
    const nextPage = screen.getAllByText('3')[0];
    fireEvent.click(nextPage);

    expect(handleSetPageCallback).toHaveBeenCalledWith({
      currPage: 3,
      totalPages: 5,
    });
    expect(handleSetIsLoadingCallback).toHaveBeenCalledWith(true);
  });

  it('calls setPage and setLoading when previous page is clicked', () => {
    const prevPage = screen.getAllByText('1')[0];
    fireEvent.click(prevPage);

    expect(handleSetPageCallback).toHaveBeenCalledWith({
      currPage: 1,
      totalPages: 5,
    });
    expect(handleSetIsLoadingCallback).toHaveBeenCalledWith(true);
  });
});
