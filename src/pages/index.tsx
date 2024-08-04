import App from '../container/App.tsx';

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import {fetchCharacters, getDetailsCharacter} from '../components/search/api/rickAndMortyAPI.ts';

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { name = '', page = 0, details = '' } = context.query;
    console.log('d------------------0', name, page, details);

    const data = await fetchCharacters(name, page);

    let detailsData = null;

    if (details) {
      detailsData = await getDetailsCharacter(+details);
    }
    console.log('d-------------------', detailsData);
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
  <App characters={charactersData.characters} page={charactersData.page} details={detailsData} />
);

export default Home;
