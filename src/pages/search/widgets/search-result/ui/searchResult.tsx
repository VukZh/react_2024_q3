import { useEffect } from 'react';
import styles from './searchResult.module.css';
import CharacterItem from '../../../entities/characterItem';
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
