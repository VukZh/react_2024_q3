import { useEffect } from 'react';
import styles from './searchResult.module.css';
import CharacterItem from '../../../entities/characterItem';
import { getDetailsCharacter } from '../../../api/rickAndMortyAPI.ts';
import useCustomSearchParams from '../../../../../shared/hooks/useCustomSearchParams.tsx';
import { getShortCharacters } from '../../../api/helpers.ts';
import { useSearch } from '../../../../../shared/hooks/useSearch.tsx';

function SearchResult() {
  const {
    characters: draftCharacters,
    handleSetSelectedIdCallback: changeSelectedId,
    handleSetIsShowingDetailsCallback: changeIsShowingDetails,
    handleSetIsLoadingDetailsCallback: changeIsLoadingDetails,
    handleSetCharacterDetailsCallback,
    selectedId,
    isShowingDetails,
  } = useSearch();

  const characters = getShortCharacters(draftCharacters);

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
        handleSetCharacterDetailsCallback(characterDetails);
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
              handleSetCharacterDetailsCallback(characterDetails);
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
    </div>
  );
}

export default SearchResult;
