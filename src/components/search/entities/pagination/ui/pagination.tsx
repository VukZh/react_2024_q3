import styles from './pagination.module.css';
import { useSearch } from '../../../../../shared/hooks/useSearch.tsx';

function Pagination() {
  const { page, handleSetPageCallback, handleSetIsLoadingCallback } =
    useSearch();

  const { currPage, totalPages } = page;

  const handleSearchPageSubmit = async (newPage) => {
    handleSetPageCallback({
      totalPages,
      currPage: newPage,
    });
    handleSetIsLoadingCallback(true);
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
