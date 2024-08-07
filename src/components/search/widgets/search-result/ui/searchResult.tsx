import styles from './searchResult.module.css';
import CharacterItem from '../../../entities/characterItem';
import {getShortCharacters, parseQueryString} from '../../../api/helpers.ts';
// import { useSearch } from '../../../../../shared/hooks/useSearch.tsx';
import { RickAndMortyCharacterType } from '../../../model/types.ts';
import {headers} from "next/headers";
import {fetchCharacters, getDetailsCharacter} from "../../../api/rickAndMortyAPI.ts";

// type SearchResultPropsType = {
//   draftCharacters?: RickAndMortyCharacterType[];
//   changeSelectedId?: (id: number) => void;
//   changeIsShowingDetails?: (isShowing: boolean) => void;
//   selectedId?: number;
//   setIsDetailsLoading?: (isLoading: boolean) => void;
// };

async function getDataResult() {
  try {
    const headerList = headers();
    const pathname = headerList.get("x-current-path");
    const {name = '', page = 0} = parseQueryString(pathname);

    const data = await fetchCharacters(name, page);

    return data.characters;
  } catch (e) {
    if (e instanceof Error) {
      return e.message;
    } else {
      return 'An unknown error';
    }
  }
}

async function SearchResult() {
  // const {
  //   characters: draftCharacters,
  //   handleSetSelectedIdCallback: changeSelectedId,
  //   handleSetIsShowingDetailsCallback: changeIsShowingDetails,
  //   selectedId,
  //   handleSetIsDetailsLoadingCallback,
  // } = useSearch();

  const draftCharacters = await getDataResult();

  const characters = getShortCharacters(draftCharacters!);

  // useEffect(() => {
  //   if (!characters.length) {
  //     changeIsShowingDetails(false);
  //     changeSelectedId(0);
  //   } else {
  //     changeIsShowingDetails(true);
  //   }
  // }, [characters.length]);

  // const handleSelectId = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
  //   e.stopPropagation();
  //   changeIsShowingDetails(true);
  //   changeSelectedId(id);
  //   if (selectedId !== id) {
  //     handleSetIsDetailsLoadingCallback(true);
  //   }
  // };

  return (
    <div className={styles.searchResult}>
      {characters.length ? (
        characters.map((character) => (
          // <div
          //   key={character.id}
          //   onClick={(e) => handleSelectId(e, character.id)}>
          <CharacterItem key={character.id}
            character={character}></CharacterItem>
          // </div>
        ))
      ) : (
        <div className={styles.searchItem}>No results</div>
      )}
    </div>
  );
}

export default SearchResult;
