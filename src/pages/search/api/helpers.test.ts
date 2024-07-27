import { RickAndMortyCharacterType } from '../model/types.ts';
import { getDetailsCharacter, getShortCharacters } from './helpers.ts';

const mockCharacters: RickAndMortyCharacterType[] = [
  {
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
  },
  {
    id: 2,
    name: 'Morty Smith',
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
    image: 'https://example.com/morty.jpg',
    episode: ['https://example.com/episode/1', 'https://example.com/episode/2'],
    url: 'https://example.com/character/2',
    created: '2017-11-04T18:50:21.651Z',
  },
];

describe('getShortCharacters test', () => {
  it('should return an array of short characters', () => {
    const expectedShortCharacters = [
      {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
      },
      {
        id: 2,
        name: 'Morty Smith',
        status: 'Alive',
        species: 'Human',
      },
    ];

    const result = getShortCharacters(mockCharacters);

    expect(result).toEqual(expectedShortCharacters);
  });

  it('should return an empty array when given an empty array', () => {
    const characters: RickAndMortyCharacterType[] = [];

    const result = getShortCharacters(characters);

    expect(result).toEqual([]);
  });
});

describe('getDetailsCharacter test', () => {
  it('should return the details of a character when given a valid character', () => {
    const expectedDetails = {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      image: 'https://example.com/rick.jpg',
      location: {
        name: 'Earth',
        url: 'https://example.com/earth',
      },
    };

    const result = getDetailsCharacter(mockCharacters[0]);

    expect(result).toEqual(expectedDetails);
  });

  it('should return default values when given a character without an id', () => {
    const characterWithZeroId: RickAndMortyCharacterType = {
      id: 0,
      name: '',
      status: '',
      species: '',
      type: '',
      gender: '',
      origin: {
        name: '',
        url: '',
      },
      location: {
        name: '',
        url: '',
      },
      image: '',
      episode: [],
      url: '',
      created: '',
    };

    const expectedDetails = {
      id: 0,
      name: '',
      status: '',
      species: '',
      image: '',
      location: {
        name: '',
        url: '',
      },
    };

    const result = getDetailsCharacter(characterWithZeroId);

    expect(result).toEqual(expectedDetails);
  });
});
