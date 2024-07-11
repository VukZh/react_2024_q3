import styles from './characterDetails.module.css';
import { RickAndMortyDetailsCharacter } from '../../../model/types.ts';

type PropsType = {
  character: RickAndMortyDetailsCharacter;
};

function CharacterDetails(props: PropsType) {
  return (
    <div className={styles.characterDetailsWrapper}>
      <img
        src={props.character.image}
        alt="character"
        className={styles.image}
      />
      <div className={styles.name}>Name: {props.character.name}</div>
      <div className={styles.status}>Status: {props.character.status}</div>
      <div className={styles.species}>Species: {props.character.species}</div>
      <div className={styles.location}>
        Location: {props.character.location.name}
      </div>

      <button className={styles.buttonClose}>Close</button>
    </div>
  );
}

export default CharacterDetails;
