import { useContext, useEffect } from 'react';

import styles from './search.module.css';
import SearchRequest from '../widgets/search-request';
import SearchResult from '../widgets/search-result';
import Pagination from '../entities/pagination/ui/pagination.tsx';
import { useLocalStorage } from '../../../shared/hooks/useLocalStorage.tsx';
import useCustomSearchParams from '../../../shared/hooks/useCustomSearchParams.tsx';
import { Context } from '../../../shared/context/contextProvider.tsx';
import { Outlet } from 'react-router-dom';
import ThemeSwitcher from '../entities/themeSwitcher';

export const LS_MY_SEARCH = 'mySearch';

function Search() {
  const {
    characters,
    isShowingDetails,
    setSelectedId,
    page,
    setIsShowingDetails,
    characterDetails,
    setSearchText,
    selectedId,
    themeIsDark,
  } = useContext(Context);

  const [localSearchText, saveLocalSearchText] = useLocalStorage();

  const {
    searchParams,
    handleNameChange,
    handleDetailsChange,
    handlePageChange,
  } = useCustomSearchParams();

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

  useEffect(() => {
    if (page.currPage) {
      handlePageChange(page.currPage);
      handlePageChange(page.currPage);
    }
  }, [page]);

  useEffect(() => {
    if (searchParams.get('name')) {
      setSearchText(searchParams.get('name'));
    } else if (localSearchText) {
      setSearchText(localSearchText);
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
        onClick={() => setIsShowingDetails(false)}>
        <div>
          <SearchResult></SearchResult>
          {characters?.length ? <Pagination></Pagination> : null}
        </div>
        {characterDetails?.id ? (
          <Outlet />
        ) : (
          <div className={styles.empty}></div>
        )}
        <ThemeSwitcher />
      </div>
    </div>
  );
}

export default Search;
