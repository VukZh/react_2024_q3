import { ChangeEvent, useEffect, useState } from 'react';

import styles from './search.module.css';
import SearchRequest from '../widgets/search-request';
import SearchResult from '../widgets/search-result';
import { RickAndMortyCharacter } from '../model/types.ts';
import { getDetailsCharacter, getShortCharacters } from '../api/helpers.ts';
import CharacterDetails from '../entities/characterDetails/ui/characterDetails.tsx';

export const LS_MY_SEARCH = 'mySearch';

function Search() {
  const [searchText, setSearchText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [characters, setCharacters] = useState<RickAndMortyCharacter[]>([]);

  useEffect(() => {
    const searchText = localStorage.getItem(LS_MY_SEARCH);
    if (searchText) {
      setSearchText(searchText);
    }
  }, []);

  const changeSearchText = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchText: event.target.value });
  };

  return (
    <div className={styles.searchWrapper}>
      <SearchRequest
        searchText={searchText}
        changeSearchText={setSearchText}
        isLoading={isLoading}
        changeIsLoading={setIsLoading}
        setCharacters={setCharacters}></SearchRequest>
      <div className={styles.resultsWrapper}>
        <SearchResult
          characters={getShortCharacters(characters)}></SearchResult>

        {characters.length ? (
          <CharacterDetails
            character={getDetailsCharacter(characters, 9)}></CharacterDetails>
        ) : null}
      </div>
    </div>
  );
}

export default Search;
