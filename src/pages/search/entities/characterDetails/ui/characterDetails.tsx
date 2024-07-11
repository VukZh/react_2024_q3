import { Component } from 'react';

import styles from './characterDetails.module.css';
import { RickAndMortyDetailsCharacter } from '../../../model/types.ts';

type PropsType = {
  character: RickAndMortyDetailsCharacter;
};

class CharacterDetails extends Component<PropsType, object> {
  render() {
    return (
      <div className={styles.characterDetailsWrapper}>
        <img
          src={this.props.character.image}
          alt="character"
          className={styles.image}
        />
        <div className={styles.name}>Name: {this.props.character.name}</div>
        <div className={styles.status}>
          Status: {this.props.character.status}
        </div>
        <div className={styles.species}>
          Species: {this.props.character.species}
        </div>
        <div className={styles.location}>
          Location: {this.props.character.location.name}
        </div>

        <button className={styles.buttonClose}>Close</button>
      </div>
    );
  }
}

export default CharacterDetails;
