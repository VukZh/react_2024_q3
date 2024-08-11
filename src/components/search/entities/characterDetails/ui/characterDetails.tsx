'use client';

import styles from './characterDetails.module.css';
import Loader from '../../../../../shared/loader';
import { useSearch } from '../../../../../shared/hooks/useSearch.tsx';
import useCustomSearchParams from '../../../../../shared/hooks/useCustomSearchParams.tsx';
import { useEffect } from 'react';

type CharacterDetailsPropsType = {
  children: React.ReactNode;
};

function CharacterDetails({ children }: CharacterDetailsPropsType) {
  const {
    isShowingDetails: isShowing,
    handleSetIsShowingDetailsCallback: changeIsShowingDetails,
    selectedId,
    handleSetSelectedIdCallback,
    isDetailsLoading,
  } = useSearch();

  const { searchParams } = useCustomSearchParams();

  useEffect(() => {
    const detailsParam = searchParams.get('details') ?? '0';
    if (detailsParam) {
      changeIsShowingDetails(true);
      handleSetSelectedIdCallback(+detailsParam);
    }
  }, []);

  if (!selectedId || !isShowing) {
    return <div className={styles.empty}></div>;
  }

  return (
    <>
      {!isDetailsLoading ? (
        <div
          className={styles.characterDetailsWrapper}
          onClick={(e) => e.stopPropagation()}>
          {children}
          <button
            className={styles.buttonClose}
            onClick={() => {
              changeIsShowingDetails(false);
              handleSetSelectedIdCallback(0);
            }}>
            Close
          </button>
        </div>
      ) : (
        <div className={styles.loaderWrapper}>
          <Loader />
        </div>
      )}
    </>
  );
}

export default CharacterDetails;
