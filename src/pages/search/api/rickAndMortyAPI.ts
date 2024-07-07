import { RickAndMortyCharacter } from '../model/types.ts';

const BASE_URL = 'https://rickandmortyapi.com/api/character';

export const searchCharacters = async (name: string) => {
  try {
    const response = await fetch(BASE_URL + `/?name=${name}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const characters: RickAndMortyCharacter[] = data.results;
    return characters;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
