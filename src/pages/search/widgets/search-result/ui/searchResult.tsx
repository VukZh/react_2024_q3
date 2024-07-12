import { useEffect, useState } from 'react';
import styles from './searchResult.module.css';
import { RickAndMortyShortCharacter } from '../../../model/types.ts';
import CharacterItem from '../../../entities/characterItem';

type PropsType = {
  characters: RickAndMortyShortCharacter[];
  changeSelectedId: (number) => void;
  changeIsShowingDetails: (isShowing) => void;
};

function SearchResult(props: PropsType) {
  const { characters, changeSelectedId, changeIsShowingDetails } = props;

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
          <div
            key={character.id}
            onClick={(e) => {
              e.stopPropagation();
              changeSelectedId(character.id);
              changeIsShowingDetails(true);
            }}>
            <CharacterItem character={character}></CharacterItem>
          </div>
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
