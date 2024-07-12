import styles from './characterItem.module.css';
import { RickAndMortyShortCharacter } from '../../../model/types.ts';

type PropsType = {
  character: RickAndMortyShortCharacter;
};

function CharacterItem(props: PropsType) {
  const { id, name, status, species } = props.character;
  return (
    <div className={styles.characterItemWrapper}>
      <div className={styles.name}>{name}</div>
      <div className={styles.status}>{status}</div>
      <div className={styles.species}>{species}</div>
    </div>
  );
}

export default CharacterItem;
