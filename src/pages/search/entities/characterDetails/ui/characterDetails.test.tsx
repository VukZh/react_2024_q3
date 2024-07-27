import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CharacterDetails from './CharacterDetails';
import '@testing-library/jest-dom';

import { RickAndMortyCharacterType } from '../../../model/types.ts';
import { getDetailsCharacter } from '../../../api/helpers.ts';
import { useSearch } from '../../../../../shared/hooks/useSearch.tsx';
import { useGetCharacterDetailsQuery } from '../../../../../shared/store/characterDetailsApi.ts';
import useCustomSearchParams from '../../../../../shared/hooks/useCustomSearchParams.tsx';

jest.mock('../../../api/helpers.ts', () => ({
  getDetailsCharacter: jest.fn(),
}));
jest.mock('../../../../../shared/loader/ui/loader.tsx', () => {
  const LoaderMock = () => <div data-testid="loader">Loading...</div>;
  LoaderMock.displayName = 'LoaderMock';
  return LoaderMock;
});
jest.mock('../../../../../shared/hooks/useSearch.tsx');
jest.mock('../../../../../shared/store/characterDetailsApi.ts');
jest.mock('../../../../../shared/hooks/useCustomSearchParams.tsx');

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
    (useSearch as jest.Mock).mockReturnValue({
      isShowingDetails: true,
      handleSetIsShowingDetailsCallback: jest.fn(),
      selectedId: 1,
      handleSetCharacterDetailsCallback: jest.fn(),
      handleSetSelectedIdCallback: jest.fn(),
    });
    (useGetCharacterDetailsQuery as jest.Mock).mockReturnValue({
      character,
      isFetching: false,
    });
    (useCustomSearchParams as jest.Mock).mockReturnValue({
      searchParams: new URLSearchParams('details=1'),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders character details when isShowingDetails is true', () => {
    render(<CharacterDetails />);

    expect(screen.queryByText(/Name: Rick Sanchez/i)).toBeInTheDocument();
    expect(screen.queryByText(/Status: Alive/i)).toBeInTheDocument();
    expect(screen.queryByText(/Species: Human/i)).toBeInTheDocument();
    expect(screen.queryByText(/Location: Earth/i)).toBeInTheDocument();
    expect(screen.getByAltText('character')).toHaveAttribute(
      'src',
      'https://example.com/rick.jpg',
    );
  });

  it('renders empty when isShowingDetails is false', () => {
    (useSearch as jest.Mock).mockReturnValue({
      isShowingDetails: false,
      handleSetIsShowingDetailsCallback: jest.fn(),
      selectedId: 1,
      handleSetCharacterDetailsCallback: jest.fn(),
      handleSetSelectedIdCallback: jest.fn(),
    });

    render(<CharacterDetails />);

    expect(screen.queryByText(/Name: Rick Sanchez/i)).not.toBeInTheDocument();
  });

  it('calls handleSetIsShowingDetailsCallback when close button is clicked', () => {
    const handleSetIsShowingDetailsCallback = jest.fn();
    (useSearch as jest.Mock).mockReturnValue({
      isShowingDetails: true,
      handleSetIsShowingDetailsCallback,
      selectedId: 1,
      handleSetCharacterDetailsCallback: jest.fn(),
      handleSetSelectedIdCallback: jest.fn(),
    });

    render(<CharacterDetails />);

    fireEvent.click(screen.getByText('Close'));

    expect(handleSetIsShowingDetailsCallback).toHaveBeenCalledWith(false);
  });

  it('renders loader when isFetching is true', () => {
    (useGetCharacterDetailsQuery as jest.Mock).mockReturnValue({
      character,
      isFetching: true,
    });

    render(<CharacterDetails />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.queryByText(/Loading.../i)).toBeInTheDocument();
  });
});
