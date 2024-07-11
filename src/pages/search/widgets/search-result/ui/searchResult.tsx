import { useEffect, useState } from 'react';
import styles from './searchResult.module.css';
import { RickAndMortyShortCharacter } from '../../../model/types.ts';
import CharacterItem from '../../../entities/characterItem';

type PropsType = {
  characters: RickAndMortyShortCharacter[];
};

function SearchResult(props: PropsType) {
  const { characters } = props;

  const [errorIsThrown, setErrorIsThrown] = useState<boolean>(false);

  const makeError = () => {
    setErrorIsThrown(true);
  };

  useEffect(() => {
    if (errorIsThrown) {
      throw new Error('Something went wrong.');
    }
  }, [errorIsThrown]);

  return (
    <div className={styles.searchResult}>
      {characters.length ? (
        characters.map((character) => (
          <CharacterItem
            key={character.id}
            character={character}></CharacterItem>
        ))
      ) : (
        <div className={styles.searchItem}>No results</div>
      )}

      <button className={styles.error} onClick={makeError}>
        Error
      </button>
    </div>
  );
}

export default SearchResult;
