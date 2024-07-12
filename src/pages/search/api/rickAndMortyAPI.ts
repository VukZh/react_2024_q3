import { RickAndMortyCharacter } from '../model/types.ts';

const BASE_URL = 'https://rickandmortyapi.com/api/character';

const PAGE_SIZE = 20;
export const searchCharacters = async (name: string) => {
  try {
    const response = await fetch(BASE_URL + `/?name=${name}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const characters: RickAndMortyCharacter[] = data.results;

    const currPage =
      data.info.next && data.info.prev
        ? data.info.next.split('?')[1].split('&')[0].split('=')[1] - 1
        : 1;

    const page = {
      currPage,
      totalPages: Math.ceil(data.info.count / PAGE_SIZE),
    };
    return { characters, page };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      characters: [],
      page: {
        currPage: 0,
        totalPages: 0,
      },
    };
  }
};
