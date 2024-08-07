'use client';

import '../index.css';
import { Provider } from 'react-redux';
import { store } from '../shared/store/store.ts';
import { ContextProvider } from '../shared/context/contextProvider.tsx';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ContextProvider>{children}</ContextProvider>
        </Provider>
      </body>
    </html>
  );
}
