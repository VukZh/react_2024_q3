import { useEffect, useState } from 'react';

import styles from './search.module.css';
import SearchRequest from '../widgets/search-request';
import SearchResult from '../widgets/search-result';
import { PageType, RickAndMortyCharacter } from '../model/types.ts';
import { getDetailsCharacter, getShortCharacters } from '../api/helpers.ts';
import CharacterDetails from '../entities/characterDetails';
import Pagination from '../entities/pagination/ui/pagination.tsx';
import { useLocalStorage } from '../../../shared/hooks/useLocalStorage.tsx';
import useCustomSearchParams from '../../../shared/hooks/useCustomSearchParams.tsx';

export const LS_MY_SEARCH = 'mySearch';

function Search() {
  const [searchText, setSearchText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [characters, setCharacters] = useState<RickAndMortyCharacter[]>([]);
  const [isShowingDetails, setIsShowingDetails] = useState<boolean>(true);
  const [selectedId, setSelectedId] = useState(NaN);
  const [page, setPage] = useState<PageType>({
    currPage: 1,
    totalPages: 1,
  });
  const [isLoadingDetails, setIsLoadingDetails] = useState<boolean>(false);
  const [characterDetails, setCharacterDetails] =
    useState<RickAndMortyCharacter>();

  const [localSearchText, saveLocalSearchText] = useLocalStorage();

  const [searchParams, updateSearchParams] = useCustomSearchParams();

  const handleNameChange = (newName) => {
    updateSearchParams((prev) => {
      prev.set('name', newName);
      return prev;
    });
  };

  const handleDetailsChange = (newId) => {
    updateSearchParams((prev) => {
      prev.set('details', newId);
      return prev;
    });
  };

  useEffect(() => {
    if (!isShowingDetails) {
      setSelectedId(0);
    }
  }, [isShowingDetails]);

  useEffect(() => {
    if (selectedId >= 0) {
      handleDetailsChange(selectedId);
      handleDetailsChange(selectedId);
    }
  }, [selectedId]);

  const handlePageChange = (page) => {
    updateSearchParams((prev) => {
      prev.set('page', page);
      return prev;
    });
  };

  useEffect(() => {
    if (page.currPage) {
      handlePageChange(page.currPage);
      handlePageChange(page.currPage);
    }
  }, [page]);

  useEffect(() => {
    if (localSearchText) {
      setSearchText(localSearchText);
      handleNameChange(localSearchText);
    }
    return () => {
      saveLocalSearchText(localSearchText);
    };
  }, []);

  return (
    <div className={styles.searchWrapper}>
      <SearchRequest
        searchText={searchText}
        changeSearchText={setSearchText}
        isLoading={isLoading}
        changeIsLoading={setIsLoading}
        setCharacters={setCharacters}
        setPage={setPage}></SearchRequest>
      <div
        className={styles.resultsWrapper}
        onClick={() => setIsShowingDetails(false)}>
        <div>
          <SearchResult
            characters={getShortCharacters(characters)}
            changeSelectedId={setSelectedId}
            changeIsShowingDetails={setIsShowingDetails}
            changeIsLoadingDetails={setIsLoadingDetails}
            setCharacterDetails={setCharacterDetails}></SearchResult>
          {characters.length ? (
            <Pagination
              currPage={page.currPage}
              totalPages={page.totalPages}
              changePage={setPage}
              changeIsLoading={setIsLoading}
              setCharacters={setCharacters}
              setPage={setPage}></Pagination>
          ) : null}
        </div>
        {characterDetails?.id ? (
          <CharacterDetails
            character={getDetailsCharacter(characterDetails)}
            isShowing={isShowingDetails}
            changeIsShowingDetails={setIsShowingDetails}
            isLoadingDetails={isLoadingDetails}></CharacterDetails>
        ) : (
          <div className={styles.empty}></div>
        )}
      </div>
    </div>
  );
}

export default Search;
