import { Component } from 'react';

import styles from './characterItem.module.css';
import { RickAndMortyShortCharacter } from '../../../model/types.ts';

type PropsType = {
  character: RickAndMortyShortCharacter;
};
class CharacterItem extends Component<PropsType, object> {
  render() {
    return (
      <div className={styles.characterItemWrapper}>
        <div className={styles.name}>{this.props.character.name}</div>
        <div className={styles.status}>{this.props.character.status}</div>
        <div className={styles.species}>{this.props.character.species}</div>
      </div>
    );
  }
}

export default CharacterItem;
