import styles from './characterItem.module.css';
import { RickAndMortyShortCharacter } from '../../../model/types.ts';

type PropsType = {
  character: RickAndMortyShortCharacter;
};

function CharacterItem(props: PropsType) {
  return (
    <div className={styles.characterItemWrapper}>
      <div className={styles.name}>{props.character.name}</div>
      <div className={styles.status}>{props.character.status}</div>
      <div className={styles.species}>{props.character.species}</div>
    </div>
  );
}

export default CharacterItem;
