import type { AppProps } from 'next/app';
import '../index.css';
import { ContextProvider } from '../shared/context/contextProvider.tsx';
import { store } from '../shared/store/store.ts';
import { Provider } from 'react-redux';
import { getDetailsCharacter } from '../components/search/api/rickAndMortyAPI.ts';

export async function getStaticProps({ params }) {
  const { param2 } = params;
  const data = await getDetailsCharacter(2);

  return {
    props: {
      data,
    },
  };
}
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </Provider>
  );
}
