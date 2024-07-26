import styles from './pagination.module.css';
import { LS_MY_SEARCH } from '../../../ui/search.tsx';
import { fetchData } from '../../../api/helpers.ts';
import { useSearch } from '../../../../../shared/hooks/useSearch.tsx';

function Pagination() {
  const {
    handleSetIsLoadingCallback: changeIsLoading,
    handleSetCharactersCallback,
    page,
    handleSetPageCallback,
  } = useSearch();

  const { currPage, totalPages } = page;

  const handleSearchPageSubmit = async (currPage) => {
    const searchText = localStorage.getItem(LS_MY_SEARCH);
    fetchData(
      searchText as string,
      changeIsLoading,
      handleSetCharactersCallback,
      handleSetPageCallback,
      currPage,
    );
  };

  return (
    <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
      <div className={styles.paginationWrapper}>
        {totalPages > 1 && currPage > 1 ? (
          <div
            className={styles.noCurrPage}
            onClick={() => {
              handleSetPageCallback({
                totalPages,
                currPage: currPage - 1,
              });
              handleSearchPageSubmit(currPage - 1);
            }}>
            {currPage - 1}
          </div>
        ) : (
          <div className={styles.noPage}></div>
        )}
        <div className={styles.currPage}>{currPage}</div>
        {totalPages > 1 && currPage < totalPages ? (
          <div
            className={styles.noCurrPage}
            onClick={() => {
              handleSetPageCallback({
                totalPages,
                currPage: currPage + 1,
              });
              handleSearchPageSubmit(currPage + 1);
            }}>
            {currPage + 1}
          </div>
        ) : (
          <div className={styles.noPage}></div>
        )}
      </div>
      <div className={styles.total}>{`(totally ${totalPages})`}</div>
    </div>
  );
}

export default Pagination;
