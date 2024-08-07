'use client';

import {useContext, useEffect} from 'react';

import styles from './search.module.css';
import SearchRequest from '../widgets/search-request';
import SearchResult from '../widgets/search-result';
import Pagination from '../entities/pagination/ui/pagination.tsx';
import {useLocalStorage} from '../../../shared/hooks/useLocalStorage.tsx';
import useCustomSearchParams from '../../../shared/hooks/useCustomSearchParams.tsx';
import {Context} from '../../../shared/context/contextProvider.tsx';
import ThemeSwitcher from '../entities/themeSwitcher';
import {useSearch} from '../../../shared/hooks/useSearch.tsx';
import Flyout from '../entities/flyout';
import CharacterDetails from '../entities/characterDetails';
import {PageType, RickAndMortyCharacterType} from '../model/types.ts';

export const LS_MY_SEARCH = 'mySearch';

type SearchPropsType = {
  characters: RickAndMortyCharacterType[];
  page: PageType;
  details: RickAndMortyCharacterType | null;
  resultSlot: React.ReactNode;
  detailsSlot: React.ReactNode;
};

function Search(data: SearchPropsType) {
  const {themeIsDark} = useContext(Context);

  const {characters, page, details, resultSlot, detailsSlot} = data;

  const {
    handleSetSelectedIdCallback,
    page: currentPage,
    handleSetIsShowingDetailsCallback,
    handleSetSearchTextCallback,
    selectedId,
    handleSetCharactersCallback,
    handleSetPageCallback,
    handleSetIsLoadingCallback,
    handleSetCharacterDetailsCallback,
    handleSetIsDetailsLoadingCallback,
  } = useSearch();

  const [localSearchText, saveLocalSearchText] = useLocalStorage();

  useEffect(() => {
    handleSetCharactersCallback(characters);
    handleSetIsLoadingCallback(false);
  }, [characters]);

  useEffect(() => {
    if (!characters.length) {
      handleSetIsShowingDetailsCallback(false);
      handleSetSelectedIdCallback(0);
    } else {
      handleSetIsShowingDetailsCallback(true);
    }
  }, [characters.length]);

  useEffect(() => {
    handleSetPageCallback(page);
  }, [page]);

  useEffect(() => {
    if (!details) {
      return;
    }
    handleSetCharacterDetailsCallback(details);
    handleSetIsDetailsLoadingCallback(false);
  }, [details]);

  const {
    searchParams,
    handleNameChange,
    handleDetailsChange,
    handlePageChange,
  } = useCustomSearchParams();

  useEffect(() => {
    if (selectedId >= 0) {
      handleDetailsChange(selectedId);
    }
  }, [selectedId]);

  useEffect(() => {
    if (currentPage.currPage) {
      handlePageChange(currentPage.currPage);
    }
  }, [currentPage.currPage]);

  useEffect(() => {
    if (searchParams.get('name')) {
      handleSetSearchTextCallback(searchParams.get('name')!);
    } else if (localSearchText) {
      handleSetSearchTextCallback(localSearchText);
      handleNameChange(localSearchText);
    }
    return () => {
      saveLocalSearchText(
        searchParams.get('name') ? searchParams.get('name') : localSearchText,
      );
    };
  }, []);

  return (
    <div
      className={`${styles.searchWrapper} ${themeIsDark ? '' : styles.light}`}>
      <SearchRequest></SearchRequest>
      <div
        className={styles.resultsWrapper}
        onClick={() => {
          handleSetIsShowingDetailsCallback(false);
          handleSetSelectedIdCallback(0);
        }}
      >
        <div>
          {/*<SearchResult*/}
          {/*  changeSelectedId={handleSetSelectedIdCallback}*/}
          {/*  changeIsShowingDetails={handleSetIsShowingDetailsCallback}*/}
          {/*  selectedId={selectedId}*/}
          {/*  setIsDetailsLoading={*/}
          {/*    handleSetIsDetailsLoadingCallback*/}
          {/*  }*/}
          {/*  draftCharacters={characters}*/}
          {/*></SearchResult>*/}

          {resultSlot}

          {characters?.length ? <Pagination></Pagination> : null}

          {/*{data.childrenRes}*/}
        </div>

        <CharacterDetails>
          {detailsSlot}
        </CharacterDetails>
        <ThemeSwitcher/>
        <Flyout/>
      </div>
    </div>
  );
}

export default Search;
