import type { AppProps } from 'next/app';
import '../index.css';
import { ContextProvider } from '../shared/context/contextProvider.tsx';
import { store } from '../shared/store/store.ts';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </Provider>
  );
}
