import { useTypedSelector } from './useTypedSelector';
import { useTypedDispatch } from './useTypedDispatch';
import { useCallback } from 'react';

import {
  setSearchText,
  setIsLoading,
  setCharacters,
  setIsShowingDetails,
  setSelectedId,
  setPage,
  setIsLoadingDetails,
  setCharacterDetails,
} from '../store/search';
import {PageType, RickAndMortyCharacterType} from "../../pages/search/model/types.ts";

const useSearch = () => {
  const dispatch = useTypedDispatch();
  const {
    searchText,
    isLoading,
    characters,
    isShowingDetails,
    selectedId,
    page,
    isLoadingDetails,
    characterDetails,
  } = useTypedSelector((state) => state.search);

  const handleSetSearchTextCallback = useCallback(
    (searchText: string) => {
      dispatch(setSearchText(searchText));
    },
    [dispatch],
  );

  const handleSetIsLoadingCallback = useCallback(
    (isLoading: boolean) => {
      dispatch(setIsLoading(isLoading));
    },
    [dispatch],
  );

  const handleSetCharactersCallback = useCallback(
    (characters: RickAndMortyCharacterType[]) => {
      dispatch(setCharacters(characters));
    },
    [dispatch],
  );

  const handleSetIsShowingDetailsCallback = useCallback(
    (isShowingDetails: boolean) => {
      dispatch(setIsShowingDetails(isShowingDetails));
    },
    [dispatch],
  );

  const handleSetSelectedIdCallback = useCallback(
    (selectedId: number) => {
      dispatch(setSelectedId(selectedId));
    },
    [dispatch],
  );

  const handleSetPageCallback = useCallback(
    (page: PageType) => {
      dispatch(setPage(page));
    },
    [dispatch],
  );

  const handleSetIsLoadingDetails = useCallback(
    (isLoadingDetails: boolean) => {
      dispatch(setIsLoadingDetails(isLoadingDetails));
    },
    [dispatch],
  );

  const handleSetCharacterDetails = useCallback(
    (characterDetails: RickAndMortyCharacterType) => {
      dispatch(setCharacterDetails(characterDetails));
    },
    [dispatch],
  );

  return {
    searchText,
    isLoading,
    characters,
    isShowingDetails,
    selectedId,
    page,
    isLoadingDetails,
    characterDetails,
    handleSetSearchTextCallback,
    handleSetIsLoadingCallback,
    handleSetCharactersCallback,
    handleSetIsShowingDetailsCallback,
    handleSetSelectedIdCallback,
    handleSetPageCallback,
    handleSetIsLoadingDetails,
    handleSetCharacterDetails
  };
};

export { useSearch };
