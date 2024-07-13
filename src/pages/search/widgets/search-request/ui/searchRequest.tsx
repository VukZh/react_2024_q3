import { useEffect } from 'react';
import styles from './searchRequest.module.css';
import Loader from '../../../../../shared/loader';
import { PageType, RickAndMortyCharacter } from '../../../model/types.ts';
import { fetchData } from '../../../api/helpers.ts';
import { useLocalStorage } from '../../../../../shared/hooks/useLocalStorage.tsx';

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

  const [, saveLocalSearchText] = useLocalStorage();
  const handleSearchSubmit = async () => {
    saveLocalSearchText(searchText);
    fetchData(searchText, changeIsLoading, setCharacters, setPage);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const [localSearchText] = useLocalStorage();

  useEffect(() => {
    fetchData(localSearchText, changeIsLoading, setCharacters, setPage);
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
