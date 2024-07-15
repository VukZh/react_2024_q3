import styles from './characterDetails.module.css';
import Loader from '../../../../../shared/loader';
import { useContext } from 'react';
import { Context } from '../../../../../shared/context/contextProvider.tsx';
import { getDetailsCharacter } from '../../../api/helpers.ts';

function CharacterDetails() {
  const {
    characterDetails,
    isShowingDetails: isShowing,
    setIsShowingDetails: changeIsShowingDetails,
    isLoadingDetails,
  } = useContext(Context);

  const character = getDetailsCharacter(characterDetails);

  if (!isShowing || !character) {
    return <div className={styles.empty}></div>;
  }

  return (
    <>
      {!isLoadingDetails ? (
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
