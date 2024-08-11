import { headers } from 'next/headers';
import { parseQueryString } from '../../../api/helpers.ts';
import { getDetailsCharacter } from '../../../api/rickAndMortyAPI.ts';
import styles from './characterDetails.module.css';
import Image from 'next/image';
import { RickAndMortyDetailsCharacter } from '../../../model/types.ts';

async function getDataDetails() {
  try {
    const headerList = headers();
    const pathname = headerList.get('x-current-path');
    const { details = '' } = parseQueryString(pathname ?? '');

    let detailsData = null;

    if (details) {
      detailsData = await getDetailsCharacter(+details);
    }

    return detailsData;
  } catch (e) {
    if (e instanceof Error) {
      return e.message;
    } else {
      return 'An unknown error';
    }
  }
}

export default async function CharacterDetailsRSC() {
  const characterDetails =
    (await getDataDetails()) as RickAndMortyDetailsCharacter;

  return (
    <>
      {characterDetails ? (
        <>
          <Image
            src={characterDetails.image}
            alt="character"
            className={styles.image}
            width={300}
            height={300}
          />
          <div className={styles.name}>Name: {characterDetails.name}</div>
          <div className={styles.status}>Status: {characterDetails.status}</div>
          <div className={styles.species}>
            Species: {characterDetails.species}
          </div>
          <div className={styles.location}>
            Location: {characterDetails.location.name}
          </div>
        </>
      ) : (
        <div className={styles.empty}></div>
      )}
    </>
  );
}
