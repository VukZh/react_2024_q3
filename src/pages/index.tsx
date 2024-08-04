import App from '../container/App.tsx';

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import {
  fetchCharacters,
  getDetailsCharacter,
} from '../components/search/api/rickAndMortyAPI.ts';
import Head from 'next/head';

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { name = '', page = 0, details = '' } = context.query;

    const data = await fetchCharacters(name, page);

    let detailsData = null;

    if (details) {
      detailsData = await getDetailsCharacter(+details);
    }
    return {
      props: { charactersData: data, detailsData: detailsData },
    };
  } catch (e) {
    return e.message;
  }
};

const Home = ({
  charactersData,
  detailsData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <>
    <Head>
      <title>Rick and Morty Search</title>
      <meta name="description" content="Search for Rick and Morty characters" />
      <link rel="icon" type="image/svg+xml" href="/images/rm.png" />
    </Head>
    <App
      characters={charactersData.characters}
      page={charactersData.page}
      details={detailsData}
    />
  </>
);

export default Home;
