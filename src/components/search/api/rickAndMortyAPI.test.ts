import { fetchCharacters, getDetailsCharacter } from './rickAndMortyAPI';

global.fetch = jest.fn();

describe('fetchCharacters test', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('should return characters and page', async () => {
    const mockResponse = {
      info: {
        count: 40,
        pages: 2,
        next: 'https://rickandmortyapi.com/api/character?page=2&name=rick',
        prev: null,
      },
      results: [
        { id: 1, name: 'Rick' },
        { id: 2, name: 'Morty' },
      ],
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await fetchCharacters('rick');
    expect(result.characters.length).toBe(2);
    expect(result.page.currPage).toBe(1);
    expect(result.page.totalPages).toBe(2);
  });

  it('should handle API errors', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const result = await fetchCharacters('rick');
    expect(result.characters).toEqual([]);
    expect(result.page.currPage).toBe(0);
    expect(result.page.totalPages).toBe(0);
  });
});

describe('getDetailsCharacter test', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('should return character details', async () => {
    const mockCharacter = {
      id: 1,
      name: 'Rick',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: {
        name: 'Earth',
        url: '',
      },
      location: {
        name: 'Earth',
        url: '',
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      episode: [],
      url: '',
      created: '',
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCharacter,
    });

    const result = await getDetailsCharacter(1);
    expect(result.id).toBe(1);
    expect(result.name).toBe('Rick');
    expect(result.status).toBe('Alive');
  });

  it('should handle API errors', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const result = await getDetailsCharacter(1);
    expect(result.id).toBe(0);
    expect(result.name).toBe('');
  });
});
