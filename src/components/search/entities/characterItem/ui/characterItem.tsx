'use client';

import styles from './characterItem.module.css';
import { RickAndMortyShortCharacter } from '../../../model/types.ts';
import { useContext } from 'react';
import { Context } from '../../../../../shared/context/contextProvider.tsx';
import { useSearch } from '../../../../../shared/hooks/useSearch.tsx';

type PropsType = {
  character: RickAndMortyShortCharacter;
};



function CharacterItem(props: PropsType) {
  const { themeIsDark } = useContext(Context);
  const { name, status, species, id } = props.character;
  const { handleSetSelectedItemsCallback, selectedItems } = useSearch();

  const {
    handleSetSelectedIdCallback: changeSelectedId,
    handleSetIsShowingDetailsCallback: changeIsShowingDetails,
    selectedId,
    handleSetIsDetailsLoadingCallback,
  } = useSearch();

  const handleSelectId = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    e.stopPropagation();
    changeIsShowingDetails(true);
    changeSelectedId(id);
    if (selectedId !== id) {
      handleSetIsDetailsLoadingCallback(true);
    }
  };

  return (
    <div key={id} onClick={(e) => handleSelectId(e, id)}>
      <div
        className={`
        ${
          id === selectedId
            ? styles.characterSelectedItemWrapper
            : styles.characterItemWrapper
        }
          ${themeIsDark ? '' : styles.light}
      `}>
        <div className={styles.itemWrapper}>
          <div className={styles.name}>{name}</div>
          <div className={styles.status}>{status}</div>
          <div className={styles.species}>{species}</div>
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <input
            className={styles.itemCheckbox}
            type="checkbox"
            onChange={() => handleSetSelectedItemsCallback(id)}
            checked={selectedItems.includes(id)}
          />
        </div>
      </div>
    </div>
  );
}

export default CharacterItem;
