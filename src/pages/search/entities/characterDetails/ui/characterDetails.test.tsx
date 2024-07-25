import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CharacterDetails from './CharacterDetails';
import '@testing-library/jest-dom';

import { RickAndMortyCharacterType } from '../../../model/types.ts';
import { getDetailsCharacter } from '../../../api/helpers.ts';

import {
  Context,
  ContextType,
} from '../../../../../shared/context/contextProvider';

jest.mock('../../../api/helpers.ts', () => ({
  getDetailsCharacter: jest.fn(),
}));
jest.mock('../../../../../shared/loader/ui/loader.tsx', () => {
  const LoaderMock = () => <div data-testid="loader">Loading...</div>;
  LoaderMock.displayName = 'LoaderMock';
  return LoaderMock;
});

describe('CharacterDetails tests', () => {
  const character: RickAndMortyCharacterType = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {
      name: 'Earth',
      url: 'https://example.com/earth',
    },
    location: {
      name: 'Earth',
      url: 'https://example.com/earth',
    },
    image: 'https://example.com/rick.jpg',
    episode: ['https://example.com/episode/1', 'https://example.com/episode/2'],
    url: 'https://example.com/character/1',
    created: '2017-11-04T18:48:46.250Z',
  };

  beforeEach(() => {
    (getDetailsCharacter as jest.Mock).mockReturnValue(character);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders character details when isShowingDetails is true', () => {
    const mockContext = {
      characterDetails: character,
      isShowingDetails: true,
      setIsShowingDetails: jest.fn(),
      isLoadingDetails: false,
    };

    render(
      <Context.Provider value={mockContext}>
        <CharacterDetails />
      </Context.Provider>,
    );

    expect(screen.queryByText(/Name: Rick Sanchez/i)).toBeInTheDocument();
    expect(screen.queryByText(/Status: Alive/i)).toBeInTheDocument();
    expect(screen.queryByText(/Species: Human/i)).toBeInTheDocument();
    expect(screen.queryByText(/Location: Earth/i)).toBeInTheDocument();
    // expect(screen.getByAltText('character')).toHaveAttribute('src', 'https://example.com/rick.jpg');
  });

  it('renders empty when isShowingDetails is false', () => {
    const mockContext: Pick<
      ContextType,
      | 'characterDetails'
      | 'isShowingDetails'
      | 'setIsShowingDetails'
      | 'isLoadingDetails'
    > = {
      characterDetails: character,
      isShowingDetails: false,
      setIsShowingDetails: jest.fn(),
      isLoadingDetails: false,
    };

    render(
      <Context.Provider value={mockContext}>
        <CharacterDetails />
      </Context.Provider>,
    );

    expect(screen.queryByText(/Name: Rick Sanchez/i)).not.toBeInTheDocument();
  });

  it('calls setIsShowingDetails when close button is clicked', () => {
    const setIsShowingDetails = jest.fn();
    const mockContext: Pick<
      ContextType,
      | 'characterDetails'
      | 'isShowingDetails'
      | 'setIsShowingDetails'
      | 'isLoadingDetails'
    > = {
      characterDetails: character,
      isShowingDetails: true,
      setIsShowingDetails,
      isLoadingDetails: false,
    };

    render(
      <Context.Provider value={mockContext}>
        <CharacterDetails />
      </Context.Provider>,
    );

    fireEvent.click(screen.getByText('Close'));

    expect(setIsShowingDetails).toHaveBeenCalledWith(false);
  });

  it('renders loader when isLoadingDetails is true', () => {
    const mockContext = {
      characterDetails: character,
      isShowingDetails: true,
      setIsShowingDetails: jest.fn(),
      isLoadingDetails: true,
    };

    render(
      <Context.Provider value={mockContext}>
        <CharacterDetails />
      </Context.Provider>,
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.queryByText(/Loading.../i)).toBeInTheDocument();
  });
});
