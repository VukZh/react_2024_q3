import {
  RickAndMortyCharacterType,
  RickAndMortyDetailsCharacter,
  RickAndMortyShortCharacter,
} from '../model/types.ts';

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

export function parseQueryString(queryString) {
  const result = {};

  if (queryString && queryString.startsWith('?')) {
    queryString = queryString.slice(1);
  }

  if (queryString) {
    const pairs = queryString.split('&');

    for (const pair of pairs) {
      const [key, value] = pair.split('=');
      if (key) {
        result[key] = decodeURIComponent(value || '');
      }
    }
  }

  return result;
}
