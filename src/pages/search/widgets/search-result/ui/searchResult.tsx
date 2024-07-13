import { useEffect, useState } from 'react';
import styles from './searchResult.module.css';
import {
  RickAndMortyCharacter,
  RickAndMortyShortCharacter,
} from '../../../model/types.ts';
import CharacterItem from '../../../entities/characterItem';
import { getDetailsCharacter } from '../../../api/rickAndMortyAPI.ts';

type PropsType = {
  characters: RickAndMortyShortCharacter[];
  changeSelectedId: (id: number) => void;
  changeIsShowingDetails: (isShowing: boolean) => void;
  changeIsLoadingDetails: (isLoading: boolean) => void;
  setCharacterDetails: (character: RickAndMortyCharacter) => void;
};

function SearchResult(props: PropsType) {
  const {
    characters,
    changeSelectedId,
    changeIsShowingDetails,
    changeIsLoadingDetails,
    setCharacterDetails,
  } = props;

  const [errorIsThrown, setErrorIsThrown] = useState<boolean>(false);

  const makeError = () => {
    setErrorIsThrown(true);
  };

  useEffect(() => {
    if (errorIsThrown) {
      throw new Error('Something went wrong.');
    }
  }, [errorIsThrown]);

  useEffect(() => {
    if (!characters.length) {
      changeIsShowingDetails(false);
    } else {
      changeIsShowingDetails(true);
    }
  }, [characters.length]);

  return (
    <div className={styles.searchResult}>
      {characters.length ? (
        characters.map((character) => (
          <div
            key={character.id}
            onClick={async (e) => {
              e.stopPropagation();
              changeIsShowingDetails(true);
              changeSelectedId(character.id);
              changeIsLoadingDetails(true);
              const characterDetails = await getDetailsCharacter(character.id);
              setCharacterDetails(characterDetails);
              changeIsLoadingDetails(false);
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
