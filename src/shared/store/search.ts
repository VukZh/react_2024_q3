import { Dispatch, SetStateAction } from 'react';
import {
  PageType,
  RickAndMortyCharacterType,
} from '../../pages/search/model/types.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SearchStateType {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<SearchStateType['searchText']>>;
  characters: RickAndMortyCharacterType[];
  setCharacters: Dispatch<React.SetStateAction<SearchStateType['characters']>>;
  isShowingDetails: boolean;
  setIsShowingDetails: Dispatch<
    SetStateAction<SearchStateType['isShowingDetails']>
  >;
  selectedId: number;
  setSelectedId: Dispatch<SetStateAction<SearchStateType['selectedId']>>;
  page: PageType;
  setPage: Dispatch<React.SetStateAction<SearchStateType['page']>>;
  characterDetails: RickAndMortyCharacterType;
  setCharacterDetails: Dispatch<
    SetStateAction<SearchStateType['characterDetails']>
  >;
  selectedItems: number[];
  setSelectedItems: Dispatch<SetStateAction<SearchStateType['selectedItems']>>;
  selectedItemsWithDetails: RickAndMortyCharacterType[];
  setSelectedItemsWithDetails: Dispatch<
    SetStateAction<SearchStateType['selectedItemsWithDetails']>
  >;
}

export const InitialSearchState: SearchStateType = {
  searchText: '',
  setSearchText: () => {},
  characters: [],
  setCharacters: () => {},
  isShowingDetails: true,
  setIsShowingDetails: () => {},
  selectedId: 0,
  setSelectedId: () => {},
  page: { currPage: 1, totalPages: 1 },
  setPage: () => {},
  characterDetails: {
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
  },
  setCharacterDetails: () => {},
  selectedItems: [],
  setSelectedItems: () => {},
  selectedItemsWithDetails: [],
  setSelectedItemsWithDetails: () => {},
};

export const searchSlice = createSlice({
  name: 'search',
  initialState: InitialSearchState,
  reducers: {
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setCharacters: (
      state,
      action: PayloadAction<RickAndMortyCharacterType[]>,
    ) => {
      state.characters = action.payload;
    },
    setIsShowingDetails: (state, action: PayloadAction<boolean>) => {
      state.isShowingDetails = action.payload;
    },
    setSelectedId: (state, action: PayloadAction<number>) => {
      state.selectedId = action.payload;
    },
    setPage: (state, action: PayloadAction<PageType>) => {
      state.page = action.payload;
    },
    setCharacterDetails: (
      state,
      action: PayloadAction<RickAndMortyCharacterType>,
    ) => {
      state.characterDetails = action.payload;
    },
    setSelectedItems: (state, action: PayloadAction<number[]>) => {
      state.selectedItems = action.payload;
    },
    setSelectedItemsWithDetails: (
      state,
      action: PayloadAction<RickAndMortyCharacterType[]>,
    ) => {
      state.selectedItemsWithDetails = action.payload;
    },
  },
});

export const {
  setSearchText,
  setCharacters,
  setIsShowingDetails,
  setSelectedId,
  setPage,
  setCharacterDetails,
  setSelectedItems,
  setSelectedItemsWithDetails,
} = searchSlice.actions;

export default searchSlice.reducer;
