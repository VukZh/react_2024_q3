import styles from './searchResult.module.css';
import CharacterItem from '../../../entities/characterItem';
import { getShortCharacters, parseQueryString } from '../../../api/helpers.ts';
import { headers } from 'next/headers';
import { fetchCharacters } from '../../../api/rickAndMortyAPI.ts';
import { RickAndMortyCharacterType } from '../../../model/types.ts';

async function getDataResult() {
  try {
    const headerList = headers();
    const pathname = headerList.get('x-current-path');
    const { name = '', page = '0' } = parseQueryString(pathname ?? '');

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
  console.log('getDataResult');
  const draftCharacters =
    (await getDataResult()) as RickAndMortyCharacterType[];

  const characters = getShortCharacters(draftCharacters!);

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
    </div>
  );
}

export default SearchResult;
