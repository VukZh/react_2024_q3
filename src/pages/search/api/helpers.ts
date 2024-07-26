import {
  PageType,
  RickAndMortyCharacterType,
  RickAndMortyDetailsCharacter,
  RickAndMortyShortCharacter,
} from '../model/types.ts';
import { searchCharacters } from './rickAndMortyAPI.ts';

export const getShortCharacters = (
  characters: RickAndMortyCharacterType[],
): RickAndMortyShortCharacter[] => {
  return characters.map((character) => ({
    id: character.id,
    name: character.name,
    status: character.status,
    species: character.species,
  }));
};

export const getDetailsCharacter = (
  character: RickAndMortyCharacterType,
): RickAndMortyDetailsCharacter => {
  // const neededCharacter = characters.filter((character) => character.id === id);
  return character?.id
    ? {
        id: character.id,
        name: character.name,
        status: character.status,
        species: character.species,
        image: character.image,
        location: character.location,
      }
    : {
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
};

export const fetchData = async (
  searchText: string,
  setLoading: (isLoading: boolean) => void,
  setCharacters: (characters: RickAndMortyCharacterType[]) => void,
  setPage: (page: PageType) => void,
  searchPage?: number,
) => {
  setLoading(true);

  try {
    const { characters, page } = await searchCharacters(searchText, searchPage);
    setCharacters(characters);
    setPage(page);
  } catch (error) {
    console.error('Error during search:', error);
  } finally {
    setLoading(false);
  }
};

export const getCharactersToExport = (
  characters: RickAndMortyCharacterType[],
): RickAndMortyShortCharacter[] => {
  return characters.map((character) => ({
    id: character.id,
    name: character.name,
    status: character.status,
    species: character.species,
    gender: character.gender,
    created: character.created,
    image: character.image,
  }));
};
