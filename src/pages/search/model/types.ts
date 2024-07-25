export type RickAndMortyCharacterType = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type RickAndMortyShortCharacter = Pick<
  RickAndMortyCharacterType,
  'id' | 'name' | 'status' | 'species'
>;

export type RickAndMortyDetailsCharacter = Pick<
  RickAndMortyCharacterType,
  'id' | 'name' | 'status' | 'species' | 'image' | 'location'
>;

export type PageType = {
  currPage: number;
  totalPages: number;
};

export type ReqCharactersType = {
  name: string;
  page?: number
}
