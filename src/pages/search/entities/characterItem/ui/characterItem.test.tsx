import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import CharacterItem from './CharacterItem';
import { RickAndMortyShortCharacter } from '../../../model/types.ts';

describe('CharacterItem tests', () => {
  const character: RickAndMortyShortCharacter = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
  };

  it('renders character details correctly', () => {
    render(<CharacterItem character={character} isSelected={false} />);

    expect(screen.queryByText(/Rick Sanchez/i)).toBeInTheDocument();
    expect(screen.queryByText(/Alive/i)).toBeInTheDocument();
    expect(screen.queryByText(/Human/i)).toBeInTheDocument();
  });
});
