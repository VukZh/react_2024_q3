import { useContext, useEffect, useState } from 'react';
import styles from './searchResult.module.css';
import CharacterItem from '../../../entities/characterItem';
import { getDetailsCharacter } from '../../../api/rickAndMortyAPI.ts';
import useCustomSearchParams from '../../../../../shared/hooks/useCustomSearchParams.tsx';
import { Context } from '../../../../../shared/context/contextProvider.tsx';
import { getShortCharacters } from '../../../api/helpers.ts';

function SearchResult() {
  const {
    characters: draftCharacters,
    setSelectedId: changeSelectedId,
    setIsShowingDetails: changeIsShowingDetails,
    setIsLoadingDetails: changeIsLoadingDetails,
    setCharacterDetails,
    selectedId,
  } = useContext(Context);

  console.log('draftCharacters', draftCharacters);

  const characters = getShortCharacters(draftCharacters);

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

  const { searchParams } = useCustomSearchParams();

  useEffect(() => {
    const getDetails = async () => {
      if (searchParams.get('details') > 0) {
        changeIsShowingDetails(true);
        changeSelectedId(+searchParams.get('details'));
        changeIsLoadingDetails(true);
        const characterDetails = await getDetailsCharacter(
          +searchParams.get('details'),
        );
        setCharacterDetails(characterDetails);
        changeIsLoadingDetails(false);
      }
    };
    getDetails();
  }, []);

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
            <CharacterItem
              character={character}
              isSelected={selectedId === character.id}></CharacterItem>
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
