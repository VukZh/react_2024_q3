import { useEffect } from 'react';
import styles from './searchRequest.module.css';
import { LS_MY_SEARCH } from '../../../ui/search.tsx';
import Loader from '../../../../../shared/loader';
import { PageType, RickAndMortyCharacter } from '../../../model/types.ts';
import { fetchData } from '../../../api/helpers.ts';

type PropsType = {
  searchText: string;
  changeSearchText: (text: string) => void;
  isLoading: boolean;
  changeIsLoading: (isLoading: boolean) => void;
  setCharacters: (characters: RickAndMortyCharacter[]) => void;
  setPage: (page: PageType) => void;
};

function SearchRequest(props: PropsType) {
  const {
    searchText,
    changeSearchText,
    isLoading,
    changeIsLoading,
    setCharacters,
    setPage,
  } = props;
  const handleSearchSubmit = async () => {
    localStorage.setItem(LS_MY_SEARCH, searchText);
    fetchData(searchText, changeIsLoading, setCharacters, setPage);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  useEffect(() => {
    const initialSearchText = localStorage.getItem(LS_MY_SEARCH) || '';
    fetchData(initialSearchText, changeIsLoading, setCharacters, setPage);
  }, []);

  return (
    <div className={styles.inputWrapper}>
      <input
        type="text"
        placeholder="Enter search query"
        className={styles.inputSearch}
        value={searchText}
        onChange={(e) => changeSearchText(e.target.value)}
        onKeyUp={handleKeyPress}
      />
      {!isLoading ? (
        <button className={styles.buttonSearch} onClick={handleSearchSubmit}>
          Search
        </button>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default SearchRequest;
