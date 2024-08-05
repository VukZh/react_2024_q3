import { useEffect } from 'react';
import styles from './searchResult.module.css';
import CharacterItem from '../../../entities/characterItem';
import { getShortCharacters } from '../../../api/helpers.ts';
import { useSearch } from '../../../../../shared/hooks/useSearch.tsx';

function SearchResult() {
  const {
    characters: draftCharacters,
    handleSetSelectedIdCallback: changeSelectedId,
    handleSetIsShowingDetailsCallback: changeIsShowingDetails,
    selectedId,
    handleSetIsDetailsLoadingCallback,
  } = useSearch();

  const characters = getShortCharacters(draftCharacters);

  useEffect(() => {
    if (!characters.length) {
      changeIsShowingDetails(false);
      changeSelectedId(0);
    } else {
      changeIsShowingDetails(true);
    }
  }, [characters.length]);

  const handleSelectId = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    e.stopPropagation();
    changeIsShowingDetails(true);
    changeSelectedId(id);
    if (selectedId !== id) {
      handleSetIsDetailsLoadingCallback(true);
    }
  };

  return (
    <div className={styles.searchResult}>
      {characters.length ? (
        characters.map((character) => (
          <div
            key={character.id}
            onClick={(e) => handleSelectId(e, character.id)}>
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
