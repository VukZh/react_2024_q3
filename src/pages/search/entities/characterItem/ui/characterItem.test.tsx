import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Context } from '../../../../../shared/context/contextProvider.tsx';
import { useSearch } from '../../../../../shared/hooks/useSearch.tsx';
import CharacterItem from './CharacterItem';
import { RickAndMortyShortCharacter } from '../../../model/types.ts';

jest.mock('../../../../../shared/hooks/useSearch.tsx');

describe('CharacterItem tests', () => {
  const character: RickAndMortyShortCharacter = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
  };

  beforeEach(() => {
    (useSearch as jest.Mock).mockReturnValue({
      handleSetSelectedItemsCallback: jest.fn(),
      selectedItems: [],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders character details correctly', () => {
    const mockContext = {
      themeIsDark: true,
    };

    render(
      <Context.Provider value={mockContext}>
        <CharacterItem character={character} isSelected={false} />
      </Context.Provider>,
    );

    expect(screen.queryByText(/Rick Sanchez/i)).toBeInTheDocument();
    expect(screen.queryByText(/Alive/i)).toBeInTheDocument();
    expect(screen.queryByText(/Human/i)).toBeInTheDocument();
  });

  it('calls handleSetSelectedItemsCallback when checkbox is clicked', () => {
    const handleSetSelectedItemsCallback = jest.fn();
    (useSearch as jest.Mock).mockReturnValue({
      handleSetSelectedItemsCallback,
      selectedItems: [],
    });

    const mockContext = {
      themeIsDark: true,
    };

    render(
      <Context.Provider value={mockContext}>
        <CharacterItem character={character} isSelected={false} />
      </Context.Provider>,
    );

    fireEvent.click(screen.getByRole('checkbox'));

    expect(handleSetSelectedItemsCallback).toHaveBeenCalledWith(character.id);
  });

  it('sets the checkbox as checked when character id is in selectedItems', () => {
    (useSearch as jest.Mock).mockReturnValue({
      handleSetSelectedItemsCallback: jest.fn(),
      selectedItems: [character.id],
    });

    const mockContext = {
      themeIsDark: true,
    };

    render(
      <Context.Provider value={mockContext}>
        <CharacterItem character={character} isSelected={false} />
      </Context.Provider>,
    );

    expect(screen.getByRole('checkbox')).toBeChecked();
  });
});
