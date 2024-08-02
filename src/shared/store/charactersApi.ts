import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ReqCharactersType,
  RickAndMortyCharacterType,
} from '../../pages_/search/model/types.ts';

const BASE_URL = 'https://rickandmortyapi.com/api/character/';

export const charactersApi = createApi({
  reducerPath: 'characterApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCharacters: builder.query<RickAndMortyCharacterType, ReqCharactersType>({
      query: ({ name, page }) => {
        return page ? `?page=${page}&name=${name}` : `?name=${name}`;
      },
    }),
  }),
});

export const { useGetCharactersQuery } = charactersApi;
