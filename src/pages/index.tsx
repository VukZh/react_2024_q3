import App from '../container/App.tsx';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import {
  fetchCharacters,
  getDetailsCharacter,
} from '../components/search/api/rickAndMortyAPI.ts';

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { name = '', page = 0, details = '' } = context.query;

    const nameStr = Array.isArray(name) ? name[0] : name;
    const pageStr = Array.isArray(page) ? page[0] : page;

    const data = await fetchCharacters(nameStr, +pageStr);

    let detailsData = null;

    if (details) {
      detailsData = await getDetailsCharacter(+details);
    }
    return {
      props: { charactersData: data, detailsData: detailsData },
    };
  } catch (e) {
    if (e instanceof Error) {
      return { props: { error: e.message } };
    } else {
      return { props: { error: 'An unknown error' } };
    }
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
