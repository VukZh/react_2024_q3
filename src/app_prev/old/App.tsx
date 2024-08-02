import './App.css';
import Search from '../../pages_/search';
import ErrorBoundary from '../../shared/error-boundary';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from '../../shared/not-found';
import { ContextProvider } from '../../shared/context/contextProvider.tsx';
import CharacterDetails from '../../pages_/search/entities/characterDetails';
import { store } from '../../shared/store/store.ts';
import { Provider } from 'react-redux';

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Search />}>
                <Route path="/" element={<CharacterDetails />} />
              </Route>
              <Route path="*" element={<Index />} />
            </Routes>
          </BrowserRouter>
        </ContextProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
