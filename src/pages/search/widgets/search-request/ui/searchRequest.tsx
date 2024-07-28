import { useContext, useEffect } from 'react';
import styles from './searchRequest.module.css';
import Loader from '../../../../../shared/loader';
import { useLocalStorage } from '../../../../../shared/hooks/useLocalStorage.tsx';
import useCustomSearchParams from '../../../../../shared/hooks/useCustomSearchParams.tsx';
import { Context } from '../../../../../shared/context/contextProvider.tsx';
import { useSearch } from '../../../../../shared/hooks/useSearch.tsx';
import { useGetCharactersQuery } from '../../../../../shared/store/charactersApi.ts';

function SearchRequest() {
  const [localSearchText, saveLocalSearchText] = useLocalStorage();

  const { themeIsDark } = useContext(Context);

  const {
    searchText,
    handleSetSearchTextCallback: changeSearchText,
    handleSetCharactersCallback,
    handleSetPageCallback,
    handleSetSelectedIdCallback,
    page,
  } = useSearch();

  const handleSearchSubmit = async () => {
    handleNameChange(searchText);
    handleNameChange(searchText);
    saveLocalSearchText(
      searchParams.get('name') ? searchParams.get('name') : searchText,
    );
    handleSetPageCallback({
      totalPages: page.totalPages,
      currPage: searchParams.get('page') ? +searchParams.get('page') : 1,
    });
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const { searchParams, handleNameChange } = useCustomSearchParams();

  useEffect(() => {
    handleSetPageCallback({
      totalPages: page.totalPages,
      currPage: searchParams.get('page') ? +searchParams.get('page') : 1,
    });
  }, []);

  const { data, isFetching, error } = useGetCharactersQuery({
    name: searchParams.get('name') ? searchParams.get('name') : localSearchText,
    page: searchParams.get('page') || 1,
  });

  useEffect(() => {
    if (error) {
      handleSetCharactersCallback([]);
      handleSetPageCallback({
        totalPages: page.totalPages,
        currPage: 1,
      });
    } else if (data?.results.length) {
      handleSetCharactersCallback(data.results);
    }
  }, [data, error]);

  useEffect(() => {
    const totalPages = data?.info.count ? Math.ceil(data?.info.count / 20) : 1;
    const currPage =
      data?.info.next && data?.info.prev
        ? data.info.next.split('?')[1].split('&')[0].split('=')[1] - 1
        : !data?.info.next && totalPages > 1
          ? totalPages
          : 1;
    const newPage = {
      currPage,
      totalPages,
    };
    if (
      page?.currPage !== newPage.currPage ||
      page?.totalPages !== newPage.totalPages
    ) {
      handleSetPageCallback(newPage);
    }
  }, [data]);

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
      {!isFetching ? (
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
