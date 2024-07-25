import { RickAndMortyCharacterType } from '../model/types.ts';

const BASE_URL = 'https://rickandmortyapi.com/api/character';

const PAGE_SIZE = 20;
export const searchCharacters = async (name: string, queryPage = 0) => {
  try {
    const query = queryPage
      ? `/?page=${queryPage}&name=${name}`
      : `/?name=${name}`;
    const response = await fetch(BASE_URL + query);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const characters: RickAndMortyCharacterType[] = data.results;

    const totalPages = Math.ceil(data.info.count / PAGE_SIZE);

    const currPage =
      data.info.next && data.info.prev
        ? data.info.next.split('?')[1].split('&')[0].split('=')[1] - 1
        : !data.info.next && totalPages > 1
          ? totalPages
          : 1;

    const page = {
      currPage,
      totalPages,
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

export const getDetailsCharacter = async (id: number) => {
  try {
    const response = await fetch(BASE_URL + `/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const character: RickAndMortyCharacterType = await response.json();
    return character;
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
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
  }
};
