import styles from './characterDetails.module.css';
import { RickAndMortyDetailsCharacter } from '../../../model/types.ts';

type PropsType = {
  character: RickAndMortyDetailsCharacter | null;
  isShowing: boolean;
  changeIsShowingDetails: (isShowing) => void;
};

function CharacterDetails(props: PropsType) {
  const { character, isShowing, changeIsShowingDetails } = props;

  if (!isShowing || !character) {
    return <div className={styles.empty}></div>;
  }

  return (
    <div
      className={styles.characterDetailsWrapper}
      onClick={(e) => e.stopPropagation()}>
      <img src={character.image} alt="character" className={styles.image} />
      <div className={styles.name}>Name: {character.name}</div>
      <div className={styles.status}>Status: {character.status}</div>
      <div className={styles.species}>Species: {character.species}</div>
      <div className={styles.location}>Location: {character.location.name}</div>

      <button
        className={styles.buttonClose}
        onClick={() => changeIsShowingDetails(false)}>
        Close
      </button>
    </div>
  );
}

export default CharacterDetails;
