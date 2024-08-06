"use client"

import { Provider } from 'react-redux';
import { store } from '../shared/store/store.ts';
import { ContextProvider } from '../shared/context/contextProvider.tsx';

export default function Page() {
  return (
    <Provider store={store}>
      <ContextProvider>
        <h1>Hello, Next.js!</h1>
      </ContextProvider>
    </Provider>
  );
}
