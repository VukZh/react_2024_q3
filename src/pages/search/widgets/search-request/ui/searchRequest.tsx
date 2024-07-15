import { useContext, useEffect } from 'react';
import styles from './searchRequest.module.css';
import Loader from '../../../../../shared/loader';
import { fetchData } from '../../../api/helpers.ts';
import { useLocalStorage } from '../../../../../shared/hooks/useLocalStorage.tsx';
import useCustomSearchParams from '../../../../../shared/hooks/useCustomSearchParams.tsx';
import { Context } from '../../../../../shared/context/contextProvider.tsx';

function SearchRequest() {
  const [, saveLocalSearchText] = useLocalStorage();

  const {
    searchText,
    setSearchText: changeSearchText,
    isLoading,
    setIsLoading: changeIsLoading,
    setCharacters,
    setPage,
  } = useContext(Context);
  const handleSearchSubmit = async () => {
    await fetchData(searchText, changeIsLoading, setCharacters, setPage);
    handleNameChange(searchText);
    handleNameChange(searchText);
    saveLocalSearchText(
      searchParams.get('name') ? searchParams.get('name') : searchText,
    );
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const [localSearchText] = useLocalStorage();

  const { searchParams, handleNameChange } = useCustomSearchParams();

  useEffect(() => {
    fetchData(
      searchParams.get('name') ? searchParams.get('name') : localSearchText,
      changeIsLoading,
      setCharacters,
      setPage,
      searchParams.get('page') ? +searchParams.get('page') : 0,
    );
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
