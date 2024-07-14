import styles from './pagination.module.css';
import { LS_MY_SEARCH } from '../../../ui/search.tsx';
import { fetchData } from '../../../api/helpers.ts';
import { useContext } from 'react';
import { Context } from '../../../../../shared/context/contextProvider.tsx';

function Pagination() {
  const {
    setIsLoading: changeIsLoading,
    setCharacters,
    page,
    setPage,
  } = useContext(Context);

  const { currPage, totalPages } = page;

  const handleSearchPageSubmit = async (currPage) => {
    const searchText = localStorage.getItem(LS_MY_SEARCH);
    fetchData(searchText, changeIsLoading, setCharacters, setPage, currPage);
  };

  return (
    <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
      <div className={styles.paginationWrapper}>
        {totalPages > 1 && currPage > 1 ? (
          <div
            className={styles.noCurrPage}
            onClick={() => {
              setPage({
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
              setPage({
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
