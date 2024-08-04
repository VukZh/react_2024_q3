import {useContext, useEffect, useState} from 'react';

import styles from './search.module.css';
import SearchRequest from '../widgets/search-request';
import SearchResult from '../widgets/search-result';
import Pagination from '../entities/pagination/ui/pagination.tsx';
import { useLocalStorage } from '../../../shared/hooks/useLocalStorage.tsx';
import useCustomSearchParams from '../../../shared/hooks/useCustomSearchParams.tsx';
import { Context } from '../../../shared/context/contextProvider.tsx';
// import { Outlet } from 'react-router-dom';
import ThemeSwitcher from '../entities/themeSwitcher';
import { useSearch } from '../../../shared/hooks/useSearch.tsx';
import Flyout from '../entities/flyout';
import CharacterDetails from "../entities/characterDetails";

import {usePathname, useSearchParams} from 'next/navigation';
import {useRouter} from "next/router";
import {PageType, RickAndMortyCharacterType} from "../model/types.ts";


export const LS_MY_SEARCH = 'mySearch';

type SearchPropsType = {
  characters: RickAndMortyCharacterType[];
  page: PageType;
  details: RickAndMortyCharacterType | null;
};
function Search(data: SearchPropsType) {
  const { themeIsDark } = useContext(Context);

const { characters, page, details } = data;

  console.log('details+++++++++++++++++++++', details);

  const {
    // characters,
    isShowingDetails,
    handleSetSelectedIdCallback,
    page: currentPage,
    handleSetIsShowingDetailsCallback,
    handleSetSearchTextCallback,
    selectedId,
    handleSetCharactersCallback,
    handleSetPageCallback,
    handleSetIsLoadingCallback,
    handleSetCharacterDetailsCallback,
    handleSetIsDetailsLoadingCallback
  } = useSearch();

  const [localSearchText, saveLocalSearchText] = useLocalStorage();

  useEffect(() => {
    console.log('characters>>>>>>>>>>>>>>', characters);
    handleSetCharactersCallback(characters);
    handleSetIsLoadingCallback(false);
  }, [characters]);

  useEffect(() => {
    console.log('page>>>>>>>>>>>>>>', page);
    handleSetPageCallback(page);
  }, [page]);

  useEffect(() => {
    if (!details) {
      return;
    }
    handleSetCharacterDetailsCallback(details);
    handleSetIsDetailsLoadingCallback(false);
  }, [details]);

  // useEffect(() => {
  //     const totalPages = data?.info.count ? Math.ceil(data?.info.count / 20) : 1;
  //     const currPage =
  //       data?.info.next && data?.info.prev
  //         ? data.info.next.split('?')[1].split('&')[0].split('=')[1] - 1
  //         : !data?.info.next && totalPages > 1
  //           ? totalPages
  //           : 1;
  //     const newPage = {
  //       currPage,
  //       totalPages,
  //     };
  //     if (
  //       page?.currPage !== newPage.currPage ||
  //       page?.totalPages !== newPage.totalPages
  //     ) {
  //       handleSetPageCallback(newPage);
  //     }
  //   }, [page]);

  // const searchParams = useSearchParams();
  // const {replace} = useRouter();
  // const pathname = usePathname();

  // const params = new URLSearchParams(searchParams);
  //
  // console.log('searchParams', params.get('name'), params.get('text'), pathname);
  // if (localSearchText) {
  //   params.set('name', localSearchText);
  // }
  const {
    searchParams,
    handleNameChange,
    handleDetailsChange,
    handlePageChange,
  } = useCustomSearchParams();

  // useEffect(() => {
  //   if (searchParams.get('name') || searchParams.get('name') === '') {
  //     saveLocalSearchText(searchParams.get('name'));
  //     console.log('localSearchText', localSearchText);
  //     handleNameChange(searchParams.get('name')!);
  //   }
  //   // else if (localSearchText) {
  //   //   replace(`${pathname}?name=${localSearchText}`)
  //   // }
  // }, [searchParams.get('name')]);



  // useEffect(() => {
  //   if (!isShowingDetails) {
  //     handleSetSelectedIdCallback(0);
  //   }
  // }, [isShowingDetails]);

  useEffect(() => {
    if (selectedId >= 0) {
      handleDetailsChange(selectedId);
    }
  }, [selectedId]);
  //
  useEffect(() => {
    if (currentPage.currPage) {
      handlePageChange(currentPage.currPage);
      // handlePageChange(currentPage.currPage);
    }
  }, [currentPage.currPage]);
  //
  useEffect(() => {
    if (searchParams.get('name')) {
      handleSetSearchTextCallback(searchParams.get('name')!);
    } else
    if (localSearchText) {
      handleSetSearchTextCallback(localSearchText);
      handleNameChange(localSearchText);
    }
    return () => {
      saveLocalSearchText(searchParams.get('name') ? searchParams.get('name') : localSearchText);
    };
  }, []);

  return (
    <div
      className={`${styles.searchWrapper} ${themeIsDark ? '' : styles.light}`}>
      <SearchRequest></SearchRequest>
      <div
        className={styles.resultsWrapper}
        onClick={() => {
          handleSetIsShowingDetailsCallback(false);
          handleSetSelectedIdCallback(0);
        }}>
        <div>
          <SearchResult></SearchResult>
          {characters?.length ? <Pagination></Pagination> : null}
        </div>
        <CharacterDetails />
        <ThemeSwitcher />
        <Flyout />
      </div>
    </div>
  );
}

export default Search;
