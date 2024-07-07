import {
  RickAndMortyCharacter,
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
