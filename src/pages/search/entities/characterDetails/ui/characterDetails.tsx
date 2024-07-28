import styles from './characterDetails.module.css';
import Loader from '../../../../../shared/loader';
import { getDetailsCharacter } from '../../../api/helpers.ts';
import { useSearch } from '../../../../../shared/hooks/useSearch.tsx';
import { useGetCharacterDetailsQuery } from '../../../../../shared/store/characterDetailsApi.ts';
import useCustomSearchParams from '../../../../../shared/hooks/useCustomSearchParams.tsx';
import { useEffect } from 'react';

function CharacterDetails() {
  const {
    isShowingDetails: isShowing,
    handleSetIsShowingDetailsCallback: changeIsShowingDetails,
    selectedId,
    handleSetCharacterDetailsCallback,
    handleSetSelectedIdCallback,
  } = useSearch();

  const { searchParams } = useCustomSearchParams();

  useEffect(() => {
    if (searchParams.get('details')) {
      changeIsShowingDetails(true);
      handleSetSelectedIdCallback(+searchParams.get('details'));
    }
  }, []);

  const { data, isFetching } = useGetCharacterDetailsQuery(selectedId, {
    skip: selectedId === 0,
  });
  handleSetCharacterDetailsCallback(data);

  const character = getDetailsCharacter(data);
  handleSetCharacterDetailsCallback(data);

  if (!selectedId || !isShowing) {
    return <div className={styles.empty}></div>;
  }

  return (
    <>
      {!isFetching ? (
        <div
          className={styles.characterDetailsWrapper}
          onClick={(e) => e.stopPropagation()}>
          <img src={character.image} alt="character" className={styles.image} />
          <div className={styles.name}>Name: {character.name}</div>
          <div className={styles.status}>Status: {character.status}</div>
          <div className={styles.species}>Species: {character.species}</div>
          <div className={styles.location}>
            Location: {character.location.name}
          </div>

          <button
            className={styles.buttonClose}
            onClick={() => changeIsShowingDetails(false)}>
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
