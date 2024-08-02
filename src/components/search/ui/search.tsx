import { useContext, useEffect } from 'react';

import styles from './search.module.css';
import SearchRequest from '../widgets/search-request';
// import SearchResult from '../widgets/search-result';
// import Pagination from '../entities/pagination/ui/pagination.tsx';
import { useLocalStorage } from '../../../shared/hooks/useLocalStorage.tsx';
import useCustomSearchParams from '../../../shared/hooks/useCustomSearchParams.tsx';
import { Context } from '../../../shared/context/contextProvider.tsx';
// import { Outlet } from 'react-router-dom';
import ThemeSwitcher from '../entities/themeSwitcher';
import { useSearch } from '../../../shared/hooks/useSearch.tsx';
// import Flyout from '../entities/flyout';
// import CharacterDetails from "../entities/characterDetails";

import {usePathname, useSearchParams} from 'next/navigation';
import {useRouter} from "next/router";


export const LS_MY_SEARCH = 'mySearch';

function Search() {
  const { themeIsDark } = useContext(Context);

  const {
    characters,
    isShowingDetails,
    handleSetSelectedIdCallback,
    page,
    handleSetIsShowingDetailsCallback,
    handleSetSearchTextCallback,
    selectedId,
  } = useSearch();

  const [localSearchText, saveLocalSearchText] = useLocalStorage();

  // const searchParams = useSearchParams();
  // const {replace} = useRouter();
  // const pathname = usePathname();

  // const params = new URLSearchParams(searchParams);
  //
  // console.log('searchParams', params.get('name'), params.get('text'), pathname);
  // if (localSearchText) {
  //   params.set('name', localSearchText);
  // }

  // useEffect(() => {
  //   if (params.get('name') || params.get('name') === '') {
  //     saveLocalSearchText(params.get('name'));
  //     console.log('localSearchText', localSearchText);
  //     replace(`${pathname}?name=${params.get('name')}`)
  //   }
  //   // else if (localSearchText) {
  //   //   replace(`${pathname}?name=${localSearchText}`)
  //   // }
  // }, [params.get('name')]);

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

  // useEffect(() => {
  //   if (selectedId >= 0) {
  //     handleDetailsChange(selectedId);
  //     handleDetailsChange(selectedId);
  //   }
  // }, [selectedId]);
  //
  // useEffect(() => {
  //   if (page.currPage) {
  //     handlePageChange(page.currPage);
  //     handlePageChange(page.currPage);
  //   }
  // }, [page]);
  //
  useEffect(() => {
    if (searchParams.get('name')) {
      handleSetSearchTextCallback(searchParams.get('name'));
    } else
    if (localSearchText) {
      handleSetSearchTextCallback(localSearchText);
      handleNameChange(localSearchText);
    }
    return () => {
      saveLocalSearchText(localSearchText);
    };
  }, []);

  return (
    <div
      className={`${styles.searchWrapper} ${themeIsDark ? '' : styles.light}`}>
      <SearchRequest></SearchRequest>
      <div
        className={styles.resultsWrapper}
        // onClick={() => handleSetIsShowingDetailsCallback(false)}
      >
        {/*<div>*/}
        {/*  <SearchResult></SearchResult>*/}
        {/*  {characters?.length ? <Pagination></Pagination> : null}*/}
        {/*</div>*/}
        {/*<CharacterDetails />*/}
        <ThemeSwitcher />
        {/*<Flyout />*/}
      </div>
    </div>
  );
}

export default Search;
