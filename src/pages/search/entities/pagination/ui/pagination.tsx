import styles from './pagination.module.css';
import { PageType } from '../../../model/types.ts';

type PropsType = PageType & {
  changePage: (page: PageType) => void;
};

function Pagination(props: PropsType) {
  const { currPage, totalPages, changePage } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.paginationWrapper}>
        {totalPages > 1 && currPage > 1 ? (
          <div
            className={styles.noCurrPage}
            onClick={() =>
              changePage({
                totalPages,
                currPage: currPage - 1,
              })
            }>
            {currPage - 1}
          </div>
        ) : (
          <div className={styles.noPage}></div>
        )}
        <div className={styles.currPage}>{currPage}</div>
        {totalPages > 1 && currPage < totalPages ? (
          <div
            className={styles.noCurrPage}
            onClick={() =>
              changePage({
                totalPages,
                currPage: currPage + 1,
              })
            }>
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
