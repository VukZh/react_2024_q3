import {
  RickAndMortyCharacter,
  RickAndMortyDetailsCharacter,
  RickAndMortyShortCharacter,
} from '../model/types.ts';
import { searchCharacters } from './rickAndMortyAPI.ts';

export const getShortCharacters = (
  characters: RickAndMortyCharacter[],
): RickAndMortyShortCharacter[] => {
  return characters.map((character) => ({
    id: character.id,
    name: character.name,
    status: character.status,
    species: character.species,
  }));
};

export const getDetailsCharacter = (
  characters: RickAndMortyCharacter[],
  id: number,
): RickAndMortyDetailsCharacter | null => {
  console.log(characters, id);
  const neededCharacter = characters.filter((character) => character.id === id);
  return neededCharacter.length
    ? {
        id: neededCharacter[0].id,
        name: neededCharacter[0].name,
        status: neededCharacter[0].status,
        species: neededCharacter[0].species,
        image: neededCharacter[0].image,
        location: neededCharacter[0].location,
      }
    : null;
};

export const fetchData = async (
  searchText: string,
  setLoading: (isLoading: boolean) => void,
  setCharacters: (characters: RickAndMortyCharacter[]) => void,
) => {
  setLoading(true);
  try {
    const data = await searchCharacters(searchText);
    setCharacters(data);
  } catch (error) {
    console.error('Error during search:', error);
  } finally {
    setLoading(false);
  }
};
