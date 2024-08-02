import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RickAndMortyCharacterType } from '../../pages_/search/model/types.ts';

const BASE_URL = 'https://rickandmortyapi.com/api/character/';

export const characterDetailsApi = createApi({
  reducerPath: 'characterDetailsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCharacterDetails: builder.query<RickAndMortyCharacterType, number>({
      query: (id: number) => `${id}`,
    }),
  }),
});

export const { useGetCharacterDetailsQuery } = characterDetailsApi;
