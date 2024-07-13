import styles from './pagination.module.css';
import { PageType, RickAndMortyCharacter } from '../../../model/types.ts';
import { fetchData } from '../../../api/helpers.ts';

type PropsType = PageType & {
  changePage: (page: PageType) => void;
  changeIsLoading: (isLoading: boolean) => void;
  setCharacters: (characters: RickAndMortyCharacter[]) => void;
  setPage: (page: PageType) => void;
  searchText: string;
};

function Pagination(props: PropsType) {
  const {
    currPage,
    totalPages,
    changePage,
    changeIsLoading,
    setCharacters,
    setPage,
    searchText,
  } = props;

  const handleSearchPageSubmit = async (currPage) => {
    fetchData(searchText, changeIsLoading, setCharacters, setPage, currPage);
  };

  return (
    <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
      <div className={styles.paginationWrapper}>
        {totalPages > 1 && currPage > 1 ? (
          <div
            className={styles.noCurrPage}
            onClick={() => {
              changePage({
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
              changePage({
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
