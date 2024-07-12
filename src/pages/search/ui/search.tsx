import { useEffect, useState } from 'react';

import styles from './search.module.css';
import SearchRequest from '../widgets/search-request';
import SearchResult from '../widgets/search-result';
import { PageType, RickAndMortyCharacter } from '../model/types.ts';
import { getDetailsCharacter, getShortCharacters } from '../api/helpers.ts';
import CharacterDetails from '../entities/characterDetails';
import Pagination from '../entities/pagination/ui/pagination.tsx';

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

  useEffect(() => {
    const searchText = localStorage.getItem(LS_MY_SEARCH);
    if (searchText) {
      setSearchText(searchText);
    }
  }, []);

  return (
    <div className={styles.searchWrapper}>
      <SearchRequest
        searchText={searchText}
        changeSearchText={setSearchText}
        isLoading={isLoading}
        changeIsLoading={setIsLoading}
        setCharacters={setCharacters}
        sepPage={setPage}></SearchRequest>
      <div
        className={styles.resultsWrapper}
        onClick={() => setIsShowingDetails(false)}>
        <div>
          <SearchResult
            characters={getShortCharacters(characters)}
            changeSelectedId={setSelectedId}
            changeIsShowingDetails={setIsShowingDetails}></SearchResult>
          {characters.length ? (
            <Pagination
              currPage={page.currPage}
              totalPages={page.totalPages}
              changePage={setPage}></Pagination>
          ) : null}
        </div>
        {characters.length ? (
          <CharacterDetails
            character={getDetailsCharacter(characters, selectedId)}
            isShowing={isShowingDetails}
            changeIsShowingDetails={setIsShowingDetails}></CharacterDetails>
        ) : null}
      </div>
    </div>
  );
}

export default Search;
