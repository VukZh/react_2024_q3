import { RickAndMortyCharacterType } from '../model/types.ts';
import {
  fetchData,
  getDetailsCharacter,
  getShortCharacters,
} from './helpers.ts';
import { searchCharacters } from '../api/rickAndMortyAPI.ts';

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

jest.mock('../api/rickAndMortyAPI.ts', () => ({
  searchCharacters: jest.fn(),
}));

describe('fetchData tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch characters and update state when successful', async () => {
    const setLoading = jest.fn();
    const setCharacters = jest.fn();
    const setPage = jest.fn();
    const searchText = 'Rick';
    const searchPage = 1;
    const characters = [{ id: 1, name: 'Rick Sanchez' }];
    const page = { count: 1, pages: 1, next: null, prev: null };

    searchCharacters.mockResolvedValue({ characters, page });

    await fetchData(searchText, setLoading, setCharacters, setPage, searchPage);

    expect(setLoading).toHaveBeenCalledTimes(2);
    expect(setLoading).toHaveBeenCalledWith(true);
    expect(setLoading).toHaveBeenCalledWith(false);

    expect(searchCharacters).toHaveBeenCalledTimes(1);
    expect(searchCharacters).toHaveBeenCalledWith(searchText, searchPage);

    expect(setCharacters).toHaveBeenCalledTimes(1);
    expect(setCharacters).toHaveBeenCalledWith(characters);

    expect(setPage).toHaveBeenCalledTimes(1);
    expect(setPage).toHaveBeenCalledWith(page);
  });

  it('should handle error and set loading to false when an error occurs', async () => {
    const setLoading = jest.fn();
    const setCharacters = jest.fn();
    const setPage = jest.fn();
    const searchText = 'Rick';
    const searchPage = 1;
    const error = new Error('Search error');

    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    searchCharacters.mockRejectedValue(error);

    await fetchData(searchText, setLoading, setCharacters, setPage, searchPage);

    expect(setLoading).toHaveBeenCalledTimes(2);
    expect(setLoading).toHaveBeenCalledWith(true);
    expect(setLoading).toHaveBeenCalledWith(false);

    expect(searchCharacters).toHaveBeenCalledTimes(1);
    expect(searchCharacters).toHaveBeenCalledWith(searchText, searchPage);

    expect(setCharacters).not.toHaveBeenCalled();
    expect(setPage).not.toHaveBeenCalled();

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);

    expect(console.error).toHaveBeenCalledWith('Error during search:', error);
    consoleErrorSpy.mockRestore();
  });
});
