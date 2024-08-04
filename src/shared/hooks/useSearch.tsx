import { useTypedSelector } from './useTypedSelector';
import { useTypedDispatch } from './useTypedDispatch';
import { useCallback } from 'react';

import {
  setSearchText,
  setCharacters,
  setIsShowingDetails,
  setSelectedId,
  setPage,
  setCharacterDetails,
  setSelectedItems,
  setSelectedItemsWithDetails,
  setIsLoading,
  setIsDetailsLoading,
} from '../store/search';
import {
  PageType,
  RickAndMortyCharacterType,
} from '../../components/search/model/types.ts';

const useSearch = () => {
  const dispatch = useTypedDispatch();
  const {
    searchText,
    characters,
    isShowingDetails,
    selectedId,
    page,
    characterDetails,
    selectedItems,
    selectedItemsWithDetails,
    isLoading,
    isDetailsLoading,
  } = useTypedSelector((state) => state.search);

  const handleSetSearchTextCallback = useCallback(
    (searchText: string) => {
      dispatch(setSearchText(searchText));
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

  const handleSetCharacterDetailsCallback = useCallback(
    (characterDetails: RickAndMortyCharacterType) => {
      dispatch(setCharacterDetails(characterDetails));
    },
    [dispatch],
  );

  const handleSetIsLoadingCallback = useCallback(
    (isLoading: boolean) => {
      dispatch(setIsLoading(isLoading));
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

  const handleSetIsDetailsLoadingCallback = useCallback(
    (isDetailsLoading: boolean) => {
      dispatch(setIsDetailsLoading(isDetailsLoading));
    },
    [dispatch],
  );

  return {
    searchText,
    characters,
    isShowingDetails,
    selectedId,
    page,
    characterDetails,
    selectedItems,
    selectedItemsWithDetails,
    isLoading,
    isDetailsLoading,
    handleSetSearchTextCallback,
    handleSetCharactersCallback,
    handleSetIsShowingDetailsCallback,
    handleSetSelectedIdCallback,
    handleSetPageCallback,
    handleSetCharacterDetailsCallback,
    handleSetSelectedItemsCallback,
    handleSetIsLoadingCallback,
    handleSetIsDetailsLoadingCallback,
  };
};

export { useSearch };
