import styles from './characterItem.module.css';
import { RickAndMortyShortCharacter } from '../../../model/types.ts';
import { useContext } from 'react';
import { Context } from '../../../../../shared/context/contextProvider.tsx';

type PropsType = {
  character: RickAndMortyShortCharacter;
  isSelected: boolean;
};

function CharacterItem(props: PropsType) {
  const { themeIsDark } = useContext(Context);
  const { name, status, species } = props.character;
  return (
    <div
      className={`
        ${
          props.isSelected
            ? styles.characterSelectedItemWrapper
            : styles.characterItemWrapper
        }
          ${themeIsDark ? '' : styles.light}
      `}>
      <div className={styles.name}>{name}</div>
      <div className={styles.status}>{status}</div>
      <div className={styles.species}>{species}</div>
    </div>
  );
}

export default CharacterItem;
