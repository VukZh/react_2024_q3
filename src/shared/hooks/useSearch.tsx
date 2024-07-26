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
  setSelectedItems,
  setSelectedItemsWithDetails,
} from '../store/search';
import {
  PageType,
  RickAndMortyCharacterType,
} from '../../pages/search/model/types.ts';

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
    selectedItems,
    selectedItemsWithDetails,
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

  const handleSetIsLoadingDetailsCallback = useCallback(
    (isLoadingDetails: boolean) => {
      dispatch(setIsLoadingDetails(isLoadingDetails));
    },
    [dispatch],
  );

  const handleSetCharacterDetailsCallback = useCallback(
    (characterDetails: RickAndMortyCharacterType) => {
      dispatch(setCharacterDetails(characterDetails));
    },
    [dispatch],
  );

  const handleSetSelectedItemsCallback = useCallback(
    (id: number) => {
      const selectedItemsTmp = [...selectedItems];
      const selectedItemsWithDetailsTmp = [...selectedItemsWithDetails];
      if (id < 0) {
        dispatch(setSelectedItems([]));
        dispatch(setSelectedItemsWithDetails([]));
      } else {
        const findInd = selectedItemsTmp.findIndex((item) => item === id);
        if (findInd >= 0) {
          selectedItemsTmp.splice(findInd, 1);
          selectedItemsWithDetailsTmp.splice(findInd, 1);
          dispatch(setSelectedItems(selectedItemsTmp));
          dispatch(setSelectedItemsWithDetails(selectedItemsWithDetailsTmp));
        } else {
          const selectedItemWithDetails = characters.find((i) => i.id === id);
          selectedItemsTmp.push(id);
          selectedItemsWithDetailsTmp.push(selectedItemWithDetails);
          dispatch(setSelectedItems(selectedItemsTmp));
          dispatch(setSelectedItemsWithDetails(selectedItemsWithDetailsTmp));
        }
      }
    },
    [dispatch, selectedItems],
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
    selectedItems,
    selectedItemsWithDetails,
    handleSetSearchTextCallback,
    handleSetIsLoadingCallback,
    handleSetCharactersCallback,
    handleSetIsShowingDetailsCallback,
    handleSetSelectedIdCallback,
    handleSetPageCallback,
    handleSetIsLoadingDetailsCallback,
    handleSetCharacterDetailsCallback,
    handleSetSelectedItemsCallback,
  };
};

export { useSearch };
