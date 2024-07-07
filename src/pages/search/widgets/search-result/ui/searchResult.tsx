import React, { Component, ReactNode } from 'react';
import styles from './searchResult.module.css';
import { RickAndMortyShortCharacter } from '../../../model/types.ts';
import CharacterItem from '../../../entities/characterItem';

type StateType = { errorIsThrown: boolean };

type PropsType = {
  characters: RickAndMortyShortCharacter[];
};
class SearchResult extends Component<PropsType, StateType> {
  constructor(props) {
    super(props);
    this.state = {
      errorIsThrown: false,
    };
  }

  makeError = () => {
    this.setState({ errorIsThrown: true });
  };

  componentDidUpdate(
    prevProps: Readonly<PropsType>,
    prevState: Readonly<StateType>,
  ) {
    if (this.state.errorIsThrown) {
      throw new Error('Something went wrong.');
    }
  }

  render() {
    return (
      <div className={styles.searchResult}>
        {this.props.characters.length ? (
          this.props.characters.map((character) => (
            <CharacterItem
              key={character.id}
              character={character}></CharacterItem>
          ))
        ) : (
          <div className={styles.searchItem}>No results</div>
        )}

        <button className={styles.error} onClick={this.makeError}>
          Error
        </button>
      </div>
    );
  }
}

export default SearchResult;
