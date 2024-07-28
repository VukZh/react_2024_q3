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

  beforeEach(() => {
    (useSearch as jest.Mock).mockReturnValue({
      page: {
        currPage: 2,
        totalPages: 5,
      },
      handleSetPageCallback,
    });
    render(<Pagination />);
  });

  it('should render the current page and total pages', () => {
    const currPageElement = screen.getByText('2');
    const totalPagesElement = screen.getByText('(totally 5)');
    expect(currPageElement).toBeInTheDocument();
    expect(totalPagesElement).toBeInTheDocument();
  });
  it('calls setPage when next page is clicked', () => {
    render(<Pagination />);

    const text3 = screen.getAllByText('3');
    fireEvent.click(text3[0]);
    expect(handleSetPageCallback).toHaveBeenCalledWith({
      currPage: 3,
      totalPages: 5,
    });
  });

  it('calls setPage when previous page is clicked', () => {
    render(<Pagination />);

    const text1 = screen.getAllByText('1');
    fireEvent.click(text1[0]);
    expect(handleSetPageCallback).toHaveBeenCalledWith({
      currPage: 1,
      totalPages: 5,
    });
  });
});
