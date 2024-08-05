import React from 'react';
import { render, screen } from '@testing-library/react';
import { useSearch } from '../../../../../shared/hooks/useSearch.tsx';
import SearchResult from './SearchResult';
import '@testing-library/jest-dom';

jest.mock('../../../../../shared/hooks/useSearch.tsx');

describe('SearchResult', () => {
  const changeSelectedId = jest.fn();
  const changeIsShowingDetails = jest.fn();
  const changeIsLoadingDetails = jest.fn();
  const handleSetCharacterDetailsCallback = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useSearch.mockReturnValue({
      characters: [],
      handleSetSelectedIdCallback: changeSelectedId,
      handleSetIsShowingDetailsCallback: changeIsShowingDetails,
      handleSetIsLoadingDetailsCallback: changeIsLoadingDetails,
      handleSetCharacterDetailsCallback,
      selectedId: 0,
    });
  });

  it('renders "No results" when there are no characters', () => {
    render(<SearchResult />);

    expect(screen.getByText('No results')).toBeInTheDocument();
  });

  it('renders character items when there are characters', () => {
    const characters = [
      { id: 1, name: 'Rick Sanchez' },
      { id: 2, name: 'Morty Smith' },
    ];
    useSearch.mockReturnValue({
      characters,
      handleSetSelectedIdCallback: changeSelectedId,
      handleSetIsShowingDetailsCallback: changeIsShowingDetails,
      handleSetIsLoadingDetailsCallback: changeIsLoadingDetails,
      handleSetCharacterDetailsCallback,
      selectedId: 0,
      selectedItems: [],
    });

    render(<SearchResult />);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });
});
