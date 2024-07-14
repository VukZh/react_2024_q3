import React from 'react';
import { render, screen } from '@testing-library/react';
import { Context } from '../../../../../shared/context/contextProvider.tsx';
import SearchResult from './SearchResult';
import { getShortCharacters } from '../../../api/helpers.ts';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';

describe('SearchResult', () => {
  const setSelectedId = jest.fn();
  const setIsShowingDetails = jest.fn();
  const setIsLoadingDetails = jest.fn();
  const setCharacterDetails = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders "No results" when there are no characters', () => {
    render(
      <Router>
        <Context.Provider
          value={{
            characters: [],
            setSelectedId,
            setIsShowingDetails,
            setIsLoadingDetails,
            setCharacterDetails,
            selectedId: 0,
          }}>
          <SearchResult />
        </Context.Provider>
      </Router>,
    );

    expect(screen.getByText('No results')).toBeInTheDocument();
  });

  it('renders character items when there are characters', () => {
    const characters = [
      { id: 1, name: 'Rick Sanchez' },
      { id: 2, name: 'Morty Smith' },
    ];
    getShortCharacters(characters);

    render(
      <Router>
        <Context.Provider
          value={{
            characters,
            setSelectedId,
            setIsShowingDetails,
            setIsLoadingDetails,
            setCharacterDetails,
            selectedId: 0,
          }}>
          <SearchResult />
        </Context.Provider>
      </Router>,
    );

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });
});
