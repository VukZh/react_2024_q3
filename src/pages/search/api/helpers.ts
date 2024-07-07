import {
  RickAndMortyCharacter,
  RickAndMortyShortCharacter,
} from '../model/types.ts';

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
