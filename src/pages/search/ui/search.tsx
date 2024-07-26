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
import { useSearch } from '../../../shared/hooks/useSearch.tsx';
import Flyout from '../entities/flyout';

export const LS_MY_SEARCH = 'mySearch';

function Search() {
  const { themeIsDark } = useContext(Context);

  const {
    characters,
    isShowingDetails,
    handleSetSelectedIdCallback,
    page,
    handleSetIsShowingDetailsCallback,
    characterDetails,
    handleSetSearchTextCallback,
    selectedId,
  } = useSearch();

  const [localSearchText, saveLocalSearchText] = useLocalStorage();

  const {
    searchParams,
    handleNameChange,
    handleDetailsChange,
    handlePageChange,
  } = useCustomSearchParams();

  useEffect(() => {
    if (!isShowingDetails) {
      handleSetSelectedIdCallback(0);
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
      handleSetSearchTextCallback(searchParams.get('name'));
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
        onClick={() => handleSetIsShowingDetailsCallback(false)}>
        <div>
          <SearchResult></SearchResult>
          {characters?.length ? <Pagination></Pagination> : null}
        </div>
        <Outlet />
        <ThemeSwitcher />
        <Flyout />
      </div>
    </div>
  );
}

export default Search;
