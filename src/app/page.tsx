import type { Metadata } from 'next';
import {fetchCharacters, getDetailsCharacter} from "../components/search/api/rickAndMortyAPI.ts";
import App from "../container/App.tsx";
import {usePathname} from "next/navigation";
import { headers } from "next/headers";
import {parseQueryString} from "../components/search/api/helpers.ts";

const BASE_URL = 'https://rickandmortyapi.com/api/character';

const PAGE_SIZE = 20;


export const metadata: Metadata = {
  title: 'Rick and Morty Search',
  description: 'Search for Rick and Morty characters',
  icons: {
    icon: '/images/rm.png',
  },
};

async function getData() {
  try {

    const headerList = headers();
    const pathname = headerList.get("x-current-path");
    const {name = '', page = 0, details = ''} = parseQueryString(pathname);

    const data = await fetchCharacters(name, page);

    console.log('data', data);

    let detailsData = null;

    if (details) {
      detailsData = await getDetailsCharacter(+details);
    }

    console.log('detailsData', detailsData);
    // const detailsData = await getDetailsCharacter(+details);

    return {
      props: { charactersData: data, detailsData },
    };
  } catch (e) {
    if (e instanceof Error) {
      return { props: { error: e.message } };
    } else {
      return { props: { error: 'An unknown error' } };
    }
  }
}
export default async function Home() {
  const data = await getData();
  // console.log('data', data.props.charactersData);
  return (
    <>
      {
        !data.props?.error ? (
            <App
              characters={data.props.charactersData.characters}
              page={data.props.charactersData.page}
              details={data.props.detailsData}
            />
        ) : null
      }

    </>
  );
}
