'use client';

import { useContext, useEffect } from 'react';
import styles from './searchRequest.module.css';
import Loader from '../../../../../shared/loader';
import { useLocalStorage } from '../../../../../shared/hooks/useLocalStorage.tsx';
import useCustomSearchParams from '../../../../../shared/hooks/useCustomSearchParams.tsx';
import { Context } from '../../../../../shared/context/contextProvider.tsx';
import { useSearch } from '../../../../../shared/hooks/useSearch.tsx';

function SearchRequest() {
  const [localSearchText, saveLocalSearchText] = useLocalStorage();

  const { themeIsDark } = useContext(Context);

  const {
    searchText,
    handleSetSearchTextCallback: changeSearchText,
    handleSetPageCallback,
    page,
    handleSetIsLoadingCallback,
    isLoading,
  } = useSearch();

  const { searchParams, handleNameChange } = useCustomSearchParams();

  useEffect(() => {
    if (searchParams.get('name')) {
      changeSearchText(searchParams.get('name')!);
      saveLocalSearchText(searchParams.get('name')!);
    }
  }, [searchParams.get('name')]);

  const handleSearchSubmit = async () => {
    if (localSearchText !== searchText || page.currPage !== 1) {
      handleSetIsLoadingCallback(true);
      saveLocalSearchText(searchText);
    }
    handleSetPageCallback({
      totalPages: page.totalPages,
      currPage: 1,
    });
    handleNameChange(searchText);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  useEffect(() => {
    handleSetPageCallback({
      totalPages: page.totalPages,
      currPage:
        searchParams.get('page') !== null ? +searchParams.get('page')! : 1,
    });
  }, []);

  return (
    <div className={styles.inputWrapper}>
      <input
        type="text"
        placeholder="Enter search query"
        className={`${styles.inputSearch} ${themeIsDark ? '' : styles.light}`}
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
